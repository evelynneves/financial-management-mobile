import ScreenWrapper from "@/components/ScreenWrapper";
import StatementCard from "@/components/StatementCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
    View,
    Text,
    Pressable,
    TextInput,
    Modal,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAuth } from "@/context/auth-context";

const transactionTypes = [
    "Resgate",
    "Investimento",
    "Transferência",
    "Depósito",
];

export default function Transactions() {
    const { userData } = useAuth();
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const isFiltered = selectedTypes.length > 0 || searchTerm.length > 0 || selectedDate !== null;

    const toggleType = (type: string) => {
        setSelectedTypes((prev) =>
            prev.includes(type)
                ? prev.filter((t) => t !== type)
                : [...prev, type]
        );
    };

    const filteredTransactions = useMemo(() => {
        if (!userData?.transactions) return [];
        return userData.transactions.filter((t: any) => {
            const matchesType = selectedTypes.length
                ? selectedTypes.includes(t.type)
                : true;
            const matchesSearch =
                searchTerm.length === 0 ||
                String(t.amount)
                    .replace(/\D/g, "")
                    .includes(searchTerm.replace(/\D/g, ""));

            const matchesDate = selectedDate
                ? new Date(t.date).toDateString() ===
                  selectedDate.toDateString()
                : true;

            return matchesType && matchesSearch && matchesDate;
        });
    }, [selectedTypes, searchTerm, selectedDate, userData?.transactions]);
    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Lista de Transações</Text>

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
                <StatementCard transactions={filteredTransactions} isFiltered={isFiltered} />
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        borderRadius: 8,
        backgroundColor: "#FFF",
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
        borderRadius: 8,
        minWidth: "30%",
    },
    dateInput: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderColor: "#004D61",
        borderRadius: 8,
        minWidth: "30%",
    },
    filterText: {
        color: "#004D61",
        marginRight: 4,
    },
    searchInput: {
        borderWidth: 1,
        borderColor: "#004D61",
        borderRadius: 8,
        paddingHorizontal: 10,
        color: "#004D61",
        width: "100%"
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
