import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import ScreenWrapper from "@/app/components/ScreenWrapper";

const transactionTypes = [
    { label: "Depósito", value: "deposito" },
    { label: "Transferência", value: "transferencia" },
    { label: "Investimento", value: "investimento" },
    { label: "Resgate", value: "resgate" },
];

const investmentOptions = [
    { label: "Bolsa de Valores", value: "Bolsa de Valores" },
    { label: "Fundos de investimento", value: "Fundos de investimento" },
    { label: "Previdência Privada Fixa", value: "Previdência Privada Fixa" },
    {
        label: "Previdência Privada Variável",
        value: "Previdência Privada Variável",
    },
    { label: "Tesouro Direto", value: "Tesouro Direto" },
];

const NewTransaction = () => {
    const [transactionType, setTransactionType] = useState("deposito");
    const [investmentType, setInvestmentType] = useState("");
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [amount, setAmount] = useState("");

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <Text style={styles.title}>Nova transação</Text>

                <Text style={styles.label}>Selecione o tipo de transação</Text>
                <RNPickerSelect
                    onValueChange={setTransactionType}
                    value={transactionType}
                    items={transactionTypes}
                    style={pickerSelectStyles}
                />

                {(transactionType === "investimento" ||
                    transactionType === "resgate") && (
                    <>
                        <Text style={styles.label}>
                            {transactionType === "resgate"
                                ? "De qual investimento deseja resgatar?"
                                : "Tipo de Investimento"}
                        </Text>
                        <RNPickerSelect
                            onValueChange={setInvestmentType}
                            value={investmentType}
                            items={investmentOptions}
                            style={pickerSelectStyles}
                        />
                    </>
                )}

                <Text style={styles.label}>Data</Text>
                <TouchableOpacity
                    onPress={() => setShowDatePicker(true)}
                    style={styles.dateInput}
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
                    onChangeText={setAmount}
                    keyboardType="numeric"
                    placeholder="R$ 0,00"
                    style={styles.input}
                />

                <Text style={styles.label}>Anexar comprovante (opcional)</Text>
                <TouchableOpacity style={styles.uploadButton}>
                    <Text style={styles.uploadText}>Escolher arquivo</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.submitButton}>
                    <Text style={styles.submitText}>Concluir transação</Text>
                </TouchableOpacity>
            </View>
        </ScreenWrapper>
    );
};

export default NewTransaction;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        borderRadius: 8,
        backgroundColor: "#CBCBCB",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#000",
    },
    label: {
        fontSize: 16,
        color: "#444444",
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#004D61",
        color: "#444444",
        padding: 10,
        borderRadius: 8,
        backgroundColor: "#fff",
        fontSize: 16,
        marginBottom: 20,
    },
    dateInput: {
        borderWidth: 1,
        borderColor: "#004D61",
        padding: 12,
        borderRadius: 8,
        backgroundColor: "#fff",
        marginBottom: 20,
    },
    uploadButton: {
        borderWidth: 1,
        borderColor: "#004D61",
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 20,
    },
    uploadText: {
        color: "#004D61",
        fontSize: 16,
        fontWeight: "500",
    },
    submitButton: {
        backgroundColor: "#004D61",
        padding: 15,
        borderRadius: 6,
        marginTop: 20,
        alignItems: "center",
    },
    submitText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "400",
    },
});

const pickerSelectStyles = {
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#004D61",
        borderRadius: 8,
        backgroundColor: "#fff",
        color: "#004D61",
        marginBottom: 10,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: "##004D61",
        borderRadius: 8,
        backgroundColor: "#fff",
        color: "#004D61",
        marginBottom: 10,
    },
    inputWeb: {
        fontSize: 16,
        padding: 10,
        borderWidth: 1,
        borderColor: "#004D61",
        borderRadius: 8,
        backgroundColor: "#fff",
        color: "#004D61",
        marginBottom: 20,
    },
};
