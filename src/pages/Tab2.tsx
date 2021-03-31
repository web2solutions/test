
import { useContext, useState, useEffect } from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol, IonImg, IonActionSheet } from '@ionic/react'
import { camera, trash, close } from 'ionicons/icons'
import FoundationContext from '../FoundationContext'

import { usePhotoGallery } from '../hooks/usePhotoGallery'
import './Tab2.css'



interface Foundation {
  data: any;
}
const Tab2: React.FC = () => {
  const foundation: Foundation = useContext(FoundationContext)

  const { Drink } = foundation.data
  const { photos, takePhoto } = usePhotoGallery()
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Photo Gallery</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            {photos.map((photo, index) => (
              <IonCol size="6" key={index}>
                <IonImg src={photo.webviewPath} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => takePhoto()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  )
}

export default Tab2
