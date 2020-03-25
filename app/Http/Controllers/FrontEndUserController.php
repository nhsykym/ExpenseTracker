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
      
      
      //ログインしたユーザーのidとnameを返す
      $userInfo = \App\User::where('email', $request->email)->get()->first();
      $user = [
        'userId' => $userInfo->id,
        'userName' => $userInfo->name
      ];
      
      return response()->json(compact('token', 'user'));
    }
    
    public function refreshToken()
    {
      $token = JWTAuth::getToken();
      try {
          $token = JWTAuth::refresh($token);
          Log::debug('New token: ' . $token);
      } catch (JWTException $e) {
          return response()->json(['error' => 'could_not_create_token'], 500);
      }
  
      return response()->json(compact('token'));
    }
}
