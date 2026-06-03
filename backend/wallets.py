import os
import time
from typing import Dict, Optional
from cryptography.fernet import Fernet
import base64
import hashlib

class MadiPaySecureWalletManager:
    def __init__(self):
        # Secure key derivation using SHA-256 and Base64 urlsafe encoding
        raw_key = os.getenv("MADIPAY_SECRET_KEY", "Fallback_Temporary_Default_Key_Safe")
        hashed_key = hashlib.sha256(raw_key.encode()).digest()
        fernet_key = base64.urlsafe_b64encode(hashed_key)
        self.cipher = Fernet(fernet_key)

        # Encrypted state representation (Simulation of Zero-Knowledge Storage)
        self._encrypted_wallets: Dict[str, Dict[str, any]] = {
            "VORTEX_LIVE_USER_88": {
                "balance": self._encrypt_data("1250.0"), 
                "currency": "USD", 
                "status": "active"
            },
            "UTILITY_SYS_ALGERIA": {
                "balance": self._encrypt_data("45000.0"), 
                "currency": "DZD", 
                "status": "active"
            }
        }
        self.ledger = []

    def _encrypt_data(self, data_string: str) -> bytes:
        return self.cipher.encrypt(data_string.encode('utf-8'))

    def _decrypt_data(self, cipher_bytes: bytes) -> str:
        return self.cipher.decrypt(cipher_bytes).decode('utf-8')

    def get_wallet_balance(self, wallet_id: str) -> Optional[float]:
        wallet = self._encrypted_wallets.get(wallet_id)
        if wallet and wallet["status"] == "active":
            try:
                decrypted_balance_str = self._decrypt_data(wallet["balance"])
                return float(decrypted_balance_str)
            except Exception:
                return None  # Defensive failure against cryptographic tampering
        return None

    def execute_transfer(self, sender_id: str, receiver_id: str, amount: float) -> dict:
        # Hardened Input Validation at core level
        if amount <= 0:
            return {"success": False, "reason": "CRITICAL_ERR: Invalid transaction amount"}

        sender = self._encrypted_wallets.get(sender_id)
        receiver = self._encrypted_wallets.get(receiver_id)

        if not sender or not receiver:
            return {"success": False, "reason": "AUTH_ERR: One or both accounts are unavailable"}

        sender_balance = self.get_wallet_balance(sender_id)
        receiver_balance = self.get_wallet_balance(receiver_id)

        if sender_balance is None or receiver_balance is None:
            return {"success": False, "reason": "SEC_ERR: Cryptographic decryption failure"}

        if sender_balance < amount:
            return {"success": False, "reason": "BAL_ERR: Insufficient ledger balance"}

        # Atomic-like mathematical update execution
        new_sender_balance = sender_balance - amount
        new_receiver_balance = receiver_balance + amount

        # Immediate re-encryption at rest
        sender["balance"] = self._encrypt_data(str(new_sender_balance))
        receiver["balance"] = self._encrypt_data(str(new_receiver_balance))

        tx_id = f"TX-SECURE-{int(time.time() * 1000)}"
        self.ledger.append({
            "transaction_id": tx_id,
            "sender": sender_id,
            "receiver": receiver_id,
            "amount": amount,
            "timestamp": time.strftime('%Y-%m-%d %H:%M:%S')
        })

        # Removed balance leak from response payload for data security integrity
        return {"success": True, "transaction_id": tx_id}
