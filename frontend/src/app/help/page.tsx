import { HelpCircle, Mail, MessageSquare, AlertTriangle } from "lucide-react";

const faqItems = [
  { q: "როგორ გამოვიყენო ინტერაქტიული რუკა?", a: "გახსენი 'რუკა' გვერდი მენიუდან, კვანძებს (წრეებს) შეგიძლია გადაათრიო მაუსით. დააკლიკე კვანძს დეტალური ინფორმაციისთვის." },
  { q: "როგორ გავაკეთო კარიერის ტესტი?", a: "გადადი 'ქვიზი' გვერდზე, დააჭირე 'ტესტის დაწყება' და უპასუხე 5 კითხვას. სისტემა გირჩევს სამეცნიერო დარგებს." },
  { q: "შემიძლია კონტენტის დამატება?", a: "ამჟამად კონტენტს ამატებენ ადმინისტრატორები. მომავალში დაემატება მომხმარებლის კონტრიბუცია." },
  { q: "უფასოა პლატფორმა?", a: "დიახ, 'აკადემიის კომპასი' სრულიად უფასოა და ხელმისაწვდომია ყველასთვის." },
];

export default function HelpPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="academic-title">დახმარება</h1>
      <p className="academic-subtitle">ხშირად დასმული კითხვები და კონტაქტი.</p>

      <div className="space-y-4 mb-16">
        {faqItems.map((item, i) => (
          <details key={i} className="group bg-surface/70 border border-foreground/10 rounded-xl overflow-hidden">
            <summary className="p-5 cursor-pointer flex items-center gap-3 font-semibold text-foreground hover:text-accent-cyan transition-colors">
              <HelpCircle size={18} className="text-accent-cyan flex-shrink-0" />{item.q}
            </summary>
            <div className="px-5 pb-5 text-sm text-foreground/70 leading-relaxed">{item.a}</div>
          </details>
        ))}
      </div>

      <div className="bg-surface/70 border border-foreground/10 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-foreground mb-6">კონტაქტი</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-foreground/80"><Mail size={18} className="text-primary-blue" /><span>info@academycompass.ge</span></div>
          <div className="flex items-center gap-3 text-foreground/80"><MessageSquare size={18} className="text-primary-purple" /><span>ფორუმის გვერდზე დასვი კითხვა</span></div>
          <div className="flex items-center gap-3 text-foreground/80"><AlertTriangle size={18} className="text-accent-gold" /><span>პრობლემის შეტყობინება: bugs@academycompass.ge</span></div>
        </div>
      </div>
    </div>
  );
}
