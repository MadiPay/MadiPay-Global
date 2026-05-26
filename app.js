/**
 * MadiPay Global - Smart Router & Exchange Engine
 * العقل المدبر لإدارة السيولة وتوجيه المدفوعات دولياً ومحلياً
 */

// 1. قاعدة بيانات أسعار الصرف الديناميكية (تتضمن السعر الرسمي والسوق الموازي)
const exchangeRates = {
    USD: { official: 134.5, parallel: 220.0 }, // مقابل الدينار الجزائري كمثال
    EUR: { official: 145.2, parallel: 242.0 },
    GBP: { official: 170.1, parallel: 285.0 }
};

// 2. محرك الحساب والتحويل الذكي
function calculateExchange(amount, currency, marketType) {
    const rateObject = exchangeRates[currency];
    if (!rateObject) {
        console.error("العملة غير مدعومة حالياً في النظام.");
        return null;
    }

    // اختيار السعر بناءً على نوع السوق (official أو parallel)
    const activeRate = marketType === 'parallel' ? rateObject.parallel : rateObject.official;
    const totalResult = amount * activeRate;

    return {
        rate: activeRate,
        result: totalResult
    };
}

// 3. خوارزمية الموجه الذكي (Smart Router) لتحديد مسار السيولة الأفضل
function routePayment(amountInUSD) {
    let routeConfig = {
        gatewayName: "",
        executionSpeed: "",
        feePercentage: 0,
        status: "Optimal"
    };

    // منطق التوجيه بناءً على حجم السيولة والعملة لضمان كفاءة التكلفة والسرعة
    if (amountInUSD < 500) {
        // المبالغ الصغيرة الميكروية: توجيه عبر القنوات السريعة منخفضة الرسوم الثابتة
        routeConfig.gatewayName = "Vortex Micro-Route (P2P Optimized)";
        routeConfig.executionSpeed = "Instant (فوري)";
        routeConfig.feePercentage = 0.5; // 0.5%
    } else if (amountInUSD >= 500 && amountInUSD <= 5000) {
        // المبالغ المتوسطة: توجيه عبر قنوات السيولة الدولية المباشرة
        routeConfig.gatewayName = "MadiPay Global Liquidity Bridge";
        routeConfig.executionSpeed = "< 3 Minutes";
        routeConfig.feePercentage = 0.3; // 0.3%
    } else {
        // المبالغ الكبيرة (الحيتان والمؤسسات): توجيه عبر بروتوكول التحوط والضمان المؤقت (Escrow)
        routeConfig.gatewayName = "Sovereign Escrow Protocol (Secure Institutional)";
        routeConfig.executionSpeed = "< 10 Minutes (تحقق أمني مكثف)";
        routeConfig.feePercentage = 0.15; // 0.15%
    }

    return routeConfig;
}

// 4. وظيفة الربط مع واجهة المستخدم (تُستدعى عند الضغط على زر التحويل أو النشر)
function processTransaction() {
    // التقاط القيم من الواجهة (تأكد من مطابقة الـ IDs في ملف الـ HTML الخاص بك)
    const amountInput = parseFloat(document.getElementById('amount')?.value) || 0;
    const currencySelect = document.getElementById('currency')?.value || 'EUR';
    const marketType = document.getElementById('market_type')?.value || 'parallel';

    if (amountInput <= 0) {
        alert("يرجى إدخال مبلغ صحيح لبدء معالجة العملية.");
        return;
    }

    // تنفيذ عمليات المحرك
    const exchangeData = calculateExchange(amountInput, currencySelect, marketType);
    const routingData = routePayment(currencySelect === 'USD' ? amountInput : (amountInput * 1.08)); // تحويل تقريبي للـ USD لتقييم التوجيه

    // تحديث الواجهة بالنتائج (تأكد من وجود عناصر بهذه المعرفات في الـ HTML)
    if (document.getElementById('result_display')) {
        document.getElementById('result_display').innerHTML = `
            <div class="card-vortex">
                <h3 class="text-emerald-global">تمت معالجة العملية بنجاح</h3>
                <p>سعر الصرف المعتمد: <strong>${exchangeData.rate} دج</strong></p>
                <p>إجمالي القيمة الناتجة: <strong class="text-neon-orange">${exchangeData.result.toFixed(2)} دج</strong></p>
                <hr style="border-color: rgba(255,255,255,0.1); margin: 15px 0;">
                <p style="font-size: 0.9em; color: #aaa;">الموجه الذكي نشط: <span style="color: #fff;">${routingData.gatewayName}</span></p>
                <p style="font-size: 0.9em; color: #aaa;">السرعة المتوقعة: <span style="color: #fff;">${routingData.executionSpeed}</span></p>
            </div>
        `;
    } else {
        // في حال لم تكن عناصر العرض جاهزة بعد في الـ HTML، نطبع النتيجة في 콘솔 لضمان السلامة
        console.log("نتائج المحرك والموجه الذكي:", { exchangeData, routingData });
    }
}
