import React from 'react';
import cloud from '../images/sky/cloud1.svg'

class Sky extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animationDirection: [
                'animatedCloudL-20',
                'animatedCloudL0', 
                'animatedCloudL20', 
                'animatedCloudL40', 
                'animatedCloudL60', 
                'animatedCloudR-20', 
                'animatedCloudR0',
                'animatedCloudR20', 
                'animatedCloudR40', 
                'animatedCloudR60'
            ],
            marginDirection: [
                'marginLeft', 
                'marginRight'
            ]
        }
      }
      
    componentDidMount () {
        this.generateCloudArray()
    }

    generateCloudArray () {
        let cloudArrayLength = Math.floor(Math.random()*(10 - 0 ))
        const cloudArray =[]
        for (let i = 0; i < cloudArrayLength; i++) {
            let randomYPosition = Math.random()* (100 - 50) + 50
            let randomXPosition = Math.floor(Math.random()*(100 - 1) + 1)
            let randomXPosition2 = Math.floor(Math.random()*(100 - 1) + 1)
            let size = Math.random() * (1.8 - 0.8) + 0.8
            let animationDuration = Math.random() * (300 - 200) + 200
            let animationDirectionIndex = Math.floor(Math.random() * Math.floor(10))
            cloudArray.push({
                randomYPosition,
                randomXPosition, 
                randomXPosition2,
                size,
                animationDuration,
                animationDirectionIndex
            })
        }
        this.setState({
            cloudArray
        })
    }

    render() {
        return (
            <div style={{position: 'absolute', height: '100%', width: '100%', zIndex: -2}}>
                {this.state.cloudArray && this.state.cloudArray.map((cloudObject, index) => {
                        return (
                            cloudObject.animationDirectionIndex === 0 ?
                                <div key={index} className={`${this.state.animationDirection[cloudObject.animationDirectionIndex]}`}  style={{left: `${cloudObject.randomXPosition2}%`, position: 'absolute',animationDuration: `${cloudObject.animationDuration}s` ,bottom: `${cloudObject.randomYPosition}%` /* transform: `scale(${cloudObject.size})` */}}>
                                    <img alt="cloud" src={cloud}  className="cloud"/>   
                                </div>
                            :   
                                <div key={index} className={`${this.state.animationDirection[cloudObject.animationDirectionIndex]}`}  style={{right:`${cloudObject.randomXPosition}%`, position: 'absolute',animationDuration: `${cloudObject.animationDuration}s` ,bottom: `${cloudObject.randomYPosition}%` /* transform: `scale(${cloudObject.size})` */}}>
                                    <img alt="cloud" src={cloud}  className="cloud"/>   
                                </div>
                        )
                })}
            </div>

        )
    }
}

export default Sky
