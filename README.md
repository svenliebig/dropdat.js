# Dropdat.js
Easy Javascript for easy file drops.
#### Easy example without any options
``` 
<!-- HTML !-->
<div id="drop_div" style="height: 500px; background: black;"></div>
```
```
// Javascript
var drop_dat_var = new Dropdat("drop_div");
```
![alt text](http://i.imgur.com/sa7eaDS.png "Easy Example Result")

#### More advanced example
``` 
<!-- HTML !-->
<div id="drop_div" style="height: 500px; background: black;"></div>
```
```
// Javascript example with callback
var drop_dat_var = new Dropdat("drop_div", function(files) {
  console.log("File 1 Type: " + files[0].type);
});
```
This will print out the type of the first file in the selection (or of the only file).
You receive all dropped files in the callback!
#### Amazing options
``` 
<!-- HTML !-->
<div id="drop_div" style="height: 500px; background: black;"></div>
```
```
// Javascript example with callback and options array
var drop_dat_var = new Dropdat("drop_div", function(files) {
  console.log("File 1 Type: " + files[0].type);
}, {"color": "#f0f0f0", "initOpacity:" "0.2"});
```
The last parameter is an options array with initial values.

#### List of the current options
```
// options with the initial values
var options = {
    "color": "white";
}
```
