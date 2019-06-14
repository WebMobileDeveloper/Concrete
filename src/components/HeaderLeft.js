import React from 'react';
import { TouchableOpacity, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { AppIcon, AppStyles, } from "../AppStyles";
import { Configuration } from "../Configuration";

export default HeaderLeft = ({ navigation }) => {
    return (
        <TouchableOpacity onPress={() => { navigation.openDrawer(); }}>
            {navigation.state.params && navigation.state.params.menuIcon ?
                (
                    <FastImage
                        style={styles.userPhoto}
                        resizeMode={FastImage.resizeMode.cover}
                        source={{ uri: navigation.state.params.menuIcon }}
                    />
                ) : (
                    <FastImage
                        style={styles.userPhoto}
                        resizeMode={FastImage.resizeMode.cover}
                        source={AppIcon.images.defaultUser}
                    />
                )}
        </TouchableOpacity>
    );
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
    userPhoto: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: 5
    }
});