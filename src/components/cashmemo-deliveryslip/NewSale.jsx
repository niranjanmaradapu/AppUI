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
import axios from 'axios';
import { BASE_URL } from "../../commonUtils/Base";
import { NEW_SALE_URL } from "../../commonUtils/ApiConstants";
import PrinterStatusBill from "../../commonUtils/PrintService";



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
      isCalculator: false,
      isPayment: true,
      cashAmount: 0.0,
      taxAmount: 0,
      cardAmount: 0.0,
      cardDigits: "",
      rBarCodeList: [],
      discReasons: [],
      selectedDisc: {},
      userId: null,
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
      couponCode: "",
      ccCollectedCash: "",
      dob: "",
      customerGST: "",
      address: "",
      dropValue: "",
      grandNetAmount: 0,
      grandReceivedAmount: 0.0,
      payingAmount:0, 
      grandBalance: 0,
      returnCash: 0,
      totalAmount:0,
      couponAmount: 0,
      input: {},
      isBillingDetails: false,
      errors: {},
      isBillingDisc: false,
      showDiscReason: false,
      discApprovedBy: "",
      showTable: false,
      dsNumberList: [],
      isCredit: false,
      isCreditAmount: false,
      paymentType: [],
      mobileData: {
        address: "",
        altMobileNo: "",
        dob: "",
        gender: "",
        gstNumber: "",
        mobileNumber: "",
        name: "",
        email: "",
        newSaleId: "",
      },
      grossAmount: 0,
      totalPromoDisc: 0,
      totalManualDisc: 0,
      netPayableAmount: 0,
      netCardPayment: 0,
      promoDiscount: 0,
      isBillingDiscount: false,
      retailBarCodeList: [],
      barCodeRetailList: [],
      createdBy: null,
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
      paymentOrderId: "",
      idClient: "",
      stateGST: 0,
      centralGST: 0,
      isCouponApplied: true,
      enablePayment: false,
      isCCModel: false,
      isCCPay: false,
      isCreditModel: false,
      isCreditConfirm: false,
      isUPIModel: false,
      upiMobilenumber: "",
      balanceCreditAmount: "",
      isreturnCreditCash: false,
      upiAmount:0,
      isCheckPromo:false
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
    this.getGvModel = this.getGvModel.bind(this);
    this.hideGVModel = this.hideGVModel.bind(this);
    this.saveGVNumber = this.saveGVNumber.bind(this);
    this.onCouponCode = this.onCouponCode.bind(this);
    this.getHsnDetails = this.getHsnDetails.bind(this);
    this.getCCModel = this.getCCModel.bind(this);
    this.hideCCModel = this.hideCCModel.bind(this);
    this.saveCCAmount = this.saveCCAmount.bind(this);
    this.getCreditModel = this.getCreditModel.bind(this);
    this.hideCreditModel = this.hideCreditModel.bind(this);
    this.confirmCreditModel = this.confirmCreditModel.bind(this);
    this.getUPIModel = this.getUPIModel.bind(this);
    this.hideUPIModel = this.hideUPIModel.bind(this);
    this.getUPILink = this.getUPILink.bind(this);
    this.getinvoiceLevelCheckPromo=this.getinvoiceLevelCheckPromo.bind(this);
    this.invoiceLevelCheckPromo=this.invoiceLevelCheckPromo.bind(this);
    

    //this.handler = this.handler.bind(this);
  }

  componentWillMount() {

    // const clientId = JSON.parse(sessionStorage.getItem('selectedDomain'));
    // console.log(clientId.label);
    const user = JSON.parse(sessionStorage.getItem('user'));
    this.setState({ createdBy: parseInt(user["custom:userId"]), idClient: user["custom:clientId1"] });
    // if (clientId.label === "Textile") {
    //   this.setState({ isTextile: true, isRetail: false });
    // } else if (clientId.label === "Retail") {
    //   this.setState({ isTextile: false, isRetail: true });
    // }

    // this.getHsnDetails();

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
      customerName: "",
      gender: "",
      dob: "",
      customerGST: "",
      address: "",
      mobilenumber: "",
    });
  };

  hideCashModal = () => {
    this.setState({
      isCash: false,
      cashAmount: 0,
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
      cashAmount: 0,
      returnCash: 0
    }, () => {
      if (this.state.isreturnCreditCash) {
        this.setState({ grandNetAmount: this.state.balanceCreditAmount })
      }
    });
    this.setState({
      isCard: false,
    });
    this.setState({
      isCashSelected: true,
    });
  };

  getCCModel() {
    this.setState({ isCCModel: true },
      () => {
        if (this.state.isreturnCreditCash) {
          this.setState({ grandNetAmount: this.state.balanceCreditAmount })
        }
      });
  }


  getUPIModel() {
    this.setState({ isUPIModel: true });
  }

  hideUPIModel() {
    this.setState({ isUPIModel: false });
  }

  getUPILink() {
    console.log(this.state.upiMobilenumber);
    this.savePayment();
    //     var instance = new Razorpay({ key_id: 'YOUR_KEY_ID', key_secret: 'YOUR_SECRET' })

    // instance.paymentLink.create({
    //   upi_link: true,
    //   amount: 500,
    //   currency: "INR",
    //   accept_partial: true,
    //   first_min_partial_amount: 100,
    //   description: "For XYZ purpose",
    //   customer: {
    //     name: "Gaurav Kumar",
    //     email: "gaurav.kumar@example.com",
    //     contact: 919999999999
    //   },
    //   notify: {
    //     sms: true,
    //     email: true
    //   },
    //   reminder_enable: true,
    //   notes: {
    //     policy_name: "Jeevan Bima"
    //   }
    // })
  }

  getCreditModel() {
    this.setState({ isCreditModel: true, payCreditAmount: this.state.grandNetAmount });

  }

  hideCreditModel() {
    this.setState({ isCreditModel: false });
  }

  confirmCreditModel() {

    if (this.state.creditAmount < this.state.grandNetAmount) {
      const amount = this.state.grandNetAmount - this.state.creditAmount;
      this.setState({ isPayment: true, isreturnCreditCash: true, balanceCreditAmount: amount, grandNetAmount: amount }, () => {
        const obj = {

          "paymentType": "PKTADVANCE",
          "paymentAmount": this.state.creditAmount
        }

        this.state.paymentType.push(obj);
      })
    } else {
      this.setState({ isPayment: false })
      const obj = {

        "paymentType": "PKTADVANCE",
        "paymentAmount": this.state.grandNetAmount
      }

      this.state.paymentType.push(obj);
    }
    const grandAmount = this.state.grandNetAmount >= this.state.payCreditAmount ? this.state.grandNetAmount - this.state.payCreditAmount : 0
    this.setState({isCreditAmount: true, grandNetAmount:grandAmount});

    this.hideCreditModel();

  }

  hideCCModel() {
    this.setState({ isCCModel: false });
  }

  saveCCAmount() {

    this.state.discType = this.state.dropValue;
    this.state.dsNumberList = this.removeDuplicates(this.state.dsNumberList, "dsNumber");
    sessionStorage.removeItem("recentSale");
    const storeId = sessionStorage.getItem("storeId");
    let obj;
    //if (this.state.isTextile) {
      obj = {

        "natureOfSale": "InStore",

        "domainId": 1,

        "storeId": parseInt(storeId),

        "grossAmount": this.state.grossAmount,

        "totalPromoDisc": this.state.totalPromoDisc,

        "totalManualDisc": parseInt(this.state.manualDisc),

        "taxAmount": this.state.taxAmount,

        "discApprovedBy": this.state.discApprovedBy,

        "discType": this.state.discType,

        "approvedBy": null,

        "netPayableAmount": this.state.netPayableAmount,

        "offlineNumber": null,

        "userId": this.state.userId ? this.state.userId : null,
        "createdBy": this.state.createdBy,
        "sgst": this.state.stateGST,
        "cgst": this.state.centralGST,
        "dlSlip": this.state.dsNumberList,
        "recievedAmount": this.state.cashAmount,
        "returnAmount": this.state.returnCash,
        "lineItemsReVo": null,
        "paymentAmountType": [
          {
            "paymentType": "Cash",
            "paymentAmount": this.state.ccCollectedCash
          },
          {
            "paymentType": "Card",
            "paymentAmount": this.state.ccCardCash
          }

        ]

      }

      console.log("+++++++++++++++++conirm3+++++++++++")

      NewSaleService.saveSale(obj).then((res) => {
        if (res) {
          this.setState({ isBillingDetails: false, dsNumber: "", finalList: [] });
          this.setState({
            customerName: " ",
            gender: " ",
            dob: " ",
            customerGST: " ",
            address: " ",
            manualDisc: 0,
            customerEmail: "",
            netPayableAmount: 0.0,
            barCodeList: [],
            grossAmount: 0.0,
            promoDiscount: 0.0,
            cashAmount: 0,
            taxAmount: 0.0,
            grandNetAmount: 0,
            returnCash: 0,
            stateGST: 0,
            centralGST: 0,
            isPayment: true,
            isCCPay: true,
            isCCModel: false,
            totalAmount:0,
            couponAmount:0,
            isCredit: false,


          });
          this.setState({ showDiscReason: false, isPayment: true });
          this.setState({ showTable: false });
          sessionStorage.setItem("recentSale", res.data.result);
          toast.success(res.data.result);
          this.setState({ newSaleId: res.data.result });
          // this.pay()

          this.pay()

        } else {
          toast.error(res.data.result);
        }
      });

    // }

  }

  getGvModel() {
    this.setState({ isgvModel: true });
  }

  hideGVModel() {
    this.setState({ isgvModel: false });
  }

  saveGVNumber() {
    const obj = [this.state.gvNumber];
    CreateDeliveryService.saveGVNumber(obj, true).then(resposne => {
      if (resposne) {
        toast.success(resposne.data.message);
      }
    })
    this.hideGVModel();
  }

  getCardModel = () => {
    this.setState({payingAmount: this.state.grandNetAmount})
    this.setState({
      isCard: true
    },
      () => {
        if (this.state.isreturnCreditCash) {
          this.setState({ grandNetAmount: this.state.balanceCreditAmount })
        }
      });


    this.savePayment();
    // this.setState({
    //   isCardSelected: true,
    // });
  };

  onCouponCode() {
    NewSaleService.getCoupons(this.state.idClient, this.state.couponCode).then(res => {
      if (res.data.result !== "Record not found") {
        console.log(res.data.result.value);
        let grandTotal = this.state.grandNetAmount;
        if (grandTotal > res.data.result.value) {
          grandTotal = grandTotal - res.data.result.value;
          this.setState({ grandNetAmount: grandTotal }, () => {
          this.setState({ isCouponApplied: false, couponAmount: res.data.result.value });
          });
        } else if(grandTotal <= res.data.result.value)  {
          toast.error("Please purchase greater than coupon amount")
        }
       
      } else {
        toast.error(res.data.result);
      }
    });
  }

  hideCardModal = () => {
    this.setState({
      isCard: false,
    });
    const value = displayRazorpay(this.state.cardAmount)
  };
  getPaymentResposne() {
  let  timer = 0
  let time=  setInterval(function() {
    // alert("5 seconds are up");
    console.log("++++++++++++++++ CALLING API");
    timer = timer+5
    console.log("timer+++",timer)
    if(timer=== 20){
      clearInterval(time);

      console.log("++++++++++CLEARED")
    }
}, 5000);

  } 

