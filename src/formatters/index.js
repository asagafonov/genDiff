
const plainReduce = (diff) => {
  const diffStatus = diff.reduce((acc, item) => {
    const { name, status, children } = item;

    if (status === 'unmodified') {
      if (Array.isArray(children)) {
        return [...acc,  ...plainReduce(children)];
      }
      return [...acc, { name, status, children }];
    }
    if (status === 'added') {
      if (isObject(children)) {
        return [...acc, { name, status, children: '[complex value]' }];
      }
      return [...acc, { name, status, children }];
    }
    if (status === 'deleted') {
      if (isObject(children)) {
        return [...acc, { name, status, children: '[complex value]' }];
      }
      return [...acc, { name, status, children }];
    }
  }, []);
  return diffStatus.filter((item) => item.status !== 'unmodified');
};

const isUnique = (arr, obj) => {
  const name = obj.name;
  let counter = 0;
  arr.forEach((object) => {
    if (object.name === name) {
      counter += 1;
    }
  })
  return counter === 1 ? true : false;
};

const plain = (list) => {
  const unique = [];
  const notUnique = [];

  list.forEach((property) => {
    if (isUnique(list, property)) {
      unique.push(property);
    } else {
    notUnique.push(property);
    }
  });

  const modified = [];
  for (let i = 0; i < notUnique.length; i += 2) {
    const name = notUnique[i].name;
    const value1 = notUnique[i].children;
    const value2 = notUnique[i + 1].children;
    modified.push({ 'name': name, 'status': 'changed', 'value1': value1, 'value2': value2 });
  }
  
  const concat = _.concat(unique, modified);
  const result = concat.map((property) => {
    if (property.status === 'added') {
      return [`Property '${property.name}' was added with value '${property.children}'`];
    }
    if (property.status === 'deleted') {
      return [`Property '${property.name}' was deleted`];
    }
    if (property.status === 'changed') {
      return [`Property '${property.name}' was changed from '${property.value1}' to '${property.value2}'`];
    }
    return undefined;
  });
  return result.join('\n');
};
