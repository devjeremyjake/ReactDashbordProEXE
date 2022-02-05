import { Component } from 'react';
import { Link } from 'react-router-dom';
import * as RouteLink from '../helpers/Routes';

class ErrorBoundary extends Component {
	constructor() {
		super();
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	render() {
		if (this.state.hasError) {
			return (
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<h1>Something went wrong.</h1>
					<Link to={RouteLink.Home}>Go To Home</Link>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
