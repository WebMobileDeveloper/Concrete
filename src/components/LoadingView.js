import React from "react";
import { connect } from "react-redux";
import { Text, View, StyleSheet, ActivityIndicator, Image, ImageBackground } from "react-native";
import { AppStyles } from "../AppStyles";

class LoadingView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.superContainer}>
        {this.props.children}
        {this.props.isLoading && <View style={styles.container} >
          <ActivityIndicator
            style={styles.spinner}
            size="large"
            color={AppStyles.color.white} />
        </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  superContainer: {
    flex: 1,
  },
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'rgba(0,0,0,0.5)',

  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  spinner: {

  }
});
const mapStateToProps = state => ({
  isLoading: state.app.isLoading
});

export default connect(mapStateToProps)(LoadingView);