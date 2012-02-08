<?php

define('php', '.php');

define('parts', 'parts/');
define('pages', 'pages/');
define('styles', 'resources/css/');
define('css', '.css');
global $_page;
global $_ccss;

	/**
	 * URL
	 */
	class URL {
		
		const index = "index";
		const home = URL::index;
		const about = "om";
		const contact = "kontakt";
		const foretaget = 'foretaget';
		const _404 = "404";
		const part_header = 'header';
		const part_footer = 'footer';
		const part_docend = 'document.end';
		
		/**
		 * Enumerates the constant properties of URL and picks the value equal to $comparer
		 * @version 1
		 * @param $comparer [string] A string that should 
		 */
		public static function Enumerate($comparer, $classname)
		{
			$Class  	= new ReflectionClass($classname);
			$properties = $Class->getConstants();
			
			unset($Class); //We don't need you anymore
			
			foreach ($properties as $value) {
				
				if ($value == $comparer) {
					
					return $value;
				}
			}
			
			return URL::_404;
		}
	}
	
	class LINK {
		
		const TAG_START  = '<link ';
		const TAG_END    = ' />';
		const ATTR_HREF  = ' href="%s" ';
		const ATTR_MEDIA = ' media="%s" ';
		const ATTR_REL	 = ' rel="%s" ';
		const ATTR_TYPE  = ' type="%s" ';
		
		const MEDIA_ALL 	 = 'all';
		const MEDIA_HANDHELD = 'handheld';
		const MEDIA_SCREEN   = 'screen';
		
		const REL_CSS		 = 'stylesheet';
		
		const TYPE_TCSS		 = 'text/css';
		
		
		public static $LINK;
		
		public static function Create($attrs) {
			
			$link = LINK::TAG_START;
			
			foreach ($attrs as $key => $value) {
				
				$link .= sprintf($key, $value);
			}
			
			LINK::$LINK = ($link .= LINK::TAG_END);
		}
	}
	
	function StripGet() {
		
		$get = array();
		
		foreach ($_GET as $key => $value) {
			
			$get[htmlspecialchars(stripslashes($key))] = htmlspecialchars(stripslashes($value));
		}
		
		return $get;
	}
	
	$get = StripGet();
	$required = array();
	
	$required[] = URL::part_header;
	$required[] = URL::Enumerate(isset($get['url']) ? $get['url'] : 'index', 'URL');
	$required[] = URL::part_footer;
	$required[] = URL::part_docend;

	foreach ($required as $value) {

		global $_page, $_ccss;
		$page = pages . $value . php;
		$part = parts . $value . php;
		$css = styles . $value . css;
		
		if (file_exists($css)) {

			LINK::Create(array(
				LINK::ATTR_HREF  => $css,
				LINK::ATTR_MEDIA => LINK::MEDIA_SCREEN,
				LINK::ATTR_REL	 => LINK::REL_CSS,
				LINK::ATTR_TYPE  => LINK::TYPE_TCSS
			));	
		}
		
		
		
		if (file_exists($page)) {

			$_page .= file_get_contents($page);
			
		} else if (file_exists($part)) {

			$_page .= file_get_contents($part);
			
		} else {
			
			die("No file was found.");
			
		}
	}
	
	echo sprintf($_page, LINK::$LINK);
	
?>