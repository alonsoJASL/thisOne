// Checking page title

    //Creating Elements

setTimeout(function(){
    var useRealData = true;
    //$('head').append('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">');

	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = '.upvote { color: rgb(0,147,190); font-size: 14px};';
	document.getElementsByTagName('head')[0].appendChild(style);

    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.downvote { color: rgb(212,65,114); font-size: 14px };';
    document.getElementsByTagName('head')[0].appendChild(style);

	var t = document.getElementsByClassName("r");

    loop(0, t.length);



    console.log("done");

    function loop(i, l) {
      if (i < l){    //data.length
        var url = t[i].childNodes[0].href;
        var domain = extractDomain(url);
        var up = 0;
        var down = 0;
        if (useRealData){
            $.get(
                "https://the-one.herokuapp.com/api/reviews/score/" + domain,
                {paramOne : 1, paramX : 'abc'},
                function(data) {
                   up = data.up;
                   down = data.down;

                    var upnode = document.createElement("b"); 
                    var q = document.createTextNode("  " + up.toString());       // Create a text node
                    upnode.appendChild(q);
                    upnode.className += "upvote st";
                    t[i].appendChild(upnode);

                    var downnode = document.createElement("b"); 
                    var q = document.createTextNode(" " + down.toString());       // Create a text node
                    downnode.appendChild(q);
                    downnode.className += "downvote st";
                    t[i].appendChild(downnode);
                }
            );
        }
        else{
            up = getVotes()
            down = getVotes()
            var upnode = document.createElement("span"); 
            var q = document.createTextNode("  " + up.toString());       // Create a text node
            upnode.appendChild(q);
            upnode.className += "upvote st";
            t[i].appendChild(upnode);

            var downnode = document.createElement("span"); 
            var q = document.createTextNode(" " + down.toString());       // Create a text node
            downnode.appendChild(q);
            downnode.className += "downvote st";
            t[i].appendChild(downnode);
        }
        loop(i + 1,l)
      }
    };

    function extractDomain(url) {
        var domain;
        //find & remove protocol (http, ftp, etc.) and get domain
        if (url.indexOf("://") > -1) {
            domain = url.split('/')[2];
        }
        else {
            domain = url.split('/')[0];
        }

        //find & remove port number
        domain = domain.split(':')[0];

        return domain;
    }

    function httpGet(theUrl, callback){
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", theUrl, true); // true for asynchronous 
        xmlHttp.send(null);
    }

    function getVotes(){
        return Math.round((100 + Math.random()*5000));
    }



}, 1000);


