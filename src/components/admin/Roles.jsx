import React, { Component } from 'react';
import edit from '../../assets/images/edit.svg';
import uparrow from '../../assets/images/up_arrow.svg';
import downarrow from '../../assets/images/down_arrow.svg';
import { Collapse } from "react-collapse";
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
            selectedChilds: [],
            mobileProductsList: [],
            mobileParentsList: [],
            mobileChildList: [],
            mobileSelectedChilds: [],
            activePrevilegeType: '',
            isMobileExpanded: false,
            isWebExpanded: false,
            parentPrivilegesEdit: []
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
        this.setMobilePrivileges = this.setMobilePrivileges.bind(this);
        this.addedMobileRoles = this.addedMobileRoles.bind(this);
        this.getAddedMobileRoles = this.getAddedMobileRoles.bind(this);
        this.toggleClass = this.toggleClass.bind(this);
        this.toggleMobileClass = this.toggleMobileClass.bind(this);
        this.moreLess = this.moreLess.bind(this);
        this.moreLessMobile = this.moreLessMobile.bind(this);
        this.avoidSpace=this.avoidSpace.bind(this);
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
        this.setState({ showModal: false, parentsList: [], childList: [], selectedChilds: [], mobileParentsList: [], mobileChildList: [], mobileSelectedChilds: [] });
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
        const { parentsList, childList, selectedChilds, mobileParentsList, mobileChildList, mobileSelectedChilds } = this.state;
        let parentPrivilegesList = [];
        let subPrivilegesList = [];
        let childPrivilegesList = [];
        if(parentsList) {
            parentPrivilegesList = [...parentsList];
        }
        if(mobileParentsList) {
            parentPrivilegesList = [...parentPrivilegesList, ...mobileParentsList];
        } 
        if(childList) {
            subPrivilegesList = [...childList];
        }
         if(mobileChildList) {
            subPrivilegesList = [...subPrivilegesList, ...mobileChildList];
        } 
        if(selectedChilds) {
            childPrivilegesList = [...selectedChilds];
        } 
        if(mobileSelectedChilds) {
            childPrivilegesList = [...childPrivilegesList, ...mobileSelectedChilds];
        } 
        
        // const roleId = 
        const formValid = this.handleValidation();
        const valid = this.state.roleName.length < 3 && !this.state.descriptionName ? false : true ;
        let parentIds = [];
        let subIds = [];
        let childIds = [];  
        if(parentPrivilegesList) {
            parentIds = parentPrivilegesList.map((parent) => {
                let obj = {};
                obj.id = parent.id;
                return obj;
            });
        }          
        if(subPrivilegesList) {
            subIds = subPrivilegesList.map((child) => {   
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
        if(childPrivilegesList) {
            childIds = childPrivilegesList.map((child) => {  
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
    const final_ids = this.groupByMultipleProperties(childIds);
    let sub_ids = subIds.map((itm) => {
     let child = {};
     child.parentId = itm.parentPrivilegeId;
     child.id = itm.id;
     return child;
    }); 
    let final = [...final_ids, ...sub_ids];
    let subPrivileges = this.removeDuplicates(final, 'id');
    if(valid){
        if (formValid) {
            if (this.state.isEdit) {
                const saveObj = {
                    "roleName": this.state.roleName,
                    "searchCreatedBy": this.state.searchCreatedBy,
                    "description": this.state.descriptionName,
                    "clientId": parseInt(this.state.clientId),
                    "createdBy": parseInt(this.state.loggedUser),
                    "parentPrivileges": parentIds,
                    "subPrivileges": subPrivileges,
                    "roleId": this.state.roleId
                }
                URMService.editRole(saveObj).then((res) => {
                    if (res) {
                        toast.success(res.data.result);
                        this.getAllRoles()
                        this.hideRoles();
                    }
                    if(this.state.roleName) {
                        this.setState({isRoleName: true, isEdit: false});
                    } else {
                        this.setState({isRoleName: false, isEdit: false});
                    }
                });
    } else {   
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
        const { mobileParentsList, parentsList} = this.state;
        if(this.state.isEdit) {
            URMService.getAllPrivileges().then(res => { 
                if (res) {
                    this.setState({ productsList: res.data.webPrivileges, mobileProductsList: res.data.mobilePrivileges});
                    this.state.productsList.forEach((element) => {
                        parentsList.forEach((editEle) => {
                            if(element.id === editEle.id) {
                                if (element.subPrivileges && element.subPrivileges.length > 0) {
                                    element.subPrivileges.forEach((sub) => {
                                        editEle.subPrivileges.length > 0 && editEle.subPrivileges.forEach((editSub) => {
                                            if(sub.id === editSub.id) {
                                               sub.checked = true;
                                               sub.childPrivileges && sub.childPrivileges.length > 0 && sub.childPrivileges.forEach((child) => {
                                                editSub.childPrivileges && editSub.childPrivileges.length > 0  && editSub.childPrivileges.forEach((editChild) => {
                                                        if(editChild.id === child.id && editChild.isEnabeld) {
                                                            child.checked = editChild.isEnabeld;
                                                         }
                                                    });
                                               });
                                            }
                                        });
                                    });
                                }
                            }
                        });
                    });
                    this.state.mobileProductsList.forEach((element) => {
                        mobileParentsList.forEach((editEle) => {
                            if(element.id === editEle.id) {
                                if (element.subPrivileges && element.subPrivileges.length > 0) {
                                    element.subPrivileges.forEach((sub) => {
                                        editEle.subPrivileges && editEle.subPrivileges.length > 0 && editEle.subPrivileges.forEach((editSub) => {
                                            if(sub.id === editSub.id) {
                                               sub.checked = true;
                                               sub.childPrivileges && sub.childPrivileges.length > 0 && sub.childPrivileges.forEach((child) => {
                                                editSub.childPrivileges && editSub.childPrivileges.length > 0  && editSub.childPrivileges.forEach((editChild) => {
                                                        if(editChild.id === child.id && editChild.isEnabeld) {
                                                            child.checked = editChild.isEnabeld;
                                                         }
                                                    });
                                               });
                                            }
                                        });
                                    });
                                }
                            }
                        });
                    });
                    this.setState({ productsList: this.state.productsList, mobileProductsList: this.state.mobileProductsList });
                    
                    // this.getSelectedPrivileges(this.state.parentPrivilegesEdit);
                    // this.getSelectedMobilePrivileges(this.state.mobileParentsList);
                }
            });
        } else {
            URMService.getAllPrivileges().then(res => { 
                if (res) {
                    this.setState({ productsList: res.data.webPrivileges, mobileProductsList: res.data.mobilePrivileges});
                    this.state.productsList.forEach((element, index) => {
                        if (element.subPrivileges && element.subPrivileges.length > 0) {
                            element.subPrivileges.forEach((sub, index) => {
                                sub.checked = false;
                                if(sub.childPrivillages && sub.childPrivillages.length > 0) {
                                    sub.childPrivillages.forEach((child, i) => {
                                     child.checked = false;
                                    });
                                }
                            });
                        }

                    });
                    this.state.mobileProductsList.forEach((element, index) => {
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
                    // this.getSelectedPrivileges(this.state.parentsList);
                    // this.getSelectedMobilePrivileges(this.state.mobileParentsList);
                }
            });
      }

    }

    createRole() {
        this.setState({ showRole: true });
        this.getPrivilegesByDomainId();
        if(this.state.isEdit) {
            URMService.getSubPrivilegesbyRoleId(this.state.roleName).then(res => {
                if(res) {
                let webPrivileges = [];
                let webSubPrivileges = [];
                let webChildPrivileges = [];
                let mobilePrivileges = [];
                let mobileSubPrivileges = [];
                let mobileChildPrivileges = [];
                let webPrivilegesResult = [];
                let mobilePrivilegesResult = [];
                 const parentPrivilegesResult = this.groupByprevilegeType(res.data.parentPrivileges);
                 if(parentPrivilegesResult.web) {
                    webPrivilegesResult = parentPrivilegesResult.web;
                 }
                 if(parentPrivilegesResult.mobile) {
                    mobilePrivilegesResult = parentPrivilegesResult.mobile;
                 }                 
                 if(mobilePrivilegesResult && mobilePrivilegesResult.length > 0) {
                    mobilePrivilegesResult.forEach((parent) => {
                        mobilePrivileges.push(parent);
                        parent.subPrivileges.forEach((sub) => {
                            mobileSubPrivileges.push(sub);
                            sub.childPrivileges.forEach((child) => {
                                mobileChildPrivileges.push(child);
                            });
                        });
                     });
                 }
                 
                 if(webPrivilegesResult && webPrivilegesResult.length > 0) {
                    webPrivilegesResult.forEach((parent) => {
                        webPrivileges.push(parent);
                        parent.subPrivileges.forEach((sub) => {
                            webSubPrivileges.push(sub);
                            sub.childPrivileges.forEach((child) => {
                                webChildPrivileges.push(child);
                            });
                        });
                     });
                 }
                  this.setState({
                    childList: webSubPrivileges,
                    selectedChilds: webChildPrivileges, 
                    parentsList: webPrivileges,
                    mobileChildList: mobileSubPrivileges,
                    mobileParentsList: mobilePrivileges,                                     
                    mobileSelectedChilds: mobileChildPrivileges
                  })
                }
            });
        }       
    }

    hide() {
        this.setState({ showRole: false});
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
getSelectedMobilePrivileges(parentsList) {
    const {  mobileSelectedChilds, mobileProductsList} = this.state;
    if (parentsList && parentsList.length > 0) {
        mobileProductsList.forEach((product, index) => {
            if (product.subPrivileges && product.subPrivileges.length > 0) {
                product.subPrivileges.forEach(subPrivilage => {
                    if(subPrivilage.childPrivillages && subPrivilage.childPrivillages.length > 0) {
                        subPrivilage.childPrivillages.forEach((el) => {
                            mobileSelectedChilds.forEach((child, index) => {
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
    this.setState({ mobileProductsList: this.state.mobileProductsList });
}
setMobilePrivileges(e, value, selectedNode, selectedSub, selectedChild ) {
    const { mobileProductsList } = this.state;
    if (e.target.checked) {
        mobileProductsList.forEach((parent) => {
            if(parent.id === selectedNode.id) {
                let obj =  {
                    id: parent.id, 
                    name: parent.name 
                }
                this.state.mobileParentsList.push(obj);                  
                parent.subPrivileges && parent.subPrivileges.length > 0 && parent.subPrivileges.forEach((item, index) => {
                    if(item.parentPrivilegeId === selectedSub.parentPrivilegeId) {
                        let obj =  {
                            id: selectedSub.id, 
                            name: selectedSub.name,
                            parentPrivilegeId: selectedSub.parentPrivilegeId,
                            description: selectedSub.description
                        }
                        this.state.mobileChildList.push(obj); 
                        if(item.childPrivillages) {
                            item.childPrivillages.length > 0 && item.childPrivillages.forEach((itm, ind) => {                               
                                if(itm.id === selectedChild.id) {
                                    selectedChild.checked = e.target.checked;
                                    this.state.mobileSelectedChilds.push(selectedChild); 
                                }                      
                            });
                        }                            
                    }        
                });
            }               
        });            
    } else {
        mobileProductsList.forEach((parent) => {
            if(parent.id === selectedNode.id) {                 
                parent.subPrivileges.length > 0 && parent.subPrivileges.forEach((item, index) => {
                    if(item.parentPrivilegeId === selectedSub.parentPrivilegeId) {
                        if(item.childPrivillages) {
                            item.childPrivillages.length > 0 && item.childPrivillages.forEach((itm, ind) => {                               
                                if(itm.id === selectedChild.id) {
                                    selectedChild.checked = false;
                                    let index1 = this.state.mobileSelectedChilds.findIndex(ele => ele.id === selectedChild.id);
                                    this.state.mobileSelectedChilds.splice(index1, 1);
                                }                      
                            });                                                              
                        }                            
                    }        
                });
            }               
        });
    }
    const parentsList = this.removeDuplicates(this.state.mobileParentsList, "name");
    const childList = this.removeDuplicates(this.state.mobileChildList, "name");
    this.setState({ 
        mobileProductsList,
        mobileParentsList: parentsList , 
        mobileChildList: childList,
        mobileSelectedChilds: this.state.mobileSelectedChilds
    });
}

setPrivileges(e, value, selectedNode, selectedSub, selectedChild ) {
    const { productsList, mobileProductsList } = this.state;
    if (e.target.checked) {
        productsList.forEach((parent) => {
            if(parent.id === selectedNode.id) {
                let obj =  {
                    id: parent.id, 
                    name: parent.name 
                }
                this.state.parentsList.push(obj);                  
                parent.subPrivileges && parent.subPrivileges.length > 0 && parent.subPrivileges.forEach((item, index) => {
                    if(item.parentPrivilegeId === selectedSub.parentPrivilegeId) {
                        let obj =  {
                            id: selectedSub.id, 
                            name: selectedSub.name,
                            parentPrivilegeId: selectedSub.parentPrivilegeId,
                            description: selectedSub.description
                        }
                        this.state.childList.push(obj); 
                        if(item.childPrivileges) {
                            item.childPrivileges.length > 0 && item.childPrivileges.forEach((itm, ind) => {                               
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
                parent.subPrivileges && parent.subPrivileges.length > 0 && parent.subPrivileges.forEach((item, index) => {
                    if(item.parentPrivilegeId === selectedSub.parentPrivilegeId) {
                        if(item.childPrivileges) {
                            item.childPrivileges.length > 0 && item.childPrivileges.forEach((itm, ind) => {                               
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
setMobileSubPrivileges(e, idx, selectedNode, selectedSub) {
    const { mobileProductsList } = this.state;
    if (e.target.checked) {
        mobileProductsList.forEach((parent) => {
            if(parent.id === selectedNode.id) {
                let obj =  {
                    id: parent.id, 
                    name: parent.name 
                }
                this.state.mobileParentsList.push(obj);                  
                parent.subPrivileges.forEach((item, index) => {
                    if(item.id === selectedSub.id) {
                        item.checked = true;
                        let obj =  {
                            id: selectedSub.id, 
                            name: selectedSub.name,
                            parentPrivilegeId: selectedSub.parentPrivilegeId,
                            description: selectedSub.description
                        }
                        this.state.mobileChildList.push(obj); 
                        if(selectedSub.childPrivileges) {
                            selectedSub.childPrivileges.forEach((itm, ind) => {                               
                                    itm.checked = e.target.checked;
                                    this.state.mobileSelectedChilds.push(itm);                      
                            });
                        }                            
                    }        
                });
            }               
        });            
    } else {
        mobileProductsList.forEach((parent) => {
            if(parent.id === selectedNode.id) {                 
                selectedNode.subPrivileges.forEach((item, index) => {
                    if(item.id === selectedSub.id) {
                        item.checked = false;
                        let index1 = this.state.mobileChildList.findIndex(ele => ele.name === selectedSub.name);
                        this.state.mobileChildList.splice(index1, 1);
                        let isParent = false;
                        if (this.state.mobileParentsList.length > 0 && this.state.mobileChildList.length > 0) {
                            this.state.mobileChildList.forEach(child => {
                                if (child.parentPrivilegeId === selectedNode.id) {
                                    isParent = true;
                                }
                            });
                        }
                        if (!isParent) {
                            let index = this.state.mobileParentsList.findIndex(ele => ele.id === selectedNode.id);
                            this.state.mobileParentsList.splice(index, 1);
                        }
                        let parentsObjList =  this.state.mobileParentsList.map((parent, ind) => {
                            let obj = {};
                            obj.id = parent.id;
                            obj.name = parent.name;
                            return obj;
                        });
                        this.state.mobileParentsList = parentsObjList;
                       
                        if(item.childPrivileges) {
                            item.childPrivileges.forEach((itm, ind) => {                               
                                // if(itm.id === selectedChild.id) {
                                    itm.checked = false;
                                    let index1 = this.state.mobileSelectedChilds.findIndex(ele => ele.id === itm.id);
                                    this.state.mobileSelectedChilds.splice(index1, 1);
                               // }                      
                            });                                                              
                        }                            
                    }        
                });
            }               
        });
    }
    const parentsList = this.removeDuplicates(this.state.mobileParentsList, "id");
    const childList = this.removeDuplicates(this.state.mobileChildList, "id");
    this.setState({ 
        mobileProductsList,
        mobileParentsList: parentsList , 
        mobileChildList: childList,
        mobileSelectedChilds: this.state.mobileSelectedChilds
    });
}
setSubPrivileges(e, idx, selectedNode, selectedSub) {
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
                    if(item.id === selectedSub.id) {
                        item.checked = true;
                        let obj =  {
                            id: selectedSub.id, 
                            name: selectedSub.name,
                            parentPrivilegeId: selectedSub.parentPrivilegeId,
                            description: selectedSub.description
                        }
                        this.state.childList.push(obj); 
                        if(selectedSub.childPrivileges) {
                            selectedSub.childPrivileges.forEach((itm, ind) => {                               
                                    itm.checked = e.target.checked;
                                    this.state.selectedChilds.push(itm);                      
                            });
                        }                            
                    }        
                });
            }               
        });            
    } else {
        productsList.forEach((parent) => {
            if(parent.id === selectedNode.id) {                 
                selectedNode.subPrivileges.forEach((item, index) => {
                    if(item.id === selectedSub.id) {
                        item.checked = false;
                        let index1 = this.state.childList.findIndex(ele => ele.name === selectedSub.name);
                        this.state.childList.splice(index1, 1);
                        let isParent = false;
                        if (this.state.parentsList.length > 0 && this.state.childList.length > 0) {
                            this.state.childList.forEach(child => {
                                if (child.parentPrivilegeId === selectedNode.id) {
                                    isParent = true;
                                }
                            });
                        }
                        if (!isParent) {
                            let index = this.state.parentsList.findIndex(ele => ele.id === selectedNode.id);
                            this.state.parentsList.splice(index, 1);
                        }
                        let parentsObjList =  this.state.parentsList.map((parent, ind) => {
                            let obj = {};
                            obj.id = parent.id;
                            obj.name = parent.name;
                            return obj;
                        });
                        this.state.parentsList = parentsObjList;
                       
                        if(item.childPrivileges) {
                            item.childPrivileges.forEach((itm, ind) => {                               
                                // if(itm.id === selectedChild.id) {
                                    itm.checked = false;
                                    let index1 = this.state.selectedChilds.findIndex(ele => ele.id === itm.id);
                                    this.state.selectedChilds.splice(index1, 1);
                               // }                      
                            });                                                              
                        }                            
                    }        
                });
            }               
        });
    }
    console.log('+++++++++++++this.state.childList++++++++++++++', this.state.childList);
    const parentsList = this.removeDuplicates(this.state.parentsList, "name");
    const childList = this.removeDuplicates(this.state.childList, "name");
    console.log('+++++++++++++childList++++++++++++++', childList);
    this.setState({ 
        productsList,
        parentsList: parentsList , 
        childList: childList,
        selectedChilds: this.state.selectedChilds
    });
}

    getPrivilegesList() {
        return this.state.productsList.length > 0 && this.state.productsList.map((node, i) => {
            const parentName = node.name;
            const label = <span className="node font-bold">{parentName}</span>
            return (
                <TreeView
                    key={parentName + "|" + i}
                    nodeLabel={label}
                    defaultCollapse={false}
                > {
                    node.subPrivileges && node.subPrivileges.length > 0 && node.subPrivileges.map((sub, ind) => {
                        const subPrivillage = sub.name;
                       
                        const label =  <span>
                            
                            <span className="cursor">
                        <input type="checkbox" className=" cursor form-check-input filled-in fs-14" id="remember{{ind}}"
                          onChange={(e) => this.setSubPrivileges(e, ind, node, sub)} name="child{{ind}}" 
                          checked={sub.checked}
                        />
                      </span>
                             <span className="node"> {subPrivillage}</span>
                       
                        </span>
                        return (
                            <TreeView
                                key={subPrivillage + "|" + ind}
                                nodeLabel={label}
                                defaultCollapse={false}
                            > {
                                sub.childPrivileges && sub.childPrivileges.length > 0 && sub.childPrivileges.map((child, idx) => {
                                    return (

                            <div>
                                <div className="form-check checkbox-rounded checkbox-living-coral-filled pointer fs-14">
                                    {
                                        child.name && (
                                            <div className="cursor">
                                                <input type="checkbox" className=" cursor form-check-input filled-in" id="remember{{idx}}"
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
    getMobilePrivilegesList() {
        return this.state.mobileProductsList.length > 0 && this.state.mobileProductsList.map((node, i) => {
            const parentName = node.name;
            const label = <span className="node font-bold">{parentName}</span>
            return (
                <TreeView
                    key={parentName + "|" + i}
                    nodeLabel={label}
                    defaultCollapse={false}
                > {
                    node.subPrivileges && node.subPrivileges.length > 0 && node.subPrivileges.map((sub, ind) => {
                        const subPrivillage = sub.name;
                        const label = <span>
                            
                            <span className="cursor">
                          <input type="checkbox" className=" cursor form-check-input filled-in fs-14" id="remember{{ind}}"
                            onChange={(e) => this.setMobileSubPrivileges(e, ind, node, sub)} name="child{{ind}}" 
                            checked={sub.checked}
                          />
                        </span>
                             <span className="node"> {subPrivillage}</span>
                       
                        </span>
                        return (
                            <TreeView
                                key={subPrivillage + "|" + ind}
                                nodeLabel={label}
                                defaultCollapse={false}
                            > {
                                sub.childPrivileges && sub.childPrivileges.length > 0 && sub.childPrivileges.map((child, idx) => {
                                    return (

                            <div>
                                <div className="form-check checkbox-rounded checkbox-living-coral-filled pointer fs-14">
                                    {
                                        child.name && (
                                            <div className="cursor">
                                                <input type="checkbox" className=" cursor form-check-input filled-in" id="remember{{idx}}"
                                                    name="child{{idx}}" checked={child.checked}
                                                    onChange={(e) => this.setMobilePrivileges(e, idx, node, sub, child)} />
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
                    } else {
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
                    <td className="col-4">{description}</td>
                    <td className="col-4">
                    {this.state.selectedChilds.length > 0 && this.state.selectedChilds.map((itm, ind) => {                    
                     return  (
                        itm.subPrivillageId ===items.id  && <ul>
                          <li key={ind}>
                              {itm.name}
                          </li>
                      </ul>)
                    })}
                    </td>
                    <td className='col-1'></td>
                </tr>
            );
        });
    }
    getAddedMobileRoles() {
        let nameArray = [];
        if(this.state.mobileChildList && this.state.mobileSelectedChilds) {
            this.state.mobileChildList.forEach((el) => {
                this.state.mobileSelectedChilds.forEach((it) => {
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
                    <td className="col-4">{description}</td>
                    <td className="col-4">
                    {this.state.mobileSelectedChilds.length > 0 && this.state.mobileSelectedChilds.map((itm, ind) => {                    
                     return  (
                        itm.subPrivillageId ===items.id  && <ul>
                          <li key={ind}>
                              {itm.name}
                          </li>
                      </ul>)
                    })}
                    </td>
                    <td className='col-1'></td>
                </tr>
            );
        });
    }

    addedMobileRoles() {
        return this.state.mobileChildList && this.state.mobileChildList.length > 0 && (
            <div>
                <div className="row mt-3">
                {this.state.mobileSelectedChilds.length > 0 && <h6 className="text-red mb-2 fs-14">Mobile Privileges</h6>}
                </div>
                {this.state.mobileSelectedChilds.length > 0 && <table className="table table-borderless mb-0">
                    <thead>
                        <tr className="">
                            <th className="col-3">Privileges</th>
                            <th className="col-4">Description</th>
                            <th className="col-4">Approved Privileges</th>
                            <th className='col-1 cursor'>{this.state.isMobileExpanded ? <i className='' onClick={this.toggleMobileClass.bind(this, '')}>
                                {this.moreLessMobile()}</i> : <i className='' onClick={this.toggleMobileClass.bind(this, 'Mobile')}>
                                    {this.moreLess()}</i>}
                            </th>
                            
                        </tr>
                    </thead>
                </table>}
                <Collapse isOpened={this.state.activePrevilegeType === 'Mobile'}>
                <table className="table table-borderless gfg mb-0">
                    <tbody>

                        {this.getAddedMobileRoles()}
                    </tbody>
                </table>
                </Collapse>
            </div>
        )
    }
    addedRoles() {
        return this.state.childList && this.state.childList.length > 0 && (
            <div>
                <div className="row mt-3">
                    <h6 className="text-red mb-2 fs-14">Web Privileges</h6>
                </div>
                <table className="table table-borderless mb-0">
                    <thead>
                        <tr className="">
                            <th className="col-3">Privileges</th>
                            <th className="col-4">Description</th>
                            <th className="col-4">Approved Privileges</th>
                            <th className='col-1 cursor'>
                            {this.state.isWebExpanded ? <i className='' onClick={this.toggleClass.bind(this, '')}>{this.moreLess()}</i> : <i className='pt-2' onClick={this.toggleClass.bind(this, 'Web')}>{this.moreLess()}</i>}
                            </th>
                        </tr>
                    </thead>
                </table>
                <Collapse isOpened={this.state.activePrevilegeType === 'Web'}>
                <table className="table table-borderless mb-0">
                    <tbody>
                        {this.getAddedRoles()}
                    </tbody>
                </table>
                </Collapse>
            </div>
        )
    }
    toggleClass(previlegeType) {
        if(previlegeType === 'Web') {
            this.setState({
               activePrevilegeType: previlegeType,
               isWebExpanded: true,
            });
        } else {
            this.setState({
                activePrevilegeType: '',
                isMobileExpanded: true,
                isWebExpanded: false
            });
        }        
      }
      toggleMobileClass(previlegeType) {
        if(previlegeType === 'Mobile') {
            this.setState({
               activePrevilegeType: previlegeType,
               isMobileExpanded: true,
            });
        } else {
            this.setState({
                activePrevilegeType: '',
                isMobileExpanded: false,
                isWebExpanded: true
            });
        }        
      }
      moreLess() {
        if (this.state.activePrevilegeType === 'Web') {
          return (
            <span>
              <img src={uparrow} className="w-12 pb-2" />
            </span>
          );
        } else {
          return (
            <span>
              <img src={downarrow} className="w-12 pb-1" />
            </span>
          );
        }
      }
      moreLessMobile() {
        if (this.state.activePrevilegeType === 'Mobile') {
          return (
            <span>
              <img src={uparrow} className="w-12 pb-1" />
            </span>
          );
        } else {
          return (
            <span>
              <img src={downarrow} className="w-12 pb-1" />
            </span>
          );
        }
      }

    groupByprevilegeType = (array) => {
        let initialValue = {
            mobile: [], 
            web: []
        }            
        return array.reduce((accumulator, current) => {
            (current.previlegeType === 'Mobile') ? accumulator.mobile.push(current) : accumulator.web.push(current);
            return accumulator;
        }, initialValue);
    } 
    groupByprivilegeType = (array) => {
        let initialValue = {
            mobile: [], 
            web: []
        }            
        return array.reduce((accumulator, current) => {
            (current.privilegeType === 'Mobile') ? accumulator.mobile.push(current) : accumulator.web.push(current);
            return accumulator;
        }, initialValue);
    } 

    editRole(items) {
        this.setState({
            showModal: true,
            roleName: items.roleName,
            isEdit: true,
            searchCreatedBy: items.searchCreatedBy,
            descriptionName: items.description,
            roleId: items.id,
            isSearch: false,
            isRoleName:true,
            // domain: items.clientDomain.id
        }, () => {
            this.getPrivilegesByDomainId();
            URMService.getSubPrivilegesbyRoleId(items.roleName).then(res => {
                if(res) {
                let webPrivileges = [];
                let webSubPrivileges = [];
                let webChildPrivileges = [];
                let mobilePrivileges = [];
                let mobileSubPrivileges = [];
                let mobileChildPrivileges = [];
                let webPrivilegesResult = [];
                let mobilePrivilegesResult = [];
                 const parentPrivilegesResult = this.groupByprevilegeType(res.data.parentPrivileges);
                 if(parentPrivilegesResult.web) {
                    webPrivilegesResult = parentPrivilegesResult.web;
                 }
                 if(parentPrivilegesResult.mobile) {
                    mobilePrivilegesResult = parentPrivilegesResult.mobile;
                 }                 
                 if(mobilePrivilegesResult && mobilePrivilegesResult.length > 0) {
                    mobilePrivilegesResult.forEach((parent) => {
                        mobilePrivileges.push(parent);
                        parent.subPrivileges.forEach((sub) => {
                            mobileSubPrivileges.push(sub);
                            sub.childPrivileges.forEach((child) => {
                                mobileChildPrivileges.push(child);
                            });
                        });
                     });
                 }
                 
                 if(webPrivilegesResult && webPrivilegesResult.length > 0) {
                    webPrivilegesResult.forEach((parent) => {
                        webPrivileges.push(parent);
                        parent.subPrivileges.forEach((sub) => {
                            webSubPrivileges.push(sub);
                            sub.childPrivileges.forEach((child) => {
                                webChildPrivileges.push(child);
                            });
                        });
                     });
                 }                
                 
                  this.setState({
                    childList: webSubPrivileges,
                    selectedChilds: webChildPrivileges, 
                    parentsList: webPrivileges,
                    mobileChildList: mobileSubPrivileges,
                    mobileParentsList: mobilePrivileges,                                     
                    mobileSelectedChilds: mobileChildPrivileges
                  })
                }
            });
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
    avoidSpace(e) {
        if (e.key === " ") {
            e.preventDefault();
          }
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
                                    <th className='col-6'>WEB</th>
                                    <th className='col-6'>MOBILE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td className='col-6'>
                                        <div>
                                        {this.state.productsList.length > 0}
                                            {this.getPrivilegesList()}
                                      </div>
                                     </td>
                                        <td className='col-6'>
                                            <div>
                                                {this.state.mobileProductsList.length > 0 }
                                                {this.getMobilePrivilegesList()}
                                            </div>
                                        </td>
                                    </tr>
                                                               
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
                                            onKeyDown={this.avoidSpace}
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
                            <div className="row m-0 p-0 mt-1">
                                {this.addedMobileRoles()}
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
                        <button className="btn-unic-search active" onClick={this.showRoles}><i className="icon-add_role"></i> Add Role </button>
                    </div>

                </div>
                <div>
                    {this.getRolesList()}
                </div>
            </div>
        )
    }
}
