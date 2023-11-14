import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './nav/navbar/navbar.component';
import { FooterComponent } from './footer/footer/footer.component';
import { ClientesComponent } from './clientes/clientes/clientes.component';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './clientes/form/form.component';
import {  FormsModule,  ReactiveFormsModule  } from "@angular/forms";
import { SpinerComponent } from './clientes/spiner/spiner.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from "@angular/material-moment-adapter";

import { DetalleComponent } from './clientes/detalle/detalle.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/guards/auth.guard';
import { FacturascliComponent } from './facturas/facturascli/facturascli.component';
import { FacturasdetailComponent } from './facturas/facturasdetail/facturasdetail.component';
import { FormfacturasComponent } from './facturas/formfacturas/formfacturas.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home' , component: HomeComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/page/:page', component: ClientesComponent},
  {path: 'clientes/form', component: FormComponent, data: {titulo: 'Crear Cliente'},canActivate: [authGuard]},
  {path: 'clientes/form/:id', component: FormComponent, data: {titulo: 'Editar Cliente'},canActivate: [authGuard]},
  {path: 'clientes/ver/:id', component: DetalleComponent, data: {titulo: 'Detalle Cliente'},canActivate: [authGuard]},
  {path: 'facturas/ver/:id', component: FacturascliComponent, data: {titulo: 'Detalle Factura'},canActivate: [authGuard]},
  {path: 'facturas/:id', component: FacturasdetailComponent, data: {titulo: 'Detalle Factura'},canActivate: [authGuard]},
  {path: 'facturas/form/:clienteid', component: FormfacturasComponent, data: {titulo: 'Crear Factura'},canActivate: [authGuard]},
  {path: 'login', component: LoginComponent},
  

];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ClientesComponent,
    HomeComponent,
    FormComponent,
    SpinerComponent,
    PaginatorComponent,
    DetalleComponent,
    LoginComponent,
    FacturascliComponent,
    FacturasdetailComponent,
    FormfacturasComponent,


  ],
  imports: [
    BrowserModule ,  
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatDatepickerModule,    
    MatMomentDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatIconModule,

    

   
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
