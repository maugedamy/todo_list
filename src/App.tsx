import { useState } from "react";
import "./App.css";
import ListItem from "./Components/ListItem";
import TodoAdd from "./Components/TodoAdd";

// Yo dije que no se iban a salvar de Typescript
type ItemProps = {
  text: string;
  done: boolean;
};

/**
 * Tene en cuenta algo muy importante en esta parte.
 * Todas las variables "estaticas", se deben crear fuera de la funcion principal / componente
 * Esto es para que no se vuelva a crear en cada renderizado. (Fijate al crear los types tambien)
 *
 * En este caso yo cree una lista "inicial", pero que es solo de referencia para el estado.
 * Es decir, no se va a modificar esta lista, sino la que esta dentro del estado (mas abajo)
 */
const LISTA: ItemProps[] = [
  {
    text: "Apretar esta tarea",
    done: false,
  },
  {
    text: "Mover tareas terminadas a la otra lista",
    done: false,
  },
  {
    text: "Romper todo",
    done: false,
  },
];

/*  Acá empieza el componente  */
const App = () => {
  /**
   * Te voy a ayudar un poco para que veas que no soy malo (?
   * Acá te cree un estado que ya viene inicializado con la lista anterior (y tipado jaja)
   */
  const [itemList, setItemList] = useState<ItemProps[]>(LISTA);

  // Esta es la funcion que se va a usar al clickear el item
  const handleOnChangeItem = (index: number, value: boolean) => {
    /**
     * Cosas que tendrian que pasar:
     * - Obtener el valor final del array
     * - Obtener la posicion del objeto en el array por el "index" (obtenido en los parametros)
     * - Cambiarle el valor al item por el parametro "value";
     * - Setear el array final al estado con "setItemList"
     *
     * Pista:
     * - array[index].done = value;
     */
    itemList[index].done = value;
    setItemList([...itemList]);

    // es lo mismo decir:
    // setItemList((prev)=> {
    //   prev[index].done = value;
    //   return[...prev]
    // })
  };

  // Esta es la funcion que va a agregar un item a la lista
  const handleOnAddItem = (text: string) => {
    /**
     * Cosas que tendrian que pasar:
     * - Agregar el nuevo item al estado con el "text" que devuelve la funcion
     *
     * Existen 2 formas de hacerlo:
     * 1. Creando un nuevo array, pushear el objeto y setearlo en el estado
     * 2. Usar el valor previo, propagarlo [...] y agregar el item al final
     */
    setItemList([...itemList, { text: text, done: false }]);
  };

  /**
   * Acordate que podes meter logica dentro de la vista.
   * En este caso vas a tener que "mapear" el array y mostrar los items.
   *
   * Cree un componente para que no tengas que matarte tanto (despues voy a hablar de esto, tranqui)
   * 
   * Paso a mostrarte el Componente y las propiedades del mismo:

      <ListItem
        text={Aca va el texto del item}
        checked={Este valor es para saber si esta o no "checkeado"}
        key={`item-${index}`}
        onChange={Esta funcion devuelve el valor invertido como primer parametro. Se lo deberias pasar por la funcion}
      />

   * Ahora, que es "key"? Es para que react identifique varios items "iguales" y no se generen problemas en los "mapeos"
   *
   * Pista:
   * - array.map((item)=> <ListItem text={item.text} checked={item.done}/>)
   */

  return (
    <div className="todo-container">
      <h1>Lista de quehaceres</h1>
      <TodoAdd onAdd={handleOnAddItem} />
      <div className="lists-wrapper">
        <div className="panel todo">
          <h2>Por hacer:</h2>
          <div className="list">
            {/* 
              ACA VA LA LISTA DE ITEMS POR HACER

              Cosas que tendrian que pasar acá:
              - Mapear el array y mostrar SOLO los items que tienen "done" en "false"
              - Mostrar "text" y "checked" correspondiente al item
              - Y que al apretar el item llame a la funcion creada mas arriba pasandole los parametros correspondientes
            */}
            {itemList.map((item, index) =>
              !item.done ? (
                <ListItem
                  text={item.text}
                  checked={item.done}
                  onChange={(value) => handleOnChangeItem(index, value)}
                />
              ) : (
                <></>
              )
            )}
          </div>
        </div>
        <div className="panel done">
          <h2>Listo:</h2>
          <div className="list">
            {/* 
              ACA VA LA LISTA DE ITEMS COMPLETADOS

              Cosas que tendrian que pasar acá:
              - Mapear el array y mostrar SOLO los items que tienen "done" en "true"
              - Mostrar "text" y "checked" correspondiente al item
              - Y que al apretar el item llame a la funcion creada mas arriba pasandole los parametros correspondientes
            */}
            {itemList.map((item, index) =>
              item.done ? (
                <ListItem
                  text={item.text}
                  checked={item.done}
                  onChange={(value) => handleOnChangeItem(index, value)}
                />
              ) : (
                <></>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
