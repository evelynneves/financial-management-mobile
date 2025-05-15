import ScreenWrapper from "@/app/components/ScreenWrapper";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StatementCard from "@/app/components/StatementCard";

const userData = {
    name: "Joana",
    transactions: [
        {
            month: "Março",
            date: "2025-03-01",
            type: "Resgate",
            amount: "500,00",
            investmentType: "Previdência Privada Fixa",
            isNegative: false,
        },
        {
            month: "Janeiro",
            date: "2025-01-15",
            type: "Resgate",
            amount: "250,00",
            investmentType: "Fundos de Investimento",
            isNegative: false,
        },
        {
            month: "Janeiro",
            date: "2025-01-10",
            type: "Resgate",
            amount: "500,00",
            investmentType: "Tesouro Direto",
            isNegative: false,
        },
        {
            month: "Dezembro",
            date: "2024-12-20",
            type: "Investimento",
            amount: "1.000,00",
            investmentType: "Bolsa de Valores",
            isNegative: true,
        },
        {
            month: "Novembro",
            date: "2024-11-10",
            type: "Depósito",
            amount: "3.000,00",
            isNegative: false,
        },
    ],
};

export default function Home() {
    const [isVisible, setIsVisible] = useState(true);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.greeting}>Olá, Joana! :)</Text>
                    <Text style={styles.date}>Quinta-feira, 08/09/2022</Text>
                    <View style={styles.balanceContainer}>
                        <View style={styles.balanceHeader}>
                            <Text style={styles.balanceLabel}>Saldo</Text>
                            <TouchableOpacity onPress={toggleVisibility}>
                                <MaterialCommunityIcons
                                    name={isVisible ? "eye" : "eye-off"}
                                    size={20}
                                    color="#fff"
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.separator} />

                        <Text style={styles.accountType}>Conta Corrente</Text>
                        <Text style={styles.amount}>
                            {isVisible ? "R$ 2.500,00" : "••••••••"}
                        </Text>
                    </View>
                </View>
                <StatementCard transactions={userData.transactions} />
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 40,
        padding: 3,
    },
    card: {
        backgroundColor: "#004D61",
        borderRadius: 8,
        padding: 20,
        gap: 10,
        alignItems: "center",
    },
    greeting: {
        color: "#fff",
        fontSize: 25,
        fontWeight: 500,
    },
    date: {
        color: "#fff",
        fontSize: 13,
        fontWeight: 300,
        paddingBottom: 15,
    },
    balanceContainer: {
        gap: 10,
    },
    balanceHeader: {
        flexDirection: "row",
        gap: 20,
        alignItems: "center",
    },
    balanceLabel: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    separator: {
        height: 1,
        width: 180,
        backgroundColor: "#fff",
    },
    accountType: {
        color: "#fff",
        fontSize: 16,
    },
    amount: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
    },
});
