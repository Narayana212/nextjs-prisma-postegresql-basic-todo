"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

function Todo() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");

  const deleteId = async (id) => {
    try {
      const response = await fetch(`/apis/todo/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok){
        console.log("Deleted")
        getMessage()

      }else{
        console.log("Gone Wrong")
      }
    } catch (err) {
      console.error("Error fetching data:");
    }
  };

  const getMessage = async () => {
    try {
      const response = await fetch("/apis/todo", {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setData(data.message);
      } else {
        console.error(
          "Error fetching data:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getMessage();
  }, []);

  const addTodo = async () => {
    try {
      const response = await fetch(`/apis/todo/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value }), // Send the data as JSON string
      });
      if (response.ok) {
        getMessage();
        setValue("")
      } else {
        console.error(
          "Error creating todo:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  return (
    <>
      <div>
        <input
          type="text"
          className="border-2 border-black m-1 p-2"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <button className="border-2 p-2" onClick={addTodo}>
          Add
        </button>
      </div>
      <ul>
        {data.map((a) => (
          <li key={a.id}  className="m-2">
            <span className="m-3">{a.content}</span>
            <button onClick={()=>deleteId(a.id)} className="p-2 border-2">
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button className="border-2 p-2">
        <Link href="/">Go Back</Link>
      </button>
    </>
  );
}

export default Todo;
