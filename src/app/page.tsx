import NavHeader from "@/components/ui/nav-header";
import { HeroSection } from "@/components/ui/hero-section";
import { TrustStrip } from "@/components/ui/trust-strip";
import { AboutSection } from "@/components/ui/about-section";
import { WhyChooseUs } from "@/components/ui/why-choose-us";
import { ServicesParallax } from "@/components/ui/services-parallax";
import { HowItWorks } from "@/components/ui/how-it-works";
import { EventStyle } from "@/components/ui/event-style";
import { ContactSection } from "@/components/ui/contact-section";
import { Footer } from "@/components/ui/footer";

export default function Home() {
  return (
    <>
      <NavHeader />
      <main>
        <HeroSection />
        <TrustStrip />
        <AboutSection />
        <WhyChooseUs />
        <ServicesParallax />
        <HowItWorks />
        <EventStyle />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
