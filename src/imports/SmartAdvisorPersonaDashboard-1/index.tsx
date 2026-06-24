import svgPaths from "./svg-39lo1t163e";

function Container() {
  return (
    <div className="relative shrink-0 size-[25px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
        <g id="Container">
          <path d={svgPaths.p28e68a0} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function FloatingActionButton() {
  return (
    <div className="absolute bg-[#005b65] bottom-[95.5px] content-stretch flex items-center justify-center right-[32px] rounded-[9999px] size-[64px] z-[4]" data-name="Floating Action Button">
      <div className="absolute bg-[rgba(255,255,255,0)] bottom-0 right-0 rounded-[9999px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] size-[64px]" data-name="Floating Action Button:shadow" />
      <Container />
    </div>
  );
}

function Container2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p1c483e80} fill="var(--fill-0, #005B65)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Geist:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#005b65] text-[12px] tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px]">Advisor</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex flex-col items-center relative" data-name="Link">
      <Container2 />
      <Container3 />
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[18px] relative shrink-0 w-[19px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 18">
        <g id="Container">
          <path d={svgPaths.p53fc80} fill="var(--fill-0, #6F797A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Geist:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#6f797a] text-[12px] tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px]">Portfolio</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-center left-[128.36px] top-1/2" data-name="Link">
      <Container4 />
      <Container5 />
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[21px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 21">
        <g id="Container">
          <path d={svgPaths.p12930f00} fill="var(--fill-0, #6F797A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Geist:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#6f797a] text-[12px] tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px]">Vault</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-center left-[226.17px] top-1/2" data-name="Link">
      <Container6 />
      <Container7 />
    </div>
  );
}

function Container8() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p2816f2c0} fill="var(--fill-0, #6F797A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Geist:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#6f797a] text-[12px] tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px]">Support</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-center left-[301.89px] top-1/2" data-name="Link">
      <Container8 />
      <Container9 />
    </div>
  );
}

function Container1() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 absolute flex h-[39.6px] items-center justify-center left-[34.93px] top-1/2 w-[53.14px]">
          <div className="flex-none scale-x-[110.00000000000001%] scale-y-[110.00000000000001%]">
            <Link />
          </div>
        </div>
        <Link1 />
        <Link2 />
        <Link3 />
      </div>
    </div>
  );
}

