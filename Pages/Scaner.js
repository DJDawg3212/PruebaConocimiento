import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

//Funcionalidad principal de escanear y pintar el contenido de un codigo QR o un codigo de barras
export default function Scaner() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Escanear Codigo');

    //Componente para validacion de permisos de la camara
    const askForCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })()
    }

    // Usar la alerta de la camara
    useEffect(() => {
        askForCameraPermission();
    }, []);

    // Retorno de datos de lo que trae la escaneada
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setText(data);
        console.log('Type: ' + type + '\nData: ' + data);
    };

    // Si no se han reconocido los permisos enviar el bloque de adevertencia
    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>¡Es Necesario El Acceso A La Camara!</Text>
                <Button title={'Habilitar Camara'} onPress={() => askForCameraPermission()} />
            </View>)
    }

    //Si los permisos fueron denegados enviar bloque de advertencia
    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={{ margin: 10 }}>No Hay Acceso A La Camara</Text>
                <Button title={'Habilitar Camara'} onPress={() => askForCameraPermission()} />
            </View>)
    }

    // Retornar la vista principal del Escaner funcional
    return (
        <View style={styles.container}>
            <View style={styles.barcodebox}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{ height: 400, width: 400 }} />
            </View>
            <Text style={styles.maintext}>{text}</Text>
            {scanned && <Button title={'¿Escanear De Nuevo?'} onPress={() => setScanned(false)} color='orange' />}
        </View>
    );
}

//Estilos del sistema
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
    barcodebox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: 'tomato'
    }
});