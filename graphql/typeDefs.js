

const typeDefs = `#graphql
  # ─── TIPOS ───────────────────────────────────────────────

  type Producto {
    id: ID!
    nombre: String!
    precio: Float!
    stock: Int!
    descripcion: String
    imagen: String
    categoria: Categoria
    createdAt: String
    updatedAt: String
  }

  type Categoria {
    id: ID!
    nombre: String!
    descripcion: String
    productos: [Producto]
    createdAt: String
    updatedAt: String
  }

  # ─── INPUTS (para mutations) ─────────────────────────────

  input ProductoInput {
    nombre: String!
    precio: Float!
    stock: Int!
    descripcion: String
    imagen: String
    categoriaId: ID!
  }

  input ProductoUpdateInput {
    nombre: String
    precio: Float
    stock: Int
    descripcion: String
    imagen: String
    categoriaId: ID
  }

  input CategoriaInput {
    nombre: String!
    descripcion: String
  }

  input CategoriaUpdateInput {
    nombre: String
    descripcion: String
  }

  # ─── QUERIES ─────────────────────────────────────────────
  # Equivalencias REST anotadas en cada query

  type Query {
    productos(
      nombre: String
      precioMin: Float
      precioMax: Float
      stockMin: Int
      stockMax: Int
      limit: Int
      offset: Int
    ): [Producto]

    # REST: GET /api/productos/:id
    producto(id: ID!): Producto

    # REST: GET /api/categorias?limit=&offset=
    categorias(limit: Int, offset: Int): [Categoria]

    # REST: GET /api/categorias/:id
    categoria(id: ID!): Categoria

    # REST: GET /api/productos?categoria=ID
    productosPorCategoria(categoriaId: ID!): [Producto]
  }

  # ─── MUTATIONS ───────────────────────────────────────────
  # Equivalencias REST anotadas en cada mutation

  type Mutation {
    # REST: POST /api/productos
    crearProducto(input: ProductoInput!): Producto

    # REST: PUT /api/productos/:id
    actualizarProducto(id: ID!, input: ProductoUpdateInput!): Producto

    # REST: DELETE /api/productos/:id
    eliminarProducto(id: ID!): String

    # REST: POST /api/categorias
    crearCategoria(input: CategoriaInput!): Categoria

    # REST: PUT /api/categorias/:id
    actualizarCategoria(id: ID!, input: CategoriaUpdateInput!): Categoria

    # REST: DELETE /api/categorias/:id
    eliminarCategoria(id: ID!): String
  }
`

export default typeDefs
