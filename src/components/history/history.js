import React from 'react'
import './history.css'
import { Translation } from 'react-i18next';

export default class History extends React.Component {
    constructor() {
        super()
        this.ref = React.createRef();
        this.state = {
            History: [],
            adminType: localStorage.getItem('adminType')

        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/history')
            .then(data => data.json())
            .then(response => this.setState({
                History: response,
            }))
    }

    componentDidUpdate() {
        fetch('http://localhost:3000/history')
            .then(data => data.json())
            .then(response => this.setState({
                History: response,
            }))
    }

    clearHistory = e => {
        fetch('http://localhost:3000/clear_history')
    }


    render() {
        return (
            <Translation>
                {(t) =>

                    <main id="trainers">
                    
                        {this.state.adminType === 'Super admin'?
                         <div className='addTrainerContainer'>
                            <button onClick={this.clearHistory} className="button danger" style={{ padding: 2 }}>{t('clearHistory')}</button>
                        </div> : false}

                        <table class="table table-bordered grocery-crud-table table-hover">
                            <thead style={{ width: '100%' }}>
                                <tr>
                                    <th className='ths'>{t("date")}</th>
                                    <th className='ths'>{t("adminName")}</th>
                                    <th className='ths'>{t("action")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.History.map(h => {
                                    return (
                                        <tr>
                                            <td>
                                                {h.Date}
                                            </td>

                                            <td>

                                                {h.admin} </td>

                                            <td>
                                                {h.action}
                                            </td>

                                        </tr>
                                    )
                                })}



                            </tbody>

                        </table>



                    </main>
                }

            </ Translation >
        )
    }
}