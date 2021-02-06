import React from 'react'
import { View } from 'react-native'
import Spinner from '../Spinner'
import ScreenContainer from '../_general/ScreenContainer'

const FullScreenSpinner: React.FC<{}> = () => {
  return (

    <ScreenContainer>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Spinner />
      </View>
    </ScreenContainer>
  )
}

export default FullScreenSpinner