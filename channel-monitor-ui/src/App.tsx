import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button, Card, List, Avatar, Icon, Modal } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import * as iotaMam from "./utils/iota-mam";
import ScanDialog from "./components/ScanDialog";

const data = [
  {
    title: "OnePlus Dominic",
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
const App: React.FC = () => {
  const [channel, setChannel] = useState<any>(null);

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
                <a
                  key="list-loadmore-eye"
                  onClick={() => {
                    console.log("CHANNEL", channel);

                    if (channel) {
                      iotaMam.readMam(channel);
                    }
                  }}
                >
                  <Icon type="eye" />
                </a>,
                <a key="list-loadmore-edit">
                  <Icon type="edit" />
                </a>,
                <a key="list-loadmore-delete">
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
        <ScanDialog></ScanDialog>
      </Card>
    </div>
  );
};

export default App;
