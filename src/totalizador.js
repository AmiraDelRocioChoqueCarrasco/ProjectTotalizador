export class Totalizador {
  ///ciclo 1
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

  static calcularPrecioNeto(cantidad, precio) {
    return Math.round(cantidad * precio * 100) / 100;
  }

  ///ciclo 2
  static obtenerEstado(estado) {
    return estado ? estado.toUpperCase() : "CA";
  }
  
  static calcularImpuestoEstado(precioNeto, estado) {
    const est = this.obtenerEstado(estado);
    if (est === "CA") {
      return Math.round(precioNeto * 0.0825 * 100) / 100;
    }
    return 0;
  }
}