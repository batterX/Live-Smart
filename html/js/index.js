// Set Warnings Begin Variables State
var lastWarningTime = new Date("2000-01-01T01:01:01");
var lastWarningList = [];





$(document).ready(function () {
	
	
	var model = "";
	
	
	
	
	
	// Build Warning
	function buildWarning(title, desc, logtime) {
		var article = "";
		article = 	"<article>";
		article += 		"<div class='row notif-head'>";
		article += 			"<img src='img/notif-orange.png' class='notif-circle'/>";
		article += 			"<h4>" + title + "</h4>";
		article += 		"</div>";
		article += 		"<div class='row'>";
		article += 			"<div class='notif-bar'/>";
		article += 			"<div class='notif-desc'>";
		article += 				"<img src='img/under.png' class='img-under'/>";
		article += 				"<p class='time'>" + logtime + "</p>";
		article += 				"<p>" + desc + "</p>";
		article += 			"</div>";
		article += 		"</div>";
		article += 	"</article>";
		return article;
	}
	
	
	
	
	
	// Initialize Notifications
	// Load the 10 latest Warnings for the current device
	initNotifications();
	function initNotifications() {
		
		// Show Overlay
		$('.overlay').show();
		
		// Get Device Model
		$.ajax({
			type: "POST",
			url: "db-interaction/data.php",
			data: {
				"action": "getDeviceModel"
			},
			success: function (response) {
				// Hide Overlay
				$('.overlay').fadeOut();
			}
		});
		
		// Reset Variables
		lastWarningTime = new Date("2000-01-01T01:01:01");
		lastWarningList = [];
		$("#notif-container").html("");
		
		// Get Latest 10 Warnings
		$.ajax({
			type: "POST",
			url: "db-interaction/data.php",
			data: {
				"action": "getWarningsData",
				"count": "10"
			},
			success: function(response) {
				// Parse Result to JSON
				var json = JSON.parse(response);
				// Display Latest Warnings in the Right-Side-Drawer
				for(var x = 0; x < json.length; x++) {
					if(lastWarningTime <= new Date(json[x]['logtime'].replace(" ", "T"))) {
						if(json[x]['entityvalue'] != "") {
							var tempList = json[x]['entityvalue'].split(" ");
							for(var y = 0; y < tempList.length; y++) {
								if(lastWarningList.indexOf(tempList[y]) == -1) {
									var article = buildWarning(
										warningsList[tempList[y]][0],
										warningsList[tempList[y]][1],
										convertDate(json[x]['logtime'])
									);
									$("#notif-container").html(article + $("#notif-container").html());
								}
							}
							lastWarningList = json[x]['entityvalue'].split(" ");
						} else {
							lastWarningList = [];
						}
					}
				}
				// Update Active Notifications
				updateActiveNotifications();
				// Update Last Warning Time
				lastWarningTime = new Date(json[json.length-1]['logtime'].replace(" ", "T"));
			}
		});
	}
	
	
	
	
	
	// Set OnClick Listeners for Left & Right Side Drawer's Buttons
	$('#btnNotification').click(function() {
		$('#slider-right').offcanvas({
			placement: 'right',
			autohide: 'true'
		});
		$('#slider-right').offcanvas('show');
	});
	
	$('#slider-left').click(function() {
		if(window.innerHeight > window.innerWidth) {
			setTimeout(function() { $("#slider-left").offcanvas('hide'); }, 200);
		}
	});
	
	$('#slider-right').click(function() {
		setTimeout(function() { $("#slider-right").offcanvas('hide'); }, 200);
	});
	
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
	
	$('#gpio').click(function() {
		$('#frame').attr("src", "gpio.html");
		$('#title').html("GPIO");
		toggleActive("gpio");
	});
	
	function toggleActive(id) {
		$("#"+id).find("h4").addClass("active");
		if(id != 'live') $("#live").find("h4").removeClass("active");
		if(id != 'energy') $("#energy").find("h4").removeClass("active");
		if(id != 'device') $("#device").find("h4").removeClass("active");
		if(id != 'gpio') $("#gpio").find("h4").removeClass("active");
	}
	
	
	
	
	
	// Update Notification Drawer Every 5 Seconds
	// Wait 10 seconds for the first function call
	setTimeout(function() {	updateNotifications(); }, 10000);
	function updateNotifications() {
		$.ajax({
			type: "POST",
			url: "db-interaction/data.php",
			data: {
				"action": "getWarningsData",
				"count": "1"
			},
			complete: function (data) {
				setTimeout(function() { updateNotifications(); }, 5000);
			},
			success: function (response) {
				// Parse Response to JSON
				var json = JSON.parse(response);
				// Display Latest Warnings in the Right-Side-Drawer
				for(var x = 0; x < json.length; x++) {
					if(lastWarningTime <= new Date(json[x]['logtime'].replace(" ", "T"))) {
						if(json[x]['entityvalue'] != "") {
							var tempList = json[x]['entityvalue'].split(" ");
							for(var y = 0; y < tempList.length; y++) {
								if(lastWarningList.indexOf(tempList[y]) == -1) {
									var article = buildWarning(
										warningsList[tempList[y]][0],
										warningsList[tempList[y]][1],
										convertDate(json[x]['logtime'])
									);
									$("#notif-container").html(article + $("#notif-container").html());
								}
							}
							lastWarningList = json[x]['entityvalue'].split(" ");
						} else {
							lastWarningList = [];
						}
					}
				}
				// Update Active Notifications
				updateActiveNotifications();
				// Update Last Warning Time
				lastWarningTime = new Date(json[json.length-1]['logtime'].replace(" ", "T"));
			}
		});
	}
	
	
});





