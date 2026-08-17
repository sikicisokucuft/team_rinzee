export type Language = 'en' | 'de' | 'tr' | 'ar' | 'es' | 'fr' | 'it' | 'ru' | 'pt' | 'nl' | 'pl';

export interface LanguageInfo {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
  dir?: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', dir: 'ltr' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', dir: 'ltr' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', dir: 'ltr' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷', dir: 'ltr' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', dir: 'ltr' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', dir: 'ltr' },
];

export interface BulletItem {
  prefix?: string;
  bold: string;
  suffix?: string;
}

export interface TranslationSchema {
  promo: {
    discountBadge: string;
    expiresIn: string;
    joinNow: string;
  };
  hero: {
    discountBadge: string;
    joinOur: string;
    vipGroup: string;
    bullets: BulletItem[];
    ctaLifetime: string;
    ctaPreview: string;
    billingTitle: string;
    billingDesc: string;
    offerExpiresIn: string;
    messageTelegram: string;
    vipMembers: string;
    positiveReviews: string;
  };
  socialProof: {
    title: string;
    titleHighlight: string;
  };
  faq: {
    title: string;
    titleHighlight: string;
    items: {
      question: string;
      answer: string;
    }[];
  };
  whoWeAre: {
    title: string;
    titleHighlight: string;
    p1: string;
    p2: string;
    p3: string;
  };
  choice: {
    title: string;
    titleHighlight: string;
    ofTitle: string;
    ofItems: string[];
    vipBadge: string;
    phTitle: string;
    phItems: string[];
    enterButton: string;
  };
  contact: {
    title: string;
    ukPhone: string;
    emailLabel: string;
    copied: string;
    copyTitle: string;
    messageTelegram: string;
  };
  footer: {
    rightsReserved: string;
    terms: string;
    privacy: string;
    support: string;
  };
  stickyCta: {
    brandTitle: string;
    lifetimeAccess: string;
    discountBadge: string;
    tagline: string;
    limitedOffer: string;
    subTagline: string;
    joinButton: string;
  };
  paymentModal: {
    title: string;
    subtitle: string;
    membershipTitle: string;
    specialOffer: string;
    lifetimeNotice: string;
    discreetBillingTitle: string;
    discreetBillingDesc: string;
    processing: string;
    successTitle: string;
    successDesc: string;
    redirecting: string;
    securePayment: string;
  };
}

