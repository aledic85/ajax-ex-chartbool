function getCompanySales() {

  $.ajax({

    url: "http://157.230.17.132:4009/sales/",
    method: "GET",
    success: function(inData) {

      sumMontlyRevenues(inData);
      sellerContributionChart(inData);
    },
    error: function() {}
  })
}

function sumMontlyRevenues(inData) {

  var amounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (var i = 0; i < inData.length; i++) {

    var amount = Number(inData[i].amount);
    var date = inData[i].date;
    var dateSplit = date.split("/");
    var month = dateSplit[1];

    amounts[month-1] += amount;
  }

  monthlyRevenuesChart(amounts)
}

function monthlyRevenuesChart(amounts) {

  var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {

    type: 'line',

    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
            label: 'Montly Revenues',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: amounts
        }]
    },

    options: {}
  });

}

function sellerContributionChart(inData) {

  
}

function init() {

  getCompanySales();
}

$(document).ready(init)
