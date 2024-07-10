
import { Pressable, Text, View } from 'react-native'
import { globalStyles } from '../../../config/theme/styles'
import { usePermissionStore } from '../../store/permissions/usePermissionStore'

export const PermissionScreen = () => {

    const { locationStatus, requestLocationPermission } = usePermissionStore();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>
                Habilitar Ubicación
            </Text>

            <Pressable 
                onPress={ requestLocationPermission }
                style={ globalStyles.btnPrimary }>
                <Text style={{ color: 'white' }}>Habilitar Localización</Text>
            </Pressable>

            <Text>Estado Actual: { locationStatus }</Text>

        </View>
    )
}