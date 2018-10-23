// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)
var config = {
  apiKey: "AIzaSyBc2jRN3M9SPzFfW5MdCI3y4Db6u0uH5uA",
  authDomain: "testing-4d443.firebaseapp.com",
  databaseURL: "https://testing-4d443.firebaseio.com",
  projectId: "testing-4d443",
  storageBucket: "testing-4d443.appspot.com",
  messagingSenderId: "445869960139"
};
firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();
// -------------------------------------------------------------- (CRITICAL - BLOCK) --------------------------- //
// connectionsRef references a specific location in our database.
// All of our connections will be stored in this directory.
var connectionsRef = database.ref("/connections");

// '.info/connected' is a special location provided by Firebase that is updated every time
// the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");

// When the client's connection state changes...

/*connectedRef.on("value", function(snap) {
  // If they are connected..
  if (snap.val()) {
    // Add user to the connections list.
    var con = connectionsRef.push("");
    // Remove user from the connection list when they disconnect.
    con.onDisconnect().remove();
  }
});*/

// Assign the reference to the database to a variable named 'database'
// var database = ...
var database = firebase.database();

/*----------------------------------------------------------------*/

// Initial Values
var artistName = "";
var songName = "";
var album = "";
var releaseDate = 0;
var plays = 0;
var lyrics = "";

// **Arthur branch** 
// i started my code apart from this one, but some of the variables are the same, the next variables are required for the rest of the code
var queryURL = "https://api.spotify.com/v1/";
// if you search on spotify for a song you will probably get more than 1 result and it might not be the one we're looking for
// this next array and 'num' variable will be used to find the song we're looking for
var artistArr = [];
var num;
// ajax call within a variable
  // i commented this part out because it was used to get the id of the artist which for now we wont need, if we add anything that might need an id it will be ready here
  // $.ajax({
  //     url: queryURL + "search?",
  //     method: "GET",
  //     dataType: 'JSON',
  //     data: {
  //         q: artistName,
  //         type: 'artist'
  //     },
  //     headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //         'Authorization': 'Bearer  BQCggHnUcIXvS1Q2jJWnUCMGfWbqd3TryA5VHoa1Jn3NWgq5W_RDapNcSGl5JV5jlseZ_4-0ALSpHBJkJhVOjxQD8hOiTimsdrAOWiXPqteT-2XiLPB8QGLePeHvstN3yQsXZ2gYhxfpfyrcIiUlguKyg5qeFT8Q8O2vNzG8jKJJ1RT76t-uZDlS',
  //     }
  // }).then(function (response) {
  //     var idNum = response.artists.items[0].id;
  // });

  // ajax call for the song
  // Capture Button Click
  $("#submit-data").on("click", function (event) {
    event.preventDefault();
    
    if ($("#artist-name").val() == "" || $("#song-name").val() == "") {
      return;
    }
    
    
    // Grabbed values from text boxes
    artistName = $("#artist-name")
    .val()
    .trim();
    songName = $("#song-name")
    .val()
    .trim();
    
    //Musixmatch api call for lyrics and other artist/track/album information
    
    $.ajax({
        url: queryURL + "search?",
        method: "GET",
        dataType: "JSON",
        data: {
            q: songName,
            type: "track",
        },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer  BQCggHnUcIXvS1Q2jJWnUCMGfWbqd3TryA5VHoa1Jn3NWgq5W_RDapNcSGl5JV5jlseZ_4-0ALSpHBJkJhVOjxQD8hOiTimsdrAOWiXPqteT-2XiLPB8QGLePeHvstN3yQsXZ2gYhxfpfyrcIiUlguKyg5qeFT8Q8O2vNzG8jKJJ1RT76t-uZDlS'
        }
    }).then(function (response) {
      // in case we receive many songs as part of our search, and the first one is not the one we are looking for
      // these next lines of code look for the right song
      // first we loop through the array that contains all search results
        for (var i = 0; i < response.tracks.items.length; i++) {
          // we push all the names of the artists that have songs with the same name as our searched song
            artistArr.push(response.tracks.items[i].artists[0].name)
            // we compare each item on our newly filled array of artists with the artist we searched for at the beggining of our search
            if (artistArr.includes(artistName)) {
              // if we find an artist that matches the same name of our search term 
              // we get the index number of that array which will be the same index number of the object/array that we received from spotify
                num = artistArr.indexOf(artistName);
            }        
        };
        // this just confirms that we have the correct item
        console.log(response.tracks.items[num]);
    })
    $.ajax({
      type: "GET",
      data: {
        apikey: "f03b80c7f0c4d5244de46680bbd7fc9f",
      q_track: songName,
      q_artist: artistName,
      format: "jsonp",
      callback: "jsonp_callback"
    },
    url: "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get",
    dataType: "jsonp",
    jsonpCallback: 'jsonp_callback',
    contentType: 'application/json',
    success: function (response) {

      $.ajax({
        type: "GET",
        data: {
          apikey: "f03b80c7f0c4d5244de46680bbd7fc9f",
          q_artist: artistName,
          format: "jsonp",
          callback: "jsonp_callback"
        },

        url: "https://api.musixmatch.com/ws/1.1/artist.search",
        dataType: "jsonp",
        jsonpCallback: 'jsonp_callback',
        contentType: 'application/json',
        success: function (artistSearch) {

          $.ajax({
            type: "GET",
            data: {
              apikey: "f03b80c7f0c4d5244de46680bbd7fc9f",
              q_track: songName,
              q_artist: artistName,
              format: "jsonp",
              callback: "jsonp_callback"
            },
            url: "https://api.musixmatch.com/ws/1.1/track.search",
            dataType: "jsonp",
            jsonpCallback: 'jsonp_callback',
            contentType: 'application/json',
            success: function (trackSearch) {


              console.log(trackSearch);
              console.log(artistSearch);
              console.log(response);

              artistName = trackSearch.message.body.track_list[0].track.artist_name
              songName = trackSearch.message.body.track_list[0].track.track_name;
              album = trackSearch.message.body.track_list[0].track.album_name;
              lyrics = response.message.body.lyrics.lyrics_body;
              releaseDate = trackSearch.message.body.track_list[0].track.first_release_date;
      
              connectionsRef.push({
                artistName: artistName,
                songName: songName,
                album: album,
                releaseDate: releaseDate,
                plays: plays,
                lyrics: lyrics
              });
            }
          });

        }
      });


    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    }
  });
// **Arthur branch** within the same ajax call for the on click event, we call the search function
});

// Firebase watcher .on("child_added"
connectionsRef.on(
  "child_added",
  function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();
    var addButton = "<button class='btn btn-lyrics' id='submit-lyrics' type='submit'>";


    $("#tbody tr:nth-child(n+10)").remove();

    // Console.loging the last user's data
    console.log(sv.artistName);
    console.log(sv.songName);
    console.log(sv.album);
    console.log(sv.releaseDate);
    console.log(sv.plays);
    console.log(sv.lyrics);


    $('#tbody').prepend('<tr><td>' + sv.songName + '</td><td>' + sv.artistName + '</td><td>' + sv.album + '</td><td>' + sv.releaseDate + '</td><td>' + sv.plays + '</td><td>' + addButton + "Show Lyrics" + '</tr>');
    $('#lyrics').text(sv.lyrics);

    $("#submit-lyrics").on("click", function (submitLyrics) {
      submitLyrics.preventDefault();
      $('#lyrics').text(sv.lyrics);
    })

    // Handle the errors
  },
  function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
  }
);