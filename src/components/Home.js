import React,{ useState, useContext, useEffect } from "react";
import  { Form }  from './Form';
import firebase,{ db } from "../firebase/Firebase";
import { Header } from './Header';
import { ItemsList } from './ItemsList';
import { AuthContext } from '../auth/AuthProvider';
import "firebase/firestore";


const Home = () => {
  
  const [incomeItems, setIncomeItems] = useState([]);
  const [content ,setContent ] =useState("");
  const [rate ,setRate] = useState("0");
  const [date, setDate] = useState(new Date());

  const { currentUser } = useContext(AuthContext)

  useEffect (() => {
    getMemosDate();
  });

  useEffect(() => {
    getMemosDate();
  }, [date]);

  //for Header
  const setPrevMonth = () => {
    const year = date.getFullYear();
    const month = date.getMonth()-1;
    const day = date.getDate();
    setDate(new Date(year, month, day));
  }

  const setNextMonth = () => {
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    setDate(new Date(year, month, day));
  }

  //get first date of the month
  const startOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }
  
  //get last date of this month
  const endOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }

  const selectedMonth = date.getMonth() + 1;
  const today = new Date();
  const thisMonth = today.getMonth() + 1;

  //firebase IncomeData
  const getMemosDate = () => {
    const incomeData = db.collection('incomeItems')
    incomeData.where('uid', '==', currentUser.uid).orderBy('date').startAt(startOfMonth(date)).endAt(endOfMonth(date)).onSnapshot(query => {
      const  incomeItems = []
      query.forEach(doc =>  incomeItems.push({...doc.data(), docId: doc.id}));
      setIncomeItems(incomeItems);
    });
  }

  const addMemo =  (text, amount) => {
    const docId = Math.random().toString(32).substring(2);
    const date = firebase.firestore.Timestamp.now();
    db.collection('incomeItems').doc(docId).set({
      uid: currentUser.uid,
      text,
      amount,
      date,
    })
    .then(response => {
      setIncomeItems([
        ...incomeItems, {text: content, amount: rate, docId: docId , date: date}
      ]); 
    });
  }

 const deletememos = (docId) => {
  db.collection('incomeItems').doc(docId).delete()
}
  
  return (
  <div className="container"> 
  <div className="top">
   <Header 
    date={date}
    setPrevMonth={setPrevMonth}
    setNextMonth={setNextMonth}
   />
  </div>
   <Form 
    content={content}
    setContent={setContent}
    rate={rate}
    setRate={setRate}
    addMemo={addMemo}
    selectedMonth={selectedMonth}
    thisMonth={thisMonth}
   />
   <ItemsList
    deletememos={deletememos}
    incomeItems={incomeItems}
    selectedMonth={selectedMonth}
    thisMonth={thisMonth} 
   />
   </div>
  );
}

export default Home;