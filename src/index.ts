const IVA = 0.12;
export const newUID = (): string => Math.random().toString(36).slice(2);

interface IProducto{
    codigo:String;
    nombre:String;
    precio:number;
}

export interface IProductoFactura extends IProducto{
    cantidad:number;
    precioTotal:number;
}

export class Factura {
    constructor(public num_factura:String, 
        public fecha:String, 
        public nombre_des:String='Usuario final', 
        public productos:IProductoFactura[]=[], 
        public total:number = 0,
        public subtotal:number = 0,
        public c_items:number = 0) {}
    
    public agregarProductos(producto:IProductoFactura): void{
        let bandera:boolean = true;
        if(this.productos.length > 0){
            for (let i = 0; i < this.productos.length; i++) {
                if (this.productos[i].nombre == producto.nombre) {
                    this.productos[i].cantidad +=producto.cantidad;
                    this.productos[i].precioTotal = this.productos[i].cantidad * this.productos[i].precio;
                    bandera = false;
                }                
            }
        }
        if (bandera) {
            producto.precioTotal = producto.precio * producto.cantidad;
            this.productos?.push(producto);
        }
        console.log(`Producto agregado: ${producto.nombre} - Cantidad: ${producto.cantidad}`);
    }

    public mostrarFactura(): void{
        let iva_sub = 0;
        console.log('----------------------------------------------------------------');
        console.log(`#Factura: ${this.num_factura}                          Fecha: ${this.fecha}`);
        console.log(`Nombre: ${this.nombre_des}`);
        console.log(' ');
        console.log('Cantidad           Descripcion         Precio Unitario     Valor');
        this.productos.forEach(product => {
            this.c_items+=product.cantidad;
            this.subtotal += product.precioTotal;
            console.log(`${product.cantidad}                ${product.nombre}                      ${product.precio}           ${product.precioTotal}`);
        });
        this.subtotal = Math.round((this.subtotal + Number.EPSILON) * 100) / 100; 
        iva_sub = Math.round(((IVA*this.subtotal) + Number.EPSILON) * 100) / 100;
        this.total = Math.round(((iva_sub + this.subtotal) + Number.EPSILON) * 100) / 100;
        console.log('-------                                         ----------------');
        console.log(`${this.c_items}                                              SubTotal: ${this.subtotal}`);
        console.log(`                                                IVA:      ${iva_sub}`);
        console.log(`                                                Total:    ${this.total}`);
        console.log(' ');
        console.log('                    Gracias por su compra');
        console.log('                       Vuelva pronto!!');
    }
    
}

let fac = new Factura("0010010001","09-06-2022","Marco Aseicha");
const p1:IProductoFactura ={
    codigo: newUID(),
    nombre: "Leche",
    precio: 0.90,
    cantidad: 2,
    precioTotal:0
}
const p2:IProductoFactura ={
    codigo: newUID(),
    nombre: "Queso",
    precio: 1.20,
    cantidad: 5,
    precioTotal:0
} 
const p3:IProductoFactura ={
    codigo: newUID(),
    nombre: "Leche",
    precio: 0.90,
    cantidad: 5,
    precioTotal:0
} 
const p4:IProductoFactura ={
    codigo: newUID(),
    nombre: "Arroz",
    precio: 0.50,
    cantidad: 8,
    precioTotal:0
} 
fac.agregarProductos(p1);
fac.agregarProductos(p2);
fac.agregarProductos(p3);
fac.agregarProductos(p4);
fac.mostrarFactura();