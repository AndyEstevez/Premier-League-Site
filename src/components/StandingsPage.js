import React, { Component } from 'react'
import $ from 'jquery';


function handleGoalDifference(goalsDiff){
    if(goalsDiff === 0){
        return goalsDiff;
    }
    if((goalsDiff) > 0){
        return "+" + goalsDiff;
    }
    else{
        return goalsDiff;
    }
}

export default class StandingsPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            standings: [],
        }
    }

    componentDidMount(){
        
        $.ajax({
            headers: { 'X-Auth-Token': process.env.REACT_APP_FOOTBALL_DATA_APIKEY },
            url: "https://api.football-data.org/v2/competitions/PL/standings",
            dataType: 'json',
            type: 'GET',
            success: (res) => {
                this.setState({standings: res.standings[0].table})
            }
          })
    }

    

    render() {
        console.log(this.state.standings)
        return (
            <table className="content-table">
                <thead>
                    <tr>
                        <th>Position</th>   <th>Club</th>   <th>Played</th>
                        <th>Won</th>        <th>Draw</th>   <th>Lost</th>
                        <th className="th-col-7">GF</th>         <th className="th-col-8">GA</th>     <th>GD</th>
                        <th>Points</th>     <th className="th-col-11">Form</th>
                    </tr>
                </thead>

                <tbody>
                    {this.state.standings.map(function(index){
                        return(
                            <tr className={index.team.name}>
                                <td>{index.position}</td>   
                                <td>
                                    <img style={{maxHeight: "35px", margin: "auto", paddingBottom: "2px", display:"flex"}} src={index.team.crestUrl} alt={index.team}/>
                                    {index.team.name.split("FC")}
                                </td>      
                                <td>{index.playedGames}</td>
                                <td>{index.won}</td>        <td>{index.draw}</td>           <td>{index.lost}</td>
                                <td className="col-7" style={{width: "5%"}}>{index.goalsFor}</td>   <td className="col-8" style={{width: "5%"}}>{index.goalsAgainst}</td>   
                                <td>{handleGoalDifference(index.goalDifference)}</td>
                                <td>{index.points}</td>     <td className="col-11" style={{width: "5%"}}>{index.form}</td>
                            </tr>
                        )})}
                </tbody>
            </table>
        )
    }
}
