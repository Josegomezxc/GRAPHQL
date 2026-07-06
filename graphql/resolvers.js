

import Producto from '../models/Producto.js'
import Categoria from '../models/Categoria.js'

const resolvers = {
  // ─── QUERIES ────────────────────────────────────────────

  Query: {
    productos: async (_, args) => {
      const { nombre, precioMin, precioMax, stockMin, stockMax, limit, offset } = args
      const filtro = {}
      if (nombre) filtro.nombre = { $regex: nombre, $options: 'i' }
      if (precioMin !== undefined || precioMax !== undefined) {
        filtro.precio = {}
        if (precioMin !== undefined) filtro.precio.$gte = precioMin
        if (precioMax !== undefined) filtro.precio.$lte = precioMax
      }
      if (stockMin !== undefined || stockMax !== undefined) {
        filtro.stock = {}
        if (stockMin !== undefined) filtro.stock.$gte = stockMin
        if (stockMax !== undefined) filtro.stock.$lte = stockMax
      }
      let query = Producto.find(filtro).populate('categoria')
      if (limit !== undefined) query = query.limit(limit)
      if (offset !== undefined) query = query.skip(offset)
      return await query
    },

    producto: async (_, { id }) => {
      const producto = await Producto.findById(id).populate('categoria')
      if (!producto) throw new Error('Producto no encontrado')
      return producto
    },

    categorias: async (_, { limit, offset }) => {
      let query = Categoria.find()
      if (limit !== undefined) query = query.limit(limit)
      if (offset !== undefined) query = query.skip(offset)
      return await query
    },

    categoria: async (_, { id }) => {
      const categoria = await Categoria.findById(id)
      if (!categoria) throw new Error('Categoría no encontrada')
      return categoria
    },

    productosPorCategoria: async (_, { categoriaId }) => {
      return await Producto.find({ categoria: categoriaId }).populate('categoria')
    },
  },

  // ─── MUTATIONS ──────────────────────────────────────────

  Mutation: {
    crearProducto: async (_, { input }) => {
      // Mapeamos categoriaId del input al campo categoria del modelo
      const datos = { ...input, categoria: input.categoriaId }
      delete datos.categoriaId
      const producto = await Producto.create(datos)
      return await producto.populate('categoria')
    },

    actualizarProducto: async (_, { id, input }) => {
      const datos = { ...input }
      if (input.categoriaId) {
        datos.categoria = input.categoriaId
        delete datos.categoriaId
      }
      const producto = await Producto.findByIdAndUpdate(id, datos, {
        new: true,
        runValidators: true,
      })
      if (!producto) throw new Error('Producto no encontrado')
      return await producto.populate('categoria')
    },

    eliminarProducto: async (_, { id }) => {
      const producto = await Producto.findByIdAndDelete(id)
      if (!producto) throw new Error('Producto no encontrado')
      return 'Producto eliminado correctamente'
    },

    crearCategoria: async (_, { input }) => {
      return await Categoria.create(input)
    },

    actualizarCategoria: async (_, { id, input }) => {
      const categoria = await Categoria.findByIdAndUpdate(id, input, {
        new: true,
        runValidators: true,
      })
      if (!categoria) throw new Error('Categoría no encontrada')
      return categoria
    },

    eliminarCategoria: async (_, { id }) => {
      const productos = await Producto.countDocuments({ categoria: id })
      if (productos > 0) {
        throw new Error(`No se puede eliminar: la categoría tiene ${productos} producto(s) asociado(s)`)
      }
      const categoria = await Categoria.findByIdAndDelete(id)
      if (!categoria) throw new Error('Categoría no encontrada')
      return 'Categoría eliminada correctamente'
    },
  },


  Producto: {
    categoria: async (parent) => {
      if (parent.categoria && typeof parent.categoria === 'object' && parent.categoria.nombre) {
        return parent.categoria
      }
      return await Categoria.findById(parent.categoria)
    },
  },

  Categoria: {
    productos: async (parent) => {
      return await Producto.find({ categoria: parent._id })
    },
  },
}

export default resolvers
