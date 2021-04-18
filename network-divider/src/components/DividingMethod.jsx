import { InputGroup, ButtonGroup, ToggleButton } from "react-bootstrap";

const DividingMethod = (props) => {
    const radios = [
        { name: "Adresy", value: "0" },
        { name: "Hosty", value: "1" },
    ];

    return (
        <InputGroup className="col-12 mb-3">
            <InputGroup.Prepend>
                <InputGroup.Text>Sieci dziel na:</InputGroup.Text>
            </InputGroup.Prepend>
            <InputGroup.Append>
                <ButtonGroup toggle>
                    {radios.map((radio, idx) => (
                        <ToggleButton
                            key={idx}
                            type="radio"
                            variant="primary"
                            name="dividingMethod"
                            value={radio.value}
                            checked={props.value === radio.value}
                            onChange={props.onChange}>
                            {radio.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup>
            </InputGroup.Append>
        </InputGroup>
    );
};

export default DividingMethod;
