import { Text, View, Button } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../context/auth-context";

export default function Index() {
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    login(); // Atualiza o contexto
    router.replace("/home"); // Redireciona para a área logada
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Você está deslogado.</Text>
      <Button title="Fazer login" onPress={handleLogin} />
    </View>
  );
}
