import ScreenWrapper from "@/app/components/ScreenWrapper";
import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function Investments() {
    const total = "R$ 50.000,00";
    const rendaFixa = "R$ 36.000,00";
    const rendaVariavel = "R$ 14.000,00";

    const chartData = [
        {
            name: "Fundos de investimento",
            population: 10000,
            color: "#2567F9",
        },
        {
            name: "Tesouro Direto",
            population: 8000,
            color: "#8F3CFF",
        },
        {
            name: "Previdência Privada",
            population: 6000,
            color: "#FF3C82",
        },
        {
            name: "Bolsa de Valores",
            population: 14000,
            color: "#F1823D",
        },
    ];

    const formatToBRL = (value: number) =>
        `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <Text style={styles.title}>Investimentos</Text>
                <Text style={styles.total}>Total: {total}</Text>

                <View style={styles.incomeCard}>
                    <Text style={styles.incomeLabel}>Renda Fixa</Text>
                    <Text style={styles.incomeAmount}>{rendaFixa}</Text>
                </View>

                <View style={styles.incomeCard}>
                    <Text style={styles.incomeLabel}>Renda variável</Text>
                    <Text style={styles.incomeAmount}>{rendaVariavel}</Text>
                </View>

                <Text style={styles.statistics}>Estatísticas</Text>

                <View style={styles.chartCard}>
                    <PieChart
                        data={chartData.map((item) => ({
                            name: item.name,
                            population: item.population,
                            color: item.color,
                            legendFontColor: "#fff",
                            legendFontSize: 0,
                        }))}
                        width={Math.min(screenWidth - 64, 300)}
                        height={180}
                        style={{ alignSelf: "center" }}
                        chartConfig={{ color: () => "#fff" }}
                        accessor={"population"}
                        backgroundColor={"transparent"}
                        paddingLeft={"70"}
                        absolute
                        hasLegend={false}
                    />

                    <View style={styles.legend}>
                        {chartData.map((item, index) => (
                            <Text key={index} style={styles.legendItem}>
                                <Text style={{ color: item.color }}>● </Text>
                                {item.name} - {formatToBRL(item.population)}
                            </Text>
                        ))}
                    </View>
                </View>
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 30,
        borderRadius: 8,
        gap: 20,
        backgroundColor: "#CBCBCB",
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#000",
    },
    total: {
        fontSize: 25,
        color: "#004D61",
    },
    incomeCard: {
        backgroundColor: "#004D61",
        borderRadius: 8,
        padding: 16,
        width: "100%",
        alignItems: "center",
        gap: 15,
    },
    incomeLabel: {
        color: "#DADADA",
        fontSize: 16,
    },
    incomeAmount: {
        color: "#fff",
        fontSize: 20,
    },
    statistics: {
        fontSize: 20,
        color: "#000",
        paddingTop: 20,
    },
    chartCard: {
        backgroundColor: "#004D61",
        padding: 20,
        borderRadius: 8,
        gap: 20,
        alignItems: "center",
        width: "100%",
    },
    legend: {
        gap: 10,
    },
    legendItem: {
        color: "#fff",
        fontSize: 16,
    },
});
