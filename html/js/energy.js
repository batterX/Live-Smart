/*
	Define all needed Variables
*/

var btnSelected = 1; // 1=Production 2=Consumption
var zoomActive = true; // If True -> Show hours 05:00 to 21:00 else show 00:00 to 24:00

var data_batteryOut = []; // Battery - Discharged
var data_batteryIn = []; // Battery - Charged
var data_gridOut = []; // Grid - Consumption
var data_gridIn = []; // Grid - Injection
var data_directConsumption = []; // Load Consumption - Solar Only

var label_batteryOut = "Battery";
var label_batteryIn = "Battery (Charging)";
var label_gridOut = "Grid";
var label_gridIn = "Grid (Injection)";
var label_directConsumption = "Direct Consumption";

var color_battery = "green";
var color_grid = "rgb(0, 191, 255)";
var color_directConsumption = "rgb(255, 165, 0)";
var bgColor_battery = "rgba(0, 128, 0, 1)";
var bgColor_grid = "rgba(0, 191, 255, 1)";
var bgColor_directConsumption = "rgba(255, 165, 0, 1)";

var labels = [];

var dataset_batteryOut = {
	label: label_batteryOut,
	borderColor: color_battery,
	backgroundColor: bgColor_battery,
	fill: true,
	data: data_batteryOut
};
var dataset_batteryIn = {
	label: label_batteryIn,
	borderColor: color_battery,
	backgroundColor: bgColor_battery,
	fill: true,
	data: data_batteryIn
};
var dataset_gridOut = {
	label: label_gridOut,
	borderColor: color_grid,
	backgroundColor: bgColor_grid,
	fill: true,
	data: data_gridOut
};
var dataset_gridIn = {
	label: label_gridIn,
	borderColor: color_grid,
	backgroundColor: bgColor_grid,
	fill: true,
	data: data_gridIn
};
var dataset_directConsumption = {
	label: label_directConsumption,
	borderColor: color_directConsumption,
	backgroundColor: bgColor_directConsumption,
	fill: true,
	data: data_directConsumption
};

var date_from = moment().format("YYYYMMDD");
var date_to = moment().format("YYYYMMDD");










/*
	Create and Initialize the Chart
*/

