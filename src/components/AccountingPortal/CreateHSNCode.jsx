import React, { Component } from 'react';
import edit from '../../assets/images/edit.svg';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import AccountingPortalService from '../../services/AccountingPortal/AccountingPortalService';
import { toast } from 'react-toastify';
export default class CreateHSNCode extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isaddHSNCode: false,
      HsnCodeList:[],
      allTaxList:[],
      descrptionList:[],
      taxsAppliesOnList:[],
      hsnCode:"",
      descprition:"",
      taxAppliesOn:"",
      taxId:"",
      priceFrom:"",
      priceTo:""

    };

    this.addHSNCode = this.addHSNCode.bind(this);
    this.closeHSNCode = this.closeHSNCode.bind(this);
    this.getDescriptionData = this.getDescriptionData.bind(this);
    this.getTaxAppliesOn = this.getTaxAppliesOn.bind(this);
    this.getAllTaxes = this.getAllTaxes.bind(this);
    this.saveHSNCode = this.saveHSNCode.bind(this);
    this.getAllHsnCodes = this.getAllHsnCodes.bind(this);
  }
  componentWillMount() {
  this. getAllHsnCodes();
  }

  addHSNCode() {
    this.getDescriptionData();
    this.getTaxAppliesOn();
    this.getAllTaxes();
    this.setState({ isaddHSNCode: true });
  }

  closeHSNCode() {
    this.setState({ isaddHSNCode: false });
  }
  getAllHsnCodes(){
    AccountingPortalService.getAllHsnCodes().then(response => {
      if (response) {
        this.setState({ HsnCodeList: response.data.result });
        console.log(this.state.HsnCodeList);
      }
    }); 
  }
  saveHSNCode(){
    const obj={
 "hsnCode": this.state.hsnCode,         
 "description": this.state.descprition,         
 "taxAppliesOn": this.state.taxAppliesOn,         
 "taxVo": {              
    "id": parseInt(this.state.taxId)                 
        },          
"slabVos": [             
{            
"priceFrom":parseInt(this.state.priceFrom) , 
                    
"priceTo": parseInt(this.state.priceTo)  ,
                    
"taxVo": {                  
   "id":  parseInt(this.state.taxId)                 
      }              
 }],       
 "slabBased": true
  }
  console.log(obj)
    AccountingPortalService.saveHsnCode(obj).then(response => {
      toast.success(response.data.message);
      this.closeHSNCode()
      this.getAllHsnCodes()
    });
  }
  getAllTaxes(){
    AccountingPortalService.getAllMasterTax().then(response => {
      if (response) {
        this.setState({ allTaxList: response.data.result });
        console.log(this.state.allTaxList);
      }
    });
  }
  getDescriptionData(){
    AccountingPortalService.getDescrition().then(response => {
      if (response) {
        this.setState({ descrptionList: response.data.result });
        console.log(this.state.descrptionList);
      }
    });
  }
getTaxAppliesOn(){
  
  AccountingPortalService.getTaxAppliesOn().then(response => {
    if (response) {
      this.setState({ taxsAppliesOnList: response.data.result });
      console.log(this.state.taxsAppliesOnList);
    }
  });
}
handleSelectChangeDesc = (e) => {
   let obj;
  obj = e.target.value;
   this.setState({ descprition: obj });
}

