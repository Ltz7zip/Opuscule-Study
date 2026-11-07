export const SUBJECTS = [
  {
    id: 'dl', zh: '深度学习', en: 'Deep Learning', tag: 'AI',
    desc: '从感知机到注意力，把模型、训练与评估完整走一遍。',
    descEn: 'Models, training, and evaluation — from the perceptron to attention.',
    concepts: 42, units: 24, pre: ['elem', 'la'], modes: ['mastery', 'applied', 'literacy']
  },
  {
    id: 'analysis', zh: '数学分析', en: 'Mathematical Analysis', tag: '数学',
    desc: '从集合与映射出发，用严格语言重建极限、连续与微积分。',
    descEn: 'Sets and maps first, then limits, continuity, and calculus rebuilt in a rigorous language.',
    concepts: 4, units: 3, pre: ['elem'], modes: ['mastery']
  },
  {
    id: 'la', zh: '线性代数', en: 'Linear Algebra', tag: '数学',
    desc: '向量、矩阵、线性变换与特征值，用几何直觉带一遍。',
    descEn: 'Vectors, matrices, linear maps, and eigenvalues, taught through geometric intuition.',
    concepts: 28, units: 16, pre: ['elem'], modes: ['mastery', 'applied']
  },
  {
    id: 'calc', zh: '高等数学', en: 'Calculus', tag: '数学',
    desc: '极限、导数、积分与级数，从直观到能算。',
    descEn: 'Limits, derivatives, integrals, and series — from intuition to calculation.',
    concepts: 36, units: 22, pre: ['elem'], modes: ['mastery', 'applied']
  },
  {
    id: 'sec', zh: '网络安全', en: 'Cybersecurity', tag: '计算机',
    desc: '网络、密码学、认证与攻防，把原理和实操对齐。',
    descEn: 'Networks, cryptography, authentication, and attack/defense, aligned with practice.',
    concepts: 31, units: 18, pre: ['elem', 'disc'], modes: ['mastery', 'literacy']
  },
  {
    id: 'se', zh: '软件工程', en: 'Software Engineering', tag: '计算机',
    desc: '数据结构、系统设计与工程流程，面向能落地的能力。',
    descEn: 'Data structures, system design, and engineering workflow, aimed at what you can ship.',
    concepts: 26, units: 15, pre: ['elem'], modes: ['mastery', 'applied']
  },
  {
    id: 'elem', zh: '初等数学', en: 'Elementary Math', tag: '数学',
    desc: '代数、函数、几何——所有方向的共同前置。',
    descEn: 'Algebra, functions, geometry — the shared prerequisite for every direction.',
    concepts: 45, units: 28, pre: [], modes: ['mastery', 'literacy']
  }
];

export const MODES = {
  mastery: {
    zh: '专业', en: 'Mastery', num: '01',
    desc: '推导、证明、能实现。给准备入行的人。',
    descEn: 'Derivations, proofs, and implementations. For people entering the field.',
    points: ['完整前置，硬门禁可选', '公式与证明可展开', '结课要交一个项目'],
    pointsEn: ['Full prerequisites, gating optional', 'Proofs and definitions expandable', 'Capstone project required']
  },
  applied: {
    zh: '应用', en: 'Applied', num: '02',
    desc: '会用、会调、看得懂文档。给要上手的人。',
    descEn: 'Use it, tune it, read the docs. For people who need to ship.',
    points: ['只补必需前置', '参数含义优先于推导', '结课是一个小工具'],
    pointsEn: ['Only essential prerequisites', 'Parameter meaning before derivation', 'Capstone is a small tool']
  },
  literacy: {
    zh: '通识', en: 'Literacy', num: '03',
    desc: '不推导，讲清这个领域在解决什么。给好奇的人。',
    descEn: 'No derivations: what the field actually solves. For the curious.',
    points: ['零前置承诺', '公式只讲读法与含义', '结课是一页领域地图'],
    pointsEn: ['No prerequisite promise', 'Formulas explained by meaning', 'Capstone is a one-page map']
  }
};

export const CONCEPTS = {
  elem: {
    zh: '初等数学', en: 'Elementary Mathematics', field: 'math',
    x: 40, y: 238, w: 120, h: 44,
    def: '代数运算、方程、函数与平面几何。它是所有方向的共同前置，本身不指向任何单一专业。',
    defEn: 'Algebra, equations, functions, and plane geometry. The shared foundation for every direction, and not tied to any single field.',
    pre: [], usedBy: ['calc', 'la', 'disc']
  },
  calc: {
    zh: '高等数学', en: 'Calculus', field: 'math',
    x: 205, y: 120, w: 120, h: 44,
    def: '极限、导数、积分与级数。它提供描述变化率的语言，是梯度类方法的源头。',
    defEn: 'Limits, derivatives, integrals, and series. It supplies the language of change, and is the source of every gradient method.',
    pre: ['elem'], usedBy: ['grad']
  },
  la: {
    zh: '线性代数', en: 'Linear Algebra', field: 'math',
    x: 205, y: 238, w: 120, h: 44,
    def: '向量、矩阵、线性变换与特征值。它把高维运算写成可批量计算的形状。',
    defEn: 'Vectors, matrices, linear maps, and eigenvalues. It turns high-dimensional work into shapes you can batch.',
    pre: ['elem'], usedBy: ['matrix']
  },
  disc: {
    zh: '离散数学', en: 'Discrete Mathematics', field: 'math',
    x: 205, y: 356, w: 120, h: 44,
    def: '逻辑、集合、图论与计数。它是算法与安全类课程的语言基础。',
    defEn: 'Logic, sets, graph theory, and counting. The language beneath algorithms and security.',
    pre: ['elem'], usedBy: ['sec']
  },
  grad: {
    zh: '梯度下降', en: 'Gradient Descent', field: 'ai',
    x: 380, y: 120, w: 120, h: 44,
    def: '沿负梯度方向小步更新参数，使损失下降。步长由学习率控制。',
    defEn: 'Step against the gradient to lower the loss. The learning rate controls the step size.',
    pre: ['calc'], usedBy: ['backprop']
  },
  matrix: {
    zh: '矩阵乘法', en: 'Matrix Multiplication', field: 'math',
    x: 380, y: 238, w: 120, h: 44,
    def: '行与列逐项相乘再相加。结果的第 i 行第 j 列，来自左矩阵第 i 行和右矩阵第 j 列。',
    defEn: 'Rows meet columns: entry (i, j) of the result is the dot product of row i on the left and column j on the right.',
    pre: ['la'], usedBy: ['backprop', 'dl']
  },
  chain: {
    zh: '链式法则', en: 'Chain Rule', field: 'math',
    x: 545, y: 46, w: 120, h: 44,
    def: '复合函数求导：外层导数乘以内层导数。f(g(x)) 的导数是 f′(g(x))·g′(x)。',
    defEn: 'The derivative of a composite function is the product of the layer derivatives: f′(g(x))·g′(x).',
    pre: ['calc'], usedBy: ['backprop']
  },
  backprop: {
    zh: '反向传播', en: 'Backpropagation', field: 'ai',
    x: 545, y: 120, w: 120, h: 44,
    def: '从输出层向前，逐层用链式法则计算每个参数的梯度，复用前向缓存的中间结果。',
    defEn: 'From the output backwards, use the chain rule layer by layer to compute every parameter gradient, reusing cached forward values.',
    pre: ['grad', 'chain', 'matrix'], usedBy: ['dl']
  },
  dl: {
    zh: '深度学习', en: 'Deep Learning', field: 'ai',
    x: 700, y: 190, w: 110, h: 44,
    def: '用多层可微函数拟合数据分布。核心是表示学习、梯度优化与规模化训练。',
    defEn: 'Fit data distributions with stacks of differentiable functions: representation learning, gradient optimisation, and scale.',
    pre: ['backprop', 'matrix'], usedBy: []
  },
  sec: {
    zh: '网络安全', en: 'Cybersecurity', field: 'cs',
    x: 700, y: 330, w: 110, h: 44,
    def: '网络与系统安全的攻防方法，涵盖密码学、认证、漏洞与响应。',
    defEn: 'Attack and defense across networks and systems: cryptography, authentication, vulnerabilities, and response.',
    pre: ['disc'], usedBy: []
  },
  analysis: {
    zh: '数学分析', en: 'Mathematical Analysis', field: 'math',
    x: 40, y: 120, w: 120, h: 44,
    def: '以集合、映射和极限为语言，严格研究函数与连续变化的学科。',
    defEn: 'The rigorous study of functions and continuous change, built on sets, maps, and limits.',
    pre: ['elem'], usedBy: ['set']
  },
  set: {
    zh: '集合', en: 'Set', field: 'math',
    x: 40, y: 46, w: 120, h: 44,
    def: '具有确定性质的对象汇成的整体。元素与集合之间用“属于”连接。',
    defEn: 'A collection of objects sharing a definite property. Elements belong to the set.',
    pre: ['analysis'], usedBy: ['setops', 'cartesian']
  },
  setops: {
    zh: '集合运算', en: 'Set Operations', field: 'math',
    x: 205, y: 46, w: 120, h: 44,
    def: '并、交、差、补。它们把“或、且、不属于”翻译成集合之间的操作。',
    defEn: 'Union, intersection, difference, complement — “or”, “and”, and “not” turned into operations on sets.',
    pre: ['set'], usedBy: ['cartesian']
  },
  cartesian: {
    zh: 'Descartes 积', en: 'Cartesian Product', field: 'math',
    x: 380, y: 46, w: 120, h: 44,
    def: 'A×B 是所有有序对 (x,y) 的集合，其中 x∈A、y∈B。它是坐标与关系的起点。',
    defEn: 'A×B is the set of all ordered pairs (x, y) with x in A and y in B. It is where coordinates and relations begin.',
    pre: ['set', 'setops'], usedBy: []
  }
};

