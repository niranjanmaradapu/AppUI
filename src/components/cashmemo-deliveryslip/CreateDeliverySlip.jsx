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
import { saveDataInIndexDB, getDataFromIndexDB } from '../../utility.js';
import NewSaleService from "../../services/NewSaleService";
import PrinterStatusBill from "../../commonUtils/PrintService";
import { errorLengthMin , errorLengthMax , createDelivery_Err_Msg} from "../../commonUtils/Errors";
class CeateDeliverySlip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barCode: "",
      smNumber: "",
      dsNumber: "",
      qunatity: 1,
      itemsList: [],
      tempList:[],
      barList: [],
      isSMDisable: false,
      isDeliveryCreated: false,
      btnDisable: true,
      isRemember: true,
      isgetLineItems : false,
      mrpAmount: 0,
      promoDisc: 0,
      totalAmount: 0,
      totalQuantity: 0,
      type: "",
      errors: {},
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
    this.getDataFromDB();
    this.createDeliverySlip = this.createDeliverySlip.bind(this);
    this.remberSalesMan = this.remberSalesMan.bind(this);
    this.checkPromo = this.checkPromo.bind(this);
    this.generateEstimationSlip = this.generateEstimationSlip.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.generateNew = this.generateNew.bind(this);
    this.getLineItems = this.getLineItems.bind(this);
    this.handleValidation=this.handleValidation.bind(this);
    //  this.deleteTableRow = this.deleteTableRow.bind(this);


  }


  componentWillMount() {
    const storeId = sessionStorage.getItem("storeId");
    const user = JSON.parse(sessionStorage.getItem('user'));
    this.setState({ storeId: storeId, domainId: user["custom:clientId1"] });
    this.getHsnDetails();
  }

  getHsnDetails() {
    NewSaleService.getHsnDetails().then(response => {
      if (response) {
        const details = response.data.result;
        let slabVos = [];
        details.forEach(detail => {
          if (detail.slabVos)
            slabVos.push(detail.slabVos);
        });

        sessionStorage.setItem("HsnDetails", JSON.stringify(slabVos));
      }
    });
  }

  getTaxAmount(lineItem) {
    const taxDetails = JSON.parse(sessionStorage.getItem("HsnDetails"));
    let slabCheck = false;
    let totalTax = 0;
    taxDetails.forEach(taxData => {
      if (lineItem.netValue >= taxData[0].priceFrom && lineItem.netValue <= taxData[0].priceTo) {
        const taxPer = taxData[0].taxVo.taxLabel.split(' ')[1].split('%')[0];
        const tax = parseInt(taxPer) / 100;
        totalTax = lineItem.netValue * tax
        const central = totalTax / 2;
        // this.setState({ centralGST: Math.ceil(central) });
        lineItem.cgst = Math.ceil(central);
        lineItem.sgst = Math.ceil(central);
        lineItem.taxValue = totalTax;
        slabCheck = true;
      }
    });



    if (!slabCheck) {
      lineItem.cgst = 6;
      lineItem.sgst = 6;
      lineItem.taxValue = totalTax;
    }

  }

  getDataFromDB = async () => {
    let data = await getDataFromIndexDB();
    console.log('Data ', data);
  };

  getDeliverySlips = (e) => {
   
    const storeId = sessionStorage.getItem("storeId");
    this.setState({ type: this.state.selectedType.label });
    let mrp = 0;
    let promo = 0;
    let total = 0;
    if (e.key === "Enter") {
      const formValid = this.handleValidation();
      if (formValid) {
  
      this.setState({ copysmNumber: JSON.parse(JSON.stringify(this.state.smNumber)) });
      if (this.state.barCode && this.state.smNumber) {
        CreateDeliveryService.getBarCodeList(
          this.state.barCode.trim(),
          this.state.smNumber,
          storeId
        ).then((res) => {

          if (res.data) {
            let count = false;
            // res.data.result.salesMan = this.state.copysmNumber;
            if(this.state.itemsList.length === 0){
            this.state.itemsList.push(res.data);
            }
            else {
         
              for (let i = 0; i < this.state.itemsList.length; i++) {
                if (
                    this.state.itemsList[i].barcode ===
                    res.data.barcode
                ) {
                    count = true;
                    var items = [...this.state.itemsList]
                    if (parseInt(items[i].quantity) + 1 <= parseInt(items[i].qty)) {
                        let addItem = parseInt(items[i].quantity) + 1;
                        items[i].quantity = addItem.toString()
                        let totalcostMrp = items[i].itemMrp * parseInt(items[i].quantity)
                        items[i].totalMrp = totalcostMrp
                        break;
                    } else {
                        // count = false
                        toast.info("Insufficient Quantity")
                        break;
                    }
                }
            }
            
            if(!count){
              this.state.itemsList.push(res.data);
            }
            

            }


            this.setState({ barList: this.state.itemsList, barCode: '' }, () => {
              console.log('++++++++++barList++++++++++++++', this.state.barList);
              this.state.barList.forEach((element) => {
                element.itemDiscount = 0;
                if(element.taxValues) {
                  element.cgst = element.taxValues.cgstValue;
                  element.sgst = element.taxValues.sgstValue;
                  element.taxValue = element.taxValues.cgstValue + element.taxValues.sgstValue;
                }               
                if (element.quantity > 1) {
                } else {
                  element.totalMrp = element.itemMrp;
                  element.quantity = parseInt("1");
                }

              });
              this.calculateTotal();
            });
            // this.setState({ barCode: "" });
            // this.setState({ itemsList: items.data });
            this.setState({ btnDisable: false });
            this.setState({ isDeliveryCreated: false });
            if(this.state.barList.length > 0){
              this.setState({isgetLineItems :true})
              
            } 
          } else {
            toast.error(res.data.body);
          }
        });



        this.setState({ showTable: true, isCheckPromo: true });
        if (!this.state.isRemember) {
          this.setState({ smNumber: "" });
        }


      } else {
        toast.info("Please enter Barcode / SM number");
      }
    }

  }
  };
  removeDuplicates(array, key) {
    const lookup = new Set();
    return array.filter(obj => !lookup.has(obj[key]) && lookup.add(obj[key]));
}
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
      this.setState({ isRemember: false, smNumber: "" });
    }
  }

  createDeliverySlip() {
    const storeId = sessionStorage.getItem("storeId");
    sessionStorage.removeItem("recentDS");
    const obj = {
      qty: this.state.qunatity,

      type: this.state.type,

      salesMan: this.state.smNumber,

      barcode: this.state.barList,

      storeId: parseInt(storeId)
    };
    CreateDeliveryService.createDeliverySlip(obj, this.state.type).then(
      (res) => {
        if (res.data.statusCode === "OK") {
          this.setState({ dsNumber: res.data.body.number });
          this.setState({ isCheckPromo: false });
          toast.success(res.data.body.message);
          sessionStorage.setItem("recentDS", res.data.body.message);
          this.setState({
            barCode: "",
            smNumber: "",
            barList: [],
            itemsList: [],
            showTable: false

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
    NewSaleService.getCheckPromoAmount(this.state.storeId, this.state.domainId, this.state.barList).then(response => {
      console.log(response.data.result.calculatedDiscountsVo);
      if (response && response.data && response.data.result[0].calculatedDiscountsVo) {
        this.setState({ promoDiscount: response.data.result  });
        this.state.barList.forEach(barCodeData => {
          this.state.promoDiscount.forEach(promo => {
            if (barCodeData.barcode === promo.barcode) {
              if (promo.calculatedDiscountsVo.discountAvailable) {
                barCodeData.itemDiscount = parseInt(promo.calculatedDiscountsVo.calculatedDiscount);
                barCodeData.totalMrp = barCodeData.totalMrp - barCodeData.itemDiscount;
              }
            } else {
              barCodeData.itemDiscount = "No discount"
            }
          });
        });



        this.setState({ barList: this.state.barList });
        this.calculateTotal();

      } else {
        toast.error("No Promo applicable")
      }

    });



    // PRINT SERVICE
    // PrinterStatusBill('DSNUM',null);
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
            {/* <button className="btn-unic m-r-2 scaling-mb">Clear Promotion</button> */}
            {/* <button className="btn-unic m-r-2 scaling-mb">Hold Estimation Slip</button> */}
            {/* <button className="btn-unic m-r-2 scaling-mb active" onClick={this.getLineItems}>Generate Estimation Slip</button> */}
            <button
                  className={ "btn-unic m-r-2 scaling-ptop active"+
                    "btn-login btn-create" +
                    (!this.state.isgetLineItems ? " btn-disable" : "")
                  }
                  onClick={this.generateEstimationSlip}
                  disabled={!this.state.isgetLineItems}
                >
                  Generate Estimation Slip
                </button>
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
                  <h6 className="pt-2">{this.state.totalQuantity}</h6>
                </div>

                {/* <div className="col-2">
                  <label>MRP</label>
                  <h6 className="pt-2">{this.state.mrpAmount} ₹</h6>
                </div> */}
                <div className="col-3">
                  <label>PROMO DISCOUNT</label>
                  <h6 className="pt-2">{this.state.promoDisc} ₹</h6>
                </div>
                <div className="col-2 text-right pt-2 text-center text-red p-r-4">
                  <label className="text-red ">GRAND TOTAL</label>
                  <h6 className="fs-16 text-red ">{this.state.mrpAmount} ₹</h6>
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
                        {/* <label>{items.productTextile.itemCode}</label> */}
                        <label>{items.barcode}</label>
                      </div>

                    </div>
                  </td>
                  {/* <td className="col-1"></td>
              <td className="col-1"></td> */}
                  <td className="col-1"><input type="number"
                    value={items.quantity}
                    min="1"
                    max={items.qty}
                    onChange={(e) => this.checkQuantity(e, index, items)}
                    className="form-control" />
                  </td>
                  <td className="col-1">{items.empId}</td>
                  <td className="col-1">₹{items.itemMrp}</td>
                  <td className="col-2"></td>
                  <td className="col-1"> {items?.itemDiscount}</td>
                  <td className="col-1 w-100">₹ {items.totalMrp}
                    <i className="icon-delete m-l-2"
                      onClick={(e) => {
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
    this.setState({isgetLineItems :true})
    if (e.target.value !== "") {
      item.quantity =  parseInt(e.target.value);
      let qty = item.quantity;
      if (item.quantity <= item.qty) {
        this.setState({ qty: e.target.value });


        item.quantity = parseInt(e.target.value);
        let totalcostMrp = item.itemMrp * parseInt(e.target.value);

        item.totalMrp = totalcostMrp

      } else {
        this.setState({isgetLineItems :false})
        toast.info("Insufficient Quantity");
      }
    } else {
      item.quantity = parseInt(e.target.value);
    }

    let grandTotal = 0;
    let totalqty = 0;
    let promoDiscount = 0;
    this.state.barList.forEach(bardata => {
      grandTotal = grandTotal + bardata.totalMrp;
      promoDiscount = promoDiscount + bardata?.itemDiscount;
      totalqty = totalqty + parseInt(bardata.quantity)
    });

    this.setState({ mrpAmount: grandTotal, totalQuantity: totalqty, promoDisc: promoDiscount });


  }
  handleValidation() {
    let errors = {};
    let formIsValid = true;
    //sm number
   
  if (this.state.smNumber.length !== errorLengthMin.smNumber) {
        formIsValid = false;
        errors["smNumber"] = createDelivery_Err_Msg.smNumber;
      }
  

    this.setState({ errors: errors });
    return formIsValid;
  }

  // checkQuantity(e,index,item) {
  //   this.state.barList[index].quantity = parseInt(e.target.value);
  // }


  calculateTotal() {


    let totalAmount = 0;
    let totalqty = 0;
    let promoDiscount = 0;
    this.state.barList.forEach(barCode => {

      totalAmount = totalAmount + barCode.totalMrp;
      promoDiscount = promoDiscount + (isNaN(barCode.itemDiscount) ? 0 : (parseInt(barCode.itemDiscount)));
      totalqty = totalqty + parseInt(barCode.quantity);
    });

    this.setState({ mrpAmount: totalAmount, totalQuantity: totalqty, promoDisc: promoDiscount });



  }
  // handleValidation() {
  //   let errors = {};
  //   let formIsValid = false;
  //   //sm number
  // //   if (!this.state.smNumber) {
  // //     formIsValid = false;
  // //     errors["smNumber"] = "Please Enter SM Number";
  // // }
  // // if (this.state.smNumber) {
  // //     let input = this.state.smNumber;
  // //     const smnumValid = input.length === 4 ;
  // //     if (this.state.smNumber && !smnumValid) {
  // //       formIsValid = false;
  // //       errors["smNumber"] = "SM Number Must Have 4 Digits";
  // //     }
  // //   }

  //   this.setState({ errors: errors });
  //   return formIsValid;
  // }



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
    const storeId = sessionStorage.getItem("storeId");
    let lineItem = [];
    this.state.barList.forEach((element, index) => {

      const obj = {
        "itemPrice": element.itemMrp,
        "quantity": parseInt(element.quantity),
        "discount": element?.discount,
        "netValue": element.totalMrp,
        "barCode": element.barcode,
        "domainId": 1,
        "storeId": parseInt(storeId),
        "section": element.section,
        "subSection": element.subSection,
        "division": element.division,
        "userId": parseInt(element.salesMan),
        "hsnCode": element.hsnCode,
        "actualValue": element.itemMrp,
        "taxValue": element.taxValue,
        "cgst": element.cgst,
        "sgst": element.sgst,
        "discount": (isNaN(element.itemDiscount) ? 0 : (parseInt(element.itemDiscount)))

      }
      // this.getTaxAmount(obj);
      lineItem.push(obj);
    });

    CreateDeliveryService.getLineItem(lineItem, 1).then(res => {
      if (res) {
        let lineItemsList = [];
        let dataResult = JSON.parse(res.data.result);
        dataResult.forEach(element => {
          const obj = {
            "lineItemId": element
          }
          lineItemsList.push(obj);
        });




        this.setState({ lineItemsList: lineItemsList }, () => {
          this.generateNew()
        });
      }
    });
  }

  generateNew() {
    const storeId = sessionStorage.getItem("storeId");
    const createObj = {
      "salesMan": parseInt(this.state.smNumber),
      "lineItems": this.state.lineItemsList,
      "storeId": parseInt(storeId)

    }

    CreateDeliveryService.saveDelivery(createObj).then(res => {
      if (res) {
        toast.success(res.data.message);
        this.setState({
          barCode: "",
          smNumber: "",
          barList: [],
          itemsList: [],
          isCheckPromo: false,
          showTable: false

        });

      }
    });

    this.hideModal();
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
          <div className="headerGreen"><h5>List Of Items</h5></div>
          <ModalBody>
            <div className="row">
              {/* <div className="col-12 mb-2">
                <label className="text-green fs-14"></label>
              </div> */}
              <div className="col-12">
                <table className="table table-borderless mb-1">
                  <thead>
                    <tr className="m-0 p-0">
                      {/* <th className="col-1"> </th> */}
                      <th className="col-3">SLIP NO.</th>
                      <th className="col-2">Qty</th>
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
                          <td className="col-2">{items.quantity}</td>
                          <td className="col-2">₹ {items.itemMrp}</td>
                          <td className="col-3">{items.itemDiscount}</td>
                          <td className="col-2">₹ {items.totalMrp}</td>
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
            <label>Select Type</label>
              <div className="form-group">


                <Select
                  className="upper-case"
                  placeholder="Select"
                  value={this.state.selectedType} // set selected value
                  options={this.state.typesList} // set list of the data
                  onChange={this.handleChange} // assign onChange function
                  isDisabled={true}
                  

                />
                {this.props.disabled}
              </div>
            </div>
            <div className="col-sm-3 col-6 scaling-mtop">
            <label>SM Number<span className="text-red font-bold">*</span></label>
              <div className="form-group">
                <input
                  type="text"
                  autoFocus
                  className="form-control"
                  value={this.state.smNumber}
                  onKeyPress={this.getDeliverySlips}
                  placeholder="SM Number"
                  maxLength={errorLengthMax.smNumber}
                  onChange={(e) => this.setState({ smNumber: e.target.value })}
                />
              </div>
              <div>
                             <span style={{ color: "red" }}>{this.state.errors["smNumber"]}</span>
                                                        </div>
              {/* <div>
                <span style={{ color: "red" }}>{this.state.errors["smNumber"]}</span>
                                        </div> */}
            </div>
            <div className="col-6 col-sm-3">
            <label>Barcode</label>
              <div className="form-group">
                {/* <input type="text" className="form-control" name="barCode" value={this.state.barCode} onKeyPress={this.getDeliverySlips}
                                 placeholder="Barcode [Crtl + 1]"/> */}

                <input
                  type="text"
                  name="barCode"
                  className="form-control frm-pr"
                  value={this.state.barCode}
                  onChange={(e) => this.setState({ barCode: e.target.value }, () => { 
                    this.getDeliverySlips(e) 
                  })}
                  autoComplete="off"
                  onKeyPress={this.getDeliverySlips}
                  placeholder="ENTER BARCODE"
                />
                {/* <button type="button"className="scan">
                               <img src={scan}/> SCAN  
                </button> */}
              </div>
              {/* <div>
               <span style={{ color: "red" }}>{this.state.errors["barCode"]}</span>
                                        </div> */}
            </div>
          
            {/* <div className="col-sm-3 col-6 scaling-mtop">
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
            </div> */}
            <div className="col-sm-3 scaling-ptop col-6 mt-4">
              <div className="form-group">

                {/* onClick={this.checkPromo} */}
                {/* <button
                  className={
                    "btn-login btn-create" +
                    (!this.state.isCheckPromo ? " btn-disable" : "")
                  }
                  onClick={this.checkPromo}
                >
                  Check Promo Discount
                </button> */}
                <button
                  className={
                    "btn-login btn-create" +
                    (!this.state.isCheckPromo ? " btn-disable" : "") 
                  }
                  onClick={this.checkPromo}
                  disabled={!this.state.isCheckPromo}
                >
                  Check Promo Discount
                </button>
              </div>
            </div>
            <div className="col-sm-3 scaling-ptop col-6">
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
