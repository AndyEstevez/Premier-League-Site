import React, { Component } from 'react'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import $ from 'jquery';
import SearchIcon from '@material-ui/icons/Search';

export default class NavbarObject extends Component {
    constructor(props){
    super(props)
    this.state = {
        teams: [],
        suggestions: [],
        text: '',
        }
    }

    async componentDidMount(){
        
        $.ajax({
            headers: { 'X-Auth-Token': process.env.REACT_APP_FOOTBALL_DATA_APIKEY },
            url: process.env.REACT_APP_TEAMS_URL,
            dataType: 'json',
            type: 'GET',
            success: (res) => {
                this.setState({teams: res.teams})
            }
          })
    }

    handleText = (e) => {
        const value = e.target.value;
        
        let suggestions = [];
        if(value.length > 0){
            const regex = new RegExp(`^${value}`, 'i');
            console.log(regex)
            const names = []
            for(let i = 0; i < this.state.teams.length; i++){
                names.push(this.state.teams[i].name)
            }
            suggestions = names.sort().filter(v => regex.test(v))
        }
        console.log(suggestions)
        console.log("IN HANDLE TEXT")
        this.setState(() => ({ suggestions, text: value }))
    }

    suggestionSelected(value){
        console.log(value)
        console.log("IN SUGGESTIONS SELECTED")
        this.setState(() => ({
            text: value,
            suggestions: []
        }))
    }


    renderSuggestions(){
        const { suggestions } = this.state;
        if(suggestions.length === 0){
            return null;
        }
        console.log("IN RENDER SUGGESTIONS")
        console.log(suggestions)
        const names = []
        for(let i = 0; i < this.state.teams.length; i++){
            names.push(this.state.teams[i].name)
        }
        return(
            <ul className="search-ul">
                {suggestions.map((item) => <li className="li-selections" onClick={() => this.suggestionSelected(item)}>{item}</li>)}
            </ul>
        )
    }

    handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            let getClubId;
            for(let i = 0; i < this.state.teams.length; i++){
                if(this.state.teams[i].name === e.target.value){
                    getClubId = this.state.teams[i].id;
                }
            }
            window.location.href=`/Clubs/${getClubId}`
            console.log(e.target.value)
        }
    }

    render() {
        console.log(this.state.teams)
        const { text } = this.state;
       
        return (
            <div>
                <Navbar className="color-nav" variant="dark" expand="lg" style={{marginBottom: "50px"}}>
                    <Nav className="mr-auto" style={{fontSize: "2em", fontWeight: "500", }}>
                        <Nav.Link  href="/">Home</Nav.Link>
                        <Nav.Link  href="/Fixtures">Fixtures</Nav.Link>
                        <Nav.Link  href="/Results">Results</Nav.Link>
                        <Nav.Link  href="/Standings">Standings</Nav.Link>
                        <Nav.Link  href="/Clubs">Clubs</Nav.Link>

                    </Nav>
                    <SearchIcon style={{width:"35px", height:"50px"}}/>

                    <div className="search">
                        <input className="search-input" value={text} onKeyDown={this.handleKeyDown}  onChange={this.handleText} type="text" placeholder="Search Club..." />
                        {this.renderSuggestions()}
                    </div>
                </Navbar>
                
            </div>
        )
    }
}
