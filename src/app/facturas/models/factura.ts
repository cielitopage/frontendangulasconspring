import { Cliente } from "../../clientes/clientes/cliente";
import { ItemFactura } from "./item-factura";


export class Factura {


    id: number;
    descripcion: string;
    observacion: string;
    tipo: string;
    items: ItemFactura[] = [];
    cliente: Cliente;
    total: number;
    createAt: string;

    calcularGranTotal(): number {
        this.total = 0;
        this.items.forEach((item: ItemFactura) => {
            this.total += item.calcularImporte();
        });
        return this.total;
    }
    
    
    addItem(nuevoItem: ItemFactura) {

        let existeItem = this.items.find((item: ItemFactura) => nuevoItem.producto.id == item.producto.id);
        if(existeItem){
            existeItem.cantidad += nuevoItem.cantidad;
        }else{
            this.items.push(nuevoItem);
        }
    }
}
