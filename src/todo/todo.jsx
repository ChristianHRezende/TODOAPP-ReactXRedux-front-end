import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3003/api/todos'

export default class Todo extends Component {
    constructor(props) {
        super(props)
        this.state = { description: '', list: [] }

        this.handleChange = this.handleChange.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
        this.handleHandleSearch = this.handleHandleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)

        this.refresh();
    }

    /**Update list */
    refresh(description = '') {
        const search = description ? `&description__regex=/${description}/` : ''
        axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp => this.setState({ ...this.state, description, list: resp.data }))

    }

    /**Controla evento de click do botão de pesquisa */

    handleHandleSearch() {
        this.refresh(this.state.description)
    }
    /**Controla evento de click do botão de limpa campo pesquisa */

    handleClear() {
        this.refresh()
    }

    /**Controla evento de mudança do input */
    handleChange(e) {
        this.setState({ ...this.state, description: e.target.value })
    }

    /**Controla evento de click do botão de add */

    handleAdd() {
        const description = this.state.description
        axios.post(URL, { description }).then(resp => this.refresh())
    }


    /**Controla evento de click do botão de deletar*/

    handleRemove(todo) {
        axios.delete(`${URL}/${todo._id}`).then(resp => this.refresh(this.state.description))
    }

    /**Controla evento de click do botão de marcar como feito*/

    handleMarkAsDone(todo) {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: true }).then(resp => this.refresh(this.state.description))
    }


    /**Controla evento de click do botão de marcar como não feito*/

    handleMarkAsPending(todo) {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: false }).then(resp => this.refresh(this.state.description))
    }

    render() {
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
                <TodoForm
                    handleAdd={this.handleAdd}
                    handleChange={this.handleChange}
                    handleHandleSearch={this.handleHandleSearch}
                    handleClear={this.handleClear}
                    description={this.state.description}
                />
                <TodoList
                    list={this.state.list}
                    handleRemove={this.handleRemove}
                    handleMarkAsDone={this.handleMarkAsDone}
                    handleMarkAsPending={this.handleMarkAsPending}
                />
            </div>
        )
    }
}