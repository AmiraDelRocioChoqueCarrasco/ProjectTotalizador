import { Totalizador } from "./totalizador.js";

const form = document.querySelector("#totalizador-form");
const cantidadInput = document.querySelector("#cantidad");
const precioInput = document.querySelector("#precio");
const estadoSelect = document.querySelector("#estado");
const btnCancelar = document.querySelector("#btn-cancelar");
const resultadoDiv = document.querySelector("#resultado-div");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  try {
    const cantidad = Totalizador.validarCantidad(cantidadInput.value);
    const precio = Totalizador.validarPrecio(precioInput.value);
    const estado = Totalizador.obtenerEstado(estadoSelect.value);

    const neto = Totalizador.calcularPrecioNeto(cantidad, precio);
    const impuesto = Totalizador.calcularImpuestoEstado(neto, estado);
    const pctDescuento = Totalizador.obtenerPorcentajeDescuentoMonto(neto);
    const montoDescuento = Totalizador.calcularDescuentoMonto(neto);

    resultadoDiv.innerHTML = `
      <p>Precio neto (${cantidad} * $${precio.toFixed(2)}): $${neto.toFixed(2)}</p>
      <p>Impuesto para ${estado}: $${impuesto.toFixed(2)}</p>
    `;
  } catch (error) {
    resultadoDiv.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
  }
});

btnCancelar.addEventListener("click", () => {
  form.reset();
  resultadoDiv.innerHTML = "";
});