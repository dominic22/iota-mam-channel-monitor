import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonFab, IonFabButton, IonIcon, IonGrid, IonRow,  IonList, IonLabel, IonItem,
  IonCol, IonImg, IonActionSheet } from '@ionic/react';
  import { camera, trash, close } from 'ionicons/icons';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

const scanQRCode = () => {
  QRScanner.prepare()
    .then((status: QRScannerStatus) => {
       if (status.authorized) {
         // camera permission was granted
  
  
         // start scanning
         let scanSub = QRScanner.scan().subscribe((text: string) => {
           console.log('Scanned something', text);
  
           QRScanner.hide(); // hide camera preview
           scanSub.unsubscribe(); // stop scanning
         });
  
       } else if (status.denied) {
         // camera permission was permanently denied
         // you must use QRScanner.openSettings() method to guide the user to the settings page
         // then they can grant the permission from there
       } else {
         // permission was denied, but not permanently. You can ask for permission again at a later time.
       }
    })
    .catch((e: any) => console.log('Error is', e));
}

// declare let window: any; // Don't forget this part!
const Tab2: React.FC = () => {
  // Optionally request the permission early
  
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
              <h2>Go to detail</h2>
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