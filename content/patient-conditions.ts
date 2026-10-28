import { stripConditionMarkup } from "../lib/condition-text";

/**
 * Optional illustration or short video for one condition, authored per locale
 * because alt text, captions and even the video can differ between English and
 * Arabic. Nothing in `patientConditions` carries media yet.
 *
 * Content rules for whoever adds media later:
 * - Illustrations preferred; no identifiable patient images or scans without written consent.
 * - Own or licensed assets only.
 * - Alt text and captions in both languages.
 * - YouTube captions uploaded in both languages.
 */
export type ConditionMedia = Readonly<
  | {
      type: "image";
      /** Under public/conditions/<slug>/, WebP, max 1600px wide. */
      src: string;
      width: number;
      height: number;
      /** Required; "" only with decorative: true. */
      alt: string;
      decorative?: boolean;
      caption?: string;
      credit?: string;
    }
  | {
      type: "video";
      provider: "youtube";
      /** 11 characters. */
      videoId: string;
      /** Accessible name and iframe title. */
      title: string;
      /** Self-hosted image under public/, never the YouTube thumbnail host. */
      poster: string;
      posterWidth: number;
      posterHeight: number;
      caption?: string;
      /** e.g. "1:20" */
      durationLabel?: string;
    }
>;

export type PatientConditionPage = Readonly<{
  slug: string;
  title: string;
  /**
   * One organised paragraph for patients, relatives and general visitors.
   *
   * Inline markup, rendered as React nodes (never HTML):
   *   **text**   -> label such as "Ask your doctor:"   (.condition-label)
   *   !!text!!   -> safety / emergency sentence        (.condition-urgent)
   *   blank line -> paragraph break (none used today; a split needs approval)
   */
  body: string;
  /** Emergency instruction shown above the paragraph. Stroke only, plain text. */
  urgentLead?: string;
  media?: ConditionMedia;
  searchTerms: readonly string[];
}>;

export type PatientCondition = Readonly<{
  slug: string;
  en: PatientConditionPage;
  ar: PatientConditionPage;
}>;

/**
 * Patient-facing source copy transcribed from website - conditions.docx.
 *
 * The single-paragraph wording in `body` and `urgentLead` is pending the
 * doctor's medical review: it is published exactly as supplied, and
 * `conditionLastReviewed` still carries the date of the wording it supersedes
 * until the review is signed off.
 */
