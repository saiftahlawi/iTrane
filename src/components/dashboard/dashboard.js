import React from 'react'
import './dashboard.css'
import ReactLoading from 'react-loading';

export default class Dashboard extends React.Component {
  constructor() {
    super()
    this.state = {
      admins: null,
      trainers: null,
      trainees: null,
      requests: 0,
      registered: 0,
      traineesNumber: 0,
      deActivatedTrainees: 0,
      isLoaded: false,
      recentAdmin: null,
      recentTrainer: null,
      recentTrainee:  null

    }
  }

  componentDidMount() {
    fetch("http://localhost:3000/admins_number")
      .then(response => response.json())
      .then(data => {
        this.setState({
          admins: data.roles.admins,
          trainers: data.roles.trainers,
          trainees: data.roles.trainees,
          requests: data.numbers.requests,
        })
      })
      .then(async g => {
        const activatedTrainees = await this.state.trainees.filter(t => t = t.isActive)
        const deActivatedTrainees = await this.state.trainees.filter(t => t != t.isActive)
        const recentAdmin = await this.state.admins[this.state.admins.length - 1]
        const recentTrainee = await this.state.trainees[this.state.trainees.length - 1]
        const recentTrainer = await this.state.trainers[this.state.trainers.length - 1]
        this.setState({
          isLoaded: true,
          recentAdmin: recentAdmin,
          recentTrainee: recentTrainee,
          recentTrainer: recentTrainer,
          traineesNumber: activatedTrainees.length,
        })
      })
      .then(x => {
        const z =  this.state.traineesNumber + this.state.trainees.length + this.state.admins.length
        this.setState({
          registered: z
        })
      })
  }

  render() {

    return (
      <main class="mainDashBoard">
        <section class="statistics mt-4">
          <div class="row">
            <div class="col-lg-4">
              <div class="box d-flex rounded-2 align-items-center mb-4 mb-lg-0 p-3">
              <i class="uil-file fs-2 text-center fas fa-user-shield"></i>
                <div class="ms-3">

                  <div class="d-flex align-items-center">
                    <h3 class="mb-0">{this.state.isLoaded ? this.state.admins.length : <ReactLoading type='spin' color={'blue'} height={40} width={40} />}</h3> <span class="d-block ms-2">Admins</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="box d-flex rounded-2 align-items-center mb-4 mb-lg-0 p-3">
                <i class="uil-file fs-2 text-center fas fa-user"></i>
                <div class="ms-3">
                  
                  <div class="d-flex align-items-center">
                    <h3 class="mb-0">{this.state.isLoaded ? this.state.trainers.length : <ReactLoading type='spin' color={'blue'} height={40} width={40} />}</h3> <span class="d-block ms-2">Trainers</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="box d-flex rounded-2 align-items-center p-3">
              <i class="uil-file fs-2 text-center fas fa-id-card"></i>
                <div class="ms-3">
                  <div class="d-flex align-items-center">
                    <h3 class="mb-0">{this.state.isLoaded ? this.state.trainees.length : <ReactLoading type='spin' color={'blue'} height={40} width={40} />}</h3> <span class="d-block ms-2">Trainees</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/** */}
        <section class="charts mt-4">
          <div class="row">
            <div class="col-lg-6">
              <div class="chart-container rounded-2 p-3">
                <canvas id="myChart"></canvas>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="chart-container rounded-2 p-3">
                <canvas id="myChart2"></canvas>
              </div>
            </div>
          </div>
        </section>


        <section class="admins mt-4 recent-section">
        <div class="row recent">
            <div class="col-md-6">
              <div class="box">
                <h4>Recent Trainer</h4>
                <div className='adminsContainer'>
                  <div class="box" id='adminContainer' >

                    {this.state.isLoaded ?
                        <div class="nameContainer">
                          <p>
                          {this.state.recentTrainer.fullName}
                          </p>
                      </div>
                      : false}

                  </div>
                </div>

              </div>
            </div>

          </div>

          <div class="row recent">
            <div class="col-md-6">
              <div class="box">
                <h4>Recent Trainee</h4>
                <div className='adminsContainer'>
                  <div class="box" id='adminContainer' >

                    {this.state.isLoaded ?
                        <div class="nameContainer">
                          <p>
                          {this.state.recentTrainee.fullName}
                          </p>
                      </div>
                      : false}

                  </div>
                </div>

              </div>
            </div>

          </div>

          <div class="row recent">
            <div class="col-md-6">
              <div class="box">
                <h4>Recent Trainer</h4>
                <div className='adminsContainer'>
                  <div class="box" id='adminContainer' >

                    {this.state.isLoaded ?
                        <div class="nameContainer">
                          <p>
                          {this.state.recentAdmin.fullName}
                          </p>
                      </div>
                      : false}

                  </div>
                </div>

              </div>
            </div>

          </div>


        </section>

        <section class="statis mt-4 text-center">
          <div class="row">
            <div class="col-md-6 col-lg-3 mb-4 mb-lg-0">
              <div class="box bg-primary p-3">
                <i class="uil-eye"></i>
                <h3 className='stat-info'>{this.state.requests}</h3>
                <p class="lead">Number of Requests</p>
              </div>
            </div>

            <div class="col-md-6 col-lg-3 mb-4 mb-md-0">
              <div class="box bg-warning p-3">
                <i class="uil-shopping-cart"></i>
                <h3 className='stat-info'>{this.state.registered}</h3>
                <p class="lead">Registered</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="box bg-success p-3">
                <i class="uil-feedback"></i>
                <h3 className='stat-info'>{this.state.traineesNumber}</h3>
                <p class="lead">Activated Trainees</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3 mb-4 mb-lg-0">
              <div class="box bg-danger p-3">
                <i class="uil-user"></i>
                <h3 className='stat-info'>{this.state.deActivatedTrainees}</h3>
                <p class="lead">Deactivated Trainees</p>
              </div>
            </div>
          </div>
        </section>

        <section class="charts mt-4">
          <div class="chart-container p-3">
            <h2></h2>
            <div style={{ height: '300px' }}>
              <canvas id="chart3" width="100%"></canvas>
            </div>
          </div>
        </section>




      </main>
    )
  }
}