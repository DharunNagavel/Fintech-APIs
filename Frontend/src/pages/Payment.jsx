import React, { useEffect, useState } from "react";
import axios from "axios";

export const Payment = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [amount, setAmount] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:1000/payment/display-users",
      );
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Open popup
  const handlePay = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  // Submit payment
  const handlePayment = async () => {

  const { data } = await axios.post(
    "http://localhost:1000/payment/create-order",
    { amount: 1 }
  );

  const options = {
    key: "rzp_test_SNKPavlnivObM0",
    amount: data.amount,
    currency: "INR",
    order_id: data.id,

    handler: async function (response) {

      console.log("Payment Success:", response);

      await axios.post("http://localhost:1000/payment/payout", {
        amount: 1,
        fund_account: "fa_SNOjaStmVL7PT2"
      });

    }
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h2 className="text-3xl font-bold mb-8 text-center">Send Payment</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {users.map((user, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">{user.firstname}</h3>

            <p className="text-gray-600">{user.mail}</p>

            <p className="text-gray-600 mb-4">{user.phone}</p>

            <button
              onClick={() => handlePay(user)}
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
            >
              Pay
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Send Payment</h3>

            <p className="text-sm text-gray-500 mb-3">
              To: {selectedUser.firstname}
            </p>

            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border p-3 rounded-lg mb-4"
            />

            <div className="flex gap-3">
              <button
                onClick={handlePayment}
                className="bg-green-500 text-white px-4 py-2 rounded-lg w-full"
              >
                Send
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded-lg w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
