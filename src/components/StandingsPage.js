import React, { Component } from 'react'
import { football_data_APIKEY, imageURL } from '../config';
import $ from 'jquery';

export default class StandingsPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            standings: [],
        }
    }

    componentDidMount(){
        
        $.ajax({
            headers: { 'X-Auth-Token': football_data_APIKEY },
            url: 'http://api.football-data.org/v2/competitions/2021/standings',
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
                        <th>GF</th>         <th>GA</th>     <th>GD</th>
                        <th>Points</th>     <th>Form</th>
                    </tr>
                </thead>

                <tbody>
                    {this.state.standings.map(function(index){
                        return(
                            <tr>
                                <td>{index.position}</td>   <td><img style={{height: "25px", margin: "auto", paddingRight: "10px", paddingBottom: "2px"}}src={index.team.crestUrl}/>{index.team.name}</td>      <td>{index.playedGames}</td>
                                <td>{index.won}</td>        <td>{index.draw}</td>           <td>{index.lost}</td>
                                <td>{index.goalsFor}</td>   <td>{index.goalsAgainst}</td>   <td>+{index.goalDifference}</td>
                                <td>{index.points}</td>     <td>{index.form}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }
}
