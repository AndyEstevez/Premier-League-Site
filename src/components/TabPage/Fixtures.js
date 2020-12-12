import React from 'react'
import moment from 'moment'

const Fixtures = (props) => {
    let matches = props.matches;
    
        return (
            <div>
                <div>
                {matches.map(function(index){
                    return(
                        <div style={{paddingBottom:"15px"}}>
                            <h1 className="result-header">{moment(index.utcDate.substring(0, 10)).format('MMMM Do, YYYY')}<h3>{index.competition.name}</h3></h1>
                            
                            <div className="result-container" style={{border: "3px solid black"}}>
                                <div className="fixtures-container">
                                    <div className="fixtures-name">{index.awayTeam.name.split("FC")}</div>
                                    <img style={{maxHeight:"100px", margin:"auto"}} src={process.env.REACT_APP_IMAGE_URL + index.awayTeam.id + ".svg"} alt={index.awayTeam.id}/>
                                </div>
                                <div className="game-time">{index.utcDate.substring(11, 16)}</div>
                                <div className="fixtures-container">
                                    <img style={{maxHeight:"100px", margin:"auto"}} src={process.env.REACT_APP_IMAGE_URL + index.homeTeam.id + ".svg"} alt={index.homeTeam.id}/>
                                    <div className="fixtures-name">{index.homeTeam.name.split("FC")}</div>
                                </div>
                            </div>
                        </div>
                    )    
                })}
                </div>
            </div>
        )
}

export default Fixtures;