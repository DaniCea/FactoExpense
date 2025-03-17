import { useState } from "react";
import { Selector, TextInput } from "../common";

export default function NewExpenseForm() {
  const [expenseType, setExpenseType] = useState("");
  const [travelExpenseType, setTravelExpenseType] = useState("");

  return (
    <form action="#">
      <div className="mb-5">
        <Selector
          value={expenseType}
          onChange={(e) => setExpenseType(e.target.value)}
          id="expense_type"
          placeholder="Select an expense type"
          options={["regular", "travel", "milleage"]}
        />
      </div>

      {expenseType === "travel" && (
        <div className="mb-5">
          <Selector
            value={travelExpenseType}
            onChange={(e) => setTravelExpenseType(e.target.value)}
            id="travel_expense_type"
            placeholder="Select travel expense type"
            options={["accommodation", "transportation", "other"]}
          />
        </div>
      )}

      {expenseType && (
        <div className="mb-5">
          <TextInput name='Title' id='title' placeholder="Type title" />
          <TextInput name='Description' id='title' placeholder="Type description (optional)" />
        </div>
      )}

      {expenseType && (
        <button
          type="submit"
          className="text-white inline-flex items-center bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
        >
          <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            ></path>
          </svg>
          Add new product
        </button>
      )}
    </form>
  );
}
