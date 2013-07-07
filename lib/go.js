// [TODO] capture groups > 1.

var count = 0;

$(document).ready(
  $('.goboard').on('click', '.box', function() {
    var $this = $(this);

    if ($this.children().length === 0) {
      addStone($this, count);
      count += 1;
    }

    $('div.stone').each(function(index, domElem){
      checkNeighbors($(domElem));
    });

  })
);

var addStone = function(that) {
  var newStone;

  if (count % 2 === 0) {
    newStone = $('<div class="stone white"></div>');
  }
  else {
    newStone = $('<div class="stone black"></div>');
  }
  that.append(newStone);
};

var checkNeighbors = function(that) {

  // check number of neighbors
  // check number of liberties
  // if no liberties, check if surrounded
  // if neighbor is same color, ask neighbor to check

  var position = that.parent(),
    row = position.data('row'),
    col = position.data('col'),
    up,
    down,
    left,
    right,
    upPlay,
    downPlay,
    leftPlay,
    rightPlay,
    totalSides = 0, // a stone's enemy-occupied neighbors
    liberties = 0, // a stone's free neighbors
    max,
    colorCheck = 'white'; // shortcut optimization, correct 50% time

  if (that.hasClass('white') === true) {
    colorCheck = 'black';
  }

  // do neighbors exist?
  up = positionCheck(col, row - 1);
  down = positionCheck(col, row + 1);
  left = positionCheck(col - 1, row);
  right = positionCheck(col + 1, row);

  // has enemy played at neighbor?
  upPlay = playCheck(col, row - 1, colorCheck);
  downPlay = playCheck(col, row + 1, colorCheck);
  leftPlay = playCheck(col - 1, row, colorCheck);
  rightPlay = playCheck(col + 1, row, colorCheck);

  var sidesPlayed = [upPlay, downPlay, leftPlay, rightPlay];
  var sidesExist = [up, down, left, right];

  // sidesExist == liberties
  // liberties - sidesPlayed

  for (i = 0, max = sidesExist.length; i < max; i++) {
    if (sidesExist[i] === true) {
      liberties += 1;
    }
  }

  for (i = 0, max = sidesPlayed.length; i < max; i++) {
    if (sidesPlayed[i] === true) {
      totalSides += 1;
    }
  }

  if (totalSides === liberties) {
    // lastMove = [position.data('row'), position.data('col')];
    $('.gutter').append(that);
  }

};

////////////////////////////////////////////////////////////////////////

var positionCheck = function(col, row) {
  // returns true if position exists
  return $('div.box[data-col=' + col + '][data-row=' + row  + ']').length>0;
};

var playCheck = function(col, row, color) {
  // returns true if position has been played
  return $('div.box[data-col=' + col + '][data-row=' + row + ']').children('div.'+color).length>0;
};

