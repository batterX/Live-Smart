var loadedLabels = false; // Overlay (when updating page)
var loadedCurrentState = false; // Overlay (when updating page)





$('#btn1').on('click', function() {
	var flag = confirm("Press 'OK' to Toggle the Switch");
	if(!flag) return;
	
	$.ajax({
		type: "POST",
		url: "db-interaction/gpio.php",
		data: { 
			"btn1": $('#btn1').val()
		}, 
		success: function (response) {
			if(!response) alert("Error!");
		},
		error: function () {
			alert("AJAX Error!");
		}
	});
});

$('#btn2').on('click', function() {
	var flag = confirm("Press 'OK' to Toggle the Switch");
	if(!flag) return;
	
	$.ajax({
		type: "POST",
		url: "db-interaction/gpio.php",
		data: { 
			"btn2": $('#btn2').val() 
		}, 
		success: function (response) {
			if(!response) alert("Error!");
		},
		error: function () {
			alert("AJAX Error!");
		}
	});
});

$('#btn3').on('click', function() {
	var flag = confirm("Press 'OK' to Toggle the Switch");
	if(!flag) return;
	
	$.ajax({
		type: "POST",
		url: "db-interaction/gpio.php",
		data: { 
			"btn3": $('#btn3').val() 
		}, 
		success: function (response) {
			if(!response) alert("Error!");
		},
		error: function () {
			alert("AJAX Error!");
		}
	});
});

$('#btn4').on('click', function() {
	var flag = confirm("Press 'OK' to Toggle the Switch");
	if(!flag) return;
	
	$.ajax({
		type: "POST",
		url: "db-interaction/gpio.php",
		data: { 
			"btn4": $('#btn4').val() 
		}, 
		success: function (response) {
			if(!response) alert("Error!");
		},
		error: function () {
			alert("AJAX Error!");
		}
	});
});





// LOAD GPIO's LABELS

$.ajax({
	type: "POST",
	url: "db-interaction/service.php",
	data: { "action": "getLabels" },
	success: function (response) {
		// Format Response To JSON
		var json = JSON.parse(response);

		if(json.hasOwnProperty('BxOutPin')) {
			if(json['BxOutPin'].hasOwnProperty('1') && json['BxOutPin']['1'] != null && json['BxOutPin']['1'] != "") $('#out1 .name').html(json['BxOutPin']['1']);
			else $('#out1 .name').html("Output 1");
			if(json['BxOutPin'].hasOwnProperty('2') && json['BxOutPin']['2'] != null && json['BxOutPin']['2'] != "") $('#out2 .name').html(json['BxOutPin']['2']);
			else $('#out2 .name').html("Output 2");
			if(json['BxOutPin'].hasOwnProperty('3') && json['BxOutPin']['3'] != null && json['BxOutPin']['3'] != "") $('#out3 .name').html(json['BxOutPin']['3']);
			else $('#out3 .name').html("Output 3");
			if(json['BxOutPin'].hasOwnProperty('4') && json['BxOutPin']['4'] != null && json['BxOutPin']['4'] != "") $('#out4 .name').html(json['BxOutPin']['4']);
			else $('#out4 .name').html("Output 4");
		}
		
		if(json.hasOwnProperty('BxInPin')) {
			if(json['BxInPin'].hasOwnProperty('1') && json['BxInPin']['1'] != null && json['BxInPin']['1'] != "") $('#in1 .name').html(json['BxInPin']['1']);
			else $('#in1 .name').html("Input 1");
			if(json['BxInPin'].hasOwnProperty('2') && json['BxInPin']['2'] != null && json['BxInPin']['2'] != "") $('#in2 .name').html(json['BxInPin']['2']);
			else $('#in2 .name').html("Input 2");
			if(json['BxInPin'].hasOwnProperty('3') && json['BxInPin']['3'] != null && json['BxInPin']['3'] != "") $('#in3 .name').html(json['BxInPin']['3']);
			else $('#in3 .name').html("Input 3");
			if(json['BxInPin'].hasOwnProperty('4') && json['BxInPin']['4'] != null && json['BxInPin']['4'] != "") $('#in4 .name').html(json['BxInPin']['4']);
			else $('#in4 .name').html("Input 4");
		}
		
		if(json.hasOwnProperty('Switch')) {
			if(json['Switch'].hasOwnProperty('1') && json['Switch']['1'] != null && json['Switch']['1'] != "") $('#btn1Name').html(json['Switch']['1']);
			else $('#btn1Name').html("Switch 1");
			if(json['Switch'].hasOwnProperty('2') && json['Switch']['2'] != null && json['Switch']['2'] != "") $('#btn2Name').html(json['Switch']['2']);
			else $('#btn2Name').html("Switch 2");
			if(json['Switch'].hasOwnProperty('3') && json['Switch']['3'] != null && json['Switch']['3'] != "") $('#btn3Name').html(json['Switch']['3']);
			else $('#btn3Name').html("Switch 3");
			if(json['Switch'].hasOwnProperty('4') && json['Switch']['4'] != null && json['Switch']['4'] != "") $('#btn4Name').html(json['Switch']['4']);
			else $('#btn4Name').html("Switch 4");
		}
		
		if(loadedCurrentState) $('.overlay').fadeOut(); // Overlay (when updating page)
		else loadedLabels = true; // Overlay (when updating page)
	}
});





