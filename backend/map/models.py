from django.db import models

class MapNode(models.Model):
    NODE_TYPES = [
        ('School', 'School'),
        ('BSC', 'Bachelor'),
        ('MSC', 'Master'),
        ('PHD', 'PhD'),
        ('Career', 'Career'),
    ]
    node_name = models.CharField(max_length=255, verbose_name="კვანძის სახელი (მაგ. მაგისტრატურა, გენეტიკა)")
    node_type = models.CharField(max_length=10, choices=NODE_TYPES)
    summary_snippet = models.TextField(blank=True)
    
    # Optional link to a ThesaurusTerm if this node represents a field of science
    term = models.ForeignKey('thesaurus.ThesaurusTerm', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.node_name} ({self.node_type})"

class MapEdge(models.Model):
    source_node = models.ForeignKey(MapNode, on_delete=models.CASCADE, related_name='outgoing_edges')
    target_node = models.ForeignKey(MapNode, on_delete=models.CASCADE, related_name='incoming_edges')
    condition_label = models.CharField(max_length=255, blank=True, verbose_name="გადასვლის პირობა ან მოთხოვნა")

    def __str__(self):
        return f"{self.source_node.node_name} -> {self.target_node.node_name}"
