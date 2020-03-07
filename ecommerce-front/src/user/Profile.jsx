import React from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';

const Profile = () => {
	return(
		<Layout title="View/ Update Your Profile" description={`G'day $!`}>
			<div className="row">
				<div className="col-3">
					
				</div>
				<div className="col-9">
					
				</div>
			</div>
		</Layout>
	)
}

export default Profile;