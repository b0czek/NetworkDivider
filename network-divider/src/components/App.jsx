import FormContainer from "./FormContainer";
import NetworkCard from "./NetworkCard";
import { Container, Row } from "react-bootstrap";
function App() {
    return (
        <Container>
            <Row>
                <FormContainer />
                <div className="col-12 col-md-10 mx-auto my-3">
                    <div className="border rounded ">
                        <NetworkCard
                            header="Sieć główna"
                            title="235 adresów"
                            data={{
                                addresses_count: 256,
                                broadcast_address: "127.0.0.255",
                                broadcast_address_bin: "01111111000000000000000011111111",
                                error: null,
                                first_host_address: "127.0.0.1",
                                first_host_address_bin: "01111111000000000000000000000001",
                                initial_addresses_count: 235,
                                last_host_address: "127.0.0.254",
                                last_host_address_bin: "01111111000000000000000011111110",
                                network_address: "127.0.0.0",
                                network_address_bin: "01111111000000000000000000000000",
                                subnet_mask: "255.255.255.0",
                                subnet_mask_bin: "11111111111111111111111100000000",
                                subnet_mask_prefix: 24,
                            }}
                        />
                    </div>
                </div>
            </Row>
        </Container>
    );
}

export default App;
