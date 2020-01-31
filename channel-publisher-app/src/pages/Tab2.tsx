import React, { useState, useEffect } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonFab, IonFabButton, IonIcon, IonGrid, IonRow,  IonList, IonLabel, IonItem,
  IonCol, IonImg, IonActionSheet } from '@ionic/react';
  import { camera, trash, close, call } from 'ionicons/icons';
//import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

declare let window: any; // Don't forget this part!
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
    callback('KVU9JNLDJMRL9NEGXAHQKPOUR9QNNQBTSRVGQQCTCLHENBGQPEAXENXSBLQLPLVGBOQWRYBVBRCHXKRSQ');
  }
}

// declare let window: any; // Don't forget this part!
const Tab2: React.FC = () => {
  const [seed, setSeed] = useState<string>('');
  const sendInitialMessage = (seed:string) => {
    console.log('AA');
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
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
      <IonContent>
        <IonLabel>
          <p>Current seed: { seed}</p>
        </IonLabel>
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