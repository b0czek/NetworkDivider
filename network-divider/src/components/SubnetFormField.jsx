import { InputGroup, FormControl, Button } from 'react-bootstrap';
const SubnetFormField = (props) => {
    return (
        <InputGroup className="mt-2">
            <FormControl type="number" id={"subnet" + props.id} min="0" />
            <InputGroup.Append>
                <Button variant="outline-danger" onClick={ props.onDelete }>
                    -
                </Button>
            </InputGroup.Append>
        </InputGroup>
    );
};

export default SubnetFormField;