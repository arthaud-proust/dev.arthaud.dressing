<?php

use App\Http\Controllers\AppDeployController;
use Illuminate\Support\Facades\Route;

Route::post('/app/deploy', AppDeployController::class)->name('app.deploy');
