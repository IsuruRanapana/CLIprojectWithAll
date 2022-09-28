import {View} from 'react-native';
import styles from './Splash.styles';
import {useIsFocused} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

export default function Splash({navigation}) {
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, [isFocused]);
  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent={'Loading ...'} />
    </View>
  );
}
