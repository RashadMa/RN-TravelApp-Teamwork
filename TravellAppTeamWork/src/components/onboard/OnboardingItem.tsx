import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width
const OnboardingItem = ({ item }: any) => {
    return (
        <View style={styles.item}>
            <Image source={item.image} style={styles.img} />
            <View style={styles.textWrapper}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}> {item.description}</Text>
            </View>
        </View >
    )
}

export default OnboardingItem

const styles = StyleSheet.create({
    item: {
        width: SCREEN_WIDTH,
        paddingHorizontal: 16,
        marginTop: 41
    },
    img: {
        width: SCREEN_WIDTH - 32,
        alignSelf: "center",
        height: 343,
        resizeMode: "cover"
    },
    textWrapper: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 32
    },
    title: {
        color: "white",
        fontSize: 24,
        fontWeight: "500",
        textAlign: "center"
    },
    description: {
        color: "white",
        textAlign: "center",
        fontWeight: "400",
        fontSize: 14,
        marginTop: 16
    }
})