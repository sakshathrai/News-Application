import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import Newsc from './components/Newsc'; 

export default class App extends Component {
  pageSize=3
  render() {
    return (
      <div>

        <Router>
        <Navbar/>
      <Routes>
      <Route exact path="/" element={<Newsc key="general" pageSize={this.pageSize} country="in" category="general"  />} />
    <Route exact path="/business" element={<Newsc key="business" pageSize={this.pageSize} country="in" category="business"  />} />
    <Route exact path="/entertainment" element={<Newsc key="entertainment" pageSize={this.pageSize} country="in" category="entertainment"  />} />
    <Route exact path="/health" element={<Newsc key="health" pageSize={this.pageSize} country="in" category="health"  />} />
    <Route exact path="/science" element={<Newsc key="science" pageSize={this.pageSize} country="in" category="science"  />} />
    <Route exact path="/sports" element={<Newsc key="sports" pageSize={this.pageSize} country="in" category="sports"  />} />
    <Route exact path="/technology" element={<Newsc key="technology" pageSize={this.pageSize} country="in" category="technology"  />} />
</Routes>
          </Router>

      </div>
    )
  }
}


