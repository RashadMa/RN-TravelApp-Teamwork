import { StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import TabMain from '../../navigation/TabMain';
import SplashStack from '../../navigation/stacks/splash/SplashStack';
import { FirstLoginContext } from '../../context/FirstLoginContext';
import { getUserCategories } from '../../utils/storage/userSavedCategoriesHelper';

const Opening = () => {
      const [loading, setloading] = useState<boolean>(true);

      let { firstLogin, setFirstLogin } = useContext(FirstLoginContext);

      useEffect(() => {

            getUserCategories()
                  .then(res => {
                        if (res) {
                              setFirstLogin(false)
                              setloading(false);
                        }
                        else {
                              setFirstLogin(true);
                              setloading(false);
                        }
                  })

      }, [])

      if (loading) {
            return <></>
      }
      else {

            if (firstLogin)
                  return <SplashStack />
            else
                  return <TabMain />
      }
}

export default Opening

const styles = StyleSheet.create({})