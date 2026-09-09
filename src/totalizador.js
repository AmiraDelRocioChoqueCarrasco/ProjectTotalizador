export class Totalizador {
  static TASAS_IMPUESTOS = {
    CA: 0.0825,
    AL: 0.0400,
    NV: 0.0800,
    UT: 0.0665,
    TX: 0.0625,
  };

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

  static calcularDescuentoMonto(precioNeto) {
    if (precioNeto >= 10000) return Math.round(precioNeto * 0.10 * 100) / 100;
    if (precioNeto >= 7000) return Math.round(precioNeto * 0.07 * 100) / 100;
    if (precioNeto >= 3000) return Math.round(precioNeto * 0.05 * 100) / 100;
    if (precioNeto >= 1000) return Math.round(precioNeto * 0.03 * 100) / 100;
    return 0;
  }

  static RANGOS_DESCUENTO = [
    { umbral: 30000, porcentaje: 0.15 },
    { umbral: 10000, porcentaje: 0.10 },
    { umbral: 7000, porcentaje: 0.07 },
    { umbral: 3000, porcentaje: 0.05 },
    { umbral: 1000, porcentaje: 0.03 },
  ];

  static obtenerPorcentajeDescuentoMonto(precioNeto) {
    const rango = this.RANGOS_DESCUENTO.find((r) => precioNeto >= r.umbral);
    return rango ? rango.porcentaje : 0;
  }

  static calcularDescuentoMonto(precioNeto) {
    const tasa = this.obtenerPorcentajeDescuentoMonto(precioNeto);
    return Math.round(precioNeto * tasa * 100) / 100;
  }
}