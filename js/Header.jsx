// @flow

import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props: { handleSearchTermChange?: Function, searchTerm?: string }) => (
	<header>
		<div className="wrapper">
			<div>
				<Link to="/">
					<img alt="github logo" src="../public/img/github.png" />
					<h1>GitHub</h1>
					<small>Issues</small>
				</Link>
				<input
					onChange={props.handleSearchTermChange}
					value={props.searchTerm}
					type="text"
					placeholder="Search Issues"
				/>
			</div>
		</div>
	</header>
);

Header.defaultProps = {
	showSearch: false,
	handleSearchTermChange: function noop() {},
	searchTerm: ''
};

export default Header;
