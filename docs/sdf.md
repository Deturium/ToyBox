---
title: SDF
order: 100
---


##  SDF 是什么？

带符号距离场（signed distance field）

可以借此来绘制不少东西


## 画个圆

<code src="../src/sdf/circle.tsx" />

(╯' - ')╯︵ ┻━┻

画这个圆的时候被坑了，字面量得 `0.` 才是 `float` 类型，写 `0` 会编译不过


## 优化一下


<code src="../src/sdf/circle2.tsx" />



## Tower

<code src="../src/sdf/tower.tsx" />




## To Be Continue...
