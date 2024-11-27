import React from 'react';
import { SectionList, TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';
import datasource from './Data';

const Home = ({ navigation }) => {
    // Render each item in the SectionList
    const renderItem = ({ item, section, index }) => (
        <TouchableOpacity
            style={styles.cardItem}
            onPress={() =>
                navigation.navigate('Edit', {
                    sectionIndex: datasource.indexOf(section), // Index of the section
                    itemIndex: index, // Index of the item within the section
                })
            }
        >
            <Text style={styles.pokemonName}>{item.key}</Text>
            <Image
                source={{
                    uri: `https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_${item.cardNumber}-2x.png`,
                }}
                style={styles.cardImage}
            />
        </TouchableOpacity>
    );

    // Render the section header for the SectionList
    const renderSectionHeader = ({ section: { title, bgColor, icon } }) => (
        <View style={[styles.sectionHeader, { backgroundColor: bgColor }]}>
            <Text style={styles.sectionHeaderText}>
                {icon} {title}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Add Pokémon Button */}
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('Add')} // Navigate to the Add screen
                >
                    <Text style={styles.addButtonText}>ADD POKEMON</Text>
                </TouchableOpacity>
            </View>

            {/* SectionList */}
            <SectionList
                sections={datasource}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                keyExtractor={(item, index) => `${item.key}-${index}`} // Added unique key extractor
            />
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3E5F5',
    },
    headerContainer: {
        padding: 20,
        backgroundColor: '#F3E5F5',
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: '#4B0082',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    sectionHeader: {
        padding: 10,
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 10,
    },
    sectionHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
    cardItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#FFFFFF',
        marginHorizontal: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    pokemonName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 40,
    },
    cardImage: {
        width: 220,
        height: 280,
        resizeMode: 'contain',
    },
});
