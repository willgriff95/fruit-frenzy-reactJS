/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import Immutable from 'immutable'
import {handleActions} from 'redux-actions'

import * as boardGameActions from './actions'

const initalState = {
}

const reducer = handleActions(
    {
        [boardGameActions.geTest]: (state, {payload}) => {
            console.log(payload)
            return state
                .set('test', true)
        }
    },
    Immutable.fromJS(initalState)
)

export default reducer
