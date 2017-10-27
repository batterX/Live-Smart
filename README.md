# batterX Live & Smart

## Update Local Monitoring App

Login to your Live&Smart Box using `Remote Desktop Connection` or directly using HDMI display

### Auto Update:

TODO

### Manual Update:

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

Remove the LiveSmart directory
```
sudo rm livesmart -r
```

Restart the Raspberry Pi
```
sudo reboot
```
