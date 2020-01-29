import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./index.css";
import { Button, Card, List, Avatar, Icon, Modal } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import * as iotaMam from "../../utils/iota-mam";
var QRCode = require("qrcode");

const ScanDialog: React.FC = () => {
  const [channel, setChannel] = useState<any>(null);
  const [isModalVisible, setModalVisibility] = useState<any>(null);

  const createCanvas = (canvas: HTMLElement, channelRoot: string) =>
    QRCode.toCanvas(canvas, channelRoot, function(error: any) {
      if (error) console.error(error);
      console.log("success!");
    });

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    setTimeout(() => {
      const canvas = document.getElementById("canvas");
      if (canvas && channel) {
        createCanvas(canvas, channel.seed);
      }
    }, 300);
  });

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
    <>
      <Button
        type="primary"
        onClick={() => {
          const channel = iotaMam.initMamChannel();
          setChannel(channel);
          showModal();
        }}
      >
        Add Channel
      </Button>
      <Modal
        title="Add Channel"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="modal-body-container">
          <canvas id="canvas"></canvas>
          <p>Please scan the QR code.</p>
        </div>
      </Modal>
    </>
  );
};

export default ScanDialog;
