import { Box, Button, FormControl, FormLabel, Input, Select } from '@chakra-ui/react'
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { filterdTodoListState, nextTodoIdState, optionOfStatus, todoListState } from './states/state';
import { input } from './types/Input';
import { useForm } from 'react-hook-form';


const TodoForm = () => {
  const optionListOfStatus = useRecoilValue(optionOfStatus)
  const [todoList, setTodoList] = useRecoilState(todoListState)
  const [nextTodoId, setNextTodoId] = useRecoilState(nextTodoIdState)
  const {register, handleSubmit, reset, formState:{errors}} = useForm<input>();


  const onSubmit = (data: input) => {
    setTodoList([...todoList, {
      id: nextTodoId,
      inputTodoName: data.inputTodoName,
      status: data.status,
      detail: data.detail
    }])

    reset()
    setNextTodoId(val => val + 1)
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <Box m={'30px'}>
      <FormControl isInvalid={!!errors.inputTodoName}>
        <FormLabel>ToDo名</FormLabel>
        <Input type='text' placeholder='入力してください' {...register('inputTodoName', {required: true})} />
        <Box color={'red'}>{!!errors.inputTodoName && <p>入力してください</p>}</Box>
      </FormControl>

      <FormControl isInvalid={!!errors.status}>
        <FormLabel>ステータス</FormLabel>
        <Select placeholder='選択してください' {...register('status', {required: '選択してください'})}>
          {optionListOfStatus.map( val => <option value={val}>{val}</option>)}
        </Select>                    
        <Box color={'red'}>{errors.status && errors.status.message}</Box>
      </FormControl>

      <FormControl isInvalid={!!errors.detail}>
        <FormLabel>詳細</FormLabel>
        <Input type='text' placeholder='入力してください' {...register('detail', {required: true})} />
        <Box color={'red'}>{!!errors.detail && <p>入力してください</p>}</Box>
      </FormControl>

      <Button type='submit' m={'10px'} border={'1px solid'} borderColor={'gray.400'}>登録</Button>
    </Box>
  </form>
)
}

export default TodoForm