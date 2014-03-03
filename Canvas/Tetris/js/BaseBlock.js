var block = function(settings) {
	var _width = settings.width;
	var _height = settings.height;
	var _gameFieldWidth = settings.gameFieldWidth;
	var _gameFieldHeight = settings.gameFieldHeight;
	var _gameFieldLeftMargin = settings.gameFieldLeftMargin;
   var _gameFieldTopMargin = settings.gameFieldTopMargin;
	var _drawingContext = settings.drawingContext;
	var _collision = false;
	
	var _color = settings.color || "#00FF00";
	var _FPS = {
		targetFrames: 1000.0 / (settings.FPS || 30.0),
		lastFrameTime: 0
	};	
	var _point = {
		x: settings.x || 0,
		y: settings.y || 0
	};
	var _reachedGameFieldEnd = false;							
	
	function paintBlock() {
		_drawingContext.save();
		_drawingContext.translate(_gameFieldLeftMargin, _gameFieldTopMargin);		
																												
		_drawingContext.fillStyle = _color;
		_drawingContext.beginPath();
		_drawingContext.fillRect(_point.x, _point.y, 
			_width, _height);												
		_drawingContext.closePath();
									
		_drawingContext.restore();
	}					
	
	function updateBlockFall() {
		updatePosition({
			x: _point.x,
			y: _point.y + 0.5
		});						
	}						
	
	function updatePosition(coordsToAdd) {
		if(isBlockInGameFieldHeight(coordsToAdd) && 
			_collision === false) {
			_point.y = coordsToAdd.y;
		} else {
			_reachedGameFieldEnd = true;	
		}
		
		if(isBlockInGameFieldWidth(coordsToAdd) && 
			_collision === false) {
			_point.x = coordsToAdd.x;
		}
	}
				
	function isBlockInGameFieldWidth(point) {
		return point.x <= _gameFieldWidth - _width && 
						point.x >= _gameFieldLeftMargin;				
	}
	
	function isBlockInGameFieldHeight(point) {
		return point.y < _gameFieldHeight - _height;
	}			
	
	function onKeyBoardPressLeft() {		
		updatePosition({
			x: _point.x - 1,
			y: _point.y
		});											
	}
	
	function onKeyBoardPressRight() {
		updatePosition({
			x: _point.x + 1,
			y: _point.y
		});						
	}	
	
	function onKeyBoardPressDown() {
		updatePosition({
			x: _point.x,
			y: _point.y + 1
		});				
	}
	
	return {
		update: function(frameTime) {																		
			if(frameTime - _FPS.lastFrameTime >= _FPS.targetFrames) {
				updateBlockFall();																				
				paintBlock();						
				_FPS.lastFrameTime = frameTime;							
			}
		},
		hasReachedTheGameFieldEnd: function() {
			return _reachedGameFieldEnd;
		},
		getPosition: function() {
			return _point;					
		},
		getWidth: function() {
			return _width;
		},
		getHeight: function() {
			return _height;
		},
		keyBoardPressed: function(keyBoardDirection) {			
			if(_reachedGameFieldEnd === false) {
				switch(keyBoardDirection.pressedDirection) {
					case keyBoardDirection.LEFT:
						onKeyBoardPressLeft();
					break;
					
					case keyBoardDirection.RIGHT: 
						onKeyBoardPressRight();
					break;
					
					case keyBoardDirection.DOWN: 
						onKeyBoardPressDown();
					break;						
				}
			}
		}				
	};
};