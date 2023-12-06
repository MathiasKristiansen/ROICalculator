function calculateROI() {
    var investment = document.getElementById('investment').value;
    var returnAmount = document.getElementById('return').value;

    var roi = ((returnAmount - investment) / investment) * 100;

    document.getElementById('result').innerText = 'ROI: ' + roi.toFixed(2) + '%';
}

