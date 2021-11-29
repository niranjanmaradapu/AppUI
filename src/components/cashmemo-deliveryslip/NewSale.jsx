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
      isPayment: true,
      cashAmount: 0.0,
      taxAmount: 0,
      cardAmount: 0.0,
      cardDigits: "",
      rBarCodeList: [],
      discReasons: [],
      selectedDisc: {},
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
      },
      grossAmount: 0,
      totalPromoDisc: 0,
      totalManualDisc: 0,
      netPayableAmount: 0,
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
      // open: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.savePayment = this.savePayment.bind(this);
    this.tagCustomer = this.tagCustomer.bind(this);
    this.showDiscount = this.showDiscount.bind(this);
    this.hideDiscount = this.hideDiscount.bind(this);
    this.saveDiscount = this.saveDiscount.bind(this);
    //this.handler = this.handler.bind(this);
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
      isCashSelected: true,
    });
  };
  getCardModel = () => {
    this.setState({
      isCard: true,
    });
    this.setState({
      isCardSelected: true,
    });
  };
  hideCardModal = () => {
    this.setState({
      isCard: false,
    });
    // const value  =  displayRazorpay(this.state.cardAmount)
    // console.log(value);
  };
  pay = () => {
    NewSaleService.payment(this.state.cardAmount).then((res) => {
      console.log(res.data);
      this.setState({ isPayment: false });
      const data = res.data;
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
          console.log("PAYMENT ID ::" + response.razorpay_payment_id);
          console.log("ORDER ID :: " + response.razorpay_order_id);

          // return response;
          // alert("PAYMENT ID ::" + response.razorpay_payment_id);
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

  // Added By Neelima
  getDeliverySlipDetails = (e) => {
    if (e.key === "Enter") {
      this.setState({showTable:true});
      this.state.barCodeList = [];
      this.state.finalList = [];
      this.state.rBarCodeList = [];
      NewSaleService.getDeliverySlipDetails(this.state.dsNumber).then((res) => {
        console.log(res);
        // if(res.data.statusCodeValue === 200) {
        this.state.dlslips.push(res.data.result.lineItems);
        console.log(this.state.dlslips);
        if (this.state.dlslips.length > 1) {
          const barList = this.state.dlslips.filter(
            (test, index, array) =>
              index ===
              array.findIndex((findTest) => findTest.dsNumber === test.dsNumber)
          );

          // this.state.dlslips = barList;
          this.setState({ dlslips: barList });
          this.state.barCodeList = [];
          this.state.rBarCodeList = [];
          this.state.dlslips.forEach((dlslip, index) => {
            this.state.barCodeList.push(dlslip.lineItems);
          });

          this.state.barCodeList.forEach((data, i) => {
            if (data.length > 1) {
              data.forEach((item, id) => {
                this.state.finalList.push(item);
              });
            } else {
              this.state.finalList.push(data[0]);
            }

            this.setState({ rBarCodeList: this.state.finalList });
          });

          if (this.state.manualDisc) {
            this.state.finalList.forEach((element) => {
              element.manualDisc = this.state.manualDisc;
            });
          }

          this.state.grossAmount = 0;
          this.state.totalPromoDisc = 0;
          this.state.netPayableAmount = 0;

          this.state.dlslips.forEach((slip, index) => {
            this.state.grossAmount = this.state.grossAmount + slip.mrp;
            this.state.totalPromoDisc =
              this.state.totalPromoDisc + slip.promoDisc;
            this.state.netPayableAmount =
              this.state.netPayableAmount + slip.netAmount;
          });
        } else {
          this.state.finalList = this.state.dlslips.lineItems;
          if (this.state.manualDisc) {
            this.state.finalList.forEach((element) => {
              element.manualDisc = this.state.manualDisc;
            });
          }
          this.setState({
            grossAmount: this.state.dlslips[0].mrp,
            totalPromoDisc: this.state.dlslips[0].promoDisc,
            totalManualDisc: this.state.manualDisc,
            netPayableAmount: this.state.dlslips[0].netAmount,
          });
        }

        console.log(this.state.manualDisc);

        // if(this.state.manualDisc) {
        //     const totalDisc = this.state.totalPromoDisc + parseInt(this.state.manualDisc);
        //     if(totalDisc < this.state.grossAmount) {
        //         const netPayableAmount = (this.state.grossAmount) - totalDisc;
        //         this.setState({netPayableAmount: netPayableAmount});
        //     }
        // }

     //   this.getTaxAmount();

        this.setState({ deliverySlipData: res.data });

        this.setState({ isBillingDetails: true });

        this.setState({ isBillLevelDisc: false });

        this.setState({ manualDisc: "", dsNumber: "" });

        // } else {
        //     toast.error(res.data.body);
        // }
        console.log(this.state.manualDisc);
      });
      
    }
  }

  getTaxAmount() {
    // this.state.taxAmount = 0;
    // this.state.cashAmount = 0;
    // this.state.returnCash = 0;
    // this.state.grandNetAmount = 0;
    // this.state.grandReceivedAmount = 0;
    NewSaleService.getTaxAmount(this.state.netPayableAmount).then((res) => {
      console.log(res);
      this.setState({ taxAmount: res.data.result });
      console.log(this.state.finalList);
      if (this.state.finalList.length > 0) {
        const grandNet = this.state.netPayableAmount + this.state.taxAmount;
        this.setState({
          grandNetAmount: grandNet,
          grandReceivedAmount: grandNet,
        });
        // this.state.grandNetAmount  =
        // this.state.grandReceivedAmount = this.state.netPayableAmount + this.state.taxAmount;;
        if (this.state.cashAmount > this.state.grandNetAmount) {
          const returnCash = this.state.cashAmount - this.state.grandNetAmount;
          this.setState({ returnCash: returnCash });
        } else {
          this.state.cashAmount = 0;
          this.state.returnCash = 0;
          this.state.grandNetAmount = 0;
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
        console.log(res);
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
    this.setState({ isBillingDisc: true });
  }

  hideDiscount() {
    this.setState({ isBillingDisc: false });
  }

  saveDiscount() {
    // console.log("DIS");
    this.state.netPayableAmount = 0;
    const totalDisc =
      this.state.totalPromoDisc + parseInt(this.state.totalManualDisc);
    if (totalDisc < this.state.grossAmount) {
      const netPayableAmount = this.state.grossAmount - totalDisc;
      this.state.netPayableAmount = netPayableAmount;
      //  this.setState({netPayableAmount: netPayableAmount});
      this.getTaxAmount();
    }
    this.getDiscountReasons();
    this.setState({ showDiscReason: true });

    this.hideDiscount();
  }

  getDiscountReasons() {
    NewSaleService.getDiscountReasons().then((res) => {
      console.log(res);
      if (res.status === 200) {
        //this.setState({discReasons: res.data});
        const discount = res.data.result;
        console.log(discount);
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
    //     this.setState({

    //         errors: {}

    //       });
    //     let errors = {};

    //   let isValid = true;
    //     let input = this.state.input;

    // input[event.target.name] = event.target.value;

    // this.state.errors.phone = " "

    // this.setState({

    //   input

    // });
    // var pattern = new RegExp(/^[0-9\b]+$/);

    // if (!pattern.test(input["phone"])) {

    //   isValid = false;

    //   errors["phone"] = "Please enter only number.";

    // }else if(input["phone"].length != 10){

    //   isValid = false;

    //   errors["phone"] = "Please enter valid phone number.";

    // }
    // this.setState({

    //     errors: errors

    //   });

    //   console.log(this.state.errors.phone);
  }

  getReturnAmount = () => {
    if (this.state.finalList.length > 0) {
      this.setState({ isPayment: false });
    }
    this.state.grandNetAmount =
      this.state.netPayableAmount + this.state.taxAmount;
    this.state.grandReceivedAmount =
      this.state.netPayableAmount + this.state.taxAmount;
    if (this.state.cashAmount > this.state.grandNetAmount) {
      this.state.returnCash = this.state.cashAmount - this.state.grandNetAmount;
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

  savePayment() {
    this.state.discType = this.state.dropValue;
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
    sessionStorage.removeItem("recentSale");
    const obj = {
      approvedBy: "pos-user",
      biller: "honey",
      grossAmount: this.state.deliverySlipData.mrp,
      totalPromoDisc: this.state.deliverySlipData.promoDisc,
      totalManualDisc: 0.0,
      netPayableAmount: this.state.deliverySlipData.netAmount,
      taxAmount: this.state.deliverySlipData.taxAmount,
      customerDetails: this.state.mobileData,
      dlSlip: this.state.dlslips,
      discType: this.state.discType,
      discApprovedBy: this.state.discApprovedBy,
      invoiceNumber: 100153,
      natureOfSale: "InStore",
      offlineNumber: 6789012345,
      paymentAmountType: [
        {
          id: 1,
          paymentAmount: 500,
          paymentType: "Cash",
        },
        {
          id: 1,
          paymentAmount: 500,
          paymentType: "Card",
        },
      ],
      reason: "wish",
      roundOff: 0,
      taxAmount: 20,
    };

    NewSaleService.saveSale(obj).then((res) => {
      console.log(res)
      if (res.data.status === 200 && res.data.result === null) {
        this.setState({ isBillingDetails: false, dsNumber: "", finalList: [] });
        this.setState({
          customerName: " ",
          gender: " ",
          dob: " ",
          customerGST: " ",
          address: " ",
          manualDisc: "",
          customerEmail: "",
        });
        this.setState({ showDiscReason: false, isPayment: true });
        sessionStorage.setItem("recentSale", res.data.body);
        toast.success(res.data.body);
      } else {
        toast.error(res.data.body);
      }
    });
  }

  tagCustomer() {
    this.state.mobileData = {
      address: this.state.address,
      altMobileNo: "",
      dob: this.state.dob,
      gender: this.state.gender,
      gstNumber: this.state.gstNumber,
      mobileNumber: this.state.mobilenumber,
      name: this.state.customerName,
      email: this.state.customerEmail,
    };

    this.setState({
      isBillingDetails: true,
      customerMobilenumber: this.state.mobilenumber,
    });
    this.state.customerFullName = this.state.customerName;
    // this.state.customerMobilenumber = ;
    this.hideModal();
  }

  renderTableData() {
    return this.state.dlslips.map((items, index) => {
      const { barCode, itemPrice, promoDisc,netValue, grossValue, manualDisc, qty } = items;
      return (
        <tr key={index} className="row m-0 p-0">
          <td className="col-1 geeks">
            {index + 1}
          </td>
          <td className="col-3"><p>#{barCode}</p></td>
          <td className="col-2">{qty}</td>
          <td className="col-2">₹ {itemPrice}</td>
          <td className="col-2">₹ 0</td>
          <td className="col-2">₹ {netValue}</td>
        </tr>
      );
    });
  }

  handleCallback = (childData) => {
    console.log(childData);
  };

  handleDiscountChange = (e) => {
    console.log(e);
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
      <div >
         <div className="table-responsive">
        <table className="table table-borderless mb-1 mt-2">
                  <thead>
                    <tr className="m-0 p-0">
                      <th className="col-1">S.NO</th>
                      <th className="col-3">ITEM</th>
                      <th className="col-2">QTY</th>
                      <th className="col-2">N/Rate</th>
                      <th className="col-2">Discount</th>
                      <th className="col-2">VALUE</th>
                    </tr>
                  </thead>
                  <tbody>

                    {this.renderTableData()}
                    {/* <tr>
                        <td className="col-1 geeks">
                          01
                        </td>
                        <td className="col-3">Antheaa <p>#123456789</p></td>
                        <td className="col-2">01</td>
                        <td className="col-2">₹ 1,499.00</td>
                        <td className="col-2">₹ 499.00</td>
                        <td className="col-2">₹ 1,000.00</td>  
                  </tr>
                  <tr>
                        <td className="col-1 geeks">
                          02
                        </td>
                        <td className="col-3">Antheaa <p>#123456789</p></td>
                        <td className="col-2">01</td>
                        <td className="col-2">₹ 1,499.00</td>
                        <td className="col-2">₹ 499.00</td>
                        <td className="col-2">₹ 1,000.00</td>  
                  </tr> */}

                  </tbody>
                </table>
                </div>
      </div>
    )
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
        {/* <button className='btn btn-primary' onClick={this.openModal}>
              Open Modal
            </button> */}
        {/* <Popup\
          isOpen={this.state.isOpen}
          title={"Customer Details :"}
          data={this.state.mobileData}
          onClose={() => this.setState({ isOpen: false })}
          actions={[
            { title: "Tag Customer", onClick: () => this.setState({ isOpen: false })},
            {
              title: "Cancel",
              onClick: () => this.setState({ isOpen: false }),
            },
          ]}
        /> */}
        {/* <Modal isOpen={this.state.open} size='modal-lg' onRequestHide={this.hideModal}>
     <CustomerData  toggleModal={this.toggleModal} parentCallback = {this.handleCallback}/>
     </Modal> */}

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
                  name="discount"
                  placeholder="₹"
                  className="form-control" />
              </div>
              <div className="col-12 mt-3">
                <label>Discount Approved By</label>
                <select className="form-control">
                  <option>Select</option>
                </select>
              </div>
              <div className="col-12 mt-3">
                <label>Reason</label>
                <select className="form-control">
                  <option>Select Reason</option>
                  <option>Diwali Festival Offer</option>
                </select>
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
        <Modal
          isOpen={this.state.isCard}
          size="lg"
          onRequestHide={this.hideCardModal}
        >
          <ModalHeader>Card Payment</ModalHeader>
          <ModalBody>
            {/* <div className="row">
                            <div className="col-4">
                                <label>Card Last 4 Digts: </label>
                            </div>
                            <div className="col-8">

                                <input type="text" name="cash" className="form-control"
                                    value={this.state.cardDigts}
                                    onChange={(e) => this.setState({ cardDigts: e.target.value })}
                                   
                                />
                            </div>
                        </div> */}
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
        </Modal>
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
              {/* <div className="col-4">
                <label>Customer Name</label>
                <input
                  type="text"
                  name="customer"
                  className="form-control"
                  value={this.state.customerName}
                  onChange={(e) =>
                    this.setState({ customerName: e.target.value })
                  }
                />
              </div>
              <div className="col-4">
                <label>Gender</label>
                <select
                  className="form-control"
                  onChange={(e) => this.setState({ gender: e.target.value })}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Unisex">Unisex</option>
                </select>
              </div>
              <div className="col-4 mt-3">
                <label>Customer Email </label>
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  value={this.state.customerEmail}
                  onChange={(e) =>
                    this.setState({ customerEmail: e.target.value })
                  }
                />
              </div>
              <div className="col-4 mt-3">
                <label>Date of Birth</label>
                <input
                  type="text"
                  name="dob"
                  className="form-control"
                  value={this.state.dob}
                  onChange={(e) => this.setState({ dob: e.target.value })}
                />
              </div>
              <div className="col-4 mt-3">
                <label>Customer GST Number</label>
                <input
                  type="text"
                  name="gst"
                  className="form-control"
                  value={this.state.customerGST}
                  onChange={(e) =>
                    this.setState({ customerGST: e.target.value })
                  }
                />
              </div>
              <div className="col-4 mt-3">
                <label>Address</label>
                <textarea
                  rows="3"
                  name="address"
                  className="form-control"
                  value={this.state.address}
                  onChange={(e) => this.setState({ address: e.target.value })}
                />
              </div>
              
              <div className="col-4 mt-3">
                <div className="d-flex mt-5">
                  <input type="checkbox" className="m-r-3 mt-1" name="check" />
                  <label>Customer not interested to give his/her number </label>
                </div>
              </div> */}
              <div className="col-12">
              <div className="d-flex mt-3 pointer">
              <div className="form-check checkbox-rounded checkbox-living-coral-filled fs-15">
      <input type="checkbox" className="form-check-input filled-in" id="roundedExample2"  />
      <label className="form-check-label" htmlFor="roundedExample2">Confirming me to receive promotional messages.</label>
    </div>
              {/* <Form.Check aria-label="option 1" label="Confirming me to receive promotional messages."/> */}
              {/* <div className="custom-control custom-checkbox V1_checkbox-label">
                    <input className="custom-control-input" type="checkbox" id="check1" />
                    <label className="custom-control-label V1_custom-control-label p-t-0 p-l-2 fs-14"
                      htmlFor="check1">Confirming me to receive promotional messages.</label>
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
          <div className="col-6 pt-2">
            {/* <h5>Create Sales Invoice</h5> */}
          </div>
          <div className="col-6 text-right pb-2">
            {/* <button
              type="button"
              className="btn-bdr active m-r-2"
              onClick={this.toggleModal}
            >
              TAG CUSTOMER <p>CTL+6</p>
            </button> */}

            {/* <button
              type="button"
              className={
                "btn-save-ctl" + (this.state.isPayment ? " btn-disable" : "")
              }
              disabled={this.state.isPayment}
              onClick={this.savePayment}
            >
              SAVE PAYMENT [CTL + 9]
            </button> */}
          </div>
        </div>

        <div className="">
          <div className="row">
            <div className="col-sm-8 col-12">
              <div className="row">
                <div className="col-12 col-sm-4">
                  <div className="form-group">
                 
                    <input type="search" className="form-control frm-pr"
                      value={this.state.dsNumber}
                      onChange={(e) => this.setState({ dsNumber: e.target.value })}
                      onKeyPress={this.getDeliverySlipDetails}
                      placeholder="ENTER BARCODE" />
 <button type="button"className="scan">
                               <img src={scan}/> SCAN  
                </button>
                  </div>
                </div>
                <div className="col-12 col-sm-8 scaling-center">
                  <button className="btn-unic m-r-2 scaling-mb">Find Item</button>
                  <button className="btn-unic m-r-2 scaling-mb">Calculator</button>
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
                  <button
                    type="button"
                    className="btn-unic mt-0 m-r-2 scaling-mb"
                  >
                    Save Payment
                  </button>
                  {/* <button className="btn-unic active">Save Payment</button>  */}
                </div>
                    <div>{this.showOrderDetails()}</div>
                <div className="rect-cardred m-0">
                  <div className="row">
                    <div className="col-2 text-center">
                      <label>Items : <span className="font-bold"> 02</span></label>
                      {/* <h6 className="pt-2">02</h6> */}
                    </div>

                    <div className="col-2">
                      <label>Qty : <span className="font-bold"> 01</span></label>
                      {/* <h6 className="pt-2">{this.state.mrpAmount} ₹</h6> */}
                    </div>
                    <div className="col-2">
                      <label>N/Rate : <span className="font-bold"> ₹ 2,998</span> </label>
                      {/* <h6 className="pt-2">{this.state.promoDisc} ₹</h6> */}
                    </div>
                    <div className="col-3">
                      <label>Discount : <span className="font-bold"> ₹ 998</span> </label>
                      {/* <h6 className="pt-2">{this.state.promoDisc} ₹</h6> */}
                    </div>
                    <div className="col-2">
                      <label>Value : <span className="font-bold"> ₹ 2,000</span> </label>
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
                        <td className="col-3">+91  {this.state.customerMobilenumber}</td>
                        <td className="col-3">
                        <div className="form-check checkbox-rounded checkbox-living-coral-filled fs-15">
      <input type="checkbox" className="form-check-input filled-in" id="roundedExample2"  />
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
            </div>
            <div className="col-sm-4 col-12">
              <div className="rect-grey pb-3">
                <h5 className="m-b-5">Billing summary</h5>
                <div className="row">
                  <div className="col-5">
                    <label>Total Amount</label>
                  </div>
                  <div className="col-7 text-right">
                    <label className="font-bold">₹ 1,500.00</label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-5">
                    <label>CGST</label>
                  </div>
                  <div className="col-7 text-right">
                    <label className="font-bold">₹ 75.00</label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-5">
                    <label>SGST</label>
                  </div>
                  <div className="col-7 text-right">
                    <label className="font-bold">₹ 75.00</label>
                  </div>
                </div>


                <div className="payment">
                  <div className="row">
                    <div className="col-5 p-r-0 pt-1">
                      <label>Payable Amount</label>
                    </div>
                    <div className="col-7 p-l-0 pt-1 text-right">
                      <label className="font-bold">₹ 1,650.00</label>
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
                        <img src={card} />
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
                    <li>
                      <span>
                        <img src={khata} />
                        <label>KHATA</label>
                      </span>

                    </li>

                  </ul>
                </div>
                <div className="mt-3">
                  <button className="btn-login_v1 mt-3 mb-3">PROCEED TO CHECKOUT</button>
                  <button className="btn-unic p-2 w-100">HOLD PAYMENT</button>
                </div>
              </div>
            </div>
         
          </div>
        </div>

  
      </div>
    );
  }
}

