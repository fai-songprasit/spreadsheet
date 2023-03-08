# spreadsheet.js

Create a basic excel style spreadsheet using only HTML, CSS and JavaScript

1. :heavy_check_mark: Create index.html in your favourite text editor. Use pure JavaScript in your code – no JavaScript libraries or frameworks. Your JavaScript can either be in a separate .js file, or it can be contained in the index.html page.

2. :heavy_check_mark: When loading index.html into Chrome or Firefox, it should draw a 100x100 grid of cells, with columns labelled A-Z, AA, AB, AC, etc. and rows numbered 1 to 100.

3. :heavy_check_mark: When you click in a cell and enter a number, it should store the number in a JavaScript object (note: this would be lost when you refresh the page).

4. :heavy_check_mark: Have a refresh button that redraws the grid (without refreshing the page) and inserts data into cells where you've saved it.

5. Add support for some basic formulas. For example if you enter "=A1+A2" into A3 it should calculate the sum of these two cells and display the result in A3. Updating A1 would update A3.

    - _There is a limitation with the current implementation where the cells are actually identified using numbered srings. I would first need to debug. The issue appears when the getAlphabetHeader function is used outside of the header scope and consistently returns 'Cundefined' instead of the single alphabet letter as expected._
    
    - _Using the MAP method that was inplemented to persist the cell data, I would then update the cell id to store the alpabetised column header and row number as the id insead to mimick what usually happens in excel._
    
    - _the string value of a cell with a formula, e.g."=A1+A2", the string would be split and checked if the return of the first index is "=" which indicates that it is a formula._
    
    - _if it is a formula then I would shift the array and join the string again and create a new array `const newArr = shiftedArray.join().split('\[-+/*]\')` using regex to identify the math symbol that will be used to do a split. This will return the two cell ids_
    
    - _another thing to consider is if the above regex is used, we would need to identify which math symbol was used so that we can then return the math for it_
    
    - _next we'd search the MAP store to see if there are any cells with matching key to cecll.id, if it doen't exist then return `''` else return the value in that cell.

6. Add support for some basic functions. For example if you enter "=sum(A1:A10)" into A11, then it should calculate the sum of all cells in the range and display the result in A11. Updating any value in the range would recalculate A11.
    
    - _it may be easier to filter all cells that includes the column alphabet, then filter again to return all the filtered results that includes the numbers of the rows that we are trying to add up._
    
    - _same as above, the string would be split using regex for brackets and colons to extract the ids, then perform the above filter._

    - _this is also under the assumption that the user is adding things from the same column, if they were to add things from the same rows then the MAP method may still be useful as we can also filter out all results that don't match the ids. returning `''` if it doesnt exisit on the map._

7. Add support for formatting, for example bold, italics and underline

    - _there are a couple of assumptions that can be made with this step._
    
        1. _we create HTML buttons that will trigger a tranform function to the cell.data_
        2. _people can trigger formatting using specific keyboard shortcuts e.g. `command/control b` for bold. In this case we would do an eventHandler to deal with the on keydown/keyup/keypress to trigger the same functionality as above._
