import React from 'react'
import { View, FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import theme from '../../theme'
import * as S from './styled'

export type SideSwiperItem = {
  title: string
  value: string
}

type OwnProps = {
  selectedValue: any
  onPressItem: (value: string) => void
  items: SideSwiperItem[]
}

type Props = OwnProps

const SideSwiper: React.FC<Props> = ({ items, selectedValue, onPressItem }) => {

  const renderItem = ({ item, index }: { item: SideSwiperItem, index: number }) => {
    const onPress = () => onPressItem(item.value)
    return (
      <TouchableOpacity onPress={onPress}>
        <S.SwiperButton active={item.value === selectedValue} isLast={index === items.length - 1}>
          <S.SwiperButtonText>{item.title}</S.SwiperButtonText>
        </S.SwiperButton>
      </TouchableOpacity>
    )
  }

  const keyExtractor = (item: SideSwiperItem) => {
    return item.title
  }

  return (
    <View>
      <FlatList
        contentContainerStyle={{ padding: theme.baseline * 4 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  )
}

export default SideSwiper