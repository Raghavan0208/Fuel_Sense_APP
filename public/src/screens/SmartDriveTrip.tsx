import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlatList, Heading, HStack, Image, Spinner} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {countryDistance} from '../core/data';

interface TripData {
  StartDate: string;
  EndDate: string;
  UnitSystem: string;
  Addresses: {
    Start: Address;
    End: Address;
  };
  TransportType: {
    Current: string;
    ConfirmNeeded: boolean;
  };
}

interface Address {
  Full: string;
  Parts: {
    City: string;
    District: string;
  };
}

interface Trip {
  Id: string;
  DateUpdated: string;
  Data: TripData;
  Statistics: {
    Mileage: number;
    DurationMinutes: number;
  };
  Scores: {
    Safety: number;
    Eco: number;
  };
}

interface TripCardProps {
  trip: Trip;
  onPress?: (tripId: string) => void;
}

const SmartDriveTrip = ({navigation}: any) => {
  const [tripList, setTripList] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [token, setToken] = useState<string>('');
  const [countryCode, setCountryCode] = useState('');

  const getDamoovToken = async () => {
    const token: any = await AsyncStorage.getItem('damoovToken');
    console.log('🚀 ~ getDamoovToken ~ token:', token);
    setToken(token);
  };

  const fetchTripList = (page: number = 1) => {
    const currentDate = new Date();
    const oneMonthAgoDate = new Date();
    oneMonthAgoDate.setMonth(currentDate.getMonth() - 2);

    const myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');
    myHeaders.append('content-type', 'application/json');
    myHeaders.append('authorization', `Bearer ${JSON.parse(token)}`);

    const raw = JSON.stringify({
      StartDate: oneMonthAgoDate,
      EndDate: currentDate,
      IncludeDetails: true,
      IncludeStatistics: true,
      IncludeScores: true,
      Locale: 'EN',
      UnitSystem: 'Si',
      // SortBy: 'StartDateUtc',
      Paging: {
        Page: page,
        Count: 10,
        IncludePagingInfo: true,
      },
    });
    console.log(
      '🚀 ~ fetchTripList ~ myHeaders:',
      JSON.stringify(myHeaders, null, 2),
    );

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    setLoading(true);
    fetch('https://api.telematicssdk.com/trips/get/v1/', requestOptions)
      .then(response => response.json())
      .then(result => {
        setLoading(false);
        console.log('result?.Result?.Trips', result?.Result?.Trips.length);
        console.log('page', page);

        if (page === 1) {
          setTripList(result?.Result?.Trips || []);
        } else {
          setTripList(prevTrips => [
            ...prevTrips,
            ...(result?.Result?.Trips || []),
          ]);
        }
        setHasNextPage(result?.Result?.Trips?.length === 10);
        setCurrentPage(page);
      })
      .catch(error => {
        setLoading(false);
        setHasNextPage(false);
        console.error(error);
      });
  };

  const loadMoreTrips = () => {
    if (!loading && hasNextPage) {
      fetchTripList(currentPage + 1);
    }
  };

  const getCountryCode = async () => {
    const countryCode: any = await AsyncStorage.getItem('CountryId');
    setCountryCode(countryCode);
  };

  useEffect(() => {
    getCountryCode();
    if (token) {
      fetchTripList(1);
    }
    getDamoovToken();
  }, [token]);
  const distanceMeter = countryDistance[countryCode ?? 'UK'];

  const TripCard: React.FC<TripCardProps> = ({trip, onPress}) => {
    const startDate = new Date(trip.Data.StartDate);
    const endDate = new Date(trip.Data.EndDate);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('JourneyDetails', {
            damoovToken: token,
            TripId: trip?.Id,
            countryCode,
          })
        }
        activeOpacity={0.7}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 5,
              marginHorizontal: 3,
            }}>
            <Text style={[styles.time]}>
              {moment(startDate).format('DD-MMM-YY')}
            </Text>
            <Text style={styles.scoreValue}>
              {trip.Statistics.Mileage.toFixed(1)} {distanceMeter}
            </Text>
          </View>
          <View style={styles.timeRow}>
            <Text style={styles.time}>
              {' ' + moment(startDate).format('hh:mm A')}
            </Text>
            <Text numberOfLines={2} style={styles.location}>
              {trip.Data.Addresses.Start.Full}
            </Text>
          </View>
          <View style={styles.timeRow}>
            <Text style={styles.time}>
              {' ' + moment(endDate).format('hh:mm A')}
            </Text>
            <Text numberOfLines={2} style={styles.location}>
              {trip.Data.Addresses.End.Full}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // if (loading) {
  //   return (
  //     <SafeAreaView>
  //       <HStack space={2} justifyContent="center">
  //         <Spinner accessibilityLabel="Loading posts" />
  //         <Heading color="primary.500" fontSize="md">
  //           Loading
  //         </Heading>
  //       </HStack>
  //     </SafeAreaView>
  //   );
  // }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            mr="3"
            source={require('../assests/arrow_back.png')}
            style={styles.backButton}
            alt="jorney"
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>DriveSMART Trip</Text>
      </View>

      <FlatList
        // data={[...tripList].reverse()}
        data={tripList}
        // data={response}
        keyExtractor={item => item.Id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <TripCard trip={item} />}
        contentContainerStyle={styles.listContent}
        onEndReached={loadMoreTrips}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          loading ? (
            // <ActivityIndicator
            //   size="small"
            //   color="gray"
            //   style={{marginVertical: 20}}
            // />
            <HStack space={2} justifyContent="center">
              <Spinner accessibilityLabel="Loading posts" />
              <Heading color="primary.500" fontSize="md">
                Loading
              </Heading>
            </HStack>
          ) : null
        }
        ListEmptyComponent={
          !loading && (
            <Text
              style={{
                fontSize: 24,
                fontWeight: '600',
                color: 'black',
                alignSelf: 'center',
              }}>
              No Trip Found!
            </Text>
          )
        }
      />
    </SafeAreaView>
  );
};

export default SmartDriveTrip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  listContent: {
    paddingVertical: 16,
  },
  backButton: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  carImage: {
    width: 24,
    height: 24,
    resizeMode: 'cover',
    marginStart: 10,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginEnd: 10,
  },
  driver: {
    fontWeight: '700',
    color: 'gray',
    fontSize: 14,
  },
  scoreContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flex: 1,
    flexDirection: 'row',
  },
  scoreValue: {
    fontSize: 14,
    position: 'absolute',
    right: 10,
    fontWeight: '600',
    color: 'black',
  },

  timeRow: {
    flexDirection: 'row',
    // alignItems: 'center',
    flex: 1,
    marginBottom: 8,
  },
  time: {
    fontSize: 14,
    fontWeight: '700',
    color: 'black',
    textAlign: 'center',
  },
  location: {
    fontSize: 14,
    // width: '100%',
    flex: 1,
    fontWeight: '700',
    marginStart: 10,
    color: 'black',
  },
  tagContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
  },
  tagSelected: {
    backgroundColor: '#E8F5E9',
  },
  tagText: {
    fontSize: 14,
    color: '#666',
  },
  tagTextSelected: {
    color: '#4CAF50',
  },
  circleView: {
    borderColor: '#4CAF50',
    borderWidth: 2,
    height: 10,
    width: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignContent: 'center',
  },
  lineHight: {
    width: 1,
    height: 16,
    backgroundColor: 'lightgray',
    marginHorizontal: 20,
  },
  tripCard: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    position: 'absolute',
    end: 20,
    top: -25,
    paddingHorizontal: 12,
  },
});
