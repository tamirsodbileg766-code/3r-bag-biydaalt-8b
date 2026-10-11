import heroStageImg from '../assets/images/opera_stage_hero_1791726848812.jpg';
import mozartQueenImg from '../assets/images/mozart_queen_night_1791726863659.jpg';
import verdiTraviataImg from '../assets/images/verdi_traviata_stage_1791726876099.jpg';
import bizetCarmenImg from '../assets/images/bizet_carmen_habanera_1791726890602.jpg';
import pucciniTurandotImg from '../assets/images/puccini_turandot_stage_1791726903232.jpg';

export interface OperaComponentItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  performers: string;
  plotSpeed: number;        // 0 to 100
  emotionalFocus: number;   // 0 to 100
  vocalVirtuosity: number;  // 0 to 100
  stageBehavior: string;
  audienceReaction: string;
}

export interface EmotionItem {
  id: string;
  label: string;
  musicalCharacter: string;
  exampleRole: string;
  freq: number;
}

export interface HistoricalEra {
  id: string;
  periodName: string;
  timeframe: string;
  keyFeature: string;
  representativeComposer: string;
  structurePattern: string;
  ornamentationLevel: number; // 1 to 100
  dramaticNaturalism: number; // 1 to 100
  emotionalIntensity: number; // 1 to 100
  curatorialNote: string;
}

export interface VoiceType {
  id: string;
  name: string;
  gender: 'Эмэгтэй' | 'Эрэгтэй';
  pitchRegister: 'Өндөр' | 'Дунд' | 'Нам';
  description: string;
  typicalRoles: string;
  noteRangeLabel: string;
  freqMin: number;
  freqMax: number;
  startKeyIndex: number; // relative on visual keyboard (0 to 27)
  endKeyIndex: number;
  famousExample: string;
}

export interface MasterworkItem {
  id: string;
  composer: string;
  country: string;
  lifespan: string;
  featuredOpera: string;
  otherOperas: string[];
  featuredAria: string;
  voiceType: string;
  description: string;
  musicalHighlight: string;
  imageUrl: string;
  accessionCode: string;
  premiereYear: string;
}

