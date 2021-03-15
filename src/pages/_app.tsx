import '../styles/global.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from '../contexts/UserContext';
import { MessagesProvider } from '../contexts/MessagesContext';

function MyApp({ Component, pageProps }) {
  return(
      <MessagesProvider>
      <UserProvider>
        <Component {...pageProps} /> 
      </UserProvider>
      </MessagesProvider>
  ) 
}

export default MyApp
