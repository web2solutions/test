import { useContext, useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router';

import { IonToast, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonInput, IonToggle, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions, IonContent } from '@ionic/react';

import FoundationContext from '../FoundationContext'



import './Drink.css';

interface Foundation {
  data: any;
}

interface DrinkDetailPageProps extends RouteComponentProps<{
  __id: string;
}> { }

const Drink: React.FC<DrinkDetailPageProps> = ({ match, history }) => {
  const { __id } = match.params
  const [drinks, setDrinks] = useState([])
  const [showToast, setShowToast] = useState(false)
  const foundation: Foundation = useContext(FoundationContext)

  const { Drink } = foundation.data

  const handleIWantButton = (e: any, __id: any): any => {
    console.log(e, __id)
    e.preventDefault()
    history.push(`/drink/${__id}`)
  }

  

  useEffect(() => {
    async function findDrinks() {
      console.log('>>>>>>>>>>>>>>>=========', __id)
      const findDrinks = await Drink.findById(__id)
      if (!findDrinks) {
        return
      }
      if (findDrinks.data) {
        setDrinks(findDrinks.data)
      }
    }
    // console.log('finding')
    if (drinks.length === 0) {
      findDrinks()
    }
  }, [drinks])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Drink</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Drink</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="This drink was updated."
          duration={200}
        />

      </IonContent>
    </IonPage>
  );
};

export default Drink;
