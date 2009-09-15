<div class="osimo-editor-wrap">
	<div class="osimo-editor-controls-wrap">
		<div class="osimo-editor-controls-content">
			<img src="<?=THEMEPATH?>img/text_bold.png" class="osimo-editor-button osimo-editor-text-bold" alt="text-bold" title="Bold" />
			<img src="<?=THEMEPATH?>img/text_italic.png" class="osimo-editor-button osimo-editor-text-italic" alt="text-italic" title="Italic" />
			<img src="<?=THEMEPATH?>img/text_underline.png" class="osimo-editor-button osimo-editor-text-underline" alt="text-underline" title="Underline" />
			
			<img src="<?=THEMEPATH?>img/divider.png" class="osimo-editor-divider" />
			
			<img src="<?=THEMEPATH?>img/text_align_left.png" class="osimo-editor-button osimo-editor-align-left" alt="text_align_left" title="Align Left" />
			<img src="<?=THEMEPATH?>img/text_align_center.png" class="osimo-editor-button osimo-editor-align-center" alt="text_align_center" title="Align Center" />
			<img src="<?=THEMEPATH?>img/text_align_right.png" class="osimo-editor-button osimo-editor-align-right" alt="text_align_right" title="Align Right" />
			
			<img src="<?=THEMEPATH?>img/divider.png" class="osimo-editor-divider" />
			
			<img src="<?=THEMEPATH?>img/text_list_bullets.png" class="osimo-editor-button osimo-editor-bullet-list" alt="text-list-bullets" title="Bulleted List"/>
			<img src="<?=THEMEPATH?>img/book_previous.png" class="osimo-editor-button osimo-editor-quote-user" alt="quote-user" title="Quote User" />
			<img src="<?=THEMEPATH?>img/image_add.png" class="osimo-editor-button osimo-editor-image-add" alt="image-add" title="Add an Image" />
			<img src="<?=THEMEPATH?>img/link_add.png" class="osimo-editor-button osimo-editor-link-add" alt="link-add" title="Add a Link" />
			<img src="<?=THEMEPATH?>img/email_add.png" class="osimo-editor-button osimo-editor-email-add" alt="email-add" title="Link to Email Addr" />
			<img src="<?=THEMEPATH?>img/layout_delete.png" class="osimo-editor-button osimo-editor-no-code" alt="image-no-code" title="[nocode] Tag" />
		</div>
		<div class="osimo-editor-controls-content">
			<select class="osimo-editor-menu osimo-editor-font-family">
				<?=getFontSelectorItems()?>
			</select>
			
			<img src="<?=THEMEPATH?>img/divider.png" class="osimo-editor-divider" />
			
			<select class="osimo-editor-menu osimo-editor-font-size">
				<?=getFontSizeItems()?>
			</select>
			
			<img src="<?=THEMEPATH?>img/divider.png" class="osimo-editor-divider" />
			
			<select class="osimo-editor-menu osimo-editor-font-color">
				<?=getColorPickerItems()?>
			</select>
		</div>
	</div>
	<div class="osimo-editor-textarea-wrap">
		{*osimo_editor*}
	</div>
</div>