import Form from './Form';
import { InputGroup } from 'react-bootstrap';
import logo from './logo.svg';

const FormContainer = () => {
    <div className="col-12 col-md-10 mx-auto mt-3">
        <div className="border rounded">
            <img className="d-block col-3 mx-auto my-3" src={logo} alt="logo"/>
            <Form/>
        </div>
    </div>
};

export default FormContainer;