// UPDATE BUTTONS STATUS

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
			}, 1000);
			
			if(loadedLabels) $('.overlay').fadeOut(); // Overlay (when updating page)
			else loadedCurrentState = true; // Overlay (when updating page)
		},
		success: function (response) {
			
			// Format Response To JSON
			var json = JSON.parse(response);
			
			// Update Last Timestamp in Index.php	
			window.parent.updateLastTimestamp(
				json["273"][Object.keys(json["273"])[0]]['logtime']
			);
				
			// Update Fault Notification Bar
			if(json.hasOwnProperty("16385") && json.hasOwnProperty("16386"))
				window.parent.updateFaultStatus(parseInt(
					json["16385"][Object.keys(json["16385"])[0]]["entityvalue"]
				), parseInt(
					json["16386"][Object.keys(json["16386"])[0]]["entityvalue"]
				), 
					json["16386"][Object.keys(json["16386"])[0]]["logtime"]
				);
			
			// Inputs
			if(json.hasOwnProperty('2321')) {
				for(var x = 1; x < 5; x++) {
					var y = x.toString();
					if(json['2321'].hasOwnProperty(y)) {
						if(json['2321'][y]['entityvalue'] == 1) {
							$("#in"+y+" .status").removeClass('red').addClass('green');
							$("#in"+y+" .status").html('ON');
						} else {
							$("#in"+y+" .status").removeClass('green').addClass('red');
							$("#in"+y+" .status").html('OFF');
						}
					}
				}
			}
			
			// Outputs
			if(json.hasOwnProperty('2337')) {
				for(var x = 1; x < 5; x++) {
					var y = x.toString();
					if(json['2337'].hasOwnProperty(y)) {
						if(json['2337'][y]['entityvalue'] == 1) {
							$("#out"+y+" .status").removeClass('red').addClass('green');
							$("#out"+y+" .status").html('ON');
						} else {
							$("#out"+y+" .status").removeClass('green').addClass('red');
							$("#out"+y+" .status").html('OFF');
						}
					}
				}
			}
			
			// Buttons
			if(json.hasOwnProperty('2325')) {
				for(var x = 1; x < 5; x++) {
					var y = x.toString();
					if(json['2325'].hasOwnProperty(y)) {
						if(json['2325'][y]['entityvalue'] == 1) {
							$('#btn'+y).addClass('active');
							$("#btn"+y).val("0");
						} else {
							$('#btn'+y).removeClass('active');
							$("#btn"+y).val("1");
						}
					}
				}
			}
		
		}
	});
	
}