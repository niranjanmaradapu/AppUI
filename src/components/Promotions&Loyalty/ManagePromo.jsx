import React, { Component } from "react";
import edit from "../../assets/images/edit.svg";
import left from "../../assets/images/table_arrow_left.svg";
import right from "../../assets/images/table_arrow_right.svg";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default class ManagePromo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddPromo: false,
      isAddStore: false,
      isAddBenefits: false
    };

    this.addPromo = this.addPromo.bind(this);
    this.closePromo = this.closePromo.bind(this);
    this.addStore = this.addStore.bind(this);
    this.closeStore = this.closeStore.bind(this);
    this.addBenefits = this.addBenefits.bind(this);
    this.closeBenefits = this.closeBenefits.bind(this);
  }

  addPromo() {
    this.setState({ isAddPromo: true });
  }

  closePromo() {
    this.setState({ isAddPromo: false });
  }

  addStore() {
    this.setState({ isAddStore: true });
  }

  closeStore() {
    this.setState({ isAddStore: false });
  }

  addBenefits() {
    this.setState({ isAddBenefits: true });
  }

  closeBenefits() {
    this.setState({ isAddBenefits: false });
  }


  render() {
    return (
      <div className="maincontent">
         <Modal isOpen={this.state.isAddBenefits} size="md">
           <ModalHeader>
             Add Benefits
           </ModalHeader>
           <ModalBody>
           <div className="row">
              <div className="col-12">
                <h6 className="mb-2 fs-14">Please add benefits & discount types</h6>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Benefit Type</label>
                  <select className="form-control">
                    <option>Select Types of Benefit</option>
                  </select>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Discount Type</label>
                  <select className="form-control">
                    <option>Select Types of Discount</option>
                  </select>
                </div>
              </div>
              <div className="col-6 mt-3">
                <div className="form-group">
                  <label>Discount ON  %</label>
                  <input type="text" className="form-control" placeholder="Enter % Discount On" />
                </div>
              </div>
              <div className="col-6 mt-3">
                <div className="form-group">
                  <label>Each Item</label>
                  <select className="form-control">
                    <option>Each Item</option>
                  </select>
                </div>
              </div>
             </div> 
           </ModalBody>
           <ModalFooter>
           <button className="btn-unic" onClick={this.closeBenefits}>
              Cancel
            </button>
            <button className="btn-unic active fs-12" onClick={this.closeBenefits}>
              Save
            </button>
           </ModalFooter>
           </Modal>
        <Modal isOpen={this.state.isAddPromo} size="xl">
          <ModalHeader>Add Promo</ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-12">
                <h6 className="mb-2 fs-14 text-red">Please add promo code Details</h6>
              </div>
              <div className="col-3">
                <div className="form-group">
                  <label>Promotion Name</label>
                  <input type="text" className="form-control" placeholder="" />
                </div>
              </div>
              <div className="col-3">
                <div className="form-group">
                  <label>Description</label>
                  <input type="text" className="form-control" placeholder="" />
                </div>
              </div>
              <div className="col-3">
                <div className="form-group">
                  <label>Print Name On Sale Bill</label>
                  <input type="text" className="form-control" placeholder="" />
                </div>
              </div>
              <div className="col-3">
                <div className="form-group">
                  <label>Applicability</label>
                  <select className="form-control">
                    <option>Select</option>
                  </select>
                </div>
              </div>
              <div className="col-3 mt-3">
                <div className="form-group">
                  <label>Promotion Type</label>
                  <select className="form-control">
                    <option>Select</option>
                  </select>
                </div>
              </div>
              <div className="col-3 mt-3">
              <div className="form-group">
                 <label className="">Charge Tax Extra</label>
                  <select className="form-control">
                    <option>Select</option>
                  </select>
                </div>
               

                {/* <div className="form-check m-r-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    checked
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    YES
                  </label>
                </div> */}
                {/* <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault12"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault12"
                  >
                    NO
                  </label>
                </div> */}
              </div>
              <div className="col-12 mt-4">
                <h6 className="mb-2 fs-14 text-red">Buy pool definition</h6>
              </div>
              <div className="col-3">
                <div className="form-group">
                  <label>Buy Any</label>
                  <input type="text" className="form-control" placeholder="" />
                </div>
              </div>
              <div className="col-3">
              <div className="form-group">
                 <label className="">Add Buy Pools</label>
                  <select className="form-control">
                    <option>Select</option>
                  </select>
                </div>
                </div>
                <div className="col-3 mt-3">
                   <button className="btn-nobdr text-red p-t-3" type="button" onClick={this.addBenefits}>+ Add Benefits</button>
                </div>
                <div className="col-12">
                <div className="table-responsive">
          <table className="table table-borderless mb-1 mt-2">
            <thead>
              <tr className="m-0 p-0">
                <th className="col-3">Pool Name</th>
                <th className="col-3">Pool Ration</th>
                <th className="col-3">Benefit Type</th>
                <th className="col-2">Discount Type </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="col-3">Womens @ 999</td>
                <td className="col-3">0</td>
                <td className="col-3">Buy Any 3 Items Get 1</td>
                <td className="col-2">Festival</td>
                   <td className="">
                  <img src={edit} className="w-12 pb-2" />
                  <i className="icon-delete m-l-2 fs-16"></i></td>
              </tr>
              <tr>
                <td className="col-3">Womens @ 999</td>
                <td className="col-3">0</td>
                <td className="col-3">Buy 1 Get 1</td>
                <td className="col-2">Big Sale</td>
                <td className="">
                  <img src={edit} className="w-12 pb-2" />
                  <i className="icon-delete m-l-2 fs-16"></i></td>
              </tr>
              <tr>
                <td className="col-3">Womens @ 999</td>
                <td className="col-3">0</td>
                <td className="col-3">Buy 1 Get 1</td>
                <td className="col-2">Big Sale</td>
                <td className="">
                  <img src={edit} className="w-12 pb-2" />
                  <i className="icon-delete m-l-2 fs-16"></i></td>
              </tr>
              <tr>
                <td className="col-3">Womens @ 999</td>
                <td className="col-3">0</td>
                <td className="col-3">Buy 1 Get 1</td>
                <td className="col-2">Big Sale</td>
                <td className="">
                  <img src={edit} className="w-12 pb-2" />
                  <i className="icon-delete m-l-2 fs-16"></i></td>
              </tr>
              <tr>
                <td className="col-3">Womens @ 999</td>
                <td className="col-3">0</td>
                <td className="col-3">Buy 2 Get 1</td>
                <td className="col-2">New Year</td>
                <td className="">
                  <img src={edit} className="w-12 pb-2" />
                  <i className="icon-delete m-l-2 fs-16"></i></td>
              </tr>
            </tbody>
          </table>
      </div>
                  </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn-unic" onClick={this.closePromo}>
              Cancel
            </button>
            <button className="btn-unic active fs-12" onClick={this.closePromo}>
              Save
            </button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.isAddStore} size="md">
          <ModalHeader>Add Promo To Store</ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-12">
                <h6 className="mb-2 fs-14">Please add promo codes to store</h6>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Promotion Type</label>
                  <select className="form-control">
                    <option>Select Type</option>
                  </select>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Promotion Code</label>
                  <select className="form-control">
                    <option>Select Code</option>
                  </select>
                </div>
              </div>
              <div className="col-6 mt-3">
                <div className="form-group">
                  <label>Store</label>
                  <select className="form-control">
                    <option>Select Store</option>
                    <option>Kukatpally</option>
                    <option>JNTU</option>
                  </select>
                </div>
              </div>
              <div className="col-6 mt-3">
                <div className="form-group">
                  <label>Start Date</label>
                  <input type="date" className="form-control" />
                </div>
              </div>
              <div className="col-6 mt-3">
                <div className="form-group">
                  <label>End Date</label>
                  <input type="date" className="form-control" />
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn-unic" onClick={this.closeStore}>
              Cancel
            </button>
            <button className="btn-unic active fs-12" onClick={this.closeStore}>
              Save
            </button>
          </ModalFooter>
        </Modal>
        <div className="row mb-2">
          <div className="col-sm-4 col-12 scaling-mb">
            <div className="promo-darkblue">
              <div className="row">
                <div className="col-3">
                  <i className="icon-sale"></i>
                </div>
                <div className="col-6">
                  <h5>Total Promotions</h5>
                </div>
                <div className="col-3">
                  <label className="">101</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4 col-12 scaling-mb">
            <div className="promo-darkgreen">
              <div className="row">
                <div className="col-3">
                  <i className="icon-return_slip"></i>
                </div>
                <div className="col-6">
                  <h5>Active Promotions</h5>
                </div>
                <div className="col-3">
                  <label className="">58</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4 col-12 scaling-mb">
            <div className="promo-darkred">
              <div className="row">
                <div className="col-3">
                  <i className="icon-loyalty_promo"></i>
                </div>
                <div className="col-6">
                  <h5>Inactive Promotions</h5>
                </div>
                <div className="col-3">
                  <label className="">43</label>
                </div>
              </div>
            </div>
          </div>
        </div>
 
        <div className="row">
          <div className="col-sm-2 col-6">
            <div className="form-group mt-2 mb-3">
              <select className="form-control">
                <option>Select Store</option>
                <option>Kukatpally</option>
                <option>KPHB-9th Phase</option>
                <option>Ameerpet</option>
              </select>
            </div>
          </div>

          {/* <div className="col-sm-2 col-6 mt-2">
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="PROMO NAME"
              />
            </div>
          </div> */}
          <div className="col-sm-2 col-6 mt-2">
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="START DATE"
              />
            </div>
          </div>
          <div className="col-sm-2 col-6 mt-2">
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="END DATE"
              />
            </div>
          </div>
          <div className="col-sm-2 col-6 mt-2">
            <div className="form-group mb-3">
              <select className="form-control">
                <option>Status Type</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
          <div className="col-sm-4 col-12 pl-0 scaling-center scaling-mb text-right">
            <button className="btn-unic-redbdr m-r-2 mt-2">SEARCH</button>
            <button
              className="btn-unic-search active m-r-2 mt-2"
              onClick={this.addPromo}
            >
              <i className="icon-sale p-r-1"></i>Add Promo
            </button>
            <button
              className="btn-unic-search active mt-2"
              onClick={this.addStore}
            >
              <i className="icon-retail p-r-1"></i> Add Store
            </button>
          </div>
        </div>
        <div className="row m-0 p-0 scaling-center">
  
          <div className="col-6 p-l-0">
          <h5 className="mt-1 mb-2 fs-18 p-l-0">List Of Pools</h5>
            <button className="btn-selection m-r-2" type="button">Update Promotions</button>
            <button className="btn-selection m-r-2" type="button">Clone Promotions</button>
            <button className="btn-selection active" type="button">Save Priority</button>
          </div>
          <div className="col-6 text-right p-r-0 mt-2 align-self-center">
            <span className="mt-3 ">Show on page </span><span className="font-bold fs-14"> 1-10</span><span> out of 11</span><button className="btn-transparent" type="button"><img src={left} /></button><button className="btn-transparent" type="button"><img src={right} /></button>
          </div>
          <div className="table-responsive p-0">
            <table className="table table-borderless mb-1 mt-2">
              <thead>
                <tr className="m-0 p-0">
                  <th className="col-1"># Mapping-ID</th>
                  <th className="col-2">Promo Name</th>
                  <th className="col-2">Store</th>
                  <th className="col-1">Priority</th>
                  <th className="col-2">Start Date</th>
                  <th className="col-2">End Date</th>
                  <th className="col-1">Status</th>
                  <th className="col-1"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="col-1 underline geeks">1101</td>
                  <td className="col-2">Womens @ 999</td>
                  <td className="col-2">Hyd-Patny</td>
                  <td className="col-1">211</td>
                  <td className="col-2">30 Sep 2021</td>
                  <td className="col-2">30 Sep 2021</td>
                  <td className="col-1">
                    <button className="btn-active">Active</button>
                  </td>
                  <td className="col-1">
                    <img src={edit} className="w-12 pb-2" />
                    <i className="icon-delete m-l-2 fs-16"></i>
                  </td>
                </tr>
                <tr>
                  <td className="col-1 underline geeks">1102</td>
                  <td className="col-2">Shirt buy 2 @399</td>
                  <td className="col-2">Hyd-Chandanagar</td>
                  <td className="col-1">210</td>
                  <td className="col-2">30 Sep 2021</td>
                  <td className="col-2">30 Sep 2021</td>
                  <td className="col-1">
                    <button className="btn-active">Active</button>
                  </td>
                  <td className="col-1">
                    <img src={edit} className="w-12 pb-2" />
                    <i className="icon-delete m-l-2 fs-16"></i>
                  </td>
                </tr>
                <tr>
                  <td className="col-1 underline geeks">1103</td>
                  <td className="col-2">Pattu Saree @999</td>
                  <td className="col-2">Hyd-Ameerpet</td>
                  <td className="col-1">209</td>
                  <td className="col-2">30 Sep 2021</td>
                  <td className="col-2">30 Sep 2021</td>
                  <td className="col-1">
                    <button className="btn-inactive">Inactive</button>
                  </td>
                  <td className="col-1">
                    <img src={edit} className="w-12 pb-2" />
                    <i className="icon-delete m-l-2 fs-16"></i>
                  </td>
                </tr>
                <tr>
                  <td className="col-1 underline geeks">1103</td>
                  <td className="col-2">Pattu Saree @999</td>
                  <td className="col-2">Hyd-Kukatpally</td>
                  <td className="col-1">208</td>
                  <td className="col-2">30 Sep 2021</td>
                  <td className="col-2">30 Sep 2021</td>
                  <td className="col-1">
                    <button className="btn-active">Active</button>
                  </td>
                  <td className="col-1">
                    <img src={edit} className="w-12 pb-2" />
                    <i className="icon-delete m-l-2 fs-16"></i>
                  </td>
                </tr>
                <tr>
                  <td className="col-1 underline geeks">P1105</td>
                  <td className="col-2">Pattu Saree @999</td>
                  <td className="col-2">Lorem ipsum dolor sit amet</td>
                  <td className="col-1">Both</td>
                  <td className="col-2">Raju</td>
                  <td className="col-2">30 Sep 2021</td>
                  <td className="col-1">
                    <button className="btn-active">Active</button>
                  </td>
                  <td className="col-1">
                    <img src={edit} className="w-12 pb-2" />
                    <i className="icon-delete m-l-2 fs-16"></i>
                  </td>
                </tr>
                <tr>
                  <td className="col-1 underline geeks">1103</td>
                  <td className="col-2">Pattu Saree @999</td>
                  <td className="col-2">Hyd-Nizampet</td>
                  <td className="col-1">207</td>
                  <td className="col-2">30 Sep 2021</td>
                  <td className="col-2">30 Sep 2021</td>
                  <td className="col-1">
                    <button className="btn-inactive">Inactive</button>
                  </td>
                  <td className="col-1">
                    <img src={edit} className="w-12 pb-2" />
                    <i className="icon-delete m-l-2 fs-16"></i>
                  </td>
                </tr>
                <tr>
                  <td className="col-1 underline geeks">1106</td>
                  <td className="col-2">Pattu Saree @999</td>
                  <td className="col-2">Hyd-Miyapur</td>
                  <td className="col-1">206</td>
                  <td className="col-2">30 Sep 2021</td>
                  <td className="col-2">30 Sep 2021</td>
                  <td className="col-1">
                    <button className="btn-active">Active</button>
                  </td>
                  <td className="col-1">
                    <img src={edit} className="w-12 pb-2" />
                    <i className="icon-delete m-l-2 fs-16"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
