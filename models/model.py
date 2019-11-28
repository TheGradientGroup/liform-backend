from pymodm import connect, fields, MongoModel, EmbeddedMongoModel
from pymongo import TEXT
from pymongo.operations import IndexModel

connect('mongodb+srv://multifaction:nQTsVcsLVnMiCtTE@cluster0-q8wl6.mongodb.net/test?retryWrites=true&w=majority')


class DRG(MongoModel):
    drg = fields.IntegerField()
    name = fields.CharField()
    human_name = fields.CharField()


class DRGData(EmbeddedMongoModel):
    drg = fields.ReferenceField(DRG)
    avg = fields.IntegerField(min_value=0)


class Hospital(MongoModel):
    name = fields.CharField()
    lat = fields.CharField()
    lon = fields.CharField()
    city = fields.CharField()
    avg_reported = fields.EmbeddedDocumentListField(DRGData)
    avg_user = fields.EmbeddedDocumentListField(DRGData)

    class Meta:
        # Text index on content can be used for text search.
        indexes = [IndexModel([('name', TEXT)])]