export const patientConditions: readonly PatientCondition[] = [
  {
    slug: "angiography",
    en: {
      slug: "angiography",
      title: "Diagnostic cerebral catheter angiography",
      body: "A catheter angiogram is an X-ray test that shows the blood vessels of your brain or spine in fine detail. A thin tube (a catheter) is guided through an artery at the wrist or groin to the vessel being studied, contrast dye is injected, and pictures are taken. Many people only need a CT or MRI scan first; angiography is used when more detail is needed, usually to plan treatment. You are usually awake, with local anaesthetic, although children and people who cannot lie still may have sedation or a general anaesthetic. You may feel warmth when the dye is injected. The test takes from under an hour to longer if the case is complex, and afterwards you rest for a few hours; many people go home the same day. Risks include bruising or bleeding where the catheter went in, a reaction to the dye, kidney strain in people with kidney disease, and a small risk of stroke, so tell the team about allergies, kidney problems, diabetes medicines, blood thinners and pregnancy. **Ask your doctor:** Do I need this test, or would a scan answer the question? Which route will you use? Which medicines should I stop?",
      searchTerms: ["cerebral angiogram", "catheter angiography", "diagnostic cerebral catheter angiography"],
    },
    ar: {
      slug: "angiography",
      title: "قسطرة المخ التشخيصية",
      body: "تصوير الأوعية بالقسطرة فحص بالأشعة يُظهر أوعية الدماغ أو العمود الفقري بأدق تفاصيلها. يُمرَّر أنبوب رفيع (قسطرة) عبر شريان في الرسغ أو أعلى الفخذ حتى الوعاء المراد فحصه، ثم تُحقن مادة التباين (الصبغة) ويُلتقط التصوير. يكفي كثيرًا من المرضى في البداية أشعة مقطعية أو رنين مغناطيسي، ونلجأ إلى القسطرة التشخيصية عندما نحتاج تفاصيل أدق، غالبًا للتخطيط للعلاج. تكون غالبًا مستيقظًا مع تخدير موضعي، وقد يُعطى الأطفال ومن لا يستطيعون الثبات مهدئًا أو تخديرًا كليًا، وقد تشعر بدفء عند حقن الصبغة. يستغرق الفحص أقل من ساعة وقد يطول في الحالات المعقدة، وبعده ترتاح بضع ساعات ويعود كثير من المرضى إلى منازلهم في اليوم نفسه. أما المخاطر فهي كدمة أو نزيف في مكان إدخال القسطرة، وحساسية من الصبغة، وإجهاد للكلى عند المصابين بأمراض الكلى، واحتمال ضئيل لحدوث سكتة دماغية، ولذلك أخبر الفريق بأي حساسية أو مشكلة في الكلى أو أدوية السكري أو مميعات الدم أو الحمل. **اسأل طبيبك:** هل أحتاج هذا الفحص أم تكفي الأشعة؟ ما المسار الذي ستستخدمونه؟ أي أدوية أوقف؟",
      searchTerms: ["قسطرة تشخيصية للمخ", "تصوير الأوعية الدماغية بالقسطرة", "قسطرة المخ التشخيصية"],
    },
  },
  {
    slug: "brain-aneurysm",
    en: {
      slug: "brain-aneurysm",
      title: "Brain aneurysm",
      body: "A brain aneurysm is a weak spot in the wall of a brain artery that bulges like a small balloon. Most are found by chance, never burst and cause no symptoms, but a burst (ruptured) aneurysm is an emergency. Not everyone needs treatment: small, stable aneurysms are often just watched with repeat scans, and treatment is considered by size, location, shape, growth, your age and health, and whether you have had bleeding before. When treatment is advised, several options avoid opening the skull: coiling, where soft platinum coils fill the aneurysm so blood cannot enter; stent-assisted coiling, where a small mesh tube keeps the coils in place; a flow diverter, a fine mesh tube in the main artery that redirects blood away so the aneurysm usually shrinks over months; and a device inside the aneurysm, a small mesh basket that seals it. Surgery (clipping) is another option, and a team decides which is safest for you. After a stent or flow diverter you take blood-thinning tablets (antiplatelets) for a time and have follow-up scans, and stopping smoking and controlling blood pressure lower your risk. Stroke, bleeding and problems with the device are possible, and your doctor will explain the risks for your aneurysm. !!A sudden, severe headache unlike any before, sometimes with vomiting, a stiff neck, sensitivity to light or fainting, may mean an aneurysm has burst. Call emergency services.!!",
      searchTerms: ["brain aneurysm treatment", "coiling", "flow diverter"],
    },
    ar: {
      slug: "brain-aneurysm",
      title: "تمدد الأوعية الدموية في المخ (أم الدم)",
      body: "تمدد الأوعية الدموية في المخ (أم الدم) هو نقطة ضعف في جدار شريان دماغي تنتفخ كبالون صغير. يُكتشف معظمها بالمصادفة، ولا ينفجر أغلبها، ولا يسبب أعراضًا، أما الانفجار فحالة طارئة. ليس الجميع بحاجة إلى علاج؛ فكثير من حالات التمدد الصغيرة المستقرة تُراقب بفحوص متكررة، ويُنظر في العلاج بحسب الحجم والموضع والشكل والنمو وعمرك وصحتك وهل سبق أن حدث نزيف. وعند الحاجة إلى العلاج تتوفر خيارات دون فتح الجمجمة: الملفّات الحلزونية، وهي ملفّات رقيقة من البلاتين تملأ التمدد فلا يدخله الدم؛ والملفّات الحلزونية مع دعامة، أي أنبوب شبكي صغير يثبّت الملفّات؛ ودعامة محوّل التدفق، وهي أنبوب شبكي دقيق داخل الشريان الرئيسي يحوّل الدم بعيدًا عن التمدد فيضمر عادةً خلال أشهر؛ وجهاز داخل التمدد، وهو سلة شبكية صغيرة تغلقه. والجراحة (الشق الجراحي واستعمال المشبك) خيار آخر، ويقرر الفريق الأنسب لك. بعد الدعامة أو محوّل التدفق تتناول أدوية مضادة للصفائح لفترة وتُجرى لك فحوص متابعة، والإقلاع عن التدخين وضبط الضغط يقللان الخطر. قد تحدث سكتة دماغية أو نزيف أو مشكلة في الجهاز، وسيشرح لك طبيبك المخاطر في حالتك. !!صداع مفاجئ شديد لم تعرف مثله من قبل، وقد يصاحبه قيء أو تيبس في الرقبة أو حساسية للضوء أو إغماء، قد يعني أن التمدد انفجر. اتصل بالإسعاف.!!",
      searchTerms: ["تمدد الأوعية الدموية في المخ", "أم الدم", "أعراض التمدد الشرياني في المخ"],
    },
  },
  {
    slug: "avm",
    en: {
      slug: "avm",
      title: "Brain and spinal AVM treatment by catheter",
      body: "An AVM (arteriovenous malformation) is a tangle of abnormal vessels where arteries connect straight to veins, skipping the normal fine vessels in between. People are born with it. It may be found after a bleed or a seizure, or by chance on a scan, and it can also occur in the spine. Not every AVM needs treatment: a team decides, using the AVM's size, position, drainage and bleeding history, and your general health. The options are observation, embolisation, surgery, radiosurgery (focused radiation), or a combination. A large study of AVMs that had not bled found that, over the first few years, people who had treatment for simple AVMs did worse than those who were watched, which is why treatment is chosen carefully for each person, depending on the AVM's architecture, bleeding history and risk. In embolisation, a catheter is guided through the vessels into the AVM and an embolic liquid is injected to block the abnormal vessels. It is often done in one or several sessions, depending on the size and complexity of the AVM, and is sometimes used on its own and sometimes to prepare the AVM for surgery or radiosurgery. Risks include bleeding, stroke, new weakness or vision or speech problems, and in rare cases death; the team will explain the risk for your AVM, and you will need follow-up scans. !!Get urgent help for a sudden severe headache, a seizure or sudden weakness.!!",
      searchTerms: ["brain AVM treatment", "AVM embolisation", "spinal AVM", "brain and spinal AVM catheter"],
    },
    ar: {
      slug: "avm",
      title: "علاج التشوهات الشريانية الوريدية في المخ والعمود الفقري عن طريق القسطرة المخية",
      body: "التشوه الشرياني الوريدي (AVM) كتلة من أوعية غير طبيعية تتصل فيها الشرايين مباشرة بالأوردة متجاوزةً الأوعية الدقيقة الطبيعية. يولد معظم المرضى بالتشوه ولا يكتسبونه. وقد يُكتشف بعد نزيف أو تشنج أو بالمصادفة في أشعة، وقد يحدث أيضًا في العمود الفقري. لا يحتاج كل تشوه إلى علاج؛ فالفريق هو من يقرر بحسب حجمه وموضعه وتصريفه وتاريخ النزيف وصحتك العامة. والخيارات: المراقبة أو العلاج بالقسطرة أو الجراحة أو العلاج الإشعاعي المركّز أو الجمع بينها. وجدت دراسة كبيرة لتشوهات لم تنزف أن من عولجوا بأي تدخل كانت نتائجهم خلال السنوات الأولى أسوأ ممن اكتفوا بالمراقبة، ولهذا يُختار العلاج بعناية لكل شخص حسب وجود نزيف (أو احتمالية عالية للنزيف) أو درجة تعقيد التشوه. في العلاج بالقسطرة تُمرَّر قسطرة عبر الشرايين إلى داخل التشوه ثم يُحقن سائل شبه صمغي لسدّ الأوعية غير الطبيعية. ويتم العلاج في جلسة أو أكثر حسب حجم التشوه وتعقيده، ويُستخدم أحيانًا وحده وأحيانًا لتمهيد التشوه للجراحة أو العلاج الإشعاعي. من المخاطر: النزيف أو السكتة الدماغية أو ضعف جديد أو مشكلات في البصر أو الكلام، وفي حالات نادرة الوفاة. سيشرح الفريق الخطر في حالتك، وستحتاج فحوص متابعة. !!اطلب الإسعاف عند صداع مفاجئ شديد أو تشنج أو ضعف مفاجئ.!!",
      searchTerms: ["تشوه شرياني وريدي بالمخ", "علاج التشوهات الشريانية الوريدية", "قسطرة التشوه الشرياني الوريدي"],
    },
  },
  {
    slug: "stroke-thrombectomy",
    en: {
      slug: "stroke-thrombectomy",
      title: "Mechanical thrombectomy for acute stroke",
      urgentLead:
        "If you think someone is having a stroke, call emergency services now. Do not use this website or send a message. Look for face drooping, arm weakness and slurred speech, and note the time symptoms started.",
      body: "Most strokes happen when a clot blocks an artery in the brain. When a large artery is blocked, mechanical thrombectomy can remove the clot: a catheter is guided through an artery, usually from the groin or wrist, up to the clot, and a small device then traps the clot or sucks it out. Brain scans decide who can have it at the hospital, along with how long ago symptoms began and the size of the brain damage already caused by the blocked artery. It has been shown to help selected people up to 24 hours after a stroke, and some people also receive clot-dissolving medicine first. Not everyone can have thrombectomy, and it does not help everyone who has it. The procedure may be done under local anaesthetic with sedation, or under general anaesthetic, and afterwards you are looked after in a stroke unit or intensive care. Risks include bleeding in the brain, damage to the artery, and the clot not being fully removed. Rehabilitation and long-term follow-up are provided by neurology and rehabilitation teams, while Dr. Aggour treats the first, urgent stage, in the first few hours, at the hospitals where he works.",
      searchTerms: ["stroke thrombectomy", "mechanical thrombectomy", "stroke symptoms"],
    },
    ar: {
      slug: "stroke-thrombectomy",
      title: "استخراج الجلطة الدماغية ميكانيكيًا (سحب الجلطة)",
      urgentLead:
        "إذا شككت في إصابة شخص بجلطة دماغية فاتصل بالإسعاف فورًا. لا تستخدم هذا الموقع ولا ترسل رسالة. انتبه إلى ميل الوجه وضعف الذراع وثقل الكلام، وسجّل وقت بدء الأعراض.",
      body: "تحدث معظم الجلطات الدماغية عندما تسدّ خثرة (جلطة) شريانًا في المخ. وعند انسداد شريان كبير يمكن إزالة الخثرة بالقسطرة: تُمرَّر قسطرة عبر شريان، غالبًا من أعلى الفخذ أو الرسغ، حتى الخثرة في المخ، ثم تلتقطها دعامة صغيرة أو تُسحب بالشفط. وتحدد فحوص الدماغ في المستشفى من يمكنه الاستفادة، ومعها الوقت المنقضي منذ بدء الأعراض وحجم الأنسجة التي تضررت بسبب الشريان المسدود. وقد ثبتت الفائدة لمرضى مختارين حتى 24 ساعة بعد الجلطة، ويتلقى بعض المرضى أولًا دواءً مذيبًا للخثرة. لا يناسب الاستخراج كل مريض، ولا يفيد كل من يُجرى له. قد يتم الإجراء بتخدير موضعي مع مهدئ أو بتخدير كلي، وبعده تُرعى في وحدة السكتة الدماغية أو العناية المركزة. من المخاطر: نزيف في المخ وتلف في الشريان وعدم إزالة الخثرة كاملة. يتولى التأهيل والمتابعة طويلة الأمد فريق الأعصاب والتأهيل، ويعالج الدكتور عجور المرحلة الأولى العاجلة، في الساعات الأولى، في المستشفيات التي يمارس فيها.",
      searchTerms: ["استخراج الجلطة الدماغية بالقسطرة", "جلطة دماغية", "سكتة دماغية"],
    },
  },
  {
    slug: "fistulas",
    en: {
      slug: "fistulas",
      title: "Dural and carotid-cavernous fistula embolisation",
      body: "A fistula is an abnormal direct link between an artery and a vein. A dural fistula sits in the covering around the brain or spinal cord, while a carotid-cavernous fistula sits behind the eye, where the carotid artery runs through a vein-filled space. The symptoms depend on where it is. Near the ear, it can cause a whooshing sound in time with your heartbeat (pulsatile tinnitus) and sometimes headache. Behind the eye, it can cause a red, swollen or bulging eye, double vision, eye pain or blurred vision. In the spine, it can cause slowly worsening leg weakness or numbness and bladder or bowel problems; this is often mistaken for other conditions, so tell your doctor if it is getting worse. Diagnosis uses MRI or CT scans, and often a catheter angiogram, which shows the abnormal flow best. In most cases a catheter is guided into the fistula and a liquid, coils or both are used to close the connection, while some low-risk fistulas are only watched. Risks include stroke, bleeding, and nerve or vision problems. Fistulas can return, so you will have follow-up imaging. !!Some fistulas can bleed. Call emergency services for a sudden severe headache.!!",
      searchTerms: ["dural arteriovenous fistula", "carotid-cavernous fistula", "spinal dural AVF"],
    },
    ar: {
      slug: "fistulas",
      title: "علاج النواسير الشريانية الوريدية الجافية والسباتية الكهفية",
      body: "الناسور اتصال مباشر غير طبيعي بين شريان ووريد. الناسور الجافي يقع في الغشاء القوي المحيط بالمخ أو الحبل الشوكي، والناسور السباتي الكهفي يقع خلف العين حيث يمرّ الشريان السباتي في حيّز مليء بالأوردة. وتختلف الأعراض بحسب الموضع: قرب الأذن يظهر صوت أزيز يتوافق مع نبض القلب (الطنين النابض) وأحيانًا صداع؛ وخلف العين يحدث احمرار العين أو تورمها أو بروزها، وازدواج الرؤية وألم العين أو تشوش البصر؛ وفي العمود الفقري يحدث ضعف أو تنميل في الساقين يزداد ببطء مع مشكلات في التبول أو التبرز، وكثيرًا ما يُظن أنه مرض آخر، فأخبر طبيبك إن كان يزداد سوءًا. يُشخَّص الناسور بالرنين أو الأشعة المقطعية، وغالبًا بقسطرة تشخيصية تُظهر مسار الدم غير الطبيعي بأوضح صورة. وفي أغلب الحالات تُمرَّر قسطرة إلى الناسور ويُستخدم سائل أو ملفّات أو كلاهما لإغلاق الاتصال، وبعض النواسير منخفضة الخطورة تُراقب فقط. من المخاطر: سكتة دماغية ونزيف ومشكلات في الأعصاب أو البصر، وقد يعود الناسور لذا ستجري فحوص متابعة. !!بعض النواسير قد تنزف. اتصل بالإسعاف عند صداع مفاجئ شديد.!!",
      searchTerms: ["ناسور شرياني وريدي جافي", "ناسور سباتي كهفي", "طنين الأذن النابض"],
    },
  },
  {
    slug: "venous-sinus-stenting",
    en: {
      slug: "venous-sinus-stenting",
      title: "Venous sinus stenting",
      body: "Large veins inside the skull, called venous sinuses, drain blood from the brain. When one is narrowed (stenosed), pressure can build up, which can cause a whooshing sound in time with your heartbeat (pulsatile tinnitus) and, in some people, a condition called idiopathic intracranial hypertension (IIH), where pressure inside the head is raised for no clear reason. IIH causes headache that is often worse lying down or in the morning, brief greying-out of vision, double vision and a whooshing noise in the ear, and if untreated it can damage vision permanently. Not all tinnitus is due to sinus stenosis: most tinnitus has other causes, and a doctor needs to look for the cause of pulsatile tinnitus, which can include abnormal vessels, not just a narrowed vein. Assessment includes an eye examination, MR or CT scans of the veins, and sometimes a catheter test that measures pressure across the narrowing. In IIH, weight loss and medicines come first. Venous sinus stenting places a small mesh tube in the narrowed vein to hold it open, and it is considered for selected people with a proven narrowing and pressure difference, usually when other treatment has not worked. Stenting often improves swollen optic nerves and pulsatile tinnitus, while headache improves less reliably; the evidence so far comes more from observational studies than from randomised trials, so certainty is limited and trials are ongoing. Risks include bleeding, a clot in the stent, headache, and narrowing next to the stent, and you take blood-thinning tablets for a time afterwards. !!See an eye specialist urgently if your vision changes.!!",
      searchTerms: ["venous sinus stenting", "pulsatile tinnitus", "idiopathic intracranial hypertension"],
    },
    ar: {
      slug: "venous-sinus-stenting",
      title: "دعامة الجيوب الوريدية",
      body: "تصرّف أوردة كبيرة داخل الجمجمة تسمى الجيوب الوريدية الدم من المخ. وعند ضيق أحدها قد يرتفع الضغط، وقد يسبب ذلك صوت أزيز يتوافق مع نبض القلب (الطنين النابض)، وعند بعض المرضى حالة تسمى ارتفاع الضغط داخل الجمجمة مجهول السبب، حيث يرتفع الضغط داخل الرأس دون سبب واضح. ومن أعراضها صداع يشتد غالبًا في الاستلقاء أو صباحًا، وعتمة مؤقتة في الرؤية لثوانٍ، وازدواج الرؤية، وأزيز في الأذن، وإن لم تُعالج قد تضر بالبصر ضررًا دائمًا. وليس كل طنين سببه ضيق الجيوب الوريدية؛ فللطنين أسباب أخرى كثيرة، ويحتاج الطبيب إلى البحث عن سبب الطنين النابض، وقد يكون أوعية غير طبيعية وليس تضيق وريد فقط. يشمل التقييم فحص العين وأشعة بالرنين أو المقطعية للأوردة، وأحيانًا قسطرة تقيس الضغط عبر موضع الضيق. ويبدأ علاج ارتفاع الضغط بإنقاص الوزن والأدوية، أما الدعامة فتضع أنبوبًا شبكيًا صغيرًا في الوريد الضيق ليبقى مفتوحًا، وتُنظر لمرضى مختارين لديهم ضيق وفرق ضغط مثبتان، غالبًا عندما لا ينجح العلاج الآخر. كثيرًا ما تُحسّن الدعامة تورّم العصب البصري والطنين النابض، أما الصداع فيتحسن بدرجة أقل ثباتًا، وتأتي الأدلة حتى الآن من دراسات رصدية أكثر منها تجارب عشوائية، فاليقين محدود، والتجارب جارية. من المخاطر: نزيف وخثرة في الدعامة وصداع وضيق بجوار الدعامة، وتتناول مضادات الصفائح لفترة بعدها. !!راجع طبيب العيون سريعًا إذا تغيّرت رؤيتك.!!",
      searchTerms: ["طنين الأذن النابض", "ارتفاع ضغط المخ الحميد", "ارتفاع الضغط داخل الجمجمة مجهول السبب", "دعامة الجيوب الوريدية"],
    },
  },
  {
    slug: "carotid-intracranial-stenting",
    en: {
      slug: "carotid-intracranial-stenting",
      title: "Neck and intracranial angioplasty and stenting",
      body: "Fatty deposits (plaque) can narrow the arteries in the neck (the carotid arteries) or inside the skull. A narrowed artery can reduce the blood flow the brain needs and cause a mini-stroke (TIA) or a stroke. Many people have no symptoms until the first TIA or stroke, and the narrowing is often found by chance, for example when a doctor hears a sound over the neck artery. Treatment for everyone is medicines and lifestyle: antiplatelets, cholesterol medicine, blood pressure and diabetes control, stopping smoking, and exercise. If narrowing in the neck has caused symptoms, opening the artery lowers the chance of another stroke, and it works best soon after symptoms. Two ways are used: surgery to clean out the artery (endarterectomy), or a stent placed through a catheter, in which a balloon (angioplasty) opens the artery and the stent holds it open. Large studies found similar overall results with different risks, and your age and the anatomy of your artery help decide; stenting is a minimally invasive procedure compared with surgery. For narrowing inside the skull, studies found that intensive medical treatment worked better than stenting, so stenting is kept for selected people who keep having symptoms despite the best medicines. Risks include stroke, bleeding, the artery narrowing again, and effects on the heart, and you take antiplatelets for a time afterwards. !!A TIA can look like sudden loss of vision in one eye, brief weakness or numbness on one side, or brief trouble speaking. Treat it as an emergency even if it passes, because a stroke can cause permanent brain damage or even death.!!",
      searchTerms: ["carotid stenting", "carotid stenosis", "TIA", "intracranial stenosis"],
    },
    ar: {
      slug: "carotid-intracranial-stenting",
      title: "توسيع الشرايين وتركيب الدعامات في الرقبة او داخل الجمجمة",
      body: "قد تضيّق الترسبات الدهنية (اللويحات) الشرايين في الرقبة (الشرايين السباتية) أو داخل الجمجمة، وقد يقلّل الشريان الضيق تدفق الدم اللازم للمخ ويسبب نوبة إقفارية عابرة أو جلطة دماغية كاملة. ولا يشعر كثير من المرضى بأعراض حتى النوبة الأولى المؤقتة أو الجلطة الكاملة، وكثيرًا ما يُكتشف الضيق بالمصادفة، كأن يسمع الطبيب صوتًا فوق شريان الرقبة. والعلاج للجميع هو الأدوية ونمط الحياة: مضادات الصفائح ودواء الكوليسترول وضبط الضغط والسكر والإقلاع عن التدخين والرياضة. وإذا سبّب الضيق في الرقبة أعراضًا فإن فتح الشريان يقلل احتمال جلطة جديدة، وأفضل نتائجه تكون بعد الأعراض بوقت قصير. تُستخدم طريقتان: جراحة لتنظيف الشريان، أو دعامة تُوضع بالقسطرة، حيث يفتح بالون الشريان (رأب الشريان) وتُبقيه الدعامة مفتوحًا. وجدت دراسات كبيرة نتائج متقاربة إجمالًا مع اختلاف المخاطر، ويساعد عمرك وتشريح الشريان في الاختيار، والعلاج بالقسطرة أقل صعوبة على المريض مقارنة بالتدخل الجراحي. أما الضيق داخل الجمجمة فقد وجدت الدراسات أن العلاج الدوائي المكثف فيه أفضل من الدعامة، لذلك تُخصَّص الدعامة لمرضى مختارين يستمر ظهور أعراضهم رغم أفضل الأدوية. من المخاطر: سكتة دماغية ونزيف وعودة ضيق الشريان وتأثير على القلب، وتتناول مضادات الصفائح لفترة بعد الإجراء. !!تبدو النوبة العابرة كفقدان مفاجئ للبصر في عين واحدة أو ضعف أو تنميل مؤقت في جانب من الجسم أو صعوبة مؤقتة في الكلام. تعامل معها كحالة طارئة حتى لو زالت، فالجلطة الدماغية الكاملة حالة خطيرة قد تسبب تلفًا دائمًا شديدًا بالمخ أو حتى الوفاة.!!",
      searchTerms: ["تضيق الشريان السباتي", "قسطرة الشريان السباتي", "علامات تنذر بالسكتة الدماغية"],
    },
  },
  {
    slug: "paediatric",
    en: {
      slug: "paediatric",
      title: "Paediatric interventions, including vein of Galen embolization",
      body: "Babies and children can have blood vessel problems of the brain and spine, including AVMs, fistulas, and rare malformations such as the vein of Galen malformation, a tangle where arteries connect straight into a large deep brain vein. Children are not small adults, and their management is different and specialised. In a vein of Galen malformation, newborns may have heart strain because of the large flow through the malformation, babies may have a growing head size because fluid collects, or seizures, and older children may have developmental delay. Embolisation closes the abnormal connections with a catheter, usually in stages, and the timing depends on how the baby's heart and brain are coping; the goal is often to reduce flow and protect the brain and heart, not always to close everything at once. Care involves a team of paediatric neurology, paediatric cardiology and intensive care, anaesthesia, neurosurgery and neuroradiology. Risks include bleeding, stroke, developmental problems and anaesthetic risks, and these are discussed with you individually. **Questions for parents:** What is the plan and timing? How will you protect my child's heart? What follow-up will be needed? !!Get urgent help if your child has a seizure, sudden weakness, repeated vomiting with unusual sleepiness, or breathing difficulty.!!",
      searchTerms: ["vein of Galen malformation", "paediatric AVM"],
    },
    ar: {
      slug: "paediatric",
      title: "تدخلات الأطفال ومنها تشوه وريد جالين",
      body: "قد يصاب الرضّع والأطفال بمشكلات في أوعية المخ والعمود الفقري، منها التشوهات الشريانية الوريدية والنواسير وتشوهات نادرة مثل تشوه وريد جالين، وهو تشابك تتصل فيه الشرايين مباشرة بوريد عميق كبير في المخ. الأطفال ليسوا بالغين صغارًا، ويُخطَّط علاجهم مع طبيب ضمن اختصاصه قسطرة الأطفال المخية. ففي تشوه وريد جالين قد يعاني حديثو الولادة إجهادًا في القلب بسبب التدفق الكبير في التشوه، وقد يكبر حجم رأس الرضّع لتجمع السوائل أو تحدث لهم تشنجات، وقد يتأخر نموّ الأطفال الأكبر. ويغلق العلاج بالقسطرة (الانسداد) الاتصالات غير الطبيعية، وغالبًا على مراحل، ويتوقف التوقيت على قدرة قلب الرضيع ودماغه على التحمل؛ والهدف غالبًا تقليل التدفق وحماية الدماغ والقلب، وليس دائمًا إغلاق كل شيء مرة واحدة. ويشارك في الرعاية فريق من أعصاب الأطفال وقلب الأطفال والعناية المركزة والتخدير وجراحة المخ والأعصاب والأشعة العصبية. من المخاطر: نزيف وسكتة دماغية ومشكلات في النمو ومخاطر التخدير، وتُناقش معك بحسب حالة طفلك. **أسئلة للوالدين:** ما الخطة وتوقيتها؟ كيف ستحمون قلب طفلي؟ ما المتابعة المطلوبة؟ !!اطلب الإسعاف إذا أصيب طفلك بتشنج أو ضعف مفاجئ أو قيء متكرر مع نعاس غير معتاد أو صعوبة في التنفس.!!",
      searchTerms: ["تشوه وريد جالين", "علاج تشوهات أوعية المخ عند الأطفال"],
    },
  },
  {
    slug: "chronic-subdural-haematoma",
    en: {
      slug: "chronic-subdural-haematoma",
      title: "Chronic subdural haematoma",
      body: "A chronic subdural haematoma is a slow collection of old blood between the surface of the brain and its outer covering. It often starts weeks after a head knock that seemed minor, or that was forgotten, but it can also happen spontaneously, and it is more common in older people and in people on blood thinners. The usual treatment is for a neurosurgeon to drain the blood through a small hole in the skull, although it can come back. Middle meningeal artery (MMA) embolisation blocks the artery that feeds the lining of the haematoma: a catheter is guided through an artery at the wrist or groin to the MMA, and tiny particles or liquid close it, with the aim of lowering the chance that the haematoma returns. It is an option for selected people, often those at higher risk of the haematoma returning or fragile patients not fit for surgery. It is not a replacement for surgery, and the decision is made with the neurosurgery team. Risks include bleeding or bruising where the catheter went in, stroke (rare), and the haematoma not shrinking. !!Signs to watch for, especially in an older relative: headache that is getting worse, confusion, memory or personality change, sleepiness, unsteady walking or falls, weakness on one side, and sometimes seizures. Get medical help promptly.!!",
      searchTerms: ["chronic subdural haematoma", "MMA embolisation"],
    },
    ar: {
      slug: "chronic-subdural-haematoma",
      title: "النزيف المزمن تحت الجافية",
      body: "النزيف المزمن تحت الجافية تجمّع بطيء لدم قديم بين سطح المخ وغشائه الخارجي. يبدأ غالبًا بعد أسابيع من ضربة على الرأس بدت بسيطة أو نُسيت، وقد يحدث تلقائيًا، وهو شائع عند كبار السن ومن يتناولون مميعات الدم. والعلاج المعتاد أن يُفرغ جرّاح المخ والأعصاب الدم عبر ثقب صغير في الجمجمة، وقد يعود التجمع. أما العلاج بالقسطرة فهو سدّ الشريان السحائي المتوسط الذي يغذي بطانة التجمع الدموي: تُمرَّر قسطرة من شريان في الرسغ أو أعلى الفخذ إلى هذا الشريان وتغلقه جسيمات دقيقة أو سائل، والهدف تقليل احتمال عودة التجمع. وهو خيار لمرضى مختارين، غالبًا من يرتفع عندهم خطر عودة التجمع أو المرضى ذوو الحالات الصحية الهشة بالنسبة للجراحة، وليس بديلًا عن الجراحة، ويُقرَّر مع فريق جراحة المخ والأعصاب. من المخاطر: نزيف أو كدمة في مكان القسطرة وسكتة دماغية (نادرة) وعدم انكماش التجمع. !!علامات تستدعي الانتباه، خاصة عند قريب مسنّ: صداع يزداد سوءًا وتشوش وتغيّر في الذاكرة أو الشخصية ونعاس وعدم اتزان أو سقوط وضعف في جانب واحد، وأحيانًا تشنجات. اطلب مساعدة طبية سريعًا.!!",
      searchTerms: ["نزيف تحت الجافية", "تجمع دموي تحت الجافية", "كدمة في المخ بعد السقوط"],
    },
  },
  {
    slug: "other-embolisation",
    en: {
      slug: "other-embolisation",
      title: "Other embolisation: nosebleeds, tumours and trauma",
      body: "Embolisation closes blood vessels on purpose. A catheter is guided to the vessel, and tiny particles, coils or liquid block it. It is used where controlling blood flow helps. Most nosebleeds (epistaxis) stop with pressure, packing or cautery by an ear, nose and throat doctor. Embolisation is considered for a bleed that is severe or keeps coming back despite those steps, and the catheter blocks small branches of the artery supplying the nose. Risks are uncommon but real: stroke, facial pain or numbness, and damage to skin or tissue. Some tumours of the head, neck and brain have a rich blood supply, so embolisation before surgery can reduce bleeding during the operation, and it may also be used to relieve symptoms. After an injury to the head, face or neck, a damaged vessel may bleed or form a weak bulge, and embolisation can close it, sometimes as an emergency. The risks depend on the area, and the team will explain them before any planned procedure. !!Heavy nosebleed? Sit forward, pinch the soft part of the nose for 10 to 15 minutes, and go to an emergency department if it does not stop or you feel faint.!!",
      searchTerms: ["embolisation", "epistaxis embolisation", "tumour embolisation"],
    },
    ar: {
      slug: "other-embolisation",
      title: "انسدادات علاجية أخرى: نزيف الانف (الرعاف) والأورام والإصابات",
      body: "المقصود بالعلاج بالقسطرة هنا إغلاق الأوعية الدموية عمدًا: تُمرَّر قسطرة إلى الوعاء وتغلقه جسيمات دقيقة أو ملفّات أو سائل، ويُستخدم حيث يفيد التحكم في تدفق الدم. يتوقف معظم نزيف الأنف (الرعاف) بالضغط أو الحشو أو الكيّ على يد طبيب الأنف والأذن والحنجرة، ويُنظر في الانسداد بالقسطرة عند نزيف شديد أو يتكرر رغم هذه الخطوات، حيث تغلق القسطرة فروعًا صغيرة من الشريان المغذّي للأنف. ومخاطره غير شائعة لكنها حقيقية: سكتة دماغية وألم أو تنميل في الوجه وتلف في الجلد أو الأنسجة. وتمتلك بعض أورام الرأس والعنق والمخ إمدادًا دمويًا غزيرًا، فقد يقلل الانسداد قبل الجراحة النزيف أثناء العملية، وقد يُستخدم أيضًا لتخفيف الأعراض. وبعد إصابة في الرأس أو الوجه أو الرقبة قد ينزف وعاء متضرر أو يتكوّن فيه انتفاخ ضعيف، ويمكن إغلاقه بالانسداد، أحيانًا في حالة طارئة. وتختلف المخاطر بحسب المنطقة، وسيشرحها الفريق قبل أي إجراء مخطط له. !!نزيف أنف شديد؟ اجلس مائلًا إلى الأمام واضغط الجزء الرخو من الأنف 10 إلى 15 دقيقة، واذهب إلى الطوارئ إن لم يتوقف أو شعرت بدوار.!!",
      searchTerms: ["رعاف شديد", "انسداد الشرايين بالقسطرة", "سد أوعية الأورام قبل الجراحة"],
    },
  },
];

