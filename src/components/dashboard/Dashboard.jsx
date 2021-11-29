import React, { Component } from 'react';
import graph from '../../assets/images/sales_graph.svg';
import graph_new from '../../assets/images/sales_graph_2.svg';
import c_portal_white from '../../assets/images/c_portal_white.svg';
import monthly_sale from '../../assets/images/monthly_sale.svg';
import last_month_sale from '../../assets/images/last_month_sale.svg';
export default class Dashboard extends Component {


    // constructor(props) {
    //     super(props);
        
    //     this.state = {
    //        data: 0
    //     }
    //     this.setNewNumber = this.setNewNumber.bind(this)
    //  };

    //  setNewNumber() {
    //     this.setState({data: this.state.data + 1})
    //  }


    //  componentWillMount() {
    //     console.log('Component WILL MOUNT!')
    //  }

    //  componentDidMount() {
    //     console.log('Component DID MOUNT!')
    //  }





    //  componentWillReceiveProps(newProps) {    
    //     console.log('Component WILL RECIEVE PROPS!')
    //  }
    //  shouldComponentUpdate(newProps, newState) {
    //     return true;
    //  }
    //  componentWillUpdate(nextProps, nextState) {
    //     console.log('Component WILL UPDATE!');
    //  }
    //  componentDidUpdate(prevProps, prevState) {
    //     console.log('Component DID UPDATE!')
    //  }
    //  componentWillUnmount() {
    //     console.log('Component WILL UNMOUNT!')
    //  }


    render() {
        return (
            <div className="maincontent">

{/* <div>
            <button onClick = {this.setNewNumber}>INCREMENT</button>
            <Content myNumber = {this.state.data}></Content>
         </div> */}


            <div className="row">
                <div className="col-12 scaling-center">
                      <h5 className="fs-25">Dashboard</h5>
                </div>
                <div className="col-sm-2 col-12">
                    <div className="rect-gradient1">
                        <div className="rect-gradient1-left">
                            <img src={c_portal_white} />
                        </div>
                    <div className="rect-gradient1-right">
                        <label>Today's Sale</label>
                        <h5>₹ 1,25,300</h5>
                     </div>   
                    </div>
                    <div className="rect-gradient2 mt-2">
                        <div className="rect-gradient1-left">
                            <img src={monthly_sale} />
                        </div>
                    <div className="rect-gradient1-right">
                        <label>Monthly Sale</label>
                        <h5>₹ 21,15,275</h5>
                     </div>   
                    </div>
                    <div className="rect-gradient3 mt-2">
                        <div className="rect-gradient1-left">
                            <img src={last_month_sale} />
                        </div>
                    <div className="rect-gradient1-right">
                        <label>This month sales v/s Last month</label>
                        <h5>+ 18.75%</h5>
                     </div>   
                    </div>
                </div>
                <div className="col-sm-5 col-12">
                    <div className="rect">
                        <div className="row">
                            <div className="col-sm-9 col-12 scaling-center">
                                <h5 className="fs-20">Sales by category</h5>
                            </div>
                            <div className="col-sm-3 col-12">
                                <select className="form-control">
                                    <option>Today</option>
                                    <option>Last One Month</option>
                                    <option>Last 6 Months</option>
                                    <option>Last Year</option>
                                </select>
                            </div>
                        </div>
                        <div className="rect-image">
                            <img src={graph} />
                        </div>
                    </div>
                </div>
                <div className="col-sm-5 col-12">
                <div className="rect">
                        <div className="row">
                            <div className="col-sm-9 col-12 scaling-center">
                                <h5 className="fs-20">Top 5 Sales by representative</h5>
                            </div>
                            <div className="col-sm-3 col-12">
                                <select className="form-control">
                                    <option>Today</option>
                                    <option>Last One Month</option>
                                    <option>Last 6 Months</option>
                                    <option>Last Year</option>
                                </select>
                            </div>
                        </div>
                        <div className="rect-image">
                            <img src={graph_new} />
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}


// export  class Content extends React.Component {
//     componentWillMount() {
//        console.log('Component child WILL MOUNT!')
//     }
//     componentDidMount() {
//        console.log('Component child DID MOUNT!')
//     }
//     componentWillReceiveProps(newProps) {    
//        console.log('Component child WILL RECIEVE PROPS!')
//     }
//     shouldComponentUpdate(newProps, newState) {
//        return true;
//     }
//     componentWillUpdate(nextProps, nextState) {
//        console.log('Component child WILL UPDATE!');
//     }
//     componentDidUpdate(prevProps, prevState) {
//        console.log('Component child DID UPDATE!')
//     }
//     componentWillUnmount() {
//        console.log('Component child WILL UNMOUNT!')
//     }
//     shouldComponentUpdate() {
//         return true;
//       }
//     render() {
//        return (
//           <div>
//              <h3>{this.props.myNumber}</h3>
//           </div>
//        );
//     }
//}
