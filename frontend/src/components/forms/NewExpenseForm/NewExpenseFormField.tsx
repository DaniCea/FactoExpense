import { Input } from "../../common";

const formatLabel = (str: string) =>
  str.replace(/([A-Z])/g, " $1")
    .replace(/^./, (match) => match.toUpperCase())
    .trim();

export const FormField = ({ field, formData, handleChange, isRequired }: any) => {
  const label = formatLabel(field);
  const placeholder = isRequired ? label : `${label} (optional)`;

  const commonProps = {
    id: field,
    name: field,
    value: formData[field] || "",
    onChange: handleChange,
    placeholder,
    label,
  };

  return (
    <div className="mb-5">
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
};