import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

export default function DashboardPreview(){
    return(
        <section id="dashboard" className="md:py-32 bg-[var(--background)]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold mb-4">Dashboard Preview</h2>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
              Get a glimpse of our intuitive dashboard interface inspired by modern financial platforms.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger className="cursor-pointer" value="overview">Overview</TabsTrigger>
                <TabsTrigger className="cursor-pointer" value="investments">Investments</TabsTrigger>
                <TabsTrigger className="cursor-pointer" value="budget">Budget</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-0">
                <div className="bg-[var(--card)] rounded-lg border border-[var(--border)] overflow-hidden shadow-lg">
                  <Image
                    src="/placeholder.svg?height=600&width=1200"
                    width={1200}
                    height={600}
                    alt="FinX Dashboard Overview"
                    className="w-full h-auto"
                  />
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium mb-2">Complete Financial Overview</h3>
                  <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
                    Get a bird's eye view of your entire financial situation with our comprehensive dashboard.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="investments" className="mt-0">
                <div className="bg-[var(--card)] rounded-lg border border-[var(--border)] overflow-hidden shadow-lg">
                  <Image
                    src="/placeholder.svg?height=600&width=1200"
                    width={1200}
                    height={600}
                    alt="FinX Investments Dashboard"
                    className="w-full h-auto"
                  />
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium mb-2">Investment Portfolio Tracker</h3>
                  <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
                    Track your investments with detailed charts showing asset allocation and performance over time.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="budget" className="mt-0">
                <div className="bg-[var(--card)] rounded-lg border border-[var(--border)] overflow-hidden shadow-lg">
                  <Image
                    src="/placeholder.svg?height=600&width=1200"
                    width={1200}
                    height={600}
                    alt="FinX Budget Dashboard"
                    className="w-full h-auto"
                  />
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium mb-2">Budget Management</h3>
                  <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
                    Set budgets, track expenses, and visualize your spending patterns to stay on top of your finances.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    )
}