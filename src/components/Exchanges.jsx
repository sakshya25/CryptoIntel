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
console.log(data)
  if (isFetching) return <Loader />;

  return (
    <>
      <Row gutter={[32, 32]}>
        <Col span={6}><strong>Exchanges</strong></Col>
        <Col span={6}><strong>24h Trade Volume (BTC)</strong></Col>
        <Col span={6}><strong>24h Normalized Volume (BTC)</strong></Col>
        <Col span={6}><strong>Changes</strong></Col>
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
                <Col span={6}>${millify(exchange.trade_volume_24h_btc_normalized)}</Col>
                <Col span={6}>${millify(exchange.year_established*100)}</Col>
              </Row>
            )}
          >
            {HTMLReactParser(exchange.description || `${exchange.name} Launched in September ${exchange.year_established}, KuCoin is a global cryptocurrency exchange with its operational headquarters in Seychelles. As a user-oriented platform with a focus on inclusiveness and community action reach, it offers over 800 digital assets and currently provides Spot trading, Margin trading, P2P Fiat trading, Futures trading, Staking, and Lending to its 30 million users in more than 200 countries and regions. KuCoin is currently one of the top 5 crypto exchanges. In 2023, KuCoin was named one of the Best Crypto Exchanges by Forbes and recognized as a highly commended global exchange in Finder's 2023 Global Cryptocurrency Trading Platform Awards.`)}
          </Panel>
        ))}
      </Collapse>
    </>
  );
};

export default Exchanges;
