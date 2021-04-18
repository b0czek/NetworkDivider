import NetworkCard, { ErrorCard } from "./NetworkCard";
import { Element, scroller } from "react-scroll";
import { Row } from "react-bootstrap";
import React from "react";
const Card = (props) => (
    <Row>
        {props.data.error ? (
            <ErrorCard {...props} />
        ) : (
            <NetworkCard {...props} />
        )}
    </Row>
);

class Result extends React.Component {
    createSubnetTitle = (initialAddressesCount, dividingMethod) =>
        `${initialAddressesCount} ${
            dividingMethod === "hosts" ? "hostów" : "adresów"
        }`;

    componentDidMount() {
        scroller.scrollTo("result", {
            duration: 250,
            delay: 0,
            smooth: true,
        });
    }

    render() {
        return (
            <Element name="result">
                <Card
                    header="Sieć główna"
                    title={
                        this.props.fetchedData.main_network.initial_ip_address
                    }
                    data={this.props.fetchedData.main_network}
                    variant="primary"
                />
                {this.props.fetchedData.subnets.map((subnet, idx) => (
                    <Card
                        header={`Sieć ${idx + 1}`}
                        title={this.createSubnetTitle(
                            subnet.initial_addresses_count,
                            this.props.fetchedData.dividing_method
                        )}
                        variant="secondary"
                        data={subnet}
                        key={idx}
                    />
                ))}
            </Element>
        );
    }
}
export default Result;
