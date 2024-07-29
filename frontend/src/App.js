import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from 'axios';  
import authService from "./services/authService";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false
      },
      taskList: [],
      user: null,
    };
  }

  // Add componentDidMount()
  //componentDidMount() {
   // this.refreshList();
 // }

 componentDidMount() {
  const user = authService.getCurrentUser();
  if (user) {
    this.setState({ user }, this.refreshList);
  }
}

 
  refreshList = () => {
    axios   //Axios to send and receive HTTP requests
      .get("http://localhost:8000/api/tasks/")
      .then(res => this.setState({ taskList: res.data }))
      .catch(err => console.log(err));
  };


  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };

  //register, login, logout
  /*handleRegister = (username, email, password) => {
    authService.register(username, email, password).then(() => {
      this.handleLogin(username, password);
    });
  };*/
  handleRegister = (username, email, password) => {
    this.handleLogin(username, password);
  };
  /*handleRegister = (username, email, password) => {
    console.log('Registration successful:', { username, email, password });
    this.handleLogin(username, password);
  };*/


   handleLogin = (username, password) => {
    authService.login(username, password).then(user => {
      this.setState({ user }, this.refreshList);
    });
  };

  


  // handleLogin = (username, password) => {
  //   console.log(`Logging in with: {username: '${username}', password: '${password}'}`);
  //   authService.login(username, password).then(user => {
  //     this.setState({ user }, this.refreshList);
  //   }).catch(error => {
  //     if (error.response && error.response.status === 401) {
  //       alert('Login failed: Invalid username or password');
  //     } else {
  //       alert('An error occurred during login. Please try again later.');
  //     }
  //     console.error('Login error details:', error.response ? error.response.data : error.message);
  //   });
  // };
   handleLogout = () => {
      authService.logout();
      this.setState({ user: null });
     };

  //end of register, login, logout

  


  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          completed
            </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Incompleted
            </span>
      </div>
    );
  };

  // Main variable to render items on the screen
  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.taskList.filter(
      item => item.completed === viewCompleted
    );
    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${this.state.viewCompleted ? "completed-todo" : ""
            }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            onClick={() => this.editItem(item)}
            className="btn btn-secondary mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => this.handleDelete(item)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };
  // ///////////////////////////////////////////////////////////

  ////add this after modal creation
  toggle = () => {//add this after modal creation
    this.setState({ modal: !this.state.modal });//add this after modal creation
  };
  // handleSubmit = item => {//add this after modal creation
  //   this.toggle();//add this after modal creation
  //   alert("save" + JSON.stringify(item));//add this after modal creation
  // };

  // Submit an item
  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      // if old post to edit and submit
      axios
        .put(`http://localhost:8000/api/tasks/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    // if new post to submit
    axios
      .post("http://localhost:8000/api/tasks/", item)
      .then(res => this.refreshList());
  };

  // Delete item
  handleDelete = item => {
    axios
      .delete(`http://localhost:8000/api/tasks/${item.id}/`)
      .then(res => this.refreshList());
  };
  // handleDelete = item => {//add this after modal creation
  //   alert("delete" + JSON.stringify(item));//add this after modal creation
  // };

  // Create item
  createItem = () => {
    const item = { title: "", description: "", completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  //Edit item
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };


  // -I- Start by visual effects to viewer
  render() {
    const { user } = this.state;

    return (
      <main className="content">
        <h1 className="text-black text-uppercase text-center my-4">Task Manager</h1>
        {!user ? (
           <div className="row">
           <div className="col-md-6 col-sm-10 mx-auto p-0">
             <div className="card p-3">
               <Register onRegister={this.handleRegister} />
               <Login onLogin={this.handleLogin} />
             </div>
           </div>
         </div>
       ) : (
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
          
              <div className="">
                <button onClick={this.createItem} className="btn btn-primary">
                  Add task
                    </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
            <Logout onLogout={this.handleLogout} />
          </div>
        </div>
         )}
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}


export default App;
