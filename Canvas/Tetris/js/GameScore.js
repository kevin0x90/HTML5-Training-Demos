var gameScore = function(settings) {
	var _drawingContext = settings.drawingContext;				
	var _score = 0; 
	var _fontType = settings.fontType || "20px sans-serif";
	var _fontColor = settings.color || "#ffffff";
	var _margin = {
		left: settings.leftMargin, 
		top: settings.topMargin
	};
	var _header = {
		title: settings.headerTitle || "SCORE",
		marginTop: settings.headerTitleTopMargin || 30,
		marginLeft: settings.headerTitleLeftMargin || 0
	}; 								
	var _FPS = {
		targetFrames: 1000.0 / (settings.FPS || 1.0),
		lastFrameTime: 0 
	};	
	
	function paintToScreen(drawMethod) {
		_drawingContext.save();
		_drawingContext.beginPath();
	
		drawMethod();					
		
		_drawingContext.closePath();
		_drawingContext.restore();
	}
	
	function drawTitle() {
		paintToScreen(function() {
			_drawingContext.translate(_margin.left - _header.marginLeft,
				_margin.top - _header.marginTop);
			var textSize = getTextSize(_header.title);
			_drawingContext.clearRect(0, -textSize.height, textSize.width,
				textSize.height + 3);
			_drawingContext.fillStyle = _fontColor;
			_drawingContext.font = _fontType;
			_drawingContext.strokeText(_header.title, 0, 0);
		});
	}				
	
	function drawScore() {																
		_drawingContext.translate(_margin.left, _margin.top);
		var textSize = getTextSize(_score.toString());						
		_drawingContext.clearRect(0, -textSize.height, textSize.width,
			textSize.height + 3);
		_drawingContext.fillStyle = _fontColor;
		_drawingContext.font = _fontType;					
		_drawingContext.strokeText(_score.toString() , 0, 0);										
	}
	
	function getTextSize(targetString) {
		var textSize = {
			width: targetString.length,
			height: 0
		};
		var fontSize = getFontSize();
		textSize.height = fontSize;
		textSize.width *= fontSize;										
		
		return textSize;
	}
	
	function getFontSize() {
		var SIZE_DEFINITION = 0;
		var fontTypeString = _fontType.split(" ");
		var fontSize = fontTypeString[SIZE_DEFINITION]; 					
		fontSize = parseInt(fontSize.replace("px", ""));					
		
		return fontSize;				
	}
	
	return {
		update: function(frameTime) {
			if(frameTime - _FPS.lastFrameTime >= _FPS.targetFrames) {
				paintToScreen(function() {
					drawTitle();
					drawScore();										
				});				
				_score += 1;
				_FPS.lastFrameTime = frameTime;						
			}
		},
		updateScore: function(scoreToAdd) {
			_score += scoreToAdd;						
		}
	};
};      