import React from "react";

function TransactionRow({ name, value }) {
  return (
    <div className="flex justify-between items-center my-1">
      <p>{name}</p>
      <p>{value}</p>
    </div>
  );
}

export default TransactionRow;
