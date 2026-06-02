from flask import Flask, request, jsonify
from crypto_shield import CryptoShield
from smart_router import SmartRouter

app = Flask(__name__)

# تهيئة الوحدات التي بنيناها سابقاً
SYSTEM_KEY = "MadiPay_Secure_Super_Secret_Key_2026"
shield = CryptoShield(SYSTEM_KEY)
router = SmartRouter()

@app.route('/api/v1/route-payment', methods=['POST'])
def handle_payment_routing():
    """
    نقطة النهاية (Endpoint) لاستقبال طلبات الدفع من التطبيق،
    التحقق من سلامتها سيبرانياً، ثم توجيهها عبر المسار المالي الأمثل.
    """
    try:
        # 1. استقبال البيانات القادمة من واجهة الجافا سكريبت
        content = request.get_json()
        if not content:
            return jsonify({"status": "error", "message": "لم يتم إرسال بيانات المعاملة"}), 400
        
        transaction_data = content.get("transaction")
        received_signature = content.get("signature")
        strategy = content.get("strategy", "cost")

        if not transaction_data or not received_signature:
            return jsonify({"status": "error", "message": "بيانات المعاملة أو التوقيع الرقمي ناقصة"}), 400

        # 2. طبقة الأمن السيبراني: فحص سلامة المعاملة ومنع التلاعب (التكامل)
        is_secure = shield.verify_transaction_integrity(transaction_data, received_signature)
        if not is_secure:
            return jsonify({
                "status": "security_alert", 
                "message": "تحذير أمني: تم رصد تلاعب في البيانات! التوقيع الرقمي غير متطابق."
            }), 403

        # 3. طبقة التوجيه الذكي: حساب المسار الأمثل مالياً وزمنياً
        amount = float(transaction_data.get("amount", 0))
        routing_result = router.find_optimal_route(amount, optimization_strategy=strategy)

        # 4. إعادة النتيجة الآمنة إلى واجهة المستخدم
        return jsonify({
            "status": "success",
            "message": "تم التحقق من أمان المعاملة وتوجيهها بنجاح",
            "routing": routing_result
        }), 200

    except Exception as e:
        return jsonify({"status": "error", "message": f"خطأ في النظام الداخلي: {str(e)}"}), 500

if __name__ == '__main__':
    # تشغيل الخادم محلياً للاختبار والتطوير
    app.run(host='0.0.0.0', port=5000, debug=True)
