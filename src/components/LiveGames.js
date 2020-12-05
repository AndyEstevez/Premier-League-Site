import React, { Component } from 'react'
import { imageURL } from '../config';

const matches = (props) => {
    return(
        <div>
            {props.liveGames.map(function(index) {
                return(
                    <div>
                        {/* <div>{props.matches[index].awayTeam.name} */}
                        <img style={{height: "100px"}}src={imageURL + props.matches[index].awayTeam.id + ".svg"}/>
                        {/* </div> */}
                    </div>
                )
            })}
        </div>
    )
}
export default matches;

