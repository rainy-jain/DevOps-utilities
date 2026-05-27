# Microservices Dashboard

We had common shared services used by all teams in the company. Any deployment would have to be verfied by all teams. This required communincation across the teams

As a solution I created a dashboard to be viewed by all to verify status and start testing their respective functionalities when a deployment was made.

Displays the status of various ECS services. 
When deployed ECS service takes time to pass checks and become stable. This dashboard shows the status of the services for developers to know when it has become stable.

For each service listed, it gives the 
 * updatedAt time
 *  the loadbalancer url where the service is available
 *  the status of that service
