"use client";
import Image from "next/image";
import { useEffect, useRef, useState, type ChangeEvent } from "react";

const entertainmentApps = [
  "Max",
  "Disney+",
  "Prime Video",
  "Paramount+",
  "Globoplay",
  "Deezer",
  "YouTube",
  "TikTok",
];

const plans = [
  {
    name: "400 MEGA",
    price: "99,77",
    cta: "Assinar 400 Mega",
    featured: false,
    benefits: ["100% Fibra", "Wi-Fi Grátis", "Instalação Rápida"],
  },
  {
    name: "600 MEGA",
    price: "109,77",
    cta: "Assinar 600 Mega",
    featured: true,
    badge: "MAIS VENDIDO",
    benefits: ["100% Fibra", "Wi-Fi 6", "Instalação Rápida", "Suporte Prioritário"],
  },
  {
    name: "600 MEGA",
    price: "119,77",
    cta: "Assinar 600 Mega",
    featured: false,
    badge: "NOVO",
    benefits: ["100% Fibra", "Wi-Fi 6", "Instalação Rápida", "Suporte Prioritário"],
  },
  {
    name: "800 MEGA",
    price: "129,77",
    cta: "Assinar 800 Mega",
    featured: false,
    benefits: ["100% Fibra", "Wi-Fi Grátis", "Instalação Rápida"],
  },
  {
    name: "900 MEGA",
    price: "149,77",
    cta: "Assinar 900 Mega",
    featured: false,
    benefits: ["100% Fibra", "Wi-Fi Grátis", "Instalação Rápida"],
  },
];

