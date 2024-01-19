// Global Variables
var numSignups1, avgAmount1, dropoutRates1, agencyCost11, paymentPrecision1;
var numSignups2, avgAmount2, dropoutRates2, agencyCost12, paymentPrecision2;
var incomeData1, incomeData2;
var cashflowChart; // Chart instance



// Utility function to generate month labels
function generateMonthLabels(Months) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let labels = [];
    let currentDate = new Date();

    for (let i = 0; i < Months; i++) {
        let futureDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
        let monthIndex = futureDate.getMonth();
        let year = futureDate.getFullYear().toString().slice(-2); // Last two digits of the year
        labels.push(`${monthNames[monthIndex]} ${year}`);
    }

    return labels;
}




// Function to calculate monthly income
function calculateMonthlyIncome(numSignups, avgAmount, dropoutRates, months, paymentPrecision) {
    let data = [];
    let remainingDonors = numSignups;

    for (let i = 0; i < months; i++) {
        let dropoutRate = i < dropoutRates.length ? dropoutRates[i] : dropoutRates[dropoutRates.length - 1];
        remainingDonors *= (1 - dropoutRate);

        let monthlyIncome = remainingDonors * avgAmount * paymentPrecision;

        data.push(monthlyIncome);
    }

    return data;
}


function calculateScenario1() {
    // Fetching values from form inputs for Scenario 1
    var numSignups1 = parseFloat(document.getElementById('numSignups1').value) || 0;
    var avgAmount1 = parseFloat(document.getElementById('avgAmount1').value) || 0;
    var dropoutRates1 = [
        parseFloat(document.getElementById('dropout01').value) / 100 || 0,
        parseFloat(document.getElementById('dropout11').value) / 100 || 0,
        parseFloat(document.getElementById('dropout21').value) / 100 || 0,
        parseFloat(document.getElementById('dropout31').value) / 100 || 0,
        parseFloat(document.getElementById('dropoutB1').value) / 100 || 0
    ];    
    var agencyCost11 = parseFloat(document.getElementById('agencyCost11').value) || 0;
    var agencyCost31 = parseFloat(document.getElementById('agencyCost31').value) || 0;
    var paymentPrecision1 = parseFloat(document.getElementById('paymentPrecision1').value) / 100 || 0;

 

    // Calculating the number of donors after each dropout
    var donorsAfter01 = numSignups1 * (1 - dropoutRates1[0]);
    var donorsAfter11 = donorsAfter01 * (1 - dropoutRates1[1]);
    var donorsAfter21 = donorsAfter11 * (1 - dropoutRates1[2]);
    var donorsAfter31 = donorsAfter21 * (1 - dropoutRates1[3]);
    var donorsBeyond1 = donorsAfter31 * (1 - dropoutRates1[4]);

    // Calculate Total Agency Cost
    var totalAgencyCost1 = (donorsAfter01 * agencyCost11) + (donorsBeyond1 * agencyCost31);
  

    // Calculate Income after 3 payments
    var incomeAfter3Payments1 = avgAmount1 * 3 * donorsAfter31 * paymentPrecision1;

    // Calculate Donor Lifetime in months
    var donorLifetimeMonths1 = (1 / dropoutRates1[4]) + 3;

    // Calculate AVG Donor Lifetime Value
    var avgDonorLifetimeValue1 = donorLifetimeMonths1 * avgAmount1;

    // Calculate Total Donor Lifetime Value
    var totalDonorLifetimeValue1 = avgDonorLifetimeValue1 * donorsBeyond1;

    // Calculate Total Income
    var totalIncome1 = totalDonorLifetimeValue1 + incomeAfter3Payments1;

    // Calculate ROI
    var roi1 = (totalIncome1 - totalAgencyCost1) / totalAgencyCost1;

    incomeData1 = calculateMonthlyIncome(numSignups1, avgAmount1, dropoutRates1, donorLifetimeMonths1, paymentPrecision1);




    // Display results for Scenario 1
    document.getElementById('totalAgencyCost1').innerText = `Total Agency Cost: ${totalAgencyCost1.toLocaleString('en-US', { maximumFractionDigits: 0 })} NOK`;
    document.getElementById('incomeAfter3Payments1').innerText = `Income after 3 Payments: ${incomeAfter3Payments1.toLocaleString('en-US', { maximumFractionDigits: 0 })} NOK`;
    document.getElementById('donorLifetimeMonths1').innerText = `Donor Lifetime in Months: ${donorLifetimeMonths1.toFixed(2)}`;
    document.getElementById('avgDonorLifetimeValue1').innerText = `Average Donor Lifetime Value: ${avgDonorLifetimeValue1.toLocaleString('en-US', { maximumFractionDigits: 0 })} NOK`;
    document.getElementById('totalDonorLifetimeValue1').innerText = `Total Donor Lifetime Value: ${totalDonorLifetimeValue1.toLocaleString('en-US', { maximumFractionDigits: 0 })} NOK`;
    document.getElementById('totalIncome1').innerText = `Total Income: ${totalIncome1.toLocaleString('en-US', { maximumFractionDigits: 0 })} NOK`;
    document.getElementById('roiResult1').innerText = `ROI: ${roi1.toFixed(2)}`;

}


