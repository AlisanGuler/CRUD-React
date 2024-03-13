import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { v4 as generateId } from "uuid";

const Form = ({ setTodos }) => {
  // form gönderilince çalışır
  const handleSubmit = (e) => {
    // sayfanın yenilenmesini engelle
    e.preventDefault();
    //formdaki verilere eriş
    const title = e.target[0].value;
    const status = e.target[1].value;

    // Api'a kaydedilecek olan nesneyi hazırla
    const newTodo = {
      id: generateId(),
      title,
      status,
      date: new Date().toLocaleDateString(),
    };

    //todayu api'a kaydet
    axios
      .post("http://localhost:3000/todos", newTodo)
      //api'a kaydedileni state'e ekle
      .then(() => {
        toast.success("Todo Eklendi");
        setTodos((prev) => [...prev, newTodo]);
      })
      .catch((err) => toast.error("sorry something went wrong"));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex justify-content-center gap-3 my-5"
    >
      <input className="form-control shadow" type="text" />
      <select className="form-select w-50 shadow">
        <option value="important">Önemli</option>
        <option value="daily">Günlük</option>
        <option value="job">iş</option>
      </select>
      <button className="btn btn-danger shadow">Gönder</button>
    </form>
  );
};

export default Form;
