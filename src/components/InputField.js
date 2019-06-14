
import React from "react";
import { StyleSheet, Text, TextInput, View, Alert } from "react-native";
import TextInputMask from 'react-native-text-input-mask';

import { AppStyles } from "../AppStyles";
import { ValidateTypes, FieldTypes } from '../Globals';


const phoneReg = /^\d{11}$/;
const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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
        const { validations, matchText } = this.props;
        this.setState({ value: value, errorText: '' });
        value = value.trim();

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
            }
        }

        this.parentUpdate(value, false);
    }
    render() {
        const { type, placeholder, submitted } = this.props;
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
        }
        return (
            <View style={styles.InputContainer}>
                <View style={styles.subContainer}>
                    {(type == FieldTypes.phone) ?
                        (
                            <TextInputMask
                                refInput={ref => { this.input = ref }}
                                onChangeText={(formatted, extracted) => {
                                    this.onChangeText("61" + extracted)
                                }}
                                style={styles.body}
                                placeholder={placeholder}
                                value={this.state.value}
                                placeholderTextColor={AppStyles.color.grey}
                                underlineColorAndroid="transparent"
                                secureTextEntry={secureTextEntry}
                                keyboardType={keyboardType}
                                autoCorrect={autoCorrect}
                                mask={"+61 [000] [000] [000]"} />
                        ) : (
                            <TextInput
                                onChangeText={this.onChangeText}
                                style={styles.body}
                                placeholder={placeholder}
                                value={this.state.value}
                                placeholderTextColor={AppStyles.color.grey}
                                underlineColorAndroid="transparent"
                                secureTextEntry={secureTextEntry}
                                keyboardType={keyboardType}
                                autoCorrect={autoCorrect} />
                        )
                    }
                </View>
                <Text style={styles.error}>{submitted ? this.state.errorText : ''}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    InputContainer: {
        width: AppStyles.textInputWidth.main,
    },
    subContainer: {
        width: AppStyles.textInputWidth.sub,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: AppStyles.color.grey,
        borderRadius: AppStyles.borderRadius.main
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
        marginBottom: 20,
        paddingLeft: 20,

    }
});


