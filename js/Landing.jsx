// @flow

import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import Header from './Header';
import Row from './Row';

const perPage = 100;

class Landing extends Component {
	state = {
		apiData: [],
		page: 1,
		searchTerm: ''
	};
	componentDidMount() {
		this.getData();
	}

	getData() {
		axios
			.get(
				`https://api.github.com/repos/angular/angular/issues?sort=created&page=${
					this.state.page
				}&per_page=${perPage}&state=open&since=${moment()
					.subtract(7, 'days')
					.format()}`
			)
			.then(response => {
				const stateData = this.state.apiData;
				response.data.map(element => {
					stateData.push(element);
					return element;
				});

				this.setState({ apiData: stateData });

				if (response.data.length === perPage) {
					this.setState({ page: this.state.page + 1 });
					this.getData();
				}
			});
	}

	handleSearchTermChange = (event: SyntheticKeyboardEvent & { target: HTMLInputElement }) => {
		this.setState({ searchTerm: event.target.value });
	};

	render() {
		return (
			<div className="landing">
				<Header searchTerm={this.state.searchTerm} handleSearchTermChange={this.handleSearchTermChange} />
				<div className="wrapper">
					<div className="landing-body">
						<div className="landing-header">
							<h1>Angular Issues</h1>
						</div>
						{this.state.apiData
							.filter(
								issue =>
									`${issue.title}`.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) >= 0
							)
							.map(issue => <Row key={issue.id} {...issue} />)}
					</div>
				</div>
			</div>
		);
	}
}

export default Landing;
