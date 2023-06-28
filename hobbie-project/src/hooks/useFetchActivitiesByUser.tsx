import { useAuthContext } from "../context/UserAuthContext"
import auth

function useFetchActivitiesByUser() {
    const { currentUser } = useAuthContext()
    const { setSavedActivities } = useActivityContext()
  
    const { response, error, isLoading } = useFetch(
      `http://localhost:3000/users/find-activities-by-user-uid/${auth.currentUser?.uid}`
    )
  
    useEffect(() => {
      if (response) {
        setSavedActivities(response.data)
      }
    }, [response, setSavedActivities])
  
    return { error, isLoading }
  }
  En este ejemplo, creamos un Custom Hook llamado useFetchActivitiesByUser que se encarga de realizar la solicitud de actividades por usuario y actualizar el contexto de actividades con los datos obtenidos. Este hook encapsula la lógica de la solicitud y su efecto secundario, lo que permite reutilizarlo en diferentes componentes.
  
  Luego, en el componente SavedActivities, utilizamos el Custom Hook useFetchActivitiesByUser para obtener los datos de las actividades del usuario y manejar la carga y el error. Esto permite que el componente se enfoque únicamente en el renderizado de las actividades y no en la lógica de la solicitud.
  
  Utilizar un Custom Hook puede ayudar a mantener un código más limpio y modular, ya que separa la lógica de reutilización en una función personalizada. Además, facilita la reutilización del hook en otros componentes si es necesario.
  
  
  
  
  
  
  