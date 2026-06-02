import json

class SmartRouter:
    def __init__(self):
        # محاكاة قنوات الدفع المتاحة في النظام مع الرسوم والسرعة بالثواني
        self.payment_gateways = {
            "local_bank_transfer": {"name": "التحويل البنكي المحلي", "fee_percentage": 0.01, "processing_time_sec": 3600, "active": True},
            "paypal_gateway": {"name": "بوابة باي بال الدولية", "fee_percentage": 0.045, "processing_time_sec": 5, "active": True},
            "binance_pay": {"name": "بوابة بينانس الرقمية", "fee_percentage": 0.005, "processing_time_sec": 2, "active": True},
            "stripe_card": {"name": "بطاقات الائتمان الدولية", "fee_percentage": 0.029, "processing_time_sec": 3, "active": False} # معطلة مؤقتاً للصيانة
        }

    def find_optimal_route(self, amount, optimization_strategy="cost"):
        """
        دالة تبحث عن المسار المالي الأمثل بناءً على استراتيجية المستخدم:
        - cost: التركيز على الرسوم الأقل
        - speed: التركيز على السرعة القصوى
        """
        best_gateway = None
        lowest_fee = float('inf')
        fastest_time = float('inf')

        for gateway_id, info in self.payment_gateways.items():
            # استبعاد البوابات غير المفعلة
            if not info["active"]:
                continue
            
            # حساب الرسوم الفعلية للمبلغ المطلوب
            calculated_fee = amount * info["fee_percentage"]

            if optimization_strategy == "cost":
                # البحث عن أقل رسوم
                if calculated_fee < lowest_fee:
                    lowest_fee = calculated_fee
                    best_gateway = info
            
            elif optimization_strategy == "speed":
                # البحث عن أسرع وقت معالجة
                if info["processing_time_sec"] < fastest_time:
                    fastest_time = info["processing_time_sec"]
                    best_gateway = info

        return {
            "selected_gateway": best_gateway["name"],
            "calculated_fee": lowest_fee if optimization_strategy == "cost" else (amount * best_gateway["fee_percentage"]),
            "estimated_time_seconds": best_gateway["processing_time_sec"]
        }

# --- اختبار الكود البرمجي (Simulation) ---
if __name__ == "__main__":
    router = SmartRouter()
    test_amount = 100.0  # تجربة تحويل مبلغ 100 دولار مثلاً
    
    print(f"=== محاكاة توجيه عملية دفع بقيمة: ${test_amount} ===")
    
    # 1. اختبار استراتيجية أقل تكلفة
    best_cost_route = router.find_optimal_route(test_amount, optimization_strategy="cost")
    print(f"\n[استراتيجية الرسوم الأقل]:")
    print(f"- البوابة المختارة: {best_cost_route['selected_gateway']}")
    print(f"- قيمة الرسوم المقتطعة: ${best_cost_route['calculated_fee']}")
    print(f"- الوقت المتوقع: {best_cost_route['estimated_time_seconds']} ثانية")

    # 2. اختبار استراتيجية أسرع وقت
    best_speed_route = router.find_optimal_route(test_amount, optimization_strategy="speed")
    print(f"\n[استراتيجية السرعة القصوى]:")
    print(f"- البوابة المختارة: {best_speed_route['selected_gateway']}")
    print(f"- قيمة الرسوم المقتطعة: ${best_speed_route['calculated_fee']}")
    print(f"- الوقت المتوقع: {best_speed_route['estimated_time_seconds']} ثانية")
