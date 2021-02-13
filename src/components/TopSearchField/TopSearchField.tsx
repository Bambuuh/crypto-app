import React from 'react'
import Input from '../Input'
import * as S from './styled'

type OwnProps = {
  value: string
  onChangeText: (value: string) => void
}

type Props = OwnProps

export const TopSearchField: React.FC<Props> = ({ value, onChangeText }) => {
  return (
    <S.Container>
      <Input inputProps={{ placeholder: 'Search', value, onChangeText }} />
    </S.Container>
  )
}

export default TopSearchField