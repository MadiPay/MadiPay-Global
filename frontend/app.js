const BASE_URL = 'http://127.0.0.1:5000'; // غيّر هذا الرابط عند الرفع السحابي الحقيقي

const basePrice = 1.3525;
function updatePrices() {
    const rateElement = document.getElementById('marketRate');
    if (rateElement) {
        const randomFluctuation = (Math.random() * 0.003) - 0.0015;
        const currentPrice = basePrice + randomFluctuation;
        rateElement.textContent = currentPrice.toFixed(4) + " USDT";
    }
}
updatePrices();
setInterval(updatePrices, 2000);

function CopyMadiLink() {
    const linkInput = document.getElementById('referralLink');
    if (linkInput) {
        linkInput.select();
        linkInput.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(linkInput.value).then(() => {
            const btn = document.getElementById('triggerEliteActionBtn');
            if (btn) {
                btn.textContent = "✓ تم نسخ الرابط بنجاح";
                btn.style.backgroundColor = "var(--neon-blue)";
                btn.style.color = "#000000";
                setTimeout(() => {
                    btn.textContent = "انقر لكشف الرابط السري والنسخ";
                    btn.style.backgroundColor = "transparent";
                    btn.style.color = "var(--neon-blue)";
                }, 2000);
            }
        }).catch(err => { console.error('خطأ أثناء النسخ: ', err); });
    }
}

function openGateway(serviceName, inputPlaceholder) {
    document.getElementById('modalTitle').textContent = serviceName;
    document.getElementById('inputLabel').textContent = inputPlaceholder;
    document.getElementById('modalFormBody').style.display = "block";
    document.getElementById('secureLoadingSection').style.display = "none";
    document.getElementById('gatewayModal').classList.add('active');
}

function closeGateway() {
    document.getElementById('gatewayModal').classList.remove('active');
    document.getElementById('accountDetail').value = "";
    document.getElementById('amount').value = "";
    document.getElementById('calculatedFee').textContent = "0.00";
}

function calculateFees() {
    const amount = parseFloat(document.getElementById('amount').value);
    const feeElement = document.getElementById('calculatedFee');
    if (!isNaN(amount) && amount > 0) {
        const fee = amount * 0.005; 
        feeElement.textContent = fee.toFixed(2);
    } else {
        feeElement.textContent = "0.00";
    }
}

// دالة الربط الفعلي وإرسال البيانات للـ Backend عبر الـ API
function processTransaction() {
    const serviceName = document.getElementById('modalTitle').textContent;
    const gateway = document.getElementById('routingGateway').value;
    const details = document.getElementById('accountDetail').value;
    const amount = document.getElementById('amount').value;

    if(!details || !amount) {
        alert("تنبيه أمني: يرجى ملء كافة الحقول لتأمين خط التوجيه المالي.");
        return;
    }

    document.getElementById('modalFormBody').style.display = "none";
    document.getElementById('secureLoadingSection').style.display = "block";

    const transactionData = {
        service: serviceName,
        gateway: gateway,
        account_details: details,
        amount: parseFloat(amount)
    };

    // إرسال البيانات فوراً إلى خادم بايثون الفعلي
    fetch(`${BASE_URL}/api/transaction`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(transactionData)
    })
    .then(response => {
        if (!response.ok) throw new Error('فشل تمرير العملية عبر الخادم');
        return response.json();
    })
    .then(data => {
        document.getElementById('secureStatusText').textContent = "جاري تفعيل العقود الذكية للضمان وتمرير السيولة...";
        
        setTimeout(() => {
            alert(`✓ نجاح عملية التوجيه النخبوية!\nرقم المعاملة: ${data.transaction_id}\nتم تسجيل واستقبال التدفق المالي بنجاح.`);
            closeGateway();
        }, 1500);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('خطأ فني: تعذر الوصول إلى سيرفر التوجيه الخلفي. تأكد من تشغيل ملف البايثون.');
        document.getElementById('modalFormBody').style.display = "block";
        document.getElementById('secureLoadingSection').style.display = "none";
    });
}

