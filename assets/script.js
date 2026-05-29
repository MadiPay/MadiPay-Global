/* ==========================================================================
   MadiPay Global - المحرك المركزي الشامل (7 لغات / 7 عملات / دمج كلي)
   ========================================================================== */

// 1. قاموس اللغات السبع لتحديث الواجهة ديناميكياً بدقة وموثوقية عالية
const languageDictionary = {
    ar: {
        title: "المنظومة المالية السيادية لإدارة المدفوعات وتدفق السيولة",
        subtitle: "ربط المتاجر الإلكترونية العالمية، بوابات الدفع الدولية، والخدمات الحكومية والمحلية في مسار ذكي مشفر واحد.",
        widget: "مركز المحاكاة والربط الذكي",
        amount: "المبلغ المراد معالجته:",
        source: "عملة الإرسال:",
        target: "الخدمة المستهدفة وبوابة التسوية:",
        engine: "بروتوكول معالجة السعر (Rate Engine):",
        execute: "تفعيل الفحص والربط الفوري",
        resHeader: "مسار التسوية المقدر:",
        alert: "برجاء إدخال مبلغ صحيح لبدء عملية التوجيه الآمنة."
    },
    en: {
        title: "Sovereign Financial Ecosystem for Payments & Liquidity Routing",
        subtitle: "Connecting global e-commerce, international payment gateways, and local government services into a unified secure path.",
        widget: "Simulation & Smart Routing Center",
        amount: "Amount to Process:",
        source: "Source Currency:",
        target: "Target Service & Settlement Gateway:",
        engine: "Rate Processing Protocol (Rate Engine):",
        execute: "Activate Instant Routing & Check",
        resHeader: "Estimated Settlement Path:",
        alert: "Please enter a valid amount to initialize secure routing."
    },
    fr: {
        title: "Écosystème Financier Souverain pour le Routage des Paiements",
        subtitle: "Connecter l'e-commerce mondial, les passerelles internationales et les services publics locaux dans un canal sécurisé.",
        widget: "Centre de Simulation et Routage Intelligent",
        amount: "Montant à Traiter:",
        source: "Devise Source:",
        target: "Service Cible & Passerelle de Règlement:",
        engine: "Protocole de Traitement de Taux (Rate Engine):",
        execute: "Activer le Routage Instantané",
        resHeader: "Chemin de Règlement Estimé:",
        alert: "Veuillez saisir un montant valide."
    },
    es: {
        title: "Ecosistema Financiero Soberano para Gestión de Pagos",
        subtitle: "Conectando comercio electrónico global, pasarelas internacionales y servicios locales en una ruta segura unificada.",
        widget: "Centro de Simulación y Enrutamiento Inteligente",
        amount: "Monto a Procesar:",
        source: "Moneda de Origen:",
        target: "Servicio Destino y Pasarela de Liquidación:",
        engine: "Protocolo de Procesamiento de Tasas (Rate Engine):",
        execute: "Activar Enrutamiento Instantáneo",
        resHeader: "Ruta de Liquidación Estimada:",
        alert: "Por favor, introduzca un monto válido."
    },
    zh: {
        title: "主权金融生态系统与流动性路由中心",
        subtitle: "将全球电子商务、国际支付网关和本地政府服务连接到一个统一的安全路径中。",
        widget: "模拟与智能路由中心",
        amount: "待處理金额:",
        source: "来源货币:",
        target: "目标服务与结算网关:",
        engine: "汇率處理协议 (Rate Engine):",
        execute: "激活即时路由与检查",
        resHeader: "预计结算路径:",
        alert: "请输入有效金额以初始化安全路由。"
    },
    tr: {
        title: "Ödemeler ve Likidite Yönlendirme İçin Egemen Finansal Ekosistem",
        subtitle: "Küresel e-ticaret, uluslararası ödeme ağları ve yerel devlet hizmetlerini tek bir güvenli yolda birleştirmek.",
        widget: "Simülasyon ve Akıllı Yönlendirme Merkezi",
        amount: "İşlem Tutarı:",
        source: "Kaynak Para Birimi:",
        target: "Hedef Hizmet ve Mutabakat Ağ Geçidi:",
        engine: "Kur İşleme Protokolü (Rate Engine):",
        execute: "Anlık Yönlendirmeyi Aktive Et",
        resHeader: "Tahmini Mutabakat Yolu:",
        alert: "Lütfen geçerli bir tutar girin."
    },
    de: {
        title: "Souveränes Finanz-Ökosystem für Zahlungs- und Liquiditätsrouting",
        subtitle: "Verbindung von globalem E-Commerce, internationalen Gateways und lokalen Regierungsdiensten in einem sicheren Pfad.",
        widget: "Simulations- und intelligentes Routing-Zentrum",
        amount: "Zu verarbeitender Betrag:",
        source: "Quellwährung:",
        target: "Zieldienst & Abwicklungs-Gateway:",
        engine: "Kursverarbeitungsprotokoll (Rate Engine):",
        execute: "Sofortiges Routing aktivieren",
        resHeader: "Geschätzter Abwicklungspfad:",
        alert: "Bitte geben Sie einen gültigen Betrag ein."
    }
};

