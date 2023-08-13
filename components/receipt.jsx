"use client";

function Receipt({ amount, type = "deposit" }) {
  return (
    <>
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            receipt
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between border-b-2 py-2">
        <p className="text-sm">Amount ($)</p>
        <p>{amount || 0}</p>
      </div>
      <div className="flex items-center justify-between border-b-2 py-2">
        <p className="text-sm">Amount (PKR)</p>
        <p>{amount * 180 || 0}</p>
      </div>
      <div className="flex items-center justify-between border-b-2 py-2">
        <p className="text-sm">Charges ($)</p>
        <p>{type === "deposit" ? 0 : amount * 0.06}</p>
      </div>
      <div className="flex items-center justify-between border-b-2 py-2 text-green-500">
        <p className="text-sm">Total Amount (PKR)</p>
        <p>
          {(type === "deposit"
            ? amount * 180
            : amount * 180 + amount * 0.06 * 180) || 0}
        </p>
      </div>
      {type === "deposit" ? null : (
        <div className="flex items-center justify-between border-b-2 py-2 text-green-500">
          <p className="text-sm">Total Amount ($)</p>
          <p>{amount + amount * 0.06 || 0}</p>
        </div>
      )}
    </>
  );
}

export default Receipt;
