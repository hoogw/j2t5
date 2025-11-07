(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Stats = factory());
}(this, (function () { 'use strict';

/**
 * @author mrdoob / http://mrdoob.com/
 */

var Stats = function () {

	var mode = 0;

	var container = document.createElement( 'div' );
	//var container = document.getElementById('statsjs_div')
	// move to html tag div styles=''
	//original
	//container.style.cssText = 'position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000';
	// for arcgis_viewer only
	//container.style.cssText = 'position:fixed; bottom:0;left:0;margin-bottom: 70px; margin-left : 2px; opacity:0.8;z-index:10000';
	// for json2tree only
	container.style.cssText = 'position:fixed; bottom:0;left:0;margin-bottom: 3px; margin-left : 5px; opacity:0.4;z-index:10000';

	/*
	container.addEventListener( 'click', function ( event ) {

		event.preventDefault();
		showPanel( ++ mode % container.children.length );

	}, false );
	*/

	

	function addPanel( panel ) {

		//container.appendChild( panel.dom );
		container.append( panel.dom );
		return panel;

	}


	
	// always show all panel, so no need this
	/* 
	function showPanel( id ) {

		for ( var i = 0; i < container.children.length; i ++ ) {

			//container.children[ i ].style.display = i === id ? 'block' : 'none';
			container.children[ i ].style.display = i === id ? 'block' : 'block';
		}

		mode = id;

	}
	*/

	//

	var beginTime = ( performance || Date ).now(), prevTime = beginTime, frames = 0;

	
	if ( self.performance && self.performance.memory ) {
		var memPanel2 = addPanel( new Stats.Panel( 'RAM', '#FFBF00', '#002' ) );
		var memPanel = addPanel( new Stats.Panel( 'MB', '#f08', '#201' ) );
	}
	
	var msPanel = addPanel( new Stats.Panel( 'MS', '#0f0', '#020' ) );
	var fpsPanel = addPanel( new Stats.Panel( 'FPS', '#0ff', '#002' ) );
	

	//showPanel( 0 );

	return {

		REVISION: 16,

		dom: container,

		addPanel: addPanel,
		//showPanel: showPanel, // always show all panel, so no need this

		begin: function () {

			beginTime = ( performance || Date ).now();

		},

		end: function () {

			frames ++;

			var time = ( performance || Date ).now();

			msPanel.update( time - beginTime, 200 );

			if ( time >= prevTime + 1000 ) {

				fpsPanel.update( ( frames * 1000 ) / ( time - prevTime ), 100 );

				prevTime = time;
				frames = 0;

				if ( memPanel && memPanel2 ) {
					var memory = performance.memory;
					memPanel.update( memory.usedJSHeapSize / 1048576, memory.jsHeapSizeLimit / 1048576 );
					memPanel2.update( memory.totalJSHeapSize / 1048576, memory.jsHeapSizeLimit / 1048576 );
				}

				

			}

			return time;

		},

		update: function () {

			beginTime = this.end();

		},

		// Backwards Compatibility

		domElement: container,
		//setMode: showPanel  // always show all panel, so no need this

	};

};

Stats.Panel = function ( name, fg, bg ) {

	var min = Infinity, max = 0, round = Math.round;
	var PR = round( window.devicePixelRatio || 1 );

	// only width related make it longer for title
	var WIDTH =  80 * PR,  // 2 *
	    HEIGHT =  48 * PR,

			TEXT_X =  3 * PR, // 2 *
			TEXT_Y = 2 * PR,
			GRAPH_X =  3 * PR, // 2 *
			GRAPH_Y = 15 * PR,

			GRAPH_WIDTH =  74 * PR,  // 2 *
			GRAPH_HEIGHT =  30 * PR;

	var canvas = document.createElement( 'canvas' );
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	canvas.style.cssText = 'width:80px;height:48px';  // original
	//canvas.style.cssText = 'width:320px;height:96px';   // 2 * original  

	var context = canvas.getContext( '2d' );
	context.font = 'bold ' + ( 9 * PR ) + 'px Helvetica,Arial,sans-serif';
	// smaller text
	//context.font = 'bold ' + ( 6 * PR ) + 'px Helvetica,Arial,sans-serif';
	context.textBaseline = 'top';

	context.fillStyle = bg;
	context.fillRect( 0, 0, WIDTH, HEIGHT );

	context.fillStyle = fg;
	context.fillText( name, TEXT_X, TEXT_Y );
	context.fillRect( GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT );

	context.fillStyle = bg;
	context.globalAlpha = 0.9; 
	context.fillRect( GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT );

	return {

		dom: canvas,

		update: function ( value, maxValue ) {

			min = Math.min( min, value );
			max = Math.max( max, value );

			context.fillStyle = bg;
			context.globalAlpha = 0.9;
			context.fillRect( 0, 0, WIDTH, GRAPH_Y );
			context.fillStyle = fg;
			context.fillText( round( value ) + ' ' + name + ' (' + round( min ) + '-' + round( max ) + ')', TEXT_X, TEXT_Y );

			context.drawImage( canvas, GRAPH_X + PR, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT, GRAPH_X, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT );

			context.fillRect( GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, GRAPH_HEIGHT );

			context.fillStyle = bg;
			context.globalAlpha = 0.9;
			context.fillRect( GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, round( ( 1 - ( value / maxValue ) ) * GRAPH_HEIGHT ) );

		}

	};

};

return Stats;

})));
