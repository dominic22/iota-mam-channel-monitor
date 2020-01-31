import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./index.css";
import { Button, Card, List, Avatar, Icon, Modal } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import * as iotaMam from "../../utils/iota-mam";
var QRCode = require("qrcode");

interface Props {
  seed:string | null;
  isVisible:boolean;
  handleCancel: () => void;
}

const ScanDialog: React.FC<Props> = (props) => {
  
  const createCanvas = (canvas: HTMLElement, channelRoot: string) =>
    QRCode.toCanvas(canvas, channelRoot, function(error: any) {
      if (error) console.error(error);
      console.log("success!");
    });

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    setTimeout(() => {
      const canvas = document.getElementById("canvas");
      if (canvas && props.seed) {
        createCanvas(canvas, props.seed);
      }
    }, 300);
  });

  return (
    <>
      <Modal
        title="Add Channel"
        visible={props.isVisible}
        onOk={props.handleCancel}
        onCancel={props.handleCancel}
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
