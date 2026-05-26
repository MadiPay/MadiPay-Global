// إعداد قيم الصرف الافتراضية (تحديث 2026)
// ملاحظة: يمكنك تعديل هذه النسب ديناميكياً بناءً على تغيرات السوق
const EXCHANGE_RATES = {
    // أسعار البنك الرسمية (مثال تقريبي)
    OFFICIAL: {
        USD_TO_DZD: 134.50,
        EUR_TO_DZD: 145.20,
    },
    // أسعار السوق الموازية - السكوار (مثال تقريبي يعكس الواقع الحركي)
    SQUARE: {
        USD_TO_DZD: 220.00,
        EUR_TO_DZD: 242.00,
    },
    // التحويل المباشر بين العملات الصعبة
    CROSS_RATES: {
        EUR_TO_USD: 1.08,
        USD_TO_EUR: 0.92
    }
};

// نسبة عمولة المنصة لتأمين المعاملات والـ Escrow (مثلاً: 1%)
const PLATFORM_FEE_PERCENT = 1.0; 

// الانتظار حتى تحميل واجهة المستخدم بالكامل
document.addEventListener('DOMContentLoaded', () => {
    
    // ربط عناصر الواجهة بالكود
    const sendAmountInput = document.getElementById('sendAmount');
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const routeBtn = document.getElementById('routeBtn');
    const routerModeSpan = document.getElementById('routerMode');

    // دالة تحديث مؤشر التوجيه الذكي تلقائياً عند تغيير العملات
    function updateRouterStatus() {
        const toCurrency = toCurrencySelect.value;
        
        if (toCurrency === 'DZD_SQ') {
            routerModeSpan.textContent = "المقاصة الموازية (Square)";
            routerModeSpan.style.color = "#ff6b00"; // لون النيون البرتقالي للتحذير النشط
        } else if (toCurrency === 'DZD_OFF') {
            routerModeSpan.textContent = "التسوية المصرفية الرسمية";
            routerModeSpan.style.color = "#00ff87"; // الأخضر الزمردي للمسارات البنكية
        } else {
            routerModeSpan.textContent = "توجيه سيولة دولية مباشر";
            routerModeSpan.style.color = "#00bfff"; 
        }
    }

    // دالة معالجة الحساب والتوجيه
    function processRouting() {
        const amount = parseFloat(sendAmountInput.value);
        const fromCurr = fromCurrencySelect.value;
        const toCurr = toCurrencySelect.value;

        if (isNaN(amount) || amount <= 0) {
            alert("يرجى إدخال مبلغ صحيح لإتمام عملية التوجيه.");
            return;
        }

        let finalAmount = 0;
        let rateUsed = 0;

        // منطق التوجيه والحساب (السيناريو الأشهر: من اليورو/الدولار إلى السكوار)
        if (fromCurr === 'EUR' && toCurr === 'DZD_SQ') {
            rateUsed = EXCHANGE_RATES.SQUARE.EUR_TO_DZD;
            finalAmount = amount * rateUsed;
        } else if (fromCurr === 'USD' && toCurr === 'DZD_SQ') {
            rateUsed = EXCHANGE_RATES.SQUARE.USD_TO_DZD;
            finalAmount = amount * rateUsed;
        }
        // السيناريو الثاني: التحويل عبر السعر الرسمي للبنك
        else if (fromCurr === 'EUR' && toCurr === 'DZD_OFF') {
            rateUsed = EXCHANGE_RATES.OFFICIAL.EUR_TO_DZD;
            finalAmount = amount * rateUsed;
        } else if (fromCurr === 'USD' && toCurr === 'DZD_OFF') {
            rateUsed = EXCHANGE_RATES.OFFICIAL.USD_TO_DZD;
            finalAmount = amount * rateUsed;
        }
        // سيناريو التحويل بين العملات الصعبة مباشرة
        else if (fromCurr === 'EUR' && toCurr === 'USD') {
            rateUsed = EXCHANGE_RATES.CROSS_RATES.EUR_TO_USD;
            finalAmount = amount * rateUsed;
        } else if (fromCurr === 'USD' && toCurr === 'EUR') {
            rateUsed = EXCHANGE_RATES.CROSS_RATES.USD_TO_EUR;
            finalAmount = amount * rateUsed;
        }
        // في حال اختيار نفس العملة
        else {
            rateUsed = 1;
            finalAmount = amount;
        }

        // خصم عمولة المنصة الذكية
        const fee = (finalAmount * PLATFORM_FEE_PERCENT) / 100;
        const netAmount = finalAmount - fee;

        // إظهار النتيجة للمستخدم عبر تنبيه منسق (أو تحديث في الواجهة لاحقاً)
        alert(`
        === تقرير توجيه السيولة الذكي ===
        المبلغ الأصلي: ${amount} ${fromCurr}
        معدل الصرف المعتمد: ${rateUsed}
        إجمالي القيمة: ${finalAmount.toFixed(2)}
        عمولة المنصة (${PLATFORM_FEE_PERCENT}%): ${fee.toFixed(2)}
        الصافي المستلم: ${netAmount.toFixed(2)}
        `);
    }

    // تفعيل المستمعات (Event Listeners) لضمان تفاعلية فورية
    fromCurrencySelect.addEventListener('change', updateRouterStatus);
    toCurrencySelect.addEventListener('change', updateRouterStatus);
    routeBtn.addEventListener('click', processRouting);

    // تشغيل مبدئي لضبط الحالة عند فتح التطبيق
    updateRouterStatus();
});
/ مادي باي العالمية - ربط المحرك بالواجهة التفاعلية
document.addEventListener("DOMContentLoaded", () => {
    // افترضنا أن هذه هي المعرفات (IDs) الخاصة بحقول الإدخال في الـ HTML الخاص بك
    const amountInput = document.getElementById("amount");
    const currencySelect = document.getElementById("currency_pair"); // مثل: USD_DZD
    const marketTypeSelect = document.getElementById("market_type"); // رسمي أو موازي
    const convertBtn = document.getElementById("convert_btn");
    
    // عناصر عرض النتائج للمستخدم
    const resultDisplay = document.getElementById("result_display");
    const routeDisplay = document.getElementById("route_display");
    const feeDisplay = document.getElementById("fee_display");

    if (convertBtn) {
        convertBtn.addEventListener("click", () => {
            const amount = parseFloat(amountInput.value) || 0;
            const selectedPair = currencySelect.value; // "USD_DZD"
            const marketType = marketTypeSelect.value; // "parallel" أو "official"
            
            if (amount <= 0) {
                alert("يرجى إدخال مبلغ صحيح");
                return;
            }

            const [from, to] = selectedPair.split("_");

            // 1. حساب عملية الصرف
            const exchangeResult = MadiPayEngine.calculateExchange(amount, from, to, marketType);
            
            // 2. تحديد مسار التوجيه الذكي (افتراض الحساب بالدولار للتبسيط)
            const routingResult = MadiPayEngine.routeTransaction(amount, "DZ");

            // 3. تحديث الواجهة بالنتائج الفورية
            if (!exchangeResult.error) {
                resultDisplay.textContent = `${exchangeResult.result} ${to}`;
                routeDisplay.textContent = `المسار: ${routingResult.routeSelected}`;
                feeDisplay.textContent = `الرسوم المقدرة: ${routingResult.fee} USD`;
            } else {
                resultDisplay.textContent = exchangeResult.error;
            }
        });
    }
});
/**// MadiPay Global - Smart Routing & Liquidity Engine v1.1
const MadiPayEngine = {
    // إعدادات أسعار الصرف (الرسمي والموازي "السكوار")
    exchangeRates: {
        USD_DZD: { official: 134.50, parallel: 220.00 },
        EUR_DZD: { official: 145.20, parallel: 241.00 },
        EUR_USD: { official: 1.08, parallel: 1.08 }
    },

    // 1. محرك حساب القيمة الحقيقية مع هامش الأمان
    calculateExchange: function(amount, fromCurrency, toCurrency, marketType = 'parallel') {
        const pair = `${fromCurrency}_${toCurrency}`;
        if (!this.exchangeRates[pair]) {
            return { error: "زوج العملات غير مدعوم حالياً" };
        }

        const rate = this.exchangeRates[pair][marketType];
        // إضافة هامش تحوط بنسبة 0.5% لحماية السيولة أثناء المعالجة
        const hedgeMargin = 0.005; 
        const finalRate = rate * (1 - hedgeMargin);
        
        const convertedAmount = amount * finalRate;
        return {
            originalAmount: amount,
            rateUsed: rate,
            finalRateWithMargin: finalRate,
            result: convertedAmount.toFixed(2)
        };
    },

    // 2. موجه الدفع الذكي (Smart Payment Router)
    // يحدد المسار الأمثل (أسرع وأقل تكلفة) بناءً على حجم المعاملة ونوع العملة
    routeTransaction: function(amountInUSD, destinationCountry) {
        let optimalRoute = "";
        let estimatedFee = 0;

        if (destinationCountry === "DZ") {
            // إذا كانت المعاملة متجهة للجزائر، يتم التوجيه بناءً على حجم السيولة المطلوبة
            if (amountInUSD > 5000) {
                optimalRoute = "Liquidity Pool Provider (P2P Mesh)";
                estimatedFee = amountInUSD * 0.01; // 1% عمولة للمبالغ الكبيرة
            } else {
                optimalRoute = "Automated Internal Escrow (MadiPay Core)";
                estimatedFee = amountInUSD * 0.015; // 1.5% مبالغ صغيرة
            }
        } else {
            // التوجيه الدولي المباشر
            optimalRoute = "Cross-Border Liquidity Bridge (Stablecoin Hub)";
            estimatedFee = amountInUSD * 0.008; // 0.8% للمسارات الدولية عبر العملات المستقرة
        }

        return {
            targetCountry: destinationCountry,
            routeSelected: optimalRoute,
            fee: estimatedFee.toFixed(2),
            executionTime: "Instant to 5 mins"
        };
    }
};

// مثال للاختبار في بيئة التشغيل:
// لتجربة تحويل 1000 يورو إلى الدينار عبر سوق السكوار
// console.log(MadiPayEngine.calculateExchange(1000, 'EUR', 'DZD', 'parallel'));

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
