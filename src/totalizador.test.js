import { Totalizador } from "./totalizador.js";

describe("Ciclo 1: Neto y Entrada", () => {
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
});