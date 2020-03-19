<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
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
        if (! $token = JWTAuth::attempt(['email' => $request->email, 'password' => $request->password])) {
          return response()->json(['error' => 'invalid_credentials'], 401);
        }
      } catch (JWTException $e) {
        return response()->json(['error' => 'could_not_create_token'], 500);
      }
      
      Log::debug(compact('token'));
      return response()->json(compact('token'));
      
    }
}
