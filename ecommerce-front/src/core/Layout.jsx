import React from 'react';
import Menu from './Menu';

const Layout = ({ title = 'Title', description = 'Description', className, children }) => (
    <div>
		<Menu />
		<div className="jumbotron">
			<h2>{title}</h2>
			<p className="lead">{description}</p>
		</div>
		<div className={className}>
			<div className="container">
				{children}
			</div>
		</div>
	</div>
);

export default Layout;