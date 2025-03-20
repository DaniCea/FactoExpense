import { useState, useMemo } from "react";
import { Selector, Input } from "../common";
import { Button } from "../common";
import { ChangeEvent, FormEvent } from "react";
import { ExpenseType, TravelExpenseType } from "../../common/enums";

export type IProps = {
  onSubmit: (formData: Record<string, string>) => void;
};

export interface IFormData {
  title: string;
  description: string | null;
  amount: string | null;
  mileage_in_km: string | null;
  trip_id: string | null;
  hotel_name: string | null;
  check_in_date: string | null;
  check_out_date: string | null;
  transportation_mode: string | null;
  route: string | null;
}

const emptyFormData: IFormData = {
  title: "",
  description: null,
  amount: null,
  mileage_in_km: null,
  trip_id: null,
  hotel_name: null,
  check_in_date: null,
  check_out_date: null,
  transportation_mode: null,
  route: null
};

const fieldConfig = {
  regular: ["title", "description", "amount"],
  mileage: ["title", "description", "mileage_in_km"],
  travel: {
    [TravelExpenseType.ACCOMMODATION]: ["title", "description", "amount", "trip_id", "hotel_name", "check_in_date", "check_out_date"],
    [TravelExpenseType.TRANSPORTATION]: ["title", "description", "amount", "trip_id", "transportation_mode", "route"],
    [TravelExpenseType.OTHER]: ["title", "description", "amount", "trip_id"]
  }
};

