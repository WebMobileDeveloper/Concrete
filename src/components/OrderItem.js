import React from "react";
import { Image, StyleSheet, Text, TouchableHighlight, View, Animated, } from "react-native";
import { ListItem, Icon, Divider, Badge, withBadge } from 'react-native-elements';
import { AppStyles } from "../AppStyles";
import { MomentFunc } from "../utils/func"
import firebase from "react-native-firebase";

export class ItemHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // index: -1,
      // expand: false,
    }
  }
  // onExpandPress(index) {
  //   if (this.state.index == index) {
  //     this.setState({ expand: !this.state.expand })
  //   } else {
  //     this.setState({ index: index, expand: true })
  //   }
  // }
  render() {
    const { item, type } = this.props;
    const badgeDisplay = item.customerBadge ? 'flex' : 'none';
    return (
      <ListItem
        containerStyle={[styles.container, { backgroundColor: AppStyles.color.background }]}
        // contentContainerStyle={{ backgroundColor: 'blue' }}
        // leftIcon={{
        //   name: "angle-down",
        //   type: "font-awesome",
        //   color: AppStyles.color.blue,
        //   size: 30,
        //   // onPress={() => this.onExpandPress(i)}
        // }}
        badge={{
          status: "error",
          value: item.customerBadge,
          containerStyle: { display: badgeDisplay, width: '10%', position: 'absolute', right: 0 }
        }}
        title={item.title}
        titleStyle={{ fontWeight: '500', textAlign: 'center' }}
        subtitle={
          < View style={styles.subtitleView} >
            <Text style={styles.subText}>{type + " ID: " + item.key}</Text>
            <Text style={styles.subText}>{"Status:   " + item.status + "  (" + MomentFunc.fromNow(item.lastUpdateTime) + ")"}</Text>
          </View >
        }
      />
    );
  }
}



export class ItemBody extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { item, type } = this.props;
    if (item.customerBadge) {
      firebase.database().ref(type + "/" + item.key + "/customerBadge").set(0);
    }
  }
  render() {
    const { item, type } = this.props;
    return (
      <FadeInView>
        {/* ==========  - Order Information ==================== */}
        <Title title={"- " + type + " Infomation"} />
        <RenderItem title={type + " Title"} value={item.title} />
        <RenderItem title={type + " ID"} value={item.key} />
        <RenderItem title="Current Status" value={item.status} color='#cc0000' />
        <RenderItem title={type + " Time"} value={MomentFunc.toDate(item.requestTime)} />
        <RenderItem title="Last Updated" value={MomentFunc.fromNow(item.lastUpdateTime)} />
        <Divider style={styles.divider} />

        {/* ===================== - Delivery Details =================================== */}
        <Title title="- Delivery Details" />
        <RenderItem title="Delivery Date" value={item.delivery_date} />
        <RenderItem title="Delivery Time" value={item.delivery_time} />
        <RenderItem title="Delivery Address" value={item.delivery_address} />
        <RenderItem title="Delivery Suburb" value={item.suburb} />
        <Divider style={styles.divider} />


        {/* ===================== - Customer Details =================================== */}
        <Title title="- Customer Details" />
        <RenderItem title="Company Name" value={item.company_name} />
        <RenderItem title="Customer Name" value={item.customer_name} />
        <RenderItem title="Phone Number" value={item.phone} />
        <RenderItem title="E-mail Address" value={item.email} />
        <Divider style={styles.divider} />


        {/* ===================== - Pump Options =================================== */}
        <Title title="- Pump Options" />
        <RenderItem title="Pump Required" value={item.pumpRequired ? 'Yes' : 'No'} />
        {item.pumpRequired && <RenderItem title="Quantity (m3)" value={item.quantity} />}
        {item.pumpRequired && <RenderItem title="Job Type" value={item.job_type} />}
        <Divider style={styles.divider} />

        {/* ===================== - Pump Options =================================== */}
        <Title title="- Concrete Details" />
        <RenderItem title="MPA - Strength" value={item.mpa_strength} />
        <RenderItem title="Stone Size - Milis" value={item.stone_size} />
        <RenderItem title="Slump - Wetness" value={item.slump_wetness} />
        <Divider style={styles.divider} />

        {/* ===================== - Note =================================== */}
        <Title title="- Others" />
        <RenderItem title="Note" value={item.note} />
        <Divider style={styles.divider} />
      </FadeInView>
    );
  }
}


const RenderItem = ({ title, value, direction, color = AppStyles.color.categoryTitle }) => {
  direction = direction || 'row';
  return (
    <View style={[styles.detailWrapper, { flexDirection: direction }]}>
      <Text style={styles.detailTitle}>{title}</Text>
      <Text style={[styles.contentStyle, { color: color }]}>{value}</Text>
    </View >
  )
}
const Title = ({ title }) => (<Text style={styles.sectionTitle}>{title}</Text>)

class FadeInView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0), // init opacity 0
    };
  }
  componentDidMount() {
    Animated.timing(
      // Uses easing functions
      this.state.fadeAnim, // The value to drive
      { toValue: 1 }, // Configuration
    ).start(); // Don't forget start!
  }
  render = () => (
    <Animated.View
      style={{
        opacity: this.state.fadeAnim,
        backgroundColor: AppStyles.color.LIGHTCYAN,
        paddingHorizontal: 20,
      }}>
      {this.props.children}
    </Animated.View>
  );
}


const styles = StyleSheet.create({
  container: {
    borderBottomColor: AppStyles.color.description,
    borderBottomWidth: 1,
  },
  subtitleView: {
    flexDirection: 'column',
    paddingTop: 5,
    // width: '90%',
  },
  subText: {
    // width: '100%',
    // paddingRight: 20,
    paddingVertical: 5,
  },

  // ======================
  //        item details style

  sectionTitle: {
    fontWeight: '500',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
    color: AppStyles.color.categoryTitle,
  },
  detailWrapper: {
    flex: 1,
    marginBottom: 5,
  },
  detailTitle: {
    fontFamily: AppStyles.fontName.bold,
    fontWeight: '500',
    width: "40%",
    color: AppStyles.color.facebook,
    fontSize: 14,
    // backgroundColor:AppStyles.color.description,
  },
  contentStyle: {
    marginTop: 3,
  },
});

