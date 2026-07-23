/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {
  Alert,
  Platform,
} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  endConnection,
  flushFailedPurchasesCachedAsPendingAndroid,
  initConnection,
  withIAPContext,
} from 'react-native-iap';
import {Provider as ReduxProvider} from 'react-redux';
import store from './src/store/store';
import ReportSummary from './src/components/ReportSummary';
import {MainScreen} from './src/screens';
import IapSubscription from './src/screens/IapSubscription';
import Registration from './src/screens/registration/Registration';
import {theme} from './src/core/theme';
import {ChangeVehicle} from './src/screens/ChangeVehicle';
import AddVehicle from './src/screens/AddVehicle';
import JourneyDetails from './src/screens/JourneyDetails';
import SmartDriveTrip from './src/screens/SmartDriveTrip';
import FuelLogView from './src/screens/FuelLogView';
import ServiceLogView from './src/screens/ServiceLogView';
import InsuranceLogView from './src/screens/InsuranceLogView';
import AutoTracker from './src/components/AutoTracker';

const Stack = createStackNavigator();

function App(): JSX.Element {
  useEffect(() => {
    // TelematicsSdk.initialize();
    requestPermissions();
    // const eventEmitter = new NativeEventEmitter(TelematicsSdk);
    // const emitter = eventEmitter.addListener('onLowPowerModeEnabled', () => {
    //   console.log('Low power enabled');
    // });

    return () => {
      // emitter.remove();
    };
  }, []);

  const requestPermissions = async () => {
    try {
      // const isGranted = await TelematicsSdk.requestPermissions();
      // if (isGranted) console.log('All permissions granted');
    } catch (error: any) {
      showErrorAlert(error);
    }
  };

  const showErrorAlert = (error: any) => {
    console.log(error);
    Alert.alert('Error', error.message, [{text: 'OK'}]);
  };

  useEffect(() => {
    const init = async () => {
      try {
        await initConnection();
        if (Platform.OS === 'android') {
          flushFailedPurchasesCachedAsPendingAndroid();
        }
      } catch (error: any) {
        console.error('Error occurred during initialization', error.message);
      }
    };
    init();
    return () => {
      endConnection();
    };
  }, []);

  const datafetch = () => {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        InstanceId: 'e402cd97-38ca-4132-aed3-20842ed4ae8d',
        InstanceKey: '0dbb9e89-2e53-40ff-834c-00220ee8dbbe',
        'content-type': 'application/json',
      },
      body: JSON.stringify({UserFields: {ClientId: 'string'}}),
    };

    fetch('https://user.telematicssdk.com/v1/Registration/create', options)
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.error(err));
  };

  return (
    <NativeBaseProvider>
      <PaperProvider theme={theme}>
        <ReduxProvider store={store}>
          <NavigationContainer>
            {/* <LocationPermission
              onPermissionGranted={() => console.log('Permissions granted')}
            /> */}
            <Stack.Navigator
              screenOptions={{headerShown: false, animationEnabled: true}}>
              <Stack.Screen name="Dashboard" component={MainScreen} />
              <Stack.Screen
                name="ReportSummary"
                component={ReportSummary}
                options={{headerShown: true}}
              />
              <Stack.Screen name="Registration" component={Registration} />
              <Stack.Screen name="JourneyDetails" component={JourneyDetails} />
              <Stack.Screen name="SmartDriveTrip" component={SmartDriveTrip} />
              <Stack.Screen
                name="Subscription"
                component={withIAPContext(IapSubscription)}
              />
              <Stack.Screen name="Vehicle" component={ChangeVehicle} />
              <Stack.Screen name="AddVehicle" component={AddVehicle} />
              <Stack.Screen name="FuelLogView" component={FuelLogView} />
              <Stack.Screen name="ServiceLogView" component={ServiceLogView} />
              <Stack.Screen name="InsuranceLogView" component={InsuranceLogView} />
              <Stack.Screen name="AutoTracker" component={AutoTracker} />
            </Stack.Navigator>
          </NavigationContainer>
        </ReduxProvider>
      </PaperProvider>
    </NativeBaseProvider>
  );
}

export default App;
