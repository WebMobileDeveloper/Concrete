import React from "react";
import { connect } from "react-redux";

import HeaderLeft from "../../components/HeaderLeft";
import RequestList from "../../components/RequestList";

const mapStateToProps = state => ({ ordersList: state.app.ordersList, });
const mapDispatchToProps = (dispatch) => { return {}; }

class OrdersScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Orders",
    headerLeft: <HeaderLeft navigation={navigation} />,
  });

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <RequestList items={this.props.ordersList} user_type="Customer" order_type="Order" />
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(OrdersScreen);
