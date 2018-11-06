/**
 * Get Parameter
 * @param $key (specific value)
 * @returns {string | object | bool(false)}
 */
function getParam($key)
{
	if(window.location.search.length > 1)
	{
		var $result = {};
		var $query = window.location.search.substring(1);
		var $parameters = $query.split('&');
		for( var i = 0; i < $parameters.length; i++ )
		{
			var $element     = $parameters[i].split('=');
			var $param_name  = decodeURIComponent($element[0]);
			var $param_value = decodeURIComponent($element[1]);
			$result[$param_name] = $param_value;
		}

		if ($key)
		{
			return $result[$key];
		}
		else {
			return $result;
		}
	}
	return false;
}



/**
 * Set Cookie
 * @param $key
 * @param $value
 * @param $expire_hours
 * @return bool
 */
function setCookie($key, $value, $expire_hours)
{
	if ($key && $value)
	{
    var $expire = '';
    if ($expire_hours)
    {
      if ($expire_hours = Number($expire_hours))
      {
        var $now         = new Date().getTime();
        var $expire_date = new Date($now + (60 * 60 * 1000 * $expire_hours));
        $expire          = $expire_date.toString();
      }
    }
    
    var $path  = location.pathname;
    var $paths = new Array();
    $paths = $path.split('/');
    if ($paths[$paths.length - 1] != '')
    {
      $paths[$paths.length - 1] = '';
      $path = $paths.join('/');
    }
    
    var $cookie = '';
    $cookie += ($key + '=' + encodeURIComponent($value));
    $cookie += '; path='+ $path;
    if ($expire)
    {
      $cookie += '; expires=' + $expire + '; ';
    }
    else {
      $cookie += '; ';
    }
    document.cookie = $cookie;
    return true
	}
	else {
		return false;
	}
}



/**
 * Get Cookie
 * @param $key
 * @returns {string | bool(false)}
 */
function getCookie($key)
{
	var st='';
	var ed='';
	if(document.cookie.length > 0)
	{
		st = document.cookie.indexOf($key + '=');
		if (st != -1)
		{
			st = st + $key.length + 1;
			ed = document.cookie.indexOf(';',st);
			if (ed == -1) ed=document.cookie.length;
			return decodeURIComponent(document.cookie.substring(st, ed));
		}
	}
	return false;
}



/**
 * HTML to Plane Text
 * @param $str
 * @returns string
 */
function html2text($str)
{
	if ($str)
	{
		return $str.replace(/(\s|\&nbsp;|<(\/)*("[^"]*"|'[^']*'|[^'">])*>)/g,'');
	}
	return '';
}



/**
 * New Line to BR
 * @param str
 * @returns string
 */
function nl2br(str)
{
	if (str)
	{
		str = str.replace(/(\r\n|\r|\n)/g, '<br>');
    return str;
  }
  return '';
}



/**
 * BR to New Line
 * @param str
 * @returns string
 */
function br2nl(str)
{
	if (str)
	{
    str = str.replace('<br>', '\n');
    return str;
	}
	return '';
}


