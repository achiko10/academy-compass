import { GraduationCap, Briefcase, Award, Globe, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function AcademicPathPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="academic-title">აკადემიური გზა</h1>
      <p className="academic-subtitle">სრული გზამკვლევი: სკოლიდან პროფესიულ მეცნიერულ კარიერამდე.</p>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3"><GraduationCap className="text-primary-blue" /> უნივერსიტეტის სისტემა</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <PathCard step="I" title="ბაკალავრიატი" duration="4 წელი" items={["თეორიული საფუძვლები", "ლაბორატორიული სამუშაო", "საბაკალავრო ნაშრომი", "პრაქტიკა / სტაჟირება"]} color="cyan" />
          <PathCard step="II" title="მაგისტრატურა" duration="2 წელი" items={["ვიწრო სპეციალიზაცია", "კვლევითი მეთოდოლოგია", "სამაგისტრო ნაშრომი", "სამეცნიერო პუბლიკაცია"]} color="purple" />
          <PathCard step="III" title="დოქტორანტურა" duration="3-5 წელი" items={["ორიგინალური კვლევა", "დისერტაცია", "საერთაშორისო კონფერენციები", "პუბლიკაციები (3+)"]} color="gold" />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3"><Briefcase className="text-primary-purple" /> კარიერული გზები</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-surface/70 border border-foreground/10 rounded-2xl">
            <h3 className="text-lg font-bold text-accent-cyan mb-4">🎓 აკადემიური კარიერა</h3>
            <ul className="space-y-2 text-sm text-foreground/70"><li>• აკადემიური პოზიციები (პროფესორი)</li><li>• კვლევითი პროექტების ხელმძღვანელობა</li><li>• გრანტები (Rustaveli, Horizon Europe)</li><li>• საერთაშორისო კოლაბორაცია</li></ul>
          </div>
          <div className="p-6 bg-surface/70 border border-foreground/10 rounded-2xl">
            <h3 className="text-lg font-bold text-primary-purple mb-4">🏢 ინდუსტრიული კარიერა</h3>
            <ul className="space-y-2 text-sm text-foreground/70"><li>• R&D დეპარტამენტი</li><li>• ტექ კომპანიები (Google, CERN)</li><li>• Data Scientist</li><li>• ფარმაცევტიკა და ბიოტექნოლოგია</li></ul>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3"><Award className="text-accent-gold" /> შესაძლებლობები</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: <Globe size={20} />, title: "საზაფხულო სკოლები", desc: "CERN, DESY, JINR პროგრამები." },
            { icon: <Briefcase size={20} />, title: "სტაჟირებები", desc: "კვლევით ჯგუფებში პრაქტიკა." },
            { icon: <Award size={20} />, title: "სტიპენდიები", desc: "Erasmus+, DAAD, Fulbright." },
            { icon: <TrendingUp size={20} />, title: "ბაზრის ტრენდები", desc: "მოთხოვნადი დარგები." },
          ].map((item, i) => (
            <div key={i} className="p-5 bg-surface/70 border border-foreground/10 rounded-xl">
              <div className="w-10 h-10 bg-accent-cyan/20 rounded-lg flex items-center justify-center text-accent-cyan mb-3">{item.icon}</div>
              <h4 className="font-semibold text-foreground text-sm mb-1">{item.title}</h4>
              <p className="text-xs text-foreground/70">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="text-center">
        <Link href="/map" className="inline-flex items-center gap-2 px-8 py-4 bg-primary-blue hover:bg-blue-500 text-white rounded-full font-medium transition-all shadow-[0_0_25px_rgba(79,143,255,0.4)]">
          <Globe size={20} /> ნახე რუკაზე
        </Link>
      </div>
    </div>
  );
}

function PathCard({ step, title, duration, items, color }: { step: string; title: string; duration: string; items: string[]; color: string }) {
  const styles: Record<string, string> = {
    cyan: "border-cyan-400/30 text-cyan-400",
    purple: "border-purple-400/30 text-purple-400",
    gold: "border-amber-400/30 text-amber-400",
  };
  const [borderClass, textClass] = (styles[color] || styles.cyan).split(' ');
  return (
    <div className={`p-6 bg-surface/70 border ${borderClass} rounded-2xl`}>
      <div className={`text-3xl font-black mb-2 ${textClass}`}>{step}</div>
      <h3 className="text-xl font-bold text-foreground">{title}</h3>
      <div className="text-xs text-foreground/50 mb-4">{duration}</div>
      <ul className="space-y-2 text-sm text-foreground/70">{items.map((item, i) => <li key={i}>• {item}</li>)}</ul>
    </div>
  );
}
