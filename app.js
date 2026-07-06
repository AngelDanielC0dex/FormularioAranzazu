/**
 * app.js — Lógica del formulario "Cuestionario Aránzazu" (50 puertas).
 *
 * Flujo de datos:
 *   decoracion.js (IMAGENES_LATERALES) ──► columnas decorativas
 *   questions.js (QUESTIONS, congelado) ──► render del formulario
 *   interacción ──► autoguardado en localStorage (sobrevive recargas)
 *   submit ──► sonido de disparo ──► POST a Formspree (con timeout)
 *   éxito  ──► overlay "puerta 51" con animación y foco accesible
 *
 * Configuración: solo hace falta tocar FORMSPREE_ID (justo abajo).
 */

/* ============================================================
   CONFIGURACIÓN
   ============================================================ */

/**
 * ID del formulario en Formspree (https://formspree.io).
 * 1. Crea una cuenta gratuita y un formulario nuevo.
 * 2. Copia el identificador del endpoint (lo que va después de /f/).
 * 3. Pégalo aquí. Ejemplo: const FORMSPREE_ID = "xwkgzabc";
 *
 * Mientras siga siendo "TU_ID", el envío se simula en local para
 * poder probar la puerta 51 sin enviar nada real.
 */
const FORMSPREE_ID = "mlgyvbvb";

/** Milisegundos de espera máxima antes de dar el envío por fallido. */
const TIEMPO_MAXIMO_ENVIO_MS = 12000;

/** Clave del autoguardado de respuestas en localStorage. */
const CLAVE_DE_AUTOGUARDADO = "cuestionario-aranzazu";

/**
 * Sonido del disparo (~1 s), guardado en la raíz del proyecto.
 * Suena al pulsar el botón; como el clic es un gesto del usuario,
 * los navegadores permiten reproducirlo. Si el archivo aún no
 * existe, el .catch() evita cualquier error visible.
 */
const sonidoDisparo = new Audio("sonido.mp3");
sonidoDisparo.preload = "auto";

/* ============================================================
   ICONOS: corazón negro (sin marcar) y dorado (marcado)
   ============================================================ */

const SVG_CORAZON_NEGRO = `
  <svg class="icono--base" viewBox="0 0 34 34" aria-hidden="true">
    <path d="M17 29 C9 22 3 16 3 10.5 A7.5 7.5 0 0 1 17 7 A7.5 7.5 0 0 1 31 10.5 C31 16 25 22 17 29 Z" fill="#1c0f1f" stroke="#5f2167" stroke-width="1.6"/>
  </svg>`;

const SVG_CORAZON_DORADO = `
  <svg class="icono--marcado" viewBox="0 0 34 34" aria-hidden="true">
    <path d="M17 29 C9 22 3 16 3 10.5 A7.5 7.5 0 0 1 17 7 A7.5 7.5 0 0 1 31 10.5 C31 16 25 22 17 29 Z" fill="#f5b301" stroke="#c98f00" stroke-width="1.6"/>
    <circle cx="10.5" cy="11.5" r="2" fill="#ffffff" opacity="0.8"/>
  </svg>`;

/* ============================================================
   REFERENCIAS AL DOM
   ============================================================ */

const contenedorDePreguntas = document.getElementById("preguntas");
const formulario = document.getElementById("formulario");
const botonEnviar = document.getElementById("boton-enviar");
const estadoDeEnvio = document.getElementById("estado-envio");
const loaderDeEnvio = document.getElementById("loader-envio");
const overlayPuerta51 = document.getElementById("puerta51");

/** Evita que un doble clic (o doble Enter) dispare dos envíos. */
let envioEnCurso = false;

/* ============================================================
   RENDERIZADO DEL FORMULARIO
   ============================================================ */

/**
 * Construye el icono de selección de una opción: el corazón negro
 * y el dorado superpuestos. El CSS decide cuál es visible según
 * el estado :checked del radio que los precede.
 */
