# batterX Live & Smart

## Update Local Monitoring App

Login to your Live&Smart Box using `Remote Desktop Connection` or directly using HDMI display

### Auto Update:

TODO

### Manual Update:

1. Open Raspberry Pi's `Terminal`

2. Clone the GitHub repository
```
git clone https://github.com/batterx/livesmart.git
```

3. Update the local web-app
```
sudo cp livesmart/html /var/www -r
```

4. Update the communication software
```
sudo cp livesmart/BatterX /home/pi
```

5. Update the auto-run script
```
sudo cp livesmart/launcher.sh /home/pi
```

6. Remove the LiveSmart directory
```
sudo rm livesmart
```

7. Restart the Raspberry Pi
```
sudo reboot
```
