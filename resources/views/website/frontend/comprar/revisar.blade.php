<!doctype html>
<html lang="es">
    @include('website.frontend.layouts.head')
<body>
    @include('website.frontend.layouts.header')
    <main>
        <!-- Hero Area Start-->
        <div class="slider-area ">
            <div class="single-slider slider-height2 d-flex align-items-center">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="hero-cap text-center">
                                <h2>Confirmar Carro de Compra</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--================Checkout Area =================-->
        <section class="checkout_area section_padding">
          <div class="container">


            <div class="billing_details">
              <div class="row">
                <div class="col-lg-8">
                  <h3>Detalles de Compra</h3>
                <form class="row contact_form" action="{{route('website.storeOrder')}}" method="post" enctype="multipart/form-data" >
                    @csrf

                    <div class="col-md-6 form-group p_star">
                      <input type="text" class="form-control" id="first" name="nombres" />
                      <span class="placeholder" data-placeholder="Nombres"></span>
                    </div>
                    <div class="col-md-6 form-group p_star">
                      <input type="text" class="form-control" id="last" name="apellidos" />
                      <span class="placeholder" data-placeholder="Apellidos"></span>
                    </div>
                     'nombres',
        'apellidos',
        'celular',
        'fecha_nacimiento',
        'DNI',
        'ciudad',
        'codigo_postal',
        'direccion', 
                    <div class="col-md-6 form-group p_star">
                      <input type="number" max="1" maxlength="9" class="form-control" id="number" name="celular" />
                      <span class="placeholder" data-placeholder="Celular"></span>
                    </div>
          <div class="item form-group">
            <label class="col-form-label col-md-3 col-sm-3 label-align">Fecha de Nacimiento <span class="required">*</span>
            </label>
            <div class="col-md-6 col-sm-6 ">
                <input type="date" id="fecha_nacimientos" name="fecha_nacimiento" required="required" class="form-control ">
    
            </div>
          </div> 
                    <div class="col-md-6 form-group p_star">
                       <label class="col-form-label col-md-3 col-sm-3 label-align">Fecha de Nacimiento <span class="required">*</span>
                       <input type="date" id="fecha_nacimientos" name="fecha_nacimiento" required="required" class="form-control ">
                    </div>

                    <div class="col-md-12 form-group p_star">
                      <input type="number" min="1" maxlength="8" class="form-control"  name="DNI" />
                      <span class="placeholder" data-placeholder="N??mero DNI"></span>
                    </div>

                    <div class="col-md-12 form-group p_star">
                      <input type="text" class="form-control"  name="ciudad" />
                      <span class="placeholder" data-placeholder="Ciudad"></span>
                    </div>

                    <div class="col-md-12 form-group p_star">
                        <input type="text" class="form-control"  name="direccion" />
                        <span class="placeholder" data-placeholder="direccion"></span>
                      </div>

                    <div class="col-md-12 form-group">
                      <input type="text" class="form-control" id="zip" name="codigo_postal" placeholder="Postcode/ZIP" />
                    <input type="hidden" class="form-control" id="" name="totalPrice" value="{{$totalPrice}}"  />

                    </div>

                    <div class="radion_btn">
                        <input type="radio" id="f-option5" name="payment_type" value="cash">
                        <label for="f-option5">Pagar en Delivery</label>
                        <div class="check"></div>
                      </div>
                      <div class="radion_btn">
                        <input type="radio" id="f-option5" name="payment_type" value="card">
                        <label for="f-option5">Tarjeta</label>
                        <div class="check"></div>
                      </div>

                    <button class="btn_3" type="submit">Proceder a Ordenar</button>
                  </form>
                </div>
                <div class="col-lg-4">

                </div>
              </div>
            </div>
          </div>
        </section>
        <!--================End Checkout Area =================-->
    </main>
    <footer>
        <!-- Footer Start-->
        <div class="footer-area footer-padding">
            <div class="container">
                <div class="row d-flex justify-content-between">
                    <div class="col-xl-3 col-lg-3 col-md-5 col-sm-6">
                        <div class="single-footer-caption mb-50">
                            <div class="single-footer-caption mb-30">
                                <!-- logo -->
                                <div class="footer-logo">
                                    <a href="index.html"><img src="assets/img/logo/logo2_footer.png" alt=""></a>
                                </div>
                                <div class="footer-tittle">
                                    <div class="footer-pera">
                                        <p>Asorem ipsum adipolor sdit amet, consectetur adipisicing elitcf sed do eiusmod tem.</p>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-2 col-lg-3 col-md-3 col-sm-5">
                        <div class="single-footer-caption mb-50">
                            <div class="footer-tittle">
                                <h4>Quick Links</h4>
                                <ul>
                                    <li><a href="#">About</a></li>
                                    <li><a href="#"> Offers & Discounts</a></li>
                                    <li><a href="#"> Get Coupon</a></li>
                                    <li><a href="#">  Contact Us</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-4 col-sm-7">
                        <div class="single-footer-caption mb-50">
                            <div class="footer-tittle">
                                <h4>New Products</h4>
                                <ul>
                                    <li><a href="#">Woman Cloth</a></li>
                                    <li><a href="#">Fashion Accessories</a></li>
                                    <li><a href="#"> Man Accessories</a></li>
                                    <li><a href="#"> Rubber made Toys</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-5 col-sm-7">
                        <div class="single-footer-caption mb-50">
                            <div class="footer-tittle">
                                <h4>Support</h4>
                                <ul>
                                    <li><a href="#">Frequently Asked Questions</a></li>
                                    <li><a href="#">Terms & Conditions</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                    <li><a href="#">Report a Payment Issue</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Footer bottom -->
                <div class="row align-items-center">
                    <div class="col-xl-7 col-lg-8 col-md-7">
                        <div class="footer-copy-right">
                            <p><!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
  Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i class="fa fa-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
  <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --></p>
                        </div>
                    </div>
                    <div class="col-xl-5 col-lg-4 col-md-5">
                        <div class="footer-copy-right f-right">
                            <!-- social -->
                            <div class="footer-social">
                                <a href="#"><i class="fab fa-twitter"></i></a>
                                <a href="https://www.facebook.com/sai4ull"><i class="fab fa-facebook-f"></i></a>
                                <a href="#"><i class="fab fa-behance"></i></a>
                                <a href="#"><i class="fas fa-globe"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Footer End-->
    </footer>
    <!--? Search model Begin -->
    <div class="search-model-box">
        <div class="h-100 d-flex align-items-center justify-content-center">
            <div class="search-close-btn">+</div>
            <form class="search-model-form">
                <input type="text" id="search-input" placeholder="Searching key.....">
            </form>
        </div>
    </div>
    <!-- Search model end -->

<!-- JS here -->
@include('website.frontend.layouts.foot')
</body>
</html>
