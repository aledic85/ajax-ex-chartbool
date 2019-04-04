function getCompanySales() {

  $.ajax({

    url: "http://157.230.17.132:4009/sales/",
    method: "GET",
    success: function(inData) {

      sumMontlyRevenues(inData);
      sellerContribution(inData);
    },
    error: function() {}
  })
}

function sumMontlyRevenues(inData) {

  var amounts = {

    "January": 0,
    "February": 0,
    "March": 0,
    "April": 0,
    "May": 0,
    "June": 0,
    "July": 0,
    "August": 0,
    "September": 0,
    "October": 0,
    "November": 0,
    "December": 0,
  };

  for (var i = 0; i < inData.length; i++) {

    var amount = inData[i].amount;
    var date = inData[i].date;
    var mom = moment(date, "DD/MM/YYYY");
    var month = mom.format("MMMM");

    amounts[month] += amount;
  }

  var monthList = Object.keys(amounts);
  var amountsList = Object.values(amounts);

  monthlyRevenuesChart(monthList, amountsList)
}

function monthlyRevenuesChart(monthList, amountsList) {

  var ctx = document.getElementById('firstChart').getContext('2d');
  var chart = new Chart(ctx, {

    type: 'line',

    data: {
        labels: monthList,
        datasets: [{
            label: 'Montly Revenues',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: amountsList,
        }]
    },

    options: {}
  });

}

function sellerContribution(inData) {

  var totalAmounts = 0;
  var salesmenAmounts = {};

  for (var i = 0; i < inData.length; i++) {

    var salesman = inData[i].salesman;
    var amount = inData[i].amount;

    totalAmounts += amount;
    if (!salesmenAmounts[salesman]) {

      salesmenAmounts[salesman] = 0;
    }
    salesmenAmounts[salesman] += Math.floor((amount / totalAmounts) * 100);
  }

  var salesmenList = Object.keys(salesmenAmounts);
  var amountsList = Object.values(salesmenAmounts);
  console.log(salesmenAmounts);
  stampSalesmenChart(salesmenList, amountsList);
}


function stampSalesmenChart(salesmenList, amountsList) {

  var ctx = document.getElementById('secondChart').getContext('2d');
  var chart = new Chart(ctx, {

    type: 'pie',

    data: {
        labels: salesmenList,
        datasets: [{
            label: 'Montly Revenues',
            backgroundColor: ["red", "green", "blue", "yellow"],
            borderColor: 'rgb(255, 99, 132)',
            data: amountsList
        }]
    },

    options: {}
  });
}

function init() {

  getCompanySales();
}

$(document).ready(init)
