---
slug: "surface-integrals-gauss-stokes"
subject: "calculus"
unit: "u11"
order: 3
mode: "mastery"
lang: "zh"
kicker: "第 3 讲 · 高等数学 · 专业模式"
title: "对坐标的曲面积分、Gauss 公式与 Stokes 公式"
subtitle: "通量、散度与旋度的一次汇总"
minutes: 32
meta: ["阅读 32 分钟","需要 第二类曲线积分与三重积分","掌握级"]
concepts: ["lineint", "field", "multipleint"]
prereq: ["lineint"]
related: ["multipleint", "vectorgeo", "partial"]
---

## 本讲目标

想象一片浸在水里的薄膜。要描述"每秒有多少水穿过它"，第一类曲面积分不够用：$\iint_\Sigma f\,dS$ 只按面积累加、不认方向。可"穿过量"天生带正负号——水从正面流向背面与从背面流向正面，一个正一个负，用恒正的 $dS$ 累加，这个差别就被抹平了。第二类曲面积分正是为带方向的穿过量准备的，它算的是通量。

这一讲分四步走：把通量写成第二类曲面积分，弄清"选一侧"在选什么并给出投影算法；用 Gauss 公式把闭曲面上的通量换成三重积分，被积式是散度；用 Stokes 公式把空间闭曲线上的环量换成曲面积分，被积式是旋度；最后把三条公式并排比较，看清它们是同一件事在不同维度上的三种写法。

学完这一讲，你应该能够：

- 解释第二类曲面积分为什么必须先选侧，以及换侧为什么三项同时变号；
- 用投影法把 $P\,dy\,dz+Q\,dz\,dx+R\,dx\,dy$ 化成二重积分，并正确处理上侧、下侧的符号；
- 判断一道题该直接投影、该用 Gauss，还是该补面之后再用 Gauss；
- 写出散度与旋度，并用右手法则确定 Stokes 公式中曲线走向与法向的配对；
- 说清三条公式各自在什么条件下退化成另一条。

## 三行回顾

- 第二类曲线积分带方向，换向变号；参数化时上下限跟随走向，不必强行让小数在前。
- 三重积分在立体上累加，柱面坐标的体积元是 $r\,dr\,d\theta\,dz$，球面坐标的是 $\rho^{2}\sin\varphi\,d\rho\,d\varphi\,d\theta$。
- 曲面 $z=z(x,y)$ 的面积元是 $\sqrt{1+z_x^{2}+z_y^{2}}\,dx\,dy$，根号就是"斜面比投影大多少"的放大因子。

## 从"按面积累加"到"按有向面积累加"

上一讲的 $\iint_\Sigma f\,dS$ 解决了"曲面上的累加"：分割、求和、取极限，微元是恒正的面积元，适合算质量、电量这类标量总量。但通量与环量是流量型的量，流入流出必须区分正负，只累加绝对值就把净流出量这个最有信息量的数字丢了。

办法与曲线的情形完全平行。在曲线上，我们把弧长微元 $ds$ 换成它在两个坐标轴上的投影 $\Delta x_i$、$\Delta y_i$，得到了带方向的第二类曲线积分；在曲面上，就把面积微元 $\Delta S_i$ 换成它在三个坐标面上的投影 $\Delta S_{yz}$、$\Delta S_{zx}$、$\Delta S_{xy}$。投影带符号：法向与某坐标轴成锐角时投影为正，成钝角时为负。于是"选哪一侧"这件事，被自动翻译成三个投影的符号。可见两类积分并不是两套理论，而是同一套分割求和在"微元要不要带符号"上的两种选择。

## 通量：第二类曲面积分的定义与性质

设 $\Sigma$ 是分片光滑的有向曲面（已经选定了一侧），单位法向量为 $\boldsymbol n=(\cos\alpha,\cos\beta,\cos\gamma)$，$P$、$Q$、$R$ 在 $\Sigma$ 上有界。把 $\Sigma$ 任意分成 $n$ 小块，第 $i$ 块面积为 $\Delta S_i$，它在 $yOz$、$zOx$、$xOy$ 三个坐标面上的有向投影依次为 $\Delta S_{yz}$、$\Delta S_{zx}$、$\Delta S_{xy}$，在第 $i$ 块上任取一点 $(\xi_i,\eta_i,\zeta_i)$，作和