var customTooltips = function(tooltip) {

	// Tooltip Element
	var tooltipEl = document.getElementById('chartjs-tooltip');

	// Create Tooltip Element if not Exists
	if (!tooltipEl) {
		tooltipEl = document.createElement('div');
		tooltipEl.id = 'chartjs-tooltip';
		tooltipEl.innerHTML = "<table></table>"
		this._chart.canvas.parentNode.appendChild(tooltipEl);
	}
	
	// Hide if no tooltip
	if (tooltip.opacity === 0) {
		tooltipEl.style.opacity = 0;
		return;
	}

	// Set Caret Position
	tooltipEl.classList.remove('above', 'below', 'no-transform');
	if (tooltip.yAlign) {
		tooltipEl.classList.add(tooltip.yAlign);
	} else {
		tooltipEl.classList.add('no-transform');
	}
	

	function getBody(bodyItem) {
		return bodyItem.lines;
	}

	// Set Text
	if (tooltip.body) {
		var titleLines = tooltip.title || [];
		var bodyLines = tooltip.body.map(getBody);

		var innerHtml = '<thead>';

		titleLines.forEach(function(title) {
			innerHtml += '<tr><th colspan="2">' + title + '</th></tr>';
		});
		innerHtml += '</thead><tbody>';

		var total = 0;
		bodyLines.forEach(function(body, i) {
			var colors = tooltip.labelColors[i];
			var style = 'background:' + colors.backgroundColor;
			style += '; border-color:' + colors.borderColor;
			style += '; border-width: 2px';
			var span = '<span class="chartjs-tooltip-key" style="' + style + '"></span>';
			
			var name = body.toString().split(': ')[0];
			var value = body.toString().split(': ')[1];
			total += parseInt(value);
			
			if(date_from != date_to) extraChar = "h";
			else extraChar = "";
			
			if(value < 1000)
				value = Math.round(value * 10) / 10 + " W" + extraChar;
			else
				value = Math.round(value / 100) / 10 + " KW" + extraChar;
				
			
			innerHtml += '<tr><td>' + span + name + ' : </td><td class="value">' + value + '</td></tr>';
		});
		innerHtml += '</tbody><tfoot>';
		
		innerHtml += '<tr><td>Total ';
		if(btnSelected == 1) innerHtml += 'Production';
		else innerHtml += 'Consumption';

		if(date_from != date_to) extraChar = "h";
		else extraChar = "";
		
		if(total < 1000)
			total = Math.round(total * 10) / 10 + " W" + extraChar;
		else
			total = Math.round(total / 100) / 10 + " KW" + extraChar;
		
		innerHtml += ': </td><td class="value">' + total + '</td></tr>';
		
		innerHtml += '</tfoot>'

		var tableRoot = tooltipEl.querySelector('table');
		tableRoot.innerHTML = innerHtml;
	}

	// Display, position, and set styles for font
	var positionY = this._chart.canvas.offsetTop;
	var positionX = this._chart.canvas.offsetLeft;

	tooltipEl.style.opacity = 1;
	
	// Y Position
	tooltipEl.style.top = this._chart.canvas.getBoundingClientRect().top + "px";

	// X Position
	var xPosition = positionX + tooltip.caretX;
	var width = tooltipEl.getBoundingClientRect().right - tooltipEl.getBoundingClientRect().left;
	
	if(xPosition - width / 2 < 10) 
		xPosition = 10 + width / 2;
	else if(xPosition + width / 2 > window.innerWidth)
		xPosition = window.innerWidth - width / 2 - 10;

	tooltipEl.style.left = xPosition + "px";
	
	tooltipEl.style.fontFamily = tooltip._fontFamily;
	tooltipEl.style.fontSize = tooltip.fontSize;
	tooltipEl.style.fontStyle = tooltip._fontStyle;
	tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
};

var config_line = {
	type: 'line',
	data: {
		labels: labels,
		datasets: [
			dataset_directConsumption,
			dataset_batteryIn,
			dataset_gridIn
		]
	}, 
	options: {
		responsive: true,
		maintainAspectRatio: false,
		legend: {
			display: 'true',
			position: 'bottom',
			labels: {
				fontSize: 14,
				fontColor: 'white',
				fontFamily: 'Raleway',
				padding: 20,
				usePointStyle: true
			}
		},
		elements: {
			line: {
				borderWidth: 0, 
				fill: false,
				tension: 0
			},
			point: {
				radius: 0,
				hitRadius: 15,
				hoverRadius: 5
			}
		},
		tooltips: {
			position: 'nearest',
			mode: 'index',
			intersect: false,
			titleMarginBottom: 10,
			titleFontFamily: 'Raleway',
			titleFontSize: 16,
			bodyFontFamily: 'Raleway',
			bodyFontSize: 14,
			bodySpacing: 10,
			xPadding: 10,
			yPadding: 10,
			cornerRadius: 0,
			caretSize: 10,
			enabled: false,
			custom: customTooltips
		},
		hover: {
			mode: 'index',
			intersect: false
		},
		scales: {
			xAxes: [{
				stacked: true,
				display: true,
				ticks: {
					beginAtZero: true,
					fontColor: 'white',
					fontFamily: 'Raleway'
				},
				gridLines: {
					display: true,
					color: '#212121'
				}
			}],
			yAxes: [{
				display: true,
				stacked: true,
				ticks: {
					callback: function(value, index, values) {
						if(value < 1000)
							return Math.round(value * 10) / 10 + " W";
						else
							return Math.round(value / 100) / 10 + " KW";
					},
					beginAtZero: true,
					min: 0,
					mirror: false,
					maxTicksLimit: 20,
					fontColor: 'white',
					fontFamily: 'Raleway'
				},
				gridLines: {
					display: true,
					color: '#212121',
					drawTicks: true
				}
			}]
		}
	}
}
var config_bar = {
	type: 'bar',
	data: {
		labels: labels,
		datasets: [
			dataset_directConsumption,
			dataset_batteryIn,
			dataset_gridIn
		]
	}, 
	options: {
		responsive: true,
		maintainAspectRatio: false,
		legend: {
			display: 'true',
			position: 'bottom',
			labels: {
				fontSize: 14,
				fontColor: 'white',
				fontFamily: 'Raleway',
				padding: 20,
				usePointStyle: true
			}
		},
		elements: {
			line: {
				borderWidth: 3, 
				fill: false,
				tension: 0.1
			},
			point: {
				radius: 3,
				hitRadius: 15,
				hoverRadius: 5
			}
		},
		tooltips: {
			position: 'nearest',
			mode: 'index',
			intersect: false,
			titleMarginBottom: 10,
			titleFontFamily: 'Raleway',
			titleFontSize: 16,
			bodyFontFamily: 'Raleway',
			bodyFontSize: 14,
			bodySpacing: 10,
			xPadding: 10,
			yPadding: 10,
			cornerRadius: 0,
			caretSize: 10,
			enabled: false,
			custom: customTooltips
		},
		hover: {
			mode: 'nearest',
			intersect: true
		},
		scales: {
			xAxes: [{
				stacked: true,
				display: true,
				ticks: {
					beginAtZero: true,
					fontColor: 'white',
					fontFamily: 'Raleway'
				},
				gridLines: {
					display: true,
					color: '#212121'
				}
			}],
			yAxes: [{
				display: true,
				stacked: true,
				ticks: {
					callback: function(value, index, values) {
						if(value < 1000)
							return Math.round(value * 10) / 10 + " Wh";
						else
							return Math.round(value / 100) / 10 + " KWh";
					},
					beginAtZero: true,
					min: 0,
					mirror: false,
					//fontSize: 10,
					maxTicksLimit: 5,
					fontColor: 'white',
					fontFamily: 'Raleway'
				},
				gridLines: {
					display: true,
					color: '#212121',
					drawTicks: true
				}
			}]
		}
	}
}

