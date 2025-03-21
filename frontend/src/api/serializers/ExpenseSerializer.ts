import { format, parseISO  } from "date-fns";
import { UTCDate } from "@date-fns/utc";

import { Expense, TravelData, MileageData, AccommodationData, TransportationData } from "../../models/Expense";
import {ExpenseStatus, ExpenseType, TravelExpenseType} from "../../common/enums";
import { IGetExpensesResponseParams } from "../expenses"; // adjust the import path accordingly

const parseDate = (dateStr: string): Date => parseISO(dateStr);

export const serializeExpense = (response: IGetExpensesResponseParams): Expense => {
  // Serialize the expense object
  const expense: Expense = {
    id: response.id,
    title: response.title,
    amount: response.amount,
    status: mapExpenseStatus(response.status),
    description: response.description,
    created: parseDate(response.created_at),
    expenseType: mapExpenseType(response.expenseable_type),
    travel: response.expenseable?.travel_expense ? mapTravelData(response.expenseable.travel_expense) : undefined,
    mileage: response.expenseable?.mileage_expense ? mapMileageData(response.expenseable.mileage_expense) : undefined,
  };

  return expense;
};

// Helper function to map status string to the ExpenseStatus enum
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
      checkinDate: parseDate(travelExpense.travel_expenseable.accommodation_travel_expense?.check_in_date),
      checkoutDate: parseDate(travelExpense.travel_expenseable.accommodation_travel_expense?.check_out_date)
    };
  }

  return travelData;
};

const mapMileageData = (mileageExpense: IGetExpensesResponseParams['expenseable']['mileage_expense']): MileageData => {
  const mileageData: MileageData = {};

  mileageData.mileageKm = parseFloat(mileageExpense.mileage_in_km);

  return mileageData;
}