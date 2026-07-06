/**
 * questions.js — Contenido del formulario.
 *
 * Única fuente de verdad de las preguntas. app.js lee este array y genera
 * todo el HTML del formulario, así que para editar, añadir o quitar preguntas
 * u opciones basta con modificar este fichero.
 *
 * Estructura de cada pregunta:
 *   id:      número visible de la pregunta (1..50)
 *   text:    enunciado
 *   options: array de opciones de respuesta (radio: solo una seleccionable)
 *
 * Además de sus opciones, TODAS las preguntas reciben automáticamente un
 * campo libre "Escribe tu respuesta:" (lo añade app.js al renderizar).
 */

const QUESTIONS = [
  {
    id: 1,
    text: `¿Qué es lo mejor de discutir conmigo?`,
    options: [
      `Mi increíble habilidad para cambiar de tema o no dejarte hablar cuando no me interesa.`,
      `Que siempre tengo la razón (obvio), y el ketchup no es bueno así que te callas.`,
      `Poder callarte si me interrumpes o rechistas y si es posible cerrarte la puerta mientras hablas y pillarte un pie.`,
      `Que no me importa en absoluto lo que tengas que decir.`,
    ],
  },
  {
    id: 2,
    text: `Si tuviera que describirte en una palabra, ¿cuál sería?`,
    options: [`Nefasto.`, `Apestoso.`, `Insoportable.`, `Adorable.`],
  },
  {
    id: 3,
    text: `Si tuviera que describirte en un emoji, ¿cuál sería?`,
    options: [`😇`, `😏`, `🤮`, `💖`],
  },
  {
    id: 4,
    text: `Si pudiera cambiar algo de ti, ¿qué sería?`,
    options: [
      `Tu olor a mugre.`,
      `Que fumes, que no te cuides, que no seas ordenado ni tengas disciplina de ningún tipo, o algún buen hábito.`,
      `Tu aspecto físico. Eres un gafotas esmirriado y te haría entrenar para que saques algo de músculo, o por lo menos para mejorar el cardio, ya que seguramente te van a partir el corazón más veces porque no vales como hombre.`,
      `Que no tengas coche y ni siquiera el carnet, eres como un niño que nunca ha trabajado y ni siquiera sabe ningún idioma más que el de decir pendejadas.`,
      `Que quieras a Camila porque yo te quiero solo para mi.`,
    ],
  },
  {
    id: 5,
    text: `Si nuestra relación fuera una serie de televisión, ¿cómo se llamaría?`,
    options: [
      `Cómo conocí al diablo.`,
      `Desde París, con una psicópata.`,
      `Perdiendo el juicio con la abogada.`,
      `Alibaba y la ladrona de Aránzazu.`,
    ],
  },
  {
    id: 6,
    text: `¿Si tuviéramos un aniversario, en qué día caería?`,
    options: [
      `Día de las ratas.`,
      `Día del desencanto.`,
      `Día para enamorarse dos días después del día de los enamorados.`,
      `Día de la mala suerte.`,
    ],
  },
  {
    id: 7,
    text: `¿Qué hago mejor que tú?`,
    options: [`Todo.`, `Soy más rápida quedándome dormida.`],
  },
  {
    id: 8,
    text: `¿Qué haces mejor que yo?`,
    options: [
      `Nada.`,
      `Nadar, seguro que eres más rápido que yo en natación porque eres un hombre y pues además eres piscis, así que tienes que ser como un pececillo en el agua. Muero por echar esa carrera que tenemos pendiente para que me ganes y me hagas una aguadilla por perdedora y porque me lo merezco.`,
    ],
  },
  {
    id: 9,
    text: `¿Qué hábito tuyo es el que es más difícil de soportar?`,
    options: [
      `Que seas pesadito escribiéndome mensajes largos porque nunca tengo tiempo para leerte.`,
      `Que fumes porque huele horrible, aunque cuanto antes te mueras mejor.`,
      `Que fumes, odio que fumes porque te quiero y además creo que pude haberte ayudado a dejarlo pero solo hice es que darte problemas y me siento triste por eso.`,
      `Que tiendas a procrastinar y postergar las cosas que requieren algo esfuerzo, eres un puto vago, friégame ya los platos.`,
    ],
  },
  {
    id: 10,
    text: `¿Qué solías hacer que arruinaba los momentos?`,
    options: [
      `Fumar un cigarro, por si fuera poco apestar a pies y pis de gato, además también tenías que apestar tabaco.`,
      `Hablarme de Camila o sacarte fotos con letreros de Camila, me emputaba que hicieras eso, me ponía celosa porque te quiero, y lamento no haber sabido lidiar con eso y haber permitido que mi ego, mis miedos, mis celos y orgullo, me empujaran a portarme tan mal contigo y hacerte daño por eso.`,
      `Hacerme mal algunas fotos. Solo te lleve a París para que me hicieras fotos, no tenías que enamorarte de mi idiota.`,
      `No mirarme a los ojos cuando me hablabas. Te intimidan las mujeres.`,
    ],
  },
  {
    id: 11,
    text: `¿Qué crees que se me hizo atractivo de ti al principio?`,
    options: [
      `Tus ojos de caramelo, aunque debiste haber sido un hombre y haberme mirado más a los ojos, me derrito.`,
      `Tu sonrisa de niño bueno y que fueras atento, bueno, y comprensivo conmigo siempre.`,
      `Que en el hospital siempre que me veías venías a darme conversación y estar conmigo, se notaba que te gustaba jaja`,
      `Que al final en el hospital no te resististe y me dijiste que te gustaba, y como justo nos llamaron la atención porque en ese momento estábamos los dos a solas en un baño, y nos tuvimos que salir, yo voy a decir que nunca te escuche decir eso.`,
    ],
  },
  {
    id: 12,
    text: `¿Qué es lo que más te gusta de mí?`,
    options: [
      `No lo sabes.`,
      `Mi voz de niña tierna.`,
      `Que soy muy divertida.`,
      `Que soy muy sexy.`,
    ],
  },
  {
    id: 13,
    text: `¿Qué es lo que más me gusta de ti?`,
    options: [
      `Me gustas tú y solo quiero volver a tenerte cerca porque me he enamorado de ti.`,
      `Como me hacías el amor, eres el mejor.`,
      `Tu olor a sobaco, delicia.`,
      `Pensar que tienes esquizofrenia, porque quería volverte loquito y hacerte daño, y el pensar que tienes una enfermedad me agrada porque así te habré hecho más daño( llámame sádica).`,
      `Que te pusiste loquito por mí, aunque es normal eso porque soy una diosa y pues es el efecto que causó en los hombres.`,
    ],
  },
  {
    id: 14,
    text: `¿Qué pensabas cuando me veías hablar con alguien que no conocía?`,
    options: [
      `Cómo se atreve a hacer cosas como por ejemplo ponerse en el asiento delante del taxi jaja Esta chica está muy loca, pero me encanta.`,
      `Amo su tierna voz y su atención, ojalá me estuviera hablando a mí.`,
      `Si era un hombre me ponía celoso, como con el poli que estaba cerca del retiro cuando fuimos a lo del orgullo gay, o el tipo que estaba de puerta en la plaza de toros cuando fuimos a las ventas.`,
      `Todas las respuestas son correctas.`,
    ],
  },
  {
    id: 15,
    text: `¿Qué piensas que hizo que nuestra relación fuera especial?`,
    options: [
      `Tu infinita paciencia para aguantarme y consentirme.`,
      `Tu habilidad para evitar responsabilidades como por ejemplo, darme mi dinero.`,
      `Mi encanto de mujer y la manera en que la vida nos hizo coincidir y compartir momentos.`,
      `Mi dinero, porque fui yo quien te llevé a París.`,
    ],
  },
  {
    id: 16,
    text: `¿Qué fue lo más bonito que hiciste en nuestra relación?`,
    options: [
      `Que intentaras confiar en mí y pensar que te quiero a pesar de haberme portado tan mal, gracias por haberme aguantado y consentido tanto.`,
      `Desnudarte y pedirme la mano detrás de la puerta mientras yo estaba en la habitación hablando con mi “amigo” que me decía que me fuera de tu casa, le dije: “but i love him…” no quería irme ni hacerte daño, pero me obligaron.`,
      `Acariciarme mientras me leían cuentos que te inventabas para mi cuando estábamos en la cama.`,
      `La rosa dulce que me regalaste para sorprenderme antes de hacerme el amor.`,
      `Cuando estábamos volviendo en el avión y no querías hablarme y escribiste una nota en el móvil: “avísame si se estrella el avión porque besarte sería lo último que haría en la vida.”.`,
      `Los poemas y canciones que te inventabas para mi mientras estábamos por París.`,
      `Las fotos que me hiciste en París, porque obviamente yo soy más bonita que todo eso.`,
    ],
  },
  {
    id: 17,
    text: `¿Qué es lo más dulce que me has visto hacer?`,
    options: [
      `Apoyar mi cabecita en ti.`,
      `Cogerte un pie y darte masajito cuando estás despertando.`,
      `Decirte cosas bajito, como en tu casa cuando preguntaste si quería sandía y te dije que no blasfemes shh 🍉❤️.`,
      `Llorar, porque llorar por algunas cosas demuestra que tienes sentimientos, aunque no sé yo si muchas cosas fueron reales, eres muy buena actriz, y por ejemplo un día cuando me pillaste el pie con la puerta porque quería consolarte cuando llorabas, y después estabas gritando en mi casa a las 3 de la mañana, porque “te habían quitado el caso”, en realidad sé que era “tu amigo”, y solo querías joderme, o probar mi carácter, qué sé yo, pero en fin que sabes hacerte la pobrecita muy bien, y bueno aunque sea una mentira tu corazón, era bonito pensar que realmente tenías sentimientos al verte llorar, aunque fueran lágrimas de cocodrila muchas veces, también recuerdo que te pusiste a llorar con la canción de la bien querida, de “el lado bueno”.`,
    ],
  },
  {
    id: 18,
    text: `¿Qué es lo más dulce que te he visto hacer?`,
    options: [
      `Una sandía.`,
      `Comprarme una tarte au citron.`,
      `Darme masajes en la espalda con besitos en la cama.`,
      `Consentirme, cantarme y escribirme poesías, aunque la mayoría son pendejadas, la verdad es que me encantaron todas y que me intentaste aguantar y perdonar muchas veces, siendo tan insoportable y mala como lo fuí contigo.`,
    ],
  },
  {
    id: 19,
    text: `¿Qué es lo más divertido que hice contigo?`,
    options: [
      `Dejarte sin dinero en París.`,
      `Sacar la cámara para grabarte cuando me subías un poco la voz, cuando yo te hablaba fatal todo el tiempo, como cuando me dijiste que si me gustaba el tipo del hotel o algo así, te tengo grabado jaja`,
      `Hacerte pedir un “café oleeeeeeeeeee” en francés.`,
      `Todas las anteriores.`,
    ],
  },
  {
    id: 20,
    text: `¿Cuál fue la situación más embarazosa por la que te hice pasar?`,
    options: [
      `Cuando te hice pedir el café olé, aunque podías haberlo hecho mejor.`,
      `Ser maleducada con los camareros cuando íbamos a los bares, criticar a los españoles, o preguntar por Camila a la camarera.`,
      `Cuando llegamos a París y quería que pasáramos por donde el equipo de los atletas en el aeropuerto para que nos dieran un pase vip.`,
      `Cuando te puse en el compromiso de casarte conmigo para ayudarme a que me dieran los papeles, en serio te hubieses casado conmigo después de lo mala que fui contigo ? que idiota.`,
    ],
  },
  {
    id: 21,
    text: `¿Qué canción no puedo escuchar sin acordarme de tí?`,
    options: [
      `La que sonaba cuando íbamos en un uber, y decía algo de besos de caramelo mientras me besabas y me comía un chupachups.`,
      `Baby sabes que tu eres mi gata, extrañarte y to eso me mata.`,
      `si no lo veo no creo, el 50cent europeo.`,
      `la de tiroteo de marc seguí porque una vez me dijiste que te gustaba y me la mandaste.`,
      `no me acuerdo de ti, pero cuando tu escuches la de perfidia te vas a acordar de mi.`,
    ],
  },
  {
    id: 22,
    text: `¿Qué fue lo más fortuito que pasó mientras estábamos juntos?`,
    options: [
      `Que aparezcan los novios en la torre montparnasse justo después de nosotros hacernos la foto en el cartel de “Love”.`,
      `Lo del rotulador morado que te encontraste justo al salir a la calle después de decirme (o más bien decirle a la puerta porque yo no estaba) como me ibas a pintar en el cuerpo un vestido de novia de color morado con dibujos de flores, y más cosas. No estábamos juntos porque yo no estaba, pero tuvo que ser bastante impresionante para tí.`,
      `En un taxi cuando me estaba comiendo creo que una piruleta, o no recuerdo bien, pero me diste un beso y la canción que estaba puesta justo dijo “besos de caramelo”, o algo así.`,
      `La noche que estabas fumando y te dije que no me gustaba y me diste la yerba, dijiste que se te cayeron las zapatillas cuando una canción decía zapatillas, y que momo dices que te mordió en el cuello cuando estabas escuchando la canción de morderte de la bien querida y decía “morderte la piel”, además después te deje pillada la zapatilla en la puerta jiji se podría decir que la canción te advirtió de mi.`,
    ],
  },
  {
    id: 23,
    text: `Después de haberte conocido y todas las cosas que pasaron, ¿creo un poco más en el destino o en la magia?`,
    options: [
      `Sí, y además porque eres un encanto.`,
      `Por supuesto que no y tampoco creo en fantasmas, estas loco.`,
      `Wingardium Leviosa.`,
    ],
  },
  {
    id: 24,
    text: `¿Qué fue lo más inmaduro que hiciste?`,
    options: [
      `Subirte a un tejado con esta angulación: ^ de un edificio de 7 pisos cuando tenías 12 años.`,
      `Tocarle el culo a una chica en una fiesta y provocar una pelea multitudinaria por eso.`,
      `Pasar al lado de una chica con la bici a gran velocidad y sin querer, por querer rozarla, incrustarla el manillar en el qlo, e irte sin disculparte porque te daba vergüenza hacerlo.`,
      `Fallarme a mi y mi familia al no dejar de fumar porros ni tabaco después de prometerlo varias veces.`,
      `Todas las respuestas son correctas.`,
    ],
  },
  {
    id: 25,
    text: `¿Qué fue lo más egoísta que hice?`,
    options: [
      `No darte un traguito de mi Coca-Cola en París cuando venías cansado y con sed.`,
      `Llevarte a París de fotógrafo personal no remunerado y cajero automático.`,
      `Hacerte creer que teníamos futuro solo porque me dejaba leer cuentos por las noches.`,
      `Hacer que te detenga la policía después de todo lo que habías hecho por mi.`,
    ],
  },
  {
    id: 26,
    text: `¿Qué fue lo peor que te dije?`,
    options: [
      `Cuando llegamos al aeropuerto de París, decirte que parecías un perro rabioso con la baba cayendo.`,
      `Cuando te dije que como no eras alguien importante como Napoleon, no me importaba lo que dijeras.`,
      `Decirte bromeando que ojalá que tú padre le entrase un cáncer de testículos o algo así que te dije en tu casa.`,
    ],
  },
  {
    id: 27,
    text: `¿Qué cosas pienso que te gustan de mi pero no es así?`,
    options: [
      `Que ronco... seguro te da ternurita 😴.`,
      `Que te trate mal... seguro te pone cachondo 🙄.`,
      `Que soy capaz de meterte en la cárcel... en la cama creo que dijiste que querías eso no? 🙊`,
      `Todas las anteriores.`,
    ],
  },
  {
    id: 28,
    text: `¿Qué crees que fingí disfrutar?`,
    options: [
      `El hueso ese que me pedí en el restaurante francés, que asco.`,
      `Haber sido tan insoportable y mala contigo.`,
      `El sexo contigo, solo quería que me hicieras un bebe por interés.`,
    ],
  },
  {
    id: 29,
    text: `¿Qué es lo que más te empananoyo de lo que hice?`,
    options: [
      `Cuando sonó algo en tu maleta como de un walkitalki o no sé, y luego cuando entraste preguntaste que si había sonado algo. Supongo que rallarme era un juego para tí, aunque no tengo una personalidad psicótica así que tampoco no me rallé demasiado por eso, simplemente pensé que querías rallarme.`,
      `Cuando me dijiste cosas que no podías saber si no me estuvieses viendo cuando no estabas en casa, porque puse algo en la lavadora 2 veces y luego lo saque y me dijiste de que tanto ponía la lavadora o algo así.`,
      `Cuando me dijiste lo de tu amigo que tenía esquizofrenia veía como patrones y luego empecé a verlos yo en las matrículas de los coches, no me creerás si no tienes nada que ver, pero bueno, hace un rato había dos matrículas iguales en los números aparcadas enfrente de mi, y me ha pasado varias veces que me dejan el 9999 enfrente de mi casa, el 1111 o así, en fin.`,
    ],
  },
  {
    id: 30,
    text: `¿Qué creo que nunca me perdonarás?`,
    options: [
      `Volver a poner momo con mayúscula.`,
      `El haberte tratado tan mal, haberte denunciado, y haberme aprovechado de tus padres e intentar hacerles daño también.`,
      `No haberte querido invitar a comer en París cuando te quedaste sin dinero y ni siquiera querer darte un traguito de mi CocaCola cuando viniste de caminar.`,
    ],
  },
  {
    id: 31,
    text: `¿Qué es lo que más te cuesta aceptar sobre mi?`,
    options: [
      `No entiendo que seas tan desalmada.`,
      `Que una chica que parecía tan tierna y me causaba tanta gracia, sea tan desconfiable y mala persona, es una desgracia y una gran decepción, y creo que nunca me debí encariñar ni ilusionar contigo.`,
      `Me duele aceptar que me usaste como si fuera un objeto, que solo quisiste aprovecharte de mí, que nunca te importé nada, supongo ni si quiera te gustaba, y la verdad, no puedo llegar a creérmelo del todo, a veces tengo dudas e incluso pienso que me extrañas, pero creo que es por una mezcla de ego, cariño, miedo, inocencia, o directamente idiotez porque tú no me inspiras mucha confianza, y no creo que sientas amor por mi, pues lo que has demostrado es indiferencia, y eso es justo lo contrario.`,
    ],
  },
  {
    id: 32,
    text: `¿Qué es lo que más me cuesta aceptar sobre ti?`,
    options: [
      `Que no te subiste conmigo a la torre Eiffel conmigo porque sigues queriendo a una mujer después de que hace tanto tiempo que te abandono. No entiendo porque sigues comprometido con ella, y me da rabia porque quería que fueras mi objeto sólo mío, no es que te quiera, es una cuestión de ego.`,
      `Me cuesta aceptar que amas a otra mujer, aunque sé que yo tambien me he colado en tu corazón y ocupo parte de él, me siento como una okupa sabes, porque aunque ya no estoy en tu casa, estoy en tu corazón y de allí no voy a salir, puedo aliviar el peso pero primero tendrás que pagarme así que puedes hacerlo con besos o tarjeta regalo para nuestro bebe.`,
      `Me cuesta aceptar que hayas tenido tantas facilidades y una familia que te quiere y no las hayas aprovechado porque pues no has hecho nada en la vida, dices que enamorarme ? no mames, no estoy enamorada si no me das ni pena.`,
      `Me cuesta aceptar que no fueras capaz de perdonarme cuando el último día que estuvimos juntos te dije: “podemos olvidarlo todo ?”, quería quedarme más tiempo contigo, pero tú quisiste echarme de tu casa y no me iba, y sin darme el dinero. Aunque entiendo que ya estabas muy harto de mi, ¿dónde se te quedó el amor debajo de esa capa de orgullo? En fin, no sabía cuanto tiempo me aguantarías siendo lo más insoportable posible, pero quería que fuera un poco más, me dolió que no me perdonarás una vez más y después como bien mala persona que soy decidí denunciarte otra vez por secuestrarme por cerrar la puerta cuando te fuiste y no dejarme la puerta abierta como a buena okupa psicópata que puede robarte cosas o hacerle algo a momo.`,
    ],
  },
  {
    id: 33,
    text: `¿Qué es lo más irónico de nuestra relación?`,
    options: [
      `Que me invitaras a París para después cobrármelo con creces.`,
      `Que aún tenga aprecio a alguien que se comporto tan mal conmigo.`,
      `Que te consintiera tantas cosas y quisiera ayudarte, cuando tu lo único que me demostrabas es que querías joderme, que estupido fuí.`,
      `Que acabará haciéndote el amor después de denunciarme y todo lo que me hiciste cuando antes me había resistido cuando viniste a mi casa o estuvimos en París. Aunque tiene su explicación lógica, porque llegué a pensar que a tí en realidad te dolió y que de alguna manera estabas obligada a hacerlo, pero supongo que fue lo que quise pensar y me equivoqué porque a ti nunca te importo hacerme daño, ni nuestra relación.`,
    ],
  },
  {
    id: 34,
    text: `¿Quien soy?`,
    options: [
      `Soy una espía como las de la peli de gorrión rojo que se infiltró en tu vida con la misión de joderte, pero te cogió cariño y ahora se arrepiente.`,
      `No te montes pelis, no eres tan importante, simplemente soy una mujer que conociste por casualidad, fingí ser tu amiga y tenerte cariño, pero en realidad nunca me importó eso y nunca me importo eso porque solo quería reírme y aprovecharme de ti, y no me siento culpable de nada.`,
      `Aranzazú en el país de las insoportables.`,
    ],
  },
  {
    id: 35,
    text: `¿Crees que nos merecemos el final que tuvimos?`,
    options: [
      `Odio que acabaramos tan mal, las dos última veces que te ví estabas gritando en un coche de policia que te llevo detenido porque perdiste los nervios con el hombre policia al que yo hablé mal de ti y dije que me habías secuestrado, y la última vez que te ví cuando pasaste a casa y te pusiste a mirar si te había robado algo, y después te metiste a la habitación… no sabes cuanto me dolió acabar tan mal contigo y quiero llorar y pedirte perdón, y pedirte que no dejemos que esto acabe así de mal.`,
      `Me alegro un montón del final que tuvimos y es justo lo que nos merecemos, tú te mereces las denuncias y la condenas que conllevan porque fuiste muy malo conmigo, ojalá entres en la cárcel, y yo me merezco verlo porque no me importas nada y siempre quise hacerte daño.`,
    ],
  },
  {
    id: 36,
    text: `¿Qué es lo más predecible de ti?`,
    options: [
      `Que puedes perdonarme una vez más porque eres idiota.`,
      `Que me ibas a escribir un mensaje largo. Larguísimo. Como este formulario.`,
      `Que ibas a darme el dinero que ya me diste la mitad, pero yo no quería solo el dinero, quería joderte lo máximo posible y pues le saque más dinero a tus padres asíque salí ganando, solo me importa el dinero.`,
      `Todas son correctas.`,
    ],
  },
  {
    id: 37,
    text: `¿Qué es lo más predecible de mi?`,
    options: [
      `Que me duerma a los 2 minutos de acostarme.`,
      `Que voy a volver a decir sarandungear aunque suene fatal.`,
      `Que no te quiero, es obvio, deja ya de deshojar flores.`,
    ],
  },
  {
    id: 38,
    text: `¿Qué creo que aprenderás de nuestra relación?`,
    options: [
      `Que siempre hay un lado bueno de las cosas aunque a veces cueste verlo, la luz puede surgir de los lugares más oscuros e inesperados, aunque a veces se oculte y no sepamos distinguirla.`,
      `A no volver a ver luz en la sonrisa de una mujer que adentro solo esconde tinieblas.`,
      `A no fiarse nunca de las mujeres que se duermen rápido, y bueno, a no fiarse en general tan fácilmente de las personas en general, y consentir cosas que no se merecen.`,
    ],
  },
  {
    id: 39,
    text: `¿Qué cosa crees tú que me gustaría más que hicieras?`,
    options: [
      `Subirte conmigo a la torre eiffel.`,
      `Comprarme un ferrari.`,
      `Aprender a conducir para irte a la mierda en coche.`,
    ],
  },
  {
    id: 40,
    text: `¿Qué cosa creo yo que te gustaría más que hiciera?`,
    options: [
      `Encerrarte en mi mazmorra.`,
      `Ir a pedirte perdón y rogarte que me vuelvas a dejar pasar a tu vida.`,
      `Comerme un chili tan picante que se convierte en fuego y me queme por dentro purificando la maldad en mi a la vez que ilumina mi oscuro corazón.`,
    ],
  },
  {
    id: 41,
    text: `Si te diesen las opciones de no haberme conocido o conocerme otra vez de nuevo, ¿qué elegirías?`,
    options: [
      `Preferiría no haberte conocido así no me hubieses jodido.`,
      `Conocerte otra vez para que me vuelvas a joder, aunque estoy casi seguro que no vale la pena, pero igualmente, eleguiría conocerte aunque no sé bien por qué, supongo que tendría que pensarlo más o que me gusta correr riesgos, pero supongo que con el tiempo tendré más y más claro que no valió la pena.`,
    ],
  },
  {
    id: 42,
    text: `¿Aun pienso en ti?`,
    options: [
      `No.`,
      `Creo que todos los días me acuerdo aunque sea una vez de tí.`,
      `Va a ser imposible olvidar ese horrible olor a pies.`,
    ],
  },
  {
    id: 43,
    text: `¿Qué es lo que más extrañas de mí?`,
    options: [
      `Tenerme en la cama.`,
      `La versión dulce de mi, antes de empezar a hacerme la insoportable.`,
      `Poder escuchar mi voz de niña buena y mi tierna risa.`,
      `Todas las anteriores son correctas.`,
    ],
  },
  {
    id: 44,
    text: `¿Qué es lo que más extraño de ti?`,
    options: [
      `Tus poemas y cosas dulces que me decías o hacías.`,
      `Tenerte cerca, te extraño mucho.`,
      `Poder fastidiarte indiscriminadamente y que me perdones.`,
      `Todas las anteriores son correctas.`,
    ],
  },
  {
    id: 45,
    text: `Si me cruzaras mañana por la calle, ¿qué harías?`,
    options: [
      `Hacer como que no existo.`,
      `Saludarme y después mandarme a la mierda.`,
    ],
  },
  {
    id: 46,
    text: `¿Cuando piensas olvidarme?`,
    options: [
      `No puedes, pero te gustaría recordarme de otra manera, porque hubieron cosas bonitas y luminosas pero la persona con la que las viviste (yo) no resultó ser una persona bonita ni luminosa, así que supongo que esos recuerdos conmigo irán perdiendo su falso color, conforme más tengas claro que yo no tengo luz y más me recuerdes como a una persona sin corazón que nunca le importaste.`,
      `Cuando tengas alzheimer pero yo te recordaré que te quiero, como en la pelí esa que vimos pero al revés.`,
      `Cuando vuelvas con Camila.`,
      `Cuando te tirés de la torre eiffel porque ninguna te quiere.`,
    ],
  },
  {
    id: 47,
    text: `Si pudiera decirte solo una, ¿cúal sería?`,
    options: [`Te quiero.`, `Perdóname.`, `Púdrete.`, `Princeso.`],
  },
  {
    id: 48,
    text: `Si pudieras susurrarme algo al oído ahora mismo, sin que yo supiera que fuiste tú, ¿qué sería?`,
    options: [
      `Soy como el viento y llego a ti en este momento para decirte lo que siento, y que cuando lo digo no miento.`,
      `Eres una ratita.`,
      `Soy tu conciencia y te recuerdo que eres una mala persona por lo que me hiciste.`,
    ],
  },
  {
    id: 49,
    text: `Si dentro de diez años sonara el timbre y fuera yo, ¿me abrirías?`,
    options: [
      `Sí, pero para decirte: “vete, olvidate mi nombre mi cara mi casa. y pega la vuelta”.`,
      `Te dejaría en la puerta un rato, después te dejaría pasar un rato pero no creo que quisiera amistad ni nada después de 10 años, es mucho tiempo para estar callada y volver de golpe, aunque no sé, si volviera Camila, la abría la puerta y no la dejaría volver a irse nunca.`,
      `No lo sé.`,
    ],
  },
  {
    // Hay que estar loca para entrar al código a buscar este comentario,
    // así que si lees esto, ya somos dos locos,
    // podemos hacer el amor como locos.
    id: 50,
    text: `Si el tiempo no existiera y solo existiera un momento conmigo, ¿qué habrías hecho conmigo que nunca te atreviste a hacer?`,
    options: [
      `Hubiese robado el anillo del louvre mientras dormías como en una pelí, después me hubiese subido contigo a la torre Eiffel y te hubiese dicho que eres la chica más bonita que había conocido en más de 10 años, y que aunque fueras insoportable, me estaba enamorando de ti. Después hubiera intentado besarte y cuando me cacheteáras te daría el anillo para verte sonreír.`,
      `Estaría sentado en el avión, esperando llegar a mi casa y que el momento de estar a tu lado se acabe.`,
      `Creo que estaría esperando a que el momento se acabe, aunque la verdad, aún no lo tendría claro como para responder a la pregunta con la suficiente determinación.`,
    ],
  },
];

// El contenido es definitivo y está revisado palabra por palabra por el autor:
// se congela para que ningún código pueda modificarlo en tiempo de ejecución.
QUESTIONS.forEach(Object.freeze);
Object.freeze(QUESTIONS);
