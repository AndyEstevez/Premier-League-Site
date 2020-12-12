import React, { Component } from 'react';
import $ from 'jquery'; 
import LiveGames from './LiveGames'
import Matchweek from './Matchweek';
import TopNews from './TopNews';
import NewsSection from './NewsSection';


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
            topNews: [],
            news: [],
        }
    }

    async componentDidMount(){
        console.log(process.env.REACT_APP_SEARCHQUERY_URL)
        try {
            const response = await fetch(process.env.REACT_APP_SEARCH_QUERY_URL);
            const json = await response.json();
            this.setState({ topNews: json.articles[0], news: json.articles.slice(1, 4)});
          } catch (error) {
            console.log(error);
        }
       
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
        // console.log(process.env.REACT_APP_SEARCH_QUERY_URL)
        // console.log(process.env.REACT_APP_FOOTBALL_DATA_APIKEY)
        // console.log(this.state.footballMatches)
        let matchday;
        var findLiveGames = [];
        for(var i = 0; i < this.state.footballMatches.length; i++){
            if( this.state.footballMatches[i].status === 'PAUSED' || this.state.footballMatches[i].status === 'IN_PLAY'){
                findLiveGames.push(i);
            }
            else if(this.state.footballMatches[i].status === 'SCHEDULED'){
                matchday = this.state.footballMatches[i].matchday;
                break;
            }
        }

        let matchWeek = [];
        console.log(matchday)
        for(let i = 0; i < this.state.footballMatches.length; i++){
            if(this.state.footballMatches[i].status === 'SCHEDULED'){
                if(this.state.footballMatches[i].matchday === matchday){
                    matchWeek.push(i)
                }
                else{
                    break;
                }
            }
        }
     
        return (
            <div style={{ display:"inline-block"}}>
                {findLiveGames.length > 0 ? 
                <LiveGames style={{display:"inline-block"}} liveGames={findLiveGames} matches={this.state.footballMatches} />
                : <div></div>
                }
                <div style={{display:'flex', margin:"auto"}}>
                <Matchweek style={{ width:"50%", margin:"auto"}} matches={this.state.footballMatches} weekMatches={matchWeek} matchDay={matchday}/>
                
                
                <TopNews style={{ width:"50%", }} topNews={this.state.topNews}/>
                </div>
                <NewsSection style={{display:"block"}} news={this.state.news} topNews={this.state.topNews}/>
            </div>
        )
    }
}
