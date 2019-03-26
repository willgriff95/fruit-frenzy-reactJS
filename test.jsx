// import React from "react";

// class Board extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       result: null,
//       fruitClass:  [
//         'banana', 
//         'grapes', 
//         'pear', 
//         'peach', 
//         'lemon', 
//         'greenApple', 
//         'redApple', 
//         'orange', 
//         'strawberry', 
//         'raspberry', 
//         'plumb', 
//         'watermelon', 
//         'pineapple', 
//         'blueberry',
//         'cherry'
//       ]
//     };
//   }

//   componentDidMount() {
//     let result = [];
//     for (let i = 0 ; i <= 8; i++) {
//       result[i] = [];
//       for (let j = 0; j <= 9; j++) {
//         result[i][j] = Math.floor(Math.random() * 15) + 0;
//       }
//     }
//     this.setState({result}, () => {



//       // this.state.result.map((array, YPosition) => {
//       //   array.forEach((number, XPosition) => {
//       //     let duplicates = []
//       //     for(let i = 0; i < array.length; i++) {
//       //       console.log(array[i], 'array[i]', number, 'number')
//       //       console.log(array[i] === number, 'array[i] === number')
//       //       if(array[i] === number) {
//       //         duplicates.push(number)
//       //       }
//       //     }
//       //     this.setState({duplicates})
//       //   })
//       // })
//     })

//   }

//   componentDidUpdate() {

//   }

//   allowDrop(ev) {
//     ev.preventDefault();
//   }
  
//   drag(ev, arrayValue) {
//     this.setState({
//       draggedValue: arrayValue,
//       draggedXPosition: parseFloat(ev.target.attributes[1].value),
//       draggedYPosition: parseFloat(ev.target.attributes[2].value)
//     })
//   }

//   draggedXPosition(x, Xposition) {
//     return this.state.draggedXPosition - Xposition === x
//   }

//   draggedYPosition(y, Yposition) {
//     return this.state.draggedYPosition - Yposition === y
//   }

//   drop(ev, Xposition, Yposition, arrayValue) {
//     ev.preventDefault();
//       if ((
//         this.draggedXPosition(0, Xposition) ||
//         this.draggedXPosition(1, Xposition) ||
//         this.draggedXPosition(-1, Xposition) 
//       ) && (
//         this.draggedYPosition(0, Yposition) ||
//         this.draggedYPosition(1, Yposition) ||
//         this.draggedYPosition(-1, Yposition) 
//       ) && !(
//         this.draggedXPosition(1, Xposition) &&
//         this.draggedYPosition(1, Yposition)
//       ) && !(
//         this.draggedXPosition(-1, Xposition) &&
//         this.draggedYPosition(1, Yposition)
//       ) && !(
//         this.draggedXPosition(-1, Xposition) &&
//         this.draggedYPosition(-1, Yposition)
//       ) && !(
//         this.draggedXPosition(1, Xposition) &&
//         this.draggedYPosition(-1, Yposition)
//       )){
//         this.setState({
//           droppedValue: arrayValue,
//           droppedXPosition: parseFloat(Xposition),
//           droppedYPosition: parseFloat(Yposition)
//         }, () => {
//           this.state.result[this.state.draggedYPosition][this.state.draggedXPosition] = this.state.droppedValue
//           this.state.result[Yposition][Xposition] = this.state.draggedValue
//           this.forceUpdate()

//           if(
//             // These conditionals are checking for matches near to the droppedValue position
//             this.state.draggedValue === this.state.result[this.state.droppedYPosition + 1][this.state.droppedXPosition] ||
//             this.state.draggedValue === this.state.result[this.state.droppedYPosition - 1][this.state.droppedXPosition] ||
//             this.state.draggedValue === this.state.result[this.state.droppedYPosition][this.state.droppedXPosition + 1] ||
//             this.state.draggedValue === this.state.result[this.state.droppedYPosition][this.state.droppedXPosition - 1]
//           ){

//             console.log('we got a match!!!')

//             for (let YPositionIndex = 0; YPositionIndex < this.state.result.length; YPositionIndex++) {
//               // console.log(this.state.result[YPositionIndex][Xposition])
//               // console.log(YPositionIndex,'YPositionIndex')
//               // console.log(this.state.droppedYPosition, 'this.state.droppedYPosition')
//               if (
//                 this.state.draggedValue === this.state.result[YPositionIndex][Xposition] && 
//                 ((
//                     this.state.droppedYPosition - YPositionIndex === 0 ||
//                     this.state.droppedYPosition - YPositionIndex === -1 ||
//                     this.state.droppedYPosition - YPositionIndex === 1
//                   ) || (
//                     this.state.droppedYPosition - YPositionIndex === 2 && 
//                     this.state.draggedValue === this.state.result[YPositionIndex-1][Xposition]
//                   )
//                 )
//                 ){
//                 this.state.result[YPositionIndex][Xposition] = null
//                 this.forceUpdate()
//               }
//             }
//           }
//         })
//       }

//   }
//   render() {
//     const { 
//       result,
//       fruitClass
//     } = this.state
//     console.log(this.state, 'state')
//     return (
//       <div>
//         <div className="boardBackground"></div>
//         <div className="board bounceInDown">
//             {result && result.map((array) => {
//               return (
//                 array.map((arrayValue, index) => {
//                   const Xposition = index
//                   const Yposition = result.indexOf(array) 
//                   return (
//                     <div
//                       key={index} 
//                       className={`basetile ${fruitClass[arrayValue]}`} 
//                       data-x={Xposition} 
//                       data-y={Yposition}
//                       onDragStart={(e)=>{this.drag(event, arrayValue)}}                  
//                       onDragOver={(e)=>{this.allowDrop(e)}}     
//                       onDrop={(e)=>{this.drop(event, Xposition, Yposition, arrayValue)}}          
//                       draggable
//                       droppable="true"
//                       value={arrayValue}
//                     />
//                   )
//                 })
//               )
//             })}
//           </div>
//       </div>
//     )
//   }
// }


// export default Board