//   startTimer() {
//     timer = setInterval(function() {
//         alert("5 seconds are up");
//     }, 5000);
// }
 
//  stopTimer() {
//     alert("Timer stopped");
//     clearInterval(timer);
// }

  pay = () => {
    if (this.state.isUPIModel) {
      // this.getPaymentResposne() 
      const obj = {
        "amount": this.state.upiAmount,
        "description":"payment description",
        "customerDetails":{
          "name":"kadali",
          "contact":this.state.upiMobilenumber,
          "email":"kadali7799@gmail.com"
          }
      }
  
      const token = JSON.parse(sessionStorage.getItem('token'));
          const uninterceptedAxiosInstance = axios.create();
      uninterceptedAxiosInstance.post('http://14.98.164.17:9097/paymentgateway/razorpay/create-payment-link', obj,{
        headers: {
          'Authorization': 'Bearer' + ' ' + token,
        }}).then(response => {
        console.log(response);
        if(response.data) {
          this.setState({isUPIModel: false});
        }
      });


      
      // NewSaleService.payment(this.state.grandNetAmount, this.state.newSaleId).then((res) => {
      //   this.setState({ isUPIModel: false });
      //   const data = JSON.parse(res.data.result);
      //   if (res.data.result) {   
      //   }
      // var instance = new Razorpay({ key_id: data.id, key_secret: 'rzp_test_z8jVsg0bBgLQer' })
      // instance.paymentLink.create({
      //   upi_link: true,
      //   amount: this.state.grandNetAmount,
      //   currency: "INR",
      //   accept_partial: true,
      //   first_min_partial_amount: 100,
      //   description: "For XYZ purpose",
      //   customer: {
      //     name: "Neelu",
      //     email: "Neelu@gmail.com",
      //     contact: this.state.upiMobilenumber
      //   },
      //   notify: {
      //     sms: true,
      //     email: true
      //   },
      //   reminder_enable: true,
      //   notes: {
      //     policy_name: "Jeevan Bima"
      //   }
      // });
      // });

    } else {


      const cardAmount = this.state.isCCPay ? Math.round(this.state.ccCardCash) : Math.round(this.state.netCardPayment)
      NewSaleService.payment(cardAmount, this.state.newSaleId).then((res) => {
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
            toast.success("Payment Done Successfully");


            let status = true
            const param = '?razorPayId=' + response.razorpay_order_id + '&payStatus=' + status;
            const result = axios.post(BASE_URL + NEW_SALE_URL.saveSale + param, {});
            // Printer Service used for Testing
            // PrinterStatusBill('INVOICE',data.amount)


          },
          prefill: {
            name: "Kadali",
            email: "kadali@gmail.com",
            contact: "9999999999",
          },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        this.setState({ isCCPay: false });
      });

    }

  };

  postPaymentData(paymentOrderId) {

    NewSaleService.postPaymentData(paymentOrderId, true).then(res => {
      if (res) {
        this.setState({
          showTable: false,
          paymentOrderId: "",
          newSaleId: "",
          netPayableAmount: 0.0
        })
      }
    });
  }


  getRetailBarcodeList() {
    const storeId = sessionStorage.getItem("storeId");
    let costPrice = 0;
    let discount = 0;
    let total = 0;
    CreateDeliveryService.getRetailBarcodeList(
      this.state.retailBarCode,
      storeId
    ).then((res) => {
      if (res) {
        this.setState({ showTable: true, enablePayment: true });
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



  getDeliverySlipDetails= (e) => {

    this.setState({ showTable: false });
    let costPrice = 0;
    let discount = 0;
    let total = 0;
    this.state.barCodeList = [];
    this.state.finalList = [];
    this.state.rBarCodeList = [];
    const obj = {
      "dsNumber": this.state.dsNumber.trim(),
    }
    this.state.dsNumberList.push(obj);
    if (e.key === "Enter") {
    NewSaleService.getDeliverySlipDetails(this.state.dsNumber.trim()).then((res) => {
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

          this.setState({ barCodeList: lineStorage,dsNumber: '' });

        } else {
          this.setState({ barCodeList: barList[0].lineItems, dsNumber: ''  });
        }

      } else {
        this.setState({ barCodeList: this.state.dlslips[0].lineItems , dsNumber: ''});
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

      if (this.state.barCodeList.length > 0) {
        this.setState({ enablePayment: true });
      }

      this.getTaxAmount();
    });
  }

  }

  getTaxAmount() {
    const taxDetails = JSON.parse(sessionStorage.getItem("HsnDetails"));
    let slabCheck = false;
    let totalTax = 0
    let sgst =0
    let cgst =0
    this.state.barCodeList.forEach(barData => {
      // if (this.state.netPayableAmount >= taxData[0].priceFrom && this.state.netPayableAmount <= taxData[0].priceTo) {
      //   const taxPer = taxData[0].taxVo.taxLabel.split(' ')[1].split('%')[0];
      //   const tax = parseInt(taxPer) / 100;

      //   const totalTax = this.state.netPayableAmount * tax

      //   const central = totalTax / 2;
      //   this.setState({ centralGST: Math.ceil(central) });
      //   slabCheck = true;

      // }
    
       sgst= sgst+barData.sgst
       cgst= cgst+barData.cgst
       totalTax = sgst+cgst

    });

    this.setState({ centralGST:cgst });
    this.setState({ stateGST:sgst });

    // if (!slabCheck) {
    //   this.setState({ stateGST: 70, centralGST: 70 });
    //   console.log("Checking the slab")
    // }
    const grandTotal = this.state.netPayableAmount + this.state.centralGST + this.state.stateGST;
    this.setState({ grandNetAmount: grandTotal, totalAmount: grandTotal });


  }

  getMobileDetails = (e) => {
    if (e.key === "Enter") {
      NewSaleService.getMobileData(this.state.mobilenumber).then((res) => {
        console.log(res);
        if (res && res.data.isSuccess === "true" && res.data.result) {
          this.state.mobileData = res.data.result;
          this.setState({
            customerName: res.data.result.name,
            gender: res.data.result.gender,
            dob: res.data.result.dob,
            customerEmail: res.data.result.email,
            customerGST: res.data.result.gstNumber,
            address: res.data.result.address,
          });



        }
      });
    }
  };
  invoiceLevelCheckPromo(){
    console.log("string");
    this.getinvoiceLevelCheckPromo();
    
    
  }
  getinvoiceLevelCheckPromo()  {
    let costPrice = 0;
    let discount = 0;
    let total = 0;
    let discAppliedTotal=0;
    console.log('*******************',this.state.barCodeList);
    const storeId = sessionStorage.getItem("storeId");

    const requestObj = this.state.barCodeList.map((item) => {
      let obj = {};
      console.log('++++++++++++item+++++++++++++', item);
      obj.actualValue = item.actualValue;
      obj.barCode=item.barCode;
      obj.cgst=item.cgst;
      obj.discount=item.discount;
      obj.division=item.division;
      obj.domainId=item.domainId;
      obj.grossValue=item.grossValue;
      obj.hsnCode=item.hsnCode;
      obj.itemPrice=item.itemPrice;
      obj.lineItemId=item.lineItemId;
      obj.netValue=item.netValue;
      obj.quantity=item.quantity;
      obj.section=item.section;
      obj.sgst=item.sgst;
      obj.storeId=item.storeId;
      obj.subSection=item.subSection;
      obj.taxValue=item.taxValue;
      obj.userId=item.userId
     return obj;
    });
    console.log("+++++++++++++++++++++++", requestObj );
   
    NewSaleService.getinvoiceLevelCheckPro(1,storeId,requestObj).then((res) => {
      if (res.status === 200) {
        console.log(res);
        this.setState({
          barCodeList: res.data.result
        });
        
        this.state.barCodeList.forEach((barCode, index) => {
          costPrice = costPrice + barCode.itemPrice;
          discount = discount + barCode.discount;
          total = total + barCode.netValue;
        });
  
        discount = discount + this.state.manualDisc;
        discAppliedTotal = this.state.grandNetAmount-discount;
        console.log(discAppliedTotal)
        this.setState({
          netPayableAmount: total,
          totalPromoDisc: discount,
          grossAmount: costPrice,
          grandNetAmount:discAppliedTotal
        });
        if (this.state.barCodeList.length > 0) {
          this.setState({ enablePayment: true });
        }
  
        // this.getTaxAmount();
      }else {
        this.toast.error("no Promo Available");
      }
    });
  }

  showDiscount() {
    this.state.totalManualDisc = 0;
    this.setState({ isBillingDisc: true, isBillLevel: false, returnCash: 0 }, () => {
      this.getDiscountReasons();
    });


  }

  hideDiscount() {
    this.setState({ isBillingDisc: false,  returnCash: 0, selectedDisc: {} });
  }
  showCalculator() {

    this.setState({ isCalculator: true });
  }

  hideCal() {
    this.setState({ isCalculator: false });
  }
  handleReasonChange = (e) => {
    console.log(e);
    this.setState({ dropValue: e.label });
  }

  saveDiscount() {
    console.log(this.state.manualDisc);
    if (this.state.manualDisc <= this.state.grandNetAmount) {

      if (Object.keys(this.state.selectedDisc).length !== 0 && this.state.manualDisc !== 0 && this.state.discApprovedBy !== '') {
        // this.state.netPayableAmount = 0;
        const totalDisc = parseInt(this.state.manualDisc);
        if (totalDisc < this.state.grandNetAmount) {
          const netPayableAmount = this.state.grandNetAmount - totalDisc;
          this.state.grandNetAmount = netPayableAmount;

         // this.getTaxAmount();
        }
        const promDisc = parseInt(this.state.manualDisc) + this.state.totalPromoDisc;
        this.setState({ showDiscReason: true, promoDiscount: promDisc, isBillingDiscount: true, isBillLevel: true });

        this.hideDiscount();
      } else {
        toast.info("Please Enter all fields");
        this.setState({isBillLevel: false})
      }
    } else {
      toast.error("Please enter sufficient amount");
      this.setState({isBillLevel: false})
    }


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

  handleChange(e) {
    const regex = /^[0-9\b]+$/;
    const value = e.target.value;
    if (value === "" || regex.test(value)) {
      this.setState({
        [e.target.id]: e.target.value,
        mobilenumber: e.target.value,
      });
    } else {
      this.setState({ registerMobile: "" });
      // toast.error("pls enter numbers")
    }
    // this.setState({ mobilenumber: event.target.value });
  }

  getReturnAmount = () => {

    if (this.state.barCodeList.length > 0 || this.state.barCodeRetailList.length > 0) {
      this.setState({ isPayment: false });
    }

    this.state.grandReceivedAmount =
      this.state.netPayableAmount + this.state.taxAmount;
    const collectedCash = parseInt(this.state.cashAmount);

    if (collectedCash > this.state.grandNetAmount) {
      this.state.returnCash = collectedCash - this.state.grandNetAmount;
      this.state.returnCash = Math.round(this.state.returnCash);
      this.setState({payingAmount: this.state.grandNetAmount}, () => {
        this.setState({grandNetAmount: 0})
      } );
      this.setState({isCash: false});
    } else if (collectedCash == Math.round(this.state.grandNetAmount)) {
      this.setState({ isPayment: false,payingAmount: this.state.grandNetAmount, grandNetAmount: 0,});
      this.setState({ isPayment: false,payingAmount: this.state.grandNetAmount}, () => {
        this.setState({grandNetAmount: 0})
      } );
      this.setState({isCash: false});

    } else if(collectedCash < this.state.grandNetAmount) {
     // this.state.grandNetAmount = this.state.grandNetAmount - collectedCash;
     toast.error("Please collect suffient amount");
    } else {
      this.state.cashAmount = 0;
      this.state.returnCash = 0;
      this.state.grandNetAmount = 0;
      this.state.grandReceivedAmount = 0;
      this.setState({ isPayment: true});
      this.setState({isCash: false});
    }
    console.log(this.state.returnCash);
    // if (this.state.returnCash >= 1 || this.state.returnCash === 0) {
    //   this.setState({isCash: false});
    // } else {
    //   toast.error("Please collect suffient amount");
    // }

    const obj = {

      "paymentType": "Cash",
      "paymentAmount": this.state.grandNetAmount
    }

    this.state.paymentType.push(obj);

   
    //  this.hideCashModal();
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
    this.setState({ netCardPayment: this.state.grandNetAmount })
    sessionStorage.removeItem("recentSale");
    const storeId = sessionStorage.getItem("storeId");
    
    let obj;
    //  if (this.state.isTextile) {
      obj = {

        "natureOfSale": "InStore",

        "domainId": 1,

        "storeId": parseInt(storeId),

        "grossAmount": this.state.grossAmount,

        "totalPromoDisc": this.state.totalPromoDisc,

        "totalManualDisc": parseInt(this.state.manualDisc),

        "taxAmount": this.state.taxAmount,

        "discApprovedBy": this.state.discApprovedBy,

        "discType": this.state.discType,

        "approvedBy": null,

        "netPayableAmount": this.state.payingAmount,

        "offlineNumber": null,

        "mobileNumber": this.state.mobileData.mobileNumber,

        "userId": this.state.userId ? this.state.userId : null,

        "sgst": this.state.stateGST,
        "cgst": this.state.centralGST,
        "dlSlip": this.state.dsNumberList,
        "lineItemsReVo": null,
        "createdBy": this.state.createdBy,
        "recievedAmount": this.state.cashAmount,
        "returnAmount": this.state.returnCash,
        "paymentAmountType": this.state.paymentType

      }

      if (this.state.isCard) {
        delete obj.paymentAmountType
      }

      NewSaleService.saveSale(obj).then((res) => {
        if (res) {
          this.setState({ isBillingDetails: false, dsNumber: "",upiAmount: this.state.grandNetAmount, finalList: [] });
          this.setState({
            customerName: " ",
            gender: " ",
            dob: " ",
            customerGST: " ",
            address: " ",
            manualDisc: 0,
            customerEmail: "",
            netPayableAmount: 0.0,
            barCodeList: [],
            grossAmount: 0.0,
            promoDiscount: 0.0,
            cashAmount: 0,
            taxAmount: 0.0,
            grandNetAmount: 0,
            payingAmount:0,
            returnCash: 0,
            stateGST: 0,
            centralGST: 0,
            isPayment: true,
            isCreditAmount: false,
            creditAmount:0,
            payCreditAmount:0,
            totalAmount:0,
            couponAmount:0,
            isCredit: false,
            enablePayment: false
            



          });
          this.setState({ showDiscReason: false, isPayment: true });
          this.setState({ showTable: false });
          sessionStorage.setItem("recentSale", res.data.result);
          toast.success(res.data.result);
          this.setState({ newSaleId: res.data.result });
          if(!this.state.isCard){
            // Printer Service used for Testing
            PrinterStatusBill('INVOICE',null)
          }
          // this.pay()
          if (this.state.isCard || this.state.isUPIModel) {
            this.pay()
          }
        } else {
          toast.error(res.data.result);
        }
      });

    // } 
    
    // else if (this.state.isRetail) {
    //   let lineItems = [];
    //   this.state.retailBarCodeList.forEach((barCode, index) => {
    //     const obj = {
    //       "barCode": barCode.barcodeId,
    //       "domainId": 2,
    //       "itemPrice": barCode.listPrice,
    //       "netValue": barCode.listPrice,
    //       "quantity": 1
    //     }
    //     lineItems.push(obj);
    //   });
    //   CreateDeliveryService.getLineItem(lineItems, 2).then(res => {
    //     if (res) {
    //       let lineItemsList = [];
    //       let dataResult = JSON.parse(res.data.result);
    //       dataResult.forEach(element => {
    //         const obj = {
    //           "lineItemId": element
    //         }
    //         lineItemsList.push(obj);
    //       });




    //       this.setState({ lineItemsList: lineItemsList }, () => {


    //         obj = {

    //           "natureOfSale": "InStore",

    //           "domainId": 2,

    //           "storeId": parseInt(storeId),

    //           "grossAmount": this.state.grossAmount,

    //           "totalPromoDisc": this.state.totalPromoDisc,

    //           "totalManualDisc": parseInt(this.state.manualDisc),

    //           "taxAmount": this.state.taxAmount,

    //           "discApprovedBy": this.state.discApprovedBy,

    //           "discType": this.state.discType,

    //           "approvedBy": null,

    //           "netPayableAmount": this.state.netPayableAmount,

    //           "offlineNumber": null,

    //           "userId": this.state.userId ? this.state.userId : null,

    //           "dlSlip": null,
    //           "lineItemsReVo": this.state.lineItemsList,
    //           "sgst": this.state.centralGST,
    //           "cgst": this.state.centralGST,
    //           "createdBy": this.state.createdBy,
    //           "recievedAmount": this.state.cashAmount,
    //           "returnAmount": this.state.returnCash,
    //           "paymentAmountType": [
    //             {
    //               "paymentType": "Cash",
    //               "paymentAmount": this.state.cashAmount
    //             },
    //             {
    //               "paymentType": "PKTADVANCE",
    //               "paymentAmount": "2200"
    //             }
    //           ]

    //         }


    //         NewSaleService.saveSale(obj).then((res) => {
    //           if (res) {
    //             this.setState({ isBillingDetails: false, dsNumber: "", finalList: [] });
    //             this.setState({
    //               customerName: " ",
    //               gender: " ",
    //               dob: " ",
    //               customerGST: " ",
    //               address: " ",
    //               manualDisc: "",
    //               customerEmail: "",
    //               dsNumber: "",
    //               barcode: "",
    //               showTable: false,
    //               cashAmount: 0,
    //               stateGST: 0,
    //               centralGST: 0,
    //               barCodeRetailList: [],
    //               returnCash: 0,
    //               grandNetAmount: 0,
    //               totalAmount: 0,
    //               isCredit: false

    //             });
    //             this.setState({ showDiscReason: false, isPayment: true });
    //             sessionStorage.setItem("recentSale", res.data.result);
    //             toast.success(res.data.result);
    //             this.setState({ newSaleId: res.data.result });

    //             if (this.state.isCard) {
    //               this.pay();
    //             }
    //           } else {
    //             toast.error(res.data.result);
    //           }
    //         });
    //       });
    //     }
    //   });

    // }





  }

  tagCustomer() {
    const selectedMobile = JSON.parse(JSON.stringify(this.state.mobilenumber));
    const obj = {
      "id": "",
      "phoneNo": "+91" + this.state.mobilenumber,
      "name": "",
      "active": false,
      "inActive": false,
      "roleId": "",
      "storeId": ""
    }

    CreateDeliveryService.getUserByMobile("+91" + this.state.mobilenumber).then(res => {
      if (res) {
        const mobileData = res.data.result;
        this.setState({
          userId: res.data.result.userId,
          customerFullName: res.data.result.userName
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
          customerMobilenumber: mobileData.phoneNumber,
        });

        NewSaleService.getCreditNotes(selectedMobile, res.data.result.userId).then(response => {
          if (response) {
            console.log(response);
            if (response.data.result && response.data.result.length > 0) {
              this.setState({ isCredit: true, creditAmount: response.data.result[0].amount });
            }
          }
        });

      } else {

      }
    });


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
      <div className="p-l-0">
        {/* {
          this.state.isTextile && ( */}
            <div className="table-responsive">
              
              <table className="table table-borderless mb-1">
                <thead>
                  <tr className="m-0 p-0">
                    <th className="col-1">S.NO</th>
                    <th className="col-2">Item</th>
                    <th className="col-2">Qty</th>
                    <th className="col-2">MRP</th>
                    <th className="col-2">Discount</th>
                    <th className="col-1">Sgst</th>
                    <th className="col-1">Cgst</th>
                    <th className="col-2">Gross</th>
                  </tr>
                </thead>

                <tbody>
                {console.log('++++++++++++barCodeList+++++++++++++', this.state.barCodeList)}
                  {this.state.barCodeList.map((items, index) => {
                    return (
                      <tr key={index}>
                        <td className="col-1 geeks">
                          {index + 1}
                        </td>
                        <td className="col-2"><p>#{items.barCode}</p></td>
                        <td className="col-2">{items.quantity}</td>
                        <td className="col-2">₹ {items.itemPrice}</td>
                        <td className="col-2">₹ {items.discount}</td>
                        <td className="col-1">₹ {items.sgst}</td>
                        <td className="col-1">₹ {items.cgst}</td>
                        <td className="col-2">₹ {items.netValue}</td>
                      </tr>
                    );
                  })}


                </tbody>
              </table>

            </div>
          {/* )
        } */}

        {
          this.state.isRetail && (
            <div className="table-responsive p-l-0">
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
                        <td className="col-2">₹ {items.discount}</td>
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

      <div className="maincontent pt-0">


        <Modal isOpen={this.state.isUPIModel} size="lg">
          <ModalHeader>
            UPI
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-4">
                <label>Net Payable Amount: </label>
              </div>
              <div className="col-8">
                <input
                  type="text"
                  name="cash"
                  className="form-control"
                  value={this.state.grandNetAmount}
                  disabled
                />
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <label>Mobile Number: </label>
              </div>
              <div className="col-8">
                <input
                  type="text"
                  name="cash"
                  className="form-control"
                  minLength="10"
                  maxlength="10"
                  value={this.state.upiMobilenumber}
                  autoComplete="off"
                  onChange={(e) =>
                    this.setState({ upiMobilenumber: e.target.value })
                  }

                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn-unic" onClick={this.hideUPIModel}>
              Cancel
            </button>
            <button
              className="btn-unic active fs-12"
              onClick={this.getUPILink}
            >
              Confirm
            </button>
          </ModalFooter>

        </Modal>


        <Modal isOpen={this.state.isCCModel} size="lg">
          <ModalHeader>
            Cash & Card Payment
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-4">
                <label>Net Payable Amount: </label>
              </div>
              <div className="col-8">
                <input
                  type="text"
                  name="cash"
                  className="form-control"
                  value={this.state.grandNetAmount}
                  disabled
                />
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <label>Collected Cash: </label>
              </div>
              <div className="col-8">
                <input
                  type="text"
                  name="cash"
                  className="form-control"
                  value={this.state.ccCollectedCash}
                  onChange={(e) =>
                    this.setState({ ccCollectedCash: e.target.value }, () => {
                      if (this.state.ccCollectedCash < this.state.grandNetAmount) {
                        let ccReturn = this.state.grandNetAmount - this.state.ccCollectedCash;
                        this.setState({ ccCardCash: ccReturn });
                        console.log("+++++++++++++++++"+ccReturn);

                      }
                    })
                  }

                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn-unic" onClick={this.hideCCModel}>
              Cancel
            </button>
            <button
              className="btn-unic active fs-12"
              onClick={this.saveCCAmount}
            >
              Confirm
            </button>
          </ModalFooter>

        </Modal>


        <Modal isOpen={this.state.isCreditModel} size="lg">
          <ModalHeader>
            Credit Payment
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-4">
                <label>Credit Amount: </label>
              </div>
              <div className="col-8">
                <input
                  type="text"
                  name="cash"
                  className="form-control"
                  value={this.state.creditAmount}
                  disabled
                />
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <label> Cash: </label>
              </div>
              <div className="col-8">
                <input
                  type="text"
                  name="cash"
                  className="form-control"
                  value={this.state.payCreditAmount}
                  onChange={(e) =>
                    this.setState({ payCreditAmount: e.target.value })
                  }
                />
              </div>
            </div>

          </ModalBody>
          <ModalFooter>
            <button className="btn-unic" onClick={this.hideCreditModel}>
              Cancel
            </button>
            <button
              className="btn-unic active fs-12"
              // className={"fs-12" + (this.state.isCreditConfirm ? "btn-unic btn-disable" : "btn-unic active")}
              onClick={this.confirmCreditModel}
            >
              Confirm
            </button>
          </ModalFooter>

        </Modal>




        <Modal
          isOpen={this.state.isgvModel}
          size="lg"
          onRequestHide={this.hideGVModel}
        >
          <ModalHeader>Issue GV Number</ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-4">
                <label> GV Number: </label>
              </div>
              <div className="col-8">
                <input
                  type="text"
                  name="cash"
                  className="form-control"
                  value={this.state.gvNumber}
                  onChange={(e) =>
                    this.setState({ gvNumber: e.target.value })
                  }
                  autoComplete="off"
                />
              </div>
            </div>
            <br></br>
          </ModalBody>
          <ModalFooter>
            <button className="pt-2 btn-bdr" onClick={this.hideGVModel}>
              CANCEL
            </button>
            <button
              className="btn btn-bdr active fs-12"
              onClick={this.saveGVNumber}
            >
              SAVE
            </button>
          </ModalFooter>
        </Modal>





        <Modal isOpen={this.state.isBillingDisc} size="sm">
          <ModalHeader>Bill Level Discount</ModalHeader>
          <ModalBody>
            <div className="row p-3">
              <div className="col-12">
                <h6 className="fs-14">Please provide below details</h6>
              </div>
              <div className="col-12">
                <label>Amount</label>
                <span className="text-red font-bold">*</span>
                <input
                  type="text"
                  name="amount"
                  value={this.state.manualDisc}
                  onChange={(e) => this.setState({ manualDisc: e.target.value })}
                  placeholder="₹"
                  className="form-control" />
              </div>
              <div className="col-12 mt-3">
                <label>Discount Approved By</label> <span className="text-red font-bold">*</span>
                <input
                  type="text"
                  name="discount"
                  value={this.state.discApprovedBy}
                  onChange={(e) => this.setState({ discApprovedBy: e.target.value })}
                  placeholder=""
                  autoComplete="off"
                  className="form-control" />
              </div>
              <div className="col-12 mt-3">
                <label>Reason</label> <span className="text-red font-bold">*</span>
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
                <label>Net Payable Amount: </label>
              </div>
              <div className="col-8">
                <input
                  type="text"
                  name="cash"
                  className="form-control"
                  value={this.state.grandNetAmount}
                  disabled
                />
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <label>Collected Cash: </label>
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

        <Modal isOpen={this.state.openn} size="sm">
          <ModalHeader>

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
                  {/* <div className="form-check checkbox-rounded checkbox-living-coral-filled fs-15">
                    <input type="checkbox" className="form-check-input filled-in" id="roundedExample2" />
                    <label className="form-check-label" htmlFor="roundedExample2">Confirming me to receive promotional messages.</label>
                  </div> */}

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
            <div className="newsale-body p-r-1">
                   <div className="newsale-body-left">
                   <div className="">
              <div className="row m-r-0">
                <div className="col-12 col-sm-4">
                  <div className="form-group fm-height">

                    {/* {
                      this.state.isTextile && ( */}
                        <div>
                           <label>ES Number</label>
                          {/* <input type="text" className="form-control frm-pr"
                            value={this.state.dsNumber}
                            onKeyPress={this.getDeliverySlipDetails}
                            // onChange={(e) => this.setState({ dsNumber: e.target.value })}
                            placeholder="Enter ES Number" /> */}
                                            <input
                  type="text"
                  autoFocus
                  className="form-control"
                  value={this.state.dsNumber}
                  onKeyPress={this.getDeliverySlipDetails}
                  placeholder="ES Number"
                  // onChange={(e) => this.setState({ dsNumber: e.target.value })}
                  onChange={(e) => this.setState({ dsNumber: e.target.value }, () => { 
                    this.getDeliverySlipDetails(e) 
                  })}
                />
                          <button type="button" className="scan" onClick={this.getDeliverySlipDetails}>
                            <img src={scan} /> SCAN
                          </button>
                        </div>
                      {/* )
                    } */}

                    {/* {
                      this.state.isRetail && (
                        <div>
                           <label>Barcode</label>
                          <input type="search" className="form-control frm-pr"
                            value={this.state.retailBarCode}
                            onChange={(e) => this.setState({ retailBarCode: e.target.value })}

                            placeholder="Enter Barcode" />
                          <button type="button" className="scan" onClick={this.getRetailBarcodeList}>
                            <img src={scan} /> SCAN
                          </button>
                        </div>
                      )
                    } */}



                  </div>
                </div>
                {
                  this.state.showTable && (


                    <div className="col-12 col-sm-8 scaling-center p-t-5 text-right p-r-0">

                      <button
                        type="button"
                        className={"m-r-2  scaling-mb " + (this.state.isCredit ? " btn-unic btn-disable" : " btn-unic active")}
                        onClick={this.toggleModal}
                      >Tag Customer </button>
                      <button
                        className={" m-r-2 scaling-mb " + (this.state.isBillLevel ? "btn-unic btn-disable" : "btn-unic active")}
                        onClick={this.showDiscount}
                        disabled={(this.state.isBillLevel )}
                        >Bill Level Discount</button>
                        <button
                        type="button"
                        className="btn-unic m-r-2 active scaling-mb"
                        onClick={this.invoiceLevelCheckPromo}
                      
                        > Check Promo Discount
                        </button>
                      
                    </div>



                  )
                }

              </div>
              <div className="row m-0 p-0">
                <div className="col-12 col-sm-4 scaling-center p-l-0">
                  <h5 className="fs-18">
                    Order Details
                  </h5>
                </div>

            

                <div className="p-l-0">{this.showOrderDetails()}</div>
                {
                  this.state.showTable && (

                    <div className="p-l-0">
                      <div className="rect-cardred m-0">
                        <div className="row">
                          <div className="col-2 text-center">
                            <label>Items : <span className="font-bold"> {this.state.barCodeList.length}</span></label>

                          </div>


                          <div className="col-2">


                          </div>
                          <div className="col-3">
                            <label>Discount : <span className="font-bold"> ₹
                              {this.state.totalPromoDisc}
                            </span> </label>

                          </div>
                          <div className="col-2">
                            <label>Total : <span className="font-bold"> ₹ {this.state.netPayableAmount}</span> </label>

                          </div>

                        </div>
                      </div>

                      <div className="row p-0 m-0 mt-2">
                        <div className="col-6 p-l-0">
                          <h5 className="mb-0 mt-2 fs-18">
                            Customer Details
                          </h5>
                        </div>
                        <div className="col-6"></div>
                        <table className="table table-borderless mb-0 mt-2 p-l-0 p-r-0">
                          <thead>
                            <tr className="m-0 p-0">
                              <th className="col-3">NAME</th>
                              <th className="col-3">MOBILE NUMBER</th>
                              <th className="col-3">LOYALTY POINTS</th>
                              <th className="col-3">EXPIRY DATE</th>

                            </tr>
                          </thead>
                        </table>
                        <table className="table table-borderless gfg mb-0 p-l-0 p-r-0">
                          <tbody>
                            <tr>
                              <td className="col-3 geeks">
                                {/* John Peter */}
                                {this.state.customerFullName}
                              </td>
                              <td className="col-3"> {this.state.customerMobilenumber}</td>
                              <td className="col-3">
                                <div className="form-check checkbox-rounded checkbox-living-coral-filled fs-15">
                                  {/* <input type="checkbox" className="form-check-input filled-in" id="roundedExample2" /> */}
                                  <label className="form-check-label" htmlFor="roundedExample2"> </label>


                                </div>
                              </td>
                              <td className="col-3"></td>

                            </tr>

                          </tbody>
                        </table>
                      </div>
                    </div>

                  )
                }
       
       {
                  this.state.enablePayment && (
                    <div className="pay p-l-0">
                      <h5 className="fs-18 mb-2 font-bold pt-3">Payment Type</h5>
                        <ul>
                          <li>
                            <span>
                              <img src={card} onClick={this.getCardModel} />
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
                            <span className="">
                              <img src={upi} onClick={this.getUPIModel} />
                              <label>UPI</label>
                            </span>

                          </li>
                          <li>
                            <span>
                              <img src={qr} onClick={this.getCCModel} />
                              <label>CC</label>
                            </span>

                          </li>
                          {
                            this.state.isCredit && (
                              <li>
                                <span className="">
                                  <img src={upi} onClick={this.getCreditModel} />
                                  <label>CREDIT</label>
                                </span>

                              </li>
                            )
                          }

                          <li>
                            <span>
                              <img src={khata} />
                              <label>KHATA</label>
                            </span>

                          </li>
                          <li>
                            <span>
                              <img src={khata} onClick={this.getGvModel} />
                              <label> GV</label>
                            </span>

                          </li>


                        </ul>
                    </div>
                  )
                }
              </div>
            </div>
                  </div>
                  <div className="newsale-body-right">
                  <div className="">
              <div className="billing pb-3">
                <h5 className="">Billing summary</h5>
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
                    <label className="font-bold">₹ {this.state.centralGST}</label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-5">
                    <label>SGST</label>
                  </div>
                  <div className="col-7 text-right">
                    <label className="font-bold">₹ {this.state.stateGST}</label>
                  </div>
                </div>



                <div className="payment">
                <div className="row">
                    <div className="col-5 p-r-0 pt-1">
                      <label className="text-secondary">Total Amount</label>
                    </div>
                    <div className="col-7 p-l-0 pt-1 text-right">
                      <label className="font-bold text-secondary">₹ {this.state.totalAmount}</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-5 p-r-0 pt-1">
                      <label className="text-green">Promo Discount</label>
                    </div>
                    <div className="col-7 p-l-0 pt-1 text-right">
                      <label className="font-bold text-green">₹ {this.state.totalPromoDisc}</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-5 p-r-0 pt-1">
                      <label className="text-secondary">Payable Amount</label>
                    </div>
                    <div className="col-7 p-l-0 pt-1 text-right">
                      <label className="font-bold text-secondary">₹ {this.state.grandNetAmount}</label>
                    </div>
                  </div>

                 
                {
                  this.state.isBillingDiscount && (
                    <div className="row">
                    <div className="col-5">
                      <label className="text-secondary">Billing Discount</label>
                    </div>
                    <div className="col-7 text-right">
                      <label className="font-bold text-secondary">₹ {this.state.manualDisc}</label>
                    </div>
                  </div>
                  )
                }

                  {
                    this.state.isCreditAmount && (
                      <div>
                            <div className="row">
                      <div className="col-5">
                        <label className="text-secondary">Credit Amount</label>
                      </div>
                      <div className="col-7 text-right">
                        <label className="font-bold text-secondary">₹ {this.state.creditAmount}</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-5">
                        <label className="text-secondary">Payed Amount</label>
                      </div>
                      <div className="col-7 text-right">
                        <label className="font-bold text-secondary">₹ {this.state.payCreditAmount}</label>
                      </div>
                    </div>
                      </div>
                      
                  
                    
                    )
                  }



                  {
                    this.state.isreturnCreditCash && (
                      <div className="row">
                        <div className="col-5 p-r-0 pt-1">
                          <label className="text-secondary">Balance Amount</label>
                        </div>
                        <div className="col-7 p-l-0 pt-1 text-right">
                          <label className="font-bold text-secondary">₹ {this.state.balanceCreditAmount}</label>
                        </div>
                      </div>
                    )
                  }


                  {
                    this.state.returnCash >= 0  && (
                      <div> 
                        <div className="row">
                        <div className="col-5 p-r-0 pt-1">
                          <label className="text-secondary">Collected Amount</label>
                        </div>
                        <div className="col-7 p-l-0 pt-1 text-right">
                          <label className="font-bold text-secondary">₹ {this.state.cashAmount}</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-5 p-r-0 pt-1">
                          <label className="text-orange">Return Amount</label>
                        </div>
                        <div className="col-7 p-l-0 pt-1 text-right">
                          <label className="font-bold text-orange">₹ {this.state.returnCash}</label>
                        </div>
                      </div>
                      </div>
                      
                    )
                  }

{
                    this.state.couponAmount > 0 && (
                      <div className="row">
                      <div className="col-5">
                        <label className="text-green">Coupon Applied</label>
                      </div>
                      <div className="col-7 text-right">
                        <label className="font-bold text-green">₹ {this.state.couponAmount}</label>
                      </div>
                    </div>
                    )
                  }

                  



                </div>
                {
                  this.state.grandNetAmount > 0 && (
                    <div>
                      <div className="form-group apply_btn">
                        <button type="button" className=""> Apply</button>
                        <input type="text" className="form-control" placeholder="ENTER RT NUMBER" />
                      </div>
                      {
                        this.state.isCouponApplied && (
                          <div className="form-group apply_btn mb-2">
                            <button type="button" className="" onClick={this.onCouponCode}> Apply</button>
                            <input type="text" className="form-control" placeholder="COUPON CODE" value={this.state.couponCode}
                              onChange={(e) => this.setState({ couponCode: e.target.value })}
                            />
                          </div>
                        )
                      }

                    </div>
                  )
                }





                <div className="p-t-3">
                  <button
                    className={"mt-1 w-100 " + (this.state.grandNetAmount !== 0 || this.state.totalAmount === 0 ? "btn-unic btn-disable" : "btn-unic active")} 
                    onClick={this.savePayment}
                    disabled={(this.state.grandNetAmount !== 0 || this.state.totalAmount === 0 )}
                  >PROCEED TO CHECKOUT</button>
                  {/* <button className="btn-unic p-2 w-100">HOLD PAYMENT</button> */}
                </div>
              </div>
            </div>
                  </div>
            </div>
        </div>
      


      </div>
    );
  }
}

