// Resumen de compra en JavaScript
// Obtener los datos del carrito desde localStorage
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const listaResumen = document.getElementById('lista-resumen');
const finalPriceElement = document.querySelector('.final-price'); // Seleccionar el elemento para el total
const volverBtn = document.getElementById('volverBtn'); // Botón para volver a la página de productos
const whatsappBtn = document.getElementById('whatsappBtn'); // Botón para enviar por WhatsApp

let total = 0;

// Validar si el carrito está vacío
if (carrito.length === 0) {
    listaResumen.innerHTML = '<p>El carrito está vacío.</p>';
    finalPriceElement.textContent = '$0.00'; // Mostrar total como $0.00
} else {
    carrito.forEach(producto => {
        // Validar los datos del producto
        const nombre = producto.nombre || 'Producto desconocido';
        const cantidad = producto.cantidad || 0;
        const precio = producto.precio || 0;

        const li = document.createElement('li');
        li.textContent = `${cantidad} x ${nombre} - $${(cantidad * precio).toFixed(2)}`;
        listaResumen.appendChild(li);

        total += cantidad * precio;
    });

    // Actualizar el total en el elemento con la clase "final-price"
    finalPriceElement.textContent = `$${total.toFixed(2)}`;
}

// Agregar funcionalidad al botón "Volver"
volverBtn.addEventListener('click', () => {
    window.location.href = 'productos.html'; // Redirigir a la página productos.html
});

// Agregar funcionalidad al botón "Enviar por WhatsApp"
whatsappBtn.addEventListener('click', () => {
    if (carrito.length === 0) {
        alert('El carrito está vacío. Agrega productos antes de enviar el pedido.');
        return;
    }

    // Generar el mensaje para WhatsApp
    let mensaje = '¡Hola! Me gustaría realizar el siguiente pedido:\n\n';
    carrito.forEach(producto => {
        const nombre = producto.nombre || 'Producto desconocido';
        const cantidad = producto.cantidad || 0;
        const precio = producto.precio || 0;
        mensaje += `- ${cantidad} x ${nombre} ($${precio.toFixed(2)} c/u)\n`;
    });
    mensaje += `\nTotal: $${total.toFixed(2)}`;

    // Codificar el mensaje para la URL de WhatsApp
    const mensajeCodificado = encodeURIComponent(mensaje);

    // Abrir WhatsApp con el mensaje
    const numeroWhatsApp = '593963152757'; // Reemplaza con el número de WhatsApp del negocio
    const url = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;
    window.open(url, '_blank');
});
