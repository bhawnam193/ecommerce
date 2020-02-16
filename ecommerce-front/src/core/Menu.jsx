import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth'

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: '#ff9900' }
    } else {
        return { color: '#ffffff' }
    }
}

const Menu = ({ history }) => {

    const { user } = isAuthenticated();

    return (
        <div>
			<ul className="nav nav-tabs bg-primary">
				<li className="nav-item">
					<Link className="nav-link" to="/" style={isActive(history, '/')}>Home </Link>
				</li>
				{ user && user.role === 0 && (
					<li className="nav-item">
						<Link className="nav-link" to="/user/dashboard" style={isActive(history, '/user/dashboard')}>Dashboard </Link>
					</li>
				)}

				{user && user.role === 1 && (
					<li className="nav-item">
						<Link className="nav-link" to="/admin/dashboard" style={isActive(history, '/admin/dashboard')}>Dashboard </Link>
					</li>
				)}
				

				{!user && (
					<Fragment>
						<li className="nav-item">
							<Link className="nav-link" to="/user/dashboard" style={isActive(history, '/user/dashboard')}>Dashboard </Link>
						</li>
						<li className="item">
							<Link className="nav-link" to="/signin" style={isActive(history, '/signin')}>Sign in</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/signup" style={isActive(history, '/signup')}>Sign up</Link>
						</li>
					</Fragment>
				)}

				{user && (
					<li className="nav-item">
						<span className="nav-link" to="/signup" style={{cursor: 'pointer', color: '#ffffff'}} onClick={ () => signout( () => {
							history.push('/')
						}) }>Sign out</span>
					</li>
				)}
				
			</ul>
		</div>
    )
}

export default withRouter(Menu);