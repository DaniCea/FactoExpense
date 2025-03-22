import { UTCDate } from "@date-fns/utc";

import { Expense, TravelData, MileageData } from "../../models/Expense";
import {ExpenseStatus, ExpenseType, TravelExpenseType} from "../../common";
import { IGetExpensesResponseParams } from "../expenses";

export const serializeExpense = (response: IGetExpensesResponseParams): Expense => {
  const expense: Expense = {
    id: response.id,
    title: response.title,
    amount: response.amount,
    status: mapExpenseStatus(response.status),
    description: response.description,
    created: new UTCDate(response.created_at),
    expenseType: mapExpenseType(response.expenseable_type),
    travel: response.expenseable?.travel_expense ? mapTravelData(response.expenseable.travel_expense) : undefined,
    mileage: response.expenseable?.mileage_expense ? mapMileageData(response.expenseable.mileage_expense) : undefined,
  };

  return expense;
};

const mapExpenseStatus = (status: string): ExpenseStatus => {
  switch (status) {
    case 'pending':
      return ExpenseStatus.PENDING;
    case 'accepted':
      return ExpenseStatus.ACCEPTED;
    case 'rejected':
      return ExpenseStatus.REJECTED;
    default:
      return ExpenseStatus.PENDING;
  }
};

const mapExpenseType = (status: string): ExpenseType => {
  switch (status) {
    case 'TravelExpense':
      return ExpenseType.TRAVEL;
    case 'MileageExpense':
      return ExpenseType.MILEAGE;
    default:
      return ExpenseType.REGULAR;
  }
};

const mapTravelData = (travelExpense: IGetExpensesResponseParams['expenseable']['travel_expense']): TravelData => {
  const travelData: TravelData = { travelType: null };

  if (travelExpense.travel_expenseable_type === "TransportationTravelExpense") {
    travelData.travelType = TravelExpenseType.TRANSPORTATION;
    travelData.transportation = {
      route: travelExpense.travel_expenseable.transportation_travel_expense?.route || "",
      transportationMode: travelExpense.travel_expenseable.transportation_travel_expense?.transportation_mode || ""
    };
  }

  if (travelExpense.travel_expenseable_type === "AccommodationTravelExpense") {
    travelData.travelType = TravelExpenseType.ACCOMMODATION;
    travelData.accommodation = {
      hotelName: travelExpense.travel_expenseable.accommodation_travel_expense?.hotel_name || "",
      checkinDate: new UTCDate(travelExpense.travel_expenseable.accommodation_travel_expense?.check_in_date),
      checkoutDate: new UTCDate(travelExpense.travel_expenseable.accommodation_travel_expense?.check_out_date)
    };
  }

  return travelData;
};

const mapMileageData = (mileageExpense: IGetExpensesResponseParams['expenseable']['mileage_expense']): MileageData => {
  const mileageData: MileageData = {};

  mileageData.mileageKm = parseFloat(mileageExpense.mileage_in_km);

  return mileageData;
}