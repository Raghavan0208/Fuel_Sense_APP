/* eslint-disable */
import {
    Alert,
    StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
    Button,
    Heading,
    HStack,
    Modal,
    Spinner,
    Text,
} from 'native-base';
import { View } from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import CustomDropDown from '../components/CustomDropDown';
import CommonServices from '../Services/CommonServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { countryCurrency } from '../core/data';
import moment from 'moment';
import { getTokenDetail } from '../components/Helper';
import { IJourneyModel } from '../models/Models';

type Props = {
    setfuellogmodelopen: any
    editData: any
    planreadingid: any
    navigation: any
};

const FuelLogEdit = ({
    setfuellogmodelopen,
    editData,
    planreadingid,
    navigation
}: Props) => {
    const [isSubmitPressed, setIsSubmitPressed] = useState<any>(false);
    const [fuelogDistance, setFuelLogDistance] = useState('');
    const [costPerGallon, setCostperGallon] = useState<any>();
    const [fuelQuantity, setFuelQuantity] = useState<any>();
    const [fuelBrandArray, setFuelBrandArray] = useState<Array<any>>([]);
    const [fuelBrand, setFuelBrand] = useState<any>();
    const [totalFuelCost, setTotalFuelCost] = useState<any>();
    const [lastMPG, setLastMPG] = useState<any>();
    const [countrysymbol, setCountrySymbol] = useState('');

    const [fuelTypeArray, setFuelTypeArray] = useState<Array<any>>([]);
    const [fuelType, setFuelType] = useState<any>();
    const [dashboardData, setDashboardData] = useState<IJourneyModel>(
        {} as IJourneyModel,
    );

    const onUpdateFuelLog = () => {
        setIsSubmitPressed(true);
        const data = {
            fuellogdate: moment(new Date()).format("YYYY-MM-DD HH:mm"),
            planreadingid: planreadingid,
            userplanid: dashboardData.id,
            distance: fuelogDistance,
            costpergallon: costPerGallon,
            fuelquantity: fuelQuantity,
            fuelBrand: fuelBrand,
            fueltype: fuelType,
            totalfuelcost: totalFuelCost,
            lastmpg: lastMPG
        };
        CommonServices.postWithMultipleQueryParam("FuelLog", "Edit", "id", editData.fuelLogId, data, countrysymbol).then((res) => {
            if (res.status === 200) {
                setfuellogmodelopen(false);
                setIsSubmitPressed(false);
                resetForm();
                Alert.alert('Success', 'Fuel Log Updated Successfully');
                navigation.replace('FuelLogView');
            }
        })
    }


    useEffect(() => {
        const quantity = parseFloat(fuelQuantity) || 0;
        const distance = parseFloat(fuelogDistance) || 0;

        const totalCost = (parseFloat(costPerGallon) || 0) * quantity;
        setTotalFuelCost(totalCost.toFixed(2)); // Set formatted value
        if (quantity > 0) {
            const totalLastMPG = distance / quantity;
            setLastMPG(totalLastMPG.toFixed(2));
        } else {
            setLastMPG('0.00'); // Default value
        }
    }, [costPerGallon, fuelQuantity, fuelogDistance]);


    useEffect(() => {
        if (editData) {
            setFuelLogDistance(String(editData.distance));
            setCostperGallon(String(editData.costperGallon));
            setFuelQuantity(String(editData.fuelQuantity));
            setFuelBrand(editData.fuelBrand);
            setFuelType(editData.fuelType);
            setLastMPG(String(editData.lastMPG));
        }
    }, [editData]);

    let countrySymbole = '';

    useEffect(() => {
        AsyncStorage.getItem('star-zero-token').then(res => {
            if (res == null) {
            }
            if (res) {
                AsyncStorage.getItem('CountryId').then(ress => {
                    if (ress) {
                        let code = JSON.parse(ress);
                        countrySymbole = countryCurrency[code];
                        setCountrySymbol(code);
                        const loginId = getTokenDetail(res)?.LoginId;
                        AsyncStorage.setItem('LOGIN_ID', loginId);
                        GetDashboard(code, loginId);
                    }
                });
            }
        });
    }, []);

    const GetDashboard = (country: string, LoginId: any) => {
        CommonServices.getWithQueryParam(
            'Journey',
            'GetDashboard',
            'loginId',
            LoginId,
            country,
        )
            .then(res => {
                if (res.status == 200) {
                    setDashboardData(res.data);
                }
            })
            .catch(e => console.log(e));
    };

    useEffect(() => {
        if (countrysymbol) {
            getAllFuelBrand();
            getFuelType();
        }
    }, [countrysymbol]);

    const getAllFuelBrand = () => {
        CommonServices.get("Master", "GetAllFuelBrand", countrysymbol).then(res => {
            if (res.status === 200) {
                setFuelBrandArray(res.data);
            }
        }).catch((e: string) => {
            console.log(e);
        });
    }

    const getFuelType = () => {
        CommonServices.get("Master", "GetAllFuelType", countrysymbol).then(res => {
            if (res.status === 200) {
                setFuelTypeArray(res.data)
            }
        }).catch(e => console.log(e));
    }

    const resetForm = () => {
        setFuelLogDistance('');
        setCostperGallon('');
        setFuelQuantity('');
        setFuelBrand('');
        setFuelType('');
        setTotalFuelCost('');
        setLastMPG('');
    };

    return (
        <>
            <Modal.Content maxWidth="100%" w="100%" h="auto" maxHeight="100%">
                <Modal.CloseButton
                    onPress={() => {
                        setfuellogmodelopen(false);
                        setIsSubmitPressed(false);
                        resetForm();
                    }} />
                <Modal.Header>Edit your Fuel Log</Modal.Header>
                <Modal.Body>
                    <Text ml="1" style={styles.locTitle}>
                        Distance
                    </Text>
                    <View style={{ marginBottom: 3 }}>
                        <CustomTextInput
                            placeHolder="Distance"
                            editable={false}
                            textInputStyle={{
                                backgroundColor: '#eeeeee',
                                borderRadius: 10,
                            }}
                            value={fuelogDistance}
                            onValueChange={setFuelLogDistance}
                        />
                    </View>

                    <View style={{ marginBottom: 3 }}>
                        <Text ml="1" style={styles.locTitle}>
                            Cost Per Gallon *
                        </Text>
                        <CustomTextInput
                            keyboardType={'number-pad'}
                            placeHolder="Cost Per Gallon"
                            value={costPerGallon}
                            onValueChange={setCostperGallon}
                        />
                        {isSubmitPressed && !costPerGallon ? (
                            <Text style={styles.errorText}>
                                Cost is Required
                            </Text>
                        ) : (
                            ''
                        )}
                    </View>

                    <View style={{ marginBottom: 3 }}>
                        <Text ml="1" style={styles.locTitle}>
                            Fuel Quantity Litre/Gallon *
                        </Text>
                        <CustomTextInput
                            placeHolder="Fuel Quantity"
                            value={fuelQuantity}
                            keyboardType={'number-pad'}
                            onValueChange={setFuelQuantity}
                        />
                        {isSubmitPressed && !fuelQuantity ? (
                            <Text style={styles.errorText}>
                                Fuel Quantity is Required
                            </Text>
                        ) : (
                            ''
                        )}
                    </View>

                    <View style={{ marginBottom: 3 }}>
                        <Text ml="1" style={styles.locTitle}>
                            Fuel Brand *
                        </Text>
                        <CustomDropDown
                            data={fuelBrandArray}
                            placeholder={'Fuel Brand'}
                            value={fuelBrand}
                            setValue={setFuelBrand}
                            customStyle={{ paddingLeft: 10 }}
                        />
                        {isSubmitPressed && (fuelBrand == null) ? (
                            <Text style={styles.errorText}>Fuel Brand is Required</Text>
                        ) : (
                            ''
                        )}
                    </View>

                    <View style={{ marginBottom: 3 }}>
                        <Text ml="1" style={styles.locTitle}>
                            Fuel Type *
                        </Text>
                        <CustomDropDown
                            data={fuelTypeArray}
                            value={fuelType}
                            placeholder={'Fuel Type'}
                            setValue={setFuelType}
                            customStyle={{ paddingLeft: 10 }}
                        />
                        {isSubmitPressed && (fuelType == null) ? (
                            <Text style={styles.errorText}>Fuel Type is Required</Text>
                        ) : (
                            ''
                        )}
                    </View>

                    <Text ml="1" style={styles.locTitle}>
                        Total Fuel Cost
                    </Text>
                    <View style={{ marginBottom: 3 }}>
                        <CustomTextInput
                            placeHolder="Total Fuel Cost"
                            value={totalFuelCost}
                            editable={false}
                            textInputStyle={{
                                backgroundColor: '#eeeeee',
                                borderRadius: 10,
                            }}
                            keyboardType={'number-pad'}
                            onValueChange={setTotalFuelCost}
                        />
                    </View>

                    <Text ml="1" style={styles.locTitle}>
                        Last MPG <Text style={{ fontSize: 13, fontWeight: '500' }}>(Miles Per Gallon)</Text>
                    </Text>
                    <View style={{ marginBottom: 3 }}>
                        <CustomTextInput
                            textInputStyle={{
                                backgroundColor: '#eeeeee',
                                borderRadius: 10,
                            }}
                            placeHolder="Last MPG"
                            value={lastMPG}
                            editable={false}
                            keyboardType={'number-pad'}
                            onValueChange={setLastMPG}
                        />
                    </View>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={2}>
                        <Button
                            variant="outline"
                            borderColor="black"
                            _text={{ color: 'black' }}
                            onPress={() => {
                                setfuellogmodelopen(false);
                                setIsSubmitPressed(false);
                                resetForm();
                            }}>
                            Cancel
                        </Button>
                        <Button
                            backgroundColor={'#000'}
                            onPress={() => {
                                onUpdateFuelLog();
                            }}
                        >
                            Update Fuel Log
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </>
    );
};

