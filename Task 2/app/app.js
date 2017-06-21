document.addEventListener('DOMContentLoaded',function(){

if(typeof Storage === 'undefined') {
  return;
};

function LocalDB(name){
  this.name = name;
}

// Tworzona jest nowa instancja,
// w której należy zapamiętać nazwę "DB1"
var DB1 = new LocalDB("DB1");
  
console.log(DB1)
// Jakiś obiekt do zapisania
var janek = {
  firstName: "Jan",
  lastName: "Kowalski",
  age: 32
};

// Na prototypie LocalDB znajdować się
// musi metoda save, która przyjmuje
// parę klucz-wartość, a wartość powinna
// być przed zapisaniem przepuszczona
// przez JSON.stringify
LocalDB.prototype.save = function(objectName,obj){
 
  window.localStorage.setItem(this.name + '.' + objectName ,JSON.stringify(obj));

}

DB1.save("janek", janek);

// Prototyp LocalDB powinien również
// posiadać metodę get, która odczyta
// podany klucz, przepuszczając wartość
// przez JSON.parse
LocalDB.prototype.get = function(objectName){
  
  console.log(JSON.parse(localStorage[this.name + '.' + objectName]));
  
}

DB1.get("janek");
// Porada. Aby móżna było tworzyć bazy danych
// o różnych nazwach, przy zapisywaniu poszczególnych
// danych, do klucza dodawaj nazwę bazy danych,
// np. "DB1.janek"

console.log(window.localStorage);
  
});