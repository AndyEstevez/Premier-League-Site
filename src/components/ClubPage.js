import React, { Component } from 'react';
import $ from 'jquery';


export default class ClubPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            team_id: props.match.params.clubId,
            matches: [],

        }
    }

    async componentDidMount(){
        
        $.ajax({
            headers: { 'X-Auth-Token': process.env.REACT_APP_FOOTBALL_DATA_APIKEY },
            url: `https://api.football-data.org/v2/teams/${this.state.team_id}/matches?status=FINISHED`,
            dataType: 'json',
            type: 'GET',
            success: (res) => {
                this.setState({matches: res})
            }
          })
    }




    render() {
        console.log(this.state.team_id)
        console.log(this.state.matches)
        return (
            <div>
                
            </div>
        )
    }
}
