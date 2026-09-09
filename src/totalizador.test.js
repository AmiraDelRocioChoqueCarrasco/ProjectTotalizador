import { Totalizador } from "./totalizador.js";

describe("Ciclo 1: Entradas, Precio Neto y Validaciones", () => {
  it("deberia parsear un string numerico a un tipo number", () => {
    expect(Totalizador.convertirANumero("20")).toBe(20);
    expect(Totalizador.convertirANumero("3.5")).toBe(3.5);
  });

  it("deberia calcular el precio neto multiplicando cantidad por precio (enteros)", () => {
    expect(Totalizador.calcularPrecioNeto(20, 3)).toBe(60);
  });

  it("deberia calcular el precio neto con precision de dos decimales", () => {
    expect(Totalizador.calcularPrecioNeto(2.5, 3.5)).toBe(8.75);
  });

  it("deberia lanzar error si la cantidad es vacia, cero o negativa", () => {
    expect(() => Totalizador.validarCantidad("")).toThrow("Ingresa una cantidad válida mayor a cero");
    expect(() => Totalizador.validarCantidad(0)).toThrow("Ingresa una cantidad válida mayor a cero");
    expect(() => Totalizador.validarCantidad(-5)).toThrow("Ingresa una cantidad válida mayor a cero");
  });

  it("deberia lanzar error si el precio es vacio, cero o negativo", () => {
    expect(() => Totalizador.validarPrecio("")).toThrow("Ingresa un precio válido mayor a cero");
    expect(() => Totalizador.validarPrecio(0)).toThrow("Ingresa un precio válido mayor a cero");
    expect(() => Totalizador.validarPrecio(-10)).toThrow("Ingresa un precio válido mayor a cero");
  });
});
describe("Ciclo 2: Impuestos por Estado", () => {
it("debería retornar CA como estado por defecto si el valor ingresado es vacío o nulo", () => {
    expect(Totalizador.obtenerEstado("")).toBe("CA");
    expect(Totalizador.obtenerEstado(null)).toBe("CA");
  });

});