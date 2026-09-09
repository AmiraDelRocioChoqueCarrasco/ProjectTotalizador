export class Totalizador {
  static convertirANumero(valor) {
    return Number(valor);
  }
  static calcularPrecioNeto(cantidad, precio) {
    return cantidad * precio;
  }
}