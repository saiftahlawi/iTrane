import React from 'react'
import { Translation } from 'react-i18next';
import AddTrainers from '../addTrainers/addTrainers'
import ViewTrainers from './viewTrainers'

export default class Trainers extends React.Component {
    constructor() {
        super()
        this.state = {
            component: ViewTrainers
        }
    }

    handleComponent = e => {
        this.state.component === ViewTrainers ? this.setState({ component: AddTrainers }) : this.setState({ component: ViewTrainers })
    }


    render() {
        return (
            <div>
                {< this.state.component handleComponent={() => { this.handleComponent() }} />}
            </div>
        )
    }
}