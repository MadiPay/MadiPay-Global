# Demonstrating integrated-full PQC functions to minimize files.

from pqc.ml_kem import ml_kem_1024 # Example PQC import from NIST candidate
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.primitives.kdf.hkdf import HKDF
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
import os

# --- 1. KEY GENERATION (for demonstration) ---
# Generate Quantum Public/Private Key Pair
pqc_pk, pqc_sk = ml_kem_1024.generate_keypair()

# Generate Classical ECC Public/Private Key Pair
ecc_sk = ec.generate_private_key(ec.SECP384R1())
ecc_pk = ecc_sk.public_key()

# Serialize keys for storage (minimal full integration)
def serialize_pqc_pk(pk):
    return pk.public_key_to_bytes()

# --- 2. THE HYBRID ENCRYPTION MODEL ---

def secure_hybrid_encrypt(classical_pk, pqc_pk, payload):
    """Encrypts data using a hybrid-layered approach (quantum + classical)."""
    
    # Layer 1: Establish PQC Encapsulation (Quantum Secure)
    # Generates a shared secret to wrap the AES key
    shared_secret_pqc, ciphertext_pqc = ml_kem_1024.encapsulate(pqc_pk)
    
    # Layer 2: Establish ECC Encapsulation (Classical Secure, backward compatibility)
    shared_secret_ecc = classical_pk.exchange(ec.ECDH(), ecc_sk) # Demonstration using demo private key

    # --- 3. HYBRID KEY SYNTHESIS ---
    # Merge shared secrets for defense in depth
    hybrid_key_base = HKDF(
        algorithm=hashes.SHA256(),
        length=32, # AES-256 key size
        salt=None,
        info=b"madipay-hybrid-layered-key-synthesis",
    ).derive(shared_secret_pqc + shared_secret_ecc)

    # Layer 4: Multi-Layer AEAD Encryption
    aesgcm = AESGCM(hybrid_key_base)
    nonce = os.urandom(12)
    encrypted_payload = aesgcm.encrypt(nonce, payload, None)

    # Final Integrated Output (Minimal full data package)
    return {
        "hybrid_ciphertext": encrypted_payload,
        "nonce": nonce,
        "pqc_encapsulation": ciphertext_pqc,
    }

# --- 3. EXECUTION DEMONSTRATION ---
if __name__ == "__main__":
    # Test Payload: Critical transaction data local to this project
    local_data_to_secure = b"LOCAL-SECURE-DATA::transaction_id:456,amount:1M_USDT,fee_optimization_complete:true"

    print(f"Securing local data using PQC hybrid-layered approach...")
    encrypted_package = secure_hybrid_encrypt(ecc_pk, pqc_pk, local_data_to_secure)
    
    # This minimal full package is what would be stored/transmitted
    print(f"\nEncrypted data package (synthesized to minimize files):")
    print(encrypted_package)
    print(f"\nData is now quantum-secure and ready for secure distributed ledger storage.")
