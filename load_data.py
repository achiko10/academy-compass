import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

# ===== თეზაურუსი =====
from thesaurus.models import ThesaurusTerm, TermRelation

print("ტერმინების ჩატვირთვა...")
ThesaurusTerm.objects.all().delete()

terms_data = [
    {"id": 1,  "name_ka": "მეცნიერება",               "name_en": "Science",               "definition": "სისტემური ცოდნის შეძენის პროცესი დაკვირვებისა და ექსპერიმენტის გზით.", "parent_id": None},
    {"id": 2,  "name_ka": "ბუნებისმეტყველება",         "name_en": "Natural Sciences",      "definition": "მეცნიერება, რომელიც შეისწავლის ბუნებრივ მოვლენებს.", "parent_id": 1},
    {"id": 3,  "name_ka": "სოციალური მეცნიერებები",    "name_en": "Social Sciences",       "definition": "მეცნიერება, რომელიც შეისწავლის საზოგადოებას და ადამიანთა ურთიერთობებს.", "parent_id": 1},
    {"id": 4,  "name_ka": "ტექნოლოგიური მეცნიერებები", "name_en": "Technological Sciences","definition": "ტექნოლოგიური პრობლემების გადაწყვეტაზე ორიენტირებული მეცნიერება.", "parent_id": 1},
    {"id": 5,  "name_ka": "ფიზიკა",                    "name_en": "Physics",               "definition": "მატერიის, ენერგიისა და მათი ურთიერთქმედების შემსწავლელი მეცნიერება.", "parent_id": 2},
    {"id": 6,  "name_ka": "ქიმია",                     "name_en": "Chemistry",             "definition": "ნივთიერებების შედგენილობისა და ტრანსფორმაციის მეცნიერება.", "parent_id": 2},
    {"id": 7,  "name_ka": "ბიოლოგია",                  "name_en": "Biology",               "definition": "ცოცხალი ორგანიზმების შემსწავლელი მეცნიერება.", "parent_id": 2},
    {"id": 8,  "name_ka": "ეკონომიკა",                 "name_en": "Economics",             "definition": "რესურსების განაწილებისა და ბაზრის მექანიზმების შემსწავლელი მეცნიერება.", "parent_id": 3},
    {"id": 9,  "name_ka": "ფსიქოლოგია",                "name_en": "Psychology",            "definition": "ადამიანის ქცევისა და გონებრივი პროცესების მეცნიერება.", "parent_id": 3},
    {"id": 10, "name_ka": "კომპიუტერული მეცნიერება",   "name_en": "Computer Science",      "definition": "ინფორმაციის დამუშავებისა და ალგორითმების მეცნიერება.", "parent_id": 4},
    {"id": 11, "name_ka": "გენეტიკა",                  "name_en": "Genetics",              "definition": "მემკვიდრეობისა და გენების მეცნიერება.", "parent_id": 7},
]

for t in terms_data:
    ThesaurusTerm.objects.create(
        id=t["id"], name_ka=t["name_ka"], name_en=t["name_en"],
        definition=t["definition"], parent_id=t["parent_id"],
    )
print(f"✓ {len(terms_data)} ტერმინი ჩაიტვირთა")

print("რელაციების ჩატვირთვა...")
TermRelation.objects.all().delete()
relations_data = [
    (1,2,'NT'),(1,3,'NT'),(1,4,'NT'),
    (2,5,'NT'),(2,6,'NT'),(2,7,'NT'),
    (3,8,'NT'),(3,9,'NT'),(4,10,'NT'),
    (5,6,'RT'),(6,5,'RT'),(6,7,'RT'),(7,6,'RT'),
    (7,11,'NT'),(9,7,'RT'),(10,5,'RT'),(11,6,'RT'),
]
for a, b, r in relations_data:
    TermRelation.objects.create(term_a_id=a, term_b_id=b, relation_type=r)
print(f"✓ {len(relations_data)} რელაცია ჩაიტვირთა")

# ===== რუკა =====
from map.models import MapNode, MapEdge

print("რუკის კვანძების ჩატვირთვა...")
MapEdge.objects.all().delete()
MapNode.objects.all().delete()

