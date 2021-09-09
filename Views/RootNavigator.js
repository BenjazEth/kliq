'use strict';
// all the used components
import React, {
  Navigator,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';

//common styles and colors
import StyleVars from 'Kliq/StyleVars';
import SharedStyles from 'Kliq/SharedStyles';

// styles
const styles = StyleSheet.create({
    sceneContainer: {
      flex: 1,
      paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight
    },
    navBar: {
      backgroundColor: StyleVars.Colors.navBarBackground,
      borderBottomColor: "rgba(255,255,255,0.5)",
      borderBottomWidth: 1
    },
    buttonStyle: { marginTop: 13 },
    titleStyle: { marginTop: 10 }
});

//left?right button and Title
const NavigationBarRouteMapper = {
    // attributes: refrence to navigator, route index, and navigation state
    LeftButton: function (route, navigator, index, navState) {
      return route.leftButton ? (
        <route.leftButton
          style={styles.buttonStyle}
          navigator={navigator}
          route={route}
        />
      ) : null;
    },
    // SharedStyles obj-holds common styles
    Title: function (route, navigator, index, navState) {
      return route.title ? (
        <Text
          style={[styles.titleStyle, SharedStyles.navBarTitleText]}
          numberOfLines={1}//to trim line of too long text 
        >{route.title}</Text>
      ) : null;
    },
    RightButton: function (route, navigator, index, navState) {
      return route.rightButton ? (
        <route.rightButton
          style={styles.buttonStyle}
          navigator={navigator}
          route={route}
        />
      ) : null;
    }
  };


export default class RootNavigator extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hideNavigationBar: false };
    }
    // set initial route
    componentDidMount() {
        this._setupRoute(this._getInitialRoute());
    }
    // remove listeners
    componentWillUnmount() {
        if (this._listeners)
          this._listeners.forEach((listener) => listener.remove());
    }
    
    onNavWillFocus(route) {
        this._setupRoute(route.currentTarget.currentRoute);
    }
    
    render(){
        let navigationBar = (
            <Navigator.NavigationBar
            //handle the button & title
              routeMapper={NavigationBarRouteMapper}
              style={styles.navBar}
            />
        )

        return (
            <Navigator
                ref={(navigator)=> this._setNavigatorRef(navigator)}//setting reference
                initialRoute={this._getInitialRoute()}//initial route property of the navigator
                // rendering the route
                renderScene={(route, navigator) => this.renderScene(route, navigator)}
                // conditionanl navigation bar 
                navigationBar={this.state.hideNavigationBar ? null : navigationBar}
            />
        );
    }

    // render the route
    renderScene(route, navigator) {
        // check route needs to hide navg bar
        let style = route.hideNavigationBar ? { paddingTop: 0 } : {};
        return (
          <View style={[styles.sceneContainer, style]}>
            <route.component
              {...route.passProps}
              navigator={navigator}
              back={() => this.back()}
              backToHome={() => this.backToHome()}
              toRoute={(route, args) => this.toRoute(route, args)}
              replaceRoute={(route, args) => this.replaceRoute(route, args)}
            />
          </View>
        )
      }
    
      back() {
        this.navigator.pop();
      }
    
      backToHome() {
        this.navigator.popToTop();
      }
      //check route=string to fetch by name
      toRoute(route, args) {
        if ("string" != typeof route || (route = Routes.get(route, args))) {
          this.navigator.push(route);
        }
      }
    
      replaceRoute(route, args) {
        if ("string" != typeof route || (route = Routes.get(route, args))) {
          this.navigator.replace(route);
        }
      }
      //returns the home routes
      _getInitialRoute() {
        return Routes.home();
      }
      //set instance variable to the ref provider navigator
      _setNavigatorRef(navigator) {
        if (navigator !== this.navigator) {
          this.navigator = navigator;
    
          if (navigator) {
            this._listeners = [
            // add listner to navigation context on FOCUS
              navigator.navigationContext.addListener("willfocus", this.onNavWillFocus.bind(this))
            ];
          } else {
            //if there exist remove all listeners
            if (this._listeners)
              this._listeners.forEach((listener) => listener.remove());
          }
        }
      }
      //   
      _setupRoute(route) {
        if (route) {
          let state = {};
          // hide navigation bar
          if (route.hideNavigationBar !== undefined && this.state.hideNavigationBar !== route.hideNavigationBar)
            state.hideNavigationBar = route.hideNavigationBar;
        //   check status bar style 
          if (route.statusBarStyle && this.state.statusBarStyle !== route.statusBarStyle) {
            state.statusBarStyle = route.statusBarStyle;
            StatusBar.setBarStyle(route.statusBarStyle, true);
            StatusBar.setHidden(false, "slide");
          }
    
          this.setState(state);
        }
      }
    
}