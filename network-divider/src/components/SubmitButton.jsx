import { Button } from 'react-bootstrap';
const SubmitButton = () => {
    return (
        <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit" className="mx-4 my-4 p-2" >
                Podziel!
            </Button>
        </div>

    );
}
export default SubmitButton;