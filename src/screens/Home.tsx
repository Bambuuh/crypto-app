import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Button, Text, View } from 'react-native'
import ScreenContainer from '../components/_general/ScreenContainer'
import { ScreenRoute } from '../navigation/navConstants'

const Home: React.FC<{}> = () => {

  const navigation = useNavigation()

  const onPress = () => {
    navigation.navigate(ScreenRoute.HOME)
  }

  return (
    <ScreenContainer>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>HOME</Text>
        <Button title="next" onPress={onPress} />
      </View>
    </ScreenContainer>
  )
}

export default Home
