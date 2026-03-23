import { Shield, Lock, Eye } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="academic-title">კონფიდენციალობის პოლიტიკა</h1>
      <p className="academic-subtitle">ბოლო განახლება: {new Date().toLocaleDateString('ka-GE')}</p>

      <div className="space-y-12">
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Shield className="text-accent-cyan" />
            <h2 className="text-2xl font-bold">1. მონაცემთა შეგროვება</h2>
          </div>
          <p className="text-foreground/80 leading-relaxed mb-4">
            ჩვენ ვაგროვებთ მხოლოდ იმ მონაცემებს, რომლებიც აუცილებელია პლატფორმის სრულყოფილად ფუნქციონირებისთვის და თქვენი გამოცდილების გასაუმჯობესებლად. ეს მოიცავს:
          </p>
          <ul className="list-disc list-inside text-foreground/70 space-y-2 ml-4">
            <li>სარეგისტრაციო ინფორმაცია (სახელი, ელ. ფოსტა)</li>
            <li>კარიერის ტესტის შედეგები (თქვენი უპირატესობების გასაანალიზებლად)</li>
            <li>პლატფორმაზე აქტივობის ძირითადი მეტრიკები (ანონიმურად)</li>
          </ul>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <Lock className="text-primary-blue" />
            <h2 className="text-2xl font-bold">2. მონაცემთა დაცვა</h2>
          </div>
          <p className="text-foreground/80 leading-relaxed">
            ჩვენ ვიყენებთ უსაფრთხოების თანამედროვე სტანდარტებს (SSL/TLS დაშიფრვა) რათა დავიცვათ თქვენი პერსონალური ინფორმაცია უნებართვო წვდომისგან. პაროლები ინახება დაშიფრული სახით და ჩვენ არ გვაქვს მათზე პირდაპირი წვდომა.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <Eye className="text-primary-purple" />
            <h2 className="text-2xl font-bold">3. მესამე პირებთან გაზიარება</h2>
          </div>
          <p className="text-foreground/80 leading-relaxed">
            ჩვენ არ ვყიდით და არ ვაზიარებთ თქვენს პირად მონაცემებს მესამე პირებთან მარკეტინგული მიზნებისთვის. მონაცემები შეიძლება გაზიარდეს მხოლოდ კანონით დადგენილ შემთხვევებში ან სერვისის მომწოდებლებთან (მაგ. hosting პროვაიდერი), რომლებიც მკაცრად იცავენ კონფიდენციალობას.
          </p>
        </section>
      </div>
    </div>
  );
}
