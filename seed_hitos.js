// C:\Proyectos\Kintsugi-api\seed_hitos.js
// Script de un solo uso: crea la colección catalogo_hitos en Firestore.
// Ejecutar una vez con: node seed_hitos.js
// Reutiliza la configuración de Firebase existente del backend.

const { db } = require('./src/config/firebase');

// URL base del bucket público de imágenes (mismo bucket que los avatares)
const BASE_URL = 'https://storage.googleapis.com/kintsugipublico/hitos';

// Catálogo de hitos. Fuente única de verdad del CONTENIDO.
// Vive en Firestore, NO hardcodeado en la app.
const hitos = [
  {
    id: 'primer_paso',
    nombre: 'Primer Paso',
    emoji: '🌱',
    misionesRequeridas: 1,
    imagenUrl: `${BASE_URL}/primer_paso.png`,
    orden: 1,
  },
  {
    id: 'en_marcha',
    nombre: 'En Marcha',
    emoji: '🔥',
    misionesRequeridas: 5,
    imagenUrl: `${BASE_URL}/en_marcha.png`,
    orden: 2,
  },
  {
    id: 'constancia',
    nombre: 'Constancia',
    emoji: '⚔️',
    misionesRequeridas: 25,
    imagenUrl: `${BASE_URL}/constancia.png`,
    orden: 3,
  },
  {
    id: 'maestria',
    nombre: 'Maestría',
    emoji: '👑',
    misionesRequeridas: 50,
    imagenUrl: `${BASE_URL}/maestria.png`,
    orden: 4,
  },
  {
    id: 'leyenda',
    nombre: 'Leyenda',
    emoji: '🏆',
    misionesRequeridas: 100,
    imagenUrl: `${BASE_URL}/leyenda.png`,
    orden: 5,
  },
];

async function seed() {
  console.log('Iniciando seed de catalogo_hitos...');

  try {
    const batch = db.batch();

    for (const hito of hitos) {
      const ref = db.collection('catalogo_hitos').doc(hito.id);
      batch.set(ref, hito);
      console.log(`  + ${hito.id} (${hito.nombre}) - ${hito.misionesRequeridas} misiones`);
    }

    await batch.commit();
    console.log(`\n✅ ${hitos.length} hitos creados correctamente en catalogo_hitos.`);
  } catch (error) {
    console.error('❌ Error durante el seed:', error);
    process.exitCode = 1;
  } finally {
    process.exit();
  }
}

seed();