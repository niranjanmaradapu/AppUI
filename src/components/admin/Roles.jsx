import React, { Component } from 'react';
import edit from '../../assets/images/edit.svg';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import URMService from '../../services/URM/URMService';
import TreeView from 'react-treeview';
import { errorLengthMin , errorLengthMax , urmErrorMessages} from "../../commonUtils/Errors";
import 'react-treeview/react-treeview.css'


export default class Roles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            showRole: false,
            roleName: "",
            searchCreatedby:"",
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
            errors: {},
            isAdmin: false,
            isSuperAdmin: false,
            loggedUser:null,
            isRoleName:false,
            selectedChilds: []
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
        this.validation = this.validation.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.getAllRoles = this.getAllRoles.bind(this);
        this.savePrivilege = this.savePrivilege.bind(this);
    }



    getDomainsList() {
        URMService.getDomainsList(this.state.clientId).then((res) => {
            if (res) {
                this.setState({ domainList: res.data.result, domain: res.data.result[0].id }, this.getPrivilegesByDomainId());
            }

        });

    }

    getAllRoles() {
        if (this.state.isSearch) {
            this.setState({
                searchCreatedby: "",
                searchCreatedDate: "",
                searchRole: ""
            });
        }
        URMService.getAllRoles(this.state.clientId).then((res) => {
            if (res) {
                this.setState({ rolesList: res.data, isRole: true });
            }
        });
        // this.getDomainsList();
    }

    searchRoles() {
        this.setState({ isSearch: true });
        const searchRole = {
            "roleName": this.state.searchRole ? this.state.searchRole : null,
            "createdBy": this.state.searchCreatedby ? this.state.searchCreatedby : null,
            "createdDate": this.state.searchCreatedDate ? this.state.searchCreatedDate : null
        }

        URMService.getRolesBySearch(searchRole).then(res => {
            if (res) {
                this.setState({ rolesList: res.data.result, isRole: true });
            } else {
                this.setState({ rolesList: [], isRole: false })
            }
        });
    }

    componentWillMount() {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (user) {
            this.setState({ clientId: user["custom:clientId1"], userName: user["cognito:username"],loggedUser:user["custom:userId"] },
                () => { this.getAllRoles(); })
        }

    }

    validation(e) {
        // console.log(e.target.value)
        const regex = /^[0-9\b]+$/;
        const value = e.target.value;
        if (value === "" || regex.test(value)) {
          this.setState({
            [e.target.id]: e.target.value,searchCreatedby: e.target.value,
          });
        } else {
        //   this.setState({searchCreatedby: ""});
          // toast.error("pls enter numbers")
        }
      }
   

    handleValidation() {
        let errors = {};
        let formIsValid = true;
        //Name
        if (this.state.roleName.length < errorLengthMin.roleName) {
            formIsValid = false;
            errors["rolename"] = urmErrorMessages.roleName;      
        }
        // Area 
        if (!this.state.descriptionName) {
            formIsValid = false;
            errors["descriptionName"] =urmErrorMessages.descriptionName;
        }
        //Domain 
        //   if (!this.state.domain) {
        //     formIsValid = false;
        //     errors["domain"] = "Enter Domain";
        //   }
        this.setState({ errors: errors });
        return formIsValid;
    }



    showRoles() {
        //    this.setState(this.baseState);
        this.setState({ showModal: true, isAdmin: false, isSuperAdmin: false, isSearch: false, isEdit: false, errors: {}, selectedPrivilegesList: [] });
        if (this.state.domainList && this.state.domainList.length > 0) {
            this.setState({ domain: this.state.domainList[0].id }, () => {
                this.getPrivilegesByDomainId();
            });
        }
        this.setState({
            showModal: true,
            roleName: "",
            searchCreatedby:"",
            descriptionName: "",
            childList: [],
            parentsList: [],
            roleId: "",
            isRoleName:false,
        });
    }

    hideRoles() {
        this.setState({ showModal: false, parentsList: [], childList: [], selectedChilds: [] });
    }


    removeDuplicates(array, key) {
        const lookup = new Set();
        return array.filter(obj => !lookup.has(obj[key]) && lookup.add(obj[key]));
    }

    groupByMultipleProperties = (array) => {
        let hash = Object.create(null);
        let grouped = [];
        array.forEach(function (o) {
        var key = ['parentPrivilegeId', 'subPrivillageId'].map(function (k) { return o[k]; });//.join('|');
    
        if (!hash[key]) {
        hash[key] = { parentId: o.parentPrivilegeId, id: o.subPrivillageId, childPrivillages : [] };
        grouped.push(hash[key]);
        }
        ['used'].forEach(function (k) { hash[key]['childPrivillages'].push({ id : o['id'] }) });
        });
        return grouped;
      }

    addRoles() {
        // const roleId = 
        const formValid = this.handleValidation();
        const valid = this.state.roleName.length < 3 && !this.state.descriptionName ? false : true ;
    if(valid){

        if (formValid) {
            if (this.state.isEdit) {
                const saveObj = {
                    "roleName": this.state.roleName,
                    "searchCreatedBy": this.state.searchCreatedBy,
                    "description": this.state.descriptionName,
                    "clientId": parseInt(this.state.clientId),
                    "createdBy": parseInt(this.state.loggedUser),
                    "parentPrivileges": this.state.parentsList,
                    "subPrivileges": this.state.childList,
                    "roleId": this.state.roleId
                }

                URMService.editRole(saveObj).then((res) => {
                    if (res) {
                        toast.success(res.data.result);
                        this.getAllRoles()
                        this.hideRoles();
                    }
                    if(this.state.roleName) {
                        this.setState({isRoleName: true});
                    } else {
                        this.setState({isRoleName: false});
                    }
                });
            } else {   
                let parentIds = [];
                let subIds = [];
                let childIds = [];  
                if(this.state.parentsList) {
                    parentIds = this.state.parentsList.map((parent) => {
                        let obj = {};
                        obj.id = parent.id;
                        return obj;
                    });
                }          
                if(this.state.childList) {
                    subIds = this.state.childList.map((child) => {   
                        let subChilds = {};                   
                        parentIds.forEach((p) => {
                            if(child.parentPrivilegeId === p.id) {
                                subChilds.id = child.id;
                                subChilds.parentPrivilegeId = child.parentPrivilegeId;
                            }
                        });
                        return subChilds;
                    });
                }
                if(this.state.selectedChilds) {
                    childIds =  this.state.selectedChilds.map((child) => {   
                        let childs = {};                     
                        subIds.forEach((s) => {
                            if(child.subPrivillageId === s.id) {
                                childs.id = child.id;
                                childs.subPrivillageId = child.subPrivillageId;
                                childs.parentPrivilegeId = s.parentPrivilegeId;
                            }
                        });
                        return childs;
                    });
                }
            
            const subPrivileges = this.groupByMultipleProperties(childIds);
            const saveObj = {
                "roleName": this.state.roleName,
                "searchCreatedBy": this.state.searchCreatedBy,
                "description": this.state.descriptionName,
                "clientId": parseInt(this.state.clientId),
                "createdBy": parseInt(this.state.loggedUser),
                "parentPrivileges": parentIds,
                "subPrivileges": subPrivileges,
            }
            URMService.saveRole(saveObj).then((res) => {
                if (res) {
                    toast.success("Role Created Successfully");
                    toast.success(res.data.result);
                    this.getAllRoles()
                    this.getPrivilegesList()
                    this.hideRoles();
                }
            });
        }
     }
        
    }
      else {
            toast.info("Please Enter all mandatory fields");
        }
    
   
}
   

    getPrivilegesByDomainId() {
        // let selectedDomainId = 0;
        // this.state.domainList.forEach((ele, index) => {
        //     if (ele.id === parseInt(this.state.domain)) {
        //         if (ele.domaiName === "Textile") {
        //             selectedDomainId = 1;
        //         } else if (ele.domaiName === "Retail") {
        //             selectedDomainId = 2;
        //         }
        //     }
        // });


        URMService.getAllPrivileges().then(res => { 
            if (res) {
                this.setState({ productsList: res.data.webPrivileges});
                this.state.productsList.forEach((element, index) => {
                    if (element.subPrivileges && element.subPrivileges.length > 0) {
                        element.subPrivileges.forEach((sub, index) => {
                            if(sub.childPrivillages && sub.childPrivillages.length > 0) {
                                sub.childPrivillages.forEach((child, i) => {
                                 child.checked = false;
                                });

                            }
                        });
                    }

                });

             this.getSelectedPrivileges(this.state.parentsList);
            }
        });

    }

    createRole() {
        this.setState({ showRole: true });
        this.getPrivilegesByDomainId();
    }

    hide() {
        this.setState({ showRole: false, parentsList: [], childList: [], selectedChilds: []});
        if(!this.state.isEdit){
            this.setState({childList:[]})
        }
    }

    savePrivilege() {
        this.setState({ showRole: false});
    }

    dateFormat = (d) => {
        let date = new Date(d)
        
        return date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()
    }

    setPrivileges(e, value, selectedNode, selectedSub, selectedChild ) {
        const { productsList } = this.state;
        if (e.target.checked) {
            productsList.forEach((parent) => {
                if(parent.id === selectedNode.id) {
                    let obj =  {
                        id: parent.id, 
                        name: parent.name 
                    }
                    this.state.parentsList.push(obj);                  
                    parent.subPrivileges.forEach((item, index) => {
                        if(item.parentPrivilegeId === selectedSub.parentPrivilegeId) {
                            let obj =  {
                                id: selectedSub.id, 
                                name: selectedSub.name,
                                parentPrivilegeId: selectedSub.parentPrivilegeId,
                                description: selectedSub.description
                            }
                            this.state.childList.push(obj); 
                            if(item.childPrivillages) {
                                item.childPrivillages.forEach((itm, ind) => {                               
                                    if(itm.id === selectedChild.id) {
                                        selectedChild.checked = e.target.checked;
                                        this.state.selectedChilds.push(selectedChild); 
                                    }                      
                                });
                            }                            
                        }        
                    });
                }               
            });            
        } else {
            productsList.forEach((parent) => {
                if(parent.id === selectedNode.id) {                 
                    parent.subPrivileges.forEach((item, index) => {
                        if(item.parentPrivilegeId === selectedSub.parentPrivilegeId) {
                            if(item.childPrivillages) {
                                item.childPrivillages.forEach((itm, ind) => {                               
                                    if(itm.id === selectedChild.id) {
                                        selectedChild.checked = false;
                                        let index1 = this.state.selectedChilds.findIndex(ele => ele.id === selectedChild.id);
                                        this.state.selectedChilds.splice(index1, 1);
                                    }                      
                                });                                                              
                            }                            
                        }        
                    });
                }               
            });
        }
        const parentsList = this.removeDuplicates(this.state.parentsList, "name");
        const childList = this.removeDuplicates(this.state.childList, "name");
        this.setState({ 
            productsList,
            parentsList: parentsList , 
            childList: childList,
            selectedChilds: this.state.selectedChilds
        });
    }
