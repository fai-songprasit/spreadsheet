const spreadSheetContainer = document.getElementById('spreadsheet-container')
const numberOfRowsAndCols = 100
const spreadsheet = []
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

// number of times the whole alphabet has been iterated through
let counter = 0
const getAlphabetHeader = (j) => {
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
  for (let i = 0; i < numberOfRowsAndCols; i++) {
    let spreadsheetRow = []
    for (let j = 0; j < numberOfRowsAndCols; j++) {
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
        cellData = getAlphabetHeader(j)
      }

      if (!cellData) {
        cellData = ''
      }

      const rowName = i
      const columnName = getAlphabetHeader(j)
      const cell = new Cell(
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
  createSheet()
}

const createSheet = () => {
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

const createCellElement = (cell) => {
  const cellElement = document.createElement('input')
  cellElement.className = 'cell'
  cellElement.id = 'cell_' + cell.row + cell.column
  cellElement.value = cell.data
  cellElement.disabled = cell.disabled

  if (cell.isHeader) {
    cellElement.classList.add('header')
  }

  cellElement.onclick = () => handleCellClick(cell)
  cellElement.onchange = (e) => handleOnChange(e.target.value, cell)
  return cellElement
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

const handleOnChange = (data, cell) => {
  cell.data = data
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

const getElementFromRowCol = (row, col) => {
  return document.querySelector('#cell_' + row + col)
}

const clearSpreadsheet = () => {
  document
    .getElementById('clear-spreadsheet') // target button element
    .attachEvent('onclick', alert('clicked')) // TODO: clear spreadsheet
}

initSpreadsheet()
