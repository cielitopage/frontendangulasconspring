import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../auth/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private _usuario: Usuario;
  private _token: string;

  public get usuario(): Usuario {
    if(this._usuario != null){
      return this._usuario;
    } else if(this._usuario == null && localStorage.getItem('usuario') != null){
      this._usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  public get token(): string {
    if(this._token != null){
      return this._token;
    } else if(this._token == null && localStorage.getItem('token') != null){
      this._token = localStorage.getItem('token');
      return this._token;
    }
    return null;
  }





  constructor(
    private http: HttpClient,
    private router: Router
  ) { }


  login(usuario: Usuario): Observable<any> {
    const urlEndPoint = 'http://localhost:8080/oauth/token';
    const credenciales = btoa('appangular' + ':' + '12345');

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });

    let params = new URLSearchParams();
  
    params.set('username', usuario.username);
    params.set('password', usuario.password);
    params.set('grant_type', 'password');
    console.log(params.toString());

    return this.http.post<any>(urlEndPoint, params.toString(), { headers: httpHeaders })
      .pipe(tap((response: any) => {
        console.log("responde",response.access_token.split(".")[1]);
        let payload = JSON.parse(atob(response.access_token.split(".")[1]));
        console.log("payload",payload);
        let usuario = new Usuario();
        usuario.nombre = payload.nombre;
        usuario.apellido = payload.apellido;
        usuario.email = payload.email;
        usuario.username = payload.user_name;
        usuario.roles = payload.authorities;



        console.log("usuarri",usuario);
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('usuario', JSON.stringify(usuario));
      }));
  }

  guardarUsuario(accessToken: string): void {
    let payload = this.obtenerDatosToken(accessToken);
    this._usuario = new Usuario();
    this._usuario.nombre = payload.nombre;
    this._usuario.apellido = payload.apellido;
    this._usuario.email = payload.email;
    this._usuario.username = payload.user_name;
    this._usuario.roles = payload.authorities;

    localStorage.setItem('usuario', JSON.stringify(this._usuario));
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    localStorage.setItem('token', accessToken);
    sessionStorage.setItem('token', accessToken);
  }

  obtenerDatosToken(accessToken: string): any {
    if(accessToken != null){
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    let payload = this.obtenerDatosToken(this.token);
    if(payload != null && payload.user_name && payload.user_name.length > 0){
      return true;
    }
    return false;
  }

  hasRole(role: string): boolean {
    if(this.usuario.roles.includes(role)){
      return true;
    }
    return false;
  }

  logout(): void {
    this._token = null;
    this._usuario = null;
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  isTokenExpirado(): boolean {
    let payload = this.obtenerDatosToken(this.token);
    let now = new Date().getTime() / 1000;

    if(payload.exp < now){
      return true;
    }
    return false;
  }
  



}
