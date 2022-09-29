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
import {Formik} from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email!').required('Email is required!'),
  password: Yup.string()
    .trim()
    .min(8, 'Invalid password!')
    .required('Password is required!'),
});

export default function Login({navigation}) {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const userInfo = {
    email: '',
    password: '',
  };

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

  return (
    <View style={styles.container}>
      <Spinner visible={loader} textContent={'Loading ...'} />
      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={async (values, formikActions) => {
          formikActions.resetForm();
          dispatch(loading());
          const user = await getDataObject({key: 'userObj'});
          if (user) {
            if (user.email !== values.email) {
              dispatch(loaded());
              ToastAndroid.show('User not found', ToastAndroid.SHORT);
            } else if (user.password !== values.password) {
              dispatch(loaded());
              ToastAndroid.show(
                'Email or password is incorrect',
                ToastAndroid.SHORT,
              );
            } else {
              await storeData({key: 'loggedin', value: 'true'});
              dispatch(loaded());
              dispatch(dashboardFlow());
            }
          } else {
            dispatch(loaded());
            ToastAndroid.show('Please create an account', ToastAndroid.SHORT);
          }
        }}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          const {email, password} = values;
          return (
            <>
              <View style={styles.inputContainer}>
                <InputWithLabel
                  labelText={'Enter Your Email'}
                  value={email}
                  onChange={handleChange('email')}
                  error={touched.email && errors.email}
                  onBlur={handleBlur('email')}
                />
                <View style={styles.margin}></View>
                <InputWithLabel
                  labelText={'Enter Your Password'}
                  value={password}
                  secureTextEntry={true}
                  onChange={handleChange('password')}
                  error={touched.password && errors.password}
                  onBlur={handleBlur('password')}
                />
              </View>
              <View style={styles.margin}></View>
              <View style={styles.btn}>
                <Button labelText={'Login'} onPress={handleSubmit} />
              </View>
            </>
          );
        }}
      </Formik>
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
