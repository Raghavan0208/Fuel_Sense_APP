/* eslint-disable */

import jwt_decode from 'jwt-decode';
import { Platform, PermissionsAndroid } from 'react-native';

export const getTokenDetail = (token: string): any => {
    try {
        let tokendata = jwt_decode(token);
        return tokendata;
    }
    catch (Error) {
        return null;
    }
}

export const thousandSeparator = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
