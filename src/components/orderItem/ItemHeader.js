import React from "react";
import { StyleSheet, Text, View, } from "react-native";
import { connect } from 'react-redux';
import { Badge } from "react-native-elements";
import firebase from "react-native-firebase";

import { AppStyles } from "../../AppStyles";
import { MomentFunc } from "../../utils/func"
import { ACTION_TYPES } from "../../Globals";
const mapStateToProps = state => ({});
const mapDispatchToProps = (dispatch) => { return {}; }

class ItemHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isActive: false }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let isActive = prevState.isActive;
    if (isActive != nextProps.isActive) {
      isActive = nextProps.isActive;
    }
    if (isActive) {
      const { item, order_type, user_type } = nextProps;
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
        setTimeout(() => {
          firebase.database().ref(order_type + "/" + item.key).update(updates);
        }, 1000);
      }
    }
    return { isActive: isActive };
  }

  render() {
    const { item, order_type, user_type } = this.props;
    const badgeCount = user_type == 'Client' ? item.clientBadge : item.customerBadge;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.bottomView} >
          <View style={styles.bottmLeftView}>
            <Text style={styles.subText}>{order_type + " ID: " + item.key}</Text>
            <Text style={styles.subText}>{"Status:   " + item.status + "  (" + MomentFunc.fromNow(item.lastUpdateTime) + ")"}</Text>
          </View>
          {badgeCount > 0 && <Badge value={badgeCount} status="error" />}
        </View >
      </View>
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
    width: '90%',
    paddingLeft: 20,
    // backgroundColor: "#ee5555",
  },
  subText: {
    // width: '100%',
    // paddingRight: 20,
    paddingVertical: 5,
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(ItemHeader);
