/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("icthm99jrn1tiew")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ejk6njcz",
    "name": "text",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": 150,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("icthm99jrn1tiew")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ejk6njcz",
    "name": "test",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": 150,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
