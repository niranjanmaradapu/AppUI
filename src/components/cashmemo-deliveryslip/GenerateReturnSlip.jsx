import React, { Component } from 'react';
import barcode from "../../assets/images/barcode.svg";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import LoginService from '../../services/LoginService';
import Select from 'react-select';
import GenerateReturnSlipService from '../../services/GenerateReturnSlipService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { thisExpression } from '@babel/types';

export default class GenerateReturnSlip extends Component {
    constructor(props) {
        super(props)
        console.log(props);
        this.state = {
            openn: false,
            isSubOpen: false,
            billNo: '',
            barCode: '',
            mobileNo: '',
            storeNames: [],
            reason: "",
            returnReasons: [
                { "id": 1, "label": "Change of Colour", "value": "" },
                { "id": 2, "label": "Size Exchange", "value": "" },
                { "id": 3, "label": "Damaged Item", "value": "" },
                { "id": 4, "label": "PKT Goods Return", "value": "" }]
            ,
            dropValue: '',
            fromDate: '',
            toDate: '',
            invoicesList: [],
            barcodesList: [],
            finalBarcodesList: [],
            barcodesSelected: [],
            phoneNumber: '',
            storeVo: null,
            customerGST: '',
            dob: '',
            customerFinalName: '',
            customerName: '',
            gender: '',
            customerEmail: '',
            dob: '',
            address: '',
            isUserTagged: false,
            setIndex: null,
            errors: {},
            mobilenumber: '',
            mobileData: {
                address: "",
                altMobileNo: "",
                dob: "",
                gender: "",
                gstNumber: "",
                mobileNumber: "",
                name: "",
                email: "",
                dropValue: '',
            },
        }
        this.baseState = this.state;
        this.getReturnSlip = this.getReturnSlip.bind(this);
        this.invoicesListTable = this.invoicesListTable.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeReason = this.handleChangeReason.bind(this);
        this.handleChangeMobile = this.handleChangeMobile.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.tagCustomer = this.tagCustomer.bind(this);
        this.generateReturns = this.generateReturns.bind(this);
        this.validation = this.validation.bind(this);
        this.cancelReturns = this.cancelReturns.bind(this);

    }

    componentWillMount() {
        LoginService.getStores().then((res) => {
            res.data.forEach((ele, index) => {
                const obj = {
                    id: ele.id,
                    value: ele.value,
                    label: ele.storeName

                }
                this.state.storeNames.push(obj)
            });
        });
        this.setState({ returnReasons: this.state.returnReasons })
        this.toggleModal()
    }


    handleChange = (e) => {
        this.setState({ storeVo: e.id });
    }

    handleChangeReason = (e) => {
        this.setState({ reason: e.label });
    }

    renderInvoicesTableData() {
        return this.state.invoicesList.map((items, index) => {
            const { invoiceNumber, netPayableAmount } = items
            return (
                <tr key={index} >
                    <td>{invoiceNumber}</td>
                    <td>{netPayableAmount}</td>
                </tr>
            )
        });
    }

    getReturnSlip() {
        if (this.state.mobileNo && (!this.state.billNo && (!this.state.fromDate && !this.state.toDate))) {
            toast.info("Please select Dates to Search");
        } else {
            if(this.state.mobileNo ||this.state.barCode || this.state.billNo || this.state.fromDate || this.state.toDate){
                const obj = {
                    "invoiceNo": this.state.billNo,
                    "barCode": this.state.barCode,
                    "mobileNo": this.state.mobileNo,
                    "fromDate": this.state.fromDate,
                    "toDate": this.state.toDate
                }
                GenerateReturnSlipService.getReturnSlipsByFilter(obj).then((res) => {
                    if (res.data.httpStatus === "OK") {
                        this.setState({ invoicesList: res.data.result.newSaleVo })
                        if (res.data.result && res.data.result.newSaleVo.length === 0) {
                            toast.error("No Records Found");
                        }
                    } else {
                        toast.error("Something Went Wrong");
                    }
                });
            }else{
                toast.info("Please enter the required fields to Search"); 
            }
           
        }
    }

