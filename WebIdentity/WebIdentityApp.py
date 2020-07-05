
from flask import Flask, render_template, request, url_for, redirect, session
import random

# Flask Initialization
# global variable must be named "application" as per EB requirement
application = Flask(__name__)
application.debug = True

@application.route("/")
def index():
    random_number = random.randint(1, 1000)
    return render_template('index.html', random_number=random_number)

if (__name__ == "__main__"):
    application.run(debug=True)