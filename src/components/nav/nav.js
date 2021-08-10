
import React from 'react'
import './nav.css'
import Dashboard from '../dashboard/dashboard'
import Trainers from '../trainers/trainers'
import TraineeExams from '../traineeExams/traineeExams'
import HandleAdminsComponent from '../admins/handleAdminsComponent'
import { Translation } from 'react-i18next';
import AcceptTrainees from '../acceptTrainees/acceptTrainees'
import Settings from '../settings/settings'
import History from '../history/history'
import i18n from '../../i18n';


export default class Nav extends React.Component {
    constructor() {
        super()
        this.state = {
            Component: 'dashboard',
            lang: localStorage.getItem('lang'),
            adminType: localStorage.getItem("adminType")
        }
    }
    handleFocus = e => {
        this.setState({
            Component: e
        })
    }

    changeLanguage = (lng) => {
        localStorage.setItem('lang', lng)
        window.location.reload();
        //i18n.changeLanguage(lng);
    }


    render() {
        return (
            <Translation >
                {
                    (t) => <aside class="sidenav">
                        <div class="sidenav__close-icon">
                            <i class="fas fa-times sidenav__brand-close"></i>
                        </div>
                        <div>
                            <div class="logo_container">
                                <h1 class="logo">iTrain</h1>
                                <h6 style={{ fontFamily: 'monospace' }}>{t('dashboard')}</h6>
                            </div>
                        </div>
                        <ul class="sidenav__list">

                            <li onClick={() => {
                                this.handleFocus('dashboard')
                                this.props.handleComponent(Dashboard)
                            }} style={this.state.Component === 'dashboard' ? { background: 'rgba(255, 255, 255, 0.76)' } : { backgroundColor: '' }} class="sidenav__list-item"><i class="fas fa-tachometer-alt"></i> {t('dashboard')}

                            </li>

                            <li onClick={() => {
                                this.handleFocus('admins')
                                this.props.handleComponent(HandleAdminsComponent)
                            }} style={this.state.Component === 'admins' ? { background: 'rgba(255, 255, 255, 0.76)' } : { backgroundColor: '' }} class="sidenav__list-item"><i class="fas fa-user-shield"></i> {t('Admins')}

                            </li>

                            <li onClick={() => {
                                this.handleFocus('trainers')
                                this.props.handleComponent(Trainers)

                            }} style={this.state.Component === 'trainers' ? { background: 'rgba(255, 255, 255, 0.76)' } : { backgroundColor: '' }} class="sidenav__list-item"><i class="fas fa-user-alt"></i> {t('trainers')}</li>

                            <li onClick={() => {
                                this.handleFocus('Trainees Approval')
                                this.props.handleComponent(AcceptTrainees)

                            }} style={this.state.Component === 'Trainees Approval' ? { background: 'rgba(255, 255, 255, 0.76)' } : { backgroundColor: '' }} class="sidenav__list-item"><i class="fas fa-address-card"></i> {t('traineesApproval')}</li>

                            <li onClick={() => {
                                this.handleFocus('TraineeExams')
                                this.props.handleComponent(TraineeExams)

                            }} style={this.state.Component === 'TraineeExams' ? { background: 'rgba(255, 255, 255, 0.76)' } : { backgroundColor: '' }} class="sidenav__list-item"><i class="fas fa-address-card"></i> {t('trainees exams')}</li>

                            <li  onClick = {() => {this.props.handleComponent(History) 
                            this.handleFocus('History')}}  style={this.state.Component === 'History' ? { background: 'rgba(255, 255, 255, 0.76)' } : { backgroundColor: '' }} class="sidenav__list-item"><i class="fas fa-history"></i> {t('History')}</li>
                            {this.state.adminType === 'Super admin'? <li  onClick = {() => {this.props.handleComponent(Settings) 
                            this.handleFocus('Settings')}}  style={this.state.Component === 'Settings' ? { background: 'rgba(255, 255, 255, 0.76)' } : { backgroundColor: '' }} class="sidenav__list-item"><i class="fas fa-cog"></i> {t('settings')}</li>  : false}
                           
                            
                            <li onClick={() => {
                                localStorage.clear();
                                localStorage.setItem("loggedIn","false")
                                window.location.reload(false);

                            
                            }}  class="sidenav__list-item"> <i class="fas fa-sign-out-alt"></i> {t('logout')}

                            </li>

                            <ul className='lang-ul'>
                                <li style={this.state.lang === 'en' ? { color: '#fff' } : { color: ' rgb(70, 70, 70)' }} onClick={() => {
                                    this.changeLanguage('en');
                                    this.setState({ 'lang': 'en' })

                                }

                                }
                                    className='langs'>ENG</li>
                                <li className='span-line '></li>
                                <li style={this.state.lang === 'ar' ? { color: '#fff' } : { color: ' rgb(70, 70, 70)' }} onClick={() => {
                                    this.changeLanguage('ar');
                                    this.setState({ 'lang': 'ar' })
                                }

                                } className='langs'>عربي</li>

                            

                            </ul>
                        </ul>
                    </aside>
                }
            </Translation>

        )

    }


}
