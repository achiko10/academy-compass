import { Users, MessageCircle, Lightbulb, GraduationCap } from "lucide-react";

const groups = [
  { icon: <GraduationCap size={24} />, name: "სტუდენტები", members: 234, description: "ბაკალავრიატისა და მაგისტრატურის სტუდენტების ჯგუფი." },
  { icon: <Lightbulb size={24} />, name: "ახალგაზრდა მკვლევრები", members: 89, description: "დოქტორანტები და პოსტ-დოქტორანტები." },
  { icon: <Users size={24} />, name: "მენტორები", members: 42, description: "გამოცდილი მეცნიერები, რომლებიც სტუდენტებს ეხმარებიან." },
  { icon: <MessageCircle size={24} />, name: "მასწავლებლები", members: 67, description: "სკოლისა და უნივერსიტეტის პედაგოგები." },
];

const recentTopics = [
  { title: "როგორ ავირჩიო სამაგისტრო პროგრამა?", replies: 12, author: "ნინო მ." },
  { title: "Erasmus+ სტიპენდია 2026 — გამოცდილება", replies: 28, author: "გიორგი კ." },
  { title: "Python vs R მონაცემთა ანალიზისთვის", replies: 15, author: "ანა ტ." },
  { title: "პირველი სამეცნიერო სტატიის გამოქვეყნება", replies: 9, author: "ლუკა ბ." },
];

export default function CommunityPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center cosmic-heading">ქსელი & ფორუმი</h1>
      <p className="text-lg text-center text-foreground/80 max-w-2xl mx-auto mb-16">შეუერთდი სამეცნიერო თემას, გაუზიარე გამოცდილება და იპოვე მენტორი.</p>

      <h2 className="text-2xl font-bold text-foreground mb-6">ჯგუფები</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
        {groups.map((g, i) => (
          <div key={i} className="p-6 bg-surface/70 border border-foreground/10 rounded-2xl hover:border-primary-purple/40 transition-colors group cursor-pointer">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-primary-purple/20 rounded-xl flex items-center justify-center text-primary-purple group-hover:scale-110 transition-transform">{g.icon}</div>
              <div><h3 className="font-bold text-foreground">{g.name}</h3><span className="text-xs text-foreground/50">{g.members} წევრი</span></div>
            </div>
            <p className="text-sm text-foreground/70">{g.description}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-6">ბოლო დისკუსიები</h2>
      <div className="space-y-3">
        {recentTopics.map((topic, i) => (
          <div key={i} className="p-5 bg-surface/70 border border-foreground/10 rounded-xl hover:border-foreground/20 transition-colors cursor-pointer flex items-center justify-between">
            <div><h3 className="font-semibold text-foreground hover:text-accent-cyan transition-colors">{topic.title}</h3><span className="text-xs text-foreground/50">ავტორი: {topic.author}</span></div>
            <div className="flex items-center gap-1 text-xs text-foreground/50"><MessageCircle size={14} />{topic.replies}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
