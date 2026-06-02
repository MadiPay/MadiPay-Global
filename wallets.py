import time
from typing import Dict, Optional

class MadiPayWalletManager:
    def __init__(self):
        # قاعدة بيانات مؤقتة في الذاكرة لمحاكاة حسابات المستخدمين (الأرصدة والعملات)
        self._wallets: Dict[str, Dict[str, any]] = {
            "VORTEX_LIVE_USER_88": {"balance": 1250.0, "currency": "USD", "status": "active"},
            "UTILITY_SYS_ALGERIA": {"balance": 45000.0, "currency": "DZD", "status": "active"},
            "SUSPICIOUS_HOLDER_99": {"balance": 5.0, "currency": "USD", "status": "suspended"}
        }
        # سجل الحركات المالية الداخلي لحفظ تفاصيل كل عملية
        self.ledger = []

    def get_wallet_balance(self, wallet_id: str) -> Optional[float]:
        """جلب رصيد المحفظة إذا كانت موجودة ونشطة"""
        wallet = self._wallets.get(wallet_id)
        if wallet and wallet["status"] == "active":
            return wallet["balance"]
        return None

    def execute_transfer(self, sender_id: str, receiver_id: str, amount: float) -> dict:
        """
        تنفيذ عملية الخصم والإيداع البرمجية الصارمة.
        تتحقق الدالة من الأرصدة وحالة الحسابات قبل نقل أي سنت.
        """
        sender = self._wallets.get(sender_id)
        receiver = self._wallets.get(receiver_id)

        # 1. التحقق من وجود الحسابات وصلاحيتها
        if not sender or not receiver:
            return {"success": False, "reason": "أحد أطراف المعاملة (المرسل/المستقبل) غير مسجل في النظام"}
        
        if sender["status"] != "active" or receiver["status"] != "active":
            return {"success": False, "reason": "حساب المرسل أو المستقبل معطل أو معلق لأسباب أمنية"}

        # 2. فحص كفاية الرصيد (منع السحب على المكشوف)
        if sender["balance"] < amount:
            return {"success": False, "reason": "الرصيد الحالي غير كافٍ لإتمام هذه المعاملة"}

        # 3. المعاملة المالية الذرية (Atomic Transaction simulation)
        sender["balance"] -= amount
        receiver["balance"] += amount

        # 4. تسجيل العملية في السجل المالي غير القابل للتعديل (Ledger)
        tx_id = f"TX-VORTEX-{int(time.time() * 1000)}"
        tx_entry = {
            "transaction_id": tx_id,
            "sender": sender_id,
            "receiver": receiver_id,
            "amount": amount,
            "timestamp": time.strftime('%Y-%m-%d %H:%M:%S', time.localtime())
        }
        self.ledger.append(tx_entry)

        return {
            "success": True,
            "transaction_id": tx_id,
            "new_sender_balance": sender["balance"]
        }
