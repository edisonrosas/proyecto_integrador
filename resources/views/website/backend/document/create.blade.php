@extends('website.backend.layouts.main')
@section('content')
<div class="col-md-12 col-sm-12 ">
    <div class="x_panel">
      <div class="x_title">
        <h2>Crear documentos</h2>
        <ul class="nav navbar-right panel_toolbox">
          <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
          </li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-wrench"></i></a>
            <ul class="dropdown-menu" role="menu">
            </ul>
          </li>
          <li><a class="close-link"><i class="fa fa-close"></i></a>
          </li>
        </ul>
        <div class="clearfix"></div>
      </div>
      <div class="x_content">
        <br>
      <form method="POST" id="demo-form2" data-parsley-validate="" class="form-horizontal form-label-left" novalidate="" enctype="multipart/form-data" action="{{route('document.store')}}">
        @csrf

          <div class="item form-group">
            <label class="col-form-label col-md-3 col-sm-3 label-align" for="first-name">Título<span class="required">*</span>
            </label>
            <div class="col-md-6 col-sm-6 ">
              <input type="text" id="title" name="title" required="required" class="form-control ">
            </div>
          </div>

          <input type="file" name="document1" id="document1">
          <input type="file" name="document2" id="document2">



          <div class="ln_solid"></div>
          <div class="item form-group">
            <div class="col-md-6 col-sm-6 offset-md-3">
              <button class="btn btn-primary" type="button">Cancelar</button>
              <button class="btn btn-primary" type="reset">Reset</button>
              <button type="submit" class="btn btn-success">Crear</button>
            </div>
          </div>

        </form>
      </div>
    </div>
  </div>
@endsection

