import React from "react";
import { Image, StyleSheet, Text, TouchableHighlight, View, Animated } from "react-native";
import { ListItem, Icon, Divider } from 'react-native-elements';
import { AppStyles } from "../AppStyles";
import { MomentFunc } from "../utils/func"

const fields = {
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
  job_type: { value: 1, error: false },

  mpa_strength: { value: 1, error: false },
  stone_size: { value: 1, error: false },
  slump_wetness: { value: 1, error: false },

  note: { value: '', error: false },

}

const RenderItem = ({ title, value, direction }) => {
  console.log(value);
  direction = direction || 'row';
  return (
    <View style={[styles.detailWrapper, { flexDirection: direction }]}>
      <Text style={styles.detailTitle}>{title}</Text>
      <Text style={styles.contentStyle}>{value}</Text>
    </View >
  )
}
const Title = ({ title }) => (
  <Text style={styles.sectionTitle}>{title}</Text>
)
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
  render() {
    return (
      <Animated.View
        style={{
          opacity: this.state.fadeAnim,
          backgroundColor: AppStyles.color.LIGHTCYAN,
          paddingLeft: 20,
        }}>
        {this.props.children}
      </Animated.View>
    );
  }
}
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
    const { item } = this.props;
    return (
      <ListItem
        containerStyle={[styles.container, { backgroundColor: AppStyles.color.background }]}
        leftIcon={
          <Icon
            name="angle-down"
            type="font-awesome"
            color={AppStyles.color.blue}
            size={30}
          // onPress={() => this.onExpandPress(i)}
          />
        }
        title={item.title}
        titleStyle={{ fontWeight: '500' }}
        subtitle={
          <View style={styles.subtitleView}>
            <Text style={styles.subText}>{MomentFunc.toDate(item.requestTime)}</Text>
          </View>
        }
      />
    );
  }
}
export const ItemBody = ({ item }) => (
  <FadeInView>
    {/* ==========  - Order Information ==================== */}
    <Title title="- Order Infomation" />
    <RenderItem title="Order Title" value={item.title} />
    <RenderItem title="Order ID" value={item.key} />

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

)
const styles = StyleSheet.create({
  container: {
    borderBottomColor: AppStyles.color.description,
    borderBottomWidth: 1,
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
  subText: {
    paddingLeft: 10,
  },



  // ======================
  //        item details style

  sectionTitle: {
    fontWeight: '500',
    fontSize: 16,
    marginVertical: 20,
    color: AppStyles.color.categoryTitle,
  },
  detailWrapper: {
    flex: 1,
    fontSize: 20,
    marginBottom: 20,
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
