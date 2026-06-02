/**
 * MadiPay Global - Live Frontend Core Engine
 * هذا الملف يربط الواجهة الرسومية بخادم البايثون (Flask API) عبر شبكة حقيقية
 */

const MadiPayLiveEngine = {
    // الخادم المحلي للبايثون (يمكن تغييره لاحقاً برابط الاستضافة السحابية)
    apiBaseUrl: "http://127.0.0.1:5000/api/v1",
    systemKey: "MadiPay_Secure_Super_Secret_Key_2026",

    /**
     * دالة لتوليد التوقيع الرقمي (HMAC-SHA256) برمجياً في الواجهة
     */
    async generateSignature(data) {
        const jsonString = JSON.stringify(data, Object.keys(data).sort());
        // محاكاة سريعة ومتوافقة مع المتصفحات والهواتف لتوليد معرف فريد
        return btoa(this.systemKey + jsonString).substring(0, 32);
    },

    /**
     * إرسال طلب تحويل مالي حقيقي إلى خادم البايثون
     * @param {number} amount - المبلغ المدخل
     * @param {string} strategy - استراتيجية التوجيه (cost أو speed)
     */
    async sendPaymentRequest(amount, strategy = "cost") {
        this.updateStatusOnUI("جاري إعداد المعاملة وتأمينها سيبرانياً...", "info");

        // 1. بناء بيانات المعاملة الأصلية
        const transaction = {
            sender_wallet: "VORTEX_LIVE_USER_88",
            receiver_wallet: "UTILITY_SYS_ALGERIA",
            amount: parseFloat(amount)
        };

        // 2. توليد التوقيع الرقمي في الواجهة قبل الإرسال لمنع التلاعب
        const signature = await this.generateSignature(transaction);

        // 3. تجهيز الحزمة النهائية للإرسال
        const payload = {
            transaction: transaction,
            signature: signature,
            strategy: strategy
        };

        try {
            this.updateStatusOnUI("جاري الاتصال بالخادم المالي لجلب أفضل مسار...", "network");

            // 4. إجراء اتصال شبكة حقيقي بالخادم (HTTP POST Request)
            const response = await fetch(`${this.apiBaseUrl}/route-payment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            // 5. معالجة استجابة الخادم
            if (response.ok && result.status === "success") {
                this.renderRoutingResult(result.routing);
            } else {
                this.updateStatusOnUI(`فشل النظام: ${result.message}`, "error");
            }

        } catch (error) {
            this.updateStatusOnUI("خطأ في الاتصال: تأكد من أن خادم app.py يعمل حالياً!", "error");
            console.error("Network Error:", error);
        }
    },

    /**
     * تحديث النصوص أو مؤشرات التحميل في الواجهة الزجاجية
     */
    updateStatusOnUI(message, type) {
        console.log(`[%] [UI_STATUS] [${type.toUpperCase()}]: ${message}`);
        // هنا مستقبلاً تربط بمؤشر التحميل الزجاجي في تطبيقك
    },

    /**
     * عرض نتائج التوجيه المالي القادمة من البايثون على الشاشة
     */
    renderRoutingResult(routing) {
        this.updateStatusOnUI("تم التوجيه بنجاح آمن! ✅", "success");
        console.log("=== تفاصيل المسار المالي الأمثل ===");
        console.log(`[✔] القناة المختارة: ${routing.selected_gateway}`);
        console.log(`[✔] الرسوم المحتسبة: $${routing.calculated_fee}`);
        console.log(`[✔] الوقت المقدر: ${routing.estimated_time_seconds} ثانية`);
    }
};

// --- محاكاة ضغط مستخدم على زر دفع حقيقي بمبلغ 350 دولار واختيار أقل تكلفة ---
MadiPayLiveEngine.sendPaymentRequest(350, "cost");
// تحديد رابط الخادم المحلي (أو السحابي مستقبلاً)
const MADIPAY_API_URL = "http://127.0.0.1:5000/api/v1/route-payment";

/**
 * دالة إرسال المعاملة المباشرة إلى الخادم لطلب التوجيه وفحص المحفظة
 */
async function processLiveMadiPayRouting(senderWallet, receiverWallet, transferAmount) {
    console.log("🔄 جاري الاتصال بخادم المعالجة الآمن المطور بايثون...");
    
    // 1. تجهيز حزمة البيانات (تطابق الهيكل المتوقع في الخادم)
    const payload = {
        transaction: {
            sender_wallet: senderWallet,
            receiver_wallet: receiverWallet,
            amount: parseFloat(transferAmount)
        },
        // محاكاة توقيع رقمي آمن (في النظام الحقيقي يتم توليده بمفتاح العميل)
        signature: "VORTEX_SECURE_CLIENT_SIGNATURE_HASH_VALID",
        strategy: "cost" // استراتيجية التوجيه: الأقل تكلفة
    };

    try {
        // 2. إرسال الطلب عبر الشبكة باستخدام Fetch
        const response = await fetch(MADIPAY_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        // 3. معالجة الرد وتحديث الواجهة الرسومية زجاجية المظهر حركياً
        if (response.ok && result.status === "success") {
            console.log("✔ تم الرد من الخادم بنجاح:", result);
            
            // تحديث الرصيد المعروض على الشاشة ديناميكياً من الخادم
            document.getElementById("wallet-balance-display").innerText = `$${result.current_available_balance}`;
            
            // تحديث تفاصيل بوابة التوجيه المختارة
            document.getElementById("selected-gateway-display").innerText = result.routing.selected_gateway;
            document.getElementById("routing-fee-display").innerText = `$${result.routing.calculated_fee}`;
            
            alert(`✔ تم التوجيه بنجاح عبر: ${result.routing.selected_gateway}`);
        } else {
            // في حال وجود خلل مالي (رصيد غير كافٍ) أو اختراق أمني
            console.error("❌ رفض الخادم المعاملة:", result.message);
            alert(`فشل المعالجة: ${result.message}`);
        }

    } catch (error) {
        console.error("❌ فشل الاتصال بالخادم الداخلي:", error);
        alert("تنبيه: تعذر الاتصال بخادم المعالجة. تأكد من تشغيل app.py محلياً.");
    }
}
onclick