export function getPatientCondition(slug: string): PatientCondition | undefined {
  return patientConditions.find((condition) => condition.slug === slug);
}

export type ConditionListingLocale = "en" | "ar";

export type ConditionListingItem = Readonly<{
  slug: string;
  title: string;
  /** The full paragraph, markup stripped: what the home card clamps to three lines. */
  description: string;
  body: string;
  urgentLead?: string;
  media?: ConditionMedia;
}>;

/**
 * Review stamp printed under the heading of the conditions hub and of every
 * condition page: who checked the copy, and when. One source, both locales.
 *
 * Deliberately NOT updated with the new single-paragraph wording: that wording
 * is still pending the doctor's review, so the date still describes the copy
 * that was last signed off.
 */
export const conditionLastReviewed = {
  en: "4 October 2026",
  ar: "4 أكتوبر 2026",
} as const;

export function getConditionReviewLine(locale: ConditionListingLocale): string {
  return locale === "ar"
    ? `راجعه د. محمد عجور · آخر مراجعة ${conditionLastReviewed.ar}`
    : `Reviewed by Dr. Mohamed Aggour · Last reviewed ${conditionLastReviewed.en}`;
}

/**
 * Standing patient notice repeated at the foot of those same pages, so the
 * general-terms and emergency wording never drifts between them.
 */
