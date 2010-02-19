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

$.fn.osimoeditor = function(customOptions,data){
    $.fn.osimoeditor.$this = $(this); //sets access to jQuery object returned from selector
    if(typeof customOptions == 'string'){
    	if(customOptions == 'get'){
	    	return $.fn.osimoeditor.get($(this).attr('id'));
	    }
		if(customOptions == 'set'){
	    	$.fn.osimoeditor.set($(this).attr('id'),data);
		}
		if(customOptions == 'append'){
			$.fn.osimoeditor.append($(this).attr('id'),data);
		}
		if(customOptions == 'prepend'){
			$.fn.osimoeditor.prepend($(this).attr('id'),data);
		}
    }
	var options = $.extend({},$.fn.osimoeditor.defaultOptions, customOptions);
	var num = 0;
	this.each(function(){
		if(!$(this).is('textarea')) return;
		var input = $(this);
		new OsimoEditor(input,options,num);
		num++;
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
    editor_path : "js/",
    /*
     *	You can change this value to any theme that you have
     *	in the themes folder for the Osimo Editor. This is
     *	simply the folder name that the theme files are in.
     *	You can override this value with the options parameter.
     */
    theme : 'default',
    width : '500px',
    height : false,
    editorHeight: '100px',
    styles : {},
    editorStyles : {}
}

/* Do not edit the rest of the code below unless you know what you are doing! */
$.fn.osimoeditor.majorVersion = "1";
$.fn.osimoeditor.minorVersion = "1";
$.fn.osimoeditor.statusVersion = "0";
$.fn.osimoeditor.releaseDate = "February 19, 2010 @ 11:57am EDT";

$.fn.osimoeditor.get = function(editorID){
	return $('#'+editorID+'_editbox').attr('value');
}

$.fn.osimoeditor.set = function(editorID,data){
	$('#'+editorID+'_editbox').attr('value',data);
}

$.fn.osimoeditor.append = function(editorID,data){
	$('#'+editorID+'_editbox').attr('value',this.get(editorID) + data);
}

$.fn.osimoeditor.prepend = function(editorID,data){
	$('#'+editorID+'_editbox').attr('value',data + this.get(editorID));
}

function OsimoEditor(input,options,num){
	this.input = input;
	this.options = options;
	this.num = num;
	
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
}

OsimoEditor.prototype.injectCSS = function(){
	$('head').append('<link rel="stylesheet" href="'+this.options.theme_path+'osimo_editor.css" type="text/css" />');
}

OsimoEditor.prototype.loadTheme = function(){
	/*if(this.template == '' && window.sessionStorage){
		if(sessionStorage.osimo_bbeditor_theme != null){
		    this.template = sessionStorage.osimo_bbeditor_theme;
		}
	}*/
	
	if(this.template == ''){
		var obj = this;
		var postData = {"theme":this.options.theme};
		$.ajax({
			type:'POST',
			url:obj.options.editor_path+"theme_loader.php",
			data:postData,
			success:function(data){
				obj.template = data;
				/*if(window.sessionStorage){
					sessionStorage.osimo_bbeditor_theme = data;
				}*/
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
	var inputID;
	this.input.attr('id') != null ? 
		inputID = this.input.attr('id') : 
		inputID = 'osimo_editor' + num;
		
	var that = this;
	var eleAttr = {
		id : inputID+'_editbox',
		eClass : that.input.attr('class'),
		style : that.input.attr('style'),
		name : that.input.attr('name')
	};
	
	/* Begin DOM Injection */
	var inject = '<textarea ';
	$.each(eleAttr,function(i,val){
		if(i=='eClass'){ inject += 'class="'+val+'" '; }
		else{
			if(val){
				inject += i + '="'+val+'" ';
			}
		}
	});
	inject += '>'+contents+'</textarea>';
	
	var template = $(this.template).attr('id',this.input.attr('id'));
	
	var template_html = template.clone().appendTo('<div>').parent().html().replace(/\{\*osimo_editor\*\}/,inject);
	this.input.replaceWith(template_html);
	/* End DOM injection */
	
	if(!$('#'+eleAttr.id).hasClass('osimo-editor-editbox')){ 
		$('#'+eleAttr.id).addClass('osimo-editor-editbox');
	}
	if(this.options.width){
		$('#'+inputID).css({'width':that.options.width});
		$('#'+eleAttr.id).css({'width':that.options.width});
	}
	if(this.options.height){
		$('#'+inputID).css({'height':that.options.height});
	}
	if(this.options.editorHeight){
		$('#'+eleAttr.id).css({'height':that.options.editorHeight});
	}
	if(this.options.styles){
		$('#'+inputID).css(that.options.styles);
	}
	if(this.options.editorStyles){
		$('#'+eleAttr.id).css(that.options.editorStyles);
	}
	
	this.controls.activate(inputID);
}

function OsimoEditorControls(){

}

OsimoEditorControls.prototype.activate = function(inputID){
	/* First add click events to all buttons */
	this.input = inputID;
	var that = this;
	$.each($('#'+this.input+' .osimo-editor-menu, #'+this.input+' .osimo-editor-button'),function(){
		if($(this).hasClass('osimo-editor-menu')){ var action = 'change'; }
		else{ var action = 'click'; }
		$(this).bind(action,function(){
			var func_name = $(this).attr('class').split(" ")[1].replace(/\-/gi,'_')+'()';
			func_name = func_name.split("osimo_editor_")[1];
			eval('that.'+func_name+';');
		});
	});
}

/*
 *	this.getTextSelection()
 *	Utility function that returns the text that is selected
 *	and is cross-browser compatible.
 */
OsimoEditorControls.prototype.getTextSelection = function(){
	var textarea = $('#'+this.input+'_editbox').get(0);
	if (window.getSelection) {
		var len = textarea.value.length;
		var start = textarea.selectionStart;
		var end = textarea.selectionEnd;
		var sel = textarea.value.substring(start, end);
		var result = {"textarea":textarea,"start":start,"end":end,"len":len,"sel":sel};
		return result;
	}
	else if (document.selection) {
		/* Damn you IE, why must you torture me so? */
		var range = document.selection.createRange();
		var stored_range = range.duplicate();
		stored_range.moveToElementText( textarea );
		stored_range.setEndPoint( 'EndToEnd', range );
		textarea.selectionStart = stored_range.text.length - range.text.length;
		textarea.selectionEnd = textarea.selectionStart + range.text.length;
		var result = {"textarea":textarea,"start":textarea.selectionStart,"end":textarea.selectionEnd,"len":textarea.value.length,"sel":range.text};
		return result;
	}
}

OsimoEditorControls.prototype.replaceText = function(text){
	var inputID = '#'+this.input+'_editbox';
	var replace = $(inputID).attr('value').substring(0,text.start) + text.replace + text.textarea.value.substring(text.end,text.len);
	$(inputID).attr('value',replace).focus();
}

OsimoEditorControls.prototype.simpleReplace = function(wrapper){
	var text = this.getTextSelection();
	text.replace = '['+wrapper+']' + text.sel + '[/'+wrapper+']';
	this.replaceText(text);
}

OsimoEditorControls.prototype.customReplace = function(before,after){
	var text = this.getTextSelection();
	text.replace = before + text.sel + after;
	this.replaceText(text);
}

OsimoEditorControls.prototype.conditionReplace = function(textSelected,textNotSelected){
	var text = this.getTextSelection();
	if(text.sel){ textSelected(text); }
	else{ textNotSelected(text); }
}

OsimoEditorControls.prototype.text_bold = function(){
	this.simpleReplace('b');
}

OsimoEditorControls.prototype.text_italic = function(){
	this.simpleReplace('i');
}

OsimoEditorControls.prototype.text_underline = function(){
	this.simpleReplace('u');
}

OsimoEditorControls.prototype.align_left = function(){
	this.simpleReplace('left');
}

OsimoEditorControls.prototype.align_center = function(){
	this.simpleReplace('center');
}

OsimoEditorControls.prototype.align_right = function(){
	this.simpleReplace('right');
}

OsimoEditorControls.prototype.no_code = function(){
	this.simpleReplace('nocode');	
}

OsimoEditorControls.prototype.bullet_list = function(){
	this.customReplace('[list]\n[*]','\n[/list]');
}

OsimoEditorControls.prototype.font_family = function(){
	var font = $('#'+this.input+" .osimo-editor-font-family").attr('value');
	if(font=="") return;
	this.customReplace("[font=" + font + "]","[/font]");
}

OsimoEditorControls.prototype.font_size = function(){
	var size = $('#'+this.input+" .osimo-editor-font-size").attr('value');
	if(size=="") return;
	this.customReplace("[size=" + size + "]","[/size]");
}

OsimoEditorControls.prototype.font_color = function(){
	var color = $('#'+this.input+" .osimo-editor-font-color").attr('value');
	if(color=="" || !color) return;
	this.customReplace("[color=" + color + "]","[/color]");
}

OsimoEditorControls.prototype.quote_user = function(){
	var user = prompt("Enter the username of the person you are quoting (optional).","");
	if(user==null) return;
	if(user==''){
		this.simpleReplace('quote');
	}
	else{
		this.customReplace("[quote=" + user + "]","[/quote]");
	}
}

OsimoEditorControls.prototype.image_add = function(){
	var that = this;
	this.conditionReplace(
		function(text){
			text.replace = "[img]" + text.sel + "[/img]";
			that.replaceText(text);
		},
		function(text){
			var url = prompt("Enter the URL to the image.","http://");
			if(url==null || url=="") return;
			text.replace = "[img]" + url + "[/img]";
			that.replaceText(text);
		}
	);
}

OsimoEditorControls.prototype.link_add = function(){
	var that = this;
	this.conditionReplace(
		function(text){
			var url = prompt("Enter the URL you wish to link to.","http://");
			if(url==null || url=="") return;
			text.replace = "[url=" + url + "]" + text.sel + "[/url]";
			that.replaceText(text);
		},
		function(text){
			var url = prompt("Enter the URL you wish to link to.","http://");
			if(url==null || url=="") return;
			var content = prompt("Enter the text you want to turn into a link (optional).","");
			if(content==null) return;
			if(content==""){
				text.replace = "[url]" + url + "[/url]";
			}
			else{
				text.replace = "[url=" + url + "]" + content + "[/url]";
			}
			that.replaceText(text);
		}
	);
}

OsimoEditorControls.prototype.email_add = function(){
	var that = this;
	this.conditionReplace(
		function(text){
			var email = prompt("Enter the email address you wish to link to.","");
			if(email==null || email=="") return;
			text.replace = "[email=" + email + "]" + text.sel + "[/email]";
			that.replaceText(text);
		},
		function(text){
			var email = prompt("Enter the email address you wish to link to.","");
			if(email==null || email=="") return;
			var content = prompt("Enter the text you want to turn into a link (optional).","");
			if(content==null) return;
			if(content==""){
				text.replace = "[email]" + email + "[/email]";
			}
			else{
				text.replace = "[email=" + email + "]" + content + "[/email]";
			}
			that.replaceText(text);
		}
	);
}

OsimoEditorControls.prototype.zoom_in = function(){
	var inputID = '#'+this.input+'_editbox';
	var curFont = Number($(inputID).css('font-size').split('px')[0]);
	var newSize = curFont + 2;
	$(inputID).css({'font-size':newSize+'px'});
}

OsimoEditorControls.prototype.zoom_out = function(){
	var inputID = '#'+this.input+'_editbox';
	var curFont = Number($(inputID).css('font-size').split('px')[0]);
	var newSize = curFont - 2;
	$(inputID).css({'font-size':newSize+'px'});
}

})(jQuery);