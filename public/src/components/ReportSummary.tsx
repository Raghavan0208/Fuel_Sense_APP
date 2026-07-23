import moment from 'moment';
import {Divider, Image, Text} from 'native-base';
import React, {
  Fragment,
  memo,
  useCallback,
  useLayoutEffect,
  useMemo,
} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ScreenProps} from '../helpers/StackParams';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  countryCurrency,
  countryDistance,
  countryDistanceCaps,
} from '../core/data';

const ReportSummary = ({navigation, route}: ScreenProps<'ReportSummary'>) => {
  const title = useMemo(() => {
    return route.params?.item?.tripName;
  }, [route.params?.item.tripName]);
  const countryCode = useMemo(() => {
    return route.params?.countryCode;
  }, [route?.params?.countryCode]);
  const listData = useMemo(() => {
    return route.params?.list;
  }, [route.params?.list]);

  const {top, bottom} = useSafeAreaInsets();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Report Details',
      headerTitleAlign: 'center',
    });
  }, [navigation, title]);

  const listHeader = useCallback(
    () => (
      <Fragment>
        <Divider height={2} backgroundColor={'#F6F9FE'} />

        <View style={styles.headerComp}>
          <Text
            color="coolGray.800"
            textTransform={'uppercase'}
            fontWeight="medium"
            style={styles.headText}>
            Mileage Report
          </Text>
          <Text color="#2f75b5" fontWeight="medium" style={styles.headText}>
            {title}
          </Text>
        </View>

        <Divider height={2} backgroundColor={'#F6F9FE'} />

        <View style={[styles.headerComp, {paddingVertical: 8}]}>
          <Text
            color="coolGray.800"
            fontWeight="medium"
            style={[styles.headText, {marginBottom: 12}]}>
            {'Summary'}
          </Text>
        </View>
      </Fragment>
    ),
    [],
  );
  const countrySymbole = countryCurrency[countryCode];

  const itemRenderHandler = useCallback(({item}: any) => {
    return (
      <View style={styles.rootItem}>
        <Text color={'#2F74B5'} fontWeight={'medium'} style={styles.itemDate}>
          {moment(item?.entryDate).format('DD MMM YYYY')}
        </Text>

        <View style={styles.tripDetailContainer}>
          <View style={styles.tripRow}>
            <Image
              source={require('../assests/location.png')}
              height={6}
              width={6}
              alt="location"
            />
            <Text
              color={'#434343'}
              fontWeight={'medium'}
              numberOfLines={2}
              style={styles.itemDate}>
              {item?.startLocation || '-'}
            </Text>
          </View>

          <View style={styles.tripRow}>
            <Divider
              orientation="vertical"
              height={6}
              my={2}
              ml={3}
              backgroundColor={'transparent'}
              borderWidth={0.2}
              borderStyle={'dashed'}
            />
          </View>

          <View style={styles.tripRow}>
            <Image
              source={require('../assests/location.png')}
              height={6}
              width={6}
              alt="location"
            />
            <Text
              color={'#434343'}
              fontWeight={'medium'}
              style={styles.itemDate}>
              {item?.endLocation || '-'}
            </Text>
          </View>

          <Divider
            orientation="horizontal"
            height={0.5}
            backgroundColor={'#2F74B50D'}
            mt={3}
            mb={2}
          />
        </View>

        <View style={styles.extraDetails}>
          <View style={styles.tripRow}>
            <Image
              source={require('../assests/miles.png')}
              height={5}
              width={5}
              alt={'miles'}
            />

            <Text
              color={'#434343'}
              fontWeight={'medium'}
              mx={1}
              style={styles.itemDate}>
              {`${Number(item?.distance).toFixed(0)} ` +
                countryDistanceCaps[countryCode ?? 'UK']}
            </Text>
          </View>

          <Text color={'#2F74B5'} fontWeight={'medium'} style={styles.itemDate}>
            {`${countrySymbole}${Number(item?.mileageRate).toFixed(2)}`}
          </Text>
        </View>
      </View>
    );
  }, []);

  const itemSeparator = useCallback(
    () => <Divider height={3} backgroundColor={'transparent'} />,
    [],
  );

  return (
    <View style={styles.rootContainer}>
      <View style={styles.listComp}>
        <FlatList
          data={listData}
          renderItem={itemRenderHandler}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={[
            styles.contentContainerStyle,
            {paddingBottom: bottom + 22},
          ]}
          ListHeaderComponent={listHeader}
          ItemSeparatorComponent={itemSeparator}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
  },

  headerComp: {
    padding: 22,
  },

  listComp: {
    flex: 1,
  },

  headText: {
    fontSize: 22,
    marginTop: 6,
  },

  contentContainerStyle: {},

  rootItem: {
    backgroundColor: '#F6F9FE',
    borderRadius: 15,
    padding: 22,
    marginHorizontal: 22,
  },

  itemDate: {
    fontSize: 16,
  },

  tripDetailContainer: {
    paddingVertical: 12,
  },

  tripRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  extraDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default memo(ReportSummary);
