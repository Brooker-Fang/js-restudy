Number数据类型
JavaScript所有数字都是64位浮点数，即使整数也是

1 === 1.0 // true

八进制字面量，以0开头。（严格模式下，八进制字面量无效，会报语法错误）

console.log(012) // 10
console.log(018) // 18 如果后面的数字超过0~7范围，则会忽略前面的0，后面的数值作为十进制

十六进制的字面量，以0x开头

console.log(0x10) // 16

Number.MAX_VALUE 可表示的最大的数。超过则为+Infinity 正无穷
Number.MIN_VALUE 可表示的最小的数。小于则为-Infinity 负无穷

Number.MAX_SAFE_INTEGER, 最大的安全整数 =  2^53  -  1 = 9007199254740991

Number.MIN_SAFE_INTEGER, 最小的安全整数 =  - 2^53 + 1 = - 9007199254740991

注：超过这个范围的整数的算数运算不精确，如

9007199254740992 === 9007199254740992 +1  // true
9007199254740991 + 2 // 9007199254740992
-9007199254740992 - 3 // -9007199254740996

NaN(not a number)
NaN 用于表示一个本来要返回数值的操作数未返回数值的情况。

parseInt('a') // NaN
0/0 // NaN

NaN不与任何值相等，包括本身

0/0 === 0/0 // false

可以用isNaN()判断是否为NaN

isNaN(NaN) // true
isNaN('a') // true 全局的isNaN会先将传入的参数转为数值在进行判断。'a'转为数值为NaN，所以为true
Number.isNaN('a') // false Number的静态方法不会将传入的参数转为数值。所以是false
isNaN(1) // false

NaN与任何数值操作都为NaN

为什么最大的安全整数是 - 2^53 ~ 2^53 (不包含边界-2^53和2^53)  
JavaScript 里的数字是采用 IEEE 754 标准的 64 位双精度浮点数。1个符号位，11个指数位，尾数位52个（即52个有效数字），超出的部分舍0进1。

IEEE 754规定，有效数字第一位默认总是1，不保存在64位浮点数之中，所以除了52个尾数位还有1个有效数字，即可以保存53位有效数字。

计算机存储时会把尾数超过52位的部分截取掉
2^53转为二进制为 1.000...(52个0)
2^53转为二进制为 1.000...1(52个0),最终存储到计算机也是1.000...(52个0)
所以Math.pow(2, 53) + 1 === Math.pow(2, 53) 为true

浮点数计算不精确问题
0.1 + 0.2 // 0.30000000000000004
1.335.toFixed(2) // 1.33 toFixed不会四舍五入
(0.07 * 100 + 0.14 * 100 )/100 // 即使通过乘法转为整数去计算，误差也还是存在



科学计数法表示的两种情况
1、小数点前的位数多于21位

123456789123456789123456 // 1.234567891234568e+23 即1.234567891234568*10^23

2、小数点后连续6个0或以上

0.0000001  // 1e-7 即1 * 10^-7

处理科学计数法的显示问题：

function toNonExponential(num) {
    // 先转为科学计数法
    var m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
    return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
}

相关api
isFinite(num) ：判断传入的值是否是一个有穷数。

isFinite(Infinity) // flase Infinity、-Infinity、NaN和undefined这几个值都会返回false
isFinite(1) // true
isFinite('1') // true 
Number.isFinite('1') // false 
和全局的 isFinite() 函数相比，Number.isFinite不会强制将一个非数值的参数转换成数值，只有数值类型的值，且是有穷的（finite），才返回 true

