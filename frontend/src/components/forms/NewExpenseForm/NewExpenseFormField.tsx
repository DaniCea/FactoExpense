import * as React from "react";

import { Input } from "../../common";
import { ExpenseType } from "../../../common";
import { IFormData } from "./NewExpenseForm";


const formatLabel = (str: string) =>
  str.replace(/([A-Z])/g, " $1")
    .replace(/^./, (match) => match.toUpperCase())
    .trim();

interface ICommonProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
}

export interface IFormFieldProps {
  field: string;
  formData: IFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
}

export const FormField = ({ field, formData, handleChange, isRequired }: IFormFieldProps) => {
  const label = formatLabel(field);
  const placeholder = isRequired ? label : `${label} (optional)`;

  const commonProps: ICommonProps = {
    id: field,
    name: field,
    value: formData[field] || "",
    onChange: handleChange,
    placeholder,
    label
  };

  const renderInput = (
    field: string,
    formData: IFormData,
    commonProps: ICommonProps
  ) => {
    switch (field) {
      case "amount":
        return formData.expenseType !== ExpenseType.MILEAGE ? (
          <Input type="number" min="0.00" step="0.01" {...commonProps} />
        ) : null;

      case "mileageKm":
      case "tripId":
        return <Input type="number" min="0" {...commonProps} />;

      case "checkinDate":
      case "checkoutDate":
        return <Input type="date" max={new Date().toISOString().split("T")[0]} {...commonProps} />;

      default:
        return <Input {...commonProps} />;
    }
  };

  return (
    <div className="mb-5">
      {renderInput(field, formData, commonProps)}
    </div>
  );
};