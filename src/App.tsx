/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Square,
  Music,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Sliders,
  BookOpen,
} from 'lucide-react';
import {
  HERO_IMAGE_URL,
  ARIA_EMOTIONS,
  OPERA_COMPONENTS,
  HISTORICAL_ERAS,
  VOICE_TYPES,
  FAMOUS_MASTERWORKS,
  QUIZ_QUESTIONS,
  type OperaComponentItem,
  type HistoricalEra,
  type VoiceType,
  type MasterworkItem,
} from './data/ariaContent';
import { soundEngine } from './utils/soundEngine';

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
      <div className={`relative overflow-hidden bg-[#EBE6DF] border border-stone-300/80 ${className}`}>
        {!failed ? (
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            onError={() => setFailed(true)}
            className="w-full h-full object-cover transition-transform duration-200 hover:scale-[1.01]"
          />
        ) : (
          <div className="w-full h-full min-h-[240px] flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#EBE6DF] to-[#D6CEBE] text-stone-700">
            <Music className="w-8 h-8 mb-2 text-[#9A3412]" />
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

const KEYBOARD_NOTES = [
  { note: 'E2', freq: 82.41 },
  { note: 'F2', freq: 87.31 },
  { note: 'G2', freq: 98.00 },
  { note: 'A2', freq: 110.00 },
  { note: 'B2', freq: 123.47 },
  { note: 'C3', freq: 130.81 },
  { note: 'D3', freq: 146.83 },
  { note: 'E3', freq: 164.81 },
  { note: 'F3', freq: 174.61 },
  { note: 'G3', freq: 196.00 },
  { note: 'A3', freq: 220.00 },
  { note: 'B3', freq: 246.94 },
  { note: 'C4', freq: 261.63 },
  { note: 'D4', freq: 293.66 },
  { note: 'E4', freq: 329.63 },
  { note: 'F4', freq: 349.23 },
  { note: 'G4', freq: 392.00 },
  { note: 'A4', freq: 440.00 },
  { note: 'B4', freq: 493.88 },
  { note: 'C5', freq: 523.25 },
  { note: 'D5', freq: 587.33 },
  { note: 'E5', freq: 659.25 },
  { note: 'F5', freq: 698.46 },
  { note: 'G5', freq: 783.99 },
  { note: 'A5', freq: 880.00 },
  { note: 'B5', freq: 987.77 },
  { note: 'C6', freq: 1046.50 },
];

export default function App() {
  // Audio playback state
  const [playingId, setPlayingId] = useState<string | null>(null);

  // Section 3: Opera structure & emotion state
  const [selectedPart, setSelectedPart] = useState<OperaComponentItem>(OPERA_COMPONENTS[0]);
  const [selectedEmotion, setSelectedEmotion] = useState(ARIA_EMOTIONS[0]);

  // Section 4: Historical era state
  const [selectedEra, setSelectedEra] = useState<HistoricalEra>(HISTORICAL_ERAS[3]);

  // Section 5: Vocal classification state
  const [voiceGenderFilter, setVoiceGenderFilter] = useState<'Бүгд' | 'Эмэгтэй' | 'Эрэгтэй'>('Бүгд');
  const [selectedVoice, setSelectedVoice] = useState<VoiceType>(VOICE_TYPES[0]);
  const [customPitchFreq, setCustomPitchFreq] = useState<number>(523);

  // Section 6: Masterworks filter & selection
  const [countryFilter, setCountryFilter] = useState<string>('Бүгд');
  const [activeMasterwork, setActiveMasterwork] = useState<MasterworkItem>(FAMOUS_MASTERWORKS[0]);

  // Interactive Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState<boolean>(false);

  const handleStopAudio = () => {
    soundEngine.stopAll();
    setPlayingId(null);
  };

  const handlePlayStructure = (partId: string) => {
    const key = `part-${partId}`;
    if (playingId === key) {
      handleStopAudio();
      return;
    }
    setPlayingId(key);
    soundEngine.playStructureDemo(partId, () => setPlayingId(null));
  };

  const handlePlayEmotionTone = (emotionId: string, freq: number) => {
    const key = `emotion-${emotionId}`;
    if (playingId === key) {
      handleStopAudio();
      return;
    }
    setPlayingId(key);
    soundEngine.playSequence(
      [
        { freq: freq * 0.75, duration: 0.4, delay: 0 },
        { freq: freq, duration: 0.9, delay: 0.42, vibrato: true },
      ],
      () => setPlayingId(null)
    );
  };

  const handlePlayVoiceDemo = (voiceId: string) => {
    const key = `voice-${voiceId}`;
    if (playingId === key) {
      handleStopAudio();
      return;
    }
    setPlayingId(key);
    soundEngine.playVocalRangeDemo(voiceId, () => setPlayingId(null));
  };

  const handlePlayMasterwork = (composerId: string) => {
    const key = `master-${composerId}`;
    if (playingId === key) {
      handleStopAudio();
      return;
    }
    setPlayingId(key);
    soundEngine.playMasterworkMotif(composerId, () => setPlayingId(null));
  };

  const handlePlaySingleKey = (noteName: string, freq: number) => {
    const key = `key-${noteName}`;
    setPlayingId(key);
    setCustomPitchFreq(Math.round(freq));
    soundEngine.playSequence([{ freq, duration: 0.75, delay: 0, vibrato: true }], () =>
      setPlayingId(null)
    );
  };

  const filteredVoices =
    voiceGenderFilter === 'Бүгд'
      ? VOICE_TYPES
      : VOICE_TYPES.filter((v) => v.gender === voiceGenderFilter);

  const filteredMasterworks =
    countryFilter === 'Бүгд'
      ? FAMOUS_MASTERWORKS
      : FAMOUS_MASTERWORKS.filter((m) => m.country === countryFilter);

  const quizScore = QUIZ_QUESTIONS.reduce((acc, q) => {
    return selectedAnswers[q.id] === q.correctIndex ? acc + 1 : acc;
  }, 0);

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1C1917] flex flex-col">
      {/* STRICT 3-ZONE TOP BAR CONTRACT */}
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-sm border-b border-stone-300/80 px-6 lg:px-12 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="font-editorial text-xl lg:text-2xl font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0"
        >
          Ариа · Дуурийн Танхим
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
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
            4. Алдартай ариа
          </a>
          <a
            href="#quiz"
            className="hover:text-[#9A3412] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Мэдлэг сорих
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          {playingId ? (
            <button
              type="button"
              onClick={handleStopAudio}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#9A3412] rounded-md hover:bg-[#7C2D12] transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <VolumeX className="w-3.5 h-3.5" />
              <span>Ая зогсоох</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handlePlayMasterwork('puccini')}
              className="px-4 py-2 text-xs font-semibold text-stone-100 bg-stone-900 rounded-md hover:bg-[#9A3412] transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Ариа эгшиглүүлэх</span>
            </button>
          )}
        </div>
      </header>

      <main id="top" className="flex-1 max-w-[1280px] w-full mx-auto px-6 lg:px-12">
        {/* EXHIBITION MARQUEE HERO */}
        <section className="py-10 lg:py-16 border-b border-stone-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 mb-4">
                  <span>Хөгжмийн Боловсрол</span>
                  <span aria-hidden="true">·</span>
                  <span>Бүлэг 1–4</span>
                  <span aria-hidden="true">·</span>
                  <span>Сонгодог Дуурийн Судлал</span>
                </div>

                <h1
                  className="font-editorial text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold text-stone-900 leading-[1.08] tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Ариа: Дуурийн дүрийн сэтгэлийн толь ба хоолойн ур чадвар
                </h1>

                <p className="mt-6 text-base lg:text-lg text-stone-700 leading-relaxed max-w-2xl">
                  Ариа гэдэг нь дуурийн нэг дүрийн дуулдаг гоцлол дуу юм. Энэхүү интерактив
                  тайлангаас ариа гэж юу болох, дуурийн бусад хэсгүүдээс хэрхэн ялгарах,
                  1600-аад оноос өнөөг хүртэлх түүхэн хөгжил, дуучдын 6 хоолойн төрөл болон
                  дэлхийн суут зохиолчдын бүтээлийг сонсож судална уу.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-stone-300/80 flex flex-wrap items-center gap-4">
                <a
                  href="#what-is-aria"
                  className="px-5 py-2.5 bg-[#9A3412] text-white text-sm font-medium rounded-md hover:bg-[#7C2D12] transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0"
                >
                  <span>Хичээлтэй танилцах</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={() => handlePlayMasterwork('mozart')}
                  className="px-5 py-2.5 bg-[#EBE6DF] text-stone-900 border border-stone-300 text-sm font-medium rounded-md hover:bg-stone-200 transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Play className="w-4 h-4 text-[#9A3412]" />
                  <span>«Шөнийн хатны ариа» сэдэв сонсох</span>
                </button>
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

          {/* Operational / Curriculum Overview Strip below the hero split */}
          <div className="mt-10 pt-6 border-t border-stone-300 grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-stone-500">Бүлэг 01</div>
              <div className="font-editorial text-xl font-semibold text-stone-900 mt-0.5">
                Ариа ба Дуурийн 5 хэсэг
              </div>
              <div className="text-xs text-stone-600 mt-1">
                Ариа · Речитатив · Дуэт/Трио · Найрал · Увертюра
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-stone-500">Бүлэг 02</div>
              <div className="font-editorial text-xl font-semibold text-stone-900 mt-0.5">
                Түүхэн 4 үе шат
              </div>
              <div className="text-xs text-stone-600 mt-1 tabular-nums">
                1600-аад он · Барокко · Сонгодог · Романтик
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-stone-500">Бүлэг 03</div>
              <div className="font-editorial text-xl font-semibold text-stone-900 mt-0.5">
                Хоолойн 6 ангилал
              </div>
              <div className="text-xs text-stone-600 mt-1">
                Сопрано, Меццо, Альт · Тенор, Баритон, Бас
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-stone-500">Бүлэг 04</div>
              <div className="font-editorial text-xl font-semibold text-stone-900 mt-0.5">
                Дэлхийн 4 суут зохиолч
              </div>
              <div className="text-xs text-stone-600 mt-1">
                Моцарт · Верди · Бизе · Пуччини
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 1: 1. АРИА ГЭЖ ЮУ ВЭ?
           ===================================================================== */}
        <section id="what-is-aria" className="py-14 lg:py-20 border-b border-stone-300">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-8 border-b border-stone-200">
            <div>
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
            <p className="text-sm text-stone-600 max-w-md">
              Дуурийн доторх гоцлол дууны үүрэг, илэрхийлэх сэтгэл хөдлөл болон бусад
              бүрэлдэхүүн хэсгүүдийн харьцуулалт.
            </p>
          </div>

          {/* Editorial Essay + Emotion Selector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10">
            {/* Left 7 cols: Full authentic curriculum prose & interactive emotion palette */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-base lg:text-lg text-stone-800 leading-relaxed max-w-prose first-letter:text-5xl first-letter:font-editorial first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#9A3412]">
                Ариа гэдэг нь дуурийн нэг дүрийн дуулдаг гоцлол дуу. Ариагаар дүр өөрийн{' '}
                <strong className="font-semibold text-stone-900">
                  хайр, баяр, уй гашуу, айдас, уур, найдвараа
                </strong>{' '}
                нээж хэлдэг. Ариа дуулах үед үйл явдал бараг зогсож, үзэгчид зөвхөн тэр
                дүрийн сэтгэлд анхаарлаа төвлөрүүлдэг.
              </p>

              {/* Interactive Emotion Palette */}
              <div className="p-6 bg-[#F3EFE6] border border-stone-300/90 rounded-lg">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-editorial text-xl font-semibold text-stone-900">
                      Ариагаар илэрхийлдэг 6 сэтгэл хөдлөл
                    </h3>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Сэтгэл хөдлөл дээр дарж аялгууны өнгө ба жишээ дүрийг харна уу
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handlePlayEmotionTone(selectedEmotion.id, selectedEmotion.freq)
                    }
                    className="px-3.5 py-1.5 text-xs font-medium bg-stone-900 text-white rounded hover:bg-[#9A3412] transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {playingId === `emotion-${selectedEmotion.id}` ? (
                      <>
                        <Square className="w-3 h-3" />
                        <span>Зогсоох</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Өнгө сонсох</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Segmented interactive buttons for the 6 emotions from the prompt */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 p-1 bg-[#E5DEC9] rounded-md">
                  {ARIA_EMOTIONS.map((emo) => {
                    const active = selectedEmotion.id === emo.id;
                    return (
                      <button
                        key={emo.id}
                        type="button"
                        onClick={() => {
                          setSelectedEmotion(emo);
                          handlePlayEmotionTone(emo.id, emo.freq);
                        }}
                        className={`py-2 px-2.5 text-xs font-semibold rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          active
                            ? 'bg-[#9A3412] text-white shadow-xs'
                            : 'text-stone-800 hover:bg-[#FBF9F5]/60'
                        }`}
                      >
                        {emo.label}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 pt-4 border-t border-stone-300/80 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-xs text-stone-500">Хөгжмийн шинж төрх</div>
                    <div className="text-stone-900 font-medium mt-1">
                      {selectedEmotion.musicalCharacter}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-stone-500">Алдартай жишээ дүр</div>
                    <div className="text-stone-900 font-medium mt-1">
                      {selectedEmotion.exampleRole}
                    </div>
                  </div>
                </div>
              </div>

              {/* Exact list of other opera components from the prompt */}
              <div className="pt-2">
                <h3 className="font-editorial text-2xl font-semibold text-stone-900 mb-4">
                  Дуурьд ариагаас гадна өөр хэсгүүд бас байдаг:
                </h3>

                <div className="divide-y divide-stone-200 border-y border-stone-300">
                  {OPERA_COMPONENTS.filter((c) => c.id !== 'aria').map((item) => {
                    const isSelected = selectedPart.id === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelectedPart(item)}
                        className={`py-4 px-3 transition-colors cursor-pointer flex items-start justify-between gap-4 ${
                          isSelected ? 'bg-[#F3EFE6]' : 'hover:bg-stone-100/80'
                        }`}
                      >
                        <div>
                          <div className="text-sm font-semibold text-stone-900">
                            {item.name} —{' '}
                            <span className="font-normal text-stone-700">
                              {item.id === 'recitative' &&
                                'ярианд ойр аялгуугаар дуулдаг хэсэг. Үйл явдлыг урагшлуулдаг.'}
                              {item.id === 'duet' &&
                                'хоёр, гурван дуучин хамт дуулдаг хэсэг.'}
                              {item.id === 'chorus' &&
                                'олон хүн хамт дуулдаг хэсэг.'}
                              {item.id === 'overture' &&
                                'дуурь эхлэхийн өмнө найрал хөгжмөөр тоглодог оршил хөгжим.'}
                            </span>
                          </div>
                          <div className="text-xs text-stone-500 mt-1">
                            {item.performers} · Дарж дэлгэрэнгүй харьцуулах
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPart(item);
                            handlePlayStructure(item.id);
                          }}
                          className="px-3 py-1.5 text-xs font-medium border border-stone-300 rounded bg-[#FBF9F5] hover:border-[#9A3412] hover:text-[#9A3412] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          {playingId === `part-${item.id}` ? 'Зогсоох' : 'Сонсох'}
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Highlight Quote from prompt */}
                <blockquote className="mt-6 py-5 px-6 bg-[#F3EFE6] border border-stone-300 rounded-lg font-editorial italic text-xl text-stone-900 leading-relaxed">
                  «Үүнтэй харьцуулахад ариа нь дуучны хоолойн гоо үзэмж, ур чадварыг
                  хамгийн сайн харуулдаг хэсэг тул үзэгчид ихэвчлэн ариа дууссаны дараа
                  хамгийн хүчтэй алга ташдаг.»
                </blockquote>
              </div>
            </div>

            {/* Right 5 cols: Interactive Opera Structure Simulator Sandbox */}
            <div className="lg:col-span-5">
              <div className="p-6 bg-[#F3EFE6] border border-stone-300 rounded-lg h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 pb-4 border-b border-stone-300">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-stone-500">
                        Интерактив Харьцуулалт
                      </span>
                      <h3 className="font-editorial text-2xl font-semibold text-stone-900">
                        Дуурийн хэсгүүдийн үүрэг
                      </h3>
                    </div>
                    <Sliders className="w-5 h-5 text-[#9A3412]" />
                  </div>

                  {/* Interactive selector buttons for all 5 parts */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {OPERA_COMPONENTS.map((part) => (
                      <button
                        key={part.id}
                        type="button"
                        onClick={() => setSelectedPart(part)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          selectedPart.id === part.id
                            ? 'bg-stone-900 text-white'
                            : 'bg-[#E5DEC9] text-stone-800 hover:bg-stone-300'
                        }`}
                      >
                        {part.name}
                      </button>
                    ))}
                  </div>

                  {/* Selected Component Details */}
                  <div className="mt-6 p-5 bg-[#FBF9F5] border border-stone-300 rounded-md">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-xs text-[#9A3412] font-medium">
                          {selectedPart.subtitle}
                        </div>
                        <h4 className="font-editorial text-2xl font-bold text-stone-900 mt-0.5">
                          {selectedPart.name}
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => handlePlayStructure(selectedPart.id)}
                        className="px-3.5 py-2 text-xs font-semibold bg-[#9A3412] text-white rounded hover:bg-[#7C2D12] transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        {playingId === `part-${selectedPart.id}` ? (
                          <>
                            <Square className="w-3.5 h-3.5" />
                            <span>Зогсоох</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5" />
                            <span>Жишээ эгшиглэл</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-sm text-stone-700 leading-relaxed mt-3">
                      {selectedPart.description}
                    </p>

                    {/* Quantitative Comparison Bars */}
                    <div className="mt-5 space-y-3.5 pt-4 border-t border-stone-200">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-stone-600 font-medium">
                            Үйл явдлыг урагшлуулах хурд
                          </span>
                          <span className="font-mono tabular-nums text-stone-900 font-semibold">
                            {selectedPart.plotSpeed}% —{' '}
                            {selectedPart.plotSpeed <= 20
                              ? 'Үйл явдал бараг зогсоно'
                              : selectedPart.plotSpeed >= 80
                              ? 'Хурдтай урагшилна'
                              : 'Дунд зэрэг'}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-stone-700 transition-transform duration-200 origin-left"
                            style={{
                              transform: `scaleX(${selectedPart.plotSpeed / 100})`,
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-stone-600 font-medium">
                            Сэтгэл хөдлөлийн төвлөрөл
                          </span>
                          <span className="font-mono tabular-nums text-[#9A3412] font-semibold">
                            {selectedPart.emotionalFocus}%
                          </span>
                        </div>
                        <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#9A3412] transition-transform duration-200 origin-left"
                            style={{
                              transform: `scaleX(${selectedPart.emotionalFocus / 100})`,
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-stone-600 font-medium">
                            Хоолойн гоо үзэмж, ур чадвар харуулалт
                          </span>
                          <span className="font-mono tabular-nums text-stone-900 font-semibold">
                            {selectedPart.vocalVirtuosity}%
                          </span>
                        </div>
                        <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-700 transition-transform duration-200 origin-left"
                            style={{
                              transform: `scaleX(${selectedPart.vocalVirtuosity / 100})`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-300 text-xs text-stone-600 space-y-1.5">
                  <div>
                    <strong className="text-stone-900">Тайзны хөдөлгөөн:</strong>{' '}
                    {selectedPart.stageBehavior}
                  </div>
                  <div>
                    <strong className="text-stone-900">Үзэгчдийн хүлээн авалт:</strong>{' '}
                    {selectedPart.audienceReaction}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 2: 2. АРИАГИЙН ҮҮСЭЛ, ХӨГЖИЛ
           ===================================================================== */}
        <section id="history" className="py-14 lg:py-20 border-b border-stone-300">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-8 border-b border-stone-200">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#9A3412] font-semibold">
                02 / Түүхэн Үечлэл (1600-аад он – 19-р зуун)
              </div>
              <h2
                className="font-editorial text-3xl lg:text-4xl font-semibold text-stone-900 mt-2"
                style={{ textWrap: 'balance' }}
              >
                2. Ариагийн үүсэл, хөгжил
              </h2>
            </div>
            <p className="text-sm text-stone-600 max-w-md">
              Дуурийн түүхийг хэд хэдэн үеэр хуваан үздэг. Үе бүрт ариа өөр өөр хэлбэртэй
              болсон.
            </p>
          </div>

          {/* Interactive Timeline Stepper */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {HISTORICAL_ERAS.map((era, idx) => {
              const isSelected = selectedEra.id === era.id;
              return (
                <button
                  key={era.id}
                  type="button"
                  onClick={() => setSelectedEra(era)}
                  className={`text-left p-5 rounded-lg border transition-colors cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-stone-900 text-stone-100 border-stone-900'
                      : 'bg-[#F3EFE6] text-stone-900 border-stone-300 hover:bg-[#EBE6DF]'
                  }`}
                >
                  <div>
                    <div
                      className={`text-xs font-mono tabular-nums ${
                        isSelected ? 'text-amber-300' : 'text-[#9A3412]'
                      }`}
                    >
                      0{idx + 1} · {era.timeframe}
                    </div>
                    <h3 className="font-editorial text-2xl font-semibold mt-1">
                      {era.periodName}
                    </h3>
                    <p
                      className={`text-xs mt-2 leading-relaxed ${
                        isSelected ? 'text-stone-300' : 'text-stone-600'
                      }`}
                    >
                      {era.keyFeature}
                    </p>
                  </div>
                  <div
                    className={`mt-4 pt-3 border-t text-xs font-medium ${
                      isSelected
                        ? 'border-stone-700 text-stone-200'
                        : 'border-stone-300 text-stone-700'
                    }`}
                  >
                    Төлөөлөгч: {era.representativeComposer}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Era Deep-Dive Inspector */}
          <div className="mt-8 p-6 lg:p-8 bg-[#F3EFE6] border border-stone-300 rounded-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center gap-2 text-xs text-stone-600 font-mono tabular-nums">
                <span>{selectedEra.periodName}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedEra.timeframe}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedEra.representativeComposer}</span>
              </div>
              <h3 className="font-editorial text-2xl lg:text-3xl font-semibold text-stone-900">
                {selectedEra.periodName} ({selectedEra.timeframe}) — Онцлог шинж
              </h3>
              <p className="text-base text-stone-800 leading-relaxed">
                {selectedEra.keyFeature}
              </p>
              <p className="text-sm text-stone-600 leading-relaxed pt-2 border-t border-stone-300/80">
                <strong className="text-stone-900">Түүхэн тайлбар:</strong>{' '}
                {selectedEra.curatorialNote}
              </p>
              <div className="pt-2 text-xs text-stone-700">
                <strong className="text-stone-900">Хөгжмийн бүтэц:</strong>{' '}
                {selectedEra.structurePattern}
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#FBF9F5] p-5 border border-stone-300 rounded-md space-y-4">
              <div className="text-xs uppercase tracking-wider text-stone-500 font-semibold">
                Үеийн хэлбэрийн үзүүлэлт
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Хоолойн чимэглэл (Колоратур / Импровизаци)</span>
                  <span className="font-mono tabular-nums font-semibold">
                    {selectedEra.ornamentationLevel}%
                  </span>
                </div>
                <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-700 transition-transform duration-200 origin-left"
                    style={{
                      transform: `scaleX(${selectedEra.ornamentationLevel / 100})`,
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Дүрийн зан чанарт нийцсэн байгалийн шинж</span>
                  <span className="font-mono tabular-nums font-semibold">
                    {selectedEra.dramaticNaturalism}%
                  </span>
                </div>
                <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-stone-800 transition-transform duration-200 origin-left"
                    style={{
                      transform: `scaleX(${selectedEra.dramaticNaturalism / 100})`,
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Сэтгэл хөдлөлийн хүч ба драмын оргиллол</span>
                  <span className="font-mono tabular-nums font-semibold text-[#9A3412]">
                    {selectedEra.emotionalIntensity}%
                  </span>
                </div>
                <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#9A3412] transition-transform duration-200 origin-left"
                    style={{
                      transform: `scaleX(${selectedEra.emotionalIntensity / 100})`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Complete Reference Table matching the prompt's exact table */}
          <div className="mt-8 overflow-x-auto border border-stone-300 rounded-lg bg-[#FBF9F5]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-300 bg-[#EBE6DF] text-xs uppercase tracking-wider text-stone-700">
                  <th className="py-3.5 px-5 font-semibold w-1/3">Үе</th>
                  <th className="py-3.5 px-5 font-semibold">Онцлог</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-sm">
                {HISTORICAL_ERAS.map((era) => (
                  <tr
                    key={era.id}
                    onClick={() => setSelectedEra(era)}
                    className={`cursor-pointer transition-colors ${
                      selectedEra.id === era.id ? 'bg-[#F3EFE6]' : 'hover:bg-stone-100/70'
                    }`}
                  >
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
        </section>

        {/* =====================================================================
            SECTION 3: 3. ДУУЧДЫН ХООЛОЙН ТӨРӨЛ
           ===================================================================== */}
        <section id="voices" className="py-14 lg:py-20 border-b border-stone-300">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-8 border-b border-stone-200">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#9A3412] font-semibold">
                03 / Хоолойн Цараа ба Дүрийн Хуваарилалт
              </div>
              <h2
                className="font-editorial text-3xl lg:text-4xl font-semibold text-stone-900 mt-2"
                style={{ textWrap: 'balance' }}
              >
                3. Дуучдын хоолойн төрөл
              </h2>
            </div>
            <p className="text-sm text-stone-700 max-w-lg">
              Хүний хоолойг өндөр, нам байдлаар нь хэд хэдэн төрөлд хуваадаг. Зохиолч ариа
              бүрийг тодорхой хоолойд зориулж бичдэг тул дуучин өөрийн хоолойд тохирсон
              дүр, ариаг дуулдаг.
            </p>
          </div>

          {/* Two-Zone Educational Sandbox for Vocal Pitch & Frequency */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            {/* Left Zone (7 cols): Interactive 4-Octave Vocal Range Visualizer & Piano Keyboard */}
            <div className="lg:col-span-7 p-6 bg-[#F3EFE6] border border-stone-300 rounded-lg flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-300">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-stone-500">
                      Интерактив Акустик Сандбокс
                    </span>
                    <h3 className="font-editorial text-2xl font-semibold text-stone-900">
                      {selectedVoice.name} ({selectedVoice.gender} · {selectedVoice.pitchRegister} хоолой)
                    </h3>
                  </div>

                  {/* Interactive Filter Buttons: Бүгд / Эмэгтэй / Эрэгтэй */}
                  <div className="flex items-center gap-1 p-1 bg-[#E5DEC9] rounded-md">
                    {(['Бүгд', 'Эмэгтэй', 'Эрэгтэй'] as const).map((filterLabel) => (
                      <button
                        key={filterLabel}
                        type="button"
                        onClick={() => {
                          setVoiceGenderFilter(filterLabel);
                          if (filterLabel === 'Эмэгтэй' && selectedVoice.gender !== 'Эмэгтэй') {
                            setSelectedVoice(VOICE_TYPES[0]);
                          } else if (
                            filterLabel === 'Эрэгтэй' &&
                            selectedVoice.gender !== 'Эрэгтэй'
                          ) {
                            setSelectedVoice(VOICE_TYPES[3]);
                          }
                        }}
                        className={`px-3 py-1 text-xs font-semibold rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          voiceGenderFilter === filterLabel
                            ? 'bg-stone-900 text-white'
                            : 'text-stone-700 hover:text-stone-900'
                        }`}
                      >
                        {filterLabel}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Voice Selector Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
                  {filteredVoices.map((v) => {
                    const active = selectedVoice.id === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => {
                          setSelectedVoice(v);
                          setCustomPitchFreq(Math.round((v.freqMin + v.freqMax) / 2));
                        }}
                        className={`p-3 rounded-md border text-left transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#9A3412] text-white border-[#9A3412]'
                            : 'bg-[#FBF9F5] text-stone-900 border-stone-300 hover:bg-stone-100'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm">{v.name}</span>
                          <span
                            className={`text-[11px] ${
                              active ? 'text-stone-200' : 'text-stone-500'
                            }`}
                          >
                            {v.gender}
                          </span>
                        </div>
                        <div
                          className={`text-xs font-mono tabular-nums mt-1 ${
                            active ? 'text-amber-200' : 'text-stone-600'
                          }`}
                        >
                          {v.noteRangeLabel}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Visual Keyboard Range Map (E2 to C6) */}
                <div className="mt-6 p-4 bg-[#FBF9F5] border border-stone-300 rounded-md">
                  <div className="flex items-center justify-between text-xs text-stone-600 mb-2">
                    <span>Төгөлдөр хуурын ноотны цараа (E2 – C6): Дарж ноот сонсоно уу</span>
                    <span className="font-mono tabular-nums font-semibold text-[#9A3412]">
                      Идэвхтэй муж: {selectedVoice.noteRangeLabel}
                    </span>
                  </div>

                  <div className="grid grid-cols-9 sm:grid-cols-27 gap-0.5 pt-1">
                    {KEYBOARD_NOTES.map((item, index) => {
                      const inRange =
                        index >= selectedVoice.startKeyIndex &&
                        index <= selectedVoice.endKeyIndex;
                      const isPlayingThisKey = playingId === `key-${item.note}`;

                      return (
                        <button
                          key={item.note}
                          type="button"
                          onClick={() => handlePlaySingleKey(item.note, item.freq)}
                          title={`${item.note} (${Math.round(item.freq)} Гц)`}
                          className={`h-16 rounded-b flex flex-col items-center justify-end pb-1 text-[9px] font-mono tabular-nums border transition-colors cursor-pointer ${
                            isPlayingThisKey
                              ? 'bg-stone-900 text-white border-stone-900'
                              : inRange
                              ? 'bg-[#9A3412] text-white border-[#7C2D12] hover:bg-[#7C2D12]'
                              : 'bg-white text-stone-500 border-stone-300 hover:bg-stone-100'
                          }`}
                        >
                          <span>{item.note}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Interactive Frequency Slider */}
                  <div className="mt-5 pt-4 border-t border-stone-200">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <label htmlFor="freq-slider" className="font-medium text-stone-700">
                        Давтамж шалгах гулсуур (Гц / Hz):
                      </label>
                      <span className="font-mono tabular-nums font-semibold text-stone-900">
                        Дууны давтамж: {customPitchFreq} Гц
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        id="freq-slider"
                        type="range"
                        min={82}
                        max={1046}
                        value={customPitchFreq}
                        onChange={(e) => setCustomPitchFreq(Number(e.target.value))}
                        className="w-full accent-[#9A3412] cursor-pointer"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handlePlaySingleKey(`${customPitchFreq}Hz`, customPitchFreq)
                        }
                        className="px-3 py-1.5 text-xs font-semibold bg-stone-900 text-white rounded hover:bg-[#9A3412] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Эгшиглүүлэх
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Selected Voice Details & Demo Trigger */}
              <div className="mt-5 pt-4 border-t border-stone-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-stone-900">
                    {selectedVoice.name}:{' '}
                    <span className="font-normal text-stone-700">
                      {selectedVoice.description}
                    </span>
                  </div>
                  <div className="text-xs text-stone-600">
                    <strong>Алдартай дүр:</strong> {selectedVoice.famousExample}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handlePlayVoiceDemo(selectedVoice.id)}
                  className="px-4 py-2.5 bg-[#9A3412] text-white text-xs font-semibold rounded-md hover:bg-[#7C2D12] transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {playingId === `voice-${selectedVoice.id}` ? (
                    <>
                      <Square className="w-3.5 h-3.5" />
                      <span>Зогсоох</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4" />
                      <span>{selectedVoice.name} цараа сонсох</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Zone (5 cols): Exact Curriculum Table of the 6 Voice Types */}
            <div className="lg:col-span-5 flex flex-col justify-between border border-stone-300 rounded-lg bg-[#FBF9F5] overflow-hidden">
              <div className="p-5 bg-[#EBE6DF] border-b border-stone-300">
                <h3 className="font-editorial text-xl font-semibold text-stone-900">
                  Хоолойн төрлүүдийн хүснэгт
                </h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  Мөр дээр дарж тухайн хоолойн дуугаралт ба царааг шалгана уу
                </p>
              </div>

              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-stone-300 bg-stone-100 text-xs uppercase tracking-wider text-stone-600">
                      <th className="py-3 px-4 font-semibold">Хоолой</th>
                      <th className="py-3 px-3 font-semibold">Хэн дуулдаг</th>
                      <th className="py-3 px-4 font-semibold">Онцлог</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 text-sm">
                    {VOICE_TYPES.map((voice) => {
                      const active = selectedVoice.id === voice.id;
                      return (
                        <tr
                          key={voice.id}
                          onClick={() => setSelectedVoice(voice)}
                          className={`cursor-pointer transition-colors ${
                            active ? 'bg-[#F3EFE6]' : 'hover:bg-stone-100/70'
                          }`}
                        >
                          <td className="py-3.5 px-4 font-semibold text-stone-900 whitespace-nowrap">
                            {voice.name}
                          </td>
                          <td className="py-3.5 px-3 text-stone-700 whitespace-nowrap">
                            {voice.gender}
                          </td>
                          <td className="py-3.5 px-4 text-stone-800 leading-snug">
                            {voice.description}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-[#F3EFE6] border-t border-stone-300 text-xs text-stone-600">
                Зохиолч ариа бүрийг тодорхой хоолойд зориулж бичдэг тул дуучин өөрийн
                хоолойд тохирсон дүр, ариаг дуулдаг.
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 4: 4. АЛДАРТАЙ ЗОХИОЛЧ, АРИА
           ===================================================================== */}
        <section id="masterworks" className="py-14 lg:py-20 border-b border-stone-300">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-8 border-b border-stone-200">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#9A3412] font-semibold">
                04 / Дэлхийн Сонгодог Сан Хөмрөг
              </div>
              <h2
                className="font-editorial text-3xl lg:text-4xl font-semibold text-stone-900 mt-2"
                style={{ textWrap: 'balance' }}
              >
                4. Алдартай зохиолч, ариа
              </h2>
              <p className="text-sm text-stone-600 mt-1">
                Дэлхийн алдартай дуурийн зохиолчид олон бий. Тэдний зарим алдартай бүтээлийг
                доор оруулав.
              </p>
            </div>

            {/* Country Filter Segmented Control */}
            <div className="flex items-center gap-1 p-1 bg-[#EBE6DF] rounded-md self-start lg:self-auto">
              {['Бүгд', 'Австри', 'Итали', 'Франц'].map((country) => (
                <button
                  key={country}
                  type="button"
                  onClick={() => setCountryFilter(country)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    countryFilter === country
                      ? 'bg-stone-900 text-white'
                      : 'text-stone-700 hover:text-stone-900'
                  }`}
                >
                  {country}
                </button>
              ))}
            </div>
          </div>

          {/* Museum Accession Catalog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            {filteredMasterworks.map((work) => {
              const isPlaying = playingId === `master-${work.id}`;
              const isSelected = activeMasterwork.id === work.id;

              return (
                <article
                  key={work.id}
                  onClick={() => setActiveMasterwork(work)}
                  className={`border rounded-lg overflow-hidden transition-colors flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'border-[#9A3412] bg-[#F3EFE6]'
                      : 'border-stone-300 bg-[#FBF9F5] hover:bg-[#F3EFE6]/60'
                  }`}
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
                        <span>{work.accessionCode}</span>
                        <span aria-hidden="true">·</span>
                        <span>{work.country}</span>
                        <span aria-hidden="true">·</span>
                        <span>{work.lifespan}</span>
                        <span aria-hidden="true">·</span>
                        <span>{work.voiceType}</span>
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

                      {/* Accession Metadata Definition List */}
                      <dl className="mt-5 pt-4 border-t border-stone-300/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <dt className="text-stone-500">Гол ариа ба хоолой</dt>
                          <dd className="font-medium text-stone-900 mt-0.5">
                            {work.featuredAria} ({work.voiceType})
                          </dd>
                        </div>
                        <div>
                          <dt className="text-stone-500">Хөгжмийн онцлог</dt>
                          <dd className="font-medium text-stone-800 mt-0.5">
                            {work.musicalHighlight}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  <div className="px-6 py-4 bg-[#EBE6DF]/70 border-t border-stone-300 flex items-center justify-between gap-4">
                    <span className="text-xs text-stone-600 font-mono tabular-nums">
                      Анх тоглогдсон: {work.premiereYear}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayMasterwork(work.id);
                      }}
                      className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded hover:bg-[#9A3412] transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {isPlaying ? (
                        <>
                          <Square className="w-3.5 h-3.5" />
                          <span>Ая зогсоох</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5" />
                          <span>Арианы аялгуу сонсох</span>
                        </>
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="mt-8 text-base text-stone-700 font-editorial italic text-center">
            Эдгээр зохиолчид өөр өөр орны хүмүүс боловч тэдний бүтээл дэлхий даяар
            дуулагдаж, тоглогдсоор байна.
          </p>
        </section>

        {/* =====================================================================
            INTERACTIVE SELF-TEST QUIZ (МЭДЛЭГ БАТАЛГААЖУУЛАХ СОРИЛ)
           ===================================================================== */}
        <section id="quiz" className="py-14 lg:py-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-8 border-b border-stone-200">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#9A3412] font-semibold">
                Интерактив Баталгаажуулалт · 6 Асуулт
              </div>
              <h2
                className="font-editorial text-3xl lg:text-4xl font-semibold text-stone-900 mt-2"
                style={{ textWrap: 'balance' }}
              >
                Мэдлэг шалгах сорил
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm font-mono tabular-nums text-stone-700">
                Хариулсан: {Object.keys(selectedAnswers).length} / {QUIZ_QUESTIONS.length}
                {showQuizResults && (
                  <span className="ml-3 font-bold text-[#9A3412]">
                    · Оноо: {quizScore} / {QUIZ_QUESTIONS.length}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedAnswers({});
                  setShowQuizResults(false);
                }}
                className="px-3.5 py-2 text-xs font-semibold border border-stone-300 rounded bg-[#F3EFE6] hover:bg-stone-200 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Дахин эхлэх</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {QUIZ_QUESTIONS.map((q) => {
              const userChoice = selectedAnswers[q.id];
              const isAnswered = userChoice !== undefined;
              const isCorrect = userChoice === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className="p-6 bg-[#F3EFE6] border border-stone-300 rounded-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                      <span className="font-mono tabular-nums">Асуулт 0{q.id}</span>
                      <span>{q.sectionRef}</span>
                    </div>

                    <h3 className="font-editorial text-xl font-semibold text-stone-900 leading-snug">
                      {q.question}
                    </h3>

                    <div className="mt-4 space-y-2">
                      {q.options.map((opt, idx) => {
                        const selected = userChoice === idx;
                        let btnStyle =
                          'bg-[#FBF9F5] border-stone-300 text-stone-800 hover:bg-stone-100';

                        if (showQuizResults || isAnswered) {
                          if (idx === q.correctIndex) {
                            btnStyle =
                              'bg-emerald-950/10 border-emerald-700 text-stone-900 font-semibold';
                          } else if (selected && idx !== q.correctIndex) {
                            btnStyle =
                              'bg-red-950/10 border-red-700 text-red-950 font-medium';
                          }
                        } else if (selected) {
                          btnStyle = 'bg-stone-900 border-stone-900 text-white';
                        }

                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() =>
                              setSelectedAnswers((prev) => ({ ...prev, [q.id]: idx }))
                            }
                            className={`w-full text-left p-3 rounded border text-sm transition-colors flex items-start justify-between gap-3 cursor-pointer ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {isAnswered && idx === q.correctIndex && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                            )}
                            {isAnswered && selected && idx !== q.correctIndex && (
                              <XCircle className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {isAnswered && (
                    <div className="mt-4 pt-3 border-t border-stone-300 text-xs text-stone-700">
                      <span className="font-semibold text-stone-900">
                        {isCorrect ? 'Зөв хариуллаа: ' : 'Тайлбар: '}
                      </span>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-[#EBE6DF] border border-stone-300 rounded-lg">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-[#9A3412] shrink-0" />
              <div className="text-sm text-stone-800">
                Бүх асуултад хариулж дууссаны дараа оноогоо нэгтгэн дүгнэнэ үү.
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowQuizResults(true)}
              className="px-5 py-2.5 bg-[#9A3412] text-white text-xs font-semibold rounded-md hover:bg-[#7C2D12] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Дүн нэгтгэж харах ({quizScore}/{QUIZ_QUESTIONS.length})
            </button>
          </div>
        </section>
      </main>

      {/* CLEAN EDITORIAL FOOTER */}
      <footer className="border-t border-stone-300 bg-[#F3EFE6] py-8 px-6 lg:px-12 mt-12">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600">
          <div className="font-editorial text-base font-semibold text-stone-900">
            Ариа · Дуурийн Урлагийн Танхим
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
