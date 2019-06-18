import { createStackNavigator } from 'react-navigation';
import HomeScreen from "../../screens/HomeScreen";
import styles from "../_style";


export default HomeStack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
  },
  {
    initialRouteName: "Home",
    headerMode: "float",

    headerLayoutPreset: "center",
    navigationOptions: ({navigation}) => {
      return ({
        // headerTintColor: "red",
        headerTitleStyle: styles.headerTitleStyle,

      })
    },

  }
);