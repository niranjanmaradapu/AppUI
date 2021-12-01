import React, { Component } from 'react'
import eventBus from '../../commonUtils/eventBus';
import { withRouter } from "react-router-dom";
import URMService from '../../services/URM/URMService';

class SubHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      selectedChildName: "",
      buttonsList: [],
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
            { childName: "Users", name: "Users", childImage: "deliveryslip", childPath: "/users" },
            { childName: "Roles", name: "Roles", childImage: "sale", childPath: "/roles" },
            { childName: "Stores",name: "Stores", childImage: "deliveryslip", childPath: "/stores" },
            { childName: "Domain", name:"Domain", childImage: "deliveryslip", childPath: "/domain" },
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
    this.setHeaders = this.setHeaders.bind(this);
    this.handleNavigationChange = this.handleNavigationChange.bind(this);
    //   this.setHeaders();

  }

  componentWillMount() {
    const domainName = sessionStorage.getItem("domainName");
    if(domainName === "config_user") { 
    this.setState({ message: "URM Portal" }, () => { this.setHeaders(); })
    } else {
      eventBus.on("subHeader", (data) =>
      this.setState({ message: data.message }, () => {this.setHeaders();}));
    }
}

setHeaders() {
  console.log(this.state.message);
  const domainName = sessionStorage.getItem("domainName");
  if(domainName === "config_user") { 
    this.state.moduleNames.forEach(ele => {
      if(ele.parentName == this.state.message) {
          this.setState({buttonsList: ele.children})
      }
  });
  } else {
     URMService.getSubPrivileges(this.state.message).then(res => {
    console.log(res);
    if(res) {
      this.setState({buttonsList: res.data.result});
    }
  });
  }

 

   
}


  // setHeaders() {

  //   this.state.moduleNames.forEach(ele => {
  //     if(ele.parentName == this.state.message) {
  //         this.setState({buttonsList: ele.children})
  //     }
  // });
  //     }

  // componentWillMount() {
  //   const user = sessionStorage.getItem('domainName');
  //   const selectedDomain = JSON.parse(sessionStorage.getItem('selectedDomain'));
  //   console.log(selectedDomain);
  //   if (user === 'config-user') {
  //     this.setState({ message: "URM Portal" }, () => { this.setHeaders(); })
  //   } else {
  //     eventBus.on("subHeader", (data) =>
  //       this.setState({ message: data.message }, () => { this.setHeaders(); })
  //     );

  //   }
   


  // }

  // setHeaders() {
  //   this.state.buttonsList = [];
  //   const selectedDomain = JSON.parse(sessionStorage.getItem('selectedDomain'));
  //   console.log(selectedDomain);
  //   let header = this.state.moduleNames;
  //   if (selectedDomain && selectedDomain.label === "Retail") {
  //     header = this.state.moduleRetailNames;
  //   }
  //   this.setState({ moduleNames: header },  () => { this.getChilds(); });
  //   console.log(this.state.moduleNames);
    
  // }

  // getChilds() {
  //   this.state.buttonsList = [];
  //   const usersList = JSON.parse(sessionStorage.getItem("usersList"));
  //   const user = sessionStorage.getItem('domainName');
  //   if(user === "config-user") {
  //     this.state.moduleNames.forEach(ele => {
  //       if (ele.parentName == this.state.message) {
  //         this.setState({ buttonsList: ele.children })
  //       }
  //     });
  //   } else if(usersList && usersList.length > 0) {
     
  //     for(let i = 0 ; i < usersList.length ; i++) {  
  //       if(usersList[i].role === "super_admin" && user === usersList[i].name) { 
  //         this.state.moduleNames.forEach(ele => {
  //           if (ele.parentName == this.state.message) {
  //             this.setState({ buttonsList: ele.children })
  //           }
  //         });
          
  //       } else  if(user === usersList[i].name) {
  //         for(let j = 0 ; j < this.state.moduleNames.length; j++) {
  //           if(this.state.moduleNames[j].parentName == "Customer Portal" && this.state.message =="Customer Portal") {
  //             this.setState({ buttonsList: usersList[i].selectedPrivilages.selectedList });
  //             break;

  //           }   else if (this.state.moduleNames[j].parentName == this.state.message) {
  //                 this.setState({ buttonsList: this.state.moduleNames[j].children });
  //                 break;
  //                }
  //         }
  //       }
  //     }

  //   }
    
  // }

  handleNavigationChange(index, childPath, childName) {
    console.log(childPath);
    this.setState({ selectedChildName: childName });
    this.props.history.push(childPath);
  }
  renderButtons() {
    return this.state.buttonsList.map((items, index) => {
      const { name, childPath } = items;
      return (
        <button key={index} className={`btn-unic m-r-2 ${this.state.selectedChildName == name ? 'active m-r-2 ' : ''}`}
          onClick={() => this.handleNavigationChange(index, childPath, name)}>{name}</button>
      );
    });
  }

  componentWillUnmount() {
    eventBus.remove("subHeader");
  }


  render() {

    // const  modules  = this.state.moduleNames;

    // let modulesList = modules.length > 0
    //   && modules.map((item, i) => {
    //   return (
    //     <button>{item.parentName}</button>
    //   )
    // }, this);

    return (
      <div className="header-sub">

        {this.renderButtons()}

      </div>
    )
  }
}
export default withRouter(SubHeader)