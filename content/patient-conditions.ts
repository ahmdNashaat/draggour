export type PatientConditionBlock = Readonly<{
  heading?: string;
  paragraphs?: readonly string[];
  items?: readonly string[];
}>;

export type PatientConditionPage = Readonly<{
  slug: string;
  title: string;
  blocks: readonly PatientConditionBlock[];
  searchTerms: readonly string[];
}>;

export type PatientCondition = Readonly<{
  slug: string;
  en: PatientConditionPage;
  ar: PatientConditionPage;
}>;

/** Patient-facing source copy transcribed from website - conditions.docx. */
export const patientConditions: readonly PatientCondition[] = [
  {
    slug: "angiography",
    en: {
      slug: "angiography",
      title: "Cerebral and spinal angiography",
      blocks: [
        { heading: "What it is.", paragraphs: ["A catheter angiogram is an X-ray test that shows the blood vessels of your brain or spine in fine detail. A thin tube (a catheter) is guided through an artery to the vessel being studied. Contrast dye is injected, and pictures are taken. Many people only need a CT or MRI scan first. Angiography is used when more detail is needed, usually to plan treatment."] },
        { heading: "What happens.", items: ["You are usually awake, with local anaesthetic. Children, and people who cannot lie still, may have sedation or a general anaesthetic.", "The catheter goes in through an artery at the wrist or groin.", "You may feel warmth when the dye is injected.", "The test takes from under an hour to longer if the case is complex.", "Afterwards you rest for a few hours. Many people go home the same day."] },
        { heading: "Risks.", paragraphs: ["Bruising or bleeding where the catheter went in, a reaction to the dye, kidney strain in people with kidney disease, and a small risk of stroke. Tell the team about allergies, kidney problems, diabetes medicines, blood thinners and pregnancy."] },
        { heading: "Ask your doctor:", paragraphs: ["Do I need this test, or would a scan answer the question? Which route will you use? Which medicines should I stop?"] },
      ],
      searchTerms: ["cerebral angiogram", "catheter angiography"],
    },
    ar: {
      slug: "angiography",
      title: "تصوير الأوعية الدماغية والشوكية بالقسطرة",
      blocks: [
        { heading: "ما هو؟", paragraphs: ["تصوير الأوعية بالقسطرة فحص بالأشعة يُظهر أوعية الدماغ أو العمود الفقري بأدق تفاصيلها. يُمرَّر أنبوب رفيع (قسطرة) عبر شريان حتى الوعاء المراد فحصه، ثم تُحقن مادة التباين (الصبغة) ويُلتقط التصوير. يكفي كثيرًا من المرضى في البداية أشعة مقطعية أو رنين مغناطيسي. نلجأ إلى القسطرة التشخيصية عندما نحتاج تفاصيل أدق، غالبًا للتخطيط للعلاج."] },
        { heading: "ماذا يحدث؟", items: ["تكون غالبًا مستيقظًا مع تخدير موضعي. قد يُعطى الأطفال ومن لا يستطيعون الثبات مهدئًا أو تخديرًا كليًا.", "تدخل القسطرة عبر شريان في الرسغ أو أعلى الفخذ.", "قد تشعر بدفء عند حقن الصبغة.", "يستغرق الفحص أقل من ساعة، وقد يطول في الحالات المعقدة.", "بعده ترتاح بضع ساعات، ويعود كثير من المرضى إلى منازلهم في اليوم نفسه."] },
        { heading: "المخاطر.", paragraphs: ["كدمة أو نزيف في مكان إدخال القسطرة، وحساسية من الصبغة، وإجهاد للكلى عند المصابين بأمراض الكلى، واحتمال ضئيل لحدوث سكتة دماغية. أخبر الفريق بأي حساسية أو مشكلة في الكلى أو أدوية السكري أو مميعات الدم أو الحمل."] },
        { heading: "اسأل طبيبك:", paragraphs: ["هل أحتاج هذا الفحص أم تكفي الأشعة؟ ما المسار الذي ستستخدمونه؟ أي أدوية أوقف؟"] },
      ],
      searchTerms: ["قسطرة تشخيصية للمخ", "تصوير الأوعية الدماغية بالقسطرة"],
    },
  },
  {
    slug: "brain-aneurysm",
    en: {
      slug: "brain-aneurysm",
      title: "Brain aneurysm",
      blocks: [
        { heading: "What it is.", paragraphs: ["A brain aneurysm is a weak spot in the wall of a brain artery that bulges like a small balloon. Most are found by chance, never burst and cause no symptoms. A burst (ruptured) aneurysm is an emergency."] },
        { heading: "Who needs treatment.", paragraphs: ["Not everyone. Small, stable aneurysms are often just watched with repeat scans. Treatment is considered by size, location, shape, growth, your age and health, and whether you have had bleeding before."] },
        { heading: "Warning signs of a burst aneurysm.", paragraphs: ["A sudden, severe headache unlike any before, with often (maybe none or all) vomiting, a stiff neck, sensitivity to light or fainting. Call emergency services."] },
        { heading: "Treatments without opening the skull.", items: ["Coiling: soft platinum coils fill the aneurysm so blood cannot enter.", "Stent-assisted coiling: a small mesh tube keeps the coils in place.", "Flow diverter: a fine mesh tube in the main artery redirects blood away from the aneurysm, and the aneurysm usually shrinks over months.", "Device inside the aneurysm: a small mesh basket that seals it.", "Surgery (clipping) is another option. A team decides which is safest for you."] },
        { heading: "Good to know.", paragraphs: ["After a stent or flow diverter you take blood-thinning tablets (antiplatelets) for a time. You will have follow-up scans. Stopping smoking and controlling blood pressure lower your risk."] },
        { heading: "Risks.", paragraphs: ["Stroke, bleeding and problems with the device are possible. Your doctor will explain the risks for your aneurysm."] },
      ],
      searchTerms: ["brain aneurysm treatment", "coiling", "flow diverter"],
    },
    ar: {
      slug: "brain-aneurysm",
      title: "تمدد الأوعية الدموية في المخ (أم الدم)",
      blocks: [
        { heading: "ما هو؟", paragraphs: ["تمدد الأوعية الدموية في المخ (أم الدم) هو نقطة ضعف في جدار شريان دماغي تنتفخ كبالون صغير. يُكتشف معظمها بالمصادفة، ولا ينفجر أغلبها، ولا يسبب أعراضًا. أما الانفجار فحالة طارئة."] },
        { heading: "من يحتاج تدخلا؟", paragraphs: ["ليس الجميع. كثير من حالات التمدد الصغيرة المستقرة تُراقب بفحوص متكررة. يُنظر في العلاج بحسب الحجم والموضع والشكل والنمو وعمرك وصحتك وهل سبق أن حدث نزيف."] },
        { heading: "علامات الانفجار.", paragraphs: ["صداع مفاجئ شديد لم تعرف مثله من قبل، مع قيء وتيبس في الرقبة وحساسية للضوء أو إغماء. اتصل بالإسعاف."] },
        { heading: "علاجات دون فتح الجمجمة.", items: ["الملفّات الحلرونية: ملفّات رقيقة من البلاتين تملأ التمدد فلا يدخله الدم.", "الملفّات الحلزونية مع دعامة: أنبوب شبكي صغير يثبّت الملفّات.", "دعامة محوّل التدفق: أنبوب شبكي دقيق داخل الشريان الرئيسي يحوّل الدم بعيدًا عن التمدد، فيضمر التمدد عادةً خلال أشهر.", "جهاز داخل التمدد: سلة شبكية صغيرة تغلقه.", "الجراحة (الشق الجراحي و استعمال المشبك) خيار آخر، ويقرر الفريق الأنسب لك."] },
        { heading: "جيد أن تعرف.", paragraphs: ["بعد الدعامة أو محوّل التدفق تتناول أدوية مضادة للصفائح لفترة. ستُجرى لك فحوص متابعة. الإقلاع عن التدخين وضبط الضغط يقللان الخطر."] },
        { heading: "المخاطر.", paragraphs: ["قد تحدث سكتة دماغية أو نزيف أو مشكلة في الجهاز. سيشرح لك طبيبك المخاطر في حالتك."] },
      ],
      searchTerms: ["تمدد الأوعية الدموية في المخ", "أم الدم", "أعراض التمدد الشرياني في المخ"],
    },
  },
  {
    slug: "avm",
    en: {
      slug: "avm",
      title: "Brain and spinal AVM embolisation",
      blocks: [
        { heading: "What it is.", paragraphs: ["An AVM (arteriovenous malformation) is a tangle of abnormal vessels where arteries connect straight to veins, skipping the normal fine vessels in between. AVM patients are born with it. It may be found after a bleed or a seizure, or by chance on a scan, and it can also occur in the spine."] },
        { heading: "Do all AVMs need treatment?", paragraphs: ["No. The choice is made by a team, using the AVM’s size, position, drainage and bleeding history, and your general health. Options are observation, embolisation, surgery, radiosurgery (focused radiation), or a combination. A large study of AVMs that had not bled found that, over the first few years, people who had treatment for simple AVMs, did worse than those who were watched. That is why treatment is chosen carefully for each person, depending on the AVM architecture, bleeding history and risk."] },
        { heading: "What embolisation is.", paragraphs: ["A catheter is guided through the vessels into the AVM. An embolic liquid is injected to block the abnormal vessels. Treatment is often done in in one or multiple sessions, depending on the size and complexity of the AVM. Sometimes embolization is used on its own, and sometimes it prepares the AVM for surgery or radiosurgery."] },
        { heading: "Risks.", paragraphs: ["Bleeding, stroke, new weakness or vision or speech problems, and in rare cases death. The team will explain the risk for your AVM. You will need follow-up scans."] },
        { paragraphs: ["Get urgent help for a sudden severe headache, a seizure or sudden weakness."] },
      ],
      searchTerms: ["brain AVM treatment", "AVM embolisation", "spinal AVM"],
    },
    ar: {
      slug: "avm",
      title: "علاج التشوهات الشريانية الوريدية في المخ والعمود الفقري بالانسداد",
      blocks: [
        { heading: "ما هو؟", paragraphs: ["التشوه الشرياني الوريدي كتلة من أوعية غير طبيعية تتصل فيها الشرايين مباشرة بالأوردة متجاوزةً الأوعية الدقيقة الطبيعية. يولد معظم المرضى بالتشوه الشرياني و لا يتم اكتسابه. قد يُكتشف بعد نزيف أو تشنج أو بالمصادفة في أشعة، وقد يحدث أيضًا في العمود الفقري."] },
        { heading: "هل يحتاج كل تشوه إلى علاج؟", paragraphs: ["لا. يقرر الفريق بحسب حجمه وموضعه وتصريفه وتاريخ النزيف وصحتك العامة. الخيارات: المراقبة أو العلاج بالقسطرة أو الجراحة أو العلاج الإشعاعي المركّز أو الجمع بينها. وجدت دراسة كبيرة لتشوهات لم تنزف أن من عولجوا باي تدخل كانت نتائجهم خلال السنوات الأولى أسوأ ممن اكتفوا بالمراقبة، ولهذا يُختار العلاج بعناية لكل شخص حسب وجود نزيف (او احتمالية عالية للنزيف) او نسبة تعقيد التشوه٠"] },
        { heading: "ما هو العلاج بالقسطرة؟", paragraphs: ["تُمرَّر قسطرة عبر الشرايين إلى داخل التشوه ثم يُحقن سائل شبه صمغي لسدّ الأوعية غير الطبيعية. يتم العلاج في  جلسة او اكثر حسب حجم و تعقيد التشوه. يُستخدم أحيانًا العلاج بالقسطرة وحده وأحيانًا لتمهيد التشوه للجراحة أو العلاج الإشعاعي."] },
        { heading: "المخاطر.", paragraphs: ["نزيف أو سكتة دماغية أو ضعف جديد أو مشكلات في البصر أو الكلام، وفي حالات نادرة الوفاة. سيشرح الفريق الخطر في حالتك، وستحتاج فحوص متابعة."] },
        { paragraphs: ["اطلب الإسعاف عند صداع مفاجئ شديد أو تشنج أو ضعف مفاجئ."] },
      ],
      searchTerms: ["تشوه شرياني وريدي بالمخ", "علاج التشوهات الشريانية الوريدية"],
    },
  },
  {
    slug: "stroke-thrombectomy",
    en: {
      slug: "stroke-thrombectomy",
      title: "Mechanical thrombectomy for acute stroke",
      blocks: [
        { paragraphs: ["If you think someone is having a stroke, call emergency services now. Do not use this website or send a message. Look for face drooping, arm weakness and slurred speech. Note the time symptoms started."] },
        { heading: "What it is.", paragraphs: ["Most strokes happen when a clot blocks an artery in the brain. When a large artery is blocked, mechanical thrombectomy can remove the clot. A catheter is guided through an artery, usually from the groin or wrist, up to the clot. A small device then traps the clot or sucks it out."] },
        { heading: "Who can have it.", paragraphs: ["Brain scans decide this at the hospital, along with how long ago symptoms began and the size of brain damage already caused by the blocked artery. It has been shown to help selected people up to 24 hours after a stroke. Some people also receive clot-dissolving medicine first. Not everyone can have thrombectomy, and it does not help everyone who has it."] },
        { heading: "What to expect.", paragraphs: ["The procedure may be under local anaesthetic with sedation, or general anaesthetic. Afterwards you are looked after in a stroke unit or intensive care."] },
        { heading: "Risks.", paragraphs: ["Bleeding in the brain, damage to the artery, and the clot not being fully removed."] },
        { heading: "After a stroke.", paragraphs: ["Rehabilitation and long-term follow-up are provided by neurology and rehabilitation teams. Dr. Aggour treats the first, urgent stage in the first few hours where he works.."] },
      ],
      searchTerms: ["stroke thrombectomy", "mechanical thrombectomy", "stroke symptoms"],
    },
    ar: {
      slug: "stroke-thrombectomy",
      title: "استخراج الجلطة الدماغية ميكانيكيًا (سحب الجلطة)",
      blocks: [
        { paragraphs: ["إذا شككت في إصابة شخص بجلطة دماغية فاتصل بالإسعاف فورًا. لا تستخدم هذا الموقع ولا ترسل رسالة. انتبه إلى ميل الوجه وضعف الذراع وثقل الكلام، وسجّل وقت بدء الأعراض."] },
        { heading: "ما هو؟", paragraphs: ["تحدث معظم الجلطات الدماغية عندما تسدّ خثرة (جلطة) شريانًا في المخ. وعند انسداد شريان كبير يمكن إزالة الخثرة بالقسطرة. تُمرَّر قسطرة عبر شريان، غالبًا من أعلى الفخذ أو الرسغ، حتى الخثرة في المخ، ثم تلتقطها دعامة صغيرة أو تُسحب بالشفط."] },
        { heading: "من يمكنه الاستفادة؟", paragraphs: ["تحدد ذلك فحوص الدماغ في المستشفى، ومعها الوقت المنقضي منذ بدء الأعراض وحجم الانسجة التي تضررت بسبب الشريان المسدود. ثبتت الفائدة لمرضى مختارين حتى 24 ساعة بعد الجلطة. يتلقى بعض المرضى أولًا دواءً مذيبًا للخثرة. لا يناسب الاستخراج كل مريض، ولا يفيد كل من يُجرى له."] },
        { heading: "ماذا تتوقع؟", paragraphs: ["قد يتم الإجراء بتخدير موضعي مع مهدئ أو بتخدير كلي. بعده تُرعى في وحدة السكتة الدماغية أو العناية المركزة."] },
        { heading: "المخاطر.", paragraphs: ["نزيف في المخ وتلف في الشريان وعدم إزالة الخثرة كاملة."] },
        { heading: "بعد الجلطة.", paragraphs: ["يتولى التأهيل والمتابعة طويلة الأمد فريق الأعصاب والتأهيل. يعالج الدكتور عجور المرحلة الأولى العاجلة في المستشفيات التي يمارس فيها."] },
      ],
      searchTerms: ["استخراج الجلطة الدماغية بالقسطرة", "جلطة دماغية", "سكتة دماغية"],
    },
  },
  {
    slug: "fistulas",
    en: {
      slug: "fistulas",
      title: "Dural and carotid-cavernous fistula embolisation",
      blocks: [
        { heading: "What it is.", paragraphs: ["A fistula is an abnormal direct link between an artery and a vein. A dural fistula sits in the covering around the brain or spinal cord. A carotid-cavernous fistula sits behind the eye, where the carotid artery runs through a vein-filled space."] },
        { heading: "Symptoms depend on where it is.", items: ["Near the ear: a whooshing sound in time with your heartbeat (pulsatile tinnitus), and sometimes headache.", "Behind the eye: a red, swollen or bulging eye, double vision, eye pain, or blurred vision.", "In the spine: slowly worsening leg weakness or numbness and bladder or bowel problems. This is often mistaken for other conditions, so tell your doctor if it is getting worse."] },
        { paragraphs: ["Some fistulas can bleed. Call emergency services for a sudden severe headache."] },
        { heading: "Diagnosis.", paragraphs: ["MRI or CT scans, and often a catheter angiogram, which shows the abnormal flow best."] },
        { heading: "Treatment.", paragraphs: ["In most cases a catheter is guided into the fistula and a liquid, coils or both are used to close the connection. Some low-risk fistulas are only watched."] },
        { heading: "Risks.", paragraphs: ["Stroke, bleeding, and nerve or vision problems. Fistulas can return, so you will have follow-up imaging."] },
      ],
      searchTerms: ["dural arteriovenous fistula", "carotid-cavernous fistula", "spinal dural AVF"],
    },
    ar: {
      slug: "fistulas",
      title: "علاج النواسير الشريانية الوريدية الجافية والسباتية الكهفية",
      blocks: [
        { heading: "ما هو؟", paragraphs: ["الناسور اتصال مباشر غير طبيعي بين شريان ووريد. الناسور الجافي يقع في الغشاء القوي المحيط بالمخ أو الحبل الشوكي. والناسور السباتي الكهفي يقع خلف العين حيث يمرّ الشريان السباتي في حيّز مليء بالأوردة."] },
        { heading: "تختلف الأعراض بحسب الموضع.", items: ["قرب الأذن: صوت أزيز يتوافق مع نبض القلب (الطنين النابض)، وأحيانًا صداع.", "خلف العين: احمرار العين أو تورمها أو بروزها، وازدواج الرؤية وألم العين أو تشوش البصر.", "في العمود الفقري: ضعف أو تنميل في الساقين يزداد ببطء مع مشكلات في التبول أو التبرز. كثيرًا ما يُظن أنه مرض آخر، فأخبر طبيبك إن كان يزداد سوءًا."] },
        { paragraphs: ["بعض النواسير قد تنزف. اتصل بالإسعاف عند صداع مفاجئ شديد."] },
        { heading: "التشخيص.", paragraphs: ["الرنين أو الأشعة المقطعية، وغالبًا قسطرة تشخيصية تُظهر مسار الدم غير الطبيعي بأوضح صورة."] },
        { heading: "العلاج.", paragraphs: ["في أغلب الحالات تُمرَّر قسطرة إلى الناسور ويُستخدم سائل أو ملفّات أو كلاهما لإغلاق الاتصال .بعض النواسير منخفضة الخطورة تُراقب فقط."] },
        { heading: "المخاطر.", paragraphs: ["سكتة دماغية ونزيف ومشكلات في الأعصاب أو البصر. قد يعود الناسور، لذا ستجري فحوص متابعة."] },
      ],
      searchTerms: ["ناسور شرياني وريدي جافي", "ناسور سباتي كهفي", "طنين الأذن النابض"],
    },
  },
  {
    slug: "venous-sinus-stenting",
    en: {
      slug: "venous-sinus-stenting",
      title: "Venous sinus stenting",
      blocks: [
        { heading: "What it is.", paragraphs: ["Large veins inside the skull, called venous sinuses, drain blood from the brain. When one is narrowed (stenosed), pressure can build up. This can cause a whooshing sound in time with your heartbeat (pulsatile tinnitus), and in some people a condition called idiopathic intracranial hypertension (IIH), where pressure inside the head is raised for no clear reason."] },
        { heading: "Symptoms of IIH.", paragraphs: ["Headache that is often worse lying down or in the morning, brief greying-out of vision, double vision, and a whooshing noise in the ear. If untreated, IIH can damage vision permanently. See an eye specialist urgently if your vision changes."] },
        { heading: "Is tinnitus always due to sinus stenosis?", paragraphs: ["No. Most tinnitus has other causes. A doctor needs to look for the cause of pulsatile tinnitus, which can include abnormal vessels, not just a narrowed vein."] },
        { heading: "How it is assessed.", paragraphs: ["An eye examination, MR or CT scans of the veins, and sometimes a catheter test that measures pressure across the narrowing."] },
        { heading: "Treatment.", paragraphs: ["Weight loss and medicines come first in IIH. Venous sinus stenting places a small mesh tube in the narrowed vein to hold it open. It is considered for selected people with a proven narrowing and pressure difference, usually when other treatment has not worked."] },
        { heading: "What the research shows.", paragraphs: ["Stenting often improves swollen optic nerves and pulsatile tinnitus. Headache improves less reliably."] },
        { heading: "Risks.", paragraphs: ["Bleeding, a clot in the stent, headache, and narrowing next to the stent. You take blood-thinning tablets for a time afterwards."] },
      ],
      searchTerms: ["venous sinus stenting", "pulsatile tinnitus", "idiopathic intracranial hypertension"],
    },
    ar: {
      slug: "venous-sinus-stenting",
      title: "دعامة الجيوب الوريدية",
      blocks: [
        { heading: "ما هو؟", paragraphs: ["تصرّف أوردة كبيرة داخل الجمجمة تسمى الجيوب الوريدية الدم من المخ. عند ضيق أحدها قد يرتفع الضغط. وقد يسبب ذلك صوت أزيز يتوافق مع نبض القلب (الطنين النابض)، وعند بعض المرضى حالة تسمى ارتفاع الضغط داخل الجمجمة مجهول السبب، حيث يرتفع الضغط داخل الرأس دون سبب واضح."] },
        { heading: "أعراض ارتفاع الضغط.", paragraphs: ["صداع يشتد غالبًا في الاستلقاء أو صباحًا، وعتمة مؤقتة في الرؤية لثوانٍ وازدواج الرؤية وأزيز في الأذن. وإن لم يُعالج قد يضر بالبصر ضررًا دائمًا. راجع طبيب العيون سريعًا إذا تغيّرت رؤيتك."] },
        { heading: "هل كل طنين سببه ضيق الجيوب الوريدية؟", paragraphs: ["لا. للطنين أسباب أخرى كثيرة. يحتاج الطبيب إلى البحث عن سبب الطنين النابض، وقد يكون أوعية غير طبيعية وليس تضيق وريد فقط."] },
        { heading: "كيف يُقيَّم؟", paragraphs: ["فحص العين وأشعة بالرنين أو المقطعية للأوردة، وأحيانًا قسطرة تقيس الضغط عبر موضع الضيق."] },
        { heading: "العلاج.", paragraphs: ["يبدأ علاج ارتفاع الضغط بإنقاص الوزن والأدوية. أما الدعامة فتضع أنبوبًا شبكيًا صغيرًا في الوريد الضيق ليبقى مفتوحًا، وتُنظر لمرضى مختارين لديهم ضيق وفرق ضغط مثبتان، غالبًا عندما لا ينجح العلاج الآخر."] },
        { heading: "ماذا يقول البحث؟", paragraphs: ["كثيرًا ما تُحسّن الدعامة تورّم العصب البصري والطنين النابض، أما الصداع فيتحسن بدرجة أقل ثباتًا. تأتي الأدلة حتى الآن من دراسات رصدية أكثر منها تجارب عشوائية، فاليقين محدود، والتجارب جارية."] },
        { heading: "المخاطر.", paragraphs: ["نزيف وخثرة في الدعامة وصداع وضيق بجوار الدعامة. تتناول مضادات الصفائح لفترة بعدها."] },
      ],
      searchTerms: ["طنين الأذن النابض", "ارتفاع ضغط المخ الحميد", "ارتفاع الضغط داخل الجمجمة مجهول السبب", "دعامة الجيوب الوريدية"],
    },
  },
  {
    slug: "carotid-intracranial-stenting",
    en: {
      slug: "carotid-intracranial-stenting",
      title: "Neck and intracranial angioplasty and stenting",
      blocks: [
        { heading: "What it is.", paragraphs: ["Fatty deposits (plaque) can narrow the arteries in the neck (the carotid arteries) or inside the skull. A narrowed artery can cause a mini-stroke (TIA) or a stroke and decrease the blood flow needed to the brain. A TIA can look like sudden loss of vision in one eye, brief weakness or numbness on one side, or brief trouble speaking. Treat it as an emergency, even if it is transient and passes. A stroke is a serious condition risking a permeant damage to the brain or even death"] },
        { paragraphs: ["Many people have no symptoms until the first TIA or stroke. Narrowing is often found by chance, for example when a doctor hears a sound over the neck artery."] },
        { heading: "Treatment for everyone: medicines and lifestyle.", paragraphs: ["Antiplatelets, cholesterol medicine, blood pressure and diabetes control, stopping smoking and exercise."] },
        { heading: "Narrowing in the neck.", paragraphs: ["If it has caused symptoms, opening the artery lowers the chance of another stroke, and it works best soon after symptoms. Two ways are used: surgery to clean out the artery (endarterectomy), or a stent placed through a catheter. Large studies found similar overall results, with different risks. Your age and anatomy help decide. Stenting is a minimally invasive procedure compared to surgery."] },
        { heading: "Narrowing inside the skull.", paragraphs: ["Studies found that intensive medical treatment worked better than stenting. So stenting is kept for selected people who keep having symptoms despite the best medicines."] },
        { heading: "What happens.", paragraphs: ["A balloon (angioplasty) opens the artery and a stent holds it open."] },
        { heading: "Risks.", paragraphs: ["Stroke, bleeding, the artery narrowing again, and effects on the heart. You take antiplatelets for a time afterwards."] },
      ],
      searchTerms: ["carotid stenting", "carotid stenosis", "TIA", "intracranial stenosis"],
    },
    ar: {
      slug: "carotid-intracranial-stenting",
      title: "توسيع الشرايين وتركيب الدعامات في الرقبة او داخل الجمجمة",
      blocks: [
        { heading: "ما هو؟", paragraphs: ["قد تضيّق الترسبات الدهنية (اللويحات) الشرايين في الرقبة (الشرايين السباتية) أو داخل الجمجمة. وقد يسبب الشريان الضيق نوبة إقفاريه عابرة أو جلطة دماغية كاملة. تبدو النوبة العابرة كفقدان مفاجئ للبصر في عين واحدة أو ضعف أو تنميل مؤقت في جانب من الجسم أو صعوبة مؤقتة في الكلام. تعامل معها كحالة طارئة، حتى لو زالت. الجلطة الدماغية الكاملة هي حالة خطيرة٬ وقد تسبب تلفا دائما شديد بالمخ او حتى الوفاه."] },
        { paragraphs: ["لا يشعر كثير من المرضى بأعراض حتى النوبة الأولى المؤقتة أو الجلطة الكاملة. وكثيرًا ما يُكتشف الضيق بالمصادفة، كأن يسمع الطبيب صوتًا فوق شريان الرقبة."] },
        { heading: "العلاج للجميع: الأدوية ونمط الحياة.", paragraphs: ["مضادات الصفائح ودواء الكوليسترول وضبط الضغط والسكر والإقلاع عن التدخين والرياضة."] },
        { heading: "الضيق في الرقبة.", paragraphs: ["إذا سبّب أعراضًا فإن فتح الشريان يقلل احتمال جلطة جديدة، وأفضل نتائجه تكون بعد الأعراض بوقت قصير. تُستخدم طريقتان: جراحة لتنظيف الشريان، أو دعامة تُوضع بالقسطرة. وجدت دراسات كبيرة نتائج متقاربة إجمالًا مع اختلاف المخاطر، ويساعد عمرك وتشريح الشريان في الاختيار. العلاج بالقسطرة اقل صعوبة على المريض مقارنة بالتخل الجراحي."] },
        { heading: "الضيق داخل الجمجمة.", paragraphs: ["وجدت الدراسات أن العلاج الدوائي المكثف أفضل من الدعامة. لذلك تُخصَّص الدعامة لمرضى مختارين يستمر ظهور أعراضهم رغم أفضل الأدوية."] },
        { heading: "ماذا يحدث؟", paragraphs: ["يفتح بالون الشريان (رأب الشريان) و الدعامة تبقيه مفتوحا."] },
        { heading: "المخاطر.", paragraphs: ["سكتة دماغية ونزيف وعودة ضيق الشريان وتأثير على القلب. تتناول مضادات الصفائح لفترة بعد الإجراء."] },
      ],
      searchTerms: ["تضيق الشريان السباتي", "قسطرة الشريان السباتي", "علامات تنذر بالسكتة الدماغية"],
    },
  },
  {
    slug: "paediatric",
    en: {
      slug: "paediatric",
      title: "Paediatric interventions, including vein of Galen embolization",
      blocks: [
        { heading: "What it is.", paragraphs: ["Babies and children can have blood vessel problems of the brain and spine. These include AVMs, fistulas, and rare malformations such as the vein of Galen malformation, a tangle where arteries connect straight into a large deep brain vein. Children are not small adults. Their management is different and specialized."] },
        { heading: "Vein of Galen malformation.", items: ["Newborns may have heart strain, because of the large flow through the malformation.", "Babies may have a growing head size because fluid collects, or seizures.", "Older children may have developmental delay."] },
        { heading: "Treatment.", paragraphs: ["Embolisation closes the abnormal connections with a catheter, usually in stages. The timing depends on how the baby’s heart and brain are coping. The goal is often to reduce flow and protect the brain and heart, not always to close everything at once."] },
        { heading: "Who is involved.", paragraphs: ["A team of paediatric neurology, paediatric cardiology and intensive care, anaesthesia, neurosurgery and neuroradiology."] },
        { heading: "Questions for parents:", paragraphs: ["What is the plan and timing? How will you protect my child’s heart? What follow-up will be needed?"] },
        { heading: "Risks.", paragraphs: ["Bleeding, stroke, developmental problems and anaesthetic risks, discussed with you individually."] },
        { paragraphs: ["Get urgent help if your child has a seizure, sudden weakness, repeated vomiting with unusual sleepiness, or breathing difficulty."] },
      ],
      searchTerms: ["vein of Galen malformation", "paediatric AVM"],
    },
    ar: {
      slug: "paediatric",
      title: "تدخلات الأطفال ومنها تشوه وريد جالين",
      blocks: [
        { heading: "ما هو؟", paragraphs: ["قد يصاب الرضّع والأطفال بمشكلات في أوعية المخ والعمود الفقري، منها التشوهات الشريانية الوريدية والنواسير وتشوهات نادرة مثل تشوه وريد جالين، وهو تشابك تتصل فيه الشرايين مباشرة بوريد عميق كبير في المخ. الأطفال ليسوا بالغين صغارًا، ويُخطَّط علاجهم مع طبيب ضمن اختصاصته قسطرة الأطفال المخية."] },
        { heading: "تشوه وريد جالين.", items: ["حديثو الولادة قد يعانون إجهادًا في القلب بسبب التدفق الكبير في التشوه.", "الرضّع قد يكبر حجم رأسهم لتجمع السوائل، أو تحدث لهم تشنجات.", "الأطفال الأكبر قد يتأخر نموّهم."] },
        { heading: "العلاج.", paragraphs: ["يغلق الانسداد بالقسطرة الاتصالات غير الطبيعية، وغالبًا على مراحل. يتوقف التوقيت على قدرة قلب الرضيع ودماغه على التحمل. الهدف غالبًا تقليل التدفق وحماية الدماغ والقلب، وليس دائمًا إغلاق كل شيء مرة واحدة."] },
        { heading: "من يشارك؟", paragraphs: ["فريق من أعصاب الأطفال وقلب الأطفال والعناية المركزة والتخدير وجراحة المخ والأعصاب والأشعة العصبية."] },
        { heading: "أسئلة للوالدين:", paragraphs: ["ما الخطة وتوقيتها؟ كيف ستحمون قلب طفلي؟ ما المتابعة المطلوبة؟"] },
        { heading: "المخاطر.", paragraphs: ["نزيف وسكتة دماغية ومشكلات في النمو ومخاطر التخدير، وتُناقش معك بحسب حالة طفلك."] },
        { paragraphs: ["اطلب الإسعاف إذا أصيب طفلك بتشنج أو ضعف مفاجئ أو قيء متكرر مع نعاس غير معتاد أو صعوبة في التنفس."] },
      ],
      searchTerms: ["تشوه وريد جالين", "علاج تشوهات أوعية المخ عند الأطفال"],
    },
  },
  {
    slug: "chronic-subdural-haematoma",
    en: {
      slug: "chronic-subdural-haematoma",
      title: "Chronic subdural haematoma",
      blocks: [
        { heading: "What it is.", paragraphs: ["A chronic subdural haematoma is a slow collection of old blood between the surface of the brain and its outer covering. It often starts weeks after a head knock that seemed minor, or that was forgotten. It is also spontaneous and more common in older people and in people on blood thinners."] },
        { heading: "Signs to watch for, especially in an older relative.", paragraphs: ["Headache that is getting worse, confusion, memory or personality change, sleepiness, unsteady walking or falls, weakness on one side, and sometimes seizures. Get medical help promptly."] },
        { heading: "Usual treatment.", paragraphs: ["A neurosurgeon drains the blood through a small hole in the skull. It can come back."] },
        { heading: "Embolisation.", paragraphs: ["Middle meningeal artery (MMA) embolisation blocks the artery that feeds the lining of the haematoma. A catheter is guided through an artery at the wrist or groin to the MMA, and tiny particles or liquid close it. The aim is to lower the chance that the haematoma returns.", "Embolisation is an option for selected people, often those at higher risk of the haematoma returning or fragile patients not fit for Surgery. It is not a replacement for surgery, and the decision is made with the neurosurgery team."] },
        { heading: "Risks.", paragraphs: ["Bleeding or bruising where the catheter went in, stroke (rare), and the haematoma not shrinking."] },
      ],
      searchTerms: ["chronic subdural haematoma", "MMA embolisation"],
    },
    ar: {
      slug: "chronic-subdural-haematoma",
      title: "النزيف المزمن تحت الجافية",
      blocks: [
        { heading: "ما هو؟", paragraphs: ["النزيف المزمن تحت الجافية تجمّع بطيء لدم قديم بين سطح المخ وغشائه الخارجي. يبدأ غالبًا بعد أسابيع من ضربة على الرأس بدت بسيطة أو نُسيت. وهو أيضا شائع عند كبار السن ومن يتناولون مميعات الدم."] },
        { heading: "علامات تستدعي الانتباه، خاصة عند قريب مسنّ.", paragraphs: ["صداع يزداد سوءًا وتشوش وتغيّر في الذاكرة أو الشخصية ونعاس وعدم اتزان أو سقوط وضعف في جانب واحد، وأحيانًا تشنجات. اطلب مساعدة طبية سريعًا."] },
        { heading: "العلاج المعتاد.", paragraphs: ["يُفرغ جرّاح المخ والأعصاب الدم عبر ثقب صغير في الجمجمة. وقد يعود التجمع."] },
        { heading: "العلاج بالقسطرة.", paragraphs: ["يسدّ انسداد الشريان السحائي المتوسط الشريان الذي يغذي بطانة التجمع الدموي. تُمرَّر قسطرة من شريان في الرسغ أو أعلى الفخذ إلى هذا الشريان وتغلقه جسيمات دقيقة أو سائل. الهدف تقليل احتمال عودة التجمع.", "يُعدّ العلاج بالقسطرة خيارًا لمرضى مختارين، غالبًا من يرتفع عندهم خطر عودة التجمع او للمرضي ذوو الحالات الصحية الهشة بالنسبة للجراحة. وهو ليس بديلًا عن الجراحة، ويُقرَّر مع فريق جراحة المخ والأعصاب."] },
        { heading: "المخاطر.", paragraphs: ["نزيف أو كدمة في مكان القسطرة وسكتة دماغية (نادرة) وعدم انكماش التجمع."] },
      ],
      searchTerms: ["نزيف تحت الجافية", "تجمع دموي تحت الجافية", "كدمة في المخ بعد السقوط"],
    },
  },
  {
    slug: "other-embolisation",
    en: {
      slug: "other-embolisation",
      title: "Other embolisation: nosebleeds, tumours and trauma",
      blocks: [
        { heading: "What embolisation means.", paragraphs: ["Embolisation closes blood vessels on purpose. A catheter is guided to the vessel, and tiny particles, coils or liquid block it. It is used where controlling blood flow helps."] },
        { heading: "Severe nosebleeds (epistaxis).", paragraphs: ["Most nosebleeds stop with pressure, packing or cautery by an ear, nose and throat doctor. Embolisation is considered for a bleed that is severe or keeps coming back despite those steps. The catheter blocks small branches of the artery supplying the nose. Risks are uncommon but real: stroke, facial pain or numbness, and damage to skin or tissue."] },
        { heading: "Tumours.", paragraphs: ["Some tumours of the head, neck and brain have a rich blood supply. Embolisation before surgery can reduce bleeding during the operation. It may also be used to relieve symptoms."] },
        { heading: "Injury (trauma).", paragraphs: ["After an injury to the head, face or neck, a damaged vessel may bleed or form a weak bulge. Embolisation can close it, sometimes as an emergency."] },
        { heading: "Heavy nosebleed?", paragraphs: ["Sit forward, pinch the soft part of the nose for 10 to 15 minutes, and go to an emergency department if it does not stop or you feel faint."] },
        { heading: "Risks.", paragraphs: ["Depend on the area. The team will explain them before any planned procedure."] },
      ],
      searchTerms: ["embolisation", "epistaxis embolisation", "tumour embolisation"],
    },
    ar: {
      slug: "other-embolisation",
      title: "انسدادات علاجية أخرى: نزيف الانف (الرعاف) والأورام والإصابات",
      blocks: [
        { heading: "ما معنى العلاج بالقسطرة ؟", paragraphs: ["هو إغلاق الأوعية الدموية عمدًا. تُمرَّر قسطرة إلى الوعاء وتغلقه جسيمات دقيقة أو ملفّات أو سائل. يُستخدم حيث يفيد التحكم في تدفق الدم."] },
        { heading: "الرعاف الشديد (نزيف الأنف).", paragraphs: ["يتوقف معظم نزيف الأنف بالضغط أو الحشو أو الكيّ على يد طبيب الأنف والأذن والحنجرة. يُنظر في الانسداد بالقسطرة عند نزيف شديد أو يتكرر رغم هذه الخطوات، وتغلق القسطرة فروعًا صغيرة من الشريان المغذّي للأنف. مخاطره غير شائعة لكنها حقيقية: سكتة دماغية وألم أو تنميل في الوجه وتلف في الجلد أو الأنسجة."] },
        { heading: "الأورام.", paragraphs: ["تمتلك بعض أورام الرأس والعنق والمخ إمدادًا دمويًا غزيرًا. قد يقلل الانسداد قبل الجراحة النزيف أثناء العملية، وقد يُستخدم أيضًا لتخفيف الأعراض."] },
        { heading: "الإصابات.", paragraphs: ["بعد إصابة في الرأس أو الوجه أو الرقبة قد ينزف وعاء متضرر أو يتكوّن فيه انتفاخ ضعيف. يمكن إغلاقه بالانسداد، أحيانًا في حالة طارئة."] },
        { heading: "نزيف أنف شديد؟", paragraphs: ["اجلس مائلًا إلى الأمام واضغط الجزء الرخو من الأنف 10 إلى 15 دقيقة، واذهب إلى الطوارئ إن لم يتوقف أو شعرت بدوار."] },
        { heading: "المخاطر.", paragraphs: ["تختلف بحسب المنطقة، وسيشرحها الفريق قبل أي إجراء مخطط له."] },
      ],
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
  description: string;
  /** The condition's full document, rendered verbatim on the /conditions hub. */
  blocks: readonly PatientConditionBlock[];
}>;

/**
 * Review stamp printed under the heading of the conditions hub and of every
 * condition page: who checked the copy, and when. One source, both locales.
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

/**
 * Verbatim lead paragraph used as a condition description.
 *
 * The document opens most conditions with a headed "What it is." block, and that
 * paragraph is the description. Where the first block is an unheaded notice
 * (stroke-thrombectomy), the first headed block is used instead so the line
 * describes the condition rather than issuing an instruction. The text is always
 * copied unchanged from the document.
 */
export function getConditionDescription(page: PatientConditionPage): string {
  const intro =
    page.blocks.find((block) => block.heading && block.paragraphs?.length) ??
    page.blocks.find((block) => block.paragraphs?.length);
  return intro?.paragraphs?.[0] ?? page.title;
}

/**
 * The condition index shared by the home cards and the /conditions list.
 *
 * Both surfaces render this array in document order, so a title or description
 * edit in `patientConditions` lands on the home page, the hub page and the
 * condition detail page at once, and both locales keep the same order.
 */
export function getConditionListing(locale: ConditionListingLocale): readonly ConditionListingItem[] {
  return patientConditions.map((condition) => {
    const page = condition[locale];
    return {
      slug: condition.slug,
      title: page.title,
      description: getConditionDescription(page),
      blocks: page.blocks,
    };
  });
}
