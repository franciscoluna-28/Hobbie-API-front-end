import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ActivityProvider } from './context/ActivitiesContext.tsx'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    
    <ActivityProvider>
    <App />
    </ActivityProvider>
)
