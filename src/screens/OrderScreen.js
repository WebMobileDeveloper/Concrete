import React from "react";
import { connect } from "react-redux";
import { ScrollView, StyleSheet, Text, View, } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CheckBox } from 'react-native-elements';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';


import Button from "react-native-button";

import { AppStyles, } from "../AppStyles";
import { Configuration } from "../Configuration";
import HeaderLeft from "../components/HeaderLeft";
import { ValidateTypes, FieldTypes } from '../Globals';
import InputField from "../components/InputField";

class OrderScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Order / Quote",
    headerLeft: <HeaderLeft navigation={navigation} />
  });

  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      fields: {
        orderType: { value: 'Order', error: false, },
        delivery_date: { value: '', error: true, },
        delivery_address: { value: '', error: true, },
        suburb: { value: '', error: true, },
        company_name: { value: '', error: true, },
        customer_name: { value: '', error: true, },
        phone: { value: '', error: true, },
        email: { value: '', error: true, },
      },
      radio_props: [
        { label: 'Order', value: 0 },
        { label: 'Quote', value: 1 }
      ],
    };
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    // this.props.navigation.setParams({
    //   menuIcon: this.props.user.profileURL
    // });
  }
  updateState(name, value, error) {
    var fields = { ...this.state.fields };
    fields[name] = { value, error };
    this.setState({ fields })
  }
  onSend = () => {
    this.setState({ submitted: true });
  };
  render() {
    return (
      <KeyboardAwareScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center', }}>
        <View style={{ width: '100%' }}>
          <Text style={styles.title}>Order Screen</Text>
          <RenderItem title="Is this a concrete Order or a Quote?" >
            <RadioForm
              radio_props={this.state.radio_props}
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
              width={'100%'} />
          </RenderItem>
          <RenderItem title="Suburb *">
            <InputField name="suburb"
              type={FieldTypes.text}
              submitted={this.state.submitted}
              onUpdate={this.updateState}
              validations={[ValidateTypes.required]}
              borderRadius={0}
              marginBottom={0}
              width={'100%'} />
          </RenderItem>


          <Text style={{ fontWeight: 'bold', fontSize: 20, marginVertical: 20 }}>{'- Customer Details'}</Text>
          <RenderItem title="Company Name *">
            <InputField name="company_name"
              type={FieldTypes.text}
              submitted={this.state.submitted}
              onUpdate={this.updateState}
              validations={[ValidateTypes.required]}
              borderRadius={0}
              marginBottom={0}
              width={'100%'} />
          </RenderItem>

          <RenderItem title="Customer Name *">
            <InputField name="customer_name"
              type={FieldTypes.text}
              submitted={this.state.submitted}
              onUpdate={this.updateState}
              validations={[ValidateTypes.required]}
              borderRadius={0}
              marginBottom={0}
              width={'100%'} />
          </RenderItem>
          <RenderItem title="Phone Number *">
            <InputField name="phone"
              type={FieldTypes.phone}
              placeholder="Phone number"
              submitted={this.state.submitted}
              onUpdate={this.updateState}
              validations={[ValidateTypes.required, ValidateTypes.phone]}
              maskString="+61 [000] [000] [000]"
              borderRadius={0}
              marginBottom={0}
              width={'100%'} />
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
              width={'100%'} />
          </RenderItem>

        </View>
        <Button
          containerStyle={[styles.sendButton, { marginTop: 50 }]}
          style={styles.buttonText}
          onPress={() => this.onSend()}>Send</Button>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: Configuration.home.listing_item.offset,
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
  itemWrapper: {
    flexDirection: "column",
    fontSize: 20,
  },
  sendButton: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.facebook,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30
  },
  buttonText: {
    color: AppStyles.color.white
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

export default connect(mapStateToProps)(OrderScreen);