export const CONCEPT_IDS = Object.keys(CONCEPTS);

export const ROUTES = {
  dl: {
    mastery: [
      {
        stage: { zh: '第一阶段 · 基础', en: 'Stage 1 · Foundations' },
        units: [
          { n: 1, zh: '初等数学回顾', en: 'Elementary math review', note: '函数、图象、不等式', concepts: ['elem'], level: 3, status: 'done' },
          { n: 2, zh: '极限与连续', en: 'Limits and continuity', note: 'ε-δ 的直觉版本', concepts: ['calc'], level: 3, status: 'done' },
          { n: 3, zh: '导数与偏导', en: 'Derivatives and partials', note: '从切线走到梯度', concepts: ['calc'], level: 3, status: 'done' }
        ]
      },
      {
        stage: { zh: '第二阶段 · 核心', en: 'Stage 2 · Core' },
        units: [
          { n: 4, zh: '矩阵与矩阵乘法', en: 'Matrices and multiplication', note: '形状、行与列、批量运算', concepts: ['matrix'], level: 3, status: 'done' },
          { n: 5, zh: '梯度下降', en: 'Gradient descent', note: '学习率与更新公式', concepts: ['grad'], level: 3, status: 'done' },
          { n: 6, zh: '反向传播', en: 'Backpropagation', note: '误差怎么原路退回去', concepts: ['backprop'], level: 3, status: 'current' },
          { n: 7, zh: '优化器', en: 'Optimizers', note: '动量、Adam 与学习率调度', concepts: ['grad', 'backprop'], level: 2, status: 'next' },
          { n: 8, zh: '计算图', en: 'Computation graphs', note: '前向与反向的执行顺序', concepts: ['backprop'], level: 2, status: 'next' }
        ]
      },
      {
        stage: { zh: '第三阶段 · 进阶', en: 'Stage 3 · Advanced' },
        units: [
          { n: 9, zh: '卷积与感受野', en: 'Convolutions and receptive fields', note: '局部性与权重共享', concepts: ['matrix'], level: 2, status: 'next' },
          { n: 10, zh: '序列模型', en: 'Sequence models', note: '循环网络与长程依赖', concepts: [], level: 2, status: 'next' },
          { n: 11, zh: '注意力与 Transformer', en: 'Attention and Transformers', note: '用矩阵运算做加权检索', concepts: ['matrix'], level: 2, status: 'next' }
        ]
      },
      {
        stage: { zh: '第四阶段 · 项目', en: 'Stage 4 · Project' },
        units: [
          { n: 12, zh: '手写一个两层网络', en: 'Build a two-layer net from scratch', note: '不用框架，自己实现前向与反向', concepts: ['backprop'], level: 3, status: 'next' }
        ]
      }
    ],
    applied: [
      {
        stage: { zh: '上手', en: 'Get started' },
        units: [
          { n: 1, zh: '认识张量与形状', en: 'Tensors and shapes', note: '维度对不上时怎么排查', concepts: ['matrix'], level: 2, status: 'done' },
          { n: 2, zh: '调用一个预训练模型', en: 'Use a pretrained model', note: '加载、推理、批量处理', concepts: ['dl'], level: 2, status: 'done' },
          { n: 3, zh: '微调一个分类器', en: 'Fine-tune a classifier', note: '数据、标签、训练轮次', concepts: ['grad'], level: 2, status: 'current' },
          { n: 4, zh: '评估与排错', en: 'Evaluate and debug', note: '过拟合、数据泄漏、指标选择', concepts: [], level: 2, status: 'next' }
        ]
      },
      {
        stage: { zh: '常用', en: 'In practice' },
        units: [
          { n: 5, zh: '数据管道与提示', en: 'Data pipelines and prompts', note: '把输入整理成模型能吃的形状', concepts: [], level: 1, status: 'next' },
          { n: 6, zh: '部署一个接口', en: 'Ship an endpoint', note: '延迟、显存、并发', concepts: [], level: 1, status: 'next' }
        ]
      }
    ],
    literacy: [
      {
        stage: { zh: '按问题走，不按公式走', en: 'Follow questions, not formulas' },
        units: [
          { n: 1, zh: '机器怎么“学”', en: 'How a machine learns', note: '从例子中调整参数，而不是被写入规则', concepts: [], level: 1, status: 'done' },
          { n: 2, zh: '神经网络的直觉', en: 'The intuition of a neural network', note: '很多层简单的变换叠起来', concepts: [], level: 1, status: 'done' },
          { n: 3, zh: '训练到底在调整什么', en: 'What training actually changes', note: '误差反传，参数微调', concepts: ['backprop'], level: 1, status: 'current' },
          { n: 4, zh: '它能做什么，不能做什么', en: 'What it can and cannot do', note: '分布内很强，分布外很脆', concepts: [], level: 1, status: 'next' },
          { n: 5, zh: '代价与争议', en: 'Costs and controversies', note: '算力、数据、版权与偏见', concepts: [], level: 1, status: 'next' }
        ]
      }
    ]
  },
  la: {
    mastery: [
      {
        stage: { zh: '主线', en: 'Main line' },
        units: [
          { n: 1, zh: '向量与空间', en: 'Vectors and spaces', note: '方向、长度、线性组合', concepts: [], level: 3, status: 'done' },
          { n: 2, zh: '矩阵与线性变换', en: 'Matrices as linear maps', note: '把变换写成表格', concepts: ['matrix'], level: 3, status: 'current' },
          { n: 3, zh: '行列式与可逆性', en: 'Determinants and invertibility', note: '面积、体积与塌缩', concepts: [], level: 3, status: 'next' },
          { n: 4, zh: '特征值与特征向量', en: 'Eigenvalues and eigenvectors', note: '变换中不改变方向的那些线', concepts: [], level: 3, status: 'next' },
          { n: 5, zh: '正交与投影', en: 'Orthogonality and projection', note: '最小二乘的几何解释', concepts: [], level: 2, status: 'next' },
          { n: 6, zh: '项目：图像压缩', en: 'Project: image compression', note: '用 SVD 保留主要成分', concepts: [], level: 3, status: 'next' }
        ]
      }
    ]
  },
  calc: {
    mastery: [
      {
        stage: { zh: '主线', en: 'Main line' },
        units: [
          { n: 1, zh: '函数与极限', en: 'Functions and limits', note: '从直观到 ε-δ', concepts: ['calc'], level: 3, status: 'done' },
          { n: 2, zh: '导数与微分', en: 'Derivatives and differentials', note: '切线、变化率、链式法则', concepts: ['chain'], level: 3, status: 'current' },
          { n: 3, zh: '中值定理', en: 'Mean value theorems', note: '证明题的起点', concepts: [], level: 3, status: 'next' },
          { n: 4, zh: '积分', en: 'Integration', note: '换元、分部、反常积分', concepts: [], level: 3, status: 'next' },
          { n: 5, zh: '级数', en: 'Series', note: '收敛判别与泰勒展开', concepts: [], level: 2, status: 'next' }
        ]
      }
    ]
  },
  sec: {
    mastery: [
      {
        stage: { zh: '主线', en: 'Main line' },
        units: [
          { n: 1, zh: '网络基础', en: 'Networking basics', note: '协议、分层与抓包', concepts: [], level: 3, status: 'done' },
          { n: 2, zh: '对称与非对称加密', en: 'Symmetric and asymmetric crypto', note: '密钥交换与证书', concepts: [], level: 3, status: 'current' },
          { n: 3, zh: '认证与授权', en: 'Authentication and authorization', note: '会话、令牌、权限模型', concepts: [], level: 3, status: 'next' },
          { n: 4, zh: 'Web 漏洞', en: 'Web vulnerabilities', note: '注入、越权、SSRF', concepts: ['sec'], level: 3, status: 'next' },
          { n: 5, zh: '渗透测试', en: 'Penetration testing', note: '流程、工具与报告', concepts: [], level: 2, status: 'next' }
        ]
      }
    ]
  },
  se: {
    mastery: [
      {
        stage: { zh: '主线', en: 'Main line' },
        units: [
          { n: 1, zh: '数据结构', en: 'Data structures', note: '数组、哈希、树、图', concepts: [], level: 3, status: 'done' },
          { n: 2, zh: '系统设计', en: 'System design', note: '拆分、缓存、一致性', concepts: [], level: 3, status: 'current' },
          { n: 3, zh: '架构模式', en: 'Architecture patterns', note: '分层、事件驱动、六边形', concepts: [], level: 2, status: 'next' },
          { n: 4, zh: '测试策略', en: 'Testing strategy', note: '单元、集成、契约', concepts: [], level: 2, status: 'next' },
          { n: 5, zh: '部署与运维', en: 'Deploy and operate', note: '容器、监控、回滚', concepts: [], level: 2, status: 'next' }
        ]
      }
    ]
  },
  elem: {
    mastery: [
      {
        stage: { zh: '共同前置', en: 'Common foundation' },
        units: [
          { n: 1, zh: '数与式', en: 'Numbers and expressions', note: '运算律、因式分解', concepts: ['elem'], level: 3, status: 'done' },
          { n: 2, zh: '方程与不等式', en: 'Equations and inequalities', note: '一次、二次、含参', concepts: [], level: 3, status: 'current' },
          { n: 3, zh: '函数', en: 'Functions', note: '定义域、单调性、图象', concepts: [], level: 3, status: 'next' },
          { n: 4, zh: '平面几何', en: 'Plane geometry', note: '相似、圆、证明', concepts: [], level: 3, status: 'next' },
          { n: 5, zh: '三角', en: 'Trigonometry', note: '恒等变换与解三角形', concepts: [], level: 2, status: 'next' }
        ]
      }
    ]
  },
  analysis: {
    mastery: [
      {
        stage: { zh: '第一章 · 集合与映射', en: 'Chapter 1 · Sets and Maps' },
        units: [
          {
            n: 1, zh: '集合与运算', en: 'Sets and operations',
            note: '元素、子集、并交补、Descartes 积', concepts: ['set', 'setops', 'cartesian'],
            level: 3, status: 'current', lesson: 'analysis-set'
          },
          { n: 2, zh: '映射', en: 'Maps', note: '定义域、值域、单射与满射', concepts: ['set'], level: 3, status: 'next' },
          { n: 3, zh: '函数与复合', en: 'Functions and composition', note: '复合、反函数、初等函数', concepts: ['set', 'setops'], level: 2, status: 'next' }
        ]
      }
    ]
  }
};

