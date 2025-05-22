import ScreenWrapper from "@/components/ScreenWrapper";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StatementCard from "@/components/StatementCard";
import { useAuth } from "@/context/auth-context";

export default function Home() {
    const { user, userData } = useAuth();
    const [isVisible, setIsVisible] = useState(true);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const today = new Date();
    const formattedDate = new Intl.DateTimeFormat("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(today);

    const calculateBalance = (): string => {
        if (!userData?.transactions) return "R$ 0,00";

        const total = userData.transactions.reduce((acc, transaction) => {
            const raw = transaction.amount.toString();
            const cleaned = raw.replace("R$ ", "").replace(/\./g, "").replace(",", ".");
            const amount = parseFloat(cleaned);

            return transaction.isNegative ? acc - amount : acc + amount;
        }, 0);

        return total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    };

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.greeting}>
                        Olá, {(user?.displayName?.split(" ")[0] || "usuário")}! :)
                    </Text>
                    <Text style={styles.date}>{formattedDate}</Text>

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
                            {isVisible ? calculateBalance() : "••••••••"}
                        </Text>
                    </View>
                </View>

                <StatementCard
                    transactions={userData ? userData.transactions : []}
                    title="Extrato"
                />
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
        fontWeight: "500",
    },
    date: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "300",
        paddingBottom: 15,
        textTransform: "capitalize",
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
