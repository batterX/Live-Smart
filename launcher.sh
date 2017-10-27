#!/bin/sh
# launcher.sh

sudo touch /srv/bx/usv.db3
sudo touch /srv/bx/ram/currentD.db3
sudo chmod 777 /srv/bx/usv.db3
sudo chmod 777 /srv/bx/usv.db3-journal
sudo chmod 777 /srv/bx/ram/currentD.db3
sudo chmod 777 /srv/bx/ram/currentD.db3-journal

if ! pgrep -x "BatterX" > /dev/null
then
	cd /
	cd home/pi
	sudo ./BatterX
	cd /
fi