export const T = {
  zh: {
    'nav.home': '首页', 'nav.catalog': '目录', 'nav.path': '路线', 'nav.map': '知识图', 'nav.review': '复习',
    'ui.dark': '深色', 'ui.light': '浅色', 'ui.search': '搜索',
    'home.kick': '一个自用的学习工作台',
    'home.title1': '把一整门课，', 'home.title2': '从头读到尾。',
    'home.lede': '三条轨道：专业、应用、通识。没有门禁，跳着读也不会卡住；想按顺序走，就有一条从零开始的完整路线。',
    'home.start': '从零开始', 'home.browse': '浏览全部学科',
    'home.spec': '当前样本',
    'home.spec.1': '学科', 'home.spec.2': '概念', 'home.spec.3': '讲', 'home.spec.4': '语言',
    'home.cont.kick': '继续学习', 'home.cont.title': '第 12 讲 · 反向传播',
    'home.cont.sub': '深度学习 · 专业模式 · 已读 38%', 'home.cont.btn': '继续',
    'home.tracks.kick': '同一门课，三种讲法',
    'home.tracks.title': '三种模式',
    'home.tracks.note': '内容事实层共用一份，讲解层按模式分版本。',
    'home.subjects.kick': '学科库',
    'home.subjects.title': '从共同前置出发',
    'home.subjects.note': '初等数学是所有方向的共同前置；从这里开始，去哪里由你决定。',
    'home.study.kick': '内容预览',
    'home.study.title': '这一页在讲什么',
    'home.study.note': '真实的讲次、真实的依赖、真实的复习卡。互动只是外壳，内容才是主体。',
    'path.kick': '推荐路线', 'path.sub': '一条从零开始的顺序。它不是门禁，任何一讲都可以直接打开。',
    'path.summary': '讲', 'path.concepts': '概念',
    'path.why': '为什么这样排', 'path.why.text': '前置关系来自依赖图，顺序由拓扑排序生成。',
    'path.free': '自由跳读', 'path.free.text': '所有内容默认开放。缺少前置时，阅读页会给一张可折叠的速览卡，而不是拦住你。',
    'path.progress': '这条路线',
    'path.empty.title': '这个学科还没有该模式的路线',
    'path.empty.text': '目前深度学习、数学分析、线性代数已有首批讲次，其余学科的路线正在整理。',
    'path.empty.btn': '看深度学习的通识路线',
    'reader.prereq': '本讲会用到的前置', 'reader.expand': '展开速览', 'reader.collapse': '收起',
    'reader.gap': '先补这两讲',
    'reader.toc': '本讲目录', 'reader.concepts': '本讲涉及',
    'reader.mastery': '掌握度', 'reader.nextdue': '下次复习',
    'reader.pre': '前置', 'reader.next': '后续',
    'reader.langnote': '正文与人名由同一份概念表驱动，中英切换不会改变术语。',
    'reader.size': '字号', 'reader.openconcept': '打开这个概念',
    'map.kick': '知识关联', 'map.title': '概念不是孤岛',
    'map.sub': '点击任一节点，查看前置、被用于和所属路线。',
    'map.legend.math': '数学', 'map.legend.ai': 'AI', 'map.legend.cs': '计算机',
    'map.side.title': '怎么读这张图',
    'map.side.text': '箭头从前提指向后续。它只用于生成顺序和提示，不限制你能打开哪一页。',
    'review.kick': '长期记忆', 'review.title': '复习，而不是重读',
    'review.sub': '读完不等于掌握。这里记录的是每个概念的掌握概率与下次到期时间。',
    'review.th.concept': '概念', 'review.th.mastery': '掌握度', 'review.th.due': '下次到期', 'review.th.when': '状态',
    'review.card.title': '为什么不是读完就算学会',
    'review.card.text': '阅读带来“我懂了”的错觉，提取练习才会留下记忆。到期复习把旧结论重新验证一次。',
    'review.card.btn': '开始今天的复习',
    'common.demo': '概念原型 · 示例数据'
  },
  en: {
    'nav.home': 'Home', 'nav.catalog': 'Catalogue', 'nav.path': 'Path', 'nav.map': 'Map', 'nav.review': 'Review',
    'ui.dark': 'Dark', 'ui.light': 'Light', 'ui.search': 'Search',
    'home.kick': 'A personal study workspace',
    'home.title1': 'Read a whole course,', 'home.title2': 'from the first page to the last.',
    'home.lede': 'Three tracks: mastery, applied, literacy. No gates — you can jump around. If you want order, there is a complete path from zero.',
    'home.start': 'Start from zero', 'home.browse': 'Browse all subjects',
    'home.spec': 'Current sample',
    'home.spec.1': 'Subjects', 'home.spec.2': 'Concepts', 'home.spec.3': 'Lectures', 'home.spec.4': 'Languages',
    'home.cont.kick': 'Continue', 'home.cont.title': 'Lecture 12 · Backpropagation',
    'home.cont.sub': 'Deep Learning · Mastery · 38% read', 'home.cont.btn': 'Resume',
    'home.tracks.kick': 'One subject, three ways',
    'home.tracks.title': 'Three modes',
    'home.tracks.note': 'The fact layer is shared. Only the explanation layer is versioned.',
    'home.subjects.kick': 'Library',
    'home.subjects.title': 'Start from the common foundation',
    'home.subjects.note': 'Elementary mathematics is the shared prerequisite. Where you go next is your call.',
    'home.study.kick': 'Content preview',
    'home.study.title': 'What a page actually holds',
    'home.study.note': 'Real lectures, real prerequisites, real review cards. The interaction is the shell; the content is the substance.',
    'path.kick': 'Recommended path', 'path.sub': 'A sequence from zero. It is a suggestion, not a lock — every lecture can be opened directly.',
    'path.summary': 'lectures', 'path.concepts': 'concepts',
    'path.why': 'Why this order', 'path.why.text': 'Prerequisites come from the dependency graph; the order is a topological sort.',
    'path.free': 'Free browsing', 'path.free.text': 'Everything is open by default. Missing background shows a collapsible primer, never a wall.',
    'path.progress': 'This path',
    'path.empty.title': 'No route in this mode yet',
    'path.empty.text': 'Deep Learning, Mathematical Analysis, and Linear Algebra have their first lectures; the rest are still being prepared.',
    'path.empty.btn': 'See the literacy route for Deep Learning',
    'reader.prereq': 'Prerequisites for this lecture', 'reader.expand': 'Expand primer', 'reader.collapse': 'Collapse',
    'reader.gap': 'Study these first',
    'reader.toc': 'On this page', 'reader.concepts': 'Concepts here',
    'reader.mastery': 'Mastery', 'reader.nextdue': 'Next review',
    'reader.pre': 'Prerequisite', 'reader.next': 'Leads to',
    'reader.langnote': 'Body text and terms come from one concept table, so switching language never changes terminology.',
    'reader.size': 'Text size', 'reader.openconcept': 'Open concept',
    'map.kick': 'Knowledge graph', 'map.title': 'Concepts are not islands',
    'map.sub': 'Click any node to see prerequisites, dependents, and the route it belongs to.',
    'map.legend.math': 'Mathematics', 'map.legend.ai': 'AI', 'map.legend.cs': 'Computer Science',
    'map.side.title': 'How to read this',
    'map.side.text': 'Arrows point from prerequisite to dependent. The graph generates order and hints; it never blocks a page.',
    'review.kick': 'Long-term memory', 'review.title': 'Review, not reread',
    'review.sub': 'Finishing is not mastery. This page tracks each concept’s mastery probability and next due date.',
    'review.th.concept': 'Concept', 'review.th.mastery': 'Mastery', 'review.th.due': 'Next due', 'review.th.when': 'Status',
    'review.card.title': 'Why reading is not learning',
    'review.card.text': 'Reading creates the illusion of understanding. Retrieval practice is what stays. Spaced review re-verifies old conclusions.',
    'review.card.btn': 'Start today’s review',
    'common.demo': 'Concept prototype · sample data'
  }
};

