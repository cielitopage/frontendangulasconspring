import { Component, OnInit } from '@angular/core';
import { Cliente } from '../clientes/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Region } from '../clientes/region';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent  implements OnInit {

  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear Cliente";
  public errors: string[];
  title = 'cliendddddtes-app';
  public regiones: Region[];

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute

  ) { }

  ngOnInit(): void {

    this.cargarCliente();

    this.getRegiones();
    
  }

  // pasar valor al navbar

  getRegiones(){
    this.clienteService.getRegiones()
    .subscribe(
      regiones => this.regiones = regiones
      );
    console.log("reg",this.regiones);

  }



  public cargarCliente(): void{
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id']
        if(id){
          this.clienteService.getCliente(id).subscribe(
            (cliente) => this.cliente = cliente
          )
          console.log("cliennnnnte",this.cliente);
        }
      }
    )
  }



  public onSubmit(): void{
    console.log(this.cliente);

    if(this.cliente.id){
      this.clienteService.update(this.cliente).subscribe(
        response => {
          this.router.navigate(['/clientes']);
          Swal.fire(
            'Cliente Actualizado!',
            `Cliente ${response.nombre} actualizado con exito`,
            'success'
          )},
        err => {
          this.errors = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      ) 
    }
    else{
      this.clienteService.create(this.cliente).subscribe(
        response => {
          this.router.navigate(['/clientes']);
          Swal.fire(
            'Nuevo Cliente!',
            `Cliente ${response.nombre} creado con exito`,
            'success'
          )},
        err => {
          this.errors = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }

      );
    }

  }


  public compareRegion(o1: Region, o2: Region): boolean{
    if(o1 === undefined && o2 === undefined){
      return true;
    }
    return o1 == null || o2 == null? false: o1.id === o2.id;
  }


}


      












