@extends('website.backend.layouts.main')
@section('content')
<div class="col-md-12 col-sm-12 ">
    <div class="x_panel">
      <div class="x_title">
        <h2>Editar Articulo</h2>
        <ul class="nav navbar-right panel_toolbox">
          <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
          </li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-wrench"></i></a>
            <ul class="dropdown-menu" role="menu">
              {{-- <li><a class="dropdown-item" href="#">Settings 1</a>
              </li>
              <li><a class="dropdown-item" href="#">Settings 2</a>
              </li> --}}
            </ul>
          </li>
          <li><a class="close-link"><i class="fa fa-close"></i></a>
          </li>
        </ul>
        <div class="clearfix"></div>
      </div>
      <div class="x_content">
        <br>
      <form id="demo-form2" data-parsley-validate="" class="form-horizontal form-label-left" novalidate="" method="POST" action="{{route('articulo.update',$articulo->id)}}">
        @csrf
        @method('PUT')



        <div class="item form-group">
            <label class="col-form-label col-md-3 col-sm-3 label-align" for="first-name">Categoria de Articulo<span class="required">*</span>
            </label>
            <div class="col-md-6 col-sm-6 ">

            <select class="form-control" name="product_category">
                @foreach ($categoria as $procat)
                <option value="{{$procat->id}}" name="product_category">{{$procat->categoria}}</option>
                @endforeach
              </select>

            </div>
        </div>

        <div class="item form-group">
            <label class="col-form-label col-md-3 col-sm-3 label-align" for="first-name">Marca de Articulo<span class="required">*</span>
            </label>
            <div class="col-md-6 col-sm-6 ">

            <select class="form-control" name="product_category">
                @foreach ($marca as $marcaprod)
                <option value="{{$marcaprod->id}}" name="product_category">{{$marcaprod->marca}}</option>
                @endforeach
              </select>

            </div>
        </div>
         
    
           <div class="item form-group">
                <label class="col-form-label col-md-3 col-sm-3 label-align" for="first-name">Nombre Articulo<span class="required">*</span>
                </label>
                <div class="col-md-6 col-sm-6 ">
                <input type="text" id="product_name" value="{{$articulo->nombre_articulo}}" name="product_name" required="required" class="form-control ">
                </div>
           </div>

           <div class="item form-group">
                <label class="col-form-label col-md-3 col-sm-3 label-align" for="first-name">Precio<span class="required">*</span>
                </label>
                <div class="col-md-6 col-sm-6 ">
                <input type="text" id="price" name="price" value="{{$articulo->precio}}" required="required" class="form-control ">
                </div>
           </div>

            <div class="item form-group">
                <label class="col-form-label col-md-3 col-sm-3 label-align" for="first-name">Descripcion<span class="required">*</span>
                </label>
                <div class="col-md-6 col-sm-6 ">
                    <textarea value="" id="message" required="required" class="form-control" name="product_desc" data-parsley-trigger="keyup" data-parsley-minlength="20" data-parsley-maxlength="100" data-parsley-minlength-message="Come on! You need to enter at least a 20 caracters long comment.." data-parsley-validation-threshold="10">
                        {{$articulo->descripcion}}
                    </textarea>
                </div>
            </div>
             <div class="item form-group">
              <label class="col-form-label col-md-3 col-sm-3 label-align" for="first-name">Imagen actual<span class="required">*</span>
                </label>
               <img src="{{asset($articulo->imagen)}}" height="100px" width="100px">
              </div>
            <div class="item form-group">
                <label class="col-form-label col-md-3 col-sm-3 label-align" for="first-name">Cargar imagen<span class="required">*</span>
                </label>
                <div class="col-md-6 col-sm-6 ">
                    <input type="file" name="imagen" id="imagen" onchange="fileSelected();"/>
                </div>
            </div>
          <div class="ln_solid"></div>
            <div class="item form-group">
                <div class="col-md-6 col-sm-6 offset-md-3">
                  <a href="{{route('articulo.index')}}" ><button class="btn btn-primary" type="button">Cancelar</button></a>
                  <button class="btn btn-primary" type="reset">Reset</button>
                  <button type="submit" class="btn btn-success">Editar</button>
                </div>
            </div>

        </form>
      </div>
    </div>
  </div>
@endsection

