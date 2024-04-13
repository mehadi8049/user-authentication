<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator;

class AuthController extends Controller
{

    /**
     * Store a newly created resource in storage.
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        try {
            if($validator->fails()){
                throw new \Exception($validator->errors(),422);
            }
            if(Auth::attempt($request->all())){

                $user = Auth::user();

                $accessToken =  $user->createToken('My Token')->accessToken;
                return response()->json([
                    'status' => true,
                    'message' => 'Logged in successully !!',
                    'data'=>[
                        'user' => $user,
                        'access_token' => $accessToken
                    ]
                ],200);
            }else{
                return response()->json([
                    'status' => false,
                    'errorMessage' => 'Sorry Invalid Email or Password',
                    'data' => [],
                ],422);
            }
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
                'data' => [],
            ],$e->getCode());
        }
    }
    /**
     * Store a newly created resource in storage.
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,except,id',
            'password' => 'required',
        ]);


        try {
            if($validator->fails()){
                throw new \Exception($validator->errors(),422);
            }
            $user=User::create([
                'name'=>$request->name,
                'email'=>$request->email,
                'password'=>Hash::make($request->password)
            ]);
            if($user){
                return Response([
                    'status'=>true,
                    'message'=> 'User is created.',
                    'data' => [
                        'user'=>$user
                    ]
                ],201);
            }else{
                throw new \Exception('Something is wrong',500);
            }
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
                'data' => [],
            ],$e->getCode());
        }
    }

    /**
     * Display the specified resource.
     */
    public function profile()
    {
        try {
            $user=auth('api')->user();
            if($user){
                return Response([
                    'status'=>true,
                    'message'=> 'User succesfully retrieved.',
                    'data' => [
                        'user'=>$user
                    ]
                ],201);
            }else{
                throw new \Exception('Something is wrong',500);
            }
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
                'data' => [],
            ]);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function logout(Request $request)
    {
        try {
            $user = Auth::guard('api')->user();
            $user->token()->revoke();
            return response()->json([
                'status'=>true,
                'message'=> 'User Logout successfully.',
                'data' => [
                    'user'=>$user
                ]
            ],200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
                'data' => [],
            ]);
        }
    }

}
