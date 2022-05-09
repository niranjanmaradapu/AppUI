import React, { Component } from 'react';
import edit from '../../assets/images/edit.svg';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import AccountingPortalService from '../../services/AccountingPortal/AccountingPortalService';
import { toast } from 'react-toastify';
import Select from "react-select";
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
      priceTo:"",
      slabBased:"",
      isHSNCodeEdited: false,
      isSlabBased: false,
      taxAppliedTypes: [
      {label: 'Hsn Code', value: 'Hsncode'},
      {label: 'Price Slab', value: 'Priceslab'}
      ],
      taxAppliedType: '',
      selectedTaxLabel: '',
      slabValues: [{ priceFrom: '', priceTo: '', taxId : ''}]
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
    this.setState({ isaddHSNCode: false, slabValues: [], taxAppliedType: '', hsnCode: '', taxId: '', });
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
    const { hsnCode, descprition, taxAppliesOn, taxAppliedType, slabValues, taxId } = this.state;
    const obj = {
      description: descprition,
      hsnCode: hsnCode,
      taxAppliedType: taxAppliedType,
      taxAppliesOn: taxAppliesOn,
      taxId: taxAppliedType === 'Hsncode' ? taxId : null,
      slabs: taxAppliedType === 'Priceslab' ? slabValues : [],
    }
    if(!this.state.isHSNCodeEdited) {
      AccountingPortalService.saveHsnCode(obj).then(response => {
        if (response) {
        toast.success(response.data.message);
        this.closeHSNCode()
        this.getAllHsnCodes()
        }
      });
    } else {
        obj = {...obj, id: this.state.selectedHSNCode.id};
        AccountingPortalService.saveHsnCode(obj).then(response => {
          if (response.data.isSuccess === 'true') {
            toast.success(response.data.message);
            this.setState({
              selectedHSNCode: '',
              isaddHSNCode: false,
              isHSNCodeEdited: false
            }, () => this.getAllHsnCodes());      
          } else {
            toast.warn(response.data.message);
          }
        });
      }
  }
  getAllTaxes(){
    AccountingPortalService.getAllMasterTax().then(response => {
      if (response) {        
       const result = response.data.result.map((item) => {
          let obj = {};
          obj.id = item.id;
          obj.label = item.taxLabel;
          return obj;
        });
        this.setState({ allTaxList: result });
        console.log(this.state.allTaxList);
      }
    });
  }

  handleRoleChange = (idx, e) => {
    const { allTaxList } = this.state;
    let slabValues = this.state.slabValues;
    slabValues[idx][e.target.name] = e.target.value;  
    this.setState({
      slabValues
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
  this.setState({ taxId: e.target.value });
}
editHSNCode = (items) => {
  this.getDescriptionData();
  this.getTaxAppliesOn();
  this.getAllTaxes();
  this.setState({
    selectedHSNCode: items,
    isHSNCodeEdited: true,
    isaddHSNCode: true,
    hsnCode: items.hsnCode,
    priceTo: items.slabVos[0].priceTo,
    priceFrom: items.slabVos[0].priceFrom
  });
}
deleteHSNCode = (items) => {
this.setState({
  isHSNCodeDelete: true,
  selectedHSNCode: items
});
}
handleDeleteHSNCode = () => {
 const { selectedHSNCode } = this.state;
  AccountingPortalService.deleteHsn(selectedHSNCode.id).then(response => {
    if (response.data.isSuccess === 'true') {
        toast.success(response.data.message);
        this.setState({
          isHSNCodeDelete: false,
          selectedHSNCode: ''
        }, () => this.getAllHsnCodes());
    }
  });
}
handleChange(e) {
  if(e.target.checked) {
    this.setState({
      isSlabBased: true
    });
  } else {
    this.setState({
      isSlabBased: false,
      slabValues: []
    });
  }
}

handleRemoveSlab = (idx) =>  {
  const slabValues = [...this.state.slabValues]
  slabValues.splice(idx, 1)
  this.setState({ slabValues }) 
}
handelTaxAppliedType = (e) => {
  this.setState({ taxAppliedType: e.target.value });
}
handleAddRuleRow = () => { 
    const item = {
      priceFrom: '',
      priceTo: '',
      taxId: ''
    };
    this.setState({
      slabValues: [...this.state.slabValues, item]     
    });
}
deleteSlab(idx){
  const slabValues = [...this.state.slabValues]
  slabValues.splice(idx, 1)
  this.setState({ slabValues})
}

handleTextChange = (idx, e) => {
  let slabValues = this.state.slabValues;
  slabValues[idx][e.target.name] = e.target.value;
  this.setState({ slabValues });
};
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
                       
                        <option key={k} value={items}>{items.taxLabel}</option>
                    )
                }, this);
    return (
      <div className="maincontent">
        <Modal isOpen={this.state.isHSNCodeDelete} size="md">
          <ModalHeader>Delete HSN Code</ModalHeader>
          <ModalBody>
            <div className="maincontent p-0">
              <h6>Are you sure want to delete HSN code?</h6>        
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn-unic" onClick={this.closeHSNCode}>
              Cancel
            </button>
            <button
              className="btn-unic active fs-12"
              onClick={this.handleDeleteHSNCode}
            >
              Delete
            </button>
          </ModalFooter>
        </Modal>
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
                  <option>Select Description</option>
                   {descDataList}
                  </select >
                </div>
                </div>
                <div className="col-4">
                <div className="form-group">
                  <label>Tax Applies ON</label>                
                  <select className="form-control" onChange={this.handleSelectChangeTaxList}>
                  <option>Select Tax Applies ON</option>
                    {taxAppliesList}
                  </select >                
                </div>
                </div>
                <div className="col-4 mt-3">
                <div className="form-group">
                    <label>Tax Apply Type</label>
                    <select value={this.state.taxAppliedType} onChange={(e) => this.handelTaxAppliedType(e)} className="form-control">
                      <option>Select Tax Apply Type</option>
                        { 
                            this.state.taxAppliedTypes &&
                            this.state.taxAppliedTypes.map((item, i) => 
                            (<option key={i} value={item.value}>{item.label}</option>))
                          }
                    </select>
                </div>
                </div>             
                {(this.state.taxAppliedType  === '' || this.state.taxAppliedType  === 'Hsncode') && <div className="col-4 mt-3">
                <div className="form-group">
                  <label>TAX Label</label>
                  <select value={this.state.taxId} onChange={(e) => this.handleSelectChangeAllTax(e)} className="form-control">
                      <option>Select Tax Label</option>
                        { 
                            this.state.allTaxList &&
                            this.state.allTaxList.map((item, i) => 
                            (<option key={i} value={item.id}>{item.label}</option>))
                          }
                    </select>
                  {/* <Select
                    onChange={this.handleSelectChangeAllTax}
                    options={this.state.allTaxList}
                    value={this.state.selectedTaxLabel}
                  /> */}
                </div>
                </div>}
                <div className="col-3 mt-3">
                <div className="form-group">                 
                </div>
                </div>
                <div className="col-3 mt-3">
                <div className="form-group">                 
                </div>
                </div>
                </div>
                
               {this.state.taxAppliedType  === 'Priceslab' && <div className="col-12">
                  <table className="table table-borderless mb-1 mt-2">
                    <thead>
                      <tr className="m-0 p-0">
                        <th className="col-3 text-center">Price From</th>
                        <th className="col-3 text-center">Price To</th>
                        <th className="col-3 text-center">Tax</th>
                        <th className="col-1"></th>
                      </tr>
                    </thead>
                </table>
                <table className="table-borderless V1_table gfg mb-0 w-100">
                  <tbody>
                      {this.state.slabValues.map((item, idx) => (
                        
                        <tr id="addr0" key={idx}>
                          <td className='col-3 t-form'>
                            <input
                              type="text"
                              name="priceFrom"
                              value={this.state.slabValues[idx].priceFrom}
                              onChange={e => this.handleTextChange(idx, e)}
                              className="form-control"
                            />
                          </td>
                          <td className='col-3 t-form'>
                            <input
                                type="text"
                                name="priceTo"
                                value={this.state.slabValues[idx].priceTo}
                                onChange={e => this.handleTextChange(idx, e)}
                                className="form-control"
                              />
                          </td>  
                            <td  className='col-3 t-form'>
                            <div className="sele-height">                              
                                <select
                                  value={this.state.slabValues[idx].taxId} 
                                  onChange={ e => this.handleRoleChange(idx, e)}                          
                                  name="taxId"
                                  className="form-control">
                                    <option>Select Tax Label</option>
                                    {
                                      this.state.allTaxList &&
                                      this.state.allTaxList.map((item, i) => 
                                      (<option key={i} value={item.id}>{item.label}</option>))
                                    }
                                </select>
                            </div>
                            </td>
                          {
                            this.state.slabValues.length > 1 && 
                            <td className="col-1 text-center">
                              <i onClick={() => this.deleteSlab(idx)} className="icon-delete m-l-2 fs-16"></i>
                            </td>
                          }                        
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="col-12 text-right mt-3">
                    <button type="button" className="btn-unic-redbdr" onClick={this.handleAddRuleRow}>Add Slab</button>
                </div>  
                </div> }
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
          <tbody>
          {this.state.HsnCodeList.map((items, index) => {
                  return (
            <tr>
              <td className="col-3 underline geeks">{items.hsnCode}</td>
              <td className="col-3">{items.description}</td>
              <td className="col-2">{items.taxAppliesOn}</td>
              <td className="col-2">{items.slabBased}</td>
              <td className="col-2 text-center">
                <img src={edit} onClick={() => this.editHSNCode(items)} className="w-12 pb-2" />
                <i onClick={() => this.deleteHSNCode(items)}className="icon-delete m-l-2 fs-16"></i></td>
            </tr>
                        );
                      })}
          </tbody>
        </table>
        </div>

      </div>
    )
  }
}
