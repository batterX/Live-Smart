#!/bin/sh
# updater.sh

git clone https://github.com/batterx/livesmart.git

sudo cp livesmart/html /var/www -r
sudo chmod 777 /var/www -R

sudo rm /home/pi/BatterX
sudo cp livesmart/BatterX /home/pi
sudo chmod 777 /home/pi/BatterX

sudo cp livesmart/launcher.sh /home/pi
sudo chmod 777 /home/pi/launcher.sh

sudo cp livesmart/updater.sh /home/pi
sudo chmod 777 /home/pi/updater.sh

sudo rm livesmart -r

sudo reboot