$$
\sum_{i=1}^{n}\left[P(\xi_i,\eta_i,\zeta_i)\Delta S_{yz}+Q(\xi_i,\eta_i,\zeta_i)\Delta S_{zx}+R(\xi_i,\eta_i,\zeta_i)\Delta S_{xy}\right]
$$

当各小块直径的最大值趋于零时，若这个和趋于一个与分法、取点都无关的常数，就称它是 $P\,dy\,dz+Q\,dz\,dx+R\,dx\,dy$ 沿 $\Sigma$ 指定侧的第二类曲面积分，记作

$$
\iint_\Sigma P\,dy\,dz+Q\,dz\,dx+R\,dx\,dy
$$

它与第一类曲面积分的关系由一个恒等式给出：

$$
\iint_\Sigma P\,dy\,dz+Q\,dz\,dx+R\,dx\,dy
=\iint_\Sigma\left(P\cos\alpha+Q\cos\beta+R\cos\gamma\right)dS
=\iint_\Sigma\boldsymbol F\cdot\boldsymbol n\,dS
$$

最后那个式子说明它是什么：$\boldsymbol F\cdot\boldsymbol n$ 是"每单位面积往外穿的流量"，乘以 $dS$ 再积分，就是整张曲面的净流出量，即通量。两个极端情形可检验直觉：若 $\boldsymbol F$ 处处与曲面相切，点积为零，通量为零；若 $\boldsymbol F$ 处处沿法向且大小恒为 $c$，通量就是 $c$ 乘曲面面积。

三条性质与第二类曲线积分一一对应：

- **换侧变号**：选另一侧，$\boldsymbol n$ 反向，三个投影同时变号；
- **线性**：对 $P$、$Q$、$R$ 分别线性，可以拆项计算；
- **可加**：把 $\Sigma$ 分成若干块，各块积分相加，但每块必须取同一侧。

> [!NOTE]
> $dy\,dz$、$dz\,dx$、$dx\,dy$ 只是有向投影的记号，不是三个微分的乘积；把它当成乘法去约分，符号迟早出错。

## 投影法：把曲面积分落到坐标面上

定义给出的是"是什么"，计算还得靠投影。以单项 $\iint_\Sigma R\,dx\,dy$ 为例。设 $\Sigma$ 由 $z=z(x,y)$ 给出，投影到 $xOy$ 面上得到区域 $D_{xy}$。由 $\Delta S_{xy}=\Delta S\cos\gamma$，法向与 $z$ 轴成锐角时 $\cos\gamma>0$，投影为正，即曲面取上侧；成钝角时 $\cos\gamma<0$，投影为负，即曲面取下侧。于是

$$
\iint_\Sigma R\,dx\,dy=\pm\iint_{D_{xy}}R(x,y,z(x,y))\,dx\,dy
$$

正号对应上侧，负号对应下侧。同理，另外两项各自投影到对应的坐标面：

$$
\iint_\Sigma P\,dy\,dz=\pm\iint_{D_{yz}}P(x(y,z),y,z)\,dy\,dz,\qquad
\iint_\Sigma Q\,dz\,dx=\pm\iint_{D_{zx}}Q(x,y(z,x),z)\,dz\,dx
$$

正负号由法向与该坐标轴正向的夹角决定：成锐角取正，成钝角取负。三项可以分开算再相加，但三个符号必须由同一个法向统一决定，不能各挑各的。

例：$\Sigma$ 为球面 $x^{2}+y^{2}+z^{2}=a^{2}$ 的外侧，求 $\iint_\Sigma z\,dx\,dy$。

球面不能整体写成一张 $z=z(x,y)$ 的图，得按上下半球拆开。上半球 $z=\sqrt{a^{2}-x^{2}-y^{2}}$ 的外侧法向朝外，与 $z$ 轴成锐角，取正号；下半球 $z=-\sqrt{a^{2}-x^{2}-y^{2}}$ 的外侧法向与 $z$ 轴成钝角，取负号。两块投影都是圆盘 $D:r\le a$，于是

