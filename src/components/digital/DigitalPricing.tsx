"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import ScrollReveal from "@/components/ScrollReveal";
import {
  digitalPlans,
  type DigitalPlanGroupKey,
} from "@/lib/digital";
import PayMonthlySheet, {
  type PayMonthlySelection,
} from "./PayMonthlySheet";
import "./DigitalPricing.css";

const GROUP_KEYS = ["web", "shop", "software", "mobile"] as const;
const EASE = [0.22, 1, 0.36, 1] as const;

type Plan = (typeof digitalPlans.groups)[DigitalPlanGroupKey]["plans"][number];

function PlanCard({
  plan,
  planId,
  index,
  reduce,
  open,
  onToggle,
  onPay,
}: {
  plan: Plan;
  planId: string;
  index: number;
  reduce: boolean | null;
  open: boolean;
  onToggle: () => void;
  onPay: () => void;
}) {
  const panelId = useId();
  const hot = "highlighted" in plan && plan.highlighted;

  return (
    <motion.article
      className={`od-plans-card${hot ? " is-hot" : ""}`}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: reduce ? 0 : index * 0.08,
        ease: EASE,
      }}
    >
      <header className="od-plans-card-top">
        <div className="od-plans-card-meta">
          <span className="od-plans-card-index" aria-hidden>
            {String(index + 1).padStart(2, "0")}
          </span>
          {hot ? (
            <span className="od-plans-badge">{digitalPlans.mostChosen}</span>
          ) : null}
        </div>
        <h3>{plan.name}</h3>
        <p className="od-plans-tagline">{plan.tagline}</p>
      </header>

      <div className="od-plans-card-price">
        <p className="od-plans-amount">
          <span className="od-plans-usd">{plan.price}</span>
          <span className="od-plans-period">{digitalPlans.period}</span>
        </p>
        {"priceAlt" in plan && plan.priceAlt ? (
          <p className="od-plans-alt">{plan.priceAlt}</p>
        ) : null}
        {"priceFull" in plan && plan.priceFull ? (
          <p className="od-plans-amount od-plans-amount--once">
            <span className="od-plans-usd">{plan.priceFull}</span>
            <span className="od-plans-period">{digitalPlans.onceLabel}</span>
          </p>
        ) : null}
      </div>

      <div className="od-plans-includes">
        <button
          type="button"
          className={`od-plans-includes-btn${open ? " is-open" : ""}`}
          aria-expanded={open}
          aria-controls={panelId}
          data-plan={planId}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggle();
          }}
        >
          <span>Qué incluye</span>
          <span className="od-plans-includes-chevron" aria-hidden>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2.5 4.5 6 8l3.5-3.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              id={panelId}
              className="od-plans-includes-panel"
              initial={reduce ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduce ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <ul className="od-plans-features">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <span className="od-plans-mark" aria-hidden />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="od-plans-actions">
        <button type="button" className="od-plans-pay" onClick={onPay}>
          <span className="od-plans-pay-icon" aria-hidden>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 11L11 3M11 3H5M11 3v6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span>{digitalPlans.payMonthlyCta}</span>
        </button>
        <a
          href={digitalPlans.quoteHref}
          target="_blank"
          rel="noopener noreferrer"
          className="od-plans-quote"
        >
          {digitalPlans.quoteCta}
        </a>
      </div>
    </motion.article>
  );
}

export default function DigitalPricing() {
  const reduce = useReducedMotion();
  const [activeGroup, setActiveGroup] = useState<DigitalPlanGroupKey>("web");
  const [openPlans, setOpenPlans] = useState<Record<string, boolean>>({});
  const [paySelection, setPaySelection] = useState<PayMonthlySelection | null>(
    null,
  );
  const group = digitalPlans.groups[activeGroup];
  const planCount = group.plans.length;

  const togglePlan = (planId: string) => {
    setOpenPlans((prev) => ({
      ...prev,
      [planId]: !prev[planId],
    }));
  };

  const openPay = (plan: Plan) => {
    if (!("checkoutId" in plan) || !plan.checkoutId) return;
    setPaySelection({
      planId: plan.checkoutId,
      planName: plan.name,
      categoryLabel: digitalPlans.tabs[activeGroup],
      price: plan.price,
      priceAlt: "priceAlt" in plan ? plan.priceAlt : undefined,
      period: digitalPlans.period,
    });
  };

  return (
    <section
      className="od-section od-plans-section"
      id="planes"
      aria-labelledby="od-plans-title"
    >
      <div className="od-plans-top">
        <ScrollReveal className="od-plans-intro">
          <p className="od-kicker">{digitalPlans.label}</p>
          <h2 id="od-plans-title" className="od-plans-heading">
            {digitalPlans.title}
          </h2>
          <p className="od-plans-lead">{digitalPlans.description}</p>
        </ScrollReveal>

        <ScrollReveal className="od-plans-switch-wrap">
          <div
            className="od-plans-switch"
            role="tablist"
            aria-label="Categorías de planes"
          >
            {GROUP_KEYS.map((key, i) => {
              const isOn = key === activeGroup;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={isOn}
                  className={`od-plans-switch-btn${isOn ? " is-on" : ""}`}
                  onClick={() => setActiveGroup(key)}
                >
                  <span className="od-plans-switch-n" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{digitalPlans.tabs[key]}</span>
                  {isOn ? <span className="od-plans-switch-bar" /> : null}
                </button>
              );
            })}
          </div>
        </ScrollReveal>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeGroup}
          className="od-plans-panel"
          role="tabpanel"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -12 }}
          transition={{ duration: 0.38, ease: EASE }}
        >
          <p className="od-plans-group-lead">{group.description}</p>

          <div className={`od-plans-grid od-plans-grid--${planCount}`}>
            {group.plans.map((plan, index) => {
              const planId = `${activeGroup}-${index}-${plan.name}`;
              return (
                <PlanCard
                  key={planId}
                  plan={plan}
                  planId={planId}
                  index={index}
                  reduce={reduce}
                  open={Boolean(openPlans[planId])}
                  onToggle={() => togglePlan(planId)}
                  onPay={() => openPay(plan)}
                />
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      <p className="od-plans-custom">
        {digitalPlans.customQuotePrefix}{" "}
        <a
          href={digitalPlans.quoteHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          {digitalPlans.customQuoteLink}
        </a>
      </p>

      <PayMonthlySheet
        open={paySelection !== null}
        selection={paySelection}
        copy={digitalPlans.paySheet}
        onClose={() => setPaySelection(null)}
      />
    </section>
  );
}
