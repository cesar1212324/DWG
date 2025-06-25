const productos = [
  { id: "Producto1", nombre: "Producto 1", precio: 50.00, imagen: "img/producto1.webp" },
  { id: "Producto2", nombre: "Producto 2", precio: 60.00, imagen: "img/producto2.png" },
  { id: "Producto3", nombre: "Producto 3", precio: 89.00, imagen: "img/producto3.jpg" },
  { id: "Producto4", nombre: "Producto 4", precio: 100.00, imagen: "img/producto1.webp" },
  { id: "Producto5", nombre: "Producto 5", precio: 120.00, imagen: "img/producto2.png" },
  { id: "Producto6", nombre: "Producto 6", precio: 130.00, imagen: "img/producto3.jpg" }
];

productos.forEach(prod => {
  const boton = document.getElementById(`btn${prod.id}`);
  if (!boton) return;

  boton.addEventListener("click", () => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const index = carrito.findIndex(p => p.id === prod.id);

    if (index !== -1) {
      carrito[index].cantidad += 1;
    } else {
      carrito.push({ ...prod, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Confirmación rápida
    console.log(`${prod.nombre} agregado al carrito`);
  });
});
