import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Arabic translations
const arTranslations = {
  common: {
    welcome: 'مرحبًا بك في منشئ المواقع الذكي',
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    register: 'إنشاء حساب',
    dashboard: 'لوحة التحكم',
    websites: 'المواقع',
    settings: 'الإعدادات',
    save: 'حفظ',
    cancel: 'إلغاء',
    delete: 'حذف',
    edit: 'تعديل',
    create: 'إنشاء',
    preview: 'معاينة',
    publish: 'نشر',
    back: 'رجوع',
    loading: 'جاري التحميل...',
    error: 'حدث خطأ',
    success: 'تم بنجاح',
    confirm: 'تأكيد',
    name: 'الاسم',
    description: 'الوصف',
    date: 'التاريخ',
    actions: 'الإجراءات',
    search: 'بحث',
    noResults: 'لا توجد نتائج',
    emailAddress: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    madeOn: 'تم إنشاؤه بواسطة'
  },
  home: {
    title: 'أنشئ موقعك الاحترافي بسهولة',
    subtitle: 'منشئ مواقع ذكي احترافي متطور ومتقدم مع كل الخصائص بالعربية',
    getStarted: 'ابدأ الآن',
    features: 'المميزات',
    feature1Title: 'سهل الاستخدام',
    feature1Desc: 'واجهة بسيطة وسهلة الاستخدام تمكنك من إنشاء موقعك بسرعة',
    feature2Title: 'قوالب احترافية',
    feature2Desc: 'مجموعة متنوعة من القوالب الاحترافية لتختار منها',
    feature3Title: 'تخصيص كامل',
    feature3Desc: 'خصص موقعك بالكامل ليتناسب مع احتياجاتك وذوقك',
    feature4Title: 'متوافق مع الجوال',
    feature4Desc: 'مواقع متوافقة تمامًا مع جميع الأجهزة'
  },
  auth: {
    signInWith: 'تسجيل الدخول باستخدام',
    signInWithEmail: 'تسجيل الدخول بالبريد الإلكتروني',
    forgotPassword: 'نسيت كلمة المرور؟',
    noAccount: 'ليس لديك حساب؟',
    createAccount: 'إنشاء حساب',
    alreadyHaveAccount: 'لديك حساب بالفعل؟',
    signIn: 'تسجيل الدخول',
    passwordReset: 'إعادة تعيين كلمة المرور',
    resetInstructions: 'أدخل بريدك الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور',
    passwordResetSent: 'تم إرسال رابط إعادة تعيين كلمة المرور',
    signOut: 'تسجيل الخروج'
  },
  dashboard: {
    title: 'لوحة التحكم',
    welcomeBack: 'مرحبًا بعودتك',
    websiteStats: 'إحصاءات المواقع',
    totalWebsites: 'إجمالي المواقع',
    publishedWebsites: 'المواقع المنشورة',
    draftWebsites: 'المواقع المسودة',
    recentActivity: 'النشاط الأخير',
    quickActions: 'إجراءات سريعة',
    createNewWebsite: 'إنشاء موقع جديد',
    viewAllWebsites: 'عرض جميع المواقع',
    editProfile: 'تعديل الملف الشخصي'
  },
  websites: {
    title: 'المواقع',
    createNew: 'إنشاء موقع جديد',
    filter: 'تصفية',
    all: 'الكل',
    published: 'منشور',
    drafts: 'مسودة',
    noWebsites: 'ليس لديك مواقع حتى الآن',
    websiteName: 'اسم الموقع',
    status: 'الحالة',
    lastModified: 'آخر تعديل',
    createWebsite: 'إنشاء موقع جديد',
    websiteDetails: 'تفاصيل الموقع',
    deleteConfirm: 'هل أنت متأكد من رغبتك في حذف هذا الموقع؟ لا يمكن التراجع عن هذا الإجراء.',
    template: 'قالب',
    chooseTemplate: 'اختر قالبًا'
  },
  builder: {
    title: 'منشئ المواقع',
    components: 'العناصر',
    preview: 'معاينة',
    settings: 'الإعدادات',
    saveChanges: 'حفظ التغييرات',
    discardChanges: 'تجاهل التغييرات',
    publish: 'نشر',
    text: 'نص',
    image: 'صورة',
    button: 'زر',
    section: 'قسم',
    container: 'حاوية',
    header: 'رأس',
    footer: 'تذييل',
    navigation: 'قائمة تنقل',
    form: 'نموذج',
    gallery: 'معرض',
    map: 'خريطة',
    socialLinks: 'روابط التواصل الاجتماعي',
    layoutSettings: 'إعدادات التخطيط',
    colorSettings: 'إعدادات الألوان',
    fontSettings: 'إعدادات الخط',
    advancedSettings: 'إعدادات متقدمة',
    dragDrop: 'اسحب وأفلت العناصر هنا',
    editContent: 'تعديل المحتوى',
    styleSettings: 'إعدادات النمط',
    addComponent: 'إضافة عنصر',
    removeComponent: 'إزالة العنصر',
    duplicateComponent: 'تكرار العنصر',
    mobilePreview: 'معاينة الجوال',
    tabletPreview: 'معاينة اللوحي',
    desktopPreview: 'معاينة سطح المكتب',
    changesSaved: 'تم حفظ التغييرات',
    unsavedChanges: 'لديك تغييرات غير محفوظة',
    alignLeft: 'محاذاة لليسار',
    alignCenter: 'محاذاة للوسط',
    alignRight: 'محاذاة لليمين',
    alignJustify: 'ضبط'
  },
  preview: {
    title: 'معاينة الموقع',
    backToEditor: 'العودة إلى المحرر',
    publishWebsite: 'نشر الموقع',
    viewOnMobile: 'عرض على الجوال',
    viewOnTablet: 'عرض على اللوحي',
    viewOnDesktop: 'عرض على سطح المكتب'
  },
  errors: {
    generic: 'حدث خطأ. يرجى المحاولة مرة أخرى.',
    auth: 'حدث خطأ في المصادقة. يرجى المحاولة مرة أخرى.',
    validation: 'يرجى التأكد من صحة جميع الحقول.',
    notFound: 'لم يتم العثور على الصفحة',
    notFoundMessage: 'عذرًا، الصفحة التي تبحث عنها غير موجودة.',
    returnHome: 'العودة إلى الصفحة الرئيسية',
    forbidden: 'غير مصرح',
    forbiddenMessage: 'عذرًا، ليس لديك صلاحية للوصول إلى هذه الصفحة.',
    serverError: 'خطأ في الخادم',
    serverErrorMessage: 'عذرًا، حدث خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقًا.'
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ar: arTranslations
    },
    lng: 'ar',
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  });

export default i18n;