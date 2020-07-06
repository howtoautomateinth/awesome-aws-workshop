$(function () {
  $.busyLoadSetup({ animation: "slide", background: "rgba(255, 152, 0, 0.86)" });
  var config = {
    apiKey: "apiKey",
    authDomain: "authDomain",
  };
  firebase.initializeApp(config);

  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

  $("#SignInWithGoogle").click(function () {

    $('input[name="signingoogle"]').val('clicked');
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        console.log("Sign In Result: ");
        console.log(result);
        $.session.set('gToken', result.credential.idToken);
        $.session.set('gUser', result.user.displayName);
        $.session.set('gEmal', result.user.email);
        alert('Go to Step 2!');
      })
      .catch(function (error) {
        console.log("Error: ");
        console.log(error);
      });
  });


  $("#GetAWSAccess").click(function () {
    if ($('input[name="signingoogle"]').val() == "clicked") {
      $.busyLoadFull("show");
      var request = $.ajax({
        type: "POST",
        url: "/AWS/access",
        data: {
          token: $.session.get('gToken'),
          gUser: $.session.get('gUser'),
          gEmail: $.session.get('gEmal')
        }
      });
      request.done(function (bucketsList) {
        $.busyLoadFull("hide");
        const data = bucketsList.Buckets;
        $("#buckets").empty();
        for (const bucket of data) {
          $("#buckets").append('<li class="list-group-item">' + bucket.Name + '</li>');
        }
      });
      request.fail(function (jqXHR, textStatus) {
        $.busyLoadFull("hide");
        alert("Request failed: " + textStatus);
      });
    } else {
      alert('Please Sign in first')
    }
  });
});
