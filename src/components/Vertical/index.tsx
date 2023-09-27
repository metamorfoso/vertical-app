import React from 'react'
import { Text } from 'tamagui'

import { useAppSelector } from '../../redux/hooks'
import { selectVertical } from '../../redux/positionSlice'

const Vertical: React.FC = () => {
  const { ascent, descent } = useAppSelector(selectVertical)

  return (
    <>
      <Text>
        Ascent: {ascent}
      </Text>
      <Text>
        Descent: {descent}
      </Text>
    </>
  )
}

export default Vertical