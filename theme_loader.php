<?
if(isset($_POST['theme'])){
	$basepath = "http://".$_SERVER['SERVER_NAME'];
	$path = pathinfo($_SERVER['PHP_SELF'],PATHINFO_DIRNAME);
	define("THEMEPATH",$basepath.$path."/themes/".$_POST['theme']."/");
	
	$html = "<div class=\"osimo-editor\">";
	$html .= include_contents("themes/".$_POST['theme']."/template.php");
	$html .= "</div>";
	
	echo json_encode(array('html'=>$html,'size'=>strlen($html))); exit;
}

function getFontSelectorItems(){
	$fonts = array(
		"Arial",
		"Comic Sans MS",
		"Georgia",
		"Helvetica",
		"Impact",
		"Tahoma",
		"Times New Roman",
		"Trebuchet MS",
		"Verdana"
	);
	
	echo "<option value='' selected>Font Family</option>";
	
	foreach($fonts as $font){
		echo "<option value='$font' style='font-family:\"$font\",sans-serif'>$font</option>";
	}
}

function getFontSizeItems(){
	$sizes = array("Small"=>10,"Normal"=>16,"Large"=>24,"Huge"=>30);
	
	echo "<option value='' selected>Font Size</option>";
	
	foreach($sizes as $name=>$size){
		echo "<option value='$size' style='font-size:{$size}px'>$name</option>";
	}
}

function getColorPickerItems(){
	/* Might as well stick to the W3C/CSS Standards */
	$colors = array(
		"aqua",
		"black",
		"blue",
		"fuchsia",
		"gray",
		"green",
		"lime",
		"maroon",
		"navy",
		"olive",
		"purple",
		"red",
		"silver",
		"teal",
		"white",
		"yellow"
	);
	
	echo "<option value='' selected>Font Color</option>";
	
	foreach($colors as $color){
		if($color!='white'){
			echo "<option value='$color' style='color:$color;'>".ucfirst($color)."</option>";
		}
		else{
			echo "<option value='$color'>".ucfirst($color)."</option>";
		}
	}
}

function include_contents($filename){
	if (is_file($filename)) {
	    ob_start();
	    include $filename;
	    $contents = ob_get_contents();
	    ob_end_clean();
	    return $contents;
    }
    
    return false;
}
?>