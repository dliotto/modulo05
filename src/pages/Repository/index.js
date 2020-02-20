import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';

class Repository extends Component {
    // eslint-disable-next-line react/static-property-placement
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                repository: PropTypes.string,
            }),
        }).isRequired,
    };

    // eslint-disable-next-line react/state-in-constructor
    state = {
        repository: {},
        issues: [],
        loading: true,
    };

    async componentWillMount() {
        const { match } = this.props;

        const repoName = decodeURIComponent(match.params.repository);

        const [response, issues] = await Promise.all([
            api.get(`/repos/${repoName}`),
            api.get(`/repos/${repoName}/issues`, {
                params: {
                    state: 'open',
                    per_page: 5,
                },
            }),
        ]);

        this.setState({
            repository: response.data,
            issues: issues.data,
            loading: false,
        });

        console.log(response);
        console.log(issues);
    }

    render() {
        const { repository, issues, loading } = this.state;

        return <h1>Repository</h1>;
    }
}

export default Repository;
