import React from 'react'
import IconButton from '../template/iconButton'

export default props => {
    const renderRows = () => {

        const list = props.list || []
        return list.map(todo => (
            <tr key={todo._id}>
                <td className={todo.done ? 'markedAsDone' : ''}>
                    {todo.description}
                </td>
                <td><IconButton style='success' icon='check' hide={todo.done}
                    onClick={() => props.handleMarkAsDone(todo)}></IconButton>
                </td>
                <td><IconButton style='warning' icon='undo' hide={!todo.done}
                    onClick={() => props.handleMarkAsPending(todo)}></IconButton></td>
                <td><IconButton style='danger' icon='trash-o' hide={!todo.done}
                    onClick={() => props.handleRemove(todo)}></IconButton>
                </td>
            </tr>
        ))

    }
    return (
        <table className='table'>
            <thead>
                <th>Descrição</th>
                <th className='tableActions'>Ações</th>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )
}