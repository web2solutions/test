import { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { IonSearchbar, IonToast, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonInput, IonToggle, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions, IonContent } from '@ionic/react';

import FoundationContext from '../FoundationContext'

// import custom hooks
import useOnAddDocHook from '../hooks/onAddDocHook'
import useOnEditDocHook from '../hooks/onEditDocHook'
import useOnDeleteDocHook from '../hooks/onDeleteDocHook'


import './Drinks.css';

interface Foundation {
  data: any;
}

const Drinks: React.FC = () => {
  const history = useHistory()
  const [searchText, setSearchText] = useState('');
  const [drinks, setDrinks] = useState([])
  const [showToast, setShowToast] = useState(false)
  const foundation: Foundation = useContext(FoundationContext)

  const { Drink } = foundation.data
  const [newDoc] = useOnAddDocHook(Drink)
  const [editedDoc] = useOnEditDocHook(Drink)
  const [deletedDoc] = useOnDeleteDocHook(Drink)

  const handleIWantButton = (e: any, __id: any): any => {
    console.log(e, __id)
    e.preventDefault()
    history.push(`/drink/${__id}`)
  }

  // whatch for new docs
  useEffect(() => {
    if (newDoc !== null) {
      setShowToast(true)
      setDrinks([newDoc, ...drinks])
      // console.log('drinks', drinks)
    }
  }, [newDoc]) 

  // watch for edited docs
  useEffect(() => {
    if (editedDoc !== null) {
      // console.log('editedDoc mudou', editedDoc)
      const newData = drinks.map((drink) => {
        if (drink.__id === editedDoc.__id) {
          return editedDoc
        } else {
          return drink
        }
      })
      setDrinks([...newData])
      // console.log('drinks', drinks)
    }
  }, [editedDoc])

  // watch for deleted docs
  useEffect(() => {
    if (deletedDoc !== null) {

      const allDrinks = [...drinks]
      for (let x = 0; x < allDrinks.length; x++) {
        const drink = allDrinks[x]
        if (drink.__id === deletedDoc.__id) {
          allDrinks.splice(x, 1)
        }
      }
      setDrinks(allDrinks)
    }
  }, [deletedDoc]) 

  useEffect(() => {
    async function findDrinks() {
      const findDrinks = await Drink.find({})
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
          <IonTitle>Drinks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)} animated></IonSearchbar>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Drinks</IonTitle>
          </IonToolbar>
        </IonHeader>
        


        {/*-- List of Sliding Items --*/}
        <IonList>
          {drinks.map((drink) => (
            <IonItemSliding key={drink.__id}>
              <IonItem>
                <IonLabel>{drink.strDrink}</IonLabel>
              </IonItem>
              <IonItemOptions side="end">
                <IonItemOption onClick={e => handleIWantButton(e, drink.__id)}>I want</IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="New drink added."
          duration={200}
        />

      </IonContent>
    </IonPage>
  );
};

export default Drinks;
