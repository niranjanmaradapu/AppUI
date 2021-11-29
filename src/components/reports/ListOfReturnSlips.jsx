import React, { Component } from "react";
import { renderIntoDocument } from "react-dom/test-utils";
import edit from "../../assets/images/edit.svg";
import view from "../../assets/images/view.svg";
import ListOfBarcodesService from "../../services/Reports/ListOfBarcodesService";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default class ListOfReturnSlips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromDate: "",
      toDate: "",
      barcodeTextileId: "",
      barcode: "",
      store: "",
      empId: "",
      id: "",
      itemMrpLessThan: "",
      itemMrpGreaterThan: "",
      isView: false,
      clientDomianId: "",
      storeList: [],
      itemId: "",
      itemName: "",
      domainId1: "",
      storeId: "",

      selectOption: [
        {
          value: "select",
          label: "select",
          id: "select",
        },
        {
          value: "hyderabad",
          label: "hyderabad",
          id: "hyderabad",
        },
        {
          value: "guntur",
          label: "guntur",
          id: "guntur",
        },
      ],
      bcList: [],
    };
    this.getBarcodes = this.getBarcodes.bind(this);
    this.getStoreNames = this.getStoreNames.bind(this);
    this.viewReport = this.viewReport.bind(this);
    this.closeViewReport = this.closeViewReport.bind(this);
  }

  getBarcodes() {
    const obj = {
      fromDate: this.state.fromDate ? this.state.fromDate : undefined,
      toDate: this.state.toDate ? this.state.toDate : undefined,
      barcodeTextileId: this.state.barcodeTextileId
        ? parseInt(this.state.barcodeTextileId)
        : undefined,
      barcode: this.state.barcode ? this.state.barcode : undefined,
      // storeName: this.state.store ? this.state.store : undefined,
      storeId:
        this.state.storeId && this.state.storeId != 0
          ? this.state.storeId
          : undefined,
      empId: this.state.empId ? this.state.empId : undefined,
      itemMrpLessThan: this.state.itemMrpLessThan
        ? this.state.itemMrpLessThan
        : undefined,
      itemMrpGreaterThan: this.state.itemMrpGreaterThan
        ? this.state.itemMrpGreaterThan
        : undefined,
    };

    ListOfBarcodesService.getBarcodes(obj).then((res) => {
      console.log(res.data.result);

      let data = res.data.result;
      let obj = {
        barcode: "",
        storeId: "",
        empId: "",
        qty: "",
        itemMrp: "",
      };
      let a = [];
      data.map((d) => {
        obj = {
          barcode: d.barcode,
          storeId: d.productTextile.storeId,
          empId: d.productTextile.empId,
          qty: d.productTextile.qty,
          itemMrp: d.productTextile.itemMrp,
        };
        a.push(obj);
      });

      this.setState({
        // barcodeData: a,
        bcList: a,
      });
    });
  }

  viewReport() {
    this.setState({ isView: true });
  }

  closeViewReport() {
    this.setState({ isView: false });
  }

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
    ListOfBarcodesService.getStoreNames(domainId).then((res) => {
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
    return this.state.bcList.map((items, index) => {
      const { barcode, storeId, empId, qty, itemMrp } = items;
      return (
        <tr className="" key={index}>
          <td className="col-1">{index + 1}</td>
          <td className="col-2">{barcode}</td>
          <td className="col-2">{storeId}</td>
          <td className="col-2">{empId}</td>
          <td className="col-1">{qty}</td>
          <td className="col-2">₹ {itemMrp}</td>
          <td className="col-2 text-center">
            {/* <img src={edit} className="w-12 m-r-2 pb-2" /> */}
            {/* <img src={view} className="w-12 pb-2" onClick={this.viewReport} /> */}
            <i className="icon-delete fs-16"></i>
          </td>
        </tr>
      );
    });
  }

  handleSelect(e) {
    let obj = this.state.selectOption.find((o) => o.label === e.target.value);
    this.setState({
      itemId: obj.id,
      itemName: e.target.value,
      store: e.target.value,
    });
  }

  render() {
    return (
      <div className="maincontent">
        <Modal isOpen={this.state.isView} className="modal-fullscreen">
          <ModalHeader>BARCODE Details </ModalHeader>
          <ModalBody>
            {/* <div className="row mb-2">
              <div className="col-3">
                <div className="">
                  <label>Memo No : </label>{" "}
                  <span className="font-bold fs-13">
                    {" "}
                    {this.state.invoiceNumber}
                  </span>
                </div>
              </div>
              <div className="col-3">
                <div className="">
                  <label>Customer : </label>{" "}
                  <span className="font-bold fs-13">
                    {this.state.customerName}
                  </span>
                </div>
              </div>

              <div className="col-3">
                <div className="">
                  <label>Mobile : </label>{" "}
                  <span className="font-bold fs-13">
                    {" "}
                    {this.state.mobileNumber}
                  </span>
                </div>
              </div>
              <div className="col-3">
                <div className="">
                  <label>Date : </label>{" "}
                  <span className="font-bold fs-13">
                    {" "}
                    {this.state.createdDate}
                  </span>
                </div>
              </div>
            </div> */}
            <div className="table-responsive">
              <table className="table table-borderless mb-1">
                <thead>
                  <tr className="m-0 p-0">
                    <th className="">Barcode NO.</th>
                    <th className="">BARCODE</th>
                    <th className="">MRP</th>
                    <th className="">STORE</th>
                    <th className="">QTY</th>
                  </tr>
                </thead>
                {/* <tbody>
                  <tr>
                    <td>BAR001</td>
                    <td>Western Wear</td>
                    <td>001</td>
                    <td>4699</td>
                    <td>01</td>
                    <td>1,120</td>
                    <td>800</td>
                    <td>5.00</td>
                    <td>333.33</td>
                    <td>8.33</td>
                    <td>8.33</td>
                    <td>0.00</td>
                    <td>350</td>
                  </tr>
                  <tr>
                    <td>BAR002</td>
                    <td>Western Wear</td>
                    <td>002</td>
                    <td>4610</td>
                    <td>01</td>
                    <td>1,120</td>
                    <td>800</td>
                    <td>5.00</td>
                    <td>333.33</td>
                    <td>8.33</td>
                    <td>8.33</td>
                    <td>0.00</td>
                    <td>350</td>
                  </tr>
                </tbody> */}
                {/* <tbody>{this.renderPopupTableData()}</tbody> */}
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
          <div className="col-6 col-sm-3 mt-2 mb-2">
            <div className="form-group">
              <input
                type="date"
                className="form-control"
                placeholder="FROM DATE"
                value={this.state.fromDate}
                onChange={(e) => this.setState({ fromDate: e.target.value })}
              />
            </div>
          </div>
          <div className="col-6 col-sm-3 mt-2 mb-2">
            <div className="form-group">
              <input
                type="date"
                className="form-control"
                placeholder="TO DATE"
                value={this.state.toDate}
                onChange={(e) => this.setState({ toDate: e.target.value })}
              />
            </div>
          </div>
          <div className="col-6 col-sm-3 mt-2 mb-2">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="BARCODE NUMBER"
                value={this.state.barcode}
                // onChange={(e) =>
                //   this.setState({ barcodeTextileId: e.target.value })
                // }
                onChange={(e) => this.setState({ barcode: e.target.value })}
              />
            </div>
          </div>
          <div className="col-6 col-sm-3 mt-2 mb-2">
            <div className="form-group">
              <select
                className="form-control"
                value={this.state.storeId}
                // onChange={(e) => {
                //   this.handleSelect(e);
                // }}

                onChange={(e) => {
                  this.setState({ storeId: e.target.value });
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
            </div>
          </div>
          <div className="col-6 col-sm-3 mt-2">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="EMP ID"
                value={this.state.empId}
                onChange={(e) => this.setState({ empId: e.target.value })}
              />
            </div>
          </div>
          <div className="col-6 col-sm-3 mt-2">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="BARCODE MRP >"
                value={this.state.itemMrpGreaterThan}
                onChange={(e) =>
                  this.setState({ itemMrpGreaterThan: e.target.value })
                }
              />
            </div>
          </div>
          <div className="col-6 col-sm-3 mt-2">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="BARCODE MRP <"
                value={this.state.itemMrpLessThan}
                onChange={(e) =>
                  this.setState({ itemMrpLessThan: e.target.value })
                }
              />
            </div>
          </div>

          <div className="col-6 col-sm-3 scaling-mb mt-2">
            <div className="form-group">
              <button
                className="btn-unic-search active"
                onClick={this.getBarcodes}
              >
                SEARCH{" "}
              </button>
            </div>
          </div>
        </div>
        <h5 className="pl-4 mt-3 scaling-center scaling-mb">
          List Of Barcodes
        </h5>
        <div className="row m-0 p-0 mb-3">
          <div className="table-responsive p-0">
            <table className="table table-borderless mb-1 mt-2">
              <thead>
                <tr className="m-0 p-0">
                  <th className="col-1">S.NO</th>
                  <th className="col-2">Barcode</th>
                  <th className="col-2">Barcode Store ID</th>
                  <th className="col-2">EMP ID</th>
                  <th className="col-1">QTY</th>
                  <th className="col-2">BARCODE MRP</th>
                  <th className="col-2"></th>
                </tr>
              </thead>
              {/* <tbody>
              <tr className="">
                <td className="col-1">01</td>
                <td className="col-2">BAR00001</td>
                <td className="col-2">Kukatpally</td>
                <td className="col-2">EMP123</td>
                <td className="col-1">10</td>
                <td className="col-2">₹ 2,000</td>
                <td className="col-2 text-center">
                  <img src={edit} className="w-12 m-r-2 pb-2" />
                  <i className="icon-delete fs-16"></i>
                </td>
              </tr>
              <tr className="">
                <td className="col-1">02</td>
                <td className="col-2">BAR00002</td>
                <td className="col-2">KPHB 9th Phase</td>
                <td className="col-2">EMP124</td>
                <td className="col-1">20</td>
                <td className="col-2">₹ 2,000</td>
                <td className="col-2 text-center">
                  <img src={edit} className="w-12 m-r-2 pb-2" />
                  <i className="icon-delete fs-16"></i>
                </td>
              </tr>
              <tr className="">
                <td className="col-1">03</td>
                <td className="col-2">BAR00003</td>
                <td className="col-2">JNTU</td>
                <td className="col-2">EMP126</td>
                <td className="col-1">10</td>
                <td className="col-2">₹ 2,000</td>
                <td className="col-2 text-center">
                  <img src={edit} className="w-12 m-r-2 pb-2" />
                  <i className="icon-delete fs-16"></i>
                </td>
              </tr>
              <tr className="">
                <td className="col-1">04</td>
                <td className="col-2">BAR00004</td>
                <td className="col-2">Nizampet</td>
                <td className="col-2">EMP127</td>
                <td className="col-1">30</td>
                <td className="col-2">₹ 2,000</td>
                <td className="col-2 text-center">
                  <img src={edit} className="w-12 m-r-2 pb-2" />
                  <i className="icon-delete fs-16"></i>
                </td>
              </tr>
              <tr className="">
                <td className="col-1">05</td>
                <td className="col-2">BAR00005</td>
                <td className="col-2">Ameerpet</td>
                <td className="col-2">EMP128</td>
                <td className="col-1">15</td>
                <td className="col-2">₹ 2,000</td>
                <td className="col-2 text-center">
                  <img src={edit} className="w-12 m-r-2 pb-2" />
                  <i className="icon-delete fs-16"></i>
                </td>
              </tr>
              <tr className="">
                <td className="col-1">06</td>
                <td className="col-2">BAR00006</td>
                <td className="col-2">Ameerpet</td>
                <td className="col-2">EMP129</td>
                <td className="col-1">15</td>
                <td className="col-2">₹ 2,000</td>
                <td className="col-2 text-center">
                  <img src={edit} className="w-12 m-r-2 pb-2" />
                  <i className="icon-delete fs-16"></i>
                </td>
              </tr>
              <tr className="">
                <td className="col-1">07</td>
                <td className="col-2">BAR00007</td>
                <td className="col-2">Panjagutta</td>
                <td className="col-2">EMP130</td>
                <td className="col-1">18</td>
                <td className="col-2">₹ 2,000</td>
                <td className="col-2 text-center">
                  <img src={edit} className="w-12 m-r-2 pb-2" />
                  <i className="icon-delete fs-16"></i>
                </td>
              </tr>
              <tr className="">
                <td className="col-1">08</td>
                <td className="col-2">BAR00008</td>
                <td className="col-2">Attapur</td>
                <td className="col-2">EMP131</td>
                <td className="col-1">25</td>
                <td className="col-2">₹ 2,000</td>
                <td className="col-2 text-center">
                  <img src={edit} className="w-12 m-r-2 pb-2" />
                  <i className="icon-delete fs-16"></i>
                </td>
              </tr>
              <tr className="">
                <td className="col-1">09</td>
                <td className="col-2">BAR00009</td>
                <td className="col-2">Attapur-2</td>
                <td className="col-2">EMP132</td>
                <td className="col-1">25</td>
                <td className="col-2">₹ 2,000</td>
                <td className="col-2 text-center">
                  <img src={edit} className="w-12 m-r-2 pb-2" />
                  <i className="icon-delete fs-16"></i>
                </td>
              </tr>
              <tr className="">
                <td className="col-1">10</td>
                <td className="col-2">BAR00010</td>
                <td className="col-2">Madhapur</td>
                <td className="col-2">EMP133</td>
                <td className="col-1">50</td>
                <td className="col-2">₹ 2,000</td>
                <td className="col-2 text-center">
                  <img src={edit} className="w-12 m-r-2 pb-2" />
                  <i className="icon-delete fs-16"></i>
                </td>
              </tr>
            </tbody> */}
              <tbody>{this.renderTableData()}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
