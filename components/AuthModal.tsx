/******************************************************************************
*                                                                             *
* Creation Date : 16/04/2025                                                  *
*                                                                             *
* Property : (c) This program, code or item is the Intellectual Property of   *
* Evelyn Neves Barreto. Any use or copy of this code is prohibited without    *
* the express written authorization of Evelyn. All rights reserved.           *
*                                                                             *
*******************************************************************************/

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
    ActivityIndicator,
    KeyboardAvoidingView,
    ScrollView,
    Keyboard,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useAuth } from "@/context/auth-context";

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
    const { login, signUp } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [accepted, setAccepted] = useState(false);
    const [error, setError] = useState("");
    const [focusedInput, setFocusedInput] = useState<
        "name" | "email" | "password" | null
    >(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (visible) {
            setName("");
            setEmail("");
            setPassword("");
            setAccepted(false);
            setError("");
            setIsLoading(false);
        }
    }, [visible]);

    const isEmailValid = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const isFormValid = () => {
        if (!email || !isEmailValid(email) || !password) return false;
        if (mode === "signup" && (!name || !accepted)) return false;
        return true;
    };

    const handleSubmit = async () => {
        setError("");
        setIsLoading(true);

        try {
            if (mode === "login") {
                await login(email, password);
            } else {
                if (!name || !password || !accepted) {
                    setError("Preencha todos os campos e aceite os termos.");
                    setIsLoading(false);
                    return;
                }
                await signUp(email, password, name);
            }

            onSuccess?.();
            onClose();
        } catch (err: any) {
            console.error(err);
            switch (err.code) {
                case "auth/user-not-found":
                case "auth/wrong-password":
                    setError("Email ou senha incorreto. Por favor, revise os dados e tente novamente.");
                    break;
                case "auth/email-already-in-use":
                    setError("Este email já está cadastrado.");
                    break;
                case "auth/invalid-email":
                    setError("Email inválido.");
                    break;
                case "auth/weak-password":
                    setError("A senha deve ter pelo menos 6 caracteres.");
                    break;
                default:
                    setError("Erro ao autenticar. Tente novamente.");
                    break;
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <KeyboardAvoidingView
                    style={styles.modalWrapper}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={Keyboard.dismiss}
                        style={{ flex: 1 }}
                    >
                        <ScrollView
                            contentContainerStyle={styles.modal}
                            keyboardShouldPersistTaps="handled"
                        >
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
                                        ? require("@/assets/images/illustration_registration.png")
                                        : require("@/assets/images/illustration_login.png")
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

                                {!!error && <Text style={styles.errorText}>{error}</Text>}

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
                                            color="#47A138"
                                        />
                                        <Text style={styles.checkboxText}>
                                            Li e estou ciente quanto às condições de
                                            tratamento dos meus dados. *
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>

                            {mode === "login" && (
                                <Text style={styles.forgot}>Esqueci a senha</Text>
                            )}

                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    (!isFormValid() || isLoading) && styles.buttonDisabled,
                                ]}
                                onPress={handleSubmit}
                                disabled={!isFormValid() || isLoading}
                            >
                                {isLoading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.buttonText}>
                                        {mode === "signup" ? "CRIAR CONTA" : "ACESSAR"}
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </ScrollView>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
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
    modalWrapper: {
        flex: 1,
        width: "100%",
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
        fontSize: 16,
        textAlign: "center",
        marginBottom: 16,
        fontWeight: "bold",
        color: "#000",
    },
    inputWrapper: {
        marginBottom: 5,
        gap: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#DEE9EA",
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
        fontWeight: "500",
        marginTop: -15,
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
        fontWeight: "bold",
        textAlign: "right",
        marginBottom: 8,
    },
});
