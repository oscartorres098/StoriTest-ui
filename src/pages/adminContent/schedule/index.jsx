import React, { useState, useEffect, useContext} from 'react';
import { useHistory } from "react-router-dom";
import { CuadroAllUsers } from './CuadroAllUsers';
import { ContentHeader } from '../../../components/Shared/ContentHeader';
import ApiMiddleware from "../../../components/Shared/ApiMiddleware";
import { GlobalContext } from '../../../context/GlobalContext';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);


function AllUsers() {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api/v1";
  const history = useHistory();
  const { setActivePage, setToken, token, emailGlobal, setEmailGlobal, idUserGlobal, setIdUserGlobal, setUserName } = useContext(GlobalContext)
  const [clientes, setClientes] = useState();
  const bgColors = ['#EBBE46','#B57FFF','#4285FF','#DC7E80'];

  const consumeFetch = async (url, options) => {
    try {
        const originalFetch = fetch;
        const fetchWithMiddleware = ApiMiddleware(originalFetch);
        const { response, token } = await fetchWithMiddleware(url, options);
        // Se detecta token nuevo
        if (token) {
            setToken(token)
        }
        return await response;
    } catch (error) {
        if (error.message === "RefreshToken Vencido") {
            console.log(error.message, error)

            setToken("");
            setEmailGlobal("");
            setIdUserGlobal("");
            setUserName("");
            setActivePage("Home");
            history.push('/');
        }
    }
  }

  const fetchData = async () => {
    let ruta = `${API_BASE_URL}/users/usersByRole`;
    const role = "Client"
    const url = `${ruta}/${role}`;
    try {
        const response = await consumeFetch(url, {
            headers: {
                Authorization: `${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        const data = await response.json();
        let indexColor = 0;
        const newRows = data.map((item, index) => {
          let obj = {
            idUser: item.id,
            imagen: "ruta/a/la/imagenPersonalizada.jpg",
            nombre: item.name,
            correo: item.email,
            telefono: item.phone,
            company: item.company,
            bgColor: bgColors[indexColor]
          }
          indexColor = indexColor === bgColors.length-1 ? 0 : indexColor+1;
          return obj;
        });

        setClientes(newRows);
    } catch (error) {
        console.error(error);
        // Manejar el error
    }
  }

  useEffect(() => {
    fetchData();
  }, []);


    return (
      <React.Fragment>
        hola
      </React.Fragment>
    );
}

export { AllUsers };
