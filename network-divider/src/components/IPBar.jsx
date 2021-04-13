import { InputGroup, FormControl } from 'react-bootstrap';

const IPBar = () => {
    return (
        <InputGroup className="mb-3 col-12">
            <InputGroup.Prepend>
                <InputGroup.Text>
                    Adres IP:
                </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl type="text" id="ipaddress" />
            <InputGroup.Append>
                <InputGroup.Checkbox defaultChecked id="includecidr" />
                <InputGroup.Text>
                    /
                </InputGroup.Text>
            </InputGroup.Append>
            <FormControl type="number" max="32" min="0" className="col-2 col-lg-1" id="cidr" />
        </InputGroup>);
};

export default IPBar;