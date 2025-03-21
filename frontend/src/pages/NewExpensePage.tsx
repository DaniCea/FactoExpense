import { NewExpenseForm } from "../components";
import { CenterGreyBackgroundLayout } from "./layouts";
import { createExpense } from "../api/expenses";
import { useNavigate } from "react-router";
import { IFormData, transformFormDataToCreateExpenseBody } from "../components/forms/NewExpenseForm/NewExpenseForm";

function NewExpensePage() {
  const navigate = useNavigate();

  const handleSubmitNewExpense = (formData: IFormData) => {
    createExpense(transformFormDataToCreateExpenseBody(formData)).then(() => {
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