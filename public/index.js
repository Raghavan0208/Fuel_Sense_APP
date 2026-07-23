/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import TelematicsSdk from "react-native-telematics";
import App from './App';
import {name as appName} from './app.json';
// TelematicsSdk.initialize();
AppRegistry.registerComponent(appName, () => App);
