export class Totalizador {
  static TASAS_IMPUESTOS = {
    CA: 0.0825,
    AL: 0.0400,
    NV: 0.0800,
    UT: 0.0665,
    TX: 0.0625,
  };

  static RANGOS_DESCUENTO = [
    { umbral: 30000, porcentaje: 0.15 },
    { umbral: 10000, porcentaje: 0.10 },
    { umbral: 7000, porcentaje: 0.07 },
    { umbral: 3000, porcentaje: 0.05 },
    { umbral: 1000, porcentaje: 0.03 },
  ];

  static convertirANumero(valor) {
    return Number(valor);
  }

  static validarCantidad(valor) {
    const cantidad = this.convertirANumero(valor);
    if (!valor || isNaN(cantidad) || cantidad <= 0) {
      throw new Error("Ingresa una cantidad válida mayor a cero");
    }
    return cantidad;
  }

  static validarPrecio(valor) {
    const precio = this.convertirANumero(valor);
    if (!valor || isNaN(precio) || precio <= 0) {
      throw new Error("Ingresa un precio válido mayor a cero");
    }
    return precio;
  }

  static obtenerEstado(estado) {
    return estado ? estado.toUpperCase() : "CA";
  }

  static calcularPrecioNeto(cantidad, precio) {
    return Math.round(cantidad * precio * 100) / 100;
  }

  static calcularImpuestoEstado(precioNeto, estado) {
    const est = this.obtenerEstado(estado);
    const tasa = this.TASAS_IMPUESTOS[est];
    if (tasa === undefined) {
      throw new Error("Estado inválido seleccionado");
    }
    return Math.round(precioNeto * tasa * 100) / 100;
  }

  static obtenerPorcentajeDescuentoMonto(precioNeto) {
    const rango = this.RANGOS_DESCUENTO.find((r) => precioNeto >= r.umbral);
    return rango ? rango.porcentaje : 0;
  }

  static calcularDescuentoMonto(precioNeto) {
    const tasa = this.obtenerPorcentajeDescuentoMonto(precioNeto);
    return Math.round(precioNeto * tasa * 100) / 100;
  }

  ////ciclo 4
  static obtenerCategoria(categoria) {
    return categoria ? categoria : "Varios";
  }

  static obtenerDescuentoCategoria(categoria) {
    const cat = this.obtenerCategoria(categoria);
    if (cat === "Alimentos") return 0.02;
    return 0;
  }
}