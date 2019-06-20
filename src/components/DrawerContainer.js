import React from "react";
import { StyleSheet, View } from "react-native";
import MenuButton from "./MenuButton";
import { AppIcon } from "../AppStyles";
import { connect } from "react-redux";

import { goto_home, goto_profile, logout } from "../actions";

const mapStateToProps = state => ({
  user: state.auth.user,
});
const mapDispatchToProps = (dispatch) => {
  return {
    goto_home: () => dispatch(goto_home()),
    goto_profile: () => dispatch(goto_profile()),
    logout: () => dispatch(logout()),
  };
}
class DrawerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'HOME',
    }
  }
  render() {
    const { navigation, goto_home, goto_profile, logout, user } = this.props;
    return (
      <View style={styles.content}>
        <View style={styles.container}>
          <MenuButton
            title="HOME"
            source={AppIcon.images.home}
            selected={this.state.selected == 'HOME'}
            onPress={() => {
              this.setState({ selected: 'HOME' });
              goto_home(user.user_type);
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="PROFILE"
            source={AppIcon.images.profile}
            selected={this.state.selected == 'PROFILE'}
            onPress={() => {
              this.setState({ selected: 'PROFILE' });
              goto_profile();
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="LOG OUT"
            source={AppIcon.images.logout}
            onPress={() => {
              logout();
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
export default connect(mapStateToProps, mapDispatchToProps)(DrawerContainer);