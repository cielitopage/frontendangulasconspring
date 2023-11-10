import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink, NavigationEnd, ActivationEnd } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

import { FormComponent } from '../../clientes/form/form.component';
import { filter, map } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  implements OnInit {





 public titleurl: string = "crear cliente";

  public url: string = "";

  public usuario: string = "";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,  
    private usuarioService: UsuarioService 

    
  ) { }

  ngOnInit(): void {

    this.cargartitleurl();

    }

    cargartitleurl(){
      this.router.events.pipe(
        filter( evento => evento instanceof ActivationEnd),
        filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null),
        map( (evento: ActivationEnd) => evento.snapshot.data)
      ).subscribe( (data: any) => {
        this.titleurl = data.titulo;
        console.log(data.titulo);
      })
    }

  logout(): void{
    let username = this.usuarioService.usuario.username;
    this.usuarioService.logout();
    Swal.fire('Logout',`Hola ${username} has cerrado sesión con éxito!`,'success');
    this.router.navigate(['/login']);
  }

  isAuth(): boolean{
    this.usuario = this.usuarioService.usuario.username;
    return this.usuarioService.isAuthenticated();

  }
  








 

}
