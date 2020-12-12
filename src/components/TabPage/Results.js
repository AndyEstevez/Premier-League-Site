import React from 'react'
import moment from 'moment'

const Results = (props) => {
    let matches = reverseGames(props.matches);
    
        return (
            <div>
                <div>
                {matches.map(function(index){
                    return(
                        <div style={{paddingBottom:"15px"}}>
                            <h1 className="result-header">{moment(index.utcDate.substring(0, 10)).format('MMMM Do, YYYY')}<h3>{index.competition.name}</h3></h1>
                            <div className="result-container">
                                <div className="team-container">
                                    <div className="team-name">{index.awayTeam.name.split("FC")}</div>
                                    <img style={{maxHeight:"100px", margin:"auto"}} src={process.env.REACT_APP_IMAGE_URL + index.awayTeam.id + ".svg"} alt={index.awayTeam.id}/>
                                    <div className="result-score">{index.score.fullTime.awayTeam}</div>
                                </div>

                                <div className="team-container">
                                    <div className="result-score" >{index.score.fullTime.homeTeam}</div>
                                    <img style={{maxHeight:"100px", margin:"auto"}} src={process.env.REACT_APP_IMAGE_URL + index.homeTeam.id + ".svg"} alt={index.homeTeam.id}/>
                                    <div className="team-name">{index.homeTeam.name.split("FC")}</div>
                                </div>
                            </div>
                        </div>
                    )    
                })}
                </div>
            </div>
        )
}

function reverseGames(matches){
    var finishedGames = [];
    for(let i = 0; i < matches.length; i++){
        console.log(matches[i])
        finishedGames.push(matches[i]);
    }
    return finishedGames.reverse(); 
}


export default Results;