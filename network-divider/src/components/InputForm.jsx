import { Component } from "react";
import { Form } from "react-bootstrap";
import IPBar from "./IPBar";
import DividingMethod from "./DividingMethod";
import SubnetFormField from "./SubnetFormField";
import SubnetFormFieldAdd from "./SubnetFormFieldAdd";
import SubmitButton from "./SubmitButton";

import logo from "../logo.svg";

class InputForm extends Component {
    constructor(props) {
        super(props);
        this.subnetStartingId = 1;
        this.state = {
            subnets: [this.createNewSubnet(this.subnetStartingId)],
            lastSubnetId: this.subnetStartingId,
            ipAddress: "",
            ipAddressError: false,
            cidr: "24",
            cidrError: false,
            includeCidr: true,
            dividingMethod: "0",
        };
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve);
        });
    }

    createNewSubnet = (id) => {
        return {
            name: `subnet${id}`,
            value: "",
            errorMessage: "",
        };
    };

    handleDeleteSubnet = (name) => {
        if (this.state.subnets.length !== 1) {
            this.setState({
                subnets: this.state.subnets.filter(
                    (subnet) => subnet.name !== name
                ),
            });
        }
    };

    handleAddSubnet = () => {
        let newId = this.state.lastSubnetId + 1;
        this.setState({
            subnets: [...this.state.subnets, this.createNewSubnet(newId)],
            lastSubnetId: newId,
        });
    };

    handleSubnetChange = (event) => {
        this.setState({
            subnets: this.state.subnets.map((subnet) =>
                subnet.name === event.target.name
                    ? {
                          name: event.target.name,
                          value: event.target.value,
                      }
                    : subnet
            ),
        });
    };

    handleChange = (event) => {
        let target = event.target;
        this.setState({
            [target.name]:
                target.type === "checkbox" ? target.checked : target.value,
        });
    };

    validateForm = async () => {
        let ipValid = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
            this.state.ipAddress
        );
        let allValid = true;
        await this.setStateAsync({
            ipAddressError: !ipValid,
            cidrError:
                this.state.includeCidr &&
                (this.state.cidr === "" ||
                    +this.state.cidr > 32 ||
                    +this.state.cidr <= 0),
            subnets: this.state.subnets.map((subnet) => {
                console.log(subnet);
                /* eslint eqeqeq: 0 */
                if (subnet.value != 0) {
                    subnet.errorMessage = "";
                } else {
                    subnet.errorMessage =
                        subnet.value === "0"
                            ? "NO ALE TO JAAK"
                            : "Pole nie może być puste";
                    allValid = false;
                }
                return subnet;
            }),
        });
        if (!allValid || this.state.cidrError || this.state.ipAddressError) {
            return false;
        }
        return true;
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        this.props.onSubmit();
        if (!(await this.validateForm())) {
            return;
        }

        let subnets = this.state.subnets
            .map((subnet) => subnet.value)
            .join("/");

        const response = await fetch(
            `${window.location.href}/api/divide/network/${
                this.state.ipAddress
            }/cidr/${
                this.state.includeCidr ? this.state.cidr : 420
            }/divide_as_hosts/${this.state.dividingMethod}/subnets/${subnets}`
        );
        const data = await response.json();
        this.props.onResult(data);
    };

    render() {
        return (
            <div className="col-12 col-md-10 mx-auto my-3">
                <div className="thick-border  rounded">
                    <img
                        className="d-block col-3 mx-auto my-3"
                        src={logo}
                        alt="logo"
                    />
                    <Form onSubmit={this.handleSubmit}>
                        <IPBar
                            values={{
                                ipAddress: this.state.ipAddress,
                                ipAddressError: this.state.ipAddressError,
                                cidr: this.state.cidr,
                                includeCidr: this.state.includeCidr,
                                cidrError: this.state.cidrError,
                            }}
                            handleChange={this.handleChange}
                        />
                        <DividingMethod
                            onChange={this.handleChange}
                            value={this.state.dividingMethod}
                        />
                        <div className="col-8 col-md-6 mx-auto mb-3">
                            {this.state.subnets.map((value, idx) => (
                                <SubnetFormField
                                    name={value.name}
                                    key={idx}
                                    handleChange={this.handleSubnetChange}
                                    value={value.value}
                                    onDelete={() =>
                                        this.handleDeleteSubnet(value.name)
                                    }
                                    errorMessage={value.errorMessage}
                                />
                            ))}
                            <SubnetFormFieldAdd
                                onClick={this.handleAddSubnet}
                            />
                        </div>
                        <SubmitButton />
                    </Form>
                </div>
            </div>
        );
    }
}

export default InputForm;
