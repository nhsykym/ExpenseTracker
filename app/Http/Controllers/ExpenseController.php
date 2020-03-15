<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Expense;

class ExpenseController extends Controller
{
    public function getExpenses()
    {
        $expenses = Expense::all();
        return $expenses;
    }
    
    public function addExpenses(Request $request)
    {
        $expense = new Expense;
        $expense->purchased_at = $request->purchased_at;
        $expense->title = $request->title;
        $expense->money = $request->money;
        $expense->category_id = $request->category_id;
        $expense->user_id = $request->user_id;
        $expense->save();
        
        $expenses = Expense::all();
        return $expenses;
        
    }
}