export const conditionMedicalDisclaimer = {
  en: "This page explains a condition in general terms. It is not advice about your own case, and it cannot respond to an emergency. If you have sudden weakness, trouble speaking, loss of vision, a sudden severe headache or a seizure, call emergency services now.",
  ar: "تشرح هذه الصفحة الحالة بشكل عام، وليست نصيحة طبية لحالتك الخاصة، ولا يمكنها الاستجابة للطوارئ. عند ظهور ضعف مفاجئ أو صعوبة في الكلام أو فقدان البصر أو صداع شديد مفاجئ أو تشنج، اتصل بالإسعاف فورًا.",
} as const;

const CARD_DESCRIPTION_LIMIT = 130;

/** A comma at least this far into the slice counts as a usable clause end
    (about a third of the cap: literal "last comma before the limit", floored
    only so an early clause cannot shrink the summary to a stub). */
const CLAUSE_FLOOR = Math.round(CARD_DESCRIPTION_LIMIT / 3);

/**
 * One truncation marker, never two: a cut that lands beside a sentence period
 * ("…." / "....") collapses to a single ellipsis or a single period.
 */
const tidyTruncatedEnd = (text: string): string =>
  text.replace(/[.…]+$/u, (match) => (match.includes("…") ? "…" : "."));

/**
 * End an unfinished slice with exactly one ellipsis, dropping any punctuation
 * that would stack against it ("،…" or a bare trailing comma or period).
 */
