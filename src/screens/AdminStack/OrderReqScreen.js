import React from "react";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import {AccordionList } from 'accordion-collapse-react-native';

import HeaderLeft from "../../components/HeaderLeft";
import { ItemHeader, ItemBody } from "../../components/OrderItem";

const mapStateToProps = state => ({
  ordersList: state.app.ordersList,
});
const mapDispatchToProps = (dispatch) => {  return {  };}

class OrdersScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Orders",
    headerLeft: <HeaderLeft navigation={navigation} />,

  });

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }
  _head = (item) => (<ItemHeader item={item} type="Order"/>);

  _body = (item) => (<ItemBody item={item}  type="Order"/>);

  render() {
    return (
      <ScrollView>
        <AccordionList
          list={this.props.ordersList}
          header={this._head}
          body={this._body}
        />
      </ScrollView>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(OrdersScreen);
