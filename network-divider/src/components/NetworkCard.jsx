import { forwardRef } from "react";
import { Card, Container, Row } from "react-bootstrap";

const BinaryAddress = (props) => {
    let parts = [
        props.binAddress.substring(0, props.prefix),
        props.binAddress.substring(props.prefix),
    ];
    return (
        <span>
            <span className="bin-network-part">{parts[0]}</span>
            <span className="bin-host-part">{parts[1]}</span>
        </span>
    );
};

const BinaryAddressContainer = (props) => {
    return (
        <div className="network-address-bin col-12 col-lg-6">
            <BinaryAddress {...props} />
        </div>
    );
};

const DotDecimalAddress = (props) => (
    <div className="network-address col-12 col-lg-3">
        {props.prefix ? `${props.address}=/${props.prefix}` : props.address}
    </div>
);
// dont include colon if there is no name
const AddressRow = forwardRef((props, ref) => (
    <Row ref={ref}>
        <div className="col-12 col-lg-3">
            {props.name}
            {props.name ? ":" : null}
        </div>
        {props.children}
    </Row>
));

const NetworkCard = (props) => {
    return (
        <Card>
            <Card.Header>{props.header}</Card.Header>
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Container>
                    <AddressRow name="Adres sieci">
                        <DotDecimalAddress address={props.data.network_address} />
                        <BinaryAddressContainer
                            binAddress={props.data.network_address_bin}
                            prefix={props.data.subnet_mask_prefix}
                        />
                    </AddressRow>
                    <AddressRow name="Maska podsieci">
                        <DotDecimalAddress
                            address={props.data.subnet_mask}
                            prefix={props.data.subnet_mask_prefix}
                        />
                        <BinaryAddressContainer
                            binAddress={props.data.subnet_mask_bin}
                            prefix={props.data.subnet_mask_prefix}
                        />
                    </AddressRow>
                    <AddressRow name="Adres rozgłoszeniowy">
                        <DotDecimalAddress address={props.data.broadcast_address} />
                        <BinaryAddressContainer
                            binAddress={props.data.broadcast_address_bin}
                            prefix={props.data.subnet_mask_prefix}
                        />
                    </AddressRow>
                    <AddressRow name="Zakres adresów hostów">
                        <div class="col-12 col-lg-6">
                            <span class="first-host-address">{props.data.first_host_address}</span>
                            <span class="separator">-</span>
                            <span class="last-host-address">{props.data.last_host_address}</span>
                        </div>
                    </AddressRow>
                    <AddressRow>
                        <div class="col-12 col-lg-9">
                            <BinaryAddress
                                binAddress={props.data.first_host_address_bin}
                                prefix={props.data.subnet_mask_prefix}
                            />
                            <span class="separator">-</span>
                            <BinaryAddress
                                binAddress={props.data.last_host_address_bin}
                                prefix={props.data.subnet_mask_prefix}
                            />
                        </div>
                    </AddressRow>
                    <AddressRow name="Adresów w sieci">
                        <div className="col-12 col-lg-9">{props.data.addresses_count}</div>
                    </AddressRow>
                </Container>
            </Card.Body>
        </Card>
    );
};

export default NetworkCard;
