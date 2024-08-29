// "use client";
// import Link from "next/link";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// import {
//   Activity,
//   ArrowUpRight,
//   CircleUser,
//   CreditCard,
//   DollarSign,
//   Home,
//   Menu,
//   Package2,
//   Users,
// } from "lucide-react";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// export function Dashboard() {
//   const router = useRouter();

//   const handleLogout = async () => {
//     try {
//       await axios.post("http://localhost:8000/api/logout", null, {
//         withCredentials: true,
//       });
//       router.push("/");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="flex min-h-screen w-full flex-col">
//       <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
//         <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
//           <Link
//             href="/"
//             className="flex items-center gap-2 text-lg font-semibold md:text-base"
//           >
//             <Home className="h-6 w-6" />
//             <span className="sr-only">Acme Inc</span>
//           </Link>
//           <Link
//             href="#"
//             className="text-foreground transition-colors hover:text-foreground"
//           >
//             Dashboard
//           </Link>
//           <Link
//             href="/dashboard/orders"
//             className="text-muted-foreground transition-colors hover:text-foreground"
//           >
//             Orders
//           </Link>
//           <Link
//             href="#"
//             className="text-muted-foreground transition-colors hover:text-foreground"
//           >
//             Products
//           </Link>
//           <Link
//             href="#"
//             className="text-muted-foreground transition-colors hover:text-foreground"
//           >
//             Customers
//           </Link>
//           <Link
//             href="#"
//             className="text-muted-foreground transition-colors hover:text-foreground"
//           >
//             Analytics
//           </Link>
//         </nav>
//         <Sheet>
//           <SheetTrigger asChild>
//             <Button
//               variant="outline"
//               size="icon"
//               className="shrink-0 md:hidden"
//             >
//               <Menu className="h-5 w-5" />
//               <span className="sr-only">Toggle navigation menu</span>
//             </Button>
//           </SheetTrigger>
//           <SheetContent side="left">
//             <nav className="grid gap-6 text-lg font-medium">
//               <Link
//                 href="#"
//                 className="flex items-center gap-2 text-lg font-semibold"
//               >
//                 <Package2 className="h-6 w-6" />
//                 <span className="sr-only">Acme Inc</span>
//               </Link>
//               <Link href="#" className="hover:text-foreground">
//                 Dashboard
//               </Link>
//               <Link
//                 href="#"
//                 className="text-muted-foreground hover:text-foreground"
//               >
//                 Orders
//               </Link>
//               <Link
//                 href="#"
//                 className="text-muted-foreground hover:text-foreground"
//               >
//                 Products
//               </Link>
//               <Link
//                 href="#"
//                 className="text-muted-foreground hover:text-foreground"
//               >
//                 Customers
//               </Link>
//               <Link
//                 href="#"
//                 className="text-muted-foreground hover:text-foreground"
//               >
//                 Analytics
//               </Link>
//             </nav>
//           </SheetContent>
//         </Sheet>
//         <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
//           <div className="ml-auto flex-1 sm:flex-initial">
//             {/* <div className="relative">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="search"
//                 placeholder="Search products..."
//                 className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
//               />
//             </div> */}
//           </div>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="secondary" size="icon" className="rounded-full">
//                 <CircleUser className="h-5 w-5" />
//                 <span className="sr-only">Toggle user menu</span>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuLabel>My Account</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem>Settings</DropdownMenuItem>
//               <DropdownMenuItem>Support</DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem onSelect={handleLogout}>
//                 Logout
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </header>
//       <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
//         <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
//           <Card x-chunk="dashboard-01-chunk-0">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">
//                 Total Revenue
//               </CardTitle>
//               <DollarSign className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">$45,231.89</div>
//               <p className="text-xs text-muted-foreground">
//                 +20.1% from last month
//               </p>
//             </CardContent>
//           </Card>
//           <Card x-chunk="dashboard-01-chunk-1">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">
//                 Subscriptions
//               </CardTitle>
//               <Users className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">+2350</div>
//               <p className="text-xs text-muted-foreground">
//                 +180.1% from last month
//               </p>
//             </CardContent>
//           </Card>
//           <Card x-chunk="dashboard-01-chunk-2">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Sales</CardTitle>
//               <CreditCard className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">+12,234</div>
//               <p className="text-xs text-muted-foreground">
//                 +19% from last month
//               </p>
//             </CardContent>
//           </Card>
//           <Card x-chunk="dashboard-01-chunk-3">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Active Now</CardTitle>
//               <Activity className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">+573</div>
//               <p className="text-xs text-muted-foreground">
//                 +201 since last hour
//               </p>
//             </CardContent>
//           </Card>
//         </div>
//         <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
//           <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
//             <CardHeader className="flex flex-row items-center">
//               <div className="grid gap-2">
//                 <CardTitle>Transactions</CardTitle>
//                 <CardDescription>
//                   Recent transactions from your store.
//                 </CardDescription>
//               </div>
//               <Button asChild size="sm" className="ml-auto gap-1">
//                 <Link href="#">
//                   View All
//                   <ArrowUpRight className="h-4 w-4" />
//                 </Link>
//               </Button>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Customer</TableHead>
//                     <TableHead className="hidden xl:table-column">
//                       Type
//                     </TableHead>
//                     <TableHead className="hidden xl:table-column">
//                       Status
//                     </TableHead>
//                     <TableHead className="hidden xl:table-column">
//                       Date
//                     </TableHead>
//                     <TableHead className="text-right">Amount</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   <TableRow>
//                     <TableCell>
//                       <div className="font-medium">Liam Johnson</div>
//                       <div className="hidden text-sm text-muted-foreground md:inline">
//                         liam@example.com
//                       </div>
//                     </TableCell>
//                     <TableCell className="hidden xl:table-column">
//                       Sale
//                     </TableCell>
//                     <TableCell className="hidden xl:table-column">
//                       <Badge className="text-xs" variant="outline">
//                         Approved
//                       </Badge>
//                     </TableCell>
//                     <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
//                       2023-06-23
//                     </TableCell>
//                     <TableCell className="text-right">$250.00</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell>
//                       <div className="font-medium">Olivia Smith</div>
//                       <div className="hidden text-sm text-muted-foreground md:inline">
//                         olivia@example.com
//                       </div>
//                     </TableCell>
//                     <TableCell className="hidden xl:table-column">
//                       Refund
//                     </TableCell>
//                     <TableCell className="hidden xl:table-column">
//                       <Badge className="text-xs" variant="outline">
//                         Declined
//                       </Badge>
//                     </TableCell>
//                     <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
//                       2023-06-24
//                     </TableCell>
//                     <TableCell className="text-right">$150.00</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell>
//                       <div className="font-medium">Noah Williams</div>
//                       <div className="hidden text-sm text-muted-foreground md:inline">
//                         noah@example.com
//                       </div>
//                     </TableCell>
//                     <TableCell className="hidden xl:table-column">
//                       Subscription
//                     </TableCell>
//                     <TableCell className="hidden xl:table-column">
//                       <Badge className="text-xs" variant="outline">
//                         Approved
//                       </Badge>
//                     </TableCell>
//                     <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
//                       2023-06-25
//                     </TableCell>
//                     <TableCell className="text-right">$350.00</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell>
//                       <div className="font-medium">Emma Brown</div>
//                       <div className="hidden text-sm text-muted-foreground md:inline">
//                         emma@example.com
//                       </div>
//                     </TableCell>
//                     <TableCell className="hidden xl:table-column">
//                       Sale
//                     </TableCell>
//                     <TableCell className="hidden xl:table-column">
//                       <Badge className="text-xs" variant="outline">
//                         Approved
//                       </Badge>
//                     </TableCell>
//                     <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
//                       2023-06-26
//                     </TableCell>
//                     <TableCell className="text-right">$450.00</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell>
//                       <div className="font-medium">Liam Johnson</div>
//                       <div className="hidden text-sm text-muted-foreground md:inline">
//                         liam@example.com
//                       </div>
//                     </TableCell>
//                     <TableCell className="hidden xl:table-column">
//                       Sale
//                     </TableCell>
//                     <TableCell className="hidden xl:table-column">
//                       <Badge className="text-xs" variant="outline">
//                         Approved
//                       </Badge>
//                     </TableCell>
//                     <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
//                       2023-06-27
//                     </TableCell>
//                     <TableCell className="text-right">$550.00</TableCell>
//                   </TableRow>
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//           <Card x-chunk="dashboard-01-chunk-5">
//             <CardHeader>
//               <CardTitle>Recent Sales</CardTitle>
//             </CardHeader>
//             <CardContent className="grid gap-8">
//               <div className="flex items-center gap-4">
//                 <Avatar className="hidden h-9 w-9 sm:flex">
//                   <AvatarImage src="/avatars/01.png" alt="Avatar" />
//                   <AvatarFallback>OM</AvatarFallback>
//                 </Avatar>
//                 <div className="grid gap-1">
//                   <p className="text-sm font-medium leading-none">
//                     Olivia Martin
//                   </p>
//                   <p className="text-sm text-muted-foreground">
//                     olivia.martin@email.com
//                   </p>
//                 </div>
//                 <div className="ml-auto font-medium">+$1,999.00</div>
//               </div>
//               <div className="flex items-center gap-4">
//                 <Avatar className="hidden h-9 w-9 sm:flex">
//                   <AvatarImage src="/avatars/02.png" alt="Avatar" />
//                   <AvatarFallback>JL</AvatarFallback>
//                 </Avatar>
//                 <div className="grid gap-1">
//                   <p className="text-sm font-medium leading-none">
//                     Jackson Lee
//                   </p>
//                   <p className="text-sm text-muted-foreground">
//                     jackson.lee@email.com
//                   </p>
//                 </div>
//                 <div className="ml-auto font-medium">+$39.00</div>
//               </div>
//               <div className="flex items-center gap-4">
//                 <Avatar className="hidden h-9 w-9 sm:flex">
//                   <AvatarImage src="/avatars/03.png" alt="Avatar" />
//                   <AvatarFallback>IN</AvatarFallback>
//                 </Avatar>
//                 <div className="grid gap-1">
//                   <p className="text-sm font-medium leading-none">
//                     Isabella Nguyen
//                   </p>
//                   <p className="text-sm text-muted-foreground">
//                     isabella.nguyen@email.com
//                   </p>
//                 </div>
//                 <div className="ml-auto font-medium">+$299.00</div>
//               </div>
//               <div className="flex items-center gap-4">
//                 <Avatar className="hidden h-9 w-9 sm:flex">
//                   <AvatarImage src="/avatars/04.png" alt="Avatar" />
//                   <AvatarFallback>WK</AvatarFallback>
//                 </Avatar>
//                 <div className="grid gap-1">
//                   <p className="text-sm font-medium leading-none">
//                     William Kim
//                   </p>
//                   <p className="text-sm text-muted-foreground">
//                     will@email.com
//                   </p>
//                 </div>
//                 <div className="ml-auto font-medium">+$99.00</div>
//               </div>
//               <div className="flex items-center gap-4">
//                 <Avatar className="hidden h-9 w-9 sm:flex">
//                   <AvatarImage src="/avatars/05.png" alt="Avatar" />
//                   <AvatarFallback>SD</AvatarFallback>
//                 </Avatar>
//                 <div className="grid gap-1">
//                   <p className="text-sm font-medium leading-none">
//                     Sofia Davis
//                   </p>
//                   <p className="text-sm text-muted-foreground">
//                     sofia.davis@email.com
//                   </p>
//                 </div>
//                 <div className="ml-auto font-medium">+$39.00</div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//     </div>
//   );
// }

