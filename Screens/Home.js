'use strict';
import React, {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Actions from 'Kliq/Actions';
import Button from 'Kliq/Views/Button';
import DataStore from 'Kliq/DataStore';
import LoadingView from 'Kliq/Views/LoadingView';
import PostListView from 'Kliq/Views/PostListView';
import Routes from 'Kliq/Routes';
import SharedStyles from 'Kliq/SharedStyles';
import StyleVars from 'Kliq/StyleVars';

const styles = StyleSheet.create({
  buttonContainer: {
    paddingTop: 96,
    alignItems: "center"
  },
  reloadText: {
    textAlign: "center",
    marginVertical: 20
  },
  button: { width: 256 }
});

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      failed: false
    };
  }

  componentWillMount() {
    Actions.auth();
  }
  //listen to load user
  componentDidMount() {
    Actions.loadUser.completed.listen(this._onLoadUserCompleted.bind(this));
    Actions.logout.listen(this._onLogout.bind(this));
  }

  render() {
    if (this.state.failed) {
      return (
        // Data Loaded or not| Error message and retry fetch 
        <View style={[SharedStyles.screenContainer, styles.buttonContainer]}>
          <Text style={[SharedStyles.headingText, styles.reloadText]}>
            Could not fetch posts.
          </Text>
          <Button onPress={() => this._retryFetch()} style={styles.button}>
            Retry Now
          </Button>
        </View>
      );
    } else if (this.state.loaded) {
      // Data loaded
      return <PostListView style={SharedStyles.screenContainer} />;
    } else {
      return (
        <LoadingView backgroundColor={StyleVars.Colors.mediumBackground}>
          Loading...
        </LoadingView>
      );
    }
  }

  _retryFetch() {
    // TODO: Initiate another fetch from the server
  }
  //callback functions 
  _onLoadUserCompleted(user) {
    let currentUser = DataStore.getCurrentUser();

    if (currentUser.onboarded) {
      this.setState({ loaded: true });
    } else {
      this.props.replaceRoute(Routes.onboarding(currentUser));
    }
  }
  //onlogout, login will replace 
  _onLogout() {
    this.props.replaceRoute(Routes.login());
  }
}
