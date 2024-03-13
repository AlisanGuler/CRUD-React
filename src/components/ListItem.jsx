import React, { useState } from "react";
import formatDate from "../utils/formatDate";
import axios from "axios";
import Content from "./Content";
import Edit from "./Edit";
import { toast } from "react-toastify";

const ListItem = ({ todo, setTodos, allTodos }) => {
  const [isEdit, setIsEdit] = useState(false);
  //sil butonu fonksiyonu
  const handleDelete = () => {
    // delete isteği
    axios
      .delete(`http://localhost:3000/todos/${todo.id}`)
      .then(() => {
        //istediğimiz todoyu kaldı
        const filtredTodos = allTodos.filter((item) => item.id !== todo.id);
        //state güncelle
        setTodos(filtredTodos);
        toast.info("Todo Kaldırıldı")
      })
      .catch((err) => toast.error("başarısız oldu"));
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    //inputlardaki değerler
    const title = e.target[1].value;
    const status = e.target[0].value;
    //Api güncelle
    axios
      .patch(`http://localhost:3000/todos/${todo.id}`, {
        title,
        status,
      })
      //state'i güncelle
      .then(() => {
        //mevcut title ve statusu güncell
        const updated = { ...todo, status, title };
        //eski todo yerine güncelini koy
        const newnewTodos = allTodos.map((item) =>
          item.id === updated.id ? updated : item
        );
        //State güncelle
        setTodos(newnewTodos);
        //düzenleme modundan çık
        setIsEdit(false);

        toast.success("Güncelleme Başarılı")
      });
  };

  return (
    <li className="relative p-3 list-group-item d-flex justify-content-between align-items-center gap-3">
      {isEdit ? (
        <Edit handleUpdate={handleUpdate} todo={todo} setIsEdit={setIsEdit} />
      ) : (
        <Content
          setIsEdit={setIsEdit}
          todo={todo}
          handleDelete={handleDelete}
        />
      )}

      <span className="date">{formatDate(todo.date)}</span>
    </li>
  );
};

export default ListItem;
