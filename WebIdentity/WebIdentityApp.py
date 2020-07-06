
from flask import Flask, render_template, request, url_for, redirect, session
import random
import boto3

# Flask Initialization
# global variable must be named "application" as per EB requirement
application = Flask(__name__)
application.debug = True
random_number = 0


@application.route("/")
def index():
    random_number = random.randint(1, 1000)
    return render_template('index.html', random_number=random_number)


@application.route("/AWS/access", methods=['POST'])
def GetAWSAccess():
    token = request.form['token']
    gUser = request.form['gUser']
    email = request.form['gEmail']

    sts = boto3.client('sts')

    account_id = sts.get_caller_identity()["Account"]
    print("Current AccountId: " + account_id)

    assumedRole = sts.assume_role_with_web_identity(
        DurationSeconds=3600,
        RoleArn='arn:aws:iam::803902355889:role/FederatedWebIdentityRole',
        RoleSessionName="WebIdentityTutorial",
        WebIdentityToken=token)

    accessKeyId = assumedRole['Credentials']['AccessKeyId']
    secretAccessKeyId = assumedRole['Credentials']['SecretAccessKey']
    sessionToken = assumedRole['Credentials']['SessionToken']

    boto3_session = boto3.Session(
        aws_access_key_id=accessKeyId,
        aws_secret_access_key=secretAccessKeyId,
        aws_session_token=sessionToken
    )

    s3_client = boto3_session.client(service_name='s3')

    all_bucket = s3_client.list_buckets()

    return all_bucket


if (__name__ == "__main__"):
    application.run(debug=True)
