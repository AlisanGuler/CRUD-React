import { useEffect, useState } from "react";
import Form from "./components/Form";
import Yükleniyor from "./components/Yükleniyor";
import ListItem from "./components/ListItem";
import axios from "axios";


const App = () => {
  //* todo'ları Tuttuğumuz State
  const [todos, setTodos] = useState(null);

  //Bileşenin Ekrana Basılma Olayı İzle
  useEffect (() => {
    //Api'a ToDo'lar için get isteği
    axios.get("http://localhost:3000/todos")
     //istek başırılı olursa
     .then((res) => setTodos(res.data))
     //olumsuz olursa
     .catch((err) => console.log(err));

  }, [])

  return (
    <div className="container p-3 p-md-5">
      <h1 className="text-center">
        Server <span className="text-primary">CRUD</span>
      </h1>
      <Form setTodos={setTodos}/>
      <ul className="list-group">
        {/* veriler yoksa loader bas  */}
        {!todos && <Yükleniyor />}

        {/* veriler geldiyese ekrana bas  */}
        {todos?.map((todo) => (
          <ListItem key={todo.id} todo={todo} allTodos={todos} setTodos={setTodos} />
        ))}
      </ul>
    </div>
  );
};

export default App;
