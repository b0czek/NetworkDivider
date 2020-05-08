from flask import Flask
from api_core import Divider
app = Flask(__name__)

@app.route("/")
def index():
	return Divider.divide('172.1.1.1', 24, [100, 100], False)
