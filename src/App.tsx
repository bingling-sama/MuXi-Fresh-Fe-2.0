import './App.less';
import FormForWeb from './pages/formW';

function App() {
  localStorage.setItem(
    'token',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTI2ODM5OTAsImlhdCI6MTY5MjMyMzk5MCwiand0VXNlcklkIjoiNjRjOTI2MjVjMDBkYjE4ODdhZjM4Yzg4In0.lnCSqHlZY7otqvjch5-MVmRWo-QluZ8Uk8dzzzCPXCs',
  );

  return <FormForWeb></FormForWeb>;
}

export default App;