function BottomNavBarMobileOnly() {
  return (
    <div className="absolute backdrop-blur-[8px] bg-[rgba(224,227,227,0.9)] bottom-[-0.5px] content-stretch flex flex-col h-[64px] items-start justify-center left-0 pt-px w-[390px] z-[3]" data-name="BottomNavBar (Mobile Only)">
      <div aria-hidden className="absolute border-[#bec8ca] border-solid border-t inset-0 pointer-events-none" />
      <div className="absolute bg-[rgba(255,255,255,0)] bottom-0 h-[64px] left-0 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] w-[390px]" data-name="BottomNavBar (Mobile Only):shadow" />
      <Container1 />
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[17px] relative shrink-0 w-[22px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 17">
        <g id="Container">
          <path d={svgPaths.paad5c90} fill="var(--fill-0, #005B65)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[46.02px] relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#005b65] text-[24px] whitespace-nowrap">
        <p className="leading-[32px] mb-0">Smart</p>
        <p className="leading-[32px]">Advisor</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <Container12 />
      <Container13 />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#005b65] content-stretch flex flex-col items-center justify-center px-[26.44px] py-[8px] relative rounded-[9999px] shrink-0" data-name="Button">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[9999px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" data-name="Button:shadow" />
      <div className="[word-break:break-word] flex flex-col font-['Geist:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-center text-white tracking-[0.28px] whitespace-nowrap">
        <p className="leading-[20px] mb-0">Start with</p>
        <p className="leading-[20px]">AI</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[64px] max-w-[1440px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center max-w-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between max-w-[inherit] px-[48px] relative size-full">
          <Container11 />
          <Button />
        </div>
      </div>
    </div>
  );
}

function HeaderTopAppBar() {
  return (
    <div className="backdrop-blur-[12px] bg-[rgba(247,250,250,0.8)] content-stretch flex flex-col items-start pb-px relative shrink-0 w-full z-[2]" data-name="Header - TopAppBar">
      <div aria-hidden className="absolute border-[#bec8ca] border-b border-solid inset-0 pointer-events-none shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Container10 />
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#506b96] content-stretch flex flex-col items-start px-[13px] py-[5px] relative rounded-[9999px] shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#bec8ca] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#e3ebff] text-[12px] tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px]">Verified Identity</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <BackgroundBorder />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[48px] tracking-[-0.96px] w-full">
        <p className="leading-[56px] mb-0">Your Financial</p>
        <p className="leading-[56px] mb-0">Persona:</p>
        <p className="leading-[56px] mb-0 text-[#005b65]">Emerging</p>
        <p className="leading-[56px] text-[#005b65]">Professional</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[672px] pt-[8px] relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6f797a] text-[18px] w-full">
        <p className="leading-[28px] mb-0">Based on your spending patterns, risk</p>
        <p className="leading-[28px] mb-0">{`tolerance, and active assets, we've`}</p>
        <p className="leading-[28px] mb-0">mapped your trajectory towards high-net-</p>
        <p className="leading-[28px]">worth status.</p>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Hero Section">
      <Container15 />
      <Heading />
      <Container16 />
    </div>
  );
}

function Container18() {
  return (
    <div className="relative shrink-0 size-[27px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 27">
        <g id="Container">
          <path d={svgPaths.p18f6af16} fill="var(--fill-0, #005B65)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6f797a] text-[12px] tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px]">RISK</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Container18 />
        <Container19 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[28px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#bec8ca] text-[14px] tracking-[0.28px] w-full">
          <p className="leading-[20px]">Appetite</p>
        </div>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[12px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[24px] w-full">
          <p className="leading-[32px]">Moderate</p>
        </div>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#e0e3e3] h-[8px] relative rounded-[9999px] shrink-0 w-full" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bg-[#005b65] inset-[0_40%_0_0]" data-name="Background" />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold_Italic',sans-serif] font-semibold italic justify-center leading-[0] relative shrink-0 text-[#6f797a] text-[12px] tracking-[0.6px] w-full">
          <p className="leading-[16px]">Balanced growth with safety.</p>
        </div>
      </div>
    </div>
  );
}

function RiskAppetiteCard() {
  return (
    <div className="backdrop-blur-[10px] bg-[rgba(255,255,255,0.6)] relative rounded-[32px] shrink-0 w-full" data-name="Risk Appetite Card">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.05)] border-solid inset-0 pointer-events-none rounded-[32px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[4px] items-start p-[25px] relative size-full">
        <Container17 />
        <Container20 />
        <Container21 />
        <Background />
        <Container22 />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[28.5px] relative shrink-0 w-[30px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 28.5">
        <g id="Container">
          <path d={svgPaths.p3a543680} fill="var(--fill-0, #37537C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6f797a] text-[12px] tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px]">SAVINGS</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Container24 />
        <Container25 />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[28px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#bec8ca] text-[14px] tracking-[0.28px] w-full">
          <p className="leading-[20px]">Discipline</p>
        </div>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[12px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[24px] w-full">
          <p className="leading-[32px]">High</p>
        </div>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#e0e3e3] h-[8px] relative rounded-[9999px] shrink-0 w-full" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bg-[#37537c] inset-[0_8%_0_0]" data-name="Background" />
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold_Italic',sans-serif] font-semibold italic justify-center leading-[0] relative shrink-0 text-[#6f797a] text-[12px] tracking-[0.6px] w-full">
          <p className="leading-[16px]">92nd percentile in cohort.</p>
        </div>
      </div>
    </div>
  );
}

function SavingsDisciplineCard() {
  return (
    <div className="backdrop-blur-[10px] bg-[rgba(255,255,255,0.6)] relative rounded-[32px] shrink-0 w-full" data-name="Savings Discipline Card">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.05)] border-solid inset-0 pointer-events-none rounded-[32px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[4px] items-start p-[25px] relative size-full">
        <Container23 />
        <Container26 />
        <Container27 />
        <Background1 />
        <Container28 />
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="relative size-[128px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 128 128">
        <g id="SVG">
          <path d={svgPaths.p32d83000} id="Vector" stroke="var(--stroke-0, #E0E3E3)" strokeWidth="8" />
          <path d={svgPaths.p32d83000} id="Vector_2" stroke="var(--stroke-0, #005B65)" strokeWidth="8" />
        </g>
      </svg>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Container">
      <div className="flex items-center justify-center relative shrink-0 size-[128px]">
        <div className="-rotate-90 flex-none">
          <Svg />
        </div>
      </div>
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] left-[36.78px] not-italic text-[#191c1d] text-[24px] top-[64px] whitespace-nowrap">
        <p className="leading-[32px]">80%</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6f797a] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">READINESS SCORE</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[24px] whitespace-nowrap">
        <p className="leading-[32px] mb-0">Investment</p>
        <p className="leading-[32px]">Readiness</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6f797a] text-[16px] whitespace-nowrap">
        <p className="leading-[24px] mb-0">You have a high</p>
        <p className="leading-[24px] mb-0">capital efficiency.</p>
        <p className="leading-[24px] mb-0">Consider</p>
        <p className="leading-[24px] mb-0">diversifying into</p>
        <p className="leading-[24px]">emerging markets.</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[141.05px]" data-name="Container">
      <Container32 />
      <Container33 />
      <Container34 />
    </div>
  );
}

function Container29() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-center relative size-full">
        <Container30 />
        <Container31 />
      </div>
    </div>
  );
}

