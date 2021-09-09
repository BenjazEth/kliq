'use strict';
import Home from 'Kliq/Screens/Home';
import Login from 'Kliq/Screens/Login';
import Onboarding from 'Kliq/Screens/Onboarding';
import LogoutButton from 'Kliq/Views/LogoutButton';
import OnboardingButton from 'Kliq/Views/OnboardingButton';
import MapButton from 'Kliq/Views/MapButton';

class Routes {
  // check method with same name
  get(route, args) {
    if ("undefined" == typeof this[route]) {
      console.warn("No route found with name: " + route);
      return false;
    } else {
        // there exist
      return this[route].call(this, args);
    }
  }

  //route to home
  home() {
    return {
      name: "home",
      title: "Kliq Test",
      component: Home,
      leftButton: LogoutButton,
      rightButton: MapButton,
      hideNavigationBar: false,
      statusBarStyle: "light-content"
    }
  }

  login() {
    return {
      name: "login",
      title: "Login",
      component: Login,
      hideNavigationBar: true,
      statusBarStyle: "light-content"
    }
  }

  onboarding(user) {
    return {
      name: "onboarding",
      title: "Welcome",
      component: Onboarding,
      leftButton: LogoutButton,
      rightButton: OnboardingButton,
      passProps: { user: user },
      hideNavigationBar: false,
      statusBarStyle: "light-content"
    }
  }

  
}

export default new Routes()
