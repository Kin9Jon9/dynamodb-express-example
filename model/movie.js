const ddb = require('../config/dynamo');
//const util = require('util');

// const putAsync = util.promisify(ddb.put).bind(ddb);
// const getAsync = util.promisify(ddb.get).bind(ddb);
// const updateAsync = util.promisify(ddb.update).bind(ddb);
// const deleteAsync = util.promisify(ddb.delete).bind(ddb);
// const queryAsync = util.promisify(ddb.query).bind(ddb);

const TableName = "Document";

exports.readDocuments = async ({ user_id }) => {
  try {
    const data = {
      TableName  : TableName,
      KeyConditionExpression : "user_id = :u",
      ExpressionAttributeValues: {
        ":u": Number(user_id)
      },
      ProjectionExpression: "title"
    };
    const getDataResult = await ddb.query(data).promise(); 
    return getDataResult;
  } catch (e) {
    throw e;
  }
}

exports.createDocument = async (payload) => {
  try {
    const data = {
      TableName  : TableName,
      Item       : payload
    }
    const setDataResult = await ddb.put(data).promise();
    return setDataResult;
  } catch (e) {
    throw e;
  }
}

exports.updateDocument = async ({title, user_id, data}) => {
  const { text, option, color, style, pixel } = payload;
  try {
    const data = {
      TableName  : TableName,
      Key        : Key,
      UpdateExpression: "set content.division = :d, content.option = :o, content.color = :c, content.style = :s content.pixel = :p",
      ExpressionAttributeValues: {
        ":d": division,
        ":o": option,
        ":c": color,
        ":s": style,
        ":p": pixel
      },
      ReturnValues: "UPDATED_NEW"
    };

    const updateDataResult = await ddb.update(data).promise();
    return data;
  } catch (e) {
    throw e;
  }
}

exports.deleteDocument = async ({ user_id, title}) => {
  try {
    const data = {
      TableName: TableName,
      Key:{
        user_id  : user_id,
        title    : title
      }
  };
    const deleteResult = await ddb.delete(data).promise();
    return deleteResult;
  } catch (e) {
    throw e;
  }
}

exports.readOneDocument = ({ title, user_id }) => {
  try {
    const data = {
      TableName: TableName,
      Key : {
        user_id : Number(user_id),
        title   : title
      }
    };
    const readOneDocumentResult = ddb.get(data).promise();
    return readOneDocumentResult;
  } catch (e) {
      throw e;
  }
}