const differentials = [
  {
    title: "100% Fibra Óptica",
    description: "Infraestrutura moderna para manter sua velocidade estavel o dia inteiro.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10 text-[#F39200]">
        <path d="M4 16C8 12 16 12 20 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M7 19C10 16 14 16 17 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="20" r="1.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Suporte Humanizado",
    description: "Atendimento próximo e rápido para resolver tudo sem burocracia.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10 text-[#F39200]">
        <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M5 20C5.8 16.6 8.4 15 12 15C15.6 15 18.2 16.6 19 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Instalação Rápida",
    description: "Equipe técnica ágil para ativar seu plano no menor tempo possível.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10 text-[#F39200]">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 7V12L15.5 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Wi-Fi de Alta Performance",
    description: "Cobertura consistente para casa toda, trabalho e lazer sem travamentos.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10 text-[#F39200]">
        <path d="M3 10C7.8 5.8 16.2 5.8 21 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M6 13.5C9.3 10.7 14.7 10.7 18 13.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M9.5 17C11 15.8 13 15.8 14.5 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
];

const faqItems = [
  {
    question: "A instalação tem algum custo?",
    answer: "Não! Para todos os planos listados, a instalação é 100% gratuita.",
  },
  {
    question: "Qual o prazo para instalarem na minha casa?",
    answer:
      "Nossa equipe técnica local em Londrina garante a instalação mais rápida da região, em até 48 horas úteis após a aprovação.",
  },
  {
    question: "O roteador Wi-Fi já está incluso?",
    answer:
      "Sim, fornecemos roteadores de alta performance (com Wi-Fi 6 nos planos elegíveis) em regime de comodato, sem custo adicional.",
  },
  {
    question: "Como acesso os streamings (Max, Disney+, etc)?",
    answer:
      "Após a instalação, você receberá um login exclusivo no nosso app parceiro para ativar e curtir todos os seus serviços de streaming.",
  },
];

const quickActions = [
  {
    title: "Indique e Ganhe",
    message: "Olá! Quero saber como funciona o programa Indique e Ganhe da Telefonarnet.",
  },
  {
    title: "2ª Via do Boleto",
    message: "Olá! Preciso da 2ª via do meu boleto da Telefonarnet.",
  },
  {
    title: "Troca de Endereço",
    message: "Olá! Quero solicitar troca de endereço da minha internet Telefonarnet.",
  },
  {
    title: "Troca de Titularidade",
    message: "Olá! Quero solicitar troca de titularidade do meu contrato Telefonarnet.",
  },
];

export default function Page() {
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const plansScrollerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<"a" | "b">("a");
  const switchingRef = useRef(false);
  const [activeVideo, setActiveVideo] = useState<"a" | "b">("a");
  const [cep, setCep] = useState("");

  const handleCepChange = (e: ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = e.target.value.replace(/\D/g, "").slice(0, 8);
    const formattedCep =
      onlyDigits.length > 5
        ? `${onlyDigits.slice(0, 5)}-${onlyDigits.slice(5)}`
        : onlyDigits;

    setCep(formattedCep);
  };

  const handleConsultar = () => {
    const cepDigits = cep.replace(/\D/g, "");

    if (cepDigits.length !== 8) {
      alert("Digite um CEP válido com 8 números para consultar a disponibilidade.");
      return;
    }

    const message = `Olá, equipe Telefonarnet! Estava no site e gostaria de consultar a disponibilidade de fibra na minha rua. Meu CEP é: ${cep}`;
    const whatsappUrl = `https://wa.me/554330325000?text=${encodeURIComponent(message)}`;

    window.location.href = whatsappUrl;
  };

  const scrollPlans = (direction: "left" | "right") => {
    const scroller = plansScrollerRef.current;
    if (!scroller) return;
    const amount = direction === "left" ? -340 : 340;
    scroller.scrollBy({ left: amount, behavior: "smooth" });
  };

  useEffect(() => {
    const videoA = videoARef.current;
    const videoB = videoBRef.current;
    if (!videoA || !videoB) return;

    let rafId = 0;

    const switchTo = async (next: HTMLVideoElement, current: HTMLVideoElement) => {
      if (switchingRef.current) return;
      switchingRef.current = true;

      try {
        next.currentTime = 0;
        await next.play();
        const nextKey = next === videoA ? "a" : "b";
        activeRef.current = nextKey;
        setActiveVideo(nextKey);

        window.setTimeout(() => {
          current.pause();
          current.currentTime = 0;
          switchingRef.current = false;
        }, 260);
      } catch {
        switchingRef.current = false;
      }
    };

    const start = async () => {
      videoA.muted = true;
      videoB.muted = true;
      videoA.playsInline = true;
      videoB.playsInline = true;
      videoA.loop = false;
      videoB.loop = false;

      try {
        await videoA.play();
      } catch {
        return;
      }

      videoB.pause();
      videoB.currentTime = 0;

      const tick = () => {
        const current = activeRef.current === "a" ? videoA : videoB;
        const next = activeRef.current === "a" ? videoB : videoA;
        const duration = current.duration || 0;
        const remaining = duration - current.currentTime;

        if (
          !switchingRef.current &&
          duration > 0 &&
          remaining <= 0.2
        ) {
          void switchTo(next, current);
        }

        rafId = window.requestAnimationFrame(tick);
      };

      rafId = window.requestAnimationFrame(tick);
    };

    void start();

    return () => {
      window.cancelAnimationFrame(rafId);
      videoA.pause();
      videoB.pause();
    };
  }, []);

  return (
    <main className="overflow-x-hidden bg-[#0A192F] text-white">
      <section className="relative min-h-screen overflow-hidden bg-[#0A192F] text-white">
        <video
          ref={videoARef}
          autoPlay
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className={`absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-300 ${
            activeVideo === "a" ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <video
          ref={videoBRef}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className={`absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-300 ${
            activeVideo === "b" ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 z-10 bg-black/50" />
        <div className="absolute inset-0 z-10 bg-[#0A192F]/60" />

        <nav className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8 animate-[fade-up_0.8s_ease-out_forwards]">
          <a href="#" className="transition-transform duration-300 hover:scale-[1.02]">
            <Image
              src="/logo-telefonarnet-nova.png"
              alt="Logo Telefonarnet"
              width={900}
              height={520}
              priority
              className="h-14 w-auto sm:h-16"
            />
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            <a
              href="#servicos"
              className="text-sm font-medium text-slate-200 transition hover:text-[#00B4D8]"
            >
              Serviços
            </a>
            <a
              href="#suporte"
              className="text-sm font-medium text-slate-200 transition hover:text-[#00B4D8]"
            >
              Suporte
            </a>
            <a
              href="tel:+554330325000"
              className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#FF8C00] hover:bg-white/5"
            >
              Ligar
            </a>
          </div>
        </nav>

        <div className="relative z-20 mx-auto grid grid-cols-1 min-h-[calc(100vh-92px)] max-w-7xl items-center gap-14 px-4 pb-16 pt-8 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:pb-20">
          <div className="max-w-2xl text-center lg:text-left opacity-0 animate-[fade-up_0.9s_ease-out_forwards] [animation-delay:120ms]">
            <div className="mx-auto lg:mx-0 inline-flex rounded-full border border-[#00B4D8]/40 bg-[#00B4D8]/10 px-4 py-2 text-xs font-semibold tracking-[0.12em] text-[#7AE7FF]">
              A internet definitiva de Londrina
            </div>

            <h1 className="font-display mt-7 max-w-3xl text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-white text-balance">
              A <span className="text-[#00B4D8]">velocidade</span> que você merece,
              <br className="hidden md:block" /> com a{" "}
              <span className="text-[#00B4D8]">estabilidade</span> que você precisa.
            </h1>

            <p className="font-sans mt-7 max-w-xl text-base sm:text-lg md:text-xl leading-relaxed text-slate-300">
              Planos 100% fibra com os melhores streamings inclusos. Consulte a
              disponibilidade na sua rua agora mesmo.
            </p>
          </div>

          <div className="flex justify-center opacity-0 animate-[fade-up_0.9s_ease-out_forwards] [animation-delay:260ms] lg:justify-end">
            <div className="w-full max-w-md rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-md">
              <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-white">
                Verifique sua cobertura
              </h2>

              <div className="mt-7">
                <label htmlFor="cep" className="sr-only">
                  CEP
                </label>
                <input
                  id="cep"
                  name="cep"
                  inputMode="numeric"
                  placeholder="Digite seu CEP"
                  value={cep}
                  onChange={handleCepChange}
                  className="w-full rounded-lg border border-white/30 bg-white/5 p-4 text-white outline-none transition-all placeholder:text-slate-400 focus:border-cyan-400"
                />
              </div>

              <button
                type="button"
                onClick={handleConsultar}
                className="mt-4 w-full rounded-lg bg-[#FF8C00] p-4 font-bold text-white shadow-[0_0_15px_rgba(245,130,32,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(245,130,32,0.8)]"
              >
                Consultar Disponibilidade -&gt;
              </button>

              <p className="font-sans mt-4 text-xs leading-relaxed text-slate-400">
                Consulta rápida e sem compromisso.
              </p>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-1/2 z-20 h-24 w-1 -translate-x-1/2 translate-y-1/2 bg-gradient-to-b from-cyan-500 to-orange-500 shadow-[0_0_18px_rgba(0,180,216,0.55)]" />
        <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 shadow-[0_0_15px_#00B4D8]" />
      </section>

      <section
        id="parceiros-streaming"
        className="relative w-full overflow-hidden bg-slate-50 py-16 md:py-20 flex flex-col items-center"
      >
        <p className="font-sans text-sm font-bold uppercase tracking-widest text-[#F58220]">
          ENTRETENIMENTO PREMIUM
        </p>

        <h2 className="font-display mx-auto mt-4 max-w-3xl px-4 sm:px-6 lg:px-8 text-center text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-[#0E7A8A]">
          Acesso ilimitado aos seus apps favoritos.
        </h2>

        <div className="relative mt-12 w-full overflow-hidden py-4">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-slate-50 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-slate-50 to-transparent" />

          {/* Pause marquee on hover with hover:[animation-play-state:paused] */}
          <div className="flex w-max items-center gap-12 animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]">
            {[...entertainmentApps, ...entertainmentApps].map((partner, index) => (
              <div
                key={`${partner}-${index}`}
                className="flex h-20 w-48 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-lg font-semibold text-slate-400 shadow-sm transition-transform duration-300 hover:scale-105"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="planos" className="relative w-full overflow-hidden bg-white py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <span className="inline-flex rounded-full bg-[#F58220]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#F58220]">
              ESCOLHA SUA VELOCIDADE
            </span>
            <h2 className="font-display mt-5 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-[#0E7A8A]">
              Planos de internet fibra óptica feitos para você.
            </h2>
          </div>

          <div className="relative w-full max-w-7xl mx-auto mt-16">
            <button
              type="button"
              aria-label="Planos anteriores"
              onClick={() => scrollPlans("left")}
              className="absolute top-1/2 -translate-y-1/2 z-20 -left-4 md:-left-8 w-14 h-14 bg-white rounded-full shadow-2xl hidden md:flex items-center justify-center text-[#0E7A8A] border border-slate-100 hover:scale-110 hover:bg-[#F58220] hover:text-white transition-all cursor-pointer"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none" aria-hidden="true">
                <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              type="button"
              aria-label="Próximos planos"
              onClick={() => scrollPlans("right")}
              className="absolute top-1/2 -translate-y-1/2 z-20 -right-4 md:-right-8 w-14 h-14 bg-white rounded-full shadow-2xl hidden md:flex items-center justify-center text-[#0E7A8A] border border-slate-100 hover:scale-110 hover:bg-[#F58220] hover:text-white transition-all cursor-pointer"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none" aria-hidden="true">
                <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div
              ref={plansScrollerRef}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-8 pt-12 pb-8 px-4"
            >
              {plans.map((plan) => (
                <article
                  key={plan.name}
                  className={`snap-center min-w-[85vw] sm:min-w-[320px] lg:min-w-[340px] rounded-2xl p-6 shadow-lg relative border border-slate-200 transition-all duration-300 ease-out hover:-translate-y-2 hover:border-cyan-400/80 hover:shadow-[0_0_40px_rgba(0,180,216,0.15)] ${
                    plan.featured
                      ? "bg-[#0E7A8A] text-white border-cyan-300/80 lg:scale-105 z-10 opacity-100 shadow-[0_0_24px_rgba(0,180,216,0.35)]"
                      : "bg-white text-slate-700 opacity-90 hover:opacity-100 z-0"
                  }`}
                >
                  {plan.badge ? (
                    <span className="absolute -top-5 left-6 rounded-full bg-[#F58220] px-4 py-1 text-xs font-bold uppercase tracking-wide text-white">
                      {plan.badge}
                    </span>
                  ) : null}

                  <h3 className={`font-display text-2xl font-bold leading-tight tracking-tight ${plan.featured ? "text-white" : "text-[#0E7A8A]"}`}>
                    {plan.name}
                  </h3>

                  <p className={`font-display mt-5 text-4xl font-bold leading-tight tracking-tight ${plan.featured ? "text-white" : "text-slate-900"}`}>
                    R$ {plan.price}
                    <span className={`text-lg font-medium ${plan.featured ? "text-white/80" : "text-slate-500"}`}>
                      /mês
                    </span>
                  </p>

                  <ul className="font-sans mt-6 space-y-3">
                    {plan.benefits.map((benefit) => (
                      <li key={`${plan.name}-${benefit}`} className="flex items-center gap-3">
                        <span className="text-[#F58220]">
                          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none" aria-hidden="true">
                            <path d="M5 12L10 17L19 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span className={plan.featured ? "text-white/95" : "text-slate-600"}>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className={`mt-8 w-full rounded-xl px-5 py-3 font-semibold transition-all duration-300 hover:-translate-y-1 ${
                      plan.featured
                        ? "bg-[#F58220] text-white shadow-[0_0_15px_rgba(245,130,32,0.4)] hover:bg-orange-600 hover:shadow-[0_0_30px_rgba(245,130,32,0.8)]"
                        : "border border-[#F58220] text-[#F58220] shadow-[0_0_10px_rgba(245,130,32,0.15)] hover:bg-[#F58220] hover:text-white hover:shadow-[0_0_24px_rgba(245,130,32,0.45)]"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </article>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto bg-[#0E7A8A] rounded-2xl py-6 px-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg mt-8">
            <div className="w-full">
              <h3 className="font-display text-xl md:text-2xl font-bold leading-tight tracking-tight text-white">Ficou com alguma dúvida?</h3>
              <p className="font-sans mt-2 max-w-lg text-sm leading-relaxed text-white/80">
                Fale com um de nossos consultores especialistas. Te ajudamos a escolher o plano perfeito para a sua necessidade.
              </p>
            </div>

            <a
              href="https://wa.me/554330325000"
              target="_blank"
              rel="noreferrer"
              className="w-full md:w-auto rounded-lg bg-[#F58220] px-6 py-3 text-center text-sm font-semibold text-white shadow-[0_0_15px_rgba(245,130,32,0.4)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#ff9f1f] hover:shadow-[0_0_30px_rgba(245,130,32,0.8)]"
            >
              Falar com Consultor
            </a>
          </div>
        </div>
      </section>

      <section
        id="sobre"
        className="relative w-full overflow-hidden bg-radial-[at_50%_0%] from-[#0A192F] to-[#050B14] py-16 md:py-24"
      >
        <svg
          viewBox="0 0 100 90"
          aria-hidden="true"
          className="absolute z-0 pointer-events-none -top-10 -left-10 w-40 rotate-12 opacity-[0.04]"
        >
          <path d="M50 6Q55 6 58 11L93 73Q96 79 91 83Q88 85 83 85H17Q12 85 9 83Q4 79 7 73L42 11Q45 6 50 6Z" className="fill-[#00B4D8]" />
        </svg>
        <svg
          viewBox="0 0 100 90"
          aria-hidden="true"
          className="absolute z-0 pointer-events-none bottom-20 right-10 w-32 -rotate-12 opacity-[0.03]"
        >
          <path d="M50 6Q55 6 58 11L93 73Q96 79 91 83Q88 85 83 85H17Q12 85 9 83Q4 79 7 73L42 11Q45 6 50 6Z" className="fill-[#F58220]" />
        </svg>
        <svg
          viewBox="0 0 100 90"
          aria-hidden="true"
          className="absolute z-0 pointer-events-none top-1/3 left-1/4 w-20 rotate-45 opacity-[0.05]"
        >
          <path d="M50 6Q55 6 58 11L93 73Q96 79 91 83Q88 85 83 85H17Q12 85 9 83Q4 79 7 73L42 11Q45 6 50 6Z" className="fill-[#00B4D8]" />
        </svg>
        <div className="pointer-events-none absolute top-0 left-0 z-20 h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 shadow-[0_0_15px_#00B4D8]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,180,216,0.10),transparent_35%),radial-gradient(circle_at_80%_75%,rgba(243,146,0,0.08),transparent_35%)]" />

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:px-8 lg:grid-cols-2">
          <article>
            <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/90">
              Tecnologia e confiança local
            </span>

            <h2 className="font-display mt-6 max-w-2xl text-4xl md:text-5xl font-bold leading-tight tracking-tight text-white">
              Muito mais que internet.
              <br />
              Uma <span className="text-[#F39200]">infraestrutura premium</span> para sua rotina.
            </h2>

            <p className="mt-6 max-w-2xl text-lg text-slate-400">
              Localizada em <strong className="text-[#F39200]">Londrina</strong>, somos responsáveis
              por levar <strong className="text-[#F39200]">conexão</strong>,{" "}
              <strong className="text-[#F39200]">entretenimento</strong> e{" "}
              <strong className="text-[#F39200]">lazer</strong> para milhares de famílias e
              empresas.
            </p>

            <a
              href="#contato"
              className="mt-10 inline-flex items-center justify-center rounded-2xl bg-[#F39200] px-7 py-3.5 text-base font-semibold text-white shadow-[0_0_15px_rgba(255,140,0,0.3)] transition-all duration-300 hover:scale-105 hover:bg-[#ff9f1f] hover:shadow-[0_0_25px_rgba(255,140,0,0.5)]"
            >
              Fale com a nossa equipe
            </a>
          </article>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {differentials.map((item) => (
              <article
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/20 p-8 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(0,180,216,0.1)]"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(0,180,216,0.14),transparent_45%)]" />
                <div className="relative z-10">
                  <div className="w-fit transition-transform duration-300 group-hover:scale-110">
                    {item.icon}
                  </div>
                  <h3 className="font-display mt-5 text-lg font-semibold leading-tight tracking-tight text-white transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(0,180,216,0.4)]">{item.title}</h3>
                  <p className="font-sans mt-3 text-sm leading-relaxed text-slate-300">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 shadow-[0_0_15px_#00B4D8]" />
      </section>

      <section id="conheca-telefonarnet" className="relative overflow-hidden bg-white py-16 md:py-24">
        <div className="absolute -left-24 -top-20 h-72 w-72 rounded-full bg-[#00B4D8]/10 blur-3xl" />
        <div className="absolute -bottom-20 right-0 h-80 w-80 rounded-full bg-[#F58220]/10 blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-4 sm:px-6 lg:px-8 lg:grid-cols-2">
          <article>
            <span className="inline-flex rounded-full bg-[#0E7A8A]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0E7A8A]">
              Conheça a Telefonarnet
            </span>
            <h2 className="font-display mt-5 max-w-xl text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-[#0E7A8A]">
              Conexão que aproxima pessoas, famílias e negócios.
            </h2>
            <p className="font-sans mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              A Telefonarnet nasceu para entregar internet de alta performance com atendimento
              humano e próximo. Somos uma empresa local, apaixonada por tecnologia, que trabalha
              todos os dias para garantir estabilidade, velocidade e suporte rápido para você.
            </p>
            <p className="font-sans mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
              Mais do que conectar dispositivos, queremos conectar histórias. Por isso,
              investimos em infraestrutura moderna e em uma equipe preparada para atender
              com transparência e agilidade.
            </p>
          </article>

          <div className="flex justify-center lg:justify-end">
            <div className="relative mx-auto h-[550px] w-[260px] sm:h-[600px] sm:w-[280px] rounded-[3rem] border-[8px] border-slate-900 bg-slate-900 shadow-2xl overflow-hidden ring-1 ring-slate-200">
              <div className="absolute top-0 left-1/2 z-20 h-6 w-32 -translate-x-1/2 rounded-b-3xl bg-slate-900"></div>
              <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="absolute inset-0 h-full w-full object-cover rounded-[2.5rem]"
                >
                  <source src="/video-celular.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-24">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex rounded-full bg-[#F58220]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#F58220]">
            TIRE SUAS DUVIDAS
          </span>
          <h2 className="font-display mt-5 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-[#0E7A8A]">
            Perguntas Frequentes
          </h2>
          <p className="font-sans mx-auto mt-4 max-w-3xl leading-relaxed text-slate-500">
            Tudo o que você precisa saber antes de assinar a melhor internet de Londrina.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mt-12 flex flex-col gap-4 px-4">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300"
            >
              <summary className="flex w-full cursor-pointer list-none items-center justify-between p-6 text-left hover:bg-slate-50 [&::-webkit-details-marker]:hidden">
                <span className="font-display text-lg font-semibold leading-tight tracking-tight text-[#0E7A8A]">
                  {item.question}
                </span>
                <span className="text-2xl font-semibold text-[#F58220] transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>

              <div className="grid grid-rows-[0fr] transition-all duration-300 ease-out group-open:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="font-sans p-6 pt-0 leading-relaxed text-slate-600">
                    {item.answer}
                  </p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section id="suporte-rapido" className="relative overflow-hidden bg-[#0A192F] py-16 md:py-24">
        <div className="pointer-events-none absolute -top-24 -left-20 z-0 h-72 w-72 rounded-full bg-[#00B4D8]/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-16 z-0 h-64 w-64 rounded-full bg-[#F58220]/15 blur-3xl" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex rounded-full border border-[#F58220]/30 bg-[#F58220]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#F58220]">
            Suporte e Serviços
          </span>
          <h2 className="font-display mt-5 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white">
            Resolva tudo rápido pelo WhatsApp
          </h2>
          <p className="font-sans mx-auto mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-slate-300">
            Toque em uma opção e fale direto com a nossa equipe.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((item) => (
              <a
                key={item.title}
                href={`https://wa.me/554330325000?text=${encodeURIComponent(item.message)}`}
                target="_blank"
                rel="noreferrer"
                className="group flex min-h-36 items-center justify-center rounded-2xl border border-slate-700/60 bg-white/5 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-[#00B4D8]/70 hover:bg-white/10 hover:shadow-[0_0_28px_rgba(0,180,216,0.2)]"
              >
                <span className="font-display text-lg font-semibold leading-tight tracking-tight text-white transition-colors duration-300 group-hover:text-[#8CEBFF]">
                  {item.title}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#050B14] py-12 border-t border-white/10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div>
            <h3 className="font-display font-bold text-2xl text-white">Telefonarnet</h3>
            <p className="text-slate-400 text-sm mt-4">
              Conexão de verdade e suporte humano para Londrina e região.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-slate-200">
              Links Rápidos
            </h4>
            <div className="mt-4 flex flex-col gap-2">
              <a href="#planos" className="text-slate-300 hover:text-[#00B4D8] text-sm">
                Planos
              </a>
              <a href="#sobre" className="text-slate-300 hover:text-[#00B4D8] text-sm">
                Sobre
              </a>
              <a href="#" className="text-slate-300 hover:text-[#00B4D8] text-sm">
                Área do Cliente
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-slate-200">
              Transparência Legal
            </h4>
            <p className="mt-4 text-slate-400 text-xs leading-relaxed">
              CNPJ: 00.000.000/0001-00
              <br />
              Rua Exemplo, 123 - Londrina, PR
              <br />
              Empresa autorizada pela ANATEL
            </p>
          </div>
        </div>

        <hr className="my-8 border-white/10" />
        <p className="text-center text-slate-500 text-sm">© 2026 Telefonarnet. Todos os direitos reservados.</p>
      </footer>

      <a
        href="https://wa.me/554330325000"
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com a Telefonarnet no WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_0_15px_rgba(37,211,102,0.4)] transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-[0_0_25px_rgba(37,211,102,0.6)]"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-current">
          <path d="M12.04 2C6.5 2 2 6.42 2 11.88c0 1.92.57 3.79 1.65 5.39L2.03 22l4.9-1.58a10.1 10.1 0 0 0 5.11 1.38h.01c5.54 0 10.04-4.42 10.04-9.88C22.09 6.42 17.59 2 12.04 2Zm5.86 14.03c-.24.67-1.41 1.28-1.94 1.36-.5.08-1.14.11-1.84-.11-.42-.14-.97-.31-1.67-.6-2.94-1.22-4.85-4.08-5-4.28-.15-.2-1.2-1.55-1.2-2.95s.74-2.08 1-2.37c.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.17.01.4-.06.63.48.24.57.8 1.96.87 2.1.07.14.12.31.02.5-.09.2-.14.32-.28.49-.14.17-.29.38-.41.51-.14.14-.29.29-.12.57.17.28.76 1.24 1.63 2.01 1.12.99 2.07 1.29 2.36 1.44.29.14.45.12.62-.07.17-.2.72-.83.91-1.11.19-.29.38-.24.64-.14.26.1 1.65.77 1.94.91.29.14.48.21.55.33.07.12.07.7-.17 1.37Z" />
        </svg>
      </a>
    </main>
  );
}