nodes_data = [
    {"node_name": "ცნობისმოყვარეობა",  "node_type": "School", "summary_snippet": "მეცნიერული გზის დასაწყისი — ყველა მეცნიერი ოდესღაც ცნობისმოყვარე ბავშვი იყო."},
    {"node_name": "სკოლა",              "node_type": "School", "summary_snippet": "მათემატიკა, ფიზიკა, ქიმია, ბიოლოგია — ფუნდამენტის ჩაყრა."},
    {"node_name": "ბაკალავრიატი",       "node_type": "BSC",    "summary_snippet": "4 წლიანი პროგრამა: თეორიული საფუძვლები, ლაბორატორიული მუშაობა."},
    {"node_name": "მაგისტრატურა",       "node_type": "MSC",    "summary_snippet": "2 წლიანი პროგრამა: კვლევითი მეთოდები, სამაგისტრო ნაშრომი."},
    {"node_name": "დოქტორანტურა",       "node_type": "PHD",    "summary_snippet": "3-5 წელი: ორიგინალური კვლევა, დისერტაცია, პუბლიკაციები."},
    {"node_name": "აკადემიური კარიერა", "node_type": "Career", "summary_snippet": "უნივერსიტეტი, კვლევითი ინსტიტუტი, გრანტები."},
    {"node_name": "ინდუსტრიული კარიერა","node_type": "Career", "summary_snippet": "კვლევითი კომპანიები, ტექნოლოგიური სექტორი."},
    {"node_name": "საზაფხულო სკოლა",    "node_type": "BSC",    "summary_snippet": "CERN, MIT, ადგილობრივი სამეცნიერო სკოლები."},
    {"node_name": "პუბლიკაცია",         "node_type": "MSC",    "summary_snippet": "Peer-reviewed ჟურნალში გამოქვეყნება."},
    {"node_name": "სტაჟირება",          "node_type": "BSC",    "summary_snippet": "პედაგოგთან ერთად კვლევაში მონაწილეობა."},
]

created_nodes = []
for n in nodes_data:
    node = MapNode.objects.create(
        node_name=n["node_name"], node_type=n["node_type"], summary_snippet=n["summary_snippet"]
    )
    created_nodes.append(node)
print(f"✓ {len(nodes_data)} კვანძი ჩაიტვირთა")

print("კიდეების ჩატვირთვა...")
edges_data = [
    (0,1,""),(1,2,""),(2,3,""),(3,4,""),(4,5,""),(4,6,""),
    (2,7,"არჩევითი"),(2,9,"რეკომენდებული"),(3,8,"მოთხოვნა"),(8,4,""),
]
for s, t, l in edges_data:
    MapEdge.objects.create(source_node=created_nodes[s], target_node=created_nodes[t], condition_label=l)
print(f"✓ {len(edges_data)} კიდე ჩაიტვირთა")

# ===== სტატიები =====
from content.models import Article

print("სტატიების ჩატვირთვა...")
Article.objects.all().delete()

articles_data = [
    {"title": "მეცნიერების განვითარების ეტაპები", "content": "მეცნიერება თავის სათავეს იღებს ანტიკური საბერძნეთიდან. არისტოტელე, არქიმედე და სხვა ძველი ბერძენი მოაზროვნეები პირველები იყვნენ, ვინც სისტემურად მიუდგა ბუნების შესწავლას."},
    {"title": "სამეცნიერო მეთოდი", "content": "სამეცნიერო მეთოდი არის სისტემური მიდგომა ცოდნის შეძენის: დაკვირვება, ჰიპოთეზა, ექსპერიმენტი, ანალიზი, დასკვნა."},
    {"title": "AI და ეთიკა მეცნიერებაში", "content": "ხელოვნური ინტელექტი სწრაფად ცვლის მეცნიერულ კვლევის ლანდშაფტს. AI-ს შეუძლია მილიონობით სტატიის ანალიზი."},
    {"title": "ბუნება და ეკოლოგია", "content": "ეკოლოგიური მეცნიერება შეისწავლის ცოცხალი ორგანიზმების ურთიერთობას ერთმანეთთან და გარემოსთან."},
    {"title": "ღია მეცნიერება (Open Science)", "content": "ღია მეცნიერების მოძრაობა მოითხოვს, რომ სამეცნიერო კვლევა, მონაცემები და პუბლიკაციები ყველასთვის ხელმისაწვდომი იყოს."},
    {"title": "კვლევის პროცესი: ნაბიჯ-ნაბიჯ", "content": "1. კვლევითი კითხვის ჩამოყალიბება\n2. ლიტერატურის მიმოხილვა\n3. მეთოდოლოგიის არჩევა\n4. მონაცემთა შეგროვება."},
    {"title": "აკადემიური წერა", "content": "აკადემიური წერის ძირითადი პრინციპები: სტრუქტურა, ციტირების სტილები (APA, MLA, Chicago), peer-review პროცესი."},
]

for a in articles_data:
    Article.objects.create(title=a["title"], content=a["content"])
print(f"✓ {len(articles_data)} სტატია ჩაიტვირთა")

print("\n✅ ყველა მონაცემი წარმატებით ჩაიტვირთა!")