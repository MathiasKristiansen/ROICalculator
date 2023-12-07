function calculateROI() {
    // Gather input values from the form
    var numSignups = parseFloat(document.getElementById('numSignups').value);
    var avgAmount = parseFloat(document.getElementById('avgAmount').value);
    var dropout0 = parseFloat(document.getElementById('dropout0').value);
    var dropout1 = parseFloat(document.getElementById('dropout1').value);
    var dropout2 = parseFloat(document.getElementById('dropout2').value); // Assuming you have this field
    var dropout3 = parseFloat(document.getElementById('dropout3').value); // Assuming you have this field
    var dropoutBeyond = parseFloat(document.getElementById('dropoutBeyond').value); // Assuming you have this field
    var paymentPrecision = parseFloat(document.getElementById('paymentPrecision').value);
    var agencyCost1 = parseFloat(document.getElementById('agencyCost1').value);
    var agencyCost3 = parseFloat(document.getElementById('agencyCost3').value);
    var discountRate = parseFloat(document.getElementById('discountRate').value);

    // Sequentially calculate the number of donors dropping out after each payment
    var donorsAfter0 = numSignups * (1 - dropout0);
    var donorsAfter1 = donorsAfter0 * (1 - dropout1);
    var donorsAfter2 = donorsAfter1 * (1 - dropout2);
    var donorsAfter3 = donorsAfter2 * (1 - dropout3);
    var donorsBeyond = donorsAfter3 * (1 - dropoutBeyond);

    // Calculate Total Agency Cost
    var totalAgencyCost = (donorsAfter0 * agencyCost1) + (donorsAfter3 * agencyCost3);

    // Calculate Income after 3 payments
    var incomeAfter3Payments = avgAmount * 3 * donorsAfter3 * paymentPrecision;

    // Calculate Donor Lifetime in months
    // Assuming the dropout rate beyond is monthly
    var donorLifetimeMonths = donorsBeyond * (1 / dropoutBeyond);

    // Calculate AVG Donor Lifetime Value
    var avgDonorLifetimeValue = donorLifetimeMonths * avgAmount;

    // Calculate Total Donor Lifetime Value
    var totalDonorLifetimeValue = avgDonorLifetimeValue * donorsBeyond;

    // Calculate Total Income
    var totalIncome = totalDonorLifetimeValue + incomeAfter3Payments;

    // Calculate ROI
    var roi = (totalIncome - totalAgencyCost) / totalAgencyCost;

    // Display results
    document.getElementById('totalAgencyCost').innerText = 'Total Agency Cost: ' + totalAgencyCost.toFixed(2);
    document.getElementById('incomeAfter3Payments').innerText = 'Income after 3 Payments: ' + incomeAfter3Payments.toFixed(2);
    document.getElementById('donorLifetimeMonths').innerText = 'Donor Lifetime in Months: ' + donorLifetimeMonths.toFixed(2);
    document.getElementById('avgDonorLifetimeValue').innerText = 'Average Donor Lifetime Value: ' + avgDonorLifetimeValue.toFixed(2);
    document.getElementById('totalDonorLifetimeValue').innerText = 'Total Donor Lifetime Value: ' + totalDonorLifetimeValue.toFixed(2);
    document.getElementById('totalIncome').innerText = 'Total Income: ' + totalIncome.toFixed(2);
    document.getElementById('roiResult').innerText = 'ROI: ' + (roi * 100).toFixed(2) + '%';
}
