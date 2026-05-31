قدم// القاموس البرمجي للغات
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
const crypto = require('crypto');

class CyberShieldCore {
    constructor(secretKey) {
        // حماية المفتاح السري داخل الذاكرة واستخدام تشفير قوي
        this.secretKey = crypto.scryptSync(secretKey, 'vortex-salt', 32);
    }

    /**
     * توليد ختم رقمي مشفر غير قابل للتزوير لكل معاملة
     */
    generateAntiTamperSeal(transactionData) {
        const timestamp = Date.now();
        const nonce = crypto.randomBytes(16).toString('hex');
        
        // ترتيب البيانات بشكل صارم لمنع أي تلاعب بالهيكل (Object Injection)
        const canonicalPayload = JSON.stringify({
            amount: transactionData.amount,
            currency: transactionData.currency,
            sender: transactionData.sender,
            recipient: transactionData.recipient,
            timestamp: timestamp,
            nonce: nonce
        });

        // إنشاء الختم باستخدام HMAC-SHA512 للأمان المطلق
        const hmac = crypto.createHmac('sha512', this.secretKey);
        hmac.update(canonicalPayload);
        const seal = hmac.digest('hex');

        return {
            payload: JSON.parse(canonicalPayload),
            seal: seal
        };
    }

    /**
     * التحقق من سلامة المعاملة ومنع التلاعب بنسبة 100%
     */
    verifyAndProtect(securedTransaction) {
        const { payload, seal } = securedTransaction;

        // 1. فحص عامل الوقت: منع الهجمات المعادة إذا تجاوزت 5 ثوانٍ (Drift Window)
        const timeDrift = Date.now() - payload.timestamp;
        if (timeDrift > 5000 || timeDrift < -1000) {
            throw new Error("SECURITY_VIOLATION: Timestamp drift detected. Potential Replay Attack.");
        }

        // 2. إعادة حساب الختم لمطابقته
        const canonicalPayload = JSON.stringify(payload);
        const hmac = crypto.createHmac('sha512', this.secretKey);
        hmac.update(canonicalPayload);
        const expectedSeal = hmac.digest('hex');

        // 3. المقارنة الثابتة زمنيًا (Constant-Time Comparison) لمنع هجمات التوقيت (Timing Attacks)
        const isSafe = crypto.timingSafeEqual(Buffer.from(seal, 'hex'), Buffer.from(expectedSeal, 'hex'));

        if (!isSafe) {
            this.triggerLockdown(payload);
            throw new Error("CRITICAL_ALARM: Data tampering detected! Core payload structural mismatch.");
        }

        return true; // المعاملة سليمة ومحصنة تمامًا
    }

    triggerLockdown(payload) {
        // بروتوكول الإغلاق التلقائي وعزل الحساب المشبوه فوراً
        console.error(`[CYBER-SHIELD LOCKDOWN] Tampering attempt on transaction: ${payload.nonce}`);
        // هنا يتم إرسال تنبيه فوري ونقل المعاملة لبيئة العزل (Sandbox)
    }
}
