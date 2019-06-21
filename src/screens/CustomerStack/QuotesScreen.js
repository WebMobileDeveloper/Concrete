import React from "react";
import { connect } from "react-redux";

import HeaderLeft from "../../components/HeaderLeft";
import RequestList from "../../components/RequestList";

const mapStateToProps = state => ({ quotesList: state.app.quotesList, });
const mapDispatchToProps = (dispatch) => { return {}; }


class QuotesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Quotes",
    headerLeft: <HeaderLeft navigation={navigation} />,
  });

  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <RequestList items={this.props.quotesList} user_type="Customer" order_type="Quote" />
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(QuotesScreen);
