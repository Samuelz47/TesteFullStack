import { Outlet, NavLink } from "react-router-dom"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, Tags, ArrowRightLeft, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner"

const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Pessoas', href: '/pessoas', icon: Users },
    { name: 'Categorias', href: '/categorias', icon: Tags },
    { name: 'Transações', href: '/transacoes', icon: ArrowRightLeft },
]

export function Layout() {
    return (
        <div className="flex min-h-screen w-full bg-muted/40">
            {/* Desktop Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <span className="flex items-center gap-2 font-semibold">
                        <span>FinanceApp</span>
                    </span>
                </div>
                <nav className="grid items-start px-2 py-4 text-sm font-medium lg:px-4 gap-2">
                    {navigation.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.href}
                            className={({ isActive }) =>
                                cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted/50",
                                    isActive ? "bg-muted text-primary" : ""
                                )
                            }
                        >
                            <item.icon className="h-4 w-4" />
                            {item.name}
                        </NavLink>
                    ))}
                </nav>
            </aside>

            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-64 w-full">
                {/* Header */}
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="icon" variant="outline" className="sm:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="sm:max-w-xs">
                            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                            <nav className="grid gap-6 text-lg font-medium py-6">
                                <span className="flex items-center gap-2 text-lg font-semibold px-2.5">
                                    <span>FinanceApp</span>
                                </span>
                                {navigation.map((item) => (
                                    <NavLink
                                        key={item.name}
                                        to={item.href}
                                        className={({ isActive }) =>
                                            cn(
                                                "flex items-center gap-4 px-2.5 py-2 rounded-md text-muted-foreground hover:text-foreground",
                                                isActive ? "text-primary bg-muted/50" : ""
                                            )
                                        }
                                    >
                                        <item.icon className="h-5 w-5" />
                                        {item.name}
                                    </NavLink>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <div className="flex flex-1 justify-end">
                    </div>
                </header>

                {/* Main Content */}
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    {/* Rounded container for aesthetic modern UI */}
                    <div className="flex-1 w-full rounded-xl bg-background border p-6 min-h-[calc(100vh-8rem)]">
                        <Outlet />
                    </div>
                </main>
            </div>
            <Toaster />
        </div>
    )
}
