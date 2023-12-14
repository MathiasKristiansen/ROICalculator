// Utility function to generate month labels
function generateMonthLabels(months) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let labels = [];
    let currentDate = new Date();

    for (let i = 0; i < months; i++) {
        let futureDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
        let monthIndex = futureDate.getMonth();
        let year = futureDate.getFullYear().toString().slice(-2); // Last two digits of the year
        labels.push(`${monthNames[monthIndex]} ${year}`);
    }

    return labels;
}

// Function to calculate monthly income
function calculateMonthlyIncome(numSignups, avgAmount, dropoutRates, months) {
    let data = [];
    let remainingDonors = numSignups;

    for (let i = 0; i < months; i++) {
        let dropoutRate = i < dropoutRates.length ? dropoutRates[i] : dropoutRates[dropoutRates.length - 1];
        remainingDonors *= (1 - dropoutRate);

        let monthlyIncome = remainingDonors * avgAmount;
        data.push(monthlyIncome);
    }

    return data;
}


// Main function to calculate ROI
function calculateROI() {
    // Fetching values from form inputs
    var numSignups = parseFloat(document.getElementById('numSignups').value) || 0;
    var avgAmount = parseFloat(document.getElementById('avgAmount').value) || 0;
    var dropoutRates = [
        parseFloat(document.getElementById('dropout0').value) || 0,
        parseFloat(document.getElementById('dropout1').value) || 0,
        parseFloat(document.getElementById('dropout2').value) || 0,
        parseFloat(document.getElementById('dropout3').value) || 0,
        parseFloat(document.getElementById('dropoutB').value) || 0,
    ]
    var agencyCost1 = parseFloat(document.getElementById('agencyCost1').value) || 0;
    var agencyCost3 = parseFloat(document.getElementById('agencyCost3').value) || 0;
    var paymentPrecision = parseFloat(document.getElementById('paymentPrecision').value) || 0;
    var donorLifetimeMonths = 1/(parseFloat(document.getElementById('dropoutB').value) || 0) * 12
    var extendedMonths = Math.ceil(donorLifetimeMonths) + 3; // Adding 3 months to the donor's lifetime
    console.log('donorLifetimeMonths:', donorLifetimeMonths);

    //Log to test variables

    console.log('numSignups:', numSignups);
    console.log('avgAmount:', avgAmount);
    console.log('dropoutRates:', dropoutRates);
    console.log('agencyCost1:', agencyCost1);
    console.log('agencyCost3:', agencyCost3);
    console.log('paymentPrecision:', paymentPrecision);


    // Perform other calculations (if any)...

    // Calculating the number of donors after each dropout
    var donorsDropped0 = numSignups * (parseFloat(document.getElementById('dropout0').value) || 0)
    var donorsDropped1 = (numSignups - donorsDropped0) * parseFloat(document.getElementById('dropout1').value) || 0
    var donorsDropped2 = (numSignups - donorsDropped0 - donorsDropped1) * parseFloat(document.getElementById('dropout2').value) || 0
    var donorsDropped3 = (numSignups - donorsDropped0 - donorsDropped1 - donorsDropped2) * parseFloat(document.getElementById('dropout3').value) || 0
    var donorsDroppedB = (numSignups - donorsDropped0 - donorsDropped1 - donorsDropped2 - donorsDropped3) * parseFloat(document.getElementById('dropoutB').value) || 0
    var remainingDonors = numSignups - donorsDropped0 - donorsDropped1 - donorsDropped2 - donorsDropped3

    console.log('donorsDropped0', donorsDropped0);
    console.log('donorsDropped1', donorsDropped1);
    console.log('donorsDropped2', donorsDropped2);
    console.log('donorsDropped3', donorsDropped3);
    console.log('donorsDroppedB', donorsDroppedB);
    
// Calculating total agency cost
    var totalAgencyCost = ((donorsDropped1+donorsDropped2) * agencyCost1) + (donorsDropped3 * agencyCost3) + (remainingDonors * agencyCost3);

// Calculating income after 3 payments
    var incomeAfter3Payments = ((donorsDropped1*avgAmount) + (donorsDropped2*avgAmount*2) + (donorsDropped3*avgAmount*3)) * paymentPrecision

// Calculating average donor lifetime value
    var avgDonorLifetimeValue = donorLifetimeMonths * avgAmount;

// Calculating total donor lifetime value
    var totalDonorLifetimeValue = avgDonorLifetimeValue * remainingDonors;

// Calculating total income
    var totalIncome = totalDonorLifetimeValue + incomeAfter3Payments;

// Calculating ROI
    var roi = (totalIncome - totalAgencyCost) / totalAgencyCost;

    var ctx = document.getElementById('cashflowChart').getContext('2d');

    // Call updateChart with the calculated values
    updateChart(numSignups, avgAmount, dropoutRates, extendedMonths);

    // Display other calculated results (if any)...
    document.getElementById('totalAgencyCost').innerText = 'Total Agency Cost: ' + totalAgencyCost.toFixed(0) + ' NOK';
    document.getElementById('incomeAfter3Payments').innerText = 'Income after 3 Payments: ' + incomeAfter3Payments.toFixed(0) + ' NOK';
    document.getElementById('donorLifetimeMonths').innerText = 'Donor Lifetime in Months: ' + extendedMonths.toFixed(2);
    document.getElementById('avgDonorLifetimeValue').innerText = 'Average Donor Lifetime Value: ' + avgDonorLifetimeValue.toFixed(0) + ' NOK';
    document.getElementById('totalDonorLifetimeValue').innerText = 'Total Donor Lifetime Value: ' + totalDonorLifetimeValue.toFixed(0) + ' NOK';
    document.getElementById('totalIncome').innerText = 'Total Income: ' + totalIncome.toFixed(0) + ' NOK';
    document.getElementById('roiResult').innerText = 'ROI: ' + roi.toFixed(2);


}

// Function to update the chart
function updateChart(numSignups, avgAmount, dropoutRates, months) {
    let monthLabels = generateMonthLabels(months);
    let incomeData = calculateMonthlyIncome(numSignups, avgAmount, dropoutRates, months);

    var ctx = document.getElementById('cashflowChart').getContext('2d');
    var cashflowChart = new Chart(ctx, {
        type: 'line', // Use 'line' and set 'fill' to true for an area chart
        data: {
            labels: monthLabels,
            datasets: [{
                label: 'Total Income',
                data: incomeData,
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1,
                fill: true
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Add an event listener to the button or call calculateROI at the appropriate time
// document.getElementById('yourButtonId').addEventListener('click', calculateROI);

