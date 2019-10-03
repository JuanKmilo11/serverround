#!/bin/bash
while true; do
serverStatus1="$(curl -o/dev/null -s -w "%{http_code}\n" http://www.google.com)"
if [[ $serverStatus1 = 200 ]]
then
    echo server working!
else
    	sshpass -p "05122006" ssh -o StrictHostKeyChecking=no 192.168.1.28 ./nodeRestore.sh
	serverStatus1="$(curl -o/dev/null -s -w "%{http_code}\n" http://www.google.com)"
if [[ $serverStatus1 = 200 ]]
then
	echo server restored succesfully!
else
	sshpass -p "05122006" ssh -o StrictHostKeyChecking=no 192.168.1.28 ./dbRestore.sh
	serverStatus1="$(curl -o/dev/null -s -w "%{http_code}\n" http://www.google.com)"
if [[ $serverStatus1 = 200 ]]
then
	echo database restored succesfully!
else
	sshpass -p "05122006" ssh -o StrictHostKeyChecking=no 192.168.1.28 ./gitRestore.sh
	serverStatus1="$(curl -o/dev/null -s -w "%{http_code}\n" http://www.google.com)"
if [[ $serverStatus1 = 200 ]]
then
	echo database restored succesfully!
else
	./mail.sh
fi
fi
fi
fi
sleep 10
done

