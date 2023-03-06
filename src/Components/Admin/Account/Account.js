import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './account.css';
import Layout from '../Layout';

function MiCuenta() {
  return (
    <Layout>
      <Row className="h-1">
        <Col>
          <div className="card-admin">
            <label>Datos de la cuenta:</label>
          </div>
        </Col>
      </Row>
      <Row className="h-11">
        <Col>
          <div className="card-admin-column">
          </div>
        </Col>
      </Row>
    </Layout>
  );
}

export default MiCuenta;