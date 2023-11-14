import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from '../../clientes/clientes/cliente';
import { ClienteService } from '../../services/cliente.service';
import { Factura } from '../models/factura';
import { FacturasService } from '../../services/facturas.service';

@Component({
  selector: 'app-facturascli',
  templateUrl: './facturascli.component.html',
  styleUrls: ['./facturascli.component.css']
})
export class FacturascliComponent implements OnInit {
  

  public cargando: boolean = true;
  public  clientes : Cliente[] ;
  public paginador: any;
  public cliente: Cliente;
  public nombre: string;
  public apellido: string;
  public facturas: any[] = [];

 
  

  constructor(
    private clienteService: ClienteService,
    private facturasService:FacturasService,
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

    this.activatedRoute.paramMap.subscribe(params => {
      let id:number = +params.get('id');
      if(id){
        this.getClient(id);
      }
    }
    );
  
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


 getClient(id:number):void{
    this.clienteService.getCliente(id).subscribe(
      response => {
        this.cliente = response as Cliente;
        this.nombre = this.cliente.nombre;
        this.apellido = this.cliente.apellido;
        this.facturas = this.cliente.facturas;
        console.log("mi cliente",this.cliente);
      }
      
    );
  
  }



  editar(id:number):void{
  }

  eliminar(id:number):void{

    this.facturasService.delete(id).subscribe(
      response => {
        this.getClient(this.cliente.id);
      }
    );



  }

  deleteFactura(facturaId:number):void{
  }

  ver(id:number):void{

  this.router.navigate(['/facturas',id]);

  


  }






}
   
         


