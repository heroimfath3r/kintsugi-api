const { db } = require('./src/config/firebase');

const arquetipos = [
  {
    id: 'thorfinn',
    nombre: 'Thorfinn',
    anime: 'Vinland Saga',
    estadoEmocional: 'Vacío / resentimiento',
    filosofia: 'Encontrar propósito más allá de la venganza y el vacío interior',
    imagenFase1: 'thorfinn_fase1.png',
    imagenFase2: 'thorfinn_fase2.png',
    imagenFase3: 'thorfinn_fase3.png',
  },
  {
    id: 'rock_lee',
    nombre: 'Rock Lee',
    anime: 'Naruto',
    estadoEmocional: 'Frustración / inferioridad',
    filosofia: 'Superar limitaciones a través del esfuerzo puro y la disciplina',
    imagenFase1: 'rock_lee_fase1.png',
    imagenFase2: 'rock_lee_fase2.png',
    imagenFase3: 'rock_lee_fase3.png',
  },
  {
    id: 'ippo',
    nombre: 'Ippo Makunouchi',
    anime: 'Hajime no Ippo',
    estadoEmocional: 'Ansiedad / falta de confianza',
    filosofia: 'Construir confianza paso a paso enfrentando cada miedo',
    imagenFase1: 'ippo_fase1.png',
    imagenFase2: 'ippo_fase2.png',
    imagenFase3: 'ippo_fase3.png',
  },
  {
    id: 'mob',
    nombre: 'Mob / Shigeo Kageyama',
    anime: 'Mob Psycho 100',
    estadoEmocional: 'Represión emocional',
    filosofia: 'Aceptar y expresar las emociones en vez de reprimirlas',
    imagenFase1: 'mob_fase1.png',
    imagenFase2: 'mob_fase2.png',
    imagenFase3: 'mob_fase3.png',
  },
  {
    id: 'asta',
    nombre: 'Asta',
    anime: 'Black Clover',
    estadoEmocional: 'Desmotivación / sueños imposibles',
    filosofia: 'Nunca rendirse sin importar las limitaciones o el rechazo',
    imagenFase1: 'asta_fase1.png',
    imagenFase2: 'asta_fase2.png',
    imagenFase3: 'asta_fase3.png',
  },
];

