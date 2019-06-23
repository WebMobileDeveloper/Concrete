import React from "react";
import { StyleSheet, Text, View, Alert, } from "react-native";
import Button from "react-native-button";
import firebase from "react-native-firebase";
import { TextInput } from "react-native-gesture-handler";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';


import { AppStyles } from "../../AppStyles";
import { ACTION_TYPES } from "../../Globals";

const statusList = {
    Order: [ACTION_TYPES.REQUIRED, ACTION_TYPES.IN_REVIEWING, ACTION_TYPES.DECLINED, ACTION_TYPES.PAYMENT_REQUIRED, ACTION_TYPES.PAID, ACTION_TYPES.COMPLETED],
    Quote: [ACTION_TYPES.REQUIRED, ACTION_TYPES.IN_REVIEWING, ACTION_TYPES.DECLINED, , ACTION_TYPES.ACCEPETD, ACTION_TYPES.COMPLETED],
}
class ActionItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tempStatus: null,
            isActive: null,
            user_type: null,
            order_type: null,
            multilineHeight: 100,
            item: null,
            note: '',
            list: [],
        }
        this.onRadioSelected = this.onRadioSelected.bind(this);
        this.checkDisable = this.checkDisable.bind(this);
        this.onPressSave = this.onPressSave.bind(this);
        this.saveData = this.saveData.bind(this);
        this._renderButton = this._renderButton.bind(this);
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        const { item, user_type, order_type } = nextProps;
        let newState = null;
        if (item && JSON.stringify(item) != JSON.stringify(prevState.item)) {
            newState = newState || {};
            newState.item = item;
            newState.tempStatus = item.status;
            newState.multilineHeight = 100;
            newState.note = '';
            newState.user_type = user_type;
            newState.order_type = order_type;
            newState.list = statusList[order_type];
        }
        return newState;
    }
    onRadioSelected(value, index) {
        this.setState({ tempStatus: value })
    }
    checkDisable(status) {
        const { item } = this.state;
        switch (status) {
            case ACTION_TYPES.REQUIRED:
                return true;
            case ACTION_TYPES.IN_REVIEWING:
                if (item.status == ACTION_TYPES.COMPLETED) {
                    return true;
                } else {
                    return false;
                }
            case ACTION_TYPES.COMPLETED:
                if (item.status == ACTION_TYPES.DECLINED
                    || item.status == ACTION_TYPES.ACCEPETD
                    || item.status == ACTION_TYPES.PAID) {
                    return false;
                } else {
                    return true;
                }
            default:
                return false;
        }

    }
    onPressSave() {
        if (this.state.tempStatus == this.state.item.status) {
            alert("State doesn't changed!");
            return;
        }
        Alert.alert(
            'Confirm',
            'Are you sure want to save this change?',
            [
                { text: 'YES', onPress: () => this.saveData() },
                { text: 'NO', onPress: () => { } },
            ]
        );
    }
    saveData() {
        const { item, order_type, tempStatus } = this.state;
        let updates = {}
        updates.customerBadge = item.customerBadge + 1;
        updates.status = tempStatus;
        updates.history = [...item.history];
        updates.history.push({ action: this.state.tempStatus, time: firebase.database.ServerValue.TIMESTAMP, note: this.state.note || {} })
        updates.lastUpdateTime = firebase.database.ServerValue.TIMESTAMP;
        firebase.database().ref(order_type + '/' + item.key).update(updates);
    }
    _renderButton(status, i) {
        const self = this;
        const { item } = this.state;
        const obj = { label: status, value: status };
        const disabled = self.checkDisable(status);
        const isSelected = self.state.tempStatus == status;

        return (
            <RadioButton
                labelHorizontal={true}
                key={i}
                wrapStyle={{ minWidth: '40%', marginBottom: 10, }}
            >
                <RadioButtonInput
                    obj={obj}
                    index={i}
                    isSelected={isSelected}
                    disabled={disabled}
                    onPress={(value, index) => self.onRadioSelected(value, index)}
                    borderWidth={1}
                    buttonInnerColor={'#2196f3'}
                    buttonOuterColor={disabled ? AppStyles.color.description : '#2196f3'}
                    buttonSize={10}
                    buttonOuterSize={20}
                    buttonStyle={{}}
                    buttonWrapStyle={{ marginLeft: 10 }}
                />
                <RadioButtonLabel
                    obj={obj}
                    index={i}
                    labelHorizontal={true}
                    disabled={disabled}
                    onPress={(value, index) => self.onRadioSelected(value, index)}
                    labelStyle={{
                        fontSize: 16,
                        color: disabled ? AppStyles.color.description : AppStyles.color.categoryTitle,
                        textDecorationLine: item.status == status ? 'underline' : 'none'
                    }}
                    labelWrapStyle={{}}
                />
            </RadioButton>
        )
    }

    render() {
        const { item, user_type, list } = this.state;
        if (user_type != 'Client' || !item) return null;
        return (
            <View style={{ width: '100%', marginTop: 10, paddingVertical: 20, paddingHorizontal: 10, backgroundColor: '#FFFFFF' }}>
                <Text style={{ color: AppStyles.color.facebook, fontSize: 16, fontWeight: '500', marginBottom: 10, }}>Change Status</Text>
                <RadioForm formHorizontal={false}
                    // animation={true}
                    style={{
                        width: '100%',
                        // flex: 1,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'flex-start'
                    }}>
                    {
                        list.map((status, i) => this._renderButton(status, i))
                    }
                </RadioForm>
                <TextInput placeholder="Additional note"
                    style={{
                        width: '100%',
                        padding: 10,
                        borderWidth: 1,
                        borderColor: AppStyles.color.location,
                        backgroundColor: "#FFF",
                        height: this.state.multilineHeight
                    }}
                    multiline={true}
                    onContentSizeChange={(event) => {
                        this.setState({ multilineHeight: Math.max(100, event.nativeEvent.contentSize.height) })
                    }}
                    value={this.state.note}
                    onChangeText={(note) => this.setState({ note })} />

                <Button
                    containerStyle={styles.buttonContainer}
                    style={styles.buttonText}
                    onPress={() => this.onPressSave()}>Update</Button>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    buttonContainer: {
        width: AppStyles.buttonWidth.main,
        backgroundColor: AppStyles.color.tint,
        borderRadius: AppStyles.borderRadius.main,
        padding: 10,
        marginTop: 30,
        marginHorizontal: '15%',
    },
    buttonText: {
        color: AppStyles.color.white
    },
});

export default ActionItem;
