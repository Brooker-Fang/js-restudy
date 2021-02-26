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
主要原因：因为计算机存储时会把尾数超过52位的部分截取掉，0.1和0.2转为二进制会出现无限循环，最终超过的位数会被截取掉，所以导致计算不精确

0.1 >> 0.0001 1001 1001 …（无限循环）

解决：使用第三方库如bignumber，Math.js

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
parseInt(string, radix)：将字符串转为数值
只传入第一个参数：

1、parseInt会从第一个非空格字符开始转换 ，直到解析到一个无效的数值字符，如果不是数值字符(如果是正负号后面紧跟着数值除外)，则返回NaN

parseInt('   1') // 1  parseInt会从第一个非空格字符开始转换 
parseInt('+') // NaN
parseInt('+1.345') // 如果正负号紧跟着数值，则不会返回NaN
parseInt('   123k') // 123 截取遇到第一个非字符为止
parseInt('1.23') // 1
parseInt('') // NaN 如果不是数值字符，则返回NAN

2、如果传入的不是字符串，则会先转为字符串

parseInt(1) === parseInt('1') // 1

3、如果字符串以"0x"开头，就会被解析为十六进制整数

parseInt('0x10') // 16
parseInt('10', 16) // 16 如果传入第二个参数，0x可以省略

4、在严格模式下，字符串以"0"开头，就会被解析为十进制整

parseInt('010') // 10

5、如果第一个参数传入的数值能被转换为科学计数法，则会先转为数值的科学计数法，在转为字符串

parseInt(1000000000000000000001) // 1
1000000000000000000001 会先转为 1e+21
即 parseInt(1e+21) === 1

6、传入的第二个参数会被转为整数,如果传的不是有效数值，则无效

parseInt(10, '2') === parseInt(10, 2) // 2
parseInt(10, 0) // 10
parseInt(10, null) // 10
parseInt(10, undefined) // 10
parseInt(10, 'abc') // 10

7、如果传入的第二个参数为1、或者大于36，则返回NaN

parseInt(10, 1) // NaN
parseInt(10, 37) // NaN

8、如果传入的值，无法转为第二参数所需要的进制，则返回NaN

parseInt(3, 2) // NaN 3无法用2进制解析

9、parseInt会尝试尽量把传入的值，以传入的radix的进制去解析为数值，直到遇到不能解析的字符为止

parseInt(Infinity, 19) // 18 Infinity会先转为字符串，然后I在19进制中为18，所以最终返回18

面试题:

1、[1,2,3].map(parseInt)

[1,2,3].map(parseInt) // [1, NaN, NaN]
等同于 
[1,2,3].map((val, index) => { 
    return parseInt(val, index)
})
即 parseInt(1, 0) // 1
parseInt(2, 1) // NaN
parseInt(3, 2) // NaN

2、"123".replace(/\d/g, parseInt)

"123".replace(/\d/g, (...arg) => console.log(arg)) 
打印出：
["1", 0, "123"]
["2", 1, "123"]
["3", 2, "123"]
所以 "123".replace(/\d/g, parseInt) // "1NaNNaN"

注：如果是简单字符串要转为 数值，则可以使用~~代替

~~'1.1' // 1
~~'12345678910' // -542333997 如果超过10位则不精确

parseFloat()：解析一个参数（必要时先转换为字符串）并返回一个浮点数



isFinite(num) ：判断传入的值是否是一个有穷数。
isFinite(Infinity) // false Infinity、-Infinity、NaN和undefined这几个值都会返回false
isFinite(1) // true
isFinite('1') // true 
Number.isFinite('1') // false 
和全局的 isFinite() 函数相比，Number.isFinite不会强制将一个非数值的参数转换成数值，只有数值类型的值，且是有穷的（finite），才返回 true

Number.isInteger(value)：判断此参数是否为整数
Number.Number(value):判断传入的参数值是否是一个“安全整数”