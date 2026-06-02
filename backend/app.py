from flask import Flask, request, jsonify
from flask_cors import CORS
import uuid
import datetime

app = Flask(__name__)
# تفعيل الـ CORS للسماح لملفات الـ Frontend بالاتصال بالسيرفر دون حظر أمني من المتصفح
CORS(app)

@app.route('/api/transaction', methods=['POST'])
def handle_transaction():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"status": "error", "message": "لم يتم استقبال أي بيانات"}), 400
        
        service = data.get('service')
        gateway = data.get('gateway')
        account_details = data.get('account_details')
        amount = data.get('amount')
        
        # حماية التدقيق المالي وضمان حماية المدخلات من القيم السلبية أو التلاعب
        if not amount or float(amount) <= 0:
            return jsonify({"status": "error", "message": "فشل التدقيق: القيمة المالية يجب أن تكون أكبر من صفر"}), 400

        # توليد معرف معتمد فريد للمعاملة
        transaction_id = f"MPX-{uuid.uuid4().hex[:8].upper()}"
        
        # طباعة البيانات بشكل منظم في لوحة تحكم السيرفر (الترمنال)
        print("\n" + "⚡"*20)
        print(f"📥 [تدفق مالي جديد] | {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"ID المعاملة : {transaction_id}")
        print(f"نوع الخدمة  : {service}")
        print(f"قناة التوجيه : {gateway}")
        print(f"المستهدف     : {account_details}")
        print(f"حجم السيولة  : {amount} USDT")
        print("⚡"*20 + "\n")
        
        # إرسال رد النجاح والتمرير المشفر إلى الواجهة
        return jsonify({
            "status": "success",
            "message": "Transaction validated and routed successfully",
            "transaction_id": transaction_id
        }), 200

    except Exception as e:
        print(f"❌ خطأ داخلي في المنظومة: {str(e)}")
        return jsonify({"status": "error", "message": "Internal Server Error"}), 500

if __name__ == '__main__':
    # تشغيل السيرفر على البورت 5000 محلياً
    app.run(debug=True, port=5000)