function InvestmentReadinessCard() {
  return (
    <div className="backdrop-blur-[10px] bg-[rgba(255,255,255,0.6)] relative rounded-[32px] shrink-0 w-full" data-name="Investment Readiness Card">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[25px] relative size-full">
          <Container29 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.05)] border-solid inset-0 pointer-events-none rounded-[32px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function BentoGrid() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start pt-[24px] relative shrink-0 w-full" data-name="Bento Grid">
      <RiskAppetiteCard />
      <SavingsDisciplineCard />
      <InvestmentReadinessCard />
    </div>
  );
}

function Heading2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[24px] w-full">
          <p className="leading-[32px]">Financial Goals</p>
        </div>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="h-[18px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 18">
        <g id="Container">
          <path d={svgPaths.p12a32500} fill="var(--fill-0, #BBF6FF)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#28747e] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[40px]" data-name="Background">
      <Container37 />
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Geist:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[14px] tracking-[0.28px] whitespace-nowrap">
        <p className="leading-[20px]">Real Estate Fund</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#005b65] text-[12px] tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px]">65%</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex h-[20px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container40 />
      <Container41 />
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#e0e3e3] h-[6px] overflow-clip relative rounded-[9999px] shrink-0 w-full" data-name="Background">
      <div className="absolute bg-[#005b65] inset-[0_35%_0_0]" data-name="Background" />
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-name="Container">
      <Container39 />
      <Background3 />
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Background2 />
      <Container38 />
    </div>
  );
}

