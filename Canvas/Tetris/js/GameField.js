var gameField = function(settings) {
	var _context = settings.context || "2d";
	var _drawingContext = null;
	var _canvasId = settings.canvasId;
	var _canvas = null;	
	var _FPS = {
		targetFrames: 1000.0 / (settings.FPS || 30.0),
		lastFrameTime: 0	
	};
	var _gameFieldBox = {
		x: 0,
		y: 0,
		width: settings.width || 300,
		height: settings.height || 300,
		leftMargin: settings.leftMargin || 0,
		topMargin: settings.topMargin || 0,
		cellSize: settings.cellSize || 20,		
	};		
	_gameFieldBox.cellArray = new Array(_gameFieldBox.width / _gameFieldBox.cellSize);

	init();			
		
	function init() {
		_canvas = document.getElementById(_canvasId);
		_drawingContext = _canvas.getContext(_context);
		initGameField();											
	}
	
	function initGameField() {
		var x, y, yCellArray;
		yCellArray = _gameFieldBox.height / _gameFieldBox.cellSize;
		for(x = 0; x < _gameFieldBox.cellArray.length; x++) {
			_gameFieldBox.cellArray[x] = new Array(yCellArray);
			for(y = 0; y < yCellArray; y++) {				
				_gameFieldBox.cellArray[x][y] = 0;
			}	
		}		
	}
	
	function drawGameField() {		
		_drawingContext.clearRect(_gameFieldBox.x, _gameFieldBox.y,
			_gameFieldBox.width, _gameFieldBox.height);
		_drawingContext.strokeRect(_gameFieldBox.x, _gameFieldBox.y,
			_gameFieldBox.width, _gameFieldBox.height);	
	}
	
	function rasterGameField() {
		var x, y;
		for(x = 0; x < _gameFieldBox.cellArray.length; x++) {
			for(y = 0; y < _gameFieldBox.cellArray[x].length; y++) {
				if(_gameFieldBox.cellArray[x][y] === 0) {						
					_drawingContext.clearRect(x * _gameFieldBox.cellSize,
						y * _gameFieldBox.cellSize, _gameFieldBox.cellSize,
						_gameFieldBox.cellSize);
					_drawingContext.strokeRect(x * _gameFieldBox.cellSize,
						y * _gameFieldBox.cellSize, _gameFieldBox.cellSize,
						_gameFieldBox.cellSize);
				}	
			}	
		}	
	}
						
	function translateCoordinateOriginToGameFieldBox() {
		_drawingContext.translate(_gameFieldBox.leftMargin, _gameFieldBox.topMargin);	
	}
	
	function paint(paintFunction) {
		_drawingContext.save();
		translateCoordinateOriginToGameFieldBox();
		_drawingContext.beginPath();		
		paintFunction();
		_drawingContext.closePath();
		_drawingContext.restore();
	}	
	
	return {
		update: function(frameTime) {
			
		},
		draw: function(frameTime) {
			if(frameTime - _FPS.lastFrameTime >= _FPS.targetFrames) {
				paint(function() {	
					drawGameField();	
					rasterGameField();
				});
				_FPS.lastFrameTime = frameTime;	
			}			
		},
		getCanvas: function() {
			return _canvas;	
		},
		getDrawingContext: function() {
			return _drawingContext;	
		},
		getWidth: function() {
			return _gameFieldBox.width; 	
		},
		getHeight: function() {
			return _gameFieldBox.height;
		},
		getTopMargin: function() {
			return _gameFieldBox.topMargin;
		},
		getLeftMargin: function() {
			return _gameFieldBox.leftMargin;
		},
		cellArray: _gameFieldBox.cellArray 						
	};
};		