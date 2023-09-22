import { GeolocationResponse } from '@react-native-community/geolocation';
import { Text } from 'tamagui';

interface Props {
  position: GeolocationResponse
}

const Altitude = ({ position }: Props) => {
  return (
    <Text>
      Altitude: {position?.coords?.altitude}
    </Text>
  )
}

export default Altitude