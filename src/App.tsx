/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, ArrowDown } from 'lucide-react';
import {
  HERO_IMAGE_URL,
  ARIA_EMOTIONS,
  OPERA_COMPONENTS,
  HISTORICAL_ERAS,
  VOICE_TYPES,
  FAMOUS_MASTERWORKS,
} from './data/ariaContent';

// Resilient Image component with museum-grade fallback
function ResilientImage({
  src,
  alt,
  caption,
  className = '',
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className="w-full">
      <div
        className={`relative overflow-hidden bg-[#EBE6DF] border border-stone-300/80 ${className}`}
      >
        {!failed ? (
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            onError={() => setFailed(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full min-h-[240px] flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#EBE6DF] to-[#D6CEBE] text-stone-700">
            <BookOpen className="w-8 h-8 mb-2 text-[#9A3412]" />
            <p className="font-editorial text-lg font-medium">{alt}</p>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="text-xs font-editorial italic text-stone-600 mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default function App() {
  const femaleVoices = VOICE_TYPES.filter((v) => v.gender === 'Эмэгтэй');
  const maleVoices = VOICE_TYPES.filter((v) => v.gender === 'Эрэгтэй');

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1C1917] flex flex-col">
      {/* STRICT 3-ZONE TOP BAR CONTRACT */}
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-sm border-b border-stone-300/80 px-6 lg:px-12 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="font-editorial text-xl lg:text-2xl font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0"
        >
          Ариа · Дуурийн Урлаг
        </a>

        {/* Zone 2: 4 concise single-line navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-700">
          <a
            href="#what-is-aria"
            className="hover:text-[#9A3412] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            1. Ариа гэж юу вэ?
          </a>
          <a
            href="#history"
            className="hover:text-[#9A3412] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            2. Үүсэл, хөгжил
          </a>
          <a
            href="#voices"
            className="hover:text-[#9A3412] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            3. Хоолойн төрөл
          </a>
          <a
            href="#masterworks"
            className="hover:text-[#9A3412] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            4. Алдартай зохиолч, ариа
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <a
            href="#what-is-aria"
            className="px-4 py-2 text-xs font-semibold text-stone-100 bg-stone-900 rounded-md hover:bg-[#9A3412] transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <span>Нийтлэл унших</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      <main id="top" className="flex-1 max-w-[1200px] w-full mx-auto px-6 lg:px-12">
        {/* EDITORIAL HERO SECTION */}
        <section className="py-10 lg:py-16 border-b border-stone-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 mb-3">
                  <span>Хөгжмийн Боловсрол</span>
                  <span aria-hidden="true">·</span>
                  <span>Бүлэг 1–4</span>
                  <span aria-hidden="true">·</span>
                  <span>Танин мэдэхүйн бичвэр</span>
                </div>

                <div className="mb-5 py-2.5 px-3.5 bg-[#F3EFE6] border border-stone-300 rounded-md text-xs text-stone-700">
                  <span className="font-semibold text-[#9A3412] uppercase tracking-wider mr-2">
                    Багийн гишүүд:
                  </span>
                  <span className="font-medium text-stone-900">
                    Содбилэг · Төгсбилэг · Шижирсанаа · Э. Нандин-Эрдэнэ · Буянхишиг
                  </span>
                </div>

                <h1
                  className="font-editorial text-4xl sm:text-5xl lg:text-[3.35rem] font-semibold text-stone-900 leading-[1.08] tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Ариа: Дуурийн дүрийн сэтгэлийн толь ба хоолойн ур чадвар
                </h1>

                <p className="mt-6 text-base lg:text-lg text-stone-700 leading-relaxed max-w-2xl">
                  Ариа гэдэг нь дуурийн нэг дүрийн дуулдаг гоцлол дуу юм. Энэхүү мэдээллийн
                  хуудаснаас ариа гэж юу болох, дуурийн бусад хэсгүүдээс хэрхэн ялгарах,
                  1600-аад оноос өнөөг хүртэлх түүхэн хөгжил, дуучдын 6 хоолойн төрөл болон
                  дэлхийн суут зохиолчдын алдартай бүтээлүүдийн тухай дэлгэрэнгүй уншиж
                  танилцана уу.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-stone-300/80 flex flex-wrap items-center gap-6 text-xs text-stone-600">
                <div>
                  <span className="font-semibold text-stone-900">Сэдэв:</span> Сонгодог дуурийн
                  гоцлол урлаг
                </div>
                <span aria-hidden="true">·</span>
                <div>
                  <span className="font-semibold text-stone-900">Бүтэц:</span> 4 үндсэн бүлэг
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 flex">
              <ResilientImage
                src={HERO_IMAGE_URL}
                alt="Сонгодог дуурийн тайзан дээр ариа дуулж буй гоцлол дуучин ба найрал хөгжим"
                caption="Зураг 1 — Дуурийн театрын тайзнаа гоцлол дуучин ариа дуулах үед үйл явдал түр зогсож, үзэгчдийн анхаарал зөвхөн дүрийн дотоод сэтгэлд төвлөрдөг."
                className="w-full h-full min-h-[300px] lg:min-h-[380px]"
              />
            </div>
          </div>

          {/* Chapter Overview Strip */}
          <div className="mt-10 pt-6 border-t border-stone-300 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <a
              href="#what-is-aria"
              className="group block p-4 bg-[#F3EFE6]/70 border border-stone-300/80 rounded-md hover:border-[#9A3412] transition-colors"
            >
              <div className="text-xs uppercase tracking-wider text-[#9A3412] font-semibold">
                Бүлэг 01
              </div>
              <div className="font-editorial text-xl font-semibold text-stone-900 mt-0.5 group-hover:text-[#9A3412] transition-colors">
                1. Ариа гэж юу вэ?
              </div>
              <div className="text-xs text-stone-600 mt-1">
                Арианы тодорхойлолт ба Речитатив, Дуэт/Трио, Найрал дуу, Увертюра
              </div>
            </a>

            <a
              href="#history"
              className="group block p-4 bg-[#F3EFE6]/70 border border-stone-300/80 rounded-md hover:border-[#9A3412] transition-colors"
            >
              <div className="text-xs uppercase tracking-wider text-[#9A3412] font-semibold">
                Бүлэг 02
              </div>
              <div className="font-editorial text-xl font-semibold text-stone-900 mt-0.5 group-hover:text-[#9A3412] transition-colors">
                2. Ариагийн үүсэл, хөгжил
              </div>
              <div className="text-xs text-stone-600 mt-1 tabular-nums">
                Эхэн үе (1600-аад он) · Барокко · Сонгодог · Романтик үе
              </div>
            </a>

            <a
              href="#voices"
              className="group block p-4 bg-[#F3EFE6]/70 border border-stone-300/80 rounded-md hover:border-[#9A3412] transition-colors"
            >
              <div className="text-xs uppercase tracking-wider text-[#9A3412] font-semibold">
                Бүлэг 03
              </div>
              <div className="font-editorial text-xl font-semibold text-stone-900 mt-0.5 group-hover:text-[#9A3412] transition-colors">
                3. Дуучдын хоолойн төрөл
              </div>
              <div className="text-xs text-stone-600 mt-1">
                Сопрано, Меццо-сопрано, Альт · Тенор, Баритон, Бас
              </div>
            </a>

            <a
              href="#masterworks"
              className="group block p-4 bg-[#F3EFE6]/70 border border-stone-300/80 rounded-md hover:border-[#9A3412] transition-colors"
            >
              <div className="text-xs uppercase tracking-wider text-[#9A3412] font-semibold">
                Бүлэг 04
              </div>
              <div className="font-editorial text-xl font-semibold text-stone-900 mt-0.5 group-hover:text-[#9A3412] transition-colors">
                4. Алдартай зохиолч, ариа
              </div>
              <div className="text-xs text-stone-600 mt-1">
                В.А. Моцарт · Ж. Верди · Ж. Бизе · Ж. Пуччини
              </div>
            </a>
          </div>
        </section>

        {/* =====================================================================
            SECTION 1: 1. АРИА ГЭЖ ЮУ ВЭ?
           ===================================================================== */}
        <section id="what-is-aria" className="py-14 lg:py-20 border-b border-stone-300">
          <div className="pb-6 border-b border-stone-200">
            <div className="text-xs uppercase tracking-widest text-[#9A3412] font-semibold">
              01 / Үндсэн Ойлголт ба Дуурийн Бүтэц
            </div>
            <h2
              className="font-editorial text-3xl lg:text-4xl font-semibold text-stone-900 mt-2"
              style={{ textWrap: 'balance' }}
            >
              1. Ариа гэж юу вэ?
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8">
            {/* Main Prose Column */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-base lg:text-lg text-stone-800 leading-relaxed max-w-prose first-letter:text-5xl first-letter:font-editorial first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#9A3412]">
                Ариа гэдэг нь дуурийн нэг дүрийн дуулдаг гоцлол дуу. Ариагаар дүр өөрийн{' '}
                <strong className="font-semibold text-stone-900">
                  хайр, баяр, уй гашуу, айдас, уур, найдвараа
                </strong>{' '}
                нээж хэлдэг. Ариа дуулах үед үйл явдал бараг зогсож, үзэгчид зөвхөн тэр
                дүрийн сэтгэлд анхаарлаа төвлөрүүлдэг.
              </p>

              <div className="pt-2">
                <h3 className="font-editorial text-2xl font-semibold text-stone-900 mb-4">
                  Дуурьд ариагаас гадна өөр хэсгүүд бас байдаг:
                </h3>

                <ul className="divide-y divide-stone-200 border-y border-stone-300">
                  <li className="py-4">
                    <div className="text-base text-stone-900">
                      <strong className="font-semibold text-[#9A3412]">Речитатив</strong> — ярианд
                      ойр аялгуугаар дуулдаг хэсэг. Үйл явдлыг урагшлуулдаг.
                    </div>
                  </li>
                  <li className="py-4">
                    <div className="text-base text-stone-900">
                      <strong className="font-semibold text-[#9A3412]">Дуэт, трио</strong> — хоёр,
                      гурван дуучин хамт дуулдаг хэсэг.
                    </div>
                  </li>
                  <li className="py-4">
                    <div className="text-base text-stone-900">
                      <strong className="font-semibold text-[#9A3412]">Найрал дуу</strong> — олон
                      хүн хамт дуулдаг хэсэг.
                    </div>
                  </li>
                  <li className="py-4">
                    <div className="text-base text-stone-900">
                      <strong className="font-semibold text-[#9A3412]">Увертюра</strong> — дуурь
                      эхлэхийн өмнө найрал хөгжмөөр тоглодог оршил хөгжим.
                    </div>
                  </li>
                </ul>
              </div>

              <blockquote className="py-5 px-6 bg-[#F3EFE6] border border-stone-300 rounded-lg font-editorial italic text-xl text-stone-900 leading-relaxed">
                «Үүнтэй харьцуулахад ариа нь дуучны хоолойн гоо үзэмж, ур чадварыг хамгийн
                сайн харуулдаг хэсэг тул үзэгчид ихэвчлэн ариа дууссаны дараа хамгийн хүчтэй
                алга ташдаг.»
              </blockquote>
            </div>

            {/* Right Column: 6 Emotions Reference Card */}
            <div className="lg:col-span-5">
              <div className="p-6 bg-[#F3EFE6] border border-stone-300 rounded-lg">
                <div className="pb-4 border-b border-stone-300">
                  <span className="text-xs uppercase tracking-widest text-stone-500">
                    Дүрийн дотоод ертөнц
                  </span>
                  <h3 className="font-editorial text-2xl font-semibold text-stone-900 mt-0.5">
                    Ариагаар илэрхийлдэг сэтгэл хөдлөлүүд
                  </h3>
                </div>

                <div className="divide-y divide-stone-300/80 mt-2">
                  {ARIA_EMOTIONS.map((emo) => (
                    <div key={emo.id} className="py-3.5">
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="font-editorial text-lg font-bold text-[#9A3412]">
                          {emo.label}
                        </h4>
                        <span className="text-xs text-stone-600">{emo.exampleRole}</span>
                      </div>
                      <p className="text-xs text-stone-700 mt-1 leading-relaxed">
                        {emo.musicalCharacter}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Complete Comparison Table of Opera Parts */}
          <div className="mt-10">
            <h3 className="font-editorial text-2xl font-semibold text-stone-900 mb-4">
              Дуурийн бүрэлдэхүүн хэсгүүдийн дэлгэрэнгүй харьцуулалт
            </h3>
            <div className="overflow-x-auto border border-stone-300 rounded-lg bg-[#FBF9F5]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-300 bg-[#EBE6DF] text-xs uppercase tracking-wider text-stone-700">
                    <th className="py-3.5 px-5 font-semibold">Хэсгийн нэр</th>
                    <th className="py-3.5 px-5 font-semibold">Гүйцэтгэгч</th>
                    <th className="py-3.5 px-5 font-semibold">Үндсэн үүрэг ба онцлог</th>
                    <th className="py-3.5 px-5 font-semibold">Тайзны үйл явдал</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-sm">
                  {OPERA_COMPONENTS.map((part) => (
                    <tr key={part.id} className="hover:bg-[#F3EFE6]/50">
                      <td className="py-4 px-5 font-semibold text-stone-900 whitespace-nowrap align-top">
                        {part.name}
                      </td>
                      <td className="py-4 px-5 text-stone-700 align-top">{part.performers}</td>
                      <td className="py-4 px-5 text-stone-800 leading-relaxed align-top">
                        {part.description}
                      </td>
                      <td className="py-4 px-5 text-stone-600 leading-relaxed align-top">
                        {part.stageBehavior}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 2: 2. АРИАГИЙН ҮҮСЭЛ, ХӨГЖИЛ
           ===================================================================== */}
        <section id="history" className="py-14 lg:py-20 border-b border-stone-300">
          <div className="pb-6 border-b border-stone-200">
            <div className="text-xs uppercase tracking-widest text-[#9A3412] font-semibold">
              02 / Түүхэн Үечлэл (1600-аад он – 19-р зуун)
            </div>
            <h2
              className="font-editorial text-3xl lg:text-4xl font-semibold text-stone-900 mt-2"
              style={{ textWrap: 'balance' }}
            >
              2. Ариагийн үүсэл, хөгжил
            </h2>
            <p className="text-base text-stone-700 mt-2 max-w-2xl">
              Дуурийн түүхийг хэд хэдэн үеэр хуваан үздэг. Үе бүрт ариа өөр өөр хэлбэртэй
              болсон.
            </p>
          </div>

          {/* Primary Reference Table matching the curriculum text */}
          <div className="mt-8 overflow-x-auto border border-stone-300 rounded-lg bg-[#FBF9F5]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-300 bg-[#EBE6DF] text-xs uppercase tracking-wider text-stone-700">
                  <th className="py-3.5 px-5 font-semibold w-1/3">Үе</th>
                  <th className="py-3.5 px-5 font-semibold">Онцлог</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-sm lg:text-base">
                {HISTORICAL_ERAS.map((era) => (
                  <tr key={era.id} className="hover:bg-[#F3EFE6]/60">
                    <td className="py-4 px-5 font-semibold text-stone-900 align-top tabular-nums">
                      {era.periodName} ({era.timeframe})
                    </td>
                    <td className="py-4 px-5 text-stone-800 leading-relaxed">
                      {era.keyFeature}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Detailed Editorial Cards for All 4 Eras */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {HISTORICAL_ERAS.map((era, idx) => (
              <article
                key={era.id}
                className="p-6 bg-[#F3EFE6] border border-stone-300 rounded-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono tabular-nums text-[#9A3412] font-semibold">
                    <span>Үе шат 0{idx + 1}</span>
                    <span aria-hidden="true">·</span>
                    <span>{era.timeframe}</span>
                  </div>
                  <h3 className="font-editorial text-2xl font-semibold text-stone-900 mt-1">
                    {era.periodName} ({era.timeframe})
                  </h3>
                  <p className="text-sm lg:text-base text-stone-800 leading-relaxed mt-3">
                    {era.keyFeature}
                  </p>
                  <p className="text-sm text-stone-600 leading-relaxed mt-3 pt-3 border-t border-stone-300/80">
                    {era.curatorialNote}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-300/80 text-xs text-stone-700 space-y-1">
                  <div>
                    <strong className="text-stone-900">Гол төлөөлөгч:</strong>{' '}
                    {era.representativeComposer}
                  </div>
                  <div>
                    <strong className="text-stone-900">Арианы хэлбэр:</strong>{' '}
                    {era.structurePattern}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* =====================================================================
            SECTION 3: 3. ДУУЧДЫН ХООЛОЙН ТӨРӨЛ
           ===================================================================== */}
        <section id="voices" className="py-14 lg:py-20 border-b border-stone-300">
          <div className="pb-6 border-b border-stone-200">
            <div className="text-xs uppercase tracking-widest text-[#9A3412] font-semibold">
              03 / Хоолойн Цараа ба Дүрийн Хуваарилалт
            </div>
            <h2
              className="font-editorial text-3xl lg:text-4xl font-semibold text-stone-900 mt-2"
              style={{ textWrap: 'balance' }}
            >
              3. Дуучдын хоолойн төрөл
            </h2>
            <p className="text-base text-stone-700 mt-2 max-w-3xl leading-relaxed">
              Хүний хоолойг өндөр, нам байдлаар нь хэд хэдэн төрөлд хуваадаг. Зохиолч ариа
              бүрийг тодорхой хоолойд зориулж бичдэг тул дуучин өөрийн хоолойд тохирсон дүр,
              ариаг дуулдаг.
            </p>
          </div>

          {/* Exact Curriculum Table of the 6 Voice Types */}
          <div className="mt-8 overflow-x-auto border border-stone-300 rounded-lg bg-[#FBF9F5]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-300 bg-[#EBE6DF] text-xs uppercase tracking-wider text-stone-700">
                  <th className="py-3.5 px-5 font-semibold">Хоолой</th>
                  <th className="py-3.5 px-5 font-semibold">Хэн дуулдаг</th>
                  <th className="py-3.5 px-5 font-semibold">Онцлог</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-sm lg:text-base">
                {VOICE_TYPES.map((voice) => (
                  <tr key={voice.id} className="hover:bg-[#F3EFE6]/60">
                    <td className="py-4 px-5 font-semibold text-stone-900 whitespace-nowrap">
                      {voice.name}
                    </td>
                    <td className="py-4 px-5 text-stone-700 whitespace-nowrap">
                      {voice.gender}
                    </td>
                    <td className="py-4 px-5 text-stone-800 leading-relaxed">
                      {voice.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Detailed Text Breakdown by Female & Male Voices */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
            {/* Female Voices */}
            <div className="p-6 bg-[#F3EFE6] border border-stone-300 rounded-lg">
              <div className="pb-4 border-b border-stone-300">
                <div className="text-xs uppercase tracking-widest text-[#9A3412] font-semibold">
                  Эмэгтэй хоолойн 3 ангилал
                </div>
                <h3 className="font-editorial text-2xl font-semibold text-stone-900 mt-1">
                  Сопрано · Меццо-сопрано · Альт
                </h3>
              </div>

              <div className="divide-y divide-stone-300 mt-2">
                {femaleVoices.map((v) => (
                  <div key={v.id} className="py-4 first:pt-3 last:pb-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="font-editorial text-xl font-bold text-stone-900">
                        {v.name}{' '}
                        <span className="text-xs font-sans font-normal text-stone-600">
                          ({v.pitchRegister} хоолой)
                        </span>
                      </h4>
                      <span className="text-xs font-mono tabular-nums text-[#9A3412] font-semibold">
                        Цараа: {v.noteRangeLabel}
                      </span>
                    </div>
                    <p className="text-sm text-stone-800 mt-1.5 leading-relaxed">
                      {v.description}
                    </p>
                    <div className="mt-2 text-xs text-stone-600 space-y-1">
                      <div>
                        <strong className="text-stone-900">Түгээмэл дүрүүд:</strong>{' '}
                        {v.typicalRoles}
                      </div>
                      <div>
                        <strong className="text-stone-900">Жишээ дүр:</strong>{' '}
                        {v.famousExample}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Male Voices */}
            <div className="p-6 bg-[#F3EFE6] border border-stone-300 rounded-lg">
              <div className="pb-4 border-b border-stone-300">
                <div className="text-xs uppercase tracking-widest text-[#9A3412] font-semibold">
                  Эрэгтэй хоолойн 3 ангилал
                </div>
                <h3 className="font-editorial text-2xl font-semibold text-stone-900 mt-1">
                  Тенор · Баритон · Бас
                </h3>
              </div>

              <div className="divide-y divide-stone-300 mt-2">
                {maleVoices.map((v) => (
                  <div key={v.id} className="py-4 first:pt-3 last:pb-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="font-editorial text-xl font-bold text-stone-900">
                        {v.name}{' '}
                        <span className="text-xs font-sans font-normal text-stone-600">
                          ({v.pitchRegister} хоолой)
                        </span>
                      </h4>
                      <span className="text-xs font-mono tabular-nums text-[#9A3412] font-semibold">
                        Цараа: {v.noteRangeLabel}
                      </span>
                    </div>
                    <p className="text-sm text-stone-800 mt-1.5 leading-relaxed">
                      {v.description}
                    </p>
                    <div className="mt-2 text-xs text-stone-600 space-y-1">
                      <div>
                        <strong className="text-stone-900">Түгээмэл дүрүүд:</strong>{' '}
                        {v.typicalRoles}
                      </div>
                      <div>
                        <strong className="text-stone-900">Жишээ дүр:</strong>{' '}
                        {v.famousExample}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 4: 4. АЛДАРТАЙ ЗОХИОЛЧ, АРИА
           ===================================================================== */}
        <section id="masterworks" className="py-14 lg:py-20">
          <div className="pb-6 border-b border-stone-200">
            <div className="text-xs uppercase tracking-widest text-[#9A3412] font-semibold">
              04 / Дэлхийн Сонгодог Сан Хөмрөг
            </div>
            <h2
              className="font-editorial text-3xl lg:text-4xl font-semibold text-stone-900 mt-2"
              style={{ textWrap: 'balance' }}
            >
              4. Алдартай зохиолч, ариа
            </h2>
            <p className="text-base text-stone-700 mt-2 max-w-2xl">
              Дэлхийн алдартай дуурийн зохиолчид олон бий. Тэдний зарим алдартай бүтээлийг
              доор оруулав.
            </p>
          </div>

          {/* Museum Catalog Grid of the 4 Composers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            {FAMOUS_MASTERWORKS.map((work) => (
              <article
                key={work.id}
                className="border border-stone-300 rounded-lg overflow-hidden bg-[#FBF9F5] flex flex-col justify-between"
              >
                <div>
                  <ResilientImage
                    src={work.imageUrl}
                    alt={`${work.composer} — ${work.featuredOpera}`}
                    className="h-64 w-full"
                  />

                  <div className="p-6">
                    {/* Clean unboxed metadata with typographic separators */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 font-mono tabular-nums">
                      <span>{work.country}</span>
                      <span aria-hidden="true">·</span>
                      <span>{work.lifespan}</span>
                      <span aria-hidden="true">·</span>
                      <span>Анх тоглогдсон: {work.premiereYear}</span>
                    </div>

                    <h3 className="font-editorial text-2xl lg:text-3xl font-semibold text-stone-900 mt-2">
                      {work.composer} ({work.country})
                    </h3>

                    <div className="text-sm font-semibold text-[#9A3412] mt-1">
                      {work.featuredOpera} — {work.featuredAria}
                    </div>

                    <p className="text-sm lg:text-base text-stone-800 leading-relaxed mt-3">
                      {work.description}
                    </p>

                    <dl className="mt-5 pt-4 border-t border-stone-300/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <dt className="text-stone-500">Гол ариа ба хоолойн төрөл</dt>
                        <dd className="font-medium text-stone-900 mt-0.5">
                          {work.featuredAria} ({work.voiceType})
                        </dd>
                      </div>
                      <div>
                        <dt className="text-stone-500">Хөгжмийн онцлог</dt>
                        <dd className="font-medium text-stone-800 mt-0.5 leading-relaxed">
                          {work.musicalHighlight}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 p-6 bg-[#F3EFE6] border border-stone-300 rounded-lg text-center">
            <p className="text-lg lg:text-xl text-stone-800 font-editorial italic">
              «Эдгээр зохиолчид өөр өөр орны хүмүүс боловч тэдний бүтээл дэлхий даяар
              дуулагдаж, тоглогдсоор байна.»
            </p>
          </div>
        </section>
      </main>

      {/* CLEAN EDITORIAL FOOTER */}
      <footer className="border-t border-stone-300 bg-[#F3EFE6] py-8 px-6 lg:px-12 mt-8">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600">
          <div className="font-editorial text-base font-semibold text-stone-900">
            Ариа · Дуурийн Урлагийн Танин Мэдэхүйн Бичвэр
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#what-is-aria" className="hover:text-stone-900 transition-colors">
              1. Ариа гэж юу вэ?
            </a>
            <span aria-hidden="true">·</span>
            <a href="#history" className="hover:text-stone-900 transition-colors">
              2. Үүсэл, хөгжил
            </a>
            <span aria-hidden="true">·</span>
            <a href="#voices" className="hover:text-stone-900 transition-colors">
              3. Хоолойн төрөл
            </a>
            <span aria-hidden="true">·</span>
            <a href="#masterworks" className="hover:text-stone-900 transition-colors">
              4. Алдартай зохиолч, ариа
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
