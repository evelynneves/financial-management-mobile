import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function StatementCard({transactions}: {transactions: any[]}) {
	return (
		<View style={styles.card}>
			<View style={styles.header}>
				<Text style={styles.title}>Extrato</Text>
			</View>

			{transactions.map((item, index) => (
			<View key={index} style={styles.transaction}>
				<View style={styles.row}>
					<Text style={styles.month}>{item.month}</Text>
					<View style={styles.iconGroup}>
						<TouchableOpacity>
							<MaterialCommunityIcons name="eye" size={20} color="#004D61" />
						</TouchableOpacity>
						<TouchableOpacity>
							<MaterialCommunityIcons name="pencil" size={20} color="#004D61"/>
						</TouchableOpacity>
						<TouchableOpacity>
							<MaterialCommunityIcons name="trash-can" size={20} color="#004D61" />
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.row}>
					<Text style={[styles.type, item.isNegative && { color: "red" }]}>
						{item.type}
					</Text>
					<Text style={styles.date}>
						{new Date(item.date).toLocaleDateString("pt-BR")}
					</Text>
				</View>

				{item.investmentType && (
					<Text style={styles.investmentType}>{item.investmentType}</Text>
				)}

				<Text
					style={[
						styles.amount,
						item.isNegative ? { color: "#f44336" } : { color: "#000" },
					]}
					>
					{item.isNegative ? `-R$ ${item.amount}` : `R$ ${item.amount}`}
				</Text>
				<View style={styles.separator} />
			</View>
			))}
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
