import React, { Component } from 'react';

import { FaGithubAlt, FaPlus } from 'react-icons/fa';

import api from '../../services/api';

import { Container, Form, SubmitButton } from './styles';

class Main extends Component {
    // eslint-disable-next-line react/state-in-constructor
    state = {
        newRepo: '',
    };

    handleInputChange = e => {
        this.setState({ newRepo: e.target.value });
    };

    handleSubmit = async e => {
        e.preventDefault();

        const { newRepo } = this.state;

        const response = await api.get(`/repos/${newRepo}`);

        console.log(response.data);
    };

    // https://api.github.com/repos/dliotto/desafio04

    render() {
        const { newRepo } = this.state;

        return (
            <Container>
                <h1>
                    <FaGithubAlt />
                    Repositórios
                </h1>

                <Form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder="Adicionar Repositório"
                        value={newRepo}
                        onChange={this.handleInputChange}
                    />

                    <SubmitButton>
                        <FaPlus color="#FFF" size={14} />
                    </SubmitButton>
                </Form>
            </Container>
        );
    }
}

export default Main;
