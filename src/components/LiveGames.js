import React, { Component } from 'react'
import { imageURL } from '../config';

const matches = (props) => {
    return(
        <div>
            {props.liveGames.map(function(index) {
                return(
                    <div>
                        <h2>Live Games</h2>
                        <div style={{display: "inline-block"}}>
                        <img style={{height: "150px"}}src={imageURL + props.matches[index].awayTeam.id + ".svg"}/>
                        {props.matches[index].score.fullTime.awayTeam}
                        </div>
                        
                        <div style={{display: "inline-block"}}>{props.matches[index].score.fullTime.homeTeam}
                        <img style={{height: "150px"}}src={imageURL + props.matches[index].homeTeam.id + ".svg"}/>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default matches;

