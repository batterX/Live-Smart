Notification.requestPermission();

/*
	Set Warnings Begin Variables State
*/
	
var lastWarningTime = new Date("2000-01-01T01:01:01");
var lastWarningList = [];










$(document).ready(function () {
	
	/*
		Initialize Notifications
	*/
	
	initNotifications();
	
	// Load the 10 latest Warnings for the current device
	function initNotifications()
	{
		lastWarningTime = new Date("2000-01-01T01:01:01");
		lastWarningList = [];
		
		$("#notif-container").html("");
		
		$.ajax({
			type: "POST",
				url: "db-interaction/data.php",
			data: {
				"action": "getWarningsData",
				"count": "10"
			},
			success: function(response) {
				var json = JSON.parse(response);
				for(var x = 0; x < json.length; x++) 
				{
					if(lastWarningTime <= new Date(json[x]['logtime'].replace(" ", "T"))) 
					{
						if(json[x]['entityvalue'] != "") {
							
							var tempList = json[x]['entityvalue'].split(" ");
						
							for(var y = 0; y < tempList.length; y++) 
							{
								if(!lastWarningList.includes(tempList[y])) 
								{
									var article = "";
									article = 	"<article>";
									article += 		"<div class='row notif-head'>";
									article += 			"<img src='img/notif-orange.png' class='notif-circle'/>";
									article += 			"<h4>" + warningsList[tempList[y]][0] + "</h4>";
									article += 		"</div>";
									article += 		"<div class='row'>";
									article += 			"<div class='notif-bar'/>";
									article += 			"<div class='notif-desc'>";
									article += 				"<img src='img/under.png' class='img-under'/>";
									article += 				"<p class='time'>" + convertDate(json[x]['logtime']) + "</p>";
									article += 				"<p>" + warningsList[tempList[y]][1] + "</p>";
									article += 			"</div>";
									article += 		"</div>";
									article += 	"</article>";

									$("#notif-container").html(article + $("#notif-container").html());
								}
							}

							lastWarningList = json[x]['entityvalue'].split(" ");
							
						} else {
							
							lastWarningList = [];
							
						}
					}
				}
				
				updateActiveNotifications();

				lastWarningTime = new Date(json[json.length-1]['logtime'].replace(" ", "T"));
			}
		});
	}
	
	
	
	
	
	/*
		Set OnClick Listeners for Left & Right Side Drawer's Buttons
	*/
	
	// Notification Button Click
	$('#btnNotification').click(function() {
		$('#slider-right').offcanvas({
			placement: 'right',
			autohide: 'true'
		});
		$('#slider-right').offcanvas('show');
	});
	
	// Sliders Click
	$('#slider-left').click(function() {
		if(window.innerHeight > window.innerWidth) {
			setTimeout(function() {
				$("#slider-left").offcanvas('hide');
			}, 200);
		}
	});
	$('#slider-right').click(function() {
		setTimeout(function() {
			$("#slider-right").offcanvas('hide');
		}, 200);
	});
	
	// Buttons in Left-Side-Drawer Click
	$('#live').click(function() {
		$('#frame').attr("src", "live.html");
		$('#title').html("LIVE");
		toggleActive("live");
	});
	$('#energy').click(function() {
		$('#frame').attr("src", "energy.html");
		$('#title').html("ENERGY");
		toggleActive("energy");
	});
	$('#device').click(function() {
		$('#frame').attr("src", "device.html");
		$('#title').html("SYSTEM");
		toggleActive("device");
	});
	
	function toggleActive(id) {
		$("#"+id).find("h4").addClass("active");
		if(id != 'live') $("#live").find("h4").removeClass("active");
		if(id != 'energy') $("#energy").find("h4").removeClass("active");
		if(id != 'device') $("#device").find("h4").removeClass("active");
	}
	
	
	
	
	
	/*
		Update Notification Drawer Every 10 Seconds
	*/
	
	setTimeout(function() {
		updateNotifications();
	}, 10000);
	
	
	
	
	
	/*
		Functions related to updating the Notifications Drawer
	*/
	
	// Check if there is a new Warning for the current device
	function updateNotifications()
	{
		$.ajax({
			type: "POST",
			url: "db-interaction/data.php",
			data: {
				"action": "getWarningsData",
				"count": "1",
			},
			complete: function (data) {
				setTimeout(function() {
					updateNotifications();
				}, 5000);
			},
			success: function (response) {
				var json = JSON.parse(response);
				for(var x = 0; x < json.length; x++) 
				{
					if(lastWarningTime <= new Date(json[x]['logtime'].replace(" ", "T"))) 
					{
						if(json[x]['entityvalue'] != "") {
							
							var tempList = json[x]['entityvalue'].split(" ");
						
							var flag = false;
							
							for(var y = 0; y < tempList.length; y++) 
							{
								if(!lastWarningList.includes(tempList[y])) 
								{
									var article = "";
									article = 	"<article>";
									article += 		"<div class='row notif-head'>";
									article += 			"<img src='img/notif-orange.png' class='notif-circle'/>";
									article += 			"<h4>" + warningsList[tempList[y]][0] + "</h4>";
									article += 		"</div>";
									article += 		"<div class='row'>";
									article += 			"<div class='notif-bar'/>";
									article += 			"<div class='notif-desc'>";
									article += 				"<img src='img/under.png' class='img-under'/>";
									article += 				"<p class='time'>" + convertDate(json[x]['logtime']) + "</p>";
									article += 				"<p>" + warningsList[tempList[y]][1] + "</p>";
									article += 			"</div>";
									article += 		"</div>";
									article += 	"</article>";

									$("#notif-container").html(article + $("#notif-container").html());
								
									flag = true;
								}
							}
							
							if(flag && window.Notification && Notification.permission !== "denied") {
								Notification.requestPermission(function(status) {  // status is "granted", if accepted by user
									var n = new Notification('WARNINGS UPDATE', { 
										body: 'One or more new warnings have occured.'
									}); 
								});
							}

							lastWarningList = json[x]['entityvalue'].split(" ");
							
						} else {
							
							lastWarningList = [];
							
						}
					}
				}
				
				updateActiveNotifications();
								
				lastWarningTime = new Date(json[json.length-1]['logtime'].replace(" ", "T"));
			}
		});
	}
	
});










