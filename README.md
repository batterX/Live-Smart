# batterX Live & Smart (v17.11.8)

## Update Monitoring App

### Update using the Local Web App:

The easiest way is to open your browser and:

1. Navigate to `http://YOUR_RASPI_IP_ADDRESS/service`

2. Click the `Update` icon (enter the correct password, if prompted)

3. Click `OK` to confirm that the System should be updated

After the update is complete the Raspberry Pi will reboot automatically

### Notes:

#### Version < v17.11.8

Open `Terminal`, type `$ sudo crontab -e` and make sure that the following line exists
```
* * * * * sh /home/pi/launcher.sh >/home/pi/logs/crontab.log 2>&1
```

Open `Terminal`, type `$ sudo visudo` and make sure that the following line exists
```
www-data ALL=NOPASSWD: /sbin/reboot, /sbin/halt, /bin/sh, /home/pi/updater.sh
```

### One-click Update:

Login to your Live & Smart Box using `Remote Desktop Connection` or directly using an HDMI display

Open Raspberry Pi's `File Manager` and navigate to `/home/pi`

Double-click on `updater.sh` and click `Execute` or `Execute in Terminal`

The updater script automatically performs all steps from the manual update below

### Manual Update:

Login to your Live & Smart Box using `Remote Desktop Connection` or directly using an HDMI display

Open Raspberry Pi's `Terminal`

Clone the GitHub repository
```
git clone https://github.com/batterx/livesmart.git
```

Update the local web-app
```
sudo cp livesmart/html /var/www -r
sudo chmod 777 /var/www -R
```

Update the communication software
```
sudo rm /home/pi/BatterX
sudo cp livesmart/BatterX /home/pi
sudo chmod 777 /home/pi/BatterX
```

Update the auto-run script
```
sudo cp livesmart/launcher.sh /home/pi
sudo chmod 777 /home/pi/launcher.sh
```

Update the one-click-updater script
```
sudo cp livesmart/updater.sh /home/pi
sudo chmod 777 /home/pi/updater.sh
```

Remove the LiveSmart directory
```
sudo rm livesmart -r
```

Restart the Raspberry Pi
```
sudo reboot
```
