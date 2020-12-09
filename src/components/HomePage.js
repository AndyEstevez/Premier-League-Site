import React, { Component } from 'react';
import $ from 'jquery'; 
import LiveGames from './LiveGames'
import { football_data_APIKEY, matchesURL } from '../config';
import Matchweek from './Matchweek';

// edge cases for embedding highlights:
// All other teams = remove FC from Club name
// Leeds United FC = Leeds
// Brighton & Hove Albion FC = Brighton
// Wolverhampton Wanderers FC = Wolves



export default class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            footballMatches: [],
            liveMatches: [], 
        }
    }

    componentDidMount(){
        
        $.ajax({
            headers: { 'X-Auth-Token': process.env.REACT_APP_FOOTBALL_DATA_APIKEY },
            url: process.env.REACT_APP_MATCHES_URL,
            dataType: 'json',
            type: 'GET',
            success: (res) => {
                this.setState({footballMatches: res.matches})
            }
          })
    }

    render() {
        console.log(this.state.footballMatches)
        var findLiveGames = [];
        for(var i = 0; i < this.state.footballMatches.length; i++){
            if( this.state.footballMatches[i].status === 'PAUSED' || this.state.footballMatches[i].status === 'IN_PLAY'){
                findLiveGames.push(i);
            }
            else if(this.state.footballMatches[i].status === 'SCHEDULED'){
                break;
            }
        }

        let matchWeek = [];
        let count = 0;
        let matchDay;
        for(let i = 0; i < this.state.footballMatches.length; i++){
            if(this.state.footballMatches[i].status === 'SCHEDULED'){
                matchDay = this.state.footballMatches[i].matchday
                if(count < 10 && this.state.footballMatches[i].matchday === matchDay){
                    matchWeek.push(i)
                    count++;
                }
                else{
                    break;
                }
            }
        }
        // console.log(findLiveGames)
      
        
        return (
            <div>
                {findLiveGames.length > 0 ? 
                <LiveGames liveGames={findLiveGames} matches={this.state.footballMatches} />
                : <div></div>
                }
                <Matchweek matches={this.state.footballMatches} weekMatches={matchWeek} matchDay={matchDay}/>
            </div>
        )
    }
}
