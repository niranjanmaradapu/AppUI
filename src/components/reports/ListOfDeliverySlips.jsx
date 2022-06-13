import React, { Component } from "react";
import print from "../../assets/images/print.svg";
import view from "../../assets/images/view.svg";
import ListOfDeliverySlipsService from "../../services/Reports/ListOfDeliverySlipsService";

export default class ListOfDeliverySlips extends Component {
  constructor(props) {
    super(props);
    RecentDSNumber: sessionStorage.getItem("recentDS");
    this.state = {
      // dsNumber: null,
      // status: null,
      dateFrom: null,
      dateTo: null,
      itemId: "",
      itemName: "",
      storeList: [],
      domaindataId: "",

      // selectOption: [
      //   {
      //     value: "0",
      //     label: "select",
      //     id: "0",
      //   },
      //   {
      //     value: 1,
      //     label: "km guntur",
      //     id: "1",
      //   },
      //   {
      //     value: 2,
      //     label: "guntur",
      //     id: "2",
      //   },
      //   {
      //     value: 3,
      //     label: "Guntur 2",
      //     id: "3",
      //   },
      // ],
      dsList: [],
    };

    this.getDeliverySlips = this.getDeliverySlips.bind(this);
  }

  getDeliverySlips() {
    const obj = {
      dateFrom: this.state.dateFrom ? this.state.dateFrom : undefined,
      dateTo: this.state.dateTo ? this.state.dateTo : undefined,

      storeId:
        parseInt(this.state.storeId) && parseInt(this.state.storeId) != 0
          ? parseInt(this.state.storeId)
          : undefined,
     //  domainId: this.state.domaindataId ? parseInt(this.state.domaindataId) : undefined,

      store: {
        id:
          parseInt(this.state.storeId) && parseInt(this.state.storeId) != 0
            ? this.state.storeId
            : undefined,
        name: this.state.storeName,
      },
    };

    console.log(">>>>>Parms", obj);
    ListOfDeliverySlipsService.getDeliverySlips(obj)
      .then((res) => {
        // console.log("......", res);
        console.log(res.data.result);
        let data = res.data.result;
        let a = [];

        // if (res.data.result) {
        data.salesSummery.transction = "Sales Invoicing";
        data.retunSummery.transction = "Return Invoicing";

        a.push(data.salesSummery);
        a.push(data.retunSummery);
        console.log(">>>>>>>>aaaaaaa", a);

        this.setState({
          dsList: a,
          totMrp: data.totalMrp,
          billValue: data.billValue,
          totalDiscount: data.totalDiscount,
        });
      })
      .catch((e) => {});
  }

  // componentWillMount() {
  //   const user = JSON.parse(sessionStorage.getItem("user"));
  //   console.log("user", user);
  //   this.setState(
  //     {
  //       userName: user["cognito:username"],
  //       isEdit: false,
  //       clientId: user["custom:clientId1"],
  //       domainId1: user["custom:domianId1"],
  //     },
  //     () => {
  //       console.log(this.state);
  //       this.getStoreNames(user["custom:domianId1"]);
  //     }
  //   );
  // }

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
      let testData = [];
      testData.push(JSON.parse(sessionStorage.getItem("selectedDomain")));

