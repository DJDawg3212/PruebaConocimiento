import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import * as Location from 'expo-location';

//Funcion principal para obtener la ubicacion del dispositivo
export default function UbicacionActual() {
  
  const [location, setLocation] = useState(null);
  const [locationPermission, setlocationPermission] = useState(null);

  //Permitir la ubicacion actual 
  const askForLocationPermission = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      setlocationPermission(status === 'granted');
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }
  
  // Alerta de permisos
  useEffect(() => {
    askForLocationPermission();
  }, []);

  // Si los permisos no existen envia alerta 
  if (locationPermission === null) {
    return (
      <View style={styles.container}>
        <Text>¡Es Necesario El Acceso A La Ubicacion!</Text>
        <Button title={'Habilitar Ubicacion'} onPress={() => askForLocationPermission()} />
      </View>
    );
  }

  //Si los permisos se denegaron envia la alerta
  if (locationPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No Hay Acceso A La Ubicacion</Text>
        <Button title={'Habilitar Ubicacion'} onPress={() => askForLocationPermission()} />
      </View>
    );
  }

  if (!location){
      return;
  }

  //Si los permisos fueron exitosos cargue los datos y retorne la vista
  let Long = JSON.stringify(location.coords.longitude);
  let Lat = JSON.stringify(location.coords.latitude);
  let Alt = JSON.stringify(location.coords.altitude);
  return (
    <View style={styles.container}>
      <Text style={styles.maintext}>Longitud: {Long}</Text>
      <Text style={styles.maintext}>Latitud: {Lat}</Text>
      <Text style={styles.maintext}>Altitud: {Alt}</Text>
    </View>
  );

}

//Variable de estilos generales
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
});