import moment from "moment";
import React, { Component } from "react";
import edit from "../../assets/images/edit.svg";
import view from "../../assets/images/view.svg";
import ListOfPromotionsService from "../../services/Reports/ListOfPromotionsService";
import ReactPageNation from "../../commonUtils/Pagination";

export default class ListOfPromotions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // startDate: moment(new Date()).format("YYYY-MM-DD").toString(),
      // endDate: moment(new Date()).format("YYYY-MM-DD").toString(),
      pageNumber:0,
      totalPages:0,
      startDate: "",
      endDate: "",
      storeName: "",
      promoId: "",
      promoList: [],
      storeList: [],
      applicability:"",
      promoStatus:null,
      isActive:'',
      applicabilies: [
        {
          name: "Promo Type",
          id: "promo Type",
        },
        {
          name: "On Barcode",
          id: "promotionForEachBarcode",
        },
        {
          name: "On WholeBill",
          id: "promotionForWholeBill",
        },
      ],
      selectPromoStatus:[
        { name: "Promo Status" ,
         id: 'Promo Status' },
        { id: true, 
          name: 'Active' },
        { id:  false, 
          name: 'Inactive' },
      ]
    };
    this.getPromotions = this.getPromotions.bind(this);
    this.preventMinus = this.preventMinus.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  getPromotions(pageNumber) {
    const obj = {
      // startDate: this.state.startDate ? this.state.startDate : undefined,
      // endDate: this.state.endDate ? this.state.endDate : undefined,
      // promoId: parseInt(this.state.promoId)
      //   ? parseInt(this.state.promoId)
      //   : undefined,
      // storeName: this.state.storeName ? this.state.storeName : undefined,
      // isActive:true,
      isActive:this.state.isActive,
      applicability:this.state.applicability,
      clientId:this.state.clientId,
      // promoStatus:this.state.promoStatus
      // storeId: this.state.storeId ? parseInt(this.state.storeId) : undefined,
    };
    ListOfPromotionsService.getPromotions(obj,pageNumber).then((res) => {
      console.log(res.data.result);
      this.setState({
        promoList: res.data.result,
        totalPages:res.data.result.totalPages
      });
    });
  }

  renderTableData() {
    return this.state.promoList?.content?.map((items, index) => {
      const {
        promoId,
        promotionName,
        description,
        promoApplyType,
        applicability,
        storeName,
        startDate,
        endDate,
      } = items;
      return (
        <tr className="">
          <td className="col-2">{promoId}</td>
          <td className="col-2">{promotionName}</td>
          <td className="col-2">{description}</td>
          <td className="col-2">{promoApplyType}</td>
          <td className="col-2">{applicability}</td>
         
        </tr>
      );
    });
  }

  componentWillMount() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const storeId = sessionStorage.getItem("storeId");
    this.setState({ storeId: storeId });
    console.log("user", user);
    const domainData = JSON.parse(sessionStorage.getItem("selectedDomain"));
    // if (domainData.label == "Textile") {
    //   this.setState({ domaindataId: 1 });
    // } else if (domainData.label == "Retail") {
    //   this.setState({ domaindataId: 2 });
    // }
    if (user["custom:isSuperAdmin"] === "true") {
      this.state.domainDetails = JSON.parse(
        sessionStorage.getItem("selectedDomain")
      );

      // const user = JSON.parse(sessionStorage.getItem("user"));
      // console.log("user", user);
      // if (user["custom:isSuperAdmin"] === "true") {
      //   this.state.domainDetails = JSON.parse(
      //     sessionStorage.getItem("selectedDomain")
      //   );

      //   console.log(
      //     ">>>>>>>domain",
      //     JSON.parse(sessionStorage.getItem("selectedDomain"))
      //   );
      let testData = [];
      testData.push(JSON.parse(sessionStorage.getItem("selectedDomain")));

      console.log(">>>>>>parsedata", testData);

      this.setState(
        {
          storeList: testData,
          clientId: user["custom:clientId1"],
          domainId1: testData[0].value,
          domainDetails: this.state.domainDetails,
        },
        () => {
          console.log(this.state);
          this.getStoreNames(this.state.domainId1);
        }
      );
    } else {
      this.setState(
        {
          userName: user["cognito:username"],
          isEdit: false,
          clientId: user["custom:clientId1"],
          domainId1: user["custom:domianId1"],
        },
        () => {
          console.log(this.state);
          this.getStoreNames(user["custom:clientId1"]);
        }
      );
    }
  }

  getStoreNames = (domainId) => {
    console.log("vgfgfhgfhgf", this.state.domainId1, domainId);
    ListOfPromotionsService.getStoreNames(domainId).then((res) => {
      console.log("........", res);
      var optionList = [];
      if (res.data.result) {
        var obj = { id: "0", name: "SELECT STORE" };
        optionList.push(obj);
        res.data.result.map((data) => {
          obj = {
            id: data.id,
            name: data.name,
          };
          optionList.push(obj);
        });
      }

      this.setState({
        storeList: optionList,
      });
    });
  };

  preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };

  changePage(pageNumber) {
    console.log(">>>page", pageNumber);
    let pageNo = pageNumber + 1;
    this.setState({ pageNumber: pageNo });
    this.getPromotions(pageNumber); 
  }


  handleSelect(e) {
    if (e.target.value != "Promo Type") {
      this.setState({
        applicability: e.target.value,
      });
    }
  }

  handleSelectStatus(e){
    if (e.target.value != "Promo Status") {
      this.setState({
        isActive: e.target.value,
      });
    }
  }
  render() {
    console.log("startdate", moment(new Date()).format("YYYY-DD-MM"));
    return (
      <div className="maincontent">
        <div className="row">

        <div className="col-12 col-sm-2 mt-2">
            <label>Promo Type</label>
            <div className="form-group">
              <select
                className="form-control"
                value={this.state.applicability}
                onChange={(e) => {
                  this.handleSelect(e);
                }}
                // onChange={(e) => this.setState({ status: e.target.value })}
              >
                {this.state.applicabilies.map((i) => {
                  return (
                    <option key={i.id} value={i.id}>
                      {i.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>


          <div className="col-12 col-sm-2 mt-2">
            <label>Promo Status</label>
            <div className="form-group">
              <select
                className="form-control"
                value={this.state.isActive}
                onChange={(e) => {
                  this.handleSelectStatus(e);
                }}
                // onChange={(e) => this.setState({ status: e.target.value })}
              >
                 {/* <option>Promo Status</option> */}
                 { 
                  // this.state.selectPromoStatus &&
                this.state.selectPromoStatus.map((i) => {
                  return (
                    <option key={i.id} value={i.id}>
                      {i.name}
                    </option>

                // <option key={i} value={i.value}>{i.label}</option>
                  );
                })}
              </select>
            </div>
          </div>

        
          <div className="col-6 col-sm-4 pt-4 scaling-mb mt-2">
            <div className="form-group" onClick={()=>{this.getPromotions(0);this.setState({pageNumber:0})}}>
              <button className="btn-unic-search active">Search </button>
            </div>
          </div>
        </div>
        <h5 className="pl-4 mt-3 fs-18 scaling-center scaling-mb">
          List Of Promotions
        </h5>
        <div className="row m-0 p-0 mb-3">
          <div className="table-responsive p-0">
            <table className="table table-borderless mb-1 mt-2">
              <thead>
                <tr className="m-0 p-0">
                  <th className="col-2">PROMO ID</th>
                  <th className="col-2">PROMO NAME</th>
                  <th className="col-2">DESCRIPTION</th>
                  <th className="col-2">Promo Apply Type</th>
                  <th className="col-2">Applicability</th>
                </tr>
              </thead>
              {/* <tbody>
              <tr className="">
                <td className="col-1">PRO1101</td>
                <td className="col-2">Buy 1 Get 1</td>
                <td className="col-2">2L soft drinks</td>
                <td className="col-2">kphb</td>
                <td className="col-2">30 Sep 2021</td>
                <td className="col-2">30 Oct 2021</td>
                <td className="col-2 text-center">
                  <img src={edit} className="w-12 m-r-2 pb-2" />
                  <i className="icon-delete fs-16"></i>
                </td>
              </tr>
             </tbody> */}
              <tbody>{this.renderTableData()}</tbody>
            </table>
            <div className="row m-0 pb-3 mb-5 mt-3">
            {this.state.totalPages > 1 ? (
            <div className="d-flex justify-content-center">
                 <ReactPageNation
                  {...this.state.promoList}
                  changePage={(pageNumber) => {
                    this.changePage(pageNumber);
                    }}
                   />
                  </div>
            ):null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
