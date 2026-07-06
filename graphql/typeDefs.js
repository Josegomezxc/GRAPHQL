

const typeDefs = `#graphql

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

    producto(id: ID!): Producto

    categorias(limit: Int, offset: Int): [Categoria]

    categoria(id: ID!): Categoria
    productosPorCategoria(categoriaId: ID!): [Producto]
  }

  type Mutation {
    crearProducto(input: ProductoInput!): Producto

    actualizarProducto(id: ID!, input: ProductoUpdateInput!): Producto

    eliminarProducto(id: ID!): String

    crearCategoria(input: CategoriaInput!): Categoria
    actualizarCategoria(id: ID!, input: CategoriaUpdateInput!): Categoria

    eliminarCategoria(id: ID!): String
  }
`

export default typeDefs
