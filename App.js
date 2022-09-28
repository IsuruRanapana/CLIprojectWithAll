import {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './src/routes/PrimaryNavigator';
import {Provider} from 'react-redux';
import {store} from './src/app/store';
import {useColorScheme} from 'react-native';
import {ThemeContext} from './src/contexts/themeContext';

const lightTheme = {
  background: '#F8F8F8',
};

const darkTheme = {
  background: '#645CAA',
};

export default function App() {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(
    colorScheme === 'light' ? lightTheme : darkTheme,
  );

  useEffect(() => {
    setTheme(colorScheme === 'light' ? lightTheme : darkTheme);
  }, [colorScheme]);
  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{theme}}>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </ThemeContext.Provider>
    </Provider>
  );
}
