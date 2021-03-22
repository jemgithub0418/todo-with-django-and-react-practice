import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { IoPencilSharp } from "react-icons/io5";
import {IoCheckmarkCircleSharp} from "react-icons/io5";
import {IoTrashBinSharp} from 'react-icons/io5';
import {IoCloseCircleSharp } from 'react-icons/io5';

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

    var url = "http://localhost:8000/api/task-create/"

    if(this.state.editing == true){
      url = `http://localhost:8000/api/task-update/${this.state.activeItem.id}/`
      this.state.editing = false
    }

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
    this.setState({
      activeItem:{
        ...this.state.activeItem,
        title:value,
      }
    })
  }


  handleEdit(task){
    this.setState({
      activeItem: task,
      editing:true,
    })
  }

  handleStatus(task){
    var url = `http://localhost:8000/api/task-update/${task.id}/`

    var csrftoken = this.getCookie('csrftoken')

    task.completed = !task.completed

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken' : csrftoken,
      },
      body:JSON.stringify({'completed': task.completed, 'title': task.title})
    }).then(() => {
      this.getTask()
    })
  }


  handleDelete(id){
    var url = `http://localhost:8000/api/task-delete/${id}/`

    var csrftoken = this.getCookie('csrftoken')

    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken' : csrftoken,
      },
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
                            <input id="submit" className="btn btn-warning" type="submit" value="Add Task"name="Add" />
                          </div>
                      </div>
                </form>

              </div>

              <div  id="list-wrapper">
                  {tasks.map(function(task, index){
                    return(
                        <div key={index} className="task-wrapper flex-wrapper">

                            <div onClick={() => self.handleStatus(task)} style={{flex:7}}>
                              {task.title}
                            </div>
                            <div style={{flex:1.5}}>
                              {task.batch}
                            </div>

                            <div onClick={()=> self.handleStatus(task)} style={{flex:0}}>
                            {task.completed == true ? (
                              <IoCheckmarkCircleSharp size="27px" color="green" />
                              ): (

                              <IoCloseCircleSharp size="27px" color="grey" />
                              )}

                            </div>

                           <div onClick={() => self.handleEdit(task)} style={{flex:0}}>
                                <IoPencilSharp size="24px" color="cornflowerblue" />
                            </div>

                            <div onClick={() => self.handleDelete(task.id)} style={{flex:0}}>
                                <IoTrashBinSharp size="24px" color="red" />
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
