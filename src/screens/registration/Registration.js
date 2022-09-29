import {useIsFocused} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ToastAndroid} from 'react-native';
import {InputWithLabel, Button} from '../../components';
import {storeDataObject} from '../../helpers/asyncStorageHelper';
import styles from './Registration.styles';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {
  loaded,
  loading,
} from '../../features/loadingSpinner/loadingSpinnerSlice';

const validationSchema = Yup.object({
  username: Yup.string()
    .trim()
    .min(3, 'Invalid Username!')
    .required('Username is required!'),
  email: Yup.string().email('Invalid email!').required('Email is required!'),
  password: Yup.string()
    .trim()
    .min(8, 'Invalid password!')
    .required('Password is required!'),
  confirmPassword: Yup.string()
    .trim()
    .min(8, 'Invalid password!')
    .required('Password is required!'),
});

export default function Registration({navigation}) {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    username: '',
    DOB: '',
  });
  const userInfo = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const loader = useSelector(state => state.loader.value);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  useEffect(() => {
    setInputs({email: '', password: '', username: '', DOB: ''});
  }, [isFocused]);
  const handleLoginTap = async () => {
    navigation.pop();
  };

  const handleInputOnChange = (value, from) => {
    if (from === 'email') {
      setInputs({
        ...inputs,
        email: value,
      });
    } else if (from === 'password') {
      setInputs({
        ...inputs,
        password: value,
      });
    } else if (from === 'username') {
      setInputs({
        ...inputs,
        username: value,
      });
    } else {
      setInputs({
        ...inputs,
        DOB: value,
      });
    }
  };
  const handleRegistrationTap = async () => {
    await storeDataObject({key: 'userObj', value: inputs});
    ToastAndroid.show('User Created', ToastAndroid.SHORT);
    setInputs({email: '', password: '', username: '', DOB: ''});
  };
  return (
    <View style={styles.container}>
      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={async (values, formikActions) => {
          dispatch(loading());
          await storeDataObject({key: 'userObj', value: inputs});
          ToastAndroid.show('User Created', ToastAndroid.SHORT);
          dispatch(loaded());
          formikActions.resetForm();
        }}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          const {username, email, password, confirmPassword} = values;
          return (
            <>
              <View style={styles.inputContainer}>
                <InputWithLabel
                  labelText={'Enter Your Name'}
                  value={username}
                  onChange={handleChange('username')}
                  error={touched.username && errors.username}
                  onBlur={handleBlur('username')}
                />
                <View style={styles.margin}></View>
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
                <View style={styles.margin}></View>
                <InputWithLabel
                  labelText={'Reenter Password'}
                  value={confirmPassword}
                  secureTextEntry={true}
                  onChange={handleChange('confirmPassword')}
                  error={touched.confirmPassword && errors.confirmPassword}
                  onBlur={handleBlur('confirmPassword')}
                />
              </View>

              <View style={styles.margin}></View>
              <View style={styles.btn}>
                <Button labelText={'Register'} onPress={handleSubmit} />
              </View>
            </>
          );
        }}
      </Formik>
      <View style={styles.registrationContainer}>
        <Text style={styles.registrationLabel}>{'Do you have account?'}</Text>
        <View style={styles.spacer}></View>
        <TouchableOpacity onPress={handleLoginTap}>
          <Text style={styles.registrationText}>{'Login here'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
