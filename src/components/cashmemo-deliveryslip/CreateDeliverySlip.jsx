import React, { Component } from "react";
import barcodebig from "../../assets/images/barcode_big.svg";
import add from "../../assets/images/add_btn.svg";
import dress1 from '../../assets/images/midi_blue.svg';
import scan from '../../assets/images/scan.svg';
import midiblue from "../../assets/images/midi_blue.svg";
import midibluenew from "../../assets/images/midi_bluenew.svg";
import mididress from "../../assets/images/midi_dress.svg";
import saree from "../../assets/images/saree.svg";
import deleterecord from "../../assets/images/delete.svg";
import { BASE_URL } from "../../commonUtils/Base";
import { CREATE_DELIVERY_SLIP_URL } from "../../commonUtils/ApiConstants";
import axios from "axios";
import CreateDeliveryService from "../../services/CreateDeliveryService";
import Table from 'react-bootstrap/Table';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { withTranslation } from 'react-i18next';
class CeateDeliverySlip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barCode: "",
      smNumber: "",
      dsNumber: "",
      qunatity: 1,
      itemsList: [],
      barList: [],
      isSMDisable: false,
      isDeliveryCreated: false,
      btnDisable: true,
      isRemember: true,
      mrpAmount: 0,
      promoDisc: 0,
      totalAmount: 0,
      type: "",
      showTable: false,
      isCheckPromo: false,
      isQuantity: true,
      selectedType: {
        value: "Pieces",
        label: "Pieces",
      },
      typesList: [
        {
          value: "Pieces",
          label: "Pieces",
        },
        {
          value: "Meters",
          label: "Meters",
        },
      ],
      dropValue: "",
      isGenerate: false,
      lineItemsList: []
    };
    //  this.getDeliverySlips();
    this.createDeliverySlip = this.createDeliverySlip.bind(this);
    this.remberSalesMan = this.remberSalesMan.bind(this);
    this.checkPromo = this.checkPromo.bind(this);
    this.generateEstimationSlip = this.generateEstimationSlip.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.generateNew = this.generateNew.bind(this);
    //  this.deleteTableRow = this.deleteTableRow.bind(this);
  }

  getDeliverySlips = (e) => {
    this.setState({ type: this.state.selectedType.label });
    let mrp = 0;
    let promo = 0;
    let total = 0;
    if (e.key === "Enter") {
      if (this.state.barCode && this.state.smNumber) {
        CreateDeliveryService.getBarCodeList(
          this.state.barCode,
          this.state.smNumber
        ).then((res) => {

          console.log(res);
          if (res.data) {
            res.data.result.salesMan = this.state.smNumber;
            this.state.itemsList.push(res.data.result);
            if (this.state.itemsList.length > 1) {
              // const barList = this.state.itemsList.filter((test, index, array) =>
              //     index === array.findIndex((findTest) =>
              //         findTest.barcode === test.barcode
              //     )
              // );
              // this.setState({ itemsList: barList });
              // this.setState({ barList: barList });

              for (let i = 0; i < this.state.itemsList.length - 1; i++) {
                if (
                  this.state.itemsList[i].barcode ===
                  this.state.itemsList[i + 1].barcode
                ) {
                  this.state.itemsList.splice(i, 1);
                  toast.info("Barcode already entered");

                  break;
                }
              }

              // for(let i=0; i<this.state.itemsList.length-1; i++ ) {

              //     for(let j=1; j<=i; j++) {
              //         if(this.state.itemsList[i].barcode === this.state.itemsList[j].barcode) {
              //             toast.info("Barcode already entered");
              //             this.state.itemsList.splice(i,1);
              //            // break;
              //         }
              //     }

              // }
            }
            if (this.state.itemsList.length > 1) {
              this.state.itemsList.forEach((element) => {
                mrp = mrp + element.listPrice;
                this.setState({ mrpAmount: mrp });
                promo = promo + element.discount;
                this.setState({ promoDisc: promo });
                total = total + element.costPrice;
                this.setState({ totalAmount: total });
              });
            } else {
              this.setState({ mrpAmount: this.state.itemsList[0].listPrice });
              //  this.setState({ promoDisc: this.state.itemsList[0].discount });

              this.setState({ promoDisc: 0 });
              this.setState({ totalAmount: this.state.itemsList[0].costPrice });
            }

            this.setState({ barList: this.state.itemsList }, () => {
              this.state.barList.forEach((element) => {
                element.productTextile.qty = 10;
                element.quantity = 1;
              });
              this.calculateTotal();
            });
            this.setState({ barCode: "" });
            // this.setState({ itemsList: items.data });
            this.setState({ btnDisable: false });
            this.setState({ isDeliveryCreated: false });

            console.log(this.state.barList);
          } else {
            toast.error(res.data.body);
          }
        });
        this.setState({ showTable: true, isCheckPromo: true });
       
      } else {
        toast.info("Please enter Barcode / SM number");
      }
    }
  };

  remberSalesMan(e) {
    if (e.target.checked) {
      if (this.state.smNumber) {
        //  this.setState({isSMDisable: true});
        this.setState({ isRemember: true });
      } else {
        toast.info("Please Enter SM number");
        this.setState({ isRemember: false });
      }
    } else {
      // this.setState({isSMDisable: false});
      this.setState({ isRemember: false });
    }
  }

  createDeliverySlip() {
    sessionStorage.removeItem("recentDS");
    const obj = {
      qty: this.state.qunatity,

      type: this.state.type,

      salesMan: this.state.smNumber,

      barcode: this.state.barList,
    };
    CreateDeliveryService.createDeliverySlip(obj, this.state.type).then(
      (res) => {
        console.log(res);
        if (res.data.statusCode === "OK") {
          this.setState({ dsNumber: res.data.body.number });

          toast.success(res.data.body.message);
          sessionStorage.setItem("recentDS", res.data.body.message);
          this.setState({
            barCode: "",
            smNumber: "",
            barList: [],
            itemsList: [],
          });
        } else {
          toast.error(res.data.body);
        }
      }
    );
  }
  checkPromo() {
    this.setState({ isCheckPromo: false });
    this.setState({ isDeliveryCreated: true });
    console.log("check promo clicked");
  }

  // generateEstimationSlip(){
  //   // this.setState({
  //   //   barCode: "",
  //   //   smNumber: "",
  //   //   barList: [],
  //   //   itemsList: [],
  //   //   showTable: false,
  //   // });
  //   // toast.success("Successfully generated estimation slip");
  //   this.setState({isGenerate: true})
  // }

  renderDeliveryNumber() {
    return (
      this.state.isDeliveryCreated && (
        <div className="rect-head">
          <div className="col p-l-3 pt-1 p-r-3 pb-3 text-right">
            {/* <button className="btn-unic m-r-2">Clear Promotion</button> 
          <button className="btn-unic m-r-2">Hold Estimation Slip</button> 
          <button className="btn-unic m-r-2">Generate Estimation Slip</button>  */}
            <button
              className="btn-nobdr"
              type="button"
              onClick={this.createDeliverySlip}
            >
              <img src={add} /> <span className="create">Create</span>
            </button>

          </div>
          {/* <ul>
                <li>DC Number  : <span className="font-bold pl-3">{this.state.dsNumber}</span></li>
                <li><img src={barcodebig} /></li>
                <li></li>
            </ul> */}
        </div>
      )
    );
  }

  renderTableDetails() {
    return (
      this.state.showTable && (
        <div className="row m-0 p-0 scaling-center">
          <div className="col-12 col-sm-6 p-l-0">
            <h5 className="mt-4">
              Total Scanned Items: {this.state.barList.length}
            </h5>
          </div>
          <div className="col-12 col-sm-6 pt-1 p-r-0 pb-3 text-right scaling-center">
            <button className="btn-unic m-r-2 scaling-mb">Clear Promotion</button>
            <button className="btn-unic m-r-2 scaling-mb">Hold Estimation Slip</button>
            <button className="btn-unic m-r-2 scaling-mb active" onClick={this.generateEstimationSlip}>Generate Estimation Slip</button>
          </div>

          <div className="p-0 pb-3 pt-2">
            {/* {this.renderDeliveryNumber()} */}
            {/* <div className="rect-head" >
                         <ul>
                             <li>DC Number  : <span className="font-bold pl-3">788 788 90123</span></li>
                             <li><img src={barcodebig} /></li>
                             <li><button className="btn-nobdr" type="button" onClick={this.createDeliverySlip}>
                                 <img src={add} /> <span>Create [Crl + 2]</span></button></li>
                         </ul>
                     </div> */}
            <div>{this.renderDivData()}</div>
            <div className="rect-cardred m-0">
              <div className="row">
                <div className="col-3 text-center">
                  <label>TOTAL QTY</label>
                  <h6 className="pt-2">{this.state.barList.length}</h6>
                </div>

                <div className="col-2">
                  <label>MRP</label>
                  <h6 className="pt-2">{this.state.mrpAmount} ₹</h6>
                </div>
                <div className="col-3">
                  <label>PROMO DISCOUNT</label>
                  <h6 className="pt-2">0 ₹</h6>
                </div>
                <div className="col-2 text-right pt-2 text-center text-red p-r-4">
                  <label className="text-red ">GRAND TOTAL</label>
                  <h6 className="fs-16 text-red ">{this.state.totalAmount} ₹</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    );
  }



  renderDivData() {

    return (
      <div className="table-responsive">
        <table className="table table-borderless mb-1">
          <thead>
            <tr className="m-0 p-0">
              {/* <th className="col-1"> </th> */}
              <th className="col-3">ITEM</th>
              {/* <th className="col-1">DIVISION</th>
              <th className="col-1">Size</th> */}
              <th className="col-1">Qty</th>
              <th className="col-1">sm</th>
              <th className="col-1">mrp</th>
              <th className="col-2">Discount Type</th>
              <th className="col-1">Discount</th>
              {/* <th className="col-4">Description</th> */}
              <th className="col-1">Total</th>
            </tr>
          </thead>

          <tbody>
            {this.state.barList.map((items, index) => {
              return (
                <tr key={index}>
                  <td className="col-3 geeks">
                    <div className="d-flex">
                      <div className="custom-control t_image custom-checkbox V1_checkbox-label mt-3">
                        {/* <input className="custom-control-input" type="checkbox" id="check1" /> */}
                        {/* <label className="custom-control-label V1_custom-control-label p-t-0 fs-14"
                      htmlFor="check1"></label> */}
                        <img src={dress1} />
                      </div>
                      <div className="td_align ">
                        <label>{items.productTextile.itemCode}</label>
                        <label>{items.barcode}</label>
                      </div>

                    </div>
                  </td>
                  {/* <td className="col-1"></td>
              <td className="col-1"></td> */}
                  <td className="col-1"><input type="number" value={items.quantity}
                    onChange={(e) => this.checkQuantity(e, index, items)}
                    className="form-control" />
                  </td>
                  <td className="col-1">{items.salesMan}</td>
                  <td className="col-1">₹{items.productTextile.itemMrp}</td>
                  <td className="col-2"></td>
                  <td className="col-1">₹ 0</td>
                  <td className="col-1 w-100">₹ {items.productTextile.itemMrp}
                    <i className="icon-delete m-l-2"
                      onClick={(e) => {
                        console.log(index);
                        this.state.itemsList.splice(index, 1);
                        this.setState({ barList: this.state.itemsList });
                        this.calculateTotal();
                      }}
                    >

                    </i>
                  </td>
                </tr>
              );
            })}


          </tbody>
        </table>

      </div>


    );

  }


  checkQuantity(e, index, item) {
    console.log(e.target.value);
    let qty = item.quantity;
    if(parseInt(e.target.value) <= item.productTextile.qty) {
  //   this.setState({qty: e.target.value});
     item.quantity = qty;
    } else {
      toast.info("Insufficient Quantity");
    }
  }

  calculateTotal() {
    let mrp = 0;
    let promo = 0;
    let total = 0;
    console.log(this.state.itemsList.length)
    if (this.state.itemsList.length > 0) {
      this.state.itemsList.forEach((element) => {
        console.log(element)
        mrp = mrp + element.productTextile.itemMrp;
        this.setState({ mrpAmount: mrp });
        promo = promo + element.discount;
        this.setState({ promoDisc: promo });
        total = total + element.productTextile.costPrice;
        this.setState({ totalAmount: total });
      });
    } else {
      this.setState({ mrpAmount: 0 });
      this.setState({ promoDisc: 0 });
      this.setState({ totalAmount: 0 });
    }

  }

  //  deleteTableRow(e,index) {
  //      console.log("Delete", index);
  //    //  this.state.itemsList.splice(index, 1);
  //  //   this.setState({barList: this.state.itemsList})
  //  }

  handleChange = (e) => {
    this.setState({ dropValue: e.label });
    this.setState({ selectedType: e });
    this.setState({ type: e.label });
    if (e.label == "Meters") {
      this.setState({ isQuantity: false });
    } else {
      this.setState({ isQuantity: true, qunatity: 1 });
    }
  };

  generateEstimationSlip() {
    this.setState({ isGenerate: true });
    this.getLineItems();
  }

  getLineItems() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const domainId =  user["custom:domainId1"];
    console.log(user["custom:domianId1"]);
    let lineItem = [];
    this.state.barList.forEach((element, index) => {
      const obj = {
        "itemPrice": element.productTextile.itemMrp,
        "quantity": element.productTextile.qty,
        "discount": element.productTextile.discount,
        "netValue": element.productTextile.itemMrp,
        "barCode": element.barcode,
        "domainId": 1

      }
       lineItem.push(obj);
    });

    CreateDeliveryService.getLineItem(lineItem, 1).then(res => {
      if(res) {
        let lineItemsList = [];
        let dataResult = JSON.parse(res.data.result);
        dataResult.forEach(element=> {
            const obj = {
              "lineItemId": element
            }
            lineItemsList.push(obj);
          });
        
        
     

        this.setState({lineItemsList: lineItemsList});
      }
      console.log(this.state.lineItemsList);
    });
  }

  generateNew() {
    console.log(this.state.smNumber)
    const createObj = {
      "salesMan": parseInt(this.state.smNumber),
      "lineItems": this.state.lineItemsList
      }

      CreateDeliveryService.saveDelivery(createObj).then(res=> {
        if(res) {
          toast.success(res.data.message);
        }
      });
  }


  hideModal() {
    this.setState({ isGenerate: false });
  }

  render() {
    return (
      <div className="maincontent">
        {/* <h5>Estimation Slip</h5> */}
        {/* <h5> {t("EstimationSlip")}</h5> */}
        <Modal isOpen={this.state.isGenerate} size="lg">
          <div className="headerGreen"><h5>Thank you!</h5></div>
          <ModalBody>
            <div className="row">
              <div className="col-12 mb-2">
                <label className="text-green fs-14">Estimated slip generated successfully</label>
              </div>
              <div className="col-12 mt-3">
                <table className="table table-borderless mb-1">
                  <thead>
                    <tr className="m-0 p-0">
                      {/* <th className="col-1"> </th> */}
                      <th className="col-3">SLIP NO.</th>
                      <th className="col-2">ITEMS</th>
                      <th className="col-2">mrp</th>
                      <th className="col-3">Promo Discount</th>
                      {/* <th className="col-4">Description</th> */}
                      <th className="col-2">Total</th>
                    </tr>
                  </thead>
                </table>
                <table className="table table-borderless gfg">
                  <tbody>
                    {this.state.barList.map((items, index) => {
                      return (
                        <tr key={index}>


                          <td className="col-3 geeks">
                            {items.barcode}
                          </td>
                          <td className="col-2">{items.productTextile.itemCode}</td>
                          <td className="col-2">₹ {items.productTextile.itemMrp}</td>
                          <td className="col-3">₹ 0</td>
                          <td className="col-2">₹ {items.productTextile.costPrice}</td>
                        </tr>
                      );
                    })}


                  </tbody>

                </table>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="pt-2 btn-bdrG" onClick={this.hideModal}>
             Back To Dashboard
            </button>
            <button
              className="btn btn-bdrG active fs-12"
              onClick={this.generateNew}
            >
              Generate New
            </button>
          </ModalFooter>
        </Modal>
        <div className="">
          <div className="row">
            <div className="col-6 col-sm-3 sele">
              <div className="form-group">
                {/* <select className="form-control" onChange={(e) => {
                                this.setState({ type : e.target.value });
                                if(this.state.type == "Meters") {
                                    this.setState({isQuantity: false});
                                }
                        }}>
                                    <option value="Pieces">Pieces</option>
                                    <option value="Meters">Meters</option>
                                </select> */}

                <Select
                  className="upper-case"
                  placeholder="Select"
                  value={this.state.selectedType} // set selected value
                  options={this.state.typesList} // set list of the data
                  onChange={this.handleChange} // assign onChange function
                />
              </div>
            </div>
            <div className="col-6 col-sm-3">
              <div className="form-group">
                {/* <input type="text" className="form-control" name="barCode" value={this.state.barCode} onKeyPress={this.getDeliverySlips}
                                 placeholder="Barcode [Crtl + 1]"/> */}

                <input
                  type="text"
                  name="barCode"
                  className="form-control frm-pr"
                  autoFocus
                  value={this.state.barCode}
                  onChange={(e) => this.setState({ barCode: e.target.value })}
                  autoComplete="off"
                  onKeyPress={this.getDeliverySlips}
                  placeholder="ENTER BARCODE"
                />
                {/* <button type="button"className="scan">
                               <img src={scan}/> SCAN  
                </button> */}
              </div>
            </div>
            <div className="col-sm-3 col-6 scaling-mtop">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.smNumber}
                  onKeyPress={this.getDeliverySlips}
                  placeholder="SM Number"
                  onChange={(e) => this.setState({ smNumber: e.target.value })}
                />
              </div>
            </div>
            <div className="col-sm-3 col-6 scaling-mtop">
              <div className="form-group">
                <input
                  type="number"
                  className="form-control"
                  // value={this.state.qunatity}
                  onChange={(e) => this.setState({ qunatity: e.target.value })}
                  disabled={this.state.isQuantity}
                  placeholder="Qty"
                />
              </div>
            </div>
            <div className="col-sm-3 scaling-ptop col-6">
              <div className="form-group">
                {/* className={"btn-group pull-right " + (this.props.showBulkActions ? 'show' : 'hidden' */}
                {/* <input type="number" className="form-control" placeholder="Check Promo Discount [Ctrl + 3]"/> */}
                <button
                  className={
                    "btn-login btn-create mt-3" +
                    (!this.state.isCheckPromo ? " btn-disable" : "")
                  }
                  onClick={this.checkPromo}
                >
                  Check Promo Discount{" "}
                </button>
              </div>
            </div>
            <div className="col-sm-3 scaling-ptop col-6 mt-3">
              <div className="form-check checkbox-rounded checkbox-living-coral-filled fs-15">
                <input type="checkbox" className="form-check-input filled-in"
                  checked={this.state.isRemember}
                  onChange={this.remberSalesMan} id="remember" />
                <label className="form-check-label" htmlFor="remember">Remember Sales Man</label>
               
              </div>
            </div>
          </div>
        </div>
        <div>
          {this.renderTableDetails()}
         </div>

        {/* <ToastContainer /> */}
      </div>
    );
  }
}
export default withTranslation()(CeateDeliverySlip)
