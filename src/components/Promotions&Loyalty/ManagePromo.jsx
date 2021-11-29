import React, { Component } from 'react';
import edit from '../../assets/images/edit.svg';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default class ManagePromo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddPromo: false,
      isAddStore: false,
    };

    this.addPromo = this.addPromo.bind(this);
    this.closePromo = this.closePromo.bind(this);
    this.addStore = this.addStore.bind(this);
    this.closeStore = this.closeStore.bind(this);
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

  render() {
    return (
      <div className="maincontent">
        <Modal isOpen={this.state.isAddPromo} size="md">
          <ModalHeader>Add Promo</ModalHeader>
          <ModalBody>
          <div className="row">
              <div className="col-12">
                  <h6 className="mb-2 fs-14">Please add promo code Details</h6>
                </div>
                <div className="col-6">
                <div className="form-group">
                  <label>Promotion Name</label>
                  <input type="text" className="form-control" placeholder="" />
                </div>
                </div>
                <div className="col-6">
                <div className="form-group">
                  <label>Description</label>
                  <input type="text" className="form-control" placeholder="" />
                </div>
                </div>
                <div className="col-6 mt-3">
                <div className="form-group">
                  <label>Print Name On Sale Bill</label>
                  <input type="text" className="form-control" placeholder="" />
                </div>
                </div>
                <div className="col-6 mt-3">
                <div className="form-group">
                  <label>Applicability</label>
                    <select className="form-control">
                      <option>Select</option>
                    </select>
                </div>
                </div>
                <div className="col-12 mt-3 d-flex">
                <label className="m-r-5">Charge Tax Extra</label>
                <div className="form-check m-r-3">
                  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked />
                  <label className="form-check-label" htmlFor="flexRadioDefault1">
                    YES
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault12" />
                  <label className="form-check-label" htmlFor="flexRadioDefault12">
                    NO
                  </label>
                </div>
                </div>
             </div>   
          </ModalBody>
          <ModalFooter>
            <button className="btn-unic" onClick={this.closePromo}>
              Cancel
            </button>
            <button
              className="btn-unic active fs-12"
              onClick={this.closePromo}
            >
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
            <button
              className="btn-unic active fs-12"
              onClick={this.closeStore}
            >
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
          <div className="col-sm-2 col-6 mt-2">
            <div className="form-group mb-3">
              <input type="text" className="form-control"
                placeholder="START DATE" />
            </div>
          </div>
          <div className="col-sm-2 col-6 mt-2">
            <div className="form-group mb-3">
              <input type="text" className="form-control"
                placeholder="END DATE" />
            </div>
          </div>
          <div className="col-sm-2 col-6 mt-2">
            <div className="form-group mb-3">
              <select className="form-control">
                <option>Select Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
          <div className="col-sm-2 col-12 scaling-center scaling-mb text-right">
            <button className="btn-unic-redbdr m-r-2 mt-2">SEARCH</button>
            <button className="btn-unic-search active  m-r-2 mt-2"  onClick={this.addPromo}><i className="icon-sale p-r-1"
             ></i>Add Promo</button>
            <button className="btn-unic-search active mt-2" onClick={this.addStore}><i className="icon-retail p-r-1"
              ></i> Add Store</button>
          </div>

        </div>
        <div className="row m-0 p-0 scaling-center">
          <h5 className="mt-1 mb-2 fs-18 p-l-0">List Of Pools</h5>
          <div className="table-responsive">
          <table className="table table-borderless mb-1 mt-2">
            <thead>
              <tr className="m-0 p-0">
                <th className="col-1"># Pool-ID</th>
                <th className="col-2">Pool Name</th>
                <th className="col-2">DESCRIPTION</th>
                <th className="col-1">Type</th>
                <th className="col-2">Created By</th>
                <th className="col-2">Created On</th>
                <th className="col-1">Status</th>
                <th className="col-1"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="col-1 underline geeks">P1101</td>
                <td className="col-2">Womens @ 999</td>
                <td className="col-2">Lorem ipsum dolor sit amet</td>
                <td className="col-1">Both</td>
                <td className="col-2">Ramesh</td>
                <td className="col-2">30 Sep 2021</td>
                <td className="col-1"><button className="btn-active">Active</button></td>
                <td className="col-1">
                  <img src={edit} className="w-12 pb-2" />
                  <i className="icon-delete m-l-2 fs-16"></i></td>
              </tr>
              <tr>
                <td className="col-1 underline geeks">P1102</td>
                <td className="col-2">Shirt buy 2 @399</td>
                <td className="col-2">Lorem ipsum dolor sit amet</td>
                <td className="col-1">Buy</td>
                <td className="col-2">Raju</td>
                <td className="col-2">30 Sep 2021</td>
                <td className="col-1"><button className="btn-active">Active</button></td>
                <td className="col-1">
                  <img src={edit} className="w-12 pb-2" />
                  <i className="icon-delete m-l-2 fs-16"></i></td>
              </tr>
              <tr>
                <td className="col-1 underline geeks">P1103</td>
                <td className="col-2">Pattu Saree @999</td>
                <td className="col-2">Lorem ipsum dolor sit amet</td>
                <td className="col-1">Both</td>
                <td className="col-2">Raju</td>
                <td className="col-2">30 Sep 2021</td>
                <td className="col-1"><button className="btn-inactive">Inactive</button></td>
                <td className="col-1">
                  <img src={edit} className="w-12 pb-2" />
                  <i className="icon-delete m-l-2 fs-16"></i></td>
              </tr>
              <tr>
                <td className="col-1 underline geeks">P1103</td>
                <td className="col-2">Pattu Saree @999</td>
                <td className="col-2">Lorem ipsum dolor sit amet</td>
                <td className="col-1">Both</td>
                <td className="col-2">Raju</td>
                <td className="col-2">30 Sep 2021</td>
                <td className="col-1"><button className="btn-active">Active</button></td>
                <td className="col-1">
                  <img src={edit} className="w-12 pb-2" />
                  <i className="icon-delete m-l-2 fs-16"></i></td>
              </tr>
              <tr>
                <td className="col-1 underline geeks">P1103</td>
                <td className="col-2">Pattu Saree @999</td>
                <td className="col-2">Lorem ipsum dolor sit amet</td>
                <td className="col-1">Both</td>
                <td className="col-2">Raju</td>
                <td className="col-2">30 Sep 2021</td>
                <td className="col-1"><button className="btn-active">Active</button></td>
                <td className="col-1">
                  <img src={edit} className="w-12 pb-2" />
                  <i className="icon-delete m-l-2 fs-16"></i></td>
              </tr>
              <tr>
                <td className="col-1 underline geeks">P1103</td>
                <td className="col-2">Pattu Saree @999</td>
                <td className="col-2">Lorem ipsum dolor sit amet</td>
                <td className="col-1">Both</td>
                <td className="col-2">Raju</td>
                <td className="col-2">30 Sep 2021</td>
                <td className="col-1"><button className="btn-inactive">Inactive</button></td>
                <td className="col-1">
                  <img src={edit} className="w-12 pb-2" />
                  <i className="icon-delete m-l-2 fs-16"></i></td>
              </tr>
              <tr>
                <td className="col-1 underline geeks">P1103</td>
                <td className="col-2">Pattu Saree @999</td>
                <td className="col-2">Lorem ipsum dolor sit amet</td>
                <td className="col-1">Both</td>
                <td className="col-2">Raju</td>
                <td className="col-2">30 Sep 2021</td>
                <td className="col-1"><button className="btn-active">Active</button></td>
                <td className="col-1">
                  <img src={edit} className="w-12 pb-2" />
                  <i className="icon-delete m-l-2 fs-16"></i></td>
              </tr>
            </tbody>
          </table>
      </div>

        </div>

      </div>
    )
  }
}