function updateActiveNotifications() 
{
	$("#notif-active .warnings").html("<div class='row notif-head-active'><h4 style='color:white; letter-spacing: 0.75vh;'><b>ACTIVE WARNINGS<b></h4></div>");
	
	for(var y = 0; y < lastWarningList.length; y++) {
		var article = "";
		article = 	"<div class='row notif-head-active'>";
		article += 		"<h4>" + warningsList[lastWarningList[y]][0] + "</h4>";
		article += 	"</div>";
		
		$("#notif-active .warnings").append(article);
	}
	
	if(lastWarningList.length == 0) {
		$("#notif-active .warnings").append("<div class='row notif-head-active'><h4>THERE ARE NO WARNINGS</h4></div>");
		$(".button-badge").css("display", "none");
	} else {
		$(".button-badge").text((lastWarningList.length).toString());
		$(".button-badge").css("color", "orange");
		$(".button-badge").css("border-color", "orange");
		$(".button-badge").css("display", "block");
	}
	
	if($("#notif-active .faults").text() != "") {
		$(".notification").attr("src", "img/notification-red.png");
		$(".button-badge").text((lastWarningList.length + 1).toString());
		$(".button-badge").css("color", "red");
		$(".button-badge").css("border-color", "red");
		$(".button-badge").css("display", "block");
	} else {
		$(".notification").attr("src", "img/notification-white.png");
	}
}










/*
	Functions related to updating the Notifications Drawer
*/

var blinkInterval = null;

