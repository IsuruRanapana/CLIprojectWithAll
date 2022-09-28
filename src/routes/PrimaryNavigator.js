import { useDispatch, useSelector } from "react-redux";
import { authFlow, dashboardFlow } from "../features/auth/authSlice";
import { getData } from "../helpers/asyncStorageHelper";
import AuthNavigator from "./AuthNavigator";
import DashboardNavigator from "./DashboardNavigator";
import SplashNavigator from "./SplashNavigator";

export default function Navigator() {
  const auther = useSelector((state) => state.auther.value);
  const dispatch = useDispatch();

  const checkIsLoggedIn = async () => {
    const loggedInStatus = await getData({ key: "loggedin" });
    if (loggedInStatus === "true") {
      dispatch(dashboardFlow());
    } else {
      dispatch(authFlow());
    }
  };

  checkIsLoggedIn();

  if (auther === "splash") {
    return <SplashNavigator />;
  } else if (auther === "authFlow") {
    return <AuthNavigator />;
  } else {
    return <DashboardNavigator />;
  }
  // if (!isLoggedIn) {
  //   return (
  //     <Stack.Navigator>
  //       <Stack.Screen name="LOGIN" component={Login} />
  //       <Stack.Screen name="REGISTRATION" component={Registration} />
  //     </Stack.Navigator>
  //   );
  // }

  // return (
  //   <Stack.Navigator>
  //     <Stack.Screen name="DASHBOARD" component={Dashboard} />
  //   </Stack.Navigator>
  // );

  // const screener = useSelector((state) => state.screener.value);
  // const dispatch = useDispatch();

  // const checkIsLoggedIn = async () => {
  //   const loggedInStatus = await getData({ key: "loggedin" });
  //   console.log(loggedInStatus);
  //   if (loggedInStatus === "true") {
  //     dispatch(dashboardScreens);
  //   } else {
  //     dispatch(authScreens);
  //   }
  // };

  // useEffect(async () => {
  //   console.log(screener);
  //   const ab = await checkIsLoggedIn();
  // });
  // checkIsLoggedIn();
  // if (screener === "splash") {
  //   return <Spinner visible={true} />;
  // }
  // return (
  //   <Stack.Navigator>
  //     {screener === "splash" ? (
  //       <Stack.Screen name="SPLASH" component={Splash} />
  //     ) : screener === "dashboard" ? (
  //       <>
  //         <Stack.Screen name="DASHBOARD" component={Dashboard} />
  //         <Stack.Screen name="LOGIN" component={Login} />
  //         <Stack.Screen name="REGISTRATION" component={Registration} />
  //       </>
  //     ) : (
  //       <>
  //         <Stack.Screen name="LOGIN" component={Login} />
  //         <Stack.Screen name="REGISTRATION" component={Registration} />
  //         <Stack.Screen name="DASHBOARD" component={Dashboard} />
  //       </>
  //     )}

  //     {/* {checkIsLoggedIn() ? (
  //       <>
  //         <Stack.Screen name="DASHBOARD" component={Dashboard} />
  //         <Stack.Screen name="LOGIN" component={Login} />
  //         <Stack.Screen name="REGISTRATION" component={Registration} />
  //       </>
  //     ) : (
  //       <>
  //         <Stack.Screen name="LOGIN" component={Login} />
  //         <Stack.Screen name="REGISTRATION" component={Registration} />
  //         <Stack.Screen name="DASHBOARD" component={Dashboard} />
  //       </>
  //     )} */}
  //   </Stack.Navigator>
  // );
}
