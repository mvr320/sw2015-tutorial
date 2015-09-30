$(document).ready(function(e){
	
	var query = $('#hiddenMenu').val();
	var endpoint = 'http://localhost:5820/week4/query';
	var format = 'JSON';
	var reasoning = 'false';
	
	$.get('/sparql',data={'endpoint': endpoint, 'query': query, 'reasoning': reasoning,'format': format}, function(json){
		console.log(json);
		console.log('false');

		try {
			var vars = json.head.vars;
			var preUl = $('<a href="#Food">FOOD (No reasoning)</a>');
			var ul = $('<ul id="topList2"></ul>'); //toplist
			ul.addClass('list-group');
		
			$.each(json.results.bindings, function(index,value){
				if($(ul).find('#2'+value['class']['value'].split('#')[1]).length){
					console.log('bestaat al.');
				} else {
					ul.append('<li><a href="#'+value['class']['value'].split('#')[1]+'">'+value['class']['value'].split('#')[1]+'</a><ul id=2'+value['class']['value'].split('#')[1]+'></ul></li>');
				}
				var target = $(ul).find('#2'+value['class']['value'].split('#')[1]);
				var li = $('<li><a href="'+value['typeOf']['value']+'">'+value['typeOf']['value'].split('#')[1]+'</a></li>');
				target.append(li);
			});
			$('#linktargetMenu2').html(ul);
			$('#topList2').before(preUl);
			
		} catch(err) {
			console.log(err);
			$('#linktargetMenu2').html('Something went wrong!');
		}
	});
});

$(document).ready(function(e){
	
	var query = $('#hiddenMenu').val();
	var endpoint = 'http://localhost:5820/week4/query';
	var format = 'JSON';
	var reasoning = 'true';
	
	$.get('/sparql',data={'endpoint': endpoint, 'query': query, 'reasoning': reasoning,'format': format}, function(json){
		console.log(json);
		console.log('true');
		try {
			var vars = json.head.vars;
			var preUl = $('<a href="#Food">FOOD (Reasoning)</a>');
			var ul = $('<ul id="topList"></ul>'); //toplist
			ul.addClass('list-group');
		
			$.each(json.results.bindings, function(index,value){
				if($(ul).find('#'+value['class']['value'].split('#')[1]).length){
					console.log('bestaat al.');
				} else {
					ul.append('<li><a href="#'+value['class']['value'].split('#')[1]+'">'+value['class']['value'].split('#')[1]+'</a><ul id='+value['class']['value'].split('#')[1]+'></ul></li>');
				}
				var target = $(ul).find('#'+value['class']['value'].split('#')[1]);
				var li = $('<li><a href="'+value['typeOf']['value']+'">'+value['typeOf']['value'].split('#')[1]+'</a></li>');
				target.append(li);

			});
			$('#linktargetMenu').html(ul);
			$('#topList').before(preUl);
			
		} catch(err) {
			console.log(err);
			$('#linktargetMenu').html('Something went wrong!');
		}
	});
	
});

$('.linkgetData').on('click', function(e){
	
	var query = $('#getData').val();
	var endpoint = 'http://localhost:5820/week4/query';
	var format = 'JSON';
	var runstring = '/sparql?endpoint='+endpoint+'&query='+query+'&format='+format;
	console.log(runstring);
	window.open(runstring);
	//console.log({'endpoint': endpoint, 'query': query, 'format': format});
	//window.open('/sparql?endpoint='+endpoint+'&query
	/*$.get('/sparql',data={'endpoint': endpoint, 'query': query, 'format': format}, function(json){
		var pre = $('<pre></pre>');
		pre.text(JSON.stringify(json));
		$('#linktarget13').html(pre);
	});*/
	
});

$('#addToStoreLink').on('click',function(e){
	var rdf_data = $('#addToStoreText').val();
	console.log(rdf_data);
	$.post('/store',data={'data': rdf_data}, function(data){
		var pre = $('<pre></pre>');
		pre.text(data);
		$('#addToStoreResp').html(pre);
	})
});

$('#runcustomquery').on('click',function(e){
	
	var query = $('#getData1').val();
	var endpoint = 'http://localhost:5820/week4/query';
	var format = 'JSON';
	var reasoning = $('#checkinf').prop('checked');
	
	$.get('/sparql',data={'endpoint': endpoint, 'query': query, 'reasoning': reasoning,'format': format}, function(json){
		console.log(json);
		try {
			var vars = json.head.vars;
			var ul = $('<ul></ul>'); //toplist
			ul.addClass('list-group');
		
			$.each(json.results.bindings, function(index,value){
				var li = $('<li></li>');
				li.addClass('list-group-item');
			
				$.each(vars, function(index, v){
					var v_type = value[v]['type'];
					var v_value = value[v]['value'];
				
					li.append('<strong>'+v+'</strong><br/>');
				
					// If the value is a URI, create a hyperlink
					if (v_type == 'uri') {
						var a = $('<a></a>');
						a.attr('href',v_value);
						a.text(v_value);
						li.append(a);
					// Else we're just showing the value.
					} else {
						li.append(v_value);
					}
					li.append('<br/>');
					
				});
				ul.append(li);
			
			});
			
			$('#queryResult').html(ul);
			
		} catch(err) {
			console.log(err);
			$('#queryResult').html('Something went wrong!');
		}
	});
	
});