import "./ExplorePage.css";
import PageWrapper from "../components/PageWrapper";

import HeroSlider from "../components/explore/HeroSlider";
import CategoriesSection from "../components/explore/CategoriesSection";
import CTASection from "../components/explore/CTASection";

export default function ExplorePage() {
  return (
    <PageWrapper>
      <div className="explore">
        <HeroSlider />
        <CategoriesSection />
        <CTASection />
      </div>
    </PageWrapper>
  );
}
