let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const contenedor = document.getElementById("columna-productos");

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
      <div class="d-flex">
        <img src="${producto.imagen}" style="width: 80px; margin-right: 1rem;" alt="${producto.nombre}">
        <div class="flex-grow-1">
          <h5>${producto.nombre}</h5>
          <p>Precio: S/ ${producto.precio.toFixed(2)}</p>
          <label>Cantidad:
            <input type="number" min="1" value="${producto.cantidad}" class="form-control form-control-sm cantidad-input" data-index="${index}">
          </label>
          <p>Total: <strong>S/ ${total}</strong></p>
          <button class="btn btn-danger btn-sm eliminar" data-index="${index}">Eliminar</button>
        </div>
      </div>
    `;
    contenedor.appendChild(div);
  });

  calcularResumen();
}

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
      <input type="text" class="form-control mb-2" placeholder="Tu nombre">
      <input type="email" class="form-control mb-3" placeholder="Tu Gmail">
      <button class="btn btn-success w-100 mb-2" id="btnPagar">Pagar</button>
      <button class="btn btn-secondary w-100" id="btnNuevaCompra">Nueva compra</button>
    </div>
  `;
}

document.addEventListener("input", (e) => {
  if (e.target.classList.contains("cantidad-input")) {
    const index = e.target.dataset.index;
    carrito[index].cantidad = parseInt(e.target.value);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarProductos();
  }
});

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
    alert("¡Gracias por tu compra! 😄");
  }
});

renderizarProductos();