var ctx = document.getElementById("chart").getContext("2d");

var chart = new Chart(ctx, config_line);

getEnergy();










/*
	Set OnClick Listeners for all Buttons
*/

$('#btn-production').on('click', function() {
	$('#btn-production').addClass('btn-selected');
	$('#btn-consumption').removeClass('btn-selected');
	btnSelected = 1;
	
	chart.config.data.datasets = [
		dataset_directConsumption,
		dataset_batteryIn,
		dataset_gridIn
	];
	chart.update();	
});

$('#btn-consumption').on('click', function() {
	$('#btn-production').removeClass('btn-selected');
	$('#btn-consumption').addClass('btn-selected');
	btnSelected = 2;
	
	chart.config.data.datasets = [
		dataset_directConsumption,
		dataset_batteryOut,
		dataset_gridOut
	];
	chart.update();
});

$("#btnZoom").on('click', function() {
	if(zoomActive) {
		zoomActive = false;
		getEnergy(false);
	} else {
		zoomActive = true;
		getEnergy(false);
	}
});

$('#btn-calendar').daterangepicker({
	"ranges": {
		"Today": [
			moment(),
			moment()
		],
		"Yesterday": [
			moment().subtract(1, "days"),
			moment().subtract(1, "days")
		],
		"Last 7 Days": [
			moment().subtract(6, "days"),
			moment()
		],
		"Last 30 Days": [
			moment().subtract(29, "days")
		],
		"This Month": [
			moment().startOf("month"),
			moment()
		],
		"Last Month": [
			moment().subtract(1, "month").startOf("month"),
			moment().subtract(1, "month").endOf("month")
		],
		"This Year": [
			moment().startOf("year"),
			moment()
		],
		"Last 12 Months": [
			moment().subtract(11, "month").startOf("month"),
			moment()
		]
	},
	"showDropdowns": true,
	"showWeekNumbers": true,
	"locale": {
		"firstDay": 1
	},
	"autoApply": true,
	"startDate": moment().format("MM/DD/YYYY"),
	"endDate": moment().format("MM/DD/YYYY"),
	"maxDate": moment().format("MM/DD/YYYY"),
	"opens": "center"
}, function(start, end, label) {
	date_from = start.format("YYYYMMDD");
	date_to = end.format("YYYYMMDD");
	getEnergy();
});