    invoicesListTable() {
        return this.state.invoicesList.map((items, index) => {
            const { invoiceNumber, netPayableAmount } = items
            return (
                <tr className="row m-0 p-0 " key={index}>
                    <td className="col-1 pointer">
                        <div className="radio-buttons">

                            <input
                                id="windows"
                                value="windows"
                                name="platform"
                                type="radio"
                                onClick={(e) => this.setSelectedRowId(items)}
                            /></div>
                    </td>
                    <td className="col-6">{invoiceNumber}</td>
                    <td className="col-5 text-right font-bold">₹ {netPayableAmount}</td>
                </tr>
            )
        });
    }


    setSelectedRowId = (invoice) => {
        this.setState({ barcodesList: [] });
        this.setState({ finalBarcodesList: [] });
        const barcodes = [];
        this.setState({ selectedInvoiceNo: null });
        if(invoice && invoice.dlSlip  && invoice.dlSlip.length>0){
            
            invoice.dlSlip.forEach((dlslip, index) => {
                if(dlslip.barcode && dlslip.barcode.length>0){
                    this.state.barcodesList.push(dlslip.barcode);
                }
            });
        }
        if(this.state.barcodesList && this.state.barcodesList.length> 0){
            this.state.barcodesList.forEach((data, i) => {
                if (data.length > 1) {
                    data.forEach((item, id) => {
                        // this.state.finalBarcodesList.push(item)
                        item.isChecked = false;
                        barcodes.push(item)
                    })
                } else {
                    //this.state.finalBarcodesList.push(data[0])
                    data[0].isChecked = false;
                    barcodes.push(data[0])
                }
            });
            this.setState({ selectedInvoiceNo: invoice.invoiceNumber });
            this.setState({ finalBarcodesList: barcodes })
        }else{
            toast.info("No Barcodes found for invoice !")
        }
   
    }


    barcodeTableData() {
        return this.state.finalBarcodesList.map((items, index) => {
            const { barcode, netAmount, qty, isChecked } = items
            return (
                <tr className="row m-0 p-0" key={index}>
                    <td className="col-1">
                        <div className="col-3">
                            <div className="custom-control custom-checkbox V1_checkbox-label">
                                <input className="custom-control-input" type="checkbox" id="remember{{index}}"
                                    name="barcodes{{index}}" checked={isChecked}
                                    onChange={(e) => this.setBarcodeDetails(e, index, barcode)}
                                />

                            </div>
                        </div>
                    </td>
                    <td className="col-1">{index + 1}</td>
                    <td className="col-3">{barcode}</td>
                    <td className="col-3">₹ {netAmount}</td>
                    <td className="col-2">{qty}</td>
                    <td className="col-2 pt-0 form_ctl">
                        <input className="form-control" type="number" id="returnQuantitys" disabled
                            name="returnQuantity" value={qty}
                        />
                    </td>
                </tr>
            )
        });
    }

    setBarcodeDetails(e, value, barcode) {
        if (e.target.checked) {
            this.state.finalBarcodesList[value].isChecked = e.target.checked;
            let obj = {
                "barCode": barcode
            }
            this.state.barcodesSelected.push(obj)
        } else {
            this.state.finalBarcodesList[value].isChecked = e.target.checked;
            let index = this.state.barcodesSelected.findIndex(ele => ele.barCode === barcode);
            this.state.barcodesSelected.splice(index, 1);
        }
        this.setState({ barcodesSelected: this.state.barcodesSelected })
        this.setState({ finalBarcodesList: this.state.finalBarcodesList });
    }


    barcodeTableheaderData() {
        return (
            <table className="table table-borderless">
                <thead>
                    <tr className="row m-0 p-0">
                        <th className="col-1"> </th>
                        <th className="col-1">S.No</th>
                        <th className="col-3">Barcode</th>
                        <th className="col-3">Amount</th>
                        <th className="col-2">Qty</th>
                        <th className="col-2">RTN Qty</th>
                    </tr>
                </thead>
                <tbody>
                    {this.barcodeTableData()}
                </tbody>
            </table>
        );
    }


