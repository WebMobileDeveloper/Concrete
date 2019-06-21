import React from "react";
import { connect } from "react-redux";
import HeaderLeft from "../../components/HeaderLeft";
import RequestList from "../../components/orderItem/RequestList";

const mapStateToProps = state => ({ ordersList: state.app.ordersList, });
const mapDispatchToProps = (dispatch) => { return {}; }

class OrderReqScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Order Requests",
    headerLeft: <HeaderLeft navigation={navigation} />,
  });

  constructor(props) {
    super(props);
    this.state = {};
    console.log("OrderReqScreen Constructor");
  }

  render() {
    return (
      <RequestList items={this.props.ordersList} user_type="Client" order_type="Order" />
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(OrderReqScreen);
