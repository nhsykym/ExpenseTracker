<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Expense;
use Log;
use DB;

class ExpenseController extends Controller
{
    public function getExpenses(Request $request)
    {
        // $limit = $request->input('limit');
        $expenses = Expense::orderBy('purchased_at', 'DESC')->get();
        // Log::debug($expenses);
        return $expenses;
    }
    
    public function getChartData()
    {
        $expenses = DB::table('expenses')
            ->selectRaw('purchased_at, sum(money) as money')
            ->groupBy('purchased_at')
            ->get();
        // Log::debug('$expenses="' .$expenses. '"');
        return $expenses;
    }
    
    public function getCategories()
    {
        $categories = Expense::groupBy('category_id')->pluck('category_id');
        // Log::debug($categories);
        return $categories;
    }
    
    public function getFiltered(Request $request) {
        $query = Expense::query();
        $yearMonth = $request->yearMonth;
        $category = $request->category;
        $moneyFrom = $request->moneyFrom;
        $moneyTo = $request->moneyTo;
        
        Log::debug($request->category);
        
        if(isset($yearMonth)) {
            $query->where('purchased_at', 'like', '%' . $yearMonth);
        }
        
        if(isset($category)) {
            $query->where('category_id', 1);
        }
        
        if(isset($moneyFrom)) {
            $query->where('money', '>=', $moneyFrom);
        }
        
        if(isset($moneyTo)) {
            $query->where('money', '<=', $moneyTo);
        }
        
        $expenses = $query->get();
        $queryStr = $query->toSql();
        Log::debug('Filtered result: ' . $expenses);
        Log::debug('SQL: ' . $queryStr);
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
