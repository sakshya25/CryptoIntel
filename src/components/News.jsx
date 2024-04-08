import React, { useState } from 'react';
import { Typography, Row, Col, Card, Input } from 'antd';
import moment from 'moment';
import Loader from './Loader';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'; // Update import statement

const { Title, Text } = Typography;
const { Search } = Input;

const News = ({ simplified }) => {
  const count = simplified ? 6 : 12;
  const [searchText, setSearchText] = useState('');

  // Fetch crypto news data
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery(count);

  if (isFetching) return <Loader />;

  const filteredNews = cryptoNews?.data?.filter((news) => news.title.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Search
          placeholder="Search news"
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 200 }}
        />
      </Col>
      {filteredNews?.map((news, i) => (
        <Col key={i} xs={24} sm={12} lg={8}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.title}
                </Title>
                <img
                  src={news.thumbnail}
                  alt="news"
                  style={{ maxWidth: '200px', height: '100px' }}
                />
              </div>
              <p>
                {news.description.length > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Text className="provider-name">Yahoo Finance</Text>
                </div>
                <Text>{moment(news.createdAt).fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
