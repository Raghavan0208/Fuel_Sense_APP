import axios from 'axios';
import http, {apiCall} from './http-common';
import AsyncStorage from '@react-native-async-storage/async-storage';
/* eslint-disable */
// type ModelNameq = "Create" | "Edit" | "authenticate" | "GetBase64PlanReadingImage" | "GetAllBlogs" | "View" | "GetPlans" | "GetAllVehicleType" | "GetAllFuelType" | "GetAllBrand" | "GetAllBrandVarient" | "GetAllEmissionCategory" | "GetBrandByVehicleTypeId" | "GetBrandVariantByBrandSeriesId" | "RecordReading"
//   | "GetBrandSeriesByBrandId" | "GetAllPlanReading" | "authenticateinapp" | "GetDashboard" |
//    "CancelSubscription" | "RegisteredUserName" | "GetCurrentPlanByLoginId" | "GetRazorPayKey" |
//     "GetPaymentDetail" | "UploadProfileImage" | "GetBase64ProfileImage" | "ForgetPassword" |
//      "RegisteredMobileNo" | "GetAllCountry" | "GetAllAddress" | "UpdateReadingName" | "DeleteJourney" |
//       "GetMileageChart" | "GetMileageReport" | "GetMileageReportData";

type ControllerName =
  | 'loginModel'
  | 'ContactUs'
  | 'Journey'
  | 'Master'
  | 'Registration'
  | 'Payment'
  | 'NewVehicle'
  | 'CustomTags'
  | 'FuelLog'
  |"ServiceLog"
  | 'InsuranceLog'
type ModelName =
  | 'Create'
  | 'Edit'
  | 'authenticate'
  | 'GetBase64PlanReadingImage'
  | 'GetAllBlogs'
  | 'View'
  | 'GetPlans'
  | 'GetAllVehicleType'
  | 'GetAllFuelType'
  | 'GetAllFuelBrand'
  | 'GetAllBrand'
  | 'GetAllBrandVarient'
  | 'GetAllEmissionCategory'
  | 'GetBrandByVehicleTypeId'
  | 'GetBrandVariantByBrandSeriesId'
  | 'RecordReading'
  | 'GetBrandSeriesByBrandId'
  | 'GetAllPlanReading'
  | 'authenticateinapp'
  | 'GetDashboard'
  | 'CancelSubscription'
  | 'RegisteredUserName'
  | 'GetCurrentPlanByLoginId'
  | 'GetRazorPayKey'
  | 'GetPaymentDetail'
  | 'UploadProfileImage'
  | 'GetBase64ProfileImage'
  | 'ForgetPassword'
  | 'RegisteredMobileNo'
  | 'GetAllCountry'
  | 'GetAllAddress'
  | 'UpdateReadingName'
  | 'DeleteJourney'
  | 'GetMileageChart'
  | 'GetMileageReport'
  | 'GetMileageReportData'
  | 'GetAllVehicle'
  | 'SetDefaultVehicle'
  | 'UpdatePlanReadingReviewed'
  | 'GetTwelveMonths'
  | 'CreateCustomTags'
  | 'GetCustomTagsByLoginid'
  | 'GetAllDefaultTags'
  | 'GetFuelLogView'
  |"UpdateFuelLogstatus"
  | 'GetFuelLogPDF'
  |'GetFuelLogExcel'
  |"GetServiceLogView"
  |'GetAllServiceCategory'
  | 'GetServiceComponent' |'GetServiceType'
  |'GetServicePriority'
  |'GetInsuranceLogView'
  |'GetAllInsuranceMainCategory'
  |'GetAllInsuranceSubCategory'
  |'GetAllInsuranceSpecificType'
  |'GetAllInsurancePrimaryDamageArea'
  |'GetServiceLogExcel'
  | 'GetInsuranceLogExcel' | 'GetInsuranceLogPDF' |'GetServiceLogPDF'
type Param =
  | 'loginId'
  | 'userplanid'
  | 'id'
  | 'email'
  | 'name'
  | 'reportYear'
  | 'reportMonth'
  | 'startDate'
  | 'endDate'
  | 'loginid'
  | 'vehicleId'
  | 'planreadingid'
  | 'year'

  type Param2 = | 'year';

class CommonService {
 async get(
    ControllerName: ControllerName,
    ModelName: ModelName,
    CountryCode?: string,
  ) {
  const token  = await AsyncStorage.getItem("authorization")
    return http
      .get(`/${ControllerName}/${ModelName}`, {
        headers: {CountryCode: CountryCode ? CountryCode : ''},
      })
      .catch((err: Error) => {
        if(err.response.status===401){
          refreshToken(token,CountryCode)
       }
        throw err?.message;
      });
  }

