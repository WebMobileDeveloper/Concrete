import React from "react";
import { connect } from "react-redux";

import HeaderLeft from "../../components/HeaderLeft";
import RequestList from "../../components/orderItem/RequestList";

const mapStateToProps = state => ({ list: state.app.list.Order, });
const mapDispatchToProps = (dispatch) => { return {}; }

class OrderReqScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Order Requests",
    headerLeft: <HeaderLeft navigation={navigation} />,
  });

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <RequestList list={this.props.list} user_type="Client" order_type="Order" navigation={this.props.navigation} />
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(OrderReqScreen);
