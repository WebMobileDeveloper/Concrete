
import React from "react";
import { StyleSheet, Text, TextInput, View, Alert } from "react-native";
// import TextInputMask from 'react-native-text-input-mask';
import MaskedInput from 'react-native-masked-input-text';
import DateTimePicker from "react-native-modal-datetime-picker";

import { AppStyles } from "../AppStyles";
import { ValidateTypes, FieldTypes } from '../Globals';


const phoneReg = /^\d{11}$/;
const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// const dateTimeReg = /[0-1]\d\/[0-3]\d\/\d{4} [0-1]\d:[0-5]\d [aApP][mM]/;
var numberReg = /^\d+$/;
export default class InputField extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: '',
            errorText: ''
        };
        this.parentUpdate = this.parentUpdate.bind(this);
        this.onChangeText = this.onChangeText.bind(this);


    }

    componentDidMount() {
        this.onChangeText('');
    }

    parentUpdate(value, error) {
        const { name, onUpdate } = this.props;
        onUpdate(name, value, error);
    }
    onChangeText(value) {
        const { type } = this.props;
        const { validations, matchText } = this.props;
        
        this.setState({ value: value, errorText: '' });
        if (type != FieldTypes.phone) {
            value = value.trim();
        } else {
            value = value.substr(1, value.length - 1);
            value = value.replace(/ /g, '');
        }

        for (i = 0; i < validations.length; i++) {
            switch (validations[i]) {
                case ValidateTypes.required:
                    if (value === '') {
                        this.setState({ errorText: 'This field is required!' });
                        this.parentUpdate(value, true);
                        return;
                    }
                    break;
                case ValidateTypes.phone:
                    if (phoneReg.test(value) === false) {
                        this.setState({ errorText: 'Invalid phone number!' });
                        this.parentUpdate(value, true);
                        return;
                    }
                    break;
                case ValidateTypes.email:
                    if (emailReg.test(value) === false) {
                        this.setState({ errorText: 'Invalid email address!' });
                        this.parentUpdate(value, true);
                        return;
                    }
                    break;
                case ValidateTypes.match:
                    if (value != matchText) {
                        this.setState({ errorText: 'Password doesn\'t matched!' });
                        this.parentUpdate(value, true);
                        return;
                    }
                    break;
                case ValidateTypes.number:
                    if (numberReg.test(value) === false) {
                        this.setState({ errorText: 'Invalid number!' });
                        this.parentUpdate(value, true);
                        return;
                    }
                    break;
            }
        }

        this.parentUpdate(value, false);
    }
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        const { type } = this.props;
        date += '';
        if (type == FieldTypes.date) {
            date = date.substring(0, 16);
        } else {
            date = date.substring(16, 22) + "00";
        }
        this.hideDateTimePicker();
        this.onChangeText(date);
    };
    renderChild = () => {
        const { type, placeholder, maskString, } = this.props;
        let keyboardType = 'default';
        let secureTextEntry = false;
        let autoCorrect = false;
        switch (type) {
            case FieldTypes.email:
                keyboardType = "email-address";
                break;
            case FieldTypes.phone:
                keyboardType = "numeric";
                break;
            case FieldTypes.password:
                secureTextEntry = true;
                break;
            case FieldTypes.number:
                keyboardType = "numeric";
                break;
        }
        switch (type) {
            case FieldTypes.date:
            case FieldTypes.time:
                return (<Text
                    // onChangeText={this.onChangeText}
                    onTouchEnd={this.showDateTimePicker}
                    style={[styles.body, { fontSize: 16, paddingTop: 10, }]}
                    placeholder={placeholder}
                    value={this.state.value}
                    placeholderTextColor={AppStyles.color.grey}
                    underlineColorAndroid="transparent"
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoCorrect={autoCorrect}
                >{this.state.value}</Text>)
            case FieldTypes.phone:
                return (<MaskedInput
                    refInput={ref => { this.input = ref }}
                    onTextChange={(value) => {
                        if (type == FieldTypes.phone) {
                            this.onChangeText(value);
                        }
                    }}
                    style={styles.body}
                    placeholder={placeholder}
                    value={this.state.value}
                    placeholderTextColor={AppStyles.color.grey}
                    underlineColorAndroid="transparent"
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoCorrect={autoCorrect}
                    mask={maskString} />)
            default:
                return (<TextInput
                    onChangeText={this.onChangeText}
                    style={styles.body}
                    placeholder={placeholder}
                    value={this.state.value}
                    placeholderTextColor={AppStyles.color.grey}
                    underlineColorAndroid="transparent"
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoCorrect={autoCorrect} />)
        }
    }
    render() {
        const { submitted, borderRadius, width, marginBottom, type } = this.props;
        return (
            <View style={styles.InputContainer}>
                <View style={[styles.subContainer, {
                    borderRadius: borderRadius == undefined ? AppStyles.borderRadius.main : borderRadius,
                    width: width == undefined ? AppStyles.textInputWidth.sub : width,
                }]}>
                    {this.renderChild()}
                </View>

                <Text style={[styles.error, {
                    width: width == undefined ? AppStyles.textInputWidth.sub : width,
                    marginBottom: marginBottom == undefined ? 20 : marginBottom,
                }]}>{submitted ? this.state.errorText : ''}</Text>

                {(type == FieldTypes.date || type == FieldTypes.time) &&
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.hideDateTimePicker}
                        mode={type}
                    />}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    InputContainer: {
        width: AppStyles.textInputWidth.main,
        // backgroundColor: 'red',
        alignItems: "center",
    },
    subContainer: {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: AppStyles.color.grey,
    },
    body: {
        height: 36,
        paddingLeft: 20,
        paddingRight: 20,
        color: AppStyles.color.categoryTitle
    },
    error: {
        color: AppStyles.color.error,
        marginTop: 5,
        paddingLeft: 20,
        // backgroundColor:'blue',
        textAlign: 'left',
    }
});


