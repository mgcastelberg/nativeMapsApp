import { PermissionStatus } from "../../../infraestructure/interfaces/permissions";
import { request } from 'react-native-permissions';
import { requestLocationPermission, checkLocationPermission } from '../../../actions/permissions/location';
import { create } from "zustand";

interface PermissionState {
    locationStatus: PermissionStatus;

    // Le preguntamos al usuario si loquiere activar
    requestLocationPermission:() => Promise<PermissionStatus>;
    // Solo verifica si tiene permisos
    checkLocationPermission:() => Promise<PermissionStatus>;
}

export const usePermissionStore = create<PermissionState>()( set => ({

    locationStatus: 'undetermined',

    requestLocationPermission: async() => {
        const status = await requestLocationPermission();
        set({ locationStatus: status });
        return status;
    },

    checkLocationPermission: async() => {
        const status = await checkLocationPermission();
        set({ locationStatus: status });
        return status;
    },

}))