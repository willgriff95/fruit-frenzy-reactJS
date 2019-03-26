import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import "./styles.scss";
import ForeGroundHill from './environment/ForeGroundHill'
import MidGroundHill from './environment/MidGroundHill'
import BackGroundHill from './environment/BackGroundHill'
import Sky from './environment/Sky'
import Sun from './environment/Sun'

import image1 from './images/background1_Foreground-grass.svg'
import image2 from './images/background1_Mid-ground grass.svg'
import image3 from './images/background1_Background grass.svg'
import sun from './images/sun.svg'
import Board from "./game/Board";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      delayed250: false,
      delayed500: false,
      delayed750: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
        this.setState({ delayed250: true })
    }, 250)
    setTimeout(() => {
      this.setState({ delayed500: true })
    }, 500)
    setTimeout(() => {
      this.setState({ delayed750: true })
    }, 750)
  }

  render() {
    const {
      delayed250,
      delayed500,
      delayed750
    } = this.state
    return (
        <div>
            {delayed500 &&
              <Sun image={sun}/>
            }
            {delayed750 &&
              <BackGroundHill image={image3} />
            }
            {delayed500 &&
              <MidGroundHill image={image2} />
            }
            {delayed250 &&
              <ForeGroundHill image={image1} />
            }
            {delayed750 &&
              <Board />
            }
            <Sky className="bounceInDown"/>
        </div>
    )
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<App name="Jane" />, mountNode);