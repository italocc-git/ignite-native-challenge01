import React ,{Fragment, useEffect} from 'react'
import {  Image, TouchableOpacity, View,  StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png'
import { Task , EditedTask} from './TasksList';

interface ITaskItemProps {
    index: number;
    task : Task;
    toggleTaskDone : (id : number) => void;
    removeTask : (id : number) => void;
    submitEditTask : (task : EditedTask) => void;
}


export function TaskItem({task,index , toggleTaskDone , removeTask , submitEditTask}: ITaskItemProps){
    const [isEditing, setIsEditing] = React.useState(false);
    const [editedValue, setEditedValue] = React.useState(task.title)
    const textInputRef = React.useRef<TextInput>(null)
    
    function handleStartEditing(){
      setIsEditing(true)
    }

    function handleCancelEditing(){
      setIsEditing(false);
      setEditedValue(task.title)
    }
    function handleSubmitEditing(taskId : number){
      
      submitEditTask({
        taskId ,
        taskNewTitle : editedValue
      })
      setIsEditing(false);

    }
    
    useEffect(() => {
      if(textInputRef.current){
        if(isEditing){
          textInputRef.current.focus()
        }
        else {
          textInputRef.current.blur()
        }
      }
     
    },[isEditing])
    return (
        <Fragment>
            <View>
              <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={() => toggleTaskDone(task.id)}
                //TODO - use onPress (toggle task) prop
              >
                <View 
                  testID={`marker-${index}`}
                  style={task.done ? styles.taskMarkerDone : styles.taskMarker}
                  //TODO - use style prop 
                >
                  { task.done && (
                    <Icon 
                      name="check"
                      size={12}
                      color="#FFF"
                    />
                  )}
                </View>

                <TextInput 
                style={task.done ? styles.taskTextDone : styles.taskText}
                  value={editedValue} onChangeText={setEditedValue}
                  editable={isEditing} onSubmitEditing={() => handleSubmitEditing(task.id)} 
                    ref={textInputRef}
                >
                  
                </TextInput>
              </TouchableOpacity>
            </View>
            <View style={styles.iconsContainer} >
              {isEditing ? (
                <TouchableOpacity onPress={handleCancelEditing}>
                    <Icon 
                      name="x"
                      size={24}
                      color="#B2B2B2"
                    />
                </TouchableOpacity>
                )
                : (
                  <TouchableOpacity onPress={handleStartEditing}>
                      <Icon 
                      name="edit"
                      size={20}
                      color="#B2B2B2"
                    />
                  </TouchableOpacity>
                )
              }
              
              <TouchableOpacity
                disabled={isEditing}
                testID={`trash-${index}`}
                style={{ paddingHorizontal: 24 }}
                //TODO - use onPress (remove task) prop
                onPress={() => removeTask(task.id)}
              >
                <Image source={trashIcon} style={{opacity : isEditing ? 0.3 : 1}}/>
              </TouchableOpacity>
            </View>
            
        </Fragment>
    )
}

const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
      },
        
        taskMarker: {
            height: 16,
            width: 16,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: '#B2B2B2',
            marginRight: 15,
            alignItems: 'center',
            justifyContent: 'center'
        },
      taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
      },
      taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
      },
      taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
      },
      iconsContainer : {
        flexDirection:'row',
        alignItems: 'center',
        


      },
})