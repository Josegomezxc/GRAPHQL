

import 'dotenv/config'
import mongoose from 'mongoose'
import Categoria from '../models/Categoria.js'
import Producto from '../models/Producto.js'

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ Conectado a MongoDB')

    // Limpiar colecciones existentes para que el seed sea idempotente
    await Producto.deleteMany({})
    await Categoria.deleteMany({})
    console.log('🧹 Colecciones limpiadas')

    const categorias = await Categoria.insertMany([
      { nombre: 'Electrónica', descripcion: 'Dispositivos electrónicos y gadgets' },
      { nombre: 'Ropa', descripcion: 'Prendas de vestir y accesorios' },
      { nombre: 'Hogar', descripcion: 'Artículos para el hogar y decoración' },
      { nombre: 'Deportes', descripcion: 'Equipamiento deportivo y fitness' },
      { nombre: 'Libros', descripcion: 'Libros físicos y digitales' },
    ])
    console.log(` ${categorias.length} categorías insertadas`)

    const [electronica, ropa, hogar, deportes, libros] = categorias

    const productos = await Producto.insertMany([
      {
        nombre: 'Laptop Pro',
        precio: 1200,
        stock: 15,
        descripcion: 'Laptop de alto rendimiento con 16GB RAM y 512GB SSD',
        imagen: 'https://placehold.co/400x300?text=Laptop+Pro',
        categoria: electronica._id,
      },
      {
        nombre: 'Auriculares Bluetooth',
        precio: 80,
        stock: 50,
        descripcion: 'Auriculares inalámbricos con cancelación de ruido',
        imagen: 'https://placehold.co/400x300?text=Auriculares+BT',
        categoria: electronica._id,
      },
      {
        nombre: 'Camiseta Azul',
        precio: 25,
        stock: 100,
        descripcion: 'Camiseta 100% algodón, disponible en varias tallas',
        imagen: 'https://placehold.co/400x300?text=Camiseta+Azul',
        categoria: ropa._id,
      },
      {
        nombre: 'Chaqueta de Invierno',
        precio: 90,
        stock: 30,
        descripcion: 'Chaqueta térmica impermeable para clima frío',
        imagen: 'https://placehold.co/400x300?text=Chaqueta',
        categoria: ropa._id,
      },
      {
        nombre: 'Lámpara LED',
        precio: 45,
        stock: 40,
        descripcion: 'Lámpara de escritorio LED con brazo ajustable',
        imagen: 'https://placehold.co/400x300?text=Lampara+LED',
        categoria: hogar._id,
      },
      {
        nombre: 'Cojín Decorativo',
        precio: 15,
        stock: 75,
        descripcion: 'Cojín decorativo de felpa, varios colores',
        imagen: 'https://placehold.co/400x300?text=Cojin',
        categoria: hogar._id,
      },
      {
        nombre: 'Bicicleta MTB',
        precio: 450,
        stock: 10,
        descripcion: 'Bicicleta de montaña 21 velocidades, cuadro de aluminio',
        imagen: 'https://placehold.co/400x300?text=Bicicleta+MTB',
        categoria: deportes._id,
      },
      {
        nombre: 'Mancuernas 10kg',
        precio: 35,
        stock: 60,
        descripcion: 'Par de mancuernas de 10kg con recubrimiento de neopreno',
        imagen: 'https://placehold.co/400x300?text=Mancuernas',
        categoria: deportes._id,
      },
      {
        nombre: 'Cien Años de Soledad',
        precio: 18,
        stock: 25,
        descripcion: 'Obra maestra de Gabriel García Márquez, edición ilustrada',
        imagen: 'https://placehold.co/400x300?text=Cien+Anios',
        categoria: libros._id,
      },
      {
        nombre: 'Clean Code',
        precio: 40,
        stock: 20,
        descripcion: 'Guía de Robert C. Martin para escribir código mantenible',
        imagen: 'https://placehold.co/400x300?text=Clean+Code',
        categoria: libros._id,
      },
    ])
    console.log(` ${productos.length} productos insertados`)

    console.log(' Seed completado exitosamente')
    await mongoose.connection.close()
    process.exit(0)
  } catch (error) {
    console.error(' Error en el seed:', error.message)
    await mongoose.connection.close()
    process.exit(1)
  }
}

seed()
