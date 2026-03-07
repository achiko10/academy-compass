// ===== თეზაურუსის ტერმინები =====
export interface ThesaurusTerm {
  id: number;
  name_ka: string;
  name_en: string;
  definition: string;
  parentId: number | null;
  relations: { termId: number; type: 'BT' | 'NT' | 'RT' | 'SYN' }[];
}

export const terms: ThesaurusTerm[] = [
  { id: 1, name_ka: "მეცნიერება", name_en: "Science", definition: "სისტემური ცოდნის შეძენის პროცესი დაკვირვებისა და ექსპერიმენტის გზით.", parentId: null, relations: [{ termId: 2, type: 'NT' }, { termId: 3, type: 'NT' }, { termId: 4, type: 'NT' }] },
  { id: 2, name_ka: "ბუნებისმეტყველება", name_en: "Natural Sciences", definition: "მეცნიერება, რომელიც შეისწავლის ბუნებრივ მოვლენებს.", parentId: 1, relations: [{ termId: 5, type: 'NT' }, { termId: 6, type: 'NT' }, { termId: 7, type: 'NT' }] },
  { id: 3, name_ka: "სოციალური მეცნიერებები", name_en: "Social Sciences", definition: "მეცნიერება, რომელიც შეისწავლის საზოგადოებას და ადამიანთა ურთიერთობებს.", parentId: 1, relations: [{ termId: 8, type: 'NT' }, { termId: 9, type: 'NT' }] },
  { id: 4, name_ka: "ტექნოლოგიური მეცნიერებები", name_en: "Technological Sciences", definition: "ტექნოლოგიური პრობლემების გადაწყვეტაზე ორიენტირებული მეცნიერება.", parentId: 1, relations: [{ termId: 10, type: 'NT' }] },
  { id: 5, name_ka: "ფიზიკა", name_en: "Physics", definition: "მატერიის, ენერგიისა და მათი ურთიერთქმედების შემსწავლელი მეცნიერება.", parentId: 2, relations: [{ termId: 6, type: 'RT' }] },
  { id: 6, name_ka: "ქიმია", name_en: "Chemistry", definition: "ნივთიერებების შედგენილობისა და ტრანსფორმაციის მეცნიერება.", parentId: 2, relations: [{ termId: 5, type: 'RT' }, { termId: 7, type: 'RT' }] },
  { id: 7, name_ka: "ბიოლოგია", name_en: "Biology", definition: "ცოცხალი ორგანიზმების შემსწავლელი მეცნიერება.", parentId: 2, relations: [{ termId: 6, type: 'RT' }, { termId: 11, type: 'NT' }] },
  { id: 8, name_ka: "ეკონომიკა", name_en: "Economics", definition: "რესურსების განაწილებისა და ბაზრის მექანიზმების შემსწავლელი მეცნიერება.", parentId: 3, relations: [] },
  { id: 9, name_ka: "ფსიქოლოგია", name_en: "Psychology", definition: "ადამიანის ქცევისა და გონებრივი პროცესების მეცნიერება.", parentId: 3, relations: [{ termId: 7, type: 'RT' }] },
  { id: 10, name_ka: "კომპიუტერული მეცნიერება", name_en: "Computer Science", definition: "ინფორმაციის დამუშავებისა და ალგორითმების მეცნიერება.", parentId: 4, relations: [{ termId: 5, type: 'RT' }] },
  { id: 11, name_ka: "გენეტიკა", name_en: "Genetics", definition: "მემკვიდრეობისა და გენების მეცნიერება.", parentId: 7, relations: [{ termId: 6, type: 'RT' }] },
];

// ===== რუკის კვანძები =====
export interface MapNode {
  id: string;
  label: string;
  description: string;
  group: number; // 1=ცნობისმოყვარეობა, 2=სკოლა, 3=BSc, 4=MSc, 5=PhD, 6=კარიერა
  details?: string;
}

export interface MapEdge {
  source: string;
  target: string;
  label?: string;
}

