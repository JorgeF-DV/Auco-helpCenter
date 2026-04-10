function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(`[HelpCenterContent] ${message}`);
  }
}

function assertUnique(values, label) {
  const seen = new Set();
  values.forEach((value) => {
    assert(!seen.has(value), `${label} duplicado: ${String(value)}`);
    seen.add(value);
  });
}

function assertSequential(numbers, label) {
  const sorted = [...numbers].sort((a, b) => a - b);
  sorted.forEach((value, index) => {
    assert(value === index + 1, `${label} debe ser secuencial iniciando en 1 (valor invalido: ${value})`);
  });
}

function validateFaqs(faqs) {
  assert(Array.isArray(faqs), "faqs.json debe exportar un arreglo");

  const ids = [];

  faqs.forEach((faq, index) => {
    assert(typeof faq === "object" && faq !== null, `FAQ #${index + 1} debe ser objeto`);
    assert(Number.isInteger(faq.id), `FAQ #${index + 1} debe tener id entero`);
    assert(isNonEmptyString(faq.category), `FAQ #${index + 1} debe tener category no vacio`);
    assert(isNonEmptyString(faq.question), `FAQ #${index + 1} debe tener question no vacio`);
    assert(isNonEmptyString(faq.answer), `FAQ #${index + 1} debe tener answer no vacio`);
    ids.push(faq.id);
  });

  assertUnique(ids, "FAQ id");
}

function validateVideos(videos) {
  assert(Array.isArray(videos), "videos.json debe exportar un arreglo");

  const ids = [];

  videos.forEach((video, index) => {
    assert(typeof video === "object" && video !== null, `Video #${index + 1} debe ser objeto`);
    assert(Number.isInteger(video.id), `Video #${index + 1} debe tener id entero`);
    assert(isNonEmptyString(video.category), `Video #${index + 1} debe tener category no vacio`);
    assert(isNonEmptyString(video.title), `Video #${index + 1} debe tener title no vacio`);
    assert(isNonEmptyString(video.description), `Video #${index + 1} debe tener description no vacio`);
    assert(isNonEmptyString(video.youtubeId), `Video #${index + 1} debe tener youtubeId no vacio`);
    assert(/^[a-zA-Z0-9_-]{6,20}$/.test(video.youtubeId), `Video #${index + 1} tiene youtubeId con formato invalido`);
    assert(isNonEmptyString(video.duration), `Video #${index + 1} debe tener duration no vacio`);
    ids.push(video.id);
  });

  assertUnique(ids, "Video id");
}

function validateProcesses(processes) {
  assert(Array.isArray(processes), "processes.json debe exportar un arreglo");

  const slugs = [];
  const numbers = [];

  processes.forEach((process, processIndex) => {
    assert(typeof process === "object" && process !== null, `Proceso #${processIndex + 1} debe ser objeto`);
    assert(isNonEmptyString(process.slug), `Proceso #${processIndex + 1} debe tener slug no vacio`);
    assert(/^[a-z0-9-]+$/.test(process.slug), `Proceso #${processIndex + 1} tiene slug invalido (usa minusculas, numeros y guiones)`);
    assert(isNonEmptyString(process.category), `Proceso #${processIndex + 1} debe tener category no vacio`);
    assert(Number.isInteger(process.number), `Proceso #${processIndex + 1} debe tener number entero`);
    assert(isNonEmptyString(process.title), `Proceso #${processIndex + 1} debe tener title no vacio`);
    assert(isNonEmptyString(process.description), `Proceso #${processIndex + 1} debe tener description no vacio`);
    assert(isNonEmptyString(process.tip), `Proceso #${processIndex + 1} debe tener tip no vacio`);
    assert(Array.isArray(process.steps), `Proceso #${processIndex + 1} debe tener steps como arreglo`);

    const stepNumbers = [];

    process.steps.forEach((step, stepIndex) => {
      const stepLabel = `Proceso "${process.slug}" paso #${stepIndex + 1}`;
      assert(typeof step === "object" && step !== null, `${stepLabel} debe ser objeto`);
      assert(Number.isInteger(step.step_number), `${stepLabel} debe tener step_number entero`);
      assert(isNonEmptyString(step.action), `${stepLabel} debe tener action no vacio`);
      stepNumbers.push(step.step_number);

      if (Object.prototype.hasOwnProperty.call(step, "image")) {
        assert(typeof step.image === "string", `${stepLabel} image debe ser string si existe`);
        if (step.image.trim().length > 0) {
          assert(step.image.startsWith("/"), `${stepLabel} image debe ser ruta absoluta desde /public`);
        }
      }
      if (Object.prototype.hasOwnProperty.call(step, "imageAlt")) {
        assert(typeof step.imageAlt === "string", `${stepLabel} imageAlt debe ser string si existe`);
      }
      if (Object.prototype.hasOwnProperty.call(step, "image") && isNonEmptyString(step.image)) {
        assert(isNonEmptyString(step.imageAlt), `${stepLabel} debe incluir imageAlt cuando image esta presente`);
      }
    });

    assertUnique(stepNumbers, `step_number en proceso ${process.slug}`);
    assertSequential(stepNumbers, `step_number en proceso ${process.slug}`);

    slugs.push(process.slug);
    numbers.push(process.number);
  });

  assertUnique(slugs, "Proceso slug");
  assertUnique(numbers, "Proceso number");
  assertSequential(numbers, "Proceso number");
}

