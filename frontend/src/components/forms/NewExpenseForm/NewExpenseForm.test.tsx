import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import NewExpenseForm from "./NewExpenseForm";
import { ExpenseType, TravelExpenseType } from "../../../common";
import "@testing-library/jest-dom/vitest";

// Mock form submission function
const mockOnSubmit = vi.fn();

describe("NewExpenseForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders expense type selector", () => {
    render(<NewExpenseForm onSubmit={mockOnSubmit} />);

    // Check if expense type dropdown is rendered
    expect(screen.getByLabelText(/expense type/i)).toBeInTheDocument();
  });

  it("displays travel expense type selector when ExpenseType is TRAVEL", () => {
    render(<NewExpenseForm onSubmit={mockOnSubmit} />);

    // Select "Travel" expense type
    fireEvent.change(screen.getByLabelText(/expense type/i), {
      target: { value: ExpenseType.TRAVEL },
    });

    // Expect travel expense type selector to appear
    expect(screen.getByLabelText(/travel expense type/i)).toBeInTheDocument();
  });

  it("displays correct fields based on selected expense type", () => {
    render(<NewExpenseForm onSubmit={mockOnSubmit} />);

    // Select "Regular" expense type
    fireEvent.change(screen.getByLabelText(/expense type/i), {
      target: { value: ExpenseType.REGULAR },
    });

    // Title and Amount should be visible
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();

    // Mileage field should NOT be visible for regular expenses
    expect(screen.queryByLabelText(/mileage/i)).not.toBeInTheDocument();
  });

  it("validates fields before submission", async () => {
    render(<NewExpenseForm onSubmit={mockOnSubmit} />);

    // Try submitting form without selecting expense type
    fireEvent.click(screen.getByText(/add new product/i));

    // Expect validation error message
    expect(screen.getByText(/select an expense type/i)).toBeInTheDocument();
  });

  it("submits a Regular Expense form with correct data", () => {
    render(<NewExpenseForm onSubmit={mockOnSubmit} />);

    // Select "Regular" expense type
    fireEvent.change(screen.getByLabelText(/expense type/i), {
      target: { value: ExpenseType.REGULAR },
    });

    // Fill in form fields
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "Business Lunch" },
    });
    fireEvent.change(screen.getByLabelText(/amount/i), {
      target: { value: "50.00" },
    });

    // Submit the form
    fireEvent.click(screen.getByText(/add new product/i));

    // Expect onSubmit to be called with correct data
    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: "Business Lunch",
      amount: "50.00",
      expenseType: ExpenseType.REGULAR,
    });
  });

  it("submits a Mileage Expense form with correct data", () => {
    render(<NewExpenseForm onSubmit={mockOnSubmit} />);

    // Select "Regular" expense type
    fireEvent.change(screen.getByLabelText(/expense type/i), {
      target: { value: ExpenseType.MILEAGE },
    });

    // Fill in form fields
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "Trip to see client" },
    });
    fireEvent.change(screen.getByLabelText(/mileage km/i), {
      target: { value: "30.00" },
    });

    // Submit the form
    fireEvent.click(screen.getByText(/add new product/i));

    // Expect onSubmit to be called with correct data
    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: "Trip to see client",
      mileageKm: "30.00",
      expenseType: ExpenseType.MILEAGE,
    });
  });

  it("submits a Travel Accommodation Expense form with correct data", async () => {
    render(<NewExpenseForm onSubmit={mockOnSubmit} />);

    // Select "Regular" expense type
    fireEvent.change(screen.getByLabelText(/expense type/i), {
      target: { value: ExpenseType.TRAVEL },
    });

    // Wait for the "Travel expense type" dropdown to appear
    const travelExpenseType = await screen.findByLabelText(/travel expense type/i);

    // Select "Accommodation" travel expense type
    fireEvent.change(travelExpenseType, {
      target: { value: TravelExpenseType.ACCOMMODATION },
    });

    // Fill in form fields
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "Hotel night in Amsterdam" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Hotel night to see a client in Amsterdam" },
    });
    fireEvent.change(screen.getByLabelText(/amount/i), {
      target: { value: "110" },
    });
    fireEvent.change(screen.getByLabelText(/trip id/i), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByLabelText(/hotel name/i), {
      target: { value: "Marriott Amsterdam" },
    });
    fireEvent.change(screen.getByLabelText(/checkin date/i), {
      target: { value: "2025-03-13" },
    });
    fireEvent.change(screen.getByLabelText(/checkout date/i), {
      target: { value: "2025-03-14" },
    });

    // Submit the form
    fireEvent.click(screen.getByText(/add new product/i));

    // Expect onSubmit to be called with correct data
    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: "Hotel night in Amsterdam",
      description: "Hotel night to see a client in Amsterdam",
      amount: "110",
      tripId: "1",
      hotelName: "Marriott Amsterdam",
      checkinDate: "2025-03-13",
      checkoutDate: "2025-03-14",
      expenseType: ExpenseType.TRAVEL,
      travelExpenseType: TravelExpenseType.ACCOMMODATION
    });
  });

  it("submits a Travel Transportation Expense form with correct data", async () => {
    render(<NewExpenseForm onSubmit={mockOnSubmit} />);

    // Select "Regular" expense type
    fireEvent.change(screen.getByLabelText(/expense type/i), {
      target: { value: ExpenseType.TRAVEL },
    });

    // Wait for the "Travel expense type" dropdown to appear
    const travelExpenseType = await screen.findByLabelText(/travel expense type/i);

    // Select "Accommodation" travel expense type
    fireEvent.change(travelExpenseType, {
      target: { value: TravelExpenseType.TRANSPORTATION },
    });

    // Fill in form fields
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "Hotel night in Amsterdam" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Hotel night to see a client in Amsterdam" },
    });
    fireEvent.change(screen.getByLabelText(/amount/i), {
      target: { value: "110" },
    });
    fireEvent.change(screen.getByLabelText(/trip id/i), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByLabelText(/transportation mode/i), {
      target: { value: "Train" },
    });
    fireEvent.change(screen.getByLabelText(/route/i), {
      target: { value: "BCN - MAD" },
    });

    // Submit the form
    fireEvent.click(screen.getByText(/add new product/i));

    // Expect onSubmit to be called with correct data
    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: "Hotel night in Amsterdam",
      description: "Hotel night to see a client in Amsterdam",
      amount: "110",
      tripId: "1",
      transportationMode: "Train",
      route: "BCN - MAD",
      expenseType: ExpenseType.TRAVEL,
      travelExpenseType: TravelExpenseType.TRANSPORTATION
    });
  });
});
