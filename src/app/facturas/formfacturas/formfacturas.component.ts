import { Component, OnInit } from '@angular/core';
import { Factura } from '../models/factura';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map, flatMap } from 'rxjs';

import { FacturasService } from 'src/app/services/facturas.service';
import { Producto } from '../models/producto';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ItemFactura } from '../models/item-factura';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-formfacturas',
  templateUrl: './formfacturas.component.html',
  styleUrls: ['./formfacturas.component.css'],
 
})
export class FormfacturasComponent implements OnInit {

  public titulo: string = "Crear Factura";
  public errors: string[];
  public factura: Factura = new Factura();

  myControl = new FormControl('');

  filteredOptions: Observable<Producto[]>;

  constructor(
    private facturasService: FacturasService,
    private clienteService: ClienteService,  
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      let clienteid:number = +params.get('clienteid');
      if(clienteid){
        this.clienteService.getCliente(clienteid).subscribe(
          response => {
            this.factura.cliente = response;
            console.log(this.factura);
          });
         }
    });

    // this.filteredOptions = this.myControl.valueChanges.pipe(    
    //    map(value => typeof value === 'string' ? value : value.nombre),
    //   flatMap(value => value ? this._filter(value) : [])
    
 
    // );

    this.filteredOptions = this.myControl.valueChanges.pipe(    
      map((value: { nombre?: string } | string) => typeof value === 'string' ? value : value.nombre),
      flatMap(value => value ? this._filter(value) : [])    
   );

  }

  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
    let producto = event.option.value as Producto;
    console.log(producto);

    let nuevoItem = new ItemFactura();
    nuevoItem.producto = producto;
    this.factura.addItem(nuevoItem);
    this.myControl.setValue('');
    event.option.focus();
    event.option.deselect();    
  }

  displayFn(producto: Producto): string {
    return producto && producto.nombre ? producto.nombre : '';
  }


  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();
    return this.facturasService.filtrarProductos(filterValue);
  }

  actualizarCantidad(id: number, event: any): void {
    let cantidad: number = event.target.value as number;
    if(cantidad == 0){
      return this.eliminarItemFactura(id);
    }

    this.factura.items = this.factura.items.map((item: ItemFactura) => {
      if(id === item.producto.id){
        item.cantidad = +cantidad;
      }
        return item;
    });
  }
  eliminarItemFactura(id: number): void {
    this.factura.items = this.factura.items.filter((item: ItemFactura) => id !== item.producto.id);
    
  }


  onSubmit(){


  }

  guardarFactura(): void {
    console.log(this.factura);
    this.facturasService.create(this.factura).subscribe(
      factura => {
        Swal.fire(
          'Nueva Factura',
          `Factura ${factura.descripcion} creada con éxito!`,
          'success'
        )
        this.router.navigate(['/facturas', factura.id]);
      },
      err => {
        this.errors = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

 

}
