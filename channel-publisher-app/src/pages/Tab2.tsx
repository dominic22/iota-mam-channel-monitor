import React, { useState, useEffect } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonFab, IonFabButton, IonIcon, IonGrid, IonRow,  IonList, IonLabel, IonItem,
  IonCol, IonImg, IonActionSheet, IonButton } from '@ionic/react';
import { camera, trash, close, call } from 'ionicons/icons';
import * as iotaMam from "../utils/iota-mam";

declare let window: any; // Don't forget this part!
(window as any).IOTA = iotaMam;
const scanQRCode = (callback: (seed:string) => void) => {
  try {
    window.cordova.plugins.barcodeScanner.scan(
      (result:any) => {
        callback(result.text);
        console.log(result);
      },
      (err:any) => console.error(err),
      {
        showTorchButton: true,
        prompt: "Scan your code",
        formats: "QR_CODE",
        resultDisplayDuration: 0
      }
    );
  } catch(e) {
    // just for development we set temporary IOTA seed
    callback("HBTLWYSWEHEKBYTZHH9RZLUTCUXADBZRWPMCNNTHOU9EPYBYHGFVTXFQFXFVCWWRVUMBIUKMTCCJSOQBD");
  }
}

// declare let window: any; // Don't forget this part!
const Tab2: React.FC = () => {
  const [seed, setSeed] = useState<string>('');
  let channel:any = null;

  const sendInitialMessage = (seed:string) => {
    setSeed(seed);
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab Two</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem routerLink="/tab2/details">
            <IonLabel>
              <h2>Press the button below to scan the QR5 code</h2>
              <p>Always use window.IOTA.initMamChannel(); to create a channel when in dev mode. then copy into callback method above.</p>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
      <IonContent>
        <IonLabel>
          <p>Current seed: { seed }</p>
        </IonLabel>
        {seed && <IonButton onClick={() => {
          // If we couldn't load the details then create a new channel.
          
          if(!channel) {
            channel = iotaMam.createMamChannelBySeed(seed);
          }

          iotaMam.publishMamMessage(channel);
          // iotaMam.saveChannelState(channel);
        }}>Publish Message</IonButton>}
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => scanQRCode(sendInitialMessage)}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;