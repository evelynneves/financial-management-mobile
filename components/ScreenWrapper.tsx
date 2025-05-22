import React from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function ScreenWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {children}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#E4EDE3",
        padding: 30,
    },
});
