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
    benefits: ["100% Fibra", "Wi-fi Gratis", "Instalacao Rapida"],
  },
  {
    name: "600 MEGA",
    price: "109,77",
    cta: "Assinar 600 Mega",
    featured: true,
    badge: "MAIS VENDIDO",
    benefits: ["100% Fibra", "Wi-Fi 6", "Instalacao Rapida", "Suporte Prioritario"],
  },
  {
    name: "600 MEGA",
    price: "119,77",
    cta: "Assinar 600 Mega",
    featured: false,
    badge: "NOVO",
    benefits: ["100% Fibra", "Wi-Fi 6", "Instalacao Rapida", "Suporte Prioritario"],
  },
  {
    name: "800 MEGA",
    price: "129,77",
    cta: "Assinar 800 Mega",
    featured: false,
    benefits: ["100% Fibra", "Wi-fi Gratis", "Instalacao Rapida"],
  },
  {
    name: "900 MEGA",
    price: "149,77",
    cta: "Assinar 900 Mega",
    featured: false,
    benefits: ["100% Fibra", "Wi-fi Gratis", "Instalacao Rapida"],
  },
];

const differentials = [
  {
    title: "100% Fibra Optica",
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
    description: "Atendimento proximo e rapido para resolver tudo sem burocracia.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10 text-[#F39200]">
        <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M5 20C5.8 16.6 8.4 15 12 15C15.6 15 18.2 16.6 19 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Instalacao Rapida",
    description: "Equipe tecnica agil para ativar seu plano no menor tempo possivel.",
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
    question: "A instalacao tem algum custo?",
    answer: "Nao! Para todos os planos listados, a instalacao e 100% gratuita.",
  },
  {
    question: "Qual o prazo para instalarem na minha casa?",
    answer:
      "Nossa equipe tecnica local em Londrina garante a instalacao mais rapida da regiao, em ate 48 horas uteis apos a aprovacao.",
  },
  {
    question: "O roteador Wi-Fi ja esta incluso?",
    answer:
      "Sim, fornecemos roteadores de alta performance (com Wi-Fi 6 nos planos elegiveis) em regime de comodato, sem custo adicional.",
  },
  {
    question: "Como acesso os streamings (Max, Disney+, etc)?",
    answer:
      "Apos a instalacao, voce recebera um login exclusivo no nosso app parceiro para ativar e curtir todos os seus servicos de streaming.",
  },
];

