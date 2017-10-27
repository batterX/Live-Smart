# batterX Live & Smart

### Update Local Monitoring App

Login to your Live&Smart Box using `Remote Desktop Connection` or directly using HDMI display

#### To manually update the software run the following commands:

Open Raspberry Pi's `Terminal`

Clone the GitHub repository
```
git clone https://github.com/batterx/livesmart.git
```

Update the local web-app
```
sudo cp livesmart/html /var/www -r
```

Update the communication software
```
sudo cp livesmart/BatterX /home/pi
```

Update the auto-run script
```
sudo cp livesmart/launcher.sh /home/pi
```

Remove the LiveSmart directory
```
sudo rm livesmart
```
