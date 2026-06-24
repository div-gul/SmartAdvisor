import svgPaths from "./svg-bq7qdh7tyf";

function Container1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p1c483e80} fill="var(--fill-0, #6F797A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Geist:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#6f797a] text-[12px] tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px]">Advisor</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Link">
      <Container1 />
      <Container2 />
    </div>
  );
}

function Container3() {
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

function Container4() {
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
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Link">
      <Container3 />
      <Container4 />
    </div>
  );
}

function Container5() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p1b2fa180} fill="var(--fill-0, #005B65)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Geist:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#005b65] text-[12px] tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px]">Health Dashboard</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Link">
      <Container5 />
      <Container6 />
    </div>
  );
}

function Container7() {
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

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Geist:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#6f797a] text-[12px] tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px]">Vault</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Link">
      <Container7 />
      <Container8 />
    </div>
  );
}

function Container9() {
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

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Geist:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#6f797a] text-[12px] tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px]">Support</p>
      </div>
    </div>
  );
}

function Link4() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Link">
      <Container9 />
      <Container10 />
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.7px] items-center px-[21.83px] py-[12px] relative size-full">
          <Link />
          <Link1 />
          <Link2 />
          <Link3 />
          <Link4 />
        </div>
      </div>
    </div>
  );
}

function BottomNavigationBarMobileOnly() {
  return (
    <div className="absolute backdrop-blur-[8px] bg-[rgba(247,250,250,0.9)] bottom-[1181px] content-stretch flex flex-col items-start left-0 pt-px w-[390px] z-[3]" data-name="Bottom Navigation Bar (Mobile Only)">
      <div aria-hidden className="absolute border-[#bec8ca] border-solid border-t inset-0 pointer-events-none" />
      <div className="absolute bg-[rgba(255,255,255,0)] bottom-0 left-0 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] top-0 w-[390px]" data-name="Bottom Navigation Bar (Mobile Only):shadow" />
      <Container />
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[17.305px] relative shrink-0 w-[22.179px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.1794 17.3049">
        <g id="Container">
          <path d={svgPaths.p34599480} fill="var(--fill-0, #005B65)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 1">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#005b65] text-[24px] whitespace-nowrap">
        <p className="leading-[32px]">Smart Advisor</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <Container13 />
      <Heading />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#005b65] content-stretch flex flex-col items-center justify-center px-[24px] py-[8px] relative rounded-[9999px] shrink-0" data-name="Button">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[9999px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]" data-name="Button:shadow" />
      <div className="[word-break:break-word] flex flex-col font-['Geist:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[24px]">Start with AI</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[64px] max-w-[1440px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center max-w-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between max-w-[inherit] px-[16px] relative size-full">
          <Container12 />
          <Button />
        </div>
      </div>
    </div>
  );
}

function HeaderTopAppBar() {
  return (
    <div className="backdrop-blur-[12px] bg-[rgba(247,250,250,0.8)] content-stretch flex flex-col items-start pb-px relative shrink-0 w-full z-[2]" data-name="Header - Top App Bar">
      <div aria-hidden className="absolute border-[#bec8ca] border-b border-solid inset-0 pointer-events-none shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Container11 />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#005b65] text-[12px] tracking-[1.2px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">VERIFIED STATUS: SECURE</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <div className="bg-[#005b65] relative rounded-[9999px] shadow-[0px_0px_8px_0px_rgba(0,91,101,0.4)] shrink-0 size-[8px]" data-name="Background+Shadow" />
      <Container15 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0 w-full" data-name="Heading 2">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[24px] w-full">
        <p className="leading-[32px]">Financial Health Dashboard</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3f484a] text-[16px] w-full">
        <p className="leading-[24px]">Real-time analysis of your digital fortress.</p>
      </div>
    </div>
  );
}

function HeaderSection() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Header Section">
      <Container14 />
      <Heading1 />
      <Container16 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Geist:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3f484a] text-[16px] text-center tracking-[-0.8px] uppercase whitespace-nowrap">
        <p className="leading-[24px]">HEALTH SCORE</p>
      </div>
    </div>
  );
}

function Heading3Margin() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[125.84px] pb-[16px] top-[25px]" data-name="Heading 3:margin">
      <Heading2 />
    </div>
  );
}

