{{--Esta página posee paginación funcional casi en su totalidad 
El uso de delete en cascada no está disponible
--}}

@extends('website.backend.layouts.main')
@section('content')
<div class="col-md-12 col-sm-12 ">
    <div class="x_panel">
      <div class="x_title">
        <h2>Categorias de los Articulos </h2>
        <ul class="nav navbar-right panel_toolbox">
          <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
          </li>
          <li><a class="close-link"><i class="fa fa-close"></i></a>
          </li>
        </ul>
        <div class="clearfix"></div>
      </div>
      <div class="x_content">
          <div class="row">
              <div class="col-sm-12">
                <div class="card-box table-responsive">

                <a href="{{route('categoria.create')}}" class="btn btn-success">Crear Categoria</a>

Página {{$categoria->currentPage()}} de {{$categoria->lastPage()}}

        <div><div class="row"><div class="col-sm-6">

        </div>
        <div class="col-sm-6"><div id="datatable-responsive_filter" class="dataTables_filter"><label>Search:<input type="search" class="form-control input-sm" placeholder="" aria-controls="datatable-responsive"></label></div></div></div><div class="row"><div class="col-sm-12"><table id="datatable-responsive" class="table table-striped table-bordered dt-responsive nowrap dataTable no-footer dtr-inline" cellspacing="0" width="100%" role="grid" aria-describedby="datatable-responsive_info" style="width: 100%;">
          <thead>
            <tr role="row">
                <th class="sorting_asc" tabindex="0" aria-controls="datatable-responsive" rowspan="1" colspan="1" style="width: 77px;" aria-sort="ascending" aria-label="First name: activate to sort column descending">Categoria de Articulo</th>
                <th class="sorting" tabindex="0" aria-controls="datatable-responsive" rowspan="1" colspan="1" style="width: 77px;" aria-label="Last name: activate to sort column ascending"></th>
                <th class="sorting" tabindex="0" aria-controls="datatable-responsive" rowspan="1" colspan="1" style="width: 77px;" aria-label="Last name: activate to sort column ascending"></th>
            </tr>
            </thead>
          <tbody>
              @foreach ($categoria as $procat )
              
                <tr role="row">
                  <td>
                    {{$procat->categoria}}
                  </td>
                  <td>
                    <a class="btn btn-app" href="{{route('categoria.edit',$procat->id)}}">
                            <i class="fa fa-edit"></i> Editar
                    </a>
                  </td>
                  <td>
                    {{--<form method="POST" action="{{route('categoria.destroy',$procat->id)}}">--}}
                              {{--
                                <button class="btn btn-danger" onclick="event.preventDefault();
                                document.getElementById('delete-form').submit();" >  <!--- Se crea un boton que ejecuta un formulario-->
                                {{__('auth.Delete Post')}}
                                </button>
                                <form id="delete-form" action="{{ url('/delete?cat_id='.$procat->id)}}" method="POST" >
                                    @csrf  
                                </form>  --}} 

                    <form method="POST" action="{{ url('/delete?cat_id ='.$procat->id)}}" enctype="multipart/form-data">
                
                      @csrf
                      @method('get')
                        <button class="btn btn-app" type="submit">
                          <i class="fa fa-warning"></i> Borrar
                        </button>
                    </form>
  
                  </td>
                </tr>
              @endforeach

             
        </tbody>
       
        </table>
        
        
        </div></div><div class="row"><div class="col-sm-5"><div class="dataTables_info" id="datatable-responsive_info" role="status" aria-live="polite">
        Mostrando  {{$categoria->firstItem()}}  a  {{$categoria->lastItem()}}  de {{$categoria->total()}}  </div>
    
        </div>
     
          <div class="col-sm-7">
            <div>
              <ul class="pagination">
                <li class="paginate_button previous disabled" id="datatable-responsive_previous">  
                  <a href=" {{$categoria->previousPageUrl()}}" aria-controls="datatable-responsive" data-dt-idx="0" tabindex="0">Anterior
                </li>
                <li class="paginate_button ">
                      <a href="{{$categoria->url(1)}}" aria-controls="datatable-responsive" data-dt-idx="2" tabindex="0">1</a>
                </li>

                @for ($i = $categoria->currentPage()+1; $i < $categoria->currentPage()+3; $i++)
            
                    <li class="paginate_button ">
                      <a href="{{$categoria->url($i)}}" aria-controls="datatable-responsive" data-dt-idx="2" tabindex="0">{{$i}}</a>
                    </li>
                @endfor

                <li class="paginate_button ">
                      <a href="{{ $categoria->url($categoria->count()) }}" aria-controls="datatable-responsive" data-dt-idx="2" tabindex="0">{{$categoria->lastPage()}}</a>
                </li>
   
                <li class="paginate_button next">
                  <a href="{{$categoria->nextPageUrl()}}" aria-controls="datatable-responsive" data-dt-idx="7" tabindex="0">Siguiente</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</div>
    </div>
  </div>
@endsection