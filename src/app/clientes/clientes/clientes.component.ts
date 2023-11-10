import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'] 
  
})

export class ClientesComponent  implements OnInit {

  public cargando: boolean = true;
  public  clientes : Cliente[] ;
  public paginador: any;
 
  

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    
  ) { }



  ngOnInit() {
    this.activatedRoute.paramMap.subscribe( params => {
      let page: number = +params.get('page');
      if(!page){
        page = 0;
      }
      this.getClientes(page);
    });   
  
  }

  

  getClientes(page: number): void{
    this.clienteService.getClientes(page)
    .subscribe(
      response => {
        this.clientes = response.content as Cliente[];
        this.paginador = response;

        this.cargando = false;
      }
    );
  }
  

  eliminar(id: number){
    console.log(id);
    this.clienteService.delete(id).subscribe(
      response => {
        console.log(response);
        Swal.fire(
          'Eliminado!',
          'El cliente ha sido eliminado.',
          'success'
        )
        this.getClientes(0);
      }
    )
  }



  editar(id: number){
    this.router.navigate(['/clientes/form', id]);
  }

  crear(){
    this.router.navigate(['/clientes/form']);
  }

  detalle(id: number){
    this.router.navigate(['/clientes/ver', id]);

  }

  FacturaCliente(id: number){
    this.router.navigate(['/facturas/ver', id]);
  }




 

  



}
