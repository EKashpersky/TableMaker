# table-drawer
Simple script that draws table.

### UPD: Now it just manages head & body rows.

Rows are taken without copying the content or the whole array, so **they are references**.

How a table is created:
```javascript
const headRow = ["Name", "Age", "Gender"];
const person = ["Yehor", "19", "Male"];

const table = new TableMaker();

table.addHeadRow(row).addBodyRow(person);
```

The way you may **insert rows** into the table:
```javascript
table.assemble();
```

**To display** the table, **need to insert it into the dom**. Here's how:
```javascript
document.body.appendChild(table.get());
```

#### Data changing

And then need to change the age, for example. First solution is this:
```javascript
person[1] = "20";
```

**Not convenient.**

It's better to have an object with keys&values, where key is a word which
describes something, and the value is array index. Let's call it **map**.
Ex:
```javascript
const map = {
	name: 0,
	age: 1,
	gender: 2
};
```
Then you must write more code, but it becomes much easier:
```javascript
person[map.age] = "20";
```