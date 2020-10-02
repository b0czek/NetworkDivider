import ipcalc
import json
import math

class Divider:
    @staticmethod
    def __getClosestPowerOfTwo(number:int, as_hosts:bool):
        network_addresses = 2 if as_hosts else 0
        return math.ceil(math.log2(number + network_addresses))

    @staticmethod
    def __listNetworkParameters(addr, subnet):
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

    @staticmethod
    def __determineCidr(subnets:list, divide_as_hosts:bool):
        additional_addresses = len(subnets) * 2 if divide_as_hosts else 0
        exponented = [2 ** Divider.__getClosestPowerOfTwo(x + additional_addresses, divide_as_hosts) for x in sorted(subnets, reverse=True)]
        return 32 - Divider.__getClosestPowerOfTwo(sum(exponented), divide_as_hosts) 

    @staticmethod
    def divide(ip: str, cidr:int, subnets: list, divide_as_hosts: bool):
        x = dict()
        try:
            if cidr == 420:
                cidr = Divider.__determineCidr(subnets, divide_as_hosts)
            main_network_parameters, main_network = Divider.__listNetworkParameters(ip,cidr)
            x['main_network'] = main_network_parameters
            operating_subnet_address = main_network.network()
            x['subnets'] = list()
            x['main_network']['initial_ip_address'] = ip
            x['error'] = None
        except ValueError as e:
            x['error'] = str(e)
            return x
        for subnet in sorted(subnets, reverse=True):
            try:
                host_bits = Divider.__getClosestPowerOfTwo(subnet, divide_as_hosts)
                subnet_prefix = 32 - host_bits
                params, subnetwork = Divider.__listNetworkParameters(str(operating_subnet_address), subnet_prefix)
                if main_network.broadcast() < subnetwork.broadcast():
                    raise ValueError('Główna sieć nie pomieści tyle adresów z tej podsieci, pomijanie')
                elif subnet > 2**32-cidr:
                    raise ValueError('Liczba adresów w głównej sieci jest mniejsza od liczby adresów w podsieci, pomijanie')
                elif main_network.network() > subnetwork.broadcast() or main_network.network() > subnetwork.network():
                    raise ValueError('Protokół IPv4 nie pomieści tylu adresów, IP overflow, pomijanie') 
                else:
                    params['error'] = None
                    operating_subnet_address = subnetwork.broadcast() + 1
                params['initial_addresses_count'] = subnet+2 if divide_as_hosts else subnet
                x['subnets'].append(params)

            except ValueError as e:
                x['subnets'].append(dict(initial_addresses_count=subnet+2 if divide_as_hosts else subnet, error=str(e)))
        return x
