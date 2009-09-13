/*
*	Osimo - next-generation forum system
*	Licensed under GPLv3 (GPL-LICENSE.txt)
*
*	os-includes/js/osimo_editor.js - Javascript for Osimo's BBCode editor
*	The class is included in the standard Osimo header, but
*	is *not* automatically instantiated; the theme developer must do it manually.
*	This is to allow for more flexibilty and more control over it.
*	--------------------------------------------------------------
*	The Osimo BBCode Editor requires jQuery >= 1.3.x. This is already included
*	with Osimo automatically, but if you are using this outside of
*	Osimo you will need to provide jQuery on your own.
*/

(function($){

$.fn.osimoeditor = function(customOptions){
    $.fn.osimoeditor.$this = $(this); //sets access to jQuery object returned from selector
	var options = $.extend({},$.fn.osimoeditor.defaultOptions, customOptions);
	this.each(function(){
		if(!$(this).is('textarea')) return;
		var input = $(this);
		new OsimoEditor(input,options);
	});
}

$.fn.osimoeditor.defaultOptions = {
    /* 
     *	This should be the only thing you will have to edit
     *	if not using this editor as a part of Osimo.
     *	Enter in the path to the folder that contains the
     *	osimo_editor files. This path *must* have a trailing
     *	slash and is relative to the document root.
     */
    editor_path : "os-includes/js/osimo_editor/",
    /*
     *	You can change this value to any theme that you have
     *	in the themes folder for the Osimo Editor. This is
     *	simply the folder name that the theme files are in.
     *	You can override this value with the options parameter.
     */
    theme : 'default',
    width : '500px',
    height : '200px',
    styles: {}
}

/* Do not edit the rest of the code below unless you know what you are doing! */
$.fn.osimoeditor.majorVersion = "0";
$.fn.osimoeditor.minorVersion = "9";
$.fn.osimoeditor.statusVersion = "beta";
$.fn.osimoeditor.releaseDate = "September 13, 2009 @ 12:00pm EDT";

function OsimoEditor(input,options){
	this.input = input;
	this.options = options;
	
	this.init();
}

/*
 *	this.init(elements,options)
 *	Runs some initialization checks to make sure
 *	everything will run smoothly. This is automatically
 *	called by the constructor.
 *	This function also automatically starts the
 *	editor building process.
 *	---------------------------------------------------
 *	elements: array of elements (Strings) to turn into editors
 *	options: object with various customizations for the editor
 */
OsimoEditor.prototype.init = function(){    
    if(this.options.editor_path.substring(this.options.editor_path.length-1,this.options.editor_path.length) != "/"){
    	this.options.editor_path += "/";
    }
    
    this.options.theme_path = this.options.editor_path + "themes/" + this.options.theme + "/";
    this.template = '';
	this.controls = new OsimoEditorControls();
	
	this.injectCSS();
	this.loadTheme();
    
    console.log("OsimoEditor loaded!");
}

OsimoEditor.prototype.injectCSS = function(){
	$('head').append('<link rel="stylesheet" href="'+this.options.theme_path+'osimo_editor.css" type="text/css" />');
}

OsimoEditor.prototype.loadTheme = function(){
	if(this.template==''){
		var obj = this;
		var postData = {"theme":this.options.theme};
		$.ajax({
			type:'POST',
			url:obj.options.editor_path+"theme_loader.php",
			data:postData,
			success:function(data){
				obj.template = data;
				obj.buildEditor();
			}
		});
	}
	else{
		this.buildEditor();
	}
}

OsimoEditor.prototype.buildEditor = function(){
	/* Copy any preset content that might be in the textarea */
	var contents = this.input.attr('value');
	var inputID = '#'+this.input.attr('id');
	var that = this;
	var eleAttr = {
		id : that.input.attr('id')+'_editarea',
		class : that.input.attr('class'),
		style : that.input.attr('style'),
		name : that.input.attr('name')
	};
	
	/* Begin DOM Injection */
	var inject = '<textarea ';
	$.each(eleAttr,function(i,val){
		if(val){
			inject += i + '="'+val+'" ';
		}
	});
	inject += '>'+contents+'</textarea>';
	
	var template = $(this.template).attr('id',this.input.attr('id'));
	
	var template_html = template.clone().appendTo('<div>').parent().html().replace(/\{\*osimo_editor\*\}/,inject);
	this.input.replaceWith(template_html);
	/* End DOM injection */
	
	if(this.options.width){
		$(inputID).css({'width':that.options.width});
		$('#'+eleAttr.id).css({'width':that.options.width});
	}
	if(this.options.height){
		$(inputID).css({'height':that.options.height});
	}
	if(this.options.styles){
		$(inputID).css(that.options.styles);
	}
	
}

function OsimoEditorControls(input){
	this.input = input;
}

OsimoEditorControls.prototype.activateControls = function(){
	
}

})(jQuery);