import { Component, OnInit } from '@angular/core';
import { Cliente } from '../clientes/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  public cliente:Cliente ;
  public progreso: number = 0;
  private fotoSeleccionada: File;

  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id:number = +params.get('id');
      if(id){
        this.getCliente(id);
      }
    });
  }


  public getCliente(id:number):void{
    this.clienteService.getCliente(id).subscribe(
      cliente => this.cliente = cliente
    );
    console.log("cliente",this.cliente);
  };


 public  onFileSelected(event){

  


    this.fotoSeleccionada = event.target.files[0];
    console.log(this.fotoSeleccionada);
    if(this.fotoSeleccionada.type.indexOf('image') < 0){
      Swal.fire('Error Upload: ', `El archivo debe ser del tipo imagen`, 'error');
      return;
    }
    
  }

  public onUpload():void{
    console.log(this.fotoSeleccionada);

    if(this.fotoSeleccionada == null){
      Swal.fire('Error Upload: ', `Debe seleccionar una foto`, 'error');
      return;
    }

  


    this.clienteService.uploadFoto(this.fotoSeleccionada, this.cliente.id)
    .subscribe( cliente => {
      this.cliente = cliente;

      // barra de progreso en swal
      Swal.fire(
        'La foto se ha subido completamente!',
        `La foto de ${this.cliente.nombre} se ha subido con éxito `,
        'success'
      )
    
    



      return this.router.navigate(['/clientes']);
    });
  }


}







