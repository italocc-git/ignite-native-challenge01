import React ,{Fragment} from 'react'
import {  Image, TouchableOpacity, View, Text, StyleSheet, FlatListProps, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png'
import { Task } from './TasksList';

interface ITaskItemProps {
    index: number;
    item : Task;
    toggleTaskDone : (id : number) => void;
    removeTask : (id : number) => void;
}


export function TaskItem({item,index , toggleTaskDone , removeTask}: ITaskItemProps){
    const [isEditing, setIsEditing] = React.useState(false);
    const [editedValue, setEditedValue] = React.useState(item.title)
    const textInputRef = React.useRef<TextInput>(null)
    
    function handleStartEditing(){

    }

    function handleCancelEditing(){

    }
    function handleSubmitEditing(){
        
    }
    
    
    return (
        <Fragment>
            <View>
              <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={() => toggleTaskDone(item.id)}
                //TODO - use onPress (toggle task) prop
              >
                <View 
                  testID={`marker-${index}`}
                  style={item.done ? styles.taskMarkerDone : styles.taskMarker}
                  //TODO - use style prop 
                >
                  { item.done && (
                    <Icon 
                      name="check"
                      size={12}
                      color="#FFF"
                    />
                  )}
                </View>

                <Text 
                style={item.done ? styles.taskTextDone : styles.taskText}
                  //TODO - use style prop
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              testID={`trash-${index}`}
              style={{ paddingHorizontal: 24 }}
              //TODO - use onPress (remove task) prop
              onPress={() => removeTask(item.id)}
            >
              <Image source={trashIcon} />
            </TouchableOpacity>
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
})