/*
	Send Fault Code to Index.php Page
	
	Repeat every 10 seconds
*/

updateInfo();

function updateInfo() {
	$.ajax({
		type: "POST",
		url: "db-interaction/data.php",
		data: {
			"action": "getCurrentState"
		},
		complete: function (data) {
			setTimeout(function() {
				updateInfo();
			}, 5000);
		},
		success: function(response) {
			var json = JSON.parse(response);
						
			// Update Fault Notification Bar
			if(json.hasOwnProperty("16385") && json.hasOwnProperty("16386"))
				window.parent.updateFaultStatus(parseInt(
					json["16385"][Object.keys(json["16385"])[0]]["entityvalue"]
				), parseInt(
					json["16386"][Object.keys(json["16386"])[0]]["entityvalue"]
				), 
					json["16386"][Object.keys(json["16386"])[0]]["logtime"]
				);

			// Update Last Timestamp
			window.parent.updateLastTimestamp(
				json["273"][Object.keys(json["273"])[0]]['logtime']
			);
		}
	});
}










/*
	Get Energy Data
*/

function getEnergy(updateChartType = true) {
	
	// Display the correct Chart Type
	if(updateChartType) {
		if(moment(date_to).diff(moment(date_from), 'days') < 1) {
			chart.destroy();
			chart = new Chart(ctx, config_line);
			$("#btnZoom").css("display", "block");
		} else {
			chart.destroy();
			chart = new Chart(ctx, config_bar);
			$("#btnZoom").css("display", "none");
		}
	}
	
	// Prepare Chart Update
	dataset_batteryOut.data = [];
	dataset_batteryIn.data = [];
	dataset_gridOut.data = [];
	dataset_gridIn.data = [];
	dataset_directConsumption.data = [];
	if(btnSelected == 1)
		chart.config.data.datasets = [dataset_directConsumption, dataset_batteryIn, dataset_gridIn];
	else
		chart.config.data.datasets = [dataset_directConsumption, dataset_batteryOut, dataset_gridOut];
	
	
	
	if(moment(date_to).diff(moment(date_from), 'days') < 1) {
		
		// GET POWER DATA FOR SELECTED DAY
		
		// Make Labels
		var quarterHours = ["00", "15", "30", "45"];
		var labels = [];
		
		if(zoomActive) { // 05:00 - 21:00
			for(var i = 5; i < 21; i++){
				for(var j = 0; j < 4; j++){
					var time = i + ":" + quarterHours[j];
					if(i < 10) time = "0" + time;
					labels.push(time);
				}
			}
		} else { // 00:00 - 24:00
			for(var i = 0; i < 24; i++){
				for(var j = 0; j < 4; j++){
					var time = i + ":" + quarterHours[j];
					if(i < 10) time = "0" + time;
					labels.push(time);
				}
			}
		}
		
		// Get Data For Selected Day
		$.ajax({
			type: "POST",
			url: "db-interaction/data.php",
			data: {
				"action": "getPowerData",
				"type": date_from,
				"entity": "40"
			},
			success: function(result) {
				if(result != "0")
					data_batteryOut = convertStringsToIntegers(result.split(" "));
				else 
					data_batteryOut = [0];
					
				if(zoomActive) {
					if(data_batteryOut.length > 84)
						data_batteryOut = data_batteryOut.slice(20, 84);
					else if(data_batteryOut.length > 20)
						data_batteryOut = data_batteryOut.slice(20);
				}
				
				// Update Data
				dataset_batteryOut.data = data_batteryOut;
				// Update Chart
				if(btnSelected == 2) {
					chart.config.data.datasets.push = dataset_batteryOut;
					chart.update();
				}
			}
		});
		$.ajax({
			type: "POST",
			url: "db-interaction/data.php",
			data: {
				"action": "getPowerData",
				"type": date_from,
				"entity": "41"
			},
			success: function(result) {
				if(result != "0")
					data_batteryIn = convertStringsToIntegers(result.split(" "));
				else
					data_batteryIn = [0];
				
				if(zoomActive) {
					if(data_batteryIn.length > 84)
						data_batteryIn = data_batteryIn.slice(20, 84);
					else if(data_batteryIn.length > 20)
						data_batteryIn = data_batteryIn.slice(20);
				}
				
				// Update Data
				dataset_batteryIn.data = data_batteryIn;
				// Update Chart
				if(btnSelected == 1) {
					chart.config.data.datasets.push = dataset_batteryIn;
					chart.update();
				}
			}
		});
		$.ajax({
			type: "POST",
			url: "db-interaction/data.php",
			data: {
				"action": "getPowerData",
				"type": date_from,
				"entity": "10"
			},
			success: function(result) {
				if(result != "0")
					data_gridOut = convertStringsToIntegers(result.split(" "));
				else
					data_gridOut = [0];
				
				if(zoomActive) {
					if(data_gridOut.length > 84)
						data_gridOut = data_gridOut.slice(20, 84);
					else if(data_gridOut.length > 20)
						data_gridOut = data_gridOut.slice(20);
				}
					
				// Update Data
				dataset_gridOut.data = data_gridOut;
				// Update Chart
				if(btnSelected == 2) {
					chart.config.data.datasets.push = dataset_gridOut;
					chart.update();
				}
			}
		});
		$.ajax({
			type: "POST",
			url: "db-interaction/data.php",
			data: {
				"action": "getPowerData",
				"type": date_from,
				"entity": "11"
			},
			success: function(result) {
				if(result != "0")
					data_gridIn = convertStringsToIntegers(result.split(" "));
				else
					data_gridIn = [0];
					
				if(zoomActive) {
					if(data_gridIn.length > 84)
						data_gridIn = data_gridIn.slice(20, 84);
					else if(data_gridIn.length > 20)
						data_gridIn = data_gridIn.slice(20);
				}
				
				// Update Data
				dataset_gridIn.data = data_gridIn;
				// Update Chart
				if(btnSelected == 1) {
					chart.config.data.datasets.push = dataset_gridIn;
					chart.update();
				}
			}
		});
		$.ajax({
			type: "POST",
			url: "db-interaction/data.php",
			data: {
				"action": "getPowerData",
				"type": date_from,
				"entity": "61"
			},
			success: function(result) {
				if(result != "0") 
					data_directConsumption = convertStringsToIntegers(result.split(" "));
				else
					data_directConsumption = [0];
				
				if(zoomActive) {
					if(data_directConsumption.length > 84)
						data_directConsumption = data_directConsumption.slice(20, 84);
					else if(data_directConsumption.length > 20)
						data_directConsumption = data_directConsumption.slice(20);
				}
				
				// Update Data
				dataset_directConsumption.data = data_directConsumption;
				// Update Chart
				chart.config.data.datasets.push = dataset_directConsumption;
				chart.update();
			}
		});
		
	} else if(moment(date_to).diff(moment(date_from), 'months') < 2) {
		
		// GET DAILY DATA
		
		var startDate = moment(date_from);
		var endDate = moment(date_to);
		var days = [];
		var day = startDate;
		labels = [];
		
		while(day <= endDate) {
			days.push(day.format("YYYYMMDD"));
			labels.push(day.format("DD. MMM YY"));
			day = day.clone().add(1, 'd');
		}
		
		getEnergy_daily(days);
		
	} else if(moment(date_to).diff(moment(date_from), 'years') < 2) {
		
		// GET MONTHLY DATA
		
		// Make IDs
		var startDate = moment(date_from).startOf("month");
		var endDate = moment(date_to).endOf("month");
		var days = [];
		var day = startDate;
		
		while(day <= endDate) {
			days.push(day.format("YYYYMMDD"));
			day = day.clone().add(1, 'd');
		}
		
		// Make Labels
		var startMonth = moment(date_from).startOf("month");
		var endMonth = moment(date_to).endOf("month");
		var month = startMonth;
		labels = [];
		
		while(month <= endMonth) {
			labels.push(month.format("MMM YYYY"));
			month = month.clone().add(1, 'M');
		}
		
		getEnergy_monthly(days);
		
	} else {
		
		// GET YEARLY DATA
		
		// Make IDs
		var startDate = moment(date_from).startOf("year");
		var endDate = moment(date_to).endOf("year");
		var days = [];
		var day = startDate;
		
		while(day <= endDate) {
			days.push(day.format("YYYYMMDD"));
			day = day.clone().add(1, 'd');
		}
		
		// Make Labels
		var startYear = moment(date_from).startOf("year");
		var endYear = moment(date_to).endOf("year");
		var year = startYear;
		labels = [];
		
		while(year <= endYear) {
			labels.push(year.format("YYYY"));
			year = year.clone().add(1, 'Y');
		}
		
		getEnergy_yearly(days);
		
	}
	
	
	
	// Update Chart
	chart.config.data.labels = labels;
	chart.update();
}










