import { Producto } from "./producto";





export class ItemFactura {

    id: number;
    producto:Producto;
    cantidad: number = 1;
    importe: number = 0;    

    public calcularImporte(): number {
        return this.cantidad * this.producto.precio;
    }

    

}

