import { newUID, IProductoFactura,Factura } from './index';

describe("Pruebas al index de la aplicación", () => {
    test('Comprobar longitud de carecters de la funcion random', () => {
      let longitud:number;
      const contains: number[] = [10,11,12];
      
      longitud = newUID().length;
      
      expect(contains).toContain(longitud);
    });

    test('Comprobar creacion de un producto',() => {
      let fac = new Factura("0010010001","09-06-2022","Marco Aseicha");
      const longitud = 1;
      const p4:IProductoFactura ={
        codigo: newUID(),
        nombre: "Arroz",
        precio: 0.50,
        cantidad: 8,
        precioTotal:0
      }
      fac.agregarProductos(p4);

      expect(fac.productos).toHaveLength(longitud);
    });

    test('Comprobar cantidad[10] y precioTotal[5] de un producto Arroz existente',() => {
      const cantidad = 10;
      const precio = 5;
      const p4:IProductoFactura ={
        codigo: newUID(),
        nombre: "Arroz",
        precio: 0.50,
        cantidad: 5,
        precioTotal:0
      }
      const p5:IProductoFactura ={
        codigo: newUID(),
        nombre: "Azucar",
        precio: 2.40,
        cantidad: 8,
        precioTotal:0
      }
      let fac = new Factura("0010010001","09-06-2022");

      fac.agregarProductos(p5);
      fac.agregarProductos(p4);
      fac.agregarProductos(p4);
      
      expect(fac.productos[1].cantidad).toBe(cantidad);
      expect(fac.productos[1].precioTotal).toBe(precio);
    });

    test('Comprobar subtotal[24.2], total[27.10], cantidadItems[18]',() => {
      const items = 18;
      const subtotal = 24.2;
      const total = 27.10;
      const p4:IProductoFactura ={
        codigo: newUID(),
        nombre: "Arroz",
        precio: 0.50,
        cantidad: 5,
        precioTotal:0
      }
      const p5:IProductoFactura ={
        codigo: newUID(),
        nombre: "Azucar",
        precio: 2.40,
        cantidad: 8,
        precioTotal:0
      }
      let fac = new Factura("0010010001","09-06-2022");

      fac.agregarProductos(p5);
      fac.agregarProductos(p4);
      fac.agregarProductos(p4);
      fac.mostrarFactura();

      expect(fac.total).toBe(total);
      expect(fac.subtotal).toBe(subtotal);
      expect(fac.c_items).toBe(items);
    });
})