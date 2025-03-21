import { ExpenseStatus, ExpenseType, TravelExpenseType } from "../common";

export interface Expense {
  id: number,
  title: string,
  amount: number,
  status: ExpenseStatus,
  expenseType: ExpenseType,
  created: Date,
  description?: string,
  travel?: TravelData,
  mileage?: MileageData
}

export interface TravelData {
  travelType: TravelExpenseType
  tripId?: number,
  accommodation?: AccommodationData,
  transportation?: TransportationData
}

export interface MileageData {
  mileageKm?: number
}

export interface AccommodationData {
  hotelName: string,
  checkinDate: Date,
  checkoutDate: Date
}

export interface TransportationData {
  route: string,
  transportationMode: string
}