function crearIconoDeSeleccion() {
  const icono = document.createElement("span");
  icono.className = "icono";
  // Único innerHTML del proyecto: SVG estático definido aquí mismo,
  // nunca contenido dinámico, por lo que no hay riesgo de inyección.
  icono.innerHTML = SVG_CORAZON_NEGRO + SVG_CORAZON_DORADO;
  return icono;
}

/**
 * Crea una opción de respuesta completa: el label clicable con su
 * radio real (accesible por teclado), el icono y el texto.
 */
function crearOpcionDeRespuesta(pregunta, textoDeLaOpcion, indiceDeLaOpcion) {
  const idDelInput = `p${pregunta.id}_op${indiceDeLaOpcion + 1}`;

  const etiqueta = document.createElement("label");
  etiqueta.className = "answer";
  etiqueta.setAttribute("for", idDelInput);

  const radio = document.createElement("input");
  radio.type = "radio";
  radio.name = `pregunta-${pregunta.id}`;
  radio.id = idDelInput;
  radio.value = textoDeLaOpcion;

  const texto = document.createElement("span");
  texto.className = "answer__texto";
  texto.textContent = textoDeLaOpcion;

  etiqueta.append(radio, crearIconoDeSeleccion(), texto);
  return etiqueta;
}

/**
 * Crea el campo libre "Escribe tu respuesta:" que acompaña a todas
 * las preguntas. Es independiente de los radios: se puede responder
 * una cosa, la otra, ambas o ninguna.
 */
function crearCampoDeRespuestaLibre(pregunta) {
  const contenedor = document.createElement("div");
  contenedor.className = "respuesta-libre";

  const etiqueta = document.createElement("label");
  etiqueta.setAttribute("for", `p${pregunta.id}_libre`);
  etiqueta.textContent = "Escribe tu respuesta:";

  const areaDeTexto = document.createElement("textarea");
  areaDeTexto.id = `p${pregunta.id}_libre`;
  areaDeTexto.name = `pregunta-${pregunta.id}-libre`;
  areaDeTexto.rows = 1;
  areaDeTexto.placeholder = "…";

  contenedor.append(etiqueta, areaDeTexto);
  return contenedor;
}

/** Crea la tarjeta completa de una pregunta: enunciado + opciones + campo libre. */
function crearTarjetaDePregunta(pregunta) {
  const tarjeta = document.createElement("fieldset");
  tarjeta.className = "question";
  tarjeta.dataset.preguntaId = String(pregunta.id);

  const enunciado = document.createElement("legend");
  enunciado.className = "question__enunciado";

  const numero = document.createElement("span");
  numero.className = "question__numero";
  numero.textContent = `${pregunta.id}.`;

  // textContent (no innerHTML) para el enunciado: cero inyección posible.
  enunciado.append(numero, pregunta.text);
  tarjeta.appendChild(enunciado);

  pregunta.options.forEach((opcion, indice) => {
    tarjeta.appendChild(crearOpcionDeRespuesta(pregunta, opcion, indice));
  });

  tarjeta.appendChild(crearCampoDeRespuestaLibre(pregunta));
  return tarjeta;
}

/** Genera las 50 tarjetas en un fragmento y las inserta de una sola vez. */
function renderizarFormularioCompleto() {
  const fragmento = document.createDocumentFragment();
  QUESTIONS.forEach((pregunta) => {
    fragmento.appendChild(crearTarjetaDePregunta(pregunta));
  });
  contenedorDePreguntas.appendChild(fragmento);
}

/* ============================================================
   COLUMNAS LATERALES
   ============================================================ */

/** Crea una imagen decorativa que se autoelimina si su archivo falta. */
function crearImagenDecorativa(ruta, clase = "") {
  const imagen = document.createElement("img");
  if (clase) imagen.className = clase;
  imagen.src = ruta;
  imagen.alt = "";
  imagen.loading = "lazy";
  imagen.decoding = "async";
  imagen.addEventListener("error", () => imagen.remove());
  return imagen;
}

/**
 * Vuelca el surtido de decoracion.js en las dos columnas laterales,
 * con la pistolita de cierre al final (la derecha, espejada para
 * apuntar hacia el formulario).
 */
