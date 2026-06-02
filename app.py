import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from crypto_shield import CryptoShield
from smart_router import SmartRouter
from wallets import MadiPayWalletManager

load_dotenv()

app = Flask(__name__)
CORS(app)  # تفعيل CORS للسماح لتطبيق الهاتف (Capacitor) بالاتصال دون قيود المتصفح المتشددة

SYSTEM_KEY = os.getenv("MADIPAY_SECRET_KEY", "Fallback_Temporary_Default_Key_Safe")

shield = CryptoShield(SYSTEM_KEY)
router = SmartRouter()
wallet_manager = MadiPayWalletManager()  # تهيئة مدير المحافظ الرقمية

@app.route('/api/v1/route-payment', methods=['POST'])
def handle_payment_routing():
    try:
        content = request.get_json()
        if not content:
            return jsonify({"status": "error", "message": "لم يتم إرسال بيانات المعاملة"}), 400
        
        transaction_data = content.get("transaction")
        received_signature = content.get("signature")
        strategy = content.get("strategy", "cost")

        if not transaction_data or not received_signature:
            return jsonify({"status": "error", "message": "بيانات المعاملة أو التوقيع الرقمي ناقصة"}), 400

        # 1. الأمن السيبراني: التحقق من التوقيع الرقمي لمنع التلاعب
        is_secure = shield.verify_transaction_integrity(transaction_data, received_signature)
        if not is_secure:
            return jsonify({
                "status": "security_alert", 
                "message": "تحذير أمني: تم رصد تلاعب في البيانات! التوقيع الرقمي غير متطابق."
            }), 403

        sender_id = transaction_data.get("sender_wallet")
        amount = float(transaction_data.get("amount", 0))

        # 2. الفحص المالي: التحقق من وجود رصيد كافٍ في محفظة العميل قبل الحساب
        current_balance = wallet_manager.get_wallet_balance(sender_id)
        if current_balance is None:
            return jsonify({"status": "error", "message": "المحفظة غير موجودة أو تم تجميدها أمنياً"}), 404
        
        if current_balance < amount:
            return jsonify({"status": "error", "message": "فشل العملية: رصيد المحفظة الحالي لا يكفي لتغطية هذا المبلغ"}), 400

        # 3. طبقة التوجيه: حساب المسار المالي الأمثل بعد التأكد من الملاءة المالية
        routing_result = router.find_optimal_route(amount, optimization_strategy=strategy)

        return jsonify({
            "status": "success",
            "message": "تم التحقق سيبرانياً ومالياً، وجاري معالجة التوجيه الآمن",
            "current_available_balance": current_balance,
            "routing": routing_result
        }), 200

    except Exception as e:
        return jsonify({"status": "error", "message": f"خطأ في النظام الداخلي: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
