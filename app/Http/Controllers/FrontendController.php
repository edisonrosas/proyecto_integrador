<?php

namespace App\Http\Controllers;

use App\Cart;
use App\models\CustomerDetail;
use App\models\Payment;
use App\models\Product;
use App\models\ProductImage;


use App\Models\Articulo;
use App\Models\Pago;
use App\Models\Cliente;
use App\Models\Shopcart;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class FrontendController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $article=Articulo::paginate(3);
        $popular=Articulo::paginate(6);
        return view('website.frontend.layouts.main', compact('article','popular'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

     public function addToCart(Request $request, $id){
         $articulo=Articulo::find($id);
         $oldCart =Session::has('cart') ? Session::get('cart') : null;

         $cart=new Cart($oldCart);
         $cart->add($articulo,$articulo->id);

         $request->session()->put('cart', $cart);

        //  dd($request->session()->get('cart'));
         return redirect()->route('website.index');

     }

     public function getCart(){
        if(!Session::has('cart')){
             return view('website.frontend.comprar.shopping-cart',['articulos'=>null]);
        }
        $oldCart=Session::get('cart');
        $cart=new Cart($oldCart);
        //  $products=$cart->items;
        //  $totalPrice=$cart->totalPrice;
        //  return view('website.frontend.shop.shopping-cart',compact('products','totalPrice'));
        return view('website.frontend.comprar.shopping-cart',['articulos'=>$cart->items,'totalMonto'=>$cart->totalPrice]);
     }
/*
     public function getCheckout(){
        if(!Session::has('cart')){
            return view('website.frontend.shop.shopping-cart',['products'=>null]);
        }
        $oldCart=Session::get('cart');
        $cart=new Cart($oldCart);
        return view('website.frontend.shop.checkout',['products'=>$cart->items,'totalPrice'=>$cart->totalPrice]);
    }
*/
    public function storeOrder(Request $request){
        Cliente::create([
            'nombres'=>$request->f_name,
            'apellidos'=>$request->l_name,
            'celular'=>$request->phone,
            'fecha_nacimiento'=>$request->date,
            'DNI' =>$request->dni,
            'ciudad'=>$request->town,
            'codigo_postal'=>$request->post_code,
            'direccion'=>$request->address,

        ]);

        $cliente=Cliente::orderBy('created_at')->first();
        $clienteId=$cliente->id;

        $oldCart=Session::get('cart');
        $cart=new Cart($oldCart);

        $request->shopcart()->create([
             'costo_total'=>$request->costo_total,
             'articulos'=>$cart->items,
             'cantidad'=>$cart->totalQty,
        ]);

        Pago::create([
            'costo_total'=>$request->costo_total,
            'tipo_pago'=>$request->tipo_pago,
            'cliente_id'=>$clienteId,
        ]);

        $request->session()->flush();

        return redirect()->route('website.index');
    }

    public function getCheckout(){
        if(!Session::has('cart')){
            return view('website.frontend.comprar.shopping-cart',['articulos'=>null]);
        }
        $oldCart=Session::get('cart');
        $cart=new Cart($oldCart);
        return view('website.frontend.comprar.revisar',['articles'=>$cart->items,'totalPrice'=>$cart->totalPrice]);
    }



    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
