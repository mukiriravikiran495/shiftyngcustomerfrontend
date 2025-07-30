import { useNavigate, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard,
  ArrowLeft,
  Package, 
  User, 
  CreditCard, 
  HelpCircle, 
  Phone, 
  LogOut,
  ChevronRight
} from "lucide-react";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "My Bookings", url: "/my-bookings", icon: Package },
  { title: "Profile", url: "/profile", icon: User },
  { title: "Bank Account", url: "/bank-account", icon: CreditCard },
  { title: "FAQ", url: "/faq", icon: HelpCircle },
  { title: "Contact Us", url: "/contact", icon: Phone },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Handle logout logic here
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar className="border-r-2" collapsible="icon">
      <SidebarContent className="bg-card">
        <div className="p-4">
          <SidebarTrigger className="mb-4"  ></SidebarTrigger>
          
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-3xl font-bold text-primary px-2  mb-6" style={{ fontFamily: 'Arial, sans-serif' }} >
            Shiftyng 
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className={`
                      h-12 px-4 rounded-lg transition-all duration-200 
                      ${isActive(item.url) 
                        ? "bg-primary text-primary-foreground shadow-md" 
                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                      }
                    `}
                  >
                    <button onClick={() => navigate(item.url)} className="flex items-center gap-3 w-full">
                      <item.icon className="h-5 w-5 shrink-0" />
                      <span className="font-medium">{item.title}</span>
                      <ChevronRight className="h-4 w-4 ml-auto opacity-50" />
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              
              {/* Logout Button */}
              {/* <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  className="h-12 px-4 rounded-lg transition-all duration-200 hover:bg-destructive/10 text-destructive hover:text-destructive mt-4"
                >
                  <button onClick={handleLogout} className="flex items-center gap-3 w-full rounded-lg">
                    <LogOut className="h-5 w-5 shrink-0" />
                    <span className="font-medium">Logout</span>
                    <ChevronRight className="h-4 w-4 ml-auto opacity-50" />
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}