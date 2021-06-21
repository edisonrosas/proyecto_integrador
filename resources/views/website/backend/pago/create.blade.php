@extends('website.backend.layouts.main')
@section('content')
<div class="col-md-12 col-sm-12 ">
    <div class="x_panel">
      <div class="x_title">
        <h2>Crear Pago </h2>
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
      <form id="demo-form2" data-parsley-validate="" class="form-horizontal form-label-left" novalidate="" method="POST" action="{{route('pago.store')}}">
        @csrf



          <div class="item form-group">
            <label class="col-form-label col-md-3 col-sm-3 label-align" for="first-name">Cliente DNI<span class="required">*</span>
            </label>
            <div class="col-md-6 col-sm-6 ">

            <select class="form-control" name="customer_id">
                @foreach ($cliente as $client)
                <option value="{{$client->id}}" name="customer_id">{{$client->DNI}}</option>
                @endforeach
            </select>
            </div>
          </div>


          <div class="item form-group">
            <label class="col-form-label col-md-3 col-sm-3 label-align" for="first-name">Monto Total<span class="required">*</span>
            </label>
            <div class="col-md-6 col-sm-6 ">
              <input type="number"  min="1" id="total" name="total" required="required" class="form-control ">
            </div>
          </div>

          <div class="item form-group">
            <label class="col-form-label col-md-3 col-sm-3 label-align" >Tipo Pago<span class="required">*</span>
            </label>
            <div class="col-md-6 col-sm-6 ">

            <select class="form-control" name="payment_type">

                <option value="Efectivo" name="payment_type">Pagar Delivery</option>
                <option value="Tarjeta" name="payment_type">Tarjeta</option>

            </select>

            </div>
          </div>

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

