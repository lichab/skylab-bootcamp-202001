import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        margin: 0
    },
    input: {

        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        height: '16%',
        flex: 0.9,
        paddingLeft: 10,
        backgroundColor: 'white',
        shadowColor: 'white',
        shadowOpacity: 100

    },
    optionsContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: 'space-between'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        width: '49.5%',
        height: '48.5%',
        marginBottom: 4
    },
    queryIcon: {
        width: 25,
        height: 25,
        tintColor: '#82A4B3'
    },
    queryButton: {
        paddingLeft: 10,
        backgroundColor: 'white',
        height: '16%',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        justifyContent: 'center',
        shadowColor: 'white',
        shadowOpacity: 100
    }
})

export default styles