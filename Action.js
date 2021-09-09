import Reflux from 'reflux';

import AccessToken from 'Kliq/AccessToken';
// reflux actions
let actions = Reflux.createActions([
  "auth",//check authentication
  "unauth",
  { login: { asyncResult: true } },//login action waiting to complete
  "logout",
  { signup: { asyncResult: true } },
  { loadUser: { asyncResult: true } },
  { onboard: { asyncResult: true, children: ["started"] } },
  { addContacts: { asyncResult: true, children: ["started"] } },
  { uploadPost: { asyncResult: true } },
  { loadPosts: { asyncResult: true } },
]);
//listen to auth action
actions.auth.listen(function () {
// token from localStorage
  AccessToken.get()
    .then((token) => actions.login(token))
    .catch((err) => actions.logout());
});

actions.unauth.listen(function () {
  // clear token
  AccessToken.clear();
});

export default actions;