    returnSlipsDiv() {
        return this.state.invoicesList.length > 0 && (
            <div >
                <div className="row">
                    <div className="col-6">
                        <h5 className="mt-4">Return Slip Details</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <div className="rect p-0 pb-3">
                            {/* <hr className="mt-3 mb-2" /> */}
                            <div className="p-2">

                                <table className="table table-borderless">
                                    <thead>
                                        <tr className="row m-0 p-0">
                                            <th className="col-1"></th>
                                            <th className="col-6">Invoice</th>
                                            <th className="col-5 text-right">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.invoicesListTable()}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>


                    <div className="col-9">
                        <div className="rect p-0 pb-3">
                            <div className="d-flex">
                            </div>
                            <div className="p-2">
                                {this.barcodeTableheaderData()}
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-2">
                                <label className="custom-control-label V1_custom-control-label p-t-3 fs-14 p-2-3"
                                    htmlFor="remember"  >Return Reason *</label>
                            </div>
                            <div className="col-4 pt-2">
                                <div className="form-group">
                                    <Select className="upper-case" placeholder=""
                                        value={this.state.selectedReason} // set selected value
                                        options={this.state.returnReasons} // set list of the data
                                        onChange={this.handleChangeReason} // assign onChange function
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-6"></div>
                            <div className="col-6 text-right mt-3">
                                <button type="button" className="btn-bdr m-r-2" onClick={this.cancelReturns}>Cancel Returns </button>
                                <button type="button" className="btn-bdr active" onClick={this.generateReturns}>Generate Returns </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }




    toggleModal = () => {
        this.state.gender = "Male";
        this.setState({
            openn: true
        });
    }

    hideModal = () => {
        this.state.mobilenumber = "";
        this.state.customerName = "";
        this.state.customerEmail = "";
        this.state.dob = "";
        this.state.customerGST = "";
        this.state.address = "";
        this.setState({
            openn: false
        });
    }

    getMobileDetails = (e) => {
        if (e.key === 'Enter') {
            GenerateReturnSlipService.getMobileData(this.state.phoneNumber).then((res) => {
                if (res.data.httpStatus === "OK") {
                    toast.success("Mobile Details Fetched Successfully");
                    this.state.mobileData = res.data.body;
                    this.setState({
                        isUserTagged: true,
                        customerName: res.data.result.name, gender: res.data.result.gender,
                        dob: res.data.result.dob,
                        customerGST: res.data.result.gstNumber, address: res.data.result.address
                    });
                } else {
                    this.setState({
                        isUserTagged: false
                    });
                    // toast.error(res.data.message);
                }

            });
        }
    }



    tagCustomer() {
        this.state.mobileData = {
            address: this.state.address,
            altMobileNo: this.state.altMobileNo ? this.state.altMobileNo : null,
            dob: this.state.dob,
            gender: this.state.gender,
            gstNumber: this.state.gstNumber,
            mobileNumber: this.state.phoneNumber,
            name: this.state.customerName
        }
        GenerateReturnSlipService.saveCustomer(this.state.mobileData).then((res) => {
            if (res.data.statusCode === "OK") {
                toast.success(res.data.body);
                this.setState({
                    isUserTagged: true,
                    customerFinalName: this.state.customerName,
                    mobileNo: this.state.phoneNumber,
                    gender: this.state.gender,
                    dob: this.state.dob,
                    customerGST: this.state.gstNumber,
                    address: this.state.address
                });
                this.hideModal();
            } else if (res.data.body === "Mobile number is already in my records") {
                this.setState({
                    isUserTagged: true,
                    customerFinalName: this.state.customerName,
                    mobileNo: this.state.phoneNumber
                });
                // toast.error(res.data.body);
                this.hideModal();
            } else {
                this.setState({
                    isUserTagged: false
                });
                toast.error(res.data.body);
            }
        });
    }


