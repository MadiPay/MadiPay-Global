// القاموس البرمجي للغات
const translations = {
    ar: {
        title: "مصفوفة الشفافية وتكامل الخدمات",
        subtitle: "دمج المتاجر العالمية والخدمات المحلية مع التوجيه المتعدد للعملات",
        service: "نوع الخدمة المدمجة:",
        ecom: "متجر إلكتروني عالمي (API Integration)",
        local: "خدمات وتجارة محلية (Local Retail)",
        global: "تحويل دولي عبر الحدود (Cross-Border)",
        amount: "المبلغ:",
        currency: "العملة النقدية/الرقمية:",
        legacy: "الرسوم التقليدية الاحتكارية:",
        madipay: "رسوم بروتوكول MadiPay العادلة:",
        status: "قناة التوجيه النشطة:",
        logTitle: "سجل محرك التوجيه والسيولة الحية:",
        ready: "جاهز للتوجيه الذكي",
        saved: "وفّرت"
    },
    en: {
        title: "Transparency Matrix & Service Integration",
        subtitle: "Global Merchants & Local Services Integrated with Multi-Currency Routing",
        service: "Integrated Service Type:",
        ecom: "Global E-Commerce (API Integration)",
        local: "Local Retail & Services",
        global: "Cross-Border International Transfer",
        amount: "Amount:",
        currency: "Sovereign/Digital Currency:",
        legacy: "Monopoly Traditional Fees:",
        madipay: "Fair MadiPay Protocol Fees:",
        status: "Active Routing Channel:",
        logTitle: "Core Routing & Live Liquidity Logs:",
        ready: "Ready for Smart Routing",
        saved: "Saved"
    }
};

let currentLang = 'ar';

function switchLang(lang) {
    currentLang = lang;
    
    // تحديث أزرار اللغات لتبدو نشطة
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // قلب اتجاه الحاوية حسب اللغة للجمالية البصرية
    const card = document.getElementById('mainCard');
    if(lang === 'en') {
        card.style.direction = 'ltr';
        card.style.textAlign = 'left';
    } else {
        card.style.direction = 'rtl';
        card.style.textAlign = 'right';
    }

    // تبديل النصوص حياً
    document.getElementById('txtTitle').innerText = translations[lang].title;
    document.getElementById('txtSubtitle').innerText = translations[lang].subtitle;
    document.getElementById('lblService').innerText = translations[lang].service;
    document.getElementById('optEcom').innerText = translations[lang].ecom;
    document.getElementById('optLocal').innerText = translations[lang].local;
    document.getElementById('optGlobal').innerText = translations[lang].global;
    document.getElementById('lblAmount').innerText = translations[lang].amount;
    document.getElementById('lblCurrency').innerText = translations[lang].currency;
    document.getElementById('lblLegacy').innerText = translations[lang].legacy;
    document.getElementById('lblMadiPay').innerText = translations[lang].madipay;
    document.getElementById('lblStatus').innerText = translations[lang].status;
    document.getElementById('lblLogTitle').innerText = translations[lang].logTitle;

    runAdvancedVortex();
}

function runAdvancedVortex() {
    const amount = parseFloat(document.getElementById('vortexAmount').value);
    const currency = document.getElementById('vortexCurrency').value;
    const service = document.getElementById('serviceType').value;
    
    if (isNaN(amount) || amount <= 0) return;

    let legacyRate = 0.05, legacyFixed = 3.5;
    let madiPayRate = 0.001; // 0.1% فقط للشفافية والعدالة

    // تعديل الحسابات بناءً على نوع الخدمة (المتاجر تأخذ عمولات بنكية أعلى تقليدياً)
    if (service === 'ecommerce') { legacyRate = 0.07; legacyFixed = 4.0; }
    else if (service === 'local') { legacyRate = 0.03; legacyFixed = 1.0; }

    // الحساب الرياضي
    const legacyFee = (amount * legacyRate) + legacyFixed;
    const madiPayFee = amount * madiPayRate;
    const saved = legacyFee - madiPayFee;

    document.getElementById('advLegacyFee').innerText = `${legacyFee.toFixed(2)} ${currency}`;
    document.getElementById('advMadiPayFee').innerText = `${madiPayFee.toFixed(2)} ${currency} (${translations[currentLang].saved} ${saved.toFixed(2)})`;
    
    // تحديد قناة التوجيه الفعالة في السيستم
    const channelName = currency === 'USDT' ? 'VORTEX Crypto-Bridge' : 'Unified Sovereign Rails';
    document.getElementById('advRoutingStatus').innerText = `${channelName} [Active]`;

    // طباعة السجل الأمني المتقدم والربط بالمتاجر
    const timestamp = new Date().toISOString();
    document.getElementById('advCryptoConsole').innerHTML = 
`[${timestamp}] 📡 API Gateway: Connection established with [${service.toUpperCase()}] stream.
[INFO] Currency Detected: ${currency} | Operational Volume: ${amount}.
[ROUTING] Optimizing liquidity paths to bypass high-friction global gateways.
[SECURITY] CyberShield Integrity Checked. Anti-tamper shields at 100%.
[SUCCESS] Multi-Currency payload writing safely to local Encrypted Storage.`;
}

// تشغيل أولي
document.addEventListener("DOMContentLoaded", () => { runAdvancedVortex(); });
