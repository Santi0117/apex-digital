export type PhoneCountryCode = {
  value: string;
  code: string;
  country: string;
  flag: string;
};

/** Códigos de llamada de América. Costa Rica primero por defecto. */
export const americasPhoneCodes: PhoneCountryCode[] = [
  { value: "+506", code: "+506", country: "Costa Rica", flag: "🇨🇷" },
  { value: "+1-US", code: "+1", country: "Estados Unidos / Canadá", flag: "🇺🇸" },
  { value: "+52", code: "+52", country: "México", flag: "🇲🇽" },
  { value: "+502", code: "+502", country: "Guatemala", flag: "🇬🇹" },
  { value: "+503", code: "+503", country: "El Salvador", flag: "🇸🇻" },
  { value: "+504", code: "+504", country: "Honduras", flag: "🇭🇳" },
  { value: "+505", code: "+505", country: "Nicaragua", flag: "🇳🇮" },
  { value: "+507", code: "+507", country: "Panamá", flag: "🇵🇦" },
  { value: "+501", code: "+501", country: "Belice", flag: "🇧🇿" },
  { value: "+54", code: "+54", country: "Argentina", flag: "🇦🇷" },
  { value: "+591", code: "+591", country: "Bolivia", flag: "🇧🇴" },
  { value: "+55", code: "+55", country: "Brasil", flag: "🇧🇷" },
  { value: "+56", code: "+56", country: "Chile", flag: "🇨🇱" },
  { value: "+57", code: "+57", country: "Colombia", flag: "🇨🇴" },
  { value: "+593", code: "+593", country: "Ecuador", flag: "🇪🇨" },
  { value: "+592", code: "+592", country: "Guyana", flag: "🇬🇾" },
  { value: "+595", code: "+595", country: "Paraguay", flag: "🇵🇾" },
  { value: "+51", code: "+51", country: "Perú", flag: "🇵🇪" },
  { value: "+597", code: "+597", country: "Surinam", flag: "🇸🇷" },
  { value: "+598", code: "+598", country: "Uruguay", flag: "🇺🇾" },
  { value: "+58", code: "+58", country: "Venezuela", flag: "🇻🇪" },
  { value: "+53", code: "+53", country: "Cuba", flag: "🇨🇺" },
  { value: "+1-DO", code: "+1", country: "Rep. Dominicana / Puerto Rico", flag: "🇩🇴" },
  { value: "+509", code: "+509", country: "Haití", flag: "🇭🇹" },
  { value: "+1-JM", code: "+1", country: "Jamaica", flag: "🇯🇲" },
  { value: "+1-TT", code: "+1", country: "Trinidad y Tobago", flag: "🇹🇹" },
  { value: "+1-BB", code: "+1", country: "Barbados", flag: "🇧🇧" },
  { value: "+1-BS", code: "+1", country: "Bahamas", flag: "🇧🇸" },
];

export function getDialCode(selectedValue: string): string {
  return americasPhoneCodes.find((item) => item.value === selectedValue)?.code ?? "+506";
}

export function formatPhoneWithCode(selectedValue: string, localNumber: string): string {
  const digits = localNumber.replace(/\D/g, "");
  return `${getDialCode(selectedValue)}${digits}`;
}