export const NOTE_EN = {
  '函数、图象、不等式': 'Functions, graphs, inequalities',
  'ε-δ 的直觉版本': 'An intuitive take on ε-δ',
  '从切线走到梯度': 'From tangent lines to gradients',
  '形状、行与列、批量运算': 'Shapes, rows, columns, batched ops',
  '学习率与更新公式': 'Learning rate and the update rule',
  '误差怎么原路退回去': 'How the error travels back',
  '动量、Adam 与学习率调度': 'Momentum, Adam, and schedules',
  '前向与反向的执行顺序': 'Execution order of forward and backward',
  '局部性与权重共享': 'Locality and weight sharing',
  '循环网络与长程依赖': 'Recurrent nets and long-range dependencies',
  '用矩阵运算做加权检索': 'Weighted lookup with matrix ops',
  '不用框架，自己实现前向与反向': 'Implement forward and backward without a framework',
  '维度对不上时怎么排查': 'Debugging shape mismatches',
  '加载、推理、批量处理': 'Loading, inference, batching',
  '数据、标签、训练轮次': 'Data, labels, epochs',
  '过拟合、数据泄漏、指标选择': 'Overfitting, leakage, metric choice',
  '把输入整理成模型能吃的形状': 'Shaping inputs the model can eat',
  '延迟、显存、并发': 'Latency, memory, concurrency',
  '从例子中调整参数，而不是被写入规则': 'Adjusting parameters from examples, not writing rules',
  '很多层简单的变换叠起来': 'Many simple transformations stacked',
  '误差反传，参数微调': 'Error flows back, parameters nudge',
  '分布内很强，分布外很脆': 'Strong in-distribution, brittle outside',
  '算力、数据、版权与偏见': 'Compute, data, copyright, bias',
  '方向、长度、线性组合': 'Direction, length, linear combinations',
  '把变换写成表格': 'Writing a transformation as a table',
  '面积、体积与塌缩': 'Area, volume, collapse',
  '变换中不改变方向的那些线': 'The lines a transform does not rotate',
  '最小二乘的几何解释': 'Least squares, geometrically',
  '用 SVD 保留主要成分': 'Keep the main components with SVD',
  '从直观到 ε-δ': 'From intuition to ε-δ',
  '切线、变化率、链式法则': 'Tangents, rates, chain rule',
  '证明题的起点': 'The starting point for proofs',
  '换元、分部、反常积分': 'Substitution, by parts, improper integrals',
  '收敛判别与泰勒展开': 'Convergence tests and Taylor expansion',
  '协议、分层与抓包': 'Protocols, layers, packet capture',
  '密钥交换与证书': 'Key exchange and certificates',
  '会话、令牌、权限模型': 'Sessions, tokens, permission models',
  '注入、越权、SSRF': 'Injection, privilege escalation, SSRF',
  '流程、工具与报告': 'Process, tooling, reporting',
  '数组、哈希、树、图': 'Arrays, hashing, trees, graphs',
  '拆分、缓存、一致性': 'Decomposition, caching, consistency',
  '分层、事件驱动、六边形': 'Layered, event-driven, hexagonal',
  '单元、集成、契约': 'Unit, integration, contract',
  '容器、监控、回滚': 'Containers, monitoring, rollback',
  '运算律、因式分解': 'Laws of operations, factoring',
  '一次、二次、含参': 'Linear, quadratic, parametric',
  '定义域、单调性、图象': 'Domain, monotonicity, graphs',
  '相似、圆、证明': 'Similarity, circles, proofs',
  '恒等变换与解三角形': 'Identities and solving triangles'
};

export const PREREQ = [
  {
    id: 'chain', zh: '链式法则', en: 'Chain Rule',
    def: '复合函数的导数等于各层导数相乘。f(g(x)) 的导数是 f′(g(x))·g′(x)。',
    defEn: 'The derivative of a composite function is the product of the layer derivatives: f′(g(x))·g′(x).'
  },
  {
    id: 'matrix', zh: '矩阵乘法', en: 'Matrix Multiplication',
    def: '行与列逐项相乘再相加。结果的第 i 行第 j 列，来自左矩阵第 i 行和右矩阵第 j 列。',
    defEn: 'Rows meet columns: entry (i, j) of the result is the dot product of row i on the left and column j on the right.'
  }
];

export const REVIEW = [
  { id: 'matrix', mastery: 82, due: '今天', dueEn: 'Today', when: '到期', whenEn: 'Due' },
  { id: 'chain', mastery: 64, due: '明天', dueEn: 'Tomorrow', when: '第 2 天', whenEn: 'Day 2' },
  { id: 'grad', mastery: 41, due: '3 天后', dueEn: 'In 3 days', when: '第 3 天', whenEn: 'Day 3' },
  { id: 'backprop', mastery: 12, due: '未排期', dueEn: 'Unscheduled', when: '新学', whenEn: 'New' },
  { id: 'calc', mastery: 93, due: '7 天后', dueEn: 'In 7 days', when: '第 7 天', whenEn: 'Day 7' }
];

