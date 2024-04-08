import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';

import Loader from './Loader';
import { useGetCryptoExchangesQuery } from '../services/cryptoExchangesApi';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetCryptoExchangesQuery();

  if (isFetching) return <Loader />;

  return (
    <>
      <Row gutter={[32, 32]}>
        <Col span={6}>
          <strong>Exchanges</strong>
        </Col>
        <Col span={6}>
          <strong>24h Trade Volume (BTC)</strong>
        </Col>
        <Col span={6}>
          <strong>24h Normalized Volume (BTC)</strong>
        </Col>
        <Col span={6}>
          <strong>Changes</strong>
        </Col>
      </Row>
      <Collapse accordion>
        {data?.map((exchange, index) => (
          <Panel
            key={index}
            header={(
              <Row align="middle">
                <Col span={6}>
                  <Avatar src={exchange.image} />
                  <Text>{exchange.name}</Text>
                </Col>
                <Col span={6}>${millify(exchange.trade_volume_24h_btc)}</Col>
                <Col span={6}>
                  ${millify(exchange.trade_volume_24h_btc_normalized)}
                </Col>
                <Col span={6}>${millify(exchange.year_established * 100)}</Col>
              </Row>
        )}
          >
            {HTMLReactParser(`${exchange.name} Launched in September ${exchange.year_established}. KuCoin is a global cryptocurrency exchange with its operational headquarters in Seychelles.`)}
          </Panel>
        ))}
      </Collapse>
    </>
  );
};

export default Exchanges;
