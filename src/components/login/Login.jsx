import React, { Component } from 'react'
import {withRouter } from "react-router-dom";
import LoginService from '../../services/LoginService';
import Logo from '../../assets/images/logo_otsi.svg';
import Retail from '../../assets/images/login_bg.svg';
import Select from 'react-select';
const data = [
    {
      value: 1,
      label: "KALAMANDIR RAJAMUNDRY"
    },
    {
      value: 2,
      label: "KALAMANDIR AMALAPURAM"
    },
    {
      value: 3,
      label: "KALAMANDIR HYDERABAD"
    }
  ];
class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            isAuth: false,
            user:{
                name:"prasannaaa"
            }

          }
        console.log(process.env.REACT_APP_BASE_URL);
    }
    login = () => {
        // e.preventDefault();
        const obj={
            firstName:"prasanna",
            id:"2122",
            lastName:"kdali"
        }
        
        LoginService.getAuth().then((res) => {
           console.log('respone in component:::::::::::')
        });
        sessionStorage.setItem('user',JSON.stringify(obj));
        this.props.history.push("createdeliveryslip");

    }

    render() {
        return (
            <div className="login">
                <div className="row m-0 p-0">
                <div className="col-6">
                    <div className="login-left">
                        <img className="pic" src={Logo}/>
                        <h5>WELCOME</h5>
                        <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text 
used in laying out print, graphic or web designs.</p>
<div className="retail">
            <img src={Retail}/>
            </div>
            <div className="footer fs-12 p-l-5 m-l-4 m-t-5 p-t-5">
            © 2021 OTSI - POS Portal | All rights reserved.
            </div>
                    </div>
                    <div className="login-left-bgbottom"></div>
                </div>

                <div className="col-6 p-0 m-0">
                    <div className="login-right">
               <div className="login-right-form">
                   <h5>MEMBER LOGIN</h5>
                   <div className="form-group m-t-3">
                       <input type="text" className="mt-3 mb-3 form-control" placeholder="admin@pos.com"/>
                       <input type="password" className="form-control" placeholder="* * * * * * "/>
                   </div>
                  
                    {/* <div className="custom-control custom-checkbox V1_checkbox-label mt-3"> */}
                        {/* <input className="custom-control-input" type="checkbox" id="remember"/>
                        <label className="custom-control-label V1_custom-control-label p-t-0 fs-14 p-l-3"
                            htmlFor="remember">Remember Me</label> */}
                             <Select className="m-t-3" placeholder="Select Store"
                            value={this.state.selectedOption} // set selected value
                            options={data} // set list of the data
                            onChange={this.handleChange} // assign onChange function
                        />
                 
                    <div className="custom-control custom-checkbox V1_checkbox-label mt-3">
                        <input className="custom-control-input" type="checkbox" id="remember"/>
                        <label className="custom-control-label V1_custom-control-label p-t-0 fs-14 p-l-3"
                            htmlFor="remember">Remember Me</label>
                    </div>
                   <button  className="btn-login mt-3" onClick={this.login}>LOGIN</button>
                   <p className="text-center cursor pt-3 mt-2 fs-14"
                            htmlFor="remember">Forgot Passowrd</p>
                            <i className="icon-add_course fs-20 text-green"></i>
               </div>
              
            </div>
            </div>
            </div>
          
                </div>
              
        )
    }
}
export default withRouter(Login);
