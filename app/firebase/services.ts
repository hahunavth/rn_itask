import firebase, {db} from "./config";

export const addDocument = (collection, data) => {
  const query = db.collection(collection);

  // WARNING: cannot add field undefined
  for (const field in data) {
    if (typeof data[field] === "undefined") {
      data[field] = "";
    }
  }

  query.add({
    ...data,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

export const deleteDocument = (collection, data) => {
  const query = db.collection(collection);
  query
    .doc(data)
    .delete()
    .then(
      () => {
        console.log("deleted");
      },
      (err) => {
        console.log(err);
      }
    );
};

export const updateDocument = (collection, oldData, newData) => {
  const query = db.collection(collection);
  query
    .doc(oldData.id)
    .update(newData)
    .then(
      () => {
        console.log("updated");
      },
      (err) => {
        console.log(err);
      }
    );
};

export const deleteDocumentWhere = (collection, condition) => {
  const query = db.collection(collection);
  // console.log(query.where("roomId", "==", condition.compareValue));
  query
    .where(condition.fieldName, condition.operator, condition.compareValue)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });
};

// // tao keywords cho displayName, su dung cho search
// export const generateKeywords = (displayName) => {
//   // liet ke tat cac hoan vi. vd: name = ["David", "Van", "Teo"]
//   // => ["David", "Van", "Teo"], ["David", "Teo", "Van"], ["Teo", "David", "Van"],...
//   const name = displayName.split(" ").filter((word) => word);

//   const length = name.length;
//   let flagArray = [];
//   let result = [];
//   let stringArray = [];

//   /**
//    * khoi tao mang flag false
//    * dung de danh dau xem gia tri
//    * tai vi tri nay da duoc su dung
//    * hay chua
//    **/
//   for (let i = 0; i < length; i++) {
//     flagArray[i] = false;
//   }

//   const createKeywords = (name) => {
//     const arrName = [];
//     let curName = "";
//     name.split("").forEach((letter) => {
//       curName += letter;
//       arrName.push(curName);
//     });
//     return arrName;
//   };

//   function findPermutation(k) {
//     for (let i = 0; i < length; i++) {
//       if (!flagArray[i]) {
//         flagArray[i] = true;
//         result[k] = name[i];

//         if (k === length - 1) {
//           stringArray.push(result.join(" "));
//         }

//         findPermutation(k + 1);
//         flagArray[i] = false;
//       }
//     }
//   }

//   findPermutation(0);

//   const keywords = stringArray.reduce((acc, cur) => {
//     const words = createKeywords(cur);
//     return [...acc, ...words];
//   }, []);

//   return keywords;
// };
