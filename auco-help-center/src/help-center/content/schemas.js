import { z } from "zod";

const nonEmptyString = z.string().trim().min(1);
const absolutePublicPath = nonEmptyString.startsWith("/");

const faqSchema = z.object({
  id: z.number().int(),
  category: nonEmptyString,
  question: nonEmptyString,
  answer: nonEmptyString,
});

const videoSchema = z.object({
  id: z.number().int(),
  category: nonEmptyString,
  title: nonEmptyString,
  description: nonEmptyString,
  youtubeId: nonEmptyString.regex(/^[a-zA-Z0-9_-]{6,20}$/),
  duration: nonEmptyString,
});

const processStepSchema = z
  .object({
    step_number: z.number().int(),
    action: nonEmptyString,
    image: z.string().optional(),
    imageAlt: z.string().optional(),
  })
  .superRefine((step, ctx) => {
    if (typeof step.image === "string") {
      const trimmedImage = step.image.trim();
      if (trimmedImage.length > 0 && !trimmedImage.startsWith("/")) {
        ctx.addIssue({
          code: "custom",
          message: "image debe ser ruta absoluta desde /public",
          path: ["image"],
        });
      }
      if (trimmedImage.length > 0 && !nonEmptyString.safeParse(step.imageAlt).success) {
        ctx.addIssue({
          code: "custom",
          message: "imageAlt es obligatorio cuando image esta presente",
          path: ["imageAlt"],
        });
      }
    }
  });

const processSchema = z.object({
  slug: nonEmptyString.regex(/^[a-z0-9-]+$/),
  category: nonEmptyString,
  number: z.number().int(),
  title: nonEmptyString,
  description: nonEmptyString,
  tip: nonEmptyString,
  steps: z.array(processStepSchema),
});

const documentSchema = z.object({
  id: z.number().int(),
  category: nonEmptyString,
  title: nonEmptyString,
  description: nonEmptyString,
  lastUpdated: nonEmptyString,
  size: nonEmptyString,
  url: absolutePublicPath,
});

const eventSchema = z.object({
  id: z.number().int(),
  category: nonEmptyString,
  title: nonEmptyString,
  description: nonEmptyString,
  date: nonEmptyString.regex(/^\d{4}-\d{2}-\d{2}$/),
  time: nonEmptyString.regex(/^\d{2}:\d{2}$/),
  duration: nonEmptyString,
  instructor: nonEmptyString,
  capacity: z.number().int().positive(),
  registrationUrl: z.string().url(),
});

function addDuplicateIssues(values, ctx, { label, pathPrefix }) {
  const firstIndexByValue = new Map();
  values.forEach((value, index) => {
    if (firstIndexByValue.has(value)) {
      ctx.addIssue({
        code: "custom",
        message: `${label} duplicado: ${String(value)}`,
        path: [...pathPrefix(index)],
      });
      return;
    }
    firstIndexByValue.set(value, index);
  });
}

function addSequentialIssues(numbers, ctx, { label, pathPrefix }) {
  const sorted = [...numbers].sort((a, b) => a - b);
  sorted.forEach((value, index) => {
    if (value !== index + 1) {
      const originalIndex = numbers.findIndex((n) => n === value);
      ctx.addIssue({
        code: "custom",
        message: `${label} debe ser secuencial iniciando en 1 (valor invalido: ${value})`,
        path: [...pathPrefix(originalIndex >= 0 ? originalIndex : 0)],
      });
    }
  });
}

export const helpCenterContentSchema = z
  .object({
    faqs: z.array(faqSchema),
    videos: z.array(videoSchema),
    processes: z.array(processSchema),
    documents: z.array(documentSchema),
    events: z.array(eventSchema),
  })
  .superRefine((data, ctx) => {
    addDuplicateIssues(
      data.faqs.map((item) => item.id),
      ctx,
      {
        label: "FAQ id",
        pathPrefix: (index) => ["faqs", index, "id"],
      }
    );

    addDuplicateIssues(
      data.videos.map((item) => item.id),
      ctx,
      {
        label: "Video id",
        pathPrefix: (index) => ["videos", index, "id"],
      }
    );

    addDuplicateIssues(
      data.documents.map((item) => item.id),
      ctx,
      {
        label: "Documento id",
        pathPrefix: (index) => ["documents", index, "id"],
      }
    );

    addDuplicateIssues(
      data.events.map((item) => item.id),
      ctx,
      {
        label: "Evento id",
        pathPrefix: (index) => ["events", index, "id"],
      }
    );

    const processSlugs = data.processes.map((process) => process.slug);
    const processNumbers = data.processes.map((process) => process.number);

    addDuplicateIssues(processSlugs, ctx, {
      label: "Proceso slug",
      pathPrefix: (index) => ["processes", index, "slug"],
    });

    addDuplicateIssues(processNumbers, ctx, {
      label: "Proceso number",
      pathPrefix: (index) => ["processes", index, "number"],
    });

    addSequentialIssues(processNumbers, ctx, {
      label: "Proceso number",
      pathPrefix: (index) => ["processes", index, "number"],
    });

    data.processes.forEach((process, processIndex) => {
      const stepNumbers = process.steps.map((step) => step.step_number);

      addDuplicateIssues(stepNumbers, ctx, {
        label: `step_number en proceso ${process.slug}`,
        pathPrefix: (stepIndex) => ["processes", processIndex, "steps", stepIndex, "step_number"],
      });

      addSequentialIssues(stepNumbers, ctx, {
        label: `step_number en proceso ${process.slug}`,
        pathPrefix: (stepIndex) => ["processes", processIndex, "steps", stepIndex, "step_number"],
      });
    });
  });
