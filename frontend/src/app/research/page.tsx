import { Search, PenTool, BookOpen, BarChart3, FileText, CheckCircle } from "lucide-react";

const researchSteps = [
  { icon: <Search size={20} />, title: "კვლევითი კითხვა", desc: "ჩამოაყალიბე მკაფიო, კონკრეტული კითხვა, რომელზეც გსურს პასუხის პოვნა." },
  { icon: <BookOpen size={20} />, title: "ლიტერატურის მიმოხილვა", desc: "შეისწავლე არსებული კვლევები — რა არის უკვე ცნობილი, რა არის ხარვეზი." },
  { icon: <FileText size={20} />, title: "მეთოდოლოგია", desc: "აირჩიე კვლევის მეთოდი: ექსპერიმენტი, გამოკითხვა, შემთხვევის ანალიზი." },
  { icon: <BarChart3 size={20} />, title: "მონაცემთა შეგროვება", desc: "შეაგროვე მონაცემები სისტემურად, ეთიკური სტანდარტების დაცვით." },
  { icon: <CheckCircle size={20} />, title: "ანალიზი და დასკვნა", desc: "დაამუშავე მონაცემები, გააკეთე სტატისტიკური ანალიზი, გამოიტანე დასკვნა." },
  { icon: <PenTool size={20} />, title: "პუბლიკაცია", desc: "დაწერე სტატია და გამოაქვეყნე peer-reviewed ჟურნალში." },
];

export default function ResearchPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="academic-title cosmic-heading">კვლევა</h1>
      <p className="text-lg text-center text-foreground/80 max-w-2xl mx-auto mb-16">ნაბიჯ-ნაბიჯ გზამკვლევი კვლევის პროცესში — იდეიდან პუბლიკაციამდე.</p>

      <div className="relative mb-20">
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent-cyan via-primary-purple to-primary-blue" />
        <div className="space-y-8">
          {researchSteps.map((step, i) => (
            <div key={i} className="flex gap-6 items-start relative">
              <div className="w-16 h-16 rounded-2xl bg-surface/80 border border-foreground/10 flex items-center justify-center text-accent-cyan flex-shrink-0 z-10">{step.icon}</div>
              <div className="pt-2">
                <h3 className="text-lg font-bold text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-surface/70 border border-foreground/10 rounded-3xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
          <PenTool className="text-primary-purple" /> აკადემიური წერა
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-5 bg-surface-light rounded-xl border border-foreground/10">
            <h4 className="font-semibold text-accent-cyan mb-2">სტატიის სტრუქტურა</h4>
            <ul className="text-sm text-foreground/70 space-y-1"><li>• აბსტრაქტი (Abstract)</li><li>• შესავალი (Introduction)</li><li>• ლიტერატურის მიმოხილვა</li><li>• მეთოდოლოგია</li><li>• შედეგები (Results)</li><li>• დისკუსია და დასკვნა</li></ul>
          </div>
          <div className="p-5 bg-surface-light rounded-xl border border-foreground/10">
            <h4 className="font-semibold text-accent-cyan mb-2">ციტირების სტილები</h4>
            <ul className="text-sm text-foreground/70 space-y-1"><li>• <strong className="text-foreground">APA</strong> — ფსიქოლოგია, სოციალური მეცნიერებები</li><li>• <strong className="text-foreground">MLA</strong> — ჰუმანიტარული მეცნიერებები</li><li>• <strong className="text-foreground">Chicago</strong> — ისტორია, ხელოვნება</li><li>• <strong className="text-foreground">IEEE</strong> — ინჟინერია, ტექნოლოგიები</li></ul>
          </div>
        </div>
      </div>
    </div>
  );
}
