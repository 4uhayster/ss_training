function parseURL(str = "https://example.com/path/to/file/search?property=value&property2=value2") {
	var pattern = /^(?<protocol>http(?:s)?|ftp|ssh|telnet|rdp):\/\/(?:(?<username>[_a-zA-Z][\w_]*):(?<password>.*)@)?(?:(?<ipaddres>(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d))|(?<hostname>(?:(?:[a-zA-Z][a-zA-Z0-9\-]*)\.)*(?:[A-Za-z][a-zA-Z0-9\-]*[a-zA-Z0-9])))(?<port>:\d{1,5})?(?<pathname>[\w\+\/\.\-]+)?(?:(?<search>[^#\s]+)(?<hash>[^\s]*)?)?$/gm;
	var match = pattern.exec(str);
	console.log(str);
	try { 
		for(var part in match.groups) {
			if(typeof match.groups[part] != "undefined") {
				console.log(" - " + part + ": " + match.groups[part]);
			}
		}
	} catch(e) {
		console.log("Cannot find match");
	}
}

parseURL();
parseURL("https://192.168.240.139/+CSCOE+/portal.html");
parseURL("hello");	// not valid URL address
parseURL("https://www.tecmint.com/remove-unwanted-services-in-centos-7");
parseURL("https://user:pass@host.com:8080/path/to_directory/and_to_file/h?query=string#hash");