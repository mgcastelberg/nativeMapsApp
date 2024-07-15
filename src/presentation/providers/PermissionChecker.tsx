
import { Children, PropsWithChildren, useEffect } from 'react'
import { AppState, Text, View } from 'react-native'
import { usePermissionStore } from '../store/permissions/usePermissionStore';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../navigation/StackNavigator';

export const PermissionChecker = ({ children }: PropsWithChildren) => {

    const { locationStatus, checkLocationPermission } = usePermissionStore();
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    useEffect(() => {
        if ( locationStatus === 'granted' ) {
            // navigation.navigate('MapScreen');
            navigation.reset({
                index: 0,
                routes: [{ name: 'MapScreen' }],
            });
        } else if (locationStatus !== 'undetermined')  {
            // navigation.navigate('PermissionScreen');
            navigation.reset({
                index: 0,
                routes: [{ name: 'PermissionScreen' }],
            });
        }
    }, [locationStatus]);

    useEffect(() => {
        checkLocationPermission();
    }, []);

    // Con esto podemos saber el estatus de nuestra app, si esta activa, en segundo plano o en primer plano
    useEffect(() => {
        const subscription = AppState.addEventListener('change', (nextAppState) => {
            if ( nextAppState === 'active' ) {
                checkLocationPermission();
            }
            // console.log('AppState',nextAppState);
        });
        
        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <>{ children }</>
    )
}