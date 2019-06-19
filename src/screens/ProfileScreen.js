import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Divider } from 'react-native-elements';
import { connect } from 'react-redux';

import { AppStyles, AppIcon } from "../AppStyles";
import { Configuration } from "../Configuration";
import HeaderLeft from "../components/HeaderLeft";
import HeaderButton from "../components/HeaderButton";

class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Profile Details",
    headerLeft: <HeaderLeft navigation={navigation} />,
    headerRight: <HeaderButton icon={AppIcon.images.edit} onPress={() => navigation.navigate('EditProfileStack')} />
  });
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        fullname: "",
        password: "",
        phone: "",
        uid: "",
        user_type: "",
        address: "",
        suburb: "",
        company_name: "",
        about: "",
      },
      submitted: false,
      isEditable: false,
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (JSON.stringify(nextProps.user) !== JSON.stringify(prevState.user)) {
      return ({ user: nextProps.user });
    }
    else return null;
  }
  render() {
    const { user } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer} contentContainerStyle={{ alignItems: 'center', }}>
          <View style={{ width: '100%' }}>
            {/* ==========  - Account Info ==================== */}
            <Text style={styles.sectionTitle}>{'- Account Info'}</Text>

            <RenderItem title="Email Address" value={user.email} />
            <RenderItem title="Full Name" value={user.fullname} />
            <RenderItem title="Phone Number" value={user.phone} />
            <Divider style={styles.divider} />


            {/* ==========  - Company Info ==================== */}
            <Text style={styles.sectionTitle}>{'- Company Info'}</Text>
            <RenderItem title="Company Name" value={user.company_name} direction="column" />
            <RenderItem title="Address" value={user.address} direction="column" />
            <RenderItem title="Suburb" value={user.suburb} direction="column" />
            <Divider style={styles.divider} />

            {/* ==========  - Other Informations ==================== */}
            <Text style={styles.sectionTitle}>{'- Other Informations'}</Text>
            <RenderItem title="About Me" value={user.about} direction="column" />


            <Text style={styles.description}>
              {`* This information will use as default value when you send order/quote.`}</Text>
          </View>
        </ScrollView>
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
    paddingTop: 30,
    marginBottom: 50,
  },
  title: {
    fontSize: AppStyles.fontSize.content,
    fontWeight: "bold",
    color: AppStyles.color.facebook,
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
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
  facebookContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30
  },
  facebookText: {
    color: AppStyles.color.white
  },

  itemWrapper: {
    flex: 1,
    fontSize: 20,
    marginBottom: 20,
  },
  subTitle: {
    fontFamily: AppStyles.fontName.bold,
    fontWeight:'bold',
    width: "40%",
    color: AppStyles.color.facebook,
    fontSize: 16,
    // backgroundColor:AppStyles.color.description,
  },
  contentStyle: {
    marginTop: 3,
    paddingLeft: 20,
    // backgroundColor: "red",
  },
  description: {
    padding: 10,
    marginVertical: 20,
    color:AppStyles.color.blue,
  },
});
const RenderItem = ({ title, value, direction }) => {
  direction = direction || 'row';
  return (
    <View style={[styles.itemWrapper, { flexDirection: direction }]}>
      <Text style={styles.subTitle}>{title}</Text>
      <Text style={styles.contentStyle}>{value}</Text>
    </View >
  )
}
const mapStateToProps = state => ({
  user: state.auth.user
});
export default connect(mapStateToProps)(ProfileScreen);