function renderizarColumnasLaterales() {
  if (typeof IMAGENES_LATERALES === "undefined") return;

  document.querySelectorAll(".lateral").forEach((columna) => {
    const lado = columna.classList.contains("lateral--izda") ? "izda" : "dcha";
    const fragmento = document.createDocumentFragment();

    IMAGENES_LATERALES[lado].forEach((ruta) => {
      fragmento.appendChild(crearImagenDecorativa(ruta));
    });
    fragmento.appendChild(
      crearImagenDecorativa(
        IMAGENES_LATERALES.cierre,
        lado === "dcha" ? "lateral__final lateral__final--espejada" : "lateral__final"
      )
    );

    columna.appendChild(fragmento);
  });
}

/**
 * Repite las imágenes decorativas de cada columna lateral hasta
 * cubrir la altura del formulario, para que acompañen el scroll
 * hasta la pregunta 50. Las repetidas heredan loading="lazy", así
 * que solo se descargan cuando se acercan al viewport.
 */
function rellenarColumnasLaterales() {
  const panelDelFormulario = document.querySelector(".formulario-panel");
  const alturaObjetivo = panelDelFormulario ? panelDelFormulario.offsetHeight : 0;

  document
    .querySelectorAll(".lateral")
    .forEach((columna) => {
      // En móvil la columna está oculta (display: none): no rellenar.
      if (columna.offsetParent === null) return;

      // La imagen de cierre (.lateral__final) no entra en el patrón
      // que se repite: debe aparecer una sola vez y al final del todo.
      const cierre = columna.querySelector(".lateral__final");
      const patron = Array.from(columna.children).filter(
        (elemento) => !elemento.classList.contains("lateral__final")
      );
      if (patron.length === 0) return;

      let indice = columna.children.length;
      // Tope de seguridad por si las alturas no son medibles todavía.
      let margenDeSeguridad = 300;

      while (columna.offsetHeight < alturaObjetivo && margenDeSeguridad > 0) {
        columna.appendChild(patron[indice % patron.length].cloneNode(true));
        indice += 1;
        margenDeSeguridad -= 1;
      }

      // Recolocar el cierre como último hijo, ya con la columna llena.
      if (cierre) columna.appendChild(cierre);
    });
}

/** Rellena de nuevo tras cargar imágenes o cambiar el tamaño de ventana. */
function conectarRellenoDeLaterales() {
  window.addEventListener("load", rellenarColumnasLaterales);

  let temporizadorDeRelleno = null;
  window.addEventListener("resize", () => {
    clearTimeout(temporizadorDeRelleno);
    temporizadorDeRelleno = setTimeout(rellenarColumnasLaterales, 200);
  });
}

/* ============================================================
   AUTOGUARDADO: las respuestas sobreviven a una recarga
   ============================================================ */

/**
 * Guarda en localStorage lo respondido hasta ahora. Envuelto en
 * try/catch: en modo privado o sin espacio simplemente no persiste,
 * sin romper nada.
 */
function guardarRespuestas() {
  try {
    const datos = {};
    QUESTIONS.forEach((pregunta) => {
      const opcionMarcada = formulario.querySelector(
        `input[name="pregunta-${pregunta.id}"]:checked`
      );
      const areaDeTexto = document.getElementById(`p${pregunta.id}_libre`);
      const textoLibre = areaDeTexto ? areaDeTexto.value : "";

      if (opcionMarcada || textoLibre) {
        datos[pregunta.id] = {
          opcion: opcionMarcada ? opcionMarcada.value : "",
          libre: textoLibre,
        };
      }
    });
    localStorage.setItem(CLAVE_DE_AUTOGUARDADO, JSON.stringify(datos));
  } catch {
    /* sin almacenamiento disponible: se sigue sin autoguardado */
  }
}

