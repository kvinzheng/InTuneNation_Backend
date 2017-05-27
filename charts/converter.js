/*
this could be done in a much more concise way if you split the tasks of calculating
the octaves and notes up into seperate functions.
*/

function getNoteAndOctave( keyNum ) {

<<<<<<< HEAD
  let noteObj = {};

  if (keyNum >= 28 && keyNum <= 39) {
    noteObj['octave'] = 3;
  }
  else if (keyNum >= 40 && keyNum <= 51) {
    noteObj['octave'] = 4;
  }
  else if (keyNum >= 52 && keyNum <= 63) {
    noteObj['octave'] = 5;
  }

  const notesArray = ['G# / Ab', 'A', 'A# / Bb', 'B', 'C', 'C# / Db', 'D', 'D# / Eb', 'E', 'F', 'F# / Gb', 'G'];

  let i = keyNum % 12;

  noteObj['note', notesArray[i]];

  return noteObj;
=======
    switch ( keyNum ) {
    case 28:
        return {
            note: 'C',
            octave: 3
        };
    case 29:
        return {
            note: 'C# / Db',
            octave: 3
        };
    case 30:
        return {
            note: 'D',
            octave: 3
        };
    case 31:
        return {
            note: 'D# / Eb',
            octave: 3
        };
    case 32:
        return {
            note: 'E',
            octave: 3
        };
    case 33:
        return {
            note: 'F',
            octave: 3
        };
    case 34:
        return {
            note: 'F# / Gb',
            octave: 3
        };
    case 35:
        return {
            note: 'G',
            octave: 3
        };
    case 36:
        return {
            note: 'G# / Ab',
            octave: 3
        };
    case 37:
        return {
            note: 'A',
            octave: 3
        };
    case 38:
        return {
            note: 'A# / Bb',
            octave: 3
        };
    case 39:
        return {
            note: 'B',
            octave: 3
        };
    case 40:
        return {
            note: 'C',
            octave: 4
        };
    case 41:
        return {
            note: 'C# / Db',
            octave: 4
        };
    case 42:
        return {
            note: 'D',
            octave: 4
        };
    case 43:
        return {
            note: 'D# / Eb',
            octave: 4
        };
    case 44:
        return {
            note: 'E',
            octave: 4
        };
    case 45:
        return {
            note: 'F',
            octave: 4
        };
    case 46:
        return {
            note: 'F# / Gb',
            octave: 4
        };
    case 47:
        return {
            note: 'G',
            octave: 4
        };
    case 48:
        return {
            note: 'G# / Ab',
            octave: 4
        };
    case 49:
        return {
            note: 'A',
            octave: 4
        };
    case 50:
        return {
            note: 'A# / Bb',
            octave: 4
        };
    case 51:
        return {
            note: 'B',
            octave: 4
        };
    case 52:
        return {
            note: 'C',
            octave: 5
        };
    case 53:
        return {
            note: 'C# / Db',
            octave: 5
        };
    case 54:
        return {
            note: 'D',
            octave: 5
        };
    case 55:
        return {
            note: 'D# / Eb',
            octave: 5
        };
    case 56:
        return {
            note: 'E',
            octave: 5
        };
    case 57:
        return {
            note: 'F',
            octave: 5
        };
    case 58:
        return {
            note: 'F# / Gb',
            octave: 5
        };
    case 59:
        return {
            note: 'G',
            octave: 5
        };
    case 60:
        return {
            note: 'G# / Ab',
            octave: 5
        };
    case 61:
        return {
            note: 'A',
            octave: 5
        };
    case 62:
        return {
            note: 'A# / Bb',
            octave: 5
        };
    case 63:
        return {
            note: 'B',
            octave: 5
        };
    }
>>>>>>> 517aa9fd22f2df28b65363f95f1a9b965ff45c0e

}

module.exports = getNoteAndOctave;
