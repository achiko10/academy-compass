import { Globe, Users, Target, Rocket } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="academic-title">ჩვენ შესახებ</h1>
      <p className="academic-subtitle">
        Academy Compass შექმნილია იმისათვის, რომ დაეხმაროს მოსწავლეებსა და სტუდენტებს თავიანთი აკადემიური პოტენციალის აღმოჩენაში.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="p-8 bg-surface border border-foreground/10 rounded-3xl">
          <div className="w-12 h-12 bg-accent-cyan/20 text-accent-cyan rounded-xl flex items-center justify-center mb-6">
            <Target size={24} />
          </div>
          <h2 className="text-2xl font-bold mb-4">ჩვენი მისია</h2>
          <p className="text-foreground/70 leading-relaxed">
            ჩვენი მიზანია გავხადოთ მეცნიერება და განათლება ხელმისაწვდომი, საინტერესო და ინტერაქტიული. გვჯერა, რომ სწორი მიმართულების მიცემით, ნებისმიერ ადამიანს შეუძლია მიაღწიოს წარმატებას საკუთარ სფეროში.
          </p>
        </div>
        <div className="p-8 bg-surface border border-foreground/10 rounded-3xl">
          <div className="w-12 h-12 bg-primary-purple/20 text-primary-purple rounded-xl flex items-center justify-center mb-6">
            <Rocket size={24} />
          </div>
          <h2 className="text-2xl font-bold mb-4">ხედვა</h2>
          <p className="text-foreground/70 leading-relaxed">
            ინოვაციური ტექნოლოგიების, მათ შორის ხელოვნური ინტელექტისა და 3D ვიზუალიზაციის გამოყენებით, ვქმნით პლატფორმას მომავალი მეცნიერებისა და პროფესიონალების აღმოსაჩენად.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-primary-blue/5 to-accent-cyan/5 border border-primary-blue/10 rounded-3xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-6">შემოგვიერთდი მოგზაურობაში</h2>
        <div className="flex justify-center gap-6 text-foreground/60">
          <div className="flex flex-col items-center gap-2">
            <Users size={32} className="text-accent-cyan" />
            <span className="font-semibold text-foreground">10,000+</span>
            <span className="text-xs">მომხმარებელი</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Globe size={32} className="text-primary-blue" />
            <span className="font-semibold text-foreground">50+</span>
            <span className="text-xs">სამეცნიერო დარგი</span>
          </div>
        </div>
      </div>
    </div>
  );
}
