import React, { Component } from 'react';
import edit from '../../assets/images/edit.svg';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import URMService from '../../services/URM/URMService';


export default class Stores extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            showStore: false,
            stateName: "",
            district: "",
            city: "",
            area: "",
            mobileNumber: "",
            address: "",
            storeManager: "",
            phoneNumber: "",
            storeName: "",
            domain: "",
            storesList: [],
            isStore: false,
            domainList: [],
            stateList: [],
            districtList: [],
            stateId: null,
            userName: "",
            isEdit: false,
            selectedStore: {},
            errors: {
                "city": ""
            },
            fields: {},
            focus: false,
            isSearch: false,
            gstNumber: "",
            isGstNumber: false
        }

        this.showStores = this.showStores.bind(this);
        this.hideStores = this.hideStores.bind(this);
        this.saveStores = this.saveStores.bind(this);
        this.getDistricts = this.getDistricts.bind(this);
        this.getStates = this.getStates.bind(this);
        this.validation = this.validation.bind(this);
        this.searchStore = this.searchStore.bind(this);
        this.getAllStores = this.getAllStores.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
    }

    showStores() {
        this.setState({
            showModal: true,
            district: "",
            city: "",
            area: "",
            mobileNumber: "",
            address: "",
            storeManager: "",
            phoneNumber: "",
            storeName: "",
            domain: this.state.domainList[0]?.clientDomainaId,
            errors: {},
            isEdit: false,
            isSearch: false,
            isGstNumber: false,
            gstNumber:""

        });
        this.getDomainsList();
    }

    hideStores() {
        this.getDomainsList();
        this.setState({ showModal: false });
    }

    getDomainsList() {
        URMService.getDomainsList(this.state.clientId).then((res) => {
            if (res) {
                this.setState({ domainList: res.data.result, domain: res.data.result[0].clientDomainaId });
            }

        });
    }

    componentWillMount() {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (user) {
            this.setState({ clientId: user["custom:clientId1"], userName: user["cognito:username"] }, () => { this.getAllStores(); })
            this.getStates();
        }

    }

    validation(e) {

        const regex = /^[0-9\b]+$/;
        const value = e.target.value;
        if (value === '' || regex.test(value)) {
            this.setState({
                [e.target.id]: e.target.value, phoneNumber: e.target.value,

            });
        } else {
            // toast.error("pls enter numbers")
        }


    }

    getStates() {
        URMService.getStates().then(res => {
            if (res && res.data.result.length > 0) {
                this.setState({ stateList: res.data.result, stateName: res.data.result[0].stateCode }, ()=>{
                  
                    const obj = {
                        stateCode: "Select",
                        stateName: "Select"

                    }
                    this.state.stateList.splice(0,0,obj);

                });
            }


        });
    }

    getDistricts() {

        const stateCode = this.state.isSearch ? this.state.searchState : this.state.stateName;
        console.log(stateCode);
        URMService.getDistricts(stateCode).then(res => {
            if (res) {
                this.setState({ districtList: res.data.result, district: this.state.isEdit ? this.state.district : res.data.result[0].districtId }, () => {
                    const obj = {
                        districtId: "Select",
                        districtName: "Select"

                    }
                    this.state.districtList.splice(0,0,obj);
                });
            }

        });


        this.state.stateList.forEach(ele => {
            if (ele.stateCode === this.state.stateName) {
                this.setState({ stateId: ele.stateId });
            }
        });

        this.getGSTNumber();
    }

    getGSTNumber() {
    
        const stateCode = this.state.isSearch ? this.state.searchState : this.state.stateName;
        URMService.getGSTDetails(stateCode, this.state.clientId).then(res => {
            console.log(res)
            if (res) {
                this.setState({gstNumber: res.data.result.gstNumber},()=>{
                    if(this.state.gstNumber) {
                        this.setState({isGstNumber: true});
                    } else {
                        this.setState({isGstNumber: false});
                    }
                })
            }

        });

    }

    getAllStores() {
        if(this.state.isSearch){
            this.state.searchState = "";
            this.state.searchCity = "";
            this.state.searchDistrict = "";
            this.state.districtList = [];
        }
        URMService.getAllStores(this.state.clientId).then(res => {
            if (res) {
                this.setState({ storesList: res.data.result, isStore: true });
            }


        });
        this.getDomainsList();
    }



    searchStore() {

        this.setState({isSearch: true});
        const searchStore = {
            "stateId": this.state.searchState,
            "cityId": this.state.searchCity,
            "districtId": this.state.searchDistrict,
            "storeName": null
        }

        URMService.getStoresBySearch(searchStore).then(res => {
            if (res) {
                this.setState({ storesList: res.data.result, isStore: true });
            } else {
            }

        });
    }


    saveStores() {

        const formValid = this.handleValidation();
        console.log(formValid);
        if (formValid) {
            let saveObj;
            if (this.state.isEdit) {
                saveObj = {
                    "id": this.state.selectedStore.id,
                    "name": this.state.storeName,
                    "stateId": parseInt(this.state.stateId),
                    "districtId": parseInt(this.state.district),
                    "cityId": this.state.city,
                    "area": this.state.area,
                    "address": this.state.address,
                    "phoneNumber": this.state.phoneNumber,
                    "domainId": this.state.domain,
                    "createdBy": this.state.userName,
                    "createdDate": "",
                    "stateCode": this.state.stateName,
                    "gstNumber": this.state.gstNumber,
                    "clientId":this.state.clientId

                }

                URMService.editStore(saveObj).then(res => {
                    if (res) {
                        toast.success("Store Saved Successfully");
                        this.getAllStores();
                    }

                });
            } else {
                saveObj = {
                    "name": this.state.storeName,
                    "stateId": parseInt(this.state.stateId),
                    "districtId": parseInt(this.state.district),
                    "cityId": this.state.city,
                    "area": this.state.area,
                    "address": this.state.address,
                    "phoneNumber": this.state.phoneNumber,
                    "domainId": this.state.domain,
                    "createdBy": this.state.userName,
                    "stateCode": this.state.stateName,
                    "gstNumber": this.state.gstNumber,
                    "clientId":this.state.clientId
                }
                URMService.saveStore(saveObj).then(res => {
                    if (res) {
                        toast.success("Store Saved Successfully");
                        this.getAllStores();
                    }

                });
            }
            this.hideStores();
        } else {
            toast.info("Please Enter all mandatory fields");
        }





        // this.state.storesList.push(obj);
        // this.setState({ isStore: true });
        // sessionStorage.setItem("storeList", JSON.stringify(this.state.storesList));
        // toast.success("Stores Created Successfully");

    }

    editStore(items) {
        console.log(items);

        this.setState({
            showModal: true, stateName: items.stateCode, district: items.districtId.toString(), city: items.cityId,
            area: items.area, phoneNumber: items.phoneNumber,
            address: items.address,
            domain: items.clientDomianlId.clientDomainaId, storeName: items.name,
            isEdit: true,
            selectedStore: items,
            isSearch: false
        }, () => {
            this.getDistricts();
        });
    }

    getTableData() {
        return this.state.storesList.map((items, index) => {
            // const { storeManager, createdDate,clientDomianlId["domaiName"], createdBy, cityId, name, domain } = items;
            return (

                <tr className="" key={index}>
                    <td className="col-1">{index + 1}</td>
                    <td className="col-2">{items.name}</td>
                    <td className="col-2">{items.cityId}</td>
                    <td className="col-2">{items.clientDomianlId?.domaiName}</td>
                    <td className="col-2">{items.createdBy}</td>
                    <td className="col-2">{items.createdDate}</td>
                    <td className="col-1">
                        <img src={edit} className="w-12 m-r-2 pb-2" onClick={(e) => this.editStore(items)} />
                        <i className="icon-delete"></i></td>
                </tr>

            );
        });
    }

    getStoreTable() {
        return this.state.isStore && (
            <div>
                <div className="col-12 mt-3 scaling-center scaling-mb">
                    <h5>Stores List</h5>
                </div>
                <div className="table-responsive p-0">
                    <table className="table table-borderless mb-0">
                        <thead>
                            <tr className="">
                                <th className="col-1">Store ID </th>
                                <th className="col-2">Store Name</th>
                                <th className="col-2">Location</th>
                                <th className="col-2">Domain</th>
                                <th className="col-2">Created By</th>
                                <th className="col-2">Created Date</th>
                                <th className="col-1"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.getTableData()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }


    handleValidation() {
        let errors = {};
        let formIsValid = true;

        //Name
        // if (!this.state.city) {
        //     formIsValid = false;
        //     errors["city"] = "Enter City";
        // }



        // Area 
        // if (!this.state.area) {
        //     formIsValid = false;
        //     errors["area"] = "Enter area";
        // }



        // Mobile
        // if (!this.state.phoneNumber) {
        //     formIsValid = false;
        //     errors["phoneNumber"] = "Enter phoneNumber";
        // }

        // if (typeof this.state.phoneNumber !== "undefined") {
        //     if (!this.state.phoneNumber.match(/^[0-9\b]+$/)) {
        //         formIsValid = false;
        //         errors["phoneNumber"] = "Please Enter Valid Mobile Number";
        //     }
        // }

        //Domain 
        if (!this.state.domain) {
            formIsValid = false;
            errors["domain"] = "Enter Domain";
        }



        // Store Name

        if (!this.state.storeName) {
            formIsValid = false;
            errors["storeName"] = "Enter Store Name";
        }



        // State Name

        if (!this.state.stateName) {
            formIsValid = false;
            errors["stateName"] = "Enter state Name";
        }



        // District Name

        if (!this.state.district) {
            formIsValid = false;
            errors["districtName"] = "Enter District Name";
        }

        // gstNumber 
        if (!this.state.gstNumber) {
            formIsValid = false;
            errors["gstNumber"] = "Enter gstNumber ";
        }




        this.setState({ errors: errors });
        return formIsValid;

    }



    render() {
        let city;
        let modulesList;
        if (this.state.domainList && this.state.domainList.length > 0) {
            const modules = this.state.domainList;

            modulesList = modules.length > 0
                && modules.map((item, i) => {
                    return (

                        <option key={i} value={item.clientDomainaId}>{item.domaiName}</option>
                    )
                }, this);
        }


        const states = this.state.stateList;

        let statesList = states.length > 0
            && states.map((item, i) => {
                return (
                   
                    <option key={i} value={item.stateCode}>{item.stateName}</option>
                )
            }, this);

        const districts = this.state.districtList;

        let districtList = districts.length > 0
            && districts.map((district, i) => {
                return (
                    <option key={i} value={district.districtId}>{district.districtName}</option>
                )
            }, this);



        return (
            <div className="maincontent">


                <Modal isOpen={this.state.showModal} size="lg">
                    <ModalHeader>
                        {
                            !this.state.isEdit && (
                                <div>
                                    Add Store
                                </div>

                            )
                        }
                        {
                            this.state.isEdit && (
                                <div>
                                    Edit Store
                                </div>

                            )
                        }
                    </ModalHeader>
                    <ModalBody>
                        <div className="p-3">
                            <div className="row">
                                <div className="col-12">
                                    <h6 className="text-red mb-2 fs-14 scaling-center scaling-mb">Store Details</h6>
                                </div>
                                <div className="col-sm-4 col-12">
                                    <div className="form-group">
                                        <label>State<span className="text-red font-bold">*</span></label>
                                        {/* <select className="form-control" value={this.state.stateName}
                                            onChange={(e) => this.setState({ stateName: e.target.value })}
                                        >
                                            <option> Select </option>
                                            <option>Andhra Pradesh</option>
                                            <option>Telangana</option>
                                            <option>Mumbai</option>
                                        </select> */}

                                        <select className="form-control" value={this.state.stateName}
                                            onChange={(e) => this.setState({ stateName: e.target.value, isGstNumber:false, gstNumber:"" }, () => {
                                                this.getDistricts()
                                            })}>

                                            {statesList}
                                        </select >

                                       

                                    </div>
                                </div>
                                <div className="col-sm-4 col-12">
                                    <div className="form-group">
                                        <label>District<span className="text-red font-bold">*</span></label>
                                        {/* <select className="form-control" value={this.state.district}
                                            onChange={(e) => this.setState({ district: e.target.value })}>
                                            <option> Select </option>
                                            <option>Guntur</option>
                                            <option>Krishna</option>
                                            <option>Kurnool</option>
                                        </select> */}

                                        <select className="form-control" value={this.state.district}
                                            onChange={(e) => this.setState({ district: e.target.value })}>

                                            {districtList}
                                        </select >

                                        {/* <div>
                                            <span style={{ color: "red" }}>{this.state.errors["district"]}</span>
                                        </div> */}
                                    </div>
                                </div>
                                <div className="col-sm-4 col-12">
                                    <div className="form-group">
                                        <label>City</label>
                                        {/* <select className="form-control" value={this.state.city}
                                            onChange={(e) => this.setState({ city: e.target.value })}>
                                            <option> Select </option>
                                            <option>Guntur</option>
                                            <option>Vijayawada</option>
                                            <option>Kurnool</option>
                                        </select> */}
                                        <input type="text" className="form-control"
                                            placeholder="City" value={this.state.city}
                                            onChange={(e) => this.setState({ city: e.target.value })}
                                        // onFocus={(e)=> {
                                        //     if (!this.state.focus) {
                                        //         this.setState({
                                        //             focus: true,
                                        //             city: "Enter City"
                                        //         });
                                        //     }

                                        // }}
                                        />
                                        {/* 
                                        <div>
                                            <span style={{ color: "red" }}>{city}</span>
                                        </div> */}



                                        {/* <input type="text" className="form-control"
                                            placeholder="City" value={this.state.city}
                                            onChange={(e) => this.setState({ city: e.target.value }, 
                                            this.state.fields["city"] = e.target.value ),  () => {this.handleValidation();}} />
                                            {
                                                this.state.errors["city"] && (
                                                    <div>
                                                         <span style={{ color: "red" }}>{this.state.errors["city"]}</span>
                                                        </div>
                                                )
                                            } */}


                                    </div>
                                </div>
                                <div className="col-sm-4 col-12 mt-3">
                                    <div className="form-group">
                                        <label>Area</label>

                                        <input type="text" className="form-control"
                                            placeholder="Area" value={this.state.area}
                                            onChange={(e) => this.setState({ area: e.target.value })} />
                                        {/* <div>
                                            <span style={{ color: "red" }}>{this.state.errors["area"]}</span>
                                        </div> */}
                                    </div>
                                </div>
                                <div className="col-sm-4 col-12 mt-3">
                                    <div className="form-group">
                                        <label>Store Phone Number</label>
                                        <input type="text" className="form-control" minLength="10"
                                            maxLength="10" placeholder="+91" value={this.state.phoneNumber}
                                            onChange={this.validation} />
                                        {/* <div>
                                            <span style={{ color: "red" }}>{this.state.errors["phoneNumber"]}</span>
                                        </div> */}
                                    </div>
                                </div>
                                <div className="col-sm-4 col-12 mt-3">
                                    <div className="form-group">
                                        <label>Address</label>
                                        <input type="text" className="form-control" placeholder="" value={this.state.address}
                                            onChange={(e) => this.setState({ address: e.target.value })} />
                                    </div>
                                </div>
                                <div className="col-12 mt-4">
                                    <h6 className="text-red mb-1 fs-14 scaling-center scaling-mb">Store Info</h6>
                                </div>
                                <div className="col-4">
                                    <div className="form-group">
                                        <label>Domain<span className="text-red font-bold">*</span></label>

                                        <select className="form-control" value={this.state.domain}
                                            onChange={(e) => this.setState({ domain: e.target.value })}>

                                            {modulesList}
                                        </select >
                                        {/* <div>
                                            <span style={{ color: "red" }}>{this.state.errors["domain"]}</span>
                                        </div> */}
                                    </div>
                                </div>
                                <div className="col-sm-4 col-12">
                                    <div className="form-group">
                                        <label>Store Name<span className="text-red font-bold">*</span></label>
                                        <input type="text" className="form-control"
                                            value={this.state.storeName}
                                            onChange={(e) => this.setState({ storeName: e.target.value })} />
                                        {/* <div>
                                            <span style={{ color: "red" }}>{this.state.errors["storeName"]}</span>
                                        </div> */}
                                    </div>
                                </div>
                                <div className="col-sm-4 col-12">
                                    <div className="form-group">
                                        <label>GST Number</label>
                                        <input type="text" className="form-control" placeholder="Gst Number" 
                                            value={this.state.gstNumber}
                                            disabled={this.state.isGstNumber}
                                            onChange={(e) => this.setState({ gstNumber: e.target.value })} />
                                            {
                                                !this.state.isGstNumber && (
                                                    <div>
                                                    <span style={{ color: "red" }}>Please Provide GST Number</span>
                                                </div>
                                                )
                                            }
                                           

                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn-unic m-r-2" onClick={this.hideStores}>Cancel</button>
                        <button className="btn-unic active" onClick={this.saveStores}>Save</button>
                        {/* <button className="btn btn-bdr active fs-12"  onClick={this.createStore}>SAVE</button> */}
                    </ModalFooter>
                </Modal>


                <div className="row">
                    <div className="col-sm-3 col-12 mt-2">
                        <div className="form-group">
                            <select className="form-control" value={this.state.searchState}
                                onChange={(e) => this.setState({ searchState: e.target.value, isSearch: true }, ()=>{
                                    this.getDistricts()
                                })}>

                                {statesList}
                            </select >
                        </div>
                    </div>
                    <div className="col-sm-3 col-12 mt-2">
                        <div className="form-group">
                            <select className="form-control" value={this.state.searchDistrict}
                                onChange={(e) => this.setState({ searchDistrict: e.target.value })}>

                                {districtList}
                            </select >
                        </div>
                    </div>
                    <div className="col-sm-3 col-12 mt-2">
                        <div className="form-group">
                            <input type="text" className="form-control"
                                placeholder="City" value={this.state.searchCity}
                                onChange={(e) => this.setState({ searchCity: e.target.value })} />
                        </div>
                    </div>
                    <div className="col-sm-3 col-12 scaling-center scaling-mb mt-2 p-l-0">
                        <button className="btn-unic-search active m-r-1" onClick={this.searchStore}>Search </button>
                        <button className="btn-unic-search active m-r-1" onClick={this.getAllStores}>Clear </button>
                        <button className="btn-unic-search active" onClick={this.showStores}><i className="icon-retail mr-1"></i>  Add Store </button>
                    </div>
                    <div>
                        {this.getStoreTable()}
                    </div>


                </div>

            </div>
        )
    }
}
