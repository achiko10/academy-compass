const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://academycompass.pythonanywhere.com/api/v1';

// ─── Token helpers ────────────────────────────────────────────────────────────
// access_token → sessionStorage (cleared on tab close, safer than localStorage)
// refresh_token → localStorage (persistent for re-auth)
export const tokenStorage = {
  getAccess: () =>
    typeof window !== 'undefined' ? sessionStorage.getItem('access_token') : null,
  setAccess: (t: string) =>
    typeof window !== 'undefined' && sessionStorage.setItem('access_token', t),
  getRefresh: () =>
    typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null,
  setRefresh: (t: string) =>
    typeof window !== 'undefined' && localStorage.setItem('refresh_token', t),
  clear: () => {
    if (typeof window === 'undefined') return;
    sessionStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },
};

// ─── Auth types ───────────────────────────────────────────────────────────────
export interface AuthUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

interface TokenPair {
  access: string;
  refresh: string;
}

// ─── Auth API ─────────────────────────────────────────────────────────────────
export async function loginUser(username: string, password: string): Promise<TokenPair> {
  const response = await fetch(`${API_BASE}/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({})) as Record<string, unknown>;
    throw new Error((err.detail as string) || 'მომხმარებლის სახელი ან პაროლი არასწორია.');
  }
  return response.json();
}

export async function registerUser(username: string, email: string, password: string): Promise<AuthUser> {
  const payload = { username, email, password, first_name: '', last_name: '' };

  const response = await fetch(`${API_BASE}/auth/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({})) as Record<string, unknown>;
    const msg = Object.values(err)
      .flat()
      .filter((v): v is string => typeof v === 'string')
      .join(' ');
    throw new Error(msg || 'რეგისტრაცია ვერ მოხერხდა.');
  }
  return response.json();
}

export async function fetchUserProfile(token: string): Promise<AuthUser> {
  const response = await fetch(`${API_BASE}/auth/profile/`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('პროფილის ჩამოტვირთვა ვერ მოხერხდა.');
  return response.json();
}

// ─── Generic fetch helper ─────────────────────────────────────────────────────
async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, options);
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText} on ${endpoint}`);
  }
  return response.json() as Promise<T>;
}

// Handles both paginated `{count, results:[]}` and plain arrays
async function fetchList<T>(endpoint: string): Promise<T[]> {
  const data = await fetchAPI<{ count?: number; results?: T[] } | T[]>(endpoint);
  if (Array.isArray(data)) return data;
  return data.results ?? [];
}

// ─── Thesaurus ────────────────────────────────────────────────────────────────
export interface ThesaurusTermAPI {
  id: number;
  name_ka: string;
  name_en: string;
  definition: string;
  parent: number | null;
}

export async function getTerms(): Promise<ThesaurusTermAPI[]> {
  return fetchList<ThesaurusTermAPI>('/terms/');
}

export async function getTermById(id: number): Promise<ThesaurusTermAPI> {
  return fetchAPI<ThesaurusTermAPI>(`/terms/${id}/`);
}

export async function searchTerms(query: string): Promise<ThesaurusTermAPI[]> {
  return fetchList<ThesaurusTermAPI>(`/terms/?search=${encodeURIComponent(query)}`);
}

// ─── Map ──────────────────────────────────────────────────────────────────────
interface MapNodeRaw {
  id: number;
  node_name: string;
  node_type: 'School' | 'BSC' | 'MSC' | 'PHD' | 'Career';
  summary_snippet: string;
}

interface MapEdgeRaw {
  id: number;
  source_node: number;
  target_node: number;
  condition_label: string;
}

const NODE_TYPE_ORDER: MapNodeRaw['node_type'][] = ['School', 'BSC', 'MSC', 'PHD', 'Career'];

export async function getMapNodes() {
  const nodes = await fetchList<MapNodeRaw>('/map-nodes/');
  return nodes.map((n) => ({
    id: String(n.id),
    label: n.node_name,
    description: n.summary_snippet,
    group: NODE_TYPE_ORDER.indexOf(n.node_type) + 1,
    details: n.summary_snippet,
  }));
}

export async function getMapEdges() {
  const edges = await fetchList<MapEdgeRaw>('/map-edges/');
  return edges.map((e) => ({
    source: String(e.source_node),
    target: String(e.target_node),
    label: e.condition_label || undefined,
  }));
}

// ─── Content ──────────────────────────────────────────────────────────────────
interface ArticleRaw {
  id: number;
  title: string;
  content: string;
  tags: Array<string | { name_ka: string; name_en: string }>;
}

export async function getArticles() {
  const data = await fetchList<ArticleRaw>('/articles/');
  return data.map((item) => ({
    id: item.id,
    title: item.title,
    category: 'მეცნიერება',
    content: item.content,
    readTime: '5 წთ',
    icon: 'Beaker',
    color: 'blue',
    tags: Array.isArray(item.tags) ? item.tags : [],
  }));
}

export async function getArticleById(id: number): Promise<ArticleRaw> {
  return fetchAPI<ArticleRaw>(`/articles/${id}/`);
}

// ─── Quiz ─────────────────────────────────────────────────────────────────────
interface AnswerRaw {
  id: number;
  text: string;
  is_correct: boolean;
  points: number;
  recommended_field: string | null;
}

interface QuestionRaw {
  id: number;
  text: string;
  options: AnswerRaw[];
}

interface QuizRaw {
  id: number;
  title: string;
  quiz_type: string;
  questions: QuestionRaw[];
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: { text: string; field: string; points: number }[];
}

export async function getQuizQuestions(): Promise<{ id: number | null; questions: QuizQuestion[] }> {
  const data = await fetchList<QuizRaw>('/quizzes/');

  const careerQuiz = data.find((q) => q.quiz_type === 'Career Test') ?? data[0];
  if (!careerQuiz) return { id: null, questions: [] };

  const questions: QuizQuestion[] = careerQuiz.questions.map((q) => ({
    id: q.id,
    text: q.text,
    options: q.options.map((opt) => ({
      text: opt.text,
      field: opt.recommended_field ?? 'general',
      points: opt.points,
    })),
  }));

  return { id: careerQuiz.id, questions };
}

export async function submitQuizResult(score: number, quizId: number): Promise<boolean> {
  try {
    const token = tokenStorage.getAccess();
    if (!token) return false;

    const response = await fetch(`${API_BASE}/quiz-results/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ score, quiz: quizId }),
    });
    return response.ok;
  } catch {
    return false;
  }
}

