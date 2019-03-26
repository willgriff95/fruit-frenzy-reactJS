import React from "react";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: null,
      fruitClass:  [
        'banana', 
        'grapes', 
        'pear', 
        'peach', 
        'lemon', 
        'greenApple', 
        'redApple', 
        'orange', 
        'strawberry', 
        'raspberry', 
        'plumb', 
        'watermelon', 
        'pineapple', 
        'blueberry',
        'cherry'
      ]
    };
  }

    componentDidMount() {
        this.createGrid(9,8)
    }

    createGrid(rowlength, columnlength) {
        let makeGrid = []
        for (let x = 0 ; x <= columnlength; x++) {
            makeGrid.push(this.createRow(rowlength))
        }  
        this.setState({
            grid: makeGrid
        })
    }

    createRow(rowlength) {
        let makeRow = []
        for (let x = 0 ; x <= rowlength; x++) {
            makeRow.push(Math.floor(Math.random() * 15) + 0)
        }
        return makeRow
    }


    evaluateGrid(){        
      this.state.grid && this.state.grid.forEach((row, y) => {
          const rowMatches = this.evaluateRow(row, y);
          rowMatches.forEach(match => {
              if(rowMatches.length > 0) {
                  this.setState({ 
                    matches: {
                      rowOrColumn: 'row', 
                      rowColumnIndex: y ,
                      deletedYet: 'No',
                      match
                  } 
                }, () => {
                  if(this.state.matches.deletedYet === 'No') {
                    this.setState({ 
                      matches: {
                        deletedYet: 'Yes'
                      }
                    })
                    for (let index = rowMatches[0].matchStartIndex; index < rowMatches[0].length + rowMatches[0].matchStartIndex; index++) {
                      this.state.grid[y][index] = null
                      this.forceUpdate()
                    }   
                  }
                })
              }
          })
      })


  
      let columns = []

      for (let i = 0; i < this.state.grid.length; i++) {
          columns.push(this.state.grid && this.state.grid.map(row => row[i]))
      }

      columns.forEach((column, x) => {
        const columnMatches = this.evaluateRow(column, x)
        columnMatches.forEach(match => {
            if(columnMatches.length > 0) {
              this.setState({ 
                matches: {
                  rowOrColumn: 'column', 
                  rowColumnIndex: x ,
                  deletedYet: 'No',
                  match
              } 
            }, () => {
              if(this.state.matches.deletedYet === 'No') {
                this.setState({ 
                  matches: {
                    deletedYet: 'Yes'
                  }
                })
                for (let index = columnMatches[0].matchStartIndex; index < columnMatches[0].length + columnMatches[0].matchStartIndex; index++) {
                  this.state.grid[index][x] = null
                  this.forceUpdate()
                }   
              }
            })
          }
        })
      })
    }
    
    
    evaluateRow(row, axis){
        let currentValue
        let previousValue
        let consecutiveCount
        let matches = []
        row.forEach((value, index) => {
            previousValue = currentValue
            currentValue = value
            if (previousValue === currentValue) {
                consecutiveCount ++
            } else {
                if (consecutiveCount >= 3) 
            matches.push({ matchStartIndex: index - consecutiveCount, length: consecutiveCount, axis: axis })
            consecutiveCount = 1
        }
    })
        return matches
    };

    componentDidUpdate() {

    }

    allowDrop(ev) {
        ev.preventDefault();
    }
    
    drag(ev, arrayValue) {
        this.setState({
            draggedValue: arrayValue,
            draggedXPosition: parseFloat(ev.target.attributes[1].value),
            draggedYPosition: parseFloat(ev.target.attributes[2].value)
          })
    }

    draggedXPosition(x, Xposition) {
        return this.state.draggedXPosition - Xposition === x
      }
    
      draggedYPosition(y, Yposition) {
        return this.state.draggedYPosition - Yposition === y
      }
    
      drop(ev, Xposition, Yposition, arrayValue) {
        ev.preventDefault();
          if ((
            this.draggedXPosition(0, Xposition) ||
            this.draggedXPosition(1, Xposition) ||
            this.draggedXPosition(-1, Xposition) 
          ) && (
            this.draggedYPosition(0, Yposition) ||
            this.draggedYPosition(1, Yposition) ||
            this.draggedYPosition(-1, Yposition) 
          ) && !(
            this.draggedXPosition(1, Xposition) &&
            this.draggedYPosition(1, Yposition)
          ) && !(
            this.draggedXPosition(-1, Xposition) &&
            this.draggedYPosition(1, Yposition)
          ) && !(
            this.draggedXPosition(-1, Xposition) &&
            this.draggedYPosition(-1, Yposition)
          ) && !(
            this.draggedXPosition(1, Xposition) &&
            this.draggedYPosition(-1, Yposition)
          )){
          this.setState({
              droppedValue: arrayValue,
              droppedXPosition: parseFloat(Xposition),
              droppedYPosition: parseFloat(Yposition)
          }, () => {
              this.state.grid[this.state.draggedYPosition][this.state.draggedXPosition] = this.state.droppedValue
              this.state.grid[Yposition][Xposition] = this.state.draggedValue
              this.forceUpdate()
              this.evaluateGrid()
          })
        }   
      }


  render() {
    const { 
      grid,
      fruitClass
    } = this.state
    console.log(this.state.grid, 'this.state.grid')
    return (
      <div>
        <div className="boardBackground"></div>
        <div className="board bounceInDown">
            {grid && grid.map((array) => {
              return (
                array.map((arrayValue, index) => {
                  const Xposition = index
                  const Yposition = grid.indexOf(array) 
                  return (
                    <div
                      key={index} 
                      className={`basetile ${fruitClass[arrayValue]}`} 
                      data-x={Xposition} 
                      data-y={Yposition}
                      onDragStart={(e)=>{this.drag(event, arrayValue)}}                  
                      onDragOver={(e)=>{this.allowDrop(e)}}     
                      onDrop={(e)=>{this.drop(event, Xposition, Yposition, arrayValue)}}          
                      draggable
                      droppable="true"
                      value={arrayValue}
                    >
                    x = {Xposition}<br/>
                    y = {Yposition}<br/>
                    value = {arrayValue}
                    </div>
                  )
                })
              )
            })}
          </div>
      </div>
    )
  }
}


export default Board