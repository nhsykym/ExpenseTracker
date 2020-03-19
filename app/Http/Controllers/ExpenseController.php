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
        $yearMonth = $request->yearMonth;
        $category = $request->category;
        $moneyFrom = $request->moneyFrom;
        $moneyTo = $request->moneyTo;
        Log::debug($request->all());
        
        $query = DB::table('expenses');
        
        //年月で絞り込み
        if(isset($yearMonth)) {
            $query->where('purchased_at', 'like', $yearMonth . '%');
        }
        
        //カテゴリIDで絞り込み
        if(isset($category)) {
            $query->where('category_id', $category);
        }
        
        //最低金額で絞り込み
        if(isset($moneyFrom)) {
            $query->where('money', '>=', $moneyFrom);
        }
        
        //最高金額で絞り込み
        if(isset($moneyTo)) {
            $query->where('money', '<=', $moneyTo);
        }
        
        //結果の取得
        $expenses = $query->get();

        // Log::debug('Filtered result: ' . $expenses);
        // Log::debug($query->toSql());
        // Log::debug($query->getBindings());
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
