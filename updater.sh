#!/bin/sh
# updater.sh

git clone https://github.com/batterx/livesmart.git

sudo cp livesmart/update.sh /home/pi
sudo chmod 777 /home/pi/update.sh

sudo sh /home/pi/update.sh