function Container43() {
  return (
    <div className="h-[18.15px] relative shrink-0 w-[20.679px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.6794 18.15">
        <g id="Container">
          <path d={svgPaths.p37534660} fill="var(--fill-0, #E3EBFF)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#506b96] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[40px]" data-name="Background">
      <Container43 />
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Geist:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[14px] tracking-[0.28px] whitespace-nowrap">
        <p className="leading-[20px]">Retirement Portfolio</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#37537c] text-[12px] tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px]">42%</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex h-[20px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container46 />
      <Container47 />
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#e0e3e3] h-[6px] overflow-clip relative rounded-[9999px] shrink-0 w-full" data-name="Background">
      <div className="absolute bg-[#37537c] inset-[0_58%_0_0]" data-name="Background" />
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-name="Container">
      <Container45 />
      <Background5 />
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Background4 />
      <Container44 />
    </div>
  );
}

function Container49() {
  return (
    <div className="h-[18px] relative shrink-0 w-[22px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 18">
        <g id="Container">
          <path d={svgPaths.pb257040} fill="var(--fill-0, #6F797A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-[#e0e3e3] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[40px]" data-name="Background">
      <Container49 />
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Geist:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[14px] tracking-[0.28px] whitespace-nowrap">
        <p className="leading-[20px]">Education Trust</p>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6f797a] text-[12px] tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px]">12%</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex items-start justify-between relative size-full">
        <Container52 />
        <Container53 />
      </div>
    </div>
  );
}

function Background7() {
  return (
    <div className="bg-[#e0e3e3] h-[6px] overflow-clip relative rounded-[9999px] shrink-0 w-full" data-name="Background">
      <div className="absolute bg-[#6f797a] inset-[0_88%_0_0]" data-name="Background" />
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-name="Container">
      <Container51 />
      <Background7 />
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Background6 />
      <Container50 />
    </div>
  );
}

function Container35() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-start relative size-full">
        <Container36 />
        <Container42 />
        <Container48 />
      </div>
    </div>
  );
}