function OverlayBorder() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[rgba(0,91,101,0.1)] content-stretch flex flex-col items-center left-[calc(50%-0.01px)] px-[17px] py-[5px] rounded-[9999px] top-[calc(50%+92px)]" data-name="Overlay+Border">
      <div aria-hidden className="absolute border border-[rgba(0,91,101,0.2)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#005b65] text-[12px] text-center tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px]">Excellent</p>
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 128 128">
        <g id="SVG">
          <path d={svgPaths.p24b34580} id="Vector" stroke="var(--stroke-0, #E0E3E3)" strokeWidth="10.24" />
          <path d={svgPaths.p7848c40} id="Vector_2" stroke="var(--stroke-0, #005B65)" strokeLinecap="round" strokeWidth="10.24" />
        </g>
      </svg>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#005b65] text-[48px] text-center tracking-[-0.96px] whitespace-nowrap">
        <p className="leading-[56px]">780</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute content-stretch flex inset-0 items-center justify-center" data-name="Container">
      <Container19 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 size-[128px]" data-name="Container">
      <Svg />
      <Container18 />
    </div>
  );
}

function Margin() {
  return (
    <div className="absolute content-stretch flex flex-col h-[144px] items-start left-[115px] pb-[16px] top-[65px] w-[128px]" data-name="Margin">
      <Container17 />
    </div>
  );
}

function HealthScoreCard() {
  return (
    <div className="bg-white h-[260px] relative rounded-[32px] shrink-0 w-full" data-name="Health Score Card">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Heading3Margin />
        <OverlayBorder />
        <div className="absolute bg-[rgba(0,91,101,0.05)] blur-[32px] right-[-15px] rounded-[9999px] size-[96px] top-[-15px]" data-name="Overlay+Blur" />
        <Margin />
      </div>
      <div aria-hidden className="absolute border border-[#bec8ca] border-solid inset-0 pointer-events-none rounded-[32px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Geist:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3f484a] text-[16px] tracking-[-0.8px] uppercase w-full">
        <p className="leading-[24px]">SAVINGS RATE</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[32px] tracking-[-0.32px] w-full">
        <p className="leading-[40px]">22%</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Heading3 />
        <Container21 />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex gap-[4px] h-[96px] items-end justify-center relative shrink-0 w-full" data-name="Container">
      <div className="bg-[rgba(0,91,101,0.2)] h-[38.39px] relative rounded-tl-[2px] rounded-tr-[2px] shrink-0 w-[40.56px]" data-name="Overlay" />
      <div className="bg-[rgba(0,91,101,0.2)] h-[33.59px] relative rounded-tl-[2px] rounded-tr-[2px] shrink-0 w-[40.58px]" data-name="Overlay" />
      <div className="bg-[rgba(0,91,101,0.2)] h-[52.8px] relative rounded-tl-[2px] rounded-tr-[2px] shrink-0 w-[40.56px]" data-name="Overlay" />
      <div className="bg-[rgba(0,91,101,0.2)] h-[43.19px] relative rounded-tl-[2px] rounded-tr-[2px] shrink-0 w-[40.58px]" data-name="Overlay" />
      <div className="bg-[rgba(0,91,101,0.2)] h-[57.59px] relative rounded-tl-[2px] rounded-tr-[2px] shrink-0 w-[40.56px]" data-name="Overlay" />
      <div className="bg-[rgba(0,91,101,0.4)] h-[72px] relative rounded-tl-[2px] rounded-tr-[2px] shrink-0 w-[40.58px]" data-name="Overlay" />
      <div className="bg-[#005b65] h-[86.39px] relative rounded-tl-[2px] rounded-tr-[2px] shrink-0 w-[40.58px]" data-name="Background" />
    </div>
  );
}

function Margin1() {
  return (
    <div className="h-[112px] relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[16px] relative size-full">
        <Container22 />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[7px] relative shrink-0 w-[11.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 7">
        <g id="Container">
          <path d={svgPaths.pde19380} fill="var(--fill-0, #005B65)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Container">
      <Container24 />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#005b65] text-[12px] tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px]">4.2% from last quarter</p>
      </div>
    </div>
  );
}

function Margin2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[16px] relative size-full">
        <Container23 />
      </div>
    </div>
  );
}

