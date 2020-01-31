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
    seed: "KVU9JNLDJMRL9NEGXAHQKPOUR9QNNQBTSRVGQQCTCLHENBGQPEAXENXSBLQLPLVGBOQWRYBVBRCHXKRSQ",
    initialRoot: "MRGHFEPKIAWWVYYLCAJEZDFGIF9TXQKDNDZXOROYEIXCLUEKBQE9EYVSUJLLHBFYAHQCEFLBYVUOVQLLA",
    nextRoot: "MRGHFEPKIAWWVYYLCAJEZDFGIF9TXQKDNDZXOROYEIXCLUEKBQE9EYVSUJLLHBFYAHQCEFLBYVUOVQLLA",
    description: "Ant Design Title 1"
  },
  {
    title: "Iphone 8 Peter",
    seed:"KVU9JNLDJMRL9NEGXAHQKPOUR9QNNQBTSRVGQQCTCLHENBGQPEAXENXSBLQLPLVGBOQWRYBVBRCHXKRSQ",
    initialRoot: "MRGHFEPKIAWWVYYLCAJEZDFGIF9TXQKDNDZXOROYEIXCLUEKBQE9EYVSUJLLHBFYAHQCEFLBYVUOVQLLA",
    nextRoot: "MRGHFEPKIAWWVYYLCAJEZDFGIF9TXQKDNDZXOROYEIXCLUEKBQE9EYVSUJLLHBFYAHQCEFLBYVUOVQLLA",
    description: "Ant Design Title 2"
  },
  {
    title: "Test phone",
    seed:"KVU9JNLDJMRL9NEGXAHQKPOUR9QNNQBTSRVGQQCTCLHENBGQPEAXENXSBLQLPLVGBOQWRYBVBRCHXKRSQ",
    initialRoot: "MRGHFEPKIAWWVYYLCAJEZDFGIF9TXQKDNDZXOROYEIXCLUEKBQE9EYVSUJLLHBFYAHQCEFLBYVUOVQLLA",
    nextRoot: "MRGHFEPKIAWWVYYLCAJEZDFGIF9TXQKDNDZXOROYEIXCLUEKBQE9EYVSUJLLHBFYAHQCEFLBYVUOVQLLA",
    description: "Ant Design Title 3"
  },
];

const App: React.FC = () => {
  const [newChannel, setChannel] = useState<any>(null);
  const [currentSeed, setCurrentSeed] = useState<string | null>(null);
  const [isModalVisible, setModalVisibility] = useState<any>(null);

  const showModal = () => {
    setModalVisibility(true);
  };

  const handleOk = () => {
    setModalVisibility(false);
  };

  const handleCancel = () => {
    setModalVisibility(false);
  };
  
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
                    console.log('channelxx', item.nextRoot);
                    iotaMam.readAllMessages(item.nextRoot);
                  }}
                >
                  <Icon type="eye" />
                </a>,
                <a key="list-loadmore-edit"
                onClick={() => {
                  setCurrentSeed(item.seed);
                  showModal();
                }}
                >
                  <Icon type="info-circle" />
                </a>,
                <a key="list-loadmore-add"
                onClick={() => {
                  const channel = iotaMam.createMamChannelBySeed(item.seed);
                  if (channel) {
                    console.log('channelxx', channel);
                    iotaMam.publishMamMessage(channel);
                  }
                }}>
                  <Icon type="plus" />
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
        <Button
        type="primary"
        onClick={() => {
          const newChannel = iotaMam.initMamChannel();
          setChannel(newChannel);
          setCurrentSeed(newChannel.seed);
          showModal();
        }}
      >
        Add Channel
      </Button>
        <ScanDialog
          seed={currentSeed}
          isVisible={isModalVisible}
          handleCancel={handleCancel}
        ></ScanDialog>
      </Card>
    </div>
  );
};

export default App;
