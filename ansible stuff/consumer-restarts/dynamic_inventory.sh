#!/bin/bash
aws ec2 describe-instances --query "Reservations[*].Instances[*].{IP: PrivateIpAddress}" --filters Name=tag:Name,Values=ME-Consumer-Producer-ASG  --region us-east-1 --output text >> consumer

echo "[consumer_machines]" > consumer-inventory
while read line
do
    echo "$line ansible_ssh_private_key_file=/etc/opt/certs/authenticate.pem" >> consumer-inventory
done < consumer
