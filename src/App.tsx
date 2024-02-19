import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <ChakraProvider>
        <TodoForm />
        <TodoList />
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default App;
