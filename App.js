import { StatusBar } from 'expo-status-bar';
import {ActivityIndicator, SafeAreaView} from 'react-native';
import React, {useEffect, useState, useMemo} from 'react';

// Импорт навигационного меню
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

// Импорт view
import Settings from './component/Settings';
import HomeWork from './component/HomeWork';
import Notifications from './component/Notifications';
import Login from './component/Login';
import Message from './component/Message';
import GradeBook from './component/GradeBook';
import Profile from './component/Profile';

// импорт контекста аутентификации
import {AuthContext} from "./context/context";

import { gStyle } from './constant/style'; 
import { getToken,checkMail, getUserID } from './requestAPI/API';

const Drawer = createDrawerNavigator();

export default function App() {
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const authContent = useMemo(() => ({
    signIn: () => {
        setIsLoading(false)
        setToken('')
    },
    signOut: () => {
        setIsLoading(false)
        setToken(null)
    }
  }), [])

  useEffect(() => {
    getToken().then((value)=>{
      if (value){
        setToken(value)
      }
    })
  })

  useEffect(() => {
    setTimeout(() => {
        setIsLoading(false)
    }, 800)
  }, [])

  if (isLoading) {
    return (
        <SafeAreaView style={gStyle.container}>
            <ActivityIndicator size='large' />
        </SafeAreaView>
    )
}

    
    return (
      <AuthContext.Provider value={authContent}>
        <NavigationContainer  >
          <Drawer.Navigator screenOptions={{
            headerStyle:{backgroundColor:'#edf3fc'}
          }}>
          {token !== null ? (
            <>
              <Drawer.Screen name="Мой профиль" component={Profile}/>
              {/* <Drawer.Screen name="Уведомления" component={Notifications}/> */}
              <Drawer.Screen name="Сообщения"  component={Message} />
              <Drawer.Screen name="Курсы" component={HomeWork} />
              <Drawer.Screen name="Зачетная книжка" component={GradeBook} />
              <Drawer.Screen name="Настройки" component={Settings} />
            </>
              ) : (
                  <>
                  <Drawer.Screen name="Login" 
                  component={Login}  
                  options={{
                    drawerStyle:{
                      backgroundColor:"red"
                    },
                    headerShown: false,
                    swipeEnabled: false,
                  }}  />
                  </>
              )}
          </Drawer.Navigator>
          <StatusBar style='auto' />
        </NavigationContainer>
      </AuthContext.Provider>
    );
  };