function FinancialGoals() {
  return (
    <div className="backdrop-blur-[10px] bg-[rgba(255,255,255,0.6)] relative rounded-[32px] shrink-0 w-full" data-name="Financial Goals">
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.05)] border-solid inset-0 pointer-events-none rounded-[32px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[24px] items-start p-[33px] relative size-full">
        <Heading2 />
        <Container35 />
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="relative shrink-0 size-[22px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="Container">
          <path d={svgPaths.p27114680} fill="var(--fill-0, #005B65)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[24px] whitespace-nowrap">
        <p className="leading-[32px]">AI Portfolio Insights</p>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Container">
      <Container56 />
      <Heading3 />
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3f484a] text-[18px] w-full">
        <p className="leading-[29.25px] mb-0">{`Your current "Emerging`}</p>
        <p className="leading-[29.25px] mb-0">{`Professional" persona suggests a`}</p>
        <p className="leading-[29.25px] mb-0">high capacity for asset</p>
        <p className="leading-[29.25px] mb-0">accumulation. We recommend</p>
        <p className="mb-0">
          <span className="leading-[29.25px]">{`reallocating `}</span>
          <span className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[29.25px] not-italic text-[#005b65]">12% of your liquid</span>
        </p>
        <p className="mb-0">
          <span className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[29.25px] not-italic text-[#005b65]">savings</span>
          <span className="leading-[29.25px]">{` into Bluechip Growth`}</span>
        </p>
        <p className="leading-[29.25px] mb-0">funds to combat current</p>
        <p className="leading-[29.25px]">inflationary trends.</p>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3f484a] text-[18px] w-full">
        <p className="leading-[29.25px] mb-0">Our models predict a surplus of</p>
        <p className="leading-[29.25px] mb-0">₹2.4L next quarter based on your</p>
        <p className="leading-[29.25px] mb-0">recent spending deceleration.</p>
        <p className="mb-0">
          <span className="leading-[29.25px]">{`Setting up a `}</span>
          <span className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[29.25px] not-italic text-[#37537c]">Step-up SIP</span>
          <span className="leading-[29.25px]">{` today`}</span>
        </p>
        <p className="leading-[29.25px] mb-0">could increase your 5-year wealth</p>
        <p className="leading-[29.25px]">projection by 18%.</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Container58 />
      <Container59 />
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[#005b65] content-stretch flex flex-col items-center justify-center left-0 px-[32px] py-[13px] rounded-[9999px] top-[8px]" data-name="Button">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[9999px] shadow-[0px_4px_6px_-1px_rgba(0,91,101,0.2),0px_2px_4px_-2px_rgba(0,91,101,0.2)]" data-name="Button:shadow" />
      <div className="[word-break:break-word] flex flex-col font-['Geist:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-center text-white tracking-[0.28px] whitespace-nowrap">
        <p className="leading-[20px] mb-0">Execute</p>
        <p className="leading-[20px]">Recommendation</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[198.34px] px-[33px] py-[13px] rounded-[9999px] top-[8px]" data-name="Button">
      <div aria-hidden className="absolute border border-[#6f797a] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="[word-break:break-word] flex flex-col font-['Geist:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#191c1d] text-[14px] text-center tracking-[0.28px] whitespace-nowrap">
        <p className="leading-[20px] mb-0">Details</p>
        <p className="leading-[20px]">Analysis</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="h-[74px] relative shrink-0 w-full" data-name="Container">
      <Button1 />
      <Button2 />
    </div>
  );
}

function VisualDecoration() {
  return (
    <div className="absolute bottom-[-19.5px] h-[172.667px] right-[-20px] w-[158.431px]" data-name="Visual Decoration">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 158.431 172.667">
        <g id="Visual Decoration" opacity="0.05">
          <path d={svgPaths.pe4d9e50} fill="var(--fill-0, #191C1D)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container54() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-start p-[32px] relative size-full">
        <Container55 />
        <Container57 />
        <Container60 />
        <VisualDecoration />
      </div>
    </div>
  );
}

function AiInsightsSection() {
  return (
    <div className="backdrop-blur-[10px] bg-[rgba(255,255,255,0.6)] relative rounded-[32px] shrink-0 w-full" data-name="AI Insights Section">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container54 />
      </div>
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.05)] border-solid inset-0 pointer-events-none rounded-[32px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function SecondRow() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Second Row">
      <FinancialGoals />
      <AiInsightsSection />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 2">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[32px] text-center tracking-[-0.32px] whitespace-nowrap">
        <p className="leading-[40px] mb-0">Trajectory</p>
        <p className="leading-[40px]">Analysis</p>
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col items-center leading-[0] max-w-[576px] not-italic relative shrink-0 text-[18px] text-center w-full whitespace-nowrap" data-name="Paragraph">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[#6f797a]">
        <p className="leading-[28px] mb-0">You are currently transitioning</p>
        <p>
          <span className="leading-[28px]">{`from `}</span>
          <span className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] not-italic text-[#191c1d]">Early Saver</span>
          <span className="leading-[28px]">{` to `}</span>
          <span className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] not-italic text-[#005b65]">Wealth</span>
        </p>
      </div>
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center relative shrink-0 text-[#005b65]">
        <p className="mb-0">
          <span className="leading-[28px]">Builder</span>
          <span className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[28px] not-italic text-[#6f797a]">. This phase is critical</span>
        </p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[28px] text-[#6f797a]">for compounding.</p>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex gap-[12px] h-[224px] items-end justify-center pt-[32px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-[#e0e3e3] h-[57.59px] relative rounded-tl-[9999px] rounded-tr-[9999px] shrink-0 w-[26.86px]" data-name="Background" />
      <div className="bg-[#e0e3e3] h-[86.39px] relative rounded-tl-[9999px] rounded-tr-[9999px] shrink-0 w-[26.84px]" data-name="Background" />
      <div className="bg-[#e0e3e3] h-[76.8px] relative rounded-tl-[9999px] rounded-tr-[9999px] shrink-0 w-[26.86px]" data-name="Background" />
      <div className="bg-[rgba(0,91,101,0.2)] h-[144px] relative rounded-tl-[9999px] rounded-tr-[9999px] shrink-0 w-[26.86px]" data-name="Overlay+HorizontalBorder">
        <div aria-hidden className="absolute border-[#005b65] border-solid border-t-2 inset-0 pointer-events-none rounded-tl-[9999px] rounded-tr-[9999px]" />
      </div>
      <div className="bg-[#e0e3e3] h-[115.19px] relative rounded-tl-[9999px] rounded-tr-[9999px] shrink-0 w-[26.86px]" data-name="Background" />
      <div className="bg-[#e0e3e3] h-[163.19px] relative rounded-tl-[9999px] rounded-tr-[9999px] shrink-0 w-[26.86px]" data-name="Background" />
      <div className="bg-[#e0e3e3] h-[134.39px] relative rounded-tl-[9999px] rounded-tr-[9999px] shrink-0 w-[26.86px]" data-name="Background" />
    </div>
  );
}

function Container64() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[18.69px] items-center pb-px pr-[10.68px] relative size-full">
          <div className="bg-[#e0e3e3] h-[12px] relative rounded-[9999px] shrink-0 w-[10.94px]" data-name="Background" />
          <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6f797a] text-[12px] text-center tracking-[0.6px] whitespace-nowrap">
            <p className="leading-[16px] mb-0">Past</p>
            <p className="leading-[16px]">Performance</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12.93px] items-center pb-px pr-[4.92px] relative size-full">
          <div className="bg-[#005b65] h-[12px] relative rounded-[9999px] shrink-0 w-[10.92px]" data-name="Background" />
          <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6f797a] text-[12px] text-center tracking-[0.6px] whitespace-nowrap">
            <p className="leading-[16px] mb-0">AI</p>
            <p className="leading-[16px]">Projected</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex gap-[48px] h-[49px] items-start justify-center pt-[16px] relative shrink-0 w-full" data-name="Container">
      <Container64 />
      <Container65 />
    </div>
  );
}

