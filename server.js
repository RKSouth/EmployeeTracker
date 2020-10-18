var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "employeetracker_db"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        // "Find songs by artist",
        // "Find all artists who appear more than once",
        // "Find data within a specific range",
        // "Search for a specific song",
        // "Find artists with a top song and top album in the same year"
        "Add departments, roles or employees",
        "View departments, roles or employees",
        "Update employee roles",
        "Update employee mangers",
        "View employees by manager",
        "Delete departments, roles, or employees"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "Add departments, roles or employees":
            addDRE();
            break;
        case "View departments, roles or employees":
            viewDRE();
            break;
        case "Update employee roles":
            updateER();
            break;
        case "Update employee mangers":
            updateEMS();
            break;
        case "View employees by manager":
            viewEBM();
            break;
        case "Delete departments, roles, or employees":
            deleteDRE();
    //   case "Find songs by artist":
    //     artistSearch();
    //     break;

    //   case "Find all artists who appear more than once":
    //     multiSearch();
    //     break;

    //   case "Find data within a specific range":
    //     rangeSearch();
    //     break;

    //   case "Search for a specific song":
    //     songSearch();
    //     break;

    //   case "Find artists with a top song and top album in the same year":
    //     songAndAlbumSearch();
    //     break;
      }
    });
}
//NEED DEPARTMENT, ROLE, EMPLOYEE CLASSES TO THEN CALL 


function viewDRE() {
    // FIRST ASK DEPARTMENT ROLE EMPLOYEE OR GO BACK 
    inquirer
      .prompt({
        name: "artist",
        type: "list",
        message: "What artist would you like to search for?",
        choices: 
      })
      .then(function(answer) {
        var query = "SELECT position, song, year FROM top5000 WHERE ?";
        connection.query(query, { artist: answer.artist }, function(err, res) {
          for (var i = 0; i < res.length; i++) {
            console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
          }
          runSearch();
        });
      });
  }



function artistSearch() {
  inquirer
    .prompt({
      name: "artist",
      type: "input",
      message: "What artist would you like to search for?"
    })
    .then(function(answer) {
      var query = "SELECT position, song, year FROM top5000 WHERE ?";
      connection.query(query, { artist: answer.artist }, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
        }
        runSearch();
      });
    });
}

function multiSearch() {
  var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
  connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].artist);
    }
    runSearch();
  });
}

function rangeSearch() {
  inquirer
    .prompt([
      {
        name: "start",
        type: "input",
        message: "Enter starting position: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "end",
        type: "input",
        message: "Enter ending position: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
      connection.query(query, [answer.start, answer.end], function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log(
            "Position: " +
              res[i].position +
              " || Song: " +
              res[i].song +
              " || Artist: " +
              res[i].artist +
              " || Year: " +
              res[i].year
          );
        }
        runSearch();
      });
    });
}

function songSearch() {
  inquirer
    .prompt({
      name: "song",
      type: "input",
      message: "What song would you like to look for?"
    })
    .then(function(answer) {
      console.log(answer.song);
      connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function(err, res) {
        console.log(
          "Position: " +
            res[0].position +
            " || Song: " +
            res[0].song +
            " || Artist: " +
            res[0].artist +
            " || Year: " +
            res[0].year
        );
        runSearch();
      });
    });
}

function songAndAlbumSearch() {
  inquirer
    .prompt({
      name: "artist",
      type: "input",
      message: "What artist would you like to search for?"
    })
    .then(function(answer) {
      var query = "SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist ";
      query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
      query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";

      connection.query(query, [answer.artist, answer.artist], function(err, res) {
        console.log(res.length + " matches found!");
        for (var i = 0; i < res.length; i++) {
          console.log(
            i+1 + ".) " +
              "Year: " +
              res[i].year +
              " Album Position: " +
              res[i].position +
              " || Artist: " +
              res[i].artist +
              " || Song: " +
              res[i].song +
              " || Album: " +
              res[i].album
          );
        }

        runSearch();
      });
    });
}


//***************** Alternatives *****************

// function showSameYearArtists() {
//   connection.query(`SELECT topAlbums.year AS year, topAlbums.artist AS artist, song, album
//   FROM topAlbums
//   INNER JOIN top5000 ON topAlbums.artist = top5000.artist AND topAlbums.year = top5000.year
//   ORDER BY year ASC;`, function(err, res) {
//       if (err) throw err;
//       console.table(res);
//       promptUser();
//   });
// }


// // function showSameYearArtists() {
// //   ​
// //       inquirer.prompt([
// //           {
// //               message: "Enter an artist name:",
// //               name: "artist"
// //           }
// //       ]).then(answers => {
// //   ​
              connection.query(`SELECT topAlbums.year AS year, topAlbums.artist AS artist, song, album
          FROM topAlbums
          INNER JOIN top5000 ON (topAlbums.artist = top5000.artist AND topAlbums.year = top5000.year) 
          WHERE (topAlbums.artist = "${answers.artist}" AND top5000.artist = "${answers.artist}")
          ORDER BY year ASC;`, function(err, res) {
              if (err) throw err;
              console.table(res);
              promptUser();
          });
// //   ​
// //       });
// //   ​
// //   }



//                     `   
// // SELECT
// //     albums.id AS 'Position:', albums.album_name AS 'Album Name:', songs.song_name AS 'Song Name:', albums.year AS 'Year:'
// // FROM
// //     top3000albums albums
// // INNER JOIN
// //     top5000 songs ON songs.artist_name = albums.artist_name AND songs.year = albums.year
// // WHERE
// //     ?;
// // ,
// // {
// //     "albums.artist_name": answers.artist_name // song_name === answers.song_name
// // },
