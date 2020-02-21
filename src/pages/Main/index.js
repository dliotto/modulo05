import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import Container from '../../components/Container';

import api from '../../services/api';

import { Form, SubmitButton, List, Remove } from './styles';

class Main extends Component {
    // eslint-disable-next-line react/state-in-constructor
    state = {
        newRepo: '',
        repositories: [],
        loading: false,
        erro: false,
    };

    // Carregar os dados do localstorage
    componentDidMount() {
        const repositories = localStorage.getItem('repositories');

        if (repositories) {
            this.setState({ repositories: JSON.parse(repositories) });
        }
    }

    // Salvar os dados do localstorage
    componentDidUpdate(_, prevState) {
        const { repositories } = this.state;

        if (prevState.repositories !== repositories) {
            localStorage.setItem('repositories', JSON.stringify(repositories));
        }
    }

    handleInputChange = e => {
        this.setState({ newRepo: e.target.value });
    };

    handleSubmit = async e => {
        e.preventDefault();

        this.setState({ loading: true });

        const { newRepo, repositories } = this.state;

        try {
            if (repositories.indexOf(newRepo) !== -1) {
                const response = await api.get(`/repos/${newRepo}`);

                const data = {
                    name: response.data.full_name,
                };

                this.setState({
                    repositories: [...repositories, data],
                    newRepo: '',
                });
            } else {
                throw new Error('Repositório duplicado');
            }
        } catch (error) {
            console.log(error.message);
            this.setState({
                loading: false,
                erro: true,
            });
        }
    };

    handleRemove = repository => {
        this.setState({
            repositories: this.state.repositories.filter(t => t != repository),
        });
    };

    // https://api.github.com/repos/dliotto/desafio04

    render() {
        const { newRepo, loading, repositories, erro } = this.state;

        return (
            <Container>
                <h1>
                    <FaGithubAlt />
                    Repositórios
                </h1>

                <Form onSubmit={this.handleSubmit} erro={erro}>
                    <input
                        type="text"
                        placeholder="Adicionar Repositório"
                        value={newRepo}
                        onChange={this.handleInputChange}
                    />

                    <SubmitButton loadin={loading}>
                        {loading ? (
                            <FaSpinner color="#FFF" size={14} />
                        ) : (
                            <FaPlus color="#FFF" size={14} />
                        )}
                    </SubmitButton>
                </Form>
                <List>
                    {repositories.map(repository => (
                        <li key={repository.name}>
                            <span>{repository.name}</span>
                            <Link
                                to={`/repository/${encodeURIComponent(
                                    repository.name
                                )}`}
                            >
                                Detalhes
                            </Link>
                            <Remove>
                                <a
                                    href=""
                                    onClick={() =>
                                        this.handleRemove(repository)
                                    }
                                >
                                    Remover
                                </a>
                            </Remove>
                        </li>
                    ))}
                </List>
            </Container>
        );
    }
}

export default Main;
