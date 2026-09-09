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

describe("Ciclo 2: Impuestos por Estado y Selección por Defecto", () => {
  it("debería retornar CA como estado por defecto si el valor ingresado es vacío o nulo", () => {
    expect(Totalizador.obtenerEstado("")).toBe("CA");
    expect(Totalizador.obtenerEstado(null)).toBe("CA");
  });

  it("debería calcular el impuesto para California (8.25%) sobre un precio neto", () => {
    expect(Totalizador.calcularImpuestoEstado(100, "CA")).toBe(8.25);
  });

  it("debería calcular el impuesto para Alabama (4.00%) sobre un precio neto", () => {
    expect(Totalizador.calcularImpuestoEstado(100, "AL")).toBe(4.00);
  });

  it("debería calcular el impuesto para Nevada (8.00%) sobre un precio neto", () => {
    expect(Totalizador.calcularImpuestoEstado(100, "NV")).toBe(8.00);
  });

  it("debería calcular el impuesto para Utah (6.65%) sobre un precio neto", () => {
    expect(Totalizador.calcularImpuestoEstado(100, "UT")).toBe(6.65);
  });

  it("debería calcular el impuesto para Texas (6.25%) sobre un precio neto", () => {
    expect(Totalizador.calcularImpuestoEstado(100, "TX")).toBe(6.25);
  });

  it("debería lanzar un error si se ingresa un código de estado no válido", () => {
    expect(() => Totalizador.calcularImpuestoEstado(100, "NY")).toThrow("Estado inválido seleccionado");
    expect(() => Totalizador.calcularImpuestoEstado(100, "XYZ")).toThrow("Estado inválido seleccionado");
  });
});

describe("Ciclo 3: Descuentos por Monto", () => {
    it("debería retornar 0 de descuento si el monto neto es menor a $1,000", () => {
    expect(Totalizador.calcularDescuentoMonto(500)).toBe(0);
  });
});