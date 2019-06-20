
import Toast from 'react-native-root-toast';
import moment from "moment";
import { AppStyles } from '../AppStyles';


// timestamp=>fromNow
export const MomentFunc = {
    moment: moment,
    fromNow: timestamp => moment(timestamp).fromNow(),
    toDate: timestamp => moment(timestamp).format("ddd, MMM/DD/YYYY, h:mm A")
}

export const show_toast = (title) => {
    Toast.show(title, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        backgroundColor: AppStyles.color.main,
        delay: 0,
        opacity: 0.7,
    });
}

export const sortByField = (array, key, asc = true) => {
    function compareasc(a, b) {
        if (a[key] < b[key]) {
            return -1;
        }
        if (a[key] > b[key]) {
            return 1;
        }
        return 0;
    }

    function comparedesc(a, b) {
        if (a[key] > b[key]) {
            return -1;
        }
        if (a[key] < b[key]) {
            return 1;
        }
        return 0;
    }

    return array.sort(asc ? compareasc : comparedesc);
}