export function getFieldDescriptions(): Record<string, { name_ka: string; name_en: string; description: string }> {
  return {
    physics:    { name_ka: 'ფიზიკა',                 name_en: 'Physics',            description: 'მატერიის, ენერგიის და ფუნდამენტური კანონების შემსწავლელი მეცნიერება.' },
    chemistry:  { name_ka: 'ქიმია',                  name_en: 'Chemistry',          description: 'ნივთიერებათა თვისებებისა და ტრანსფორმაციის მეცნიერება.' },
    biology:    { name_ka: 'ბიოლოგია',               name_en: 'Biology',            description: 'ცოცხალი ორგანიზმების შემსწავლელი მეცნიერება.' },
    psychology: { name_ka: 'ფსიქოლოგია',             name_en: 'Psychology',         description: 'ადამიანის ქცევისა და გონებრივი პროცესების მეცნიერება.' },
    cs:         { name_ka: 'კომპიუტერული მეცნიერება', name_en: 'Computer Science',   description: 'ალგორითმების, მონაცემთა სტრუქტურებისა და AI-ს მეცნიერება.' },
    ecology:    { name_ka: 'ეკოლოგია',               name_en: 'Ecology',            description: 'გარემოსთან ცოცხალი ორგანიზმების ურთიერთობის მეცნიერება.' },
    economics:  { name_ka: 'ეკონომიკა',              name_en: 'Economics',          description: 'რესურსების განაწილებისა და ბაზრების მეცნიერება.' },
  };
}

// ─── Resources & Skills ───────────────────────────────────────────────────────
export async function getResources() {
  return fetchList<any>('/resources/');
}

export async function getSkills() {
  return fetchList<any>('/skills/');
}

// ─── Community ────────────────────────────────────────────────────────────────
export interface Post {
  id: number;
  title: string;
  content: string;
  author_username: string;
  created_at: string;
  comment_count: number;
}

export interface Comment {
  id: number;
  post: number;
  body: string;
  author_username: string;
  created_at: string;
}

export async function getPosts(): Promise<Post[]> {
  return fetchList<Post>('/posts/');
}

export async function createPost(title: string, content: string): Promise<Post> {
  const token = tokenStorage.getAccess();
  return fetchAPI<Post>('/posts/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ title, content }),
  });
}

export async function getComments(postId: number): Promise<Comment[]> {
  return fetchList<Comment>(`/comments/?post=${postId}`);
}

export async function createComment(postId: number, body: string): Promise<Comment> {
  const token = tokenStorage.getAccess();
  return fetchAPI<Comment>('/comments/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ post: postId, body }),
  });
}
