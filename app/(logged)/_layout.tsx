import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import UserMenu from "@/components/UserMenu";

export default function LoggedLayout() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/(unlogged)");
        }
    }, [loading, user]);

    if (loading || (!user && !loading)) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" color="#004D61" />
            </View>
        );
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "#004D61",
                    },
                    headerTintColor: "#FF5031",
                    headerTitle: "",
                    headerRight: () => <UserMenu />,
                    drawerStyle: {
                        backgroundColor: "#E4EDE3",
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                    },
                    drawerItemStyle: {
                        borderRadius: 0,
                    },
                    drawerLabelStyle: {
                        fontWeight: "bold",
                    },
                    drawerActiveTintColor: "#FF5031",
                    drawerInactiveTintColor: "#000000",
                    drawerActiveBackgroundColor: "transparent",
                }}
            >
                <Drawer.Screen
                    name="home/index"
                    options={{
                        drawerLabel: "Início",
                        title: "",
                    }}
                />
                <Drawer.Screen
                    name="new-transaction/index"
                    options={{
                        drawerLabel: "Nova Transação",
                        title: "",
                    }}
                />
                <Drawer.Screen
                    name="transactions/index"
                    options={{
                        drawerLabel: "Transações",
                        title: "",
                    }}
                />
                <Drawer.Screen
                    name="investments/index"
                    options={{
                        drawerLabel: "Investimentos",
                        title: "",
                    }}
                />
                <Drawer.Screen
                    name="services/index"
                    options={{
                        drawerLabel: "Outros serviços",
                        title: "",
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}
