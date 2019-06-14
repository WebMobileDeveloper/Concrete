import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from "react-native";
import { AppIcon, } from "../AppStyles";

export default HeaderLeft = ({ navigation }) => (
    <TouchableOpacity onPress={() => { navigation.openDrawer(); }}>
        <Image style={styles.menu} source={AppIcon.images.menu} />
    </TouchableOpacity>
)
const styles = StyleSheet.create({
    menu: {
        width: 25,
        height: 20,
        marginLeft: 15
    }
});