import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Faq(){
    return(
    <section id="faq" className="py-24 md:py-32 bg-[var(--background)]">
    <div className="container mx-auto px-4 md:px-6">
    <div className="text-center mb-16">
        <h2 className="text-4xl font-semibold mb-4">Frequently Asked Questions</h2>
        <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
        Find answers to common questions about FinX and how it can help you manage your finances.
        </p>
    </div>

    <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
            <AccordionTrigger className="text-left text-[15px] py-4 cursor-pointer">Is my financial data secure with FinX?</AccordionTrigger>
            <AccordionContent>
            Yes, security is our top priority. FinX uses bank-level encryption to protect your data. We never
            store your bank credentials, and all connections are made through secure APIs. Additionally, we use
            Supabase for our database, which provides enterprise-grade security features.
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
            <AccordionTrigger className="text-left text-[15px] py-4 cursor-pointer" >How does FinX connect to my bank accounts?</AccordionTrigger>
            <AccordionContent>
            FinX uses secure API connections to link with your financial institutions. This process is read-only,
            meaning we can only view your transaction data but cannot make changes to your accounts. You can
            disconnect these links at any time.
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
            <AccordionTrigger className="text-left text-[15px] py-4 cursor-pointer">
            Can I track investments from multiple brokerages?
            </AccordionTrigger>
            <AccordionContent>
            FinX is designed to aggregate financial data from multiple sources, including different brokerages,
            banks, and investment platforms. This gives you a comprehensive view of your entire financial
            portfolio in one place.
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
            <AccordionTrigger className="text-left text-[15px] py-4 cursor-pointer duration-300 transition">Is FinX available on mobile devices?</AccordionTrigger>
            <AccordionContent>
            Yes, FinX is fully responsive and works on all devices. We're also developing native mobile apps for
            iOS and Android that will be available soon, providing an even better experience on your smartphone or
            tablet.
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
            <AccordionTrigger className="text-left text-[15px] py-4 cursor-pointer">How much does FinX cost?</AccordionTrigger>
            <AccordionContent>
            FinX offers a free basic plan that includes essential financial tracking features. For advanced
            features like investment analysis, budget automation, and financial goal planning, we offer premium
            plans starting at $9.99/month. All plans come with a 14-day free trial.
            </AccordionContent>
        </AccordionItem>
        </Accordion>
    </div>
    </div>
    </section>
    )
}