      this.setState(
        {
          storeList: testData,
          clientId: user["custom:clientId1"],
          domainId1: testData[0].value,
          domainDetails: this.state.domainDetails,
        },
        () => {
          console.log(this.state);
          this.getStoreNames(user["custom:clientId1"]);
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
    ListOfDeliverySlipsService.getStoreNames(domainId).then((res) => {
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

  renderTableData() {
    console.log(">>>>>>>>dataa", this.state.dsList);
    return this.state.dsList.map((items, index) => {
      const { totalMrp, totalDiscount, billValue, transction } = items;
      return (
        <tr className="" key={index}>
          <td className="col-3">{transction}</td>
          <td className="col-2">₹ {totalMrp}</td>
          <td className="col-3">₹ {totalDiscount}</td>
          <td className="col-3">₹ {billValue}</td>
        </tr>
      );
    });
  }
  // handleSelect(e) {
  //   let obj = this.state.selectOption.find((o) => o.label === e.target.value);
  //   this.setState({
  //     itemId: obj.id,
  //     itemName: e.target.value,
  //   });
  // }
  render() {
    return (
      <div className="maincontent">
        <div className="row">
          <div className="col-12 col-sm-3 mt-2">
            <label>From Date</label>
            <div className="form-group">
              <input
                type="date"
                className="form-control"
                placeholder="FROM DATE"
                value={this.state.dateFrom}
                onChange={(e) => this.setState({ dateFrom: e.target.value })}
              />
            </div>
          </div>
          <div className="col-12 col-sm-3 mt-2">
            <div className="form-group">
              <label>To Date</label>
              <input
                type="date"
                className="form-control"
                placeholder="TO DATE"
                value={this.state.dateTo}
                onChange={(e) => this.setState({ dateTo: e.target.value })}
              />
            </div>
          </div>

          {/* <div className="col-12 col-sm-3 mt-2">
            <div className="form-group">
              <label>Store</label>
              <select
                className="form-control"
                value={this.state.storeId}
                onChange={(e) => {
                  console.log("storelist", this.state.storeList);
                  const selectedValue = this.state.storeList.filter((item) => {
                    return item.id == e.target.value;
                  });
                  console.log("selectedValue", selectedValue);
                  this.setState({
                    storeId: e.target.value,
                    storeName: selectedValue[0].name,
                  });
                }}
              >
                {this.state.storeList.map((i) => {
                  return (
                    <option key={i.id} value={i.id}>
                      {i.name}
                    </option>
                  );
                })}
              </select>
            </div> */}
          {/* </div> */}

          <div className="col-12 col-sm-3 scaling-center scaling-mb mt-2 pt-4">
            <div className="form-group">
              <button
                className="btn-unic-search active"
                onClick={this.getDeliverySlips}
              >
                SEARCH{" "}
              </button>
            </div>
          </div>
        </div>
        <div className="row m-0 p-0 mt-3">
          <div className="col-12 col-sm-6 scaling-mb scaling-center p-l-0">
            <h5 className="mt-2 fs-18">
              Sales Summary
              {/* <span className="text-red fs-14">(20 Sep 2021</span>{" "}
              <span className="fs-14">To</span>{" "}
              <span className="fs-14 text-red">30 Sep 2021)</span> */}
            </h5>
          </div>
          <div className="col-12 col-sm-6 text-right scaling-center scaling-mb pt-2 p-r-0">
            <button type="button" className="btn-nobdr">
              <img src={print} className="w-12 m-r-2 pb-2" /> PRINT{" "}
            </button>
          </div>
        </div>
        <div className="row m-0 p-0 mb-3">
          <div className="table-responsive p-0">
            <table className="table table-borderless mb-1 mt-2">
              <thead>
                <tr className="m-0 p-0">
                  <th className="col-3">TRANSACTION</th>
                  <th className="col-2">TOTAL MRP</th>
                  <th className="col-3">PROMO OFFER</th>
                  <th className="col-3">INVOICE AMOUNT</th>
                </tr>
              </thead>
              {/* <tbody>
                <tr className="">
                    <td className="col-1">01</td>
                    <td className="col-3">Sales Invoicing</td>
                    <td className="col-2">₹ 10,350.00</td>
                    <td className="col-3">₹ 2,350.00</td>
                    <td className="col-3">₹ 8,000.00</td>
                 </tr>  
                 <tr className="">
                    <td className="col-1">02</td>
                    <td className="col-3">Return Invoicing</td>
                    <td className="col-2">₹ 2,550.00</td>
                    <td className="col-3">₹ 550.00</td>
                    <td className="col-3">₹ 2,000.00</td>
                 </tr>   
                  </tbody> */}
              <tbody>{this.renderTableData()}</tbody>
            </table>
          </div>
          <div className="rect-cardred m-0 mb-4">
            <div className="row">
              <div className="col-1 col-sm-3 text-center"></div>

              <div className="col-3 col-sm-2">
                <label>TOTAL MRP</label>
                {/* <h6 className="pt-2">₹ 7,500.00</h6> */}
                <h6 className="pt-2">₹ {this.state.totMrp}</h6>
              </div>
              <div className="col-5 col-sm-4">
                <label>TOTAL PROMO OFFER</label>
                <h6 className="pt-2">₹ {this.state.totalDiscount}</h6>
              </div>
              <div className="col-3 col-sm-2  pt-2 text-left text-red p-r-4">
                <label className="text-red ">GRAND TOTAL</label>
                <h6 className="fs-16 text-red ">₹ {this.state.billValue}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
