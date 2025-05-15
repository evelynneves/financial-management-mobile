import { Drawer } from "expo-router/drawer";
import { Image } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerStyle: {
            backgroundColor: "#004D61",
          },
          headerTintColor: "#FF5031",
			headerTitle: "",
			headerRight: () => (
				<Image
					source={require("@/assets/images/avatar.svg")}
					style={{ width: 40, height: 40, marginRight: 25 }}
					resizeMode="contain"
				/>
			),
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
          name="index"
          options={{
            drawerItemStyle: { display: "none" },
            title: "",
            headerLeft: () => null,
          }}
        />
        <Drawer.Screen
          name="home/index"
          options={{
            drawerLabel: "Início",
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
          name="transactions/index"
          options={{
            drawerLabel: "Transferências",
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