getSelectedPrivileges(parentsList) {
    const { selectedChilds,  productsList} = this.state;
    if (parentsList && parentsList.length > 0) {
        productsList.forEach((product, index) => {
            if (product.subPrivileges && product.subPrivileges.length > 0) {
                product.subPrivileges.forEach(subPrivilage => {
                    if(subPrivilage.childPrivillages && subPrivilage.childPrivillages.length > 0) {
                        subPrivilage.childPrivillages.forEach((el) => {
                            selectedChilds.forEach((child, index) => {
                                if (el.id === child.id) {
                                    el.checked = true;
                                }
                            });
                        });
                    }                       
                });
            }
        });
    }
    this.setState({ productsList: this.state.productsList });
}

    getPrivilegesList() {
        return this.state.productsList.length > 0 && this.state.productsList.map((node, i) => {
            const parentName = node.name;
            const label = <span className="node">{parentName}</span>
            return (
                <TreeView
                    key={parentName + "|" + i}
                    nodeLabel={label}
                    defaultCollapse={false}
                > {
                    node.subPrivileges && node.subPrivileges.length > 0 && node.subPrivileges.map((sub, ind) => {
                        const subPrivillage = sub.name;
                        const label = <span className="node">{subPrivillage}</span>
                        return (
                            <TreeView
                                key={subPrivillage + "|" + ind}
                                nodeLabel={label}
                                defaultCollapse={false}
                            > {
                                sub.childPrivillages && sub.childPrivillages.length > 0 && sub.childPrivillages.map((child, idx) => {
                                    return (

                            <div>
                                <div className="form-check checkbox-rounded checkbox-living-coral-filled pointer fs-15">
                                    {
                                        child.name && (
                                            <div className="cursor">
                                                <input type="checkbox" className=" cursor form-check-input filled-in mt-1" id="remember{{idx}}"
                                                    name="child{{idx}}" checked={child.checked}
                                                    onChange={(e) => this.setPrivileges(e, idx, node, sub, child)} />
                                                <label className="cursor form-check-label" htmlFor="remember">  {child.name}</label>

                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                                    );
                                })
                                }

                            </TreeView>
                        );
                    })
                    }

                </TreeView>

            );

        });


    }

    getAddedRoles() {
        let nameArray = [];
        if(this.state.childList && this.state.selectedChilds) {
            this.state.childList.forEach((el) => {
                this.state.selectedChilds.forEach((it) => {
                    if(el.id === it.subPrivillageId) {
                       nameArray.push(el);
                    }
                });
            });
        }       
        let uniqueNameArray = this.removeDuplicates(nameArray, "name");
        return uniqueNameArray.map((items, index) => {
            const { name, description } = items;
            return (
                <tr className="">
                   <td className="col-3 geeks">{name}</td>
                    <td className="col-5">{description}</td>
                    <td className="col-5">
                    {this.state.selectedChilds.length > 0 && this.state.selectedChilds.map((itm, ind) => {                    
                     return  (
                        itm.subPrivillageId ===items.id  && <ul>
                          <li key={ind}>
                              {itm.name}
                          </li>
                      </ul>)
                    })}
                    </td>
                </tr>
            );
        });
    }

    addedRoles() {
        return this.state.childList && this.state.childList.length > 0 && (
            <div>
                <div className="row mt-3">
                    <h6 className="text-red mb-2 fs-14"></h6>
                </div>
                <table className="table table-borderless mb-0">
                    <thead>
                        <tr className="">
                            <th className="col-3">Privileges</th>
                            <th className="col-3">Description</th>
                            <th className="col-3">Approved Privileges</th>
                        </tr>
                    </thead>
                </table>
                <table className="table table-borderless gfg mb-0">
                    <tbody>

                        {this.getAddedRoles()}
                    </tbody>
                </table>
            </div>
        )
    }

    editRole(items) {
        this.setState({
            showModal: true,
            roleName: items.roleName,
            isEdit: true,
            searchCreatedBy: items.searchCreatedBy,
            descriptionName: items.description,
            childList: items.subPrivilege,
            parentsList: items.parentPrivilege,
            roleId: items.id,
            isSearch: false,
            isRoleName:true,
            // domain: items.clientDomain.id
        }, () => {
            this.getPrivilegesByDomainId();
        });



    }

    getRoleTable() {
        return this.state.rolesList.map((items, index) => {
            let date = this.dateFormat(items.createdDate)
            const { roleName, createdBy,  description, usersCount } = items;

            return (
                

                <tr className="">
                    <td className="col-1 geeks">{index + 1}</td>
                    <td className="col-2">{roleName}</td>
                    {/* <td className="col-2">{items?.clientDomainVo?.domaiName}</td> */}
                    <td className="col-2">{createdBy}</td>
                    <td className="col-2">{date}</td>
                    <td className="col-1">{usersCount}</td>
                    <td className="col-2">{description}</td>
                    <td className="col-1">
                        <img src={edit} className="w-12 m-r-2 pb-2" onClick={(e) => this.editRole(items)} />
                        {/* <i className="icon-delete"></i> */}
                    </td>
                </tr>
            );
        });
    }

    getRolesList() {
        return this.state.isRole && (

            <div>
                <div className="col-12 mb-1 mt-3 scaling-center scaling-mb">
                    <h5 className='fs-18'>Roles List</h5>
                </div>
                <div className="table-responsive p-0">
                    <table className="table table-borderless mb-0">
                        <thead>
                            <tr className="">
                                <th className="col-1">S.No </th>
                                <th className="col-2">Role</th>
                                {/* <th className="col-2">Domain</th> */}
                                <th className="col-2">Created By</th>
                                <th className="col-2 p-l-1">Created Date</th>
                                <th className="col-1 p-l-0">User Count</th>
                                <th className="col-2 p-l-0">Description</th>
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

                        <option key={i} value={item.id}>{item.domaiName}</option>
                    )
                }, this);
        }
        return (

            <div className="maincontent">
                <Modal isOpen={this.state.showRole} size="lg">
                    <ModalHeader>Privileges </ModalHeader>
                    <ModalBody>
                        <div className="maincontent p-0 mb-0">
                            <table className="table table-borderless mb-0">
                                <thead>
                                    <tr className="m-0 p-0">
                                    <th>Privilege Name</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {this.getPrivilegesList()}
                                </tbody>
                            </table>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="pt-2 btn-bdr" onClick={this.hide}>Cancel</button>
                        <button className="btn btn-bdr active fs-12" onClick={this.savePrivilege}>Save</button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.showModal} size="lg">
                    <ModalHeader>  {
                        !this.state.isEdit && (
                            <div>
                                Add Role
                            </div>

                        )
                    }
                        {
                            this.state.isEdit && (
                                <div>
                                    Edit Role
                                </div>

                            )
                        }</ModalHeader>
                    <ModalBody>
                        <div className="">
                            <div className="row m-0 p-0">
                                <div className="col-sm-4 col-12">
                                    <div className="form-group">
                                        <label>Role<span className="text-red font-bold">*</span></label>
                                        <input type="text" className="form-control" placeholder="" value={this.state.roleName}
                                        disabled ={this.state.isRoleName}
                                        maxLength = {errorLengthMax.roleName}
                                            onChange={(e) => this.setState({ roleName: e.target.value ,isRoleName:false})}
                                            autoComplete="off" />
                                            <span style={{ color: "red" }}>{this.state.errors["rolename"]}</span>

                                    </div>
                                </div>
                                
                                <div className="col-sm-4 col-12">
                                    <div className="form-group">
                                        <label>Description<span className="text-red font-bold">*</span></label>

                                        <input type="text" className="form-control" placeholder="" value={this.state.descriptionName}
                                            onChange={(e) => this.setState({ descriptionName: e.target.value })}
                                            autoComplete="off" />
                                        <span style={{ color: "red" }}>{this.state.errors["descriptionName"]}</span>
                                    </div>
                                </div>

                                <div className="col-12 col-sm-4 mt-4">
                                    <div className="form-group">

                                    </div>
                                </div>

                                {/* <div className="col-sm-4 col-12">
                                    <div className="form-group">
                                        <label>Domain<span className="text-red font-bold">*</span></label>

                                        <select className="form-control" value={this.state.domain} disabled={this.state.isSuperAdmin}
                                            onChange={(e) => this.setState({ domain: e.target.value }, () => { this.getPrivilegesByDomainId() })}>

                                            {modulesList}
                                        </select >
                                    
                                    </div>
                                </div> */}
                                <div className="col-4 mt-4">
                                    <button type="button" className="btn-unic-redbdr"

                                        onClick={this.createRole}>Privilege Mapping </button>
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
                                    className="btn-unic active fs-12" onClick={this.addRoles}>Save</button>
                            </div>
                        </div>
                    </ModalFooter>
                </Modal>

                <div className="row">
                    <div className="col-sm-2 col-12 mt-2">
                        <div className="form-group">
                            <label>Role</label>
                            <input type="text" className="form-control" placeholder="Role" value={this.state.searchRole}
                                onChange={(e) => this.setState({ searchRole: e.target.value })} />
                        </div>
                    </div>
                    <div className="col-sm-2 col-12 mt-2">
                        <div className="form-group">
                            <label>Created By</label>
                            <input type="text" className="form-control" placeholder="Created By" value={this.state.searchCreatedby}
                                // onChange={(e) => this.setState({ searchCreatedby: e.target.value },() =>
                                // {
                                //     this.validation();
                                // }) }
                                onChange ={this.validation}
                                
                                 />
                        </div>
                    </div>
                    <div className="col-sm-2 col-12 mt-2">
                        <div className="form-group">
                            <label>Created Date</label>
                            <input type="date" className="form-control" placeholder="Created Date" value={this.state.searchCreatedDate}
                                onChange={(e) => this.setState({ searchCreatedDate: e.target.value })} />
                        </div>
                    </div>
                    <div className="col-sm-6 pt-4 col-12 scaling-center scaling-mb mt-2 p-l-0 p-r-0">
                        <button className="btn-unic-search active m-r-2" onClick={this.searchRoles}>Search </button>
                        <button className="btn-unic-search active m-r-2" onClick={this.getAllRoles}>Clear </button>
                        <button className="btn-unic-search active" onClick={this.showRoles}><i className="icon-create_customer"></i> Add Role </button>
                    </div>

                </div>
                <div>
                    {this.getRolesList()}
                </div>
            </div>
        )
    }
}