const withEllipsis = (text: string): string =>
  `${text.replace(/[.,،؛:!?؟۔…]+$/u, "").trimEnd()}…`;

/**
 * The condition description for the home card: the paragraph plain text,
 * trimmed inside ~130 characters at the most natural boundary available —
 * a sentence end first, then the last clause comma (UI/UX committee K3
 * follow-up), then the last word — so the card (which has no visual clamp)
 * never stops mid-sentence or mid-phrase.
 */
export function getConditionDescription(page: PatientConditionPage): string {
  const text = stripConditionMarkup(page.body);
  if (text.length <= CARD_DESCRIPTION_LIMIT) return text;

  const slice = text.slice(0, CARD_DESCRIPTION_LIMIT);

  // 1) Walk backwards for the last sentence-ending punctuation followed by
  //    whitespace or end-of-slice, so we never cut inside a decimal or
  //    abbreviation.
  for (let index = slice.length - 1; index >= 0; index -= 1) {
    const character = slice[index];
    if (!character || !SENTENCE_ENDINGS.has(character)) continue;
    const next = text[index + 1];
    if (next === undefined || /\s/.test(next)) return tidyTruncatedEnd(slice.slice(0, index + 1).trimEnd());
  }

  // 2) No sentence fits: stop at the last clause comma instead of mid-phrase.
  //    The comma must reach at least a third of the cap, or the summary would
  //    waste most of its budget on an early clause (UI/UX committee K3
  //    follow-up; measured 2026-10-21: every published card lands ≥43, and
  //    only the Galen card sits as low as 60).
  for (let index = slice.length - 1; index >= CLAUSE_FLOOR; index -= 1) {
    const character = slice[index];
    if (character !== "," && character !== "،") continue;
    const next = text[index + 1];
    if (next === undefined || /\s/.test(next)) return withEllipsis(slice.slice(0, index));
  }

  // 3) Otherwise cut on the last word boundary, never stacking "،…" together.
  const wordBoundary = slice.lastIndexOf(" ");
  if (wordBoundary > 0) return withEllipsis(slice.slice(0, wordBoundary));
  return withEllipsis(slice);
}

