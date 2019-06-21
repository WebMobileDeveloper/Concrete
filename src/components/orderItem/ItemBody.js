import React from "react";
import { StyleSheet, Text, View, Animated, } from "react-native";
import { Divider } from 'react-native-elements';

import { AppStyles } from "../../AppStyles";
import { MomentFunc } from "../../utils/func"
import ActionItem from "./ActionItem";


class ItemBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }


  render() {
    const { item, order_type, user_type, isActive } = this.props;
    return (
      <FadeInView>
        {/* ==========  - Order Information ==================== */}
        <Title title={"- " + order_type + " Infomation"} />
        <RenderItem title={order_type + " Title"} value={item.title} />
        <RenderItem title={order_type + " ID"} value={item.key} />
        <RenderItem title="Current Status" value={item.status} color='#cc0000' />
        <RenderItem title={order_type + " Time"} value={MomentFunc.toDate(item.requestTime)} />
        <RenderItem title="Last Updated" value={MomentFunc.fromNow(item.lastUpdateTime)} />
        <Divider style={styles.divider} />

        {/* ==========  - Action history ==================== */}
        <Title title={"- Action history for this request"} />
        {item.history.map((action, index) => (
          <RenderItem title={action.action} value={MomentFunc.toDate(action.time)} key={index} more={action.note} />
        ))}

        <ActionItem item={item} order_type={order_type} user_type={user_type} isActive={isActive} />

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
        <RenderItem title="Note" value={item.note} direction="column" />
        <Divider style={styles.divider} />
      </FadeInView>
    );
  }
}

const RenderItem = ({ title, value, direction, color, more }) => {
  color = color || AppStyles.color.categoryTitle
  direction = direction || 'row';
  return (
    <View style={styles.detailWrapper}>
      <View style={{ flex: 1, flexDirection: direction }}>
        <Text style={styles.detailTitle}>{title}</Text>
        <Text style={[styles.contentStyle, { color: color }]}>{value}</Text>
      </View>
      {more && <View style={{ flex: 1, flexDirection: "row", marginTop: 10, }}>
        <Text style={[styles.detailTitle, { textAlign: 'right', width: '10%', paddingRight: 10 }]}>*  </Text>
        <Text style={[styles.contentStyle, { color: color, width: '90%' }]}>{more}</Text>
      </View>
      }
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
    width: '100%',
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

export default ItemBody;
