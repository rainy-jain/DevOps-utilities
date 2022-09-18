# Stack Update ( A self intiative project for the DEVops team)

## Description

Notifies in slack channel when AWS cloudformation stack is updated. It specifies the aws user that triggered the update, the stack that was updated

<img width="383" alt="image" src="https://user-images.githubusercontent.com/52047637/190890100-287f0cfd-ad5f-4cdc-b893-72cd4e4102f7.png">

In detail:
Uses CloudWatch trigger that looks for a cloudformation update event.
When triggerred lambda is triggered to send a message to slack after fetching details from the event

Use Case:
This helped in monitoring cloudformation stack updates across teams and reduced need of communication 
