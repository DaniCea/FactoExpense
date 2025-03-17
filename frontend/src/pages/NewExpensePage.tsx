import { NavBar, NewExpenseForm } from "../components";
import { CenterGreyBackgroundLayout } from "./layouts";
import { ICreateExpenseProps, createExpense } from "../api/expenses";
import { useNavigate } from "react-router";

function NewExpensePage() {
  const navigate = useNavigate();

  const handleSubmitNewExpense = (expenseData: ICreateExpenseProps) => {
    debugger;
    createExpense(expenseData).then((response) => {
      console.log(response);
      debugger;
      navigate('/');
    }).catch((error) => {
      console.error('Error creating expense: ', error);
    });
  }

  return (
    <>
      <NavBar/>
      <CenterGreyBackgroundLayout>
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          New Expense
        </h1>
        <NewExpenseForm onSubmit={handleSubmitNewExpense}/>
      </CenterGreyBackgroundLayout>
    </>
  );
}


export default NewExpensePage;