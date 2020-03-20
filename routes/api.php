<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['middleware' => 'api'], function(){
    //ユーザー認証
    Route::post('/signup', 'FrontEndUserController@signUp');
    Route::post('/signin', 'FrontEndUserController@signIn');
    
    //トークン再発行
    Route::get('/refreshToken', 'FrontEndUserController@refreshToken');
    
    //新規追加
    Route::get('categories', 'ExpenseController@getCategories');
    Route::post('add', 'ExpenseController@addExpense');
    
    //一覧表示
    Route::get('get', 'ExpenseController@getExpenses');
    Route::get('getChartData', 'ExpenseController@getChartData');
    Route::get('usedCategories', 'ExpenseController@getUsedCategories');
    Route::get('getFiltered', 'ExpenseController@getFiltered');
    
    //編集
    Route::get('edit/{expense_id}', 'ExpenseController@showExpense');
    Route::patch('edit/{expense_id}', 'ExpenseController@editExpense');
    
    //削除
    Route::post('delete', 'ExpenseController@deleteExpense');
});


Route::group(['middleware' => 'jwt.auth'], function() {
    //新規追加
    Route::get('categories', 'ExpenseController@getCategories');
    Route::post('add', 'ExpenseController@addExpense');
    
    //一覧表示
    Route::get('get', 'ExpenseController@getExpenses');
    Route::get('getChartData', 'ExpenseController@getChartData');
    Route::get('usedCategories', 'ExpenseController@getUsedCategories');
    Route::get('getFiltered', 'ExpenseController@getFiltered');
    
    //編集
    Route::get('edit/{expense_id}', 'ExpenseController@showExpense');
    Route::patch('edit/{expense_id}', 'ExpenseController@editExpense');
    
    //削除
    Route::post('delete', 'ExpenseController@deleteExpense');
});