<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Input;
use Tymon\JWTAuth\Facades\JWTAuth;

use App\User;


class AuthenticateController extends Controller
{

    public function __construct() {
        $this->middleware('jwt.auth', ['except' => ['authenticate']]);
    }

    // not working properly, should not get any results... :(
    public function index() {
        // Retrieve all the users in the database and return them
        $users = User::all();
        return $users;
    }
    public function authenticate(Request $request) {
        // can also use Input::only, but then it does have rules built into kernel?
        $credentials = $request->only('email', 'password');
        try {
            // verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        // if no errors are encountered we can return a JWT
        return response()->json(compact('token'));
    }
}