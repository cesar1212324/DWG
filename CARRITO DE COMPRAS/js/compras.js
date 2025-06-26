let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const contenedor = document.getElementById("columna-productos");

// Renderiza todos los productos agregados
function renderizarProductos() {
  contenedor.innerHTML = "<h4 class='mb-4'>Carrito de Compras</h4>";

  if (carrito.length === 0) {
    contenedor.innerHTML += "<p>No hay productos en el carrito.</p>";
    document.getElementById("columna-resumen").innerHTML = "";
    return;
  }

  carrito.forEach((producto, index) => {
    const total = (producto.precio * producto.cantidad).toFixed(2);
    const div = document.createElement("div");
    div.className = "card mb-3 p-3";
    div.innerHTML = `
      <div class="row align-items-center">
        <div class="col-auto">
          <img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid" style="width: 80px;">
        </div>
        <div class="col">
          <h6 class="mb-1">${producto.nombre}</h6>
          <small>Precio: S/ ${producto.precio.toFixed(2)}</small>
        </div>
        <div class="col">
          <label class="mb-0">Cantidad:</label>
          <input type="number" min="1" value="${producto.cantidad}" class="form-control form-control-sm cantidad-input" data-index="${index}">
        </div>
        <div class="col">
          <p class="mb-1">Total:<br><strong>S/ ${total}</strong></p>
        </div>
        <div class="col-auto">
          <button class="btn btn-danger btn-sm eliminar" data-index="${index}">Eliminar</button>
        </div>
      </div>
    `;
    contenedor.appendChild(div);
  });

  calcularResumen();
}

// Calcula y muestra el resumen de la compra + formulario + botones
function calcularResumen() {
  const resumen = document.getElementById("columna-resumen");
  let subtotal = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  let descuento = subtotal * 0.05;
  let igv = (subtotal - descuento) * 0.18;
  let totalFinal = subtotal - descuento + igv;

  resumen.innerHTML = `
    <div class="p-3 bg-light border rounded mb-3">
      <p>Subtotal: S/ ${subtotal.toFixed(2)}</p>
      <p>Descuento (5%): -S/ ${descuento.toFixed(2)}</p>
      <p>IGV (18%): +S/ ${igv.toFixed(2)}</p>
      <hr>
      <h5>Total Final: S/ ${totalFinal.toFixed(2)}</h5>
    </div>
    <div>
      <input type="text" class="form-control mb-2" id="campo-nombre" placeholder="Tu nombre">
      <input type="email" class="form-control mb-3" id="campo-email" placeholder="Tu Gmail">
      <div class="d-flex gap-2">
        <button class="btn btn-success w-100" id="btnPagar">Pagar</button>
        <button class="btn btn-secondary w-100" id="btnNuevaCompra">Nueva compra</button>
      </div>
    </div>
  `;
}

// Escucha cambios de cantidad
document.addEventListener("input", (e) => {
  if (e.target.classList.contains("cantidad-input")) {
    const index = e.target.dataset.index;
    carrito[index].cantidad = parseInt(e.target.value);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarProductos();
  }
});

// Escucha clicks en eliminar, pagar o nueva compra
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("eliminar")) {
    carrito.splice(e.target.dataset.index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarProductos();
  }

  if (e.target.id === "btnNuevaCompra") {
    localStorage.removeItem("carrito");
    location.reload();
  }

  if (e.target.id === "btnPagar") {
    const nombre = document.getElementById("campo-nombre").value.trim();
    const email = document.getElementById("campo-email").value.trim();
    const total = document.querySelector("#columna-resumen h5").textContent;

    // Validación rápida (opcional)
    if (!nombre || !email) {
      alert("Por favor, completa tu nombre y Gmail.");
      return;
    }

    const contenido = document.getElementById("contenidoModal");
    contenido.innerHTML = `
      <p><strong>Apellidos y nombres:</strong> ${nombre}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>${total}</strong></p>
    `;

    const modal = new bootstrap.Modal(document.getElementById("modalCompra"));
    modal.show();
  }
});

renderizarProductos();
