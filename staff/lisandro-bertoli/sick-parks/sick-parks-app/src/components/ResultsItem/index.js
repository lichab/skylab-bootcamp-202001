import React from 'react'
import { Text, TouchableOpacity, View, Image } from 'react-native'
import styles from './styles'


export default function ResultsItem({ park, onToPark }) {
    const { name, size, resort, verified, rating, id } = park

    const handleOnToPark = () => onToPark(id)

    return (<>

        <TouchableOpacity style={styles.container} onPress={handleOnToPark}>
            <View style={styles.item}>
                <Image style={styles.image} source={require('../../../assets/logo.png')} />
                <View style={styles.colOne}>
                    <Text style={styles.textBold}>{name}</Text>
                    <Text> </Text>
                    <Text style={styles.text}>Resort: {resort}</Text>
                    <Text style={styles.text}>Size: {size.toUpperCase()}</Text>
                </View>
                <View style={styles.colTwo}>
                    {verified && <Text style={styles.true}>Verified</Text>}
                    {!verified && <Text style={styles.false}>Unverified</Text>}
                    <Text style={styles.text}>Votes: {rating ? rating : 0}</Text>
                </View>
            </View>
        </TouchableOpacity>
    </>
    )
}



