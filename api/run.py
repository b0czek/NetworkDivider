from flask import Flask,request,abort
from flask_cors import CORS
import json
from api_core import Divider
app = Flask(__name__)
CORS(app)
@app.route("/api/divide/network/<network>/cidr/<int:cidr>/divide_as_hosts/<int:divide_as_hosts>/subnets/<path:subnets>", methods=['GET'])
def divide(network, cidr, divide_as_hosts, subnets):
    try:
        if divide_as_hosts != 0 and divide_as_hosts != 1:
            raise TypeError('Divide_as_hosts out of bounds')
        subnetworks = [int(x) for x in subnets.split('/')]
        return Divider.divide(network, cidr, subnetworks, True if divide_as_hosts else False)
    except Exception as e:
        abort(400)

@app.errorhandler(404)
def not_found(e):
	return 'invalid request'
