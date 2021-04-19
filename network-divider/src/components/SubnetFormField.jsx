import { InputGroup, FormControl, Button } from "react-bootstrap";
const SubnetFormField = (props) => {
    return (
        <div>
            <InputGroup className="mt-2">
                <FormControl
                    type="number"
                    value={props.value}
                    onChange={props.handleChange}
                    name={props.name}
                    min="0"
                />
                <InputGroup.Append>
                    <Button variant="outline-danger" onClick={props.onDelete}>
                        -
                    </Button>
                </InputGroup.Append>
            </InputGroup>
            {props.errorMessage ? (
                <div
                    className="text-danger"
                    style={{ fontSize: "0.75rem", marginLeft: "5px" }}>
                    {props.errorMessage}
                </div>
            ) : null}
        </div>
    );
};

export default SubnetFormField;