export const mapNodes: MapNode[] = [
  { id: "1", group: 1, label: "ცნობისმოყვარეობა", description: "მეცნიერული გზის დასაწყისი", details: "ყველა მეცნიერი ოდესღაც ცნობისმოყვარე ბავშვი იყო." },
  { id: "2", group: 2, label: "სკოლა", description: "საბაზისო სამეცნიერო საგნები", details: "მათემატიკა, ფიზიკა, ქიმია, ბიოლოგია — ფუნდამენტის ჩაყრა." },
  { id: "3", group: 3, label: "ბაკალავრიატი", description: "აკადემიური საფუძვლები", details: "4 წლიანი პროგრამა: თეორიული საფუძვლები, ლაბორატორიული მუშაობა." },
  { id: "4", group: 4, label: "მაგისტრატურა", description: "ვიწრო სპეციალიზაცია", details: "2 წლიანი პროგრამა: კვლევითი მეთოდები, სამაგისტრო ნაშრომი." },
  { id: "5", group: 5, label: "დოქტორანტურა", description: "დამოუკიდებელი კვლევა", details: "3-5 წელი: ორიგინალური კვლევა, დისერტაცია, პუბლიკაციები." },
  { id: "6", group: 6, label: "აკადემიური კარიერა", description: "პროფესორი / მკვლევარი", details: "უნივერსიტეტი, კვლევითი ინსტიტუტი, გრანტები." },
  { id: "7", group: 6, label: "ინდუსტრიული კარიერა", description: "ტექ კომპანია / R&D", details: "კვლევითი კომპანიები, ტექნოლოგიური სექტორი." },
  { id: "8", group: 3, label: "საზაფხულო სკოლა", description: "პრაქტიკა და ნეთვორქინგი", details: "CERN, MIT, ადგილობრივი სამეცნიერო სკოლები." },
  { id: "9", group: 4, label: "პუბლიკაცია", description: "სამეცნიერო სტატია", details: "Peer-reviewed ჟურნალში გამოქვეყნება." },
  { id: "10", group: 3, label: "სტაჟირება", description: "კვლევით ჯგუფში მუშაობა", details: "პედაგოგთან ერთად კვლევაში მონაწილეობა." },
];

export const mapEdges: MapEdge[] = [
  { source: "1", target: "2" },
  { source: "2", target: "3" },
  { source: "3", target: "4" },
  { source: "4", target: "5" },
  { source: "5", target: "6" },
  { source: "5", target: "7" },
  { source: "3", target: "8", label: "არჩევითი" },
  { source: "3", target: "10", label: "რეკომენდებული" },
  { source: "4", target: "9", label: "მოთხოვნა" },
  { source: "9", target: "5" },
];

// ===== სტატიები =====
export interface Article {
  id: number;
  title: string;
  content: string;
  category: string;
  icon: string; // lucide icon name
  color: string;
  tags: string[];
}

export const articles: Article[] = [
  // მეცნიერება
  { id: 1, title: "მეცნიერების განვითარების ეტაპები", content: "მეცნიერება თავის სათავეს იღებს ანტიკური საბერძნეთიდან. არისტოტელე, არქიმედე და სხვა ძველი ბერძენი მოაზროვნეები პირველები იყვნენ, ვინც სისტემურად მიუდგა ბუნების შესწავლას. შუა საუკუნეებში მეცნიერული განვითარება შენელდა, მაგრამ არაბულმა სამყარომ შეინარჩუნა და განავითარა ბერძნული ტრადიციები. რენესანსის ეპოქამ მეცნიერებას ახალი სიცოცხლე შესძინა — გალილეოს, კოპერნიკის და ნიუტონის აღმოჩენებმა სამყაროს შეხედულება სრულიად შეცვალა.", category: "ისტორია", icon: "Microscope", color: "blue", tags: ["ისტორია", "აღმოჩენები"] },
  { id: 2, title: "სამეცნიერო მეთოდი", content: "სამეცნიერო მეთოდი არის სისტემური მიდგომა ცოდნის შეძენის: 1) დაკვირვება — ფენომენის შემჩნევა, 2) ჰიპოთეზა — ახსნის შემოთავაზება, 3) ექსპერიმენტი — ჰიპოთეზის შემოწმება, 4) ანალიზი — მონაცემების დამუშავება, 5) დასკვნა — შედეგების შეფასება. ეს ციკლური პროცესია — ახალი დასკვნა ახალ კითხვებს ბადებს.", category: "მეთოდოლოგია", icon: "Beaker", color: "green", tags: ["მეთოდი", "კვლევა"] },
  { id: 3, title: "AI და ეთიკა მეცნიერებაში", content: "ხელოვნური ინტელექტი სწრაფად ცვლის მეცნიერულ კვლევის ლანდშაფტს. AI-ს შეუძლია მილიონობით სტატიის ანალიზი, ახალი მოლეკულების დიზაინი და კლიმატის მოდელირება. მაგრამ ეთიკური კითხვები რჩება: ვის ეკუთვნის AI-ის მიერ გაკეთებული აღმოჩენა? როგორ ვინარჩუნებთ გამჭვირვალობას? რა ხდება, როდესაც AI შეცდომას უშვებს სამედიცინო კვლევაში?", category: "ეთიკა", icon: "Cpu", color: "purple", tags: ["AI", "ეთიკა"] },
  { id: 4, title: "ბუნება და ეკოლოგია", content: "ეკოლოგიური მეცნიერება შეისწავლის ცოცხალი ორგანიზმების ურთიერთობას ერთმანეთთან და გარემოსთან. კლიმატის ცვლილება, ბიომრავალფეროვნების კლება და წყლის რესურსების შემცირება — ეს თანამედროვეობის ყველაზე მწვავე პრობლემებია, რომელთა გადაწყვეტა მხოლოდ სამეცნიერო მიდგომით არის შესაძლებელი.", category: "ეკოლოგია", icon: "Leaf", color: "green", tags: ["ეკოლოგია", "ბუნება"] },
  { id: 5, title: "ღია მეცნიერება (Open Science)", content: "ღია მეცნიერების მოძრაობა მოითხოვს, რომ სამეცნიერო კვლევა, მონაცემები და პუბლიკაციები ყველასთვის ხელმისაწვდომი იყოს. Open Access ჟურნალები, Open Data რეპოზიტორიები და პრეპრინტ სერვერები (arXiv, bioRxiv) ცოდნის დემოკრატიზაციას ემსახურება.", category: "ღია მეცნიერება", icon: "Globe", color: "blue", tags: ["Open Science", "Open Data"] },
  // კვლევა
  { id: 6, title: "კვლევის პროცესი: ნაბიჯ-ნაბიჯ", content: "1. კვლევითი კითხვის ჩამოყალიბება\n2. ლიტერატურის მიმოხილვა (Literature Review)\n3. მეთოდოლოგიის არჩევა\n4. მონაცემთა შეგროვება\n5. მონაცემთა ანალიზი\n6. შედეგების ინტერპრეტაცია\n7. სტატიის დაწერა და გამოქვეყნება\n\nყველა ეტაპზე მნიშვნელოვანია ეთიკური სტანდარტების დაცვა.", category: "კვლევა", icon: "Search", color: "blue", tags: ["კვლევა", "მეთოდოლოგია"] },
  { id: 7, title: "აკადემიური წერა", content: "აკადემიური წერის ძირითადი პრინციპები: სტრუქტურა (შესავალი, ლიტერატურის მიმოხილვა, მეთოდოლოგია, შედეგები, დისკუსია), ციტირების სტილები (APA, MLA, Chicago), peer-review პროცესი. კარგი სამეცნიერო ტექსტი მკაფიო, ლოგიკური და მტკიცებულებებზე დაფუძნებულია.", category: "კვლევა", icon: "PenTool", color: "purple", tags: ["წერა", "APA", "ციტირება"] },
];

