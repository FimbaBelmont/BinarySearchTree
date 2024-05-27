class Node {
  constructor(d){
    this.data = d,
    this.left = null,
    this.right = null;
  }
}

class Tree {
  constructor(arr)
{  this.root= this.buildTree(this.reArr(arr), 0, (this.reArr(arr)).length-1)
}
  reArr(arr){
    let tmp = [];
    arr.forEach((element)=>{
      if(!tmp.includes(element)){
        tmp.push(element)
      }
    })
    return tmp.sort((a,b)=>{return a-b});

  }  

  buildTree(arr,start,end){
    if(start>end){
      return null
    }
    let mid = Math.floor((start+end)/2);
    let node = new Node(arr[mid]);
    node.right = this.buildTree(arr, mid+1, end);
    node.left = this.buildTree(arr,start,mid-1);
    return node
  }

  insert(value){
    let tmp = this.root;
    let prev;
    while(tmp){
      if(value>tmp.data){
        prev = tmp;
        tmp = tmp.right}
      else if(value<=tmp.data){
        prev = tmp;
        tmp = tmp.left
      }
    }
    if(value>prev.data){
      prev.right = new Node(value);
    }
    else if(value <= prev.data){
      prev.left = new Node(value);
    }
    }

  delete(value){
    let tmp = this.root;
    let prev;
    while(tmp){
      if(value>tmp.data){
        prev = tmp;
        tmp = tmp.right}
        else if(value<tmp.data){
          prev = tmp;
          tmp = tmp.left
        }
        else if (value ===tmp.data){
          break;
        }
      }
    //no child
    if(tmp.right===null&&tmp.left===null){
      if(prev.right.data === value) prev.right =null
      else if (prev.left.data === value) prev.left =null;        
    }
    //single child
    if(tmp.right===null&&tmp.left!==null){
      if(prev.right.data===value) prev.right = prev.right.left
      else if(prev.left.data ===value) prev.left = prev.left.left
      console.log(2);

    }
    if(tmp.left ===null&&tmp.right!==null){
      if(prev.left.data ===value) prev.left = prev.left.right
      else if (prev.right.data === value) prev.right = prev.right.right
      console.log(3);

    }
    //double child //this one is supposted to replace the parent node with its nearest successor
    if(tmp.right!==null&&tmp.left!==null){
      console.log(4);
      let arr = this.inorder();
      let successor = arr[arr.indexOf(value)+1];
      if(this.root.data===value){
        this.delete(successor);
        this.root.data = successor;
      }
      else if (prev.left.data === value) {
        this.delete(successor);
        prev.left.data = successor
      }
      else if(prev.right.data === value){
        this.delete(successor);
        prev.right.data = successor
      }
    }
  }

  find(value, tmp= this.root){
    while(tmp){
      if(value>tmp.data){
        tmp = tmp.right}
      else if(value<tmp.data){
        tmp = tmp.left
      }
      else if(value===tmp.data){
        return tmp
      }
    }
  }

  //level order traversel
levelorder(callback){
  let queue = [this.root];
  let result = [];
  while(!(queue.length===0)){
    let current = queue.shift();
    if(current.left) queue.push(current.left);
    if(current.right) queue.push(current.right);
    if(callback) callback(current)
    result.push(current.data);
  }
  return result
}
  //data left right
  preorder(callback, node = this.root){
    if(node===null){
      return [];
    }
    if(callback) callback(node);
    return [node.data]
    .concat(this.preorder(callback, node.left))
    .concat(this.preorder(callback, node.right));
  }
  //left data right
  inorder(callback,node =this.root){
    if(node ===null)return [];
    if(callback) callback(node);
    return this.inorder(callback,node.left)
    .concat([node.data])
    .concat(this.inorder(callback,node.right))

  }
  //left right data
  postorder(callback,node=this.root){
    if(node===null) return [];
    if(callback) callback(node);
    return this.postorder(callback, node.left)
    .concat(this.postorder(callback, node.right))
    .concat([node.data])
  }

  heigth(value) {
    let queue = [this.find(value)];
    let prevQ = [];
    let result = -1;
    while(!(queue.length===0)){
      prevQ = queue;
      queue = [];
      prevQ.forEach(element => {
        if(element.left) queue.push(element.left);
        if(element.right) queue.push(element.right);
        
      });
      result++
    }
    return result
  }

  depth(value){
    let q = [this.root]
    let prevQ = [];
    let totalD = 0
    let nodeD;
    while(!(q.length===0)){
      prevQ = q;
      q = [];
      prevQ.forEach(element=>{
        if(element.right) q.push(element.right);
        if(element.left) q.push(element.left);
      })
      totalD++;
      q.forEach(element=>{
        if(element.data === value) nodeD = totalD;
      })
      if(nodeD===totalD) break;
    }
    return nodeD
  }

  isBalanced(){
    let leftH = this.heigth(this.root.left.data);
    let rightH = this.heigth(this.root.right.data);
    if(((leftH-rightH)>=-1&&(leftH-rightH)<=1)){
      return true
    }
    else {return false}
  }
  reBalance(){
    let arr = this.inorder();
    this.root= this.buildTree(arr, 0, arr.length-1);
  }

  }

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};


function randArr(result = []){
  for(let i =0;i<15;i++){
    result.push(Math.floor(Math.random()*100))
  }
  return result
}

