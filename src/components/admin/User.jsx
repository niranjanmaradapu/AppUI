import React, { Component } from 'react';
import edit from '../../assets/images/edit.svg';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import Multiselect from 'multiselect-react-dropdown';
import URMService from '../../services/URM/URMService';



export default class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            showCreate: false,
            name: "",
            dob: "",
            gender: "",
            mobileNumber: "",
            address: "",
            email: "",
            storeName: [],
            role: "",
            isUser: false,
            usersList: [],
            storesList: [],
            rolesList: [],
            domainsList: [],
            domain: "",
            isSuperAdmin: false,
            selectedPrivilages: null,
            isAddStore: false,
            selectedStoresList: [],
            clientId: "",
            loggedInUser: "",
            copyStoresList: [],
            isLoggedUser: false,
            isAdmin: false,
            userName:"NA",
            isEdit: false,
            userId: "",
            usersList1: [],
            errors: {},
            adminRole: "",
            userType:""


        }

        this.setState({usersList: []})

        this.showCreateUser = this.showCreateUser.bind(this);
        this.hideCreateUser = this.hideCreateUser.bind(this);
        this.createUser = this.createUser.bind(this);
        this.hideUser = this.hideUser.bind(this);
        this.addCreateUser = this.addCreateUser.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.closeStores = this.closeStores.bind(this);
        this.addStores = this.addStores.bind(this);
        this.getAllStoresList = this.getAllStoresList.bind(this);
        this.getAllRolesList = this.getAllRolesList.bind(this);
        this.getDomainsList = this.getDomainsList.bind(this);
        this.validation = this.validation.bind(this);
        this.emailValidation = this.emailValidation.bind(this);
        this.getDomainValue = this.getDomainValue.bind(this);
        this.searchUser = this.searchUser.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.handleValidation = this.handleValidation.bind(this);

    }

    getDomainsList() {
        URMService.getDomainsList(this.state.clientId).then((res) => { 
            if(res) {
                this.setState({domainsList: res.data.result, domain: res.data.result[0].clientDomainaId});
                this.getAllStoresList();
                this.getAllRolesList();
            }
           
        });

        this.getUsers();
    }

    validation(e){

        this.setState({
                        [e.target.id]: e.target.value, mobileNumber:  e.target.value
                        });
      
    //   //  const regex = /^[0-9\b]+$/;
    //     const value = e.target.value;
    //     if (value === '' || regex.test(value)) {
    //         this.setState({
    //             [e.target.id]: e.target.value, mobileNumber:  e.target.value
    //             });
    //     } else {
    //         // toast.error("pls enter numbers")
    //     }
       
          
       }

       emailValidation(e){
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{4,})$/i;
        const value = e.target.value;
        if(!value || regex.test(value) === false) {
            this.setState({
                [e.target.id]: e.target.value, email:  e.target.value
                });
        } else {
            // toast.error("pls enter numbers")
        }
       
          
       }

    // emailValidation(){
    //     const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    //     if(!this.state.email || regex.test(this.state.email) === false){
    //         this.setState({
    //             error: "Email is not valid"
    //         });
    //         return false;
    //     }
    //     return true;
    // }

    showCreateUser() {
        this.setState({ showModal: true,isSearch: false, isSuperAdmin: false });
       
        this.setState({
            name: "",
            dob: "",
            gender: "",
            mobileNumber: "",
            address: "",
            email: "",
            isEdit: false,
            errors: {}, 

        });
        this.getDomainsList();
    }

    searchUser() {
        this.setState({isSearch: true});
        const obj = {
            "id":"",
            "phoneNo":"",
            "name":"",
            "active":this.state.userType === "Active" ? true : false,
            "inActive":this.state.userType === "InActive" ? true : false,
            "roleId": this.state.searchRole,
            "storeId": this.state.searchStore
            }

            URMService.getUserBySearch(obj).then(res => {
                console.log(res);
                if(res) {
                    this.setState({usersList: res.data.result, isUser: true});
                }
            })
    }

    getAllStoresList() {
        URMService.getStoresByDomainId(this.state.domain).then((res) =>{
            if(res) {
               this.setState({storesList: res.data.result, storeName: []});
             // this.state.storesList = res.data.result;
            }
        }); 
    }

    getAllRolesList() {
        URMService.getRolesByDomainId(this.state.domain).then((res) =>{
            if(res) {
                 this.setState({rolesList: res.data.result,
                     role: res.data.result[0].roleName});

                // this.state.rolesList =  res.data.result;
                // this.state.role = res.data.result[0].roleName;
            }
           
         }); 
    }



    // checkRole() {
    //     if (this.state.rolesList && this.state.rolesList.length > 0) {
    //         this.state.rolesList.forEach((ele, index) => {
    //             if (this.state.role === ele.role) {
    //                 this.state.selectedPrivilages = ele;
    //                 // sessionStorage.setItem("selectedPrivilages", ele);
    //             }
    //         });
    //     }
    //     if (this.state.role === 'super_admin') {
    //         // this.state.isSuperAdmin = true;

    //         this.setState({ isSuperAdmin: true, storeName: "", domain: "" });
    //     } else {
    //         this.setState({
    //             isSuperAdmin: false,
    //             storeName: this.state.storesList[0].storeName,
    //             domain: this.state.domainsList[0].domain
    //         });
    //     }
    // }

    hideCreateUser() {
        this.setState({ showModal: false });
    }

    createUser() {
        this.setState({ showCreate: true });
    }

    hideUser() {
        this.setState({ showCreate: false });
    }

    componentWillMount() {
        const user = JSON.parse(sessionStorage.getItem('user'));
        this.setState({userName : user["cognito:username"], isEdit: false });
        if(user) {
            this.setState({ clientId: user["custom:clientId1"],
            domainId: user["custom:domianId1"] }, () => {this.getDomainsList();});
            
        }
       
       
    }

    getUsers() {
        if(this.state.isSearch) {
            this.state.searchStore = "";
            this.state.userType = "";
            this.state.searchRole = "";
        }
        URMService.getUsers(this.state.clientId).then(res => {
            console.log(res);
            if(res) {
               this.setState({usersList: res.data.result,isUser: true });
            // //    this.setState({usersList: res.data.result});
            //    //this.state.isUser = true;
            //  // this.state.usersList = res.data.result;
            // //  this.setState({usersList1: this.state.usersList});
            //   this.state.isUser = true;
              
            }
        });
    }

    editUser(items) { 
        console.log(items);
        const obj = {
            "id":items.userId,
            "phoneNo":"",
            "name":"",
            "active":false,
            "inActive":false,
            "roleId": "",
            "storeId": ""
            }
        URMService.getUserBySearch(obj).then(res=> {
            console.log(res);
            if(res) {
                const userDetails = res.data.result[0];
                this.setState({
                    showModal: true,
                    name: userDetails.userName,
                    dob:  items.dob,
                    gender: userDetails.gender,
                    mobileNumber: userDetails.phoneNumber,
                    email: items.email,
                    address: items.address,
                    isAdmin: items.superAdmin,
                    domain: userDetails.clientDomians[0]?.clientDomainaId, 
                    role: userDetails.role?.roleName,
                    storeName: userDetails.stores,
                    isEdit: true,
                    isSearch: false,
                    userId: items.userId,
                }, () => {
                   // this.getAllRolesList();
                    this.setState({isSuperAdmin: this.state.isAdmin })
                });
        
            }
          

        });

        
    }


    handleValidation() {
        let errors = {};
        let formIsValid = true;

        //Name
        if (!this.state.name) {
            formIsValid = false;
            errors["name"] = "Enter name";
        }

       


        // Mobile
        if (!this.state.mobileNumber) {
            formIsValid = false;
            errors["mobileNumber"] = "Enter phone Number";
        }

        // if (typeof this.state.mobileNumber !== "undefined") {
        //     if (!this.state.mobileNumber.match(/^[0-9\b]+$/)) {
        //         formIsValid = false;
        //         errors["mobileNumber"] = "Please Enter Valid Mobile Number";
        //     }
        // }

        //email 
        if (!this.state.email) {
            formIsValid = false;
            errors["email"] = "Enter email";
        }

        // if (typeof this.state.email !== "undefined") {

        //     if (!this.state.email.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{4,})$/i)) {
        //         formIsValid = false;
        //         errors["email"] = "Please Enter Valid Email";
        //     }

        // }


        this.setState({ errors: errors });
        return formIsValid;

    }

    addCreateUser() {
        const formValid = this.handleValidation();
         if (formValid) {
        const user = sessionStorage.getItem('domainName');
        const clientDomain = this.state.domain !== "" ? this.state.domain : this.state.clientId;
        let saveObj; 
        if(this.state.isEdit) {
            saveObj = {
                "userId": this.state.userId,
                "email":this.state.email,	
                "phoneNumber": "+91".concat(this.state.mobileNumber),
                "birthDate": this.state.dob,
                "gender":this.state.gender,
                "name":this.state.name,
                "username":this.state.name,
                "assginedStores":"kphb",
                "parentId":"1",
                "domianId": this.state.domain,
                "address": this.state.address,
                "role":{
                    "roleName": this.state.role,
                },
                "roleName": this.state.role,
                "stores": this.state.storeName,
                "clientId": this.state.clientId,
                "isConfigUser": "false",
                "clientDomain": [clientDomain],
                "isSuperAdmin": JSON.stringify(this.state.isAdmin),
                "createdBy" : this.state.userName
            }
            URMService.editUser(saveObj).then((response) => {
                if(response) {
                    toast.success("User Created Successfully");
                    this.getDomainsList();
                    this.hideCreateUser();
                    
                }
            });
            
        } else {
            saveObj = {
                "email":this.state.email,	
                "phoneNumber": "+91".concat(this.state.mobileNumber),
                "birthDate": this.state.dob,
                "gender":this.state.gender,
                "name":this.state.name,
                "username":this.state.name,
                "assginedStores":"kphb",
                "parentId":"1",
                "domianId": this.state.domain,
                "address": this.state.address,
                "role":{
                    "roleName": this.state.isAdmin ? this.state.adminRole:  this.state.role,
                },
                "roleName":  this.state.isAdmin ? this.state.adminRole:  this.state.role,
                "stores": this.state.storeName,
                "clientId": this.state.clientId,
                "isConfigUser": "false",
                "clientDomain": [clientDomain],
                "isSuperAdmin": JSON.stringify(this.state.isAdmin),
                "createdBy" : this.state.userName
    
                }

                URMService.saveUser(saveObj).then((response) => {
                    if(response) {
                        toast.success("User Created Successfully");
                        this.getDomainsList();
                        this.hideCreateUser();
                        
                    }
                });
                
    
        }
    } else {
        toast.info("Please Enter all mandatory fields");
    }
       
          
        // this.state.usersList.push(obj);
        // this.setState({ isUser: true });
        // sessionStorage.setItem("usersList", JSON.stringify(this.state.usersList));
        // toast.success("Users Created Successfully");
        // this.hideCreateUser();
    }

    

    getTableData() {
        return this.state.usersList.map((items, index) => {
            const {userId, userName, roleName, stores, createdDate } = items;
            return (

                <tr className="" key={index}>
                    <td className="col-1">{userId}</td>
                    <td className="col-2">{userName}</td>
                    {/* <td className="col-2">{email}</td> */}
                    <td className="col-1">{roleName}</td>
                    <td className="col-3">
                     {
                         stores?.map((store,index) => {
                             return(
                                 <div key={index}>{store.name}</div>
                             )
                         })
                     }
                    </td>
                    <td className="col-2">{createdDate}</td>
                    {/* <td className="col-1">{address}</td> */}
                    <td className="col-1"><button type="button" className="btn-active">Active</button></td>
                    <td className="col-1">
                        <img src={edit} className="w-12 m-r-2 pb-2" onClick={(e) => this.editUser(items)} />
                        <i className="icon-delete"></i></td>
                </tr>


            );
        });
    }

    getUserTable() {
        return this.state.isUser && (
            <div>
                <div className="col-sm-12 col-12 scaling-center scaling-mb mt-3">
                    <h5>List Of Users</h5>
                </div>
                <div className="table-responsive p-0">
                <table className="table table-borderless mb-1 mt-2">
                    <thead>
                        <tr className="m-0 p-0">
                            <th className="col-1">User ID </th>
                            <th className="col-2">User Name</th>
                            {/* <th className="col-2">Email</th> */}
                            <th className="col-1">Role</th>
                            <th className="col-3">Store Name</th>
                            <th className="col-2">Created Date</th>
                            {/* <th className="col-1">Store</th> */}
                            <th className="col-1">Status</th>
                            <th className="col-1"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getTableData()}



                    </tbody>
                </table>
                </div>
            </div>
        )
    }

    onSelect(selectedList, selectedItem) {
        this.setState({ storeName: selectedList });
    }

    onRemove(selectedList, removedItem) {
        this.setState({ storeName: selectedList });
    }

    setRoles = (e) => {
        this.setState({ role: e.target.value });
    }

    addStores() {
        
        this.state.storesList.forEach(ele => {
           const obj = {
               id: ele.id,
               name: ele.name
           }
           this.state.copyStoresList.push(obj);
        });
        this.setState({isAddStore: true});
    }

    closeStores() {
        this.setState({isAddStore: false});
    }


    setStoresList(e, value, storeName) {
        if (e.target.checked) {
           this.state.storesList[value].isCheck = e.target.checked;
           const obj = {
               "storeName": storeName
           }
           this.state.selectedStoresList.push(obj);
        } else {
            this.state.storesList[value].isCheck = e.target.checked;
            let index = this.state.selectedStoresList.findIndex(ele => ele.storeName === storeName);
            this.state.selectedStoresList.splice(index, 1);
        }
        this.selectedStoresList = this.removeDuplicates(this.state.selectedStoresList, "storeName");
        this.setState({ selectedStoresList: this.state.selectedStoresList });
        this.setState({ storesList: this.state.storesList });
    }

    setSuperAdmin(e) {
       
        
        if(e.target.checked) {
          //  this.setState({domain: "", storeName: [], role: ""})
          this.state.domain = "";
          this.state.storeName = [];
          this.state.domainsList = [];
          this.state.rolesList = [];
          this.state.role = "";
          this.getPrivilegesByDomainId()
        } else {
            this.getDomainsList();
        }

        console.log(this.state.domain);
        this.setState({isAdmin: e.target.checked, isSuperAdmin: e.target.checked });
    }

    getPrivilegesByDomainId() {
        URMService.getAllPrivilegesbyDomain(0).then(res => {
            if(res) {
              this.setState({adminRole: res.data.result[0].name });
            }
          });

    }




    
     removeDuplicates(array, key) {
            const lookup = new Set();
            return array.filter(obj => !lookup.has(obj[key]) && lookup.add(obj[key]));
          } 


    getStoresList() {
        return this.state.storesList &&  this.state.storesList.map((items, index) => {
            const { name, isCheck } = items;
            return (
                <tr className="row m-0 p-0" key={index}>
                    <td className="col-1">{index + 1}</td>
                    <td className="col-4">{name}</td>
                    <td className="col-1">
                        <div className="form-check checkbox-rounded checkbox-living-coral-filled pointer fs-15">
                          <input type="checkbox" className="form-check-input filled-in mt-1" id="remember{{index}}"  
                            name="barcodes{{index}}" checked={isCheck}
                            onChange={(e) => this.setStoresList(e, index, name)}/>
                          <label className="form-check-label" htmlFor="remember{{index}}"></label>
                        </div>
                    </td>
                </tr>
            );
        });
    }

    getDomainValue = (e) => {
        this.setState({domain: e.target.value, storesList:[], rolesList:[] }, () => {
            this.getAllStoresList();
                this.getAllRolesList();
        });
}


    render() {
        let storesList;
        let rolesList;
        let domainsList;
        if (this.state.storesList && this.state.storesList.length > 0) {
            const modules = this.state.storesList;
            storesList = modules.length > 0
                && modules.map((item, i) => {
                    return (

                        <option key={i} value={item.id}>{item.name}</option>
                    )
                }, this);
        }

        if (this.state.rolesList && this.state.rolesList.length > 0) {
            const modules = this.state.rolesList;
            rolesList = modules.length > 0
                && modules.map((item, i) => {
                    return (

                        <option key={i} value={item.roleName}>{item.roleName}</option>
                    )
                }, this);
        }

        if (this.state.domainsList && this.state.domainsList.length > 0) {
            const modules = this.state.domainsList;
            domainsList = modules.length > 0
                && modules.map((item, i) => {
                    return (

                        <option key={i} value={item.clientDomainaId}>{item.domaiName}</option>
                    )
                }, this);
        }


        return (
            <div className="maincontent">

                <Modal isOpen={this.state.isAddStore} size="lg">
                    <ModalHeader>Add Store</ModalHeader>
                    <ModalBody>
                        <div className="maincontent p-0">
                        <div className="table-responsive p-0">
                            <table className="table table-borderless">
                                <thead>
                                    <tr className="row m-0 p-0">
                                        <th className="col-1 pt-1">S.No</th>
                                        <th className="col-4 pt-1">Store Name</th>
                                        <th className="col-1 pt-1"></th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {this.getStoresList()}
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn-unic" onClick={this.closeStores}>
                            Cancel
                        </button>
                        <button
                            className="btn-unic active fs-12"
                            onClick={this.closeStores}
                        >
                            Save
                        </button>
                    </ModalFooter>
                </Modal>

             

                <Modal isOpen={this.state.showModal} size="lg">
                    <ModalHeader>
                        {
                            !this.state.isEdit && (
                                <div>
                                     Add User
                                    </div>
                               
                            )
                        }
                        {
                            this.state.isEdit && (
                                <div>
                                Edit User
                                    </div>
                               
                            )
                        }
                        </ModalHeader>
                    <ModalBody>
                        <div className="p-3">
                            <h5 className="fs-14 text-red scaling-center scaling-mb">User Details</h5>
                            <div className="row">
                                <div className="col-12 col-sm-4 scaling-mb">
                                    <div className="form-group">
                                        <label>Name <span className="text-red font-bold">*</span></label>
                                        <input type="text" className="form-control" placeholder="Enter Name"
                                            value={this.state.name}
                                            onChange={(e) => this.setState({ name: e.target.value })}
                                            autoComplete="off" />
                                             <div>
                                            <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-12 col-sm-4 scaling-mb">
                                    <div className="form-group">
                                        <label>DOB </label>
                                        <input type="date" className="form-control"
                                            value={this.state.dob}
                                            onChange={(e) => this.setState({ dob: e.target.value })}
                                            autoComplete="off" />
                                    </div>
                                </div>
                                <div className="col-12 col-sm-4">
                                    <div className="form-group">
                                        <label>Gender </label>
                                        <select className="form-control" value={this.state.gender}
                                            onChange={(e) => this.setState({ gender: e.target.value })}
                                        >
                                            <option>Select</option>
                                            <option>Male</option>
                                            <option>Female</option>
                                            
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-4 mt-3">
                                    <div className="form-group">
                                        <label>Mobile <span className="text-red font-bold">*</span></label>
                                        <input type="text" className="form-control" placeholder="+91 "
                                            value={this.state.mobileNumber} maxLength="10" minLength="10"
                                            onChange={this.validation}
                                            autoComplete="off" />
                                             <div>
                                            <span style={{ color: "red" }}>{this.state.errors["mobileNumber"]}</span>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-12 col-sm-4 mt-3">
                                    <div className="form-group">
                                        <label>Email <span className="text-red font-bold">*</span></label>
                                        <input type="email" className="form-control" placeholder="sample@gmail.com"
                                            value={this.state.email}
                                            onChange={this.emailValidation}
                                            autoComplete="off" />
                                             <div>
                                            <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                                        </div>

                                    </div>
                                </div>

                                <div className="col-12 col-sm-4 mt-3">
                                    <div className="form-group">
                                        <label>Address</label>
                                        <input type="text" className="form-control" placeholder="Enter Address"
                                            value={this.state.address}
                                            onChange={(e) => this.setState({ address: e.target.value })}
                                            autoComplete="off" />
                                    </div>
                                </div>

                                {/* <div className="col-3">
                            <div className="form-group mt-3 pt-2">
                                <button className="btn-login btn-create">Apply Filters </button>
                            </div>
                        </div> */}
                                <hr />
                            </div>

                            <div className="row">
                                <div className="col-12 col-sm-12 scaling-center scaling-mb">
                                    <h5 className="text-red fs-14">User Permissions</h5>
                                </div>
                                {/* <div className="col-4">
                                 <div className="form-group">
                                <label>User Type</label>
                                <select className="form-control"  value={this.state.userType}
                                onChange={(e) => this.setState({ userType: e.target.value })}
                                >
                                        <option>Select User Type</option>
                                    </select>
                        </div>
                        </div> */}
                             <div className="col-12 col-sm-12">
                             <div className="form-check checkbox-rounded checkbox-living-coral-filled pt-1">
                                        <input type="checkbox" className="form-check-input filled-in mt-1" id="admin" name="superadmin" value={this.state.isAdmin} 
                                      onChange={(e) => this.setSuperAdmin(e)}/>
                                        <label className="form-check-label" htmlFor="remember">Is Super Admin</label>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-4 scaling-mb">
                                    <div className="form-group">
                                        <label>Domain</label>
                                        {/* <select className="form-control" value={this.state.role}
                                            onChange={(e) => this.setState({ role: e.target.value })}>
                                            <option>Select Role</option>
                                            <option>Sales Executive</option>
                                            <option>Store Manager</option>
                                        </select> */}
                                        <select className="form-control" value={this.state.domain}
                                         disabled={this.state.isSuperAdmin}
                                            onChange={this.getDomainValue}>

                                            {domainsList}
                                        </select >
                                    </div>
                                </div>
                                <div className="col-12 col-sm-4 scaling-mb">
                                    <div className="form-group">
                                    <label>Store</label>
                                        {/* <button className="btn-unic-search active m-r-2 mt-4" onClick={this.addStores}>Add Store </button> */}



                                        {/* <label>Store</label> */}

                                        {/* <select className="form-control" value={this.state.storeName}
                                            onChange={(e) => this.setState({ storeName: e.target.value })}>
                                            <option>Select Store</option>
                                            <option>KPHB 9th Phase</option>
                                            <option>Nizampet X Road</option>
                                        </select> */}
                                        {/* <select className="form-control" value={this.state.storeName} 
                                        disabled={this.state.isSuperAdmin}
                                            onChange={(e) => this.setState({ storeName: e.target.value })}>

                                            {storesList}
                                        </select > */}



                                        <Multiselect
                                        className="form-control m-t-5 p-3 fs-14"
                                            options={this.state.storesList} // Options to display in the dropdown
                                            selectedValues={this.state.storeName} // Preselected value to persist in dropdown
                                            onSelect={this.onSelect} // Function will trigger on select event
                                            onRemove={this.onRemove}
                                            disabled={this.state.isSuperAdmin}
                                            placeholder="Select Store" 
                                            displayValue="name" // Property name to display in the dropdown options
                                        />








                                    </div>
                                </div>
                                <div className="col-12 col-sm-4 scaling-mb">
                                    <div className="form-group">
                                        <label>Role</label>
                                        {/* <select className="form-control" value={this.state.role}
                                            onChange={(e) => this.setState({ role: e.target.value })}>
                                            <option>Select Role</option>
                                            <option>Sales Executive</option>
                                            <option>Store Manager</option>
                                        </select> */}
                                        <select className="form-control" value={this.state.role}  
                                         disabled={this.state.isSuperAdmin}
                                            onChange={this.setRoles}>
                                                
                                            {rolesList}
                                        </select >
                                    </div>
                                </div>

                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn-unic" onClick={this.hideCreateUser}>Cancel</button>
                        <button className="btn-unic active fs-12" onClick={this.addCreateUser}>Add User</button>
                    </ModalFooter>
                </Modal>
                <div className="row">
                    <div className="col-12 col-sm-3 mt-2">
                        <div className="form-group">
                            <select className="form-control"  onChange={(e) => this.setState({ userType: e.target.value })}>
                                <option>Select User Type</option>
                                <option>Active</option>
                                <option>InActive</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-sm-3 mt-2">
                        <div className="form-group">
                        <input type="text" className="form-control" placeholder="Role" value={this.state.searchRole}
                                onChange={(e) => this.setState({ searchRole: e.target.value })} />
                        </div>
                    </div>
                    <div className="col-12 col-sm-3 mt-2">
                        <div className="form-group">
                        <input type="text" className="form-control" placeholder="Store/Branch" value={this.state.searchStore}
                                onChange={(e) => this.setState({ searchStore: e.target.value })} />
                        </div>
                    </div>
                    <div className="col-12 scaling-center scaling-mb col-sm-3 mt-2 p-l-0">
                        <button className="btn-unic-search active m-r-1" onClick={this.searchUser}>Search </button>
                        <button className="btn-unic-search active m-r-1" onClick={this.getUsers}>Clear </button>
                        <button className="btn-unic-search active" onClick={this.showCreateUser}><i className="icon-create_customer"></i> Add User </button>
                    </div>

                    {/* <div className="col-6 text-right mb-1">
                        <button type="button" className="btn-nobdr" onClick={this.showCreateUser}>
                            <i className="icon-create_customer mr-1"></i> Create User</button>
                    </div> */}
                </div>
                <div>
                    {this.getUserTable()}
                </div>

            </div>
        )
    }
}