export const translations: Record<Language, TranslationSchema> = {
  en: {
    promo: {
      discountBadge: "50% OFF",
      expiresIn: "SPECIAL OFFER EXPIRES IN:",
      joinNow: "JOIN NOW",
    },
    hero: {
      discountBadge: "50% OFF",
      joinOur: "JOIN OUR ",
      vipGroup: "VIP GROUP",
      bullets: [
        {
          prefix: "Specialized in",
          bold: "high-quality JOI videos",
          suffix: "+ thousands of exclusive OnlyFans content"
        },
        {
          prefix: "Get instant access to over",
          bold: "$3,000/month",
          suffix: "worth of premium videos"
        },
        {
          prefix: "Watch",
          bold: "8,000+ full-length videos",
          suffix: "from top creators"
        },
        {
          prefix: "",
          bold: "Request any model",
          suffix: "— we upload within 48 hours"
        },
        {
          prefix: "",
          bold: "One-time payment",
          suffix: "for Lifetime Access. No recurring fees."
        }
      ],
      ctaLifetime: "GET LIFETIME ACCESS NOW",
      ctaPreview: "WATCH VIP PREVIEW",
      billingTitle: "🔒 100% Discreet Billing:",
      billingDesc: "Appears strictly as neutral FLOW1 LTD on bank & PayPal statements.",
      offerExpiresIn: "OFFER EXPIRES IN:",
      messageTelegram: "Message Us On Telegram",
      vipMembers: "3,000+ VIP MEMBERS",
      positiveReviews: "99% POSITIVE REVIEWS",
    },
    socialProof: {
      title: "TRUSTED BY ",
      titleHighlight: "THOUSANDS",
    },
    faq: {
      title: "FREQUENTLY ASKED ",
      titleHighlight: "QUESTIONS",
      items: [
        {
          question: "Do you see my credit card number when I pay?",
          answer: "No. We never see or store your credit card information. All transactions are securely processed through PayPal, ensuring 100% privacy and safety."
        },
        {
          question: "Is this a one-time payment?",
          answer: "Yes! This is a single one-time payment for permanent Lifetime Access. Once joined, you get unlimited access to stream and download all current and future content. You will never be charged again, and there are no hidden subscription fees."
        },
        {
          question: "Where will I watch the videos?",
          answer: "All content is hosted directly on Telegram in private channels. If you don't have Telegram yet, creating a free account takes less than 2 minutes.\n\nYour privacy is completely protected—no one can see what channels you belong to. Telegram also features built-in search so you can easily locate your favorite models.\n\nImmediately after completing your payment, you will receive your instant invite link. If you ever need help, contact us at pleasureheavenn@gmail.com or message us on Telegram at @pleasureheaven7."
        },
        {
          question: "Are the videos long?",
          answer: "Yes! Over 80% of our videos are full-length features. We strictly focus on full video content and avoid uploading short clips unless long-format material is unavailable for a specific creator.\n\nNote: We upload full video media only—no standalone photos or GIFs."
        },
        {
          question: "I couldn't find the models I wanted",
          answer: "We regularly archive content from top 1% creators. If a model you want is not currently in the channel, simply message us on Telegram with your request. Our team will upload their complete video collection within a few days."
        }
      ]
    },
    whoWeAre: {
      title: "WHO WE ",
      titleHighlight: "ARE",
      p1: "At Pleasure Heaven, we have been archiving premium digital content since 2023. Our dedicated team collects the highest quality and most exclusive media from hundreds of creators, maintaining a continuously updated, well-organized library. Over the years, our media network has generated millions of views and brought together hundreds of thousands of followers.",
      p2: "Our primary mission is to offer a secure, completely private platform with effortless search and navigation—delivering full creator libraries at an unbeatable price.",
      p3: "Today, thousands of active VIP members enjoy exclusive daily updates across our private channels."
    },
    choice: {
      title: "CHOOSE YOUR ",
      titleHighlight: "SIDE",
      ofTitle: "ONLYFANS",
      ofItems: [
        "Unpredictable pay-per-view fees",
        "Cluttered & slow interface",
        "No direct video downloads",
        "$400+ per month for full access"
      ],
      vipBadge: "VIP CHOICE",
      phTitle: "PLEASURE HEAVEN",
      phItems: [
        "Zero hidden fees or PPVs",
        "Direct video downloads enabled",
        "Exclusive videos not found anywhere else online",
        "Full access to 80+ top creator libraries",
        "Custom model requests fulfilled within 48 hours"
      ],
      enterButton: "Enter Pleasure Heaven"
    },
    contact: {
      title: "CONTACT US",
      ukPhone: "For UK: +44 20 4628 1675",
      emailLabel: "Email:",
      copied: "Copied!",
      copyTitle: "Click to copy email address",
      messageTelegram: "Message Us On Telegram"
    },
    footer: {
      rightsReserved: "PLEASURE HEAVEN. ALL RIGHTS RESERVED.",
      terms: "Terms of Service",
      privacy: "Privacy Policy",
      support: "Support"
    },
    stickyCta: {
      brandTitle: "PLEASURE HEAVEN VIP",
      lifetimeAccess: "LIFETIME ACCESS",
      discountBadge: "50% OFF",
      tagline: "8,000+ Videos • Daily Updates • One-Time Payment",
      limitedOffer: "LIMITED OFFER",
      subTagline: "One-Time • Lifetime Access",
      joinButton: "JOIN VIP NOW"
    },
    paymentModal: {
      title: "JOIN PLEASURE HEAVEN",
      subtitle: "Secure your VIP access today.",
      membershipTitle: "Lifetime VIP Membership",
      specialOffer: "50% OFF SPECIAL",
      lifetimeNotice: "* Lifetime Access: Enjoy permanent VIP membership with this one-time payment. No recurring fees.",
      discreetBillingTitle: "🔒 100% Discreet Billing (Privacy Guard)",
      discreetBillingDesc: "On your bank or PayPal statement, this transaction will appear strictly as FLOW1 LTD with zero mention of VIP or adult content.",
      processing: "Processing payment...",
      successTitle: "Payment Successful!",
      successDesc: "Welcome to Pleasure Heaven VIP.",
      redirecting: "Redirecting to Telegram channel...",
      securePayment: "Secure encrypted payment"
    }
  },

  tr: {
    promo: {
      discountBadge: "%50 İNDİRİM",
      expiresIn: "ÖZEL FIRSAT İÇİN KALAN SÜRE:",
      joinNow: "HEMEN KATIL",
    },
    hero: {
      discountBadge: "%50 İNDİRİM",
      joinOur: "VIP GRUBUMUZA ",
      vipGroup: "KATILIN",
      bullets: [
        {
          prefix: "",
          bold: "Yüksek kaliteli JOI videoları",
          suffix: "ve binlerce özel OnlyFans içeriğinde uzmanlaşmış dev arşiv"
        },
        {
          prefix: "Aylık",
          bold: "3.000$+ değerindeki",
          suffix: "premium video arşivine anında sınırsız erişim"
        },
        {
          prefix: "En popüler üreticilerden",
          bold: "8.000'den fazla tam uzunlukta video",
          suffix: "izleyin"
        },
        {
          prefix: "",
          bold: "İstediğiniz modeli talep edin",
          suffix: "— 48 saat içinde özel olarak yüklüyoruz"
        },
        {
          prefix: "",
          bold: "Tek seferlik ödeme",
          suffix: "ile Ömür Boyu Erişim. Yenilenen veya gizli ücret yok."
        }
      ],
      ctaLifetime: "ÖMÜR BOYU ERİŞİMİ ŞİMDİ ALIN",
      ctaPreview: "VIP ÖNİZLEMEYİ İZLE",
      billingTitle: "🔒 %100 Gizli Faturalandırma:",
      billingDesc: "Banka ve PayPal ekstrelerinizde tamamen tarafsız olarak FLOW1 LTD adıyla görünür; yetişkin içerik veya VIP ifadesi yer almaz.",
      offerExpiresIn: "FIRSAT İÇİN KALAN SÜRE:",
      messageTelegram: "Telegram'dan Bize Yazın",
      vipMembers: "3.000+ VIP ÜYE",
      positiveReviews: "%99 OLUMLU GERİ BİLDİRİM",
    },
    socialProof: {
      title: "BİNLERCE KİŞİNİN ",
      titleHighlight: "GÜVENDİĞİ PLATFORM",
    },
    faq: {
      title: "SIKÇA SORULAN ",
      titleHighlight: "SORULAR",
      items: [
        {
          question: "Ödeme yaparken kart bilgilerimi görebiliyor musunuz?",
          answer: "Hayır. Kart bilgilerinizi asla görmüyoruz ve saklamıyoruz. Tüm ödemeler %100 gizlilik ve güvenlik garantisiyle doğrudan PayPal altyapısı üzerinden güvenle gerçekleştirilir."
        },
        {
          question: "Bu tek seferlik bir ödeme mi?",
          answer: "Evet! Bu ödeme kalıcı ve Ömür Boyu Erişim içindir. Bir kez katıldığınızda mevcut ve gelecekte eklenecek tüm içeriklere sınırsız erişim sağlarsınız. Asla tekrar para çekilmez ve hiçbir gizli abonelik ücreti yoktur."
        },
        {
          question: "Videoları nereden ve nasıl izleyeceğim?",
          answer: "Tüm arşivimiz Telegram üzerindeki özel VIP kanallarımızda barındırılmaktadır. Telegram hesabınız yoksa 2 dakika içinde ücretsiz oluşturabilirsiniz.\n\nGizliliğiniz tamamen korunur; hangi kanallara üye olduğunuzu sizden başka kimse göremez. Dahili arama özelliği sayesinde favori modellerinizi saniyeler içinde bulup anında izleyebilir veya indirebilirsiniz.\n\nÖdemenizi tamamladığınız anda otomatik VIP davet bağlantınız açılır. Her türlü destek için pleasureheavenn@gmail.com adresinden veya Telegram'da @pleasureheaven7 üzerinden bize ulaşabilirsiniz."
        },
        {
          question: "Videolar tam uzunlukta mı?",
          answer: "Evet! Arşivimizdeki videoların %80'inden fazlası tam uzunluktaki orijinal kayıtlardır. Kısa klipler yerine doğrudan uzun metrajlı içeriklere odaklanıyoruz.\n\nNot: Arşivimiz yalnızca yüksek kaliteli video içeriklerinden oluşur; gereksiz fotoğraf veya GIF paylaşımı yapılmaz."
        },
        {
          question: "Aradığım modeli bulamazsam ne olacak?",
          answer: "En popüler modellerin arşivlerini düzenli olarak güncelliyoruz. İstediğiniz özel bir model kanalda henüz yoksa, Telegram üzerinden bize iletmeniz yeterlidir. Ekibimiz birkaç gün içinde ilgili modelin tüm arşivini yükleyecektir."
        }
      ]
    },
    whoWeAre: {
      title: "BİZ ",
      titleHighlight: "KİMİZ?",
      p1: "Pleasure Heaven olarak 2023 yılından bu yana en seçkin dijital içerikleri arşivliyoruz. Uzman ekibimiz yüzlerce üreticiden en yüksek kaliteli ve özel medyaları toplayarak sürekli güncellenen, düzenli ve kusursuz bir kütüphane sunmaktadır. Yıllar içinde ağımız milyonlarca görüntülemeye ve yüz binlerce takipçiye ulaştı.",
      p2: "Temel misyonumuz; kullanımı kolay arama altyapısıyla tam gizlilik ve güvenlik sağlarken, devasa üretici arşivlerini rakipsiz bir fiyatla üyelerimize sunmaktır.",
      p3: "Bugün 3.000'den fazla aktif VIP üyemiz, özel kanallarımızda her gün eklenen yeni içeriklerin keyfini çıkarıyor."
    },
    choice: {
      title: "TARAFINI ",
      titleHighlight: "SEÇ",
      ofTitle: "ONLYFANS",
      ofItems: [
        "Öngörülemeyen her video için ekstra PPV ücretleri",
        "Karışık, yavaş ve kullanışsız arayüz",
        "Doğrudan cihazınıza video indirme imkanı yok",
        "Tam erişim için ayda en az 400$+ maliyet"
      ],
      vipBadge: "VIP TERCİHİ",
      phTitle: "PLEASURE HEAVEN",
      phItems: [
        "Sıfır gizli ücret veya ek ödeme (PPV yok)",
        "Tek tıkla doğrudan video indirme desteği",
        "İnternette başka hiçbir yerde bulunmayan özel arşivler",
        "80'den fazla popüler üreticinin tüm kütüphanelerine sınırsız erişim",
        "İstediğiniz modeller 48 saat içinde özel olarak yüklenir"
      ],
      enterButton: "Pleasure Heaven'a Katıl"
    },
    contact: {
      title: "BİZE ULAŞIN",
      ukPhone: "İngiltere için: +44 20 4628 1675",
      emailLabel: "E-posta:",
      copied: "Kopyalandı!",
      copyTitle: "E-posta adresini kopyalamak için tıklayın",
      messageTelegram: "Telegram'dan Bize Yazın"
    },
    footer: {
      rightsReserved: "PLEASURE HEAVEN. TÜM HAKLARI SAKLIDIR.",
      terms: "Kullanım Koşulları",
      privacy: "Gizlilik Politikası",
      support: "Destek"
    },
    stickyCta: {
      brandTitle: "PLEASURE HEAVEN VIP",
      lifetimeAccess: "ÖMÜR BOYU ERİŞİM",
      discountBadge: "%50 İNDİRİM",
      tagline: "8.000+ Video • Günlük Güncellemeler • Tek Seferlik Ödeme",
      limitedOffer: "SINIRLI FIRSAT",
      subTagline: "Tek Seferlik • Ömür Boyu Erişim",
      joinButton: "VIP'YE HEMEN KATIL"
    },
    paymentModal: {
      title: "PLEASURE HEAVEN'A KATILIN",
      subtitle: "VIP erişiminizi hemen güvence altına alın.",
      membershipTitle: "Ömür Boyu VIP Üyelik",
      specialOffer: "%50 ÖZEL İNDİRİM",
      lifetimeNotice: "* Ömür Boyu Erişim: Bu tek seferlik ödeme ile kalıcı VIP üyeliğin tadını çıkarın. Tekrarlayan hiçbir ücret yoktur.",
      discreetBillingTitle: "🔒 %100 Gizli Faturalandırma (Gizlilik Koruması)",
      discreetBillingDesc: "Banka veya PayPal ekstrenizde bu işlem kesinlikle FLOW1 LTD olarak görünür; VIP veya yetişkin içeriğe dair hiçbir ifade yer almaz.",
      processing: "Ödeme işleniyor...",
      successTitle: "Ödeme Başarılı!",
      successDesc: "Pleasure Heaven VIP dünyasına hoş geldiniz.",
      redirecting: "Telegram kanalına yönlendiriliyorsunuz...",
      securePayment: "256-bit Güvenli Şifreli Ödeme"
    }
  },

  ar: {
    promo: {
      discountBadge: "خصم 50%",
      expiresIn: "ينتهي العرض الخاص خلال:",
      joinNow: "انضم الآن",
    },
    hero: {
      discountBadge: "خصم 50%",
      joinOur: "انضم إلى ",
      vipGroup: "مجموعة الـ VIP",
      bullets: [
        {
          prefix: "محتوى متخصص في",
          bold: "فيديوهات JOI فائقة الجودة",
          suffix: "+ آلاف المقاطع الحصرية من OnlyFans"
        },
        {
          prefix: "احصل على وصول فوري لمحتوى بقيمة تزيد عن",
          bold: "3,000$ شهرياً",
          suffix: "من الفيديوهات الحصرية"
        },
        {
          prefix: "شاهد أكثر من",
          bold: "8,000+ فيديو كامل",
          suffix: "لأشهر وأفضل صناع المحتوى"
        },
        {
          prefix: "",
          bold: "اطلب أي مودل تريدها",
          suffix: "— نقوم برفع المحتوى خلال 48 ساعة فقط"
        },
        {
          prefix: "",
          bold: "دفعة واحدة لمرة واحدة",
          suffix: "لوصول دائم مدى الحياة. بدون أي رسوم أو اشتراكات متكررة."
        }
      ],
      ctaLifetime: "احصل على وصول مدى الحياة الآن",
      ctaPreview: "شاهد معاينة الـ VIP",
      billingTitle: "🔒 فواتير سرية 100%:",
      billingDesc: "تظهر المعاملة في كشف الحساب البنكي وPayPal باسم محايد FLOW1 LTD بدون أي إشارة للمحتوى.",
      offerExpiresIn: "ينتهي العرض خلال:",
      messageTelegram: "تواصل معنا عبر تيليجرام",
      vipMembers: "+3,000 عضو VIP",
      positiveReviews: "99% تقييمات إيجابية",
    },
    socialProof: {
      title: "موثوق من قبل ",
      titleHighlight: "الآلاف",
    },
    faq: {
      title: "الأسئلة ",
      titleHighlight: "الشائعة",
      items: [
        {
          question: "هل تطلعون على بيانات بطاقتي الائتمانية عند الدفع؟",
          answer: "كلا، على الإطلاق. نحن لا نرى ولا نخزن أي بيانات بنكية. تتم جميع المعاملات بشكل آمن ومشفر بالكامل عبر PayPal لضمان الخصوصية والأمان بنسبة 100%."
        },
        {
          question: "هل هذه دفعة لمرة واحدة فقط؟",
          answer: "نعم بالتأكيد! هذه دفعة واحدة فقط للحصول على وصول دائم مدى الحياة. بمجرد الانضمام، يمكنك مشاهدة وتحميل كافة المحتويات الحالية والمستقبلية بلا حدود، ولن يتم خصم أي مبالغ منك مجدداً."
        },
        {
          question: "أين وكيف سأشاهد الفيديوهات؟",
          answer: "جميع المحتويات مستضافة مباشرة في قنوات تيليجرام الخاصة. إذا لم يكن لديك حساب، يمكنك إنشاء حساب مجاني في أقل من دقيقتين.\n\nخصوصيتك محمية بالكامل ولا يمكن لأي شخص معرفة القنوات التي تنضم إليها. كما يتيح لك تيليجرام البحث السريع وتنزيل مقاطعك المفضلة مباشرة.\n\nفور إتمام الدفع، ستصلك روابط الدعوة الفورية مباشرة. لأي استفسار راسلنا على pleasureheavenn@gmail.com أو على تيليجرام @pleasureheaven7."
        },
        {
          question: "هل الفيديوهات كاملة الطول؟",
          answer: "نعم! أكثر من 80% من الفيديوهات كاملة المدة وبأعلى جودة. نحن نركز حصرياً على الفيديوهات الكاملة بدلاً من المقاطع القصيرة.\n\nملاحظة: نرفع الفيديوهات فقط ولا نرفع صوراً أو صور متحركة عادية."
        },
        {
          question: "ماذا لو لم أجد المودل التي أبحث عنها؟",
          answer: "نقوم بتحديث الأرشيف يومياً لأفضل صناع المحتوى. إذا كانت هناك مودل معينة غير موجودة، فقط راسلنا على تيليجرام وسيقوم فريقنا برفع مكتبتها الكاملة خلال أيام معدودة."
        }
      ]
    },
    whoWeAre: {
      title: "من ",
      titleHighlight: "نحن",
      p1: "في Pleasure Heaven، نقوم بأرشفة وتوثيق المحتوى الرقمي المتميز منذ عام 2023. يجمع فريقنا المتخصص أعلى المواد جودة وأكثرها حصرية من مئات صناع المحتوى في مكتبة منظمة ومحدثة باستمرار. على مر السنين، حققت شبكتنا ملايين المشاهدات ومئات الآلاف من المتابعين.",
      p2: "مهمتنا الأساسية هي توفير منصة آمنة، خاصة وسهلة التصفح والبحث—لتقديم أرشيف كامل للمبدعين بسعر لا يقبل المنافسة.",
      p3: "اليوم، يستمتع آلاف الأعضاء النشطين في VIP بالتحديثات اليومية الحصرية عبر قنواتنا الخاصة."
    },
    choice: {
      title: "اختر ",
      titleHighlight: "طريقك",
      ofTitle: "ONLYFANS",
      ofItems: [
        "رسوم إضافية غير متوقعة لكل فيديو (PPV)",
        "واجهة بطيئة ومعقدة",
        "عدم إمكانية تحميل الفيديوهات مباشرة",
        "أكثر من 400$+ شهرياً للوصول الكامل"
      ],
      vipBadge: "خيار الـ VIP الأفضل",
      phTitle: "PLEASURE HEAVEN",
      phItems: [
        "بدون أي رسوم خفية أو مبالغ إضافية (بدون PPV)",
        "إمكانية تنزيل الفيديوهات مباشرة على جهازك",
        "فيديوهات حصرية لا تتوفر في أي مكان آخر على الإنترنت",
        "وصول كامل وشامل لأكثر من 80+ مكتبة لكبار المبدعين",
        "تلبية طلبات المودلز المخصصة خلال 48 ساعة"
      ],
      enterButton: "ادخل إلى Pleasure Heaven"
    },
    contact: {
      title: "تواصل معنا",
      ukPhone: "لبريطانيا: +44 20 4628 1675",
      emailLabel: "البريد الإلكتروني:",
      copied: "تم النسخ!",
      copyTitle: "انقر لنسخ البريد الإلكتروني",
      messageTelegram: "تواصل معنا عبر تيليجرام"
    },
    footer: {
      rightsReserved: "PLEASURE HEAVEN. جميع الحقوق محفوظة.",
      terms: "شروط الخدمة",
      privacy: "سياسة الخصوصية",
      support: "الدعم الفني"
    },
    stickyCta: {
      brandTitle: "PLEASURE HEAVEN VIP",
      lifetimeAccess: "وصول مدى الحياة",
      discountBadge: "خصم 50%",
      tagline: "+8,000 فيديو • تحديثات يومية • دفعة واحدة فقط",
      limitedOffer: "عرض محدود",
      subTagline: "دفعة واحدة • مدى الحياة",
      joinButton: "انضم إلى VIP الآن"
    },
    paymentModal: {
      title: "انضم إلى PLEASURE HEAVEN",
      subtitle: "احصل على وصول الـ VIP الخاص بك اليوم.",
      membershipTitle: "عضوية VIP مدى الحياة",
      specialOffer: "عرض خاص بخصم 50%",
      lifetimeNotice: "* وصول مدى الحياة: تمتع بعضوية VIP دائمة بهذه الدفعة الواحدة لمرة واحدة. بدون أي اشتراكات دورية.",
      discreetBillingTitle: "🔒 فواتير سرية 100% (حماية الخصوصية)",
      discreetBillingDesc: "في كشف الحساب البنكي أو PayPal، ستظهر هذه المعاملة باسم FLOW1 LTD فقط بدون أي إشارة لمحتوى للبالغين.",
      processing: "جاري معالجة الدفع...",
      successTitle: "تم الدفع بنجاح!",
      successDesc: "أهلاً بك في Pleasure Heaven VIP.",
      redirecting: "جاري التوجيه إلى قناة تيليجرام...",
      securePayment: "دفع آمن ومشفر 256-bit"
    }
  },

  de: {
    promo: {
      discountBadge: "50% RABATT",
      expiresIn: "SONDERANGEBOT ENDET IN:",
      joinNow: "JETZT BEITRETEN",
    },
    hero: {
      discountBadge: "50% RABATT",
      joinOur: "TRITT UNSERER ",
      vipGroup: "VIP-GRUPPE BEI",
      bullets: [
        {
          prefix: "Spezialisiert auf",
          bold: "hochwertige JOI-Videos",
          suffix: "+ tausende exklusive OnlyFans-Inhalte"
        },
        {
          prefix: "Sofortiger Zugriff auf Premium-Videos im Wert von über",
          bold: "3.000 $/Monat",
          suffix: ""
        },
        {
          prefix: "Über",
          bold: "8.000+ Videos in voller Länge",
          suffix: "von Top-Creators ansehen"
        },
        {
          prefix: "",
          bold: "Jedes Model anfragen",
          suffix: "— wir laden es innerhalb von 48 Stunden hoch"
        },
        {
          prefix: "",
          bold: "Einmalige Zahlung",
          suffix: "für lebenslangen Zugang. Keine wiederkehrenden Abogebühren."
        }
      ],
      ctaLifetime: "LEBENSLANGEN ZUGRIFF SICHERN",
      ctaPreview: "VIP-VORSCHAU ANSEHEN",
      billingTitle: "🔒 100% Diskrete Abrechnung:",
      billingDesc: "Erscheint neutral als FLOW1 LTD auf Ihrem Konto- & PayPal-Auszug.",
      offerExpiresIn: "ANGEBOT ENDET IN:",
      messageTelegram: "Schreibe uns auf Telegram",
      vipMembers: "3.000+ VIP-MITGLIEDER",
      positiveReviews: "99% POSITIVE BEWERTUNGEN",
    },
    socialProof: {
      title: "VON TAUSENDEN ",
      titleHighlight: "GESCHÄTZT",
    },
    faq: {
      title: "HÄUFIG GESTELLTE ",
      titleHighlight: "FRAGEN",
      items: [
        {
          question: "Sehen Sie meine Kreditkartennummer beim Bezahlen?",
          answer: "Nein. Wir sehen oder speichern Ihre Kreditkarteninformationen niemals. Alle Transaktionen werden sicher über PayPal abgewickelt – 100% Datenschutz und Sicherheit."
        },
        {
          question: "Ist das eine einmalige Zahlung?",
          answer: "Ja! Dies ist eine einmalige Zahlung für dauerhaften, lebenslangen Zugriff. Sie erhalten unbegrenzten Zugriff auf alle aktuellen und zukünftigen Inhalte, ohne weitere Gebühren oder versteckte Abos."
        },
        {
          question: "Wo kann ich die Videos ansehen?",
          answer: "Alle Inhalte werden direkt auf Telegram in privaten Kanälen gehostet. Ein kostenloses Telegram-Konto ist in weniger als 2 Minuten erstellt.\n\nIhre Privatsphäre ist absolut geschützt – niemand sieht, welchen Kanälen Sie beitreten. Mit der integrierten Suche finden Sie sofort Ihre Lieblingsmodels.\n\nDirekt nach der Zahlung erhalten Sie Ihren sofortigen Einladungslink."
        },
        {
          question: "Sind die Videos in voller Länge?",
          answer: "Ja! Über 80% unserer Videos sind vollständige Langfassungen in bester Qualität. Wir konzentrieren uns ausschließlich auf vollwertige Videos statt kurzer Teaser.\n\nHinweis: Wir laden reine Videomedien hoch – keine einzelnen Fotos oder GIFs."
        },
        {
          question: "Was, wenn mein gewünschtes Model nicht dabei ist?",
          answer: "Wir archivieren regelmäßig die besten Creator. Falls ein bestimmtes Model noch fehlt, schreiben Sie uns einfach auf Telegram – unser Team lädt die komplette Kollektion in wenigen Tagen hoch."
        }
      ]
    },
    whoWeAre: {
      title: "WER WIR ",
      titleHighlight: "SIND",
      p1: "Seit 2023 archiviert Pleasure Heaven die exklusivsten digitalen Premium-Inhalte. Unser Team kuratiert hochauflösende Medien von hunderten Creatorn in einer übersichtlichen, täglich wachsenden Bibliothek.",
      p2: "Unsere Mission: Höchste Diskretion, intuitive Navigation und vollständige Creator-Archive zu einem unschlagbaren Vorteilspreis.",
      p3: "Bereits über 3.000 aktive VIP-Mitglieder genießen tägliche exklusive Uploads in unseren privaten Kanälen."
    },
    choice: {
      title: "WÄHLE DEINE ",
      titleHighlight: "SEITE",
      ofTitle: "ONLYFANS",
      ofItems: [
        "Unvorhersehbare Pay-per-View (PPV) Extrakosten",
        "Unübersichtliche & langsame Oberfläche",
        "Keine direkten Video-Downloads möglich",
        "Über 400 $/Monat für vollen Zugriff"
      ],
      vipBadge: "VIP-WAHL",
      phTitle: "PLEASURE HEAVEN",
      phItems: [
        "Keine versteckten Gebühren oder PPVs",
        "Direkter Video-Download mit einem Klick",
        "Exklusive Inhalte, die nirgendwo sonst zu finden sind",
        "Vollzugriff auf 80+ Top-Creator-Archive",
        "Wunsch-Models innerhalb von 48 Stunden verfügbar"
      ],
      enterButton: "Pleasure Heaven betreten"
    },
    contact: {
      title: "KONTAKTIEREN SIE UNS",
      ukPhone: "Für UK: +44 20 4628 1675",
      emailLabel: "E-Mail:",
      copied: "Kopiert!",
      copyTitle: "Klicken, um E-Mail-Adresse zu kopieren",
      messageTelegram: "Schreibe uns auf Telegram"
    },
    footer: {
      rightsReserved: "PLEASURE HEAVEN. ALLE RECHTE VORBEHALTEN.",
      terms: "Nutzungsbedingungen",
      privacy: "Datenschutzerklärung",
      support: "Support"
    },
    stickyCta: {
      brandTitle: "PLEASURE HEAVEN VIP",
      lifetimeAccess: "LEBENSLANGER ZUGANG",
      discountBadge: "50% RABATT",
      tagline: "8.000+ Videos • Tägliche Updates • Einmalige Zahlung",
      limitedOffer: "LIMITIERTES ANGEBOT",
      subTagline: "Einmalig • Lebenslanger Zugang",
      joinButton: "JETZT VIP BEITRETEN"
    },
    paymentModal: {
      title: "PLEASURE HEAVEN BEITRETEN",
      subtitle: "Sichern Sie sich heute Ihren VIP-Zugang.",
      membershipTitle: "Lebenslange VIP-Mitgliedschaft",
      specialOffer: "50% SONDERRABATT",
      lifetimeNotice: "* Lebenslanger Zugriff: Dauerhafte Mitgliedschaft durch einmalige Zahlung. Keine Abos.",
      discreetBillingTitle: "🔒 100% Diskrete Abrechnung (Datenschutz)",
      discreetBillingDesc: "Auf Ihrem Bank- oder PayPal-Auszug erscheint diese Zahlung neutral als FLOW1 LTD – ohne Hinweis auf VIP oder Adult-Inhalte.",
      processing: "Zahlung wird verarbeitet...",
      successTitle: "Zahlung erfolgreich!",
      successDesc: "Willkommen bei Pleasure Heaven VIP.",
      redirecting: "Weiterleitung zum Telegram-Kanal...",
      securePayment: "Sichere 256-Bit-Verschlüsselung"
    }
  },

  es: {
    promo: {
      discountBadge: "50% DE DESCUENTO",
      expiresIn: "LA OFERTA ESPECIAL TERMINA EN:",
      joinNow: "UNIRSE AHORA",
    },
    hero: {
      discountBadge: "50% DE DESCUENTO",
      joinOur: "ÚNETE A NUESTRO ",
      vipGroup: "GRUPO VIP",
      bullets: [
        {
          prefix: "Especializados en",
          bold: "videos JOI en alta calidad",
          suffix: "+ miles de contenidos exclusivos de OnlyFans"
        },
        {
          prefix: "Acceso instantáneo a más de",
          bold: "$3,000/mes",
          suffix: "en videos premium exclusivos"
        },
        {
          prefix: "Mira más de",
          bold: "8,000+ videos completos",
          suffix: "de las mejores creadoras del momento"
        },
        {
          prefix: "",
          bold: "Pide cualquier modelo",
          suffix: "— la subimos en menos de 48 horas"
        },
        {
          prefix: "",
          bold: "Pago único",
          suffix: "para Acceso de por Vida. Sin cuotas recurrentes."
        }
      ],
      ctaLifetime: "OBTENER ACCESO DE POR VIDA",
      ctaPreview: "VER ADELANTO VIP",
      billingTitle: "🔒 Facturación 100% Discreta:",
      billingDesc: "Aparece neutralmente como FLOW1 LTD en extractos bancarios y de PayPal.",
      offerExpiresIn: "LA OFERTA TERMINA EN:",
      messageTelegram: "Escríbenos por Telegram",
      vipMembers: "+3,000 MIEMBROS VIP",
      positiveReviews: "99% OPINIONES POSITIVAS",
    },
    socialProof: {
      title: "AVALADO POR ",
      titleHighlight: "MILES DE USUARIOS",
    },
    faq: {
      title: "PREGUNTAS ",
      titleHighlight: "FRECUENTES",
      items: [
        {
          question: "¿Pueden ver el número de mi tarjeta al pagar?",
          answer: "No. Jamás vemos ni almacenamos los datos de tu tarjeta. Todo el procesamiento se realiza de forma 100% segura y privada mediante PayPal."
        },
        {
          question: "¿Es un pago único?",
          answer: "¡Sí! Es un único pago para obtener Acceso de por Vida permanente. Tendrás acceso ilimitado para ver y descargar todo el contenido presente y futuro sin pagos adicionales ni suscripciones ocultas."
        },
        {
          question: "¿Dónde veré los videos?",
          answer: "Todo el contenido está alojado en canales privados de Telegram. Si aún no tienes Telegram, crearte una cuenta gratuita toma menos de 2 minutos.\n\nTu privacidad está totalmente garantizada: nadie puede ver a qué canales perteneces. Además, Telegram cuenta con un potente buscador integrado para localizar a tus creadoras favoritas de inmediato.\n\nRecibirás el enlace de invitación al instante tras completar el pago."
        },
        {
          question: "¿Los videos son de larga duración?",
          answer: "¡Por supuesto! Más del 80% de nuestra biblioteca son videos completos de larga duración. Nos enfocamos exclusivamente en contenido extenso y completo.\n\nNota: Solo subimos archivos de video de máxima calidad, sin fotos sueltas ni GIFs."
        },
        {
          question: "¿Qué pasa si no encuentro a la modelo que busco?",
          answer: "Actualizamos el catálogo diariamente. Si deseas una creadora que aún no figure en el canal, envíanos un mensaje por Telegram y nuestro equipo subirá su colección completa en pocos días."
        }
      ]
    },
    whoWeAre: {
      title: "QUIÉNES ",
      titleHighlight: "SOMOS",
      p1: "En Pleasure Heaven archivamos el mejor contenido digital premium desde 2023. Nuestro equipo recopila medios exclusivos en alta definición de cientos de creadoras, manteniendo una biblioteca organizada y actualizada a diario.",
      p2: "Nuestra misión es ofrecerte un espacio seguro, completamente privado y fácil de explorar con colecciones completas a un precio inigualable.",
      p3: "Hoy, miles de miembros VIP activos disfrutan de estrenos diarios exclusivos en nuestros canales privados."
    },
    choice: {
      title: "ELIGE TU ",
      titleHighlight: "LADO",
      ofTitle: "ONLYFANS",
      ofItems: [
        "Cargos extra e impredecibles por cada video (PPV)",
        "Plataforma lenta y poco organizada",
        "Sin posibilidad de descarga directa a tu dispositivo",
        "Más de $400 al mes para acceder a todo el contenido"
      ],
      vipBadge: "ELECCIÓN VIP",
      phTitle: "PLEASURE HEAVEN",
      phItems: [
        "Cero cargos ocultos ni pagos adicionales (Sin PPVs)",
        "Descargas directas y reproducción fluida",
        "Videos exclusivos que no encontrarás en ningún otro sitio",
        "Acceso total a las bibliotecas de más de 80 creadoras top",
        "Peticiones de modelos cumplidas en 48 horas"
      ],
      enterButton: "Entrar a Pleasure Heaven"
    },
    contact: {
      title: "CONTÁCTANOS",
      ukPhone: "Para Reino Unido: +44 20 4628 1675",
      emailLabel: "Email:",
      copied: "¡Copiado!",
      copyTitle: "Haz clic para copiar el email",
      messageTelegram: "Escríbenos por Telegram"
    },
    footer: {
      rightsReserved: "PLEASURE HEAVEN. TODOS LOS DERECHOS RESERVADOS.",
      terms: "Términos del Servicio",
      privacy: "Política de Privacidad",
      support: "Soporte"
    },
    stickyCta: {
      brandTitle: "PLEASURE HEAVEN VIP",
      lifetimeAccess: "ACCESO DE POR VIDA",
      discountBadge: "50% DTO",
      tagline: "+8,000 Videos • Actualizaciones Diarias • Pago Único",
      limitedOffer: "OFERTA LIMITADA",
      subTagline: "Pago Único • De por Vida",
      joinButton: "UNIRSE AL VIP AHORA"
    },
    paymentModal: {
      title: "ÚNETE A PLEASURE HEAVEN",
      subtitle: "Asegura tu acceso VIP exclusivo hoy.",
      membershipTitle: "Membresía VIP de por Vida",
      specialOffer: "OFERTA ESPECIAL 50% DTO",
      lifetimeNotice: "* Acceso de por Vida: Disfruta de membresía permanente con este único pago. Sin mensualidades.",
      discreetBillingTitle: "🔒 Facturación 100% Discreta (Protección de Privacidad)",
      discreetBillingDesc: "En tu extracto bancario o de PayPal, esta operación figurará neutralmente como FLOW1 LTD sin mención a contenidos para adultos.",
      processing: "Procesando el pago...",
      successTitle: "¡Pago completado con éxito!",
      successDesc: "Bienvenido a Pleasure Heaven VIP.",
      redirecting: "Redirigiendo al canal de Telegram...",
      securePayment: "Pago seguro y cifrado de 256 bits"
    }
  },

  fr: {
    promo: {
      discountBadge: "-50% DE RÉDUCTION",
      expiresIn: "L'OFFRE SPÉCIALE EXPIRE DANS :",
      joinNow: "REJOINDRE",
    },
    hero: {
      discountBadge: "-50% DE RÉDUCTION",
      joinOur: "REJOIGNEZ NOTRE ",
      vipGroup: "GROUPE VIP",
      bullets: [
        {
          prefix: "Spécialisé dans les",
          bold: "vidéos JOI en haute définition",
          suffix: "+ des milliers de contenus OnlyFans exclusifs"
        },
        {
          prefix: "Accès instantané à plus de",
          bold: "3 000 $/mois",
          suffix: "de vidéos premium inédites"
        },
        {
          prefix: "Visionnez plus de",
          bold: "8 000+ vidéos complètes",
          suffix: "des créatrices les plus demandées"
        },
        {
          prefix: "",
          bold: "Demandez n'importe quel modèle",
          suffix: "— nous l'ajoutons sous 48 heures"
        },
        {
          prefix: "",
          bold: "Paiement unique",
          suffix: "pour un Accès à Vie. Aucun frais récurrent."
        }
      ],
      ctaLifetime: "OBTENIR L'ACCÈS À VIE MAINTENANT",
      ctaPreview: "VOIR L'APERÇU VIP",
      billingTitle: "🔒 Facturation 100% Discrète :",
      billingDesc: "Apparaît sous le libellé neutre FLOW1 LTD sur vos relevés bancaires & PayPal.",
      offerExpiresIn: "L'OFFRE EXPIRE DANS :",
      messageTelegram: "Écrivez-nous sur Telegram",
      vipMembers: "+3 000 MEMBRES VIP",
      positiveReviews: "99% D'AVIS POSITIFS",
    },
    socialProof: {
      title: "RECOMMANDÉ PAR ",
      titleHighlight: "DES MILLIERS DE MEMBRES",
    },
    faq: {
      title: "FOIRE AUX ",
      titleHighlight: "QUESTIONS",
      items: [
        {
          question: "Avez-vous accès à mes coordonnées bancaires lors du paiement ?",
          answer: "Non, absolument jamais. Nous ne voyons et ne stockons aucune coordonnée bancaire. Toutes les transactions sont sécurisées et chiffrées de bout en bout via PayPal."
        },
        {
          question: "S'agit-il d'un paiement unique ?",
          answer: "Oui ! C'est un paiement unique qui vous garantit un Accès à Vie permanent. Une fois membre, vous profitez en illimité de tous les contenus actuels et futurs, sans aucun abonnement ni frais cachés."
        },
        {
          question: "Où et comment regarder les vidéos ?",
          answer: "L'ensemble de notre vidéothèque est hébergé sur des canaux privés Telegram. Si vous n'avez pas encore Telegram, créer un compte gratuit prend moins de 2 minutes.\n\nVotre vie privée est strictement protégée : personne ne peut voir à quels canaux vous appartenez. Le moteur de recherche intégré vous permet de trouver instantanément vos créatrices préférées.\n\nLe lien d'invitation vous est envoyé immédiatement après confirmation du paiement."
        },
        {
          question: "Les vidéos sont-elles complètes ?",
          answer: "Oui ! Plus de 80% de notre collection se compose de vidéos intégrales en version longue. Nous privilégions les vidéos complètes plutôt que de simples extraits.\n\nRemarque : nous publions uniquement des vidéos de haute qualité, sans photos isolées ni GIFs."
        },
        {
          question: "Que faire si je ne trouve pas mon modèle préféré ?",
          answer: "Nous mettons à jour les bibliothèques quotidiennement. Si une créatrice n'est pas encore disponible, écrivez-nous simplement sur Telegram : notre équipe mettra en ligne sa collection complète sous quelques jours."
        }
      ]
    },
    whoWeAre: {
      title: "QUI ",
      titleHighlight: "SOMMES-NOUS",
      p1: "Depuis 2023, Pleasure Heaven archive les contenus numériques les plus exclusifs du web. Notre équipe spécialisée rassemble les vidéos haute qualité de centaines de créateurs pour vous offrir une bibliothèque fluide et actualisée chaque jour.",
      p2: "Notre mission : une confidentialité absolue, une navigation intuitive et l'accès à des collections complètes à un tarif imbattable.",
      p3: "Aujourd'hui, des milliers de membres VIP profitent chaque jour de nos nouveautés exclusives sur nos canaux privés."
    },
    choice: {
      title: "FAITES LE ",
      titleHighlight: "BON CHOIX",
      ofTitle: "ONLYFANS",
      ofItems: [
        "Frais imprévisibles pour chaque vidéo (PPV)",
        "Interface lente et confuse",
        "Aucun téléchargement direct des fichiers vidéo",
        "Plus de 400 $/mois pour accéder à l'ensemble du contenu"
      ],
      vipBadge: "CHOIX VIP",
      phTitle: "PLEASURE HEAVEN",
      phItems: [
        "Zéro frais caché ni supplément (Pas de PPV)",
        "Téléchargement direct en haute définition",
        "Vidéos exclusives introuvables ailleurs sur le web",
        "Accès illimité aux bibliothèques de 80+ créatrices majeures",
        "Ajout des modèles demandés sous 48 heures"
      ],
      enterButton: "Entrer dans Pleasure Heaven"
    },
    contact: {
      title: "CONTACTEZ-NOUS",
      ukPhone: "Pour le Royaume-Uni : +44 20 4628 1675",
      emailLabel: "E-mail :",
      copied: "Copié !",
      copyTitle: "Cliquer pour copier l'e-mail",
      messageTelegram: "Écrivez-nous sur Telegram"
    },
    footer: {
      rightsReserved: "PLEASURE HEAVEN. TOUS DROITS RÉSERVÉS.",
      terms: "Conditions Générales",
      privacy: "Politique de Confidentialité",
      support: "Support"
    },
    stickyCta: {
      brandTitle: "PLEASURE HEAVEN VIP",
      lifetimeAccess: "ACCÈS À VIE",
      discountBadge: "-50%",
      tagline: "8 000+ Vidéos • Mises à jour quotidiennes • Paiement Unique",
      limitedOffer: "OFFRE LIMITÉE",
      subTagline: "Paiement Unique • À Vie",
      joinButton: "REJOINDRE LE VIP"
    },
    paymentModal: {
      title: "REJOINDRE PLEASURE HEAVEN",
      subtitle: "Obtenez votre accès VIP immédiat dès aujourd'hui.",
      membershipTitle: "Adhésion VIP à Vie",
      specialOffer: "OFFRE SPÉCIALE -50%",
      lifetimeNotice: "* Accès à Vie : Profitez d'un accès VIP permanent avec ce paiement unique. Aucun abonnement.",
      discreetBillingTitle: "🔒 Facturation 100% Discrète (Protection de la vie privée)",
      discreetBillingDesc: "Sur votre relevé bancaire ou PayPal, cette transaction apparaîtra sous le nom FLOW1 LTD sans aucune mention de contenu pour adultes.",
      processing: "Traitement du paiement en cours...",
      successTitle: "Paiement réussi !",
      successDesc: "Bienvenue dans le cercle Pleasure Heaven VIP.",
      redirecting: "Redirection vers le canal Telegram...",
      securePayment: "Paiement sécurisé et chiffré 256 bits"
    }
  },

  it: {
    promo: {
      discountBadge: "50% DI SCONTO",
      expiresIn: "L'OFFERTA SPECIALE SCADE TRA:",
      joinNow: "UNISCITI ORA",
    },
    hero: {
      discountBadge: "50% DI SCONTO",
      joinOur: "UNISCITI AL NOSTRO ",
      vipGroup: "GRUPPO VIP",
      bullets: [
        {
          prefix: "Specializzati in",
          bold: "video JOI in alta qualità",
          suffix: "+ migliaia di contenuti esclusivi OnlyFans"
        },
        {
          prefix: "Accesso immediato a oltre",
          bold: "3.000 $/mese",
          suffix: "di video premium inediti"
        },
        {
          prefix: "Guarda più di",
          bold: "8.000+ video integrali",
          suffix: "dei creator più popolari"
        },
        {
          prefix: "",
          bold: "Richiedi qualsiasi modella",
          suffix: "— la carichiamo entro 48 ore"
        },
        {
          prefix: "",
          bold: "Pagamento unico",
          suffix: "per Accesso a Vita. Nessun canone ricorrente."
        }
      ],
      ctaLifetime: "OTTIENI L'ACCESSO A VITA ORA",
      ctaPreview: "GUARDA L'ANTEPRIMA VIP",
      billingTitle: "🔒 Fatturazione 100% Discreta:",
      billingDesc: "Appare in modo del tutto neutro come FLOW1 LTD sui tuoi estratti conto bancari e PayPal.",
      offerExpiresIn: "L'OFFERTA SCADE TRA:",
      messageTelegram: "Scrivici su Telegram",
      vipMembers: "3.000+ MEMBRI VIP",
      positiveReviews: "99% RECENSIONI POSITIVE",
    },
    socialProof: {
      title: "SCELTO DA ",
      titleHighlight: "MIGLIAIA DI UTENTI",
    },
    faq: {
      title: "DOMANDE ",
      titleHighlight: "FREQUENTI",
      items: [
        {
          question: "Potete vedere il numero della mia carta durante il pagamento?",
          answer: "No, assolutamente. Non visualizziamo né memorizziamo mai i dettagli della tua carta. Tutti i pagamenti vengono gestiti con crittografia totale tramite PayPal, assicurando privacy e sicurezza al 100%."
        },
        {
          question: "Si tratta di un pagamento una tantum?",
          answer: "Sì! È un pagamento singolo per l'Accesso a Vita permanente. Avrai accesso illimitato per guardare e scaricare tutti i contenuti attuali e futuri, senza mai ricevere ulteriori addebiti o costi di rinnovo."
        },
        {
          question: "Dove e come posso guardare i video?",
          answer: "Tutto l'archivio è ospitato su canali privati Telegram. Se non hai ancora Telegram, creare un account gratuito richiede meno di 2 minuti.\n\nLa tua privacy è al 100% protetta: nessuno può vedere i canali a cui sei iscritto. Inoltre, Telegram include una comoda ricerca integrata per trovare subito le tue modelle preferite.\n\nRiceverai il link d'invito immediato subito dopo la conferma del pagamento."
        },
        {
          question: "I video sono completi?",
          answer: "Sì! Oltre l'80% del nostro archivio è composto da video a figura intera e lunga durata. Ci concentriamo esclusivamente su contenuti completi, evitando brevi clip promozionali.\n\nNota: carichiamo solo file video in alta risoluzione; nessuna foto o GIF isolata."
        },
        {
          question: "Cosa faccio se non trovo la modella che cerco?",
          answer: "Aggiorniamo i contenuti costantemente. Se una modella non è ancora presente, scrivici su Telegram e il nostro team caricherà l'intera collezione entro pochi giorni."
        }
      ]
    },
    whoWeAre: {
      title: "CHI ",
      titleHighlight: "SIAMO",
      p1: "Dal 2023 Pleasure Heaven archivia i contenuti digitali più esclusivi del panorama internazionale. Il nostro team seleziona video in alta definizione da centinaia di creatori, aggiornando ogni giorno un catalogo impeccabile.",
      p2: "Il nostro obiettivo è offrirti una piattaforma sicura, completamente anonima e comoda da consultare, con collezioni complete a un prezzo imbattibile.",
      p3: "Oggi oltre 3.000 membri VIP attivi accedono quotidianamente agli aggiornamenti esclusivi nei nostri canali privati."
    },
    choice: {
      title: "SCEGLI DA CHE PARTE ",
      titleHighlight: "STARE",
      ofTitle: "ONLYFANS",
      ofItems: [
        "Costi extra imprevisti per ogni video (PPV)",
        "Interfaccia lenta e disordinata",
        "Nessuna possibilità di download diretto",
        "Oltre 400 $/mese per accedere a tutto"
      ],
      vipBadge: "SCELTA VIP",
      phTitle: "PLEASURE HEAVEN",
      phItems: [
        "Zero costi nascosti o PPV",
        "Download diretto dei video con un clic",
        "Video esclusivi introvabili altrove online",
        "Accesso completo agli archivi di 80+ top creator",
        "Modelle su richiesta caricate entro 48 ore"
      ],
      enterButton: "Entra in Pleasure Heaven"
    },
    contact: {
      title: "CONTATTACI",
      ukPhone: "Per il Regno Unito: +44 20 4628 1675",
      emailLabel: "Email:",
      copied: "Copiato!",
      copyTitle: "Clicca per copiare l'email",
      messageTelegram: "Scrivici su Telegram"
    },
    footer: {
      rightsReserved: "PLEASURE HEAVEN. TUTTI I DIRITTI RISERVATI.",
      terms: "Termini di Servizio",
      privacy: "Informativa sulla Privacy",
      support: "Supporto"
    },
    stickyCta: {
      brandTitle: "PLEASURE HEAVEN VIP",
      lifetimeAccess: "ACCESSO A VITA",
      discountBadge: "50% SCONTO",
      tagline: "8.000+ Video • Aggiornamenti Giornalieri • Pagamento Unico",
      limitedOffer: "OFFERTA A TEMPO",
      subTagline: "Una Tantum • A Vita",
      joinButton: "ENTRA NEL VIP ORA"
    },
    paymentModal: {
      title: "UNISCITI A PLEASURE HEAVEN",
      subtitle: "Assicurati oggi il tuo accesso VIP.",
      membershipTitle: "Abbonamento VIP a Vita",
      specialOffer: "SPECIALE 50% DI SCONTO",
      lifetimeNotice: "* Accesso a Vita: Approfitta dell'adesione VIP permanente con questo pagamento unico. Nessun rinnovo.",
      discreetBillingTitle: "🔒 Fatturazione 100% Discreta (Protezione Privacy)",
      discreetBillingDesc: "Sul tuo estratto conto bancario o PayPal la transazione risulterà unicamente con dicitura FLOW1 LTD, senza alcun riferimento al contenuto.",
      processing: "Elaborazione del pagamento...",
      successTitle: "Pagamento completato!",
      successDesc: "Benvenuto nel club Pleasure Heaven VIP.",
      redirecting: "Reindirizzamento al canale Telegram...",
      securePayment: "Pagamento protetto e crittografato a 256 bit"
    }
  },

  ru: {
    promo: {
      discountBadge: "СКИДКА 50%",
      expiresIn: "СПЕЦИАЛЬНОЕ ПРЕДЛОЖЕНИЕ ИСТЕКАЕТ ЧЕРЕЗ:",
      joinNow: "ПРИСОЕДИНИТЬСЯ",
    },
    hero: {
      discountBadge: "СКИДКА 50%",
      joinOur: "ВСТУПАЙТЕ В НАШУ ",
      vipGroup: "VIP-ГРУППУ",
      bullets: [
        {
          prefix: "Специализация на",
          bold: "высококачественных JOI видео",
          suffix: "+ тысячи эксклюзивных OnlyFans материалов"
        },
        {
          prefix: "Мгновенный доступ к видео стоимостью более",
          bold: "$3,000 в месяц",
          suffix: "напрямую без доплат"
        },
        {
          prefix: "Смотрите более",
          bold: "8,000+ полных видео",
          suffix: "от самых популярных создателей"
        },
        {
          prefix: "",
          bold: "Заказывайте любую модель",
          suffix: "— загружаем в течение 48 часов"
        },
        {
          prefix: "",
          bold: "Единоразовый платеж",
          suffix: "за Пожизненный доступ. Никаких подписок и скрытых списаний."
        }
      ],
      ctaLifetime: "ПОЛУЧИТЬ ПОЖИЗНЕННЫЙ ДОСТУП",
      ctaPreview: "СМОТРЕТЬ VIP-ПРЕВЬЮ",
      billingTitle: "🔒 100% Анонимная оплата:",
      billingDesc: "В банковских выписках и PayPal отображается нейтрально как FLOW1 LTD без упоминания взрослого контента.",
      offerExpiresIn: "ПРЕДЛОЖЕНИЕ ДЕЙСТВУЕТ ЕЩЕ:",
      messageTelegram: "Написать нам в Telegram",
      vipMembers: "3,000+ VIP-УЧАСТНИКОВ",
      positiveReviews: "99% ПОЛОЖИТЕЛЬНЫХ ОТЗЫВОВ",
    },
    socialProof: {
      title: "НАМ ДОВЕРЯЮТ ",
      titleHighlight: "ТЫСЯЧИ ПОЛЬЗОВАТЕЛЕЙ",
    },
    faq: {
      title: "ЧАСТО ЗАДАВАЕМЫЕ ",
      titleHighlight: "ВОПРОСЫ",
      items: [
        {
          question: "Видите ли вы данные моей банковской карты при оплате?",
          answer: "Нет. Мы никогда не видим и не сохраняем данные вашей карты. Все платежи обрабатываются через защищенные шлюзы PayPal с гарантией 100% конфиденциальности."
        },
        {
          question: "Это единоразовый платеж?",
          answer: "Да! Это единый разовый платеж за постоянный бессрочный доступ. Вы получаете неограниченный доступ ко всем текущим и будущим материалам без повторных списаний и скрытых платежей."
        },
        {
          question: "Где и как я буду смотреть видео?",
          answer: "Все материалы размещаются в закрытых приватных Telegram-каналах. Если у вас еще нет Telegram, регистрация займет не более 2 минут.\n\nВаша анонимность полностью защищена: никто не видит, в каких каналах вы состоите. Встроенный поиск позволяет мгновенно находить любимых моделей.\n\nСразу после оплаты вы автоматически получаете персональную ссылку-приглашение."
        },
        {
          question: "Видео полные или короткие нарезки?",
          answer: "Да, более 80% коллекции — это полные видеозаписи в высоком разрешении. Мы ориентируемся исключительно на полнометражные видео.\n\nПримечание: мы публикуем только видеофайлы высшего качества, без лишних фото или GIF."
        },
        {
          question: "Что делать, если нужной модели нет в канале?",
          answer: "Мы ежедневно обновляем архив. Если нужной вам модели пока нет, напишите нам в Telegram — наша команда загрузит ее полную коллекцию в течение пары дней."
        }
      ]
    },
    whoWeAre: {
      title: "КТО ",
      titleHighlight: "МЫ",
      p1: "С 2023 года Pleasure Heaven собирает и систематизирует самые эксклюзивные цифровые материалы. Наша команда ежедневно обновляет структурированную базу данных высококачественного контента от сотен создателей.",
      p2: "Наша цель — предоставить безопасную, приватную и удобную платформу с полными архивами по лучшей цене.",
      p3: "Сегодня более 3,000 активных VIP-участников ежедневно получают эксклюзивные обновления в наших закрытых каналах."
    },
    choice: {
      title: "СДЕЛАЙТЕ СВОЙ ",
      titleHighlight: "ВЫБОР",
      ofTitle: "ONLYFANS",
      ofItems: [
        "Непредсказуемые платные доплаты за каждое видео (PPV)",
        "Медленный и перегруженный интерфейс",
        "Невозможность прямого скачивания видеофайлов",
        "Более $400 в месяц за полный доступ"
      ],
      vipBadge: "ВЫБОР VIP",
      phTitle: "PLEASURE HEAVEN",
      phItems: [
        "Никаких скрытых платежей и доплат (без PPV)",
        "Прямое скачивание видео в один клик",
        "Эксклюзивы, которых нет больше нигде в интернете",
        "Полный доступ к архивам 80+ топовых создателей",
        "Загрузка моделей по вашему запросу за 48 часов"
      ],
      enterButton: "Войти в Pleasure Heaven"
    },
    contact: {
      title: "СВЯЗАТЬСЯ С НАМИ",
      ukPhone: "Для Великобритании: +44 20 4628 1675",
      emailLabel: "Email:",
      copied: "Скопировано!",
      copyTitle: "Нажмите, чтобы скопировать email",
      messageTelegram: "Написать нам в Telegram"
    },
    footer: {
      rightsReserved: "PLEASURE HEAVEN. ВСЕ ПРАВА ЗАЩИЩЕНЫ.",
      terms: "Условия использования",
      privacy: "Политика конфиденциальности",
      support: "Поддержка"
    },
    stickyCta: {
      brandTitle: "PLEASURE HEAVEN VIP",
      lifetimeAccess: "ПОЖИЗНЕННЫЙ ДОСТУП",
      discountBadge: "СКИДКА 50%",
      tagline: "8,000+ видео • Ежедневные обновления • Разовый платеж",
      limitedOffer: "ОГРАНИЧЕННОЕ ПРЕДЛОЖЕНИЕ",
      subTagline: "Разово • Навсегда",
      joinButton: "ВСТУПИТЬ В VIP СЕЙЧАС"
    },
    paymentModal: {
      title: "ВСТУПИТЬ В PLEASURE HEAVEN",
      subtitle: "Получите бессрочный VIP-доступ уже сегодня.",
      membershipTitle: "Пожизненное VIP-членство",
      specialOffer: "СПЕЦПРЕДЛОЖЕНИЕ СО СКИДКОЙ 50%",
      lifetimeNotice: "* Пожизненный доступ: Постоянный VIP-статус за один разовый платеж. Без скрытых подписок.",
      discreetBillingTitle: "🔒 100% Анонимная выписка (Защита приватности)",
      discreetBillingDesc: "В выписке по карте или PayPal платеж будет указан нейтрально как FLOW1 LTD без малейшего намека на взрослый контент.",
      processing: "Обработка платежа...",
      successTitle: "Оплата прошла успешно!",
      successDesc: "Добро пожаловать в закрытый клуб Pleasure Heaven VIP.",
      redirecting: "Перенаправление в Telegram-канал...",
      securePayment: "Безопасное 256-битное шифрование"
    }
  },

  pt: {
    promo: {
      discountBadge: "50% DE DESCONTO",
      expiresIn: "A OFERTA ESPECIAL TERMINA EM:",
      joinNow: "ENTRAR AGORA",
    },
    hero: {
      discountBadge: "50% DE DESCONTO",
      joinOur: "ENTRE NO NOSSO ",
      vipGroup: "GRUPO VIP",
      bullets: [
        {
          prefix: "Especializado em",
          bold: "vídeos JOI em alta definição",
          suffix: "+ milhares de conteúdos exclusivos do OnlyFans"
        },
        {
          prefix: "Acesso instantâneo a mais de",
          bold: "$3.000/mês",
          suffix: "em vídeos premium exclusivos"
        },
        {
          prefix: "Assista a mais de",
          bold: "8.000+ vídeos completos",
          suffix: "das principais criadoras do mundo"
        },
        {
          prefix: "",
          bold: "Peça qualquer modelo",
          suffix: "— fazemos o upload em até 48 horas"
        },
        {
          prefix: "",
          bold: "Pagamento único",
          suffix: "para Acesso Vitalício. Sem mensalidades ou taxas extras."
        }
      ],
      ctaLifetime: "GARANTIR ACESSO VITALÍCIO AGORA",
      ctaPreview: "VER PRÉVIA DO VIP",
      billingTitle: "🔒 Faturamento 100% Discreto:",
      billingDesc: "Aparece de forma neutra como FLOW1 LTD no extrato bancário e do PayPal.",
      offerExpiresIn: "A OFERTA EXPIRA EM:",
      messageTelegram: "Fale Conosco no Telegram",
      vipMembers: "3.000+ MEMBROS VIP",
      positiveReviews: "99% DE AVALIAÇÕES POSITIVAS",
    },
    socialProof: {
      title: "APROVADO POR ",
      titleHighlight: "MILHARES DE PESSOAS",
    },
    faq: {
      title: "PERGUNTAS ",
      titleHighlight: "FREQUENTES",
      items: [
        {
          question: "Vocês conseguem ver os dados do meu cartão no pagamento?",
          answer: "Não. Nunca vemos nem armazenamos as informações do seu cartão. Todo o processamento é feito de forma segura e protegida pelo PayPal com 100% de privacidade."
        },
        {
          question: "É um pagamento único?",
          answer: "Sim! Este é um pagamento único para Acesso Vitalício definitivo. Você terá acesso ilimitado para assistir e baixar todos os conteúdos atuais e futuros sem cobranças extras."
        },
        {
          question: "Onde e como vou assistir aos vídeos?",
          answer: "Todo o acervo está hospedado em canais privados no Telegram. Se você ainda não tem Telegram, criar uma conta gratuita leva menos de 2 minutos.\n\nSua privacidade é total: ninguém sabe a quais canais você pertence. Além disso, a ferramenta de busca do Telegram facilita encontrar suas modelos favoritas num instante.\n\nO link de acesso VIP é gerado imediatamente após o pagamento."
        },
        {
          question: "Os vídeos são de longa duração?",
          answer: "Sim! Mais de 80% do nosso acervo é composto por vídeos longos e completos em alta resolução. Priorizamos gravações completas em vez de prévias curtas.\n\nNota: Publicamos apenas arquivos de vídeo; sem fotos avulsas ou GIFs."
        },
        {
          question: "E se eu não encontrar a modelo que procuro?",
          answer: "Atualizamos o acervo diariamente. Caso queira uma modelo que ainda não esteja no canal, envie sua solicitação no Telegram e nossa equipe fará o upload de toda a coleção em poucos dias."
        }
      ]
    },
    whoWeAre: {
      title: "QUEM ",
      titleHighlight: "SOMOS",
      p1: "Desde 2023, o Pleasure Heaven arquiva o que há de mais exclusivo em conteúdo digital. Nossa equipe reúne mídias em alta qualidade de centenas de criadores em uma biblioteca organizada e atualizada diariamente.",
      p2: "Nossa missão é oferecer privacidade absoluta, navegação simplificada e acesso a coleções completas por um preço justo e acessível.",
      p3: "Hoje, milhares de membros VIP ativos aproveitam lançamentos diários exclusivos em nossos canais privados."
    },
    choice: {
      title: "ESCOLHA SEU ",
      titleHighlight: "LADO",
      ofTitle: "ONLYFANS",
      ofItems: [
        "Taxas extras imprevisíveis por cada vídeo (PPV)",
        "Interface lenta e pouco prática",
        "Sem opção de download direto para o seu dispositivo",
        "Mais de $400 por mês para acesso completo"
      ],
      vipBadge: "ESCOLHA VIP",
      phTitle: "PLEASURE HEAVEN",
      phItems: [
        "Zero taxas ocultas ou cobranças adicionais (sem PPV)",
        "Download direto dos vídeos com um clique",
        "Vídeos exclusivos não encontrados em nenhum outro lugar",
        "Acesso integral aos acervos de mais de 80 top criadoras",
        "Modelos sob demanda adicionadas em 48 horas"
      ],
      enterButton: "Entrar no Pleasure Heaven"
    },
    contact: {
      title: "FALE CONOSCO",
      ukPhone: "Para Reino Unido: +44 20 4628 1675",
      emailLabel: "E-mail:",
      copied: "Copiado!",
      copyTitle: "Clique para copiar o e-mail",
      messageTelegram: "Fale Conosco no Telegram"
    },
    footer: {
      rightsReserved: "PLEASURE HEAVEN. TODOS OS DIREITOS RESERVADOS.",
      terms: "Termos de Serviço",
      privacy: "Política de Privacidade",
      support: "Suporte"
    },
    stickyCta: {
      brandTitle: "PLEASURE HEAVEN VIP",
      lifetimeAccess: "ACESSO VITALÍCIO",
      discountBadge: "50% OFF",
      tagline: "8.000+ Vídeos • Atualizações Diárias • Pagamento Único",
      limitedOffer: "OFERTA LIMITADA",
      subTagline: "Pagamento Único • Vitalício",
      joinButton: "ENTRAR NO VIP AGORA"
    },
    paymentModal: {
      title: "ENTRAR NO PLEASURE HEAVEN",
      subtitle: "Garanta seu acesso VIP exclusivo hoje mesmo.",
      membershipTitle: "Membros VIP Vitalício",
      specialOffer: "OFERTA ESPECIAL 50% OFF",
      lifetimeNotice: "* Acesso Vitalício: Tenha acesso VIP permanente com este pagamento único. Sem mensalidades.",
      discreetBillingTitle: "🔒 Faturamento 100% Discreto (Proteção de Privacidade)",
      discreetBillingDesc: "Na fatura do seu cartão ou PayPal a transação aparecerá estritamente como FLOW1 LTD, sem nenhuma menção a conteúdo adulto.",
      processing: "Processando pagamento...",
      successTitle: "Pagamento Concluído!",
      successDesc: "Bem-vindo ao Pleasure Heaven VIP.",
      redirecting: "Redirecionando para o canal do Telegram...",
      securePayment: "Pagamento seguro e criptografado de 256 bits"
    }
  },

  nl: {
    promo: {
      discountBadge: "50% KORTING",
      expiresIn: "SPECIALE AANBIEDING VERLOOPT OVER:",
      joinNow: "NU LID WORDEN",
    },
    hero: {
      discountBadge: "50% KORTING",
      joinOur: "WORD LID VAN ONZE ",
      vipGroup: "VIP GROEP",
      bullets: [
        {
          prefix: "Gespecialiseerd in",
          bold: "hoogwaardige JOI-video's",
          suffix: "+ duizenden exclusieve OnlyFans-bestanden"
        },
        {
          prefix: "Directe toegang tot meer dan",
          bold: "$3.000/maand",
          suffix: "aan premium video's"
        },
        {
          prefix: "Bekijk meer dan",
          bold: "8.000+ volledige video's",
          suffix: "van top creators"
        },
        {
          prefix: "",
          bold: "Vraag elk model aan",
          suffix: "— wij uploaden binnen 48 uur"
        },
        {
          prefix: "",
          bold: "Eenmalige betaling",
          suffix: "voor Levenslange Toegang. Geen terugkerende kosten."
        }
      ],
      ctaLifetime: "KRIJG NU LEVENSLANGE TOEGANG",
      ctaPreview: "BEKIJK VIP PREVIEW",
      billingTitle: "🔒 100% Discrete Facturering:",
      billingDesc: "Verschijnt neutraal als FLOW1 LTD op uw bank- & PayPal-afschriften.",
      offerExpiresIn: "AANBIEDING VERLOOPT OVER:",
      messageTelegram: "Stuur ons een bericht op Telegram",
      vipMembers: "3.000+ VIP LEDEN",
      positiveReviews: "99% POSITIEVE REVIEWS",
    },
    socialProof: {
      title: "VERTROUWD DOOR ",
      titleHighlight: "DUIZENDEN",
    },
    faq: {
      title: "VEELGESTELDE ",
      titleHighlight: "VRAGEN",
      items: [
        {
          question: "Kunt u mijn creditcardgegevens zien tijdens het betalen?",
          answer: "Nee. Wij slaan nooit creditcardgegevens op. Alle transacties worden 100% veilig en discreet verwerkt via PayPal."
        },
        {
          question: "Is dit een eenmalige betaling?",
          answer: "Ja! Dit is een eenmalige betaling voor permanente levenslange toegang. U heeft onbeperkte toegang tot alle huidige en toekomstige video's zonder ooit extra kosten te betalen."
        },
        {
          question: "Waar kan ik de video's bekijken?",
          answer: "Alle content bevindt zich in besloten VIP-kanalen op Telegram. Het aanmaken van een gratis Telegram-account kost minder dan 2 minuten.\n\nUw privacy is 100% gewaarborgd: niemand kan zien van welke kanalen u lid bent. Met de handige zoekfunctie vindt u direct al uw favoriete modellen.\n\nDirect na uw betaling ontvangt u uw uitnodigingslink."
        },
        {
          question: "Zijn de video's van volledige lengte?",
          answer: "Ja! Meer dan 80% van onze videocollectie bestaat uit complete speelfilms in hoge resolutie. Wij richten ons uitsluitend op complete video's in plaats van korte previews."
        },
        {
          question: "Wat als mijn gewenste model er niet tussen staat?",
          answer: "Wij voegen dagelijks nieuwe bibliotheken toe. Stuur ons eenvoudig een bericht op Telegram met uw verzoek en ons team uploadt de complete collectie binnen enkele dagen."
        }
      ]
    },
    whoWeAre: {
      title: "WIE WIJ ",
      titleHighlight: "ZIJN",
      p1: "Sinds 2023 archiveert Pleasure Heaven de meest exclusieve premium content. Ons team verzamelt hoogwaardige video's van honderden makers in een dagelijks bijgewerkte bibliotheek.",
      p2: "Onze missie: volledige discretie, soepele navigatie en complete archieven tegen een onverslaanbare eenmalige prijs.",
      p3: "Vandaag genieten duizenden actieve VIP-leden van dagelijkse exclusieve updates in onze besloten kanalen."
    },
    choice: {
      title: "KIES UW ",
      titleHighlight: "KANT",
      ofTitle: "ONLYFANS",
      ofItems: [
        "Onvoorspelbare extra kosten per video (PPV)",
        "Trage en onoverzichtelijke interface",
        "Geen directe download van videobestanden",
        "Meer dan $400 per maand voor volledige toegang"
      ],
      vipBadge: "VIP KEUZE",
      phTitle: "PLEASURE HEAVEN",
      phItems: [
        "Geen verborgen kosten of PPV's",
        "Directe videodownloads met één klik",
        "Exclusieve video's die nergens anders online te vinden zijn",
        "Volledige toegang tot 80+ top creator archieven",
        "Modelverzoeken ingewilligd binnen 48 uur"
      ],
      enterButton: "Open Pleasure Heaven"
    },
    contact: {
      title: "CONTACTEER ONS",
      ukPhone: "Voor VK: +44 20 4628 1675",
      emailLabel: "E-mail:",
      copied: "Gekopieerd!",
      copyTitle: "Klik om e-mailadres te kopiëren",
      messageTelegram: "Stuur ons een bericht op Telegram"
    },
    footer: {
      rightsReserved: "PLEASURE HEAVEN. ALLE RECHTEN VOORBEHOUDEN.",
      terms: "Algemene Voorwaarden",
      privacy: "Privacybeleid",
      support: "Ondersteuning"
    },
    stickyCta: {
      brandTitle: "PLEASURE HEAVEN VIP",
      lifetimeAccess: "LEVENSLANGE TOEGANG",
      discountBadge: "50% KORTING",
      tagline: "8.000+ Video's • Dagelijkse Updates • Eenmalige Betaling",
      limitedOffer: "TIJDELIJK AANBOD",
      subTagline: "Eenmalig • Levenslang",
      joinButton: "WORD NU VIP LID"
    },
    paymentModal: {
      title: "LID WORDEN VAN PLEASURE HEAVEN",
      subtitle: "Verzeker uzelf vandaag van VIP-toegang.",
      membershipTitle: "Levenslang VIP Lidmaatschap",
      specialOffer: "SPECIALE 50% KORTING",
      lifetimeNotice: "* Levenslange Toegang: Geniet van permanent VIP-lidmaatschap met deze eenmalige betaling. Geen abonnement.",
      discreetBillingTitle: "🔒 100% Discrete Facturering (Privacybescherming)",
      discreetBillingDesc: "Op uw bank- of PayPal-afschrift staat deze betaling neutraal als FLOW1 LTD zonder vermelding van volwassen content.",
      processing: "Betaling verwerken...",
      successTitle: "Betaling geslaagd!",
      successDesc: "Welkom bij Pleasure Heaven VIP.",
      redirecting: "Doorsturen naar Telegram-kanaal...",
      securePayment: "Veilige 256-bits versleutelde betaling"
    }
  },

  pl: {
    promo: {
      discountBadge: "50% ZNIŻKI",
      expiresIn: "OFERTA SPECJALNA WYGASA ZA:",
      joinNow: "DOŁĄCZ TERAZ",
    },
    hero: {
      discountBadge: "50% ZNIŻKI",
      joinOur: "DOŁĄCZ DO NASZEJ ",
      vipGroup: "GRUPY VIP",
      bullets: [
        {
          prefix: "Specjalizacja w",
          bold: "wysokiej jakości wideo JOI",
          suffix: "+ tysiące ekskluzywnych materiałów OnlyFans"
        },
        {
          prefix: "Natychmiastowy dostęp do filmów o wartości ponad",
          bold: "$3,000/miesiąc",
          suffix: "bez żadnych dopłat"
        },
        {
          prefix: "Oglądaj ponad",
          bold: "8 000+ pełnometrażowych filmów",
          suffix: "od najpopularniejszych twórców"
        },
        {
          prefix: "",
          bold: "Poproś o dowolną modelkę",
          suffix: "— dodajemy materiały w ciągu 48 godzin"
        },
        {
          prefix: "",
          bold: "Jednorazowa opłata",
          suffix: "za Dożywotni Dostęp. Żadnych ukrytych abonamentów."
        }
      ],
      ctaLifetime: "UZYSKAJ DOŻYWOTNI DOSTĘP TERAZ",
      ctaPreview: "ZOBACZ ZAPOWIEDŹ VIP",
      billingTitle: "🔒 100% Dyskretna Płatność:",
      billingDesc: "Na wyciągu bankowym i PayPal transakcja widnieje neutralnie jako FLOW1 LTD.",
      offerExpiresIn: "OFERTA WYGASA ZA:",
      messageTelegram: "Napisz do nas na Telegramie",
      vipMembers: "3 000+ CZŁONKÓW VIP",
      positiveReviews: "99% POZYTYWNYCH OPINII",
    },
    socialProof: {
      title: "ZAUFAŁY NAM ",
      titleHighlight: "TYSIĄCE UŻYTKOWNIKÓW",
    },
    faq: {
      title: "CZĘSTO ZADAWANE ",
      titleHighlight: "PYTANIA",
      items: [
        {
          question: "Czy widzicie numer mojej karty płatniczej?",
          answer: "Nie. Nigdy nie widzimy ani nie przechowujemy danych Twojej karty. Wszystkie płatności są bezpiecznie i szyfrowanie realizowane przez PayPal."
        },
        {
          question: "Czy jest to opłata jednorazowa?",
          answer: "Tak! To jednorazowa opłata gwarantująca stały, dożywotni dostęp. Po dołączeniu zyskujesz nieograniczony dostęp do wszystkich obecnych i przyszłych materiałów bez żadnych dodatkowych opłat."
        },
        {
          question: "Gdzie i jak będę oglądać materiały?",
          answer: "Cała baza znajduje się na prywatnych kanałach Telegram. Jeśli nie masz jeszcze konta, założenie bezpłatnego profilu trwa mniej niż 2 minuty.\n\nTwoja prywatność jest w 100% chroniona: nikt nie widzi, do jakich kanałów należysz. Wbudowana wyszukiwarka pozwala natychmiast znaleźć ulubione modelki.\n\nLink z zaproszeniem otrzymasz natychmiast po zaksięgowaniu płatności."
        },
        {
          question: "Czy filmy są w pełnej długości?",
          answer: "Tak! Ponad 80% naszych materiałów to pełnometrażowe filmy w najwyższej rozdzielczości. Skupiamy się na kompletnych nagraniach, a nie krótkich urywkach."
        },
        {
          question: "Co jeśli nie znajdę modelki, której szukam?",
          answer: "Baza jest aktualizowana codziennie. Jeśli jakiejś modelki jeszcze nie ma, napisz do nas na Telegramie – nasz zespół doda całą jej kolekcję w ciągu kilku dni."
        }
      ]
    },
    whoWeAre: {
      title: "KIM ",
      titleHighlight: "JESTEŚMY",
      p1: "Od 2023 roku Pleasure Heaven archiwizuje najbardziej ekskluzywne treści cyfrowe. Nasz zespół zbiera materiały premium w wysokiej rozdzielczości od setek twórców w codziennie aktualizowanej bibliotece.",
      p2: "Naszym celem jest zapewnienie w 100% anonimowej, bezpiecznej i wygodnej platformy z pełnymi archiwami twórców w bezkonkurencyjnej cenie.",
      p3: "Dziś ponad 3000 aktywnych członków VIP korzysta z codziennych ekskluzywnych aktualizacji na naszych prywatnych kanałach."
    },
    choice: {
      title: "WYBIERZ SWOJĄ ",
      titleHighlight: "STRONĘ",
      ofTitle: "ONLYFANS",
      ofItems: [
        "Nieprzewidywalne dodatkowe opłaty za każdy film (PPV)",
        "Powolny i mało przejrzysty interfejs",
        "Brak możliwości bezpośredniego pobierania plików wideo",
        "Ponad $400 miesięcznie za pełny dostęp"
      ],
      vipBadge: "WYBÓR VIP",
      phTitle: "PLEASURE HEAVEN",
      phItems: [
        "Zero ukrytych opłat i dopłat (bez PPV)",
        "Bezpośrednie pobieranie filmów jednym kliknięciem",
        "Unikalne filmy niedostępne nigdzie indziej w sieci",
        "Pełny dostęp do bibliotek ponad 80 topowych twórców",
        "Modele na życzenie dodawane w 48 godzin"
      ],
      enterButton: "Wejdź do Pleasure Heaven"
    },
    contact: {
      title: "SKONTAKTUJ SIĘ Z NAMI",
      ukPhone: "Dla Wielkiej Brytanii: +44 20 4628 1675",
      emailLabel: "Email:",
      copied: "Skopiowano!",
      copyTitle: "Kliknij, aby skopiować email",
      messageTelegram: "Napisz do nas na Telegramie"
    },
    footer: {
      rightsReserved: "PLEASURE HEAVEN. WSZELKIE PRAWA ZASTRZEŻONE.",
      terms: "Regulamin Serwisu",
      privacy: "Polityka Prywatności",
      support: "Pomoc techniczna"
    },
    stickyCta: {
      brandTitle: "PLEASURE HEAVEN VIP",
      lifetimeAccess: "DOŻYWOTNI DOSTĘP",
      discountBadge: "50% ZNIŻKI",
      tagline: "8 000+ Filmów • Codzienne Aktualizacje • Jednorazowa Płatność",
      limitedOffer: "OFERTA LIMITOWANA",
      subTagline: "Jednorazowo • Na Zawsze",
      joinButton: "DOŁĄCZ DO VIP TERAZ"
    },
    paymentModal: {
      title: "DOŁĄCZ DO PLEASURE HEAVEN",
      subtitle: "Zapewnij sobie stały dostęp VIP już dziś.",
      membershipTitle: "Dożywotnie Członkostwo VIP",
      specialOffer: "OFERTA SPECJALNA 50% ZNIŻKI",
      lifetimeNotice: "* Dożywotni Dostęp: Ciesz się stałym członkostwem VIP dzięki tej jednorazowej opłacie. Bez abonamentu.",
      discreetBillingTitle: "🔒 100% Dyskretna Płatność (Ochrona Prywatności)",
      discreetBillingDesc: "Na wyciągu bankowym lub w systemie PayPal transakcja pojawi się wyłącznie jako FLOW1 LTD bez jakichkolwiek wzmianek o treściach dla dorosłych.",
      processing: "Przetwarzanie płatności...",
      successTitle: "Płatność zakończona sukcesem!",
      successDesc: "Witamy w Pleasure Heaven VIP.",
      redirecting: "Przekierowywanie do kanału Telegram...",
      securePayment: "Bezpieczne 256-bitowe szyfrowanie"
    }
  }
};

export const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en';
  
  // Check stored preference first
  const stored = localStorage.getItem('ph_user_lang') as Language;
  if (stored && translations[stored]) {
    return stored;
  }

  // Detect browser language
  const browserLangs = navigator.languages || [navigator.language || ''];
  for (const bLang of browserLangs) {
    const code = bLang.toLowerCase().slice(0, 2);
    if (code === 'tr') return 'tr';
    if (code === 'ar') return 'ar';
    if (code === 'de') return 'de';
    if (code === 'es') return 'es';
    if (code === 'fr') return 'fr';
    if (code === 'it') return 'it';
    if (code === 'ru') return 'ru';
    if (code === 'pt') return 'pt';
    if (code === 'nl') return 'nl';
    if (code === 'pl') return 'pl';
  }

  return 'en';
};
