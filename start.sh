#!/bin/bash

PASS=${1}

node bot.js ${PASS}
ERRNO=${?}

while (( $ERRNO == 0 )); do
	echo "| Reconnection dans 5 secondes"
	sleep 5
	node bot.js ${PASS}
	ERRNO=${?}
done

echo '| Au revoir !'
