import { Component } from 'react';
import { Form } from 'react-bootstrap';
import IPBar from './IPBar';
import DividingMethod from './DividingMethod';
import SubnetFormField from './SubnetFormField';
import SubnetFormFieldAdd from './SubnetFormFieldAdd';
import SubmitButton from './SubmitButton'


class InputForm extends Component {
    
    constructor() {
        super();
        this.subnetStartingId = 1;
        this.state = {
            subnets: [this.subnetStartingId],
            lastSubnetId: this.subnetStartingId
        };

    }

    deleteSubnet(id) {
        if(this.state.subnets.length !== 1) {
            this.setState(prevState => ({
                subnets: prevState.subnets.filter(subnet => subnet !== id )
            }));
        }
    }

    addSubnet() {
        this.setState(prevState => ({
            subnets: [...prevState.subnets, prevState.lastSubnetId + 1],
            lastSubnetId: prevState.lastSubnetId + 1
        }));
    }

    render(){
    return (
        <Form>
            <IPBar />
            <DividingMethod />
            <div className="col-8 col-md-6 mx-auto mb-3">
                { this.state.subnets.map((value, _) => 
                    <SubnetFormField id={value} key={"subnet"+value} onDelete={() => this.deleteSubnet(value)} />
                ) }
                <SubnetFormFieldAdd onClick={ () => this.addSubnet() } />
            </div>
            <SubmitButton />
        </Form>
    )}
}

export default InputForm;