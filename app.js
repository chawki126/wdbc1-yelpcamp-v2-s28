var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));



// dummy data for campgrounds
var campgrounds = [
  {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_1280.jpg"},
  {name: "Granite Hill", image: "https://cdn.pixabay.com/photo/2016/01/19/16/48/teepee-1149402_1280.jpg"},
  {name: "Mountain Goat's Rest", image: "https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807_1280.jpg"},
  {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_1280.jpg"},
  {name: "Granite Hill", image: "https://cdn.pixabay.com/photo/2016/01/19/16/48/teepee-1149402_1280.jpg"},
  {name: "Mountain Goat's Rest", image: "https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807_1280.jpg"}
];

 
// ============================================================================
// ROUTES
// ============================================================================

// root ROUTE
app.get("/", function(req, res){
  res.render("landing");
});

// list all campgrounds
app.get("/campgrounds", function(req, res){
  // pass campgrounds data to list all campgrounds on campgrounds.ejs
  res.render("campgrounds", {campgrounds: campgrounds});
});

// save newly added campground
app.post("/campgrounds", function(req, res){
  // get data from new campground form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  // make name and image variables as object
  var newCampground = {name: name, image: image};
  // and push newCampground to campgrounds array
  campgrounds.push(newCampground);

  // redirect back to campgrounds page which by default will go to /campgrounds app.get ROUTE
  res.redirect("/campgrounds");
  
  // test post route
  // res.send("You reached the campgrounds POST route");
});

// add new campground
app.get("/campgrounds/new", function(req, res){
  res.render("new");
});


// ============================================================================
// START SERVER
// ============================================================================
app.listen(3000, function(){
  console.log("Yelpcamp server has started...");
});