Boolean类型
类型转换
1、Number类型：除了0和NaN为false,其他数值都为true,包括无穷大

new Boolean(Infinity) // true
new Boolean(0) // false

2、String类型： 除了空字符串为false，其他字符串都为true

new Boolean('') // false
new Boolean('abc') // true

3、null和undefined都为false

4、Object类型：所有引用类型，包括基本引用类型和空对象、空数组，都为true

new Boolean(new Number(0)) // true
new Boolean({}) // true
new Boolean([]) // true

Undefined类型和Null类型
都只有一个值，分别为undefined和null。

因为null值表示空对象指针，所以typeof null 会返回“object”

注意：1、undefined使用双等号时 等同于null

undefined == null // true（双等号时，返回true）
undefined === null // false

2、基本引用类型里没有包含null和undefined的类型，所以使用.或者[] 会报语法错误

null.a // 报错
undefined.a // 报错

 