  async getWithQueryParam(
    ControllerName: ControllerName,
    ModelName: ModelName,
    Param: Param,
    value: any,
    CountryCode: string,
  ) {
    const token  = await AsyncStorage.getItem("authorization")
    return http
      .get(`/${ControllerName}/${ModelName}?${Param}=${value}`, {
        headers: {CountryCode: CountryCode},
      })
      .catch((err: Error) => {
       if(err.response.status===401){
          refreshToken(token,CountryCode)
       }
        throw err?.message;
      });
  }

  async getWithDoubleQueryParam(
    ControllerName: ControllerName,
    ModelName: ModelName,
    Param: Param,
    value: any,
    Param2: Param,
    value2: any,
    CountryCode: string,
  ) {
    const token = await AsyncStorage.getItem("authorization")
    return http
      .get(`/${ControllerName}/${ModelName}?${Param}=${value}&${Param2}=${value2}`, {
        headers: { CountryCode: CountryCode },
      })
      .catch((err: Error) => {
       if(err.response.status===401){
          refreshToken(token,CountryCode)
       }
        throw err?.message;
      });
  }

  async getWithSingleParam(
    ControllerName: ControllerName,
    ModelName: ModelName,
    value: any,
    CountryCode: string,
  ) {
    const token  = await AsyncStorage.getItem("authorization")
    return http
      .get(`/${ControllerName}/${ModelName}/${value}`, {
        headers: {CountryCode: CountryCode},
      })
      .catch((err: Error) => {
       if(err.response.status===401){
          refreshToken(token,CountryCode)
       }
        throw err?.message;
      });
  }

  async getWithDoubleParam(
    ControllerName: ControllerName,
    ModelName: ModelName,
    value1: any,
    value2: any,
    CountryCode: string,
  ) {
    const token  = await AsyncStorage.getItem("authorization")
    return http
      .get(`/${ControllerName}/${ModelName}/${value1}/${value2}`, {
        headers: {CountryCode: CountryCode},
      })
      .catch((err: Error) => {
       if(err.response.status===401){
          refreshToken(token,CountryCode)
       }
        throw err?.message;
      });
  }

  async getWithTriplevalue(
    ControllerName: ControllerName,
    ModelName: ModelName,
    value1: any,
    value2: any,
    value3: any,
    CountryCode: string,
  ) {
    const token = await AsyncStorage.getItem("authorization")
    return http
      .get(`/${ControllerName}/${ModelName}/${value1}/${value2}/${value3}`, {
        headers: { CountryCode: CountryCode },
      })
      .catch((err: Error) => {
        if (err.response.status === 401) {
          refreshToken(token, CountryCode)
        }
        throw err?.message;
      });
  }

  async getWithTripleQueryParam(
    ControllerName: ControllerName,
    ModelName: ModelName,
    Param1: Param,
    value1: any,
    Param2: Param,
    value2: any,
    Param3: Param,
    value3: any,
    CountryCode: string,
  ) {
    const token  = await AsyncStorage.getItem("authorization")
    return http
      .get(
        `/${ControllerName}/${ModelName}?${Param1}=${value1}&${Param2}=${value2}&${Param3}=${value3}`,
        {
          headers: {CountryCode: CountryCode},
        },
      )
      .catch((err: Error) => {
       if(err.response.status===401){
          refreshToken(token,CountryCode)
       }
        throw err?.message;
      });
  }

  async post(
    ControllerName: ControllerName,
    ModelName: ModelName,
    data: any,
    CountryCode: string,
  ) {
    const token  = await AsyncStorage.getItem("authorization")
    return http
      .post(`/${ControllerName}/${ModelName}`, data, {
        headers: {CountryCode: CountryCode},
      })
      .catch((err: Error) => {
       if(err.response.status===401){
          refreshToken(token,CountryCode)
       }
        throw err?.message;
      });
  }

  async postWithSingleParam(
    ControllerName: ControllerName,
    ModelName: ModelName,
    value1: any,
    CountryCode: string,
  ) {
    const token  = await AsyncStorage.getItem("authorization")
    return http
      .post(`/${ControllerName}/${ModelName}/${value1}`, undefined, {
        headers: {CountryCode: CountryCode},
      })
      .catch((err: Error) => {
       if(err.response.status===401){
          refreshToken(token,CountryCode)
       }
        throw err?.message;
      });
  }

