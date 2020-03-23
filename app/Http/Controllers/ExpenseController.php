<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Expense;
use App\Category;
use Log;
use DB;

class ExpenseController extends Controller
{
    public function getExpenses(Request $request)
    {
        $result = DB::table('expenses')
            ->join('categories', 'expenses.category_id', '=', 'categories.id')
            ->selectRaw('expenses.purchased_at, expenses.title, expenses.money, categories.name')
            ->orderBy('purchased_at', 'DESC')
            ->get();
        Log::debug($result);
        return $result;
    }
    
    public function getChartData()
    {
        $result = DB::table('expenses')
            ->selectRaw('purchased_at, sum(money) as money')
            ->groupBy('purchased_at')
            ->get();
        return $result;
    }
    
    public function getCategoryCount()
    {
        $result = DB::table('expenses')
            ->join('categories', 'expenses.category_id', '=', 'categories.id')
            ->selectRaw('categories.id, categories.name as name, count(*) as count')
            ->groupBy('category_id')
            ->get();
        Log::debug($result);
        return $result;
    }
    
    public function getUsedCategories()
    {
        $categories = DB::table('expenses')
                        ->join('categories', 'expenses.category_id', '=', 'categories.id')
                        ->select('categories.id', 'categories.name')
                        ->distinct()
                        ->get();
        Log::debug($categories);
        return $categories;
    }
    
    public function getCategories()
    {
        $categories = Category::all();
        Log::debug($categories);
        return $categories;
    }
    
    public function getFiltered(Request $request) {
        $yearMonth = substr($request->yearMonth, 0, 7);
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
        if(isset($category) && $category !== "default") {
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
        $expense->category_id = $request->category;
        $expense->user_id = 1;
        Log::debug($expense);
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