function Container61() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start relative size-full">
        <Heading1 />
        <Paragraph />
        <Container62 />
        <Container63 />
      </div>
    </div>
  );
}

function PersonaIllustrationChartArea() {
  return (
    <div className="backdrop-blur-[10px] bg-[rgba(255,255,255,0.6)] relative rounded-[32px] shrink-0 w-full" data-name="Persona Illustration/Chart Area">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[49px] relative size-full">
          <div className="absolute inset-px opacity-10" style={{ backgroundImage: "linear-gradient(120.309deg, rgba(0, 91, 101, 0.2) 0%, rgba(0, 91, 101, 0) 50%, rgba(55, 83, 124, 0.2) 100%)" }} data-name="Gradient" />
          <Container61 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0.05)] border-solid inset-0 pointer-events-none rounded-[32px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function MainContent() {
  return (
    <div className="flex-[1_0_0] min-w-px relative self-stretch" data-name="Main Content">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start px-[16px] py-[48px] relative size-full">
          <HeroSection />
          <div className="absolute bg-[rgba(0,91,101,0.05)] blur-[60px] inset-[-10%_-10%_92.86%_-18.21%] rounded-[9999px]" data-name="Background Glow" />
          <BentoGrid />
          <SecondRow />
          <PersonaIllustrationChartArea />
        </div>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex h-[2922.5px] items-start justify-center max-w-[1440px] relative shrink-0 w-full z-[1]" data-name="Container">
      <MainContent />
    </div>
  );
}

export default function SmartAdvisorPersonaDashboard() {
  return (
    <div className="content-stretch flex flex-col isolate items-start relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(247, 250, 250) 0%, rgb(247, 250, 250) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="Smart Advisor - Persona Dashboard">
      <FloatingActionButton />
      <BottomNavBarMobileOnly />
      <HeaderTopAppBar />
      <Container14 />
    </div>
  );
}