// ===== ქვიზის კითხვები =====
export interface QuizQuestion {
  id: number;
  text: string;
  options: { text: string; field: string; points: number }[];
}

export const careerQuizQuestions: QuizQuestion[] = [
  { id: 1, text: "გიყვარს თუ არა რთული ლოგიკური ამოცანების ამოხსნა?", options: [
    { text: "ძალიან მიყვარს", field: "physics", points: 3 },
    { text: "ზოგჯერ", field: "biology", points: 1 },
    { text: "არა, ექსპერიმენტები მირჩევნია", field: "chemistry", points: 2 },
  ]},
  { id: 2, text: "გაინტერესებს როგორ მუშაობს ადამიანის ტვინი?", options: [
    { text: "კი, ძალიან", field: "psychology", points: 3 },
    { text: "ტვინი არა, მაგრამ სხეული კი", field: "biology", points: 2 },
    { text: "უფრო კომპიუტერები მაინტერესებს", field: "cs", points: 2 },
  ]},
  { id: 3, text: "რა მოგწონს უფრო მეტად — ექსპერიმენტი თუ თეორია?", options: [
    { text: "ექსპერიმენტი", field: "chemistry", points: 3 },
    { text: "თეორია", field: "physics", points: 3 },
    { text: "მონაცემთა ანალიზი", field: "cs", points: 3 },
  ]},
  { id: 4, text: "რომელი საკითხი გაინტერესებს ყველაზე მეტად?", options: [
    { text: "კლიმატის ცვლილება", field: "ecology", points: 3 },
    { text: "ხელოვნური ინტელექტი", field: "cs", points: 3 },
    { text: "გენეტიკა და მედიცინა", field: "biology", points: 3 },
  ]},
  { id: 5, text: "პროგრამირება გიადვილდებათ?", options: [
    { text: "კი, მოწინავე დონეზე", field: "cs", points: 3 },
    { text: "ვცდილობ, საფუძვლები ვიცი", field: "physics", points: 1 },
    { text: "არა, სხვა რამ მირჩევნია", field: "biology", points: 0 },
  ]},
];

