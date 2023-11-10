
import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FacturasService } from '../../services/facturas.service';
import { Factura } from '../models/factura';

@Component({
  selector: 'app-facturasdetail',
  templateUrl: './facturasdetail.component.html',
  styleUrls: ['./facturasdetail.component.css']
})
export class FacturasdetailComponent implements OnInit {
  public cargando: boolean = true;
  public facturas: any;

  

  constructor(
  
    private facturasService: FacturasService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    
  ) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      let id:number = +params.get('id');
      console.log(id);
      if(id){
        this.getFacturas(id);
        this.cargando = false;
      }
    }
    );
  }


  getFacturas(id:number):void{
    this.facturasService.getFacturas(id).subscribe(
      response => {
        this.facturas = response;
        console.log(this.facturas);

      }


     
    );
    
  }







}