const styles = StyleSheet.create({
    headText: {
        fontSize: 19,
    },
    reportMonth: {
        fontWeight: '800',
        fontSize: 22,
        color: '#000',
        marginBottom: 5
    },
    monthpicker: {
        marginTop: 12,
        marginBottom: 15,
        marginHorizontal: 20,
    },
    nodata: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600'
    },
    contentText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 20,
    },
    driveHero: {
        fontsize: 12,
        fontWeight: '400',
        marginBottom: 5
    },
    cardSection: {
        height: 800,
    },
    borderedCard: {
        borderRadius: 10,
        shadowColor: 'unset',
        backgroundColor: '#e8e8e8',
        padding: 20,
        borderLeftWidth: 3,
        borderLeftColor: '#000', // or any color you want
    },
    viewSection: {
        marginVertical: 8,
        paddingHorizontal: 20,
    },

    driveTile: {
        fontSize: 14,
        fontWeight: '700',
        color: '#333',
    },
    mileamt: {
        fontSize: 14,
        fontWeight: '700',
        color: '#230578',
    },
    driveRides: {
        fontSize: 13,
        color: '#666',
        fontWeight: '800'
    },

    labelText: {
        fontWeight: '400',
        color: '#000', // or a primary color if you want to make it stand out more
    },
    legendContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
    },

    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 6,
    },

    legendColor: {
        width: 14,
        height: 14,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#dadada',
        marginRight: 6,
    },

    legendText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000', // Or your theme color
    },
    locTitle: {
        fontSize: 15,
        fontWeight: '800',
        color: '#000',
        marginTop: 5,
    },
    errorText: {
        color: '#ff0000',
        paddingLeft: 5,
        fontSize: 15,
        marginTop: -5,
        marginBottom: 5,
        fontWeight: '400',
    },
});

export default FuelLogEdit;
