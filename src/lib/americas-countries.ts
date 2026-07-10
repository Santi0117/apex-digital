export type CountryId =
  | "CA"
  | "US"
  | "MX"
  | "GT"
  | "BZ"
  | "HN"
  | "SV"
  | "NI"
  | "CR"
  | "PA"
  | "CU"
  | "DO"
  | "HT"
  | "JM"
  | "CO"
  | "VE"
  | "GY"
  | "SR"
  | "EC"
  | "PE"
  | "BR"
  | "BO"
  | "PY"
  | "UY"
  | "AR"
  | "CL";

export type CountryInfo = {
  id: CountryId;
  name: string;
  path: string;
  capital: string;
  population: string;
};

/**
 * Mapa estilizado de América (proyección aproximada).
 * viewBox: 0 0 520 720
 */
export const americasCountries: CountryInfo[] = [
  {
    id: "CA",
    name: "Canadá",
    path: "M95 28 L145 18 L210 22 L265 35 L300 55 L310 85 L295 105 L270 95 L245 110 L220 100 L195 115 L165 105 L140 120 L115 110 L95 90 L80 70 L88 45 Z M300 40 L340 48 L355 70 L340 85 L315 75 Z",
    capital: "Ottawa",
    population: "40M+",
  },
  {
    id: "US",
    name: "Estados Unidos",
    path: "M80 110 L140 100 L195 108 L245 100 L280 108 L305 125 L300 155 L285 175 L250 185 L210 180 L175 190 L140 185 L110 175 L90 155 L85 130 Z M55 145 L72 140 L78 160 L62 168 Z",
    capital: "Washington D.C.",
    population: "330M+",
  },
  {
    id: "MX",
    name: "México",
    path: "M95 185 L140 180 L175 185 L200 200 L210 225 L195 250 L170 265 L145 255 L125 270 L105 255 L95 230 L100 205 Z",
    capital: "Ciudad de México",
    population: "130M+",
  },
  {
    id: "GT",
    name: "Guatemala",
    path: "M148 268 L168 265 L175 280 L160 288 L148 280 Z",
    capital: "Ciudad de Guatemala",
    population: "18M+",
  },
  {
    id: "BZ",
    name: "Belice",
    path: "M168 262 L178 260 L180 275 L170 278 Z",
    capital: "Belmopán",
    population: "400k+",
  },
  {
    id: "HN",
    name: "Honduras",
    path: "M170 280 L195 278 L200 292 L175 298 L168 288 Z",
    capital: "Tegucigalpa",
    population: "10M+",
  },
  {
    id: "SV",
    name: "El Salvador",
    path: "M155 288 L170 286 L172 298 L158 300 Z",
    capital: "San Salvador",
    population: "6M+",
  },
  {
    id: "NI",
    name: "Nicaragua",
    path: "M168 298 L198 295 L205 320 L175 325 L165 310 Z",
    capital: "Managua",
    population: "7M+",
  },
  {
    id: "CR",
    name: "Costa Rica",
    path: "M170 325 L200 322 L208 340 L185 348 L168 338 Z",
    capital: "San José",
    population: "5M+",
  },
  {
    id: "PA",
    name: "Panamá",
    path: "M200 340 L235 345 L250 360 L230 368 L205 355 Z",
    capital: "Ciudad de Panamá",
    population: "4M+",
  },
  {
    id: "CU",
    name: "Cuba",
    path: "M210 250 L265 245 L280 255 L255 265 L215 262 Z",
    capital: "La Habana",
    population: "11M+",
  },
  {
    id: "DO",
    name: "Rep. Dominicana",
    path: "M285 268 L310 265 L315 280 L290 282 Z",
    capital: "Santo Domingo",
    population: "11M+",
  },
  {
    id: "HT",
    name: "Haití",
    path: "M268 268 L285 266 L288 280 L270 282 Z",
    capital: "Puerto Príncipe",
    population: "11M+",
  },
  {
    id: "JM",
    name: "Jamaica",
    path: "M240 278 L258 276 L260 286 L242 288 Z",
    capital: "Kingston",
    population: "3M+",
  },
  {
    id: "CO",
    name: "Colombia",
    path: "M230 365 L270 360 L295 385 L290 430 L255 445 L230 420 L220 390 Z",
    capital: "Bogotá",
    population: "52M+",
  },
  {
    id: "VE",
    name: "Venezuela",
    path: "M270 355 L330 350 L350 375 L340 400 L300 410 L275 390 Z",
    capital: "Caracas",
    population: "28M+",
  },
  {
    id: "GY",
    name: "Guyana",
    path: "M340 375 L365 370 L370 400 L350 410 L340 395 Z",
    capital: "Georgetown",
    population: "800k+",
  },
  {
    id: "SR",
    name: "Surinam",
    path: "M365 372 L385 370 L388 395 L370 400 Z",
    capital: "Paramaribo",
    population: "600k+",
  },
  {
    id: "EC",
    name: "Ecuador",
    path: "M200 420 L230 415 L240 450 L215 460 L195 445 Z",
    capital: "Quito",
    population: "18M+",
  },
  {
    id: "PE",
    name: "Perú",
    path: "M195 450 L240 445 L255 490 L250 540 L215 555 L185 520 L180 480 Z",
    capital: "Lima",
    population: "34M+",
  },
  {
    id: "BR",
    name: "Brasil",
    path: "M290 410 L350 405 L390 395 L430 420 L450 470 L445 530 L420 580 L380 600 L330 590 L295 550 L270 500 L255 460 L270 430 Z",
    capital: "Brasilia",
    population: "215M+",
  },
  {
    id: "BO",
    name: "Bolivia",
    path: "M255 500 L295 495 L320 530 L310 565 L270 570 L250 540 Z",
    capital: "Sucre",
    population: "12M+",
  },
  {
    id: "PY",
    name: "Paraguay",
    path: "M310 560 L345 555 L355 590 L330 600 L310 585 Z",
    capital: "Asunción",
    population: "7M+",
  },
  {
    id: "UY",
    name: "Uruguay",
    path: "M345 620 L375 615 L380 645 L355 650 Z",
    capital: "Montevideo",
    population: "3M+",
  },
  {
    id: "AR",
    name: "Argentina",
    path: "M300 575 L345 570 L375 600 L380 650 L360 690 L330 700 L305 670 L290 630 L295 595 Z",
    capital: "Buenos Aires",
    population: "46M+",
  },
  {
    id: "CL",
    name: "Chile",
    path: "M250 555 L275 550 L285 600 L280 650 L270 690 L255 700 L245 660 L240 610 L245 575 Z",
    capital: "Santiago",
    population: "19M+",
  },
];

export const defaultCountry =
  americasCountries.find((country) => country.id === "CR")!;
