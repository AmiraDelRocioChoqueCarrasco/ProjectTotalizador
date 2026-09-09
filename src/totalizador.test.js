import { Totalizador } from "./totalizador.js";

describe("Ciclo 1: Neto y Entrada", () => {
  it("deberia parsear un string numerico a un tipo number", () => {
    expect(Totalizador.convertirANumero("20")).toBe(20);
    expect(Totalizador.convertirANumero("3.5")).toBe(3.5);
  });
});