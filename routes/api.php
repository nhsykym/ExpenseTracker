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
    Route::get('get', 'ExpenseController@getExpenses');
    Route::get('getChartData', 'ExpenseController@getChartData');
    Route::post('add', 'ExpenseController@addExpense');
    Route::get('edit/{expense_id}', 'ExpenseController@showExpense');
    Route::patch('edit/{expense_id}', 'ExpenseController@editExpense');
    Route::post('delete', 'ExpenseController@deleteExpense');
});