function SavingsRateCard() {
  return (
    <div className="bg-white relative rounded-[32px] shrink-0 w-full" data-name="Savings Rate Card">
      <div aria-hidden className="absolute border border-[#bec8ca] border-solid inset-0 pointer-events-none rounded-[32px]" />
      <div className="content-stretch flex flex-col items-start justify-between p-[25px] relative size-full">
        <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[32px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1)]" data-name="Savings Rate Card:shadow" />
        <Container20 />
        <Margin1 />
        <Margin2 />
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Geist:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#3f484a] text-[16px] tracking-[-0.8px] uppercase w-full">
        <p className="leading-[24px]">DEBT RATIO</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[32px] tracking-[-0.32px] w-full">
        <p className="leading-[40px]">15%</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Heading4 />
        <Container26 />
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#e0e3e3] h-[8px] overflow-clip relative rounded-[9999px] shrink-0 w-full" data-name="Background">
      <div className="absolute bg-[#37537c] inset-[0_85%_0_0] rounded-[9999px]" data-name="Background" />
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#3f484a] text-[12px] tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px]">{`Optimal: <30%`}</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#37537c] text-[12px] tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px]">Stable</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container29 />
      <Container30 />
    </div>
  );
}

function Container27() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start relative size-full">
        <Background />
        <Container28 />
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="h-[21px] relative shrink-0 w-[22px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 21">
        <g id="Container">
          <path d={svgPaths.p13774060} fill="var(--fill-0, #37537C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[12px] tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px]">Target achieved ahead of schedule.</p>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#f2f4f4] relative rounded-[32px] shrink-0 w-full" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center p-[12px] relative size-full">
          <Container31 />
          <Container32 />
        </div>
      </div>
    </div>
  );
}

function Margin3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[24px] relative size-full">
        <Background1 />
      </div>
    </div>
  );
}

function DebtRatioCard() {
  return (
    <div className="bg-white relative rounded-[32px] shrink-0 w-full" data-name="Debt Ratio Card">
      <div aria-hidden className="absolute border-[#bec8ca] border-b border-l-4 border-r border-solid border-t inset-0 pointer-events-none rounded-[32px]" />
      <div className="content-stretch flex flex-col items-start justify-between pl-[28px] pr-[25px] py-[25px] relative size-full">
        <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[32px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1)]" data-name="Debt Ratio Card:shadow" />
        <Container25 />
        <Container27 />
        <Margin3 />
      </div>
    </div>
  );
}

function BentoGridForMetrics() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start pt-[8px] relative shrink-0 w-full" data-name="Bento Grid for Metrics">
      <HealthScoreCard />
      <SavingsRateCard />
      <DebtRatioCard />
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[16px] relative shrink-0 w-[4px]" data-name="Button">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 16">
        <g id="Button">
          <path d={svgPaths.p3caf0c80} fill="var(--fill-0, #6F797A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container33() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[24px] whitespace-nowrap">
          <p className="leading-[32px]">Spending Analysis</p>
        </div>
        <Button1 />
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#3f484a] text-[12px] tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px]">TOTAL</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[24px] whitespace-nowrap">
        <p className="leading-[32px]">₹1.4L</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 items-center justify-center" data-name="Container">
      <Container37 />
      <Container38 />
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 size-[192px]" data-name="Container">
      <div className="flex-[1_0_0] min-h-px relative rounded-[9999px] w-full" data-name="Border">
        <div aria-hidden className="absolute border-16 border-[#eceeef] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      </div>
      <Container36 />
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3f484a] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Investments</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <div className="bg-[#005b65] relative rounded-[9999px] shrink-0 size-[12px]" data-name="Background" />
      <Container42 />
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">45%</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container41 />
      <Container43 />
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3f484a] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Lifestyle</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <div className="bg-[#37537c] relative rounded-[9999px] shrink-0 size-[12px]" data-name="Background" />
      <Container46 />
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">25%</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container45 />
      <Container47 />
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3f484a] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Housing</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <div className="bg-[#5d6311] relative rounded-[9999px] shrink-0 size-[12px]" data-name="Background" />
      <Container50 />
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">20%</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container49 />
      <Container51 />
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3f484a] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Other</p>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <div className="bg-[#bec8ca] relative rounded-[9999px] shrink-0 size-[12px]" data-name="Background" />
      <Container54 />
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">10%</p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container53 />
      <Container55 />
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Container40 />
      <Container44 />
      <Container48 />
      <Container52 />
    </div>
  );
}

function Container34() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[32px] items-center relative size-full">
        <Container35 />
        <Container39 />
      </div>
    </div>
  );
}