/** Repuebla el formulario con lo guardado en una visita anterior. */
function restaurarRespuestas() {
  let datos;
  try {
    datos = JSON.parse(localStorage.getItem(CLAVE_DE_AUTOGUARDADO) || "{}");
  } catch {
    return;
  }

  Object.entries(datos).forEach(([id, respuesta]) => {
    // Comparación por .value en bucle (no con selector de atributo:
    // las opciones llevan comillas y romperían el selector).
    formulario
      .querySelectorAll(`input[name="pregunta-${id}"]`)
      .forEach((radio) => {
        if (radio.value === respuesta.opcion) radio.checked = true;
      });

    const areaDeTexto = document.getElementById(`p${id}_libre`);
    if (areaDeTexto && respuesta.libre) {
      areaDeTexto.value = respuesta.libre;
      ajustarAlturaDeTextarea(areaDeTexto);
    }
  });
}

function borrarRespuestasGuardadas() {
  try {
    localStorage.removeItem(CLAVE_DE_AUTOGUARDADO);
  } catch {
    /* nada que borrar */
  }
}

/* ============================================================
   INTERACCIÓN: textareas autocrecientes y radios desmarcables
   ============================================================ */

/** Hace crecer el textarea con su contenido, sin barras de scroll internas. */
function ajustarAlturaDeTextarea(areaDeTexto) {
  areaDeTexto.style.height = "auto";
  areaDeTexto.style.height = `${areaDeTexto.scrollHeight}px`;
}

function conectarEventosDelFormulario() {
  let temporizadorDeGuardado = null;

  formulario.addEventListener("input", (evento) => {
    if (evento.target.matches("textarea")) {
      ajustarAlturaDeTextarea(evento.target);
      // Guardado con un pequeño respiro para no serializar por tecla.
      clearTimeout(temporizadorDeGuardado);
      temporizadorDeGuardado = setTimeout(guardarRespuestas, 400);
    }
  });

  formulario.addEventListener("change", guardarRespuestas);

  conectarDesmarcadoDeRadios();

  formulario.addEventListener("submit", gestionarEnvioDelFormulario);
}

/**
 * Permite desmarcar un corazón volviendo a pulsarlo (los radios
 * nativos no lo permiten). En pointerdown —antes de que el clic
 * cambie nada— se anota si esa opción ya estaba marcada; si el clic
 * cae sobre la misma, se desmarca.
 */
function conectarDesmarcadoDeRadios() {
  let radioQueYaEstabaMarcado = null;

  formulario.addEventListener("pointerdown", (evento) => {
    const opcion = evento.target.closest(".answer");
    const radio = opcion ? opcion.querySelector('input[type="radio"]') : null;
    radioQueYaEstabaMarcado = radio && radio.checked ? radio : null;
  });

  formulario.addEventListener("click", (evento) => {
    const opcion = evento.target.closest(".answer");
    const radio = opcion ? opcion.querySelector('input[type="radio"]') : null;

    if (radio && radio === radioQueYaEstabaMarcado) {
      radio.checked = false;
      guardarRespuestas();
    }
    radioQueYaEstabaMarcado = null;
  });
}

/* ============================================================
   ENVÍO
   ============================================================ */

/**
 * Recoge solo las preguntas respondidas, en un objeto legible tal
 * cual llegará al correo: "n. enunciado" → opción y/o texto libre.
 */
function serializarRespuestasRespondidas() {
  const respuestas = {};

  QUESTIONS.forEach((pregunta) => {
    const opcionMarcada = formulario.querySelector(
      `input[name="pregunta-${pregunta.id}"]:checked`
    );
    const areaDeTexto = document.getElementById(`p${pregunta.id}_libre`);
    const textoLibre = areaDeTexto ? areaDeTexto.value.trim() : "";

    if (!opcionMarcada && !textoLibre) return;

    const partes = [];
    if (opcionMarcada) partes.push(`Opción elegida: ${opcionMarcada.value}`);
    if (textoLibre) partes.push(`Respuesta escrita: ${textoLibre}`);
    respuestas[`${pregunta.id}. ${pregunta.text}`] = partes.join(" | ");
  });

  return respuestas;
}

/**
 * Envía las respuestas a Formspree. Aborta pasado el tiempo máximo
 * para que una red móvil colgada nunca deje el botón deshabilitado.
 */