  async postWithDoubleParam(
    ControllerName: ControllerName,
    ModelName: ModelName,
    value1: any,
    value2: any,
    CountryCode: string,
  ) {
    const token  = await AsyncStorage.getItem("authorization")
    return http
      .post(`/${ControllerName}/${ModelName}/${value1}/${value2}`, undefined, {
        headers: {CountryCode: CountryCode},
      })
      .catch((err: Error) => {
       if(err.response.status===401){
          refreshToken(token,CountryCode)
       }
        throw err?.message;
      });
  }

  async postWithQueryParam(
    ControllerName: ControllerName,
    ModelName: ModelName,
    Param: Param,
    value: any,
    CountryCode: string,
  ) {
    const token  = await AsyncStorage.getItem("authorization")
    return http
      .post(`/${ControllerName}/${ModelName}?${Param}=${value}`, undefined, {
        headers: {CountryCode: CountryCode},
        
      })
      .catch((err: Error) => {
       if(err.response.status===401){
          refreshToken(token,CountryCode)
       }
        throw err?.message;
      });
  }

 async postWithDoubleQueryParam(
    ControllerName: ControllerName,
    ModelName: ModelName,
    Param: Param,
    value: any,
    Param1: Param,
    value1: any,
    CountryCode: string,
  ) {
    const token  = await AsyncStorage.getItem("authorization")
    return http
      .post(
        `/${ControllerName}/${ModelName}?${Param}=${value}&${Param1}=${value1}`,
        undefined,
        {
          headers: {CountryCode: CountryCode},
        },
      )
      .catch((err: Error) => {
        if(err.response.status===401){
          refreshToken(token,CountryCode)
       }
        throw err?.message;
      });
  }

  async postWithMultipleQueryParam(
    ControllerName: ControllerName,
    ModelName: ModelName,
    Param: Param,
    value: any,
    data:any,
    CountryCode: string,
  ) {
    const token  = await AsyncStorage.getItem("authorization")
    return http
      .post(`/${ControllerName}/${ModelName}?${Param}=${value}`, data, {
       headers: {CountryCode: CountryCode},
        
      })
      .catch(async (err: Error) => {
        if(err.response.status===401){
           refreshToken(token,CountryCode)
        }
        throw err?.message;
      });
   
  }

   postAutoRegistration(data: any) {
    return apiCall('https://www.fuelsense.org/api')
      .post('/auto-registration', data)
      .catch((err: Error) => {
        throw err?.message;
      });
  }
  postAutoRegistrationExceptUK(data: any) {
    return apiCall('https://www.fuelsense.org/api')
      .post('/auto-registrationus', data)
      .catch((err: Error) => {
        throw err?.message;
      });
  }
}


export default new CommonService();

export const refreshToken=(token:any,CountryCode:string)=>{

  const data = {token:token}
        
  http.post(`/loginModel/RefreshToken`, data, {
        headers: {CountryCode: CountryCode},
      }).then((response)=>{
        AsyncStorage.setItem("authorization",response.data.token)
      })
      .catch((err: Error) => {
        throw err?.message;
      });
   }

   export const fetchToken =async  (deviceToken: string) => {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        InstanceId: 'e402cd97-38ca-4132-aed3-20842ed4ae8d',
        'content-type': 'application/json',
      },

      body: JSON.stringify({
        LoginFields: `{"Devicetoken":"${deviceToken}"}`,
        Password: '0dbb9e89-2e53-40ff-834c-00220ee8dbbe',
      }),
    };
    fetch('https://user.telematicssdk.com/v1/Auth/Login', options)
      .then(res => res.json())
      .then(res => {
        AsyncStorage.setItem(
          'damoovToken',
          JSON.stringify(res?.Result?.AccessToken?.Token),
        );
      })
      .catch(err => console.error(err));
  };
   export const damoovRefreshToken = async (RefreshToken: string, Token: string) => {
    try {
      const options = {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
      };
      const data = {
        RefreshToken: RefreshToken,
        AccessToken: Token,
      };
      const response = await axios.post('https://user.telematicssdk.com/v1/Auth/RefreshToken', data, options);
      console.log('####res?.Result', JSON.stringify(response.data, null, 2));
      return {...response.data,created: new Date().toISOString()}
      // await AsyncStorage.setIteme('deviceTokn', JSON.stringify(response.data.Result));
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  }
