import { Form } from 'react-bootstrap';
import IPBar from './IPBar';
import DividingMethod from './DividingMethod';
import SubnetFormField from './SubnetFormField';
import SubnetFormFieldAdd from './SubnetFormFieldAdd';
import SubmitButton from './SubmitButton'
const InputForm = () => {
    return (
        <Form>
            <IPBar />
            <DividingMethod />
            <div className="col-8 col-md-6 mx-auto mb-3">
                <SubnetFormField />
                <SubnetFormFieldAdd />
            </div>
            <SubmitButton />
        </Form>
    );
}

export default InputForm;