// 2. محرك التغيير التلقائي للغات السبع
function changeSystemLanguage() {
    const lang = document.getElementById('globalLangSelector').value;
    const dict = languageDictionary[lang];
    
    // تحديث الواجهة والاتجاهات طبقاً للغة المختارة
    if (lang === 'ar') {
        document.body.setAttribute('dir', 'rtl');
    } else {
        document.body.setAttribute('dir', 'ltr');
    }

    document.getElementById('heroTitle').innerText = dict.title;
    document.getElementById('heroSubtitle').innerText = dict.subtitle;
    document.getElementById('widgetTitle').innerText = dict.widget;
    document.getElementById('lblAmount').innerText = dict.amount;
    document.getElementById('lblSourceCurrency').innerText = dict.source;
    document.getElementById('lblTargetService').innerText = dict.target;
    document.getElementById('lblRateRoute').innerText = dict.engine;
    document.getElementById('btnExecute').innerText = dict.execute;
    document.getElementById('lblResultHeader').innerText = dict.resHeader;
}

// 3. المحرك المالي الشامل لمعالجة الـ 7 عملات والخدمات والشبكات
function calculateComprehensiveRoute() {
    const amount = parseFloat(document.getElementById('inputAmount').value);
    const sourceCurr = document.getElementById('sourceCurrency').value;
    const targetService = document.getElementById('targetService').value;
    const rateRoute = document.getElementById('rateRouteType').value;
    const resultBox = document.getElementById('resultBox');
    const currentLang = document.getElementById('globalLangSelector').value;

    if (isNaN(amount) || amount <= 0) {
        alert(languageDictionary[currentLang].alert);
        return;
    }

    // جدول أسعار الصرف الثابتة بالنسبة لليورو كقاعدة ارتكاز (تحديث محاكي صارم 2026)
    const baseRatesToEUR = { 'EUR': 1.00, 'USD': 1.08, 'GBP': 0.85, 'CAD': 1.48, 'MDC': 0.05 };
    const dzdOfficial = 145.50;
    const dzdSquare = 242.00;

    // أولاً: تحويل القيمة المدخلة من العملة المصدر إلى اليورو كعملة وسيطة
    let amountInEUR = amount / baseRatesToEUR[sourceCurr];

    let finalOutputText = "";
    let statusText = "";

    // ثانياً: فحص التوجيه للخدمات المحلية مقابل العالمية
    const isLocalService = ['flexy', 'idoom', 'baridimob', 'sonelgaz', 'yassir', 'aadl', 'ticket'].includes(targetService);

    if (isLocalService) {
        // حساب القيمة بالدينار الجزائري بناءً على بروتوكول معالجة السعر المختار
        let rateApplied = (rateRoute === 'official') ? dzdOfficial : dzdSquare;
        
        if (rateRoute === 'madicoin') {
            // معالجة فائقة السرعة وعالية العائد عبر جسر MadiCoin
            let finalDZD = amountInEUR * dzdSquare;
            finalOutputText = finalDZD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " DZD";
            statusText = `[MadiCoin Bridge Active] Optimized Local Settlement with 0% Gas Fees for ${targetService.toUpperCase()}.`;
        } else {
            let finalDZD = amountInEUR * rateApplied;
            finalOutputText = finalDZD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " DZD";
            statusText = `[Direct Router] Settlement cleared at ${rateRoute.toUpperCase()} Rate for Algerian Local Service: ${targetService.toUpperCase()}.`;
        }
    } else {
        // النظم الدولية (PayPal, Stripe, المتاجر العالمية) المعالجة تكون بالعملة المقابلة مباشرة أو بـ MDC
        if (rateRoute === 'madicoin') {
            let totalMDC = amountInEUR / baseRatesToEUR['MDC'];
            finalOutputText = totalMDC.toLocaleString('en-US', { minimumFractionDigits: 2 }) + " MDC";
            statusText = `[Sovereign Liquidity Loop] Cross-border transaction via MadiCoin to secure gateway ${targetService.toUpperCase()}.`;
        } else {
            // تسوية دولية مباشرة بالدولار كمثال موحد للنظم العالمية
            let finalUSD = amountInEUR * baseRatesToEUR['USD'];
            finalOutputText = finalUSD.toLocaleString('en-US', { minimumFractionDigits: 2 }) + " USD";
            statusText = `[International Rail] Handshake established with ${targetService.toUpperCase()} API network in stable clearing channels.`;
        }
    }

    // حقن وتحديث النتيجة على الواجهة حياً
    document.getElementById('finalOutput').innerText = finalOutputText;
    document.getElementById('routingStatus').innerText = statusText;
    
    // إزالة فئة الإخفاء وعرض كرت النتائج
    resultBox.classList.remove('hidden-element');
    resultBox.style.display = 'block';
}
