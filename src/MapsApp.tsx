
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native'
import { Text, View } from 'react-native'
import { StackNavigator } from './presentation/navigation/StackNavigator';

export const MapsApp = () => {
    return (
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
    )
}