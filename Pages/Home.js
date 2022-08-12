import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import viewScaner from './Scaner';
import viewUbicacion from './Ubicacion';

const Tab = createBottomTabNavigator();

export const BottomTab = () => {

    return (
    <Tab.Navigator>
        <Tab.Screen name="Escanear" component={viewScaner} />
        <Tab.Screen name="Ubicacion" component={viewUbicacion} />
    </Tab.Navigator>
    );
}