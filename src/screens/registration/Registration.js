import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ToastAndroid } from "react-native";
import { InputWithLabel, Button } from "../../components";
import { storeDataObject } from "../../helpers/asyncStorageHelper";
import styles from "./Registration.styles";

export default function Registration({ navigation }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    username: "",
    DOB: "",
  });
  const isFocused = useIsFocused();
  useEffect(() => {
    setInputs({ email: "", password: "", username: "", DOB: "" });
  }, [isFocused]);
  const handleLoginTap = async () => {
    navigation.pop();
  };

  const handleInputOnChange = (value, from) => {
    if (from === "email") {
      setInputs({
        ...inputs,
        email: value,
      });
    } else if (from === "password") {
      setInputs({
        ...inputs,
        password: value,
      });
    } else if (from === "username") {
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
    await storeDataObject({ key: "userObj", value: inputs });
    ToastAndroid.show("User Created", ToastAndroid.SHORT);
    setInputs({ email: "", password: "", username: "", DOB: "" });
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <InputWithLabel
          labelText={"Enter Your Email"}
          value={inputs.email}
          onChange={(value) => handleInputOnChange(value, "email")}
        />
        <View style={styles.margin}></View>
        <InputWithLabel
          labelText={"Enter Your Password"}
          value={inputs.password}
          secureTextEntry={true}
          onChange={(value) => handleInputOnChange(value, "password")}
        />
        <View style={styles.margin}></View>
        <InputWithLabel
          labelText={"Enter Your Name"}
          value={inputs.username}
          onChange={(value) => handleInputOnChange(value, "username")}
        />
        <View style={styles.margin}></View>
        <InputWithLabel
          labelText={"Enter Your DOB"}
          value={inputs.DOB}
          onChange={(value) => handleInputOnChange(value, "DOB")}
        />
      </View>

      <View style={styles.margin}></View>
      <View style={styles.btn}>
        <Button labelText={"Register"} onPress={handleRegistrationTap} />
      </View>

      <View style={styles.registrationContainer}>
        <Text style={styles.registrationLabel}>{"Do you have account?"}</Text>
        <View style={styles.spacer}></View>
        <TouchableOpacity onPress={handleLoginTap}>
          <Text style={styles.registrationText}>{"Login here"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
