import json
import os
import sys
from dotenv import load_dotenv

# إضافة المجلد الحالي للمسار لضمان استيراد الوحدات بسلاسة
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from crypto_shield import CryptoShield
from smart_router import SmartRouter
from wallets import MadiPaySecureWalletManager

def run_system_integration_test():
    print("==================================================")
    print("🚀 بدء نظام الاختبار الشامل لمنصة MadiPay Global 🚀")
    print("==================================================")
    
    # شحن المتغيرات البيئية المعزولة
    load_dotenv()
    secret_key = os.getenv("MADIPAY_SECRET_KEY", "Fallback_Temporary_Default_Key_Safe")
    
    # 1. تهيئة المكونات الهندسية الأربعة
    print("\n[+] جاري تهيئة وحدات النظام وتأمين الذاكرة...")
    shield = CryptoShield(secret_key)
    router = SmartRouter()
    wallet_manager = MadiPaySecureWalletManager()
    print("✔ تم تشغيل طبقة التشفير، الموجه الذكي، والمحافظ المشفرة (AES-256) بنجاح.")

    # 2. تحديد أطراف المعاملة التجريبية
    sender = "VORTEX_LIVE_USER_88"
    receiver = "UTILITY_SYS_ALGERIA"
    amount = 250.0
    
    print(f"\n[+] محاكاة معاملة دفع: من {sender} إلى {receiver} بمبلغ ${amount}")

    # 3. خطوة الفحص المالي (الملاءة المالية)
    print("\n--- [الخطوة 1: فحص الملاءة والأرصدة المشفرة] ---")
    initial_balance = wallet_manager.get_wallet_balance(sender)
    print(f"✔ تم فك تشفير رصيد المرسل في الذاكرة الحية بأمان: ${initial_balance}")
    
    if initial_balance is None or initial_balance < amount:
        print("❌ فشل الاختبار: الرصيد غير كافٍ أو فشل فك التشفير!")
        return

    # 4. خطوة الأمن السيبراني وتوقيع المعاملة في جهة العميل
    print("\n--- [الخطوة 2: طبقة الأمن السيبراني والتوقيع الرقمي] ---")
    tx_data = {
        "sender_wallet": sender,
        "receiver_wallet": receiver,
        "amount": amount
    }
    
    # توليد التوقيع
    signature = shield.generate_transaction_signature(tx_data)
    print(f"✔ تم توليد التوقيع الرقمي الآمن للمعاملة: {signature}")
    
    # التحقق من التكامل (Integrity Check)
    is_valid = shield.verify_transaction_integrity(tx_data, signature)
    print(f"✔ نتيجة فحص سلامة البيانات وتطابق القفل: {is_valid}")
    if not is_valid:
        print("❌ فشل الاختبار: التوقيع الرقمي غير سليم!")
        return

    # 5. خطوة التوجيه المالي الذكي لحساب الرسوم والمسار
    print("\n--- [الخطوة 3: طبقة التوجيه المالي الذكي (Smart Routing)] ---")
    routing_decision = router.find_optimal_route(amount, optimization_strategy="cost")
    print(f"✔ القناة المالية المثالية المختارة: {routing_decision['selected_gateway']}")
    print(f"✔ الرسوم المحتسبة: ${routing_decision['calculated_fee']}")
    print(f"✔ الوقت المقدر للتسوية المالية: {routing_decision['estimated_time_seconds']} ثانية")

    # 6. خطوة النقل المالي الفعلي وتحديث الأرصدة وإعادة التشفير
    print("\n--- [الخطوة 4: التنفيذ المالي الآمن وإعادة التعمية] ---")
    execution_result = wallet_manager.execute_transfer(sender, receiver, amount)
    
    if execution_result["success"]:
        print(f"✔ تم تنفيذ العملية بنجاح! رقم الحركة: {execution_result['transaction_id']}")
        print(f"✔ رصيد المرسل الجديد (بعد الخصم وإعادة التشفير بـ AES): ${execution_result['new_sender_balance']}")
    else:
        print(f"❌ فشل تنفيذ العملية المادية: {execution_result['reason']}")
        return

    print("\n==================================================")
    print("🎉 نجح الاختبار الشامل! جميع وحدات MadiPay تعمل بتناغم كامل 🎉")
    print("==================================================")

if __name__ == "__main__":
    run_system_integration_test()
