import React from 'react';
import Layout from './Layout'

const Home = () => (
    <Layout title="Home Page" description="node ecommerce app">
		{window.location.hostname}
	</Layout>
)

export default Home;