export interface QuizQuestion {
  id: number;
  sectionRef: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const HERO_IMAGE_URL = heroStageImg;

export const ARIA_EMOTIONS: EmotionItem[] = [
  {
    id: 'love',
    label: 'Хайр',
    musicalCharacter: 'Зөөлөн уянгалаг (кантилена), дулаан тембр, урт амьсгаатай аялгуу',
    exampleRole: 'Виолетта («Травиата»), Кармен («Хабанера»)',
    freq: 523.25,
  },
  {
    id: 'joy',
    label: 'Баяр',
    musicalCharacter: 'Хурдан хэмнэлтэй, гэгээлэг мажорын өнгө, хөнгөн чимэглэлтэй үсрэлтүүд',
    exampleRole: 'Розина, Норина зэрэг уянгалаг сопрано дүрүүд',
    freq: 659.25,
  },
  {
    id: 'grief',
    label: 'Уй гашуу',
    musicalCharacter: 'Удаан темп (ларго, адажио), минорын гунигт эгшиглэл, гүнзгий динамик',
    exampleRole: 'Чио-Чио-сан («Мадам Баттерфлай»), Флория Тоска',
    freq: 392.00,
  },
  {
    id: 'fear',
    label: 'Айдас',
    musicalCharacter: 'Чичирхийлсэн тремоло найрал хөгжим, гэнэтийн пауз, түгшүүртэй өнгөний солигдол',
    exampleRole: 'Риголетто, Тамино',
    freq: 466.16,
  },
  {
    id: 'anger',
    label: 'Уур',
    musicalCharacter: 'Маш өндөр өнгө, хурдан колоратур стаккато, хүчтэй форте акцентууд',
    exampleRole: 'Шөнийн хатан («Шидэт лимбэ» дуурийн ариа)',
    freq: 880.00,
  },
  {
    id: 'hope',
    label: 'Найдвар',
    musicalCharacter: 'Аажмаар өгсөх аялгуу, оргил цэгтээ цэлмэг өндөр ноотоор төгсөх бүтэц',
    exampleRole: 'Ханхүү Калаф («Турандот» — Nessun dorma)',
    freq: 587.33,
  },
];

export const OPERA_COMPONENTS: OperaComponentItem[] = [
  {
    id: 'aria',
    name: 'Ариа',
    subtitle: 'Гоцлол дуу · Дүрийн дотоод сэтгэлийн илэрхийлэл',
    description:
      'Ариа гэдэг нь дуурийн нэг дүрийн дуулдаг гоцлол дуу. Ариагаар дүр өөрийн хайр, баяр, уй гашуу, айдас, уур, найдвараа нээж хэлдэг. Ариа дуулах үед үйл явдал бараг зогсож, үзэгчид зөвхөн тэр дүрийн сэтгэлд анхаарлаа төвлөрүүлдэг.',
    performers: '1 гоцлол дуучин + Найрал хөгжим',
    plotSpeed: 10,
    emotionalFocus: 100,
    vocalVirtuosity: 100,
    stageBehavior: 'Үйл явдал бараг зогсож, цаг хугацаа дүрийн дотоод ертөнцөд төвлөрнө.',
    audienceReaction: 'Дуучны хоолойн гоо үзэмж, ур чадварыг хамгийн сайн харуулдаг тул ариа дууссаны дараа үзэгчид хамгийн хүчтэй алга ташдаг.',
  },
  {
    id: 'recitative',
    name: 'Речитатив',
    subtitle: 'Үйл явдлыг урагшлуулагч үгэн аялгуу',
    description:
      'Ярианд ойр аялгуугаар дуулдаг хэсэг. Үйл явдлыг урагшлуулдаг бөгөөд дүрүүдийн хоорондох харилцан яриа, шийдвэр, нөхцөл байдлын өөрчлөлтийг үзэгчдэд ойлгомжтой хүргэдэг.',
    performers: '1 буюу хэд хэдэн дуучин (цөөхөн хөгжмийн дагалттай)',
    plotSpeed: 95,
    emotionalFocus: 40,
    vocalVirtuosity: 35,
    stageBehavior: 'Дүрүүд тайзан дээр идэвхтэй хөдөлж, харилцан ярилцаж үйл явдлыг өрнүүлнэ.',
    audienceReaction: 'Үзэгчид жүжгийн утга санаа, дараагийн ариа эхлэх шалтгааныг анхааралтай дагадаг.',
  },
  {
    id: 'duet',
    name: 'Дуэт, трио',
    subtitle: 'Цөөхүүл дуулах хоршил хэсэг',
    description:
      'Хоёр (дуэт), гурван (трио) дуучин хамт дуулдаг хэсэг. Дүрүүдийн хоорондох хайр дурлал, маргаан, эвлэрэл эсвэл зөрчилдөөнийг хоолойн хоршлоор зэрэг илэрхийлдэг.',
    performers: '2 эсвэл 3 гоцлол дуучин хамт',
    plotSpeed: 50,
    emotionalFocus: 85,
    vocalVirtuosity: 85,
    stageBehavior: 'Дүрүүдийн харилцааны оргил мөч болон сэтгэл зүйн огтлолцлыг харуулна.',
    audienceReaction: 'Өөр өөр өнгийн хоолойнууд (жишээ нь сопрано ба тенор) хэрхэн уусан хоршиж буйг таашаан сонсдог.',
  },
  {
    id: 'chorus',
    name: 'Найрал дуу',
    subtitle: 'Олон дуучны сүрлэг нэгдэл',
    description:
      'Олон хүн хамт дуулдаг хэсэг. Ард түмэн, цэргүүд, зочид зэрэг олон нийтийн уур амьсгал, баяр ёслол, тэмцэл эсвэл гашуудлыг өргөн цар хүрээтэйгээр илэрхийлдэг.',
    performers: 'Найрал дууны чуулга (20–80+ дуучин)',
    plotSpeed: 45,
    emotionalFocus: 80,
    vocalVirtuosity: 70,
    stageBehavior: 'Тайз дүүрэн олон хүний хөдөлгөөн, нийгмийн болон түүхэн орчныг бүрдүүлнэ.',
    audienceReaction: 'Танхим дүүрэн цуурайтах сүр хүчтэй дуугаралт үзэгчдэд гүн сэтгэгдэл төрүүлдэг.',
  },
  {
    id: 'overture',
    name: 'Увертюра',
    subtitle: 'Дуурийн хөгжмийн оршил',
    description:
      'Дуурь эхлэхийн өмнө найрал хөгжмөөр тоглодог оршил хөгжим. Дуурийн гол аялгуунууд болон ерөнхий уур амьсгалыг (эмгэнэлт, баяр баясгалант, сүрлэг) үзэгчдэд урьдчилан мэдрүүлдэг.',
    performers: 'Симфони найрал хөгжим (дуучингүй)',
    plotSpeed: 20,
    emotionalFocus: 75,
    vocalVirtuosity: 15,
    stageBehavior: 'Хөшиг нээгдэхээс өмнө тоглогдож, үзэгчдийг дуурийн ертөнцөд хөтлөн оруулна.',
    audienceReaction: 'Удирдаач гарч ирэх болон оршил хөгжим дуусахад алга ташин жүжгийг угтана.',
  },
];

export const HISTORICAL_ERAS: HistoricalEra[] = [
  {
    id: 'early',
    periodName: 'Эхэн үе',
    timeframe: '1600-аад он',
    keyFeature: 'Дуурь шинээр үүсч, ариа энгийн, ярианд ойр байсан. Итали зохиолч Монтеверди энэ үед олны танил болсон.',
    representativeComposer: 'Клаудио Монтеверди (Итали)',
    structurePattern: 'Ярианд ойр чөлөөт аялгуу (Recitar cantando)',
    ornamentationLevel: 25,
    dramaticNaturalism: 85,
    emotionalIntensity: 60,
    curatorialNote: 'Италийн Флоренц хотод эртний Грекийн жүжгийг сэргээх оролдлогоос дуурь мэндэлж, үгийн утгыг тод хүргэх энгийн ариа үүсэв.',
  },
  {
    id: 'baroque',
    periodName: 'Барокко үе',
    timeframe: '17–18-р зуун',
    keyFeature: 'Ариа урт, чимэглэл ихтэй болж, дуучид хоолойн ур чадвараа харуулдаг болсон. Ихэнх ариа эхний хэсгээ төгсгөлд нь давтдаг байсан.',
    representativeComposer: 'Г.Ф. Хэндель, А. Вивальди',
    structurePattern: 'A – B – A (Da Capo буюу эхний хэсгээ чимэглэн давтах хэлбэр)',
    ornamentationLevel: 95,
    dramaticNaturalism: 45,
    emotionalIntensity: 70,
    curatorialNote: 'Дуучид эхний хэсгийг (A) төгсгөлд нь давтахдаа өөрийн хоолойн хурд, уян хатан чадварыг гайхуулсан уран чимэглэл (импровизаци) нэмж дуулдаг байв.',
  },
  {
    id: 'classical',
    periodName: 'Сонгодог үе',
    timeframe: '18-р зууны сүүл',
    keyFeature: 'Моцарт зэрэг зохиолчид ариаг дүрийн зан чанарт тохируулж, илүү байгалийн, ойлгомжтой болгосон.',
    representativeComposer: 'Вольфганг Амадей Моцарт (Австри)',
    structurePattern: 'Тэнцвэртэй, дүрийн сэтгэл зүйг дагасан тод хэлбэр',
    ornamentationLevel: 65,
    dramaticNaturalism: 95,
    emotionalIntensity: 85,
    curatorialNote: 'Хийсвэр гоёл чимэглэлээс илүү тухайн дүр ямар хүн бэ, юу мэдэрч байна вэ гэдгийг байгалийн бөгөөд уран сайхны өндөр түвшинд илэрхийлэх болов.',
  },
  {
    id: 'romantic',
    periodName: 'Романтик үе',
    timeframe: '19-р зуун',
    keyFeature: 'Верди, Пуччини нар ариаг гүн мэдрэмжтэй, хүчтэй, сэтгэл хөдөлгөм болгосон. Өнөөдөр хамгийн алдартай ариа ихэнх нь энэ үеийнх.',
    representativeComposer: 'Жузеппе Верди, Жорж Бизе, Жакомо Пуччини',
    structurePattern: 'Өргөн цараатай уянгалаг оргиллол ба драмын хүчтэй тэсрэлт',
    ornamentationLevel: 55,
    dramaticNaturalism: 90,
    emotionalIntensity: 100,
    curatorialNote: 'Том бүрэлдэхүүнтэй найрал хөгжмийн дээгүүр цуурайтах хүчирхэг хоолой, хүний амьдралын хайр, хувь заяа, эмгэнэлийг сэтгэл хөдөлгөм аялгуугаар мөнхөлсөн үе.',
  },
];

export const VOICE_TYPES: VoiceType[] = [
  {
    id: 'soprano',
    name: 'Сопрано',
    gender: 'Эмэгтэй',
    pitchRegister: 'Өндөр',
    description: 'Хамгийн өндөр, хөнгөн цэлмэг дуу. Ихэвчлэн гол эмэгтэй дүр.',
    typicalRoles: 'Гол эмэгтэй дүр, залуу дурлалт бүсгүй, хатан, гүнж',
    noteRangeLabel: 'C4 – C6 (261 – 1046 Гц)',
    freqMin: 261,
    freqMax: 1046,
    startKeyIndex: 12,
    endKeyIndex: 26,
    famousExample: 'Шөнийн хатан («Шидэт лимбэ»), Виолетта («Травиата»)',
  },
  {
    id: 'mezzo',
    name: 'Меццо-сопрано',
    gender: 'Эмэгтэй',
    pitchRegister: 'Дунд',
    description: 'Дунд зэргийн, арай бүдүүн хоолой.',
    typicalRoles: 'Эрч хүчтэй, хурц зан чанартай эмэгтэй дүр, эх хүн, залуу хөвгүүний дүр',
    noteRangeLabel: 'A3 – A5 (220 – 880 Гц)',
    freqMin: 220,
    freqMax: 880,
    startKeyIndex: 9,
    endKeyIndex: 23,
    famousExample: 'Кармен («Кармен» дуурийн Хабанера)',
  },
  {
    id: 'alto',
    name: 'Альт',
    gender: 'Эмэгтэй',
    pitchRegister: 'Нам',
    description: 'Хамгийн нам эмэгтэй хоолой, ховор.',
    typicalRoles: 'Гүн ухаантай, нууцлаг, эсвэл эрхэмсэг ахмад эмэгтэй дүр',
    noteRangeLabel: 'F3 – F5 (175 – 698 Гц)',
    freqMin: 175,
    freqMax: 698,
    startKeyIndex: 7,
    endKeyIndex: 21,
    famousExample: 'Ольга («Евгений Онегин»), Эрда («Рейний алт»)',
  },
  {
    id: 'tenor',
    name: 'Тенор',
    gender: 'Эрэгтэй',
    pitchRegister: 'Өндөр',
    description: 'Хамгийн өндөр эрэгтэй хоолой. Ихэвчлэн хайрт залуу, баатар.',
    typicalRoles: 'Хайрт залуу, зоригт баатар, ханхүү, уянгын гол дүр',
    noteRangeLabel: 'C3 – C5 (130 – 523 Гц)',
    freqMin: 130,
    freqMax: 523,
    startKeyIndex: 5,
    endKeyIndex: 19,
    famousExample: 'Ханхүү Калаф («Турандот» дуурийн Nessun dorma)',
  },
  {
    id: 'baritone',
    name: 'Баритон',
    gender: 'Эрэгтэй',
    pitchRegister: 'Дунд',
    description: 'Дунд зэргийн эрэгтэй хоолой.',
    typicalRoles: 'Олон талт зан чанартай дүр, эцэг, анд нөхөр, цэргийн жанжин',
    noteRangeLabel: 'A2 – A4 (110 – 440 Гц)',
    freqMin: 110,
    freqMax: 440,
    startKeyIndex: 2,
    endKeyIndex: 16,
    famousExample: 'Риголетто («Риголетто»), Эскамильо («Кармен»)',
  },
  {
    id: 'bass',
    name: 'Бас',
    gender: 'Эрэгтэй',
    pitchRegister: 'Нам',
    description: 'Хамгийн нам, хүнд эрэгтэй хоолой. Ихэвчлэн ахмад, хаан, хүчтэй дүр.',
    typicalRoles: 'Ахмад настан, хаан, тэргүүн тахилч, сүр хүчтэй дүр',
    noteRangeLabel: 'E2 – E4 (82 – 330 Гц)',
    freqMin: 82,
    freqMax: 330,
    startKeyIndex: 0,
    endKeyIndex: 14,
    famousExample: 'Зарастро («Шидэт лимбэ»), Борис Годунов',
  },
];

export const FAMOUS_MASTERWORKS: MasterworkItem[] = [
  {
    id: 'mozart',
    composer: 'Вольфганг Амадей Моцарт',
    country: 'Австри',
    lifespan: '1756 – 1791',
    featuredOpera: '«Шидэт лимбэ» (Die Zauberflöte)',
    otherOperas: ['«Фигарогийн хурим»', '«Дон Жуан»'],
    featuredAria: 'Шөнийн хатны ариа (Der Hölle Rache)',
    voiceType: 'Сопрано',
    description:
      '«Шидэт лимбэ» дуурийн Шөнийн хатны ариа маш өндөр, хурдан аялгуугаараа алдартай. Энэ ариаг сопрано дуучдын хамгийн хүнд ариануудын нэгд тооцдог.',
    musicalHighlight: 'Гуравдугаар октавын Фа (F6) хүртэлх маш өндөр стаккато ноотууд болон драмын эрч хүчийг хослуулсан.',
    imageUrl: mozartQueenImg,
    accessionCode: 'CAT. 1791 · К. 620',
    premiereYear: '1791 он',
  },
  {
    id: 'verdi',
    composer: 'Жузеппе Верди',
    country: 'Итали',
    lifespan: '1813 – 1901',
    featuredOpera: '«Травиата» (La Traviata) ба «Риголетто»',
    otherOperas: ['«Риголетто»', '«Аида»', '«Набукко»'],
    featuredAria: 'Sempre libera («Травиата») · La donna è mobile («Риголетто»)',
    voiceType: 'Сопрано / Тенор / Баритон',
    description:
      '«Травиата» дуурь нь Виолетта хэмээх залуу бүсгүйн хайр ба хувь заяаны тухай. «Риголетто» дуурьт мөн алдартай ариа олон бий.',
    musicalHighlight: 'Романтик үеийн хүний сэтгэлийн гүн эмгэнэл, хайр дурлал, хувь заяаны зөрчлийг уянгалаг аялгуугаар нээн харуулсан.',
    imageUrl: verdiTraviataImg,
    accessionCode: 'CAT. 1853 · МИЛАН / ВЕНЕЦ',
    premiereYear: '1851 / 1853 он',
  },
  {
    id: 'bizet',
    composer: 'Жорж Бизе',
    country: 'Франц',
    lifespan: '1838 – 1875',
    featuredOpera: '«Кармен» (Carmen)',
    otherOperas: ['«Сувд шүүрэгчид»'],
    featuredAria: 'Хабанера (L’amour est un oiseau rebelle)',
    voiceType: 'Меццо-сопрано',
    description:
      '«Кармен» дуурийн Хабанера нь Кармен хэмээх чөлөөт сэтгэлтэй бүсгүйн хайрын тухай дуулсан ариа бөгөөд аялгуу нь хүн бүрт танил.',
    musicalHighlight: 'Испани-куба бүжгийн хэмнэл дээр хагас шатлалаар (хроматик) уруудах дур булаам аялгуу нь дэлхийд хамгийн танил сэдвүүдийн нэг.',
    imageUrl: bizetCarmenImg,
    accessionCode: 'CAT. 1875 · ПАРИС',
    premiereYear: '1875 он',
  },
  {
    id: 'puccini',
    composer: 'Жакомо Пуччини',
    country: 'Итали',
    lifespan: '1858 – 1924',
    featuredOpera: '«Турандот», «Тоска», «Мадам Баттерфлай»',
    otherOperas: ['«Тоска»', '«Мадам Баттерфлай»', '«Богема»'],
    featuredAria: 'Nessun dorma («Турандот» дууриас)',
    voiceType: 'Тенор',
    description:
      '«Тоска», «Мадам Баттерфлай», «Турандот» дуурийг бичсэн. «Турандот» дуурийн Nessun dorma нь тенорын хамгийн алдартай ариануудын нэг.',
    musicalHighlight: 'Шөнө дунд ялалт ба найдварыг тунхаглан дуулах тенорын гоцлол бөгөөд төгсгөлийн «Vincerò!» (Би ялна!) өндөр ноотуудаараа алдартай.',
    imageUrl: pucciniTurandotImg,
    accessionCode: 'CAT. 1926 · ЛА СКАЛА',
    premiereYear: '1926 он',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    sectionRef: '1. Ариа гэж юу вэ?',
    question: 'Дуурьт ариа дуулах үед тайзан дээрх үйл явдал яадаг вэ?',
    options: [
      'Үйл явдал бараг зогсож, үзэгчид зөвхөн тэр дүрийн сэтгэлд анхаарлаа төвлөрүүлдэг',
      'Үйл явдал хамгийн хурдтай өрнөж, олон хүн зэрэг ярилцдаг',
      'Дуучид дуулахаа больж, зөвхөн найрал хөгжим оршил тоглодог',
      'Хөшиг хаагдаж дараагийн үзэгдэлд бэлддэг',
    ],
    correctIndex: 0,
    explanation: 'Ариагаар дүр өөрийн дотоод сэтгэлээ нээж хэлдэг тул үйл явдал бараг зогсож, үзэгчид зөвхөн тэр дүрийн сэтгэлд анхаарлаа төвлөрүүлдэг.',
  },
  {
    id: 2,
    sectionRef: '1. Ариа гэж юу вэ?',
    question: 'Ярианд ойр аялгуугаар дуулж, дуурийн үйл явдлыг урагшлуулдаг хэсгийг юу гэж нэрлэдэг вэ?',
    options: ['Увертюра', 'Речитатив', 'Найрал дуу', 'Трио'],
    correctIndex: 1,
    explanation: 'Речитатив нь ярианд ойр аялгуугаар дуулдаг хэсэг бөгөөд үйл явдлыг урагшлуулах үүрэгтэй.',
  },
  {
    id: 3,
    sectionRef: '2. Ариагийн үүсэл, хөгжил',
    question: 'Аль үед ариа урт, чимэглэл ихтэй болж, ихэнх ариа эхний хэсгээ төгсгөлд нь давтдаг байсан бэ?',
    options: [
      'Эхэн үе (1600-аад он)',
      'Барокко үе (17–18-р зуун)',
      'Сонгодог үе (18-р зууны сүүл)',
      'Романтик үе (19-р зуун)',
    ],
    correctIndex: 1,
    explanation: 'Барокко үед (17–18-р зуун) ариа урт, чимэглэл ихтэй болж, дуучид хоолойн ур чадвараа харуулдаг болсон бөгөөд эхний хэсгээ төгсгөлд нь давтдаг байв.',
  },
  {
    id: 4,
    sectionRef: '3. Дуучдын хоолойн төрөл',
    question: 'Хамгийн нам, хүнд эрэгтэй хоолой аль нь вэ? (Ихэвчлэн ахмад, хаан, хүчтэй дүр дуулдаг)',
    options: ['Тенор', 'Баритон', 'Бас', 'Альт'],
    correctIndex: 2,
    explanation: 'Бас нь хамгийн нам, хүнд эрэгтэй хоолой бөгөөд ихэвчлэн ахмад, хаан, хүчтэй дүрийг бүтээдэг.',
  },
  {
    id: 5,
    sectionRef: '4. Алдартай зохиолч, ариа',
    question: '«Шидэт лимбэ» дуурийн маш өндөр, хурдан аялгуутай «Шөнийн хатны ариа»-г хэн бичсэн бэ?',
    options: [
      'Жузеппе Верди (Итали)',
      'Вольфганг Амадей Моцарт (Австри)',
      'Жорж Бизе (Франц)',
      'Жакомо Пуччини (Итали)',
    ],
    correctIndex: 1,
    explanation: 'Австрийн зохиолч В.А. Моцарт «Шидэт лимбэ» дуурийг бичсэн бөгөөд Шөнийн хатны ариа нь сопрано дуучдын хамгийн хүнд ариануудын нэг юм.',
  },
  {
    id: 6,
    sectionRef: '4. Алдартай зохиолч, ариа',
    question: 'Тенорын хамгийн алдартай ариануудын нэг болох «Nessun dorma» нь Жакомо Пуччинийн аль дуурийн ариа вэ?',
    options: ['«Травиата»', '«Кармен»', '«Турандот»', '«Риголетто»'],
    correctIndex: 2,
    explanation: 'Италийн зохиолч Жакомо Пуччинийн «Турандот» дуурийн Nessun dorma нь тенорын хамгийн алдартай ариануудын нэг билээ.',
  },
];
