var infowindow = null;
var places_q = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?name=";
var API_KEY = "AIzaSyDqt2FALy6e7KJnmf_-i4v6f9WS9FMX-xM";
function initMap() {
	window.onload = function() {
		startJS();
		reFormatDateTime();

	}

}
console.log("today is "+new Date())
var hub = {};
var statuses = {
	contacted:'false',
	scheduled:'false',
	seen:'false',
	applied:'false',
	in_pocket:'false'
};

function startJS () {
	// Will get lat and lon based on written address
	var addr = '';
	var mapDiv = 'map';
	var idmap = 'map';
	mapDiv = document.getElementById(idmap);
	mapDiv.style.width='250px';
	mapDiv.style.height='250px';
	mapDiv.style.backgroundColor='#CCC';
	var api_tag = '&key='+API_KEY;
	bound = new google.maps.LatLngBounds();
	$.getJSON('/main/JSON',function(json) {
		json.Apt.forEach(function (a){
			geocodeMe(a, addMarkers);
		})
	})
	var mapCenter = bound.getCenter();
	map = new google.maps.Map(mapDiv, {
		center: mapCenter,
		zoom:14
	});
	// updateHeatMap();
	// console.log(bound.getCenter().toJSON());
	var updateMap = function (){
		mapCenter = bound.getCenter();
		map.setCenter(mapCenter);
		map.fitBounds(bound);
	};
	var getContent = function (a) {
		return "<div>Rent: $"+a.rent+"</div><hr><div>Status: "+a.link;
	}
	var addMarkers = function (a, latlon){
		var eid = 'row-'+a.id;
		var row_active = document.getElementById(eid);
		row_active.childNodes[3].innerHTML = a.addr;
		// console.log(row_active.childNodes[3].innerHTML);
		bound.extend(latlon);
		var contentString = getContent(a);
		var marker = createMarker(latlon)
		// var marker = new google.maps.Marker ({
		// 	map:map,
		// 	position:latlon
		// });
		marker.addListener('click',function() {
			if (infowindow){
				infowindow.close();
			}
			infowindow = new google.maps.InfoWindow({
				content: contentString
			});

			infowindow.open(map,marker);
		})
		marker.addListener('mouseover', function () {
			if (!row_active.className.match(/.*success.*/)) {
				row_active.className = "success";
			}
		})
		marker.addListener('mouseout', function () {
			if (row_active.className.match(/.*success.*/)) {
				row_active.className = "";
			}
		})


		updateMap();
	}
	function createMarker(place) {
		// console.log("PLACE: "+place);
		var marker = new google.maps.Marker({
			map:map,
			position:place
		})
		return marker;
	}
}

function geocodeMe (elem, callback) {
	geocoder = new google.maps.Geocoder();
	geocoder.geocode( { 'address': elem.addr }, function (results, status) {
	// console.log("GeoCoder: Number of matches found: "+results.length+" for address: "+elem.addr);
	if (status == google.maps.GeocoderStatus.OK) {
		latlon = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
		if (typeof callback == 'function') {
			elem.addr = results[0].formatted_address;
			callback(elem, latlon);
		}
	} else {
		throw ("no results found for: "+elem.addr);
	}
	});
}

function deleteConfirm(id) {
	if (confirm("Delete for sure?") == true) {
		window.location.replace("/apts/"+id+"/delete");
	} else {
		// window.location.replace("main");
	}
}

var asc = 1;
var wholefoods = "Whole Foods Market, CA";



function sortTable(col){
	var rows = apt_table.rows,
	rlen = rows.length
	arr = new Array();
	var i, j, cells, clen;
    for (i = 0; i < rlen; i++) {
        cells = rows[i].cells;
        clen = cells.length;
        arr[i] = new Array();
        for (j = 0; j < clen; j++) {
            arr[i][j] = cells[j].innerHTML;
        }
    }
    console.log("Sorting...")
	arr.sort(function (a, b) {
		return (a[col] == b[col]) ? 0 : ((a[col] > b[col]) ? asc : -1 * asc);
	});
	asc = -1*asc;
	for(i = 0; i < rlen; i++){
        arr[i] = "<td>"+arr[i].join("</td><td>")+"</td>";
    }
    apt_table.innerHTML = "<tr>"+arr.join("</tr><tr>")+"</tr>";

}

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  console.log("New xhr request for "+url+" method="+method);
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);
	// xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:5000');


  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}
