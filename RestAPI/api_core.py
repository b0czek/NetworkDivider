import ipcalc
import json
ip_addr = '172.0.0.22/16'
subnets_to_divide = [16384, 5000, 120]
divide_as_hosts = False
def getClosestPowerOfTwo(number, as_hosts, poweroftwo=0):
    if as_hosts:
        if number + 2 >= 2**poweroftwo:
            return getClosestPowerOfTwo(number, divide_as_hosts, poweroftwo+1)
        else:
            return poweroftwo
    else:
        if number > 2**poweroftwo:
            return getClosestPowerOfTwo(number, divide_as_hosts, poweroftwo+1)
        else:
            return poweroftwo



def main():
    x = dict()
    ip, subnet = ip_addr.split('/')
    main_network_parameters, main_network = listNetworkParameters(ip,subnet)
    x['main_network'] = main_network_parameters
    operating_subnet_address = main_network.network()
    x['subnets'] = dict()
    for subnet in sorted(subnets_to_divide, reverse=True):
        host_bits = getClosestPowerOfTwo(subnet, divide_as_hosts)
        subnet_prefix = 32 - host_bits
        params, subnetwork = listNetworkParameters(str(operating_subnet_address), subnet_prefix)
        x['subnets'][str(subnet)] = params
        operating_subnet_address = subnetwork.broadcast() + 1

    print(json.dumps(x))

def listNetworkParameters(addr, subnet):
    data = dict()
    network = ipcalc.Network(addr, subnet)
    data['network_address'] = str(network.network())
    data['network_address_bin'] = network.network().bin()
    data['subnet_mask'] = str(network.netmask())
    data['subnet_mask_bin'] = network.netmask().bin()
    data['subnet_mask_prefix'] = network.mask
    data['broadcast_address'] = str(network.broadcast())
    data['broadcast_address_bin'] = network.broadcast().bin()
    data['first_host_address'] = str(network.host_first())
    data['first_host_address_bin'] = network.host_first().bin()
    data['last_host_address'] = str(network.host_last())
    data['last_host_address_bin'] = network.host_last().bin()  
    data['addresses_count'] = network.size()      
    return data, network

if __name__ == '__main__':
    main()