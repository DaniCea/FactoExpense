import { useState, useMemo } from "react";
import { ChangeEvent, FormEvent } from "react";
import { Selector, Input } from "../common";
import { Button } from "../common";
import { ExpenseType, TravelExpenseType } from "../../common/enums";
import { ICreateExpenseBody } from "../../api/expenses";

export type IProps = {
  onSubmit: (formData: IFormData) => void;
};

export interface IFormData {
  title?: string;
  description?: string;
  amount?: string;
  mileageKm?: string;
  tripId?: string;
  hotelName?: string;
  checkinDate?: string;
  checkoutDate?: string;
  transportationMode?: string;
  route?: string;
  expenseType?: ExpenseType | "";
  travelExpenseType?: TravelExpenseType | "";
}

export interface IValidationRules {
  required: boolean,
  type?: string,
  errorMessage?: string
}

const fieldConfig = {
  regular: ["title", "description", "amount"],
  mileage: ["title", "description", "mileageKm"],
  travel: {
    [TravelExpenseType.ACCOMMODATION]: ["title", "description", "amount", "tripId", "hotelName", "checkinDate", "checkoutDate"],
    [TravelExpenseType.TRANSPORTATION]: ["title", "description", "amount", "tripId", "transportationMode", "route"],
    [TravelExpenseType.OTHER]: ["title", "description", "amount", "tripId"]
  }
};

// Base common validation rules
const baseValidationRules: Record<string, IValidationRules> = {
  title: { required: true, errorMessage: "Title is required" },
  description: { required: false },
  amount: { required: true, type: 'number', errorMessage: "Amount is required and must be a number" },
  mileageKm: { required: true, type: 'number', errorMessage: "Mileage is required and must be a valid number" },
  tripId: { required: false },
  hotelName: { required: true, errorMessage: "Hotel Name is required" },
  checkinDate: { required: true, type: 'date', errorMessage: "Check-in Date is required and must be a valid date" },
  checkoutDate: { required: true, type: 'date', errorMessage: "Check-out Date is required and must be a valid date" },
  transportationMode: { required: true, errorMessage: "Transportation Mode is required" },
  route: { required: true, errorMessage: "Route is required" }
};

// Expense Type Specific Validation
const validationRules = {
  [ExpenseType.REGULAR]: {
    title: baseValidationRules.title,
    amount: baseValidationRules.amount,
    description: baseValidationRules.description
  },
  [ExpenseType.MILEAGE]: {
    title: baseValidationRules.title,
    mileageKm: baseValidationRules.mileageKm,
    description: baseValidationRules.description
  },
  [ExpenseType.TRAVEL]: {
    [TravelExpenseType.ACCOMMODATION]: {
      title: baseValidationRules.title,
      amount: baseValidationRules.amount,
      hotelName: baseValidationRules.hotelName,
      checkinDate: baseValidationRules.checkinDate,
      checkoutDate: baseValidationRules.checkoutDate,
      tripId: baseValidationRules.tripId,
      description: baseValidationRules.description
    },
    [TravelExpenseType.TRANSPORTATION]: {
      title: baseValidationRules.title,
      amount: baseValidationRules.amount,
      transportationMode: baseValidationRules.transportationMode,
      route: baseValidationRules.route,
      tripId: baseValidationRules.tripId,
      description: baseValidationRules.description
    },
    [TravelExpenseType.OTHER]: {
      title: baseValidationRules.title,
      amount: baseValidationRules.amount,
      tripId: baseValidationRules.tripId,
      description: baseValidationRules.description
    }
  }
};

export const transformFormDataToCreateExpenseBody = (formData: IFormData): ICreateExpenseBody => {
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

export default function NewExpenseForm({ onSubmit }: IProps) {
  const [formData, setFormData] = useState<IFormData>({ expenseType: ExpenseType.REGULAR });
  const [error, setError] = useState<string | null>(null);

  const shouldShowButton =
    (formData.expenseType === ExpenseType.TRAVEL && formData.travelExpenseType) ||
    (formData.expenseType !== ExpenseType.TRAVEL && formData.expenseType);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setFormData({ ...formData, [e.target.name]: e.target.value === '' ? null : e.target.value });
  };

  const handleExpenseTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setError(null);
    setFormData({ expenseType: e.target.value as ExpenseType, travelExpenseType: undefined });
  };

  const handleTravelExpenseTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setError(null);
    setFormData({ expenseType: formData.expenseType, travelExpenseType: e.target.value as TravelExpenseType });
  };

  const validateFormData = () => {
    let rules: Record<string, IValidationRules>;
    if (formData.travelExpenseType) rules = validationRules[formData.expenseType][formData.travelExpenseType]
    else rules = validationRules[formData.expenseType]

    return validateFields(rules);
  };

  const validateFields = (rules: Record<string, IValidationRules>) => {
    for (const [field, validation] of Object.entries(rules)) {
      if (validation.required && !formData[field]) {
        return `${capitalizeFirstLetter(field)} is required`;
      }
      if (validation.type === 'number' && isNaN(Number(formData[field]))) {
        return `${capitalizeFirstLetter(field)} must be a valid number`;
      }
      if (validation.type === 'date' && !isValidDate(formData[field])) {
        return `${capitalizeFirstLetter(field)} must be a valid date`;
      }
    }
    return null;
  };

  const isValidDate = (date: string) => {
    const parsedDate = Date.parse(date);
    return !isNaN(parsedDate);
  };

  const capitalizeFirstLetter = (str: string) => {
    return str.replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formError = validateFormData();
    if (formError) {
      setError(formError);
      return;
    }

    onSubmit(formData);
  };

  const visibleFields = useMemo(() => {
    let fieldsToRender: string[] = [];

    if (formData.expenseType === ExpenseType.MILEAGE) {
      fieldsToRender = fieldConfig.mileage;
    } else if (formData.expenseType === ExpenseType.REGULAR) {
      fieldsToRender = fieldConfig.regular;
    } else if (formData.expenseType === ExpenseType.TRAVEL && formData.travelExpenseType) {
      fieldsToRender = fieldConfig.travel[formData.travelExpenseType] || [];
    }

    return fieldsToRender;
  }, [formData.expenseType, formData.travelExpenseType]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5">
        <Selector
          label="Expense Type"
          value={formData.expenseType}
          onChange={handleExpenseTypeChange}
          id="expense_type"
          placeholder="Select an expense type"
          options={Object.values(ExpenseType)}
        />
      </div>

      {formData.expenseType === ExpenseType.TRAVEL && (
        <div className="mb-5">
          <Selector
            label="Travel Expense Type"
            value={formData.travelExpenseType}
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
            {field === "amount" && formData.expenseType !== "mileage" ? (
              <Input type="number" min="0.00" step="0.01" {...commonProps} />
            ) : field === "mileageKm" ? (
              <Input type="number" min="0" {...commonProps} />
            ) : field === "tripId" ? (
              <Input type="number" min="0" {...commonProps} />
            ) : field === "checkinDate" || field === "checkoutDate" ? (
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