const META_DESCRIPTION_LIMIT = 155;
const SENTENCE_ENDINGS = new Set([".", "!", "?", "؟", "۔"]);

/**
 * Description for <meta name="description">, Open Graph and anything else a
 * crawler reads: up to two sentences within 155 characters from the approved
 * paragraph, and never carrying the emergency `urgentLead`.
 */
export function getConditionMetaDescription(page: PatientConditionPage): string {
  const text = stripConditionMarkup(page.body);
  if (text.length <= META_DESCRIPTION_LIMIT) return text;

  // Find sentence endings within the limit
  const sentenceEndings: number[] = [];
  for (let index = 0; index < Math.min(text.length, META_DESCRIPTION_LIMIT); index += 1) {
    const character = text[index];
    if (!character || !SENTENCE_ENDINGS.has(character)) continue;
    const next = text[index + 1];
    if (next === undefined || /\s/.test(next)) {
      sentenceEndings.push(index + 1);
    }
  }

  // Up to two sentences within 155 characters
  if (sentenceEndings.length >= 2) {
    return text.slice(0, sentenceEndings[1]).trimEnd();
  }
  if (sentenceEndings.length === 1) {
    return text.slice(0, sentenceEndings[0]).trimEnd();
  }

  // No full sentence fits: cut on a word boundary and mark the truncation.
  const slice = text.slice(0, META_DESCRIPTION_LIMIT);
  const wordBoundary = slice.lastIndexOf(" ");
  if (wordBoundary > 0) return `${slice.slice(0, wordBoundary).trimEnd()}…`;
  return `${slice.slice(0, META_DESCRIPTION_LIMIT - 1).trimEnd()}…`;
}

/**
 * The condition index shared by the home cards and the /conditions list.
 *
 * Both surfaces render this array in document order, so a title or body edit
 * in `patientConditions` lands on the home page, the hub page and the
 * condition detail page at once, and both locales keep the same order.
 */
export function getConditionListing(locale: ConditionListingLocale): readonly ConditionListingItem[] {
  return patientConditions.map((condition) => {
    const page = condition[locale];
    return {
      slug: condition.slug,
      title: page.title,
      description: getConditionDescription(page),
      body: page.body,
      ...(page.urgentLead ? { urgentLead: page.urgentLead } : {}),
      ...(page.media ? { media: page.media } : {}),
    };
  });
}