    generateReturns() {
        const obj = {
            "barcodes": this.state.barcodesSelected,
            "rtNumber": "",
            "crNumber": "",
            "invoiceNo": this.state.selectedInvoiceNo,
            "reason": this.state.reason,
            "createdBy": "5123",
            "iSReviewed": false,
            "reviewedBy": "",
            "isUserTagged": this.state.isUserTagged,
            "mobileNumber": this.state.mobileNo
        }
        if (this.state.isUserTagged && this.state.reason && (obj && obj.barcodes.length > 0)) {
            GenerateReturnSlipService.generateReturnSlip(obj).then((res) => {
                if (res.data.httpStatus === "CREATED") {
                    toast.success(res.data.message);
                    this.cancelReturns();
                } else {
                    toast.error(res.data.body);
                }
            });
        } else {
            if (!this.state.isUserTagged) {
                toast.info("Tag Customer is Mandatory to Generate Returns !")
            } else if (obj && obj.barcodes.length === 0) {
                toast.info("Select atleast one Barcode to proceed !")
            } else {
                toast.info("Return Reason is Mandatory !")
            }
        }
    }

    handleChangeMobile(event) {
        this.setState({ phoneNumber: event.target.value });
        this.setState({ mobilenumber: event.target.value });
    }

    handleChangeName(event) {
        this.setState({ customerName: event.target.value });
        this.setState({ customerFinalName: event.target.value });
    }

    

    validation(event) {
        console.log(event)
        const regex = /^[0-9\b]+$/;
        const value = event.target.value;
        if (value === '' || regex.test(value))
            this.setState({
                [event.target.id]: event.target.value
            });
    }

    cancelReturns() {
        this.hideModal();
        this.setState(this.baseState)
    }