$$
\iint_\Sigma z\,dx\,dy=\iint_{D}\sqrt{a^{2}-r^{2}}\,d\sigma-\iint_{D}\left(-\sqrt{a^{2}-r^{2}}\right)d\sigma
=2\int_0^{2\pi}d\theta\int_0^{a}\sqrt{a^{2}-r^{2}}\,r\,dr
$$

内层积分换元 $t=a^{2}-r^{2}$ 得 $\frac{a^{3}}{3}$，故结果为 $\frac{4\pi a^{3}}{3}$，正好等于球的体积。这不是巧合：$R=z$ 时 $\partial R/\partial z=1$，下一节的 Gauss 公式会说明这一点。

例：$\Sigma$ 为抛物面 $z=x^{2}+y^{2}$ 上 $0\le z\le1$ 的部分，取下侧，求 $\iint_\Sigma z\,dx\,dy$。

投影区域是圆盘 $D:x^{2}+y^{2}\le1$。曲面取下侧，法向与 $z$ 轴成钝角，取负号；在曲面上 $z=x^{2}+y^{2}=r^{2}$，于是

$$
\iint_\Sigma z\,dx\,dy=-\iint_D r^{2}\,d\sigma=-\int_0^{2\pi}d\theta\int_0^{1}r^{3}\,dr=-\frac{\pi}{2}
$$

负号在这里有实际意义：这个抛物面像一顶朝上的帽子，取下侧即法向朝下，而 $z$ 分量朝上，通量为负。若改取上侧，答案就是 $+\frac{\pi}{2}$，只有符号不同。

## 边界情形与对比

投影法有三个容易踩空的地方，恰好也是三种边界情形。

**其一，投影退化。**若曲面与某个坐标面垂直，它在该面上的投影退化成一条曲线，对应那一项直接为零。例如柱面 $x^{2}+y^{2}=a^{2}$ 的法向水平，$\cos\gamma=0$，所以 $\iint_\Sigma R\,dx\,dy=0$，无论 $R$ 是什么；这时必须改用 $yOz$ 或 $zOx$ 投影。

**其二，闭曲面必须分片。**球面、柱面的上下底、立方体的六个面，都要按"法向朝哪"分组，逐片定号。想偷懒用一个式子统一处理，符号几乎必错。

**其三，同一道题里三项可能各自退化。**比如柱面侧面只有 $R\,dx\,dy$ 为零，水平圆盘则前两项为零、只剩第三项。做题前先看清哪几项真的存在。

再把第二类曲面积分与第一类对比一次，两者差的只是微元。第一类用恒正的 $dS$，计算时要乘放大因子 $\sqrt{1+z_x^{2}+z_y^{2}}$，换侧不变号；第二类用有向投影，不乘根号，换侧三项同时变号。这也解释了为什么第二类曲面积分算起来往往更省事：投影与面积之比已经由 $\cos\gamma$ 承担，它的信息只体现在那个正负号里。

## Gauss 公式：闭曲面的通量换成三重积分

直接算闭曲面的通量很麻烦：球面要拆成上下两片，还要逐片判断法向与坐标轴的夹角。而如果能换成一个三重积分，往往一行就完事。Gauss 公式提供的正是这个转换。

先引入散度。对向量场 $\boldsymbol F=(P,Q,R)$，称

$$
\operatorname{div}\boldsymbol F=\frac{\partial P}{\partial x}+\frac{\partial Q}{\partial y}+\frac{\partial R}{\partial z}
$$

为它的散度。散度的含义是"单位体积的净流出量"：在一点附近取一个极小的立方体，流出它的通量除以体积，取极限正是这个数。散度为正的点像水源，向外冒；为负的点像排水口，向内吸；为零的点既不冒也不吸，流进多少就流出多少。

Gauss 公式断言，把这些局部的源强度按体积加起来，正好等于穿过整个边界的净流出量。

设 $\Omega$ 是空间闭区域，边界 $\Sigma$ 为分片光滑闭曲面，取外侧；$P$、$Q$、$R$ 在 $\Omega$ 上有连续一阶偏导数，则

$$
\iint_\Sigma P\,dy\,dz+Q\,dz\,dx+R\,dx\,dy
=\iiint_\Omega\left(\frac{\partial P}{\partial x}+\frac{\partial Q}{\partial y}+\frac{\partial R}{\partial z}\right)dV
$$

