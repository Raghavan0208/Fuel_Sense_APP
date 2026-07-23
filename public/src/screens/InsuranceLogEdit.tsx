/* eslint-disable */
import {
    Alert,
    Image,
    Platform,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
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
import { Animated } from 'react-native';
import { launchCamera, launchImageLibrary, ImageLibraryOptions, CameraOptions } from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';

type Props = {
    setfuellogmodelopen: any
    editData: any
    planreadingid: any
    navigation: any
};

const InsuranceLogEdit = ({
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
    const animatedValue = useRef(new Animated.Value(0)).current;
    const [fuelTypeArray, setFuelTypeArray] = useState<Array<any>>([]);
    const [fuelType, setFuelType] = useState<any>();
    const [dashboardData, setDashboardData] = useState<IJourneyModel>(
        {} as IJourneyModel,
    );
    const [countrycode, setCoutryCode] = useState<any>();

    const [selectedTab, setSelectedTab] = useState('yes');
    const [insured, setInsured] = useState(true);
    const [insuranceProvider, setInsuranceProvider] = useState<any>("");
    const [serviceCategory, setserviceCategory] = useState<any>('');
    const [serviceComponent, setserviceComponent] = useState<any>('');
    const [serviceType, setserviceType] = useState<any>('');
    const [servicePriority, setservicePriority] = useState<any>('');
    const [serviceCost, setserviceCost] = useState<any>('');
    const [serviceCategoryArray, setServiceCategoryArray] = useState<Array<any>>([]);
    const [serviceComponentArray, setServiceComponentArray] = useState<Array<any>>([]);
    const [serviceTypeArray, setServiceTypeArray] = useState<Array<any>>([]);
    const [servicePriorityArray, setServicePriorityArray] = useState<Array<any>>([]);
    const [serviceImageName, setserviceImageName] = useState<any>('');
    const [serviceComponentId, setServiceComponentId] = useState<number | null>(null); // Add this
    const [serviceCategoryId, setServiceCategoryId] = useState<number | null>(null); // Add this
    const [serviceTypeId, setServiceTypeId] = useState<number | null>(null); // Add this
    const [servicePriorityId, setServicePriorityId] = useState<number | null>(null); // Add this
    const [accesstoken, setAccesstoken] = useState<any>();

    // const [isSubmitPressed, setIsSubmitPressed] = useState<any>(false);
    const [carId, setCarId] = useState<number>(0);
    const [serviceImage, setServiceImage] = useState<any>(null);

    const onUpdateInsuranceLog = () => {
        setIsSubmitPressed(true);
        let updateddata;
        if (insured == true) {
            updateddata = {
                insuranceprovider: insuranceProvider,
                insurancemaincategory: serviceCategoryId,
                insurancesubcategory: serviceComponentId,
                insurancespecifictype: serviceTypeId,
                insuranceprimarydamagearea: servicePriorityId,
                insurancecost: serviceCost,
                insurancenoteimgname: serviceImageName,
                hasinsured: insured,
                insurancelogdate: moment(new Date()).format("YYYY-MM-DD HH:mm"),
                loginid: getTokenDetail(accesstoken)?.LoginId
            };
        }
        else {
            updateddata = {
                insuranceprovider: null,
                insurancemaincategory: null,
                insurancesubcategory: null,
                insurancespecifictype: null,
                insuranceprimarydamagearea: null,
                insurancecost: null,
                insurancenoteimgname: null,
                hasinsured: insured,
                servicelogdate: moment(new Date()).format("YYYY-MM-DD HH:mm"),
                loginid: getTokenDetail(accesstoken)?.LoginId
            };
        }

        CommonServices.postWithMultipleQueryParam("InsuranceLog", "Edit", "id", editData.insuranceLogId, updateddata, countrysymbol).then((res) => {
            if (res.status === 200) {
                setfuellogmodelopen(false);
                setIsSubmitPressed(false);
                resetForm();
                Alert.alert('Success', 'Insurance Log Updated Successfully');
                navigation.replace('InsuranceLogView');
            }
        })
    }

    const handleImagePick = async () => {
        Alert.alert(
            'Select Image Source',
            'Choose an option',
            [
                {
                    text: 'Camera',
                    onPress: async () => {
                        const hasPermission = await requestCameraPermission();
                        if (!hasPermission) {
                            console.log('Camera permission denied');
                            return;
                        }
                        launchCamera(
                            {
                                mediaType: 'photo',
                                quality: 0.7,
                            },
                            handlePickerResponse
                        );
                    },
                },
                {
                    text: 'Gallery',
                    onPress: async () => {
                        launchImageLibrary(
                            {
                                mediaType: 'photo',
                                quality: 0.7,
                            },
                            handlePickerResponse
                        );
                    },
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ],
            { cancelable: true }
        );
    };

    const handlePickerResponse = (response: any) => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
            const pickedImage = response.assets[0];
            setServiceImage(pickedImage);
            setserviceImageName(pickedImage.fileName || 'Selected Image');
            console.log('Image picked:', pickedImage.uri);
        }
    };

    const requestGalleryPermission = async () => {
        if (Platform.OS === 'android' && Platform.Version <= 32) {
           const granted = await PermissionsAndroid.request(
             PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
           );
           return granted === PermissionsAndroid.RESULTS.GRANTED;
         }
         return true;
    };

    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission',
                    message: 'App needs access to your camera',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;
    };


    const handleSetCarId = (id: number) => {
        console.log('Selected Category ID:', id);
        setCarId(id);
        setServiceCategoryId(id);
        GetAllInsuranceSubCategory(id);
    };

    const handleSetServiceComponentId = (id: number) => {
        console.log('Selected Component ID:', id);
        setServiceComponentId(id);
        if (carId && id) {
            getAllInsuranceSpecificType(carId, id);
        }
    };

    const handleSetServiceTypeId = (id: number) => {
        setServiceTypeId(id);
        if (carId && id) {
            GetAllInsurancePrimaryDamageArea(carId, serviceComponentId, id);
        }
    };


    const handleSetServicePriorityId = (id: number) => {
        setServicePriorityId(id);
    };


    const GetAllInsuranceMainCategory = () => {
        CommonServices.get("Master", "GetAllInsuranceMainCategory", countrycode).then(res => {
            if (res.status == 200) {
                setServiceCategoryArray(res.data);
            }
        })
    }

    const GetAllInsuranceSubCategory = (servicecategoryid: any) => {
        CommonServices.getWithSingleParam("Master", "GetAllInsuranceSubCategory", servicecategoryid, countrycode).then(res => {
            if (res.status == 200) {
                setServiceComponentArray(res.data);
            }
        })
    }

    const getAllInsuranceSpecificType = (servicecategoryid: any, servicecomponentid: any) => {
        CommonServices.getWithDoubleParam("Master", "GetAllInsuranceSpecificType", servicecategoryid, servicecomponentid, countrycode).then(res => {
            if (res.status == 200) {
                setServiceTypeArray(res.data);
            }
        })
    }

    const GetAllInsurancePrimaryDamageArea = (servicecategoryid: any, servicecomponentid: any, servicetypeid: any) => {
        CommonServices.getWithTriplevalue("Master", "GetAllInsurancePrimaryDamageArea", servicecategoryid, servicecomponentid, servicetypeid, countrycode).then(res => {
            if (res.status == 200) {
                setServicePriorityArray(res.data);
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
            console.log('editData:', editData);
            setInsuranceProvider(editData.insuranceProvider);

            // Set selected values (used in CustomDropdowns)
            setserviceCategory(editData.insuranceMainCategoryId);
            setserviceComponent(String(editData.insuranceSubCategoryId));
            setserviceType(String(editData.insuranceSpecificTypeId));
            setservicePriority(String(editData.insurancePrimaryDamageAreaId));
            setserviceCost(String(editData.insuranceCost));
            setserviceImageName(String(editData.insuranceNoteImgName));

            // Set IDs required for API calls
            setCarId(editData.insuranceMainCategoryId);
            setServiceCategoryId(editData.insuranceMainCategoryId);
            setServiceComponentId(editData.insuranceSubCategoryId);
            setServiceTypeId(editData.insuranceSpecificTypeId);
            setServicePriorityId(editData.insurancePrimaryDamageAreaId);
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
                        setCoutryCode(code);
                        setCountrySymbol(code);
                        setAccesstoken(res);
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
            GetAllInsuranceMainCategory();
        }
    }, [countrysymbol]);

    const left = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '50%'],
    });

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: selectedTab === 'yes' ? 0 : 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [selectedTab]);

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
                        // resetForm();
                    }} />
                <Modal.Header>Edit Your Insurance Log</Modal.Header>
                <Modal.Body>
                    <Text ml="1" style={styles.locTitle}>
                        Do you have an insurance policy? *
                    </Text>
                    <View style={styles.toggleSwitchWrapper}>
                        <View style={styles.toggleSwitch}>
                            <Animated.View style={[styles.indicator, { left }]} />
                            <TouchableOpacity
                                style={[styles.option, selectedTab === 'yes' && styles.active]}
                                onPress={() => {
                                    setSelectedTab('yes');
                                    setInsured(true);
                                }}
                            >
                                <Text style={[styles.optionText, { color: selectedTab === 'yes' ? 'white' : 'white' }]}>Yes, I have</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.option, selectedTab === 'no' && styles.active]}
                                onPress={() => {
                                    setSelectedTab('no');
                                    setInsured(false);
                                }}
                            >
                                <Text style={[styles.optionText, { color: selectedTab === 'no' ? 'white' : 'black' }]}>No, I haven’t</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.tab_content}>
                        {selectedTab === "yes" &&
                            <><View style={{ marginBottom: 3 }}>
                                <Text ml="1" style={styles.locTitle}>
                                    Insurance Provider *
                                </Text>
                                <CustomTextInput
                                    placeHolder="Insurance Provider"
                                    defaultValue={''}
                                    value={insuranceProvider}
                                    onValueChange={setInsuranceProvider} />
                                {isSubmitPressed && !insuranceProvider ? (
                                    <Text style={styles.errorText}>
                                        Insurance Provider is Required
                                    </Text>
                                ) : (
                                    ''
                                )}
                            </View><View style={{ marginBottom: 3 }}>
                                    <Text ml="1" style={styles.locTitle}>
                                        Main Category *
                                    </Text>
                                    <CustomDropDown
                                        data={serviceCategoryArray}
                                        placeholder={'Main Category'}
                                        value={serviceCategory}
                                        setCarId={handleSetCarId} // 👈 log will happen here
                                        setValue={setserviceCategory}
                                        customStyle={{ paddingLeft: 10 }}
                                    />

                                    {isSubmitPressed && (serviceCategory == '') ? (
                                        <Text style={styles.errorText}> Main Category is Required</Text>
                                    ) : (
                                        ''
                                    )}
                                </View>

                                <View style={{ marginBottom: 3 }}>
                                    <Text ml="1" style={styles.locTitle}>
                                        Sub Category *
                                    </Text>
                                    <CustomDropDown
                                        data={serviceComponentArray}
                                        value={serviceComponent}
                                    placeholder={'Sub Category'}
                                        setValue={setserviceComponent}
                                        setCarId={handleSetServiceComponentId}
                                        customStyle={{ paddingLeft: 10 }}
                                    />

                                    {isSubmitPressed && (serviceComponent == '') ? (
                                    <Text style={styles.errorText}>Sub Category is Required</Text>
                                    ) : (
                                        ''
                                    )}
                                </View>

                                <View style={{ marginBottom: 3 }}>
                                    <Text ml="1" style={styles.locTitle}>
                                        Specific Type *
                                    </Text>
                                    <CustomDropDown
                                        data={serviceTypeArray}
                                        value={serviceType}
                                    placeholder={'Specific Type'}
                                        setValue={setserviceType}
                                        setCarId={handleSetServiceTypeId}
                                        customStyle={{ paddingLeft: 10 }} />
                                    {isSubmitPressed && (serviceType == '') ? (
                                    <Text style={styles.errorText}>Specific Type is Required</Text>
                                    ) : (
                                        ''
                                    )}
                                </View>

                                <View style={{ marginBottom: 3 }}>
                                    <Text ml="1" style={styles.locTitle}>
                                       Primary Damage Area *
                                    </Text>
                                    <CustomDropDown
                                        data={servicePriorityArray}
                                        value={servicePriority}
                                        placeholder={'Service Priority'}
                                        setCarId={handleSetServicePriorityId}
                                        setValue={setservicePriority}
                                        customStyle={{ paddingLeft: 10 }} />
                                    {isSubmitPressed && (servicePriority == '') ? (
                                        <Text style={styles.errorText}>Primary Damage Area is Required</Text>
                                    ) : (
                                        ''
                                    )}
                                </View>

                                <View style={{ marginBottom: 3 }}>
                                    <Text ml="1" style={styles.locTitle}>
                                        Insurance cost *
                                    </Text>
                                    <CustomTextInput
                                    placeHolder="Insurance Cost"
                                        value={serviceCost}
                                        keyboardType={'number-pad'}
                                        onValueChange={setserviceCost} />
                                    {isSubmitPressed && !serviceCost ? (
                                        <Text style={styles.errorText}>
                                            Insurance Cost is Required
                                        </Text>
                                    ) : (
                                        ''
                                    )}
                                </View>

                                <View style={{ marginBottom: 3 }}>
                                    <Text ml="1" style={styles.locTitle}>
                                    Insurance Note (image upload)
                                    </Text>
                                    {serviceImage && (
                                        <Image
                                            source={{ uri: serviceImage.uri }}
                                            style={{ width: 100, height: 100, marginTop: 8, borderRadius: 8 }}
                                        />
                                    )}

                                    <TouchableOpacity onPress={handleImagePick} style={styles.imagePicker}>
                                        <Text style={{ color: '#000' }}>
                                            {serviceImageName ? serviceImageName : 'Select Image'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        }
                    </View>
                    {selectedTab === "no" &&
                        <Text style={styles.noinsurancetext}>
                            Selecting "No, I haven't" will limit this report page to show only your insurance
                            details, excluding any uninsured records.
                        </Text>}

                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={2}>
                        <Button
                            variant="outline"
                            borderColor="black"
                            _text={{ color: 'black' }}
                            onPress={() => {
                                // setservicelogmodelopen(false);
                                setIsSubmitPressed(false);
                                // resetForm();
                            }}>
                            Cancel
                        </Button>
                        <Button
                            backgroundColor={'#000'}
                            onPress={() => {
                                onUpdateInsuranceLog();
                            }}
                        >
                            Update Insurance Log
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
    toggleSwitch: {
        flexDirection: 'row',
        position: 'relative',
        backgroundColor: '#dadada',
        borderRadius: 50,
        overflow: 'hidden',
        width: '50%',
        height: 40,
        maxWidth: 700,
        marginTop: 20,
        marginBottom: 20
    },
    option: {
        flex: 1,
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 8,
    },
    active: {
    },
    optionText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    indicator: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '50%',
        backgroundColor: '#000',
        borderRadius: 50,
        zIndex: 0,
    },
    toggleSwitchWrapper: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tab_content: {
        padding: 2
    },
    noinsurancetext: {
        fontSize: 15,
        color: '#000',
        padding: 15,
        fontWeight: '500',
        backgroundColor: '#ebebeb',
        borderRadius: 10
    },
    imagePicker: {
        borderWidth: 1,
        borderColor: '#aaa',
        padding: 12,
        borderRadius: 8,
        marginTop: 8,
        backgroundColor: '#f0f0f0',
    },
    priorityBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        paddingVertical: 0.5,
        paddingHorizontal: 8,
        borderRadius: 12,
        zIndex: 1,
    },
    priorityText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    high: {
        backgroundColor: '#109e0a',
    },
    medium: {
        backgroundColor: '#f59e0b',
    },
    low: {
        backgroundColor: '#fd0b0b',
    },
});

export default InsuranceLogEdit;
