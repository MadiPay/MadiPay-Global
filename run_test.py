import os
import time
from typing import Dict, Optional
from cryptography.fernet import Fernet
import base64
import hashlib

# ==========================================
# 1. المكون المالي والتشهير (Core Wallet Manager)
# ==========================================
class MadiPaySecureWalletManager:
    def __init__(self):
        raw_key = os.getenv("MADIPAY_SECRET_KEY", "Fallback_Temporary_Default_Key_Safe")
        hashed_key = hashlib.sha256(raw_key.encode()).digest()
        fernet_key = base64.urlsafe_b64encode(hashed_key)
        self.cipher = Fernet(fernet_key)

        # حسابات مشفرة وهمية للتجربة
        self._encrypted_wallets: Dict[str, Dict[str, any]] = {
            "VORTEX_LIVE_USER_88": {
                "balance": self.cipher.encrypt(b"1250.0"), 
                "currency": "USD", 
                "status": "active"
            },
            "UTILITY_SYS_ALGERIA": {
                "balance": self.cipher.encrypt(b"45000.0"), 
                "currency": "DZD", 
                "status": "active"
            }
        }

    def get_wallet_balance(self, wallet_id: str) -> Optional[float]:
        wallet = self._encrypted_wallets.get(wallet_id)
        if wallet and wallet["status"] == "active":
            return float(self.cipher.decrypt(wallet["balance"]).decode('utf-8'))
        return None

    def execute_transfer(self, sender_id: str, receiver_id: str, amount: float) -> dict:
        if amount <= 0:
            return {"success": False, "reason": "VALIDATION_FAILED: Amount must be greater than zero"}

        sender_balance = self.get_wallet_balance(sender_id)
        receiver_balance = self.get_wallet_balance(receiver_id)

        if sender_balance is None or receiver_balance is None:
            return {"success": False, "reason": "SEC_ERR: Decryption failure"}

        if sender_balance < amount:
            return {"success": False, "reason": "BAL_ERR: Insufficient ledger balance"}

        # تحديث الحسابات وإعادة التشفير فوراً
        sender["balance"] = self.cipher.encrypt(str(sender_balance - amount).encode())
        self._encrypted_wallets[receiver_id]["balance"] = self.cipher.encrypt(str(receiver_balance + amount).encode())

        return {"success": True, "transaction_id": f"TX-SECURE-{int(time.time() * 1000)}"}

# ==========================================
# 2. أداة المحاكاة التلقائية لشاشة الهاتف (Auto-Tester)
# ==========================================
if __name__ == "__main__":
    # تشغيل المنظومة المالية في الذاكرة
    manager = MadiPaySecureWalletManager()
    
    print("==================================================")
    # فحص الرصيد الأولي قبل بدء أي عملية
    print(f"Initial Sender Balance   : {manager.get_wallet_balance('VORTEX_LIVE_USER_88')} USD")
    print(f"Initial Receiver Balance : {manager.get_wallet_balance('UTILITY_SYS_ALGERIA')} DZD")
    print("==================================================")

    # 📥 الحالة الأولى: تحويل طبيعي ناجح بمبلغ 150 دولار
    print("\n[Executing Test 1] Standard Valid Routing...")
    res1 = manager.execute_transfer("VORTEX_LIVE_USER_88", "UTILITY_SYS_ALGERIA", 150.0)
    print(f"Result Status: {res1['success']} | TX_ID: {res1.get('transaction_id') or res1.get('reason')}")
    print(f"New Sender Balance: {manager.get_wallet_balance('VORTEX_LIVE_USER_88')} USD")

    # 📥 الحالة الثانية: محاولة اختراق بتمرير قيمة سالبة (-50)
    print("\n[Executing Test 2] Cyber Defense against Negative Injection...")
    res2 = manager.execute_transfer("VORTEX_LIVE_USER_88", "UTILITY_SYS_ALGERIA", -50.0)
    print(f"Result Status: {res2['success']} | Blocked Reason: {res2['reason']}")

    # 📥 الحالة الثالثة: محاولة سحب مبلغ ضخم غير موجود في الرصيد
    print("\n[Executing Test 3] Checking Overdraft and Ledger Exhaustion...")
    res3 = manager.execute_transfer("VORTEX_LIVE_USER_88", "UTILITY_SYS_ALGERIA", 999999.0)
    print(f"Result Status: {res3['success']} | Blocked Reason: {res3['reason']}")
    print("==================================================")
