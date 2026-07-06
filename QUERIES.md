# Taller GraphQL — Queries de Ejemplo

Copia y pega estas queries en Apollo Sandbox: `http://localhost:4000/`

---

## 1. OVERFETCHING: GraphQL pide solo lo necesario

> 💡 **Para explicar en clase:** *"Si esto fuera REST, el endpoint `GET /api/productos` devolvería TODOS los campos (nombre, precio, stock, descripcion, imagen, categoriaId, timestamps...) aunque el cliente solo necesite 2. Eso es OVERFETCHING — datos innecesarios en la red. GraphQL elimina esto porque el cliente decide qué campos quiere."*

```graphql
query SoloNombreYPrecio {
  productos {
    nombre
    precio
  }
}
```

**Resultado:** Solo `nombre` y `precio` — exactamente lo pedido, ni un byte extra.

---

## 2. UNDERFETCHING: GraphQL resuelve relaciones en 1 query

> 💡 **Para explicar en clase:** *"En REST, para obtener un producto con el nombre de su categoría necesitas 2 requests: 1) GET /api/productos/:id → te devuelve un categoriaId (no el nombre), 2) GET /api/categorias/:idCat → te devuelve el nombre. Dos llamadas HTTP. Con GraphQL es una sola query. Eso es evitar UNDERFETCHING — cuando una respuesta de REST se queda corta y necesitas más llamadas."*

```graphql
query ProductoConCategoria {
  producto(id: "ID_DEL_PRODUCTO") {
    nombre
    precio
    categoria {
      nombre
      descripcion
    }
  }
}
```

*(Reemplaza `ID_DEL_PRODUCTO` por un ID real que obtengas de la query del punto 1)*

---

## 3. Categorías con sus productos anidados

> 💡 **Para explicar en clase:** *"Acá estamos pidiendo las categorías y, dentro de cada una, sus productos. En REST esto sería: GET /api/categorias → por cada categoría, hacer GET /api/productos?categoria=ID. Si hay 5 categorías, son 6 requests. GraphQL lo hace en 1."*

```graphql
query CategoriasConProductos {
  categorias {
    nombre
    productos {
      nombre
      precio
      stock
    }
  }
}
```

---

## 4. Productos filtrados por categoría (con campos selectivos)

> 💡 **Para explicar en clase:** *"Filtramos productos por categoría y además elegimos solo los campos que nos interesan (nombre, precio, stock). En REST el filtro sería GET /api/productos?categoria=ID pero igual te devuelve todos los campos del producto."*

```graphql
query ProductosDeElectronica {
  productosPorCategoria(categoriaId: "ID_DE_ELECTRONICA") {
    nombre
    precio
    stock
  }
}
```

---

## 5. Mutación: Crear un producto

> 💡 **Para explicar en clase:** *"Las mutations son el equivalente a POST/PUT/DELETE de REST. Pero a diferencia de REST, en la misma llamada puedes pedir que te devuelva los campos del objeto creado (o los que quieras). En REST harías POST /api/productos y luego GET aparte para ver lo que creaste."*

```graphql
mutation CrearProducto {
  crearProducto(
    input: {
      nombre: "Tablet Pro"
      precio: 350
      stock: 20
      descripcion: "Tablet 10 pulgadas con stylus incluido"
      imagen: "https://placehold.co/400x300?text=Tablet"
      categoriaId: "ID_DE_ELECTRONICA"
    }
  ) {
    id
    nombre
    precio
    categoria {
      nombre
    }
  }
}
```

---

## 6. Mutación: Actualizar precio de un producto

```graphql
mutation ActualizarPrecio {
  actualizarProducto(
    id: "ID_DEL_PRODUCTO"
    input: { precio: 999.99 }
  ) {
    id
    nombre
    precio
  }
}
```

> 💡 **Para explicar en clase:** *"Actualizamos solo un campo (precio) y pedimos que nos devuelva los campos actualizados. En REST harías PUT /api/productos/:ID enviando todo el objeto aunque solo cambies un campo."*

---

## 7. Mutación: Eliminar un producto

```graphql
mutation EliminarProducto {
  eliminarProducto(id: "ID_DEL_PRODUCTO")
}
```

> 💡 **Para explicar en clase:** *"DELETE en REST es DELETE /api/productos/:ID. En GraphQL es una mutation más, todo por el mismo endpoint."*

---

## 8. Mutación: Crear una categoría

```graphql
mutation CrearCategoria {
  crearCategoria(
    input: {
      nombre: "Juguetes"
      descripcion: "Juguetes y juegos para todas las edades"
    }
  ) {
    id
    nombre
  }
}
```

---

## 9. Query combinada: todo en una sola llamada

> 💡 **Para explicar en clase:** *"Esto es IMPOSIBLE en REST. Acá estamos pidiendo productos y categorías en una sola llamada. En REST necesitarías GET /api/productos Y GET /api/categorias = 2 requests HTTP. Cada request tiene su propio overhead (headers, handshake TCP, etc.). GraphQL minimiza eso."*

```graphql
query TodoEnUna {
  productos {
    nombre
    precio
  }
  categorias {
    nombre
    descripcion
  }
}
```

---

## 10. Query con variables (forma profesional)

> 💡 **Para explicar en clase:** *"En producción no se escriben los IDs quemados en la query. Se usan variables. Apollo Sandbox tiene un panel de Variables abajo a la izquierda."*

```graphql
query ProductoPorID($id: ID!) {
  producto(id: $id) {
    nombre
    precio
    categoria {
      nombre
    }
  }
}
```

**Variables (panel inferior izquierdo):**
```json
{
  "id": "ID_DEL_PRODUCTO"
}
```

---

## Resumen visual para la presentación

| Problema | REST | GraphQL |
|---|---|---|
| **Overfetching** | `GET /api/productos` → devuelve 8 campos siempre | Solo pides `nombre, precio` → recibes solo eso |
| **Underfetching** | Producto + categoría = **2 requests** | 1 sola query con anidación |
| **Endpoint único** | 7 endpoints distintos | `POST /graphql` para todo |
| **Tipado fuerte** | Sin validación de campos | Schema rechaza campos inexistentes |
| **Documentación** | Swagger/OpenAPI (herramienta extra) | Apollo Sandbox se genera solo |
