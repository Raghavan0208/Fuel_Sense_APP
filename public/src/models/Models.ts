/* eslint-disable */
export interface IPlanReadingModel {
  id: number;
  created: any;
  createdBy: number;
  modified: any;
  modifiedBy: number;
  active: boolean;
  userPlanId: number;
  entryDate: any;
  reading: any;
  distance: number;
  co2Emission: number;
  readingImagePath: string;
  imageName: string;
  rowOrder: number;
  name: string;
  cumulativeCo2Emission: number;
  latitude: string;
  longitude: string;
  startLocation?: string;
  endLocation?: string;
  parkingExpenses?: any;
  tollExpenses?: any;
  tripNotes?: any;
  userVehicleDetails?: any;
  isReviewed?: boolean;
  startJourneyTime?: string,
  endJourneyTime?: string
  isFuelLogAdded?: any
}
export interface IVehicleRegistrationModel {
  registrationNumber?: string;
  taxStatus?: string;
  motStatus?: string;
  make?: string;
  yearOfManufacture?: number;
  engineCapacity?: number;
  co2Emissions?: number;
  fuelType?: string;
  markedForExport?: boolean;
  colour?: string;
  typeApproval?: string;
  dateOfLastV5CIssued?: string;
  motExpiryDate?: string;
  wheelplan?: string;
  monthOfFirstRegistration?: string;
  brandName?: string;
  brandSeriesName?: string;
  brandVariant?: string;
  fuelTypeName?: string;
  ccType?: number;
  cO2Emission?: number;
}

export interface IJourneyModel {
  currentEmission: number;
  purchaseDate: any;
  statusId: number;
  loginId: number;
  brandName: string;
  brandSeriesName: string;
  brandVariantName: string;
  vehicleTypeName: string;
  planName: string;
  planDescription: string;
  lastEmission: number;
  id: number;
  created: any;
  createdBy: number;
  modified: any;
  modifiedBy: number;
  active: boolean;
  startingReading: number;
  emissionStandard: number;
  fuelTypeName: string;
}

export interface IMileageChartModel {
  cumulative_distance: number;
  driveCount: number;
  entryMonth: number;
  entryYear: number;
  mileageRate: number;
  totalDistance: number;
  tripName: string;
  totalDriveCount: number;
  totalMilesCount: number;
}

export interface ITwelveMonthsModel {
  monthName?: string;
  cumulative_distance: number;
  driveCount: number;
  entryMonth: number;
  entryYear: number;
  entryDate?: any;
  mileageRate: number;
  totalDistance: number;
  tripName: string;
  totalDriveCount: number;
  totalMilesCount: number;
}

export interface renderTrip {
  entryMonth?: number;
  entryYear?: number;
  tripName?: string;
  driveCount?: number;
  totalDriveCount?: number;
  totalMilesCount?: number;
  totalMileageRates?: number;
  totalDistance?: number;
  cumulative_distance?: number;
  mileageRate?: number;
}

export interface IuserVehicledetails {
  active: boolean;
  brandId?: number
  brandName?: any
  brandSeriesId?: number
  brandSeriesName?: any
  brandVariant?: any
  brandVariantId?: number
  cO2Emission?: number
  ccType?: number
  emissionType?: any
  firstName?: string
  fuelTypeId?: number
  fuelTypeName?: any
  id?: number
  isDefault?: boolean
  lastName?: string
  loginId?: number
  rateId?: number
  rateName?: string
  rateValue?: number
  registrationDate?: any
  registrationNumber?: string
  totalDriveCount?: number
  totalMileageRates?: number
  totalMilesCount?: number
  userLogin?: any
  vehicleType?: any
  vehicleTypeId?: number
}