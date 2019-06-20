
import { Animated, Easing } from "react-native";

export const firebaseConfig = {
  apiKey: "AIzaSyBO3emUdScFuxy3P8aMrIT1IFCz-QzV6aQ",
  authDomain: "concrete-92b62.firebaseapp.com",
  databaseURL: "https://concrete-92b62.firebaseio.com",
  projectId: "concrete-92b62",
  storageBucket: "concrete-92b62.appspot.com",
  messagingSenderId: "326097592364",
  appId: "1:326097592364:web:3099a4bac86f6d84"
};


export const Configuration = {
  home: {
    tab_bar_height: 50,
    initial_show_count: 4,
    listing_item: {
      height: 130,
      offset: 15,
      saved: {
        position_top: 5,
        size: 25
      }
    }
  },
  // map: {
  //   origin: {
  //     latitude: 37.78825,
  //     longitude: -122.4324
  //   },
  //   delta: {
  //     latitude: 0.0422,
  //     longitude: 0.0221
  //   }
  // },
 
};
export const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
});