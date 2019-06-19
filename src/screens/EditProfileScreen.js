import React from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Divider } from 'react-native-elements';
import firebase from "react-native-firebase";

import Button from "react-native-button";

import { AppStyles, AppIcon } from "../AppStyles";
import { Configuration } from "../Configuration";
import { ValidateTypes, FieldTypes, } from '../Globals';
import InputField from "../components/InputField";
import { show_loading, hide_loading } from '../actions';
import { show_toast } from '../utils/func';
import HeaderLeft from "../components/HeaderLeft";
import HeaderButton from "../components/HeaderButton";



class EditProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Edit Profile",
    headerLeft: <HeaderLeft navigation={navigation} />,
    headerRight: <HeaderButton icon={AppIcon.images.profile} onPress={() => navigation.navigate('ProfileStack')} />
  });

  constructor(props) {
    super(props);
    this.initState = {
      clear: false,
      submitted: false,
      user: {},
      fields: {
        email: { value: '', error: true, },
        fullname: { value: '', error: true, },
        password: { value: '', error: true, },
        phone: { value: '', error: true, },
        uid: { value: '', error: true },
        user_type: { value: '', error: true },
        address: { value: '', error: false, },
        suburb: { value: '', error: false, },
        company_name: { value: '', error: false, },
        about: { value: '', error: false, },
      },

      multilineHeight: 100,
    };
    this.state = this.initState;
    this.updateState = this.updateState.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { user } = nextProps;
    if (JSON.stringify(user) !== JSON.stringify(prevState.user)) {
      let newState = prevState;
      newState.user = user;
      for (key in user) {
        newState.fields[key] = { value: user[key], error: false }
      }
      return (newState);
    }
    else return null;
  }
  updateState(name, value, error) {
    var fields = { ...this.state.fields };
    fields[name] = { value, error };
    this.setState({ fields });
  }
  onSubmint() {
    this.setState({ submitted: true }, () => this.onSave());
  };
  onSave() {
    const { fields } = this.state;
    const { user } = this.props;
    for (key in fields) {
      if (fields[key].error) {
        alert("Sorry, Please confirm all fields!");
        return;
      }
    }
    let data = {}
    for (key in fields) {
      data[key] = fields[key].value;
    }
    data.uid = user.uid;
    Alert.alert(
      'Confirm',
      'Are you sure want to send request?',
      [
        { text: 'YES', onPress: () => this.saveData(data) },
        { text: 'NO', onPress: () => { } },
      ]
    );
  }
  saveData(data) {
    const self = this;
    this.props.dispatch(show_loading());
    firebase.database().ref('users/' + data.uid).set(data, function (error) {
      if (error) {
        self.onError(error);
      } else {
        self.onSuccess(data);
      }
    })
  }
  onSuccess(user) {
    const { navigation } = this.props;
    let newState = { ...this.initState };
    newState.user = user;
    for (key in user) {
      newState.fields[key] = { value: user[key], error: false }
    }
    this.setState({ clear: true })
    this.setState(newState);

    this.props.dispatch(hide_loading());
    show_toast("Update Success!");
    this.props.dispatch({ type: "PROFILE_UPDATED", user: user });
  }
  onError(error) {
    this.props.dispatch(hide_loading());
    const { code, message } = error;
    Alert.alert('Submit Error', message);
  }
  render() {
    return (
      <View style={styles.container}>
        {!this.state.clear &&
          <KeyboardAwareScrollView style={styles.scrollContainer} contentContainerStyle={{ alignItems: 'center', }}>
            <View style={{ width: '100%' }}>
              {/* ==========  - Account Info ==================== */}
              <Text style={styles.sectionTitle}>{'- Account Info'}</Text>

              <RenderItem title="E-mail Address *">
                <Text style={{ paddingLeft: 20, marginTop: 10, marginBottom: 20, }}>{this.state.fields.email.value}</Text>
              </RenderItem>

              <RenderItem title="Your Full Name *">
                <InputField name="fullname"
                  type={FieldTypes.text}
                  submitted={this.state.submitted}
                  onUpdate={this.updateState}
                  validations={[ValidateTypes.required]}
                  borderRadius={0}
                  marginBottom={0}
                  width={'100%'}
                  defaultValue={this.state.fields.fullname.value} />
              </RenderItem>

              <RenderItem title="Phone Number *">
                <InputField name="phone"
                  type={FieldTypes.phone}
                  placeholder="Phone number"
                  submitted={this.state.submitted}
                  onUpdate={this.updateState}
                  validations={[ValidateTypes.required, ValidateTypes.phone]}
                  maskString="+61 000 000 000"
                  borderRadius={0}
                  marginBottom={0}
                  width={'100%'}
                  defaultValue={this.state.fields.phone.value} />
              </RenderItem>

              <Divider style={styles.divider} />



              {/* ==========  - Company Info ==================== */}

              <Text style={styles.sectionTitle}>{'- Company Info'}</Text>

              <RenderItem title="Company Name">
                <InputField name="company_name"
                  type={FieldTypes.text}
                  submitted={this.state.submitted}
                  onUpdate={this.updateState}
                  // validations={[ValidateTypes.required]}
                  borderRadius={0}
                  marginBottom={0}
                  width={'100%'}
                  defaultValue={this.state.fields.company_name.value} />
              </RenderItem>

              <RenderItem title="Address">
                <InputField name="address"
                  type={FieldTypes.text}
                  submitted={this.state.submitted}
                  onUpdate={this.updateState}
                  // validations={[ValidateTypes.required]}
                  borderRadius={0}
                  marginBottom={0}
                  width={'100%'}
                  defaultValue={this.state.fields.address.value} />
              </RenderItem>

              <RenderItem title="Suburb">
                <InputField name="suburb"
                  type={FieldTypes.text}
                  submitted={this.state.submitted}
                  onUpdate={this.updateState}
                  // validations={[ValidateTypes.required]}
                  borderRadius={0}
                  marginBottom={0}
                  width={'100%'}
                  defaultValue={this.state.fields.suburb.value} />
              </RenderItem>

              <Divider style={styles.divider} />


              {/* ==========  - Other Informations ==================== */}
              <Text style={styles.sectionTitle}>{'- Other Informations'}</Text>

              <RenderItem title="About Me">
                <TextInput name="about"
                  onChangeText={(text) => this.updateState("about", text, false)}
                  style={[styles.multilineText, { height: this.state.multilineHeight }]}
                  multiline={true}
                  onContentSizeChange={(event) => {
                    this.setState({ multilineHeight: Math.max(100, event.nativeEvent.contentSize.height + 20) })
                  }}
                  value={this.state.fields.about.value}
                />
              </RenderItem>
              <Text style={styles.description}>
                {`* This information will use as default value when you send order/quote.`}</Text>
            </View>
          </KeyboardAwareScrollView>
        }
        <View style={styles.buttonWrapper}>
          <Button containerStyle={styles.sendButton}
            style={styles.buttonText}
            onPress={() => this.onSubmint()}>Update Profile</Button>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: Configuration.home.listing_item.offset,
  },
  buttonWrapper: {
    backgroundColor: "#eee",
    width: '100%',
    alignItems: 'center',
  },
  sendButton: {
    width: AppStyles.buttonWidth.main,
    borderRadius: AppStyles.borderRadius.main,
    backgroundColor: AppStyles.color.facebook,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: AppStyles.color.white
  },
  title: {
    fontFamily: AppStyles.fontName.bold,
    fontWeight: "bold",
    color: AppStyles.color.title,
    fontSize: 25
  },
  subTitle: {
    fontFamily: AppStyles.fontName.bold,
    // fontWeight: "bold",
    color: AppStyles.color.facebook,
    fontSize: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 20,
    color: AppStyles.color.categoryTitle,
  },
  divider: {
    backgroundColor: AppStyles.color.filterTitle,
    marginVertical: 20,
    marginHorizontal: '5%',
  },
  itemWrapper: {
    flexDirection: "column",
    fontSize: 20,
  },
  multilineText: {
    borderWidth: 1,
    borderStyle: "solid",
    padding: 10,
    borderColor: AppStyles.color.grey,
  },
  description: {
    padding: 10,
    marginVertical: 20,
    color: AppStyles.color.blue,
  },
});
const RenderItem = ({ title, children, direction }) => {
  return (
    <View style={[styles.itemWrapper, { flexDirection: direction }]}>
      <Text style={styles.subTitle}>{title}</Text>
      {children}
    </View>
  )
}
const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(EditProfileScreen);
