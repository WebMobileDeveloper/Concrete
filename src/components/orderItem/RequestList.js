import React from "react";
import { connect } from "react-redux";
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Badge, Icon } from "react-native-elements";
import firebase from "react-native-firebase";

import { AppStyles, AppIcon } from "../../AppStyles";
import { MomentFunc } from "../../utils/func"
import { setDetailId } from "../../actions";
import { ACTION_TYPES } from "../../Globals";


const mapStateToProps = state => ({});
const mapDispatchToProps = (dispatch) => {
    return {
        setDetailId: (order_type, id) => dispatch(setDetailId(order_type, id)),
    };
}

class RequestList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this._renderContent = this._renderContent.bind(this);
    }


    showDetail(item, key) {
        const { navigation, order_type, user_type, setDetailId } = this.props;
        let updates = {}
        let shouldUpdate = false;
        if (user_type == 'Customer') {
            if (item.customerBadge) {
                updates.customerBadge = 0;
                shouldUpdate = true;
            }
        } else {
            if (item.clientBadge) {
                updates.clientBadge = 0;
                if (item.status == ACTION_TYPES.REQUIRED) {
                    updates.status = ACTION_TYPES.IN_REVIEWING;
                    updates.customerBadge = item.customerBadge + 1;
                    updates.history = item.history || [];
                    updates.history.push({ action: ACTION_TYPES.IN_REVIEWING, time: firebase.database.ServerValue.TIMESTAMP })
                }
                updates.lastUpdateTime = firebase.database.ServerValue.TIMESTAMP;
                shouldUpdate = true;
            }
        }
        if (shouldUpdate) {
            firebase.database().ref(order_type + "/" + key).update(updates);
        }

        setDetailId(order_type, key);
        if (user_type == 'Client') {
            if (order_type == 'Order') {
                navigation.navigate("OrderReqDetailsScreen", { user_type, order_type });
            } else {
                navigation.navigate("QuoteReqDetailsScreen", { user_type, order_type });
            }
        } else {
            if (order_type == 'Order') {
                navigation.navigate("OrderDetailsScreen", { user_type, order_type });
            } else {
                navigation.navigate("QuoteDetailsScreen", { user_type, order_type });
            }
        }

    }
    _renderContent() {
        const { list, order_type, user_type } = this.props;

        return Object.keys(list).map(key => {
            const item = list[key];
            const badgeCount = user_type == 'Client' ? item.clientBadge : item.customerBadge;
            return (
                <View style={styles.container} key={key}>
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={styles.bottomView} >
                        <View style={styles.bottmLeftView}>
                            <Text style={styles.subText}>{order_type + " ID: " + key}</Text>
                            <Text style={styles.subText}>{"Status:   " + item.status + "  (" + MomentFunc.fromNow(item.lastUpdateTime) + ")"}</Text>
                        </View>
                        <View style={styles.badgeView}>
                            {badgeCount > 0 && <Badge value={badgeCount} status="error" />}
                        </View>
                        <Icon
                            name='angle-right'
                            type='font-awesome'
                            size={30}
                            color={AppStyles.color.title}
                            containerStyle={{ width: '10%', }}
                            onPress={() => this.showDetail(item, key)} />
                    </View >
                </View>
            )
        });
    }
    render() {
        return (
            <ScrollView style={{ flex: 1, width: '100%', backgroundColor: AppStyles.color.background }}>
                {this._renderContent()}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderBottomColor: AppStyles.color.description,
        borderBottomWidth: 1,
        backgroundColor: AppStyles.color.background
    },
    title: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '500',
        paddingTop: 10,
        color: AppStyles.color.facebook,
    },
    bottomView: {
        flex: 1,
        flexDirection: 'row',
    },
    bottmLeftView: {
        width: '80%',
        paddingLeft: 20,
        // backgroundColor: "#ee5555",
    },
    badgeView: {
        width: '10%',
        // backgroundColor: "#ee5555",
    },
    subText: {
        // width: '100%',
        // paddingRight: 20,
        paddingVertical: 5,
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestList);
