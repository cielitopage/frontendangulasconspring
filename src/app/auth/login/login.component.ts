import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { 

  public titulo: string = 'Por favor Sign In!';
  public errors: string[];
  public username: string;
  public password: string;
  public usuario: Usuario;

  constructor(  
  
    private router: Router,
    private usuarioService: UsuarioService
  ) {
    this.usuario = new Usuario();
   }


  ngOnInit(): void {

    if(this.usuarioService.isAuthenticated()){
      Swal.fire('Login',`Hola ${this.usuarioService.usuario.username} ya estás autenticado!`,'info');
      this.router.navigate(['/clientes']);
    }
    
  }



  onSubmit () : void {
    console.log(this.usuario);
    if(this.usuario.username == null || this.usuario.password == null){
      Swal.fire('Error Login','Username o password vacías!','error');
      return;
    }

    this.usuarioService.login(this.usuario).subscribe(
      response => {
        console.log(response);
         this.usuarioService.guardarUsuario(response.access_token);
         this.usuarioService.guardarToken(response.access_token);
        let usuario = this.usuarioService.usuario;
        this.router.navigate(['/clientes']);
        Swal.fire('Login',`Hola ${usuario.nombre}, has iniciado sesión con éxito!`,'success');
      },
      err => {
        if(err.status == 400){
          Swal.fire('Error Login','Usuario o clave incorrectas!','error');
        }
      }
    );

    this.router.navigate(['/clientes']);
    Swal.fire('Login',`Hola ${this.usuario.username}, has iniciado sesión con éxito!`,'success');
  }



}
