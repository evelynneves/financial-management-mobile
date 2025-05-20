import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import ConfirmEditModal from "./ConfirmEditModal";
import { useAuth } from "@/app/context/auth-context";

export type TransactionType =
    | "Depósito"
    | "Transferência"
    | "Investimento"
    | "Resgate";

export interface Transaction {
    id?: string;
    month: string;
    date: string;
    type: TransactionType;
    amount: number;
    investmentType?: string;
    attachmentFileId: string | null;
    isNegative: boolean;
}

export default function StatementCard({
    transactions,
    title,
}: {
    transactions: Transaction[];
    title?: string;
}) {
    const { refreshUserData } = useAuth();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] =
        useState<Transaction | null>(null);

    const formatCurrency = (value: number, isNegative?: boolean): string => {
        const prefix = isNegative ? "- R$" : "R$";
        return `${prefix} ${value.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
        })}`;
    };

    return (
        <View style={styles.card}>
            {title && (
                <View style={styles.header}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            )}

            {transactions.length === 0 ? (
                <Text style={styles.emptyMessage}>
                    🤖 Nenhuma transação por aqui ainda...{"\n"}
                    Vamos movimentar sua conta? 💸
                </Text>
            ) : (
                transactions.map((item, index) => (
                    <View key={index} style={styles.transaction}>
                        <View style={styles.row}>
                            <Text style={styles.month}>{item.month}</Text>
                            <View style={styles.iconGroup}>
                                <TouchableOpacity>
                                    <MaterialCommunityIcons
                                        name="eye"
                                        size={20}
                                        color="#004D61"
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        setSelectedTransaction(item);
                                        setShowEditModal(true);
                                    }}
                                >
                                    <MaterialCommunityIcons
                                        name="pencil"
                                        size={20}
                                        color="#004D61"
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        setSelectedTransaction(item);
                                        setShowConfirmModal(true);
                                    }}
                                >
                                    <MaterialCommunityIcons
                                        name="trash-can"
                                        size={20}
                                        color="#004D61"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <Text
                                style={[
                                    styles.type,
                                    item.isNegative && { color: "red" },
                                ]}
                            >
                                {item.type}
                            </Text>
                            <Text style={styles.date}>
                                {new Date(item.date).toLocaleDateString("pt-BR")}
                            </Text>
                        </View>

                        {item.investmentType && (
                            <Text style={styles.investmentType}>
                                {item.investmentType}
                            </Text>
                        )}

                        <Text
                            style={[
                                styles.amount,
                                item.isNegative
                                    ? { color: "#f44336" }
                                    : { color: "#000" },
                            ]}
                        >
                            {formatCurrency(item.amount, item.isNegative)}
                        </Text>

                        <View style={styles.separator} />
                    </View>
                ))
            )}

            <ConfirmDeleteModal
                visible={showConfirmModal}
                transaction={selectedTransaction}
                onClose={() => {
                    setShowConfirmModal(false);
                    setSelectedTransaction(null);
                }}
                onFinish={() => {
                    setShowConfirmModal(false);
                    setSelectedTransaction(null);
                    refreshUserData();
                }}
            />

            <ConfirmEditModal
                visible={showEditModal}
                transaction={selectedTransaction}
                onClose={() => {
                    setShowEditModal(false);
                    setSelectedTransaction(null);
                }}
                onFinish={() => {
                    setShowEditModal(false);
                    setSelectedTransaction(null);
                    refreshUserData();
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#F5F5F5",
        padding: 25,
        borderRadius: 8,
        gap: 15,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#000",
    },
    emptyMessage: {
        textAlign: "center",
        color: "#555",
        fontSize: 16,
        marginTop: 20,
        lineHeight: 22,
    },
    iconGroup: {
        flexDirection: "row",
        gap: 8,
    },
    transaction: {
        gap: 4,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    month: {
        color: "#47A138",
        fontWeight: "bold",
        fontSize: 16,
    },
    date: {
        color: "#8B8B8B",
        fontSize: 13,
        fontWeight: "300",
    },
    type: {
        fontSize: 14,
        fontWeight: "600",
    },
    investmentType: {
        fontSize: 12,
        color: "#444",
    },
    amount: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
    },
    separator: {
        height: 2,
        backgroundColor: "#47A138",
        marginTop: 8,
    },
});