function calculateScenario2() {
    // Fetching values from form inputs for Scenario 2
    var numSignups2 = parseFloat(document.getElementById('numSignups2').value) || 0;
    var avgAmount2 = parseFloat(document.getElementById('avgAmount2').value) || 0;
    var dropoutRates2 = [
        parseFloat(document.getElementById('dropout02').value) / 100|| 0,
        parseFloat(document.getElementById('dropout12').value) / 100 || 0,
        parseFloat(document.getElementById('dropout22').value) / 100 || 0,
        parseFloat(document.getElementById('dropout32').value) / 100 || 0,
        parseFloat(document.getElementById('dropoutB2').value) / 100 || 0
    ];
    var agencyCost12 = parseFloat(document.getElementById('agencyCost12').value) || 0;
    var agencyCost32 = parseFloat(document.getElementById('agencyCost32').value) || 0;
    var paymentPrecision2 = parseFloat(document.getElementById('paymentPrecision2').value) / 100 || 0;

    // Calculating the number of donors after each dropout
    var donorsAfter02 = numSignups2 * (1 - dropoutRates2[0]);
    var donorsAfter12 = donorsAfter02 * (1 - dropoutRates2[1]);
    var donorsAfter22 = donorsAfter12 * (1 - dropoutRates2[2]);
    var donorsAfter32 = donorsAfter22 * (1 - dropoutRates2[3]);
    var donorsBeyond2 = donorsAfter32 * (1 - dropoutRates2[4]);

    // Calculate Total Agency Cost
    var totalAgencyCost2 = (donorsAfter02 * agencyCost12) + ((donorsBeyond2 + donorsAfter32) * agencyCost32);

    // Calculate Income after 3 payments
    var incomeAfter3Payments2 = avgAmount2 * 3 * donorsAfter32 * paymentPrecision2;

    // Calculate Donor Lifetime in months
    var donorLifetimeMonths2 = (1 / dropoutRates2[4]) + 3;

    // Calculate AVG Donor Lifetime Value
    var avgDonorLifetimeValue2 = donorLifetimeMonths2 * avgAmount2;

    // Calculate Total Donor Lifetime Value
    var totalDonorLifetimeValue2 = avgDonorLifetimeValue2 * donorsBeyond2;

    // Calculate Total Income
    var totalIncome2 = totalDonorLifetimeValue2 + incomeAfter3Payments2;

    // Calculate ROI
    var roi2 = (totalIncome2 - totalAgencyCost2) / totalAgencyCost2;

    incomeData2 = calculateMonthlyIncome(numSignups2, avgAmount2, dropoutRates2, donorLifetimeMonths2, paymentPrecision2);


    // Display results for Scenario 2
    document.getElementById('totalAgencyCost2').innerText = `Total Agency Cost: ${totalAgencyCost2.toLocaleString('en-US', { maximumFractionDigits: 0 })} NOK`;
    document.getElementById('incomeAfter3Payments2').innerText = `Income after 3 Payments: ${incomeAfter3Payments2.toLocaleString('en-US', { maximumFractionDigits: 0 })} NOK`;
    document.getElementById('donorLifetimeMonths2').innerText = `Donor Lifetime in Months: ${donorLifetimeMonths2.toFixed(2)}`;
    document.getElementById('avgDonorLifetimeValue2').innerText = `Average Donor Lifetime Value: ${avgDonorLifetimeValue2.toLocaleString('en-US', { maximumFractionDigits: 0 })} NOK`;
    document.getElementById('totalDonorLifetimeValue2').innerText = `Total Donor Lifetime Value: ${totalDonorLifetimeValue2.toLocaleString('en-US', { maximumFractionDigits: 0 })} NOK`;
    document.getElementById('totalIncome2').innerText = `Total Income: ${totalIncome2.toLocaleString('en-US', { maximumFractionDigits: 0 })} NOK`;
    document.getElementById('roiResult2').innerText = `ROI: ${roi2.toFixed(2)}`;

}


