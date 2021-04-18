import { forwardRef } from "react";
import { Card, Container, Row } from "react-bootstrap";

const BinaryAddress = (props) => {
    let parts = [
        props.binAddress.substring(0, props.prefix),
        props.binAddress.substring(props.prefix),
    ];
    return (
        <span className={props.className}>
            <span>{parts[0]}</span>
            <span className="bin-host-part">{parts[1]}</span>
        </span>
    );
};

const BinaryAddressContainer = (props) => {
    return (
        <div className="col-12 col-lg-6">
            <BinaryAddress {...props} />
        </div>
    );
};

const DotDecimalAddress = (props) => (
    <div className="col-12 col-lg-3">
        {props.prefix ? `${props.address}=/${props.prefix}` : props.address}
    </div>
);

// dont include colon if there is no name
const AddressRow = forwardRef((props, ref) => (
    <Row ref={ref} className={props.className}>
        <div
            className={`col-12 col-lg-3 ${
                props.nameColor ? "text-" + props.nameColor : null
            }`}>
            {props.name ? `${props.name}:` : null}
        </div>
        {props.children}
    </Row>
));

const CardContainer = forwardRef((props, ref) => (
    <div className="col-12 col-md-10 mx-auto my-2">
        <Card border={props.variant} className="thicken-border">
            <Card.Header>{props.header}</Card.Header>
            <Card.Body className={`text-${props.variant}`}>
                <Card.Title>{props.title}</Card.Title>
                <Container ref={ref}>{props.children}</Container>
            </Card.Body>
        </Card>
    </div>
));

const NetworkCard = (props) => {
    return (
        <CardContainer
            variant={props.variant}
            header={props.header}
            title={props.title}>
            <AddressRow
                name="Adres sieci"
                className="network-address"
                nameColor={props.variant}>
                <DotDecimalAddress address={props.data.network_address} />
                <BinaryAddressContainer
                    binAddress={props.data.network_address_bin}
                    prefix={props.data.subnet_mask_prefix}
                />
            </AddressRow>
            <AddressRow
                name="Maska podsieci"
                className="subnet-mask"
                nameColor={props.variant}>
                <DotDecimalAddress
                    address={props.data.subnet_mask}
                    prefix={props.data.subnet_mask_prefix}
                />
                <BinaryAddressContainer
                    binAddress={props.data.subnet_mask_bin}
                    prefix={props.data.subnet_mask_prefix}
                />
            </AddressRow>
            <AddressRow
                name="Adres rozgłoszeniowy"
                className="network-address"
                nameColor={props.variant}>
                <DotDecimalAddress address={props.data.broadcast_address} />
                <BinaryAddressContainer
                    binAddress={props.data.broadcast_address_bin}
                    prefix={props.data.subnet_mask_prefix}
                />
            </AddressRow>
            <AddressRow name="Zakres adresów hostów">
                <div className="col-12 col-lg-6">
                    <span className="first-host">
                        {props.data.first_host_address}
                    </span>
                    <span className="separator">-</span>
                    <span className="last-host">
                        {props.data.last_host_address}
                    </span>
                </div>
            </AddressRow>
            <AddressRow>
                <div className="col-12 col-lg-9">
                    <BinaryAddress
                        binAddress={props.data.first_host_address_bin}
                        prefix={props.data.subnet_mask_prefix}
                        className="first-host"
                    />
                    <span className="separator">-</span>
                    <BinaryAddress
                        binAddress={props.data.last_host_address_bin}
                        prefix={props.data.subnet_mask_prefix}
                        className="last-host"
                    />
                </div>
            </AddressRow>
            <AddressRow name="Adresów w sieci">
                <div className="col-12 col-lg-9">
                    <span className="addresses-count">
                        {props.data.addresses_count}
                    </span>
                </div>
            </AddressRow>
        </CardContainer>
    );
};

export const ErrorCard = (props) => (
    <CardContainer variant="danger" header={props.header} title={props.title}>
        <Row>{props.data.error}</Row>
    </CardContainer>
);

export default NetworkCard;
