// Lista de productos que ofrece la tienda
const listaProductos = [
  { id: "Producto1", nombre: "Producto 1", precio: 50.00, imagen: "img/producto1.webp" },
  { id: "Producto2", nombre: "Producto 2", precio: 60.00, imagen: "img/producto2.png" },
  { id: "Producto3", nombre: "Producto 3", precio: 89.00, imagen: "img/producto3.jpg" },
  { id: "Producto4", nombre: "Producto 4", precio: 100.00, imagen: "img/producto1.webp" },
  { id: "Producto5", nombre: "Producto 5", precio: 120.00, imagen: "img/producto2.png" },
  { id: "Producto6", nombre: "Producto 6", precio: 130.00, imagen: "img/producto3.jpg" }
];

// Recorremos cada producto de la lista y declaro la varible producto (for.Each producto --> es cada elemento)
listaProductos.forEach(producto => {
  // Creamos el ID que tiene su botón correspondiente en HTML (por ejemplo: btnProducto1)
  const idBoton = `btn${producto.id}`;

  // Buscamos ese botón en el HTML
  const botonAgregar = document.getElementById(idBoton);

  // Si el botón no existe en el HTML, salimos de esta vuelta
  if (!botonAgregar) return;

  // Cuando se hace clic en el botón, agregamos el producto al carrito
  botonAgregar.addEventListener("click", () => {
    // Obtenemos el carrito actual del localStorage o un arreglo vacío si no existe
    let carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];

    // Buscamos si este producto ya está en el carrito
    const posicion = carritoActual.findIndex(item => item.id === producto.id);

    if (posicion !== -1) {
      // Ya estaba en el carrito, aumentamos la cantidad
      carritoActual[posicion].cantidad += 1;
    } else {
      // No estaba, lo agregamos con cantidad 1
      const nuevoProducto = {
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        cantidad: 1
      };
      carritoActual.push(nuevoProducto);
    }

    // Guardamos el carrito actualizado en el navegador
    localStorage.setItem("carrito", JSON.stringify(carritoActual));

    // Confirmamos en consola
    alert(`"${producto.nombre}" fue agregado al carrito`);

  });
});
