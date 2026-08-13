import { useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bike,
  Check,
  ChevronRight,
  Clock3,
  Droplets,
  Instagram,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { toast } from "sonner";

const HERO_IMAGE = "/manus-storage/phuoc-loc-motorbike-hero_0a72aa64.jpg";
const SERVICE_IMAGE = "/manus-storage/phuoc-loc-motorbike-detail_8002e0ca.jpg";
const SPACE_IMAGE = "/manus-storage/phuoc-loc-motorbike-space_5746df28.png";
const LOGO_IMAGE = "/manus-storage/phuoc-loc-mark_fe6002a3.png";

const services = [
  {
    index: "01",
    title: "Rửa xe máy tiêu chuẩn",
    description: "Làm sạch dàn áo, bánh xe và các vùng dễ bám bụi bằng quy trình gọn gàng, kỹ lưỡng.",
    icon: Droplets,
  },
  {
    index: "02",
    title: "Rửa kỹ & chăm dàn áo",
    description: "Làm kỹ dàn áo, mâm và các chi tiết cần thêm thời gian để xe sạch sâu, nhìn sáng và đều màu.",
    icon: Sparkles,
  },
  {
    index: "03",
    title: "Vệ sinh cốp xe",
    description: "Làm sạch cốp xe, yên xe và những góc nhỏ thường bị bỏ quên.",
    icon: ShieldCheck,
  },
];

const process = [
  ["01", "Tiếp nhận", "Kiểm tra nhanh tình trạng xe máy và ghi nhận nhu cầu của bạn."],
  ["02", "Làm sạch", "Đội ngũ tiến hành theo đúng hạng mục, ưu tiên sự cẩn thận."],
  ["03", "Bàn giao", "Kiểm tra lại cùng khách hàng trước khi xe máy rời tiệm."],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    toast.success("Đã nhận yêu cầu đặt lịch", {
      description: "Phước Lộc sẽ liên hệ lại để xác nhận khung giờ phù hợp.",
    });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f4f1eb] text-[#202725] selection:bg-[#d95f32] selection:text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-[#202725]/90 text-white backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <button className="group flex items-center gap-3 text-left" onClick={() => scrollTo("top")} aria-label="Về đầu trang">
            <span className="grid size-10 place-items-center rounded-full bg-[#d95f32] p-1.5 transition-transform duration-200 group-hover:rotate-6">
              <img src={LOGO_IMAGE} alt="Biểu tượng Rửa Xe Phước Lộc" className="size-full object-contain" />
            </span>
            <span className="leading-none">
              <span className="block font-display text-lg tracking-[0.08em]">PHƯỚC LỘC</span>
              <span className="mt-1 block font-body text-[9px] uppercase tracking-[0.24em] text-white/55">Motorbike wash</span>
            </span>
          </button>

          <nav className="hidden items-center gap-9 font-body text-[11px] font-semibold uppercase tracking-[0.15em] text-white/70 lg:flex" aria-label="Điều hướng chính">
            <button className="transition-colors hover:text-white" onClick={() => scrollTo("dich-vu")}>Dịch vụ</button>
            <button className="transition-colors hover:text-white" onClick={() => scrollTo("quy-trinh")}>Quy trình</button>
            <button className="transition-colors hover:text-white" onClick={() => scrollTo("lien-he")}>Liên hệ</button>
          </nav>

          <div className="flex items-center gap-3">
            <a href="tel:0379012120" className="hidden items-center gap-2 font-body text-xs font-semibold text-white/80 transition-colors hover:text-white sm:flex">
              <Phone size={14} strokeWidth={1.7} /> 0379 012 120
            </a>
            <button onClick={() => scrollTo("dat-lich")} className="hidden items-center gap-2 rounded-full bg-[#d95f32] px-5 py-3 font-body text-[10px] font-bold uppercase tracking-[0.15em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#e47448] active:scale-[.97] md:flex">
              Đặt lịch <ArrowUpRight size={14} />
            </button>
            <button className="grid size-10 place-items-center rounded-full border border-white/20 lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Mở menu">
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="border-t border-white/10 bg-[#202725] px-5 py-5 lg:hidden">
            <div className="flex flex-col gap-4 font-body text-xs font-semibold uppercase tracking-[0.16em] text-white/75">
              <button className="text-left" onClick={() => scrollTo("dich-vu")}>Dịch vụ</button>
              <button className="text-left" onClick={() => scrollTo("quy-trinh")}>Quy trình</button>
              <button className="text-left" onClick={() => scrollTo("lien-he")}>Liên hệ</button>
              <button className="mt-2 flex items-center gap-2 text-left text-[#e47448]" onClick={() => scrollTo("dat-lich")}>Đặt lịch <ArrowUpRight size={14} /></button>
            </div>
          </div>
        )}
      </header>

      <main id="top">
        <section className="relative min-h-[740px] overflow-hidden bg-[#202725] pt-[76px] text-white lg:min-h-[820px]">
          <img src={HERO_IMAGE} alt="Xe máy được làm sạch tại Rửa Xe Phước Lộc" className="absolute inset-0 size-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,25,24,.94)_0%,rgba(20,25,24,.72)_36%,rgba(20,25,24,.12)_78%)]" />
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:72px_72px]" />
          <div className="relative mx-auto flex min-h-[664px] max-w-[1400px] items-end px-5 pb-16 sm:px-8 lg:items-center lg:px-12 lg:pb-0">
            <div className="max-w-[780px] animate-[rise_.8s_cubic-bezier(.23,1,.32,1)_both]">
              <div className="mb-7 flex items-center gap-4 font-body text-[10px] font-bold uppercase tracking-[0.28em] text-[#a8dde6]">
                <span className="h-px w-12 bg-[#d95f32]" />
                Rửa xe máy chuyên nghiệp · Gò Vấp
              </div>
              <h1 className="font-display text-[clamp(3.5rem,8.5vw,8rem)] leading-[.88] tracking-[-.055em] text-[#f7f3eb]">
                Sạch sâu.<br /><em className="font-display text-[#e47448]">Lên dáng.</em><br />Sẵn sàng lăn bánh.
              </h1>
              <div className="mt-9 flex max-w-[560px] flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
                <p className="max-w-[360px] font-body text-base leading-7 text-white/70">Làm sạch chiếc xe máy của bạn bằng sự kỹ lưỡng, minh bạch và một chút tinh tế của Phước Lộc.</p>
                <button onClick={() => scrollTo("dat-lich")} className="group inline-flex shrink-0 items-center gap-4 self-start rounded-full bg-[#d95f32] px-6 py-4 font-body text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-all duration-200 hover:-translate-y-1 hover:bg-[#e47448] active:scale-[.97]">
                  Đặt một khung giờ <span className="grid size-7 place-items-center rounded-full bg-white/15 transition-transform group-hover:rotate-45"><ArrowUpRight size={14} /></span>
                </button>
              </div>
            </div>
            <div className="absolute bottom-9 right-6 hidden items-center gap-3 font-body text-[10px] uppercase tracking-[0.2em] text-white/45 lg:flex">
              <span className="grid size-9 place-items-center rounded-full border border-white/20"><ArrowDownRight size={14} /></span> Cuộn để khám phá
            </div>
          </div>
        </section>

        <section className="relative border-b border-[#202725]/10 bg-[#f4f1eb] py-20 lg:py-28">
          <div className="mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_.9fr] lg:gap-24 lg:px-12">
            <div>
              <p className="eyebrow mb-5">01 / Tinh thần Phước Lộc</p>
              <h2 className="max-w-[680px] font-display text-[clamp(2.8rem,5vw,5.7rem)] leading-[.94] tracking-[-.045em]">Không chỉ rửa xe máy.<br /><span className="text-[#d95f32]">Là giữ xe đẹp.</span></h2>
            </div>
            <div className="flex flex-col justify-end lg:pb-2">
              <p className="max-w-[480px] font-body text-lg leading-8 text-[#52605c]">Một điểm dừng quen thuộc trên Nguyễn Văn Khối cho những ai muốn xe máy được làm sạch đàng hoàng, phục vụ tử tế và bàn giao với sự yên tâm.</p>
              <div className="mt-8 flex items-center gap-4 font-body text-[11px] font-bold uppercase tracking-[0.15em] text-[#202725]"><span className="h-px w-16 bg-[#d95f32]" /> Tận tâm trong từng chi tiết</div>
            </div>
          </div>
        </section>

        <section id="dich-vu" className="scroll-mt-20 bg-[#202725] py-20 text-[#f4f1eb] lg:py-28">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
            <div className="mb-14 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
              <div><p className="eyebrow mb-5 text-[#a8dde6]">02 / Dịch vụ</p><h2 className="max-w-[680px] font-display text-[clamp(2.8rem,5vw,5.6rem)] leading-[.93] tracking-[-.045em]">Một quy trình sạch,<br /><em className="text-[#e47448]">một trải nghiệm khác.</em></h2></div>
              <p className="max-w-[290px] font-body text-sm leading-6 text-white/55">Bạn có thể ghé trực tiếp hoặc gọi trước để Phước Lộc chuẩn bị khung giờ phù hợp.</p>
            </div>
            <div className="divide-y divide-white/15 border-y border-white/15">
              {services.map(({ index, title, description, icon: Icon }) => (
                <article key={index} className="group grid gap-5 bg-[#202725] p-7 transition-colors duration-300 hover:bg-[#29322f] lg:grid-cols-[72px_1.1fr_1.5fr_160px] lg:items-center lg:gap-10 lg:p-8">
                  <div className="flex items-center justify-between lg:justify-start"><span className="font-body text-xs text-[#e47448]">{index}</span><Icon size={23} strokeWidth={1.2} className="text-[#a8dde6] transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-6" /></div>
                  <h3 className="font-display text-3xl tracking-[-.02em]">{title}</h3>
                  <p className="max-w-[420px] font-body text-sm leading-6 text-white/55">{description}</p>
                  <div className="flex items-center gap-2 font-body text-[10px] font-bold uppercase tracking-[0.16em] text-[#e47448]">Xem chi tiết <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" /></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="quy-trinh" className="scroll-mt-20 bg-[#f4f1eb] py-20 lg:py-28">
          <div className="mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-24 lg:px-12">
            <div className="relative overflow-hidden bg-[#dfe9e6] p-6 sm:p-9">
              <img src={SERVICE_IMAGE} alt="Chi tiết rửa xe máy" className="h-[480px] w-full object-cover mix-blend-multiply sm:h-[570px]" />
              <div className="absolute bottom-6 left-6 bg-[#d95f32] px-5 py-4 text-white sm:bottom-9 sm:left-9"><p className="font-display text-3xl leading-none">03</p><p className="mt-1 font-body text-[9px] uppercase tracking-[0.18em]">Bước rõ ràng</p></div>
            </div>
            <div className="flex flex-col justify-center">
              <p className="eyebrow mb-5">03 / Quy trình</p><h2 className="max-w-[650px] font-display text-[clamp(2.8rem,5vw,5.4rem)] leading-[.94] tracking-[-.05em]">Chỉn chu từ lúc<br /><span className="text-[#d95f32]">nhận xe đến lúc giao xe.</span></h2>
              <div className="mt-12 divide-y divide-[#202725]/15 border-y border-[#202725]/15">
                {process.map(([number, title, copy]) => <div key={number} className="grid gap-4 py-6 sm:grid-cols-[80px_170px_1fr] sm:items-start"><span className="font-body text-xs font-bold text-[#d95f32]">{number}</span><h3 className="font-display text-2xl">{title}</h3><p className="max-w-[320px] font-body text-sm leading-6 text-[#66726d]">{copy}</p></div>)}
              </div>
            </div>
          </div>
        </section>

        <section id="dat-lich" className="scroll-mt-20 border-y border-[#202725]/10 bg-[#e9e4da] py-20 lg:py-28">
          <div className="mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-28 lg:px-12">
            <div><p className="eyebrow mb-5">04 / Đặt lịch</p><h2 className="max-w-[620px] font-display text-[clamp(2.8rem,5vw,5.4rem)] leading-[.94] tracking-[-.05em]">Để xe máy<br /><em className="text-[#d95f32]">được chăm đúng lúc.</em></h2><p className="mt-7 max-w-[410px] font-body text-base leading-7 text-[#66726d]">Gửi thông tin ngắn gọn. Chúng tôi sẽ liên hệ để xác nhận lịch phù hợp với bạn.</p><div className="mt-10 flex flex-wrap gap-6 font-body text-xs text-[#52605c]"><span className="flex items-center gap-2"><Clock3 size={15} className="text-[#d95f32]" /> Luôn mở cửa</span><span className="flex items-center gap-2"><Bike size={15} className="text-[#d95f32]" /> Nhận xe máy tại tiệm</span></div></div>
            <form onSubmit={handleSubmit} className="bg-[#f4f1eb] p-6 sm:p-9">
              <div className="grid gap-5 sm:grid-cols-2"><label className="font-body text-[10px] font-bold uppercase tracking-[0.14em] text-[#52605c] sm:col-span-2">Họ và tên<input required name="name" placeholder="Tên của bạn" className="form-input" /></label><label className="font-body text-[10px] font-bold uppercase tracking-[0.14em] text-[#52605c]">Số điện thoại<input required name="phone" type="tel" placeholder="03xx xxx xxx" className="form-input" /></label><label className="font-body text-[10px] font-bold uppercase tracking-[0.14em] text-[#52605c]">Dòng xe máy<input name="car" placeholder="Ví dụ: Vision, SH, Air Blade..." className="form-input" /></label><label className="font-body text-[10px] font-bold uppercase tracking-[0.14em] text-[#52605c] sm:col-span-2">Bạn cần dịch vụ gì?<select name="service" className="form-input"><option>Rửa xe máy tiêu chuẩn</option><option>Rửa kỹ & chăm dàn áo</option><option>Vệ sinh cốp xe</option><option>Tư vấn thêm tại tiệm</option></select></label><label className="font-body text-[10px] font-bold uppercase tracking-[0.14em] text-[#52605c] sm:col-span-2">Ghi chú<textarea name="note" rows={3} placeholder="Khung giờ mong muốn hoặc lưu ý cho xe máy..." className="form-input resize-none" /></label></div>
              <button type="submit" className="mt-7 flex w-full items-center justify-center gap-3 rounded-full bg-[#d95f32] px-6 py-4 font-body text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#c75127] active:scale-[.98]">{submitted ? <><Check size={15} /> Đã gửi yêu cầu</> : <>Gửi yêu cầu đặt lịch <ArrowUpRight size={15} /></>}</button>
            </form>
          </div>
        </section>

        <section id="lien-he" className="scroll-mt-20 bg-[#dfe9e6] py-20 lg:py-28">
          <div className="mx-auto grid max-w-[1400px] gap-12 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-24 lg:px-12">
            <div><p className="eyebrow mb-5">05 / Ghé Phước Lộc</p><h2 className="font-display text-[clamp(2.8rem,5vw,5.1rem)] leading-[.94] tracking-[-.05em]">Tìm chúng tôi<br /><span className="text-[#d95f32]">trên Nguyễn Văn Khối.</span></h2><div className="mt-10 flex flex-col gap-5 font-body text-sm leading-6 text-[#52605c]"><a className="flex gap-3 transition-colors hover:text-[#d95f32]" href="https://www.google.com/maps/search/?api=1&query=464+Nguyen+Van+Khoi+Ho+Chi+Minh+City" target="_blank" rel="noreferrer"><MapPin size={18} className="mt-0.5 shrink-0 text-[#d95f32]" />464 Nguyễn Văn Khối,<br />phường Thông Tây Hội, TP.HCM</a><a className="flex gap-3 transition-colors hover:text-[#d95f32]" href="tel:0379012120"><Phone size={18} className="shrink-0 text-[#d95f32]" />0379 012 120</a></div><a href="https://www.facebook.com/ruaxephuocloc66" target="_blank" rel="noreferrer" className="mt-10 inline-flex items-center gap-3 font-body text-[11px] font-bold uppercase tracking-[0.15em] text-[#202725]">Theo dõi trên Facebook <ArrowUpRight size={15} /></a></div>
            <div className="relative min-h-[360px] overflow-hidden bg-[#202725]"><img src={SPACE_IMAGE} alt="Không gian tiệm Rửa Xe Phước Lộc" className="absolute inset-0 size-full object-cover opacity-80" /><div className="absolute inset-0 bg-gradient-to-t from-[#202725]/80 via-transparent to-transparent" /><div className="absolute bottom-7 left-7 flex items-end justify-between right-7 text-white"><div><p className="font-display text-3xl">Phước Lộc</p><p className="mt-1 font-body text-[10px] uppercase tracking-[0.17em] text-white/60">464 Nguyễn Văn Khối · Gò Vấp</p></div><a href="https://www.google.com/maps/search/?api=1&query=464+Nguyen+Van+Khoi+Ho+Chi+Minh+City" target="_blank" rel="noreferrer" className="grid size-12 place-items-center rounded-full bg-[#d95f32] transition-transform hover:rotate-45"><ArrowUpRight size={18} /></a></div></div>
          </div>
        </section>
      </main>

      <footer className="bg-[#202725] px-5 py-10 text-white sm:px-8 lg:px-12"><div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-8 sm:flex-row sm:items-end"><div><div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-full bg-[#d95f32] p-1.5"><img src={LOGO_IMAGE} alt="" className="size-full object-contain" /></span><span className="font-display text-xl tracking-[0.08em]">PHƯỚC LỘC</span></div><p className="mt-4 font-body text-xs text-white/45">Rửa xe máy bằng sự tử tế.</p></div><div className="flex flex-col gap-3 text-left sm:items-end"><a href="tel:0379012120" className="font-body text-lg text-white transition-colors hover:text-[#e47448]">0379 012 120</a><p className="font-body text-[10px] uppercase tracking-[0.16em] text-white/40">© 2026 Rửa Xe Phước Lộc</p></div></div></footer>
      <a href="tel:0379012120" className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-[#d95f32] text-white shadow-xl shadow-[#202725]/20 transition-transform hover:scale-105 md:hidden" aria-label="Gọi cho Rửa Xe Phước Lộc"><Phone size={21} /></a>
    </div>
  );
}
