// @flow

import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const PanelRow = styled.div`
	border: 1px solid #eaeaea;
	margin: 15px 0;
	border-radius: 4px;
	background-color: white;
	padding: 10px;
`;

const PanelElement = styled.div`
	display: inline-block;
`;

const Image = styled.img`
	height: 30px;
	margin: 0 20px 10px 10px;
	display: inline-block;
`;

const IssueBody = styled.div`
	border-top: 1px solid #eaeaea;
	padding: 10px;
	margin-top: 5px;
`;

const BodyText = styled.pre`
	font-family: Arial;
	border: 1px solid #eaeaea;
	padding: 10px;
	margin: 10px 0 0 0;
	overflow: scroll;
	color: #313131;
`;

const PanelExtra = styled.p`
	font-size: 12px;
	color: grey;
	display: inline-block;
	padding: 0 30px 0 0;
`;

const IssueLink = styled.a`
	color: #2d66ba;
	text-decoration: none;
	&:hover {
		color: #0061ff;
	}
`;

const User = styled.a`
	color: grey;
	text-decoration: none;
	&:hover {
		color: #2d66ba;
	}
`;

const renderAssignee = assignee => {
	if (assignee) {
		return (
			<PanelExtra>
				Assignee:{' '}
				<User target="_blank" href={assignee.html_url}>
					{assignee.login}
				</User>
			</PanelExtra>
		);
	}
	return <PanelExtra />;
};

const removeComments = body => body.replace(/<!--[\s\S]*?-->/g, '');
const Row = (props: {
	title: string,
	updated_at: string,
	user: { login: string, html_url: string },
	body: string,
	assignee: { login: string, html_url: string },
	created_at: string,
	html_url: string
}) => (
	<PanelRow>
		<div>
			<Image alt="Issue" src="../public/img/issue.png" />
			<PanelElement>
				<IssueLink target="_blank" href={props.html_url}>
					<h3>{`${props.title}`}</h3>
				</IssueLink>
				<div>
					<PanelExtra>
						{`Opened ${moment(props.created_at).fromNow()} by `}
						<User target="_blank" href={props.user.html_url}>
							{props.user.login}
						</User>
					</PanelExtra>
					<PanelExtra>{`Last Updated ${moment(props.updated_at).fromNow()} `}</PanelExtra>
					{renderAssignee(props.assignee)}
				</div>
			</PanelElement>
		</div>
		<IssueBody>
			<h3>Issue Summary:</h3>
			<BodyText>{removeComments(props.body)}</BodyText>
		</IssueBody>
	</PanelRow>
);

Row.defaultProps = {
	login: '',
	assignee: ''
};

export default Row;
