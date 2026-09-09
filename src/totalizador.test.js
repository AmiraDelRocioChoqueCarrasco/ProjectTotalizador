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

describe("Ciclo 3: Descuentos Escalonados por Monto Neto", () => {
  it("debería retornar 0 de descuento si el monto neto es menor a $1,000", () => {
    expect(Totalizador.calcularDescuentoMonto(500)).toBe(0);
  });

  it("debería aplicar un 3% de descuento cuando el monto neto alcanza los $1,000", () => {
    expect(Totalizador.calcularDescuentoMonto(1000)).toBe(30);
  });

  it("debería aplicar un 5% de descuento cuando el monto neto alcanza los $3,000", () => {
    expect(Totalizador.calcularDescuentoMonto(3000)).toBe(150);
  });

  it("debería aplicar un 7% de descuento cuando el monto neto alcanza los $7,000", () => {
    expect(Totalizador.calcularDescuentoMonto(7000)).toBe(490);
  });

  it("debería aplicar un 10% de descuento cuando el monto neto alcanza los $10,000", () => {
    expect(Totalizador.calcularDescuentoMonto(10000)).toBe(1000);
  });

  it("debería aplicar un 15% de descuento cuando el monto neto alcanza los $30,000", () => {
    expect(Totalizador.calcularDescuentoMonto(30000)).toBe(4500);
  });
});

describe("Ciclo 4: Categorías de Producto (Impuestos y Descuentos)", () => {
  it("debería retornar 'Varios' como categoría por defecto si no se especifica", () => {
    expect(Totalizador.obtenerCategoria("")).toBe("Varios");
    expect(Totalizador.obtenerCategoria(null)).toBe("Varios");
  });

  it("debería obtener las tasas correctas de impuesto y descuento por categoría", () => {
    expect(Totalizador.obtenerDescuentoCategoria("Alimentos")).toBe(0.02);
    expect(Totalizador.obtenerImpuestoCategoria("Bebidas alcohólicas")).toBe(0.07);
    expect(Totalizador.obtenerDescuentoCategoria("Material de escritorio")).toBe(0.015);
    expect(Totalizador.obtenerImpuestoCategoria("Muebles")).toBe(0.03);
    expect(Totalizador.obtenerImpuestoCategoria("Electrónicos")).toBe(0.04);
    expect(Totalizador.obtenerDescuentoCategoria("Electrónicos")).toBe(0.01);
    expect(Totalizador.obtenerImpuestoCategoria("Vestimenta")).toBe(0.02);
  });
});

describe("Ciclo 5: Peso Volumétrico y Envío", () => {
  it("debería lanzar error si el peso volumétrico está vacío o es menor a cero", () => {
    expect(() => Totalizador.validarPeso("")).toThrow("Ingresa un peso volumétrico válido (mayor o igual a 0)");
    expect(() => Totalizador.validarPeso(-3)).toThrow("Ingresa un peso volumétrico válido (mayor o igual a 0)");
    expect(Totalizador.validarPeso(0)).toBe(0);
  });

  it("debería obtener la tarifa de envío unitaria correcta según el rango de peso volumétrico", () => {
    expect(Totalizador.obtenerTarifaEnvioUnitaria(5)).toBe(0);
    expect(Totalizador.obtenerTarifaEnvioUnitaria(15)).toBe(3.5);
    expect(Totalizador.obtenerTarifaEnvioUnitaria(30)).toBe(5);
    expect(Totalizador.obtenerTarifaEnvioUnitaria(50)).toBe(6);
    expect(Totalizador.obtenerTarifaEnvioUnitaria(90)).toBe(6.5);
    expect(Totalizador.obtenerTarifaEnvioUnitaria(150)).toBe(8);
    expect(Totalizador.obtenerTarifaEnvioUnitaria(250)).toBe(9);
  });

  it("debería calcular el costo total de envío multiplicando la tarifa unitaria por la cantidad", () => {
    expect(Totalizador.calcularCostoEnvio(15, 10)).toBe(35);
  });
});

describe ("Ciclo 6: Tipo de Cliente y Fijos", () => {
  it("debería retornar 'Normal' como tipo de cliente por defecto si no se especifica", () => {
    expect(Totalizador.obtenerTipoCliente("")).toBe("Normal");
    expect(Totalizador.obtenerTipoCliente(null)).toBe("Normal");
  });

  it("debería retornar 0.5% de descuento para cliente Recurrente", () => {
    expect(Totalizador.obtenerDescuentoCliente("Recurrente")).toBe(0.005);
  });

  it("debería retornar 1% de descuento para cliente Frecuente", () => {
    expect(Totalizador.obtenerDescuentoCliente("Frecuente")).toBe(0.01);
  });

  it("debería retornar 1.5% de descuento para cliente Especial", () => {
    expect(Totalizador.obtenerDescuentoCliente("Especial")).toBe(0.015);
  });

  it("debería calcular el monto de descuento por tipo de cliente sobre el precio neto", () => {
    expect(Totalizador.calcularDescuentoCliente(1000, "Especial")).toBe(15);
  });

  it("debería calcular el Total Final considerando netos, descuentos, impuestos y envío", () => {
    // Ejemplo: Neto = 1000, CA (8.25%), Alimentos (2% desc), Especial (1.5% desc), Peso 15 (Tarifa 3.5), Cantidad 1
    // Neto: 1000
    // Desc Monto (3%): 30
    // Desc Categoria (2%): 20
    // Desc Cliente (1.5%): 15
    // Imp Estado (8.25%): 82.5
    // Imp Categoria (0%): 0
    // Envio (3.5 * 1): 3.5
    // Total = 1000 - 30 - 20 - 15 + 82.5 + 0 + 3.5 = 1021
    const total = Totalizador.calcularTotalFinal({
      neto: 1000,
      descMonto: 30,
      descCat: 20,
      descCliente: 15,
      impEstado: 82.5,
      impCat: 0,
      costoEnvio: 3.5
    });
    expect(total).toBe(1021);
  });

  it("debería calcular el descuento por cliente sobre el precio neto", () => {
  expect(Totalizador.calcularDescuentoCliente(2000, "Especial")).toBe(30);
});
});

describe ("Ciclo 7: Reglas Especiales y Promociones de Envío", () => {
    it("debería retornar envío 0 si el monto neto >= 3000 o si el cliente es Especial", () => {
    expect(Totalizador.esEnvioGratis(3000, "Normal")).toBe(true);
    expect(Totalizador.esEnvioGratis(500, "Especial")).toBe(true);
    expect(Totalizador.esEnvioGratis(500, "Normal")).toBe(false);
    });
});
