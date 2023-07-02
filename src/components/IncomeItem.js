import React from "react";

export const IncomeItem = ({ deleteIncome,incomeItem, incomeText, incomeAmount, thisMonth, selectedMonth}) => {

    const deleteHandler = () => {
      deleteIncome(incomeItem.docId);
    }
  
    const showThisMonth = () => {
      return (
        <li>
        <div>{incomeText}</div>
        <div>{incomeAmount}</div>
        <button className="delete-btn" onClick={deleteHandler}>×</button>
        </li>
      )
    }
  
    const showPastMonth = () => {
      return (
        <li>
        <div>{incomeText}</div>
        <div>{incomeAmount}</div>
        <button className="delete-btn" onClick={deleteHandler}>×</button>
        </li>
      )
    }
  
    return (
      <>
        {thisMonth === selectedMonth ? showThisMonth() : showPastMonth()}
      </>
    )
  }