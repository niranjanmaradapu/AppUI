import React, { Component } from 'react'
import CreateCustomerService from '../../services/CreateCustomerService';
export default class PosDayClose extends Component {
    constructor(props) {
        super(props)
        this.state={
         responseData:" ",
         isClose: true,
        }
        this.getCloseDay = this.getCloseDay.bind(this);
    }
    componentWillMount() {
       this.getCloseDay();
    }

    getCloseDay() {
        CreateCustomerService.posClose(false).then((res) => {
            console.log(res)
            this.setState({responseData:res.data});
            const responseArray = this.state.responseData.body.split(" ");
            console.log(responseArray[responseArray.length-1]);
            if(responseArray[responseArray.length-1] === 0) {
                this.setState({isClose: false});
            }
        });
    }


    closeDay() {
        CreateCustomerService.posClose(true).then((res) => {
           if(res.statusCodeValue === 200) {
               this.setState({isClose:true});
           }
            
        });
    }

    render() {
        return (
            <div className="maincontent">
            <div className="row">
                <div className="col-6">
                    <h5>POS Day Close</h5>
                </div>

            </div>

            <div className="rect">
                <div className="row upper-case">
                <h3>{this.state.responseData.body}</h3>
                  </div>
                  <div className="row">
                    <div className="col-3 pt-4">
                        <div className="form-group">
  
                            <button className={"btn-bdr w-100"+ (this.state.isClose ? ' btn-disable': '')} 
                            onClick={this.closeDay} disabled={this.state.isClose}>Close Day </button>
                        </div>
                    </div>

                </div>
            </div>
            

        </div>
        )
    }
}
