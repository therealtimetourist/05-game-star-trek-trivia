# 05-game-star-trek-trivia
## Star Trek Trivia Challenge!

Welcome aboard!  You will be asked 10 questions about the Original Series of <em>Star Trek</em>. You have 15 seconds to answer each question (don't worry, they're easy).

###### version 1.0

Initial creation of the game. All internal functions are within normal parameters.

###### version 1.1

Streamlined code:
- added *gameLength* variable so that the game length would no longer be hard coded.
- removed *arrCurrRnd* array, since it is no longer required in the updated code.
- removed the for loop that loaded the *arrCurrRnd* array with an index number. The objects are now loading directly into the *arrCurrRound* array.
- renamed the *goAgain()* function to *resetGame()*.
- moved the *$('#starter').click* call to the bottom of the js.js file. Changed the call so that it uses the *resetGame()* function, rather than it's own redundant functions. this also solved a compatibility issue with Internet Explorer, which will now run the game.
- moved the JavaScript references in the index.html file to the bottom of the body for better compatibility.
- changed the "Try Again" button text to "Play Again".
- added an id field in each *objQuestion* object.
- changed the "Shraik" distractor to "Sabbac" (questions.js).
