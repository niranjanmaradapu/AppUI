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

      selectOption: [
        {
          value: "0",
          label: "select",
          id: "0",
        },
        {
          value: 1,
          label: "km guntur",
          id: "1",
        },
        {
          value: 2,
          label: "guntur",
          id: "2",
        },
        {
          value: 3,
          label: "Guntur 2",
          id: "3",
        },
      ],
      dsList: [],
    };

    this.getDeliverySlips = this.getDeliverySlips.bind(this);
  }

  getDeliverySlips() {
    const obj = {
      // dsNumber: this.state.dsNumber,
      // status: this.state.status,
      dateFrom: this.state.dateFrom,
      dateTo: this.state.dateTo,
      store: {
        id: parseInt(this.state.storeId),
        name: this.state.storeName,
      },
      // barcode: this.state.barcode,
    };

    console.log(">>>>>Parms", obj);
    // let test = {
    //   dateFrom: null,
    //   dateTo: null,
    //   billValue: -1200,
    //   totalDiscount: 499,
    //   retunSummery: {
    //     billValue: 2200,
    //     totalDiscount: 500,
    //     totalMrp: 999,
    //   },
    //   salesSummery: {
    //     billValue: 1000,
    //     totalDiscount: 999,
    //     totalMrp: 1999,
    //   },
    //   barcodes: null,
    //   store: null,
    //   totalMrp: 1000,
    // };

    // console.log(">>>>>>>>>>>>>>======", a);
    // this.setState({
    //   dsList: a,
    //   totMrp: test.totalMrp,
    //   billValue: test.billValue,
    //   totalDiscount: test.totalDiscount,
    // });

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
        // } else {
        //   this.setState({
        //     dsList: a,
        //     totMrp: "",
        //     billValue: "",
        //     totalDiscount: "",
        //   });
        // }
      })
      .catch((e) => {});
  }

  // renderTableData() {
  //     return this.state.dsList.map((items, index) => {
  //         const { dsNumber, mrp, promoDisc, salesMan, createdDate, netAmount, status } = items;
  //         return (
  //             <tr className="row m-0 p-0" key={index}>
  //                 <td className="col-1">{index + 1}</td>
  //                 <td className="col-2">{dsNumber}</td>
  //                 <td className="col-2">{createdDate}</td>
  //                 <td className="col-2">{status}</td>
  //                 <td className="col-1">₹{mrp}</td>
  //                 <td className="col-2">₹{promoDisc}</td>
  //                 <td className="col-1">₹{netAmount}</td>
  //                 <td className="col-1">{salesMan}</td>
  //                 <td className="col-1"><i className="icon-delete"></i></td>
  //             </tr>
  //         );
  //     });
  // }

  componentWillMount() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    console.log("user", user);
    this.setState(
      {
        userName: user["cognito:username"],
        isEdit: false,
        clientId: user["custom:clientId1"],
        domainId1: user["custom:domianId1"],
      },
      () => {
        console.log(this.state);
        this.getStoreNames(user["custom:domianId1"]);
      }
    );
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
  handleSelect(e) {
    let obj = this.state.selectOption.find((o) => o.label === e.target.value);
    this.setState({
      itemId: obj.id,
      itemName: e.target.value,
    });
  }
  render() {
    return (
      <div className="maincontent">
        <div className="row">
          <div className="col-12 col-sm-3 mt-2">
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
              <input
                type="date"
                className="form-control"
                placeholder="TO DATE"
                value={this.state.dateTo}
                onChange={(e) => this.setState({ dateTo: e.target.value })}
              />
            </div>
          </div>

          <div className="col-12 col-sm-3 mt-2">
            <div className="form-group">
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
                  //console.log("......ffhgjgyghjg", e.target);
                }}

                // onChange={(e) => {
                //   this.handleSelect(e);
                // }}
                // onChange={(e) => this.setState({ store: e.target.value })}
              >
                {this.state.storeList.map((i) => {
                  return (
                    <option key={i.id} value={i.id}>
                      {i.name}
                    </option>
                  );
                })}

                {/* {this.state.selectOption.map((i, j) => {
                  return <option key={j}>{i.label}</option>;
                })} */}
              </select>
            </div>
          </div>

          <div className="col-12 col-sm-3 scaling-center scaling-mb mt-2">
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
            <h5 className="mt-2">
              Sales Summary <span className="text-red fs-14">(20 Sep 2021</span>{" "}
              <span className="fs-14">To</span>{" "}
              <span className="fs-14 text-red">30 Sep 2021)</span>
            </h5>
          </div>
          <div className="col-12 col-sm-6 text-right scaling-center scaling-mb pt-2 p-r-0">
            <button type="button" className="btn-nobdr">
              <img src={print} className="w-12 m-r-2 pb-2" /> PRINT{" "}
            </button>
          </div>
        </div>
        <div className="row m-0 p-0 mb-3">
          <div className="table-responsive">
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
      // <div className="maincontent">
      //     <h5>Find Delivery Slips </h5>
      //     <div className="rect">
      //         <div className="row">
      //             <div className="col-2">
      //                 <div className="form-group">
      //                     <label>DS Status</label>
      //                     {/* <input type="search" className="form-control" /> */}
      //                     <select
      //                         className="form-control"
      //                         value={this.state.status}
      //                         onChange={(e) => this.setState({ status: e.target.value })}
      //                     >
      //                         <option value="Pending">Pending</option>
      //                         <option value="Completed">Completed</option>
      //                         <option value="Cancelled">Cancelled</option>
      //                     </select>
      //                 </div>
      //             </div>
      //             <div className="col-2">
      //                 <div className="form-group">
      //                     <label>DS Number</label>
      //                     <input type="search" className="form-control"
      //                         value={this.state.dsNumber}
      //                         onChange={(e) =>
      //                             this.setState({ dsNumber: e.target.value })
      //                         }
      //                     />
      //                 </div>
      //             </div>
      //             <div className="col-2">
      //                 <div className="form-group">
      //                     <label>Barcode</label>
      //                     <input type="search" className="form-control"
      //                         value={this.state.barcode}
      //                         onChange={(e) =>
      //                             this.setState({ barcode: e.target.value })
      //                         }
      //                     />
      //                 </div>
      //             </div>
      //             <div className="col-2">
      //                 <div className="form-group">
      //                     <label>From Date</label>
      //                     <input type="date" className="form-control"
      //                         value={this.state.dateFrom}
      //                         onChange={(e) =>
      //                             this.setState({ dateFrom: e.target.value })
      //                         }
      //                     />
      //                 </div>
      //             </div>
      //             <div className="col-2">
      //                 <div className="form-group">
      //                     <label>To Date</label>
      //                     <input type="date" className="form-control"
      //                         value={this.state.dateTo}
      //                         onChange={(e) =>
      //                             this.setState({ dateTo: e.target.value })
      //                         }
      //                     />
      //                 </div>
      //             </div>

      //             <div className="col-2">
      //                 <div className="form-group mt-3 pt-2">
      //                     <button className="btn-login btn-create"
      //                     onClick={this.getDeliverySlips}>Apply Filters </button>
      //                 </div>
      //             </div>
      //         </div>
      //     </div>
      //     <h5 className="pl-4 mt-3">List Of Delivery Slips</h5>
      //     <div className="rect p-l-3 p-r-3 pt-3">
      //         <table className="table table-borderless">
      //             <thead>
      //                 <tr className="row m-0 p-0">
      //                     <th className="col-1">S No</th>
      //                     <th className="col-2">Ds No</th>
      //                     <th className="col-1">Ds Date</th>
      //                     <th className="col-1">Ds Status</th>
      //                     <th className="col-2">Gross Amount</th>
      //                     <th className="col-1">Promo Disc</th>
      //                     <th className="col-2">Net Amount</th>
      //                     <th className="col-1">Action</th>
      //                     {/* <th className="col-1">Created On</th> */}
      //                     {/* <th className="col-1">Actions</th> */}
      //                 </tr>
      //             </thead>
      //             {/* <tbody>
      //         <tr className="row m-0 p-0">
      //             <td className="col-1">01</td>
      //             <td className="col-1">INV87528863</td>
      //             <td className="col-1">OF87528863</td>
      //             <td className="col-1">₹700:00</td>
      //             <td className="col-1">₹100:00</td>

      //             <td className="col-2">John Dev</td>
      //             <td className="col-2">Lorem ipsum, in graphical and textual </td>
      //             <td className="col-1">5218</td>
      //             <td className="col-1">20/06/2020</td>
      //             <td className="col-1">₹00:00</td>
      //         </tr>
      //         <tr className="row m-0 p-0">
      //             <td className="col-1">02</td>
      //             <td className="col-1">INV8752873763</td>
      //             <td className="col-1">OF874328863</td>
      //             <td className="col-1">₹700:00</td>
      //             <td className="col-1">₹100:00</td>

      //             <td className="col-2">John Dev</td>
      //             <td className="col-2">Lorem ipsum, in graphical and textual </td>
      //             <td className="col-1">5218</td>
      //             <td className="col-1">20/06/2020</td>
      //             <td className="col-1">₹00:00</td>
      //         </tr>
      //         <tr className="row m-0 p-0">
      //             <td className="col-1">03</td>
      //             <td className="col-1">INV87528863</td>
      //             <td className="col-1">OF87528863</td>
      //             <td className="col-1">₹700:00</td>
      //             <td className="col-1">₹100:00</td>

      //             <td className="col-2">John Dev</td>
      //             <td className="col-2">Lorem ipsum, in graphical and textual </td>
      //             <td className="col-1">5218</td>
      //             <td className="col-1">20/06/2020</td>
      //             <td className="col-1">₹00:00</td>
      //         </tr>
      //         <tr className="row m-0 p-0">
      //             <td className="col-1">04</td>
      //             <td className="col-1">INV87528863</td>
      //             <td className="col-1">OF87528863</td>
      //             <td className="col-1">₹700:00</td>
      //             <td className="col-1">₹100:00</td>

      //             <td className="col-2">John Dev</td>
      //             <td className="col-2">Lorem ipsum, in graphical and textual </td>
      //             <td className="col-1">5218</td>
      //             <td className="col-1">20/06/2020</td>
      //             <td className="col-1">₹00:00</td>
      //         </tr>

      //     </tbody> */}
      //             <tbody>
      //                 {this.renderTableData()}
      //             </tbody>
      //         </table>
      //         {/* <h2>Latest DS Number:{this.state.RecentDSNumber}</h2> */}
      //     </div>
      // </div>
    );
  }
}
