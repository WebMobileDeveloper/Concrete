import React from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Divider } from 'react-native-elements';
import RadioForm from 'react-native-simple-radio-button';
import ModalPicker from 'react-native-modal-picker-improved';
import firebase from "react-native-firebase";

import Button from "react-native-button";

import { AppStyles, AppIcon } from "../../AppStyles";
import { Configuration } from "../../Configuration";
import { ValidateTypes, FieldTypes, JobTypes, Mpa_Strengths, Stone_Sizes, Slump_Wetness, } from '../../Globals';
import InputField from "../../components/InputField";
import { show_loading, hide_loading } from '../../actions';
import HeaderLeft from "../../components/HeaderLeft";
import { ACTION_TYPES } from "../../Globals";


class RequestScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Order / Quote Request",
    headerLeft: <HeaderLeft navigation={navigation} />,
    // headerRight: <HeaderButton icon={AppIcon.images.edit} onPress={() => navigation.goBack()} />
  });

  constructor(props) {
    super(props);
    this.initQuoteState = {
      clear: false,
      submitted: false,
      user: {},
      fields: {
        uid: { value: '', error: true },
        title: { value: '', error: true, },
        orderType: { value: 'Order', error: false, },
        delivery_date: { value: '', error: true, },
        delivery_time: { value: '', error: true, },
        delivery_address: { value: '', error: true, },
        suburb: { value: '', error: true, },

        company_name: { value: '', error: true, },
        customer_name: { value: '', error: true, },
        phone: { value: '', error: true, },
        email: { value: '', error: true, },

        pumpRequired: { value: false, error: false, },
        quantity: { value: '', error: false },
        job_type: { value: JobTypes[0].label, error: false },

        mpa_strength: { value: Mpa_Strengths[0].label, error: false },
        stone_size: { value: Stone_Sizes[0].label, error: false },
        slump_wetness: { value: Slump_Wetness[0].label, error: false },

        note: { value: '', error: false },

      },
      order_radio_props: [
        { label: 'Order', value: 0 },
        { label: 'Quote', value: 1 }
      ],
      pump_radio_props: [
        { label: 'Yes', value: 0 },
        { label: 'No', value: 1 }
      ],
      multilineHeight: 100,
    }
    this.state = this.initQuoteState;
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const { user } = nextProps;
    if (JSON.stringify(user) !== JSON.stringify(prevState.user)) {
      let newState = prevState;
      newState.user = user;
      newState.fields.uid = { value: user.uid, error: false }
      newState.fields.customer_name = { value: user.fullname, error: false }
      newState.fields.phone = { value: user.phone, error: false }
      newState.fields.email = { value: user.email, error: false }
      newState.fields.delivery_address = { value: user.address, error: false }
      newState.fields.suburb = { value: user.suburb, error: false }
      newState.fields.company_name = { value: user.company_name, error: false }
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
    //==============================================
    //  add additionail data
    data.status = ACTION_TYPES.REQUIRED;
    data.requestTime = firebase.database.ServerValue.TIMESTAMP;
    data.lastUpdateTime = firebase.database.ServerValue.TIMESTAMP;
    data.customerBadge = 0;
    data.clientBadge = 1;
    data.history = [{ action: ACTION_TYPES.REQUIRED, time: firebase.database.ServerValue.TIMESTAMP }]
    //==============================================
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
    firebase.database().ref(data.orderType).push(data)
      .then((result) => {
        self.onSuccess()
      }).catch((error) => {
        self.onError(error)
      })
  }
  onSuccess() {
    const { user } = this.state;
    let newState = { ...this.initQuoteState };
    newState.user = user;
    newState.fields.uid = { value: user.uid, error: false }
    newState.fields.customer_name = { value: user.fullname, error: false }
    newState.fields.phone = { value: user.phone, error: false }
    newState.fields.email = { value: user.email, error: false }
    newState.fields.delivery_address = { value: user.address, error: false }
    newState.fields.suburb = { value: user.suburb, error: false }
    newState.fields.company_name = { value: user.company_name, error: false }
    this.setState({ clear: true });
    this.setState(newState);
    this.props.dispatch(hide_loading());
    Alert.alert('Success', "Request sent Successfully!");
  }
  onError(error) {
    this.props.dispatch(hide_loading());
    const { code, message } = error;
    Alert.alert('Submit Error', message);
  }
  pumpChanged(value) {
    var fields = { ...this.state.fields };
    if (value) {
      fields.pumpRequired.value = false;
      fields.quantity = { value: '', error: false };
      fields.job_type = { value: JobTypes[0].label, error: false };
    } else {
      fields.pumpRequired.value = true;
      fields.quantity = { value: '', error: true };
      fields.job_type = { value: JobTypes[0].label, error: true };
    }
    this.setState({ fields })
  }

  render() {
    return (
      <View style={styles.container}>
        {!this.state.clear &&
          <KeyboardAwareScrollView style={styles.scrollContainer} contentContainerStyle={{ alignItems: 'center', }}>
            <View style={{ width: '100%' }}>
              <RenderItem title="Order / Quote Request Title *">
                <InputField name="title"
                  type={FieldTypes.text}
                  placeholder="Jhon's Order Request"
                  submitted={this.state.submitted}
                  onUpdate={this.updateState}
                  validations={[ValidateTypes.required]}
                  borderRadius={0}
                  marginBottom={0}
                  width={'100%'}
                  defaultValue={this.state.fields.title.value} />
              </RenderItem>
              <Divider style={styles.divider} />

              {/* ===================== - Delivery Details =================================== */}
              <Text style={styles.sectionTitle}>{'- Delivery Details'}</Text>
              <RenderItem title="Is this a concrete Order or a Quote?" >
                <RadioForm
                  radio_props={this.state.order_radio_props}
                  initial={0}
                  formHorizontal={true}
                  labelHorizontal={true}
                  buttonColor={'#2196f3'}
                  animation={true}
                  buttonSize={10}
                  labelStyle={{ marginRight: 20 }}
                  style={{ marginTop: 10, marginBottom: 20 }}
                  onPress={(value) => this.updateState("orderType", value ? 'Quote' : 'Order', false)}

                />
              </RenderItem>

              <RenderItem title="Delivery Date *">
                <InputField
                  name="delivery_date"
                  type={FieldTypes.date}
                  submitted={this.state.submitted}
                  onUpdate={this.updateState}
                  validations={[ValidateTypes.required]}
                  borderRadius={0}
                  marginBottom={0}
                  width={'100%'} />
              </RenderItem>
              <RenderItem title="Delivery Time *">
                <InputField name="delivery_time"
                  type={FieldTypes.time}
                  submitted={this.state.submitted}
                  onUpdate={this.updateState}
                  validations={[ValidateTypes.required]}
                  borderRadius={0}
                  marginBottom={0}
                  width={'100%'} />
              </RenderItem>
              <RenderItem title="Delivery Address *">
                <InputField name="delivery_address"
                  type={FieldTypes.text}
                  submitted={this.state.submitted}
                  onUpdate={this.updateState}
                  validations={[ValidateTypes.required]}
                  borderRadius={0}
                  marginBottom={0}
                  width={'100%'}
                  defaultValue={this.state.fields.delivery_address.value} />
              </RenderItem>
              <RenderItem title="Suburb *">
                <InputField name="suburb"
                  type={FieldTypes.text}
                  submitted={this.state.submitted}
                  onUpdate={this.updateState}
                  validations={[ValidateTypes.required]}
                  borderRadius={0}
                  marginBottom={0}
                  width={'100%'}
                  defaultValue={this.state.fields.suburb.value} />
              </RenderItem>


              <Divider style={styles.divider} />


              {/* ==========  - Customer Details ==================== */}
              <Text style={styles.sectionTitle}>{'- Customer Details'}</Text>
              <RenderItem title="Company Name *">
                <InputField name="company_name"
                  type={FieldTypes.text}
                  submitted={this.state.submitted}
                  onUpdate={this.updateState}
                  validations={[ValidateTypes.required]}
                  borderRadius={0}
                  marginBottom={0}
                  width={'100%'}
                  defaultValue={this.state.fields.company_name.value} />
              </RenderItem>
              <RenderItem title="Customer Name *">
                <InputField name="customer_name"
                  type={FieldTypes.text}
                  submitted={this.state.submitted}
                  onUpdate={this.updateState}
                  validations={[ValidateTypes.required]}
                  borderRadius={0}
                  marginBottom={0}
                  width={'100%'}
                  defaultValue={this.state.fields.customer_name.value} />
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
              <RenderItem title="E-mail Address *">
                <InputField name="email"
                  type={FieldTypes.email}
                  placeholder="E-mail Address"
                  submitted={this.state.submitted}
                  onUpdate={this.updateState}
                  validations={[ValidateTypes.required, ValidateTypes.email]}
                  borderRadius={0}
                  marginBottom={0}
                  width={'100%'}
                  defaultValue={this.state.fields.email.value} />
              </RenderItem>




              <Divider style={styles.divider} />


              {/* ==========  - Pump Options ==================== */}
              <Text style={styles.sectionTitle}>{'- Pump Options'}</Text>
              <RenderItem title="Do you require booking a pump as well?" >
                <RadioForm
                  radio_props={this.state.pump_radio_props}
                  initial={1}
                  formHorizontal={true}
                  labelHorizontal={true}
                  buttonColor={'#2196f3'}
                  animation={true}
                  buttonSize={10}
                  labelStyle={{ marginRight: 20 }}
                  style={{ marginTop: 10, marginBottom: 20 }}
                  onPress={(value) => this.pumpChanged(value)}
                />
              </RenderItem>

              {this.state.fields.pumpRequired.value && <RenderItem title="Quantity (m3) *">
                <InputField name="quantity"
                  type={FieldTypes.number}
                  submitted={this.state.submitted}
                  onUpdate={this.updateState}
                  validations={[ValidateTypes.required, ValidateTypes.number]}
                  borderRadius={0}
                  marginBottom={0}
                  width={'100%'} />
              </RenderItem>}

              {this.state.fields.pumpRequired.value && <RenderItem title="Job Type">
                <MyModalPicker data={JobTypes} name="job_type" onChange={this.updateState} />
              </RenderItem>}


              <Divider style={styles.divider} />



              {/* ==========  - Concrete Details ==================== */}
              <Text style={styles.sectionTitle}>{'- Concrete Details'}</Text>

              <RenderItem title="MPA - Strength">
                <MyModalPicker data={Mpa_Strengths} name="mpa_strength" onChange={this.updateState} />
              </RenderItem>
              <RenderItem title="Stone Size - Milis">
                <MyModalPicker data={Stone_Sizes} name="stone_size" onChange={this.updateState} />
              </RenderItem>
              <RenderItem title="Slump - Wetness">
                <MyModalPicker data={Slump_Wetness} name="slump_wetness" onChange={this.updateState} />
              </RenderItem>

              <Divider style={styles.divider} />
              <RenderItem title="Is there anything else we need to know about this job?">
                <TextInput name="note"
                  onChangeText={(text) => this.updateState("note", text, false)}
                  style={[styles.multilineText, { height: this.state.multilineHeight }]}
                  multiline={true}
                  onContentSizeChange={(event) => {
                    this.setState({ multilineHeight: Math.max(100, event.nativeEvent.contentSize.height + 20) })
                  }}
                />
              </RenderItem>
              <Text style={styles.description}>{`* We will get in touch with you as soon as we can, however all orders requested will be booked in as a to be confirmed orders ONLY. Orders will only be confirmed after we get into contact with you`}</Text>
            </View>
          </KeyboardAwareScrollView>

        }
        <View style={styles.buttonWrapper}>
          <Button containerStyle={styles.sendButton}
            style={styles.buttonText}
            onPress={() => this.onSubmint()}>Send</Button>
        </View>

      </View>
    );
  }

}
const MyModalPicker = ({ data, name, onChange }) => (
  <ModalPicker
    data={data}
    initValue={data[0].label}
    style={{ marginBottom: 20 }}
    selectTextStyle={{ textAlign: 'left', paddingLeft: 10 }}
    optionStyle={{ backgroundColor: AppStyles.color.white }}
    cancelStyle={{ backgroundColor: AppStyles.color.facebook }}
    cancelTextStyle={{ color: AppStyles.color.white }}
    onChange={(option) => { onChange(name, option.label, false) }} />
)

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

export default connect(mapStateToProps)(RequestScreen);
