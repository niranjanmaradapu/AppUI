import { getDefaultNormalizer } from '@testing-library/react';
import React, { Component , useEffect  } from 'react'
import { withRouter } from "react-router-dom";
import cashmemo from "../../assets/images/cash_memo.svg";
import profile from "../../assets/images/profile.svg";
import Select from 'react-select';
import { browserHistory } from 'react-router';
import logosm from "../../assets/images/logo_01.svg";
import list from "../../assets/images/all_modules.svg";
import arrow from "../../assets/images/circle_arrow.svg";
import deliveryslip from "../../assets/images/create_delivery_slip.svg";
import sale from "../../assets/images/sale.svg";
import promo from "../../assets/images/promo.svg";
import returnslip from "../../assets/images/return_slip.svg";
import addcustomer from "../../assets/images/create_customer.svg";
import tagcustomer from "../../assets/images/tag_customer.svg";
import dayclose from "../../assets/images/close.svg";
import bigarrow from "../../assets/images/arrow_big_left.svg";
import arrow_sm from "../../assets/images/arrow_sm.svg";
import notes from "../../assets/images/notes.svg";
import notesadd from "../../assets/images/notes_add.svg";
import Transfers from "../../assets/images/transfer.svg";
import stock from "../../assets/images/stock.svg";
import Rebarcoading from "../../assets/images/rebarcoading.svg";
import audits from "../../assets/images/audit.svg";
import ecommerce from "../../assets/images/ecommerce.svg";
import masters from "../../assets/images/management.svg";
import pramotions from "../../assets/images/pramotions.svg";
import loyalty from "../../assets/images/loyalty_promo.svg";
import users from "../../assets/images/user_privileges.svg";
import reports from "../../assets/images/chart.svg";
import r_brand from "../../assets/images/r_brand.svg";
import Hsn from "../../assets/images/hsn.svg";


const data = [
    {
      value: 1,
      label: "TEXTILE"
    },
    {
      value: 2,
      label: "RETAIL"
    },
    {
      value: 3,
      label: "ELECTRONICS"
    },
    {
      value: 4,
      label: "LOGOUT"
    }
  ];
  const data1 = [
    {
      value: 1,
      label: "TEXTILE"
    },
    {
      value: 4,
      label: "LOGOUT"
    }
  ];
class Header extends Component {
    constructor(props){
        super(props)
        this.state ={
            userData :{},
            selectedOption:{
              value: 4,
              label: "Textile"
            },
            headerName: '',
            domainTitle:'',
            dropData:[]
        }
        console.log("Header",props);
  }
         
  componentWillMount(){
    this.setState({selectedOption: JSON.parse(sessionStorage.getItem('domainName'))});
    const userData=JSON.parse(sessionStorage.getItem('user'));
    if(userData["cognito:groups"][0] === "super_admin"){
     this.setState({dropData:data})
    }else {
     this.setState({dropData:data1})
    }
}
      

    logOut = () => {
        this.props.history.push("/");
        sessionStorage.clear();
        window.location.reload();
    }
     handleChange = e => {  
        // setSelectedOption(e);
        console.log(e)
        if(e.label==='LOGOUT'){
          this.props.history.push("/");
          sessionStorage.clear();
          window.location.reload();
        }else{
          sessionStorage.setItem('domainName',JSON.stringify(e));
          if(e.label==='TEXTILE'){
            this.props.history.push("createdeliveryslip");
            window.location.reload();
          }else if(e.label==='RETAIL'){
            this.props.history.push("retail");
            window.location.reload();
          }else if(e.label==='ELECTRONICS'){
            this.props.history.push("electronics");
            window.location.reload();
          }
          this.setState({selectedOption:e})
        }
      
      
      }
    // componentWillMount(){
    //     const userData=JSON.parse(sessionStorage.getItem('user'));
    //      if(userData["cognito:groups"][0] === "super_admin"){
    //       this.setState({dropData:data})
    //      }else {
    //       this.setState({dropData:data1})
    //      }
    // }

    render() {

        return (
            <div className="">
                <div className="row">
                    <div className="col-6">
                        <div className="header-left d-flex">
                        <img src={cashmemo} /> 
                        <h6>{this.props.headerTitle}</h6>

                        </div>
                    </div>
                    <div className="col-6">
                        <div className="header-right float-right">
                    <ul className="navbar-nav">
                        <li className="nav-item upper-case">{this.props.user.name}</li>
                        {/* <li className="nav-item">Help</li> */}
                        <li className="nav-item dropdown">
                        {/* <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> */}
                        {/* <img src={profile}  className="rounded-circle" />  */}
                        <Select 
        value={this.state.selectedOption} // set selected value
        options={this.state.dropData} // set list of the data
        onChange={this.handleChange} // assign onChange function
      />
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
