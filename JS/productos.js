const productosModule = (() => {
    const actualizarCarritoFlotante = () => {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const totalProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);
        const carritoContador = document.querySelector('.carrito-contador');
        carritoContador.textContent = totalProductos;
    };

    const guardarEnCarrito = (producto, cantidad, precio) => {
        if (!producto || cantidad <= 0 || precio <= 0) {
            console.warn('Datos inválidos al guardar en el carrito:', { producto, cantidad, precio });
            return;
        }

        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const productoExistente = carrito.find(item => item.nombre === producto);

        if (productoExistente) {
            productoExistente.cantidad += cantidad;
        } else {
            carrito.push({ nombre: producto, cantidad, precio });
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarritoFlotante();
    };

    const init = () => {
        const tarjetas = document.querySelectorAll('.tarjetaCantidad');

        tarjetas.forEach(tarjeta => {
            const menosBtn = tarjeta.querySelector('.menos');
            const masBtn = tarjeta.querySelector('.mas');
            const valorSpan = tarjeta.querySelector('.valor');
            const añadirBtn = tarjeta.querySelector('.añadir');
            const productoNombre = tarjeta.querySelector('p').textContent.trim();
            const productoPrecio = parseFloat(tarjeta.querySelector('p:nth-of-type(2)').textContent.replace('$', ''));

            // Evento para disminuir la cantidad
            menosBtn.addEventListener('click', () => {
                let cantidad = parseInt(valorSpan.textContent);
                if (cantidad > 1) {
                    valorSpan.textContent = cantidad - 1;
                }
            });

            // Evento para aumentar la cantidad
            masBtn.addEventListener('click', () => {
                let cantidad = parseInt(valorSpan.textContent);
                valorSpan.textContent = cantidad + 1;
            });

            // Evento para añadir al carrito
            añadirBtn.addEventListener('click', () => {
                const cantidad = parseInt(valorSpan.textContent);
                guardarEnCarrito(productoNombre, cantidad, productoPrecio);
                valorSpan.textContent = 1; // Reiniciar la cantidad a 1
            });
        });

        // Actualizar el contador del carrito al cargar la página
        actualizarCarritoFlotante();
    };

    return { init };
})();
