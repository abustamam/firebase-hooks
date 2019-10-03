import React, { useState, useCallback } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from 'reactstrap';
import Blockie from '../../../components/Blockie';

const Login = ({ onLogin, history }) => {
  const [username, setUsername] = useState('');
  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      if (username) {
        onLogin(username);
        history.push('/');
      }
    },
    [onLogin, username, history]
  );

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="6">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <h1>Choose a nickname</h1>
                    <Row className="align-items-center my-2">
                      <Col md="2" className="align-items-center">
                        <Blockie opts={{ seed: username }} />
                      </Col>
                      <Col md="10" className="align-items-center">
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="text"
                            placeholder="Username"
                            autoComplete="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={{ size: 4, offset: 4 }}>
                        <Button color="primary" className="px-4 w-100">
                          Chat!
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
