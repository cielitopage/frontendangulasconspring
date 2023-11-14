import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Factura } from '../facturas/models/factura';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from './usuario.service';
import { Producto } from '../facturas/models/producto';

@Injectable({
  providedIn: 'root'
})
export class FacturasService implements OnInit {

private urlEndPoint: string = 'http://localhost:8080/api/facturas';
private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    private http: HttpClient,
    private router: Router,
    private usuarioService: UsuarioService,
    
  ) { }


  ngOnInit(): void {  

  }

  private agregarAuthorizationHeader(){
    let token = this.usuarioService.token;
    if(token != null){
      return this.httpHeaders.append('Authorization','Bearer '+ token);
    }
    return this.httpHeaders;
  }

  private isNoAutorizado(e : any ): boolean{
    if(e.status == 401){
      if(this.usuarioService.isAuthenticated()){
        this.usuarioService.logout();
      }
      this.router.navigate(['/login']);
      return true;
    }

    if(e.status == 403){
      Swal.fire(
        'Acceso denegado',
        `Hola ${this.usuarioService.usuario.username} no tienes acceso a este recurso!`,
        'warning'
      )
      this.router.navigate(['/clientes']);
      return true;
    }
    return false;   
  }


   getFacturas(id:number):Observable<any[]>{
    console.log(id);
    return this.http.get<any[]>(`${this.urlEndPoint}/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
   }

   delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
   }
   
   filtrarProductos(term: string): Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.urlEndPoint}/filtrar-productos/${term}`, {headers: this.agregarAuthorizationHeader()})
    .pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
      );
    }


    create(factura: Factura): Observable<Factura>{
      return this.http.post<Factura>(this.urlEndPoint, factura, {headers: this.agregarAuthorizationHeader()})
    }



}