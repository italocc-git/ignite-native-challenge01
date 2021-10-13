import React, { useState } from 'react';
import {Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { EditedTask, Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';



export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
  
    const findTask = tasks.find(task => task.title === newTaskTitle)

    if(findTask){
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
    }
    
    setTasks(oldState => [...oldState , {
      id: new Date().getTime(),
      title : newTaskTitle,
      done : false,
    }])
  }

  function handleEditTask({taskId , taskNewTitle} : EditedTask) {
    setTasks(tasks.map(task => task.id === taskId ? ({
      ...task,
      title : taskNewTitle,
    }) : task
    ))
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    
    setTasks(tasks.map(task => task.id === id ? ({
      ...task,
      done : !task.done
    }):
    task
    ))
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    
    Alert.alert('Remover item' , 'Tem certeza que deseja remover esse item ?',[
      {
        text: 'Não',
        style : 'cancel'
      },
      {
        text: 'Sim',
        onPress : () => {
          setTasks(tasks.filter(task => task.id !== id))
        }
      }
    ])
    
    
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})