import React, { useEffect } from 'react'

const useOnAddDocHook = function (Model) {
  const [newDoc, newDocSet] = React.useState(null)
  let onAddDocEventListener = null

  React.useEffect(() => {
    if (newDoc === null) {
      onAddDocEventListener = Model.on('add', (eventObj) => {
        const { error, /* document, foundation, */ data } = eventObj
        if (error) {
          return
        }
        newDocSet(data)
      })
    }
  }, [newDoc])

  React.useEffect(() => {
    return () => {
      // stop to listen events on component unmount
      Model.stopListenTo(onAddDocEventListener)
      onAddDocEventListener = null
    }
  }, [])

  return [newDoc]
}

export default useOnAddDocHook