function MonthlySpendingAnalysis() {
  return (
    <div className="bg-white relative rounded-[32px] shrink-0 w-full" data-name="Monthly Spending Analysis">
      <div aria-hidden className="absolute border border-[#bec8ca] border-solid inset-0 pointer-events-none rounded-[32px]" />
      <div className="content-stretch flex flex-col gap-[32px] items-start p-[25px] relative size-full">
        <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[32px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1)]" data-name="Monthly Spending Analysis:shadow" />
        <Container33 />
        <Container34 />
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[24px] whitespace-nowrap">
        <p className="leading-[32px]">Projections</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#3f484a] text-[12px] tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px]">10-Year Wealth Trajectory</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[165.16px]" data-name="Container">
      <Heading5 />
      <Container58 />
    </div>
  );
}

function OverlayBorder1() {
  return (
    <div className="bg-[rgba(0,91,101,0.1)] relative rounded-[9999px] self-stretch shrink-0" data-name="Overlay+Border">
      <div aria-hidden className="absolute border border-[rgba(0,91,101,0.2)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="content-stretch flex flex-col items-start px-[13px] py-[5px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#005b65] text-[10px] whitespace-nowrap">
          <p className="leading-[15px]">BULLISH</p>
        </div>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex h-[25px] items-start relative shrink-0" data-name="Container">
      <OverlayBorder1 />
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container57 />
      <Container59 />
    </div>
  );
}

function Margin4() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[25px] pb-[8px] right-[25px] top-[25px]" data-name="Margin">
      <Container56 />
    </div>
  );
}

function Container61() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#3f484a] text-[12px] tracking-[0.6px] w-full">
          <p className="leading-[16px] mb-0">Est. Net Worth</p>
          <p className="leading-[16px]">2034</p>
        </div>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#37537c] text-[18px] w-full">
          <p className="leading-[28px]">₹4.2 Cr</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#f2f4f4] flex-[1_0_0] min-w-px relative rounded-[32px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#bec8ca] border-solid inset-0 pointer-events-none rounded-[32px]" />
      <div className="content-stretch flex flex-col items-start p-[13px] relative size-full">
        <Container61 />
        <Container62 />
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#3f484a] text-[12px] tracking-[0.6px] w-full">
          <p className="leading-[16px]">Compound Rate</p>
        </div>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#005b65] text-[18px] w-full">
          <p className="leading-[28px]">12.5%</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-[#f2f4f4] flex-[1_0_0] min-w-px relative rounded-[32px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#bec8ca] border-solid inset-0 pointer-events-none rounded-[32px]" />
      <div className="content-stretch flex flex-col items-start pb-[29px] pt-[13px] px-[13px] relative size-full">
        <Container63 />
        <Container64 />
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="content-stretch flex gap-[16px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <BackgroundBorder />
      <BackgroundBorder1 />
    </div>
  );
}

function Margin5() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[25px] pt-[24px] right-[25px] top-[305px]" data-name="Margin">
      <Container60 />
    </div>
  );
}

function Svg1() {
  return (
    <div className="h-[200px] overflow-clip relative shrink-0 w-full" data-name="SVG">
      <div className="absolute inset-[9%_0_0_0]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 308 182">
          <path d={svgPaths.p4600b00} fill="url(#paint0_linear_1_1658)" id="Vector" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_1658" x1="0" x2="0" y1="-1.2207e-07" y2="182">
              <stop stopColor="#005B65" stopOpacity="0.2" />
              <stop offset="1" stopColor="#005B65" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute inset-[9%_0_10%_0]" data-name="Vector">
        <div className="absolute inset-[-0.82%_-0.11%_-0.79%_-0.11%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 308.667 164.614">
            <path d={svgPaths.p32981320} id="Vector" stroke="var(--stroke-0, #005B65)" strokeWidth="2.655" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[68%_74%_28%_24%]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.16 8">
          <path d={svgPaths.p37e393c0} fill="var(--fill-0, #005B65)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[48%_49%]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.16 8">
          <path d={svgPaths.p37e393c0} fill="var(--fill-0, #005B65)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[23%_24%_73%_74%]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.16 8">
          <path d={svgPaths.p37e393c0} fill="var(--fill-0, #005B65)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[7%_-1.5%_87%_98.5%]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.24 12">
          <path d={svgPaths.p11a5b30} fill="var(--fill-0, #005B65)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6f797a] text-[10px] whitespace-nowrap">
          <p className="leading-[15px]">2024</p>
        </div>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6f797a] text-[10px] whitespace-nowrap">
          <p className="leading-[15px]">2026</p>
        </div>
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6f797a] text-[10px] whitespace-nowrap">
          <p className="leading-[15px]">2028</p>
        </div>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6f797a] text-[10px] whitespace-nowrap">
          <p className="leading-[15px]">2030</p>
        </div>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="relative self-stretch shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6f797a] text-[10px] whitespace-nowrap">
          <p className="leading-[15px]">2034</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="absolute bottom-0 content-stretch flex h-[24px] items-start justify-between left-0 pt-[9px] right-0" data-name="HorizontalBorder">
      <div aria-hidden className="absolute border-[#bec8ca] border-solid border-t inset-0 pointer-events-none" />
      <Container66 />
      <Container67 />
      <Container68 />
      <Container69 />
      <Container70 />
    </div>
  );
}

