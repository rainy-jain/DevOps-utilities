#!/bin/sh
d=$1

aws ec2 describe-instances --query "Reservations[*].Instances[*].{IP: PrivateIpAddress}" --filters Name=tag:Name,Values=$1* --region us-east-1 --output text > ${d}
echo "[messaging_engine_base_machines]" > ${d}-inventory
while read line
do
    echo "$line ansible_ssh_private_key_file=/etc/opt/certs/authenticate.pem" >> ${d}-inventory
done < ${d}
