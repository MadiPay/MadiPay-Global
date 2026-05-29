function calculateRoute() {
    const amount = parseFloat(document.getElementById('inputAmount').value);
    const rateType = document.getElementById('rateType').value;
    const resultBox = document.getElementById('resultBox');
    
    if (isNaN(amount) || amount <= 0) {
        alert("برجاء إدخال مبلغ صحيح لبدء عملية التوجيه الآمنة.");
        return;
    }

    const officialRate = 145.50; 
    const squareRate = 242.00;   

    let finalResult = 0;
    let selectedRate = 0;

    if (rateType === 'official') {
        selectedRate = officialRate;
        finalResult = amount * officialRate;
    } else {
        selectedRate = squareRate;
        finalResult = amount * squareRate;
    }

    document.getElementById('finalOutput').innerText = finalResult.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " DZD";
    document.getElementById('routingStatus').innerText = `[توجيه آمن عبر مسار مستقر بسعر صرف: 1 EUR = ${selectedRate} DZD]`;
    
    // التحكم الآمن في المظهر بإزالة فئة الإخفاء برمجياً
    resultBox.classList.remove('hidden-element');
    resultBox.style.display = 'block'; 
}
