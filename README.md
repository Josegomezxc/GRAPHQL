# Taller GraphQL

Taller universitario de Desarrollo Web para demostrar el funcionamiento de GraphQL y cómo optimiza las consultas comparado con REST.

## Requisitos previos

- **Node.js v18+** — [descargar](https://nodejs.org/)
- **MongoDB 7.0** corriendo en `localhost:27017` — [descargar](https://www.mongodb.com/try/download/community)
- **npm** (viene con Node.js)

---

## Después de descomprimir el .zip

Lo primero es instalar las dependencias (viajan en el zip solo el código, no `node_modules/`):

```bash
cd taller-graphql
npm install
```

Esto instala: express, @apollo/server, graphql, mongoose, dotenv, cors.

---

## Iniciar MongoDB

### En Linux (Arch, Ubuntu, etc.)

```bash
sudo systemctl start mongodb
```

Verificar que está corriendo:

```bash
sudo systemctl status mongodb
```

### En Windows 11

**Opción 1 — Si MongoDB está instalado como servicio:**

```bash
net start MongoDB
```

**Opción 2 — Ejecutar mongod directamente:**

```bash
"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe"
```

**Opción 3 — Desde MongoDB Compass (GUI):** abrir Compass, conectar a `localhost:27017`.

---

## Poblar la base de datos

Inserta 5 categorías y 10 productos de prueba:

```bash
node seed/seed.js
```

Deberías ver en consola:

```
✅ Conectado a MongoDB
🧹 Colecciones limpiadas
📁 5 categorías insertadas
📦 10 productos insertados
✅ Seed completado exitosamente
```

---

## Iniciar el servidor

```bash
node index.js
```

Deberías ver:

```
✅ Conectado a MongoDB: mongodb://localhost:27017/taller_jwt
🚀 Servidor listo en http://localhost:4000/
📊 Apollo Sandbox: http://localhost:4000/
```

Abre `http://localhost:4000/` en el navegador para acceder a Apollo Sandbox y probar las queries.

---

## Queries de ejemplo

Abre el archivo **`QUERIES.md`** para ver queries listas para copiar y pegar en Apollo Sandbox, con explicaciones de cada concepto.

---

## Conceptos que demuestra el taller

| Concepto | GraphQL | REST |
|---|---|---|
| **Overfetching** | El cliente elige qué campos recibir | El servidor siempre devuelve todos los campos |
| **Underfetching** | Datos relacionados en una sola query | Múltiples requests para relaciones |
| **Endpoint único** | `POST /graphql` para todo | Un endpoint por cada recurso |
| **Tipado fuerte** | Schema rechaza campos inválidos | Sin validación en cliente |

---

## Solución de problemas

| Problema | Causa probable | Solución |
|---|---|---|
| `node: command not found` | Node.js no está instalado | Descargar e instalar desde [nodejs.org](https://nodejs.org/) |
| `MongooseServerSelectionError` | MongoDB no está corriendo | Ejecutar `sudo systemctl start mongodb` (Linux) o `net start MongoDB` (Windows) |
| `Cannot find module 'express'` | No se ejecutó `npm install` | Ejecutar `npm install` en la carpeta del proyecto |
| El servidor inicia pero no carga el Sandbox | Puerto 4000 ocupado | Cerrar otros procesos o cambiar `PORT=4001` en `.env` |

---

## Estructura del proyecto

```
taller-graphql/
├── .env                   # Config: MONGO_URI, PORT
├── index.js               # Servidor Apollo Server (punto de entrada)
├── models/
│   ├── Categoria.js       # Schema Mongoose para categorías
│   └── Producto.js        # Schema Mongoose para productos
├── graphql/
│   ├── typeDefs.js        # Schema GraphQL (tipos, queries, mutations)
│   └── resolvers.js       # Lógica de cada query/mutation
├── seed/
│   └── seed.js            # Población de datos de prueba
├── QUERIES.md             # Ejemplos para el taller
└── README.md              # Este archivo
```
