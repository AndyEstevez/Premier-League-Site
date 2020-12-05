import React, { Component } from 'react'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';



export default class NavbarObject extends Component {
    render() {
        return (
            <div>
                <Navbar className="color-nav" variant="dark">
                    <Nav className="mr-auto text-uppercase" style={{padding: "5px", fontSize: "24px", fontWeight: "300", color: "blue" }}>
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/Fixtures">Fixtures</Nav.Link>
                        <Nav.Link href="/Results">Results</Nav.Link>
                        <Nav.Link href="/Standings">Standings</Nav.Link>
                    </Nav>
                    <Form inline>
                    <FormControl type="text" placeholder="Search" className="mx-sm-2" />
                    <Button variant="dark">Search</Button>
                    </Form>
                </Navbar>
            </div>
        )
    }
}
