import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select'; // Ensure this package is installed
import datasource from './Data'; // Ensure correct import of the data source

const Add = ({ navigation }) => {
    const [pokemonName, setPokemonName] = useState(''); // State for Pokémon name
    const [cardNumber, setCardNumber] = useState(''); // State for card number
    const [pokemonType, setPokemonType] = useState('Water'); // Default to the first type

    const handleSubmit = () => {
        if (!pokemonName.trim() || !cardNumber.trim()) {
            Alert.alert('Error', 'Please enter a valid Pokémon name and card number.');
            return;
        }

        if (isNaN(cardNumber)) {
            Alert.alert('Error', 'Card number must be a number.');
            return;
        }

        // Create a new Pokémon object
        const newPokemon = {
            key: pokemonName.trim(),
            cardNumber: cardNumber.trim(),
        };

        // Find the section based on the Pokémon type
        const sectionIndex = datasource.findIndex(
            (section) => section.title === pokemonType
        );

        if (sectionIndex === -1) {
            Alert.alert('Error', 'Invalid Pokémon type selected.');
            return;
        }

        // Add the new Pokémon to the selected type
        datasource[sectionIndex].data.push(newPokemon);

        // Navigate back to Home screen
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            {/* Input for Pokémon Name */}
            <Text style={styles.label}>Pokémon Name:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Pokémon Name"
                value={pokemonName}
                onChangeText={setPokemonName}
            />

            {/* Input for Card Number */}
            <Text style={styles.label}>Card Number:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Card Number"
                keyboardType="numeric" // Use numeric keyboard for card number
                value={cardNumber}
                onChangeText={setCardNumber}
            />

            {/* Picker Select for Pokémon Type */}
            <Text style={styles.label}>Pokémon Type:</Text>
            <RNPickerSelect
                onValueChange={(value) => setPokemonType(value)}
                items={datasource.map((section) => ({
                    label: section.title,
                    value: section.title,
                }))}
                value={pokemonType}
            />

            {/* Submit Button */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Add Pokémon</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#F3E5F5', // Light purple background
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#4B0082', // Deep purple for labels
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        padding: 12,
        borderRadius: 10,
        marginBottom: 20,
        fontSize: 16,
        backgroundColor: '#FFFFFF', // White background for input fields
    },
    button: {
        backgroundColor: '#4B0082', // Deep purple
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#FFFFFF', // White text
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Add;
