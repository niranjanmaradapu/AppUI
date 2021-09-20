import React, { Component } from 'react'
import {withRouter } from "react-router-dom";
import LoginService from '../../services/LoginService';
import Logo from '../../assets/images/logo_otsi.svg';
import Retail from '../../assets/images/login_bg.svg';
import Select from 'react-select';
import jwt_decode from "jwt-decode";
import { ToastContainer,toast } from 'react-toastify';
import cashmemo from "../../assets/images/cash_memo.svg";
import notes from "../../assets/images/notes.svg";
import notesadd from "../../assets/images/notes_add.svg";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
const data = [
    {
      value: 1,
      label: "KALAMANDIR RAJAMUNDRY11111"
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
  const data1 = [
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
  const data2 = [
    {
      value: 1,
      label: "TEXTILE"
    },
    {
      value: 4,
      label: "LOGOUT"
    }
  ];
class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            isAuth: false,
            userName:'',
            password:'',
            dropValue:'',
            user:{
                name:"prasannaaa"
            },
            storeNames:[],
            isModel: false,
            moduleNames: [
                {
                    parentName: 'TEXTILE',path:'/createdeliveryslip', 
                },
                {
                    parentName: 'RETAIL', path:'/listofpendingnotes',
                },
                {
                    parentName: 'ELECTRICALS', 
                },
                {
                    parentName: 'ELECTRONICS', 
                },
            ]

          }
        console.log(process.env.REACT_APP_BASE_URL);
    }
    componentWillMount(){
        LoginService.getStores().then((res) => { 
            res.data.forEach((ele,index)=>{
              const obj={
                  value:ele.value,
                  label:ele.storeName
              }
              this.state.storeNames.push(obj)
            });
        }); 
        //this.state.storeNames = data
    }
    handleChange=(e)=>{
        console.log(e);
        this.setState({ dropValue: e.label });
    }
    login = () => {
        // e.preventDefault();
        const obj={
            email:"+91"+ this.state.userName,
            password:this.state.password,
            storeName: this.state.dropValue
            // this.state.dropValue
        }
       
        
        LoginService.getAuth(obj).then((res) => {
            if(res.data && res.data.statusCode === 200) {
                const token = res.data.authResponce.idToken;
                sessionStorage.setItem('user',JSON.stringify(jwt_decode(token)));
                sessionStorage.setItem('token', JSON.stringify(token));
                const role = JSON.parse(sessionStorage.getItem('user'));
                console.log(role["cognito:groups"][0]);
                
                if(role["cognito:groups"][0] === "super_admin") {
                    this.getModel();
                } else {
                    sessionStorage.setItem('domainName',JSON.stringify(data2[0]));
                    this.props.history.push("createdeliveryslip");
                }
                
            }else{
                toast.error('Invalid Credentials');
                this.setState({ userName: '',password:'',selectedOption:null })
                sessionStorage.removeItem('user') 
                 window.location.reload();
            }
        });
    }

    getModel() {
        this.setState({
            isModel: true
        });
    }

    hideModal() {
        this.setState({
            isModel: false
        });
    }

    handleClick(val) {
        data1.forEach((ele,index)=>{
           if(val === ele.value){
               sessionStorage.setItem('domainName',JSON.stringify(ele));
           }
          });
        if(val ===1)  {
         this.props.history.push("createdeliveryslip");
        } else if(val ===2){
            this.props.history.push("retail");
        }else {
            this.props.history.push("electronics");
        }
        
    }

    render() {
        return (

            <div className="login">


                <Modal isOpen={this.state.isModel} size='xl' >
                    <ModalBody>
                        <div className="domain pb-5 pt-5 mb-5 text-center">
                            <h5 className="">Select Domain</h5>
                                             <ul>
                                                 <li  onClick={e => this.handleClick(1)} >
                                                     <i className="icon-textile"></i>
                                                     <h6>TEXTILE</h6>
                                                     {/* <h6>{element.parentName}</h6> */}
                                                 </li>
                                                 <li  onClick={e => this.handleClick(2)}>
                                                     <i className="icon-retail"></i>
                                                     <h6>RETAIL</h6>
                                                 </li>
                                                 <li  onClick={e => this.handleClick(3)}>
                                                    <i className="icon-electrical"></i>
                                                    <h6>ELECTRONICS</h6>
                                                 </li>
                                                 {/* <li  onClick={e => this.handleClick(4)}>
                                                    <i className="icon-electronics"></i>
                                                    <h6>ELECTRONICS</h6>
                                                 </li> */}
                                             </ul>
                                         </div>   
{/* 
                    {this.state.moduleNames.map((element, index) => {
                                return <div className="row" key={index} onClick={e => this.handleClick()}>
                                         <div className="domain">
                                             <ul>
                                                 <li>
                                                     <i className="icon-textile"></i>
                                                     <h6></h6>
                                                 </li>
                                                 <li>
                                                     <i className="icon-retail"></i>
                                                     <h6>RETAIL</h6>
                                                 </li>
                                                 <li>
                                                    <i className="icon-electrical"></i>
                                                    <h6>ELECTRICAL</h6>
                                                 </li>
                                                 <li>
                                                    <i className="icon-electronics"></i>
                                                    <h6>ELECTRONICS</h6>
                                                 </li>
                                             </ul>
                                         </div>   
                                </div>
                                
                              
                            })} */}

                    </ModalBody>
                   

                </Modal>


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
               <div className="login-right-form select_control">
                   
                   <h5>MEMBER LOGIN</h5>
                   <div className="form-group m-t-3">
                       <input type="text" className="mt-3 mb-3 form-control" value={this.state.userName} name="userName" 
                        onChange={(e) => this.setState({userName:e.target.value})} 
                       placeholder="Username"/>
                       <input type="password" className="form-control" value={this.state.password} name="password" 
                       onChange={(e) => this.setState({password:e.target.value})} 
                        placeholder="Password"/>
                   </div>
                  
                    {/* <div className="custom-control custom-checkbox V1_checkbox-label mt-3"> */}
                        {/* <input className="custom-control-input" type="checkbox" id="remember"/>
                        <label className="custom-control-label V1_custom-control-label p-t-0 fs-14 p-l-3"
                            htmlFor="remember">Remember Me</label> */}
                             <Select className="m-t-3 upper-case select_control" placeholder="Select Store"
                            value={this.state.selectedOption} // set selected value
                            options={this.state.storeNames} // set list of the data
                            onChange={this.handleChange} // assign onChange function
                        />
                 
                    <div className="custom-control custom-checkbox V1_checkbox-label mt-3">
                        <input className="custom-control-input" type="checkbox" id="remember"/>
                        <label className="custom-control-label V1_custom-control-label p-t-0 fs-14 p-l-3"
                            htmlFor="remember">Remember Me</label>
                    </div>
                   <button  className="btn-login_v1 mt-3" onClick={this.login}>LOGIN</button>
                   <p className="text-center cursor pt-3 mt-2 fs-14"
                            htmlFor="remember">Forgot Passowrd</p>
                            {/* <i className="icon-add_course fs-20 text-green"></i> */}
              
              
              
              
               </div>
              
            </div>
            </div>
            </div>
            {/* <ToastContainer /> */}
                </div>
              
        )
    }
}
export default withRouter(Login);
