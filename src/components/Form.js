import React from "react";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const AddButton = styled(Button)({
  background: '#87CEEB',
  border: 0,
  borderRadius: 3,
  color: 'white',
  height: 48,
  width: '250px',
  textAlign: 'centner',
  fontSize: '1.8rem',
  margin: '10px 0 20px 0',  
  '&:hover': {
    backgroundColor: '#3fb8e7',
  },
});

export const Form = ({content, setContent, rate, setRate, addMemo, selectedMonth, thisMonth}) => {
  const contentChange = (event) => setContent(event.target.value);
  const rateChange = (event) => setRate(event.target.value);
  const reset = () => {
    setContent("");
    setRate("");
  }
const submitItemHandler = (event) => {
  event.preventDefault();
  if (content == '' || rate == '0' || !(rate > 0 && rate <= 5)) {
    alert ('正しい内容を入力してください')
  } else {
    addMemo(content, rate) 
    reset();
  }
}

  const thisMonthForm = () =>{
    return(
      <form className="add-form">
        <div className="add-text">
          <label>内容</label>
          <input type="text" value={content} onChange={contentChange}/>
        </div>
        <div className="add-amount">
          <label>評価</label>
          <input type="number" value={rate} onChange={rateChange} max="5" min="1" />
        </div>
        <div className="add-btn">
        <AddButton type="submit" onClick={submitItemHandler}>追加</AddButton>
        </div>
      </form>
    );
  }

  const otherMonthForm = () => {
    return (
      <form></form>
    )
  }

  return (
    <>
    {thisMonth === selectedMonth ? thisMonthForm() : otherMonthForm()}
    </>
  )

}
  