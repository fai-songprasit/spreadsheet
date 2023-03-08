const spreadSheetContainer = document.getElementById('spreadsheet-container')
const numberOfRowsAndCols = 101 // create a 100 x 100 grid spreadsheet excluding header row and column
const alphabets = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
]

// create template object for each cell
class Cell {
  constructor(
    isHeader,
    disabled,
    data,
    row,
    column,
    rowName,
    columnName,
    active = false
  ) {
    this.isHeader = isHeader
    this.disabled = disabled
    this.data = data
    this.row = row
    this.rowName = rowName
    this.column = column
    this.columnName = columnName
    this.active = active
  }
}

const getElementFromRowCol = (row, col) => {
  return document.querySelector('#cell_' + row + col)
}

const handleCellClick = (cell) => {
  clearHeaderActiveStates()
  const columnHeader = spreadsheet[0][cell.column]
  const rowHeader = spreadsheet[cell.row][0]
  const columnHeaderElement = getElementFromRowCol(
    columnHeader.row,
    columnHeader.column
  )
  const rowHeaderElement = getElementFromRowCol(rowHeader.row, rowHeader.column)
  columnHeaderElement.classList.add('active')
  rowHeaderElement.classList.add('active')
  document.querySelector('#cell-status').innerHTML =
    cell.columnName + cell.rowName
}

// create Map of cells with data
const cellElementsData = new Map()
const handleOnChange = (data, cell) => {
  cell.data = data
  // adds cell and data to collective Map using cellElement.id as key
  cellElementsData.set('cell_' + cell.row + cell.column, cell.data)
}

const clearHeaderActiveStates = () => {
  for (let i = 0; i < spreadsheet.length; i++) {
    for (let j = 0; j < spreadsheet[i].length; j++) {
      const cell = spreadsheet[i][j]
      if (cell.isHeader) {
        let cellElement = getElementFromRowCol(cell.row, cell.column)
        cellElement.classList.remove('active')
      }
    }
  }
}

const createCellElement = (cell) => {
  const cellElement = document.createElement('input')
  cellElement.className = 'cell'
  cellElement.id = 'cell_' + cell.row + cell.column
  // check if current cell matches a cellElementsData MAP key
  cellElement.value = cellElementsData.get(cellElement.id)
    ? // populate the cell with its existing value from the MAP
      cellElementsData.get(cellElement.id)
    : // otherwise return empty
      cell.data
  cellElement.disabled = cell.disabled

  if (cell.isHeader) {
    cellElement.classList.add('header')
  }

  cellElement.onclick = () => handleCellClick(cell)
  cellElement.onchange = (e) => handleOnChange(e.target.value, cell)
  return cellElement
}

// number of times the whole alphabet has been iterated through
let counter = 0
const getAlphabetHeader = (j, refreshButtonClicked) => {
  if (refreshButtonClicked) {
    counter = 0
  }
  // exit if we are on the header column
  if (j === 0) return
  // make sure that the old value persists until after we've iterated past 'Z'
  const currentCount = counter
  if (counter === 0) {
    // increase count the first time we reach 'Z'
    if (alphabets[j - 1] === 'Z') {
      counter++
    }
    return alphabets[j - 1]
  }

  // increase count every time we reach 'Z'
  if (alphabets[j - alphabets.length * counter - 1] === 'Z') {
    counter++
  }
  // append the heading with the letter in the alphabets array where index = currentCount - 1
  return `${alphabets[currentCount - 1]}${
    alphabets[j - alphabets.length * currentCount - 1]
  }`
}

const initSpreadsheet = () => {
  const spreadsheet = []
  const refreshButtonClicked = spreadSheetContainer.innerHTML !== ''
  if (refreshButtonClicked) {
    spreadSheetContainer.innerHTML = ''
  }

  // populating columns
  for (let i = 0; i < numberOfRowsAndCols; i++) {
    const spreadsheetRow = []
    // populate rows
    for (let j = 0; j < numberOfRowsAndCols; j++) {
      const alphabetHeader = getAlphabetHeader(j, refreshButtonClicked)
      let cellData = ''
      let isHeader = false
      let disabled = false

      // mark as column with heading
      if (j === 0) {
        cellData = i
        isHeader = true
        disabled = true
      }

      // mark as row with heading
      if (i === 0) {
        isHeader = true
        disabled = true
        cellData = alphabetHeader
      }

      if (!cellData) {
        cellData = ''
      }

      const rowName = i
      const columnName = alphabetHeader
      let cell = new Cell(
        isHeader,
        disabled,
        cellData,
        i,
        j,
        rowName,
        columnName,
        false
      )
      spreadsheetRow.push(cell)
    }
    spreadsheet.push(spreadsheetRow)
  }
  // create spreadsheet
  spreadSheetContainer.innerHTML = ''
  for (let i = 0; i < spreadsheet.length; i++) {
    const rowContainerEl = document.createElement('div')
    rowContainerEl.className = 'cell-row'

    for (let j = 0; j < spreadsheet[i].length; j++) {
      const cell = spreadsheet[i][j]
      rowContainerEl.append(createCellElement(cell))
    }
    spreadSheetContainer.append(rowContainerEl)
  }
}

// onclick action for clear SPreadsheet button
const refresh = () => {
  console.log('refresh button clicked')
  document
    .getElementById('clear-spreadsheet')
    .addEventListener('onclick', initSpreadsheet())
}

initSpreadsheet()
