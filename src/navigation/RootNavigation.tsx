import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import Home from '../screens/home';
import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();

const RootNavigation = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={props => <CustomDrawer {...props} />}
          screenOptions={{
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#333',
            drawerStyle: {
              backgroundColor: '#fff',
              width: 280,
            },
          }}>
          <Drawer.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Audio Recorder',
              headerShown: false,
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default RootNavigation;
