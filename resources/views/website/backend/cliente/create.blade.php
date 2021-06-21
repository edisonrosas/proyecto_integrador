@extends('website.backend.layouts.main')
@section('content')
<div class="col-md-12 col-sm-12 ">
    <div class="x_panel">
      <div class="x_title">
        <h2>Agregar Cliente </h2>
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
      <form id="demo-form2" data-parsley-validate="" class="form-horizontal form-label-left" novalidate="" method="POST" action="{{route('cliente.store')}}">
        @csrf



          {{-- <div class="item form-group">
            <label class="col-form-label col-md-3 col-sm-3 label-align" for="first-name">Product Category<span class="required">*</span>
            </label>
            <div class="col-md-6 col-sm-6 ">

            <select class="form-control" name="product_category">
                @foreach ($productcategory as $procat)
                <option value="{{$procat->id}}" name="product_category">{{$procat->brand_name}}</option>


                @endforeach





            </div>
          </div> --}}


          <div class="item form-group">
            <label class="col-form-label col-md-3 col-sm-3 label-align" for="first-name">Nombres<span class="required">*</span>
            </label>
            <div class="col-md-6 col-sm-6 ">
                <input type="text" id="nombres" name="nombres" required="required" class="form-control ">
              </div>
          </div>

          <div class="item form-group">
            <label class="col-form-label col-md-3 col-sm-3 label-align" for="first-name">Apellidos<span class="required">*</span>
            </label>
            <div class="col-md-6 col-sm-6 ">
              <input type="text" id="apellidos" name="apellidos" required="required" class="form-control ">  
            </div>
          </div>

          <div class="item form-group">
            <label class="col-form-label col-md-3 col-sm-3 label-align" for="first-name">Celular<span class="required">*</span>
            </label>
            <div class="col-md-6 col-sm-6 ">
                <input type="number" min="1" maxlength="9" id="celular" name="celular" required="required" class="form-control ">  
            </div>
          </div>

          <div class="item form-group">
            <label class="col-form-label col-md-3 col-sm-3 label-align">Fecha de Nacimiento <span class="required">*</span>
            </label>
            <div class="col-md-6 col-sm-6 ">
                <input type="date" id="fecha_nacimientos" name="fecha_nacimiento" required="required" class="form-control ">
    
            </div>
          </div> 


          <div class="item form-group">
            <label class="col-form-label col-md-3 col-sm-3 label-align" for="first-name">DNI<span class="required">*</span>
            </label>
            <div class="col-md-6 col-sm-6 ">
                <input type="number" min="1" maxlength="8" id="DNI" name="DNI" required="required" class="form-control ">
         
            </div>
          </div>

          <div class="item form-group">
            <label class="col-form-label col-md-3 col-sm-3 label-align" for="first-name">Ciudad<span class="required">*</span>
            </label>
            <div class="col-md-6 col-sm-6 ">
                <input type="text" id="ciudad" name="ciudad" required="required" class="form-control " >
            </div>
          </div>

          <div class="item form-group">
            <label class="col-form-label col-md-3 col-sm-3 label-align" for="first-name">Codigo Postal<span class="required">*</span>
            </label>
            <div class="col-md-6 col-sm-6 ">
              <input type="text" id="codigo_postal" name="codigo_postal" required="required" class="form-control ">
            </div>
          </div>

            <div class="item form-group">
                <label class="col-form-label col-md-3 col-sm-3 label-align" for="first-name">Direccion<span class="required">*</span>
                </label>
                <div class="col-md-6 col-sm-6 ">
                    <textarea id="direccion" 
                              required="required" 
                              class="form-control" 
                              name="direccion" data-parsley-trigger="keyup" data-parsley-minlength="20" data-parsley-maxlength="100" data-parsley-minlength-message="Come on! You need to enter at least a 20 caracters long comment.." data-parsley-validation-threshold="10"></textarea>

                </div>
            </div>
          <div class="ln_solid"></div>
          <div class="item form-group">
            <div class="col-md-6 col-sm-6 offset-md-3">
              <button class="btn btn-primary" type="button">Cancelar</button>
              <button class="btn btn-primary" type="reset">Reset</button>
              <button type="submit" class="btn btn-success">Agregar</button>
            </div>
          </div>

        </form>
      </div>
    </div>
  </div>
@endsection

