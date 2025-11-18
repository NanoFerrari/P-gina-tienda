# Página Tienda — SJM

Descripción
- Proyecto de tienda web estática para mostrar y vender productos por categorías (bebidas, alimentos, panes, carnes, lácteos, dulces).
- Interfaz mobile-first con paneles desplegables para categorías e información, carrito de compras y tarjetas de producto.

Características principales
- Estructura por categorías (páginas separadas dentro de `/productos/`).
- Tarjetas de producto con control de cantidad y botón "Añadir a la compra".
- Paneles móviles: categorías e información (plegado/desplegado).
- Carrito con listado, total y overlay.
- Estilos CSS organizados en `estilosproductos.css` / `SegEstilo.css`.
- Scripts JS para paneles (`panel.js`), carrito (`carrito.js`), productos (`productos.js`) y comportamiento general (`main.js`).

Instalación / ejecución local
- Clonar (si no está aún en local):
  git clone https://github.com/NanoFerrari/P-gina-tienda.git
- Servir localmente (recomendado para evitar problemas con rutas de archivos):
  - Python 3: `python -m http.server 8000` desde la carpeta del proyecto, luego abrir `http://localhost:8000/productos/bebidas.html`
  - O usar extensión Live Server en VS Code.

Estructura sugerida (resumen)
- /productos/ — páginas por categoría (bebidas.html, carnes.html, ...)
- /JS/ — scripts: panel.js, carrito.js, productos.js, main.js
- /Imagenes Main, /Imagenes Secundaria — imágenes de productos
- estilosproductos.css, SegEstilo.css — estilos principales

Problemas conocidos / comprobaciones iniciales
- Verificar en `main.js` referencias a `panelModule` (si existe) o eliminar llamadas redundantes.
- Asegurar rutas relativas a imágenes (`../Imagenes Main/...`) desde archivos en `/productos/`.
- Evitar duplicidad de lógica entre archivos JS; mantener un único `panel.js` con la lógica de paneles.
- Comprobar que `panel.js` esté inicializado correctamente (por ejemplo con `document.addEventListener('DOMContentLoaded', ...)`).
Sugerencias y mejoras futuras (ideas)
- Migrar productos a JSON y renderizar dinámicamente con un único `productos.html` (fácil gestión y filtrado).
- Usar localStorage para persistir carrito entre páginas.
- Añadir validación de stock y deshabilitar botón "Añadir" cuando stock = 0.
- Implementar un small admin UI para añadir/reponer/eliminar productos (puede ser estático o con Firebase).
- Mejorar accesibilidad (atributos ARIA, foco, contraste).
- Optimizar imágenes y lazy-loading para rendimiento.
- Considerar un generador estático (Eleventy) o SPA (React/Vue) si el proyecto crece.
- Añadir tests unitarios básicos para funciones del carrito.
