function createCORSRequest(method, url) {
  var httpRequest = new XMLHttpRequest();
  if ("withCredentials" in httpRequest) { // httpRequest for Chrome/Firefox/Opera/Safari.
    httpRequest.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") { // XDomainRequest for IE.
    httpRequest = new XDomainRequest();
    httpRequest.open(method, url);
  } else { // CORS not supported.
    httpRequest = null;
  }

  return httpRequest;
}

// method to parse the title tag from the response
function getTitle(text) {
  try { 
    return text.match('<title>(.*)?</title>')[1];
  } catch (e) {
    return "not found";
  }
}

// method to get images names from the resopnse
function getImages(text) {
    var arr = text.match(/\w*\.(jpg|jpeg|png|gif)/mgi);
    try {
        return arr.slice(1);
    } catch (e) {
        return null;
    }
}
// Make the CORS request.
function makeRequest() {

  //var url = document.getElementById('request_url').value;
  var url = "http://10.129.206.3/main.css"; //http://10.129.206.3"

  var httpRequest = createCORSRequest('GET', url);
  if (!httpRequest) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  httpRequest.onload = function() {
    var text = httpRequest.responseText;
    var title = getTitle(text);
    var images = getImages(text);
    var result = "";
    for(var elem in images) {
        result += (images[elem] + '\n');
    }

    alert('Response from CORS request to ' + url + ': ' + title + "\nImages: \n" + result);
  };

  httpRequest.onerror = function() {
    alert('There is an error making the request.');
  };

  httpRequest.send();
}