const quickActions = [
  {
    title: "Indique e Ganhe",
    message: "Ola! Quero saber como funciona o programa Indique e Ganhe da Telefonarnet.",
  },
  {
    title: "2a Via do Boleto",
    message: "Ola! Preciso da 2a via do meu boleto da Telefonarnet.",
  },
  {
    title: "Troca de Endereco",
    message: "Ola! Quero solicitar troca de endereco da minha internet Telefonarnet.",
  },
  {
    title: "Troca de Titularidade",
    message: "Ola! Quero solicitar troca de titularidade do meu contrato Telefonarnet.",
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
    const whatsappUrl = `https://wa.me/5543000000000?text=${encodeURIComponent(message)}`;

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
    <main className="bg-[#0A192F] text-white">
      <section className="relative min-h-screen overflow-visible bg-[#0A192F] text-white">
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

        <nav className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-8 animate-[fade-up_0.8s_ease-out_forwards]">
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
              Servicos
            </a>
            <a
              href="#suporte"
              className="text-sm font-medium text-slate-200 transition hover:text-[#00B4D8]"
            >
              Suporte
            </a>
            <a
              href="tel:+554300000000"
              className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#FF8C00] hover:bg-white/5"
            >
              Ligar
            </a>
          </div>
        </nav>

        <div className="relative z-20 mx-auto grid min-h-[calc(100vh-92px)] max-w-7xl items-center gap-14 px-6 pb-20 pt-8 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <div className="max-w-2xl opacity-0 animate-[fade-up_0.9s_ease-out_forwards] [animation-delay:120ms]">
            <div className="inline-flex rounded-full border border-[#00B4D8]/40 bg-[#00B4D8]/10 px-4 py-2 text-xs font-semibold tracking-[0.12em] text-[#7AE7FF]">
              A internet definitiva de Londrina
            </div>

            <h1 className="mt-7 max-w-3xl text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-[-0.03em] text-white text-balance">
              A <span className="text-[#00B4D8]">velocidade</span> que você merece,
              <br className="hidden md:block" /> com a{" "}
              <span className="text-[#00B4D8]">estabilidade</span> que você precisa.
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300 sm:text-xl">
              Planos 100% fibra com os melhores streamings inclusos. Consulte a
              disponibilidade na sua rua agora mesmo.
            </p>
          </div>

          <div className="flex justify-center opacity-0 animate-[fade-up_0.9s_ease-out_forwards] [animation-delay:260ms] lg:justify-end">
            <div className="w-full max-w-md rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-md">
              <h2 className="text-3xl font-bold leading-tight text-white">
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
                className="mt-4 w-full rounded-lg bg-[#FF8C00] p-4 font-bold text-white shadow-[0_0_24px_rgba(255,140,0,0.25)] transition-all duration-300 hover:shadow-[0_0_34px_rgba(255,140,0,0.45)]"
              >
                Consultar Disponibilidade -&gt;
              </button>

              <p className="mt-4 text-xs text-slate-400">
                Consulta rapida e sem compromisso.
              </p>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-1/2 z-20 h-24 w-1 -translate-x-1/2 translate-y-1/2 bg-gradient-to-b from-cyan-500 to-orange-500 shadow-[0_0_18px_rgba(0,180,216,0.55)]" />
      </section>

      <section
        id="parceiros-streaming"
        className="relative w-full overflow-hidden bg-slate-50 py-20 flex flex-col items-center"
      >
        <p className="text-sm font-bold uppercase tracking-widest text-[#F58220]">
          ENTRETENIMENTO PREMIUM
        </p>

        <h2 className="mx-auto mt-4 max-w-3xl px-6 text-center text-3xl font-bold leading-tight text-[#0E7A8A] sm:text-4xl lg:text-5xl">
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

      <section id="planos" className="relative w-full overflow-hidden bg-white py-24">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <span className="inline-flex rounded-full bg-[#F58220]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#F58220]">
              ESCOLHA SUA VELOCIDADE
            </span>
            <h2 className="mt-5 text-3xl font-bold leading-tight text-[#0E7A8A] sm:text-4xl">
              Planos de internet fibra optica feitos para voce.
            </h2>
          </div>

          <div className="relative w-full max-w-7xl mx-auto mt-16">
            <button
              type="button"
              aria-label="Planos anteriores"
              onClick={() => scrollPlans("left")}
              className="absolute top-1/2 -translate-y-1/2 z-20 -left-4 md:-left-8 w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center text-[#0E7A8A] border border-slate-100 hover:scale-110 hover:bg-[#F58220] hover:text-white transition-all cursor-pointer"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none" aria-hidden="true">
                <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              type="button"
              aria-label="Próximos planos"
              onClick={() => scrollPlans("right")}
              className="absolute top-1/2 -translate-y-1/2 z-20 -right-4 md:-right-8 w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center text-[#0E7A8A] border border-slate-100 hover:scale-110 hover:bg-[#F58220] hover:text-white transition-all cursor-pointer"
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
                  className={`snap-center min-w-[85vw] md:min-w-[320px] lg:min-w-[340px] rounded-2xl p-6 shadow-lg relative border border-slate-200 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl ${
                    plan.featured
                      ? "bg-[#0E7A8A] text-white border-[#0E7A8A] lg:scale-105 z-10 opacity-100"
                      : "bg-white text-slate-700 opacity-90 hover:opacity-100 z-0"
                  }`}
                >
                  {plan.badge ? (
                    <span className="absolute -top-5 left-6 rounded-full bg-[#F58220] px-4 py-1 text-xs font-bold uppercase tracking-wide text-white">
                      {plan.badge}
                    </span>
                  ) : null}

                  <h3 className={`text-2xl font-bold ${plan.featured ? "text-white" : "text-[#0E7A8A]"}`}>
                    {plan.name}
                  </h3>

                  <p className={`mt-5 text-4xl font-bold ${plan.featured ? "text-white" : "text-slate-900"}`}>
                    R$ {plan.price}
                    <span className={`text-lg font-medium ${plan.featured ? "text-white/80" : "text-slate-500"}`}>
                      /mes
                    </span>
                  </p>

                  <ul className="mt-6 space-y-3">
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
                    className={`mt-8 w-full rounded-xl px-5 py-3 font-semibold transition-colors ${
                      plan.featured
                        ? "bg-[#F58220] text-white hover:bg-orange-600"
                        : "border border-[#F58220] text-[#F58220] hover:bg-[#F58220] hover:text-white"
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
              <h3 className="text-xl md:text-2xl font-bold text-white">Ficou com alguma duvida?</h3>
              <p className="mt-2 max-w-lg text-sm text-white/80">
                Fale com um de nossos consultores especialistas. Te ajudamos a escolher o plano perfeito para a sua necessidade.
              </p>
            </div>

            <a
              href="https://wa.me/5543000000000"
              target="_blank"
              rel="noreferrer"
              className="w-full md:w-auto rounded-lg bg-[#25D366] px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-green-500"
            >
              Falar com Consultor
            </a>
          </div>
        </div>
      </section>

      <section id="sobre" className="relative w-full py-24 overflow-hidden bg-[#0C7489]">
        <svg
          viewBox="0 0 100 90"
          aria-hidden="true"
          className="absolute -top-[12%] -left-[8%] h-[420px] w-[420px] rotate-12 opacity-75"
        >
          <path d="M50 6Q55 6 58 11L93 73Q96 79 91 83Q88 85 83 85H17Q12 85 9 83Q4 79 7 73L42 11Q45 6 50 6Z" fill="#128A9F" />
        </svg>
        <svg
          viewBox="0 0 100 90"
          aria-hidden="true"
          className="absolute -bottom-[25%] -right-[6%] h-[620px] w-[620px] -rotate-12 opacity-90"
        >
          <path d="M50 6Q55 6 58 11L93 73Q96 79 91 83Q88 85 83 85H17Q12 85 9 83Q4 79 7 73L42 11Q45 6 50 6Z" fill="#0A657A" />
        </svg>
        <svg
          viewBox="0 0 100 90"
          aria-hidden="true"
          className="absolute -top-[28%] left-[42%] h-[380px] w-[380px] rotate-[26deg] opacity-50"
        >
          <path d="M50 6Q55 6 58 11L93 73Q96 79 91 83Q88 85 83 85H17Q12 85 9 83Q4 79 7 73L42 11Q45 6 50 6Z" fill="#159BB3" />
        </svg>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <article>
            <h2 className="max-w-xl text-4xl font-bold leading-tight text-white sm:text-5xl">
              Muito mais que internet. Uma conexao de verdade.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white">
              Localizada em <strong className="text-[#F39200]">Londrina</strong>, somos responsaveis
              por levar <strong className="text-[#F39200]">conexao</strong>,{" "}
              <strong className="text-[#F39200]">entretenimento</strong> e{" "}
              <strong className="text-[#F39200]">lazer</strong> para milhares de familias e
              empresas.
            </p>

            <a
              href="#contato"
              className="mt-10 inline-flex rounded-xl border border-white px-6 py-3 text-base font-semibold text-white transition-all hover:bg-[#F39200] hover:border-[#F39200]"
            >
              Fale com a nossa equipe
            </a>
          </article>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {differentials.map((item) => (
              <article
                key={item.title}
                className="relative min-h-[230px] overflow-hidden"
              >
                <svg
                  viewBox="0 0 100 90"
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full"
                >
                  <path
                    d="M50 6Q55 6 58 11L93 73Q96 79 91 83Q88 85 83 85H17Q12 85 9 83Q4 79 7 73L42 11Q45 6 50 6Z"
                    className="fill-white/12 stroke-white/25"
                    strokeWidth="1.2"
                  />
                </svg>
                <div className="relative z-10 flex h-full flex-col px-8 pb-8 pt-9">
                  {item.icon}
                  <h3 className="mb-2 mt-4 text-white font-bold text-lg">{item.title}</h3>
                  <p className="text-white/75 text-sm leading-relaxed">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="conheca-telefonarnet" className="relative overflow-hidden bg-white py-24">
        <div className="absolute -left-24 -top-20 h-72 w-72 rounded-full bg-[#00B4D8]/10 blur-3xl" />
        <div className="absolute -bottom-20 right-0 h-80 w-80 rounded-full bg-[#F58220]/10 blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
          <article>
            <span className="inline-flex rounded-full bg-[#0E7A8A]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0E7A8A]">
              Conheca a Telefonarnet
            </span>
            <h2 className="mt-5 max-w-xl text-3xl font-bold leading-tight text-[#0E7A8A] sm:text-4xl">
              Conexao que aproxima pessoas, familias e negocios.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              A Telefonarnet nasceu para entregar internet de alta performance com atendimento
              humano e proximo. Somos uma empresa local, apaixonada por tecnologia, que trabalha
              todos os dias para garantir estabilidade, velocidade e suporte rapido para voce.
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              Mais do que conectar dispositivos, queremos conectar historias. Por isso,
              investimos em infraestrutura moderna e em uma equipe preparada para atender
              com transparencia e agilidade.
            </p>
          </article>

          <div className="flex justify-center lg:justify-end">
            <div className="iphone-frame">
              <div className="iphone-notch" />
              <div className="iphone-screen">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="h-full w-full object-cover"
                >
                  <source src="/hero-video.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="mx-auto w-full max-w-5xl px-6 text-center">
          <span className="inline-flex rounded-full bg-[#F58220]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#F58220]">
            TIRE SUAS DUVIDAS
          </span>
          <h2 className="mt-5 text-3xl font-bold text-[#0E7A8A] sm:text-4xl">
            Perguntas Frequentes
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-slate-500">
            Tudo o que voce precisa saber antes de assinar a melhor internet de Londrina.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mt-12 flex flex-col gap-4 px-4">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300"
            >
              <summary className="flex w-full cursor-pointer list-none items-center justify-between p-6 text-left hover:bg-slate-50 [&::-webkit-details-marker]:hidden">
                <span className="text-lg font-semibold text-[#0E7A8A]">
                  {item.question}
                </span>
                <span className="text-2xl font-semibold text-[#F58220] transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>

              <div className="grid grid-rows-[0fr] transition-all duration-300 ease-out group-open:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="p-6 pt-0 leading-relaxed text-slate-600">
                    {item.answer}
                  </p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section id="suporte-rapido" className="bg-[#0E7A8A] py-24">
        <div className="mx-auto w-full max-w-6xl px-6 text-center">
          <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#C9F7FF]">
            Suporte e Servicos
          </span>
          <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl">
            Resolva tudo rapido pelo WhatsApp
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Toque em uma opcao e fale direto com a nossa equipe.
          </p>

          <div className="mt-12 grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((item) => (
              <a
                key={item.title}
                href={`https://wa.me/5543000000000?text=${encodeURIComponent(item.message)}`}
                target="_blank"
                rel="noreferrer"
                className="triangle-button group"
              >
                <svg
                  viewBox="0 0 100 90"
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full"
                >
                  <path
                    d="M50 6Q55 6 58 11L93 73Q96 79 91 83Q88 85 83 85H17Q12 85 9 83Q4 79 7 73L42 11Q45 6 50 6Z"
                    className="fill-[#F58220] transition-colors duration-300 group-hover:fill-[#ff9f3a]"
                  />
                </svg>
                <span className="relative z-10 px-6 text-center text-base font-bold leading-tight text-white">
                  {item.title}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
