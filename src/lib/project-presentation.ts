import type { Locale } from "@/lib/i18n";

export const projectPageCopy = {
  en: {
    eyebrow: "Installed Projects",
    title: "840+ spaces\nbuilt for play",
    subtitle:
      "From Dubai to Stockholm, we build destinations where children move, discover, and return with their families.",
    filterAll: "All",
    filterByType: "Type",
    viewProject: "View Project",
    backToProjects: "Back to Projects",
    productsUsed: "Products Used",
    relatedProjects: "Related Projects",
    requestSimilar: "Request Something Similar",
    projectInfo: "Project Info",
    projectType: "Project Type",
    location: "Location",
    area: "Area",
    year: "Year",
    client: "Client",
    notFound: "Project not found.",
    requestIntro: "Hi, I'd like to discuss a similar project.",
    projectLabel: "Project",
    typeLabel: "Project type",
  },
  uk: {
    eyebrow: "Реалізовані проєкти",
    title: "840+ просторів\nдля гри",
    subtitle:
      "Від Дубаю до Стокгольма ми створюємо локації, куди діти хочуть повертатися разом із сім'ями.",
    filterAll: "Всі",
    filterByType: "Тип",
    viewProject: "Детальніше",
    backToProjects: "Назад до проєктів",
    productsUsed: "Використане обладнання",
    relatedProjects: "Схожі проєкти",
    requestSimilar: "Замовити подібне",
    projectInfo: "Інформація про проєкт",
    projectType: "Тип проєкту",
    location: "Локація",
    area: "Площа",
    year: "Рік",
    client: "Клієнт",
    notFound: "Проєкт не знайдено.",
    requestIntro: "Вітаю, хочу обговорити подібний проєкт.",
    projectLabel: "Проєкт",
    typeLabel: "Тип проєкту",
  },
  ru: {
    eyebrow: "Реализованные проекты",
    title: "840+ пространств\nдля игры",
    subtitle:
      "От Дубая до Стокгольма мы создаём места, куда дети и семьи хотят возвращаться снова.",
    filterAll: "Все",
    filterByType: "Тип",
    viewProject: "Подробнее",
    backToProjects: "Назад к проектам",
    productsUsed: "Использованное оборудование",
    relatedProjects: "Похожие проекты",
    requestSimilar: "Заказать похожее",
    projectInfo: "Информация о проекте",
    projectType: "Тип проекта",
    location: "Локация",
    area: "Площадь",
    year: "Год",
    client: "Клиент",
    notFound: "Проект не найден.",
    requestIntro: "Здравствуйте, хочу обсудить похожий проект.",
    projectLabel: "Проект",
    typeLabel: "Тип проекта",
  },
  pl: {
    eyebrow: "Zrealizowane projekty",
    title: "840+ przestrzeni\ndo zabawy",
    subtitle:
      "Od Dubaju po Sztokholm tworzymy miejsca, do których dzieci i rodziny chcą wracać.",
    filterAll: "Wszystkie",
    filterByType: "Typ",
    viewProject: "Zobacz projekt",
    backToProjects: "Wróć do projektów",
    productsUsed: "Użyte produkty",
    relatedProjects: "Podobne projekty",
    requestSimilar: "Zamów podobny",
    projectInfo: "Informacje o projekcie",
    projectType: "Typ projektu",
    location: "Lokalizacja",
    area: "Powierzchnia",
    year: "Rok",
    client: "Klient",
    notFound: "Nie znaleziono projektu.",
    requestIntro: "Dzień dobry, chciałbym omówić podobny projekt.",
    projectLabel: "Projekt",
    typeLabel: "Typ projektu",
  },
} as const;

export function inferProjectThemeColor(projectType: string) {
  const normalized = projectType.toLowerCase();

  if (
    normalized.includes("outdoor") ||
    normalized.includes("вулич") ||
    normalized.includes("plac")
  ) {
    return "#0055FF";
  }

  if (normalized.includes("soft")) {
    return "#FF1493";
  }

  if (normalized.includes("premium")) {
    return "#141210";
  }

  return "#FF4500";
}

export type ProjectPageCopy = (typeof projectPageCopy)[Locale];
