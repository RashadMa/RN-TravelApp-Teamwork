import React from 'react'
import { StyleSheet, View } from 'react-native'

const Pagination = ({ datas, currentIndex }: any) => {

      return (
            <View style={styles.container}>
                  {
                        datas.map((e: any, i: any) => (
                              <View key={e.id} style={[styles.dot, currentIndex + 1 <= i ? { opacity: 0.5, } : { opacity: 1 }]} />
                        ))
                  }
            </View>
      )
}

export default Pagination

const styles = StyleSheet.create({
      dot: {
            width: 8,
            height: 8,
            borderRadius: 8,
            backgroundColor: "white"
      },
      container: {
            flexDirection: "row",
            gap: 4,
      }
})