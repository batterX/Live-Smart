#!/bin/sh
# updater.sh

sudo cp /home/pi/livesmart/html /var/www -r
sudo chmod 777 /var/www -R

sudo rm /home/pi/BatterX
sudo cp /home/pi/livesmart/BatterX /home/pi
sudo chmod 777 /home/pi/BatterX

sudo rm /home/pi/CloudStream
sudo cp /home/pi/livesmart/CloudStream /home/pi
sudo chmod 777 /home/pi/CloudStream

sudo cp /home/pi/livesmart/launcher.sh /home/pi
sudo chmod 777 /home/pi/launcher.sh

sudo cp /home/pi/livesmart/updater.sh /home/pi
sudo chmod 777 /home/pi/updater.sh

sudo rm /home/pi/livesmart -r

sudo rm /home/pi/update.sh

sudo reboot