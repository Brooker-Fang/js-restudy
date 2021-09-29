## 获取页面元素位置
使用getBoundingClientRect,返回一个对象，包含left、right、bottom、top属性，分别对应改元素的左上角、右上角相对于浏览器窗口的左上角距离

## 创建dom节点
+ 创建dom元素：createElement('div')
+ 创建文本节点：createTextNode
+ 克隆节点：cloneNode(true/false), true表示深度克隆
+ 创建虚拟节点对象：createDocumentFragMent

## 增加节点
+ parentNode.appendChild(node)：添加到父节点的最后一个子节点
+ parentNode.insertBefore(newNode, beforeNode): 将新节点添加到 before节点之前，如果before不存在，则添加到最后一个节点

## 删除节点
+ parentNode.removeChild(node)：删除节点
+ parentNode.replaceChild(newNode, oldNode): 替换节点

## 查找节点
+ document.getElementById('id')
+ querySelector(css选择器)：返回指定css选择器的元素，如果有多个，返回第一个
+ querySelectorAll(css选择器)：返回指定css选择器的元素集合
+ getElementClassNames(className): 返回指定类名的元素集合
+ getElementByName() : 返回指定name的所有元素的集合
+ getElementByTagName：返回指定标签名的所有元素的集合
+ Node.children ：获取子元素，不包括文本元素
+ Node.childNodes: 获取所有子元素，包括dom子元素和文本子元素

## 节点属性
+ setAttributes(prop, val),getAttributes(prop), removeAttribute(prop)
+ innerHTML：设置或获取dom的内容，包括标签内的所有元素
+ innerText：设置或获取dom的文本内容

## DOM结构
+ parentNode 父节点
+ childNodes 所有子节点集合
+ firstChild、lastChild
+ nextSibling、previoursSibling 下一个节点、上一个节点
+ nodeType：节点类型
+ nodeName：节点标签名
+ nodeValue：Text节点或Comment节点的文本内容