from peewee import (
    SqliteDatabase, PrimaryKeyField, CharField, Model,
    BooleanField
)

db = SqliteDatabase('bit.db')


class User(Model):
    id = PrimaryKeyField()
    username = CharField(unique=True, max_length=50, null=False)
    password = CharField(max_length=50, null=False)
    is_admin = BooleanField(default=False)

    class Meta:
        database = db


class Form(Model):
    id = PrimaryKeyField()
    name = CharField(max_length=50, null=False)
    email = CharField(max_length=50, null=False)
    vuz = CharField(max_length=50, null=False)
    birth = CharField(max_length=50, null=False)

    class Meta:
        database = db


db.create_tables([User, Form])