function getEnergy_daily(days) {
	// updateBatteryOut
	$.ajax({
		type: "POST",
		url: "db-interaction/data.php",
		data: {
			"action": "getEnergyData",
			"type": days.join(),
			"entity": "40" // 0 = Energy/Hour | 1 = Energy/Day
		},
		success: function(result) {
			// Update Data
			data_batteryOut = convertStringsToIntegers(result.split(","));
			dataset_batteryOut.data = data_batteryOut;
			// Update Chart
			if(btnSelected == 2) {
				chart.config.data.datasets.push = dataset_batteryOut;
				chart.update();
			}
		}
	});
	// updateBatteryIn
	$.ajax({
		type: "POST",
		url: "db-interaction/data.php",
		data: {
			"action": "getEnergyData",
			"type": days.join(),
			"entity": "41" // 0 = Energy/Hour | 1 = Energy/Day
		},
		success: function(result) {
			// Update Data
			data_batteryIn = convertStringsToIntegers(result.split(","));
			dataset_batteryIn.data = data_batteryIn;
			// Update Chart
			if(btnSelected == 1) {
				chart.config.data.datasets.push = dataset_batteryIn;
				chart.update();
			}
		}
	});
	// updateGridOut
	$.ajax({
		type: "POST",
		url: "db-interaction/data.php",
		data: {
			"action": "getEnergyData",
			"type": days.join(),
			"entity": "10" // 0 = Energy/Hour | 1 = Energy/Day
		},
		success: function(result) {
			// Update Data
			data_gridOut = convertStringsToIntegers(result.split(","));
			dataset_gridOut.data = data_gridOut;
			// Update Chart
			if(btnSelected == 2) {
				chart.config.data.datasets.push = dataset_gridOut;
				chart.update();
			}
		}
	});
	// updateGridIn
	$.ajax({
		type: "POST",
		url: "db-interaction/data.php",
		data: {
			"action": "getEnergyData",
			"type": days.join(),
			"entity": "11" // 0 = Energy/Hour | 1 = Energy/Day
		},
		success: function(result) {
			// Update Data
			data_gridIn = convertStringsToIntegers(result.split(","));
			dataset_gridIn.data = data_gridIn;
			// Update Chart
			if(btnSelected == 1) {
				chart.config.data.datasets.push = dataset_gridIn;
				chart.update();
			}
		}
	});
	// updateDirectConsumption
	$.ajax({
		type: "POST",
		url: "db-interaction/data.php",
		data: {
			"action": "getEnergyData",
			"type": days.join(),
			"entity": "61" // 0 = Energy/Hour | 1 = Energy/Day
		},
		success: function(result) {
			// Update Data
			data_directConsumption = convertStringsToIntegers(result.split(","));
			dataset_directConsumption.data = data_directConsumption;
			// Update Chart
			chart.config.data.datasets.push = dataset_directConsumption;
			chart.update();
		}
	});
}





