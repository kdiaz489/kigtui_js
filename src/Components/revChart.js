import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
import './revChart.css';


class revChart extends Component{

	constructor(props){
		super(props);
		console.log("prop value = " +this.props.value);
		this.state={
			chartData:{
				labels: ['Sample A', 'Sample B', 'Sample C', 'Sample D'],
				datasets:[

				{

					label:'Power Usage',
					data:[
						this.props.value,
						this.props.value+5,
						10,
						11

					],
					backgroundColor:[
						'rgba(77, 182, 92,0.8)',
						'rgba(77, 182, 92,0.8)',
						'rgba(77, 182, 92,0.8)',
						'rgba(77, 182, 92,0.8)'



					]

					}
				]
			}
		}

	}

	render(){


		return(
			<div>

				<h4 className="chartTitle">{this.props.title + ' ' + this.props.value}</h4>
				<div className="chart">

					<Bar
					data ={this.state.chartData}

					options={{
						legend:{
							display: false
						},

						scales: {
								yAxes: [{
										ticks: {
												beginAtZero: true
										}
								}]
						},

						maintainAspectRation: false
					}}
					/>
				</div>
			</div>



			);
	}
}

export default revChart;
