import React from 'react'
import * as S from './styled'

const ScreenContainer: React.FC = ({ children }) => {
  return (
    <S.Container>{children}</S.Container>
  )
}

export default ScreenContainer