var donorLifetimeMonths1 = (1 / parseFloat(document.getElementById('dropoutB1').value) / 100 || 0) + 3
var donorLifetimeMonths2 = (1 / parseFloat(document.getElementById('dropoutB2').value) / 100 || 0) + 3

// After calculating metrics in both scenarios...
var maxMonths = Math.max(donorLifetimeMonths1, donorLifetimeMonths2);

// Generate labels based on the larger number of months
var monthLabels = generateMonthLabels(maxMonths);





console.log(donorLifetimeMonths1, donorLifetimeMonths2, Math.max(donorLifetimeMonths1, donorLifetimeMonths2));


function updateChart() {
    let dropoutB1 = parseFloat(document.getElementById('dropoutB1').value) / 100 || 0;
    let dropoutB2 = parseFloat(document.getElementById('dropoutB2').value) / 100 || 0;
    let donorLifetimeMonths1 = ((1 / dropoutB1) + 3)*2
    let donorLifetimeMonths2 = ((1 / dropoutB2) + 3)*2
    let maxMonths = (Math.max(donorLifetimeMonths1, donorLifetimeMonths2));
    let monthLabels = generateMonthLabels(maxMonths);
    console.log(monthLabels);

    var ctx = document.getElementById('cashflowChart').getContext('2d');
    if (!cashflowChart) {
        // Initialize the chart if it doesn't exist
        cashflowChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: monthLabels,
                datasets: [
                    {
                        label: document.getElementById('ScenarioName1').value,
                        data: incomeData1,
                        backgroundColor: 'rgba(0, 123, 255, 0.2)',
                        borderColor: 'rgba(0, 123, 255, 1)',
                        borderWidth: 1,
                        fill: true
                    },
                    {
                        label: document.getElementById('ScenarioName2').value,
                        data: incomeData2,
                        backgroundColor: 'rgba(255, 165, 0, 0.2)',
                        borderColor: 'rgba(255, 165, 0, 1)',
                        borderWidth: 1,
                        fill: true
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } else {
        // Update the chart if it exists
        cashflowChart.data.labels = monthLabels;
        cashflowChart.data.datasets[0].data = incomeData1;
        cashflowChart.data.datasets[1].data = incomeData2;
        cashflowChart.update();
    }
}





// Event listener for the 'Calculate and Compare' button
document.getElementById('calculateButton').addEventListener('click', function() {
    calculateScenario1();
    calculateScenario2();

    // Calculate the max number of months based on both scenarios
    let maxMonths = (Math.max(donorLifetimeMonths1, donorLifetimeMonths2));

    // Generate month labels based on the larger number of months
    let monthLabels = generateMonthLabels(maxMonths);

    // Fetch income data for both scenarios
    updateChart(monthLabels, maxMonths, incomeData1, incomeData2);
});

document.getElementById('downloadChart').addEventListener('click', function() {
    var url = document.getElementById('cashflowChart').toDataURL('image/png');
    var a = document.createElement('a');
    a.href = url;
    a.download = 'chart.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});


console.log(maxMonths)
console.log(monthLabels)
console.log(incomeData1)
console.log(incomeData2)




// Add an event listener to the button or call calculateROI at the appropriate time
// document.getElementById('yourButtonId').addEventListener('click', calculateROI);