export const fieldDescriptions: Record<string, { name_ka: string; name_en: string; description: string }> = {
  physics: { name_ka: "ფიზიკა", name_en: "Physics", description: "მატერიის, ენერგიის და ფუნდამენტური კანონების შემსწავლელი მეცნიერება." },
  chemistry: { name_ka: "ქიმია", name_en: "Chemistry", description: "ნივთიერებათა თვისებებისა და ტრანსფორმაციის მეცნიერება." },
  biology: { name_ka: "ბიოლოგია", name_en: "Biology", description: "ცოცხალი ორგანიზმების შემსწავლელი მეცნიერება." },
  psychology: { name_ka: "ფსიქოლოგია", name_en: "Psychology", description: "ადამიანის ქცევისა და გონებრივი პროცესების მეცნიერება." },
  cs: { name_ka: "კომპიუტერული მეცნიერება", name_en: "Computer Science", description: "ალგორითმების, მონაცემთა სტრუქტურებისა და AI-ს მეცნიერება." },
  ecology: { name_ka: "ეკოლოგია", name_en: "Ecology", description: "გარემოსთან ცოცხალი ორგანიზმების ურთიერთობის მეცნიერება." },
  economics: { name_ka: "ეკონომიკა", name_en: "Economics", description: "რესურსების განაწილებისა და ბაზრების მეცნიერება." },
};

// ===== რესურსები =====
export interface Resource {
  id: number;
  title: string;
  type: 'book' | 'course' | 'journal' | 'tool';
  url: string;
  description: string;
}

export const resources: Resource[] = [
  { id: 1, title: "MIT OpenCourseWare", type: "course", url: "https://ocw.mit.edu", description: "MIT-ის უფასო ონლაინ კურსები ყველა დარგში." },
  { id: 2, title: "Coursera", type: "course", url: "https://coursera.org", description: "მსოფლიოს წამყვანი უნივერსიტეტების ონლაინ კურსები." },
  { id: 3, title: "Google Scholar", type: "tool", url: "https://scholar.google.com", description: "სამეცნიერო სტატიების უფასო საძიებო სისტემა." },
  { id: 4, title: "PubMed", type: "journal", url: "https://pubmed.ncbi.nlm.nih.gov", description: "ბიოსამედიცინო და სიცოცხლის მეცნიერებების ბაზა." },
  { id: 5, title: "arXiv", type: "journal", url: "https://arxiv.org", description: "ფიზიკის, მათემატიკის და CS პრეპრინტების არქივი." },
  { id: 6, title: "Zotero", type: "tool", url: "https://zotero.org", description: "უფასო ინსტრუმენტი ბიბლიოგრაფიის მართვისთვის." },
  { id: 7, title: "Thinking, Fast and Slow — Daniel Kahneman", type: "book", url: "#", description: "ადამიანის გადაწყვეტილების მიღების ორი სისტემის შესახებ." },
  { id: 8, title: "The Structure of Scientific Revolutions — T. Kuhn", type: "book", url: "#", description: "მეცნიერული რევოლუციების ფილოსოფია." },
];

// ===== უნარები =====
export interface Skill {
  id: number;
  name: string;
  icon: string;
  description: string;
  resources: string[];
}

export const skills: Skill[] = [
  { id: 1, name: "კრიტიკული აზროვნება", icon: "Brain", description: "ინფორმაციის ობიექტურად შეფასება, ლოგიკური მსჯელობა და არგუმენტების ანალიზი.", resources: ["Coursera: Critical Thinking", "edX: Logic and Reasoning"] },
  { id: 2, name: "კვლევის მეთოდები", icon: "Search", description: "კვანტიტატური და ხარისხობრივი კვლევის მეთოდოლოგია.", resources: ["Research Methods in Psychology", "MIT: Experimental Design"] },
  { id: 3, name: "სტატისტიკა", icon: "BarChart3", description: "მონაცემთა ანალიზი, ჰიპოთეზის ტესტირება, შერჩევითი მეთოდები.", resources: ["Khan Academy: Statistics", "StatQuest on YouTube"] },
  { id: 4, name: "პროგრამირება", icon: "Code", description: "Python, R — მონაცემთა ანალიზისა და მოდელირებისთვის.", resources: ["Python for Everybody", "R for Data Science"] },
  { id: 5, name: "აკადემიური წერა", icon: "PenTool", description: "სამეცნიერო სტატია, ესე, დისერტაცია — სტრუქტურა და სტილი.", resources: ["Purdue OWL: Academic Writing", "APA Style Guide"] },
  { id: 6, name: "მონაცემთა ვიზუალიზაცია", icon: "LineChart", description: "მონაცემების ვიზუალურად წარმოდგენა გრაფიკებისა და დიაგრამების გამოყენებით.", resources: ["D3.js Tutorials", "Tableau Public"] },
];
