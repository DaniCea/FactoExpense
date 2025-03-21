import { ICreateExpenseBody } from "../expenses";
import { IFormData } from "../../components/forms/NewExpenseForm/NewExpenseForm";

export const serializeNewExpenseBody = (formData: IFormData): ICreateExpenseBody => {
  return {
    title: formData.title || "",
    amount: Number(formData.amount) || undefined,
    expense_type: formData.expenseType || "",
    travel_expense_type: formData.travelExpenseType || undefined,
    description: formData.description || undefined,
    hotel_name: formData.hotelName || undefined,
    check_in_date: formData.checkinDate || undefined,
    check_out_date: formData.checkoutDate || undefined,
    transportation_mode: formData.transportationMode || undefined,
    route: formData.route || undefined,
    mileage_in_km: formData.mileageKm || undefined,
  };
};