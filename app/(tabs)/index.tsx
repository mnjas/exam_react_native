import React from 'react';
import TodoList from '../../components/TodoList';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {

  return (
    <GestureHandlerRootView>
      <TodoList />
    </GestureHandlerRootView>
  );
};

export default App;
