import { InputGroup, FormControl, Button } from "react-bootstrap";
const SubnetFormField = (props) => {
    return (
        <InputGroup className="mt-2">
            <FormControl
                type="number"
                value={props.value}
                onChange={props.handleChange}
                name={props.name}
                min="1"
            />
            <InputGroup.Append>
                <Button variant="outline-danger" onClick={props.onDelete}>
                    -
                </Button>
            </InputGroup.Append>
        </InputGroup>
    );
};

export default SubnetFormField;
