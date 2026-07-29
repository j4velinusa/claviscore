"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import type { Dictionary } from "@/lib/dictionaries/tr";

const topicKeys = ["quote", "sample", "tech", "partner"] as const;
type TopicKey = (typeof topicKeys)[number];

const lineKeys = ["lock", "hinge", "handle", "hotel", "ceiling", "other"] as const;
type LineKey = (typeof lineKeys)[number];

const chip =
  "text-[13px] font-semibold px-4 py-[9px] rounded-full border transition duration-[250ms] ease-swift";
const chipOn = "bg-ink text-cream border-ink";
const chipOff = "bg-transparent text-ink-3 border-ink/[0.16] hover:border-ink/35 hover:text-ink";
const inputCls =
  "w-full mt-[7px] bg-transparent border-0 border-b-[1.5px] border-ink/[0.18] focus:border-bronze outline-none py-2 text-[15.5px] transition-colors";
const labelCls = "font-mono text-[10.5px] tracking-[0.1em] text-label";

/**
 * Form backend'e POST etmiyor — site genelinde olduğu gibi hazır bir e-posta açıyor.
 * Alanlar konu ve gövdeye yerleştiriliyor, böylece mesaj doğru başlıkla ve eksiksiz
 * geliyor. Sunucu tarafı form altyapısı geldiğinde submit burada değiştirilir.
 */
export function ContactForm({ dict }: { dict: Dictionary }) {
  const t = dict.contact;
  const [topic, setTopic] = useState<TopicKey>("quote");
  const [lines, setLines] = useState<LineKey[]>([]);
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");

  const toggleLine = (k: LineKey) =>
    setLines((prev) => (prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]));

  const emailValid = email === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const ready = company.trim() !== "" && email.trim() !== "" && emailValid && message.trim() !== "";

  const send = () => {
    const subject = `${t.topics[topic].label} — ${company.trim()}`;
    const body = [
      `${t.form.company}: ${company}`,
      `${t.form.name}: ${name}`,
      `${t.form.email}: ${email}`,
      `${t.form.country}: ${country}`,
      `${t.form.lines}: ${lines.map((l) => t.lines[l]).join(", ") || "—"}`,
      "",
      message,
    ].join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="bg-white border border-ink/[0.08] rounded-[26px] px-7 py-8 sm:px-9">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-[-0.025em]">{t.form.title}</h2>
        <span className="font-mono text-[11px] text-bronze-2">{t.topics[topic].tag}</span>
      </div>

      <div className={`${labelCls} mt-6`}>{t.form.topic}</div>
      <div role="group" aria-label={t.form.topic} className="flex gap-2 flex-wrap mt-2.5">
        {topicKeys.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setTopic(k)}
            aria-pressed={topic === k}
            className={`${chip} ${topic === k ? chipOn : chipOff}`}
          >
            {t.topics[k].label}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-5 mt-6">
        <div>
          <label className={labelCls} htmlFor="c-company">
            {t.form.company.toLocaleUpperCase("tr-TR")}
          </label>
          <input
            id="c-company"
            className={inputCls}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="c-name">
            {t.form.name.toLocaleUpperCase("tr-TR")}
          </label>
          <input id="c-name" className={inputCls} value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className={labelCls} htmlFor="c-email">
            {t.form.email.toLocaleUpperCase("tr-TR")}
          </label>
          <input
            id="c-email"
            type="email"
            className={`${inputCls} font-mono text-[14.5px] ${emailValid ? "" : "border-[#B4503F]"}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!emailValid}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="c-country">
            {t.form.country.toLocaleUpperCase("tr-TR")}
          </label>
          <input
            id="c-country"
            className={inputCls}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
      </div>

      <div className={`${labelCls} mt-7`}>{t.form.lines.toLocaleUpperCase("tr-TR")}</div>
      <div role="group" aria-label={t.form.lines} className="flex gap-2 flex-wrap mt-2.5">
        {lineKeys.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => toggleLine(k)}
            aria-pressed={lines.includes(k)}
            className={`font-mono text-[11.5px] px-3.5 py-2 rounded-full border transition ${
              lines.includes(k) ? chipOn : chipOff
            }`}
          >
            {t.lines[k]}
          </button>
        ))}
      </div>

      <label className={`${labelCls} block mt-7`} htmlFor="c-msg">
        {t.form.message.toLocaleUpperCase("tr-TR")}
      </label>
      <textarea
        id="c-msg"
        className="w-full mt-2.5 min-h-[132px] resize-y bg-cream border border-ink/[0.14] rounded-[14px] px-4 py-3.5 text-[15px] leading-[1.65] outline-none focus:border-bronze transition-colors"
        placeholder={t.topics[topic].hint}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <div className="flex items-center gap-4 flex-wrap mt-[22px]">
        <button
          type="button"
          onClick={send}
          disabled={!ready}
          className="text-[15px] font-semibold text-cream bg-ink px-[30px] py-3.5 rounded-full transition duration-[250ms] disabled:opacity-40 hover:bg-[#33291f] hover:-translate-y-0.5"
        >
          {t.form.submit}
        </button>
        <span className="text-[13.5px] text-muted">{ready ? t.form.ready : t.form.hint}</span>
      </div>
      <div className="font-mono text-[10.5px] tracking-[0.06em] text-label mt-4">{t.form.kvkk}</div>
    </div>
  );
}
