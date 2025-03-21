import { useNavigate } from "react-router";

import { NewExpenseForm } from "../components";
import { IFormData } from "../components/forms/NewExpenseForm/NewExpenseForm";
import { CenterGreyBackgroundLayout } from "./layouts";
import { createExpense, serializeNewExpenseBody } from "../api";
import { ROUTES } from "../router/routes";

function NewExpensePage() {
  const navigate = useNavigate();

  const handleSubmitNewExpense = (formData: IFormData) => {
    createExpense(serializeNewExpenseBody(formData)).then(() => {
      navigate(ROUTES.HOME);
    }).catch((error) => {
      console.error('Error creating expense: ', error);
    });
  }

  return (
    <CenterGreyBackgroundLayout withNavbar>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        New Expense
      </h1>
      <NewExpenseForm onSubmit={handleSubmitNewExpense}/>
    </CenterGreyBackgroundLayout>
  );
}


export default NewExpensePage;