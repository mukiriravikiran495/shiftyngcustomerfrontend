import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const TransactionsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="outline" onClick={() => navigate(-1)}>
          ← Back
        </Button>
        <h1 className="text-2xl font-bold text-gray-800">Transactions</h1>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-gray-600">No transactions available.</p>
        {/* Add transaction history list here */}
      </div>
    </div>
  );
};

export default TransactionsPage;
