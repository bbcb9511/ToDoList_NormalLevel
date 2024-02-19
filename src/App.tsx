import React, { useEffect, useState } from 'react';
import './App.css';
import { Box, Button, ChakraProvider, Flex, FormControl, FormLabel, Heading, Input, List, ListItem, Select } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

function App() {

  const [todoList, setTodoList] = useState<Inputs[]>([]);
  const [filterdTodoList, setFilterdTodoList] = useState<Inputs[]>([]);
  const [nextTodoId, setNextTodoId] = useState<number>(1);
  const [filterValue, setFilterValue] = useState<string>('すべて');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editTodoId, setEditTodoId] = useState<number | null>();
  const [editingTodo, setEditingTodo] = useState({});
  const {register, handleSubmit, reset, formState:{errors}} = useForm<Inputs>();

  type Inputs = {
    id: number;
    inputTodoName: string;
    status: string;
    detail: string;
  }

  const onSubmit = (data: Inputs) => {
    setTodoList([...todoList, {
      id: nextTodoId,
      inputTodoName: data.inputTodoName,
      status: data.status,
      detail: data.detail
    }])

    reset()
    setNextTodoId(val => val + 1)
  }

  const onChangeFilter = (e:  React.ChangeEvent<HTMLSelectElement>) => {
    setFilterValue(e.target.value)
    const targetTodoList = todoList.filter(todo => {
      return(
        e.target.value === 'すべて' ? true : todo.status === e.target.value
      )
    })
    setFilterdTodoList(targetTodoList)
  }

  const onClickDelete = (deleteTargetId: number) => {
    setTodoList(todoList.filter(todo => todo.id !== deleteTargetId))
  }

  const onClickEdit = (targetTodoId: number) => {
    setIsEdit(true)
    setEditTodoId(targetTodoId)
  }

  const onClickComplete = (targetTodoId: number) => {
    const newTodoList: Inputs[] = todoList.map( todo => {
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

  useEffect(() => {
    const targetTodoList = todoList.filter(todo => {
      return(
        filterValue === 'すべて' ? true : todo.status === filterValue
      )
    })
    setFilterdTodoList(targetTodoList)
  }, [todoList])

  const HtmlTodoList = filterdTodoList.map(todo => {
    if (isEdit && todo.id === editTodoId) {
      return(
        <ListItem>
          <Flex textAlign={'center'} alignItems={'center'} my={'10px'}>
            ●<Input defaultValue={todo.inputTodoName} onChange={(e) => setEditingTodo({...editingTodo, inputTodoName: e.target.value})}></Input>
            <Button 
              border={'1px solid'} 
              borderColor={'gray.400'} 
              height={'30px'} 
              ml={'20px'}
              onClick={() => onClickComplete(todo.id)}
            >保存</Button>
          </Flex>
          <List>
            <ListItem pl={'20px'}>
              <Flex alignItems={'center'}>
                <Box w={'150px'}>【ステータス】</Box>
                <Select 
                  // id='status'
                  // value={todo.status}
                  // {...register('status')}
                  defaultValue={todo.status}
                  onChange={(e) => setEditingTodo({...editingTodo, status: e.target.value})}
                >
                  <option value='未着手'>未着手</option>
                  <option value='対応中'>対応中</option>
                  <option value='完了'>完了</option>
                </Select>                    
              </Flex>
            </ListItem>
            <ListItem pl={'20px'}>
              <Flex alignItems={'center'}>
                <Box w={'150px'}>【詳細】</Box>
                <Input defaultValue={todo.detail} onChange={(e) => setEditingTodo({...editingTodo, detail: e.target.value})}></Input>
              </Flex>
            </ListItem>
          </List>
        </ListItem>
        
      )
    } else {
      return(
        <ListItem>
          <Flex textAlign={'center'} alignItems={'center'} my={'10px'}>
            ●{todo.inputTodoName}
            <Button 
              border={'1px solid'} 
              borderColor={'gray.400'} 
              height={'30px'} 
              ml={'20px'}
              onClick={() => onClickEdit(todo.id)}
            >編集</Button>
            <Button 
              border={'1px solid'} 
              borderColor={'gray.400'} 
              height={'30px'} 
              ml={'20px'}
              onClick={() => onClickDelete(todo.id)}
            >削除</Button>
          </Flex>
          <List>
            <ListItem pl={'20px'}>【ステータス】{todo.status}</ListItem>
            <ListItem pl={'20px'}>【詳細】{todo.detail}</ListItem>
          </List>
        </ListItem>
          )
    }
  })

  

  return (
    <ChakraProvider>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box m={'30px'}>
          <FormControl isInvalid={!!errors.inputTodoName}>
            <FormLabel>ToDo名</FormLabel>
            <Input 
              type='text' 
              placeholder='登録したいToDoを入力してください' 
              {...register('inputTodoName', {required: true})} />
            {/* <FormErrorMessage>{!!errors.inputTodoName && <p>入力してください</p>}</FormErrorMessage> */}
            <Box color={'red'}>{!!errors.inputTodoName && <p>入力してください</p>}</Box>
          </FormControl>

          <FormControl isInvalid={!!errors.status}>
            <FormLabel>ステータス</FormLabel>
            <Select 
              id='status'
              placeholder='選択してください'
              {...register('status', {required: '選択してください'})}
            >
              <option value='未着手'>未着手</option>
              <option value='対応中'>対応中</option>
              <option value='完了'>完了</option>
            </Select>                    
            <Box color={'red'}>{errors.status && errors.status.message}</Box>
          </FormControl>

          <FormControl isInvalid={!!errors.detail}>
            <FormLabel>詳細</FormLabel>
            <Input 
              type='text' 
              placeholder='ToDoの詳細を入力してください' 
              {...register('detail', {required: true})} />
            {/* <FormErrorMessage>{!!errors.inputTodoName && <p>入力してください</p>}</FormErrorMessage> */}
            <Box color={'red'}>{!!errors.detail && <p>入力してください</p>}</Box>
          </FormControl>

          <Button type='submit' m={'10px'} border={'1px solid'} borderColor={'gray.400'}>登録</Button>

        </Box>
      </form>



      <Box m='30px' px={'40px'} py={'10px'} rounded='lg' bg='blue.50' >
        <Box textAlign='center'>
          <Heading as='h2' fontWeight='bold' fontSize={'25px'}>
            ToDo一覧
          </Heading>
        </Box>

        <Flex textAlign={'center'} alignItems={'center'} mb={'20px'}>
          <FormLabel w={'100px'}>フィルター：</FormLabel>
          <Select 
            w={'120px'}
            defaultValue='すべて'
            value={filterValue}
            onChange={(e) => onChangeFilter(e)}
          >
            <option value='すべて'>すべて</option>
            <option value='未着手'>未着手</option>
            <option value='対応中'>対応中</option>
            <option value='完了'>完了</option>
          </Select>                    
        </Flex>
        <Box borderBottom="1px solid gray"></Box>

        <List spacing={5}>
          {HtmlTodoList}
        </List>
      </Box>
    </ChakraProvider>
  );
}

export default App;
