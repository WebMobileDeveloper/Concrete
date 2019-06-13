import React from "react";
import Button from "react-native-button";
import { Text, View, StyleSheet, ActivityIndicator, Image, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import { AppStyles } from "../AppStyles";
// import firebase from "react-native-firebase";

class WelcomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
    this.tryToLoginFirst();
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

  async tryToLoginFirst() {
    const email = await AsyncStorage.getItem("@loggedInUserID:key");
    const password = await AsyncStorage.getItem("@loggedInUserID:password");
    const id = await AsyncStorage.getItem("@loggedInUserID:id");
    if (
      id != null &&
      id.length > 0 &&
      password != null &&
      password.length > 0
    ) {
      // firebase
      //   .auth()
      //   .signInWithEmailAndPassword(email, password)
      //   .then(user => {
      //     const { navigation } = this.props;
      //     firebase
      //       .firestore()
      //       .collection("users")
      //       .doc(id)
      //       .get()
      //       .then(function(doc) {
      //         var dict = {
      //           id: id,
      //           email: email,
      //           profileURL: doc.photoURL,
      //           fullname: doc.displayName
      //         };
      //         if (doc.exists) {
      //           navigation.dispatch({
      //             type: "Login",
      //             user: dict
      //           });
      //         }
      //       })
      //       .catch(function(error) {
      //         const { code, message } = error;
      //         alert(message);
      //       });
      //     this.state.isLoading = false;
      //   })
      //   .catch(error => {
      //     const { code, message } = error;
      //     alert(message);
      //     // For details of error codes, see the docs
      //     // The message contains the default Firebase string
      //     // representation of the error
      //   });
      const { navigation } = this.props;
      var dict = {
        id: id,
        email: email,
        profileURL: "",
        fullname: "Test User"
      };

      navigation.dispatch({
        type: "Login",
        user: dict
      });

      this.setState({ isLoading: false });
      return;
    }
    // const fbToken = await AsyncStorage.getItem(
    //   "@loggedInUserID:facebookCredentialAccessToken"
    // );
    // if (id != null && id.length > 0 && fbToken != null && fbToken.length > 0) {
    //   const credential = firebase.auth.FacebookAuthProvider.credential(fbToken);
    //   firebase
    //     .auth()
    //     .signInWithCredential(credential)
    //     .then(result => {
    //       var user = result.user;
    //       var userDict = {
    //         id: user.uid,
    //         fullname: user.displayName,
    //         email: user.email,
    //         profileURL: user.photoURL
    //       };
    //       this.props.navigation.dispatch({
    //         type: "Login",
    //         user: userDict
    //       });
    //     })
    //     .catch(error => {
    //       this.setState({ isLoading: false });
    //     });
    //   return;
    // }
    this.setState({ isLoading: false });
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