import Image from "next/image";
import Link from "next/link";
import {
  File,
  Home,
  LayoutDashboard,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

export function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="/"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Home className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">InternMe</span>
          </Link>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Orders</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Orders</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Package className="h-5 w-5" />
                  <span className="sr-only">Products</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Products</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Users2 className="h-5 w-5" />
                  <span className="sr-only">Customers</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Customers</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <LineChart className="h-5 w-5" />
                  <span className="sr-only">Analytics</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Analytics</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">InternMe</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Users2 className="h-5 w-5" />
                  Customers
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          {/* <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Products</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>All Products</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb> */}
          <div className="relative ml-auto flex-1 md:grow-0">
            {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            /> */}
          </div>
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src="/mesh.jpeg"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
                <TabsTrigger value="archived" className="hidden sm:flex">
                  Archived
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Archived
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" variant="outline" className="h-8 gap-1">
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                  </span>
                </Button>
                <Button size="sm" className="h-8 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Product
                  </span>
                </Button>
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Products</CardTitle>
                  <CardDescription>
                    Manage your products and view their sales performance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Price
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Total Sales
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Created at
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="hidden sm:table-cell">
                          <Image
                            alt="Product image"
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src="/placeholder.svg"
                            width="64"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          Laser Lemonade Machine
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">Draft</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          $499.99
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          25
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          2023-07-12 10:42 AM
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="hidden sm:table-cell">
                          <Image
                            alt="Product image"
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src="/placeholder.svg"
                            width="64"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          Hypernova Headphones
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">Active</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          $129.99
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          100
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          2023-10-18 03:21 PM
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="hidden sm:table-cell">
                          <Image
                            alt="Product image"
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src="/placeholder.svg"
                            width="64"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          AeroGlow Desk Lamp
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">Active</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          $39.99
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          50
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          2023-11-29 08:15 AM
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="hidden sm:table-cell">
                          <Image
                            alt="Product image"
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src="/placeholder.svg"
                            width="64"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          TechTonic Energy Drink
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">Draft</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          $2.99
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          0
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          2023-12-25 11:59 PM
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="hidden sm:table-cell">
                          <Image
                            alt="Product image"
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src="/placeholder.svg"
                            width="64"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          Gamer Gear Pro Controller
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">Active</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          $59.99
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          75
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          2024-01-01 12:00 AM
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="hidden sm:table-cell">
                          <Image
                            alt="Product image"
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src="/placeholder.svg"
                            width="64"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          Luminous VR Headset
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">Active</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          $199.99
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          30
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          2024-02-14 02:14 PM
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
