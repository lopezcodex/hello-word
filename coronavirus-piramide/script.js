/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */

// DATA https://www.youtrend.it/2020/04/27/coronavirus-i-dati-per-fascia-eta-e-genere/

// Themes begin
am4core.useTheme(am4themes_spiritedaway);
am4core.useTheme(am4themes_animated);
// Themes end

var mainContainer = am4core.create("chartdiv", am4core.Container);
mainContainer.width = am4core.percent(100);
mainContainer.height = am4core.percent(100);
mainContainer.layout = "horizontal";

const SHEET_ID = '1x4SlsYn4A7SP-YrvSv4SLYaZut7g3pmo4x4cuGU7ckk';
//const ACCESS_TOKEN = 'ya29.a0AfH6SMCU_DmhBfVy_0F4JwVhHHLNaeMCTu2_44Ig7BWV9R45OxgRhOx2TcL-4cJyp1BYkgCNcMQ6-ZF5Sp9NO06SpvWM1dt9Z3MlT00Drfhma3nGZSORtMSjidPp21MEK21LfJPVxOHf_3BPurUnIXwh6Bq031ocog4';
//const ACCESS_TOKEN = '8139594616-s1kkev7pbj7sin75epsakdq41et847mr.apps.googleusercontent.com';

getSheetValues = async () =>{
  const request = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/A:T?key=AIzaSyB4oV4F5RHUrM4RP-191Q2th1V0S7SzK30`,
    {
      headers: {
        "Content-Type": "application/json",
//        Authorization: `Bearer ${ACCESS_TOKEN}`  
    }
    });
    const data = await request.json();
    console.log(data);
    
    label = []
    d = []

    for(var x in data.values) {
      if(x == 0) {
        //console.log(0)
        label = data.values[x]
      } else {
        var usData = []
        //x = Math.ceil((data.values.length - 1)*Math.random())
        //x = data.values.length - 1
        //console.log(x)
        //console.log(data.values[x]);
        for(i in data.values[x]) {
          //console.log(i)
          if(i>0) {
            o = {
              "age": data.values[0][i],
              "male": data.values[x][i],
              "female": data.values[x][i]
            }
          usData.push(o)          
          } else {
            date[x] = data.values[x][i]
          }
        }
        console.log(usData)
        d.push(usData)
        console.log(d)
      }
    }

    console.log(d)

    document.querySelector("#range-input").max = date.length - 1

    document.querySelector("#range-input").value = date.length - 1

    var label = document.querySelector("#date_label");
    label.textContent = date[date.length - 1]

    updateChart(d[d.length - 1])

    return d;
  }

var maleChart
var femaleChart
var d = getSheetValues()
var label = []
var date = []
var counter = 0

buildChart()

function nextValue(){
  counter += 1
  counter %= d.length
  updateChart(d[counter])
  alert(date[counter])
}

function updateChart (usData) {
  maleChart.data = JSON.parse(JSON.stringify(usData));
  femaleChart.data = JSON.parse(JSON.stringify(usData));
}

function buildChart () {

  maleChart = mainContainer.createChild(am4charts.XYChart);
  maleChart.paddingRight = 0;
  //maleChart.data = JSON.parse(JSON.stringify(usData));

  // Create axes
  var maleCategoryAxis = maleChart.yAxes.push(new am4charts.CategoryAxis());
  maleCategoryAxis.dataFields.category = "age";
  maleCategoryAxis.renderer.grid.template.location = 0;
  //maleCategoryAxis.renderer.inversed = true;
  maleCategoryAxis.renderer.minGridDistance = 15;

  var maleValueAxis = maleChart.xAxes.push(new am4charts.ValueAxis());
  maleValueAxis.renderer.inversed = true;
  maleValueAxis.min = 0;
  maleValueAxis.max = 10;
  maleValueAxis.strictMinMax = true;

  maleValueAxis.numberFormatter = new am4core.NumberFormatter();
  maleValueAxis.numberFormatter.numberFormat = "#.#'%'";

  // Create series
  var maleSeries = maleChart.series.push(new am4charts.ColumnSeries());
  maleSeries.dataFields.valueX = "female";
  maleSeries.dataFields.valueXShow = "percent";
  maleSeries.calculatePercent = true;
  maleSeries.fill = "#680e3e";
  maleSeries.stroke = "#680e3e";
  maleSeries.dataFields.categoryY = "age";
  maleSeries.interpolationDuration = 1000;
  maleSeries.columns.template.tooltipText = "Decessi (donne), {categoryY} anni: {valueX} ({valueX.percent.formatNumber('#.0')}%)";
  //maleSeries.sequencedInterpolation = true;

  femaleChart = mainContainer.createChild(am4charts.XYChart);
  femaleChart.paddingLeft = 0;
  //femaleChart.data = JSON.parse(JSON.stringify(usData));

  // Create axes
  var femaleCategoryAxis = femaleChart.yAxes.push(new am4charts.CategoryAxis());
  femaleCategoryAxis.renderer.opposite = true;
  femaleCategoryAxis.dataFields.category = "age";
  femaleCategoryAxis.renderer.grid.template.location = 0;
  femaleCategoryAxis.renderer.minGridDistance = 15;

  var femaleValueAxis = femaleChart.xAxes.push(new am4charts.ValueAxis());
  femaleValueAxis.min = 0;
  femaleValueAxis.max = 10;
  femaleValueAxis.strictMinMax = true;
  femaleValueAxis.numberFormatter = new am4core.NumberFormatter();
  femaleValueAxis.numberFormatter.numberFormat = "#.#'%'";
  femaleValueAxis.renderer.minLabelPosition = 0.01;

  // Create series
  var femaleSeries = femaleChart.series.push(new am4charts.ColumnSeries());
  femaleSeries.dataFields.valueX = "male";
  femaleSeries.dataFields.valueXShow = "percent";
  femaleSeries.calculatePercent = true;
  femaleSeries.fill = "#00afaf";
  femaleSeries.stroke = "#00afaf";
  //femaleSeries.sequencedInterpolation = true;
  femaleSeries.columns.template.tooltipText = "Decessi (uomini), {categoryY} anni: {valueX} ({valueX.percent.formatNumber('#.0')}%)";
  femaleSeries.dataFields.categoryY = "age";
  femaleSeries.interpolationDuration = 1000;

  document.querySelector("#chartdiv > div > svg > g > g:nth-child(2) > g:nth-child(2) > g > g:nth-child(3)").style.display = "none"
}


(function() {
  var parent = document.querySelector("#rangeSlider");
  if(!parent) return;


  var range = parent.querySelector("input[type=range]"),
    numberS = parent.querySelectorAll("input[type=number]");
  range.oninput = function() {
    var slide = parseFloat(range.value);
    numberS[0].value = slide;
    updateChart(d[slide])
    var label = document.querySelector("#date_label");
    label.textContent = date[slide]
  }

  numberS.forEach(function(el) {
    el.oninput = function() {
      var number1 = parseFloat(numberS[0].value),
        number2 = parseFloat(numberS[1].value);

      if (number1 > number2) {
        var tmp = number1;
        numberS[0].value = number2;
        numberS[1].value = tmp;
      }

      rangeS[0].value = number1;
      rangeS[1].value = number2;

    }
  });

})();