import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import { Tabs, Tab } from "@material-ui/core";
import Fixtures from "./Fixtures";
import Results from "./Results";

const ClubPage = (props) => {
    const { match, history } = props;
    const { params } = match;
    const { page } = params;

    const tabNameToIndex = {
        0: "Fixtures",
        1: "Results"
    };
    
    const indexToTabName = {
        Fixtures: 0,
        Results: 1
    };

    const [selectedTab, setSelectedTab] = React.useState(indexToTabName[page]);
    const [fixtureMatches, setFixtures] = useState([])
    const [resultMatches, setResults] = useState([])


    const handleChange = (event, newValue) => {
        history.push(`/Clubs/${params.clubId}/${tabNameToIndex[newValue]}`);
        setSelectedTab(newValue);
    };

    useEffect(() => {
        const endpointFixture = `https://api.football-data.org/v2/teams/${params.clubId}/matches?status=SCHEDULED`;
        const endpointResult = `https://api.football-data.org/v2/teams/${params.clubId}/matches?status=FINISHED`;
        fetchFixtures(endpointFixture);
        fetchResults(endpointResult);
    }, [])

    // function to do an API request for searching based on what the user typed to the searchbar
    // and setting the state hook 'Searches' to the response results
    const fetchFixtures = (endpoint) =>  {
        $.ajax({
            headers: { 'X-Auth-Token': process.env.REACT_APP_FOOTBALL_DATA_APIKEY },
            url: endpoint,
            dataType: 'json',
            type: 'GET',
            success: (res) => {
                setFixtures([...fixtureMatches, ...res.matches])
            }

            
        })

        // fetch(endpoint)
        //     .then(response => response.json())
        //     .then(response => {
        //         setSearch([...Searches, ...response.results])
        //     })
        
        
    }
    const fetchResults = (endpoint) =>  {
        $.ajax({
            headers: { 'X-Auth-Token': process.env.REACT_APP_FOOTBALL_DATA_APIKEY },
            url: endpoint,
            dataType: 'json',
            type: 'GET',
            success: (res) => {
                setResults([...resultMatches, ...res.matches])
            }
        })

        // console.log(resultMatches)
        // fetch(endpoint)
        //     .then(response => response.json())
        //     .then(response => {
        //         setSearch([...Searches, ...response.results])
        //     })
        
        
    }
    // console.log(resultMatches)

    // console.log(fixtureMatches)

    return (
        <div style={{margin:"auto", width:"", border:"3px solid black"}}>
          <Tabs value={selectedTab} onChange={handleChange}>
            <Tab label="Fixtures" />
            <Tab label="Results" />
          </Tabs>
          {selectedTab === 0 && <Fixtures matches={fixtureMatches} />}
          {selectedTab === 1 && <Results matches={resultMatches} />}
        </div>
      );
    };
    
export default ClubPage;