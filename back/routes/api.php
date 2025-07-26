<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PodcastController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


Route::middleware('auth:sanctum')->group(function () {

   
    Route::get('/podcasti',[PodcastController::class,'index']);
    Route::delete('/podcasti/{id}',[PodcastController::class,'destroy']);
      Route::get('podcasti/{id}',[PodcastController::class,'show']);
     Route::post('podcasti',[PodcastController::class,'store']);

});
