import {View, Text} from 'react-native';
import {getDataObject, storeData} from '../../../helpers/asyncStorageHelper';
import styles from './Home.styles';
import {Button} from '../../../components';
import {useDispatch, useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  loaded,
  loading,
} from '../../../features/loadingSpinner/loadingSpinnerSlice';
import {useIsFocused} from '@react-navigation/native';
import {useEffect, useState, useCallback} from 'react';
import {authFlow} from '../../../features/auth/authSlice';

export default function Home({navigation}) {
  const loader = useSelector(state => state.loader.value);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    getUser();
  }, [isFocused]);

  const [user, setUser] = useState({});

  const getUser = async () => {
    dispatch(loading());
    const userDetails = await getDataObject({key: 'userObj'});
    setUser(userDetails);
    dispatch(loaded());
  };

  const handleOnPress = async () => {
    await storeData({key: 'loggedin', value: 'false'});
    dispatch(authFlow());
  };
  const handleOpenDrawer = async () => {
    navigation.openDrawer();
  };
  return (
    <View style={styles.container}>
      <Spinner visible={loader} textContent={'Loading ...'} />
      <Text style={styles.text}>{`Hi ${user.username}`}</Text>
      <Button labelText={'Logout'} onPress={handleOnPress} />
      <Button labelText={'Open Drawer'} onPress={handleOpenDrawer} />
    </View>
  );
}
