import { Injectable } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';


import { Cliente } from '../clientes/clientes/cliente';
import { Observable, map, of,catchError,throwError, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';
import { Region } from '../clientes/clientes/region';
import { UsuarioService } from './usuario.service';

registerLocaleData(localeES,'es');
@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    private http: HttpClient,
    private router: Router,
    private usuarioService: UsuarioService  
  ) { }

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

  getClientes(page:number): Observable<any>{
    return this.http.get<Cliente[]>(this.urlEndPoint + '/clientes/page/' + page)
    .pipe( 
      tap( (response:any) => {       
        console.log('ClienteService: tap 1');
       (response.content as Cliente[]).forEach( cliente => {
          console.log(cliente.nombre);
        });
      }),
      map( (response:any) => {
        (response.content as Cliente[]).map( cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          //let datePipe = new DatePipe('es');
          //cliente.createAt = datePipe.transform(cliente.createAt,'EEEE dd, MMMM yyyy');
          //cliente.createAt = formatDate(cliente.createAt,'dd-MM-yyyy','en-US');
          return cliente;
        });
        return response;
      }),
      tap( response => {
        console.log('ClienteService: tap 2');
        (response.content as Cliente[]).forEach( cliente => {
          console.log(cliente.nombre);
        });
      })
    );
  }

  getAllClientes(): Observable<any>{
    return this.http.get<Cliente[]>(this.urlEndPoint + '/clientes')
    .pipe( 
      tap( (response:any) => {       
        console.log('ClienteService: tap 1');
       (response.content as Cliente[]).forEach( cliente => {
          console.log(cliente.nombre);
        });
      }),
      map( (response:any) => {
        (response.content as Cliente[]).map( cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          //let datePipe = new DatePipe('es');
          //cliente.createAt = datePipe.transform(cliente.createAt,'EEEE dd, MMMM yyyy');
          //cliente.createAt = formatDate(cliente.createAt,'dd-MM-yyyy','en-US');
          return cliente;
        });
        return response;
      }),
      tap( response => {
        console.log('ClienteService: tap 2');
        (response.content as Cliente[]).forEach( cliente => {
          console.log(cliente.nombre);
        });
      })
    );
    
  }



  create(cliente: Cliente): Observable<Cliente>{

    return this.http.post<Cliente>(this.urlEndPoint + '/clientes', cliente, {headers: this.agregarAuthorizationHeader()})
    .pipe(
      map ( (response: any) => response.cliente as Cliente),
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError( ()=> e);
        }

        if(e.status == 400){          
          return throwError( ()=> e);         

        }
        console.error(e.error.mensaje);
        Swal.fire(
           e.error.mensaje,
          e.error.error,
          'error'
        )
        return throwError( ()=> e);
      })
    );
   
  }



  getCliente(id: number){
  
    return this.http.get<Cliente>(`${this.urlEndPoint}/clientes/${id}`, {headers: this.agregarAuthorizationHeader()})
    
    .pipe(
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError( ()=> e);
        }
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        Swal.fire(
          'Error al editar',
          e.error.mensaje,
          'error'
        )
        return throwError( ()=> e);
      })
    );
  
  }



  update(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlEndPoint}/clientes/${cliente.id}`, cliente, {headers: this.agregarAuthorizationHeader()})
    .pipe(
      map( (response: any) => response.cliente as Cliente),
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError( ()=> e);
        }

        if(e.status == 400){
          return throwError( ()=> e);
        }
        console.error(e.error.mensaje);
        Swal.fire(
          'Error al editar cliente',
          e.error.mensaje,
          'error'
        )
        return throwError( ()=> e);
      })
    );  
  }



  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/clientes/${id}`, {headers: this.agregarAuthorizationHeader()})
    .pipe(
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError( ()=> e);
        }

        console.error(e.error.mensaje);
        Swal.fire(
          'Error al eliminar cliente',
          e.error.mensaje,
          'error'
        )
        return throwError( ()=> e);
      })
    );
  }



  uploadFoto(archivo: File, id): Observable<Cliente>{
    let formData = new FormData();
    formData.append("archivo",archivo);
    formData.append("id",id);   

    let httpHeaders = new HttpHeaders();
    let token = this.usuarioService.token;
    if(token != null){
      httpHeaders = httpHeaders.append('Authorization','Bearer '+ token);
    }

    return this.http.post(`${this.urlEndPoint}/clientes/upload`, formData, {headers: httpHeaders})
    .pipe(
      map( (response: any) => response.cliente as Cliente),
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError( ()=> e);
        }

        console.error(e.error.mensaje);
        Swal.fire(
          'Error al subir la foto',
          e.error.mensaje,
          'error'
        )
        return throwError( ()=> e);
     
      })
    );

}

getClientesPorRegion(id: number): Observable<Cliente[]>{
  return this.http.get<Cliente[]>(`${this.urlEndPoint}/clientes/regiones/${id}`, {headers: this.agregarAuthorizationHeader()})
  .pipe(
    catchError(e => {
      console.error(e.error.mensaje);
      Swal.fire(
        'Error al buscar clientes por region',
        e.error.mensaje,
        'error'
      )
      return throwError( ()=> e);
    })
  );

}


getRegiones(): Observable<Region[]>{
  return this.http.get<any>(this.urlEndPoint + '/clientes/regiones', {headers: this.agregarAuthorizationHeader()})
  .pipe(
    catchError(e => {
      this.isNoAutorizado(e);
      return throwError( ()=> e);
    })
  );
  
}





}

