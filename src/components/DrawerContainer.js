import React from "react";
import { StyleSheet, View } from "react-native";
import MenuButton from "./MenuButton";
import { AppIcon } from "../AppStyles";

export default class DrawerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'HOME',
    }
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.content}>
        <View style={styles.container}>
          <MenuButton
            title="HOME"
            source={AppIcon.images.home}
            selected={this.state.selected == 'HOME'}
            onPress={() => {
              this.setState({ selected: 'HOME' });
              navigation.dispatch({ type: "HOME" });
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="PROFILE"
            source={AppIcon.images.profile}
            selected={this.state.selected == 'PROFILE'}
            onPress={() => {
              this.setState({ selected: 'PROFILE' });
              navigation.dispatch({ type: "PROFILE" });
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="LOG OUT"
            source={AppIcon.images.logout}
            onPress={() => {
              navigation.dispatch({ type: "Logout" });
              navigation.closeDrawer();
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    paddingHorizontal: 20
  }
});
