import React from "react";
import { ScrollView, StyleSheet, Text, } from "react-native";

import { connect } from "react-redux";
import { AppStyles, } from "../AppStyles";
import { Configuration } from "../Configuration";
import HeaderLeft from "../components/HeaderLeft";

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Home",
    headerLeft: <HeaderLeft navigation={navigation} />
  });

  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
    };
  }

  componentDidMount() {
    // this.props.navigation.setParams({
    //   menuIcon: this.props.user.profileURL
    // });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Welcome {this.props.user.email}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: Configuration.home.listing_item.offset
  },
  title: {
    fontFamily: AppStyles.fontName.bold,
    fontWeight: "bold",
    color: AppStyles.color.title,
    fontSize: 25
  },
});

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(HomeScreen);
