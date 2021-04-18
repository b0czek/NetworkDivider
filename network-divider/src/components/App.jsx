import { Container, Row } from "react-bootstrap";
import React from "react";
import InputForm from "./InputForm";
import Result from "./Result";
class App extends React.Component {
    state = {
        fetchedData: null,
    };

    clearData = () => {
        this.setState({
            fetchedData: null,
        });
    };

    onDataFetched = (data) => {
        this.setState({
            fetchedData: data,
        });
    };

    render = () => (
        <Container>
            <Row>
                <InputForm
                    onSubmit={this.clearData}
                    onResult={this.onDataFetched}
                />
            </Row>
            {this.state.fetchedData ? (
                <Result fetchedData={this.state.fetchedData} />
            ) : null}
        </Container>
    );
}

export default App;
