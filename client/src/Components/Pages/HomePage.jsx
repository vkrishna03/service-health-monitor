
// import jwt from 'jsonwebtoken';
// import { useNavigate } from 'react-router-dom';

import Header from './HomePage/Header'
import ServiceTable from './HomePage/ServiceTable'
import Dashboard from './HomePage/Dashboard';

function HomePage() {

  let component;
  switch (window.location.pathname) {
    case "/dashboard":
      component = <Dashboard />
      break;
    case "/services":
      component = <ServiceTable />
      break;
    default:

  }
  // const [quote,setQuote] = useState('')


  // async function populateQuote() {
  //   const req = await fetch('http://localhost:1337/api/home/quote', {
  //     headers: {
  //       'x-access-token': localStorage.getItem('token'),
  //     },
  //   })

  //   const data = req.json()
  //   if (data.status === 'ok') {
  //     setQuote(data.quote)
  //   }
  //   else {
  //     alert(data.error)
  //   }
  // }

  // useEffect(() => {
  //   const token = localStorage.getItem('token')
  //   if (token) {
  //     const user = jwt.decode(token)
  //     if (!user) {
  //       localStorage.removeItem('token')
  //       navigate('/', {replace:true})
  //     }
  //   }
  // },[])

  return (
    <div className='h-full'>
          <Header />
          {component}
    </div>
  );
}


export default HomePage;
