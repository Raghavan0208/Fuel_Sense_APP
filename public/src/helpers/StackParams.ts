import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {IMileageChartModel, renderTrip} from '../models/Models';

export type RootStackParamList = {
  Dashboard: undefined;
  ReportSummary: {
    item: renderTrip;
    list: Array<IMileageChartModel>;
    countryCode?: any;
  };
  Subscription: undefined;
};

export type RootNavigation = StackNavigationProp<RootStackParamList>;

export interface ScreenProps<S extends keyof RootStackParamList> {
  navigation: RootNavigation;
  route: RouteProp<RootStackParamList, S>;
}
