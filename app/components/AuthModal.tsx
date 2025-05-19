import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Image,
    Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
    visible: boolean;
    onClose: () => void;
    mode: "signup" | "login";
    onSuccess?: () => void;
}

export default function AuthModal({
    visible,
    onClose,
    mode,
    onSuccess,
}: Props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [accepted, setAccepted] = useState(false);
    const [error, setError] = useState("");
    const [focusedInput, setFocusedInput] = useState<
        "name" | "email" | "password" | null
    >(null);

    useEffect(() => {
        if (visible) {
            setName("");
            setEmail("");
            setPassword("");
            setAccepted(false);
            setError("");
        }
    }, [visible]);

    const isEmailValid = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const isFormValid = () => {
        if (!email || !isEmailValid(email) || !password) return false;
        if (mode === "signup" && (!name || !accepted)) return false;
        return true;
    };

    const handleSubmit = () => {
        setError("");

        if (mode === "login") {
            if (email === "evelyn.neves89@gmail.com" && password === "123456") {
                onSuccess?.();
                onClose();
            } else {
                setError(
                    "Email ou senha incorreto. Por favor, revise os dados e tente novamente."
                );
            }
        } else {
            if (!name || !password || !accepted) {
                setError("Preencha todos os campos e aceite os termos.");
                return;
            }
            onSuccess?.();
            onClose();
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <TouchableOpacity
                        onPress={onClose}
                        style={styles.closeButton}
                    >
                        <MaterialCommunityIcons
                            name="close"
                            size={24}
                            color="#000"
                        />
                    </TouchableOpacity>

                    <Image
                        source={
                            mode === "signup"
                                ? require("@/assets/images/illustration_registration.svg")
                                : require("@/assets/images/illustration_login.svg")
                        }
                        style={styles.image}
                        resizeMode="contain"
                    />

                    <Text style={styles.title}>
                        {mode === "signup"
                            ? "Preencha os campos abaixo para criar sua conta corrente!"
                            : "Login"}
                    </Text>
                    <View style={styles.inputWrapper}>
                        {mode === "signup" && (
                            <TextInput
                                placeholder="Digite seu nome completo *"
                                style={[
                                    styles.input,
                                    focusedInput === "name" && styles.inputFocused,
                                ]}
                                value={name}
                                onChangeText={setName}
                                onFocus={() => setFocusedInput("name")}
                                onBlur={() => setFocusedInput(null)}
                            />
                        )}

                        <TextInput
                            placeholder="Digite seu email *"
                            style={[
                                styles.input,
                                focusedInput === "email" && styles.inputFocused,
                                !!email &&
                                    !isEmailValid(email) &&
                                    styles.errorBorder,
                            ]}
                            value={email}
                            onChangeText={setEmail}
                            onFocus={() => setFocusedInput("email")}
                            onBlur={() => setFocusedInput(null)}
                            keyboardType="email-address"
                        />

                        {!!email && !isEmailValid(email) && (
                            <Text style={styles.errorText}>
                                Dado incorreto. Revise e digite novamente.
                            </Text>
                        )}

                        <TextInput
                            placeholder="Digite sua senha *"
                            secureTextEntry
                            style={[
                                styles.input,
                                focusedInput === "password" && styles.inputFocused,
                            ]}
                            value={password}
                            onChangeText={setPassword}
                            onFocus={() => setFocusedInput("password")}
                            onBlur={() => setFocusedInput(null)}
                        />

                        {mode === "signup" && (
                            <TouchableOpacity
                                style={styles.checkboxRow}
                                onPress={() => setAccepted((prev) => !prev)}
                            >
                                <MaterialCommunityIcons
                                    name={
                                        accepted
                                            ? "checkbox-marked"
                                            : "checkbox-blank-outline"
                                    }
                                    size={20}
                                    color="#004D61"
                                />
                                <Text style={styles.checkboxText}>
                                    Li e estou ciente quanto às condições de
                                    tratamento dos meus dados. *
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>


                    {!!error && <Text style={styles.errorText}>{error}</Text>}
                    {mode === "login" && (
                        <Text style={styles.forgot}>Esqueci a senha!</Text>
                    )}
                    <TouchableOpacity
                        style={[
                            styles.button,
                            !isFormValid() && styles.buttonDisabled,
                        ]}
                        onPress={handleSubmit}
                        disabled={!isFormValid()}
                    >
                        <Text style={styles.buttonText}>
                            {mode === "signup" ? "CRIAR CONTA" : "ACESSAR"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "#00000088",
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        width: "90%",
        backgroundColor: "#F8F8F8",
        borderRadius: 8,
        padding: 25,
        gap: 10,
    },
    image: {
        height: 200,
        width: "100%",
        marginBottom: 15,
    },
    closeButton: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 15,
        color: "#000",
    },
    inputWrapper: {
        flex: 1,
        marginBottom: 5,
        gap: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#004D61",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: Platform.OS === "ios" ? 14 : 10,
        fontSize: 16,
        color: "#8B8B8B",
    },
    inputFocused: {
        borderColor: "#003c4f",
    },
    errorBorder: {
        borderColor: "#BF1313",
    },
    checkboxRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 12,
    },
    checkboxText: {
        flex: 1,
        fontSize: 16,
        color: "#000",
        marginLeft: 8,
    },
    errorText: {
        color: "#BF1313",
        fontSize: 14,
        fontWeight: 500,
        marginTop: -15
    },
    button: {
        backgroundColor: "#FF5031",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonDisabled: {
        backgroundColor: "#ccc",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    forgot: {
        color: "#47A138",
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
        marginBottom: 8,
    },
});