// Listens to Call that a Fault has occured (called from Iframe View)
function updateFaultStatus(flag, fault, logtime) 
{
	if(flag) {
		
		$(".notifbar").css("display", "block");
		$("#notifbar-icon").attr("src", "img/notification-red.png");
		$("#notifbar-text").css("color", "red");
		$("#notifbar-text").html(warningsList[fault][0]);
		
		if(blinkInterval == null) {
			// Blink the TextView
			blinkInterval = setInterval(function() {
				$("#notifbar-parent").css('visibility' , $("#notifbar-parent").css('visibility') === 'hidden' ? '' : 'hidden');
				$(".notification").attr("src", "img/notification-red.png");
				$(".notification").css('visibility' , $(".notification").css('visibility') === 'hidden' ? '' : 'hidden');
				$(".button-badge").css('visibility' , $(".button-badge").css('visibility') === 'hidden' ? '' : 'hidden');
			}, 500);
			
			// Add Fault to Active Warnings
			var article = "";
			article = 	"<div class='row notif-head-active'>";
			article += 		"<h4 style='color: red;'>" + warningsList[fault][0] + "</h4>";
			article += 	"</div>";
			$("#notif-active .faults").append(article);
			
			// Add Fault to top of Notifications
			var article = "";
			article = 	"<article>";
			article += 		"<div class='row notif-head'>";
			article += 			"<img src='img/notif-red.png' class='notif-circle'/>";
			article += 			"<h4>" + warningsList[fault][0] + "</h4>";
			article += 		"</div>";
			article += 		"<div class='row'>";
			article += 			"<div class='notif-bar'/>";
			article += 			"<div class='notif-desc'>";
			article += 				"<img src='img/under.png' class='img-under'/>";
			article += 				"<p class='time'>" + convertDate(logtime) + "</p>";
			article += 				"<p>" + warningsList[fault][1] + "</p>";
			article += 			"</div>";
			article += 		"</div>";
			article += 	"</article>";
			$("#notif-container").html(article + $("#notif-container").html());		
		
			if(flag && window.Notification && Notification.permission !== "denied") {
				Notification.requestPermission(function(status) {  // status is "granted", if accepted by user
					var n = new Notification('FAULT: ' + warningsList[fault][0], { 
						body: warningsList[fault][1]
					}); 
				});
			}
		}
		
	} else {
		
		$(".notifbar").css("display", "none");
		$("#notifbar-icon").attr("src", "img/mail.png");
		$("#notifbar-text").css("color", "#7b7b7b");
		$("#notifbar-text").html("Send statistics on my email");
		
		// Disable blinking
		if(blinkInterval != null) {
			clearInterval(blinkInterval);
			blinkInterval = null;
			$("#notifbar-parent").css('visibility', 'visible');
			$(".notification").css('visibility', 'visible');
			$(".button-badge").css('visibility', 'visible');
			
			$("#notif-active .faults").html("");
		}
		
	}
}

// Listens to Call to update the Last Timestamp (called from Iframe View)
function updateLastTimestamp(str) 
{	
	$("#notif-lastupdate").html("<div class='row notif-head-active'><h4 style='color:white; letter-spacing: 0.75vh;'><b>LAST TIMESTAMP<b></h4></div>");
	
	$("#notif-lastupdate").append("<div class='row notif-head-active'><h4 class='last-timestamp'>" + convertDate(str) + "</h4></div>");
}










/*
	Helper Functions - used to overcome some JS-related issues
*/
	
// Round Number to X decimal places (in order to avoid 230.70000000000002)
function round(value, precision) {
	var multiplier = Math.pow(10, precision || 0);
	return Math.round(value * multiplier) / multiplier;
}
	
// Convert Date from Database to Local Time
function convertDate(dateStr) {
	var utc = moment.utc(dateStr).toDate();
	return moment(utc).local().format("YYYY-MM-DD HH:mm:ss")
}