function Container65() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center min-h-[200px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <Svg1 />
      <HorizontalBorder />
    </div>
  );
}

function Margin6() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[25px] min-h-[224px] pt-[24px] right-[25px] top-[81px]" data-name="Margin">
      <Container65 />
    </div>
  );
}

function SavingsProjections() {
  return (
    <div className="bg-white h-[440px] relative rounded-[32px] shrink-0 w-full" data-name="Savings Projections">
      <div aria-hidden className="absolute border border-[#bec8ca] border-solid inset-0 pointer-events-none rounded-[32px]" />
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[32px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1)]" data-name="Savings Projections:shadow" />
      <Margin4 />
      <Margin5 />
      <Margin6 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[46.76px] relative shrink-0" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[24px] whitespace-nowrap">
        <p className="leading-[32px] mb-0">Spending</p>
        <p className="leading-[32px]">Trends</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#005b65] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center px-[16px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Button">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-center text-white tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px] mb-0">6</p>
        <p className="leading-[16px]">Months</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[16px] py-[4px] relative shrink-0" data-name="Button">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#3f484a] text-[12px] text-center tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[16px] mb-0">1</p>
        <p className="leading-[16px]">Year</p>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#eceeef] content-stretch flex gap-[4px] items-center p-[4px] relative rounded-[9999px] shrink-0" data-name="Background">
      <Button2 />
      <Button3 />
    </div>
  );
}

function Container71() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Heading6 />
        <Background2 />
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#6f797a] text-[10px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">JAN</p>
      </div>
    </div>
  );
}

function Container73() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center min-w-px pt-[8px] relative" data-name="Container">
      <Container74 />
    </div>
  );
}

function Container76() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#6f797a] text-[10px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">FEB</p>
      </div>
    </div>
  );
}

function Container75() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center min-w-px pt-[8px] relative" data-name="Container">
      <Container76 />
    </div>
  );
}

function Container78() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#6f797a] text-[10px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">MAR</p>
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center min-w-px pt-[8px] relative" data-name="Container">
      <Container78 />
    </div>
  );
}

function Container80() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#6f797a] text-[10px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">APR</p>
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center min-w-px pt-[8px] relative" data-name="Container">
      <Container80 />
    </div>
  );
}

function Container82() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#005b65] text-[10px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">MAY</p>
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-w-px relative" data-name="Container">
      <div className="bg-[rgba(0,91,101,0.4)] h-[2px] relative rounded-tl-[6px] rounded-tr-[6px] shrink-0 w-full" data-name="Horizontal Divider">
        <div aria-hidden className="absolute border-[#005b65] border-solid border-t-2 inset-0 pointer-events-none rounded-tl-[6px] rounded-tr-[6px]" />
      </div>
      <Container82 />
    </div>
  );
}

function Container84() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#6f797a] text-[10px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">JUN</p>
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center min-w-px pt-[8px] relative" data-name="Container">
      <Container84 />
    </div>
  );
}

function Container72() {
  return (
    <div className="h-[192px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-end size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-end justify-between px-[8px] relative size-full">
          <Container73 />
          <Container75 />
          <Container77 />
          <Container79 />
          <Container81 />
          <Container83 />
        </div>
      </div>
    </div>
  );
}

function Container87() {
  return (
    <div className="h-[13.333px] relative shrink-0 w-[13.321px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.321 13.3333">
        <g id="Container">
          <path d={svgPaths.p2e74f400} fill="var(--fill-0, #005B65)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[rgba(0,91,101,0.1)] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[40px]" data-name="Overlay">
      <Container87 />
    </div>
  );
}

function Container89() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#3f484a] text-[12px] tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[12px]">Max Category</p>
      </div>
    </div>
  );
}

function Container90() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Electronics</p>
      </div>
    </div>
  );
}

function Container88() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[88.78px]" data-name="Container">
      <Container89 />
      <Container90 />
    </div>
  );
}