function getEnergy_monthly(days) {
	// updateBatteryOut
	$.ajax({
		type: "POST",
		url: "db-interaction/data.php",
		data: {
			"action": "getEnergyData",
			"type": days.join(),
			"entity": "40" // 0 = Energy/Hour | 1 = Energy/Day
		},
		success: function(result) {
			// Read Data + Calculate To Months
			resultArray = convertStringsToIntegers(result.split(","));
			// Update Data
			data_batteryOut = calculateMonthlyEnergy(resultArray);
			dataset_batteryOut.data = data_batteryOut;
			// Update Chart
			if(btnSelected == 2) {
				chart.config.data.datasets.push = dataset_batteryOut;
				chart.update();
			}
		}
	});
	// updateBatteryIn
	$.ajax({
		type: "POST",
		url: "db-interaction/data.php",
		data: {
			"action": "getEnergyData",
			"type": days.join(),
			"entity": "41" // 0 = Energy/Hour | 1 = Energy/Day
		},
		success: function(result) {
			// Read Data + Calculate To Months			
			resultArray = convertStringsToIntegers(result.split(","));
			// Update Data
			data_batteryIn = calculateMonthlyEnergy(resultArray);
			dataset_batteryIn.data = data_batteryIn;
			// Update Chart
			if(btnSelected == 1) {
				chart.config.data.datasets.push = dataset_batteryIn;
				chart.update();
			}
		}
	});
	// updateGridOut
	$.ajax({
		type: "POST",
		url: "db-interaction/data.php",
		data: {
			"action": "getEnergyData",
			"type": days.join(),
			"entity": "10" // 0 = Energy/Hour | 1 = Energy/Day
		},
		success: function(result) {
			// Read Data + Calculate To Months			
			resultArray = convertStringsToIntegers(result.split(","));
			// Update Data
			data_gridOut = calculateMonthlyEnergy(resultArray);
			dataset_gridOut.data = data_gridOut;
			// Update Chart
			if(btnSelected == 2) {
				chart.config.data.datasets.push = dataset_gridOut;
				chart.update();
			}
		}
	});
	// updateGridIn
	$.ajax({
		type: "POST",
		url: "db-interaction/data.php",
		data: {
			"action": "getEnergyData",
			"type": days.join(),
			"entity": "11" // 0 = Energy/Hour | 1 = Energy/Day
		},
		success: function(result) {
			// Read Data + Calculate To Months			
			resultArray = convertStringsToIntegers(result.split(","));
			// Update Data
			data_gridIn = calculateMonthlyEnergy(resultArray);
			dataset_gridIn.data = data_gridIn;
			// Update Chart
			if(btnSelected == 1) {
				chart.config.data.datasets.push = dataset_gridIn;
				chart.update();
			}
		}
	});
	// updateDirectConsumption
	$.ajax({
		type: "POST",
		url: "db-interaction/data.php",
		data: {
			"action": "getEnergyData",
			"type": days.join(),
			"entity": "61" // 0 = Energy/Hour | 1 = Energy/Day
		},
		success: function(result) {
			// Read Data + Calculate To Months			
			resultArray = convertStringsToIntegers(result.split(","));
			// Update Data
			data_directConsumption = calculateMonthlyEnergy(resultArray);
			dataset_directConsumption.data = data_directConsumption;
			// Update Chart
			chart.config.data.datasets.push = dataset_directConsumption;
			chart.update();
		}
	});
}





