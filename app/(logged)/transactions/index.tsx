import ScreenWrapper from "@/app/components/ScreenWrapper";
import StatementCard from "@/app/components/StatementCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
    View,
    Text,
    Pressable,
    TextInput,
    ScrollView,
    Modal,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const transactionTypes = [
    "Resgate",
    "Investimento",
    "Transferência",
    "Depósito",
];
const userData = {
    personalData: {
        name: "Joana",
        email: "joana@gmail.com",
    },
    transactions: [
        {
            month: "Março",
            date: "2025-03-01",
            type: "Resgate",
            amount: "500,00",
            investmentType: "Previdência Privada Fixa",
            attachmentFileId: "",
            isNegative: false,
        },
        {
            month: "Janeiro",
            date: "2025-01-15",
            type: "Resgate",
            amount: "250,00",
            investmentType: "Fundos de Investimento",
            attachmentFileId: "",
            isNegative: false,
        },
        {
            month: "Janeiro",
            date: "2025-01-10",
            type: "Resgate",
            amount: "500,00",
            investmentType: "Tesouro Direto",
            attachmentFileId: "",
            isNegative: false,
        },
        {
            month: "Dezembro",
            date: "2024-12-20",
            type: "Investimento",
            amount: "1.000,00",
            investmentType: "Bolsa de Valores",
            attachmentFileId: "",
            isNegative: true,
        },
        {
            month: "Dezembro",
            date: "2024-12-15",
            type: "Investimento",
            amount: "1.000,00",
            investmentType: "Fundos de Investimento",
            attachmentFileId: "",
            isNegative: true,
        },
        {
            month: "Dezembro",
            date: "2024-12-10",
            type: "Investimento",
            amount: "1.000,00",
            investmentType: "Previdência Privada Variável",
            attachmentFileId: "",
            isNegative: true,
        },
        {
            month: "Dezembro",
            date: "2024-12-05",
            type: "Investimento",
            amount: "1.000,00",
            investmentType: "Previdência Privada Fixa",
            attachmentFileId: "",
            isNegative: true,
        },
        {
            month: "Dezembro",
            date: "2024-12-01",
            type: "Investimento",
            amount: "1.000,00",
            investmentType: "Tesouro Direto",
            attachmentFileId: "",
            isNegative: true,
        },
        {
            month: "Novembro",
            date: "2024-11-15",
            type: "Transferência",
            amount: "750,00",
            attachmentFileId: "",
            isNegative: true,
        },
        {
            month: "Novembro",
            date: "2024-11-10",
            type: "Depósito",
            amount: "3.000,00",
            attachmentFileId: "",
            isNegative: false,
        },
        {
            month: "Novembro",
            date: "2024-11-01",
            type: "Depósito",
            amount: "2.000,00",
            attachmentFileId: "",
            isNegative: false,
        },
    ],
    investments: {
        totalAmount: "R$ 4.750,00",
        fixedIncome: {
            total: "R$ 2.250,00",
            governmentBonds: "R$ 500,00",
            privatePensionFixed: "R$ 500,00",
            fixedIncomeFunds: "R$ 1.250,00",
        },
        variableIncome: {
            total: "R$ 2.500,00",
            privatePensionVariable: "R$ 1.000,00",
            stockMarket: "R$ 1.000,00",
            investmentFunds: "R$ 500,00",
        },
    },
};

export default function Transactions() {
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);

    const toggleType = (type: string) => {
        setSelectedTypes((prev) =>
            prev.includes(type)
                ? prev.filter((t) => t !== type)
                : [...prev, type]
        );
    };

    const filteredTransactions = useMemo(() => {
        return userData.transactions.filter((t: any) => {
            const matchesType = selectedTypes.length
                ? selectedTypes.includes(t.type)
                : true;
            const matchesSearch =
                searchTerm.length === 0 ||
                t.amount
                    .replace(".", "")
                    .replace(",", "")
                    .includes(searchTerm.replace(/\D/g, ""));

            const matchesDate = selectedDate
                ? new Date(t.date).toDateString() ===
                  selectedDate.toDateString()
                : true;

            return matchesType && matchesSearch && matchesDate;
        });
    }, [selectedTypes, searchTerm, selectedDate, userData.transactions]);
    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <Text style={styles.title}>Lista de Transações</Text>

                {/* Filtros */}
                <View style={styles.filters}>
                    <Pressable
                        style={styles.filterButton}
                        onPress={() => setShowFilterModal(true)}
                    >
                        <Text style={styles.filterText}>Filtrar por tipo</Text>
                        <MaterialCommunityIcons
                            name="chevron-down"
                            size={16}
                            color="#004D61"
                        />
                    </Pressable>

                    <Pressable
                        style={styles.dateInput}
                        onPress={() => setShowDatePicker(true)}
                    >
                        <Text style={styles.filterText}>
                            {selectedDate
                                ? selectedDate.toLocaleDateString("pt-BR")
                                : "dd/mm/aaaa"}
                        </Text>
                        <MaterialCommunityIcons
                            name="calendar"
                            size={16}
                            color="#004D61"
                        />
                    </Pressable>

                    <TextInput
                        placeholder="Buscar"
                        placeholderTextColor="#004D61"
                        style={styles.searchInput}
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                    />
                </View>

                {/* Extrato */}
                <ScrollView style={{ marginTop: 15 }}>
                    <StatementCard transactions={filteredTransactions} />
                </ScrollView>

                {/* Modal de tipos */}
                <Modal
                    transparent
                    animationType="fade"
                    visible={showFilterModal}
                >
                    <Pressable
                        style={styles.modalBackground}
                        onPress={() => setShowFilterModal(false)}
                    >
                        <View style={styles.modalContent}>
                            {transactionTypes.map((type) => (
                                <TouchableOpacity
                                    key={type}
                                    onPress={() => toggleType(type)}
                                >
                                    <View style={styles.checkboxRow}>
                                        <MaterialCommunityIcons
                                            name={
                                                selectedTypes.includes(type)
                                                    ? "checkbox-marked"
                                                    : "checkbox-blank-outline"
                                            }
                                            size={20}
                                            color="#004D61"
                                        />
                                        <Text style={styles.checkboxLabel}>
                                            {type}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </Pressable>
                </Modal>

                {/* Date Picker */}
                {showDatePicker && (
                    <DateTimePicker
                        value={selectedDate || new Date()}
                        mode="date"
                        display="default"
                        onChange={(e, date) => {
                            setShowDatePicker(false);
                            if (date) setSelectedDate(date);
                        }}
                    />
                )}
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        borderRadius: 8,
        backgroundColor: "#CBCBCB",
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        textAlign: "center",
        color: "#004D61",
    },
    filters: {
        flexDirection: "row",
        gap: 10,
        marginTop: 20,
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    filterButton: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderColor: "#004D61",
        borderRadius: 6,
        minWidth: "30%",
    },
    dateInput: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderColor: "#004D61",
        borderRadius: 6,
        minWidth: "30%",
    },
    filterText: {
        color: "#004D61",
        marginRight: 4,
    },
    searchInput: {
        borderWidth: 1,
        borderColor: "#004D61",
        borderRadius: 6,
        paddingHorizontal: 10,
        flex: 1,
        color: "#004D61",
    },
    modalBackground: {
        flex: 1,
        backgroundColor: "#00000088",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#FFF",
        padding: 20,
        borderRadius: 8,
        width: "80%",
    },
    checkboxRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 6,
    },
    checkboxLabel: {
        marginLeft: 10,
        fontSize: 16,
        color: "#004D61",
    },
});
