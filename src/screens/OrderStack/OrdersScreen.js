import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import { Thumbnail, List, ListItem, Separator } from 'native-base';

import { AppStyles, } from "../../AppStyles";
import { Configuration } from "../../Configuration";
import HeaderLeft from "../../components/HeaderLeft";
import { ItemHeader, ItemBody } from "../../components/OrderItem";

const mapStateToProps = state => ({
  // user: state.auth.user,
  ordersList: state.app.ordersList,
});
const mapDispatchToProps = (dispatch) => {
  return {
    // watchOrdersList: (uid) => dispatch(watchOrdersList(uid)),
  };
}
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
  _head = (item) => {
    return (<ItemHeader item={item} />)
  };

  _body = (item) => {
    console.log("body_item ====", item);
    return (<ItemBody item={item} />);
  }

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
