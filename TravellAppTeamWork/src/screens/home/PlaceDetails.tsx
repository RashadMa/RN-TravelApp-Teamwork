import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BaseNetwork } from '../../network/api';
import MapView, { Marker } from 'react-native-maps';

const PlaceDetails = ({ route }: any) => {
  const [detail, setDetail] = useState<any>({});
  const [loading, setloading] = useState(true)
  let { id } = route.params;

  useEffect(() => {
    let baseNetwork = new BaseNetwork();
    baseNetwork.getById('places/', id)
      .then(data => {
        console.log('data', data);
        setDetail(data);
        setloading(false);
      })
      .catch(err => {
        console.log('Error ', err);
      })
  }, [])



  const initialRegion = {
    latitude: 40.4093,
    longitude: 49.8671,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={{ margin: 15 }}>
        <View style={styles.detailWrapper}>
          <Image source={{ uri: detail.imageUrl }} style={{ width: '100%', height: 220, resizeMode: "cover", borderRadius: 12 }} />
          <View style={styles.cardFooter}>
            <Text style={styles.detailName}>{detail.name}</Text>
            <Text style={styles.detailRate}>⭐️ {detail.rate}</Text>
          </View>
        </View>
        <View style={styles.infoWrapper}>
          <View>
            <Text style={styles.info}>
              Information
            </Text>
          </View>
          <View>
            <Text style={styles.infoText}>🕘  Mon - Fri, {detail.openCloseTime}</Text>
            <Text style={styles.infoText}>📞  {detail.phone}</Text>
            <Text style={styles.infoText}>📍  {detail.adress}</Text>
          </View>
        </View>
        <View style={styles.mapWrapper}>
          <View>
            <Text style={styles.mapText}>
              Map
            </Text>
          </View>
          <MapView
            style={styles.map}
            initialRegion={initialRegion}
          >
            <Marker
              coordinate={{ latitude: detail.lat, longitude: detail.long }}
              title="Marker Title"
              description="Marker Description"
            />
          </MapView>
          <TouchableOpacity style={styles.mapButton}>
            <Text style={styles.btnText}>Go to map</Text>
          </TouchableOpacity>
        </View>
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
  container: {
    backgroundColor: '#1c1c1c',
    flex: 1,
  },
  detailWrapper: {
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  detailName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    width: '80%',
  },
  detailRate: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  infoWrapper: {
    marginTop: 20,
  },
  info: {
    color: '#E8E8E8',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 15,
  },
  infoText: {
    color: '#B9B9B9',
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 10,
  },
  mapWrapper: {
    // marginTop: 20,
  },
  map: {
    width: '100%',
    height: 170,
    borderRadius: 12,
  },
  mapText: {
    color: '#E8E8E8',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 15,
  },
  mapButton: {
    backgroundColor: "#018CF1",
    borderRadius: 8,
    marginTop: 20,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  }
})