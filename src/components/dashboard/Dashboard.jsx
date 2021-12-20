import React, { Component } from 'react'

export default class Dashboard extends Component {
    render() {
        return (
            <div className='Dashboard'>
                <div className="sales_graphs">
                    <iframe src="http://a79c3f2ac48a54c7dbe0707aefa13fa1-1299150847.ap-south-1.elb.amazonaws.com/d-solo/3y9Dqlpnk/new-sale-dashboard?orgId=1&theme=light&panelId=2" width="300" height="200" title='todaysSale' frameborder="0"></iframe>
                    <iframe src="http://a79c3f2ac48a54c7dbe0707aefa13fa1-1299150847.ap-south-1.elb.amazonaws.com/d-solo/3y9Dqlpnk/new-sale-dashboard?orgId=1&theme=light&panelId=4" width="300" height="200" title='monthlySale' frameborder="0"></iframe>
                    <iframe src="http://a79c3f2ac48a54c7dbe0707aefa13fa1-1299150847.ap-south-1.elb.amazonaws.com/d-solo/3y9Dqlpnk/new-sale-dashboard?orgId=1&theme=light&panelId=6" width="300" height="200" title='thisVsLastMonthSale' frameborder="0"></iframe>
                </div>
                <div className='barchart'>
                <iframe src="http://a79c3f2ac48a54c7dbe0707aefa13fa1-1299150847.ap-south-1.elb.amazonaws.com/d-solo/3y9Dqlpnk/new-sale-dashboard?orgId=1&theme=light&panelId=12" width="700" height="500" title='topsales' frameborder="0"></iframe>
                </div>
                <div className='piecharts'>
                <iframe src="http://a79c3f2ac48a54c7dbe0707aefa13fa1-1299150847.ap-south-1.elb.amazonaws.com/d-solo/05b1RXt7z/reports?orgId=1&theme=light&panelId=4" width="600" height="300" title='activeinactive' frameborder="0"></iframe>
                <iframe src="http://a79c3f2ac48a54c7dbe0707aefa13fa1-1299150847.ap-south-1.elb.amazonaws.com/d-solo/05b1RXt7z/reports?orgId=1&theme=light&panelId=2" width="600" height="300" title='invoicegenerated' frameborder="0"></iframe>
                </div>
            </div>
        )
    }
}
