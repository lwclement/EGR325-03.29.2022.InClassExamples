(function ( $ ) {
 
    $.fn.chartData = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            viewWidth : 1000, //width of the view default
			viewHeight: 300, //height of the view default
			margin: 10, //margin around the view
			yLabels : 5, //number of labels on the y axis, plus  the 0 label.
			data:[1,2,3], //default data.
        }, options );
 
 
		//set local variables.
		var data = settings.data; 
		var viewWidth = settings.viewWidth;
		var viewHeight = settings.viewHeight;
		var margin = settings.margin;
		var yLabels = settings.yLabels;
		
		//calculates the chart bounds
		var width = viewWidth - margin * 2;
		var height = viewHeight - margin * 2;

		var dataPoints = "";
		
		//horizontal spacing for the data points.
		var hSpacing = width / data.length;
		
		var maxData = 0;
		
		//calculate the maxDataPoint
		for(var i = 0; i < data.length; i++){
			if (data[i] > maxData){ 
				maxData = data[i];
			}
		}
		
		//label the y axis and draw horizontal lines
		
		var labels = "";
		var lines = '<line x1="' + (hSpacing + margin) + '" y1="' + margin + '" x2="' + (hSpacing + margin) + '" y2="' + (height + margin) + '" stroke-width="1" stroke="lightgray"/>'

		
		for (var i = 0; i <= yLabels; i++){
			var y = (height - ((height / yLabels) * i)) + margin;
			var labelText = Math.round((maxData / yLabels) * i * 100) / 100;
		  
			//labels for the y-axis
			labels += '<text x="0" y="' + y + '" font-family="Verdana" font-size="12">';
			labels += labelText;
			labels += '</text>';
			
			//horizontal lines for demarcation
			lines += '<line x1="' + (hSpacing + margin) + '" y1="' + y + '" x2="' + (width + margin) + '" y2="' + y + '" stroke-width="1" stroke="lightgray"/>'
		}

		//plot the data line and points
		var points = "";
		
		for(var i = 0; i < data.length; i++){
			if (dataPoints != ""){
				dataPoints+=" ";
			}
			var x = hSpacing * (i + 1) + margin;
			var y = height - ((height/maxData) * data[i]) + margin;
			//sets the data points for the polyline drawn on the chart
			dataPoints += x + "," + y;
			
			//draws the points on the chart
			points += '<circle cx="' + x + '" cy="' + y +'" r="2" stroke="black" stroke-width="2" fill="red" />';
			
		}
		
		console.log(dataPoints);
		
		//construct the svg XML
		var svg = '<svg height="' + viewHeight + '" width="' + viewWidth + '">'
		svg += labels;
		svg += lines;
		svg+= '<polyline points="' + dataPoints + '" fill="none" style="stroke:#006600;"/>'
		svg += points;
		svg+= '</svg>';
	 
		//sets the internal HTML for the jQuery element selected.
        return this.html(svg);
 
    };
 
}( jQuery ));