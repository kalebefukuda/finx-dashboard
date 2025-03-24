export default function HowItWorks(){
    return (
        <section id="about" className="mt-40 py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold mb-4">How it works</h2>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
              With lots of unique blocks, you can easily build a page without coding. Build your next landing page.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map((step) => (
              <div key={step} className="bg-[var(--card)] text-[var(--card-foreground)] p-8 rounded-lg border border-[var(--border)] relative hover:shadow-[0_0_30px_rgba(0,187,129,0.2)] transition duration-300">
                <div className="absolute top-8 left-8 w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-medium text-sm">
                  {step}
                </div>
                <div className="pt-12">
                  <p className="font-medium">
                    {step === 1 && "Sign up for creating your first online store with ease."}
                    {step === 2 && "Add your products to your store and customize."}
                    {step === 3 && "Sell and earn as much as you can. Grow fast."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
}