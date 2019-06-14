import React from "react";
import { StyleSheet, Text, View, } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from "react-native-button";
import { AppStyles } from "../AppStyles";
// import firebase from "react-native-firebase";
import { ValidateTypes, FieldTypes } from '../Globals';
import InputField from "../components/InputField";

class SignupScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
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
  }

  componentDidMount() {
    // this.authSubscription = firebase.auth().onAuthStateChanged(user => {
    //   this.setState({
    //     loading: false,
    //     user
    //   });
    // });
  }

  componentWillUnmount() {
    // this.authSubscription();
  }

  onRegister = () => {
    const { fields } = this.state;
    this.setState({ submitted: true });
    for (key in fields) {
      if (fields[key].error) {
        return;
      }
    }
    const { navigation } = this.props;
    const user = {
      email: "Test@mail.com",
      fullname: "Test User",
      phone: "1230-121-2123",
      appIdentifier: "rn-android-universal-listings"
    };
    navigation.dispatch({ type: "Login", user: user });



    // firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then(response => {
    //     const { navigation } = this.props;
    //     const { fullname, phone, email } = this.state;
    //     const data = {
    //       email: email,
    //       fullname: fullname,
    //       phone: phone,
    //       appIdentifier: "rn-android-universal-listings"
    //     };
    //     user_uid = response.user._user.uid;
    //     firebase
    //       .firestore()
    //       .collection("users")
    //       .doc(user_uid)
    //       .set(data);
    //     firebase
    //       .firestore()
    //       .collection("users")
    //       .doc(user_uid)
    //       .get()
    //       .then(function(user) {
    //         navigation.dispatch({ type: "Login", user: user });
    //       })
    //       .catch(function(error) {
    //         const { code, message } = error;
    //         alert(message);
    //       });
    //   })
    //   .catch(error => {
    //     const { code, message } = error;
    //     alert(message);
    //   });

  };
  updateState(name, value, error) {
    var fields = { ...this.state.fields };
    fields[name] = { value, error };
    this.setState({ fields })
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
            onPress={() => this.onRegister()}>Sign Up</Button>
        </View>
      </KeyboardAwareScrollView>
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

export default SignupScreen;
