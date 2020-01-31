import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonFab, IonFabButton, IonIcon, IonGrid, IonRow,  IonList, IonLabel, IonItem,
  IonCol, IonImg, IonActionSheet } from '@ionic/react';
  import { camera, trash, close } from 'ionicons/icons';
//import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

declare let window: any; // Don't forget this part!


// declare let window: any; // Don't forget this part!
const Tab2: React.FC = () => {
  // Optionally request the permission early
  const scanQRCode = () => {
    window.cordova.plugins.barcodeScanner.scan(
      (result:any) => console.log(result),
      (err:any) => console.error(err),
      {
        showTorchButton: true,
        prompt: "Scan your code",
        formats: "QR_CODE",
        resultDisplayDuration: 0
      }
    );
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
              <h2>Press the button below to scan the QR code</h2>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
      <IonContent>
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => scanQRCode()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;