async function enviarRespuestasAFormspree(respuestas) {
  const controlador = new AbortController();
  const temporizador = setTimeout(
    () => controlador.abort(),
    TIEMPO_MAXIMO_ENVIO_MS
  );

  try {
    const respuestaHttp = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: "POST",
      signal: controlador.signal,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: "Respuestas del formulario de las 50 puertas",
        "Puertas abiertas": `${Object.keys(respuestas).length}/50`,
        ...respuestas,
      }),
    });

    if (!respuestaHttp.ok) {
      throw new Error(`Estado HTTP ${respuestaHttp.status}`);
    }
  } finally {
    clearTimeout(temporizador);
  }
}

function mostrarErrorDeEnvio() {
  loaderDeEnvio.hidden = true;
  botonEnviar.disabled = false;
  envioEnCurso = false;
  estadoDeEnvio.classList.add("estado-envio--error");
  estadoDeEnvio.textContent =
    "No se pudo enviar. Revisa tu conexión y pulsa el botón otra vez: tus respuestas siguen aquí.";
}

async function gestionarEnvioDelFormulario(evento) {
  evento.preventDefault();

  if (envioEnCurso) return;

  // Honeypot: si un bot rellenó el campo invisible, fingimos éxito
  // sin enviar nada (el bot se va contento y el correo queda limpio).
  const honeypot = formulario.querySelector(".honeypot");
  if (honeypot && honeypot.value) {
    abrirPuerta51();
    return;
  }

  envioEnCurso = true;
  botonEnviar.disabled = true;
  estadoDeEnvio.classList.remove("estado-envio--error");
  estadoDeEnvio.textContent = "";
  loaderDeEnvio.hidden = false;

  // ¡Bang! El disparo suena mientras las respuestas salen de camino.
  sonidoDisparo.currentTime = 0;
  sonidoDisparo.play().catch(() => {});

  // Modo local: sin ID real se simula el éxito para probar la puerta.
  if (FORMSPREE_ID === "TU_ID") {
    console.warn(
      "FORMSPREE_ID sin configurar: envío simulado. Edita app.js para activar el envío real."
    );
    setTimeout(() => {
      loaderDeEnvio.hidden = true;
      borrarRespuestasGuardadas();
      abrirPuerta51();
    }, 900);
    return;
  }

  try {
    await enviarRespuestasAFormspree(serializarRespuestasRespondidas());
    loaderDeEnvio.hidden = true;
    borrarRespuestasGuardadas();
    abrirPuerta51();
  } catch (error) {
    console.error("Fallo al enviar el formulario:", error);
    mostrarErrorDeEnvio();
  }
}

/* ============================================================
   PUERTA 51
   ============================================================ */

/** Ritmo base del tecleo (ms por letra); se le suma un poco de azar. */
const RITMO_DE_TECLEO_MS = 34;

/** Pausa extra tras cada signo, como una mano que respira al puntuar. */
const PAUSAS_DE_PUNTUACION_MS = { ",": 260, ".": 460, '"': 140 };

/**
 * Prepara el efecto máquina de escribir y devuelve la función que lo
 * arranca. Cada letra se convierte YA en un <span> invisible: como
 * todas ocupan su sitio desde el principio, el párrafo nunca cambia
 * de altura ni baila. Al arrancar, las letras se revelan una a una
 * con un fundido suave (opacidad + desenfoque que se disipa) y ritmo
 * humano: velocidad ligeramente irregular y pausas en la puntuación.
 * Al terminar añade la clase "escrito" al overlay, la señal (en CSS)
 * para que brote la rosa.
 *
 * Con movimiento reducido no se teclea: deja el texto completo,
 * marca "escrito" al instante y devuelve una función vacía.
 */
