function LinkedList() {
    const Node = function(element) {
            this.element = element;
            this.next = null;
        }
        // 存放 LinkedList 長度
    let length = 0;
    // 第一個節點的指標
    let head = null;
    // 在尾部新增一個節點
    this.append = function(element) {
        if (this.next != null) {
            this.next = node;
        } else {



        }
    };
    // 在特定位置新增一個元素節點
    this.insert = function(position, element) {};
    // 從串列中移除一個元素節點
    this.remove = function(element) {};
}


// 基本上js 的 array跟傳統上的不一樣．js的陣列是個動態的結構、．因為傳統上把陣列配置好就不會再更動你的記憶體位置．
class Node {
    constructor() {

        this.value = value;
        this.next = next
    }
}
// 在js中 物件就是hash.map 就是一個key與value的對應
// dictionary