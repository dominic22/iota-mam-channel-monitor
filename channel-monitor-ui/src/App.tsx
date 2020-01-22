import React, { useState, useEffect } from 'react';
import logo from "./logo.svg";
import "./App.css";
import { Button, Card, List, Avatar, Icon } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
var QRCode = require("qrcode");

const data = [
  {
    title: "Ant Design Title 1",
    description: "Ant Design Title 1"
  },
  {
    title: "Ant Design Title 2",
    description: "Ant Design Title 2"
  },
  {
    title: "Ant Design Title 3",
    description: "Ant Design Title 3"
  },
  {
    title: "Ant Design Title 4",
    description: "Ant Design Title 4"
  }
];
const createCanvas = (canvas:HTMLElement, channelRoot:string) => QRCode.toCanvas(canvas, channelRoot, function(error: any) {
  if (error) console.error(error);
  console.log("success!");
})
const App: React.FC = () => {

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const channelRoot = 'TESTSEWADIOJAWOIDJAWAOWIDJOAIWJDOWAIDJ';
    if(canvas) {
      createCanvas(canvas, channelRoot);
    }
  });

  return (
    <div className="app">
      <h3>Subscribed Channels</h3>
      <Card>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item
              actions={[
                <a key="list-loadmore-edit">
                  <Icon type="edit" />
                </a>,
                <a key="list-loadmore-edit">
                  <Icon type="delete" />
                </a>
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar shape="square" size={48} icon="phone" />}
                title={<a href="https://ant.design">{item.title}</a>}
                description={item.description}
              />
            </List.Item>
          )}
        />
        <Button type="primary">Add Channel</Button>
        <canvas id="canvas"></canvas>
        
      </Card>
    </div>
  );
};

export default App;
