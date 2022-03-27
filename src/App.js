import { Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import Home from "./Home";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
import { Col, Row } from "react-bootstrap";

const App = () => {
  console.log(process.env.NODE_ENV);
  return (
    <div className="App">
      <Navbar bg='light'>
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Steam Scanner
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col md={{ span: 8, offset: 2 }} style={{ backgroundColor: 'blue' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profiles/:id" element={<Profile />} />
              <Route path="/id/:id" element={<Profile />} />
            </Routes>
          </Col>
        </Row>

      </Container>
    </div>
  );
};

export default App;
