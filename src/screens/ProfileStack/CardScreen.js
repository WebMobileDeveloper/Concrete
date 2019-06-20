import React from "react";
import { connect } from "react-redux";
import { Picker, StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Divider } from 'react-native-elements';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";

import Button from "react-native-button";

import { AppStyles, AppIcon } from "../../AppStyles";
import { Configuration } from "../../Configuration";
import HeaderLeft from "../../components/HeaderLeft";
import HeaderButton from "../../components/HeaderButton";


class CardScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Credit Cards",
    headerLeft: <HeaderLeft navigation={navigation} />,
    headerRight: <HeaderButton icon={AppIcon.images.profile} onPress={() => navigation.navigate('ProfileStack')} />
  });

  constructor(props) {
    super(props);

    this.state = {};
    this.updateState = this.updateState.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {

  }
  updateState() {

  }
  onCardChange(form) {
    console.log(form);
  }


  render() {
    return (
      <View style={styles.container}>

        <KeyboardAwareScrollView style={styles.scrollContainer} contentContainerStyle={{ alignItems: 'center', }}>
          <View style={{ width: '100%' }}>

            {/* ==========  - Payment Informations ==================== */}
            <Text style={styles.sectionTitle}>{'- Payment Informations'}</Text>
            <CreditCardInput onChange={this.onCardChange} />
            {/* <CreditCardInput onChange={this.onCardChange} /> */}

            <Divider style={styles.divider} />

            <Text style={styles.description}>
              {`* This information will use as default value when you send order/quote.`}</Text>
          </View>
        </KeyboardAwareScrollView>

        <View style={styles.buttonWrapper}>
          <Button containerStyle={styles.sendButton}
            style={styles.buttonText}
            onPress={() => this.onSubmint()}>Update Profile</Button>
        </View>
      </View>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: Configuration.home.listing_item.offset,
  },
  buttonWrapper: {
    backgroundColor: "#eee",
    width: '100%',
    alignItems: 'center',
  },
  sendButton: {
    width: AppStyles.buttonWidth.main,
    borderRadius: AppStyles.borderRadius.main,
    backgroundColor: AppStyles.color.facebook,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: AppStyles.color.white
  },
  title: {
    fontFamily: AppStyles.fontName.bold,
    fontWeight: "bold",
    color: AppStyles.color.title,
    fontSize: 25
  },
  subTitle: {
    fontFamily: AppStyles.fontName.bold,
    // fontWeight: "bold",
    color: AppStyles.color.facebook,
    fontSize: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 20,
    color: AppStyles.color.categoryTitle,
  },
  divider: {
    backgroundColor: AppStyles.color.filterTitle,
    marginVertical: 20,
    marginHorizontal: '5%',
  },
  itemWrapper: {
    flexDirection: "column",
    fontSize: 20,
  },
  multilineText: {
    borderWidth: 1,
    borderStyle: "solid",
    padding: 10,
    borderColor: AppStyles.color.grey,
  },
  description: {
    padding: 10,
    marginVertical: 20,
    color: AppStyles.color.blue,
  },
});
const RenderItem = ({ title, children, direction }) => {
  return (
    <View style={[styles.itemWrapper, { flexDirection: direction }]}>
      <Text style={styles.subTitle}>{title}</Text>
      {children}
    </View>
  )
}
const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(CardScreen);
