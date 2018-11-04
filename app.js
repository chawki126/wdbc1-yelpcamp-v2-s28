var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

// use yelp_camp db if exists, if not, it will create yelp_camp db.
mongoose.connect("mongodb://localhost/yelp_camp");
// 
app.set("view engine", "ejs");
// set body parser
app.use(bodyParser.urlencoded({extended: true}));

// Schema setup
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

// use campground schema
var Campground = mongoose.model("Campground", campgroundSchema);

// TEST db, add one data
// Campground.create(
//   {
//     name: "Mountain Goat's Rest",
//     image: "https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807_1280.jpg"
//   }, function(err, campground){
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("NEWLY CREATED CAMPGROUND: ");
//       console.log(campground);
//     }
//   });

// dummy data for campgrounds
// var campgrounds = [
//   {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_1280.jpg"},
//   {name: "Granite Hill", image: "https://cdn.pixabay.com/photo/2016/01/19/16/48/teepee-1149402_1280.jpg"},
//   {name: "Mountain Goat's Rest", image: "https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807_1280.jpg"},
//   {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_1280.jpg"},
//   {name: "Granite Hill", image: "https://cdn.pixabay.com/photo/2016/01/19/16/48/teepee-1149402_1280.jpg"},
//   {name: "Mountain Goat's Rest", image: "https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807_1280.jpg"}
// ];

 
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
  // res.render("campgrounds", {campgrounds: campgrounds});

  // Get all campgrounds from db
  Campground.find({}, function(err, allCampgrounds){
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds", {campgrounds: allCampgrounds});
    }
  });
});

// save newly added campground
app.post("/campgrounds", function(req, res){
  // get data from new campground form and add to campgrounds db
  var name = req.body.name;
  var image = req.body.image;
  // make name and image variables as object
  var newCampground = {name: name, image: image};
  // and push newCampground to campgrounds array
  // campgrounds.push(newCampground);

  // Create new campground and save to db
  Campground.create(newCampground, function(err, newlyCreated){
    if (err) {
      console.log(err)
    } else {
      // redirect back to campgrounds page which by default will go to /campgrounds app.get ROUTE
      res.redirect("/campgrounds");
    }
  });  
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