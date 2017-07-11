<?php
use Illuminate\Http\Request;

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', function ($api) {

	$api->post('auth/login', 'App\Api\V1\Controllers\AuthController@login');
	$api->post('auth/signup', 'App\Api\V1\Controllers\AuthController@signup');
	$api->post('auth/recovery', 'App\Api\V1\Controllers\AuthController@recovery');
	$api->post('auth/reset', 'App\Api\V1\Controllers\AuthController@reset');


	$api->get('auth/user-info', ['middleware' => ['api.auth'], function (Request $request) {
		// $token = $request->input('token');
		$userInfo = \JWTAuth::decode(\JWTAuth::getToken())->toArray();
		$userId = $userInfo['sub'];
		return \App\User::find($userId);
    }]);

	$api->post('auth/user-info', ['middleware' => ['api.auth'], function (Request $request) {
		// $token = $request->input('token');
		$userInfo = \JWTAuth::decode(\JWTAuth::getToken())->toArray();
		$userId = $userInfo['sub'];
		$user =  \App\User::find($userId);
		$user->name = $request->name;
		$user->company = $request->company;
		$user->save();
		return $user;
  }]);

	// example of protected route
	$api->get('protected', ['middleware' => ['api.auth'], function () {
		return \App\User::all();
    }]);


	// example of free route
	$api->get('free', function() {
		return \App\User::all();
	});

});
