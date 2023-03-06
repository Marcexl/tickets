
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Layout from '../Layout';


function Dashboard() {
  return (
    <Layout>
      <Row className="h-1">
        <Col>
          <div className="card-admin-column">
            <label>Bienvenido</label>
            <p>Que quieres hacer hoy?</p>
          </div>
        </Col>
      </Row>
    </Layout>
  );
}

export default Dashboard;