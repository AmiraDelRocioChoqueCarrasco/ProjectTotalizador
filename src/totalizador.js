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

  static REGLAS_CATEGORIA = {
    Varios: { impuesto: 0, descuento: 0 },
    Alimentos: { impuesto: 0, descuento: 0.02 },
    "Bebidas alcohólicas": { impuesto: 0.07, descuento: 0 },
    "Material de escritorio": { impuesto: 0, descuento: 0.015 },
    Muebles: { impuesto: 0.03, descuento: 0 },
    Electrónicos: { impuesto: 0.04, descuento: 0.01 },
    Vestimenta: { impuesto: 0.02, descuento: 0 },
  };

  static TARIFAS_ENVIO = [
    { max: 10, tarifa: 0 },
    { max: 20, tarifa: 3.5 },
    { max: 40, tarifa: 5 },
    { max: 80, tarifa: 6 },
    { max: 100, tarifa: 6.5 },
    { max: 200, tarifa: 8 },
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

  static validarPeso(valor) {
    const peso = this.convertirANumero(valor);
    if (valor === "" || valor === null || isNaN(peso) || peso < 0) {
      throw new Error("Ingresa un peso volumétrico válido (mayor o igual a 0)");
    }
    return peso;
  }

  static obtenerEstado(estado) {
    return estado ? estado.toUpperCase() : "CA";
  }

  static obtenerCategoria(categoria) {
    return categoria ? categoria : "Varios";
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

  static obtenerImpuestoCategoria(categoria) {
    const cat = this.obtenerCategoria(categoria);
    const regla = this.REGLAS_CATEGORIA[cat];
    return regla ? regla.impuesto : 0;
  }

  static obtenerDescuentoCategoria(categoria) {
    const cat = this.obtenerCategoria(categoria);
    const regla = this.REGLAS_CATEGORIA[cat];
    return regla ? regla.descuento : 0;
  }

  static calcularDescuentoCategoria(precioNeto, categoria) {
    const tasa = this.obtenerDescuentoCategoria(categoria);
    return Math.round(precioNeto * tasa * 100) / 100;
  }

  static calcularImpuestoCategoria(precioNeto, categoria) {
    const tasa = this.obtenerImpuestoCategoria(categoria);
    return Math.round(precioNeto * tasa * 100) / 100;
  }

  static obtenerTarifaEnvioUnitaria(peso) {
    const rango = this.TARIFAS_ENVIO.find((r) => peso <= r.max);
    return rango ? rango.tarifa : 9;
  }

  static calcularCostoEnvio(peso, cantidad) {
    const tarifaUnitaria = this.obtenerTarifaEnvioUnitaria(peso);
    return Math.round(tarifaUnitaria * cantidad * 100) / 100;
  }

  static obtenerTipoCliente(tipo) {
    return tipo ? tipo : "Normal";
  }

  static obtenerDescuentoCliente(tipo) {
    const cliente = this.obtenerTipoCliente(tipo);
    if (cliente === "Recurrente") return 0.005;
    return 0;
  }
  
  static obtenerDescuentoCliente(tipo) {
    const cliente = this.obtenerTipoCliente(tipo);
    if (cliente === "Recurrente") return 0.005;
    if (cliente === "Frecuente") return 0.01;
    return 0;
  }
}