function updateActiveNotifications() {
	// Set Title
	$("#notif-active .warnings").html("<div class='row notif-head-active'><h4 style='color:white; letter-spacing: 0.75vh;'><b>ACTIVE WARNINGS<b></h4></div>");
	// Set Active Warnings
	for(var y = 0; y < lastWarningList.length; y++) {
		var article = "";
		article = 	"<div class='row notif-head-active'>";
		article += 		"<h4>" + warningsList[lastWarningList[y]][0] + "</h4>";
		article += 	"</div>";
		$("#notif-active .warnings").append(article);
	}
	// Show/Hide Badge + Set Badge Number
	if(lastWarningList.length == 0) {
		$("#notif-active .warnings").append("<div class='row notif-head-active'><h4>THERE ARE NO WARNINGS</h4></div>");
		$(".button-badge").css("display", "none");
	} else {
		$(".button-badge").text((lastWarningList.length).toString());
		$(".button-badge").css("color", "orange");
		$(".button-badge").css("border-color", "orange");
		$(".button-badge").css("display", "block");
	}
	// Set Red Badge Color when Faults
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





// Update Notifications Drawer From Iframe
// - Fault Status
// - Last Timestamp

var blinkInterval = null;

function updateFaultStatus(flag, fault, logtime) {
	// If Fault has Occured
	if(flag) {
		$(".notifbar").css("display", "block");
		$("#notifbar-icon").attr("src", "img/notification-red.png");
		$("#notifbar-text").css("color", "red");
		$("#notifbar-text").html(warningsList[fault][0]);
		// Start Blinking + Change some stuff to red + Add Fault to Notifications Drawer
		if(blinkInterval == null) {
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
		}
	// If No Active Faults
	} else {
		$(".notifbar").css("display", "none");
		$("#notifbar-icon").attr("src", "img/mail.png");
		$("#notifbar-text").css("color", "#7b7b7b");
		$("#notifbar-text").html("Send statistics on my email");
		// Stop Blinking
		if(blinkInterval != null) {
			clearInterval(blinkInterval);
			blinkInterval = null;
			$("#notifbar-parent").css('visibility', 'visible');
			$(".notification").css('visibility', 'visible');
			$(".button-badge").css('visibility', 'visible');
			
			$("#notif-active .faults").html("");
		}
	}
	// Update Active Notifications
	updateActiveNotifications();
}

function updateLastTimestamp(str) {
	$("#notif-lastupdate").html("<div class='row notif-head-active'><h4 style='color:white; letter-spacing: 0.75vh;'><b>LAST TIMESTAMP<b></h4></div>");
	$("#notif-lastupdate").append("<div class='row notif-head-active'><h4 class='last-timestamp'>" + convertDate(str) + "</h4></div>");
	if(moment.duration(moment().diff(moment.utc(str))).asMinutes() > 5) {
		// NOT UPDATED IN OVER 5 MINUTES
		$("#notif-lastupdate h4").css('color', 'red');
		$(".notification").attr("src", "img/notification-red.png");
		$(".button-badge").css("color", "red");
		$(".button-badge").css("border-color", "red");
		if(lastWarningList.length != 0) $(".button-badge").css("display", "block");
	}
}





// Convert Date from Database to Local Time
function convertDate(dateStr) {
	var utc = moment.utc(dateStr).toDate();
	return moment(utc).local().format("YYYY-MM-DD HH:mm:ss")
}