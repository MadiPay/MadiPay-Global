<!-- واجهة الموجه الذكي لـ MadiPay -->
<div id="madi-interface" class="card-vortex">
    <h2>محول MadiPay الذكي</h2>
    
    <label>المبلغ:</label>
    <input type="number" id="amount" placeholder="أدخل المبلغ">
    
    <label>العملة:</label>
    <select id="currency">
        <option value="USD">دولار أمريكي (USD)</option>
        <option value="EUR">يورو (EUR)</option>
        <option value="GBP">جنيه إسترليني (GBP)</option>
    </select>
    
    <label>نوع السوق:</label>
    <select id="market_type">
        <option value="official">السعر الرسمي</option>
        <option value="parallel">السوق الموازي (السكوار)</option>
    </select>
    
    <button class="btn-cyber" onclick="processTransaction()">تحويل ذكي</button>
    
    <div id="result_display" style="margin-top: 20px;"></div>
</div>
# منصة مادي باي (MadiPay)
منصة ذكية متطورة وبوابات الدفع الرقمية المحلية والعالمية.