handleSelectChangeTaxList = (e) => {
  let obj;
 obj = e.target.value;
  this.setState({ taxAppliesOn: obj });
}
handleSelectChangeAllTax = (e) => {
  let obj;
 obj = e.target.value;
  this.setState({ taxId: obj });
}
  render() {
    const description = this.state.descrptionList;
    let descDataList = description.length > 0
        && description.map((item, i) => {
            return (
               
                <option key={i} value={item.name}>{item.name}</option>
            )
        }, this);
        const taxApplies = this.state.taxsAppliesOnList;
        let taxAppliesList = taxApplies.length > 0
            && taxApplies.map((items, k) => {
                return (
                   
                    <option key={k} value={items.name}>{items.name}</option>
                )
            }, this);
            const allTaxApplies = this.state.allTaxList;
            let allTaxList = allTaxApplies.length > 0
                && allTaxApplies.map((items, k) => {
                    return (
                       
                        <option key={k} value={items.id}>{items.taxLabel}</option>
                    )
                }, this);
    return (
      <div className="maincontent">
        <Modal isOpen={this.state.isaddHSNCode} size="lg">
          <ModalHeader>Add HSN Code</ModalHeader>
          <ModalBody>
          <div className="row">
              <div className="col-12">
              <h6 className="text-red mb-2 fs-14">HSN information</h6>
                </div>
                <div className="col-4">
                <div className="form-group">
                  <label>HSN Code</label>
                  <input type="text" className="form-control" placeholder="" value={this.state.hsnCode}
                    onChange={(e) => {
                      this.setState({
                        hsnCode: e.target.value,

                      });
                    }} />
                </div>
                </div>
                <div className="col-4">
                <div className="form-group">
                  <label>Description</label>
                  <select className="form-control" onChange={this.handleSelectChangeDesc}>

{descDataList}
</select >
                </div>
                </div>
                <div className="col-4">
                <div className="form-group">
                  <label>Tax Applies ON</label>
                
                  <select className="form-control" onChange={this.handleSelectChangeTaxList}>

{taxAppliesList}
</select >
                
                </div>
                </div>
             
                {/* <div className="col-4 mt-3">
                <div className="form-group">
                  <label>Slab</label>
                  <select className="form-control">
                    <option>Select Slab</option>
                  </select>
                </div>
                </div> */}
                <div className="col-4 mt-3">
                <div className="form-group">
                  <label>TAX Label</label>
                  <select className="form-control" onChange={this.handleSelectChangeAllTax}>

{allTaxList}
</select >
                
                  {/* <select className="form-control">
                    <option>Select Slab</option>
                    <option>Select 1</option>
                    <option>Select 2</option>
                  </select> */}
                </div>
                </div>
                <div className="col-4 mt-3">
                <div className="form-group">
                  <label>From Price</label>
                  <input type="text" className="form-control" placeholder="₹"
                  value={this.state.priceFrom}
                  onChange={(e) => {
                    this.setState({
                      priceFrom: e.target.value,

                    });
                  }}
                   />
                </div>
                </div>
                <div className="col-4 mt-3">
                <div className="form-group">
                  <label>To Price</label>
                  <input type="text" className="form-control" placeholder="₹"
                  value={this.state.priceTo}
                  onChange={(e) => {
                    this.setState({
                      priceTo: e.target.value,

                    });
                  }}
                  />
                </div>
                </div>
                </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn-unic" onClick={this.closeHSNCode}>
              Cancel
            </button>
            <button
              className="btn-unic active fs-12"
              onClick={this.saveHSNCode}
            >
              Save
            </button>
          </ModalFooter>
        </Modal>
        <div className="row scaling-mb">
          <div className="col-sm-5 col-6">
            <h5 className="mt-1 mb-2 fs-18 p-l-0 mt-3">List Of HSN Codes</h5>
          </div>
          <div className="col-sm-7 col-6 text-right">
            <button className="btn-unic-search mt-2 active"
              onClick={this.addHSNCode}>Add HSN Code</button>
          </div>
        </div>
        <div className="table-responsive">
        <table className="table table-borderless mb-1 mt-2">
          <thead>
            <tr className="m-0 p-0">
              <th className="col-3">HSN Code </th>
              <th className="col-3">GOODS/SERVICES</th>
              <th className="col-2">Tax Applicable</th>
              <th className="col-2">Slab</th>
              <th className="col-2"></th>
            </tr>
          </thead>
        </table>
        <table className="table table-borderless gfg mb-0">
          <tbody>
            <tr>
              <td className="col-3 underline geeks">HSN0011</td>
              <td className="col-3">Goods</td>
              <td className="col-2">Net Amount</td>
              <td className="col-2">YES</td>
              <td className="col-2 text-center">
                <img src={edit} className="w-12 pb-2" />
                <i className="icon-delete m-l-2 fs-16"></i></td>
            </tr>
           

          </tbody>
        </table>
        </div>

      </div>
    )
  }
}
