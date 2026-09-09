import { Totalizador } from "./totalizador.js";

const form = document.querySelector("#totalizador-form");
const cantidadInput = document.querySelector("#cantidad");
const precioInput = document.querySelector("#precio");
const pesoInput = document.querySelector("#peso");
const estadoSelect = document.querySelector("#estado");
const categoriaSelect = document.querySelector("#categoria");
const btnCancelar = document.querySelector("#btn-cancelar");
const resultadoDiv = document.querySelector("#resultado-div");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  try {
    const cantidad = Totalizador.validarCantidad(cantidadInput.value);
    const precio = Totalizador.validarPrecio(precioInput.value);
    const peso = Totalizador.validarPeso(pesoInput.value);
    const estado = Totalizador.obtenerEstado(estadoSelect.value);
    const categoria = Totalizador.obtenerCategoria(categoriaSelect.value);

    const neto = Totalizador.calcularPrecioNeto(cantidad, precio);
    const pctDescuentoMonto = Totalizador.obtenerPorcentajeDescuentoMonto(neto);
    const descMonto = Totalizador.calcularDescuentoMonto(neto);
    const descCat = Totalizador.calcularDescuentoCategoria(neto, categoria);
    
    const impEstado = Totalizador.calcularImpuestoEstado(neto, estado);
    const impCat = Totalizador.calcularImpuestoCategoria(neto, categoria);
    
    const costoEnvio = Totalizador.calcularCostoEnvio(peso, cantidad);

    resultadoDiv.innerHTML = `
      <p>Precio neto (${cantidad} * $${precio.toFixed(2)}): $${neto.toFixed(2)}</p>
      <p>Descuento por monto (${(pctDescuentoMonto * 100)}%): -$${descMonto.toFixed(2)}</p>
      <p>Descuento categoría (${categoria}): -$${descCat.toFixed(2)}</p>
      <p>Impuesto de estado (${estado}): $${impEstado.toFixed(2)}</p>
      <p>Impuesto categoría (${categoria}): $${impCat.toFixed(2)}</p>
      <p>Costo de envío (Peso: ${peso}): $${costoEnvio.toFixed(2)}</p>
    `;
  } catch (error) {
    resultadoDiv.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
  }
});

btnCancelar.addEventListener("click", () => {
  form.reset();
  resultadoDiv.innerHTML = "";
});