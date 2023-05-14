import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const CategoryListCard = (props: any) => {
  const [isPressed, setisPressed] = useState(false)
  const SearchByCategory = () => {
    setisPressed(!isPressed)
  }
  return (
    <View>
      <TouchableOpacity onPress={SearchByCategory}>
        <Text style={{ backgroundColor: isPressed ? '#E0783E' : '#1C1C1C', color: 'white', fontSize: 14, padding: 10, borderWidth: 0.5, borderRadius: 8, marginRight: 10, borderColor: "#262626" }}>
          {props.item.icon}  {props.item.name}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default CategoryListCard

const styles = StyleSheet.create({})