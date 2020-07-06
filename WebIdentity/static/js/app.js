$(function () {
  var config = {
    apiKey: "your-api-key",
    authDomain: "your-domain",
  };
  firebase.initializeApp(config);

  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

  $("#SignInWithGoogle").click(function () {

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        console.log("Sign In Result: ");
        console.log(result);
        $.session.set('gToken', result.credential.idToken);
        $.session.set('gUser', result.user.displayName);
        $.session.set('gEmal', result.user.email);
      })
      .catch(function (error) {
        console.log("Error: ");
        console.log(error);
      });
  });


  $("#GetAWSAccess").click(function () {
    $.ajax({
      type: "POST",
      url: "/AWS/access",
      data: {
        token: $.session.get('gToken'),
        gUser: $.session.get('gUser'),
        gEmail: $.session.get('gEmal')
      }
    });
  });
});
