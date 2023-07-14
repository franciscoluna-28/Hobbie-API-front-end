import { useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";
import { registerUserToken } from "../api/users";
import { useActivityContext } from "../context/ActivitiesContext";
import FilteredActivitiesByCategory from "./FilteredActivitiesByCategory";
import RecomendedActivities from "./RecommendedActivities";
import SearchBar from "./SearchBar";
import axios from "axios";

export default function Activities() {
  const { currentKeyword } = useActivityContext();

/*   if (auth.currentUser) {
    const bearedToken = sessionStorage.getItem("accessToken");
  
    axios.post(`http://localhost:3000/api/user/register-user-token/${auth.currentUser.uid}`, {
      bearedToken: bearedToken
    })
    .then(response => {
      // Manejo de la respuesta exitosa del backend
      console.log("Token registrado exitosamente:", response.data);
      // Realiza cualquier acción adicional que necesites
    })
    .catch(error => {
      // Manejo de errores de la solicitud
      if (error.response) {
        // El servidor respondió con un código de error
        console.log("Error en la solicitud:", error.response.data);
      } else if (error.request) {
        // No se recibió una respuesta del servidor
        console.log("No se pudo obtener respuesta del servidor:", error.request);
      } else {
        // Ocurrió un error durante la configuración de la solicitud
        console.log("Error al enviar la solicitud:", error.message);
      }
      // Realiza cualquier acción adicional para manejar el error
    });
  }
   */



  return (
    <div>
      <h1 className="lg:text-6xl text-5xl text-accent font-bold mb-8 lg:flex gap-4">
        Recommended Activities
      </h1>
      <SearchBar />
      <div className="flex gap-4 flex-wrap">
        {currentKeyword === "" ? (
          <RecomendedActivities token={sessionStorage.getItem("accessToken")} />
        ) : (
          <FilteredActivitiesByCategory
            token={sessionStorage.getItem("accessToken")}
            currentKeyword={currentKeyword}
          />
        )}
      </div>
    </div>
  );
}
