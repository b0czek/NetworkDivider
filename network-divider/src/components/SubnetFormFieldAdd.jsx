import { Button } from "react-bootstrap";
const SubnetFormFieldAdd = (props) => {
    return (
        <Button variant="outline-primary" className="col-12 mt-2" onClick={props.onClick}>
            +
        </Button>
    );
};

export default SubnetFormFieldAdd;
