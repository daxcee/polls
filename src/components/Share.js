import React from 'react';
import { Link } from 'react-router';

const Share = (props) => <Link to={`/poll/${props.params.pollId}`}>{props.params.pollId}</Link>;

export default Share;
