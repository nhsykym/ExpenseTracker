<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Expense;

class ExpenseController extends Controller
{
    public function getExpenses(Request $request)
    {
        $limit = $request->limit;
        $expenses = Expense::orderBy('purchased_at', 'DESC')->take(5)->get();
        return $expenses;
    }
    
    public function addExpense(Request $request)
    {
        $expense = new Expense;
        $expense->purchased_at = $request->purchased_at;
        $expense->title = $request->title;
        $expense->money = $request->money;
        $expense->category_id = 1;
        $expense->user_id = 1;
        $expense->save();
        return;
    }
    
    public function showExpense($expense_id)
    {
        $expense = Expense::find($expense_id);
        return $expense;
    }
    
    public function editExpense(Request $request, $expense_id)
    {
        $expense = Expense::find($expense_id);
        $expense->purchased_at = $request->purchased_at;
        $expense->title = $request->title;
        $expense->money = $request->money;
        $expense->category_id = 1;
        $expense->user_id = 1;
        $expense->save();
        return;
    }
    
    public function deleteExpense(Request $request)
    {
        $expense = Expense::find($request->id);
        $expense->delete();
        
        $expenses = Expense::all();
        return $expenses;
    }
}
