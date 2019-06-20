import React from "react";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import { AccordionList } from 'accordion-collapse-react-native';

import HeaderLeft from "../../components/HeaderLeft";
import { ItemHeader, ItemBody } from "../../components/OrderItem";

const mapStateToProps = state => ({
  // user: state.auth.user,
  quotesList: state.app.quotesList,
});
const mapDispatchToProps = (dispatch) => {
  return {
    // watchquotesList: (uid) => dispatch(watchquotesList(uid)),
  };
}
class QuotesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Quotes",
    headerLeft: <HeaderLeft navigation={navigation} />,

  });

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }
  _head = (item) => (<ItemHeader item={item} type="Quote" />);

  _body = (item) => (<ItemBody item={item} type="Quote" />);

  render() {
    return (
      <ScrollView>
        <AccordionList
          list={this.props.quotesList}
          header={this._head}
          body={this._body}
        />
      </ScrollView>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(QuotesScreen);