const catalogoMisiones = [
  // THORFINN
  { arquetipo: 'thorfinn', estadoEmocional: 'vacio', titulo: 'Escribe 3 cosas que te conecten con un propósito hoy', tipo: 'reflexion', descripcion: 'Thorfinn encontró su camino dejando atrás el vacío. Hoy, identifica qué te da sentido.' },
  { arquetipo: 'thorfinn', estadoEmocional: 'frustracion', titulo: 'Camina 15 minutos en silencio sin el teléfono', tipo: 'accion', descripcion: 'Cuando el resentimiento pesa, el movimiento libera. Sal sin distracciones.' },
  { arquetipo: 'thorfinn', estadoEmocional: 'ansiedad', titulo: 'Haz 5 minutos de respiración 4-7-8', tipo: 'respiracion', descripcion: 'Inhala 4 segundos, sostén 7, exhala 8. Repite hasta que la calma llegue.' },
  { arquetipo: 'thorfinn', estadoEmocional: 'motivacion', titulo: 'Define una meta concreta para esta semana y escríbela', tipo: 'accion', descripcion: 'La motivación sin dirección se disipa. Ponle nombre a lo que quieres lograr.' },
  { arquetipo: 'thorfinn', estadoEmocional: 'calma', titulo: 'Escribe una carta a tu yo del futuro', tipo: 'reflexion', descripcion: 'Desde la calma se ve más claro. Dile a tu yo futuro lo que hoy entiendes.' },

  // ROCK LEE
  { arquetipo: 'rock_lee', estadoEmocional: 'frustracion', titulo: 'Haz 20 flexiones o sentadillas ahora mismo', tipo: 'accion', descripcion: 'Rock Lee convirtió sus limitaciones en fuerza. Transforma la frustración en movimiento.' },
  { arquetipo: 'rock_lee', estadoEmocional: 'vacio', titulo: 'Llama o escríbele a alguien que admires y dile por qué', tipo: 'accion', descripcion: 'El vacío se llena con conexiones reales. Reconoce a quien te inspira.' },
  { arquetipo: 'rock_lee', estadoEmocional: 'ansiedad', titulo: 'Haz una lista de 5 logros que hayas conseguido este año', tipo: 'reflexion', descripcion: 'La ansiedad olvida lo que ya lograste. Recuérdalo.' },
  { arquetipo: 'rock_lee', estadoEmocional: 'motivacion', titulo: 'Entrena algo que se te dificulte durante 30 minutos', tipo: 'accion', descripcion: 'El esfuerzo es tu superpoder. Practica lo difícil con la energía de hoy.' },
  { arquetipo: 'rock_lee', estadoEmocional: 'calma', titulo: 'Enseña algo que sepas a otra persona hoy', tipo: 'accion', descripcion: 'Compartir conocimiento fortalece tu propio dominio. Encuentra a quién enseñar.' },

  // IPPO
  { arquetipo: 'ippo', estadoEmocional: 'ansiedad', titulo: 'Identifica tu miedo más grande hoy y escríbelo', tipo: 'reflexion', descripcion: 'Ippo enfrentó cada pelea con miedo pero sin detenerse. Nombra lo que te asusta.' },
  { arquetipo: 'ippo', estadoEmocional: 'frustracion', titulo: 'Haz algo que hayas estado posponiendo por miedo a fallar', tipo: 'accion', descripcion: 'La frustración muchas veces es miedo disfrazado. Da el primer paso.' },
  { arquetipo: 'ippo', estadoEmocional: 'vacio', titulo: 'Practica un hobby durante 20 minutos sin juzgarte', tipo: 'accion', descripcion: 'No todo tiene que ser productivo. Haz algo solo porque lo disfrutas.' },
  { arquetipo: 'ippo', estadoEmocional: 'motivacion', titulo: 'Fija un reto personal para hoy y cúmplelo antes de dormir', tipo: 'accion', descripcion: 'La confianza se construye con pequeñas victorias. Elige una y ve por ella.' },
  { arquetipo: 'ippo', estadoEmocional: 'calma', titulo: 'Medita 10 minutos enfocándote solo en tu respiración', tipo: 'respiracion', descripcion: 'La calma es tu momento de recarga. Protégela.' },

  // MOB
  { arquetipo: 'mob', estadoEmocional: 'ansiedad', titulo: 'Escribe lo que sientes ahora mismo sin filtro durante 5 minutos', tipo: 'reflexion', descripcion: 'Mob aprendió que reprimir emociones las hace explotar. Sácalas al papel.' },
  { arquetipo: 'mob', estadoEmocional: 'frustracion', titulo: 'Dile a alguien de confianza cómo te sientes hoy', tipo: 'accion', descripcion: 'Expresar la frustración no es debilidad. Es la forma más valiente de procesarla.' },
  { arquetipo: 'mob', estadoEmocional: 'vacio', titulo: 'Haz algo amable por otra persona sin que te lo pida', tipo: 'accion', descripcion: 'Conectar con otros llena los espacios que el aislamiento crea.' },
  { arquetipo: 'mob', estadoEmocional: 'motivacion', titulo: 'Canaliza tu energía en un proyecto creativo durante 30 minutos', tipo: 'accion', descripcion: 'Las emociones fuertes son combustible. Úsalas para crear, no para reprimir.' },
  { arquetipo: 'mob', estadoEmocional: 'calma', titulo: 'Observa tus emociones como un espectador durante 10 minutos', tipo: 'reflexion', descripcion: 'No juzgues lo que sientes. Solo obsérvalo pasar como nubes en el cielo.' },

  // ASTA
  { arquetipo: 'asta', estadoEmocional: 'frustracion', titulo: 'Escribe por qué empezaste este camino y qué te mantiene aquí', tipo: 'reflexion', descripcion: 'Asta nunca tuvo magia pero nunca dejó de intentar. Recuerda tu por qué.' },
  { arquetipo: 'asta', estadoEmocional: 'vacio', titulo: 'Haz una lista de 3 sueños que parecen imposibles y elige uno para trabajar hoy', tipo: 'reflexion', descripcion: 'Los sueños imposibles son los únicos que valen la pena perseguir.' },
  { arquetipo: 'asta', estadoEmocional: 'ansiedad', titulo: 'Haz ejercicio intenso durante 15 minutos', tipo: 'accion', descripcion: 'Quema la ansiedad con movimiento. Tu cuerpo sabe cómo liberar lo que la mente acumula.' },
  { arquetipo: 'asta', estadoEmocional: 'motivacion', titulo: 'Da un paso concreto hacia tu meta más ambiciosa hoy', tipo: 'accion', descripcion: 'No esperes a estar listo. Asta nunca lo estuvo y aun así avanzó.' },
  { arquetipo: 'asta', estadoEmocional: 'calma', titulo: 'Agradece por escrito 3 cosas que tienes hoy que antes parecían imposibles', tipo: 'reflexion', descripcion: 'La calma es el mejor momento para ver cuánto has avanzado sin darte cuenta.' },
];

const seed = async () => {
  console.log('Poblando Firestore...\n');

  // Subir arquetipos
  console.log('Subiendo arquetipos...');
  for (const arq of arquetipos) {
    const { id, ...data } = arq;
    await db.collection('arquetipos').doc(id).set(data);
    console.log(`  ✅ ${arq.nombre}`);
  }

  // Subir catálogo de misiones
  console.log('\nSubiendo catálogo de misiones...');
  for (const mision of catalogoMisiones) {
    const docId = `${mision.arquetipo}_${mision.estadoEmocional}`;
    await db.collection('catalogo_misiones').doc(docId).set(mision);
    console.log(`  ✅ ${mision.arquetipo} - ${mision.estadoEmocional}`);
  }

  console.log('\n🎉 Firestore poblado exitosamente');
  console.log(`   ${arquetipos.length} arquetipos`);
  console.log(`   ${catalogoMisiones.length} misiones`);
  process.exit(0);
};

seed().catch((error) => {
  console.error('Error al poblar Firestore:', error);
  process.exit(1);
});