export const LECTURE = {
  zh: {
    kicker: '第 12 讲 · 深度学习 · 专业模式',
    title: '反向传播',
    sub: '误差是怎么原路退回去的',
    meta: ['阅读 12 分钟', '需要 链式法则 · 矩阵乘法', '掌握级'],
    sections: [
      {
        id: 'goal', label: '01', title: '本讲目标',
        html: '<p class="lead">学完这一讲，你能用一句话解释反向传播在算什么，并且能手算一个两层网络里每个参数的梯度。</p><p>不需要背公式。我们只做三件事：看清要解决的问题、建立一句直觉、把直觉落成一次手算。</p>'
      },
      {
        id: 'recap', label: '02', title: '三行回顾',
        html: '<ul class="recap"><li>损失函数衡量的是“预测离目标有多远”。</li><li>梯度告诉我们：参数往哪个方向动一点，损失变化最快。</li><li>还没解决的问题是——网络一层套一层时，每个参数的梯度怎么算。</li></ul>'
      },
      {
        id: 'problem', label: '03', title: '问题',
        html: '<p>单层模型可以直接求导。但真实的网络有几十层、几百万个参数。如果对每个参数单独求一次导，计算量大到无法接受。</p><p>反向传播解决的正是这件事：<strong>一次前向、一次反向，把所有参数的梯度一次算完。</strong></p><p>它用的全部数学工具，只有一条：链式法则。</p>'
      },
      {
        id: 'intuition', label: '04', title: '直觉',
        html: '<p>把网络想成一条流水线。每个工人只知道自己收到什么、交出什么，不知道整条线在做什么。</p><p>现在成品出了问题。误差从最后一道工序开始往回走，每个工人只回答一个问题：<strong>“我手上这个动作，调整一点，最终误差会变多少？”</strong></p><p>这就是链式法则在做的事：局部导数一层层相乘，把最终误差的责任分摊到每一个参数上。</p>'
      },
      {
        id: 'example', label: '05', title: '手算一次',
        html: '<p>设输入 <em>x</em> = 1，第一层权重 <em>w</em><sub>1</sub> = 2，第二层权重 <em>w</em><sub>2</sub> = 3，目标值 <em>y</em> = 10。网络只有两层，没有激活函数。</p>' +
          '<div class="table-wrap"><table><thead><tr><th>步骤</th><th>计算</th><th>结果</th></tr></thead><tbody>' +
          '<tr><td>前向：隐层</td><td>h = w₁ · x</td><td class="num">2</td></tr>' +
          '<tr><td>前向：输出</td><td>o = w₂ · h</td><td class="num">6</td></tr>' +
          '<tr><td>损失</td><td>L = (o − y)²</td><td class="num">16</td></tr>' +
          '<tr><td>输出层梯度</td><td>∂L/∂o = 2(o − y)</td><td class="num">−8</td></tr>' +
          '<tr><td>w₂ 的梯度</td><td>∂L/∂w₂ = ∂L/∂o · h</td><td class="num">−16</td></tr>' +
          '<tr><td>隐层梯度</td><td>∂L/∂h = ∂L/∂o · w₂</td><td class="num">−24</td></tr>' +
          '<tr><td>w₁ 的梯度</td><td>∂L/∂w₁ = ∂L/∂h · x</td><td class="num">−24</td></tr>' +
          '</tbody></table></div>' +
          '<span class="fml">∂L/∂w₂ = ∂L/∂o · ∂o/∂w₂　　∂L/∂w₁ = ∂L/∂o · ∂o/∂h · ∂h/∂w₁</span>' +
          '<p>取学习率 η = 0.01，两个参数都往梯度的反方向走：w₂ ← 3 + 0.16 = 3.16，w₁ ← 2 + 0.24 = 2.24。再前向一次，输出变成 7.08，损失从 <strong>16 降到 8.54</strong>。</p>' +
          '<p>注意两件事：梯度是负的，所以参数是加的；w₂ 的梯度比 w₁ 小，因为它离输出更近，承担的误差责任更少。</p>'
      },
      {
        id: 'myths', label: '06', title: '三个常见误解',
        html: '<div class="myth"><b>反向传播是一种新的学习算法。</b><span>它只是求梯度的方法。真正更新参数的是梯度下降或它的变体。</span></div>' +
          '<div class="myth"><b>反向传播要重新跑一遍前向。</b><span>它复用前向缓存的中间结果，这也是它比逐个求导快的原因。</span></div>' +
          '<div class="myth"><b>梯度方向就是参数该走的方向。</b><span>梯度指向损失上升最快的方向。我们要降低损失，所以往反方向走。</span></div>'
      },
      {
        id: 'practice', label: '07', title: '练习',
        html: '<div class="ex"><b>1 · 照着做</b><p>x = 3，w₁ = 1，w₂ = 2，y = 8，求 ∂L/∂w₁。</p><details><summary>看答案</summary><p>h = 3，o = 6，L = 4，∂L/∂o = −4，∂L/∂h = −8，∂L/∂w₁ = −8。</p></details></div>' +
          '<div class="ex"><b>2 · 变式</b><p>如果把隐层换成 sigmoid 激活，链式法则要多乘哪一项？</p><details><summary>看答案</summary><p>多乘 σ′(h)。每一层非线性都会在链上增加一个局部导数，这就是“链”的含义。</p></details></div>' +
          '<div class="ex"><b>3 · 迁移</b><p>为什么反向传播必须保存前向的中间结果？不用缓存会怎样？</p><details><summary>看答案</summary><p>反向每一层都要用到前向的输入和输出。不缓存就得重算，时间换空间；缓存则是空间换时间。</p></details></div>' +
          '<details class="formal"><summary>严格表述</summary><p>对复合函数 L = f(g(x))，有 dL/dx = (dL/dg)(dg/dx)。反向传播把这个规则按计算图的逆拓扑序应用一遍：每个节点只负责把自己的局部导数乘上来自上游的梯度。中间结果被缓存，因此总计算量与前向同一量级。</p></details>'
      }
    ],
    prev: { title: '梯度下降', href: '#/path/dl/mastery' },
    next: { title: '优化器', href: '#/path/dl/mastery' }
  },
  en: {
    kicker: 'Lecture 12 · Deep Learning · Mastery',
    title: 'Backpropagation',
    sub: 'How error travels back through the network',
    meta: ['12 min read', 'Requires chain rule · matrix multiplication', 'Mastery level'],
    sections: [
      {
        id: 'goal', label: '01', title: 'Goal',
        html: '<p class="lead">By the end of this lecture you can explain in one sentence what backpropagation computes, and hand-calculate the gradient of every parameter in a two-layer network.</p><p>No formulas to memorise. Three moves: see the problem, build one intuition, then turn it into a hand calculation.</p>'
      },
      {
        id: 'recap', label: '02', title: 'Three-line recap',
        html: '<ul class="recap"><li>A loss function measures how far a prediction is from its target.</li><li>A gradient tells you which way to nudge a parameter to change the loss fastest.</li><li>The open question: when layers are stacked, how do we get the gradient of every parameter?</li></ul>'
      },
      {
        id: 'problem', label: '03', title: 'The problem',
        html: '<p>A single layer can be differentiated directly. A real network has dozens of layers and millions of parameters. Differentiating each one separately is computationally out of reach.</p><p>Backpropagation solves exactly this: <strong>one forward pass, one backward pass, every gradient at once.</strong></p><p>It uses exactly one mathematical tool: the chain rule.</p>'
      },
      {
        id: 'intuition', label: '04', title: 'Intuition',
        html: '<p>Picture an assembly line. Each worker knows only what arrives and what leaves. No one sees the whole line.</p><p>Then the finished product comes out wrong. Error travels back from the last station, and each worker answers one question: <strong>“If I change my step a little, how much does the final error change?”</strong></p><p>That is the chain rule at work: local derivatives multiplied layer by layer, spreading responsibility for the error across every parameter.</p>'
      },
      {
        id: 'example', label: '05', title: 'Worked by hand',
        html: '<p>Take input <em>x</em> = 1, first weight <em>w</em><sub>1</sub> = 2, second weight <em>w</em><sub>2</sub> = 3, target <em>y</em> = 10. Two layers, no activation.</p>' +
          '<div class="table-wrap"><table><thead><tr><th>Step</th><th>Computation</th><th>Result</th></tr></thead><tbody>' +
          '<tr><td>Forward: hidden</td><td>h = w₁ · x</td><td class="num">2</td></tr>' +
          '<tr><td>Forward: output</td><td>o = w₂ · h</td><td class="num">6</td></tr>' +
          '<tr><td>Loss</td><td>L = (o − y)²</td><td class="num">16</td></tr>' +
          '<tr><td>Output gradient</td><td>∂L/∂o = 2(o − y)</td><td class="num">−8</td></tr>' +
          '<tr><td>Gradient of w₂</td><td>∂L/∂w₂ = ∂L/∂o · h</td><td class="num">−16</td></tr>' +
          '<tr><td>Hidden gradient</td><td>∂L/∂h = ∂L/∂o · w₂</td><td class="num">−24</td></tr>' +
          '<tr><td>Gradient of w₁</td><td>∂L/∂w₁ = ∂L/∂h · x</td><td class="num">−24</td></tr>' +
          '</tbody></table></div>' +
          '<span class="fml">∂L/∂w₂ = ∂L/∂o · ∂o/∂w₂　　∂L/∂w₁ = ∂L/∂o · ∂o/∂h · ∂h/∂w₁</span>' +
          '<p>With learning rate η = 0.01, both parameters step against the gradient: w₂ ← 3 + 0.16 = 3.16, w₁ ← 2 + 0.24 = 2.24. One more forward pass gives 7.08, so the loss drops from <strong>16 to 8.54</strong>.</p>' +
          '<p>Two things to notice: gradients are negative, so parameters increase; and w₂ has a smaller gradient than w₁ because it sits closer to the output and carries less of the error.</p>'
      },
      {
        id: 'myths', label: '06', title: 'Three misconceptions',
        html: '<div class="myth"><b>Backpropagation is a new learning algorithm.</b><span>It only computes gradients. Gradient descent, or a variant of it, is what actually updates the weights.</span></div>' +
          '<div class="myth"><b>Backpropagation runs a second forward pass.</b><span>It reuses the intermediate results cached during the forward pass. That is why it is so much cheaper than differentiating each parameter separately.</span></div>' +
          '<div class="myth"><b>The gradient points where the parameter should go.</b><span>The gradient points uphill. We want the loss to fall, so we step in the opposite direction.</span></div>'
      },
      {
        id: 'practice', label: '07', title: 'Practice',
        html: '<div class="ex"><b>1 · Follow the pattern</b><p>x = 3, w₁ = 1, w₂ = 2, y = 8. Compute ∂L/∂w₁.</p><details><summary>Show answer</summary><p>h = 3, o = 6, L = 4, ∂L/∂o = −4, ∂L/∂h = −8, ∂L/∂w₁ = −8.</p></details></div>' +
          '<div class="ex"><b>2 · Variation</b><p>If the hidden layer used sigmoid, which extra factor appears in the chain?</p><details><summary>Show answer</summary><p>σ′(h). Every non-linearity adds one local derivative to the chain — that is the “chain” in chain rule.</p></details></div>' +
          '<div class="ex"><b>3 · Transfer</b><p>Why must backpropagation keep the forward intermediate results? What happens without caching?</p><details><summary>Show answer</summary><p>Every backward step needs the forward inputs and outputs. Without a cache you recompute them: time traded for memory. With a cache, memory is traded for time.</p></details></div>' +
          '<details class="formal"><summary>Formal statement</summary><p>For a composite function L = f(g(x)), dL/dx = (dL/dg)(dg/dx). Backpropagation applies this rule in reverse topological order of the computation graph: each node multiplies its local derivative by the gradient arriving from upstream. Intermediates are cached, so the total cost stays the same order as the forward pass.</p></details>'
      }
    ],
    prev: { title: 'Gradient descent', href: '#/path/dl/mastery' },
    next: { title: 'Optimizers', href: '#/path/dl/mastery' }
  }
};

