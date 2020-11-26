$("#addSubnet").click(() => {
    $("#addSubnet").before('<div class="input-group mb-3" id="subnet1"><input type="number" class="form-control" aria-describedby="basic-addon1" id="subnetdata"><div class="input-group-append"><button type="button" class="btn btn-outline-danger" id="removeSubnet">-</button></div></div>');
});
$('#subnets').on('click', '#removeSubnet', function () {
    $(this).closest('div.input-group').remove();
});
$("#includecidr").change(function () {
    $("#cidr").prop("disabled", !$(this).prop('checked'))
});
$("#divide_as_hosts").change(function () {
    $("#divide_as_addresses").prop('checked', !$(this).prop('checked'));
});
$("#divide_as_addresses").change(function () {
    $("#divide_as_hosts").prop('checked', !$(this).prop('checked'));
});
function query() {
    $("#dataoutput").addClass('hide');
    $("#dataoutput").children().each(function (index, child) { $(child).remove(); });
    var ip = $("#ipaddress").val();
    var includecidr = $("#includecidr").prop("checked");
    var cidr = includecidr ? $("#cidr").val() : 0;
    var divide_as_hosts;
    if ($("#divide_as_hosts").prop('checked')) {
        divide_as_hosts = 1;
    }
    else if ($("#divide_as_addresses").prop('checked')) {
        divide_as_hosts = 0;
    }

    else {
        addAlert('Nie wybrano sposobu dzielenia sieci', 'Błąd!');
        return;
    }
    var subnets = Array();
    $("input#subnetdata").each(function (i, val) {
        subnets.push($(this).val());
    });
    if (subnets.indexOf("") != -1 || subnets.length == 0) {
        addAlert('Nieprawidłowe ustawienia podsieci', 'Błąd!');
        return;
    }
    var subnetworks = subnets.join('/');
    $("#dataoutput").removeClass("hide");
    //create http request to fetch data
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);
            if (data.error != null) {
                addErrorCard("Sieć główna", "Błąd", data.error);
                return;
            }
            else if (includecidr) {
                addNetworkCard("Sieć główna", data.main_network.initial_ip_address, data.main_network, color = "primary");
            }
            var i = 1;
            data.subnets.forEach(subnet => {
                var suffix = divide_as_hosts ? 'hostów' : 'adresów';
                var count = divide_as_hosts ? subnet.initial_addresses_count - 2 : subnet.initial_addresses_count;
                var a = count + " " + suffix;
                var header = `Sieć ${i}`;
                if (subnet.error != null) {
                    addErrorCard(header, a, "Błąd " + subnet.error);
                    i++;
                    return;
                }
                addNetworkCard(header, a, subnet);
                i++;
            });
            scrollToResult();
        }
        else if(this.readyState == 4 && this.response != 200){
            addAlert('Wystąpił problem w komunkiacji z serwerem!', "Błąd");
        }
    }
    xhttp.open('GET',`${window.location.protocol}//${window.location.host}/api/divide/network/${ip}/cidr/${cidr}/divide_as_hosts/${divide_as_hosts}/subnets/${subnetworks}`, true);
    xhttp.send();
}
function addAlert(message, bold = "") {
    $("#datasubmittion").before(`<div class="col-12 col-md-10 alert alert-warning alert-dismissible fade show mx-auto" role="alert"> <span class="alert-message"><b>${bold}</b>&nbsp;${message}</span> <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div>`);
}
function addNetworkCard(header, title, data, color = "secondary") {
    binarykeys = ['network_address_bin', 'subnet_mask_bin', 'broadcast_address_bin', 'first_host_address_bin', 'last_host_address_bin'];
    binarykeys.forEach(key => {
        data[key + '_address_part'] = data[key].substring(0, data.subnet_mask_prefix);
        data[key + '_host_part'] = data[key].substring(data.subnet_mask_prefix, 32);
    });
    $("#dataoutput").append(`<div class="card border-${color} my-2"><div class="card-header">${header}</div><div class="card-body text-${color}"><h5 class="card-title">${title}</h5><div class="card-text container"><div class="network-addresses row"><div class="col-12 col-lg-3">Adres sieci:</div><div class="network-address col-12 col-lg-3">${data.network_address}</div><div class="network-address-bin col-12 col-lg-6"><span class="network-address-part">${data.network_address_bin_address_part}</span><span class="host-address-part">${data.network_address_bin_host_part}</span></div></div><div class="subnet-mask row"><div class="col-12 col-lg-3">Maska podsieci:</div><div class="netmask col-12 col-lg-3">${data.subnet_mask}=/${data.subnet_mask_prefix}</div><div class="netmask-bin col-12 col-lg-6"><span class="network-address-part">${data.subnet_mask_bin_address_part}</span><span class="host-address-part">${data.subnet_mask_bin_host_part}</span></div></div><div class="broadcast-addresses row"><div class="col-12 col-lg-3">Adres rozgłoszeniowy:</div><div class="broadcast-address col-12 col-lg-3">${data.broadcast_address}</div><div class="network-address-bin col-12 col-lg-6"><span class="network-address-part">${data.broadcast_address_bin_address_part}</span><span class="host-address-part">${data.broadcast_address_bin_host_part}</span></div></div><div class="hosts-addresses row"><div class="col-12 col-lg-3">Zakres adresów hostów:</div><div class="hosts-addresses-container col-12 col-lg-6"><span class="first-host-address">${data.first_host_address}</span><span class="separator">-</span><span class="last-host-address">${data.last_host_address}</span></div></div><div class="hosts-addresses-bin-container row"><div class="xs-hidden col-lg-3"></div><div class="col-12 col-lg-9"><span class="first-host-address-bin"><span class="network-address-part">${data.first_host_address_bin_address_part}</span><span class="host-address-part">${data.first_host_address_bin_host_part}</span></span><span class="separator">-</span><span class="last-host-address-bin"><span class="network-address-part">${data.last_host_address_bin_address_part}</span><span class="host-address-part">${data.last_host_address_bin_host_part}</span></span></div></div><div class="network-size row"><div class="col-12 col-lg-3">Adresów w sieci:</div><div class="addresses-count col-12 col-lg-9">${data.addresses_count}</span></div></div></div></div>`);
}
function addErrorCard(header, title, message) {
    $("#dataoutput").append(`<div class="card border-danger my-2"> <div class="card-header"> ${header} </div> <div class="card-body text-danger"> <h5 class="card-title">${title}</h5> <div class="card-text container"> <div class="row">${message}</div> </div> </div> </div>`);
}
function scrollToResult() {
    $('html,body').animate({
        scrollTop: $("#dataoutput").offset().top
    }, 500);
}