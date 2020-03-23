import React, { useState } from 'react'
import { StyleSheet, ScrollView, Dimensions, View, Text } from 'react-native'
import { StackActions } from '@react-navigation/native';
import { Button, MapViewContainer } from '../index'

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width


export default function StepThree({ navigation, route }) {
    const { features, park, getParkData } = route.params
    let numberOfFeatures = 0

    for (let key in features) numberOfFeatures += features[key].length

    // for (let key in park) {
    //     if (park[key] === undefined) park[key] = 'N/A'

    //     if (key !== 'location') {


    //         park[key] = park[key].charAt(0).toUpperCase() + park[key].slice(1)
    //     }
    // }

    const handleParkSubmission = () => {
        let _features = []
        Object.values(features).forEach(value => value.forEach(element => _features.push(element)))
        const { location } = park

        _features.forEach(feature => {
            if (feature.location.coordinates.longitude) feature.location.coordinates = [feature.coordinates.longitude, feature.coordinates.latitude]
            else delete feature.location
        })
        _features.forEach(feature => delete feature.coordinates)

        park.location = {
            type: 'Point',
            coordinates: [location[0].longitude, location[0].latitude]
        }
        getParkData({ features: _features, park })

        navigation.dispatch(StackActions.popToTop());
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flex: 1, width: screenWidth * 0.9 }}>
                <Text style={styles.header}>Park details:</Text>
                <View style={styles.details}>
                    <View style={styles.detailsCols}>
                        <Text styles={styles.fixedText}>Name: </Text>
                        <Text styles={styles.fixedText}>Size: </Text>
                        <Text styles={styles.fixedText}>Level: </Text>
                        <Text styles={styles.fixedText}>Flow: </Text>
                        <Text styles={styles.fixedText}>Features: </Text>

                    </View>
                    <View style={styles.detailsCols}>
                        <Text styles={styles.variableText}>{park.name}</Text>
                        <Text styles={styles.variableText}>{park.size}</Text>
                        <Text styles={styles.variableText}>{park.level}</Text>
                        <Text styles={styles.variableText}>{park.flow}</Text>
                        <Text styles={styles.variableText}>{numberOfFeatures}</Text>
                    </View>

                </View>
                <View style={styles.mapContainer}>
                    <MapViewContainer parkLocation={park.location[0].coordinate} _markers={[park.location[0]]} style={styles.map} />
                </View>

                <Button
                    text='Confirm'
                    style={styles.mainButton}
                    textStyle={styles.buttonText}
                    onPress={handleParkSubmission} />
            </ScrollView>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        height: screenHeight,
        backgroundColor: '#EDF4F9',
        // paddingHorizontal: 10,
        paddingBottom: '30%',
        width: '90%',
        paddingTop: 10,
        alignItems: "center",
        alignSelf: 'center'

    },
    map: {
        flex: 1,
        height: '100%',
        width: '100%'
    },
    header: {
        fontSize: 18,
        margin: 10,
        alignSelf: 'center'
    },
    mapContainer: {
        flex: 0.5,
        height: 100,
        width: '100%',
        alignSelf: 'center',
        paddingBottom: 10,
    },
    details: {
        flex: 0.5,

        height: '35%',
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10
    },
    detailsCols: {
        justifyContent: 'space-around'
    },
    lineRight: {
        borderWidth: 5,
        borderStyle: 'solid',
        borderBottomColor: 'red'
    },
    mainButton: {
        height: 40,
        backgroundColor: '#EFEBDA',
        width: 250,
        alignSelf: 'center',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 1,
        color: '#82A4B3'

    },

})

// Object {
//     "flow": "Fr",
//         "level": "begginer",
//             "location": Array[
//                 Object {
//         "coordinate": Object {
//             "latitude": 41.756695907009345,
//                 "longitude": -0.45843810400002055,
//         },
//     },
//     ],
//     "name": "Ff",
//         "resort": "Gg",
//             "size": "m",
//   }
// Object {
//     "stateBoxes": Array[
//         Object {
//         "coordinates": Object {
//             "coordinate": Object {
//                 "latitude": 41.39340768355141,
//                     "longitude": -0.4237506053332365,
//           },
//         },
//         "description": "Bbv",
//             "size": "l",
//       },
//     ],
//     "stateKickers": Array[
//         Object {
//         "coordinates": Object {
//             "coordinate": Object {
//                 "latitude": 41.847198574442224,
//                     "longitude": -1.2215630746666237,
//           },
//         },
//         "description": "Bhbhh",
//             "size": "xl",
//       },
//     ],
//     "stateOthers": Array[
//         Object {
//         "coordinates": Object {
//             "coordinate": Object {
//                 "latitude": 41.76963268522253,
//                     "longitude": -0.4410943546666285,
//           },
//         },
//         "description": "Jujuu",
//             "size": "xl",
//       },
//     ],
//     "statePipes": Array[
//         Object {
//         "coordinates": Object {
//             "coordinate": Object {
//                 "latitude": 41.76963268522253,
//                     "longitude": -0.6492193466666204,
//           },
//         },
//         "description": "Jj",
//             "size": "xl",
//       },
//     ],
//     "stateRails": Array[
//         Object {
//         "coordinates": Object {
//             "coordinate": Object {
//                 "latitude": 41.471427149376034,
//                     "longitude": -1.1695318266666512,
//           },
//         },
//         "description": "Bbvvv",
//             "size": "xl",
//       },
//     ],
// }