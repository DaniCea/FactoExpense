import { useNavigate } from "react-router";

import { NewExpenseForm } from "../components";
import { CenterGreyBackgroundLayout } from "./layouts";

import { IFormData } from "../components/forms/NewExpenseForm/NewExpenseForm";
import { createExpense, serializeNewExpenseBody } from "../api";

function NewExpensePage() {
  const navigate = useNavigate();

  const handleSubmitNewExpense = (formData: IFormData) => {
    createExpense(serializeNewExpenseBody(formData)).then(() => {
      navigate('/');
    }).catch((error) => {
      console.error('Error creating expense: ', error);
    });
  }

  return (
    <div className="h-screen">
      <CenterGreyBackgroundLayout withNavbar>
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          New Expense
        </h1>
        <NewExpenseForm onSubmit={handleSubmitNewExpense}/>
      </CenterGreyBackgroundLayout>
    </div>
  );
}


export default NewExpensePage;