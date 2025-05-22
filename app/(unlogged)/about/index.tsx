import { View, Text, StyleSheet } from "react-native";

export default function About() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>About</Text>
            <Text>Welcome to the about unlogged page!</Text>
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
