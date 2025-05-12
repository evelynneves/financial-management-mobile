import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function UnloggedLayout() {
  return (
	<GestureHandlerRootView style={{ flex: 1 }}>
	  <Drawer
		screenOptions={{
		  headerStyle: {
			backgroundColor: "#004D61",
		  },
		  headerTintColor: "#fff",
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
			title: "",
		  }}
		/>
		<Drawer.Screen
		  name="about/index"
		  options={{
			drawerLabel: "Sobre",
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
