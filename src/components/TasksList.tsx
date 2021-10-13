import React from 'react';
import { FlatList,  } from 'react-native';


import { ItemWrapper } from './ItemWrapper';
import { TaskItem } from './TaskItem';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

export interface EditedTask  {
  taskId : number;
  taskNewTitle : string;
}


interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask : ({taskId , taskNewTitle}: EditedTask) => void;
}

export function TasksList({ tasks, toggleTaskDone, removeTask }: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TaskItem index={index} item={item} toggleTaskDone={toggleTaskDone} removeTask={removeTask}/>
          </ItemWrapper>
        )
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}

