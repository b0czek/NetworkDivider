import { Component } from "react";
import { Form } from "react-bootstrap";
import IPBar from "./IPBar";
import DividingMethod from "./DividingMethod";
import SubnetFormField from "./SubnetFormField";
import SubnetFormFieldAdd from "./SubnetFormFieldAdd";
import SubmitButton from "./SubmitButton";

class InputForm extends Component {
    constructor() {
        super();
        this.subnetStartingId = 1;
        this.state = {
            subnets: [this.createNewSubnet(this.subnetStartingId)],
            lastSubnetId: this.subnetStartingId,
            ipAddress: "",
            cidr: "24",
            includeCidr: true,
        };
    }

    handleDeleteSubnet = (name) => {
        if (this.state.subnets.length !== 1) {
            this.setState({
                subnets: this.state.subnets.filter((subnet) => subnet.name !== name),
            });
        }
    };

    createNewSubnet = (id) => {
        return {
            name: `subnet${id}`,
            value: "",
        };
    };

    handleAddSubnet = () => {
        let newId = this.state.lastSubnetId + 1;
        this.setState({
            subnets: [...this.state.subnets, this.createNewSubnet(newId)],
            lastSubnetId: newId,
        });
    };

    handleSubnetChange = (event) => {
        console.log();
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
            [target.name]: target.type === "checkbox" ? target.checked : target.value,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
    };

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <IPBar
                    values={{
                        ipAddress: this.state.ipAddress,
                        cidr: this.state.cidr,
                        includeCidr: this.state.includeCidr,
                    }}
                    handleChange={this.handleChange}
                />
                <DividingMethod />
                <div className="col-8 col-md-6 mx-auto mb-3">
                    {this.state.subnets.map((value, idx) => (
                        <SubnetFormField
                            name={value.name}
                            key={idx}
                            handleChange={this.handleSubnetChange}
                            value={value.value}
                            onDelete={() => this.handleDeleteSubnet(value.name)}
                        />
                    ))}
                    <SubnetFormFieldAdd onClick={this.handleAddSubnet} />
                </div>
                <SubmitButton />
            </Form>
        );
    }
}

export default InputForm;
