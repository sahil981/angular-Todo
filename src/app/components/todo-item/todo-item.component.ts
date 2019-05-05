import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {Todo} from '../../Models/Todo';
import {TodoService} from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }
  // change dynamic class
  setClasses() {
    const classes = {
      todo: true,
      'is-complete': this.todo.completed
    }
    return classes;
  }

  // onToggleButton
 onToggle(todo) {
    // toggle UI
    todo.completed = !todo.completed;

    // toggle on server
   this.todoService.toggleCompleted(todo).subscribe(todo => {
     console.log(todo);
   })
  }

 onDelete(todo) {
  this.deleteTodo.emit(todo);
 }

}
