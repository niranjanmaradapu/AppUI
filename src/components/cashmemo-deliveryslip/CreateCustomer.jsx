import React, { Component } from 'react';
import CreateCustomerService from '../../services/CreateCustomerService';
import { ToastContainer, toast } from 'react-toastify';

export default class CreateCustomer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mobileNumber: "",
            altMobileNo: "",
            name: "",
            gender: "Male",
            gstNumber: "",
            dob: "2021-06-21T18:30:00.000Z",
            address: ""

        }

        this.createCustomer = this.createCustomer.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('state values', this.state);
        this.createCustomer();
    }
    

    createCustomer() {
        // this.setState({dob: "2021-06-21T18:30:00.000Z"})
        const obj = {
            ...this.state
        }

        CreateCustomerService.createCustomer(obj).then((res) => {
            console.log(res);
            if (res.data.statusCode === "OK") {
                toast.success(res.data.body);
                this.setState({
                    mobileNumber: "",
                    altMobileNo: "",
                    name: "",
                    gender: "Male",
                    gstNumber: "",
                    dob: "",
                    anniversary: "",
                    address: ""
                })
                this.setState({})
            } else {
                toast.error(res.data.body);
            }

        });
    }


    validation(e){
      
      const regex = /^[0-9\b]+$/;
      const value = e.target.value;
      if (value === '' || regex.test(value))
      this.setState({
        [e.target.id]: e.target.value
        });

       

      }


    render() {
        return (
            <div className="maincontent">
                <div className="row">
                    <div className="col-6">
                        <h5>Create Customer</h5>
                    </div>

                </div>

                <div className="rect">
                    <div className="row">
                        <div className="col-3">
                            <div className="form-group">
                                <label>Mobile Number</label>
                                <input type="text" name="mobile"  id="mobileNumber" className="form-control" placeholder="Enter Mobile Number"
                                    value={this.state.mobileNumber}
                                    maxLength={10}
                                 onChange={(e) => this.validation(e)} />
                                    
                                {/* <button className="btn-nobg"><img src={barcode} /></button> */}
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                <label>Alternate Mobile Number</label>
                                <input type="text" id="altMobileNo"className="form-control" placeholder="Alternate Number"
                                    value={this.state.altMobileNo}
                                    maxLength={10}
                                    onChange={(e) => this.validation(e)} />
                                {/* <button className="btn-nobg"><img src={barcode} /></button> */}
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                <label>Customer Name</label>
                                <input type="text" className="form-control" placeholder="Enter Name"
                                    value={this.state.name}
                                    onChange={(e) => this.setState({ name: e.target.value })} />
                            </div>
                        </div>

                        <div className="col-3">
                            <div className="form-group">
                                <label>Gender</label>
                                <select className="form-control" onChange={(e) => this.setState({ gender: e.target.value })}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Unisex">Unisex</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-3 pt-2">
                            <div className="form-group">
                                <label>GST Number</label>
                                <input type="text" className="form-control" placeholder="Enter GST Number"
                                    value={this.state.gstNumber}
                                    onChange={(e) => this.setState({ gstNumber: e.target.value })} />
                            </div>
                        </div>
                        <div className="col-3 pt-2">
                            <div className="form-group">
                                <label>DOB</label>
                                <input type="date" id="dob"className="form-control" placeholder="DOB"
                                //    value={this.state.dob}
                                //    onChange={(e) => this.setState({ dob: e.target.value })}
                                    maxLength={10}
                                    />
                            </div>
                        </div>
                        <div className="col-3 pt-2">
                            <div className="form-group">
                                <label>Anniversary</label>
                                <input type="date"  id="ani" className="form-control" placeholder="Anniversary"
                                    value={this.state.anniversary}
                                   
                                    onChange={(e) => this.setState({ anniversary: e.target.value })} />
                            </div>
                        </div>

                        <div className="col-3 pt-4 mt-2">
                            <div className="form-group">
                                <button className="btn-bdr w-100" onClick={this.handleSubmit} >CREATE </button>
                            </div>
                        </div>

                    </div>
                </div>
                {/* <div className="row">
                    <div className="col-6">
                        <h5 className="mt-4">Customer Details</h5>
                    </div>
                </div> */}
                {/* <div className="row">
                    <div className="col-12">
                        <div className="rect p-0 pb-3">
                            <div className="d-flex">
                            </div>
                            <div className="p-2">
                                <table className="table table-borderless">
                                    <thead>
                                        <tr className="row m-0 p-0">
                                            <th className="col-1">S.No</th>
                                            <th className="col-2">Name</th>
                                            <th className="col-3">Mobile</th>
                                            <th className="col-2">Alternate Mobile</th>
                                            <th className="col-2">GST Number</th>
                                            <th className="col-2">Created Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="row m-0 p-0">
                                            <td className="col-1">01</td>
                                            <td className="col-2">Ashok M</td>
                                            <td className="col-3">+91 964 2949 201</td>
                                            <td className="col-2">+91 964 2949 201</td>
                                            <td className="col-2">COA268106</td>
                                            <td className="col-2">02-08-2021</td>
                                        </tr>
                                        <tr className="row m-0 p-0">
                                            <td className="col-1">02</td>
                                            <td className="col-2">John Dev</td>
                                            <td className="col-3">+91 964 2949 201</td>
                                            <td className="col-2">+91 964 2949 201</td>
                                            <td className="col-2">COA268106</td>
                                            <td className="col-2">02-09-2021</td>
                                        </tr>
                                        <tr className="row m-0 p-0">
                                            <td className="col-1">03</td>
                                            <td className="col-2">Kevin Suda</td>
                                            <td className="col-3">+91 964 2949 201</td>
                                            <td className="col-2">+91 964 2949 201</td>
                                            <td className="col-2">COA268808</td>
                                            <td className="col-2">03-09-2021</td>
                                        </tr>

                                    </tbody>
                                </table>


                            </div>
                        </div>

                    </div>
                </div> */}

            </div>
        )
    }
}
