import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { connect } from 'react-redux';
import Button from "react-native-button";
import firebase from "react-native-firebase";
import { AppStyles } from "../../AppStyles";
import { show_toast } from '../../utils/func';
import { loged_in, show_loading, hide_loading } from "../../actions";


const mapStateToProps = state => ({
  // user: state.auth.user,
  // ordersList: state.app.ordersList,
});
const mapDispatchToProps = (dispatch) => {
  return {
    loged_in: (user) => dispatch(loged_in(user)),
    show_loading: () => dispatch(show_loading()),
    hide_loading: () => dispatch(hide_loading()),
  };
}

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      email: "cjrconcretepumping@live.com.au",
      password: "admin333"
      // email: "aaa@a.com",
      // password: "jhcjhc123"
    };
    this.onPressLogin = this.onPressLogin.bind(this);
    this.getUser = this.getUser.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }

  onPressLogin() {
    const self = this;
    const { email, password } = self.state;
    if (email.length <= 0 || password.length <= 0) {
      alert("Please fill out the required fields.");
      return;
    }
    this.props.show_loading();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        self.getUser(response.user._user.uid);
      })
      .catch(error => {
        self.onError(error);
      });
  };
  getUser(uid) {
    const self = this;
    firebase.database().ref('users/' + uid).once('value', ({ _value }) => {
      if (_value) {
        self.onSuccess(_value);
      } else {
        self.onError({ message: "User does not exist. Please try again." });
      }
    })
  }
  onSuccess(user) {
    this.props.hide_loading();
    show_toast("Login Success!");
    this.props.loged_in(user);
  }
  onError(error) {
    this.props.hide_loading();
    const { message } = error;
    alert(message);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, styles.leftTitle]}>Sign In</Text>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="E-mail"
            onChangeText={text => this.setState({ email: text })}
            value={this.state.email}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={text => this.setState({ password: text })}
            value={this.state.password}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        <Button
          containerStyle={styles.loginContainer}
          style={styles.loginText}
          onPress={() => this.onPressLogin()}>Log in</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: "bold",
    color: AppStyles.color.tint,
    marginTop: 20,
    marginBottom: 20
  },
  leftTitle: {
    alignSelf: "stretch",
    textAlign: "left",
    marginLeft: 20
  },
  or: {
    fontFamily: AppStyles.fontName.main,
    color: "black",
    marginTop: 40,
    marginBottom: 10
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: "center",
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text
  },
  loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30
  },
  loginText: {
    color: AppStyles.color.white
  },
  placeholder: {
    fontFamily: AppStyles.fontName.text,
    color: "red"
  },
  InputContainer: {
    width: AppStyles.textInputWidth.sub,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text
  },
  facebookContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.facebook,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30
  },
  facebookText: {
    color: AppStyles.color.white
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
