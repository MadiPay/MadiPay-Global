import unittest
from crypto_shield import CryptoShield
from smart_router import SmartRouter

class TestMadiPayCore(unittest.TestCase):
    def setUp(self):
        """إعداد الكائنات الأساسية قبل بدء كل فحص"""
        self.secret_key = "MadiPay_Secure_Super_Secret_Key_2026"
        self.shield = CryptoShield(self.secret_key)
        self.router = SmartRouter()

    def test_crypto_integrity_success(self):
        """فحص: التأكد من أن النظام يقبل المعاملات السليمة التي لم تُعدل"""
        tx = {"sender": "USER_A", "receiver": "USER_B", "amount": 100.0}
        signature = self.shield.generate_transaction_signature(tx)
        
        # يجب أن تعود الدالة بـ True لأن البيانات متطابقة
        self.assertTrue(self.shield.verify_transaction_integrity(tx, signature))

    def test_crypto_integrity_tampered(self):
        """فحص: التأكد من أن النظام يكتشف التلاعب فوراً إذا تغير المبلغ"""
        tx = {"sender": "USER_A", "receiver": "USER_B", "amount": 100.0}
        signature = self.shield.generate_transaction_signature(tx)
        
        # مهاجم يحاول تغيير المبلغ إلى 9999 دولار
        tampered_tx = tx.copy()
        tampered_tx["amount"] = 9999.0
        
        # يجب أن تعود الدالة بـ False لأن التوقيع لم يعد مطابقاً للبيانات المعدلة
        self.assertFalse(self.shield.verify_transaction_integrity(tampered_tx, signature))

    def test_router_cost_optimization(self):
        """فحص: التأكد من أن الموجه يختار البوابة الأرخص دائماً عند طلب ذلك"""
        # عند تحويل 100 دولار، أرخص بوابة حالياً هي Binance Pay (رسوم 0.5% = 0.5 دولار)
        result = self.router.find_optimal_route(100.0, optimization_strategy="cost")
        
        self.assertEqual(result["selected_gateway"], "بوابة بينانس الرقمية")
        self.assertEqual(result["calculated_fee"], 0.5)

if __name__ == "__main__":
    # تشغيل الاختبارات الآلية
    unittest.main()
