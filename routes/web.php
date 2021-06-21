<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FrontendController;
use App\Http\Controllers\BackendController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ArticuloController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\MarcaController;
use App\Http\Controllers\PagoController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductCategoryController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
/*
Route::get('/', function () {
    return view('welcome');
});



Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
*/
Auth::routes();


Route::get('/', [FrontendController::class,'index'])->name('website.index');
Route::get('/add-to-cart/{id}', [FrontendController::class,'addToCart'])->name('website.addCart');
Route::get('/shopping-cart', [FrontendController::class,'getCart'])->name('website.cart');
Route::get('/revisar', [FrontendController::class,'getCheckout'])->name('website.revisar');
Route::post('/revisar', [FrontendController::class,'storeOrder'])->name('website.storeOrder');



Route::get('/home', [HomeController::class, 'index'])->name('home');

// Route::get('/dashboard', function () {
//     return view('website.backend.layouts.main');
// });

Route::get('/dashboard', [BackendController::class, 'index'])->name('backend.index');



Route::resource('/dashboard/categoria',CategoriaController::class)->except(['edit','update','delete']);
/* Al intentar emplear resource en Categoria, el URI se cambió de {categoria} a {categorium}
   Se tuvo que crear las rutas manualmente.   */
Route::get('dashboard/categoria/{categoria}/edit', [CategoriaController::class, 'edit'])->name('categoria.edit');
Route::get('dashboard/categoria/{categoria}/update', [CategoriaController::class, 'update'])->name('categoria.update');
//Route::get('dashboard/categoria/delete', [CategoriaController::class, 'destroy'])->name('categoria.destroy');
Route::post('/delete',[CategoriaController::class, 'destroy']);


Route::resource('/dashboard/articulo',ArticuloController::class);
Route::resource('/dashboard/marca',MarcaController::class);
Route::resource('/dashboard/cliente',ClienteController::class);
Route::resource('/dashboard/pago',PagoController::class);
