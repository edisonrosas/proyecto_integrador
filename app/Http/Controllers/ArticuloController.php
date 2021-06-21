<?php

namespace App\Http\Controllers;

use App\Models\Articulo;
use App\Models\Marca;
use App\Models\Detalles;
use App\Models\Categoria;
use Illuminate\Http\Request;

class ArticuloController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $articulo=Articulo::all();
        return view('website.backend.articulo.index', compact('articulo'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $categoria=Categoria::all();
        $marca=Marca::all();
        return view('website.backend.articulo.create',compact('categoria','marca'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $slug=Str::slug($request->nombre_articulo,'-');
        // $request->merge(['brand_name',$slug]);
        
        $image = time().'.'.$request->imagen->extension();
        $request->imagen->move(public_path('img'), $image);

        Artiulo::create([
            'nombre_articulo' =>$request->nombre_articulo,
            'precio'  =>$request->precio,
            'descripcion'  =>$request->descripcion,
            'slug'  =>$slug,
            'status'  =>'A',
            'imagen'  =>$image,
         ]);

         return redirect()->route('product.index');

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Articulo  $articulo
     * @return \Illuminate\Http\Response
     */
    public function show(Articulo $articulo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Articulo  $articulo
     * @return \Illuminate\Http\Response
     */
    public function edit(Articulo $articulo)
    {
        $categoria=Categoria::all();
        $marca=Marca::all();
        return view('website.backend.articulo.update', compact('articulo','categoria','marca'));


    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Articulo  $articulo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Articulo $articulo)
    {
        $slug=Str::slug($request->product_name,'-');
        // $request->merge(['brand_name',$slug]);

        if($request->imagen){
            $image = time().'.'.$request->imagen->extension();
            $request->imagen->move(public_path('img'), $image);

        }
        else{
            $image=$articulo->imagen;
        }

        $articulo->update([
            'nombre_articulo' =>$request->nombre_articulo,
            'precio'  =>$request->precio,
            'descripcion'  =>$request->descripcion,
            'slug'  =>$slug,
            'status'  =>$request->status,
            'imagen'  =>$image,
        ]);
         return redirect()->route('articulo.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Articulo  $articulo
     * @return \Illuminate\Http\Response
     */
    public function destroy(Articulo $articulo)
    {
        $articulo->delete();
        return redirect()->route('articulo.index');
    }
}
