import React from "react";
import Button from "react-native-button";
import { Text, View, StyleSheet, ActivityIndicator, Image, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import { AppStyles } from "../AppStyles";
import firebase from "react-native-firebase";

class WelcomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }
  componentDidMount(){
    this.tryToLoginFirst();
  }
  async tryToLoginFirst() {
    const uid = await AsyncStorage.getItem("@loggedInUser:uid");
    const email = await AsyncStorage.getItem("@loggedInUser:email");
    const password = await AsyncStorage.getItem("@loggedInUser:password");
    const self = this;
    if (uid && password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          firebase
            .database()
            .ref('users/' + uid).on('value', ({ _value }) => {
              self.onSubmit(_value);
            })
        })
        .catch(error => {
          self.onSubmit(null);
        });
    } else {
      self.onSubmit(null);
    }
  }
  onSubmit(user) {
    const self = this;
    this.setState({ isLoading: false }, () => {
      if (user) {
        const { navigation } = self.props;
        navigation.dispatch({ type: "Login", user: user });
      }
    })
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container} >
          <ActivityIndicator
            style={styles.spinner}
            size="large"
            color={AppStyles.color.white} />
        </View>
      );
    }
    return (
      <View style={styles.container} >
        {/* <ImageBackground style={styles.container} source={require('../../assets/images/login_back3.jpg')}> */}
        {/* <View style={styles.overlay} /> */}
        <Image style={styles.logo} source={require('../../assets/images/logo.png')} />
        <Text style={styles.subtitle}>WELCOME TO</Text>
        <Text style={styles.title}>CONCRETE DIRECT</Text>
        <Button
          containerStyle={styles.loginContainer}
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate("Login")}>Log In</Button>
        <Button
          containerStyle={styles.signupContainer}
          style={styles.signupText}
          onPress={() => this.props.navigation.navigate("Terms")}>Sign Up</Button>
        {/* </ImageBackground> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 50,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: AppStyles.color.facebook,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(50,45,150,0.7)',
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  subtitle: {
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.white,
    textAlign: "center",
    marginTop: 50,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: "bold",
    color: AppStyles.color.white,
    textAlign: "center",
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20
  },
  loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.main,
    // borderColor: AppStyles.color.white,
    borderRadius: AppStyles.borderRadius.main,
    // borderWidth: 1,
    padding: 10,
    marginTop: 30
  },
  loginText: {
    color: AppStyles.color.white
  },
  signupContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.blue,
    borderRadius: AppStyles.borderRadius.main,
    padding: 8,
    borderWidth: 1,
    borderColor: AppStyles.color.blue,
    marginTop: 15
  },
  signupText: {
    color: AppStyles.color.white
  },
  spinner: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default WelcomeScreen;
