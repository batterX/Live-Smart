# batterX Live&Smart Home (v18.9.1)

## Update Monitoring App

### One-Click Update

Navigate to `http://YOUR_RASPI_IP_ADDRESS/service`

Click the `Update` icon (enter the correct password, if prompted)

Click `OK` to confirm that the System should be updated

After the update the Raspberry Pi will automatically reboot and apply the new version

### Manual Update:

If for some reason it is not possible to update the software using the Local Web App

Login to your Raspberry Pi using `Remote Desktop Connection` or directly using an HDMI display

Open Raspberry Pi's `File Manager` and navigate to `/home/pi`

Double-click on `updater.sh` and click `Execute in Terminal`

After the update the Raspberry Pi will automatically reboot and apply the new version.

### If the 'One-Click' and 'Manual' Update don't work:

Login to your Raspberry Pi using `Remote Desktop Connection` or directly using an HDMI display

Open the Linux `Terminal` and execute the following commands:
```
$ cd /home/pi
$ git clone https://github.com/batterx/livesmart.git
$ sudo cp /home/pi/livesmart/update.sh /home/pi
$ sudo chmod 777 /home/pi/update.sh
$ sudo sh /home/pi/update.sh
```

---

## Version History

#### `v18.10.1`
This version is still in development.
Should be released in the second half of October.

#### `v18.9.1`
- Added option to change Live&Smart Hostname
- Removed 'Energy Meter Not Working' Warning
- Fixed a bug that caused problems when no warnings were present
- Other smaller improvements

#### `v18.7.10`
- Added 'Inverter Parameters' setup menu in Local Service
- Removed 'N/G Relay Function' from Settings (added to Inverter Parameters)
- Fixed problem with h3/h5-eco that caused delays of 25 seconds
- Other minor bug-fixes

#### `v18.5.10`
- Added 'Energy Meter Not Working' Warning
- Improved the CloudStream (reconnects after 10 min loss)
- Added selected date/s in Energy screen
- Minor bug-fixes

#### `v18.4.10`
- Added Prev/Next Buttons in Energy Page for switching between single days
- If Today is selected as single day, the 'Next' button is changed to 'Refresh' button
- Show red notification when Last Timestamp older than 5 minutes
- Fixed a bug that was causing problems when updating the settings table remotely
- Implemented fallback solution for Grid Power, when communication with Energy Meter not working
- Other minor bug-fixes

#### `v18.3.30`
- Fixed a bug that calculated the direct consumption incorrectly

#### `v18.3.25`
- Implemented "Battery Discharge" Command
- Implemented "N/G Relay Function" Setting
- Implemented "Solar 2 Loss Warning" Setting
- Minor bug-fixes

#### `v18.3.15`
- Fixed a bug in the CloudStream that prevented the Cloud GPIOs to work.
- Fixed a bug in the Main Script that was causing an infinite loop and was using 100% on one CPU core.
- Other minor bug-fixes

#### `v18.3.10`
- Complete rewrite of the CloudStream. Now handles short/long term network connection losses
- Simplified large portion of the code for the local web-app, making it notably faster

#### `v18.3.5`
- Simplified the local API to achieve faster execution time
- Software Version Number now saved in Settings table
- Switched function of Service LED 1 to LED 3

#### `v18.2.22`
- The Software is logging the Device Model and Serialnumber to local database automatically
- Fixed a bug that caused all Outputs to be set to HIGH in first few seconds after program restart.
- Other minor bug-fixes

#### `v18.2.7`
- Improvements made to the Local API.
- Improved service LED's functionality
- Added "Minimal Active Time" option to the "Outputs" and "Commands" programming Menu
- Removed the "Current (A)" from "Grid" and "Load" in Live View
- Other minor bug-fixes

#### `v18.1.26`
- Developed Cloud API v2 that reduces the size of the data transferred to the Cloud by up to 80%
- This also reduces the load on the Raspberry Pi's CPU by up to 50%
- Programmed the on-board service LEDs
- Other minor bug-fixes

#### `v18.1.16`
- Bug-fixes

#### `v18.1.11`
- Software compatible with both Raspberry Pi 2 and 3
- Minor bug-fixes
