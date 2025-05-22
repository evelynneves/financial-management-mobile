import { View, Text, StyleSheet } from "react-native";

export default function Services() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Services</Text>
            <Text>Welcome to the services unlogged page!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
    },
});
