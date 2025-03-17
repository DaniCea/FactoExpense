import { useState } from "react";
import { Selector, Input } from "../common";
import { Button } from "../common";
import { ChangeEvent, FormEvent } from "react";

export type IProps = {
  onSubmit: (formData: Record<string, string>) => void;
};

export default function NewExpenseForm({ onSubmit }) {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const [expenseType, setExpenseType] = useState("");
  const [travelExpenseType, setTravelExpenseType] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, expense_type: expenseType });
  };

  const shouldRenderTitleDescriptionAmount =
    (expenseType === "regular" || expenseType === "mileage") ||
    (expenseType === "travel" && travelExpenseType);

  const shouldRenderButton = shouldRenderTitleDescriptionAmount && formData.title && formData.amount;

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5">
        <Selector
          label="Expense type"
          value={expenseType}
          onChange={(e) => setExpenseType(e.target.value)}
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
            onChange={(e) => setTravelExpenseType(e.target.value)}
            id="travel_expense_type"
            placeholder="Select travel expense type"
            options={["accommodation", "transportation", "other"]}
          />
        </div>
      )}

      {shouldRenderTitleDescriptionAmount && (
        <>
          <div className="mb-5">
            <Input label='Title' name='title' id='title' placeholder="Title" value={formData.title} onChange={handleChange} />
          </div>
          <div className="mb-5">
            <Input label='Description' name='description' id='description' placeholder="Description (optional)" value={formData.description} onChange={handleChange} />
          </div>
          <div className="mb-5">
            <Input type="number" min="0.00" step="0.01" label='Amount' name='amount' id='amount' placeholder="Amount ($)" value={formData.amount} onChange={handleChange} />
          </div>
        </>
      )}

      {shouldRenderButton && (
        <Button
          type="submit"
          text="Add new product"
        >
        </Button>
      )}
    </form>
  );
}
