from flask import Flask, request, jsonify
from flask_cors import CORS
import uuid
import datetime
import logging
# Import the secure sub-system manager
from wallets import MadiPaySecureWalletManager

app = Flask(__name__)
CORS(app)

# Initialize the secure core component
wallet_manager = MadiPaySecureWalletManager()

# Setup professional minimal logging instead of loose print statements
logging.basicConfig(level=logging.INFO)

@app.route('/api/transaction', methods=['POST'])
def handle_transaction():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"status": "error", "code": "MISSING_PAYLOAD", "message": "No data payload received"}), 400
        
        # In a real environment, sender and receiver IDs come securely from authenticated session/tokens
        sender_id = data.get('sender_id', 'VORTEX_LIVE_USER_88')
        receiver_id = data.get('receiver_id', 'UTILITY_SYS_ALGERIA')
        amount_raw = data.get('amount')
        service = data.get('service', 'UTILITY_ROUTING')

        # Type conversion and strict verification
        try:
            amount = float(amount_raw)
        except (TypeError, ValueError):
            return jsonify({"status": "error", "code": "INVALID_NUMBER", "message": "Amount must be a numeric value"}), 400

        if amount <= 0:
            return jsonify({"status": "error", "code": "VALIDATION_FAILED", "message": "Transaction volume must be greater than zero"}), 400

        # Execute Core Financial Logic Link
        execution_result = wallet_manager.execute_transfer(sender_id, receiver_id, amount)

        if not execution_result["success"]:
            return jsonify({
                "status": "error",
                "code": "EXECUTION_BLOCKED",
                "message": execution_result["reason"]
            }), 422

        transaction_id = execution_result["transaction_id"]
        
        # System logging for auditing
        logging.info(f"[ROUTING ENGINE] Successful tx {transaction_id} | Vol: {amount} | Target: {receiver_id}")
        
        return jsonify({
            "status": "success",
            "message": "Transaction validated and routed successfully",
            "transaction_id": transaction_id
        }), 200

    except Exception:
        # Mitigate verbose error leaks to protect system internals from reverse engineering
        logging.critical("Fatal breakdown in API transaction endpoint parsing", exc_info=True)
        return jsonify({"status": "error", "code": "SERVER_ERROR", "message": "Internal Server Error"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
