var QueryString = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  } 
    return query_string;
}();


function decodeUrl(){
	//check for "ref" in query string
	if(QueryString.ref){
		var offset = 20;
		var res = cipher(QueryString.ref, -offset);
		document.getElementById("user").innerHTML = res;
	}
}


function cipher(input, offset){
	if(input && typeof input === 'string' || input instanceof String){
		var charArray = input.split('');
		for(var i = 0; i < charArray.length; i++){
			charArray[i] = shiftChar(charArray[i], offset);
		}
		return charArray.join('');
	}
	return null;
}

function shiftChar(character, offset){
	//clamp from a-Z
	var code = character.charCodeAt(0) + offset;
	var low = 65;
	var high = 126;
	var range = high - low;
	code -= low;
	var mod = code % range;
	if (mod < 0)
	{
		mod += range;
	}
	mod = mod + low;
	return String.fromCharCode(mod);
}

window.onload = function(){
	decodeUrl();
}