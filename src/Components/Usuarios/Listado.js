import UserProfile from './Usuarios';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Data from './records.json';

export default function Listado(){

    return (
        <Container className='container-login'>
            <Row>
                <Col className='col-login'>
                    <Card className="card-login">
                        <UserProfile data={Data} />
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}