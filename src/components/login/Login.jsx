import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import LoginService from '../../services/LoginService';
import Logo from '../../assets/images/retail_logo.svg';
import textile from '../../assets/images/textile.svg';
import electrical from '../../assets/images/electrical.svg';
import sanitary from '../../assets/images/sanitary.svg';
import retailIcon from '../../assets/images/logo_icon.svg';
import Retail from '../../assets/images/login_bg.svg';
import Select from 'react-select';
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import cashmemo from "../../assets/images/cash_memo.svg";
import notes from "../../assets/images/notes.svg";
import notesadd from "../../assets/images/notes_add.svg";
import adminImg from "../../assets/images/adminIMG1.svg";
import { withTranslation } from 'react-i18next';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import URMService from '../../services/URM/URMService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            isAuth: false,
            userName: '',
            password: '',
            dropValue: '',
            value: "en",
            user: {
                name: ""
            },
            storeNames: [],
            domainsList: [],
            isModel: false,
            isRegister: false,
            isLogin: true,
            isStores: false,
            isForgot: false,
            errors: {},
            roleName:"",

        }
        sessionStorage.setItem('lang', this.state.value)
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.getDropdownList = this.getDropdownList.bind(this);
        this.hideRegister = this.hideRegister.bind(this);
        this.showRegister = this.showRegister.bind(this);
        this.registerClient = this.registerClient.bind(this);
        this.hideChangePassword = this.hideChangePassword.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.validation = this.validation.bind(this);
        this.emailValidation = this.emailValidation.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.forgotPassword = this.forgotPassword.bind(this);
        this.saveForgotPassword = this.saveForgotPassword.bind(this);
    }


    componentWillMount() {
        sessionStorage.removeItem('selectedDomain');
        //this.state.storeNames = data

    }

    removeDuplicates(array, key) {
        const lookup = new Set();
        return array.filter(obj => !lookup.has(obj[key]) && lookup.add(obj[key]));
    }




    handleRadioChange(event) {
        // set the new value of checked radion button to state using setState function which is async funtion
        this.setState({
            value: event.target.value
        });
        const newLang = event.target.value
        this.props.i18n.changeLanguage(newLang);
        sessionStorage.setItem('lang', newLang)
    }

    handleChange = (e) => {
        console.log(e);
        this.setState({ dropValue: e.label });
    }

    login = () => {

        const obj = {
            "email": this.state.userName,
            "password": this.state.password
        }

        LoginService.getAuth(obj).then((res) => {
            console.log(res)
            if (res && res.data && res.data.isSuccess === 'true') {
                if (res.data.result.authenticationResult) {
                    const token = res.data.result.authenticationResult.idToken;
                    sessionStorage.setItem('user', JSON.stringify(jwt_decode(token)));
                    sessionStorage.setItem('token', JSON.stringify(token));
                    const role = JSON.parse(sessionStorage.getItem('user'));
                    console.log(role);
                    if (role["cognito:groups"]) {
                        if (role["cognito:groups"][0] === "super_admin") {
                            this.getModel();
                        } else if (role["cognito:groups"][0] === "config_user") {
                            sessionStorage.setItem('domainName', role["cognito:groups"][0]);
                            // sessionStorage.setItem('selectedDomain', JSON.stringify(data2[0]));
                            this.props.history.push("/users");
                        } else {
                            sessionStorage.setItem('domainName', role["cognito:groups"][0]);
                            //  sessionStorage.setItem('selectedDomain', JSON.stringify(data2[0]));
                            this.props.history.push("/dashboard");
                        }
                    } else if (role["custom:isSuperAdmin"] === "true") {
                        // sessionStorage.setItem('selectedDomain', JSON.stringify(data2[0]));
                        this.props.history.push("/dashboard");
                    }
                    else {
                        toast.error("No Role Available")
                        // sessionStorage.removeItem('user')
                        // window.location.reload();
                    }
                } else {
                    if (res.data.result.challengeName === "NEW_PASSWORD_REQUIRED") {
                      
                        const roleData = res.data.result ? JSON.parse(res.data.result.challengeParameters.userAttributes): "";
                        this.setState({ isChangePassword: true,
                            isRegister: false, isForgot: false, isLogin: false, sessionData: res.data.result.session,
                            roleName: roleData["custom:roleName"]
                        });

                          console.log(this.state.roleName);
                    }
                }



            } else {
                // toast.error('Invalid Credentials');
                this.setState({ userName: '', password: '', selectedOption: null });
                sessionStorage.removeItem('user');
                window.location.reload();
            }
        });

        //  this.props.history.push("/users");
    }

    changePassword() {
        // let roleName;
        // const role = JSON.parse(sessionStorage.getItem('user'));
        // if (role["cognito:groups"][0] !== "config_user" && role["custom:isSuperAdmin"] === "false") {
        //     roleName = role["cognito:groups"][0];
        // }
        const obj = {
            "userName": this.state.userName,
            "password": this.state.currentPassword,
            "newPassword": this.state.newPassword,
            "session": this.state.sessionData,
            "roleName": this.state.roleName
        }

        LoginService.changePassword(obj).then(res => {
            console.log(res);
            if (res) {
                toast.success("Password Changed Successfully");
                window.location.reload();
            }
            this.hideChangePassword();
        });
    }

    hideChangePassword() {
        this.setState({ isChangePassword: false, isLogin: true });
        window.location.reload();
    }






    getModel() {
        const user = JSON.parse(sessionStorage.getItem("user"));
        const clientId = user["custom:clientId1"];
        URMService.getDomainsList(clientId).then((res) => {
            console.log(res);
            if (res) {
                this.state.domainsList = res.data.result;
                // const obj = {
                //     id:9,
                //     domainName:"Admin",
                //     src: adminImg
                // }
                // this.state.domainsList.push(obj);
                this.getDomains();

            }

        });


        // this.setState({
        //     isModel: true
        // });
    }

    getDomains() {
        this.state.domainsList.forEach(ele => {
            if (ele.domaiName === "Textile") {
                ele.src = textile;
            } else if (ele.domaiName === "Retail") {
                ele.src = sanitary;
            } else if (ele.domaiName === "Electronics") {
                ele.src = electrical;
            } else if (ele.domaiName === "MultiDomain") {
                ele.src = adminImg
            }
        });

        this.setState({ isModel: true })
    }



    hideModal() {
        this.setState({
            isModel: false
        });
    }

    handleClick(val, domainName) {
        // data1.forEach((ele, index) => {
        //     if (domainName === ele.label) {

        //         sessionStorage.setItem('selectedDomain', JSON.stringify(ele));
        //     }
        // });
        if (domainName === 'Textile') {
            this.props.history.push("dashboard");
        } else if (domainName === 'Retail') {
            this.props.history.push("retail");
        } else if (domainName === 'Electronics') {
            this.props.history.push("electronics");
        } else if (domainName === 'Admin') {
            this.props.history.push("/users");
        } else if (domainName === 'MultiDomain') {
            this.props.history.push("/retail");
        }


    }

    getStoresDropdown() {
        return (
            this.state.isStores && (
                <div>
                    <Select className="m-t-3 upper-case select_control" placeholder="Select Store"
                        value={this.state.selectedOption} // set selected value
                        options={this.state.storeNames} // set list of the data
                        onChange={this.handleChange} // assign onChange function
                    />
                </div>
            )
        );
    }

    showRegister() {
        this.setState({ isRegister: true, isForgot: false, isLogin: false, isChangePassword: false });
    }

    forgotPassword() {
        this.setState({ isForgot: true, isLogin: false, isRegister: false, isChangePassword: false  });
    }

    saveForgotPassword() {
        this.setState({ isForgot: false, isLogin: true, isRegister: false, isChangePassword: false  });
    }

    hideRegister() {
        this.setState({ isRegister: false, isForgot: false, isLogin: true,isChangePassword: false });
    }


    handleValidation() {
        let errors = {};
        let formIsValid = true;

        //Name
        if (!this.state.registerName) {
            formIsValid = false;
            errors["registerName"] = "Enter name";
        }




        // Mobile
        if (!this.state.registerMobile) {
            formIsValid = false;
            errors["registerMobile"] = "Enter phone Number";
        }

        if (typeof this.state.registerMobile !== "undefined") {
            if (!this.state.registerMobile.match(/^[0-9\b]+$/)) {
                formIsValid = false;
                errors["registerMobile"] = "Please Enter Valid Mobile Number";
            }
        }

        //email 
        if (!this.state.registerEmail) {
            formIsValid = false;
            errors["registerEmail"] = "Enter email";
        }

        // if (typeof this.state.registerEmail !== "undefined") {

        //     if (!this.state.registerEmail.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{4,})$/i)) {
        //         formIsValid = false;
        //         errors["registerEmail"] = "Please Enter Valid Email";
        //     }

        // }


        this.setState({ errors: errors });
        return formIsValid;

    }


    registerClient() {
        const formValid = this.handleValidation();
        if (formValid) {
            const obj = {
                "name": this.state.registerName,
                "organizationName": this.state.registerOrganisation,
                "address": this.state.registerAddress,
                "mobile": "+91".concat(this.state.registerMobile),
                "email": this.state.registerEmail
            }

            LoginService.registerUser(obj).then((res) => {

                if (res) {
                    const clientId = res.data.result.split(":");
                    const clientObj = {
                        "email": this.state.registerEmail,
                        "phoneNumber": "+91".concat(this.state.registerMobile),
                        "birthDate": "",
                        "gender": "",
                        "name": this.state.registerName,
                        "username": this.state.registerName.concat("_config_user"),
                        "tempPassword": "Otsi@1234",
                        "parentId": "",
                        "domianId": "",
                        "address": "",
                        "role": {
                            "roleName": "config_user"
                        },
                        "roleName": "config_user",
                        "stores": [],
                        "clientId": clientId[1],
                        "isConfigUser": "true",
                        "clientDomain": [],
                        "isSuperAdmin": "false",
                        "createdBy": "NA"
                    }

                    URMService.saveUser(clientObj).then((response) => {
                        console.log(response);
                        if (response) {
                            toast.success("Username and Password are sent to  respective mailId");
                            this.setState({ registerName: "", registerEmail: "", registerOrganisation: "", registerMobile: "", registerAddress: "" });
                            this.hideRegister();
                        }
                    });
                }

            });
        } else {
            toast.info("Please Enter all mandatory fields");
        }
    }

    getDropdownList = (e) => {
        console.log(this.state.userName);
        if (e.key === "Enter") {
            //  if (this.state.userName === "admin" || this.state.userName === "cashier" || this.state.userName === "salesMan") {
            //     this.setState({isStores: true});
            // } 
            // const usersList = JSON.parse(sessionStorage.getItem("usersList"));
            // for (let i = 0; i < usersList.length; i++) {
            //     const usersList = JSON.parse(sessionStorage.getItem("usersList"));
            //     if (usersList[i].name === this.state.userName) {
            //         if (usersList[i].role !== "super_admin" && usersList[i].role !== "admin_textile"
            //             && usersList[i].role !== "admin_retail" && this.state.userName !== "config_user") {
            //             if (usersList[i].selectedStoresList && usersList[i].selectedStoresList.length > 1) {
            //                 this.setState({ isStores: true });
            //                 usersList[i].selectedStoresList.forEach((element, index) => {
            //                     const obj = {
            //                         value: 1,
            //                         label: element.storeName
            //                     }
            //                     this.state.storeNames.push(obj);
            //                 });
            //             }

            //         }

            //     }
            // }
        }
        this.state.storeNames = this.removeDuplicates(this.state.storeNames, "label");
    }

    showDomains() {
        return this.state.domainsList && this.state.domainsList.length > 0 && (
            <div>
                {this.state.domainsList.map((element, index) => {
                    return (
                        <li
                            key={index}
                            onClick={(e) => this.handleClick(index + 1, element.domaiName)}
                        >
                            <a>
                                <img src={element.src} /></a>
                            <h6>{element.domaiName} </h6>
                        </li>
                    )
                })}
            </div>
        )
    }

    // validation(e) {

    //     const regex = /^[0-9\b]+$/;
    //     const value = e.target.value;
    //     if (value === '' || regex.test(value)) {
    //         this.setState({
    //             [e.target.id]: e.target.value, registerMobile: e.target.value
    //         });
    //     } else {
    //         // toast.error("pls enter numbers")
    //     }


    // }


    validation(e){
        const regex = /^[0-9\b]+$/;
        const value = e.target.value;
        if (value === '' || regex.test(value)) {
            this.setState({
                [e.target.id]: e.target.value, registerMobile:  e.target.value
                });
        } else {
            // toast.error("pls enter numbers")
        }
       
          
       }

    emailValidation(e) {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{4,})$/i;
        const value = e.target.value;
        if (!value || regex.test(value) === false) {
            this.setState({
                [e.target.id]: e.target.value, registerEmail: e.target.value
            });
        } else {
            // toast.error("pls enter numbers")
        }


    }


    render() {
        const { t, i18n } = this.props;
        return (

            <div className="login">
                {/* <Modal isOpen={this.state.isRegister} size="lg">
                    <ModalHeader>Register</ModalHeader>
                    <ModalBody>
                        <div className="row p-3">

                            <div className="col-4">

                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={this.state.registerName}
                                    onChange={(e) => this.setState({ registerName: e.target.value })}
                                    autoComplete="off"
                                />
                                <div>
                                    <span style={{ color: "red" }}>{this.state.errors["registerName"]}</span>
                                </div>

                            </div>

                            <div className="col-4">

                                <label>Organisation</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={this.state.registerOrganisation}
                                    onChange={(e) => this.setState({ registerOrganisation: e.target.value })}
                                    autoComplete="off"
                                />

                            </div>

                            <div className="col-4">
                                <label>Mobile</label>
                                <input
                                    type="text"
                                    name="mobile"
                                    className="form-control"
                                    maxLength="10"
                                    minLength="10"
                                    value={this.state.registerMobile}
                                    onChange={this.validation}
                                    autoComplete="off"
                                />
                                <div>
                                    <span style={{ color: "red" }}>{this.state.errors["registerMobile"]}</span>
                                </div>

                            </div>



                        </div>
                        <div className="row p-3">

                            <div className="col-4">

                                <label>Email</label>
                                <input
                                    type="text"
                                    name="email"
                                    className="form-control"
                                    value={this.state.registerEmail}
                                    onChange={this.emailValidation}
                                    autoComplete="off"
                                />
                                <div>
                                    <span style={{ color: "red" }}>{this.state.errors["registerEmail"]}</span>
                                </div>

                            </div>

                            <div className="col-4">

                                <label>Address</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={this.state.registerAddress}
                                    onChange={(e) => this.setState({ registerAddress: e.target.value })}
                                    autoComplete="off"
                                />

                            </div>





                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn-unic" onClick={this.hideRegister}>
                            Cancel
                        </button>
                        <button
                            className="btn-unic active fs-12"
                            onClick={this.registerClient}
                        >
                            Save
                        </button>
                    </ModalFooter>
                </Modal> */}

                {/* <Modal isOpen={this.state.isChangePassword} size="lg">
                    <ModalHeader>Change Password</ModalHeader>
                    <ModalBody>

                        <div className="form-group m-t-2">
                            <input type="text" className="mt-3 mb-3 form-control" value={this.state.currentPassword} name="currentPassword"
                                onChange={(e) => this.setState({ currentPassword: e.target.value })}
                                autoComplete="off"

                                placeholder="Current Password" />
                            <input type="password" className="form-control" value={this.state.newPassword} name="newPassword"
                                onChange={(e) => this.setState({ newPassword: e.target.value })}
                                placeholder="New Password" />
                        </div>







                    </ModalBody>
                    <ModalFooter>
                        <button className="btn-unic" onClick={this.hideChangePassword}>
                            Cancel
                        </button>
                        <button
                            className="btn-unic active fs-12"
                            onClick={this.changePassword}
                        >
                            Save
                        </button>
                    </ModalFooter>
                </Modal> */}





               
                <Modal className="fullModal" isOpen={this.state.isModel} size='xl' >
                    <div className="">
                        <ModalBody>
                            <div className="domain pb-5 pt-5 mb-5 text-center">
                                <img src={retailIcon} />
                                <h5 className="text-secondary">Select Domain Type</h5>
                                {/* <ul>
                                                 <li  onClick={e => this.handleClick(1)} >
                                                     <a>
                                                     <img src={textile} /></a>
                                                  
                                                     <h6> {t("TEXTILE")}</h6>
                                                    
                                                 </li>
                                                 <li  onClick={e => this.handleClick(2)}>
                                                     <a>
                                                     <img src={electrical} /></a>
                                                     <h6>ELECTRONICS</h6>
                                                 </li>
                                                 <li  onClick={e => this.handleClick(3)}>
                                                 <a>
                                                 <img src={sanitary}/></a>
                                                    <h6>SANITARY </h6>
                                                 </li>
                                                
                                             </ul> */}

                                <ul>

                                    {this.showDomains()}
                                </ul>
                            </div>
                        </ModalBody>
                    </div>

                </Modal>

                <div className="login">
                    <div className="row m-0 p-0">
                        <div className="col-sm-6 col-xs-12">
                            <div className="login-left">
                                <img className="pic" src={Logo} />
                                <div className="login-left-radio">
                                    <input

                                        type="radio"
                                        value="en" // this is te value which will be picked up after radio button change
                                        checked={this.state.value === "en"} // when this is true it show the male radio button in checked 
                                        onChange={this.handleRadioChange} // whenever it changes from checked to uncheck or via-versa it goes to the handleRadioChange function
                                    />          <span
                                        style={{ marginLeft: "5px" }} // inline style in reactjs 
                                    >English</span>

                                    <input
                                        className="leftmove"
                                        type="radio"
                                        value="tel" // this is te value which will be picked up after radio button change
                                        checked={this.state.value === "tel"} // when this is true it show the male radio button in checked 
                                        onChange={this.handleRadioChange} // whenever it changes from checked to uncheck or via-versa it goes to the handleRadioChange function
                                    />
                                    <span
                                        style={{ marginLeft: "5px" }} // inline style in reactjs 
                                    >Telugu</span>
                                    <input
                                        className="leftmove"
                                        type="radio"
                                        value="hin" // this is te value which will be picked up after radio button change
                                        checked={this.state.value === "hin"} // when this is true it show the male radio button in checked 
                                        onChange={this.handleRadioChange} // whenever it changes from checked to uncheck or via-versa it goes to the handleRadioChange function
                                    />
                                    <span
                                        style={{ marginLeft: "5px" }} // inline style in reactjs 
                                    >Hindi</span>
                                </div>

                                <label> {t("Let's explore")} <br />  {t("the world's best")}</label>
                                <p> {t("Powerful Cloud")}  <br /> {t("Retail POS System")}</p>
                                {/* <div className="retail">
            <img src={Retail}/>
            </div> */}
                                <div className="login-footer fs-12">
                                    {/* © 2021 OTSI - POS Portal | All rights reserved. */}
                                    <label> {t("copyRight")}</label>
                                </div>
                            </div>
                            {/* <div className="login-left-bgbottom"></div> */}
                        </div>

                        {/* LOGIN PAGE */}
                        {
                            this.state.isLogin && (
                                <div className="col-sm-6 col-xs-12 p-0 m-0">
                                    <div className="login-right">
                                        <div className="login-right-form select_control">

                                            {/* <h5>MEMBER LOGIN</h5> */}
                                            <h5 className=""> {t("Hey")}'<br /> {t("Login Now")} </h5>
                                            <div className="form-group m-t-2">
                                                <input type="text" className="mt-3 mb-3 form-control" value={this.state.userName} name="userName"
                                                    onChange={(e) => this.setState({ userName: e.target.value })}
                                                    autoComplete="off"
                                                    onKeyPress={this.getDropdownList}
                                                    placeholder={t("Username")} />
                                                <input type="password" className="form-control" value={this.state.password} name="password"
                                                    onChange={(e) => this.setState({ password: e.target.value })}
                                                    placeholder={t("Password")} />
                                            </div>


                                            <div>
                                                {this.getStoresDropdown()}

                                            </div>

                                            <div className="form-check checkbox-rounded checkbox-living-coral-filled pt-1 mt-3">
                                                <input type="checkbox" className="form-check-input filled-in mt-1" id="remember" />
                                                <label className="form-check-label" htmlFor="remember">{t("RememberMe")}</label>
                                            </div>
                                            <button className="btn-login_v1 mt-3" onClick={this.login}>{t("LOGIN")}</button>
                                            <p className="text-center cursor pt-3 mt-2 fs-14"
                                                htmlFor="remember" onClick={this.forgotPassword}>{t("ForgotPassowrd")}</p>


                                            <p className="text-center cursor pt-3 mt-2 fs-14"
                                                htmlFor="remember" onClick={this.showRegister}>Register</p>
                                            {/* <i className="icon-add_course fs-20 text-green"></i> */}
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        {/* FORGOT PASSWORD */}

                        {
                            this.state.isForgot && (
                                <div className="col-sm-6 col-xs-12 p-0 m-0">
                                    <div className="login-right">
                                        <div className="login-right-form select_control">
                                        <h5 className="">Update New <br/> Password </h5>
                                            <div className="form-group m-t-2">
                                                <input type="text" className="mt-3 mb-3 form-control"
                                                    autoComplete="off"
                                                    placeholder="Password" />
                                                <input type="password" className="form-control" name="password"
                                                    placeholder="Confirm Password" />
                                            </div>
                                            <button className="btn-login_v1 mt-3" onClick={this.saveForgotPassword}>Save Password</button>
                                        </div>

                                    </div>
                                </div>


                            )
                        }

                        {/* Reset Password */}
                            {
                                this.state.isChangePassword && (
                                    <div className="col-sm-6 col-xs-12 p-0 m-0">
                                    <div className="login-right">
                                        <div className="login-right-form select_control">
                                        <h5 className="">Update New <br/> Password </h5>
                                    <div className="form-group m-t-2">
                                        <input type="text" className="mt-3 mb-3 form-control" value={this.state.currentPassword} name="currentPassword"
                                            onChange={(e) => this.setState({ currentPassword: e.target.value })}
                                            autoComplete="off"
                                            placeholder="Current Password" />
                                        <input type="password" className="form-control" value={this.state.newPassword} name="newPassword"
                                            onChange={(e) => this.setState({ newPassword: e.target.value })}
                                            placeholder="New Password" />
                                  </div>
                                     <button className="btn-login_v1 mt-3" onClick={this.changePassword}>Save</button>
                                     <button className="btn-login_v1 mt-3" onClick={this.hideChangePassword}>Cancel</button>
                                    </div>
                                    </div>
                                    </div>
                                )
                            }
                        

                        {/* Register Client */}

                        {
                            this.state.isRegister && (
                                
                                    <div className="col-sm-6 col-xs-12 p-0 m-0">
                                        <div className="login-right">
                                            <div className="login-right-formreg select_control">
                                           
                                                <div className="row p-3">
                                                <h5 className="">New User <br/> Register </h5>
                                                    <div className="col-6">
                                                        <label>Name <span className="text-red font-bold">*</span></label>
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            className="form-control"
                                                            value={this.state.registerName}
                                                            onChange={(e) => this.setState({ registerName: e.target.value })}
                                                            autoComplete="off"/>
                                                        {/* <div>
                                                            <span style={{ color: "red" }}>{this.state.errors["registerName"]}</span>
                                                        </div> */}
                                                    </div>
                                                    <div className="col-6">
                                                        <label>Organisation</label>
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            className="form-control"
                                                            value={this.state.registerOrganisation}
                                                            onChange={(e) => this.setState({ registerOrganisation: e.target.value })}
                                                            autoComplete="off"
                                                        />

                                                    </div>

                                                    <div className="col-6">
                                                        <label>Mobile <span className="text-red font-bold">*</span></label>
                                                        <input
                                                            type="text"
                                                            name="mobile"
                                                            className="form-control"
                                                            maxLength="10"
                                                            minLength="10"
                                                            value={this.state.registerMobile}
                                                            onChange={this.validation}
                                                            autoComplete="off"
                                                        />
                                                        {/* <div>
                                                            <span style={{ color: "red" }}>{this.state.errors["registerMobile"]}</span>
                                                        </div> */}

                                                    </div>

                                                        <div className="col-6">
                                                        <label>Email <span className="text-red font-bold">*</span></label>
                                                        <input
                                                            type="text"
                                                            name="email"
                                                            className="form-control"
                                                            value={this.state.registerEmail}
                                                            onChange={this.emailValidation}
                                                            autoComplete="off"
                                                        />
                                                        {/* <div>
                                                            <span style={{ color: "red" }}>{this.state.errors["registerEmail"]}</span>
                                                        </div> */}

                                                    </div>

                                                    <div className="col-12">
                                                        <label>Address</label>
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            className="form-control"
                                                            value={this.state.registerAddress}
                                                            onChange={(e) => this.setState({ registerAddress: e.target.value })}
                                                            autoComplete="off"
                                                        />

                                                    </div>
                                                    
                                                    <div class="col d-flex">
                                                    <button className="btn-login_v1 mt-3 m-r-2" onClick={this.registerClient}>Save</button>
                                                    <button className="btn-login_v1 mt-3" onClick={this.hideRegister}>Cancel</button>

                                                     </div>   



                                                </div>

                                                </div>

                                            </div>
                                        </div>
                                
                            )
                        }


                    </div>
                    {/* <ToastContainer /> */}
                </div>
            </div>

        )
    }
}
export default withRouter(withTranslation()(Login));
