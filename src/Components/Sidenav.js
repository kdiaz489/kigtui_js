import React, {Component} from 'react';
import '../App.css';
import './Sidenav.css';
import Logo from '../images/logotrans.png';
import ProfilePic from '../images/woman.jpg';


class Sidenav extends Component{
	render(){

		return(
		<div className="wrapper">
			<nav className="sidebar">
				<div className="sidebarHeader">
					<img src={Logo} className="logo" alt=" " />
				</div>


					<div className="circularImg">
						<img src={ProfilePic} className="profilePic" alt=" " />
					</div>

				<h6 className="profileName">Name</h6>


				<ul className="list-unstyled components">
					<li>
		                <a href="https://youtube.com">Dashboard</a>

		            </li>
		            <li>
		                <a href="#">Advertisers</a>
		            </li>
		            <li>
		                <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Fleet Manager</a>
		                <ul className="collapse list-unstyled" id="pageSubmenu">
		                    <li>
		                        <a href="#">Page 1</a>
		                    </li>
		                    <li>
		                        <a href="#">Page 2</a>
		                    </li>
		                    <li>
		                        <a href="#">Page 3</a>
		                    </li>
		                </ul>
		            </li>
		            <li>
		            	<a href="#">Utilities</a>
		            </li>
		            <li>
		                <a href="#">V2G</a>
		            </li>


				</ul>

			</nav>
			</div>



			);



	}


}

export default Sidenav;
