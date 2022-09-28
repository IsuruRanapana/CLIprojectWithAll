import {View, Text, TouchableOpacity, ToastAndroid} from 'react-native';
import {InputWithLabel, Button} from '../../components';
import loginStyles from './Login.styles';
import {useContext, useEffect, useState} from 'react';
import {ThemeContext} from '../../contexts/themeContext';
import {getDataObject, storeData} from '../../helpers/asyncStorageHelper';
import {useIsFocused} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useDispatch, useSelector} from 'react-redux';
import {
  loaded,
  loading,
} from '../../features/loadingSpinner/loadingSpinnerSlice';
import {dashboardFlow} from '../../features/auth/authSlice';

export default function Login({navigation}) {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const {theme} = useContext(ThemeContext);
  const isFocused = useIsFocused();
  const loader = useSelector(state => state.loader.value);
  const dispatch = useDispatch();

  useEffect(() => {
    setInputs({email: '', password: ''});
  }, [isFocused]);

  const handleInputOnChange = (value, from) => {
    if (from === 'email') {
      setInputs({
        ...inputs,
        email: value,
      });
    } else {
      setInputs({
        ...inputs,
        password: value,
      });
    }
  };
  const styles = loginStyles(theme);

  const handleRegistrationTap = () => {
    navigation.navigate('REGISTRATION');
  };
  const handleOnPress = async () => {
    dispatch(loading());
    const user = await getDataObject({key: 'userObj'});
    if (user.email !== inputs.email) {
      dispatch(loaded());
      ToastAndroid.show('User not found', ToastAndroid.SHORT);
    } else if (user.password !== inputs.password) {
      dispatch(loaded());
      ToastAndroid.show('Email or password is incorrect', ToastAndroid.SHORT);
    } else {
      await storeData({key: 'loggedin', value: 'true'});
      dispatch(loaded());
      dispatch(dashboardFlow());
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loader} textContent={'Loading ...'} />
      <View style={styles.inputContainer}>
        <InputWithLabel
          labelText={'Enter Your Email'}
          value={inputs.email}
          onChange={value => handleInputOnChange(value, 'email')}
        />
        <View style={styles.margin}></View>
        <InputWithLabel
          labelText={'Enter Your Password'}
          value={inputs.password}
          secureTextEntry={true}
          onChange={value => handleInputOnChange(value, 'password')}
        />
      </View>
      <View style={styles.margin}></View>
      <View style={styles.btn}>
        <Button labelText={'Login'} onPress={handleOnPress} />
      </View>

      <View style={styles.registrationContainer}>
        <Text style={styles.registrationLabel}>
          {"Don't you have account?"}
        </Text>
        <View style={styles.spacer}></View>
        <TouchableOpacity onPress={handleRegistrationTap}>
          <Text style={styles.registrationText}>{'Sign up here'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