证明思路分两层：先看一个小长方体，再把大区域切碎相加。

**小长方体。**设它在 $x$ 方向的边长为 $\Delta x$，垂直于 $x$ 轴的两个面面积为 $\Delta y\Delta z$。右面流出的是 $P(x+\Delta x)\Delta y\Delta z$，左面流出的是 $-P(x)\Delta y\Delta z$（法向朝负 $x$），两面合起来

$$
\left[P(x+\Delta x)-P(x)\right]\Delta y\Delta z\approx\frac{\partial P}{\partial x}\,\Delta x\,\Delta y\,\Delta z
$$

三个方向同理，于是穿过这个小长方体全部六个面的通量约为 $\operatorname{div}\boldsymbol F\cdot\Delta V$。这一步就是散度定义的来源。

**大区域。**把 $\Omega$ 切成许多小长方体（边界处用不规则小块，取极限时误差趋于零）。对每一块用上面的结论，再把所有块的通量相加。关键在内部公共面：它被两个相邻小块各穿一次，对一个块是流出，对另一个块是流入，方向相反，两次贡献恰好抵消。加完之后只剩下没有被共享的面，也就是外边界 $\Sigma$。取极限，右边的和成为三重积分，左边成为曲面积分。证毕。

这个"内部面成对抵消"的论证与上一讲 Green 公式用辅助线切区域完全一样，Stokes 的证明也是同一套。

## 用 Gauss 公式算题

例：$\Sigma$ 为球面 $x^{2}+y^{2}+z^{2}=a^{2}$ 的外侧，求 $\iint_\Sigma x\,dy\,dz+y\,dz\,dx+z\,dx\,dy$。

$P=x$、$Q=y$、$R=z$，散度为 $1+1+1=3$，在球内处处是常数。由 Gauss 公式

$$
\iint_\Sigma=\iiint_\Omega 3\,dV=3\cdot\frac{4\pi a^{3}}{3}=4\pi a^{3}
$$

与上一节直接投影所得 $\frac{4\pi a^{3}}{3}$ 相比，这里多了因子 $3$——那正是散度。这题若硬用投影，要算六次；用 Gauss 只要一行，差别就在这里。

例（补面法）：$\Sigma$ 为上半球面 $z=\sqrt{a^{2}-x^{2}-y^{2}}$，取上侧，求 $\iint_\Sigma x\,dy\,dz+y\,dz\,dx+z\,dx\,dy$。

曲面不闭合，Gauss 公式不能直接套。补上圆盘 $\Sigma_1:z=0$、$x^{2}+y^{2}\le a^{2}$，取下侧，则 $\Sigma+\Sigma_1$ 围成上半球体 $\Omega$，且取的是外侧。散度为 $3$，于是

$$
\iint_{\Sigma+\Sigma_1}=\iiint_\Omega 3\,dV=3\cdot\frac{2\pi a^{3}}{3}=2\pi a^{3}
$$

再算补面上的通量。$\Sigma_1$ 上 $z=0$，法向 $\boldsymbol n=(0,0,-1)$，被积函数为 $\boldsymbol F\cdot\boldsymbol n=-R=-z=0$，所以补面通量为零。故原积分为 $2\pi a^{3}$。

补面法的步骤可以固定成四步：选一块最简单的面把口封上；确认合并后取的是外侧；用 Gauss 算出闭合曲面的通量；减去补面上的通量。补面通常选坐标平面内的圆盘或多边形，因为它们的法向是常向量，被积函数往往直接为零。

三条公式摆在一起看，结构惊人地一致：

| 公式 | 边界上的积分 | 换成 | 定向要求 |
| --- | --- | --- | --- |
| Green | 平面闭曲线上的环量 | 平面区域上的二重积分 | 边界取正向，区域在左 |
| Gauss | 闭曲面上的通量 | 立体上的三重积分 | 曲面取外侧 |
| Stokes | 空间闭曲线上的环量 | 曲面上的第二类曲面积分 | 曲线与法向成右手系 |

读法是这样的：Green 把一维边界换成二维内部，Gauss 把二维边界换成三维内部，Stokes 则把空间中的一维边界换成二维曲面。三者都在说同一句话——边界上的积分等于内部某种"导数"的积分。

