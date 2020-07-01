
from flask import Flask, render_template, request, url_for, redirect, session

# Flask Initialization
# global variable must be named "application" as per EB requirement
application = Flask(__name__)
application.debug = True

@application.route("/")
def index():
    return render_template('index.html')

if (__name__ == "__main__"):
    application.run(debug=True)