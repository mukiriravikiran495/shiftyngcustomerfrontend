import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProfileDropdownProps {
  mobile: string;
  onLogout: () => void;
}

export const ProfileDropdown = ({ mobile, onLogout }: ProfileDropdownProps) => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
          My Account <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => navigate("/profile")}>
          👤 Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/mybookings")}>
          📦 My Bookings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/transactions")}>
          💳 Transactions
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onLogout}>
          🚪 Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
