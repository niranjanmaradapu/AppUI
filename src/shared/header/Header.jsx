import { getDefaultNormalizer } from '@testing-library/react';
import React, { Component, useEffect } from 'react'
import { withRouter } from "react-router-dom";
import cashmemo from "../../assets/images/cash_memo.svg";
import profile from "../../assets/images/profile.svg";
import Select from 'react-select';
import { browserHistory } from 'react-router';
import logosm from '../../assets/images/easy_retail_logo.svg';
import portal_icon from '../../assets/images/c_portal.svg';
import search from '../../assets/images/search.svg';
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
import eventBus from '../../commonUtils/eventBus';
import URMService from '../../services/URM/URMService';


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
  constructor(props) {
    super(props)
    this.state = {
      userData: {},

      headerName: '',
      domainTitle: '',
      dropData: [],
      domainsList: [],
      headertype: "",
      domainLists: [],
      moduleNames: [
        {
          //   parentName: "Cash Memo & Delivery Slips",
          parentName: "Dashboard",
          path: "/dashboard",
          parentImage: "icon-cash_memo fs-30 i_icon",
          children: [
            {
              //   childName: "Create Delivery Slip",
              childName: "Dashboard",
              childImage: "icon-create_delivery_slip",
              childPath: "/createdeliveryslip",
            },

          ],
        },
        {
          //   parentName: "Cash Memo & Delivery Slips",
          parentName: "Customer Portal",
          path: "/createdeliveryslip",
          parentImage: "icon-cash_memo fs-30 i_icon",
          children: [
            {
              //   childName: "Create Delivery Slip",
              childName: " Generate Estimation Slip",
              childImage: "icon-create_delivery_slip",
              childPath: "/createdeliveryslip",
            },
            {
              //   childName: "New Sale",
              childName: "Generate Invoice",
              childImage: "icon-sale",
              childPath: "/newsale",
            },
            {
              //   childName: "Promo Item Exchange",
              childName: "Generate Return Slip",
              childImage: "icon-promo",
              childPath: "/generatereturnslip",
            },

            {
              childName: "Add Customer",
              childImage: "icon-create_customer",
              childPath: "/createcustomer",
            },
            {
              //   childName: "Tag Customer To GV",
              childName: "Gift Voucher",
              childImage: "icon-tag_customer",
              childPath: "/tagcustomer",
            },
            {
              //   childName: "Pos Day Close",
              childName: "Day Closure Activity",
              childImage: "icon-close",
              childPath: "/posdayclose",
            },
          ],
        },
        {
          parentName: "Inventory Portal",
          path: "/inventoryList",
          parentImage: "icon-notes fs-30 i_icon",
          children: [
            { childName: "Inventory List", childImage: "deliveryslip", childPath: "/inventoryList", },
            { childName: "Barcode List", childImage: "sale", childPath: "/barcodeList", },

          ],
        },
        {
          parentName: "Promotions & Loyalty",
          path: "/listOfPools",
          parentImage: "icon-notes_add fs-30 i_icon",
          children: [
            { childName: "List of Pools", childImage: "deliveryslip", childPath: "/listOfPools" },
            { childName: "Manage Promo", childImage: "sale", childPath: "/managePromo" },
            { childName: "Loyalty Points", childImage: "deliveryslip", childPath: "/loyaltyPoints" },
          ],
        },
        {
          parentName: "Accounting Portal",
          path: "/createNotes",
          parentImage: "icon-transfer fs-30 i_icon",
          children: [
            { childName: "Credit Notes", childImage: "deliveryslip", childPath: "/createNotes" },
            { childName: "Debit Notes", childImage: "sale", childPath: "/debitNotes" },
            { childName: "Create Tax Master", childImage: "deliveryslip", childPath: "/createTaxMaster" },
            { childName: "Create HSN Code", childImage: "deliveryslip", childPath: "/createHSN" },
          ],
        },

        {
          parentName: "Reports",
          path: "/salereport",
          parentImage: "icon-chart fs-30 i_icon",
          children: [
            {
              childName: "New Sale Report",
              childImage: "deliveryslip",
              childPath: "/salereport",
            },
            {
              childName: "Goods Return",
              childImage: "sale",
              childPath: "/listofsalebills",
            },
            {
              childName: "Sales Summary",
              childImage: "deliveryslip",
              childPath: "/listofdeliveryslips",
            },
            {
              childName: "List of Barcodes",
              childImage: "deliveryslip",
              childPath: "/listofreturnslips",
            },
            {
              childName: "List of promotions", childImage: "deliveryslip",
              childPath: "/listofPromotions"
            }
          ],
        },
        {
          parentName: "URM Portal",
          path: "/users",
          parentImage: "icon-r_brand fs-30 i_icon",
          children: [
            { childName: "Users", childImage: "deliveryslip", childPath: "/users" },
            { childName: "Roles", childImage: "sale", childPath: "/roles" },
            { childName: "Stores", childImage: "deliveryslip", childPath: "/stores" },
            { childName: "Domain", childImage: "deliveryslip", childPath: "/domain" },
          ],
        },
        {
          parentName: "HR Portal",
          path: "/hrPortal",
          parentImage: "icon-hsn fs-30 i_icon",
          children: [

          ],
        },
      ],
      moduleRetailNames: [
        {
          //   parentName: "Cash Memo & Delivery Slips",
          parentName: "Dashboard",
          path: "/dashboard",
          parentImage: "icon-cash_memo fs-30 i_icon",
          children: [
            {
              //   childName: "Create Delivery Slip",
              childName: "Dashboard",
              childImage: "icon-create_delivery_slip",
              childPath: "/createdeliveryslip",
            },

          ],
        },
        {
          //   parentName: "Cash Memo & Delivery Slips",
          parentName: "Customer Portal",
          path: "/newsale",
          parentImage: "icon-cash_memo fs-30 i_icon",
          children: [

            {
              //   childName: "New Sale",
              childName: "Generate Invoice",
              childImage: "icon-sale",
              childPath: "/newsale",
            },
            {
              //   childName: "Promo Item Exchange",
              childName: "Generate Return Slip",
              childImage: "icon-promo",
              childPath: "/generatereturnslip",
            },

            {
              childName: "Add Customer",
              childImage: "icon-create_customer",
              childPath: "/createcustomer",
            },
            {
              //   childName: "Tag Customer To GV",
              childName: "Gift Voucher",
              childImage: "icon-tag_customer",
              childPath: "/tagcustomer",
            },
            {
              //   childName: "Pos Day Close",
              childName: "Day Closure Activity",
              childImage: "icon-close",
              childPath: "/posdayclose",
            },
          ],
        },
        {
          parentName: "Inventory Portal",
          path: "/inventoryList",
          parentImage: "icon-notes fs-30 i_icon",
          children: [
            { childName: "Inventory List", childImage: "deliveryslip", childPath: "/inventoryList", },
            { childName: "Barcode List", childImage: "sale", childPath: "/barcodeList", },

          ],
        },
        {
          parentName: "Promotions & Loyalty",
          path: "/listOfPools",
          parentImage: "icon-notes_add fs-30 i_icon",
          children: [
            { childName: "List of Pools", childImage: "deliveryslip", childPath: "/listOfPools" },
            { childName: "Manage Promo", childImage: "sale", childPath: "/managePromo" },
            { childName: "Loyalty Points", childImage: "deliveryslip", childPath: "/loyaltyPoints" },
          ],
        },
        {
          parentName: "Accounting Portal",
          path: "/createNotes",
          parentImage: "icon-transfer fs-30 i_icon",
          children: [
            { childName: "Credit Notes", childImage: "deliveryslip", childPath: "/createNotes" },
            { childName: "Debit Notes", childImage: "sale", childPath: "/debitNotes" },
            { childName: "Create Tax Master", childImage: "deliveryslip", childPath: "/createTaxMaster" },
            { childName: "Create HSN Code", childImage: "deliveryslip", childPath: "/createHSN" },
          ],
        },

        {
          parentName: "Reports",
          path: "/salereport",
          parentImage: "icon-chart fs-30 i_icon",
          children: [
            {
              childName: "New Sale Report",
              childImage: "deliveryslip",
              childPath: "/salereport",
            },
            {
              childName: "Goods Return",
              childImage: "sale",
              childPath: "/listofsalebills",
            },
            {
              childName: "Sales Summary",
              childImage: "deliveryslip",
              childPath: "/listofdeliveryslips",
            },
            {
              childName: "List of Barcodes",
              childImage: "deliveryslip",
              childPath: "/listofreturnslips",
            },
            {
              childName: "List of promotions", childImage: "deliveryslip",
              childPath: "/listofPromotions"
            }
          ],
        },
        {
          parentName: "URM Portal",
          path: "/users",
          parentImage: "icon-r_brand fs-30 i_icon",
          children: [
            { childName: "Users", childImage: "deliveryslip", childPath: "/users" },
            { childName: "Roles", childImage: "sale", childPath: "/roles" },
            { childName: "Stores", childImage: "deliveryslip", childPath: "/stores" },
            { childName: "Domain", childImage: "deliveryslip", childPath: "/domain" },
          ],
        },
        {
          parentName: "HR Portal",
          path: "/hrPortal",
          parentImage: "icon-hsn fs-30 i_icon",
          children: [

          ],
        },
      ],
    }
  }



  componentWillMount() {

    const selectedDomain = sessionStorage.getItem("selectedDomain");
    console.log(selectedDomain);


    const domainName = sessionStorage.getItem("domainName");
    const user = JSON.parse(sessionStorage.getItem("user"));
    this.state.user = user["cognito:username"];
    if(domainName === "config_user") {
      let header;
       this.state.headertype = "URM Portal";
       console.log(this.state.headertype);
       eventBus.dispatch("subHeader", { message: this.state.headertype });
          header = [
            {
              name: "URM Portal",
              id:'1',
              path: "/users",
              parentImage: "icon-r_brand fs-30 i_icon",
              children: [
                { childName: "Users", childImage: "deliveryslip", childPath: "/users" },
                { childName: "Roles", childImage: "sale", childPath: "/roles" },
              ],
            },
            {
              name: "Accounting Portal",
              id:'2',
              path: "/domain",
              parentImage: "icon-r_brand fs-30 i_icon",
              children: [
                { childName: "Domain", childImage: "deliveryslip", childPath: "/domain" },
                { childName: "Stores", childImage: "deliveryslip", childPath: "/stores" },
               ],
            }
    
          ];
          const dropData = [
            {
              value: 4,
              label: "Logout"
            }
          ];

          this.setState({dropData:dropData})
         this.setState({moduleNames: header});
         
    } else if(user["custom:isSuperAdmin"] === "true") {
      const clientId =  user["custom:clientId1"];
    //   URMService.getMasterDomainsList().then((res) => {
    //     if(res) {
    //         this.setState({domainLists: res.data.result}, () => {
    //           this.getDomains();
    //         });
            
    //     } 
    // });


    URMService.getDomainsList(clientId).then((res) => { 
      if(res) {
       console.log(res.data.result);
        this.setState({domainLists: res.data.result}, () => {
                    this.getDomains();
                  });
      }
     
  });
    
    }
     else {
       if(user["cognito:groups"] && user["cognito:groups"][0] !== "config_user") {
        URMService.getSelectedPrivileges(user["custom:roleName"]).then(res => {
          if(res && res.data && res.data.result){
            this.setState({moduleNames: res.data.result.parentPrivilages});
            eventBus.dispatch("subHeader", { message: (res.data.result && res.data.result.parentPrivilages.length>0)?res.data.result.parentPrivilages[0].id:"" });
          }
         
        });
       }
   
      this.getDomains();
    }
   
  }

  getDomains() {
    let dataDrop = [];
    const user = JSON.parse(sessionStorage.getItem("user"));
    const clientId =  user["custom:clientId1"];
    const domainId = JSON.parse(sessionStorage.getItem("selectedDomain"));
       
    if(user["custom:isSuperAdmin"] === "true") { 
      this.state.domainLists.forEach((ele, index) => {
        const obj  = {
          value: ele.clientDomainaId,
          label: ele.domaiName
        }
        dataDrop.push(obj);
      });
     
      if(domainId && domainId.label === "Retail") {
        this.state.domainId = 2;
      } else if(domainId && domainId.label === "Textile") {
        this.state.domainId = 1;
      }
      this.setState({ selectedOption: domainId }, ()=>{
        this.setAdminHeader();
      });
    } 
    else if(user["cognito:groups"] && user["cognito:groups"][0] !== "config_user" && user["custom:clientDomians"]) {
     
      const clientDomainId = user["custom:clientDomians"].split(",")[0];
      URMService.getDomainName(clientDomainId).then(res => {
        if(res) {
          const obj  = {
            value: res.data.result.domain[0]?.id,
            label: res.data.result.domaiName
          }
          dataDrop.push(obj);
          sessionStorage.setItem("selectedDomain", JSON.stringify(dataDrop[1]));
        }
      });
    }

    const dropLogout = 
    {
      value: 4,
      label: "Logout"
    };
  dataDrop.push(dropLogout);
  
  this.setState({dropData:dataDrop},()=>{
    console.log(this.state.dropData);
    sessionStorage.setItem("selectedDomain", JSON.stringify(dataDrop[1]));
  });
 
  const domainName = JSON.parse(sessionStorage.getItem("selectedDomain"));
  this.setState({ selectedOption: domainName });
  console.log(this.state.selectedOption);

  if(domainName === "config_user") {
   
     eventBus.dispatch("subHeader", { message: this.state.headertype });
  }
 
  } 
 
  removeDuplicates(array, key) {
    const lookup = new Set();
    return array.filter(obj => !lookup.has(obj[key]) && lookup.add(obj[key]));
  }


  logOut = () => {
    this.props.history.push("/");
    sessionStorage.removeItem("selectedDomain");
    window.location.reload();
  }

  handleChange = e => {
    // setSelectedOption(e);
   
    sessionStorage.setItem("selectedDomain", JSON.stringify(e));
    if (e.label === 'Logout') {
      sessionStorage.removeItem("selectedDomain");
      this.props.history.push("/");
        sessionStorage.clear();
      window.location.reload();
    } else {
      //  sessionStorage.setItem('domainName',JSON.stringify(e));
      if (e.label === 'Textile') {
       // this.props.history.push("createdeliveryslip");
       // window.location.reload();
       this.setState({domainId : 1}, () => {
        this.setAdminHeader();
      });
      this.state.headertype = "Dashboard";
      this.setAdminHeader();
      } else if (e.label === 'Retail') {
  //      this.props.history.push("retail");
        // header = this.state.moduleRetailNames;
        this.setState({domainId : 2}, () => {
          this.setAdminHeader();
        });
        this.state.headertype = "Retail";
      
    //   window.location.reload();
        // this.state.headertype = "Retail";
        // this.setAdminHeader();
     //   header = this.state.moduleRetailNames;
      } else if (e.label === 'Electronics') {
        this.props.history.push("electronics");
        window.location.reload();
      } else if (e.label === 'Admin') {
        this.state.headertype = "URM Portal";
       this.setAdminHeader();
      } else if(e.label === 'MultiDomain') {
        this.props.history.push("retail");
      }
      this.setState({ selectedOption: e });
     
     
    }
  }

  setAdminHeader() {
    
  //  this.setState({headertype: "URM Portal"});

  // const selectedDomain = JSON.parse(sessionStorage.getItem('selectedDomain'));
  // let header = this.state.copyModules;
  // if (selectedDomain && selectedDomain.label === "Retail") {
  //   header = this.state.moduleRetailNames;
  // }
  // this.setState({ moduleNames: header },  () => { this.getChilds(); });
  const user = JSON.parse(sessionStorage.getItem("user"));
  if(this.state.user !== "config_user" && user["custom:isSuperAdmin"] === "true") { 

    URMService.getAllPrivilegesbyDomain(this.state.domainId).then(res => {
      console.log(res);
      if(res) {
       
        this.setState({moduleNames: res.data.result});
        this.props.history.push("/dashboard");
        eventBus.dispatch("subHeader", { message: (res.data.result && res.data.result.length>0)?res.data.result[0].id:"" });
      }
    });

  } else {
    URMService.getSelectedPrivileges(user["custom:roleName"]).then(res => {
      this.setState({moduleNames: res.data.result.parentPrivilages});
      eventBus.dispatch("subHeader", { message: (res.data.result && res.data.result.parentPrivilages.length>0)?res.data.result.parentPrivilages[0].id:"" }
      );
    });
  }
   
  
  }

  getChilds() {
    let parentPath;
  //  eventBus.dispatch("subHeader", { message: this.state.headertype });
    this.state.moduleNames.forEach(ele => {
      if (ele.parentName == this.state.headertype) {
        parentPath = ele.path
      }
      this.props.history.push(parentPath);
      

    }); 
    if(this.state.headertype === "Retail") {
      this.props.history.push("retail");
      window.location.reload();
    }
  }

  // componentWillMount(){
  //     this.state.user = sessionStorage.getItem('domainName');
  //     if(this.state.user !== "config_user") {
  //       this.state.domainsList = JSON.parse(sessionStorage.getItem('domainList'));
  //       const obj = {
  //         createdDate: "",
  //         createdUser: "",
  //         description: "",
  //         domain: "Logout"
  //        }
  //        this.state.domainsList.push(obj);
  //     }  else {
  //       const obj = {
  //         createdDate: "",
  //         createdUser: "",
  //         description: "",
  //         domain: "Logout"
  //        }
  //        this.state.domainsList.push(obj);
  //     }    



  // }


  handleSelectChange = (e) => {
    console.log(e.target.value);
    const domainName = sessionStorage.getItem("domainName");
    let parentPath;
    this.setState({headertype: e.target.value});
    eventBus.dispatch("subHeader", { message: e.target.value });
    this.state.moduleNames.forEach(ele => {
      if (ele.id == e.target.value) {
        if(ele.path) {
          parentPath = ele.path;
        } else {
          if(ele.subPrivillages) {
            parentPath = ele.subPrivillages[0].childPath;
          }
        }
       
       if(domainName === "config_user") {
        eventBus.dispatch("subHeader", { message: ele.name });
       }
    //   
         // parentPath = ele.subPrivillages[0].childPath;
        
      } 
      
      

    });
    // this.props.history.push(parentPath);
    // console.log(parentPath);
      if(parentPath) {
        this.props.history.push(parentPath);
      } else {
        this.props.history.push("/dashboard");
      }

   // this.props.history.push("/dashboard");

  }

  render() {
    let domainList;
    const modules = this.state.moduleNames;

    let modulesList = modules.length > 0
      && modules.map((item, i) => {
        {
          return item.name && (
            <option key={i} value={item.id}>{item.name}</option>
          )
        }
        // return (
          
        //   <option key={i} value={item.id}>{item.name}</option>
        //   // <option key={i} value={item.parentName}>{item.parentName}</option>
        // )
      }, this);

    //   if(this.state.domainsList && this.state.domainsList.length > 0) {
    //     const modules = this.state.domainsList;
    //   domainList = modules.length > 0
    //         && modules.map((item, i) => {
    //             return (

    //                 <option key={i} value={item.domain}>{item.domain}</option>
    //             )
    //         }, this);
    // }


    return (

      <div className="row">
        <div className="col-sm-4 col-xs-12">
          <div className="row">
            <div className="col-6 header-logo">
              <img src={logosm} />
            </div>
            <div className="col-6">
              <div className="module_select">
                <img src={portal_icon} />
                <select value={this.state.headertype} onChange={this.handleSelectChange}>

                  {modulesList}
                </select >
              </div>
            </div>
          </div>
        </div>
        {/* <div className="text-left">
          <img src={logosm} />
        </div> */}
        {/* <select  onChange={this.handleSelectChange}>
            {modulesList}
          </select > */}
        <div className="col-sm-8 col-xs-12 text-right">
          {/* <div className="col-6">
                        <div className="header-left d-flex">
                        <img src={cashmemo} /> 
                        <h6>{this.props.headerTitle}</h6>

                        </div>
                    </div> */}
          <div className="row">
            <div className="col-sm-5"></div>
            {/* <div className="col-5 search_bar">
              <form className="form-inline my-2 my-lg-0 ml-2">
                <input className="form-control" type="search" placeholder="Search by bill no, barcode etc..."
                  aria-label="Search" />
                <button className="search_head my-2 my-sm-0" type="submit"></button>
              </form>
            </div> */}
            <div className="col-sm-7 col-xs-12 text-right">
              <div className="header-right float-right">
                <ul className="navbar-nav">
                  {/* <li className="nav-item upper-case">{this.props.user.name}</li> */}
                  {/* <li className="nav-item upper-case">Ashok</li>  */}
                  {/* <li className="nav-item">Help</li> */}
                  <li className="nav-item dropdown">
                    {/* <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> */}
                    {/* <img src={profile}  className="rounded-circle" />  */}
                    <div className="itemMain">
                      <div className="itemMain-left">
                        <i className="icon-tag_customer"></i>
                      </div>
                      <div className="itemMain-right text-left">
                        <span className="text-left p-l-2 mb-0">{this.state.user}</span>
                        <Select className="align"
                          value={this.state.selectedOption} // set selected value
                          options={this.state.dropData} // set list of the data
                          onChange={this.handleChange} // assign onChange function
                        />

                        {/* <select className="form-control align" onChange={this.handleChange}>

                          {domainList}
                        </select > */}
                      </div>
                    </div>
                    {/* <span className="text-left mb-0 d-flex"><i className="icon-tag_customer fs-30 p-r-2"></i> Kevin Suda</span>
                        <Select 
        value={this.state.selectedOption}
        options={this.state.dropData} 
        onChange={this.handleChange} 
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
      </div>
    )
  }
}
export default withRouter(Header)