function getEnergy_yearly(days) {
	// updateBatteryOut
	$.ajax({
		type: "POST",
		url: "db-interaction/data.php",
		data: {
			"action": "getEnergyData",
			"type": days.join(),
			"entity": "40" // 0 = Energy/Hour | 1 = Energy/Day
		},
		success: function(result) {
			// Read Data + Calculate To Years
			resultArray = convertStringsToIntegers(result.split(","));
			// Update Data
			data_batteryOut = calculateYearlyEnergy(resultArray);
			dataset_batteryOut.data = data_batteryOut;
			// Update Chart
			if(btnSelected == 2) {
				chart.config.data.datasets.push = dataset_batteryOut;
				chart.update();
			}
		}
	});
	// updateBatteryIn
	$.ajax({
		type: "POST",
		url: "db-interaction/data.php",
		data: {
			"action": "getEnergyData",
			"type": days.join(),
			"entity": "41" // 0 = Energy/Hour | 1 = Energy/Day
		},
		success: function(result) {
			// Read Data + Calculate To Months			
			resultArray = convertStringsToIntegers(result.split(","));
			// Update Data
			data_batteryIn = calculateYearlyEnergy(resultArray);
			dataset_batteryIn.data = data_batteryIn;
			// Update Chart
			if(btnSelected == 1) {
				chart.config.data.datasets.push = dataset_batteryIn;
				chart.update();
			}
		}
	});
	// updateGridOut
	$.ajax({
		type: "POST",
		url: "db-interaction/data.php",
		data: {
			"action": "getEnergyData",
			"type": days.join(),
			"entity": "10" // 0 = Energy/Hour | 1 = Energy/Day
		},
		success: function(result) {
			// Read Data + Calculate To Months			
			resultArray = convertStringsToIntegers(result.split(","));
			// Update Data
			data_gridOut = calculateYearlyEnergy(resultArray);
			dataset_gridOut.data = data_gridOut;
			// Update Chart
			if(btnSelected == 2) {
				chart.config.data.datasets.push = dataset_gridOut;
				chart.update();
			}
		}
	});
	// updateGridIn
	$.ajax({
		type: "POST",
		url: "db-interaction/data.php",
		data: {
			"action": "getEnergyData",
			"type": days.join(),
			"entity": "11" // 0 = Energy/Hour | 1 = Energy/Day
		},
		success: function(result) {
			// Read Data + Calculate To Months			
			resultArray = convertStringsToIntegers(result.split(","));
			// Update Data
			data_gridIn = calculateYearlyEnergy(resultArray);
			dataset_gridIn.data = data_gridIn;
			// Update Chart
			if(btnSelected == 1) {
				chart.config.data.datasets.push = dataset_gridIn;
				chart.update();
			}
		}
	});
	// updateDirectConsumption
	$.ajax({
		type: "POST",
		url: "db-interaction/data.php",
		data: {
			"action": "getEnergyData",
			"type": days.join(),
			"entity": "61" // 0 = Energy/Hour | 1 = Energy/Day
		},
		success: function(result) {
			// Read Data + Calculate To Months			
			resultArray = convertStringsToIntegers(result.split(","));
			// Update Data
			data_directConsumption = calculateYearlyEnergy(resultArray);
			dataset_directConsumption.data = data_directConsumption;
			// Update Chart
			chart.config.data.datasets.push = dataset_directConsumption;
			chart.update();
		}
	});
}





