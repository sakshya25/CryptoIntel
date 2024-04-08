import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography, Select } from 'antd';

const { Title } = Typography;
const { Option } = Select;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const [selectedRange, setSelectedRange] = useState('30');
  const [coinTimestamp, setCoinTimestamp] = useState([]);
  const coinPrice = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  const generateTimestamp = (range) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(range, 10)); // Adjust the start date based on the selected range

    const timestamps = [];
    for (let i = 0; i <= parseInt(range, 10); i++) {
      const newDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
      timestamps.push(newDate.toLocaleDateString());
    }
    setCoinTimestamp(timestamps);
  };

  useEffect(() => {
    generateTimestamp(selectedRange);
  }, [selectedRange]);

  const handleRangeChange = (value) => {
    setSelectedRange(value);
  };

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change: {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
        <Col span={24}>
          <Select
            value={selectedRange}
            style={{ width: 200, color: 'black' }}
            onChange={handleRangeChange}
          >
            <Option value="7">7 days</Option>
            <Option value="30">30 days</Option>
            <Option value="90">90 days</Option>
          </Select>
        </Col>
      </Row>
      <Line data={data} />
    </>
  );
};

export default LineChart;
