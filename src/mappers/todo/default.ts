import {computed} from 'mobx';
import {TodoMapper} from 'Mappers';
import Todo from '../../models/todo';
import {TodoRecordStorage} from '../../storages';
import {injectConstructor, mapper} from '../../common/annotations/dependency-injection';
import BaseMapper from '../../common/mappers/base/base';

@mapper('Todo')
export default class DefaultTodoMapper extends BaseMapper implements TodoMapper {
  constructor(@injectConstructor('TodoRecordStorage') protected store: TodoRecordStorage) {
    super()
  }

  get all(): Todo.Model[] {
    return this.store.getAll().list
  }

  @computed
  get unfinishedTodoCount(): number {
    return this.all.filter(it => !it.finished).length
  }

  get lastOne() {
    return this.store.get('lastTodo')._
  }
}
