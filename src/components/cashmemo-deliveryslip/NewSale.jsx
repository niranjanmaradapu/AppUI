import React, { Component } from "react";
import { toast } from "react-toastify";
import scan from '../../assets/images/scan.svg';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import barcode from "../../assets/images/barcode.svg";
import card from "../../assets/images/card.svg";
import cash from "../../assets/images/cash.svg";
import upi from "../../assets/images/upi.svg";
import qr from "../../assets/images/qr_new.svg";
import khata from "../../assets/images/khata.svg";
import NewSaleService from "../../services/NewSaleService";
import CustomerData from "./CustomerData";
import Select from "react-select";
import ecommerce from "../../assets/images/ecommerce.svg";
import displayRazorpay from "../../commonUtils/PaymentGateway";
import URMService from "../../services/URM/URMService";
import CreateDeliveryService from "../../services/CreateDeliveryService";

export default class NewSale extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openn: false,
      isSubOpen: false,
      dsNumber: "",
      manualDisc: 0,
      isCash: false,
      isCard: false,
      btnDisabled: true,
      isCardSelected: false,
      isCashSelected: false,
      isBillLevelDisc: true,
      isCalculator:false,
      isPayment: true,
      cashAmount: 0.0,
      taxAmount: 0,
      cardAmount: 0.0,
      cardDigits: "",
      rBarCodeList: [],
      discReasons: [],
      selectedDisc: {},
      userId:"NA",
      deliverySlipData: {
        barcode: [],
        mrp: "",
        netAmount: 0.0,
        promoDisc: "",
        taxAmount: null,
      },
      dlslips: [],
      finalList: [],
      barCodeList: [],
      mobilenumber: "",
      customerName: "",
      gender: "",
      customerEmail: "",
      dob: "",
      customerGST: "",
      address: "",
      dropValue: "",
      grandNetAmount: 0.0,
      grandReceivedAmount: 0.0,
      grandBalance: 0,
      returnCash: 0.0,
      input: {},
      isBillingDetails: false,
      errors: {},
      isBillingDisc: false,
      showDiscReason: false,
      discApprovedBy: "",
      showTable: false,
      dsNumberList: [],
      // customerDetails: {
      //     mobilenumber: '',
      //     customerName: '',
      //     gender: '',
      //     customerEmail: '',
      //     dob: '',
      //     customerGST: '',
      //     address: ''
      // },
      // isOpen: false,
      mobileData: {
        address: "",
        altMobileNo: "",
        dob: "",
        gender: "",
        gstNumber: "",
        mobileNumber: "",
        name: "",
        email: "",
        newSaleId:"",
      },
      grossAmount: 0,
      totalPromoDisc: 0,
      totalManualDisc: 0,
      netPayableAmount: 0,
      netCardPayment: 0,
      promoDiscount: 0,
      retailBarCodeList: [],
      barCodeRetailList:[],
      genderList: [
        {
          value: "female",
          label: "Female",
        },
        {
          value: "male",
          label: "Male",
        },
      ],
      customerFullName: "",
      customerMobilenumber: "",
      isTextile: false,
      isRetail: false,
      lineItemsList: [],
      paymentOrderId:""
      // open: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.savePayment = this.savePayment.bind(this);
    this.tagCustomer = this.tagCustomer.bind(this);
    this.showDiscount = this.showDiscount.bind(this);
    this.hideDiscount = this.hideDiscount.bind(this);
    this.showCalculator = this.showCalculator.bind(this);
    this.hideCal = this.hideCal.bind(this);
    this.saveDiscount = this.saveDiscount.bind(this);
    this.getDeliverySlipDetails = this.getDeliverySlipDetails.bind(this);
    this.getRetailBarcodeList = this.getRetailBarcodeList.bind(this);
    //this.handler = this.handler.bind(this);
  }

  componentWillMount() {

    const clientId = JSON.parse(sessionStorage.getItem('selectedDomain'));
    console.log(clientId.label);
    const user = JSON.parse(sessionStorage.getItem('user'));
    this.setState({userId : parseInt(user["custom:userId"])});
    console.log(this.state.userId);
    if (clientId.label === "Textile") {
      this.setState({ isTextile: true, isRetail: false });
    } else if (clientId.label === "Retail") {
      this.setState({ isTextile: false, isRetail: true });
    }

  }

  openModal = () => {
    this.setState({
      openn: true,
    });
  };

  openSubModal = () => {
    this.setState({
      isSubOpen: true,
    });
  };

  hideModal = () => {
    this.setState({
      openn: false,
    });

    this.setState({
      customerName: " ",
      gender: " ",
      dob: " ",
      customerGST: " ",
      address: " ",
      mobilenumber: " ",
    });
  };

  hideCashModal = () => {
    this.setState({
      isCash: false,
    });
  };

  handleSubmit(e) {
    this.setState((state) => ({ open: !state.open }));
  }

  toggleModal = () => {
    this.setState({
      openn: true,
    });
  };

  getCashModel = () => {
    this.setState({
      isCash: true,
    });
    this.setState({
      isCard: false,
    });
    this.setState({
      isCashSelected: true,
    });
  };

  getCardModel = () => {
    this.setState({
      isCard: true,
    });
    this.savePayment();
    // this.setState({
    //   isCardSelected: true,
    // });
  };
  hideCardModal = () => {
    this.setState({
      isCard: false,
    });
   const value  =  displayRazorpay(this.state.cardAmount)
  };
  pay = () => {
    console.log(this.state.netPayableAmount);
    NewSaleService.payment(this.state.netCardPayment, this.state.newSaleId).then((res) => {
      this.setState({ isPayment: false });
      const data = JSON.parse(res.data.result);
      const options = {
        // process.env.RAZORPAY_KEY_ID
        key: "rzp_test_z8jVsg0bBgLQer",
        currency: data.currency,
        amount: data.amount,
        name: "OTSI",
        description: "Transaction",
        image: ecommerce,
        order_id: data.id,
        handler: function (response) {


          // return response;
          // alert("PAYMENT ID ::" + response.razorpay_payment_id);
         // this.setState({paymentOrderId:  response.razorpay_order_id });
          toast.success("Payment Done Successfully");
          
       //   this.postPaymentData(response.razorpay_order_id);
          // alert("ORDER ID :: " + response.razorpay_order_id);
          
        },
        prefill: {
          name: "Kadali",
          email: "kadali@gmail.com",
          contact: "9999999999",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      // this.setState({taxAmount: res.data});
    });
  };

  postPaymentData(paymentOrderId) {
   
    NewSaleService.postPaymentData(paymentOrderId, true).then(res =>{
      if(res) {
        this.setState({
          showTable: false,
          paymentOrderId: "",
          newSaleId: "",
          netPayableAmount:0.0
        })
      }
    });
  }


  getRetailBarcodeList() {
    let costPrice = 0;
    let discount = 0;
    let total = 0;
    CreateDeliveryService.getRetailBarcodeList(
      this.state.retailBarCode
    ).then((res) => {
     if(res) {
       this.setState({showTable: true});
      this.state.retailBarCodeList.push(res.data.result);
      if (this.state.retailBarCodeList.length > 1) {
        const barList = this.state.retailBarCodeList.filter(
          (test, index, array) =>
            index ===
            array.findIndex((findTest) => findTest.barcodeId === test.barcodeId)
        );

        if (barList.length > 1) {
          this.setState({ barCodeRetailList: barList });

        } else {
          this.setState({ barCodeRetailList: this.state.retailBarCodeList });
        }

      } else {
        this.setState({ barCodeRetailList: this.state.retailBarCodeList });
        // this.state.barCodeList = this.state.dlslips.lineItems;
      }

      this.state.barCodeRetailList.forEach((barCode, index) => {
        costPrice = costPrice + barCode.listPrice;
        discount = discount + barCode.promoDisc;
        total = total + barCode.listPrice;
      });

//      discount = discount + this.state.manualDisc;

      this.setState({
        netPayableAmount: total,
        totalPromoDisc: discount,
        grossAmount: costPrice,
      });

      this.getTaxAmount();
     }
      
    });
  }



  getDeliverySlipDetails() {

    this.setState({ showTable: false });
    let costPrice = 0;
    let discount = 0;
    let total = 0;
    this.state.barCodeList = [];
    this.state.finalList = [];
    this.state.rBarCodeList = [];
    const obj = {
      "dsNumber": this.state.dsNumber,
    }
    this.state.dsNumberList.push(obj);

    NewSaleService.getDeliverySlipDetails(this.state.dsNumber).then((res) => {
      this.setState({ showTable: true });
      this.state.dlslips.push(res.data.result);
      if (this.state.dlslips.length > 1) {
        const barList = this.state.dlslips.filter(
          (test, index, array) =>
            index ===
            array.findIndex((findTest) => findTest.dsNumber === test.dsNumber)
        );

        if (barList.length > 1) {
          let lineStorage = [];
          barList.forEach((element, index) => {
            let lineItems = element.lineItems;
            lineStorage = [...lineStorage, ...lineItems];
          });

          this.setState({ barCodeList: lineStorage });

        } else {
          this.setState({ barCodeList: barList[0].lineItems });
        }

      } else {
        this.setState({ barCodeList: this.state.dlslips[0].lineItems });
        // this.state.barCodeList = this.state.dlslips.lineItems;
      }

      this.state.barCodeList.forEach((barCode, index) => {
        costPrice = costPrice + barCode.itemPrice;
        discount = discount + barCode.discount;
        total = total + barCode.netValue;
      });

      discount = discount + this.state.manualDisc;

      this.setState({
        netPayableAmount: total,
        totalPromoDisc: discount,
        grossAmount: costPrice,
      });

      this.getTaxAmount();
    });

      
  }

  getTaxAmount() {

    NewSaleService.getTaxAmount(this.state.netPayableAmount).then((res) => {
      this.setState({ taxAmount: res.data.result });
      if (this.state.barCodeList.length > 0) {
        const grandNet = this.state.netPayableAmount + this.state.taxAmount;
        this.setState({
          grandNetAmount: grandNet,
          grandReceivedAmount: grandNet,
        });
        // this.state.grandNetAmount  =
        // this.state.grandReceivedAmount = this.state.netPayableAmount + this.state.taxAmount;
        if (this.state.cashAmount > this.state.grandNetAmount) {
          const returnCash = this.state.cashAmount - this.state.grandNetAmount;
          this.setState({ returnCash: returnCash });
        } else {
          this.state.cashAmount = 0;
          this.state.returnCash = 0;
          //  this.state.grandNetAmount = 0;
          this.state.grandReceivedAmount = 0;
          this.setState({ isPayment: true });
          //  toast.info("Please enter sufficient amount");
        }
      }
    });
  }

  getMobileDetails = (e) => {
    if (e.key === "Enter") {
      NewSaleService.getMobileData(this.state.mobilenumber).then((res) => {
        if (res.data.result) {
          this.state.mobileData = res.data.result;
          this.setState({
            customerName: res.data.result.name,
            gender: res.data.result.gender,
            dob: res.data.result.dob,
            customerEmail: res.data.result.email,
            customerGST: res.data.result.gstNumber,
            address: res.data.result.address,
          });
        } else {
          toast.error("No Data Found");
        }
      });
    }
  };

  showDiscount() {
    this.state.totalManualDisc = 0;
    this.setState({ isBillingDisc: true }, () => {
      this.getDiscountReasons();
    });

    // manualDisc: "",discApprovedBy:"", selectedDisc:{}
  }

  hideDiscount() {
    this.setState({ isBillingDisc: false });
  }
  showCalculator() {
   
    this.setState({ isCalculator: true});
  }

  hideCal() {
    this.setState({ isCalculator: false });
  }
  handleReasonChange = (e) => {
    console.log(e);
    this.setState({ dropValue: e.label });
  }

  saveDiscount() {
    console.log(this.state.totalPromoDisc);
    this.state.netPayableAmount = 0;
    const totalDisc =
      this.state.totalPromoDisc + parseInt(this.state.manualDisc);
    if (totalDisc < this.state.grossAmount) {
      const netPayableAmount = this.state.grossAmount - totalDisc;
      this.state.netPayableAmount = netPayableAmount;
      //  this.setState({netPayableAmount: netPayableAmount});
      this.getTaxAmount();
    }
    const promDisc =  parseInt(this.state.manualDisc) + this.state.totalPromoDisc;
    this.setState({ showDiscReason: true, promoDiscount: promDisc });

    this.hideDiscount();
  }

  getDiscountReasons() {
    NewSaleService.getDiscountReasons().then((res) => {
      if (res.status === 200) {
        //this.setState({discReasons: res.data});
        const discount = res.data.result;
        discount.forEach((dis, index) => {
          const obj = {
            value: dis,
            label: dis,
          };
          this.state.discReasons.push(obj);
        });
      } else {
        toast.error(res.data);
      }
    });
  }

  handleChange(event) {
    this.setState({ mobilenumber: event.target.value });
  }

  getReturnAmount = () => {
    console.log(this.state.barCodeList);
    if (this.state.barCodeList.length > 0) {
      this.setState({ isPayment: false });
    }
    this.state.grandNetAmount =
      this.state.netPayableAmount + this.state.taxAmount;
    this.state.grandReceivedAmount =
      this.state.netPayableAmount + this.state.taxAmount;
    const collectedCash = parseInt(this.state.cashAmount);
    
    if (collectedCash > this.state.grandNetAmount) {
      this.state.returnCash = collectedCash - this.state.grandNetAmount;
    } else if (collectedCash == this.state.grandNetAmount) {
      this.setState({ isPayment: false });
    } else {
      this.state.cashAmount = 0;
      this.state.returnCash = 0;
      this.state.grandNetAmount = 0;
      this.state.grandReceivedAmount = 0;
      this.setState({ isPayment: true });
      toast.info("Please enter sufficient amount");
    }
    this.hideCashModal();
  };

  removeDuplicates(array, key) {
    const lookup = new Set();
    return array.filter(obj => !lookup.has(obj[key]) && lookup.add(obj[key]));
  }

  savePayment() {
    this.state.discType = this.state.dropValue;
    this.state.dsNumberList = this.removeDuplicates(this.state.dsNumberList, "dsNumber");
    if (this.state.showDiscReason) {
      if (this.state.discApprovedBy && this.state.discType) {
        this.createInvoice();
      } else {
        toast.info("Please select discount type/ discount reason");
      }
    } else {
      this.createInvoice();
    }
  }

  createInvoice() {
    this.setState({netCardPayment: this.state.netPayableAmount })
    sessionStorage.removeItem("recentSale");
   
    let obj;
    if(this.state.isTextile) {
       obj = {

        "natureOfSale": "InStore",
  
        "domainId": 1,
  
        "storeId": null,
  
        "grossAmount": this.state.grossAmount,
  
        "totalPromoDisc": this.state.totalPromoDisc,
  
        "totalManualDisc": parseInt(this.state.manualDisc),
  
        "taxAmount": this.state.taxAmount,
  
        "discApprovedBy": this.state.discApprovedBy,
  
        "discType": this.state.discType,
  
        "approvedBy": null,
  
        "netPayableAmount": this.state.netPayableAmount,
  
        "offlineNumber": null,
  
        "userId": this.state.userId,
  
        "dlSlip": this.state.dsNumberList,
        "lineItemsReVo": null,
        "paymentAmountType": [{
          "paymentType": "Cash",
          "paymentAmount": this.state.cashAmount
        }]
  
      }

      if(this.state.isCard) {
        delete obj.paymentAmountType
      }

      NewSaleService.saveSale(obj).then((res) => {
        if (res) {
          this.setState({ isBillingDetails: false, dsNumber: "", finalList: []});
          this.setState({
            customerName: " ",
            gender: " ",
            dob: " ",
            customerGST: " ",
            address: " ",
            manualDisc: "",
            customerEmail: "",
            netPayableAmount:0.0,
        barCodeList:[],
        grossAmount:0.0,
        promoDiscount:0.0,
      
        taxAmount:0.0,
        grandNetAmount:0.0,

        isPayment:true

          });
          this.setState({ showDiscReason: false, isPayment: true });
          this.setState({ showTable: false });
          sessionStorage.setItem("recentSale", res.data.result);
          toast.success(res.data.result);
          this.setState({newSaleId: res.data.result});
         // this.pay()
          if(this.state.isCard) {
            this.pay()
          }
        } else {
          toast.error(res.data.result);
        }
      });

    } else if(this.state.isRetail) {
      let lineItems=[];
      this.state.retailBarCodeList.forEach((barCode,index) => {
        const obj = {
          "barCode": barCode.barcodeId,
          "domainId": 2,
          "itemPrice": barCode.listPrice,
          "netValue":  barCode.listPrice,
          "quantity": 1
        } 
        lineItems.push(obj);
      });
      CreateDeliveryService.getLineItem(lineItems, 2).then(res => {
        if(res) {
          let lineItemsList = [];
          let dataResult = JSON.parse(res.data.result);
          dataResult.forEach(element=> {
              const obj = {
                "lineItemId": element
              }
              lineItemsList.push(obj);
            });
          
          
       
  
          this.setState({lineItemsList: lineItemsList}, () => {

            
      obj = {

        "natureOfSale": "InStore",
  
        "domainId": 2,
  
        "storeId": null,
  
        "grossAmount": this.state.grossAmount,
  
        "totalPromoDisc": this.state.totalPromoDisc,
  
        "totalManualDisc": parseInt(this.state.manualDisc),
  
        "taxAmount": this.state.taxAmount,
  
        "discApprovedBy": this.state.discApprovedBy,
  
        "discType": this.state.discType,
  
        "approvedBy": null,
  
        "netPayableAmount": this.state.netPayableAmount,
  
        "offlineNumber": null,
  
        "userId": null,
  
        "dlSlip": null,
        "lineItemsReVo": this.state.lineItemsList,
        "paymentAmountType": [{
          "paymentType": "Cash",
          "paymentAmount": this.state.cashAmount
        }]
  
      }


            NewSaleService.saveSale(obj).then((res) => {
              if (res) {
                this.setState({ isBillingDetails: false, dsNumber: "", finalList: [] });
                this.setState({
                  customerName: " ",
                  gender: " ",
                  dob: " ",
                  customerGST: " ",
                  address: " ",
                  manualDisc: "",
                  customerEmail: "",
                  dsNumber: "",
                  barcode: "",
                  showTable: false,
                  barCodeRetailList: []
                });
                this.setState({ showDiscReason: false, isPayment: true });
                sessionStorage.setItem("recentSale", res.data.result);
                toast.success(res.data.result);
                this.setState({newSaleId: res.data.result});
              
                if(this.state.isCard) {
                  this.pay();
                }
              } else {
                toast.error(res.data.result);
              }
            });
          });
        }
      });

    }


 

    
  }

  tagCustomer() {
    const obj = {
      "id": "",
      "phoneNo": "+91" + this.state.mobilenumber,
      "name": "",
      "active": false,
      "inActive": false,
      "roleId": "",
      "storeId": ""
    }
    CreateDeliveryService.getUserByMobile("+91"+this.state.mobilenumber).then(res => {
      console.log(res);
      if (res) {
        const mobileData = res.data.result;
        this.setState({ userId: res.data.result.userId,customerFullName: res.data.result.userName
         });
         
    this.state.mobileData = {
      address: this.state.address,
      altMobileNo: "",
      dob: this.state.dob,
      gender: mobileData.gender,
      gstNumber: this.state.gstNumber,
      mobileNumber: mobileData.phoneNumber,
      name: mobileData.userName,
      email: this.state.customerEmail,
    };

    this.setState({
      isBillingDetails: true,
      customerMobilenumber:  mobileData.phoneNumber,
    });
  
      }
    });


    // this.state.customerMobilenumber = ;
    this.hideModal();
  }



  handleCallback = (childData) => {
  };

  handleDiscountChange = (e) => {
    this.setState({ dropValue: e.label });
    this.setState({ discType: e.label });
    this.setState({ selectedDisc: e });
    //  this.setState({discType: e.label}); this.state.isCardSelected &&
  };
  renderPayment() {
    if (this.state.isCashSelected) {
      return (
        <tr className="row m-0 p-0">
          <td className="col-6">Collected Cash</td>
          <td className="col-6 text-right font-bold">
            ₹ {this.state.cashAmount}
          </td>
        </tr>
      );
    } else if (this.state.isCardSelected) {
      return (
        <tr className="row m-0 p-0">
          <td className="col-6">Card Payment</td>
          <td className="col-6 text-right font-bold">
            ₹ {this.state.cardAmount}
          </td>
        </tr>
      );
    }
  }




  showOrderDetails() {



    return this.state.showTable && (
      <div>
        {
          this.state.isTextile && (
            <div className="table-responsive">
              <table className="table table-borderless mb-1">
                <thead>
                  <tr className="m-0 p-0">
                    <th className="col-1">S.NO</th>
                    <th className="col-3">Item</th>
                    <th className="col-2">Qty</th>
                    <th className="col-2">Gross Amount</th>
                    <th className="col-2">Discount</th>
                    <th className="col-2">Net Value</th>
                  </tr>
                </thead>

                <tbody>
                  {this.state.barCodeList.map((items, index) => {
                    return (
                      <tr key={index}>
                        <td className="col-1 geeks">
                          {index + 1}
                        </td>
                        <td className="col-3"><p>#{items.barCode}</p></td>
                        <td className="col-2">{items.quantity}</td>
                        <td className="col-2">₹ {items.netValue}</td>
                        <td className="col-2">₹ 0</td>
                        <td className="col-2">₹ {items.itemPrice}</td>
                      </tr>
                    );
                  })}


                </tbody>
              </table>

            </div>
          )
        }

        {
          this.state.isRetail && (
            <div className="table-responsive">
              <table className="table table-borderless mb-1">
                <thead>
                  <tr className="m-0 p-0">
                    <th className="col-1">S.NO</th>
                    <th className="col-3">Item</th>
                    <th className="col-2">Qty</th>
                    <th className="col-2">Gross Amount</th>
                    <th className="col-2">Discount</th>
                    <th className="col-2">Net Value</th>
                  </tr>
                </thead>

                <tbody>
                  {this.state.barCodeRetailList.map((items, index) => {
                    return (
                      <tr key={index}>
                        <td className="col-1 geeks">
                          {index + 1}
                        </td>
                        <td className="col-3"><p>#{items.barcodeId}</p></td>
                        <td className="col-2">{items.quantity}</td>
                        <td className="col-2">₹ {items.netValue}</td>
                        <td className="col-2">₹ 0</td>
                        <td className="col-2">₹ {items.listPrice}</td>
                      </tr>
                    );
                  })}


                </tbody>
              </table>

            </div>
          )
        }
      </div>




    );

  }




  render() {
    let subModalDialogStyles = {
      base: {
        bottom: -600,
        transition: "bottom 0.4s",
      },
      open: {
        bottom: 0,
      },
    };
    return (
      <div className="maincontent">

        <Modal isOpen={this.state.isBillingDisc} size="sm">
          <ModalHeader>Bill Level Discount</ModalHeader>
          <ModalBody>
            <div className="row p-3">
              <div className="col-12">
                <h6 className="fs-14">Please provide below details</h6>
              </div>
              <div className="col-12">
                <label>Amount</label>
                <input
                  type="text"
                  name="amount"
                  value={this.state.manualDisc}
                  onChange={(e) => this.setState({ manualDisc: e.target.value })}
                  placeholder="₹"
                  className="form-control" />
              </div>
              <div className="col-12 mt-3">
                <label>Discount Approved By</label>
                <input
                  type="text"
                  name="discount"
                  value={this.state.discApprovedBy}
                  onChange={(e) => this.setState({ discApprovedBy: e.target.value })}
                  placeholder=""
                  className="form-control" />
              </div>
              <div className="col-12 mt-3">
                <label>Reason</label>
                <Select className="m-t-3 upper-case select_control" placeholder="Select Reason"
                  value={this.state.selectedDisc} // set selected value
                  options={this.state.discReasons} // set list of the data
                  onChange={this.handleDiscountChange} // assign onChange function
                />
              </div>

            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn-unic" onClick={this.hideDiscount}>
              Cancel
            </button>
            <button
              className="btn-unic active fs-12"
              onClick={this.saveDiscount}
            >
              Confirm
            </button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.isCalculator} size="sm">
          <ModalHeader>Calculator</ModalHeader>
          <ModalBody>
            <div className="row p-3">
              <div className="col-12">
                <h6 className="fs-14">Please provide below details</h6>
              </div>
             
             

            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn-unic" onClick={this.hideCal}>
              Cancel
            </button>
         
          </ModalFooter>
        </Modal>
        <Modal
          isOpen={this.state.isCash}
          size="lg"
          onRequestHide={this.hideCashModal}
        >
          <ModalHeader>Cash Payment</ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-4">
                <label>Cash Amount: </label>
              </div>
              <div className="col-8">
                <input
                  type="text"
                  name="cash"
                  className="form-control"
                  value={this.state.cashAmount}
                  onChange={(e) =>
                    this.setState({ cashAmount: e.target.value })
                  }
                />
              </div>
            </div>
            <br></br>
          </ModalBody>
          <ModalFooter>
            <button className="pt-2 btn-bdr" onClick={this.hideCashModal}>
              CANCEL
            </button>
            <button
              className="btn btn-bdr active fs-12"
              onClick={this.getReturnAmount}
            >
              SAVE CASH PAYMENT
            </button>
          </ModalFooter>
        </Modal>
        {/* <Modal
          isOpen={this.state.isCard}
          size="lg"
          onRequestHide={this.hideCardModal}
        >
          <ModalHeader>Card Payment</ModalHeader>
          <ModalBody>

            <div className="row">
              <div className="col-4">
                <label>Amount: </label>
              </div>
              <div className="col-8">
                <input
                  type="text"
                  name="cash"
                  className="form-control"
                  value={this.state.cardAmount}
                  onChange={(e) =>
                    this.setState({ cardAmount: e.target.value })
                  }
                />
              </div>
            </div>
            <br></br>
          </ModalBody>
          <ModalFooter>
            <button className="pt-2 btn-bdr" onClick={this.hideCardModal}>
              CANCEL
            </button>
            <button
              className="btn btn-bdr active fs-12"
              onClick={() => {
                this.hideCardModal();
                this.pay();
              }}
            >
              PAY
            </button>
          </ModalFooter>
        </Modal> */}
        <Modal isOpen={this.state.openn} size="sm">
          <ModalHeader>
            {/* <ModalClose onClick={this.hideModal}/> */}
            {/* <ModalTitle>Modal title</ModalTitle> */}
            <h5>Tag customer</h5>
          </ModalHeader>
          <ModalBody>
            <div className="row p-3">

              <div className="col-12">
                <h6 className="fs-14 mb-4 mt-1">Please provide customer phone number </h6>
                <label>Phone Number</label>
                <input
                  type="text"
                  name="mobile"
                  className="form-control"
                  value={this.state.mobilenumber}
                  onChange={this.handleChange}
                  minLength="10"
                  maxLength="10"
                  onKeyPress={this.getMobileDetails}
                  autoComplete="off"
                />
                <div className="text-danger">{this.state.errors.phone}</div>
              </div>

              <div className="col-12">
                <div className="d-flex mt-3 pointer">
                  <div className="form-check checkbox-rounded checkbox-living-coral-filled fs-15">
                    <input type="checkbox" className="form-check-input filled-in" id="roundedExample2" />
                    <label className="form-check-label" htmlFor="roundedExample2">Confirming me to receive promotional messages.</label>
                  </div>

                </div>
              </div>

            </div>
          </ModalBody>
          <ModalFooter>
            <button className="pt-2 btn-bdr" onClick={this.hideModal}>
              Cancel
            </button>
            <button
              className="btn btn-bdr active fs-12"
              onClick={this.tagCustomer}
            >
              Confirm
            </button>
          </ModalFooter>
        </Modal>

        <div className="row">
          <div className="col-6 pt-2">
            {/* <h5>Create Sales Invoice</h5> */}
          </div>
          <div className="col-6 text-right pb-2">

          </div>
        </div>

        <div className="">
          <div className="row">
            <div className="col-sm-8 col-12">
              <div className="row">
                <div className="col-12 col-sm-4">
                  <div className="form-group">

                    {
                      this.state.isTextile && (
                        <div>
                          <input type="search" className="form-control frm-pr"
                            value={this.state.dsNumber}
                            onChange={(e) => this.setState({ dsNumber: e.target.value })}

                            placeholder="Enter DsNumber" />
                          <button type="button" className="scan" onClick={this.getDeliverySlipDetails}>
                            <img src={scan} /> SCAN
                          </button>
                        </div>
                      )
                    }

                    {
                      this.state.isRetail && (
                        <div>
                          <input type="search" className="form-control frm-pr"
                            value={this.state.retailBarCode}
                            onChange={(e) => this.setState({ retailBarCode: e.target.value })}

                            placeholder="Enter Barcode" />
                          <button type="button" className="scan" onClick={this.getRetailBarcodeList}>
                            <img src={scan} /> SCAN
                          </button>
                        </div>
                      )
                    }



                  </div>
                </div>
                <div className="col-12 col-sm-8 scaling-center">
                  <button className="btn-unic m-r-2 scaling-mb">Find Item</button>
                  <button className="btn-unic m-r-2 scaling-mb" onClick={this.showCalculator}>Calculator</button>
                </div>
              </div>
              <div className="row m-0 p-0">
                <div className="col-12 col-sm-4 scaling-center p-l-0">
                  <h5 className="mt-1 mb-3">
                    Order Details
                  </h5>
                </div>
                <div className="col-12 col-sm-8 scaling-center text-right p-r-0">
                  {/* <button className="btn-unic m-r-2">Tag Customer</button>  */}
                  <button
                    type="button"
                    className="btn-unic m-r-2 active scaling-mb"
                    onClick={this.toggleModal}
                  >Tag Customer </button>
                  <button className="btn-unic m-r-2 scaling-mb" onClick={this.showDiscount} >Bill Level Discount</button>
                  {/* <button
                    type="button"
                    className={
                      "btn-unic mt-0 m-r-2 scaling-mb" + (this.state.isPayment ? " btn-disable" : "")
                    }
                    onClick={this.savePayment}
                  >
                    Save Payment
                  </button> */}
                  {/* <button className={"mt-0"+ (this.state.isPayment ? "btn-unic btn-disable" : "btn-unic active") }onClick={this.savePayment}>Save Payment</button> */}
                </div>
                <div>{this.showOrderDetails()}</div>
                {
                  this.state.showTable && (

                    <div>
                      <div className="rect-cardred m-0">
                        <div className="row">
                          <div className="col-2 text-center">
                            <label>Items : <span className="font-bold"> {this.state.barCodeList.length}</span></label>
                            {/* <h6 className="pt-2">02</h6> */}
                          </div>

                          {/* <div className="col-2">
                          <label>Qty : <span className="font-bold"> 01</span></label>
                        </div> */}
                          <div className="col-2">

                            <label>N/Rate : <span className="font-bold"> ₹ {this.state.grossAmount}</span> </label>
                            {/* <h6 className="pt-2">{this.state.promoDisc} ₹</h6> */}
                          </div>
                          <div className="col-3">
                            <label>Discount : <span className="font-bold"> ₹
                              {this.state.promoDiscount}
                            </span> </label>
                            {/* <h6 className="pt-2">{this.state.promoDisc} ₹</h6> */}
                          </div>
                          <div className="col-2">
                            <label>Total : <span className="font-bold"> ₹ {this.state.netPayableAmount}</span> </label>
                            {/* <h6 className="pt-2">{this.state.promoDisc} ₹</h6> */}
                          </div>

                        </div>
                      </div>

                      <div className="row p-0 m-0 mt-2">
                        <div className="col-6 p-l-0">
                          <h5 className="mt-2">
                            Customer Details
                          </h5>
                        </div>
                        <div className="col-6"></div>
                        <table className="table table-borderless mb-1 mt-2">
                          <thead>
                            <tr className="m-0 p-0">
                              <th className="col-3">NAME</th>
                              <th className="col-3">MOBILE NUMBER</th>
                              <th className="col-3">LOYALTY POINTS</th>
                              <th className="col-3">EXPAIRY DATE</th>

                            </tr>
                          </thead>
                        </table>
                        <table className="table table-borderless gfg mb-0">
                          <tbody>
                            <tr>
                              <td className="col-3 geeks">
                                {/* John Peter */}
                                {this.state.customerFullName}
                              </td>
                              <td className="col-3"> {this.state.customerMobilenumber}</td>
                              <td className="col-3">
                                <div className="form-check checkbox-rounded checkbox-living-coral-filled fs-15">
                                  <input type="checkbox" className="form-check-input filled-in" id="roundedExample2" />
                                  <label className="form-check-label" htmlFor="roundedExample2">526</label>
                                  {/* <div className="custom-control t_image custom-checkbox V1_checkbox-label">
                            <input className="custom-control-input" type="checkbox" id="check1" />
                            <label className="custom-control-label V1_custom-control-label p-l-1 p-t-0 fs-14"
                              htmlFor="check1">526</label> */}

                                </div>
                              </td>
                              <td className="col-3">31 Dec 2021</td>

                            </tr>

                          </tbody>
                        </table>
                      </div>
                    </div>

                  )
                }

              </div>
            </div>
            <div className="col-sm-4 col-12">
              <div className="rect-grey pb-3">
                <h5 className="m-b-5">Billing summary</h5>
                <div className="row">
                  <div className="col-5">
                    <label>Total Amount</label>
                  </div>
                  <div className="col-7 text-right">
                    <label className="font-bold">₹ {this.state.netPayableAmount}</label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-5">
                    <label>CGST</label>
                  </div>
                  <div className="col-7 text-right">
                    <label className="font-bold">₹ {this.state.taxAmount}</label>
                  </div>
                </div>
                {/* <div className="row">
                  <div className="col-5">
                    <label>SGST</label>
                  </div>
                  <div className="col-7 text-right">
                    <label className="font-bold">₹ 75.00</label>
                  </div>
                </div> */}


                <div className="payment">
                  <div className="row">
                    <div className="col-5 p-r-0 pt-1">
                      <label>Payable Amount</label>
                    </div>
                    <div className="col-7 p-l-0 pt-1 text-right">
                      <label className="font-bold">₹ {this.state.grandNetAmount}</label>
                    </div>
                  </div>

                </div>
                <div className="form-group apply_btn">
                  <button type="button" className=""> Apply</button>
                  <input type="text" className="form-control" placeholder="ENTER RT NUMBER" />
                </div>
                <div className="form-group apply_btn mb-2">
                  <button type="button" className=""> Apply</button>
                  <input type="text" className="form-control" placeholder="COUPON CODE" />
                </div>
                <label className="fs-18 pt-3">Payment Type</label>
                <div className="list row">
                  <ul>
                    <li>
                      <span>
                        <img src={card}  onClick={this.getCardModel}/>
                        <label>CARD</label>
                      </span>

                    </li>
                    <li>
                      <span>
                        <img src={cash} onClick={this.getCashModel} />
                        <label>CASH</label>
                      </span>

                    </li>
                    <li>
                      <span>
                        <img src={qr} />
                        <label>QR</label>
                      </span>

                    </li>
                    <li>
                      <span className="">
                        <img src={upi} />
                        <label>UPI</label>
                      </span>

                    </li>
                    <li >
                      <span>
                        <img src={khata} />
                        <label>KHATA</label>
                      </span>

                    </li>

                  </ul>
                </div>
                <div className="mt-3">
                  <button 
                  className={"mt-1 w-100 "+ (this.state.isPayment ? "btn-unic btn-disable" : "btn-unic active") } onClick={this.savePayment}
                  >PROCEED TO CHECKOUT</button>
                  {/* <button className="btn-unic p-2 w-100">HOLD PAYMENT</button> */}
                </div>
              </div>
            </div>

          </div>
        </div>


      </div>
    );
  }
}

