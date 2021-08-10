import React from 'react'
import ViewAdmins from './viewAdmins'
import AddAdmins from './addAdmins'

export default class HandleAdminsComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            Component: ViewAdmins
        }
    }

    handleComponent = e => {
        this.state.Component == ViewAdmins? this.setState({Component: AddAdmins}): this.setState({Component: ViewAdmins})
    }

render() {
    return(
        <div>
       { < this.state.Component handleComponent = {this.handleComponent} />}
        </div>

    )
}

}