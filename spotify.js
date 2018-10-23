// var artists = "Yung Bae";
var queryURL = "https://api.spotify.com/v1/";
// var access_token = "BQBIkxH9xa1Q-pbaDAZKBb8zu5II01539ra55IezAKcdYwYIdWy44bs5bGAbzbxueRSo6xp27zEXxa6jvTW1XIwAOGFodHMwzrV9DmjVY9bXzj4XPmzedr0tq37lBXDjq6ck4qNK8KsPOd9SBvQqRrVSksd_smQKXxvcnS__sFwr-Zv-C_Lymib4"
var artistName = "Yung Bae";
var songName = "I Want Your Love";
var artistArr = [];
var num;
var search = function () {
    $.ajax({
        url: queryURL + "search?",
        method: "GET",
        dataType: 'JSON',
        data: {
            q: artistName,
            type: 'artist'
        },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer  BQCggHnUcIXvS1Q2jJWnUCMGfWbqd3TryA5VHoa1Jn3NWgq5W_RDapNcSGl5JV5jlseZ_4-0ALSpHBJkJhVOjxQD8hOiTimsdrAOWiXPqteT-2XiLPB8QGLePeHvstN3yQsXZ2gYhxfpfyrcIiUlguKyg5qeFT8Q8O2vNzG8jKJJ1RT76t-uZDlS',
        }
    }).then(function (response) {
        var idNum = response.artists.items[0].id;
    });
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

        // console.log(response)

        for (var i = 0; i < response.tracks.items.length; i++) {
            var songsArr = response.tracks.items;
            // console.log(songsArr[i]);
            // console.log(art)
            // console.log(response.tracks.items[i].artists[0].name);
            artistArr.push(response.tracks.items[i].artists[0].name)
            // console.log(artistArr);
            if (artistArr.includes(artistName)) {
                // console.log(artistArr.indexOf(artistName));
                num = artistArr.indexOf(artistName);
            }        
        };
        console.log(response.tracks.items[num]);
    })
}
search();