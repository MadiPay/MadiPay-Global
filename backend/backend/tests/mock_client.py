import requests
import json
import time

# Target local API endpoint configured in app.py
BASE_URL = "http://127.0.0.1:5000/api/transaction"

def run_transaction_test(test_name: str, payload: dict):
    """Utility function to execute and log API simulation use cases"""
    print(f"\n--- Running Test: {test_name} ---")
    print(f"Sending Payload: {json.dumps(payload, indent=2)}")
    
    try:
        response = requests.post(BASE_URL, json=payload)
        print(f"HTTP Status Code: {response.status_stdout if hasattr(response, 'status_stdout') else response.status_code}")
        print(f"Response Body: {json.dumps(response.json(), indent=2)}")
    except requests.exceptions.ConnectionError:
        print("❌ CRITICAL: Could not connect to the MadiPay backend server. Ensure app.py is running on port 5000.")

if __name__ == "__main__":
    print("==================================================")
    print("MadiPay Global: Automated Financial Endpoint Mock Client")
    print("==================================================")
    
    # Use Case 1: Standard Valid Utility Transaction
    valid_tx = {
        "sender_id": "VORTEX_LIVE_USER_88",
        "receiver_id": "UTILITY_SYS_ALGERIA",
        "amount": 150.0,
        "service": "SONELGAZ_UTILITY_GATEWAY"
    }
    run_transaction_test("SUCCESS_SCENARIO_VALID_ROUTING", valid_tx)
    
    time.sleep(1) # Interval to avoid sequence overlap
    
    # Use Case 2: Defensive Verification against Counterfeit Negative Value Input
    negative_tx = {
        "sender_id": "VORTEX_LIVE_USER_88",
        "receiver_id": "UTILITY_SYS_ALGERIA",
        "amount": -50.0,
        "service": "REVERSE_ENGINEERING_EXPLOIT_ATTEMPT"
    }
    run_transaction_test("DEFENSIVE_BLOCK_NEGATIVE_VOLUME", negative_tx)
    
    time.sleep(1)
    
    # Use Case 3: Execution Rejection due to Ledger Exhaustion (Insufficient Funds)
    insufficient_funds_tx = {
        "sender_id": "VORTEX_LIVE_USER_88",
        "receiver_id": "UTILITY_SYS_ALGERIA",
        "amount": 999999.0,
        "service": "HIGH_LIQUIDITY_OUTFLOW"
    }
    run_transaction_test("REJECTION_INSUFFICIENT_FUNDS", insufficient_funds_tx)