## Stokes 公式：空间环量换成曲面积分

上一讲 Green 公式处理的是平面闭曲线：曲线围出一块平面区域，环量等于区域上二维旋度的积分。空间里的闭曲线围不出平面区域，但它可以"绷"起一张曲面，就像铁丝圈绷起一层肥皂膜。肥皂膜的形状不唯一，这正是 Stokes 公式最有意思的地方——只要边界相同，取哪张曲面都行。

先把旋度写出来。对 $\boldsymbol F=(P,Q,R)$，称

$$
\nabla\times\boldsymbol F=\left(\frac{\partial R}{\partial y}-\frac{\partial Q}{\partial z},\ \frac{\partial P}{\partial z}-\frac{\partial R}{\partial x},\ \frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}\right)
$$

为旋度。它度量场在每一点附近绕轴旋转的强弱与转轴方向：旋度指向转轴，模长是两倍角速度的类比。风扇叶片处的风速场，旋度就沿着转轴。

设 $\Sigma$ 是分片光滑的有向曲面，边界 $\Gamma$ 是分段光滑闭曲线。若 $\Gamma$ 的走向与 $\Sigma$ 的法向符合右手法则——右手四指沿 $\Gamma$ 弯曲时拇指指向法向——且 $P$、$Q$、$R$ 在包含 $\Sigma$ 的空间区域上有连续一阶偏导数，则

$$
\oint_\Gamma P\,dx+Q\,dy+R\,dz=\iint_\Sigma
\begin{vmatrix}
dy\,dz & dz\,dx & dx\,dy\\
\dfrac{\partial}{\partial x} & \dfrac{\partial}{\partial y} & \dfrac{\partial}{\partial z}\\
P & Q & R
\end{vmatrix}
$$

把行列式按第一行展开，右端就是 $\iint_\Sigma(\nabla\times\boldsymbol F)\cdot\boldsymbol n\,dS$，即旋度穿过曲面的通量。公式说的是：沿边界的环量等于旋度在曲面上的通量。

证明思路仍然是"切碎—抵消"，只是抵消发生在曲面上。把 $\Sigma$ 分成许多小片，每片足够小，可近似看成平面上的小四边形，法向近似为常向量。在每一小片上用 Green 公式，可得环量约等于 $(\nabla\times\boldsymbol F)\cdot\boldsymbol n$ 乘以该片面积。把所有小片相加，内部的公共边被两侧小片各走一次、方向相反，全部抵消，只剩下最外面的 $\Gamma$。取极限即得公式。

这条证明说明了两件事。第一，Stokes 公式是 Green 公式的推广：把 $\Sigma$ 取成平面区域、让各量不依赖 $z$，行列式只剩最后一项，就是 Green。第二，既然证明只依赖边界，曲面就可以随便换，只要边界是 $\Gamma$、法向与 $\Gamma$ 满足右手法则。

例：$\Gamma$ 是 $xOy$ 面上逆时针方向的单位圆，$\boldsymbol F=(y,z,x)$，求 $\oint_\Gamma y\,dx+z\,dy+x\,dz$。

这里 $P=y$、$Q=z$、$R=x$，逐项求偏导：

$$
\nabla\times\boldsymbol F=\left(\frac{\partial x}{\partial y}-\frac{\partial z}{\partial z},\ \frac{\partial y}{\partial z}-\frac{\partial x}{\partial x},\ \frac{\partial z}{\partial x}-\frac{\partial y}{\partial y}\right)=(-1,-1,-1)
$$

取 $\Sigma$ 为单位圆盘，法向 $\boldsymbol k=(0,0,1)$。按右手法则，拇指朝上时四指逆时针，与题设一致，所以这是正确的配对。点积 $(\nabla\times\boldsymbol F)\cdot\boldsymbol k=-1$ 为常数，曲面积分为

$$
\iint_\Sigma(-1)\,dS=-\pi
$$

直接参数化 $x=\cos t$、$y=\sin t$、$z=0$ 也能验证：$dx=-\sin t\,dt$、$dy=\cos t\,dt$、$dz=0$，积分化为 $\int_0^{2\pi}(-\sin^{2}t)\,dt=-\pi$，两者一致。

