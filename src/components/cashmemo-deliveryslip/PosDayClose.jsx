import React, { Component } from 'react';
import dress1 from '../../assets/images/midi_blue.svg';
import error from '../../assets/images/error.svg';
import CreateDeliveryService from '../../services/CreateDeliveryService';
import { ToastContainer, toast } from "react-toastify";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default class PosDayClose extends Component {

  constructor(props){
    super(props);
    this.state  = {
      isCloseDay: false,
      mobileData: {
        dsNumber:"",
        mrp:"",
        dsId:"",
        salesMan:"",
        dayCloserList: [],
        closerDayList: [],
        storeId:"",
        length:"",
        enableButton:false

      }
    };
    

    this.closeDay = this.closeDay.bind(this);
    this.getAllDayCloser = this.getAllDayCloser.bind(this);
    this.closeDayCloser = this.closeDayCloser.bind(this);
    //this.getDayCloserTable = this.getDayCloserTable.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }
  
  componentWillMount() {
    const storeId = sessionStorage.getItem("storeId");
    this.setState({ storeId: storeId});
    this.getAllDayCloser();
  }


  closeDay() {
    this.setState({ isCloseDay: true });
    this.closeDayCloser();
   
  
  }
  closeDayCloser() {
    CreateDeliveryService.closeDayCloser(sessionStorage.getItem('storeId')).then(res => {
      if (res) {
        toast.success(res.data.result);
        this.getAllDayCloser();
        
      }
    }); 
  }
  
 

  hideModal() {
    this.setState({ isCloseDay: false });
  }
  getAllDayCloser() {
    CreateDeliveryService.getAllDayClosr(sessionStorage.getItem('storeId')).then(res => {
      if (res) {
        this.setState({ dayCloserList: res.data.result });
        if(this.state.dayCloserList.length>0){
          this.setState({enableButton:true})
        }
        
      }
    }); 
  }
           // console.log(this.state.giftVochersList);
  getDayCloserTable() {
    
    if (this.state.dayCloserList && this.state.dayCloserList.length > 0) {
      return this.state.dayCloserList.map((items, index) => {
        const { dsNumber ,mrp, salesMan } = items;
        return (
          <tr key={index}>
            <td className="col-2 geeks">
              {index + 1}
            </td>
            <td className="col-3">{dsNumber}</td>
            <td className="col-1">{mrp}</td>
            <td className="col-2">{salesMan}</td>
            

          </tr>
        );
      });
    }

  }



  render() {
    return (
      <div className="maincontent">
          <Modal isOpen={this.state.isDayClose} size="md">
          <ModalHeader>Confirm Activity</ModalHeader>
          <ModalBody>
            <div className="row ">
              <div className="col text-center">
              <img src={error}/>
            <h6 className="mt-2">Are you sure, you want to close the<br />
register today?</h6>
</div>
</div>
          </ModalBody>
          <ModalFooter>
            <button className="pt-2 btn-bdr" onClick={this.hideModal}>
              Cancel
            </button>
            <button
              className="btn btn-bdr active fs-12"
              onClick={this.hideModal}
            >
              Confirm
            </button>
          </ModalFooter>
        </Modal>

        <div className="row mb-2 scaling-center">
          <div className="col-sm-6 mt-2 col-12 scaling-mb"><h5>List Of Pending Delivery Slips</h5></div>
          <div className="col-sn-6 col-12 text-right scaling-mb"> 
          {/* <button  className="btn-unic-search mt-2  "
          //  disabled = {this.state.dayCloserList && this.state.dayCloserList.length > 0 }
                onClick={this.closeDay}>Day closuer</button> */}
  <button
                  className={
                    "btn-unic-search mt-2" +
                    (!this.state.enableButton ? " btn-disable" : "")
                  }
                  onClick={this.closeDay}
                >
                 Day closure
                </button>

          </div>
          </div>
          <div className="table-responsive">
        <table className="table table-borderless mb-1">
          <thead>
            <tr className="m-0 p-0">
            <th className="col-2">S.No</th>
              <th className="col-3">DSNumber</th>
              <th className="col-1">MRP</th>
              <th className="col-2">SALESMan</th>
              
            </tr>
          </thead>
          <tbody>
          {this.getDayCloserTable()}
          </tbody>
        </table>
      </div>
      </div>

  
    )
    }
  }