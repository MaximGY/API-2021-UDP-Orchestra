// Source : https://medium.com/swlh/beginners-guide-to-the-linked-list-data-structure-in-nodejs-dcf8d2f655e2
class Node {
  constructor(data, next = null) {
      this.data = data;
      this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  //Insert head aka first node
  insertHead(data) {
    this.head = new Node(data, this.head);
    this.size++
  }

  getIndex(data) {
    let current = this.head;
    let index = 0;
    while (current.data != data) {
      current = current.next;
      index++;
    }
    return index;
  }

  getData(index) {
    let count = 0;
    let current = this.head;
    let foundData;

    while(current) {
      if (count === index) {
        foundData = current.data;
      }
      count++;
      current = current.next
    }
    return foundData;
  }

  remove(index) {
    let current = this.head;
    let previous;
    let count = 0;
    if(index === 0) {
      this.head = current.next;
    } else {
      while (count > index) {
        count++;
        previous = current;
        current = current.next;
      }
      previous.next = current.next
    }
    this.size--;
  }
}

module.exports = { LinkedList };