function validateDocuments(documents) {
  assert(Array.isArray(documents), "documents.json debe exportar un arreglo");

  const ids = [];

  documents.forEach((document, index) => {
    assert(typeof document === "object" && document !== null, `Documento #${index + 1} debe ser objeto`);
    assert(Number.isInteger(document.id), `Documento #${index + 1} debe tener id entero`);
    assert(isNonEmptyString(document.category), `Documento #${index + 1} debe tener category no vacio`);
    assert(isNonEmptyString(document.title), `Documento #${index + 1} debe tener title no vacio`);
    assert(isNonEmptyString(document.description), `Documento #${index + 1} debe tener description no vacio`);
    assert(isNonEmptyString(document.lastUpdated), `Documento #${index + 1} debe tener lastUpdated no vacio`);
    assert(isNonEmptyString(document.size), `Documento #${index + 1} debe tener size no vacio`);
    assert(isNonEmptyString(document.url), `Documento #${index + 1} debe tener url no vacio`);
    assert(document.url.startsWith("/"), `Documento #${index + 1} url debe ser ruta absoluta desde /public`);
    ids.push(document.id);
  });

  assertUnique(ids, "Documento id");
}

function validateEvents(events) {
  assert(Array.isArray(events), "events.json debe exportar un arreglo");

  const ids = [];

  events.forEach((event, index) => {
    assert(typeof event === "object" && event !== null, `Evento #${index + 1} debe ser objeto`);
    assert(Number.isInteger(event.id), `Evento #${index + 1} debe tener id entero`);
    assert(isNonEmptyString(event.category), `Evento #${index + 1} debe tener category no vacio`);
    assert(isNonEmptyString(event.title), `Evento #${index + 1} debe tener title no vacio`);
    assert(isNonEmptyString(event.description), `Evento #${index + 1} debe tener description no vacio`);
    assert(isNonEmptyString(event.date), `Evento #${index + 1} debe tener date no vacio`);
    assert(/^\d{4}-\d{2}-\d{2}$/.test(event.date), `Evento #${index + 1} date tiene formato invalido (usa YYYY-MM-DD)`);
    assert(isNonEmptyString(event.time), `Evento #${index + 1} debe tener time no vacio`);
    assert(/^\d{2}:\d{2}$/.test(event.time), `Evento #${index + 1} time tiene formato invalido (usa HH:MM)`);
    assert(isNonEmptyString(event.duration), `Evento #${index + 1} debe tener duration no vacio`);
    assert(isNonEmptyString(event.instructor), `Evento #${index + 1} debe tener instructor no vacio`);
    assert(Number.isInteger(event.capacity) && event.capacity > 0, `Evento #${index + 1} debe tener capacity como entero positivo`);
    assert(isNonEmptyString(event.registrationUrl), `Evento #${index + 1} debe tener registrationUrl no vacio`);
    assert(event.registrationUrl.startsWith("http"), `Evento #${index + 1} registrationUrl debe ser URL valida`);
    ids.push(event.id);
  });

  assertUnique(ids, "Evento id");
}

export function validateHelpCenterContentData({ faqs, videos, processes, documents, events }) {
  validateFaqs(faqs);
  validateVideos(videos);
  validateProcesses(processes);
  validateDocuments(documents);
  validateEvents(events);
}