这个例子还可以换一张曲面再算：取上半球面 $z=\sqrt{1-x^{2}-y^{2}}$，边界仍是单位圆，虽然 $\boldsymbol n$ 不再是常向量，算起来麻烦，但答案必须同为 $-\pi$。挑最省事的那张曲面，正是 Stokes 公式的实用价值。

## 四个常见误解

> [!MYTH] 第二类曲面积分与选哪一侧无关。
> 换侧三个投影同时变号。算之前必须先确定"外侧""上侧"这类词指的是哪个法向；同一张球面，取外侧与取内侧，答案差一个负号。

> [!MYTH] Gauss 公式对任何曲面都成立。
> 要求曲面闭合且取外侧，并且 $P,Q,R$ 在围成的立体上有连续偏导。曲面开口时要先补面，补完再扣掉补面上的通量；曲面内部有奇点时，要把奇点挖掉再对剩下的区域用公式。

> [!MYTH] Stokes 公式里曲线的方向可以任取。
> 方向必须与曲面法向构成右手系。方向取反，右端曲面积分也随之变号，等式仍然成立——所以"任取"并不会算错，但必须两边一起改；若只改一边，必错。

> [!MYTH] 旋度处处为零，向量场就一定是某个函数的梯度。
> 还要区域单连通。$\boldsymbol F=\left(\frac{-y}{x^{2}+y^{2}},\frac{x}{x^{2}+y^{2}},0\right)$ 在去掉 $z$ 轴的区域内旋度为零，沿绕轴一圈的环量却是 $2\pi$，不可能等于 $u(B)-u(A)=0$。这与上一讲"偏导相等推不出路径无关"是同一件事的三维版本。

## 练习

> [!PRACTICE] 1 · 投影
> 求 $\iint_\Sigma z\,dx\,dy$，$\Sigma$ 为平面 $z=1$ 上 $x^{2}+y^{2}\le1$ 的部分，取上侧。
>
> > [!ANSWER] 看答案
> > 上侧取正号，被积函数恒为 $1$，结果为投影圆盘面积 $\pi$。

> [!PRACTICE] 2 · Gauss
> 求 $\iint_\Sigma x\,dy\,dz+y\,dz\,dx+z\,dx\,dy$，$\Sigma$ 为立方体 $0\le x,y,z\le1$ 的外表面。
>
> > [!ANSWER] 看答案
> > 散度为 $1+1+1=3$，立体体积为 $1$，故通量为 $3$。

> [!PRACTICE] 3 · Stokes
> 用 Stokes 公式求 $\oint_\Gamma-y\,dx+x\,dy$，$\Gamma$ 为 $z=0$ 面上逆时针方向的单位圆。
>
> > [!ANSWER] 看答案
> > $P=-y$、$Q=x$、$R=0$，旋度的 $z$ 分量为 $\dfrac{\partial Q}{\partial x}-\dfrac{\partial P}{\partial y}=1-(-1)=2$，其余分量为零。取圆盘、法向 $\boldsymbol k$，曲面积为 $\pi$，故结果为 $2\pi$，与 Green 公式一致。

> [!PRACTICE] 4 · 对称性
> 求 $\iint_\Sigma x\,dy\,dz$，$\Sigma$ 为球面 $x^{2}+y^{2}+z^{2}=a^{2}$ 的外侧。
>
> > [!ANSWER] 看答案
> > 不必逐片投影。把 $x\,dy\,dz$ 看成 $\boldsymbol F=(x,0,0)$ 的通量，用 Gauss：散度为 $1$，故积分等于球体积 $\dfrac{4\pi a^{3}}{3}$。

> [!PRACTICE] 5 · 补面
> 求 $\iint_\Sigma x\,dy\,dz+y\,dz\,dx$，$\Sigma$ 为柱面 $x^{2}+y^{2}=1$ 上 $0\le z\le1$ 的部分，取外侧（不含上下底）。
>
> > [!ANSWER] 看答案
> > 补上两个圆盘凑成闭圆柱面。取 $\boldsymbol F=(x,y,0)$，散度为 $2$，圆柱体积为 $\pi$，故闭合面通量为 $2\pi$。上下底的法向为 $\pm\boldsymbol k$，与场的点积为零，补面无贡献。所以原积分为 $2\pi$。

