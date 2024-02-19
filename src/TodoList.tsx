import { Box, Button, Flex, FormLabel, Heading, Input, List, ListItem, Select } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { filterdTodoListState, optionOfFilter, optionOfStatus, todoListState } from './states/state';
import { input } from './types/Input';


const TodoList = () => {
    const optionListOfFilter = useRecoilValue(optionOfFilter)
    const optionListOfStatus = useRecoilValue(optionOfStatus)
    const [todoList, setTodoList] = useRecoilState(todoListState)
    const [filterdTodoList, setFilterdTodoList] = useRecoilState(filterdTodoListState)
    const [filterValue, setFilterValue] = useState<string>('すべて');
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editTodoId, setEditTodoId] = useState<number | null>(null);
    const [editingTodo, setEditingTodo] = useState({});
  

    const onChangeFilter = (e:  React.ChangeEvent<HTMLSelectElement>) => {
        setFilterValue(e.target.value)
        const targetTodoList = todoList.filter(todo => e.target.value === 'すべて' ? true : todo.status === e.target.value)
        setFilterdTodoList(targetTodoList)
    }
    
    useEffect(() => {
        const targetTodoList = todoList.filter(todo => filterValue === 'すべて' ? true : todo.status === filterValue)
        setFilterdTodoList(targetTodoList)
    }, [todoList])
  
    const onClickComplete = (targetTodoId: number) => {
        const newTodoList: input[] = todoList.map( todo => {
          if (todo.id === targetTodoId) {
            return {...todo, ...editingTodo}
          } else {
            return todo
          }
        })
        setTodoList(newTodoList)
    
        setIsEdit(false)
        setEditTodoId(null)
    }

    const onClickDelete = (deleteTargetId: number) => {
        setTodoList(todoList.filter(todo => todo.id !== deleteTargetId))
    }
    
    const onClickEdit = (targetTodoId: number) => {
        setIsEdit(true)
        setEditTodoId(targetTodoId)
    }
    
    

    return (
        <Box m='30px' px={'40px'} py={'10px'} rounded='lg' bg='blue.50' >
            <Heading as='h2' fontWeight='bold' fontSize={'25px'} textAlign={'center'}>
            ToDo一覧
            </Heading>

            <Flex textAlign={'center'} alignItems={'center'} mb={'20px'}>
            <FormLabel w={'100px'}>フィルター：</FormLabel>
            <Select w={'120px'} defaultValue='すべて' onChange={(e) => onChangeFilter(e)}>
                {optionListOfFilter.map( val => <option value={val}>{val}</option>)}
            </Select>   
            </Flex>
            <Box borderBottom="1px solid gray"></Box>

            <List spacing={5}>
                {filterdTodoList.map(todo => {
                    if (isEdit && todo.id === editTodoId) {
                    // 編集時のToDoの表示
                    return(
                        <ListItem>
                        <Flex textAlign={'center'} alignItems={'center'} my={'10px'}>
                            ●<Input defaultValue={todo.inputTodoName} onChange={(e) => setEditingTodo({...editingTodo, inputTodoName: e.target.value})} />
                            <Button border={'1px solid'} borderColor={'gray.400'} height={'30px'} ml={'20px'} onClick={() => onClickComplete(todo.id)} >
                            保存
                            </Button>
                        </Flex>
                        <Box pl={'20px'}>
                            <Flex alignItems={'center'}>
                            <Box w={'150px'}>【ステータス】</Box>
                            <Select defaultValue={todo.status} onChange={(e) => setEditingTodo({...editingTodo, status: e.target.value})} >
                                {optionListOfStatus.map( val => <option value={val}>{val}</option>)}
                            </Select>                    
                            </Flex>
                            <Flex alignItems={'center'}>
                            <Box w={'150px'}>【詳細】</Box>
                            <Input defaultValue={todo.detail} onChange={(e) => setEditingTodo({...editingTodo, detail: e.target.value})} />
                            </Flex>
                        </Box>
                        </ListItem>                
                    )
                    } else {
                    // 編集時でないToDoの表示
                    return(
                        <ListItem>
                        <Flex textAlign={'center'} alignItems={'center'} my={'10px'}>
                            ●{todo.inputTodoName}
                            <Button border={'1px solid'} borderColor={'gray.400'} height={'30px'} ml={'20px'} onClick={() => onClickEdit(todo.id)}>
                            編集
                            </Button>
                            <Button border={'1px solid'}  borderColor={'gray.400'} height={'30px'} ml={'20px'} onClick={() => onClickDelete(todo.id)}>
                            削除
                            </Button>
                        </Flex>
                        <Box pl={'20px'}>【ステータス】{todo.status}</Box>
                        <Box pl={'20px'}>【詳細】{todo.detail}</Box>
                        </ListItem>
                    )
                    }
                })}
            </List>
        </Box>
    )
}

export default TodoList