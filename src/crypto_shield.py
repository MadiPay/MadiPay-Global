import hashlib
import hmac
import base64
import json

class CryptoShield:
    def __init__(self, secret_key: str):
        """
        تهيئة وحدة الأمان باستخدام مفتاح سري قوي.
        في البيئات الحقيقية، يتم جلب هذا المفتاح من متغيرات البيئة الآمنة (Environment Variables).
        """
        self.secret_key = secret_key.encode('utf-8')

    def generate_transaction_signature(self, transaction_data: dict) -> str:
        """
        توليد توقيع رقمي آمن (HMAC-SHA256) للمعاملة لمنع التلاعب بالبيانات.
        """
        # تحويل البيانات إلى نص مرتب وثابت لضمان دقة التوقيع
        serialized_data = json.dumps(transaction_data, sort_keys=True).encode('utf-8')
        
        # إنشاء التوقيع الرقمي باستخدام المفتاح السري
        signature = hmac.new(self.secret_key, serialized_data, hashlib.sha256).hexdigest()
        return signature

    def verify_transaction_integrity(self, transaction_data: dict, received_signature: str) -> bool:
        """
        التحقق من أن المعاملة لم تتعرض للتعديل أو الاختراق أثناء النقل.
        """
        expected_signature = self.generate_transaction_signature(transaction_data)
        # مقارنة التوقيع المتوقع مع التوقيع المستلم بطريقة آمنة تمنع هجمات التوقيت (Timing Attacks)
        return hmac.compare_digest(expected_signature, received_signature)

    def obfuscate_sensitive_data(self, data_string: str) -> str:
        """
        تشفير أولي سريع (Base64 Obfuscation) لحماية أرقام الحسابات أو المعرفات من القراءة المباشرة في الذاكرة.
        """
        return base64.b64encode(data_string.encode('utf-8')).decode('utf-8')

    def deobfuscate_sensitive_data(self, obfuscated_string: str) -> str:
        """
        فك التشفير الأولي لاستعادة البيانات الأصلية.
        """
        return base64.b64decode(obfuscated_string.encode('utf-8')).decode('utf-8')


# --- اختبار المنظومة الأمنية (Security Simulation) ---
if __name__ == "__main__":
    # مفتاح سري افتراضي لحماية النظام
    SYSTEM_KEY = "MadiPay_Secure_Super_Secret_Key_2026"
    shield = CryptoShield(SYSTEM_KEY)

    # محاكاة بيانات معاملة مالية حساسة
    tx = {
        "sender_wallet": "VORTEX_USER_8791",
        "receiver_wallet": "PAYPAL_RECEIVER_9921",
        "amount": 500.0,
        "fee": 2.5
    }

    print("=== محاكاة طبقة الحماية والتشفير السيبراني ===")
    
    # 1. توليد التوقيع الرقمي للمعاملة
    tx_signature = shield.generate_transaction_signature(tx)
    print(f"\n[+] تم إنشاء توقيع رقمي آمن للمعاملة:\n    -> {tx_signature}")

    # 2. التحقق من سلامة المعاملة الأصلية
    is_valid = shield.verify_transaction_integrity(tx, tx_signature)
    print(f"\n[+] فحص سلامة البيانات الحالية: {'آمنة وسليمة (Valid) ✅' if is_valid else 'مخترقة (Invalid) ❌'}")

    # 3. محاكاة محاولة اختراق أو تلاعب بالبيانات (تغيير قيمة الرسوم من 2.5 إلى 0.0)
    print("\n[🚨] تحذير: محاولة تلاعب بالبيانات من قِبل طرف خارجي...")
    tampered_tx = tx.copy()
    tampered_tx["fee"] = 0.0  # المهاجم يحاول إلغاء الرسوم

    # 4. إعادة فحص البيانات المتلاعب بها
    is_tampered_valid = shield.verify_transaction_integrity(tampered_tx, tx_signature)
    print(f"[+] فحص سلامة البيانات بعد محاولة التعديل: {'آمنة وسليمة (Valid) ✅' if is_tampered_valid else 'تم اكتشاف التلاعب ورفض العملية فوراً (Tampered)! ❌'}")
