
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
        const { defaultValue = '' } = this.props;
        this.onChangeText(defaultValue);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { defaultValue } = nextProps;
        if (defaultValue != undefined && defaultValue !== prevState.value) {
            return ({ value: defaultValue, errorText: '' });
        }
        else return null;
    }
    parentUpdate(value, error) {
        const { name, onUpdate } = this.props;
        onUpdate(name, value, error);
    }
    onChangeText(value) {
        const { type, validations = [], matchText } = this.props;
        let checkValue = value;
        let errorText = '';
        if (type != FieldTypes.phone) {
            checkValue = checkValue.trim();
        } else {
            checkValue = checkValue.substr(1, checkValue.length - 1);
            checkValue = checkValue.replace(/ /g, '');
        }

        for (i = 0; i < validations.length; i++) {
            switch (validations[i]) {
                case ValidateTypes.required:
                    if (checkValue === '') {
                        errorText = 'This field is required!';
                    }
                    break;
                case ValidateTypes.phone:
                    if (phoneReg.test(checkValue) === false) {
                        errorText = 'Invalid phone number!';
                    }
                    break;
                case ValidateTypes.email:
                    if (emailReg.test(checkValue) === false) {
                        errorText = 'Invalid email address!';
                    }
                    break;
                case ValidateTypes.match:
                    if (checkValue != matchText) {
                        errorText = 'Password doesn\'t matched!';
                    }
                    break;
                case ValidateTypes.number:
                    if (numberReg.test(checkValue) === false) {
                        errorText = 'Invalid number!';
                    }
                    break;
            }
        }
        this.setState({ value, errorText });
        this.parentUpdate(value, errorText ? true : false);
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
        const { type, placeholder, maskString } = this.props;
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
                    onChangeText={(value) => this.onChangeText(value)}
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


