import { useState, useMemo } from "react";
import { Selector, Input } from "../common";
import { Button } from "../common";
import { ChangeEvent, FormEvent } from "react";
import { ExpenseType, TravelExpenseType } from "../../common/enums";

export type IProps = {
  onSubmit: (formData: Record<string, string>) => void;
};

export interface IFormData {
  title?: string;
  description?: string;
  amount?: string;
  mileage_in_km?: string;
  trip_id?: string;
  hotel_name?: string;
  check_in_date?: string;
  check_out_date?: string;
  transportation_mode?: string;
  route?: string;
}

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
  const [formData, setFormData] = useState<IFormData>({});
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
    setFormData({});
  };

  const handleTravelExpenseTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setError(null);
    setTravelExpenseType(e.target.value as TravelExpenseType);
    setFormData({});
  };

  const validateFormData = () => {
    if (!expenseType) {
      return "Please select an expense type";
    }

    if (expenseType === ExpenseType.TRAVEL && !travelExpenseType) {
      return "Please select a travel expense type";
    }

    if (!formData.title) {
      return "Title is required";
    }

    if (expenseType !== ExpenseType.MILEAGE && !formData.amount) {
      return "Amount is required";
    }

    if (expenseType === ExpenseType.MILEAGE && !formData.mileage_in_km) {
      return "Mileage is required";
    }

    if (travelExpenseType === TravelExpenseType.ACCOMMODATION && !formData.hotel_name) {
      return "Hotel Name is required";
    }

    if (travelExpenseType === TravelExpenseType.ACCOMMODATION && !formData.check_in_date) {
      return "Check-in Date is required";
    }

    if (travelExpenseType === TravelExpenseType.ACCOMMODATION && !formData.check_out_date) {
      return "Check-out Date is required";
    }

    if (travelExpenseType === TravelExpenseType.TRANSPORTATION && !formData.transportation_mode) {
      return "Transportation mode is required";
    }

    if (travelExpenseType === TravelExpenseType.TRANSPORTATION && !formData.route) {
      return "Route is required";
    }

    return null;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formError = validateFormData();
    if (formError) {
      setError(formError);
      return;
    }

    onSubmit({ ...formData, expense_type: expenseType, ...(travelExpenseType && { travel_expense_type: travelExpenseType })  });
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
          label="Expense Type"
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
            label="Travel Expense Type"
            value={travelExpenseType}
            onChange={handleTravelExpenseTypeChange}
            id="travel_expense_type"
            placeholder="Select travel expense type"
            options={Object.values(TravelExpenseType)}
          />
        </div>
      )}

      {visibleFields.map((field) => {
        const commonProps = {
          id: field,
          name: field,
          value: formData[field] || "",
          onChange: handleChange,
          placeholder: field.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
          label: field.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        };

        return (
          <div className="mb-5" key={field}>
            {field === "amount" && expenseType !== "mileage" ? (
              <Input type="number" min="0.00" step="0.01" {...commonProps} />
            ) : field === "mileage_in_km" ? (
              <Input type="number" min="0" {...commonProps} />
            ) : field === "trip_id" ? (
              <Input type="number" min="0" {...commonProps} />
            ) : field === "check_in_date" || field === "check_out_date" ? (
              <Input type="date" max={new Date().toISOString().split("T")[0]} {...commonProps} />
            ) : (
              <Input {...commonProps} />
            )}
          </div>
        );
      })}

      {error && <p className="text-red-500 mb-5">{error}</p>}

      <Button type="submit" text="Add New Product" disabled={!shouldShowButton} />
    </form>
  );
}