> [!PRACTICE] 6 · 换曲面
> 用 Stokes 公式求 $\oint_\Gamma z\,dx+x\,dy+y\,dz$，$\Gamma$ 为 $z=0$ 面上逆时针方向的单位圆。
>
> > [!ANSWER] 看答案
> > $P=z$、$Q=x$、$R=y$，旋度为 $(1,1,1)$，与 $\boldsymbol k$ 的点积为 $1$，圆盘面积为 $\pi$，故结果为 $\pi$。直接参数化也可验证：$\oint x\,dy=\pi$。

## 严格表述

> [!FORMAL] 严格表述
> 设 $\Sigma$ 为分片光滑的有向曲面，单位法向量 $\boldsymbol n=(\cos\alpha,\cos\beta,\cos\gamma)$，$P$、$Q$、$R$ 在 $\Sigma$ 上连续。把 $\Sigma$ 分成小块，以 $\Delta S_{yz}$、$\Delta S_{zx}$、$\Delta S_{xy}$ 记第 $i$ 块在三个坐标面上的有向投影，作和 $\sum(P\Delta S_{yz}+Q\Delta S_{zx}+R\Delta S_{xy})$；当最大直径趋于零时若和趋于与分法及取点无关的常数，则称其为第二类曲面积分，且
> $$
> \iint_\Sigma P\,dy\,dz+Q\,dz\,dx+R\,dx\,dy=\iint_\Sigma\left(P\cos\alpha+Q\cos\beta+R\cos\gamma\right)dS
> $$
> 改变曲面的侧，积分变号。
> 若 $\Omega$ 是边界为分片光滑闭曲面 $\Sigma$（取外侧）的闭区域，$P,Q,R\in C^{1}(\Omega)$，则
> $$
> \iint_\Sigma P\,dy\,dz+Q\,dz\,dx+R\,dx\,dy=\iiint_\Omega\left(\frac{\partial P}{\partial x}+\frac{\partial Q}{\partial y}+\frac{\partial R}{\partial z}\right)dV
> $$
> 若 $\Sigma$ 是分片光滑有向曲面，边界 $\Gamma$ 为分段光滑闭曲线，$\Gamma$ 的走向与 $\Sigma$ 的法向符合右手法则，$P,Q,R\in C^{1}$，则
> $$
> \oint_\Gamma P\,dx+Q\,dy+R\,dz=\iint_\Sigma\left(\nabla\times\boldsymbol F\right)\cdot\boldsymbol n\,dS
> $$
> 当 $\Sigma$ 为平面区域且各量不依赖 $z$ 时，Stokes 公式化为 Green 公式。

## 与其他讲次的联系

这一讲把前两讲的方向与边界换内部的思想推到三维，三条公式本是一家：

- **与第一类曲面积分**：同一套分割求和，只把恒正的 $dS$ 换成有向投影。第一类算标量总量，第二类算通量；前者不需要选侧，后者必须先选侧。
- **与第二类曲线积分**：通量与环量是同一枚硬币的两面。曲线积分沿一维边界累加，曲面积分沿二维边界累加；换向变号与换侧变号是同一件事在两个维度上的表现。
- **与 Green 公式**：Green 是 Stokes 的平面特例，也是 Gauss 在二维世界里的"降维版本"。三者证明共用"内部公共部分成对抵消"这一个论证，看懂一次就够。
- **与三重积分和偏导数**：Gauss 把闭曲面上的通量换成三重积分，散度就是被积式，柱面、球面坐标的体积元在这里照样可用；散度与旋度都由偏导数拼成，$\operatorname{div}$ 是一阶导数的迹，$\nabla\times$ 是它们的反对称组合。
- **与场论与后续课程**：散度为零的场叫无源场，旋度为零的场叫无旋场；在单连通区域上，无旋等价于存在势函数，这正是上一讲路径无关的四条等价说法搬到了空间。

一句话总结：这一讲把"通量"写成第二类曲面积分，再用 Gauss 与 Stokes 把边界上的积分换成内部的散度与旋度，三条公式合起来就是同一个思想的三次出场。