"use client";

import { useLanguage } from "@/lib/i18n/language-provider";
import styles from "./ServicesMarquee.module.css";

export default function ServicesMarquee() {
  const { locale, copy } = useLanguage();
  const items = copy.marquee.items;
  const loop = [...items, ...items];

  return (
    <section aria-label={copy.marquee.ariaLabel} className={styles.section}>
      <div className={styles.fadeLeft} aria-hidden />
      <div className={styles.fadeRight} aria-hidden />

      <div className={styles.viewport}>
        <div key={locale} className={styles.track} aria-hidden>
          {loop.map((item, index) => (
            <span key={`${item}-${index}`} className={styles.item}>
              <span className={styles.label}>{item}</span>
              <span className={styles.dot} aria-hidden />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
