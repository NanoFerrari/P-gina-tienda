const carritoModule = (() => {
    const abrirCarrito = () => {
        const carritoDrawer = document.getElementById('carrito');
        const carritoOverlay = document.querySelector('.carrito-overlay');
        carritoDrawer.classList.add('abierto');
        carritoOverlay.classList.add('visible');
        document.body.style.overflow = 'hidden';
        renderizarCarrito(); // Renderizar los productos al abrir el carrito
    };

    const cerrarCarrito = () => {
        const carritoDrawer = document.getElementById('carrito');
        const carritoOverlay = document.querySelector('.carrito-overlay');
        carritoDrawer.classList.remove('abierto');
        carritoOverlay.classList.remove('visible');
        document.body.style.overflow = '';
    };

    const actualizarCarritoFlotante = () => {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const totalProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);
        const carritoContador = document.querySelector('.carrito-contador');
        carritoContador.textContent = totalProductos;

        // Agregar animación
        carritoContador.classList.add('updated');
        setTimeout(() => carritoContador.classList.remove('updated'), 200);
    };

    const renderizarCarrito = () => {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const listaCarrito = document.getElementById('lista-carrito');
        const totalElement = document.getElementById('total');

        listaCarrito.innerHTML = ''; // Limpiar el contenido actual

        if (carrito.length === 0) {
            listaCarrito.innerHTML = '<p class="empty-cart">El carrito está vacío</p>';
            totalElement.textContent = '$0.00';
            actualizarCarritoFlotante(); // Actualizar el contador
            return;
        }

        let total = 0;

        carrito.forEach(producto => {
            const precio = producto.precio || 0; // Si no tiene precio, usar 0
            const cantidad = producto.cantidad || 0; // Si no tiene cantidad, usar 0

            const li = document.createElement('li');
            li.classList.add('product-item');
            li.innerHTML = `
                <span>${producto.nombre || 'Producto desconocido'}</span>
                <span>${cantidad} x $${precio.toFixed(2)}</span>
                <span class="product-price">$${(cantidad * precio).toFixed(2)}</span>
                <button class="reducir-cantidad" data-nombre="${producto.nombre}">×</button>
            `;
            listaCarrito.appendChild(li);

            total += cantidad * precio;
        });

        totalElement.textContent = `$${total.toFixed(2)}`;
        actualizarCarritoFlotante(); // Actualizar el contador
    };

    const reducirCantidad = (nombreProducto) => {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const producto = carrito.find(item => item.nombre === nombreProducto);

        if (producto) {
            producto.cantidad -= 1; // Reducir la cantidad en 1
            if (producto.cantidad <= 0) {
                carrito = carrito.filter(item => item.nombre !== nombreProducto);
            }
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderizarCarrito();
    };

    const finalizarCompra = () => {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        if (carrito.length === 0) {
            alert('El carrito está vacío. Agrega productos antes de finalizar la compra.');
            return;
        }

        // Redirigir a la página resumen.html
        window.location.href = 'resumen.html';
    };

    const init = () => {
        const carritoToggle = document.getElementById('carrito-toggle');
        const cerrarCarritoBtn = document.getElementById('cerrar-carrito');
        const listaCarrito = document.getElementById('lista-carrito');
        const finalizarCompraBtn = document.getElementById('finalizar-compra');

        carritoToggle.addEventListener('click', abrirCarrito);
        cerrarCarritoBtn.addEventListener('click', cerrarCarrito);

        // Delegación de eventos para reducir la cantidad de productos
        listaCarrito.addEventListener('click', (e) => {
            if (e.target.classList.contains('reducir-cantidad')) {
                const nombreProducto = e.target.dataset.nombre;
                reducirCantidad(nombreProducto);
            }
        });

        // Evento para finalizar la compra
        finalizarCompraBtn.addEventListener('click', finalizarCompra);

        // Actualizar el contador al cargar la página
        actualizarCarritoFlotante();

        // Renderizar el carrito al cargar la página
        renderizarCarrito();
    };

    return { init };
})();