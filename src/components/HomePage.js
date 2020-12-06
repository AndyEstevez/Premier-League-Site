import React, { Component } from 'react';
import $ from 'jquery'; 
import LiveGames from './LiveGames'
import { football_data_APIKEY, matchesURL } from '../config';

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
            headers: { 'X-Auth-Token': football_data_APIKEY },
            url: matchesURL,
            dataType: 'json',
            type: 'GET',
            success: (res) => {
                this.setState({footballMatches: res.matches})
            }
          }).done(function(response){
            // do something with the response, e.g. isolate the id of a linked resource   
            console.log(response);
            //this.setState({footballData: response.matches})
           
          });

         
        
    }

    render() {
        var findLiveGames = [];
        console.log(this.state.footballMatches[103])
        for(var i = 0; i < this.state.footballMatches.length; i++){
            if( this.state.footballMatches[i].status === 'PAUSED' || this.state.footballMatches[i].status === 'IN_PLAY'){
                findLiveGames.push(i);
            }
            else if(this.state.footballMatches[i].status === 'SCHEDULED'){
                break;
            }
        }
        // console.log(findLiveGames)
      
        
        return (
            <div>
                {findLiveGames.length > 0 ? 
                <LiveGames liveGames={findLiveGames} matches={this.state.footballMatches} />
                : <div></div>
                }
            </div>
        )
    }
}