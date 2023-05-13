import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BaseNetwork } from '../../network/api';

const PlaceDetails = ({ route }: any) => {
  const [detail, setDetail] = useState<any>({});
  const [loading, setloading] = useState(true)
  let { id } = route.params;

  useEffect(() => {
    let baseNetwork = new BaseNetwork();
    baseNetwork.getById('places', id)
      .then(data => {
        setDetail(data);
        setloading(false);
      })
      .catch(err => {
        console.log('Error ', err);
      })
  }, [])
console.log(detail, 'detail');

  return (
    <SafeAreaView>
      <View style={{ margin: 15 }}>
<View>
<Image source={{ uri: detail.imageUrl }} style={{ width: '100%', height: 253, resizeMode: "cover" }} />
</View>
      <Text>PlaceDetails</Text>
      </View>
    </SafeAreaView>
  )
}

export default PlaceDetails

const styles = StyleSheet.create({
  loading: {
    color: '#E0783E',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: 400 }],
  },
})