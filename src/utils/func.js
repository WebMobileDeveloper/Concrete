
import Toast from 'react-native-root-toast';
import {AppStyles} from '../AppStyles';
export const show_toast = (title) => {
    let toast = Toast.show(title, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        backgroundColor: AppStyles.color.main,
        delay: 0,
        opacity: 1,
    });
}