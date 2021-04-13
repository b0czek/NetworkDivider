import { InputGroup, FormControl, Button } from 'react-bootstrap';
const SubnetFormField = () => {
    return (

        <InputGroup>
            <FormControl type="number" />
            <InputGroup.Append>
                <Button variant="outline-danger">
                    -
                </Button>
            </InputGroup.Append>
        </InputGroup>
    );
};

export default SubnetFormField;