export const LECTURES = {
  backprop: {
    subject: 'dl', mode: 'mastery',
    concepts: ['backprop', 'chain', 'grad', 'matrix'],
    prereq: ['chain', 'matrix'],
    related: ['chain', 'matrix', 'grad'],
    ...LECTURE
  },
  'analysis-set': {
    subject: 'analysis', mode: 'mastery',
    concepts: ['set', 'setops', 'cartesian'],
    prereq: ['elem'],
    related: ['elem', 'set', 'setops'],
    zh: {
      kicker: '第 1 讲 · 数学分析 · 专业模式',
      title: '集合与运算',
      sub: '先把“属于”说清楚',
      meta: ['阅读 14 分钟', '需要 初等数学', '掌握级'],
      sections: [
        {
          id: 'goal', label: '01', title: '本讲目标',
          html: '<p class="lead">学完这一讲，你能用集合的语言准确说出“哪些对象属于某个范围”，并独立完成子集判断、集合运算和 De Morgan 公式的证明。</p><p>这一讲只做三件事：把集合说清楚、把运算写清楚、把“证明两个集合相等”变成一套固定动作。</p>'
        },
        {
          id: 'recap', label: '02', title: '三行回顾',
          html: '<ul class="recap"><li>数学分析研究的是函数，而函数的定义域和值域都是集合。</li><li>所以第一步不是极限，而是把“集合”和“属于”这两个词说清楚。</li><li>后面的极限、连续、开集，都会用同一套语言重写。</li></ul>'
        },
        {
          id: 'concept', label: '03', title: '集合与元素',
          html: '<p><strong>集合</strong>是具有某种确定性质的对象汇成的整体，这些对象叫<strong>元素</strong>。若 x 是 S 的元素，记作 x ∈ S；否则记作 x ∉ S。</p>' +
            '<div class="myth"><b>确定性</b><span>任一对象是否属于这个集合，必须能判断。不能出现“可能属于”的模糊地带。</span></div>' +
            '<div class="myth"><b>互异性</b><span>同一个元素重复写，不会产生新元素。{a, a, b} 就是 {a, b}。</span></div>' +
            '<div class="myth"><b>无序性</b><span>元素没有先后。{a, b} 与 {b, a} 是同一个集合。</span></div>' +
            '<p>常用数集：正整数集 N*、整数集 Z、有理数集 Q、实数集 R。集合里的对象不必是数，也可以是颜色、字母、函数，甚至别的集合。</p>'
        },
        {
          id: 'notation', label: '04', title: '两种表示法',
          html: '<div class="table-wrap"><table><thead><tr><th>方法</th><th>写法</th><th>例子</th><th>注意</th></tr></thead><tbody>' +
            '<tr><td>列举法</td><td>A = {a, b, c}</td><td>{红, 绿, 蓝}</td><td>元素可数，或规律足够明确</td></tr>' +
            '<tr><td>描述法</td><td>S = { x | x 满足 P }</td><td>{ x ∈ R | x > 0 }</td><td>竖线左边写代表元素，右边写条件</td></tr>' +
            '</tbody></table></div>' +
            '<p>无限但有规律的集合，列举法也可以写开头和通项：N* = {1, 2, 3, …}。</p>' +
            '<p>有理数集写成 Q = { p/q | p, q ∈ Z, q ≠ 0 } 时，要先说明 p、q 取自哪里，否则条件不完整。竖线两边也不能反：左边是“谁”，右边是“它要满足什么”。</p>'
        },
        {
          id: 'subset', label: '05', title: '子集、相等与计数',
          html: '<p>设 S、T 是两个集合。若 S 的每个元素都属于 T，即对任意 x，x ∈ S ⇒ x ∈ T，则称 S 是 T 的<strong>子集</strong>，记作 S ⊆ T。</p>' +
            '<div class="table-wrap"><table><thead><tr><th>概念</th><th>条件</th><th>记号</th></tr></thead><tbody>' +
            '<tr><td>子集</td><td>每个 x ∈ S 都有 x ∈ T</td><td>S ⊆ T</td></tr>' +
            '<tr><td>真子集</td><td>S ⊆ T 且 S ≠ T</td><td>S ⊂ T</td></tr>' +
            '<tr><td>相等</td><td>S ⊆ T 且 T ⊆ S</td><td>S = T</td></tr>' +
            '</tbody></table></div>' +
            '<p><strong>空集 ∅</strong> 不含任何元素，但它是任何集合的子集；任何集合也是自身的子集。</p>' +
            '<span class="formula-line">S = T ⇔ S ⊆ T 且 T ⊆ S</span>' +
            '<p>这不是一句口号，而是证明集合相等的标准动作——两个方向各证一次。计数：含 n 个元素的集合有 <strong>2ⁿ</strong> 个子集，<strong>2ⁿ − 1</strong> 个真子集。理由：每个元素都有“选”或“不选”两种状态；去掉“全选”得到的自身，剩下 2ⁿ − 1 个真子集。</p>'
        },
        {
          id: 'ops', label: '06', title: '四种基本运算',
          html: '<div class="table-wrap"><table><thead><tr><th>运算</th><th>记号</th><th>元素条件</th><th>例（A={a,b,c}，B={b,c,d,e}）</th></tr></thead><tbody>' +
            '<tr><td>并</td><td>A ∪ B</td><td>x ∈ A 或 x ∈ B</td><td>{a, b, c, d, e}</td></tr>' +
            '<tr><td>交</td><td>A ∩ B</td><td>x ∈ A 且 x ∈ B</td><td>{b, c}</td></tr>' +
            '<tr><td>差</td><td>A \\ B</td><td>x ∈ A 且 x ∉ B</td><td>{a}</td></tr>' +
            '<tr><td>补</td><td>Aᶜ</td><td>x ∈ X 且 x ∉ A</td><td>需先指定全集 X</td></tr>' +
            '</tbody></table></div>' +
            '<div class="venn-wrap"><svg viewBox="0 0 420 170" role="img" aria-label="两个集合的并、交、差示意">' +
            '<circle cx="165" cy="80" r="58" fill="var(--accent)" fill-opacity="0.10" stroke="var(--line)"/>' +
            '<circle cx="255" cy="80" r="58" fill="var(--accent)" fill-opacity="0.10" stroke="var(--line)"/>' +
            '<text x="120" y="85" font-size="14" fill="var(--ink)" text-anchor="middle">A</text>' +
            '<text x="300" y="85" font-size="14" fill="var(--ink)" text-anchor="middle">B</text>' +
            '<text x="210" y="85" font-size="12" fill="var(--ink-2)" text-anchor="middle">A∩B</text>' +
            '</svg><div class="venn-cap">两圆覆盖是并集，重叠区是交集，左侧月牙是 A \\ B。</div></div>' +
            '<span class="formula-line">A \\ B = { x | x ∈ A 且 x ∉ B }　　Aᶜ = { x ∈ X | x ∉ A }</span>' +
            '<p>注意：差和补不是一回事。A \\ B 不需要全集；Aᶜ 必须先在某个全集 X 里说话。离开全集谈补集，是没有定义的。</p>'
        },
        {
          id: 'laws', label: '07', title: '运算律与 De Morgan',
          html: '<div class="table-wrap"><table><thead><tr><th>运算律</th><th>并</th><th>交</th></tr></thead><tbody>' +
            '<tr><td>交换</td><td>A ∪ B = B ∪ A</td><td>A ∩ B = B ∩ A</td></tr>' +
            '<tr><td>结合</td><td>A ∪ (B ∪ D) = (A ∪ B) ∪ D</td><td>A ∩ (B ∩ D) = (A ∩ B) ∩ D</td></tr>' +
            '<tr><td>分配</td><td>A ∪ (B ∩ D) = (A ∪ B) ∩ (A ∪ D)</td><td>A ∩ (B ∪ D) = (A ∩ B) ∪ (A ∩ D)</td></tr>' +
            '</tbody></table></div>' +
            '<span class="formula-line">(A ∪ B)ᶜ = Aᶜ ∩ Bᶜ　　(A ∩ B)ᶜ = Aᶜ ∪ Bᶜ</span>' +
            '<p><strong>De Morgan 对偶律</strong>不要背，做翻译。以第二个为例：x ∈ (A ∩ B)ᶜ ⇔ x ∉ A ∩ B ⇔ 并非“x ∈ A 且 x ∈ B” ⇔ x ∉ A 或 x ∉ B ⇔ x ∈ Aᶜ 或 x ∈ Bᶜ ⇔ x ∈ Aᶜ ∪ Bᶜ。每一步都是把“属于/不属于”翻译成逻辑连接词，最后再翻译回集合。两个方向都走一遍，等式就成立。</p>'
        },
        {
          id: 'cartesian', label: '08', title: 'Descartes 积',
          html: '<p><strong>有序对</strong> (x, y) 讲究次序：x 来自第一个集合，y 来自第二个集合。</p>' +
            '<span class="formula-line">A × B = { (x, y) | x ∈ A 且 y ∈ B }</span>' +
            '<div class="table-wrap"><table><thead><tr><th>工艺 \\ 颜色</th><th>红</th><th>绿</th><th>蓝</th></tr></thead><tbody>' +
            '<tr><td>抽纱</td><td>(红, 抽纱)</td><td>(绿, 抽纱)</td><td>(蓝, 抽纱)</td></tr>' +
            '<tr><td>提花</td><td>(红, 提花)</td><td>(绿, 提花)</td><td>(蓝, 提花)</td></tr>' +
            '<tr><td>印染</td><td>(红, 印染)</td><td>(绿, 印染)</td><td>(蓝, 印染)</td></tr>' +
            '<tr><td>刺绣</td><td>(红, 刺绣)</td><td>(绿, 刺绣)</td><td>(蓝, 刺绣)</td></tr>' +
            '</tbody></table></div>' +
            '<p>3 种颜色 × 4 种工艺 = 12 种窗帘品种。一般地，若 A 有 m 个元素、B 有 n 个元素，则 A × B 有 m × n 个元素。</p>' +
            '<p>R × R 记作 R²，就是平面直角坐标系；R × R × R 记作 R³，是空间直角坐标系。注意 A × B 与 B × A 一般不同，因为有序对的次序变了。</p>'
        },
        {
          id: 'myths', label: '09', title: '四个常见误解',
          html: '<div class="myth"><b>空集没有用。</b><span>空集是任何集合的子集，也是集合运算的边界。没有它，交集可能“无结果”，子集计数也会少一项。</span></div>' +
            '<div class="myth"><b>{a, b} 和 {b, a} 是两个集合。</b><span>集合无序。只有有序对 (a, b) 才讲次序；{a, b} = {b, a}。</span></div>' +
            '<div class="myth"><b>a 和 {a} 是一回事。</b><span>a 是元素，{a} 是集合。a ∈ {a} 成立；a ⊆ {a} 通常不成立，因为左边不是集合。</span></div>' +
            '<div class="myth"><b>A \\ B 等于 A ∩ Bᶜ。</b><span>只有在同一个全集 X 下、且 A、B 都是 X 的子集时才成立。A \\ B 本身不需要全集。</span></div>'
        },
        {
          id: 'practice', label: '10', title: '练习',
          html: '<div class="ex"><b>1 · 判断</b><p>∅ ⊆ {1, 2}？{1} ∈ {1, 2}？{1} ⊆ {1, 2}？</p><details><summary>看答案</summary><p>是；否，{1} 是集合不是元素；是。</p></details></div>' +
            '<div class="ex"><b>2 · 列举</b><p>写出 {a, b, c} 的全部子集，并数一数。</p><details><summary>看答案</summary><p>∅、{a}、{b}、{c}、{a,b}、{a,c}、{b,c}、{a,b,c}，共 8 个。</p></details></div>' +
            '<div class="ex"><b>3 · 证明</b><p>证明 (A ∩ B)ᶜ = Aᶜ ∪ Bᶜ。</p><details><summary>看答案</summary><p>取任意 x，把 x ∈ (A ∩ B)ᶜ 逐字翻译成“x ∉ A 或 x ∉ B”，再翻译成 x ∈ Aᶜ ∪ Bᶜ；反向再走一遍。</p></details></div>' +
            '<div class="ex"><b>4 · 计算</b><p>A = {1, 2}，B = {x, y}，求 A × B 与 B × A，并比较。</p><details><summary>看答案</summary><p>A × B = {(1,x), (1,y), (2,x), (2,y)}；B × A = {(x,1), (x,2), (y,1), (y,2)}。两者一般不相等。</p></details></div>' +
            '<div class="ex"><b>5 · 综合</b><p>全集 X = {1,2,3,4,5}，A = {1,2}，B = {2,3}，求 A \\ B、Aᶜ、A ∪ B、A ∩ B。</p><details><summary>看答案</summary><p>A \\ B = {1}；Aᶜ = {3,4,5}；A ∪ B = {1,2,3}；A ∩ B = {2}。</p></details></div>' +
            '<details class="formal"><summary>严格表述</summary><p>集合相等的证明模板：要证 S = T，先证 S ⊆ T（任取 x ∈ S，推出 x ∈ T），再证 T ⊆ S。幂集基数可用归纳法：n = 0 时只有 ∅；加入第 n+1 个元素 a 后，每个子集都有“不含 a”与“含 a”两种版本，数量翻倍，故为 2ⁿ。</p></details>'
        }
      ],
      prev: { title: '课程路线', href: '#/path/analysis/mastery' },
      next: { title: '映射', href: '#/path/analysis/mastery' }
    },
    en: {
      kicker: 'Lecture 1 · Mathematical Analysis · Mastery',
      title: 'Sets and Operations',
      sub: 'Make “belongs to” precise first',
      meta: ['14 min read', 'Requires elementary mathematics', 'Mastery level'],
      sections: [
        {
          id: 'goal', label: '01', title: 'Goal',
          html: '<p class="lead">By the end of this lecture you can say precisely which objects belong to a given range, and carry out subset checks, set operations, and a proof of De Morgan’s laws on your own.</p><p>Three moves only: make sets precise, make operations precise, and turn “prove two sets are equal” into a fixed routine.</p>'
        },
        {
          id: 'recap', label: '02', title: 'Three-line recap',
          html: '<ul class="recap"><li>Calculus studies functions, and both the domain and the range of a function are sets.</li><li>So the first step is not a limit; it is making “set” and “belongs to” precise.</li><li>Limits, continuity, and open sets will all be rewritten in the same language.</li></ul>'
        },
        {
          id: 'concept', label: '03', title: 'Sets and elements',
          html: '<p>A <strong>set</strong> is a collection of objects sharing a definite property. Those objects are its <strong>elements</strong>. If x is an element of S we write x ∈ S; otherwise x ∉ S.</p>' +
            '<div class="myth"><b>Definiteness</b><span>For any object, membership must be decidable. There is no “maybe belongs” zone.</span></div>' +
            '<div class="myth"><b>Distinctness</b><span>Repeating an element adds nothing. {a, a, b} is just {a, b}.</span></div>' +
            '<div class="myth"><b>No order</b><span>Order does not matter. {a, b} and {b, a} are the same set.</span></div>' +
            '<p>Common number sets: positive integers N*, integers Z, rationals Q, reals R. Elements need not be numbers: colours, letters, functions, even other sets are allowed.</p>'
        },
        {
          id: 'notation', label: '04', title: 'Two ways to write a set',
          html: '<div class="table-wrap"><table><thead><tr><th>Method</th><th>Form</th><th>Example</th><th>Watch out</th></tr></thead><tbody>' +
            '<tr><td>Roster</td><td>A = {a, b, c}</td><td>{red, green, blue}</td><td>Elements countable, or the pattern is clear</td></tr>' +
            '<tr><td>Set-builder</td><td>S = { x | x satisfies P }</td><td>{ x ∈ R | x > 0 }</td><td>Left of the bar: the element; right: the condition</td></tr>' +
            '</tbody></table></div>' +
            '<p>An infinite set with a clear pattern can also be opened up: N* = {1, 2, 3, …}.</p>' +
            '<p>When writing Q = { p/q | p, q ∈ Z, q ≠ 0 }, say where p and q come from, or the condition is incomplete. The two sides of the bar cannot be swapped: left is “who”, right is “what it must satisfy”.</p>'
        },
        {
          id: 'subset', label: '05', title: 'Subsets, equality, and counting',
          html: '<p>Let S and T be sets. If every element of S is in T — that is, for every x, x ∈ S ⇒ x ∈ T — then S is a <strong>subset</strong> of T, written S ⊆ T.</p>' +
            '<div class="table-wrap"><table><thead><tr><th>Concept</th><th>Condition</th><th>Notation</th></tr></thead><tbody>' +
            '<tr><td>Subset</td><td>Every x ∈ S also satisfies x ∈ T</td><td>S ⊆ T</td></tr>' +
            '<tr><td>Proper subset</td><td>S ⊆ T and S ≠ T</td><td>S ⊂ T</td></tr>' +
            '<tr><td>Equality</td><td>S ⊆ T and T ⊆ S</td><td>S = T</td></tr>' +
            '</tbody></table></div>' +
            '<p>The <strong>empty set ∅</strong> has no elements, yet it is a subset of every set; every set is also a subset of itself.</p>' +
            '<span class="formula-line">S = T ⇔ S ⊆ T and T ⊆ S</span>' +
            '<p>This is not a slogan; it is the standard proof routine — prove each direction once. Counting: a set with n elements has <strong>2ⁿ</strong> subsets and <strong>2ⁿ − 1</strong> proper subsets. Each element is either chosen or not; remove the full set itself and 2ⁿ − 1 remain.</p>'
        },
        {
          id: 'ops', label: '06', title: 'Four basic operations',
          html: '<div class="table-wrap"><table><thead><tr><th>Operation</th><th>Notation</th><th>Element condition</th><th>Example (A={a,b,c}, B={b,c,d,e})</th></tr></thead><tbody>' +
            '<tr><td>Union</td><td>A ∪ B</td><td>x ∈ A or x ∈ B</td><td>{a, b, c, d, e}</td></tr>' +
            '<tr><td>Intersection</td><td>A ∩ B</td><td>x ∈ A and x ∈ B</td><td>{b, c}</td></tr>' +
            '<tr><td>Difference</td><td>A \\ B</td><td>x ∈ A and x ∉ B</td><td>{a}</td></tr>' +
            '<tr><td>Complement</td><td>Aᶜ</td><td>x ∈ X and x ∉ A</td><td>Fix a universe X first</td></tr>' +
            '</tbody></table></div>' +
            '<div class="venn-wrap"><svg viewBox="0 0 420 170" role="img" aria-label="Union, intersection and difference of two sets">' +
            '<circle cx="165" cy="80" r="58" fill="var(--accent)" fill-opacity="0.10" stroke="var(--line)"/>' +
            '<circle cx="255" cy="80" r="58" fill="var(--accent)" fill-opacity="0.10" stroke="var(--line)"/>' +
            '<text x="120" y="85" font-size="14" fill="var(--ink)" text-anchor="middle">A</text>' +
            '<text x="300" y="85" font-size="14" fill="var(--ink)" text-anchor="middle">B</text>' +
            '<text x="210" y="85" font-size="12" fill="var(--ink-2)" text-anchor="middle">A∩B</text>' +
            '</svg><div class="venn-cap">The two circles together form the union; the overlap is the intersection; the left crescent is A \\ B.</div></div>' +
            '<span class="formula-line">A \\ B = { x | x ∈ A and x ∉ B }　　Aᶜ = { x ∈ X | x ∉ A }</span>' +
            '<p>Difference and complement are not the same. A \\ B needs no universe; Aᶜ only makes sense inside a fixed X.</p>'
        },
        {
          id: 'laws', label: '07', title: 'Laws and De Morgan',
          html: '<div class="table-wrap"><table><thead><tr><th>Law</th><th>Union</th><th>Intersection</th></tr></thead><tbody>' +
            '<tr><td>Commutative</td><td>A ∪ B = B ∪ A</td><td>A ∩ B = B ∩ A</td></tr>' +
            '<tr><td>Associative</td><td>A ∪ (B ∪ D) = (A ∪ B) ∪ D</td><td>A ∩ (B ∩ D) = (A ∩ B) ∩ D</td></tr>' +
            '<tr><td>Distributive</td><td>A ∪ (B ∩ D) = (A ∪ B) ∩ (A ∪ D)</td><td>A ∩ (B ∪ D) = (A ∩ B) ∪ (A ∩ D)</td></tr>' +
            '</tbody></table></div>' +
            '<span class="formula-line">(A ∪ B)ᶜ = Aᶜ ∩ Bᶜ　　(A ∩ B)ᶜ = Aᶜ ∪ Bᶜ</span>' +
            '<p><strong>De Morgan’s laws</strong>: do not memorise, translate. For the second law: x ∈ (A ∩ B)ᶜ ⇔ x ∉ A ∩ B ⇔ not (x ∈ A and x ∈ B) ⇔ x ∉ A or x ∉ B ⇔ x ∈ Aᶜ or x ∈ Bᶜ ⇔ x ∈ Aᶜ ∪ Bᶜ. Every step translates membership into a logical connective and back. Run both directions and the identity is proved.</p>'
        },
        {
          id: 'cartesian', label: '08', title: 'Cartesian product',
          html: '<p>An <strong>ordered pair</strong> (x, y) cares about order: x comes from the first set, y from the second.</p>' +
            '<span class="formula-line">A × B = { (x, y) | x ∈ A and y ∈ B }</span>' +
            '<div class="table-wrap"><table><thead><tr><th>Finish \\ Colour</th><th>Red</th><th>Green</th><th>Blue</th></tr></thead><tbody>' +
            '<tr><td>Gauze</td><td>(Red, Gauze)</td><td>(Green, Gauze)</td><td>(Blue, Gauze)</td></tr>' +
            '<tr><td>Jacquard</td><td>(Red, Jacquard)</td><td>(Green, Jacquard)</td><td>(Blue, Jacquard)</td></tr>' +
            '<tr><td>Print</td><td>(Red, Print)</td><td>(Green, Print)</td><td>(Blue, Print)</td></tr>' +
            '<tr><td>Embroidery</td><td>(Red, Embroidery)</td><td>(Green, Embroidery)</td><td>(Blue, Embroidery)</td></tr>' +
            '</tbody></table></div>' +
            '<p>3 colours × 4 finishes = 12 curtain varieties. In general, if A has m elements and B has n, then A × B has m × n elements.</p>' +
            '<p>R × R is written R², the plane; R × R × R is R³, space. Note that A × B and B × A generally differ, because the order of the pair changes.</p>'
        },
        {
          id: 'myths', label: '09', title: 'Four misconceptions',
          html: '<div class="myth"><b>The empty set is useless.</b><span>It is a subset of every set and the boundary case of set operations. Without it, an intersection could have no result and subset counting would lose a case.</span></div>' +
            '<div class="myth"><b>{a, b} and {b, a} are different sets.</b><span>Sets have no order. Only ordered pairs (a, b) care about order; {a, b} = {b, a}.</span></div>' +
            '<div class="myth"><b>a and {a} are the same thing.</b><span>a is an element; {a} is a set. a ∈ {a} holds; a ⊆ {a} usually does not, because the left side is not a set.</span></div>' +
            '<div class="myth"><b>A \\ B always equals A ∩ Bᶜ.</b><span>Only inside one universe X with A and B both subsets of X. A \\ B itself needs no universe.</span></div>'
        },
        {
          id: 'practice', label: '10', title: 'Practice',
          html: '<div class="ex"><b>1 · Decide</b><p>Is ∅ ⊆ {1, 2}? Is {1} ∈ {1, 2}? Is {1} ⊆ {1, 2}?</p><details><summary>Show answer</summary><p>Yes; no, {1} is a set, not an element; yes.</p></details></div>' +
            '<div class="ex"><b>2 · List</b><p>Write every subset of {a, b, c} and count them.</p><details><summary>Show answer</summary><p>∅, {a}, {b}, {c}, {a,b}, {a,c}, {b,c}, {a,b,c}: eight in total.</p></details></div>' +
            '<div class="ex"><b>3 · Prove</b><p>Prove (A ∩ B)ᶜ = Aᶜ ∪ Bᶜ.</p><details><summary>Show answer</summary><p>Take any x and translate x ∈ (A ∩ B)ᶜ into “x ∉ A or x ∉ B”, then into x ∈ Aᶜ ∪ Bᶜ; run the reverse direction too.</p></details></div>' +
            '<div class="ex"><b>4 · Compute</b><p>A = {1, 2}, B = {x, y}. Find A × B and B × A, then compare.</p><details><summary>Show answer</summary><p>A × B = {(1,x), (1,y), (2,x), (2,y)}; B × A = {(x,1), (x,2), (y,1), (y,2)}. They generally differ.</p></details></div>' +
            '<div class="ex"><b>5 · Combine</b><p>Universe X = {1,2,3,4,5}, A = {1,2}, B = {2,3}. Find A \\ B, Aᶜ, A ∪ B, A ∩ B.</p><details><summary>Show answer</summary><p>A \\ B = {1}; Aᶜ = {3,4,5}; A ∪ B = {1,2,3}; A ∩ B = {2}.</p></details></div>' +
            '<details class="formal"><summary>Formal statement</summary><p>Template for set equality: to prove S = T, first take x ∈ S and derive x ∈ T, then take x ∈ T and derive x ∈ S. For the power-set count, induct on n: with n = 0 only ∅ exists; adding an (n+1)-st element gives every subset a “without a” and “with a” version, doubling the count to 2ⁿ.</p></details>'
        }
      ],
      prev: { title: 'Course path', href: '#/path/analysis/mastery' },
      next: { title: 'Maps', href: '#/path/analysis/mastery' }
    }
  }
};

