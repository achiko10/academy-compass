from django.db import models

class ThesaurusTerm(models.Model):
    name_ka = models.CharField(max_length=255, verbose_name="ქართული ტერმინი (მაგ. ბიოლოგია)", unique=True)
    name_en = models.CharField(max_length=255, verbose_name="ინგლისური შესატყვისი", blank=True)
    definition = models.TextField(verbose_name="მეცნიერული განმარტება", blank=True)
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.SET_NULL, related_name='children', verbose_name="მარტივი იერარქიისთვის")

    def __str__(self):
        return self.name_ka

class TermRelation(models.Model):
    RELATION_CHOICES = [
        ('BT', 'Broader Term'),
        ('NT', 'Narrower Term'),
        ('RT', 'Related Term'),
        ('SYN', 'Synonym'),
    ]
    term_a = models.ForeignKey(ThesaurusTerm, on_delete=models.CASCADE, related_name='relations_from')
    term_b = models.ForeignKey(ThesaurusTerm, on_delete=models.CASCADE, related_name='relations_to')
    relation_type = models.CharField(max_length=3, choices=RELATION_CHOICES)

    class Meta:
        unique_together = ('term_a', 'term_b', 'relation_type')

    def __str__(self):
        return f"{self.term_a.name_ka} -[{self.relation_type}]-> {self.term_b.name_ka}"
