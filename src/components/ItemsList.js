import  React  from "react";
import { IncomeItem } from './IncomeItem';

  export const ItemsList = ({ deletememos,  incomeItems,  selectedMonth, thisMonth}) => {

    return (
      <div className="list-container">
       <div className="income-list">
        <h3>評価一覧</h3>
          <div className="List">
            <h4>作品名</h4>
            <h4>評価</h4>
            <h4>削除</h4>
          </div>
          <ul className="list">
            {incomeItems.map((incomeItem) => (
              <IncomeItem 
                deleteIncome={deletememos}
                incomeText={incomeItem.text}
                incomeAmount={incomeItem.amount}
                incomeItem={incomeItem}
                key={incomeItem.docId}
                selectedMonth={selectedMonth}
                thisMonth={thisMonth}
              />
            ))}
          </ul>
       </div>
      </div>
    )
  }


