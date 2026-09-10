import { Totalizador } from "./totalizador.js";

const form = document.querySelector("#totalizador-form");
const cantidadInput = document.querySelector("#cantidad");
const precioInput = document.querySelector("#precio");
const pesoInput = document.querySelector("#peso");
const estadoSelect = document.querySelector("#estado");
const categoriaSelect = document.querySelector("#categoria");
const clienteSelect = document.querySelector("#cliente");
const btnCancelar = document.querySelector("#btn-cancelar");
const resultadoDiv = document.querySelector("#resultado-div");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  try {
    const liquidacion = Totalizador.generarLiquidacion({
      cantidad: cantidadInput.value,
      precio: precioInput.value,
      peso: pesoInput.value,
      estado: estadoSelect.value,
      categoria: categoriaSelect.value,
      cliente: clienteSelect.value,
    });

    const pctDescuentoMonto = Totalizador.obtenerPorcentajeDescuentoMonto(liquidacion.neto);

    resultadoDiv.innerHTML = `
      <p>Precio neto: $${liquidacion.neto.toFixed(2)}</p>
      <p>Descuento por monto (${pctDescuentoMonto * 100}%): -$${liquidacion.descMonto.toFixed(2)}</p>
      <p>Descuento categoría (${liquidacion.cat}): -$${liquidacion.descCat.toFixed(2)}</p>
      <p>Descuento tipo cliente (${liquidacion.cli}): -$${liquidacion.descCliente.toFixed(2)}</p>
      <p>Impuesto de estado (${liquidacion.est}): $${liquidacion.impEstado.toFixed(2)}</p>
      <p>Impuesto categoría (${liquidacion.cat}): $${liquidacion.impCat.toFixed(2)}</p>
      <p>Costo de envío ajustado: $${liquidacion.costoEnvio.toFixed(2)}</p>
      <hr>
      <h3>Total Final: $${liquidacion.total.toFixed(2)}</h3>
    `;
  } catch (error) {
    resultadoDiv.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
  }
});

btnCancelar.addEventListener("click", () => {
  form.reset();
  resultadoDiv.innerHTML = "";
});