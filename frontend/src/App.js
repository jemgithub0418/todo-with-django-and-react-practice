import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { IoPencilSharp } from "react-icons/io5";
import {IoCheckmarkCircleSharp} from "react-icons/io5";


class App  extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      taskList:[],
      activeItem: {
        id: null,
        title:"",
        completed: false,
        batch: null,
      },
      editing: false,
    }
    this.getTask = this.getTask.bind(this);
    this.getCookie = this.getCookie.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }

  componentDidMount(){
    this.getTask()
  }

  getTask(){
    var url = "http://localhost:8000/api/task-list/"

    fetch(url)
    .then((response) => response.json())
    .then(data =>
      this.setState({
          taskList:data,
        })
      )
  }


  handleSubmit(e){
    e.preventDefault()
    console.log('ITEM:', this.state.activeItem)

    var url = "http://localhost:8000/api/task-create/"
    var csrftoken = this.getCookie('csrftoken')

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken' : csrftoken,
      },
      body: JSON.stringify(this.state.activeItem)
    }).then((response) => {
      this.getTask()
      this.setState({
        activeItem: {
          id: null,
          title: "",
          completed: false,
          batch: null
        }
      })
    }).catch(function(error){
          console.log(error)
      })
  }

  handleChange(e){
    var name = e.target.name
    var value = e.target.value
    console.log(name, value)

    this.setState({
      activeItem:{
        ...this.state.activeItem,
        title:value,
      }
    })
  }

  render(){
    var tasks = this.state.taskList
    var self = this
    return(
        <div className="container">

          <div id="task-container">
              <div  id="form-wrapper">
                 <form id="form" onSubmit={this.handleSubmit}>
                    <div className="flex-wrapper">
                        <div style={{flex: 6}}>
                            <input onChange={this.handleChange}  className="form-control" id="title" value={this.state.activeItem.title} type="text" name="title" placeholder="Add task.." />
                         </div>

                         <div style={{flex: 1}}>
                            <input id="submit" className="btn btn-warning" type="submit" name="Add" />
                          </div>
                      </div>
                </form>

              </div>

              <div  id="list-wrapper">
                  {tasks.map(function(task, index){
                    return(
                        <div key={index} className="task-wrapper flex-wrapper">

                            <div style={{flex:7}}>
                              {task.title}
                            </div>
                            <div style={{flex:2}}>
                              {task.batch}
                            </div>

                            <div style={{flex:1}}>
                                <button className="btn btn-sm btn-outline-info">Edit</button>
                            </div>

                            <div style={{flex:1}}>
                                <button className="btn btn-sm btn-outline-dark delete">-</button>
                            </div>
                          </div>

                      )
                  })}

              </div>
          </div>

        </div>
    )
  }

}
export default App;
