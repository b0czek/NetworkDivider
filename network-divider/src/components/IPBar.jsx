import { InputGroup, FormControl } from 'react-bootstrap';

const IPBar = (props) => {
    return (
        <InputGroup className="mb-3 col-12">
            <InputGroup.Prepend>
                <InputGroup.Text>
                    Adres IP:
                </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl 
                type="text" 
                id="ipAddress" 
                name="ipAddress" 
                value={props.values.ipAddress}
                onChange={props.handleChange}
                />
            <InputGroup.Append>
                <InputGroup.Checkbox 
                    checked={props.values.includeCidr}
                    onChange={props.handleChange}
                    name="includeCidr"
                    id="includeCidr" 
                    />
                <InputGroup.Text>
                    /
                </InputGroup.Text>
            </InputGroup.Append>
            <FormControl 
                type="number"
                max="32" 
                min="0" 
                className="col-2 col-lg-1"
                id="cidr" 
                name="cidr" 
                value={props.values.cidr}
                onChange={props.handleChange}
                />
        </InputGroup>);
};

export default IPBar;