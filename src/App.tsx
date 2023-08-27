import './App.less';
import TestW from './pages/personalityTestW';

function App() {
  localStorage.setItem(
    'token',
    //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTMyODIzNDUsImlhdCI6MTY5MjkyMjM0NSwiand0VXNlcklkIjoiNjRjOTI2MjVjMDBkYjE4ODdhZjM4Yzg4In0.0MmnsDwhlZ2wIU_sV7fVcise5vGMn5DZR9ouTtoUqOU',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTMzMDg4MDAsImlhdCI6MTY5Mjk0ODgwMCwiand0VXNlcklkIjoiNjRlMjRlYmFhYWE5OTJmZWQxMDc3ZjQxIn0.wiTLtlsCjHiHP2JNSMzKz7ADh23Lw4svuGik7oALoZQ',
  );

  return <TestW></TestW>;
}

export default App;
