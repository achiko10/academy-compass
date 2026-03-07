const API_BASE = 'https://academycompass.pythonanywhere.com/api/v1';

// ===== თეზაურუსი =====
export async function getTerms() {
  const r = await fetch(`${API_BASE}/terms/`);
  return r.json();
}

export async function getTermById(id: number) {
  const r = await fetch(`${API_BASE}/terms/${id}/`);
  return r.json();
}

export async function searchTerms(query: string) {
  const r = await fetch(`${API_BASE}/terms/?search=${query}`);
  return r.json();
}

// ===== რუკა =====
export async function getMapNodes() {
  const r = await fetch(`${API_BASE}/map-nodes/`);
  const data = await r.json();
  return data.map((n: any) => ({
    id: String(n.id),
    label: n.node_name,
    description: n.summary_snippet,
    group: ['School', 'BSC', 'MSC', 'PHD', 'Career'].indexOf(n.node_type) + 1,
    details: n.summary_snippet,
  }));
}

export async function getMapEdges() {
  const r = await fetch(`${API_BASE}/map-edges/`);
  const data = await r.json();
  return data.map((e: any) => ({
    source: String(e.source_node),
    target: String(e.target_node),
    label: e.condition_label || undefined,
  }));
}

// ===== კონტენტი =====
export async function getArticles() {
  const r = await fetch(`${API_BASE}/articles/`);
  return r.json();
}

export async function getArticleById(id: number) {
  const r = await fetch(`${API_BASE}/articles/${id}/`);
  return r.json();
}

export async function getArticlesByCategory(category: string) {
  const r = await fetch(`${API_BASE}/articles/?category=${category}`);
  return r.json();
}

// ===== ქვიზი =====
export async function getQuizzes() {
  const r = await fetch(`${API_BASE}/quizzes/`);
  return r.json();
}

export async function getQuizResults() {
  const r = await fetch(`${API_BASE}/quiz-results/`);
  return r.json();
}

export async function getQuizQuestions() {
  return [
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
}

export function getFieldDescriptions(): Record<string, { name_ka: string; name_en: string; description: string }> {
  return {
    physics: { name_ka: "ფიზიკა", name_en: "Physics", description: "მატერიის, ენერგიის და ფუნდამენტური კანონების შემსწავლელი მეცნიერება." },
    chemistry: { name_ka: "ქიმია", name_en: "Chemistry", description: "ნივთიერებათა თვისებებისა და ტრანსფორმაციის მეცნიერება." },
    biology: { name_ka: "ბიოლოგია", name_en: "Biology", description: "ცოცხალი ორგანიზმების შემსწავლელი მეცნიერება." },
    psychology: { name_ka: "ფსიქოლოგია", name_en: "Psychology", description: "ადამიანის ქცევისა და გონებრივი პროცესების მეცნიერება." },
    cs: { name_ka: "კომპიუტერული მეცნიერება", name_en: "Computer Science", description: "ალგორითმების, მონაცემთა სტრუქტურებისა და AI-ს მეცნიერება." },
    ecology: { name_ka: "ეკოლოგია", name_en: "Ecology", description: "გარემოსთან ცოცხალი ორგანიზმების ურთიერთობის მეცნიერება." },
    economics: { name_ka: "ეკონომიკა", name_en: "Economics", description: "რესურსების განაწილებისა და ბაზრების მეცნიერება." },
  };
}

// ===== რესურსები და უნარები (mock - Django-ში არ არის) =====
export function getResources(): { id: number; title: string; type: "course" | "tool" | "journal" | "book"; url: string; description: string }[] {
  return [
    { id: 1, title: "MIT OpenCourseWare", type: "course", url: "https://ocw.mit.edu", description: "MIT-ის უფასო ონლაინ კურსები ყველა დარგში." },
    { id: 2, title: "Coursera", type: "course", url: "https://coursera.org", description: "მსოფლიოს წამყვანი უნივერსიტეტების ონლაინ კურსები." },
    { id: 3, title: "Google Scholar", type: "tool", url: "https://scholar.google.com", description: "სამეცნიერო სტატიების უფასო საძიებო სისტემა." },
    { id: 4, title: "PubMed", type: "journal", url: "https://pubmed.ncbi.nlm.nih.gov", description: "ბიოსამედიცინო და სიცოცხლის მეცნიერებების ბაზა." },
    { id: 5, title: "arXiv", type: "journal", url: "https://arxiv.org", description: "ფიზიკის, მათემატიკის და CS პრეპრინტების არქივი." },
    { id: 6, title: "Zotero", type: "tool", url: "https://zotero.org", description: "უფასო ინსტრუმენტი ბიბლიოგრაფიის მართვისთვის." },
  ];
}

export function getSkills() {
  return [
    { id: 1, name: "კრიტიკული აზროვნება", icon: "Brain", description: "ინფორმაციის ობიექტურად შეფასება, ლოგიკური მსჯელობა.", resources: ["Coursera: Critical Thinking"] },
    { id: 2, name: "კვლევის მეთოდები", icon: "Search", description: "კვანტიტატური და ხარისხობრივი კვლევის მეთოდოლოგია.", resources: ["MIT: Experimental Design"] },
    { id: 3, name: "სტატისტიკა", icon: "BarChart3", description: "მონაცემთა ანალიზი, ჰიპოთეზის ტესტირება.", resources: ["Khan Academy: Statistics"] },
    { id: 4, name: "პროგრამირება", icon: "Code", description: "Python, R — მონაცემთა ანალიზისა და მოდელირებისთვის.", resources: ["Python for Everybody"] },
    { id: 5, name: "აკადემიური წერა", icon: "PenTool", description: "სამეცნიერო სტატია, ესე, დისერტაცია.", resources: ["Purdue OWL: Academic Writing"] },
    { id: 6, name: "მონაცემთა ვიზუალიზაცია", icon: "LineChart", description: "მონაცემების ვიზუალურად წარმოდგენა.", resources: ["D3.js Tutorials"] },
  ];
}