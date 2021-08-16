import { getDefaultNormalizer } from '@testing-library/react';
import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import cashmemo from "../../assets/images/cash_memo.svg";
import profile from "../../assets/images/profile.svg";
import Select from 'react-select';
const data = [
    {
      value: 1,
      label: "cerulean"
    },
    {
      value: 2,
      label: "fuchsia rose"
    },
    {
      value: 3,
      label: "true red"
    },
    {
      value: 4,
      label: "aqua sky"
    },
    {
      value: 5,
      label: "tigerlily"
    },
    {
      value: 6,
      label: "blue turquoise"
    }
  ];
class Header extends Component {
    constructor(props){
        super(props)
        this.state ={
            userData :{},
            selectedOption:null
        }
        console.log(props);
    }
    logOut = () => {
        this.props.history.push("/");
        sessionStorage.removeItem('user')
        window.location.reload();
    }
     handleChange = e => {
        // setSelectedOption(e);
        console.log(e)
      }
    // componentWillMount(){
    //     this.state.userData=JSON.parse(sessionStorage.getItem('user'));
    //     console.log(this.state.userData);
    // }

    render() {
        return (
            <div className="">
                <div className="row">
                    <div className="col-6">
                        <div className="header-left d-flex">
                        <img src={cashmemo} /> <h6>Cash Memo & Delivery Slips</h6>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="header-right float-right">
                    <ul className="navbar-nav">
                        <li className="nav-item">Kalamandir</li>
                        {/* <li className="nav-item">Help</li> */}
                        <li className="nav-item dropdown">
                        {/* <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> */}
                        <img src={profile}  className="rounded-circle" onClick={this.logOut} /> 
                        {/* <Select 
        value={this.state.selectedOption} // set selected value
        options={data} // set list of the data
        onChange={this.handleChange} // assign onChange function
      /> */}
                        {/* </a> */}
                        {/* <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a className="dropdown-item" href="#">Dashboard</a>
                        <a className="dropdown-item" href="#">Edit Profile</a>
                        <a className="dropdown-item" href="#">Log Out</a>
                        </div> */}
                        
                        </li>   
                  </ul>
    </div>
                    {/* <button className="logout" onClick={this.logOut}>logout</button> */}
                    </div>
                {/* <h2>{this.props.user.firstName}</h2>   */}
               
                </div>
            </div>
        )
    }
}
export default withRouter(Header)