function calculateMonthlyEnergy(arr) {
	var dataArray = [];
	
	var startMonth = moment(date_from).startOf("month");
	var endMonth = moment(date_to).endOf("month");
	var month = startMonth;

	var indexNum = 0;
	while(month <= endMonth) {
		var monthTotal = 0;
		daysInMonth = moment(month).daysInMonth();
		for(var x = 0; x < daysInMonth; x++) {
			monthTotal += arr[indexNum];
			indexNum++;
		}
		dataArray.push(monthTotal);
		month = month.clone().add(1, 'M');
	}
	
	return dataArray;
}





function calculateYearlyEnergy(arr) {
	var dataArray = [];
	
	var startYear = moment(date_from).startOf("year");
	var endYear = moment(date_to).endOf("year");
	var year = startYear;

	var indexNum = 0;
	while(year <= endYear) {
		var yearTotal = 0;
		var start = moment(year).startOf("year");
		var end = moment(year).endOf("year");
		daysInYear = end.diff(start, "days") + 1;
		for(var x = 0; x < daysInYear; x++) {
			yearTotal += arr[indexNum];
			indexNum++;
		}
		dataArray.push(yearTotal);
		year = year.clone().add(1, 'Y');
	}
	
	return dataArray;
}










/*
	Helper Functions - used to overcome some JS-related issues
*/

function convertStringsToIntegers(arr) {
	list = arr;
	for(var i = 0; i < list.length; i++)
		list[i] = parseInt(list[i], 10);
	return list;
}

// Round Number to X decimal places (in order to avoid 230.70000000000002)
function round(value, precision) {
	var multiplier = Math.pow(10, precision || 0);
	return Math.round(value * multiplier) / multiplier;
}