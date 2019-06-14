import { createStackNavigator } from 'react-navigation';
import OrderScreen from "../../screens/OrderScreen";
import styles from "../_style";

export default OrderStack = createStackNavigator(
  {
    Order: { screen: OrderScreen },
  },
  {
    initialRouteName: "Order",
    headerMode: "float",

    headerLayoutPreset: "center",
    navigationOptions: ({ navigation }) => ({
      headerTintColor: "red",
      headerTitleStyle: styles.headerTitleStyle
    }),
    cardStyle: { backgroundColor: "#FFFFFF" }
  }
);