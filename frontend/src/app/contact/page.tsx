import { Mail, MessageSquare, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="academic-title">კონტაქტი</h1>
      <p className="academic-subtitle">
        გაქვთ კითხვები ან შემოთავაზებები? ნებისმიერ დროს დაგვიკავშირდით!
      </p>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary-blue/10 text-primary-blue border border-primary-blue/20 rounded-2xl flex items-center justify-center shrink-0">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1">ელექტრონული ფოსტა</h3>
              <p className="text-foreground/70 mb-2">მოგვწერეთ ნებისმიერ საკითხზე.</p>
              <a href="mailto:info@academycompass.ge" className="text-accent-cyan hover:underline font-medium">info@academycompass.ge</a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary-blue/10 text-primary-blue border border-primary-blue/20 rounded-2xl flex items-center justify-center shrink-0">
              <MessageSquare size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1">სოციალური ქსელები</h3>
              <p className="text-foreground/70 mb-2">გამოგვყევით სიახლეებისთვის.</p>
              <div className="flex gap-4">
                <a href="#" className="text-accent-cyan hover:underline font-medium">Facebook</a>
                <a href="#" className="text-accent-cyan hover:underline font-medium">LinkedIn</a>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary-blue/10 text-primary-blue border border-primary-blue/20 rounded-2xl flex items-center justify-center shrink-0">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1">მისამართი</h3>
              <p className="text-foreground/70">თბილისი, საქართველო<br/>ტექნოპარკის ქ. 1</p>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-foreground/10 rounded-3xl p-8">
          <h2 className="text-2xl font-bold mb-6">მოგვწერეთ შეტყობინება</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground/70 mb-1">სახელი</label>
              <input type="text" className="w-full bg-surface-light border border-foreground/15 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-cyan" placeholder="თქვენი სახელი" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/70 mb-1">ელ. ფოსტა</label>
              <input type="email" className="w-full bg-surface-light border border-foreground/15 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-cyan" placeholder="თქვენი ელ. ფოსტა" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/70 mb-1">შეტყობინება</label>
              <textarea rows={4} className="w-full bg-surface-light border border-foreground/15 rounded-xl px-4 py-3 focus:outline-none focus:border-accent-cyan" placeholder="თქვენი შეტყობინება..."></textarea>
            </div>
            <button type="button" className="w-full py-4 bg-primary-blue text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors">
              გაგზავნა
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
