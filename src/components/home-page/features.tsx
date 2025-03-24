import { BarChart3, Clock, LineChart, PieChart, Shield, Wallet } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function Features(){
    return(
        <section id="features" className="mt-60 py-24 md:py-32 bg-[var(--muted)]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold mb-4">Powerful Features</h2>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
              FinX provides all the tools you need to take control of your financial life with a clean, intuitive
              interface.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-[var(--card)] border-[var(--border)] hover:shadow-lg transition duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-[var(--color-primary)]" />
                </div>
                <h3 className="text-xl font-medium mb-2">Asset Evolution</h3>
                <p className="text-[var(--muted-foreground)]">
                  Track your wealth growth over time with interactive bar charts that show your financial progress.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[var(--card)] border-[var(--border)] hover:shadow-lg transition duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mb-4">
                  <PieChart className="h-6 w-6 text-[var(--color-primary)]" />
                </div>
                <h3 className="text-xl font-medium mb-2">Asset Distribution</h3>
                <p className="text-[var(--muted-foreground)]">
                  Visualize how your investments are allocated across different asset classes with intuitive pie charts.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[var(--card)] border-[var(--border)] hover:shadow-lg transition duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mb-4">
                  <LineChart className="h-6 w-6 text-[var(--color-primary)]" />
                </div>
                <h3 className="text-xl font-medium mb-2">Performance Tracking</h3>
                <p className="text-[var(--muted-foreground)]">
                  Monitor the performance of your investments with detailed line charts and performance metrics.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-8">
            <Card className="bg-[var(--card)] border-[var(--border)] hover:shadow-lg transition duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mb-4">
                  <Wallet className="h-6 w-6 text-[var(--color-primary)]" />
                </div>
                <h3 className="text-xl font-medium mb-2">Budget Management</h3>
                <p className="text-[var(--muted-foreground)]">
                  Create and manage budgets to keep your spending in check and achieve your financial goals.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[var(--card)] border-[var(--border)] hover:shadow-lg transition duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-[var(--color-primary)]" />
                </div>
                <h3 className="text-xl font-medium mb-2">Secure Data</h3>
                <p className="text-[var(--muted-foreground)]">
                  Your financial data is encrypted and securely stored, giving you peace of mind about your sensitive
                  information.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[var(--card)] border-[var(--border)] hover:shadow-lg transition duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-[var(--color-primary)]" />
                </div>
                <h3 className="text-xl font-medium mb-2">Real-time Updates</h3>
                <p className="text-[var(--muted-foreground)]">
                  Get real-time updates on your investments and financial status with automatic data synchronization.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
}