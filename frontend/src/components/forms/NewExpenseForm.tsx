import { useState } from "react";
import { Selector, Input } from "../common";
import { Button } from "../common";
import { ChangeEvent, FormEvent } from "react";
import * as React from "react";

export type IProps = {
  onSubmit: (formData: Record<string, string>) => void;
};

const emptyFormData = {
  title: "",
  description: "",
  amount: "",
  mileage_in_km: "",
  trip_id: "",
  hotel_name: "",
  check_in_date: "",
  check_out_date: "",
  transportation_mode: "",
  route: ""
}

export default function NewExpenseForm({ onSubmit }) {
  const [formData, setFormData] = useState<Record<string, string>>(emptyFormData);
  const [error, setError] = useState<string | null>(null);

  const [expenseType, setExpenseType] = useState("");
  const [travelExpenseType, setTravelExpenseType] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleExpenseTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setError(null);
    setExpenseType(e.target.value);
    setTravelExpenseType("");

    setFormData(emptyFormData);
  };

  const handleTravelExpenseTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setError(null);
    setTravelExpenseType(e.target.value);
    setFormData(emptyFormData);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Remove keys with empty string values
    const cleanedFormData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== "" && value !== undefined)
    );

    // Validation
    if (!expenseType) {
      setError("Please select an expense type");
      return;
    }

    if (expenseType === "travel" && !travelExpenseType) {
      setError("Please select a travel expense type");
      return;
    }

    if (!cleanedFormData.title) {
      setError("Title is required");
      return;
    }

    if (expenseType !== "mileage" && !cleanedFormData.amount) {
      setError("Amount is required");
      return
    }



    onSubmit({ ...cleanedFormData, expense_type: expenseType, ...(travelExpenseType && { travel_expense_type: travelExpenseType })  });
  };

  const shouldRenderCommonFields =
    (expenseType === "regular" || expenseType === "mileage") ||
    (expenseType === "travel" && travelExpenseType);

  const shouldRenderAmountField = shouldRenderCommonFields && expenseType !== "mileage";

  const shouldRenderMileageFields = expenseType === "mileage";

  const shouldRenderTravelFields = expenseType === "travel";

  const shouldRenderAcommodationFields = expenseType === "travel" && travelExpenseType === "accommodation";

  const shouldRenderTransportationFields = expenseType === "travel" && travelExpenseType === "transportation";

  const shouldRenderButton = (shouldRenderCommonFields && !shouldRenderMileageFields) || shouldRenderMileageFields;

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5">
        <Selector
          label="Expense type"
          value={expenseType}
          onChange={handleExpenseTypeChange}
          id="expense_type"
          placeholder="Select an expense type"
          options={["regular", "travel", "mileage"]}
        />
      </div>

      {expenseType === "travel" && (
        <div className="mb-5">
          <Selector
            label="Travel expense type"
            value={travelExpenseType}
            onChange={handleTravelExpenseTypeChange}
            id="travel_expense_type"
            placeholder="Select travel expense type"
            options={["accommodation", "transportation", "other"]}
          />
        </div>
      )}

      {shouldRenderCommonFields && (
        <>
          <div className="mb-5">
            <Input label='Title' name='title' id='title' placeholder="Title" value={formData.title} onChange={handleChange} />
          </div>
          <div className="mb-5">
            <Input label='Description' name='description' id='description' placeholder="Description (optional)" value={formData.description} onChange={handleChange} />
          </div>
        </>
      )}

      { shouldRenderAmountField && (
        <div className="mb-5">
          <Input type="number" min="0.00" step="0.01" label='Amount' name='amount' id='amount' placeholder="Amount ($)" value={formData.amount} onChange={handleChange} />
        </div>
      )}

      { shouldRenderTravelFields && (
        <div className="mb-5">
          <Input type="number" min="0" label='Trip ID' name='trip_id' id='trip_id' placeholder="Trip Id (Optional)" value={formData.trip_id} onChange={handleChange} />
        </div>
      )}

      { shouldRenderAcommodationFields && (
        <>
          <div className="mb-5">
            <Input label='Hotel Name' name='hotel_name' id='hotel_name' placeholder="Hotel Name" value={formData.hotel_name} onChange={handleChange} />
          </div>
          <div className="mb-5">
            <Input type="date" max={new Date().toISOString().split('T')[0]} label='Check-in Date' name='check_in_date' id='check_in_date' placeholder="Check-in Date" value={formData.check_in_date} onChange={handleChange} />
          </div>
          <div className="mb-5">
            <Input type="date" max={new Date().toISOString().split('T')[0]} label='Check-Out Date' name='check_out_date' id='check_out_date' placeholder="Check-out Date" value={formData.check_out_date} onChange={handleChange} />
          </div>
        </>
      )}

      { shouldRenderTransportationFields && (
        <>
          <div className="mb-5">
            <Input label='Transportation mode' name='transportation_mode' id='transportation_mode' placeholder="Transportation Mode" value={formData.transportation_mode} onChange={handleChange} />
          </div>
          <div className="mb-5">
            <Input label='Route' name='route' id='route' placeholder="Route" value={formData.route} onChange={handleChange} />
          </div>
        </>
      )}

      { shouldRenderMileageFields && (
        <div className="mb-5">
          <Input type="number" min="0" label='Mileage (KM)' name='mileage_in_km' id='mileage_in_km' placeholder="Mileage (KM)" value={formData.mileage_in_km} onChange={handleChange} />
        </div>
      )}

      { shouldRenderButton && (
        <Button
          type="submit"
          text="Add new product"
        >
        </Button>
      )}
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </form>
  );
}
