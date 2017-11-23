import {TodoService} from '../index'
import TodoModel from '../../models/todo'
import {TodoStore} from '../../stores/index'
import {injectable, injectOnProperty} from '../../common/annotations/common'

@injectable('TodoService')
export default class DefaultTodoService implements TodoService {
  
  constructor(@injectOnProperty('TodoStore') private repository: TodoStore) {
  }
  
  createNew() {
    const name = Math.random()
                     .toString()
    const todo = new TodoModel(name)
    
    // simple load for sync operations
    this.repository.load('lastTodo', todo)
    
    // container doesn't guarantee result for existence
    const all = this.repository.get('all')
    this.repository.load('all', all.result ? [...all.result, todo] : [])
  }
  
  toggleTodo(todo: TodoModel) {
    this.repository.toggleTodo(todo)
  }
  
}
