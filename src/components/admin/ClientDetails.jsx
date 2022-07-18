import React, { Component } from 'react';
import edit from '../../assets/images/edit.svg';

class ClientDetails extends Component {
    render() {
        return (
            <div className="maincontent">
            <div className="row">
            
             <div className="col-12 col-sm-2 mt-2">
                <div className="form-group">
                <label>Search</label>
                <input type="text" className="form-control" name="store" placeholder="Search Client Name / Business" />
                </div>
            </div>
            <div className="col-12 scaling-center scaling-mb col-sm-6 pt-4 mt-2 p-l-0">
                <button className="btn-unic-search m-r-2">Search </button>
            </div>
        </div>
        <div className="col-sm-12 col-12 scaling-center scaling-mb mt-3">
                    <h5 className='fs-18'>List Of Clients</h5>
                </div>
                <div className="table-responsive p-0">
                <table className="table table-borderless mb-1 mt-2">
                    <thead>
                        <tr className="m-0 p-0">
                            <th className="col-1">S.NO </th>
                            <th className="col-2">CLIENT</th>
                          
                            <th className="col-2">Business</th>
                            <th className="col-1">Paln</th>
                          
                            <th className="col-2">Created Date</th>
                            <th className="col-3">Description</th>
                            <th className="col-1"></th>
                        </tr>
                    </thead>
                    <tbody>
                       <tr>
                        <td className='col-1'>001</td>
                        <td className='col-2'>Sai Silks</td>
                        <td className='col-2'>KLM</td>
                        <td className='col-1'>Premium</td>
                        <td className='col-2'>30 Sep 2021</td>
                        <td className='col-3'>In publishing and graphic design, Lorem ipsum</td>
                        <td className="col-1">
                            <img src={edit} className="w-12 m-r-2 pb-2" name="image" />
                            <i className="icon-delete"></i>
                        </td>
                       </tr>
                       <tr>
                        <td className='col-1'>001</td>
                        <td className='col-2'>Sai Silks</td>
                        <td className='col-2'>KLM</td>
                        <td className='col-1'>Premium</td>
                        <td className='col-2'>30 Sep 2021</td>
                        <td className='col-3'>In publishing and graphic design, Lorem ipsum</td>
                        <td className="col-1">
                            <img src={edit} className="w-12 m-r-2 pb-2" name="image" />
                            <i className="icon-delete"></i>
                        </td>
                       </tr>
                       <tr>
                        <td className='col-1'>001</td>
                        <td className='col-2'>Sai Silks</td>
                        <td className='col-2'>KLM</td>
                        <td className='col-1'>Premium</td>
                        <td className='col-2'>30 Sep 2021</td>
                        <td className='col-3'>In publishing and graphic design, Lorem ipsum</td>
                        <td className="col-1">
                            <img src={edit} className="w-12 m-r-2 pb-2" name="image" />
                            <i className="icon-delete"></i>
                        </td>
                       </tr>
                       <tr>
                        <td className='col-1'>001</td>
                        <td className='col-2'>Sai Silks</td>
                        <td className='col-2'>KLM</td>
                        <td className='col-1'>Premium</td>
                        <td className='col-2'>30 Sep 2021</td>
                        <td className='col-3'>In publishing and graphic design, Lorem ipsum</td>
                        <td className="col-1">
                            <img src={edit} className="w-12 m-r-2 pb-2" name="image" />
                            <i className="icon-delete"></i>
                        </td>
                       </tr>
                       <tr>
                        <td className='col-1'>001</td>
                        <td className='col-2'>Sai Silks</td>
                        <td className='col-2'>KLM</td>
                        <td className='col-1'>Premium</td>
                        <td className='col-2'>30 Sep 2021</td>
                        <td className='col-3'>In publishing and graphic design, Lorem ipsum</td>
                        <td className="col-1">
                            <img src={edit} className="w-12 m-r-2 pb-2" name="image" />
                            <i className="icon-delete"></i>
                        </td>
                       </tr>
                    </tbody>
                </table>
                </div>
        </div>
        );
    }
}

export default ClientDetails;