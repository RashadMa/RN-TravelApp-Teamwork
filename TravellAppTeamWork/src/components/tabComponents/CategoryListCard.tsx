import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const CategoryListCard = (props: any) => {
  const [isPressed, setisPressed] = useState(false)
  const SearchByCategory = () => {
    setisPressed(!isPressed)
  }
  return (
    <View>
        <Text style={{ backgroundColor: props.color, color: 'white', fontSize: 14, padding: 10, borderWidth: 0.5, borderRadius: 8, marginRight: 10, borderColor: "#262626" }}>
          {props.item.icon}  {props.item.name}
        </Text>
    </View>
  )
}

export default CategoryListCard

const styles = StyleSheet.create({})