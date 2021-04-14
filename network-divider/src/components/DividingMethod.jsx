import { InputGroup, ButtonGroup, ToggleButton } from "react-bootstrap";
import { useState } from "react";

const DividingMethod = () => {
    const [radioValue, setRadioValue] = useState("1");

    const radios = [
        { name: "Adresy", value: "1" },
        { name: "Hosty", value: "2" },
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
                            checked={radioValue === radio.value}
                            onChange={(e) => setRadioValue(e.currentTarget.value)}
                        >
                            {radio.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup>
            </InputGroup.Append>
        </InputGroup>
    );
};

export default DividingMethod;
