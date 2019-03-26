import React from 'react';
// import { makeStyles } from '@material-ui/styles';

// const useStyles = makeStyles({
//     root: {
//       position: 'fixed',
//       float: 'right',
//       right: '0',
//       top: '0',
//       width: '50%'
//     },
// });

export const Sun = ({image}) => {
    return (
        <div style={{position: "absolute", zIndex: -2}}>
            <div alt="Sky" className="sky"></div> 
            <img src={image} alt="Sun" className="sun bounceInDown"/>
        </div>
    )
}

export default Sun