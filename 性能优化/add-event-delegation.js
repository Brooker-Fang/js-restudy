document.body.onclick = function(e) {
  let target = e.target
  let targetDom = target.tagName
  if(targetDom === "BUTTON") {
    let index = target.getAttribute('index')
    console.log('当前点击的索引 index====', index)
  }
}