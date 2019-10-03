import React, { useState, useCallback } from 'react';
import {
  Button,
  Card,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  Row,
} from 'reactstrap';
import format from 'date-fns/format';

import Blockie from '../components/Blockie';
import { useAsyncSubscription } from '../util/hooks';
import { fetchMessages, addMessage } from '../util/firebase';

const ChatApp = ({ username }) => {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const { loading, data: messages = {} } = useAsyncSubscription(fetchMessages);
  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();
      if (!message) return;
      setSending(true);
      await addMessage({ author: username, text: message });
      setSending(false);
      setMessage('');
    },
    [message, username]
  );
  return (
    <div className="app">
      <div className="app-body">
        <main className="main">
          <Row className="py-5 h-100">
            <Col md={{ size: 6, offset: 3 }} className="h-100">
              <Card
                body
                className="h-100 d-flex flex-column justify-content-between"
              >
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <Col className="overflow-auto">
                    {Object.values(messages).map(
                      ({ author, text, createdAt }, index) => {
                        return (
                          <Row key={`${author}-${index}`} className="mb-2">
                            <Col md="1">
                              <div className="mr-3">
                                <Blockie opts={{ seed: author }} />
                              </div>
                            </Col>
                            <Col>
                              <div>
                                <div>
                                  <strong className="mr-2">{author}</strong>{' '}
                                  <small>
                                    {format(
                                      new Date(createdAt),
                                      'kk:mm, dd MMM yyyy'
                                    )}
                                  </small>
                                </div>
                                <div>{text}</div>
                              </div>
                            </Col>
                          </Row>
                        );
                      }
                    )}
                  </Col>
                )}
                <Row>
                  <form onSubmit={handleSubmit} className="w-100">
                    <InputGroup>
                      <Input
                        placeholder="Chat!"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        disabled={sending}
                      />
                      <InputGroupAddon addonType="append">
                        <Button disabled={sending || !message} color="primary">
                          <i className="fa fa-send fa-lg"></i>
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </form>
                </Row>
              </Card>
            </Col>
          </Row>
        </main>
      </div>
    </div>
  );
};

export default ChatApp;
