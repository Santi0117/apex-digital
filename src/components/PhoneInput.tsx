import { americasPhoneCodes } from "@/lib/americas-phone-codes";

type PhoneInputProps = {
  countryValue: string;
  onCountryChange: (value: string) => void;
  phone: string;
  onPhoneChange: (value: string) => void;
  label: string;
  placeholder: string;
  required?: boolean;
};

const fieldBase =
  "text-sm rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/80 text-neutral-900 dark:text-neutral-100 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all duration-200";

export default function PhoneInput({
  countryValue,
  onCountryChange,
  phone,
  onPhoneChange,
  label,
  placeholder,
  required = true,
}: PhoneInputProps) {
  const selectedCountry = americasPhoneCodes.find((item) => item.value === countryValue);

  return (
    <div>
      <label className="block text-xs font-medium text-neutral-500 mb-1.5">{label}</label>
      <div className="grid grid-cols-[5.75rem_minmax(0,1fr)] sm:grid-cols-[6.25rem_minmax(0,1fr)] gap-2">
        <select
          value={countryValue}
          onChange={(e) => onCountryChange(e.target.value)}
          className={`${fieldBase} h-[46px] w-full min-w-0 px-1 sm:px-1.5 text-xs sm:text-sm appearance-none cursor-pointer truncate`}
          aria-label={`${label} — ${selectedCountry?.country ?? countryValue}`}
        >
          {americasPhoneCodes.map((item) => (
            <option key={item.value} value={item.value} title={item.country}>
              {item.flag} {item.code}
            </option>
          ))}
        </select>
        <input
          type="tel"
          required={required}
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
          placeholder={placeholder}
          className={`${fieldBase} h-[46px] w-full min-w-0 px-3 sm:px-4 placeholder:text-neutral-400 dark:placeholder:text-neutral-500`}
        />
      </div>
    </div>
  );
}
