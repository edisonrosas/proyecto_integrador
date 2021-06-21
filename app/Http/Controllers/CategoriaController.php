<?php

namespace App\Http\Controllers;

use App\Models\Articulo;
use App\Models\Categoria; 
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
class CategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       // $categoria=Categoria::all();
       //Su paginación en blade es semifuncional, requiere ajustar para más de x hojas
        
       $categoria=Categoria::paginate(15);
       // $categoria=Categoria::all()->orderBy('categoria', 'desc')->paginate(15).
        return view('website.backend.categoria.index', ['categoria' => $categoria]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('website.backend.categoria.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $slug=Str::slug($request->categoria,'-');
        // $request->merge(['brand_name',$slug]);
 
        Categoria::create([
             'categoria'=>$request->categoria,
             'slug'=>$slug
 
         ]);
         return redirect()->route('categoria.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Categoria  $categoria
     * @return \Illuminate\Http\Response
     */
    public function show(Categoria $categoria)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Categoria  $categoria
     * @return \Illuminate\Http\Response
     */
    public function edit(Categoria $categoria)
    {
        return view('website.backend.categoria.update',compact('categoria'));

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Categoria  $categoria
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Categoria $categoria)
    {
        $slug=Str::slug($request->categoria,'-');
        // $request->merge(['brand_name',$slug]);
 
        $categoria->update([
             'categoria'=>$request->categoria,
             'slug'=>$slug
 
         ]);
         return redirect()->route('categoria.index');
 
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Categoria  $categoria
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {

        //Delete en cascada no funciona por ahora
        $articles=Articulo::all();
        foreach ($articles as  $article) {
            
            $articulos=Articulo::where($article->categoria->id,'=',$request->get('cat_id')) ;
            $articulos->delete();
        }
    
        $categoria= Categoria::find($request->get('cat_id'));
        $categoria->delete();

        return redirect()->route('categoria.index');

    }
}
