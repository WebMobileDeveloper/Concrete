import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from "react-native-button";
import firebase from "react-native-firebase";
import { connect } from 'react-redux';
import AsyncStorage from "@react-native-community/async-storage";

import { AppStyles } from "../AppStyles";
import { ValidateTypes, FieldTypes } from '../Globals';
import InputField from "../components/InputField";
import { show_loading, hide_loading } from '../actions';
import { show_toast } from '../utils/func';

class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        fullname: { value: '', error: true, },
        phone: { value: '', error: true, },
        email: { value: '', error: true, },
        password: { value: '', error: true, },
        confirm: { value: '', error: true, },
      },
      submitted: false,
    };
    this.updateState = this.updateState.bind(this);
    this.onSubmint = this.onSubmint.bind(this);
    this.onRegister = this.onRegister.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }

  updateState(name, value, error) {
    var fields = { ...this.state.fields };
    fields[name] = { value, error };
    this.setState({ fields })
  }
  onSubmint() {
    this.setState({ submitted: true }, () => this.onRegister());
  }
  onRegister() {
    const self = this;
    const { fields } = self.state;
    for (key in fields) {
      if (fields[key].error) {
        return;
      }
    }
    const { fullname, phone, email, password } = this.state.fields;

    this.props.dispatch(show_loading());
    firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .then(response => {
        const user = {
          uid: response.user._user.uid,
          fullname: fullname.value,
          email: email.value,
          phone: phone.value,
          password: password.value,
          user_type: 'client'
        };
        self.saveUser(user);
      })
      .catch(error => {
        self.onError(error)
      });
  };
  saveUser(user) {
    const self = this;
    firebase.database().ref('users/' + user.uid).set(user, function (error) {
      if (error) {
        self.onError(error)
      } else {
        self.onSuccess(user)
      }
    });
  }
  onSuccess(user) {
    const { navigation } = this.props;
    AsyncStorage.setItem("@loggedInUser:uid", user.uid);
    AsyncStorage.setItem("@loggedInUser:email", user.email);
    AsyncStorage.setItem("@loggedInUser:password", user.password);

    this.props.dispatch(hide_loading());
    show_toast("Signup Success!");
    navigation.dispatch({ type: "Login", user: user });
  }
  onError(error) {
    this.props.dispatch(hide_loading())
    const { code, message } = error;
    alert(message);
  }

  render() {
    return (
      <KeyboardAwareScrollView >
        <View style={styles.container}>
          <Text style={[styles.title]}>Create new account</Text>

          <InputField name="fullname" type={FieldTypes.text} placeholder="Full Name" submitted={this.state.submitted} onUpdate={this.updateState}
            validations={[ValidateTypes.required]} />

          <InputField name="phone" type={FieldTypes.phone} placeholder="Phone number" submitted={this.state.submitted} onUpdate={this.updateState}
            validations={[ValidateTypes.required, ValidateTypes.phone]} maskString="+61 [000] [000] [000]" />

          <InputField name="email" type={FieldTypes.email} placeholder="E-mail Address" submitted={this.state.submitted} onUpdate={this.updateState}
            validations={[ValidateTypes.required, ValidateTypes.email]} />

          <InputField name="password" type={FieldTypes.password} placeholder="Password" submitted={this.state.submitted} onUpdate={this.updateState}
            validations={[ValidateTypes.required]} />

          <InputField name="confirm" type={FieldTypes.password} placeholder="Confirm password" submitted={this.state.submitted} onUpdate={this.updateState}
            validations={[ValidateTypes.match]} matchText={this.state.fields.password.value} />
          <Button
            containerStyle={[styles.facebookContainer, { marginTop: 50 }]}
            style={styles.facebookText}
            onPress={() => this.onSubmint()}>Sign Up</Button>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: "bold",
    color: AppStyles.color.facebook,
    marginTop: 20,
    marginBottom: 20
  },
  leftTitle: {
    alignSelf: "stretch",
    textAlign: "left",
    marginLeft: 20
  },

  InputContainer: {
    width: AppStyles.textInputWidth.main,
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
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30
  },
  facebookText: {
    color: AppStyles.color.white
  }
});

export default connect()(SignupScreen);