export default function NewExpenseForm({ onSubmit }: IProps) {
  const [formData, setFormData] = useState<IFormData>(emptyFormData);
  const [error, setError] = useState<string | null>(null);

  const [expenseType, setExpenseType] = useState<ExpenseType | "">("");
  const [travelExpenseType, setTravelExpenseType] = useState<TravelExpenseType | "">("");

  const shouldShowButton =
    (expenseType === ExpenseType.TRAVEL && travelExpenseType) ||
    (expenseType !== ExpenseType.TRAVEL && expenseType);

  console.log(formData);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setFormData({ ...formData, [e.target.name]: e.target.value === '' ? null : e.target.value });
  };

  const handleExpenseTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setError(null);
    setExpenseType(e.target.value as ExpenseType);
    setTravelExpenseType("");
    setFormData(emptyFormData);
  };

  const handleTravelExpenseTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setError(null);
    setTravelExpenseType(e.target.value as TravelExpenseType);
    setFormData(emptyFormData);
  };

  const validateFormData = () => {
    const cleanedFormData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== null)
    );

    if (!expenseType) {
      return "Please select an expense type";
    }

    if (expenseType === ExpenseType.TRAVEL && !travelExpenseType) {
      return "Please select a travel expense type";
    }

    if (!cleanedFormData.title) {
      return "Title is required";
    }

    if (expenseType !== ExpenseType.MILEAGE && !cleanedFormData.amount) {
      return "Amount is required";
    }

    if (expenseType === ExpenseType.MILEAGE && !cleanedFormData.mileage_in_km) {
      return "Mileage is required";
    }

    if (travelExpenseType === TravelExpenseType.ACCOMMODATION && !cleanedFormData.hotel_name) {
      return "Hotel Name is required";
    }

    if (travelExpenseType === TravelExpenseType.ACCOMMODATION && !cleanedFormData.check_in_date) {
      return "Check-in Date is required";
    }

    if (travelExpenseType === TravelExpenseType.ACCOMMODATION && !cleanedFormData.check_out_date) {
      return "Check-out Date is required";
    }

    if (travelExpenseType === TravelExpenseType.TRANSPORTATION && !cleanedFormData.transportation_mode) {
      return "Transportation mode is required";
    }

    if (travelExpenseType === TravelExpenseType.TRANSPORTATION && !cleanedFormData.route) {
      return "Route is required";
    }

    return null;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Remove keys with empty string values
    const cleanedFormData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== "" && value !== undefined)
    );

    const formError = validateFormData();
    if (formError) {
      setError(formError);
      return;
    }

    onSubmit({ ...cleanedFormData, expense_type: expenseType, ...(travelExpenseType && { travel_expense_type: travelExpenseType })  });
  };

  const visibleFields = useMemo(() => {
    let fieldsToRender: string[] = [];

    if (expenseType === ExpenseType.MILEAGE) {
      fieldsToRender = fieldConfig.mileage;
    } else if (expenseType === ExpenseType.REGULAR) {
      fieldsToRender = fieldConfig.regular;
    } else if (expenseType === ExpenseType.TRAVEL && travelExpenseType) {
      fieldsToRender = fieldConfig.travel[travelExpenseType] || [];
    }

    return fieldsToRender;
  }, [expenseType, travelExpenseType]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5">
        <Selector
          label="Expense type"
          value={expenseType}
          onChange={handleExpenseTypeChange}
          id="expense_type"
          placeholder="Select an expense type"
          options={Object.values(ExpenseType)}
        />
      </div>

      {expenseType === ExpenseType.TRAVEL && (
        <div className="mb-5">
          <Selector
            label="Travel expense type"
            value={travelExpenseType}
            onChange={handleTravelExpenseTypeChange}
            id="travel_expense_type"
            placeholder="Select travel expense type"
            options={Object.values(TravelExpenseType)}
          />
        </div>
      )}

      {visibleFields.includes("title") && (
        <div className="mb-5">
          <Input label="Title" name="title" id="title" placeholder="Title" value={formData.title} onChange={handleChange} />
        </div>
      )}

      {visibleFields.includes("description") && (
        <div className="mb-5">
          <Input label="Description" name="description" id="description" placeholder="Description (optional)" value={formData.description} onChange={handleChange} />
        </div>
      )}

      {visibleFields.includes("amount") && expenseType !== "mileage" && (
        <div className="mb-5">
          <Input type="number" min="0.00" step="0.01" label="Amount" name="amount" id="amount" placeholder="Amount ($)" value={formData.amount} onChange={handleChange} />
        </div>
      )}

      {visibleFields.includes("mileage_in_km") && (
        <div className="mb-5">
          <Input type="number" min="0" label="Mileage (KM)" name="mileage_in_km" id="mileage_in_km" placeholder="Mileage (KM)" value={formData.mileage_in_km} onChange={handleChange} />
        </div>
      )}

      {visibleFields.includes("trip_id") && (
        <div className="mb-5">
          <Input type="number" min="0" label="Trip ID" name="trip_id" id="trip_id" placeholder="Trip Id (Optional)" value={formData.trip_id} onChange={handleChange} />
        </div>
      )}

      {visibleFields.includes("hotel_name") && (
        <div className="mb-5">
          <Input label="Hotel Name" name="hotel_name" id="hotel_name" placeholder="Hotel Name" value={formData.hotel_name} onChange={handleChange} />
        </div>
      )}

      {visibleFields.includes("check_in_date") && (
        <div className="mb-5">
          <Input type="date" max={new Date().toISOString().split("T")[0]} label="Check-in Date" name="check_in_date" id="check_in_date" placeholder="Check-in Date" value={formData.check_in_date} onChange={handleChange} />
        </div>
      )}

      {visibleFields.includes("check_out_date") && (
        <div className="mb-5">
          <Input type="date" max={new Date().toISOString().split("T")[0]} label="Check-Out Date" name="check_out_date" id="check_out_date" placeholder="Check-out Date" value={formData.check_out_date} onChange={handleChange} />
        </div>
      )}

      {visibleFields.includes("transportation_mode") && (
        <div className="mb-5">
          <Input label="Transportation Mode" name="transportation_mode" id="transportation_mode" placeholder="Transportation Mode" value={formData.transportation_mode} onChange={handleChange} />
        </div>
      )}

      {visibleFields.includes("route") && (
        <div className="mb-5">
          <Input label="Route" name="route" id="route" placeholder="Route" value={formData.route} onChange={handleChange} />
        </div>
      )}

      {error && <p className="text-red-500 mb-5">{error}</p>}
      <Button type="submit" text="Add new product" hidden={!shouldShowButton} />

    </form>
  );
}
