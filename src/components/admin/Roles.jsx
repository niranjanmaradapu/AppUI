import React, { Component } from 'react';
import edit from '../../assets/images/edit.svg';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import URMService from '../../services/URM/URMService';
import TreeView from 'react-treeview';
import 'react-treeview/react-treeview.css'


export default class Roles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            showRole: false,
            roleName: "",
            descriptionName: "",
            selectedPrivilegesList: [],
            userName: "",
            isRole: false,
            rolesList: [],
            domainList: [],
            domain: "",
            productsList: [],
            productTreeList: [],
            parentsList: [],
            childList: [],
            errors:{},
            isAdmin: false,
            isSuperAdmin: false


        }
        this.baseState = this.state;
        this.showRoles = this.showRoles.bind(this);
        this.hideRoles = this.hideRoles.bind(this);
        this.createRole = this.createRole.bind(this);
        this.hide = this.hide.bind(this);
        this.setPrivileges = this.setPrivileges.bind(this);
        this.getRoleTable = this.getRoleTable.bind(this);
        this.addedRoles = this.addedRoles.bind(this);
        this.addRoles = this.addRoles.bind(this);
        this.searchRoles = this.searchRoles.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.getAllRoles = this.getAllRoles.bind(this);
    }



    getDomainsList() {
        URMService.getDomainsList(this.state.clientId).then((res) => {
            if (res) {
                this.setState({ domainList: res.data.result, domain: res.data.result[0].clientDomainaId }, this.getPrivilegesByDomainId());
            }

        });

    }

    getAllRoles() {
        URMService.getAllRoles(this.state.clientId).then((res) => {
            if (res) {
                this.setState({ rolesList: res.data.result, isRole: true });
            }
        });
        this.getDomainsList();
    }

    searchRoles() {
        const searchRole = {
            "roleName": this.state.searchRole,
            "createdBy": this.state.searchCreatedby,
            "createdDate": this.state.searchCreatedDate
        }

        URMService.getRolesBySearch(searchRole).then(res => {
            if(res) {
                this.setState({ rolesList: res.data.result, isRole: true })
            }
        });
    }

    componentWillMount() {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (user) {
            this.setState({ clientId: user["custom:clientId1"], userName: user["cognito:username"] },
                () => { this.getAllRoles(); })
        }

    }


    
    handleValidation() {
        let errors = {};
        let formIsValid = true;
    
        //Name
        if (!this.state.roleName) {
          formIsValid = false;
          errors["roleName"] = "Enter Role Name";
        }
    
     
    
        // Area 
        if (!this.state.descriptionName) {
            formIsValid = false;
            errors["descriptionName"] = "Enter Description";
          }
      
         
          //Domain 
          if (!this.state.domain) {
            formIsValid = false;
            errors["domain"] = "Enter Domain";
          }
      
    
        this.setState({ errors: errors });
        return formIsValid;
    
        }


    showRoles() {
        //    this.setState(this.baseState);
        this.setState({ showModal: true,isAdmin: false, isSuperAdmin:false,  isEdit: false, errors: {}, selectedPrivilegesList: [] });
        if (this.state.domainList && this.state.domainList.length > 0) {
            this.setState({ domain: this.state.domainList[0].clientDomainaId }, ()=>{
                this.getPrivilegesByDomainId();
            });
        }
        this.setState({showModal: true,
            roleName: "",
            
            descriptionName: "",
            childList: [],
            parentsList: [],
            roleId: ""
        });
    }

    hideRoles() {
        this.setState({ showModal: false });
    }


    removeDuplicates(array, key) {
        const lookup = new Set();
        return array.filter(obj => !lookup.has(obj[key]) && lookup.add(obj[key]));
    }

    addRoles() {
       // const roleId = 
       const formValid = this.handleValidation();
        if(formValid) {
       if(this.state.isEdit) {
        const saveObj = {
            "roleName": this.state.roleName,
            "description": this.state.descriptionName,
            "clientDomianId": parseInt(this.state.domain),
            "createdBy": this.state.userName,
            "parentPrivilages": this.state.parentsList,
            "subPrivillages": this.state.childList,
            "roleId": this.state.roleId
        }

        URMService.editRole(saveObj).then((res) => {
            if (res) {
                toast.success(res.data.result);
                this.getAllRoles()
                this.hideRoles();
            }
        });
       } else {
        const saveObj = {
            "roleName": this.state.roleName,
            "description": this.state.descriptionName,
            "clientDomianId": parseInt(this.state.domain),
            "createdBy": this.state.userName,
            "parentPrivilages": this.state.parentsList,
            "subPrivillages": this.state.childList,
        }

        URMService.saveRole(saveObj).then((res) => {
            if (res) {
                toast.success(res.data.result);
                this.getAllRoles()
                this.hideRoles();
            }
        });
       }
    } else {
        toast.info("Please Enter all mandatory fields");
    }
       
    }

    getPrivilegesByDomainId() {
        let selectedDomainId =0;
        this.state.domainList.forEach((ele, index) => {
            if(ele.clientDomainaId === parseInt(this.state.domain)) {
                if(ele.domaiName === "Textile") {
                    selectedDomainId = 1;
                } else if(ele.domaiName === "Retail") {
                    selectedDomainId = 2;
                } 
            }
        });


        URMService.getAllPrivilegesbyDomain(selectedDomainId).then(res => {
            if(res) {
                this.setState({ productsList: res.data.result });
                this.state.productsList.forEach((element, index) => {
                    element.subPrivillages.forEach((child,index) =>{
                        child.checked = false;
                    });
                });

                console.log(this.state.productsList);
                this.getSelectedPrivileges(this.state.parentsList, this.state.childList);
            }
          });

    }

    createRole() {
        // this.state.PrivilegesList.forEach((ele,index) =>{
        //     ele.isCheck = false;
        // });
        this.setState({ showRole: true});
        this.getPrivilegesByDomainId();
        // if(this.state.parentsList.length > 0) {
        //     this.getSelectedPrivileges(this.state.parentsList, this.state.childList);
        // } else {
        //     this.getPrivilegesByDomainId();
        // }

        // URMService.getAllPrivileges().then(res => {
        //     if (res) {
        //        // this.setState({ productsList: res.data.result });

        //         //   this.setState({productsList:   { ...products [0] }, productTreeList: products});



        //     }

        // });
    }

    hide() {
        this.setState({ showRole: false });
    }

    setPrivileges(e, value, selectedNode, selectedChild) {
        selectedChild.checked = e.target.checked;

        if (e.target.checked) {
            const obj = {
                id: selectedNode.id,
                name: selectedNode.name
            }
            this.state.parentsList.push(obj);
            this.state.childList.push(selectedChild);



        } else {
            let index = this.state.parentsList.findIndex(ele => ele.name === selectedNode.name);
            this.state.parentsList.splice(index, 1);

            // Removing childs
            let index1 = this.state.childList.findIndex(ele => ele.name === selectedChild.name);
            this.state.childList.splice(index1, 1);

        }

        const parentsList = this.removeDuplicates(this.state.parentsList, "name");
        this.setState({ parentsList: parentsList });
        this.setState({ childList: this.state.childList });

        //   this.setState({ parentsList: this.state.parentsList })
        this.setState({ PrivilegesList: this.state.PrivilegesList });

     //   this.getSelectedPrivileges(this.state.parentsList, this.state.childList);

    }

    getSelectedPrivileges(parentsList, childList) {
        if(parentsList.length > 0) {
            console.log(this.state.domainList);
            this.state.productsList.forEach((product,index) =>{
                product.subPrivillages.forEach(subPrivilage =>{
                    childList.forEach((child,index)=>{
                        if(subPrivilage.id === child.id) {
                            subPrivilage.checked  = true;
                        }
                    });
                });
                
            });
        }

    //     let productsList =[];
    //     parentsList.forEach((parent,index) => {
    //         let subPrivileges = [];
    //         childList.forEach((child,index) => {
    //             let updateSubPrivilege;
    //             if(parent.id === child.parentPrivillageId) {
    //                 child.checked = true;
    //                 subPrivileges.push(child);
    //                // childList.splice(child, index);
    //             }
                
    //             updateSubPrivilege = this.removeDuplicates(subPrivileges, "name");
    //             console.log(updateSubPrivilege);

    //         });

    //         const obj = {
    //             "createdBy": parent.createdBy,
    //             "createdDate": parent.createdDate,
    //             "description": parent.description,
    //             "domian": parent.domian,
    //             "id": parent.id,
    //             "lastModifyedDate": parent.lastModifyedDate,
    //             "name": parent.name,
    //             "parentImage": parent.parentImage,
    //             "path": parent.path,
    //             "subPrivillages": subPrivileges
    //         }
    //         productsList.push(obj);
            

           
    //     });

    //   //  this.setState({productsList: productsList });
    //   this.state.productsList = productsList;
    //     console.log(this.state.productsList);
    }

    getPrivilegesList() {

        return this.state.productsList.map((node, i) => {
            const parentName = node.name;
            const label = <span className="node">{parentName}</span>
            return (
                <TreeView
                    key={parentName + "|" + i}
                    nodeLabel={label}
                    defaultCollapse={false}
                >
                    {
                        node.subPrivillages.map((child) => {
                            return (
                                <div>
                                    <div className="form-check checkbox-rounded checkbox-living-coral-filled pointer fs-15">
                                        <input type="checkbox" className="form-check-input filled-in mt-1" id="remember{{index}}"
                                            name="child{{i}}"  checked={child.checked}
                                            onChange={(e) => this.setPrivileges(e, i, node, child)} />
                                        <label className="form-check-label" htmlFor="remember">  {child.name}</label>

                                    </div>
                                </div>
                            );
                        })
                    }

                </TreeView>

            );

        });


    }

    getAddedRoles() {

        return this.state.childList.map((items, index) => {
            const { name, description } = items;
            return (
                <tr className="">
                    <td className="col-3 geeks">{name}</td>
                    <td className="col-5">{description}</td>
                </tr>
            );
        });



    }

    addedRoles() {
        return this.state.childList.length > 0 && (
            <div>
                <div className="row mt-3">
                    <h6 className="text-red mb-2 fs-14"></h6>
                </div>
                <table className="table table-borderless mb-0">
                    <thead>
                        <tr className="">
                            <th className="col-3">Privileges</th>
                            <th className="col-5">Description</th>
                        </tr>
                    </thead>
                </table>
                <table className="table table-borderless gfg mb-0">
                    <tbody>
                        {/* <tr className="">
                            <td className="col-3 geeks">Super Admin</td>
                            <td className="col-5">He can access only billing</td>
                            
                        </tr> */}
                        {this.getAddedRoles()}
                    </tbody>
                </table>
            </div>
        )
    }

    editRole(items) {
       console.log(items);
        this.setState({showModal: true,
            roleName: items.roleName,
            isEdit : true,
            descriptionName: items.discription,
            childList: items.subPrivilages,
            parentsList: items.parentPrivilages,
            roleId: items.roleId,
            domain: items.clientDomian.clientDomainaId
        }, ()=>{
            this.getPrivilegesByDomainId();
        });

        // items.parentPrivilages.forEach((parent,index) => {
        //     let subPrivileges = [];
        //     items.subPrivilages.forEach((child,index) => {
        //         if(parent.id === child.parentPrivillageId) {
        //             subPrivileges.push(child);
        //             items.subPrivilages.splice(child, index);
        //         }
        //         console.log("subPrivlege",subPrivileges);
        //     });
        // });

      
        
    }

    getRoleTable() {
        return this.state.rolesList.map((items, index) => {
            const { roleName, createdBy, createdDate, discription } = items;
            return (
                // <tr className="">
                //     <td className="col-3 geeks">{privilege}</td>
                // </tr>
                <tr className="">
                    <td className="col-1 geeks">{index + 1}</td>
                    <td className="col-2">{roleName}</td>
                    <td className="col-2">{items?.clientDomian?.domaiName}</td>
                    <td className="col-2">{createdBy}</td>
                    <td className="col-2">{createdDate}</td>
                    <td className="col-2">{discription}</td>
                    <td className="col-1">
                        <img src={edit} className="w-12 m-r-2 pb-2"  onClick={(e) => this.editRole(items)} />
                        <i className="icon-delete"></i>
                    </td>
                </tr>
            );
        });
    }

    getRolesList() {
        return this.state.isRole && (
            <div>
                <div className="col-12 mb-1 mt-3 scaling-center scaling-mb">
                    <h5>Roles List</h5>
                </div>
                <div className="table-responsive p-0">
                <table className="table table-borderless mb-0">
                    <thead>
                        <tr className="">
                            <th className="col-1">S.No </th>
                            <th className="col-2">Role</th>
                            <th className="col-2">Domain</th>
                            <th className="col-2">Created By</th>
                            <th className="col-2">Created Date</th>
                            <th className="col-2">Description</th>
                            <th className="col-1"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getRoleTable()}


                    </tbody>
                </table>
                </div>
            </div>
        )
    }


    render() {
        let modulesList;
        if (this.state.domainList && this.state.domainList.length > 0) {
            const modules = this.state.domainList;

            modulesList = modules.length > 0
                && modules.map((item, i) => {
                    return (

                        <option key={i} value={item.clientDomainaId}>{item.domaiName}</option>
                    )
                }, this);
        }
        return (

            <div className="maincontent">
                <Modal isOpen={this.state.showRole} size="lg">
                    <ModalHeader>Privileges </ModalHeader>
                    <ModalBody>
                        <div className="maincontent p-0">
                            <table className="table table-borderless">
                                <thead>
                                   
                                </thead>
                                <tbody>

                                    {this.getPrivilegesList()}
                                </tbody>
                            </table>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="pt-2 btn-bdr" onClick={this.hide}>Cancel</button>
                        <button className="btn btn-bdr active fs-12" onClick={this.hide}>Save</button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.showModal} size="lg">
                    <ModalHeader>Create Role</ModalHeader>
                    <ModalBody>
                        <div className="">
                            <div className="row m-0 p-0">
                                <div className="col-4 p-l-0">
                                    <div className="form-group">
                                        <label>Role<span className="text-red font-bold">*</span></label>
                                        <input type="text" className="form-control" placeholder="" value={this.state.roleName}
                                            onChange={(e) => this.setState({ roleName: e.target.value })}
                                            autoComplete="off" />
                                             {/* <div>
                                                         <span style={{ color: "red" }}>{this.state.errors["roleName"]}</span>
                                                        </div> */}
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="form-group">
                                        <label>Description<span className="text-red font-bold">*</span></label>

                                        <input type="text" className="form-control" placeholder="" value={this.state.descriptionName}
                                            onChange={(e) => this.setState({ descriptionName: e.target.value })}
                                            autoComplete="off" />
                                            {/* <div>
                                                         <span style={{ color: "red" }}>{this.state.errors["descriptionName"]}</span>
                                                        </div> */}
                                    </div>
                                </div>

                                <div className="col-3">
                                    <div className="form-group">
                                    <input type="checkbox" className="form-check-input filled-in mt-1" id="admin" name="superadmin" value={this.state.isAdmin} 
                                       onChange={(e) => this.setState({ isAdmin: e.target.checked, isSuperAdmin: e.target.checked },()=>{
                                           if(this.state.isAdmin) {
                                               this.setState({domain:""}, ()=>{
                                                this.getPrivilegesByDomainId();
                                               });
                                           } else {
                                            this.setState({domain: this.state.domainList[0].clientDomainaId}, ()=>{
                                                this.getPrivilegesByDomainId();
                                               });
                                           }
                                          
                                       })}/>
                                        <label className="form-check-label" htmlFor="remember">Is Super Admin</label>
                                    </div>
                                </div>

                                <div className="col-3">
                                    <div className="form-group">
                                        <label>Domain<span className="text-red font-bold">*</span></label>

                                        <select className="form-control" value={this.state.domain}  disabled={this.state.isSuperAdmin}
                                            onChange={(e) => this.setState({ domain: e.target.value }, ()=> {this.getPrivilegesByDomainId()})}>

                                            {modulesList}
                                        </select >
                                        {/* <div>
                                                         <span style={{ color: "red" }}>{this.state.errors["domain"]}</span>
                                                        </div> */}
                                    </div>
                                </div>
                                <div className="col-2 mt-4">
                                    <button type="button" className="btn-unic-redbdr" 
                                    
                                    onClick={this.createRole}>Add </button>
                                </div>

                            </div>

                            <div className="row m-0 p-0 mt-1">
                                {this.addedRoles()}
                            </div>

                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="row">
                            <div className="col-12 text-right">
                                <button className="btn-unic m-r-2" onClick={this.hideRoles}>Cancel</button>
                                <button
                                    className="btn-unic active fs-12" onClick={this.addRoles}>Add Role</button>
                            </div>
                        </div>
                    </ModalFooter>
                </Modal>

                <div className="row">
                    <div className="col-sm-3 col-12 mt-2">
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Role" value={this.state.searchRole}
                                onChange={(e) => this.setState({ searchRole: e.target.value })} />
                        </div>
                    </div>
                    <div className="col-sm-3 col-12 mt-2">
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Created By"  value={this.state.searchCreatedby}
                                onChange={(e) => this.setState({ searchCreatedby: e.target.value })} />
                        </div>
                    </div>
                    <div className="col-sm-3 col-12 mt-2">
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Created Date" value={this.state.searchCreatedDate}
                                onChange={(e) => this.setState({ searchCreatedDate: e.target.value })} />
                        </div>
                    </div>
                    <div className="col-sm-3 col-12 scaling-center scaling-mb mt-2">
                        <button className="btn-unic-search active m-r-2" onClick={this.searchRoles}>Search </button>
                        <button className="btn-unic-search active m-r-2" onClick={this.getAllRoles}>Clear </button>
                        <button className="btn-unic-search active" onClick={this.showRoles}><i className="icon-create_customer"></i> Create Role </button>
                    </div>

                </div>
                <div>
                    {this.getRolesList()}
                </div>
            </div>
        )
    }
}
