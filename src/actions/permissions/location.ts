import { check, openSettings, PERMISSIONS, request, PermissionStatus as RNPermissionsStatus } from "react-native-permissions";
import type { PermissionStatus } from "../../infraestructure/interfaces/permissions";
import { Platform } from "react-native";


export const requestLocationPermission = async ():Promise<PermissionStatus> => {
    let status: RNPermissionsStatus = 'unavailable';
    // request abre un cuadro de dialogo
    if ( Platform.OS === 'ios' ) {
        status = await request( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE )
    } else if( Platform.OS === 'android' ) {
        status = await request( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION )
    } else {
        status = 'unavailable';
        throw new Error("Platform not supported");
    }

    if (status === 'blocked') {
        await openSettings();
        // return checkLocationPermission();
    }

    // Mapa como si usaramos un switch
    const permissionMapper: Record<RNPermissionsStatus, PermissionStatus> = {
        'granted': 'granted',
        'denied': 'denied',
        'blocked': 'blocked',
        'unavailable': 'unavailable',
        'limited': 'limited'
    };

    return permissionMapper[status] ?? "undetermined";

}

export const checkLocationPermission = async ():Promise<PermissionStatus> => {

    let status: RNPermissionsStatus = 'unavailable';
    // check solo nos dice si tenemos permisos
    if ( Platform.OS === 'ios' ) {
        status = await check( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE )
    } else if( Platform.OS === 'android' ) {
        status = await check( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION )
    } else {
        status = 'unavailable';
        throw new Error("Platform not supported");
    }

    // Mapa como si usaramos un switch
    const permissionMapper: Record<RNPermissionsStatus, PermissionStatus> = {
        'granted': 'granted',
        'denied': 'denied',
        'blocked': 'blocked',
        'unavailable': 'unavailable',
        'limited': 'limited'
    };

    return permissionMapper[status] ?? "undetermined";
}