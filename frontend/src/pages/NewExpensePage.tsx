import { NewExpenseForm } from "../components";
import { CenterGreyBackgroundLayout } from "./layouts";
import { ICreateExpenseParams, createExpense } from "../api/expenses";
import { useNavigate } from "react-router";

function NewExpensePage() {
  const navigate = useNavigate();

  const handleSubmitNewExpense = (expenseData: ICreateExpenseParams) => {
    createExpense(expenseData).then((response) => {
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