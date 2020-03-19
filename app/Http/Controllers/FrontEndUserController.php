<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Log;

class FrontEndUserController extends Controller
{
    public function signUp(Request $request)
    {
      $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => bcrypt($request->password)
      ]);
      
      Log::debug($user);
    }
    
    public function signIn(Request $request)
    {
      try {
        if (! $token = JWT::attempt(['name' => $request->name, 'email' => $request->email, 'password' => $request->password])) {
          return response()->json(['error' => 'invalid_credentials'], 401);
        }
      } catch (JWTException $e) {
        return response()->json(['error' => 'could_not_create_token'], 500);
      }
      
      return response()->json(compact('token'));
    }
}
