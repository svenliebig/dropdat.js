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
	if(options === undefined) {
		options = {};
	}
	if(typeof filecallback != "function") {
		this.callback = function() {
			console.log("Test Callback");
		};
	} else {
		this.callback = filecallback;
	}

	this.bgColor 		= (options.backgroundColor !== undefined ? options.backgroundColor : "white");
	this.hide 			= (options.hide !== undefined ? options.hide : true);
	this.initialOpacity = (options.initOpacity !== undefined ? options.initOpacity : "0");
	this.flowingOpacity = (options.flowOpacity !== undefined ? options.flowOpacity : "0.4");
	this.borderRadius	= (options.borderRadius !== undefined ? options.borderRadius : "40px");
	this.initialTop		= (options.initialTop !== undefined ? options.initialTop : "40px");
	this.initialBottom	= (options.initialBottom !== undefined ? options.initialBottom : "40px");
	this.initialLeft	= (options.initialLeft !== undefined ? options.initialLeft : "40px");
	this.initialRight	= (options.initialRight !== undefined ? options.initialRight : "40px");
	this.hoveredTop		= (options.hoveredTop !== undefined ? options.hoveredTop : "10px");
	this.hoveredBottom	= (options.hoveredBottom !== undefined ? options.hoveredBottom : "10px");
	this.hoveredLeft	= (options.hoveredLeft !== undefined ? options.hoveredLeft : "10px");
	this.hoveredRight	= (options.hoveredRight !== undefined ? options.hoveredRight : "10px");
	this.text			= (options.text !== undefined ? options.text : "");
	this.textColor		= (options.textColor !== undefined ? options.textColor : "black");
	this.fontSize		= (options.fontSize !== undefined ? options.fontSize : "35px");
	this.fontFamily		= (options.fontFamily !== undefined ? options.fontFamily : "sans-serif");

	this.entered = 0;

	// Create the Form elements and stuff
	this.element.style.width = "100%";
	this.element.style.position = "relative";
	this.element.style.zIndex = "1";

	/* Form Element */
	this.FormElement 					= document.createElement("form"); 
    this.FormElement.style.zIndex 		= "5";
	this.FormElement.id 				= "droparea_form";
	this.FormElement.method 			= "post";
	this.FormElement.enctype 			= "multipart/form-data";
    this.FormElement.style.position 	= "absolute";
    this.FormElement.style.transition 	= "all 0.5s ease";
    this.FormElement.style.textAlign 	= "center";
    this.FormElement.style.background 	= this.bgColor;
    this.FormElement.style.opacity 		= this.initialOpacity;
    this.FormElement.style.borderRadius = this.borderRadius;
    this.FormElement.style.bottom 		= this.initialBottom;
    this.FormElement.style.top 			= this.initialTop;
    this.FormElement.style.left 		= this.initialLeft;
    this.FormElement.style.right 		= this.initialRight;
    this.FormElement.style.display 		= this.hide === true ? 'none' : 'block';

	/* Input Element */
	var InputElement 				= document.createElement("input");
	InputElement.type 				= "file";
	InputElement.id 				= "droparea_file_input";
	InputElement.style.position 	= "absolute";
    InputElement.style.height 		= "100%";
    InputElement.style.width 		= "100%";
    InputElement.style.opacity 		= "0";
    InputElement.style.bottom 		= "0";
    InputElement.style.top 			= "0";
    InputElement.style.left 		= "0";
    InputElement.style.right 		= "0";

	/* Span Element */
	this.SpanElement 						= document.createElement("span");
    this.SpanElement.style.position 		= "absolute";
    this.SpanElement.style.display 			= "block";
    this.SpanElement.style.top				= 'calc(50% - 20px)';
    this.SpanElement.style.height 			= "100%";
    this.SpanElement.style.width 			= "100%";
    this.SpanElement.style.zIndex 			= "-1";
    this.SpanElement.style.transition 		= "all 0.5s ease";
	this.SpanElement.innerHTML 				= this.text;
    this.SpanElement.style.fontSize 		= this.fontSize;
    this.SpanElement.style.color 			= this.textColor;
    this.SpanElement.style.fontFamily 		= this.fontFamily;

	this.FormElement.appendChild(InputElement);
	this.FormElement.appendChild(this.SpanElement);
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
	return this.element !== null;
};

Droparea.prototype.IsDivElement = function() {
	return this.element.tagName == "DIV";
};

Droparea.DragEnter = function(event, self) {
	console.log("enter");
	if (event.dataTransfer.types) {
		if (event.dataTransfer.files.length == 1) {
			if (event.dataTransfer.types[0] == "Files") {
				clearTimeout(self.DisplayTimeout);
				self.entered++;
				self.SpanElement.innerHTML = (self.text === "" ? event.dataTransfer.files[0].type : self.text);
				self.FormElement.style.display='block'; 
				setTimeout(function() {
					self.FormElement.style.top = self.hoveredTop;
					self.FormElement.style.bottom = self.hoveredBottom;
					self.FormElement.style.left = self.hoveredLeft;
					self.FormElement.style.right = self.hoveredRight;
					self.FormElement.style.opacity = self.flowingOpacity;
				}, 1);
			}
		} else {
			if (event.dataTransfer.types[0] == "Files") {
				clearTimeout(self.DisplayTimeout);
				self.entered++;
				self.SpanElement.innerHTML = (self.text === "" ? "Multiple Files" : self.text);
				self.FormElement.style.display='block'; 
				setTimeout(function() {
					self.FormElement.style.top = self.hoveredTop;
					self.FormElement.style.bottom = self.hoveredBottom;
					self.FormElement.style.left = self.hoveredLeft;
					self.FormElement.style.right = self.hoveredRight;
					self.FormElement.style.opacity = self.flowingOpacity;
				}, 1);
			}
		}
	}
};

Droparea.DragLeave = function(event, self) {
	console.log("leave");
	self.entered--;
		if (!self.entered) 
			self.DisplayTimeout = setTimeout(function() {
				self.FormElement.style.display = self.hide === true ? 'none' : 'block';
			}, 500);

		self.FormElement.style.top = self.initialTop;
		self.FormElement.style.bottom = self.initialBottom;
		self.FormElement.style.left = self.initialLeft;
		self.FormElement.style.right = self.initialRight;
		self.FormElement.style.opacity = self.initialOpacity;
};

Droparea.FileDrop = function(event, self) {
	self.callback(event.target.files);
	Droparea.DragLeave(event, self);
	self.resetFormElement();
};

Droparea.prototype.SetBackgroundColor = function(colorStr) {
	this.color = colorStr;
    this.FormElement.style.background = this.color;
};

Droparea.prototype.resetFormElement = function() {
  this.FormElement.reset();
};