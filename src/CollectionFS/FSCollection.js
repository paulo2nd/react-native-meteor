import EJSON from "ejson";

import Collection from '../Collection';
import Data from '../Data';
import setProperties from './setProperties';


EJSON.addType('FS.File', function(value) {
  return {
    getFileRecord() {
      const collection = Data.db['cfs.'+value.collectionName+'.filerecord'];

      const item = collection && collection.get(value._id);

      if(!item) return value;

      return setProperties(value.collectionName, item);
    }
  };
});

export default function(name) {

  const collectionName = 'cfs.'+name+'.filerecord';


  return {
    find(selector, options) {
      const elems = Collection(collectionName).find(selector, options);
      return elems.map(elem=>{
        return setProperties(name, elem);
      });
    },
    findOne(selector, options) {
      const elem = Collection(collectionName).findOne(selector, options);
      return elem && setProperties(name, elem);
    },
    insert: Collection(collectionName).insert,
    update: Collection(collectionName).update,
    remove: Collection(collectionName).remove
  };
}






