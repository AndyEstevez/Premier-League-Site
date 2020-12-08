import React from 'react';
import { imageURL } from '../config';
import moment from 'moment'


const Matchweek = (props) => {
    
    console.log(props.weekMatches)
    let dates = getDates(props.matches, props.weekMatches)
    console.log(dates)
    console.log("IN MATCHWEEK")
    let count = -1;
    let isA = true;

    return (
        <div style={{backgroundColor: "white", width: "50%", maxWidth: "350px"}}>
             <h2 style={{color: "#ff2882", margin: "auto", textAlign:"center"}}>Matchweek {props.matchDay-1}</h2>

            {props.weekMatches.map(function(index){
                isA = false;
                if(props.matches[index].utcDate.substring(0, 10) === dates[count+1]){
                    isA = true;
                    count++;
                }
                return(
                    <div>
                    {isA ? <h4>{moment(dates[count]).format('dddd Do MMMM')}</h4> : <h4>{}</h4>}

                    <div style={{display: "flex", border: "2px solid black", width:"100%",  margin: "auto"}}>

                    <img style={{display: "flex", maxHeight:"50px", margin: "auto"}} 
                        src={imageURL + props.matches[index].awayTeam.id + ".svg"} 
                        alt={props.matches[index].awayTeam.name}/>
                   
                    <div style={{display: "flex", fontSize:"1.25em", margin: "auto", padding:"0px 10px"}}>{props.matches[index].utcDate.substring(11, 16)}</div>
                    <img style={{display: "flex", maxHeight:"50px", margin: "auto"}} 
                        src={imageURL + props.matches[index].homeTeam.id + ".svg"} 
                        alt={props.matches[index].homeTeam.name}/>
                    </div>
                    </div>
                )
            })}
        </div>
    )
}

function getDates(matches, weekMatches){
    var dates = [];
    var countDates = 0;
    for(let i = 0; i < weekMatches.length; i++){
        if(matches[weekMatches[i]].status === 'SCHEDULED' && !dates.includes(matches[weekMatches[i]].utcDate.substring(0, 10)) && countDates < weekMatches.length){
            dates.push(matches[weekMatches[i]].utcDate.substring(0, 10));
            countDates++;
        }
    }
    return dates;
}


export default Matchweek;