var heatmap = null;
function updateHeatMap() {
	hub = {addr:"Berkeley, CA"};
	hub.addr_heat = document.getElementById('hub-addr-heat').value.split(" ").join("+");
	var heatmapData = [];
	places = new google.maps.places.PlacesService(map);
	hub.latlon = bound.getCenter();
	var request = {
		location: hub.latlon,
		radius: '4',
		query: hub.addr_heat,
	}
	places.textSearch(request, createHeatMap);
	function createHeatMap(results, status) {
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			var heatmapOptions = {
				maxIntensity:0.8,
				radius:40,
			};
			heatmapData = [];
			results.forEach(function (a) {
				var loc = new google.maps.LatLng(a.geometry.location.lat(), a.geometry.location.lng());
				// createMarker(loc);
				heatmapData.push(loc);
				if (!heatmap) {
					heatmap = new google.maps.visualization.HeatmapLayer({
						  data: heatmapData,
						  options:heatmapOptions,
					});
				} else {
					heatmap.setData(heatmapData);
				}
				heatmap.setMap(map);
				delete loc;
			})
		}
	}
}
function clearHeatmap() {
	console.log("Clear heatmap");
	if (heatmap){
		heatmap.getData().j = [];
		heatmap.setMap(null);
	}
}
var ageOfPost = {

	3: '<p class="bg-info">%s %s days ago</p>',
	2: '<p class="bg-warning">%s %s days ago</p>',
	1: '<p class="bg-danger">%s %s day ago</p>',
	0: '<p class="bg-danger"><b>Today! %s</b></p>'
}
function sprintf( format, arguments )
{
  for( var i=0; i < arguments.length; i++ ) {
    format = format.replace( /%s/, arguments[i] );
    console.log(format);
  }
  return format;
}
var today = new Date();
function reFormatDateTime() {
	// console.log('reFormatDateTime ..');
	dtelems = 	document.getElementsByClassName('datetime');
	// console.log('Found '+dtelems.length+' datetime class elemets.');
	for (i = 0; i<dtelems.length; i++) {
		text = dtelems[i].innerHTML;
		parseDate = text.split(/ |-|:/);
		// console.log(parseDate);
		if (text.match(/pm/)){
			parseDate[3] = parseInt(parseDate[3])+12;
		}
		// console.log(parseDate[3]);
		if (parseDate[4]) { 
			if (parseDate[4].match(/a|pm/)) {
				parseDate[4] = /\d+/.exec(parseDate[4])[0];
				// console.log('parseDate modified to '+parseDate[4]);
			}
		} else {
			parseDate[4] = '0';
			// console.log('parseDate no exists');
		}
		// console.log(parseDate[4]);
		// console.log('Call date with '+ parseDate.join(' '));
		parseDate[1] = parseInt(parseDate[1]) -1;
		days  = parseInt(today.getDate() - parseDate[2]);
		age = days;
		if (parseInt(today.getMonth() - parseDate[1]) != 0 ){
			age = age + 30;
		}
		if (age > 2) { age = 2;}
		if (age > 3) { age = 3;}
		d = new Date(parseDate[0], parseDate[1], parseDate[2], parseDate[3], parseDate[4]);
		console.log('AGE: '+age);
		var d_a = [];
		d_a.push(d.toLocaleString());
		d_a.push(days);
		console.log(d_a.length);
		dtelems[i].innerHTML =  sprintf(ageOfPost[age], d_a);
	}
}
window.onload = function () {
	apt_table = document.getElementById('apt_table');
	console.log("Window finished loading")
	reFormatDateTime();
}