function Container86() {
  return (
    <div className="content-stretch flex gap-[12px] h-[40px] items-center relative shrink-0" data-name="Container">
      <Overlay />
      <Container88 />
    </div>
  );
}

function Container91() {
  return (
    <div className="relative shrink-0 size-[10.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
        <g id="Container">
          <path d={svgPaths.p197ced00} fill="var(--fill-0, #37537C)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Overlay1() {
  return (
    <div className="bg-[rgba(55,83,124,0.1)] relative rounded-[9999px] shrink-0 size-[40px]" data-name="Overlay">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Container91 />
      </div>
    </div>
  );
}

function Container93() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#3f484a] text-[12px] tracking-[0.6px] whitespace-nowrap">
        <p className="leading-[12px]">Monthly Delta</p>
      </div>
    </div>
  );
}

function Container94() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#37537c] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">-12.4%</p>
      </div>
    </div>
  );
}

function Container92() {
  return (
    <div className="relative shrink-0 w-[88.72px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container93 />
        <Container94 />
      </div>
    </div>
  );
}

function VerticalBorder() {
  return (
    <div className="content-stretch flex gap-[12px] h-[40px] items-center pl-[25px] relative shrink-0" data-name="VerticalBorder">
      <div aria-hidden className="absolute border-[#bec8ca] border-l border-solid inset-0 pointer-events-none" />
      <Overlay1 />
      <Container92 />
    </div>
  );
}

function Container85() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-center justify-center relative size-full">
        <Container86 />
        <VerticalBorder />
      </div>
    </div>
  );
}

function SpendingTrendsBarChart() {
  return (
    <div className="bg-white relative rounded-[32px] shrink-0 w-full" data-name="Spending Trends (Bar Chart)">
      <div aria-hidden className="absolute border border-[#bec8ca] border-solid inset-0 pointer-events-none rounded-[32px]" />
      <div className="content-stretch flex flex-col gap-[32px] items-start p-[25px] relative size-full">
        <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[32px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1)]" data-name="Spending Trends (Bar Chart):shadow" />
        <Container71 />
        <Container72 />
        <Container85 />
      </div>
    </div>
  );
}

function ChartsSection() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Charts Section">
      <MonthlySpendingAnalysis />
      <SavingsProjections />
      <SpendingTrendsBarChart />
    </div>
  );
}

function Heading7() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#191c1d] text-[24px] text-center whitespace-nowrap">
        <p className="leading-[32px] mb-0">Smart Optimization</p>
        <p className="leading-[32px]">Available</p>
      </div>
    </div>
  );
}

function Container97() {
  return (
    <div className="content-stretch flex flex-col items-center max-w-[512px] relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3f484a] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[24px] mb-0">Based on your spending trends,</p>
        <p className="leading-[24px] mb-0">{`switching to the 'Elite Privilege' vault`}</p>
        <p className="leading-[24px] mb-0">can increase your annual returns by</p>
        <p className="leading-[24px]">₹45,000.</p>
      </div>
    </div>
  );
}

function Container96() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[276.75px]" data-name="Container">
      <Heading7 />
      <Container97 />
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#005b65] content-stretch flex flex-col items-center justify-center px-[32px] py-[12px] relative rounded-[9999px] shrink-0" data-name="Button">
      <div className="[word-break:break-word] flex flex-col font-['Geist:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[24px]">Apply Optimization</p>
      </div>
    </div>
  );
}

function Container95() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-between relative size-full">
        <Container96 />
        <Button4 />
      </div>
    </div>
  );
}

function CallToActionCard() {
  return (
    <div className="bg-white relative rounded-[32px] shrink-0 w-full" data-name="Call to Action Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[33px] relative size-full">
          <Container95 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#bec8ca] border-solid inset-0 pointer-events-none rounded-[32px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Main() {
  return (
    <div className="max-w-[1440px] relative shrink-0 w-full z-[1]" data-name="Main">
      <div className="content-stretch flex flex-col gap-[24px] items-start max-w-[inherit] pb-[48px] pt-[32px] px-[16px] relative size-full">
        <HeaderSection />
        <BentoGridForMetrics />
        <ChartsSection />
        <CallToActionCard />
      </div>
    </div>
  );
}

export default function SmartAdvisorHealthDashboard() {
  return (
    <div className="content-stretch flex flex-col isolate items-start pb-[96px] relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(247, 250, 250) 0%, rgb(247, 250, 250) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="Smart Advisor - Health Dashboard">
      <BottomNavigationBarMobileOnly />
      <HeaderTopAppBar />
      <Main />
    </div>
  );
}