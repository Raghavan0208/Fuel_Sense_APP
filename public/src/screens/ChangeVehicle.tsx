/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    TouchableOpacity,
    Image,
    FlatList,

} from "react-native";

import { AddIcon, Box, Radio, Text } from "native-base";
import CustomButton from "../components/CustomButton";
import CommonServices from "../Services/CommonServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getTokenDetail } from "../components/Helper";
import { ActivityIndicator } from "react-native-paper";
import RNRestart from 'react-native-restart';
import { useIsFocused } from "@react-navigation/native";

export const ChangeVehicle = ({ navigation }: any) => {
    const isFocused = useIsFocused()
    const [loading, setLoading] = useState(false);
    const [selectedRadio, setSelectedRadio] = useState('');
    const [vehicleData, setVehicleData] = useState<any[]>([]);

    const onGoBackPress = () => {
        navigation.goBack();
    };

    useEffect(() => {
        if (isFocused) {
            getVehicleDetail()
        }
    }, [isFocused])

    const handlePress = () => {
        AsyncStorage.getItem('CountryId').then(countryCode => {
            if (countryCode) {
                navigation.navigate("AddVehicle")
            }
        })
    };

    const onSaveClicked = () => {
        console.log("init", selectedRadio)
        if (selectedRadio) {
            AsyncStorage.getItem('star-zero-token').then(res => {
                if (res == null) {
                    console.log("sele", selectedRadio, res)
                }
                if (res) {
                    AsyncStorage.getItem('CountryId').then(countryCode => {
                        console.log("sele1", selectedRadio, res, countryCode)
                        if (countryCode) {
                            const loginId = getTokenDetail(res)?.LoginId;
                            CommonServices.postWithDoubleQueryParam(
                                'NewVehicle',
                                'SetDefaultVehicle',
                                'loginid',
                                loginId,
                                'vehicleId',
                                selectedRadio,
                                JSON.parse(countryCode),
                            )
                                .then(res => {
                                    if (res.status == 200) {
                                        console.log(selectedRadio)
                                        RNRestart.restart();
                                    }
                                })
                                .catch(e => console.log(e));
                        }
                    })
                }

            })
        }
        else {
            RNRestart.restart();
        }
    }

    const getVehicleDetail = () => {
        setLoading(true)
        AsyncStorage.getItem('star-zero-token').then(res => {
            if (res == null) {
            }
            if (res) {
                AsyncStorage.getItem('CountryId').then(countryCode => {
                    if (countryCode) {

                        const loginId = getTokenDetail(res)?.LoginId;

                        CommonServices.getWithQueryParam(
                            'NewVehicle',
                            'GetAllVehicle',
                            'loginid',
                            loginId,
                            JSON.parse(countryCode),
                        )
                            .then(res => {
                                if (res.status === 200) {
                                    const revereseddata = res.data.reverse();
                                    console.log(res.data);
                                    setVehicleData(revereseddata);
                                    setLoading(false)
                                } else {
                                    setLoading(false)
                                }
                            })
                            .catch((e: string) => {
                                setLoading(false)
                                console.log(e);
                            });

                    } else {
                        setLoading(false)
                    }
                });
            }
        })
    }


    return (
        <>
            {loading ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator /></View> : <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={onGoBackPress} style={styles.arrowContainer}>
                        <Image
                            source={require('../assests/arrow_back.png')}
                            style={styles.leftArrow}
                        />
                    </TouchableOpacity>
                    <Text style={styles.subscribe}>Change Vehicle</Text>
                    <View />
                </View>

                <FlatList
                    data={vehicleData?.filter(item => item.brandName && item.brandName.trim() !== '' && item.brandName !== "undefined" && item.brandName.toLowerCase() !== 'null')}
                    renderItem={({ item, index }) => (
                        <>{!(item.brandVariant == "undefined-undefined") &&
                            <View style={[styles.boxContainer, { borderColor: '#000' }]}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={{}}
                                    onPress={() => { }}>
                                    <View
                                        style={{
                                            paddingHorizontal: 15,
                                            paddingVertical: 15,
                                        }}>

                                        {/* Brand */}
                                        <View style={[styles.rowView, { justifyContent: "space-between" }]}>
                                            <View style={styles.brandRow}>
                                                <Text style={styles.driveTile}>Brand:</Text>
                                                <Text
                                                    color="black"
                                                    textTransform={'uppercase'}
                                                    fontWeight="medium"
                                                    fontSize="sm">
                                                    {"  "}{item.brandName}
                                                </Text>
                                            </View>
                                            
                                            <Box>
                                                <Radio.Group
                                                    name="myRadioGroup"
                                                    accessibilityLabel="favorite options"
                                                    value={selectedRadio ? selectedRadio : item.isDefault && item.id}
                                                    onChange={nextValue => setSelectedRadio(nextValue)}
                                                >
                                                    <Radio value={item.id} my={1} colorScheme="purple">
                                                        <Text
                                                            color="coolGray.800"
                                                            textTransform={'uppercase'}
                                                            fontWeight="medium"
                                                            fontSize="sm">
                                                            {""}
                                                        </Text>
                                                    </Radio>
                                                </Radio.Group>
                                            </Box>
                                        </View>

                                        <View style={styles.rowView}>
                                            <Text style={styles.driveTile}>Series:</Text>
                                            <Text
                                                color="black"
                                                fontWeight="bold"
                                                fontSize="sm">
                                                {"  "}{item.brandSeriesName}, {item.brandVariant}
                                            </Text>
                                        </View>


                                        <View style={styles.rowView}>
                                            <Text style={styles.driveTile}>Register No:</Text>
                                            <Text
                                                color="black"
                                                textTransform={'uppercase'}
                                                fontWeight="bold"
                                                fontSize="sm">
                                                {"  "}{item.registrationNumber}
                                            </Text>
                                        </View>

                                        {/* Total Drive, Miles, Amount */}
                                        <View style={[styles.rowView, { justifyContent: "space-between" }]}>
                                            <View>
                                                <Text style={styles.driveTile}>Total drive:</Text>
                                                <Text
                                                    color="black"
                                                    textTransform={'uppercase'}
                                                    fontWeight="bold"
                                                    fontSize="sm">
                                                    {item.totalDriveCount}
                                                </Text>
                                            </View>
                                            <View>
                                                <Text style={styles.driveTile}>Total miles:</Text>
                                                <Text
                                                    color="black"
                                                    textTransform={'uppercase'}
                                                    fontWeight="bold"
                                                    fontSize="sm">
                                                    {item.totalMilesCount}
                                                </Text>
                                            </View>
                                            <View>
                                                <Text style={styles.driveTile}>Amount:</Text>
                                                <Text
                                                    color="black"
                                                    textTransform={'uppercase'}
                                                    fontWeight="bold"
                                                    fontSize="sm">
                                                    {item.totalMileageRates}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                        </>)}
                    keyExtractor={item => item.id.toString()}
                />

                {vehicleData && vehicleData.length > 0 ? <View style={[styles.rowView, { width: "90%", alignSelf: 'center', justifyContent: "space-between" }]}>
                    <CustomButton
                        //isLoading={loading}
                        title="Save"
                        onButtonPress={onSaveClicked}
                        containerStyle={{ width: "100%", alignSelf: 'center' }}
                    />
                </View> : null}

            </SafeAreaView >}
            <TouchableOpacity style={styles.fab} onPress={handlePress}>
                <AddIcon name="plus" size={30} color="white" />
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        marginBottom: 10
    },
    leftArrow: {
        height: 24,
        width: 24,
    },
    arrowContainer: {
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
    },
    subscribe: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
    },

    boxContainer: {
        borderColor: '#000',
        width: "90%",
        alignSelf: 'center',
        borderRadius: 10,
        backgroundColor: '#ebebeb',
        marginBottom: 10,
        borderWidth: 0.5,
        marginTop: 10
    },
    driveTile: {
        fontSize: 14,
        fontWeight: '400',
        color: '#000',
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: "space-between",
        padding: 5,
        marginTop: 2
    },
    brandRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    fab: {
        position: 'absolute',
        bottom: 90,
        right: 30,
        backgroundColor: 'purple',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5, // Adds shadow for Android
        shadowColor: '#000', // Adds shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },

});
