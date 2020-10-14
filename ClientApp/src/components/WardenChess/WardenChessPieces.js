import React from 'react'
import { ItemTypes } from './WardenChessItemTypes';

import gray_tnt from '../../static/gray_tnt.png';
// import gray_chrnifull from '../static/gray_chrnifull.png';
// import gray_fex from '../static/gray_fex.png';
// import gray_plant from '../static/gray_plant.png';
// import gray_raff from '../static/gray_raff.png';
// import gray_6292401 from '../static/gray_6292401.png';
// import color_tnt from '../static/color_tnt.png';
// import color_chrnifull from '../static/color_chrnifull.png';
// import color_fex from '../static/color_fex.png';
// import color_plant from '../static/color_plant.png';
// import color_raff from '../static/color_raff.png';
// import color_6292401 from '../static/color_6292401.png';

const Piece = props => {
    return <img src={props.image} alt="chess piece" style={{ width: '100%', height: '100%'}}/>
}
export const GrayKnight = () => {

    return (
        <div>
        <Piece image={gray_tnt}  /> 
        </div>
    )
}

