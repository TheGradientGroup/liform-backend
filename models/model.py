import os

from pymodm import connect, fields, MongoModel, EmbeddedMongoModel
from pymongo import TEXT, GEOSPHERE
from pymongo.operations import IndexModel

connect(
    f'mongodb+srv://{os.environ["MONGO_USER"]}:{os.environ["MONGO_PWD"]}@cluster0-q8wl6.mongodb.net/liform_test?retryWrites=true&w=majority')


class DRG(MongoModel):
    drg = fields.IntegerField()
    name = fields.CharField()
    human_name = fields.CharField()

    class Meta:
        # Text index on content can be used for text search.
        indexes = [IndexModel([('human_name', TEXT)])]


class DRGData(EmbeddedMongoModel):
    drg = fields.ReferenceField(DRG)
    avg = fields.FloatField(min_value=0.0)


class Hospital(MongoModel):
    name = fields.CharField()
    location = fields.PointField()
    city = fields.CharField()
    state = fields.CharField()
    avg_reported = fields.EmbeddedDocumentListField(DRGData)
    avg_user = fields.EmbeddedDocumentListField(DRGData)

    class Meta:
        # Text index on content can be used for text search.
        indexes = [IndexModel([('name', TEXT)]), IndexModel([('location', GEOSPHERE)])]