function prepararTecleoDelMensaje() {
  const mensaje = overlayPuerta51.querySelector(".puerta51__mensaje");
  if (!mensaje) {
    overlayPuerta51.classList.add("escrito");
    return () => {};
  }

  // El HTML del mensaje tiene saltos e indentación: se normaliza a
  // espacios simples para teclearlo como una sola frase.
  const textoCompleto = mensaje.textContent.replace(/\s+/g, " ").trim();

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    mensaje.textContent = textoCompleto;
    overlayPuerta51.classList.add("escrito");
    return () => {};
  }

  mensaje.textContent = "";
  const letras = Array.from(textoCompleto, (caracter) => {
    const letra = document.createElement("span");
    letra.className = "letra";
    letra.textContent = caracter;
    mensaje.appendChild(letra);
    return letra;
  });

  const cursor = document.createElement("span");
  cursor.className = "cursor-tecleo";
  cursor.textContent = "▍";

  return function arrancarTecleo() {
    mensaje.prepend(cursor);
    let indice = 0;

    const escribirSiguiente = () => {
      if (indice >= letras.length) {
        cursor.remove();
        overlayPuerta51.classList.add("escrito");
        return;
      }

      const letra = letras[indice];
      letra.classList.add("letra--visible");
      letra.after(cursor); // el cursor viaja pegado a la última letra
      indice += 1;

      const pausaExtra = PAUSAS_DE_PUNTUACION_MS[letra.textContent] || 0;
      const ritmoHumano = RITMO_DE_TECLEO_MS + Math.random() * 45;
      setTimeout(escribirSiguiente, ritmoHumano + pausaExtra);
    };

    escribirSiguiente();
  };
}

function abrirPuerta51() {
  overlayPuerta51.hidden = false;
  document.body.style.overflow = "hidden";

  // El resto de la página queda inerte: ni el tabulador ni un lector
  // de pantalla pueden volver al formulario que hay detrás del overlay.
  document.querySelectorAll("body > header, body > main").forEach((zona) => {
    if ("inert" in zona) zona.inert = true;
  });

  // Mover el foco al diálogo: los lectores de pantalla anuncian el
  // final y el teclado no se queda atrapado detrás del overlay.
  overlayPuerta51.focus();

  // El mensaje se vacía ya, con el overlay recién pintado: si se
  // hiciera al empezar el tecleo, su fundido lo enseñaría a medias.
  const arrancarTecleo = prepararTecleoDelMensaje();

  // El tecleo espera a que la hoja TERMINE su animación de apertura
  // (animationend): si mañana cambia la duración en el CSS, el tipeo
  // sigue arrancando en el momento justo sin tocar nada aquí. El
  // setTimeout es solo la red de seguridad para cuando la animación
  // no llega a ejecutarse (p. ej. con movimiento reducido).
  let tecleoYaArrancado = false;
  const arrancarUnaSolaVez = () => {
    if (tecleoYaArrancado) return;
    tecleoYaArrancado = true;
    arrancarTecleo();
  };

  const hoja = document.getElementById("puerta51-hoja");
  if (hoja) {
    hoja.addEventListener("animationend", arrancarUnaSolaVez, { once: true });
  }
  setTimeout(arrancarUnaSolaVez, 3600);

  // Doble frame: garantiza que el overlay ya está pintado antes de
  // añadir la clase, para que la transición de apertura se vea.
  const siguienteFrame =
    typeof requestAnimationFrame === "function"
      ? requestAnimationFrame
      : (fn) => setTimeout(fn, 16);

  siguienteFrame(() => {
    siguienteFrame(() => {
      overlayPuerta51.classList.add("abierta");
    });
  });
}

/* ============================================================
   ARRANQUE
   ============================================================ */

// Las columnas decorativas no dependen de las preguntas.
renderizarColumnasLaterales();

if (typeof QUESTIONS === "undefined" || !Array.isArray(QUESTIONS)) {
  // questions.js no cargó: mejor un aviso claro que una página vacía.
  contenedorDePreguntas.textContent =
    "No se pudieron cargar las preguntas. Recarga la página.";
} else {
  renderizarFormularioCompleto();
  restaurarRespuestas();
  conectarEventosDelFormulario();
  rellenarColumnasLaterales();
  conectarRellenoDeLaterales();
}
