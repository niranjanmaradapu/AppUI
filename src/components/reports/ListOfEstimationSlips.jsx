import React, { Component } from "react";
import print from "../../assets/images/print.svg";
import view from "../../assets/images/view.svg";
import ListOfEstimationSlipsService from "../../services/Reports/ListOfEstimationSlipsService";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import moment from "moment";

export default class ListOfEstimationSlips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateFrom: moment(new Date()).format("YYYY-MM-DD").toString(),
      dateTo: moment(new Date()).format("YYYY-MM-DD").toString(),
      // dateFrom: "",
      // dateTo: "",
      status: null,
      barcode: null,
      dsNumber: null,
      dsList: [],
      dsDetailsList: [],
      itemId: "",
      itemName: "",
      domainId: "",
      storeId: "",
      selectOption: [
        {
          name: "DS STATUS",
          id: "DS STATUS",
        },
        {
          name: "Completed",
          id: "Completed",
        },
        {
          name: "Pending",
          id: "Pending",
        },
        {
          name: "Cancelled",
          id: "Cancelled",
        },
      ],
    };
    this.getEstimationSlip = this.getEstimationSlip.bind(this);
    this.viewReport = this.viewReport.bind(this);
    this.closeViewReport = this.closeViewReport.bind(this);
  }

  componentWillMount() {
    const storeId = sessionStorage.getItem("storeId");
    const domainData = JSON.parse(sessionStorage.getItem("selectedDomain"));
    if(domainData.label == "Textile") {
      this.setState({domainId: 1}); 
    } else if(domainData.label == "Retail") {
      this.setState({domainId: 2}); 
    }

    this.setState({storeId: storeId});
}


  getEstimationSlip() {
    const obj = {
      dateFrom: this.state.dateFrom ? this.state.dateFrom : undefined,
      dateTo: this.state.dateTo ? this.state.dateTo : undefined,
      status: this.state.status ? this.state.status : undefined,
      barcode: this.state.barcode ? this.state.barcode : undefined,
      dsNumber: this.state.dsNumber ? this.state.dsNumber : undefined,
      domainId: this.state.domainId ? parseInt(this.state.domainId) : undefined,
      storeId: this.state.storeId ? parseInt(this.state.storeId) : undefined
    };

    ListOfEstimationSlipsService.getEstimationSlips(obj).then((res) => {
      console.log("data", res.data.result);
      if (res.data.result.deliverySlipVo) {
        res.data.result.deliverySlipVo.map((prop, i) => {
          let grossValueData = "";
          let netValueData = "";

          if (prop.lineItems.length > 0) {
            grossValueData = Array.prototype.map
              .call(prop.lineItems, function (item) {
                return item.grossValue;
              })
              .join(",");
          }
          if (prop.lineItems.length > 0) {
            netValueData = Array.prototype.map
              .call(prop.lineItems, function (item) {
                return item.netValue;
              })
              .join(",");
          }
          prop.grossVal = grossValueData;
          prop.netVal = netValueData;
          prop.review = false;
        });
      }

      this.setState({
        dsList: res.data.result.deliverySlipVo,
        dsDetailsList: res.data.result.deliverySlipVo,
      });
    });
  }

  viewReport(dsNumber) {
    let filterData = this.state.dsDetailsList.filter(
      (x) => x.dsNumber == dsNumber
    );
    console.log("filterdata", filterData);

    let obj = {
      barCode: "",
      salesMan: "",
      quantity: "",
      itemPrice: "",
      grossValue: "",
      discount: "",
      netValue: "",
    };
    let detailsArray = [];
    filterData[0].lineItems.map((d) => {
      obj = {
        barCode: d.barCode,
        salesMan: filterData[0].salesMan,
        quantity: d.quantity,
        itemPrice: d.itemPrice,
        grossValue: d.grossValue,
        discount: d.discount,
        netValue: d.netValue,
      };
      detailsArray.push(obj);
    });

    console.log("detailsarr", detailsArray);
    this.setState({
      dsNumber: filterData[0].dsNumber,
      popupData: detailsArray,
      isView: true,
    });
  }

  closeViewReport() {
    this.setState({ isView: false });
  }

  renderTableData() {
    return this.state.dsList.map((items, index) => {
      const { dsNumber, createdDate, status, mrp, promoDisc, netAmount } =
        items;
      return (
        <tr className="m-0 p-0" key={index}>
          <td className="col-1">{index + 1}</td>
          <td className="col-2">{dsNumber}</td>
          <td className="col-1">{createdDate}</td>
          <td className="col-1">{status}</td>
          {/* <td className="col-2">₹{mrp}</td> */}
          <td className="col-2">₹{netAmount}</td>
          <td className="col-2">{promoDisc}</td>
          <td className="col-2">₹{netAmount}</td>
          <td className="col-2 text-center">
            <img src={print} className="w-12 m-r-2 pb-2" />
            <img
              src={view}
              className="w-12 pb-2"
              onClick={() => {
                this.viewReport(dsNumber);
              }}
            />
            <i className="icon-delete m-l-2 fs-16"></i>
          </td>
        </tr>
      );
    });
  }

  renderpopupTableData() {
    if (this.state.popupData) {
      return this.state.popupData.map((items, index) => {
        const {
          barCode,
          salesman,
          quantity,
          itemPrice,
          grossValue,
          discount,
          netValue,
        } = items;
        return (
          <tr>
            <td>{barCode}</td>
            <td>{salesman}</td>
            <td>{quantity}</td>
            <td>{netValue}</td>
            <td>{grossValue}</td>
            <td>{discount}</td>
            <td>{netValue}</td>
          </tr>
        );
      });
    }
  }

  handleSelect(e) {
    if (e.target.value != "DS STATUS") {
      this.setState({
        status: e.target.value,
      });
    }
  }

  render() {
    return (
      <div className="maincontent">
        <Modal isOpen={this.state.isView} className="modal-fullscreen">
          <ModalHeader>Estimation Slip Details </ModalHeader>
          <ModalBody>
            <div className="row mb-2">
              <div className="col-3">
                <div className="">
                  <label>Delivery Slip : </label>{" "}
                  <span className="font-bold fs-13">
                    {" "}
                    {this.state.dsNumber}
                  </span>
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-borderless mb-1">
                <thead>
                  <tr className="m-0 p-0">
                    {/* <th className="col-1"> </th> */}
                    <th className="">BARCODE</th>
                    <th className="">SM</th>
                    <th className="">QTY</th>
                    <th className="">ITEM MRP</th>
                    <th className="">GROSS AMOUNT</th>
                    <th className="">PROMO DISCOUNT</th>
                    <th className="">NET AMOUNT</th>
                  </tr>
                </thead>
                {/* <tbody>
                  <tr>
                    <td>BAR001</td>
                    <td>1234</td>
                    <td>001</td>
                    <td>4699</td>
                    <td>01</td>
                    <td>1,120</td>
                    <td>800</td>
                  </tr>
                </tbody> */}
                <tbody>{this.renderpopupTableData()}</tbody>
              </table>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="pt-2 btn-bdr" onClick={this.closeViewReport}>
              CANCEL
            </button>
            {/* <button
              className="btn btn-bdr active fs-12"
              onClick={this.closeViewReport}
            >
              SAVE
            </button> */}
          </ModalFooter>
        </Modal>

        <div className="row">
          <div className="col-2 mt-2">
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
          <div className="col-2 mt-2">
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

          <div className="col-12 col-sm-2 mt-2">
            <div className="form-group">
              <select
                className="form-control"
                value={this.state.status}
                onChange={(e) => {
                  this.handleSelect(e);
                }}
                // onChange={(e) => this.setState({ status: e.target.value })}
              >
                {this.state.selectOption.map((i) => {
                  return (
                    <option key={i.id} value={i.id}>
                      {i.name}
                    </option>
                  );
                })}
                {/* <option>DS STATUS</option>
                <option>Completed</option>
                <option>Pending</option>
                <option>Cancelled</option> */}
              </select>
            </div>
          </div>

          <div className="col-2 mt-2">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="DS NUMBER"
                value={this.state.dsNumber}
                onChange={(e) => this.setState({ dsNumber: e.target.value })}
              />
            </div>
          </div>
          <div className="col-2 mt-2">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="BARCODE"
                value={this.state.barcode}
                onChange={(e) => this.setState({ barcode: e.target.value })}
              />
            </div>
          </div>
          <div className="col-2 mt-2">
            <div className="form-group">
              <button
                className="btn-unic-search active"
                onClick={this.getEstimationSlip}
              >
                SEARCH{" "}
              </button>
            </div>
          </div>
        </div>
        <h5 className="pl-4 mt-3">List Of Estimation Slips</h5>
        <div className="row m-0 p-0 mb-3">
          <table className="table table-borderless mb-1 mt-2">
            <thead>
              <tr className="m-0 p-0">
                <th className="col-1">S.NO</th>
                <th className="col-2">DS Number</th>
                <th className="col-1">DS DATE</th>
                <th className="col-1">DS STATUS</th>
                <th className="col-2">GROSS AMOUNT</th>
                <th className="col-2">PROMO DISC</th>
                <th className="col-2">NET AMOUNT</th>

                <th className="col-2">ACTION</th>
              </tr>
            </thead>
          </table>
          <table className="table table-borderless gfg mb-0">
            {/* <tbody>
              <tr className="m-0 p-0">
                <td className="col-1">01</td>
                <td className="col-2">Ds00001</td>
                <td className="col-1">30 Dec 2021</td>
                <td className="col-1">pending</td>
                <td className="col-2">₹ 500.00</td>
                <td className="col-2">promo</td>
                <td className="col-2">₹ 2,000.00</td>
                <td className="col-2 text-center">
                  <img src={print} className="w-12 m-r-2 pb-2" />
                  <img src={view} className="w-12 pb-2" />
                  <i className="icon-delete m-l-2 fs-16"></i>
                </td>
              </tr>
            </tbody> */}
            <tbody>{this.renderTableData()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
