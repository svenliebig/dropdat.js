function Droparea(element_id, filecallback, options) {
	var self = this;
	this.element = document.getElementById(element_id);
	this.body_element = document.getElementsByTagName("body")[0];

	if(!this.IsElement()) {
		console.error(element_id + " is no html element.");
		return;
	}
	else if(!this.IsDivElement()) {
		console.error(element_id + " is no div element.");
		return;
	}
	if(options == undefined) {
		options = {};
	}
	if(typeof filecallback != "function") {
		this.callback = function() {
			console.log("Test Callback");
		}
	} else {
		this.callback = filecallback;
	}

	this.color = (options.color != undefined ? options.color : "white");
	this.initialOpacity = (options.initOpacity != undefined ? options.initOpacity : "0");
	this.hide = (options.hide != undefined ? options.hide : true);
	this.flowingOpacity = (options.flowOpacity != undefined ? options.flowOpacity : "0.4");
	this.entered = 0;

	// Create the Form elements and stuff
	this.element.style.width = "100%";
	this.element.style.position = "relative";
	this.element.style.zIndex = "1";

	this.FormElement = document.createElement("form"); 
	this.FormElement.id = "droparea_form";
	this.FormElement.method = "post";
	this.FormElement.enctype = "multipart/form-data";
    this.FormElement.style.transition = "all 0.5s ease";
    this.FormElement.style.position = "absolute";
    this.FormElement.style.opacity = this.initialOpacity;
    this.FormElement.style.background = this.color;
    this.FormElement.style.zIndex = "5";
    this.FormElement.style.borderRadius = "40px";
    this.FormElement.style.bottom = "10px";
    this.FormElement.style.top = "10px";
    this.FormElement.style.left = "10px";
    this.FormElement.style.right = "10px";
    this.FormElement.style.textAlign = "center";
    this.FormElement.style.display = this.hide == true ? 'none' : 'block';

	var InputElement = document.createElement("input");
	InputElement.type = "file";
	InputElement.id = "droparea_file_input";
	InputElement.style.position = "absolute";
    InputElement.style.height = "100%";
    InputElement.style.width = "100%";
    InputElement.style.opacity = "0";
    InputElement.style.bottom = "0";
    InputElement.style.top = "0";
    InputElement.style.left = "0";
    InputElement.style.right = "0";

	var SpanElement = document.createElement("span");
	SpanElement.innerHTML = "test";
	SpanElement.style.position = "relative";
    SpanElement.style.display = "block";
    SpanElement.style.zIndex = "-1";
    SpanElement.style.fontSize = "35px";
    SpanElement.style.fontFamily = "sans-serif";
    SpanElement.style.marginTop = ((this.element.getClientRects()[0].height / 2) - 55) + "px";

	this.FormElement.appendChild(InputElement);
	this.FormElement.appendChild(SpanElement);
	this.element.appendChild(this.FormElement); 

	// Event Listeners
	this.element.addEventListener ("dragenter", function( event ) {
		Droparea.DragEnter(event, self);
	}, false);
	
	this.element.addEventListener ("dragleave", function( event ) {
		Droparea.DragLeave(event, self);
	}, false);

	InputElement.addEventListener ("change", function( event ) {
		Droparea.FileDrop(event, self);
	}, false);

}

Droparea.prototype.IsElement = function() {
	return this.element != null;
}

Droparea.prototype.IsDivElement = function() {
	return this.element.tagName == "DIV";
}

Droparea.DragEnter = function(event, self) {
	console.log("enter");
	if (event.dataTransfer.types) {
		for (var i = 0; i < event.dataTransfer.types.length; i++) {
			if (event.dataTransfer.types[i] == "Files") {
				clearTimeout(self.DisplayTimeout);
				self.entered++;
				self.FormElement.style.display='block'; 
				setTimeout(function() {
					self.FormElement.style.top = "40px";
					self.FormElement.style.bottom = "40px";
					self.FormElement.style.left = "40px";
					self.FormElement.style.right = "40px";
					self.FormElement.style.opacity = self.flowingOpacity;
				}, 1);
			}
		}
	}
}

Droparea.DragLeave = function(event, self) {
	console.log("leave");
	self.entered--;
		if (!self.entered) 
			self.DisplayTimeout = setTimeout(function() {
				self.FormElement.style.display='none'; 
			}, 500);

		self.FormElement.style.top = "10px";
		self.FormElement.style.bottom = "10px";
		self.FormElement.style.left = "10px";
		self.FormElement.style.right = "10px";
		self.FormElement.style.opacity = self.initialOpacity;
}

Droparea.FileDrop = function(event, self) {
	self.callback(event.target.files);
	Droparea.DragLeave(event, self);
	self.resetFormElement();
}

Droparea.prototype.SetBackgroundColor = function(colorStr) {
	this.color = colorStr;
    this.FormElement.style.background = this.color;
}

Droparea.prototype.resetFormElement = function() {
  this.FormElement.reset();
}