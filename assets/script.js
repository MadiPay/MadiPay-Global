/* ==========================================================================
   MadiPay Global - محرك التوجيه وحساب السيولة الذكي 2026
   ========================================================================== */

function calculateRoute() {
    // جلب القيم المدخلة من الواجهة حية
    const amount = parseFloat(document.getElementById('inputAmount').value);
    const rateType = document.getElementById('rateType').value;
    
    // صمام أمان لمنع المدخلات الفارغة أو السالبة
    if (isNaN(amount) || amount <= 0) {
        alert("برجاء إدخال مبلغ صحيح لبدء عملية التوجيه الآمنة.");
        return;
    }

    // المعايير الدقيقة لأسعار الصرف (تحديث ديناميكي محاكي)
    const officialRate = 145.50; // السعر الرسمي التقريبي
    const squareRate = 242.00;   // السعر الموازي في السوق ("السكوار")

    let finalResult = 0;
    let selectedRate = 0;

    if (rateType === 'official') {
        selectedRate = officialRate;
        finalResult = amount * officialRate;
    } else {
        selectedRate = squareRate;
        finalResult = amount * squareRate;
    }

    // تنسيق النتيجة النهائية لتبدو احترافية وبشكل مالي دقيق
    document.getElementById('finalOutput').innerText = finalResult.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " DZD";
    
    // تحديث نص حالة التوجيه لإظهار الذكاء الاصطناعي للموجه
    document.getElementById('routingStatus').innerText = `[توجيه آمن عبر مسار مستقر بسعر صرف: 1 EUR = ${selectedRate} DZD]`;
    
    // إظهار صندوق النتيجة بسلاسة
    document.getElementById('resultBox').style.display = 'block';
}

