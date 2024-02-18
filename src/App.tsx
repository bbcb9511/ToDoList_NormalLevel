import React, { useState } from 'react';
import './App.css';
import { Box, Button, ChakraProvider, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, List, ListItem, Select } from '@chakra-ui/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

function App() {

  const [todoList, setTodoList] = useState<Inputs[]>([]);
  const [nextTodoId, setNextTodoId] = useState<number>(0);

  type Inputs = {
    id: number;
    inputTodoName: string;
    status: string;
    detail: string;
  }

  const {register, handleSubmit, reset, control, formState:{errors}} = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
    setTodoList([...todoList, {
      id: nextTodoId,
      inputTodoName: data.inputTodoName,
      status: data.status,
      detail: data.detail
      }])
    reset()
    setNextTodoId(val => val + 1)
  }

  const HtmlTodoList = todoList.map(todo => {
    return(
      <ListItem>
        ●{todo.inputTodoName}
        <List>
          <ListItem pl={'20px'}>【ステータス】{todo.status}</ListItem>
          <ListItem pl={'20px'}>【詳細】{todo.detail}</ListItem>
        </List>
      </ListItem>
    )
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
            <FormLabel>ToDo名</FormLabel>
            <Input 
              type='text' 
              placeholder='ToDoの詳細を入力してください' 
              {...register('detail', {required: true})} />
            {/* <FormErrorMessage>{!!errors.inputTodoName && <p>入力してください</p>}</FormErrorMessage> */}
            <Box color={'red'}>{!!errors.detail && <p>入力してください</p>}</Box>
          </FormControl>

          <Button type='submit' m={'10px'} >登録</Button>

        </Box>
      </form>

      <Box m='30px' px={'40px'} py={'10px'} rounded='lg' bg='blue.50' >
        <Box textAlign='center'>
          <Heading as='h2' fontWeight='bold' fontSize={'25px'}>
            未完了のToDo
          </Heading>
        </Box>
        <List spacing={5}>
          {HtmlTodoList}
        </List>
      </Box>
    </ChakraProvider>
  );
}

export default App;
