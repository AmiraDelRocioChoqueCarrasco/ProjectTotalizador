export class Totalizador {
  static convertirANumero(valor) {
    return Number(valor);
  }

  static calcularPrecioNeto(cantidad, precio) {
    return Math.round(cantidad * precio * 100) / 100;
  }
}