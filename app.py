from flask import Flask, request, jsonify
from flask_cors import CORS
import uuid
import datetime

app = Flask(__name__)
# تفعيل CORS لتجنب مشاكل الحظر عند الاتصال من المتصفح
CORS(app)

@app.route('/api/transaction', methods=['POST'])
def handle_transaction():
    try:
        # استقبال البيانات القادمة من واجهة الـ HTML
        data = request.get_json()
        
        if not data:
            return jsonify({"status": "error", "message": "No data received"}), 400
        
        # استخراج المتغيرات
        service = data.get('service')
        gateway = data.get('gateway')
        account_details = data.get('account_details')
        amount = data.get('amount')
        
        # توليد رقم معاملة فريد ومحايد كأنه من البلوكشين
        transaction_id = f"MPX-{uuid.uuid4().hex Cast[:8].upper()}"
        
        # طباعة المعاملة في 콘솔 الخاص ببايثون (يمكنك هنا ربطها بقاعدة بيانات SQL أو شحن تلقائي)
        print("\n" + "="*40)
        print(f"📥 [معاملة جديدة] {datetime.datetime.now()}")
        print(f"رقم العملية: {transaction_id}")
        print(f"الخدمة: {service}")
        print(f"بوابة الدفع: {gateway}")
        print(f"الحساب المستهدف: {account_details}")
        print(f"المبلغ: {amount} USDT")
        print("="*40 + "\n")
        
        # إرسال رد النجاح لواجهة المستخدم
        return jsonify({
            "status": "success",
            "message": "Transaction routed successfully",
            "transaction_id": transaction_id
        }), 200

    except Exception as e:
        print(f"❌ خطأ أثناء معالجة العملية: {str(e)}")
        return jsonify({"status": "error", "message": "Internal server error"}), 500

if __name__ == '__main__':
    # تشغيل السيرفر المحلي على المنفذ 5000
    app.run(debug=True, port=5000)
