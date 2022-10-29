import boto3
from botocore.vendored import requests
import requests
import json
import time
cloudformation = boto3.resource('cloudformation')
client = boto3.client('elb')
ec2 = boto3.resource('ec2')


def lambda_handler(event, context):

    print(event)
    if event['detail']['eventName'] == "CreateChangeSet":
        arn = event['detail']['userIdentity']['arn']
        slash = arn.index('/')
        user = arn[slash+1:]
        stack_name = event['detail']['requestParameters']['stackName']

        data = {

            'text': "<!here> Stack Refresh is initiated",
            'attachments': [
                {
                    "text": "*Stack*: _" + stack_name + "_ \n*Triggered by*:"+user,
                    "type": "mrkdwn",
                    "color": "#5bc0de",
                    "attachment_type": "default"

                }
            ]
        }
        requests.post(url= "< slack-url >",
                      data=json.dumps(data))

    if event['detail']['eventName'] == "SignalResource" and event['detail']['requestParameters'] != None:
        print("Going inside")

        stack_arn = event['detail']['requestParameters']['stackName']
        stack_name = stack_arn.split('/')
        stack_name = stack_name[-2]

        stack = cloudformation.Stack(stack_name)
        status = event['detail']['requestParameters']['status']
        # if stack.stack_status == 'UPDATE_COMPLETE' :
        if status == "SUCCESS":

            stack = cloudformation.Stack(stack_name)

            print(list(stack.parameters))
            ami_list = list(stack.parameters)
            for x in ami_list:
                if x["ParameterKey"] == "AMIID":
                    ami_id = x["ParameterValue"]
            image = ec2.Image(ami_id)
            response = image.describe_attribute(
                Attribute='description')
            print(response['Description'])
            inf = response['Description']['Value']

            elb_name = list(stack.outputs[4].values())
            link = elb_name[1]
            startO = link.index('o')
            abbreviation = link[startO:startO+7]
            if link.startswith('o') != True:
                startO = link.index('-o-')
                startO = startO+1
                abbreviation = link[startO:startO+7]
                if startO == 0:  # jouat
                    abbreviation = link[startO:startO+5]

            responseDNS = client.describe_load_balancers(
                LoadBalancerNames=[
                    link,
                ],

            )
            dns = responseDNS['LoadBalancerDescriptions'][0]['DNSName']

            data = {

                'text': "<!here> Stack Refresh is completed",
                'attachments': [
                    {
                        "text": "*Stack*: _" + stack_name + "_ \n*URL* " + abbreviation+".remscripts.com or \n http://"+dns+"  \n*Ticket*:https://jira.mscripts.com/browse/"+inf,
                        "type": "mrkdwn",
                        "color": "#00b300",
                        "attachment_type": "default"

                    }
                ]
            }
            requests.post(url= "< slack-url >",
                          data=json.dumps(data))

        else:
            print("Status not successful")
