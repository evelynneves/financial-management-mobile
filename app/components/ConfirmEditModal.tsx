import React, { useEffect, useState } from "react";
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
    doc,
    updateDoc,
    getDoc,
    getFirestore,
    setDoc,
} from "firebase/firestore";
import { auth } from "@/firebase/config";
import { Transaction } from "./StatementCard";
import { useAuth } from "@/app/context/auth-context";

interface EditModalProps {
    visible: boolean;
    transaction: Transaction | null;
    onClose: () => void;
    onFinish: () => void;
}

export default function ConfirmEditModal({
    visible,
    transaction,
    onClose,
    onFinish,
}: EditModalProps) {
    const db = getFirestore();
    const { refreshUserData } = useAuth();

    const [date, setDate] = useState(new Date());
    const [amount, setAmount] = useState("");
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() => {
        if (transaction) {
            setDate(new Date(transaction.date));
            setAmount(transaction.amount.toString());
        }
    }, [transaction]);

    const handleAmountChange = (value: string) => {
        let onlyNumbers = value.replace(/\D/g, "");
        if (!onlyNumbers) {
            setAmount("");
            return;
        }
        const cents = parseInt(onlyNumbers);
        const formatted = `R$ ${(cents / 100).toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
        })}`;
        setAmount(formatted);
    };

    const parseCurrency = (value: string): number => {
        return (
            parseFloat(value.replace(/[R$\s\.]/g, "").replace(",", ".")) || 0
        );
    };

    const formatCurrency = (value: number, isNegative?: boolean): string => {
        const prefix = isNegative ? "- R$" : "R$";
        return `${prefix} ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
    };

    const getEmptyInvestments = () => ({
        totalAmount: 0,
        fixedIncome: {
            total: 0,
            governmentBonds: 0,
            privatePensionFixed: 0,
        },
        variableIncome: {
            total: 0,
            investmentFunds: 0,
            privatePensionVariable: 0,
            stockMarket: 0,
        },
    });

    const parseInvestmentData = (data: any) => ({
        totalAmount: parseCurrency(data.totalAmount),
        fixedIncome: {
            total: parseCurrency(data.fixedIncome.total),
            governmentBonds: parseCurrency(data.fixedIncome.governmentBonds),
            privatePensionFixed: parseCurrency(
                data.fixedIncome.privatePensionFixed
            ),
        },
        variableIncome: {
            total: parseCurrency(data.variableIncome.total),
            investmentFunds: parseCurrency(data.variableIncome.investmentFunds),
            privatePensionVariable: parseCurrency(
                data.variableIncome.privatePensionVariable
            ),
            stockMarket: parseCurrency(data.variableIncome.stockMarket),
        },
    });

    const toCurrencyData = (data: any) => ({
        totalAmount: formatCurrency(data.totalAmount),
        fixedIncome: {
            total: formatCurrency(data.fixedIncome.total),
            governmentBonds: formatCurrency(data.fixedIncome.governmentBonds),
            privatePensionFixed: formatCurrency(
                data.fixedIncome.privatePensionFixed
            ),
        },
        variableIncome: {
            total: formatCurrency(data.variableIncome.total),
            investmentFunds: formatCurrency(
                data.variableIncome.investmentFunds
            ),
            privatePensionVariable: formatCurrency(
                data.variableIncome.privatePensionVariable
            ),
            stockMarket: formatCurrency(data.variableIncome.stockMarket),
        },
    });

    const handleSave = async () => {
        if (!transaction) return;

        try {
            const uid = auth.currentUser?.uid;
            if (!uid || !transaction?.id) return;

            const transactionRef = doc(
                db,
                "users",
                uid,
                "transactions",
                transaction.id
            );
            const newAmount = parseCurrency(amount);
            const originalAmount = parseCurrency(transaction.amount.toString());
            const diff = newAmount - originalAmount;

            await updateDoc(transactionRef, {
                amount: formatCurrency(newAmount),
                date: date.toISOString().split("T")[0],
            });

            if (
                transaction.type === "Investimento" ||
                transaction.type === "Resgate"
            ) {
                const delta = transaction.type === "Resgate" ? -diff : diff;

                const investmentsRef = doc(
                    db,
                    "users",
                    uid,
                    "investments",
                    "summary"
                );
                const snapshot = await getDoc(investmentsRef);
                const data = snapshot.exists()
                    ? parseInvestmentData(snapshot.data())
                    : getEmptyInvestments();

                switch (transaction.investmentType) {
                    case "Fundos de investimento":
                        data.variableIncome.investmentFunds += delta;
                        break;
                    case "Tesouro Direto":
                        data.fixedIncome.governmentBonds += delta;
                        break;
                    case "Previdência Privada Fixa":
                        data.fixedIncome.privatePensionFixed += delta;
                        break;
                    case "Previdência Privada Variável":
                        data.variableIncome.privatePensionVariable += delta;
                        break;
                    case "Bolsa de Valores":
                        data.variableIncome.stockMarket += delta;
                        break;
                }

                data.fixedIncome.total =
                    data.fixedIncome.privatePensionFixed +
                    data.fixedIncome.governmentBonds;
                data.variableIncome.total =
                    data.variableIncome.investmentFunds +
                    data.variableIncome.privatePensionVariable +
                    data.variableIncome.stockMarket;
                data.totalAmount =
                    data.fixedIncome.total + data.variableIncome.total;

                await setDoc(investmentsRef, toCurrencyData(data));
            }

            await refreshUserData();
            onFinish();
        } catch (error) {
            console.error("Erro ao salvar edição da transação:", error);
        }
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Editar Transação</Text>

                    <Text style={styles.label}>Tipo de Transação</Text>
                    <TextInput
                        value={transaction?.type}
                        editable={false}
                        style={[styles.input, { backgroundColor: "#eee", color: "#888" }]}
                    />

                    {(transaction?.type === "Investimento" ||
                        transaction?.type === "Resgate") && (
                        <>
                            <Text style={styles.label}>Tipo de Investimento</Text>
                            <TextInput
                                value={transaction?.investmentType ?? ""}
                                editable={false}
                                style={[styles.input, { backgroundColor: "#eee", color: "#888" }]}
                            />
                        </>
                    )}

                    <Text style={styles.label}>Data</Text>
                    <TouchableOpacity
                        onPress={() => setShowDatePicker(true)}
                        style={styles.input}
                    >
                        <Text>{date.toLocaleDateString("pt-BR")}</Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={(e, selectedDate) => {
                                setShowDatePicker(false);
                                if (selectedDate) setDate(selectedDate);
                            }}
                        />
                    )}

                    <Text style={styles.label}>Valor</Text>
                    <TextInput
                        value={amount}
                        onChangeText={handleAmountChange}
                        keyboardType="numeric"
                        style={styles.input}
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancel]}
                            onPress={onClose}
                        >
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.confirm]}
                            onPress={handleSave}
                        >
                            <Text style={styles.buttonText}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 24,
        alignItems: "stretch",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    label: {
        fontSize: 14,
        color: "#444",
        marginTop: 10,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#004D61",
        padding: 10,
        borderRadius: 6,
        marginBottom: 10,
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: "row",
        gap: 10,
        marginTop: 10,
    },
    button: {
        flex: 1,
        padding: 12,
        borderRadius: 6,
        alignItems: "center",
    },
    cancel: {
        backgroundColor: "#F44336",
    },
    confirm: {
        backgroundColor: "#004D61",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