    render() {
        return (
            <div className="maincontent">
                <Modal isOpen={this.state.openn} size='lg'>
                    <ModalHeader>
                        {/* <ModalClose onClick={this.hideModal}/> */}
                        {/* <ModalTitle>Modal title</ModalTitle> */}
                        <div>
                            <h5>Customer Details</h5>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div className="row">
                            <div className="col-4">
                                <label>Phone Number</label>
                                <input type="text" name="mobilenumber" className="form-control"
                                    value={this.state.mobilenumber}
                                    onChange={this.handleChangeMobile} minLength="10" maxLength="10"
                                    onKeyPress={this.getMobileDetails} autoComplete="off" />
                                <div className="text-danger">{this.state.errors.phone}</div>
                            </div>
                            <div className="col-4">
                                <label>Customer Name</label>
                                <input type="text" name="customer" className="form-control"
                                    value={this.state.customerName}
                                    onChange={this.handleChangeName}
                                />
                            </div>
                            <div className="col-4">
                                <label>Gender</label>
                                <select className="form-control" onChange={(e) => this.setState({ gender: e.target.value })}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Unisex">Unisex</option>
                                </select>
                            </div>
                            <div className="col-4 mt-3">
                                <label>Customer Email </label>
                                <input type="text" name="email" className="form-control"
                                    value={this.state.customerEmail}
                                    onChange={(e) => this.setState({ customerEmail: e.target.value })}
                                />
                            </div>
                            <div className="col-4 mt-3">
                                <label>Date of Birth</label>
                                <input type="text" name="dob" className="form-control"
                                    value={this.state.dob}
                                    onChange={(e) => this.setState({ dob: e.target.value })}
                                />
                            </div>
                            <div className="col-4 mt-3">
                                <label>Customer GST Number</label>
                                <input type="text" name="gst" className="form-control"
                                    value={this.state.customerGST}
                                    onChange={(e) => this.setState({ customerGST: e.target.value })}
                                />
                            </div>
                            <div className="col-4 mt-3">
                                <label>Address</label>
                                <textarea rows="3" name="address" className="form-control"
                                    value={this.state.address}
                                    onChange={(e) => this.setState({ address: e.target.value })}
                                />
                            </div>
                            <div className="col-4 mt-3">
                                <div className="d-flex mt-5">
                                    <input type="checkbox" className="m-r-3 mt-1" name="check" />
                                    <label>Customer not interested to give his/her number </label>
                                </div>
                            </div>
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <button className='pt-2 btn-bdr' onClick={this.hideModal}>
                            CANCEL
                        </button>
                        <button className='btn btn-bdr active fs-12' onClick={this.tagCustomer}>
                            TAG CUSTOMER [Ctl+8]
                        </button>
                    </ModalFooter>
                </Modal>


                <div className="row">
                    <div className="col-2 pt-2">
                        <h5 className="m-b-0">Generate Items</h5>
                    </div>
                    <div className="col-5">
                        <div className="return">
                            <div className="return-profileimg">
                                <i className="icon-tag_customer"></i>
                            </div>
                            <div className="return-profiletxt">
                                <span>{this.state.customerFinalName}</span>
                                <p className="fs-10 m-b-0">{this.state.mobileNo}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-5 text-right">
                        <button type="button" className="btn-bdr active" onClick={this.toggleModal}>TAG CUSTOMER <p className="m-b-0">CTL+6</p></button>
                    </div>
                </div>

                <div className="rect">
                    <div className="row">
                        <div className="col-3">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Enter Bill Number" value={this.state.billNo}
                                    onChange={(e) => this.setState({ billNo: e.target.value })} />
                                {/* <button className="btn-nobg"><img src={barcode} /></button> */}
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Enter Barcode" autoFocus value={this.state.barCode}
                                    onChange={(e) => this.setState({ barCode: e.target.value })} />
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Mobile Number" name="mobileNo" value={this.state.mobileNo}
                                    minLength="10" maxLength="10" onChange={(e) => this.setState({ mobileNo: e.target.value })} />
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                <input type="date" className="form-control" placeholder="From Date" value={this.state.fromDate}
                                    onChange={(e) => this.setState({ fromDate: e.target.value })} />
                            </div>
                        </div>
                        <div className="col-3 pt-2">
                            <div className="form-group">
                                <input type="date" className="form-control" placeholder="To Date" value={this.state.toDate}
                                    onChange={(e) => this.setState({ toDate: e.target.value })} />
                            </div>
                        </div>
                        <div className="col-3 pt-2">
                            <div className="form-group sele">
                                <Select className="upper-case" placeholder="Select Store"
                                    value={this.state.selectedOption} // set selected value
                                    options={this.state.storeNames} // set list of the data
                                    onChange={this.handleChange} // assign onChange function
                                />
                            </div>
                        </div>
                        <div className="col-3 pt-2">
                            <div className="form-group">
                                {/* <input type="number" className="form-control" placeholder="Check Promo Discount [Ctrl + 3]"/> */}
                                <button className="btn-bdr w-100" onClick={this.getReturnSlip} >SEARCH </button>
                            </div>
                        </div>
                    </div>
                </div>

                {this.returnSlipsDiv()}
                {/* REE */}

                {/* 
                <div className="row">
                    <div className="col-6">
                        <h5 className="mt-4">Return Slip Details</h5>
                    </div>

                </div>
                <div className="row">
                    <div className="col-3">
                        <div className="rect p-0 pb-3">
                            <div className="p-2">

                                <table className="table table-borderless">
                                    <thead>
                                        <tr className="row m-0 p-0">
                                            <th className="col-2"></th>
                                            <th className="col-5">Invoice</th>
                                            <th className="col-5 text-right">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.invoicesListTable()}
                                    </tbody>

                                </table>
                            </div>

                        </div>
                    </div>


                    <div className="col-9">
                        <div className="rect p-0 pb-3">
                            <div className="d-flex">
                            </div>
                            <div className="p-2">

                                {this.barcodeTableheaderData()}
                            </div>
                        </div>

                    <div className="rect mt-2">
                        <div className="row">
                        <h6 className="fs-12 text-red mt-2">TAG CUSTOMER IS MANDATORY TO GENERATE RETURNS</h6>
                            <div className="col-2">
                                <label className="custom-control-label V1_custom-control-label p-t-3 fs-14 p-2-3"
                                    htmlFor="remember"  >Return Reason *</label>
                            </div>
                            <div className="col-4 pt-2">
                                <div className="form-group sele">
                                    <Select className="upper-case" placeholder=""
                                        value={this.state.selectedReason} // set selected value
                                        options={this.state.returnReasons} // set list of the data
                                        onChange={this.handleChangeReason} // assign onChange function
                                    />
                                </div>
                            </div>
                            <div className="col-6 text-right mt-2">
                                <button type="button" className="btn-bdr m-r-2"  onClick={this.cancelReturns}>Cancel Returns </button>
                                <button type="button" className="btn-bdr active" onClick={this.generateReturns}>Generate Returns </button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

 */}

                <ToastContainer />
            </div>
        )
    }
}
