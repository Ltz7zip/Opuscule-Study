/* ==========================================================================
   Opuscule — concept prototype logic
   All content is mock data. No network, no build step.
   ========================================================================== */

const SUBJECTS = [
  {
    id: 'dl', zh: '深度学习', en: 'Deep Learning', tag: 'AI',
    desc: '从感知机到注意力，把模型、训练与评估完整走一遍。',
    descEn: 'Models, training, and evaluation — from the perceptron to attention.',
    concepts: 42, units: 24, pre: ['elem', 'la'], modes: ['mastery', 'applied', 'literacy']
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

const MODES = {
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

const NOTE_EN = {
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

function subjectDesc(s) {
  return state.lang === 'en' ? (s.descEn || s.desc) : s.desc;
}

function modeDesc(m) {
  return state.lang === 'en' ? (m.descEn || m.desc) : m.desc;
}

function modePoints(m) {
  return state.lang === 'en' ? (m.pointsEn || m.points) : m.points;
}

function noteText(n) {
  return state.lang === 'en' ? (NOTE_EN[n] || n) : n;
}

const CONCEPTS = {
  elem: {
    zh: '初等数学', en: 'Elementary Mathematics', field: 'math',
    x: 40, y: 238, w: 120, h: 44,
    def: '代数运算、方程、函数与平面几何。它是所有方向的共同前置，本身不指向任何单一专业。',
    pre: [], usedBy: ['calc', 'la', 'disc']
  },
  calc: {
    zh: '高等数学', en: 'Calculus', field: 'math',
    x: 205, y: 120, w: 120, h: 44,
    def: '极限、导数、积分与级数。它提供描述变化率的语言，是梯度类方法的源头。',
    pre: ['elem'], usedBy: ['grad']
  },
  la: {
    zh: '线性代数', en: 'Linear Algebra', field: 'math',
    x: 205, y: 238, w: 120, h: 44,
    def: '向量、矩阵、线性变换与特征值。它把高维运算写成可批量计算的形状。',
    pre: ['elem'], usedBy: ['matrix']
  },
  disc: {
    zh: '离散数学', en: 'Discrete Mathematics', field: 'math',
    x: 205, y: 356, w: 120, h: 44,
    def: '逻辑、集合、图论与计数。它是算法与安全类课程的语言基础。',
    pre: ['elem'], usedBy: ['sec']
  },
  grad: {
    zh: '梯度下降', en: 'Gradient Descent', field: 'ai',
    x: 380, y: 120, w: 120, h: 44,
    def: '沿负梯度方向小步更新参数，使损失下降。步长由学习率控制。',
    pre: ['calc'], usedBy: ['backprop']
  },
  matrix: {
    zh: '矩阵乘法', en: 'Matrix Multiplication', field: 'math',
    x: 380, y: 238, w: 120, h: 44,
    def: '行与列逐项相乘再相加。结果的第 i 行第 j 列，来自左矩阵第 i 行和右矩阵第 j 列。',
    pre: ['la'], usedBy: ['backprop', 'dl']
  },
  chain: {
    zh: '链式法则', en: 'Chain Rule', field: 'math',
    x: 545, y: 46, w: 120, h: 44,
    def: '复合函数求导：外层导数乘以内层导数。f(g(x)) 的导数是 f′(g(x))·g′(x)。',
    pre: ['calc'], usedBy: ['backprop']
  },
  backprop: {
    zh: '反向传播', en: 'Backpropagation', field: 'ai',
    x: 545, y: 120, w: 120, h: 44,
    def: '从输出层向前，逐层用链式法则计算每个参数的梯度，复用前向缓存的中间结果。',
    pre: ['grad', 'chain', 'matrix'], usedBy: ['dl']
  },
  dl: {
    zh: '深度学习', en: 'Deep Learning', field: 'ai',
    x: 700, y: 190, w: 110, h: 44,
    def: '用多层可微函数拟合数据分布。核心是表示学习、梯度优化与规模化训练。',
    pre: ['backprop', 'matrix'], usedBy: []
  },
  sec: {
    zh: '网络安全', en: 'Cybersecurity', field: 'cs',
    x: 700, y: 330, w: 110, h: 44,
    def: '网络与系统安全的攻防方法，涵盖密码学、认证、漏洞与响应。',
    pre: ['disc'], usedBy: []
  }
};

const ROUTES = {
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
  }
};

const T = {
  zh: {
    'nav.library': '书库', 'nav.path': '路线', 'nav.map': '知识图', 'nav.review': '复习',
    'ui.dark': '深色', 'ui.light': '浅色',
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
    'path.kick': '推荐路线', 'path.sub': '一条从零开始的顺序。它不是门禁，任何一讲都可以直接打开。',
    'path.summary': '讲', 'path.concepts': '概念',
    'path.why': '为什么这样排', 'path.why.text': '前置关系来自依赖图，顺序由拓扑排序生成。',
    'path.free': '自由跳读', 'path.free.text': '所有内容默认开放。缺少前置时，阅读页会给一张可折叠的速览卡，而不是拦住你。',
    'path.progress': '这条路线', 'path.progress.text': '已完成 5 讲，在读第 6 讲。',
    'path.empty.title': '这个学科还没有该模式的路线',
    'path.empty.text': '原型里只演示了深度学习的三种路线。其他学科的路线正在整理。',
    'path.empty.btn': '看深度学习的通识路线',
    'reader.prereq': '本讲会用到的前置', 'reader.expand': '展开速览', 'reader.collapse': '收起',
    'reader.gap': '先补这两讲',
    'reader.toc': '本讲目录',
    'reader.concepts': '本讲涉及',
    'reader.mastery': '掌握度', 'reader.nextdue': '下次复习',
    'reader.pre': '前置', 'reader.next': '后续',
    'reader.langnote': '正文与人名由同一份概念表驱动，中英切换不会改变术语。',
    'reader.size': '字号',
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
    'nav.library': 'Library', 'nav.path': 'Path', 'nav.map': 'Map', 'nav.review': 'Review',
    'ui.dark': 'Dark', 'ui.light': 'Light',
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
    'path.kick': 'Recommended path', 'path.sub': 'A sequence from zero. It is a suggestion, not a lock — every lecture can be opened directly.',
    'path.summary': 'lectures', 'path.concepts': 'concepts',
    'path.why': 'Why this order', 'path.why.text': 'Prerequisites come from the dependency graph; the order is a topological sort.',
    'path.free': 'Free browsing', 'path.free.text': 'Everything is open by default. Missing background shows a collapsible primer, never a wall.',
    'path.progress': 'This path', 'path.progress.text': '5 lectures done, currently on lecture 6.',
    'path.empty.title': 'No route in this mode yet',
    'path.empty.text': 'This prototype only demonstrates all three routes for Deep Learning.',
    'path.empty.btn': 'See the literacy route for Deep Learning',
    'reader.prereq': 'Prerequisites for this lecture', 'reader.expand': 'Expand primer', 'reader.collapse': 'Collapse',
    'reader.gap': 'Study these first',
    'reader.toc': 'On this page',
    'reader.concepts': 'Concepts here',
    'reader.mastery': 'Mastery', 'reader.nextdue': 'Next review',
    'reader.pre': 'Prerequisite', 'reader.next': 'Leads to',
    'reader.langnote': 'Body text and terms come from one concept table, so switching language never changes terminology.',
    'reader.size': 'Text size',
    'map.kick': 'Knowledge graph', 'map.title': 'Concepts are not islands',
    'map.sub': 'Click any node to see prerequisites, dependents, and the route it belongs to.',
    'map.legend.math': 'Mathematics', 'map.legend.ai': 'AI', 'map.legend.cs': 'Computer Science',
    'map.side.title': 'How to read this',
    'map.side.text': 'Arrows point from prerequisite to dependent. The graph generates order and hints; it never blocks a page.',
    'review.kick': 'Long-term memory', 'review.title': 'Review, not reread',
    'review.sub': 'Finishing is not mastery. This page tracks each concept\u2019s mastery probability and next due date.',
    'review.th.concept': 'Concept', 'review.th.mastery': 'Mastery', 'review.th.due': 'Next due', 'review.th.when': 'Status',
    'review.card.title': 'Why reading is not learning',
    'review.card.text': 'Reading creates the illusion of understanding. Retrieval practice is what stays. Spaced review re-verifies old conclusions.',
    'review.card.btn': 'Start today\u2019s review',
    'common.demo': 'Concept prototype · sample data'
  }
};

const LECTURE = {
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
          '<table><thead><tr><th>步骤</th><th>计算</th><th>结果</th></tr></thead><tbody>' +
          '<tr><td>前向：隐层</td><td>h = w₁ · x</td><td class="num">2</td></tr>' +
          '<tr><td>前向：输出</td><td>o = w₂ · h</td><td class="num">6</td></tr>' +
          '<tr><td>损失</td><td>L = (o − y)²</td><td class="num">16</td></tr>' +
          '<tr><td>输出层梯度</td><td>∂L/∂o = 2(o − y)</td><td class="num">−8</td></tr>' +
          '<tr><td>w₂ 的梯度</td><td>∂L/∂w₂ = ∂L/∂o · h</td><td class="num">−16</td></tr>' +
          '<tr><td>隐层梯度</td><td>∂L/∂h = ∂L/∂o · w₂</td><td class="num">−24</td></tr>' +
          '<tr><td>w₁ 的梯度</td><td>∂L/∂w₁ = ∂L/∂h · x</td><td class="num">−24</td></tr>' +
          '</tbody></table>' +
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
          '<table><thead><tr><th>Step</th><th>Computation</th><th>Result</th></tr></thead><tbody>' +
          '<tr><td>Forward: hidden</td><td>h = w₁ · x</td><td class="num">2</td></tr>' +
          '<tr><td>Forward: output</td><td>o = w₂ · h</td><td class="num">6</td></tr>' +
          '<tr><td>Loss</td><td>L = (o − y)²</td><td class="num">16</td></tr>' +
          '<tr><td>Output gradient</td><td>∂L/∂o = 2(o − y)</td><td class="num">−8</td></tr>' +
          '<tr><td>Gradient of w₂</td><td>∂L/∂w₂ = ∂L/∂o · h</td><td class="num">−16</td></tr>' +
          '<tr><td>Hidden gradient</td><td>∂L/∂h = ∂L/∂o · w₂</td><td class="num">−24</td></tr>' +
          '<tr><td>Gradient of w₁</td><td>∂L/∂w₁ = ∂L/∂h · x</td><td class="num">−24</td></tr>' +
          '</tbody></table>' +
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

const PREREQ = [
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

const REVIEW = [
  { id: 'matrix', mastery: 82, due: '今天', dueEn: 'Today', when: '到期', whenEn: 'Due' },
  { id: 'chain', mastery: 64, due: '明天', dueEn: 'Tomorrow', when: '第 2 天', whenEn: 'Day 2' },
  { id: 'grad', mastery: 41, due: '3 天后', dueEn: 'In 3 days', when: '第 3 天', whenEn: 'Day 3' },
  { id: 'backprop', mastery: 12, due: '未排期', dueEn: 'Unscheduled', when: '新学', whenEn: 'New' },
  { id: 'calc', mastery: 93, due: '7 天后', dueEn: 'In 7 days', when: '第 7 天', whenEn: 'Day 7' }
];

/* ------------------------------------------------------------------ state */

const params = new URLSearchParams(location.search);

function lsGet(k) {
  try { return localStorage.getItem(k); } catch (e) { return null; }
}

function lsSet(k, v) {
  try { localStorage.setItem(k, v); } catch (e) { /* file:// or private mode */ }
}

const state = {
  lang: params.get('lang') || lsGet('opus.lang') || 'zh',
  theme: params.get('theme') || lsGet('opus.theme') || 'light',
  size: Number(lsGet('opus.size')) || 17
};

const REDUCE = window.matchMedia
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false;
if (!REDUCE) document.documentElement.classList.add('js-motion');

function t(key) {
  return (T[state.lang] && T[state.lang][key]) || T.zh[key] || key;
}

function name(obj) {
  return state.lang === 'en' ? obj.en : obj.zh;
}

/* ---------------------------------------------------------------- helpers */

function q(sel, root) { return (root || document).querySelector(sel); }
function qa(sel, root) { return Array.from((root || document).querySelectorAll(sel)); }

function modeLabel(m) { return state.lang === 'en' ? MODES[m].en : MODES[m].zh; }

function poly(tipX, tipY, ux, uy) {
  const px = -uy, py = ux;
  const bx = tipX - ux * 9, by = tipY - uy * 9;
  const pts = [tipX, tipY, bx + px * 3.6, by + py * 3.6, bx - px * 3.6, by - py * 3.6];
  return '<polygon class="ehead" points="' + pts.map(function (n) { return n.toFixed(1); }).join(' ') + '" fill="var(--ink-2)"/>';
}

function levelText(level) {
  const map = state.lang === 'en' ? { 3: 'Mastery', 2: 'Understand', 1: 'Aware' } : { 3: '掌握', 2: '理解', 1: '了解' };
  return map[level] || map[1];
}

function levelClass(level) {
  return level === 3 ? 'level level-l3' : level === 2 ? 'level level-l2' : 'level';
}

function statusText(status) {
  const map = state.lang === 'en'
    ? { done: 'Done', current: 'Reading', next: 'Not started' }
    : { done: '已完成', current: '在读', next: '未开始' };
  return map[status] || map.next;
}

const SUBJECT_INDEX = {};
SUBJECTS.forEach(function (s) { SUBJECT_INDEX[s.id] = s; });

/* ------------------------------------------------------------------- home */

function renderHome() {
  const cur = SUBJECTS[0];
  const totalConcepts = SUBJECTS.reduce(function (n, s) { return n + s.concepts; }, 0);
  const totalUnits = SUBJECTS.reduce(function (n, s) { return n + s.units; }, 0);

  const tracks = Object.keys(MODES).map(function (m, i) {
    const d = MODES[m];
    return '<article class="track" data-reveal data-tilt style="--d:' + (i * 90) + 'ms">' +
      '<span class="track-num">' + d.num + '</span>' +
      '<h3 class="track-title">' + (state.lang === 'en' ? d.en : d.zh) + '</h3>' +
      '<span class="track-en">' + (state.lang === 'en' ? d.zh : d.en) + '</span>' +
      '<p class="track-desc">' + modeDesc(d) + '</p>' +
      '<ul class="track-points">' + modePoints(d).map(function (p) { return '<li>' + p + '</li>'; }).join('') + '</ul>' +
      '<a class="track-link" href="#/path/dl/' + m + '">' + t('path.kick') + ' →</a>' +
      '</article>';
  }).join('');

  const rows = SUBJECTS.map(function (s, i) {
    const dots = ['mastery', 'applied', 'literacy'].map(function (m) {
      const on = s.modes.indexOf(m) >= 0;
      const label = m === 'mastery' ? (state.lang === 'en' ? 'M' : '专') :
        m === 'applied' ? (state.lang === 'en' ? 'A' : '应') : (state.lang === 'en' ? 'L' : '通');
      return '<span class="mode-dot ' + (on ? 'on' : '') + '" title="' + modeLabel(m) + '">' + label + '</span>';
    }).join('');
    return '<a class="subject-row" href="#/path/' + s.id + '/mastery" data-reveal style="--d:' + (i * 45) + 'ms">' +
      '<span class="s-index">' + String(i + 1).padStart(2, '0') + '</span>' +
      '<span class="s-name">' + name(s) + '<small>' + (state.lang === 'en' ? s.zh : s.en) + '</small></span>' +
      '<span class="s-desc">' + subjectDesc(s) + '</span>' +
      '<span class="s-meta">' + s.concepts + ' ' + t('path.concepts') + '<br>' + s.units + ' ' + t('path.summary') + '</span>' +
      '<span class="s-modes">' + dots + '</span>' +
      '</a>';
  }).join('');

  return '' +
    '<section class="hero">' +
      '<div>' +
        '<span class="kick">' + t('home.kick') + '</span>' +
        '<h1>' +
          '<span class="hl"><span>' + t('home.title1') + '</span></span>' +
          '<span class="hl"><span><em>' + t('home.title2') + '</em></span></span>' +
        '</h1>' +
        '<p class="lede">' + t('home.lede') + '</p>' +
        '<div class="hero-actions">' +
          '<a class="btn btn-primary" href="#/read/backprop">' + t('home.start') + ' <span aria-hidden="true">→</span></a>' +
          '<a class="btn btn-ghost" href="#/map">' + t('home.browse') + '</a>' +
        '</div>' +
      '</div>' +
      '<aside class="specimen">' +
        '<div class="specimen-top">' + t('home.spec') + '</div>' +
        '<div class="specimen-rows">' +
          '<div class="specimen-row"><span>' + t('home.spec.1') + '</span><b data-count="' + SUBJECTS.length + '">' + SUBJECTS.length + '</b></div>' +
          '<div class="specimen-row"><span>' + t('home.spec.2') + '</span><b data-count="' + totalConcepts + '">' + totalConcepts + '</b></div>' +
          '<div class="specimen-row"><span>' + t('home.spec.3') + '</span><b data-count="' + totalUnits + '">' + totalUnits + '</b></div>' +
          '<div class="specimen-row"><span>' + t('home.spec.4') + '</span><b>中 / EN</b></div>' +
        '</div>' +
      '</aside>' +
    '</section>' +

    '<section class="section">' +
      '<div class="continue" data-reveal>' +
        '<div>' +
          '<div class="continue-kick">' + t('home.cont.kick') + '</div>' +
          '<h2 class="continue-title">' + t('home.cont.title') + '</h2>' +
          '<div class="continue-sub">' + t('home.cont.sub') + '</div>' +
        '</div>' +
        '<div class="continue-right">' +
          '<div class="ring" data-ring="38" aria-label="38%" style="--p:0"><span>0%</span></div>' +
          '<a class="btn btn-ghost" href="#/read/backprop">' + t('home.cont.btn') + ' →</a>' +
        '</div>' +
      '</div>' +
    '</section>' +

    '<section class="section">' +
      '<div class="section-head" data-reveal>' +
        '<div><span class="kick">' + t('home.tracks.kick') + '</span><h2 class="section-title">' + t('home.tracks.title') + '</h2></div>' +
        '<p class="section-note">' + t('home.tracks.note') + '</p>' +
      '</div>' +
      '<div class="tracks">' + tracks + '</div>' +
    '</section>' +

    '<section class="section">' +
      '<div class="section-head" data-reveal>' +
        '<div><span class="kick">' + t('home.subjects.kick') + '</span><h2 class="section-title">' + t('home.subjects.title') + '</h2></div>' +
        '<p class="section-note">' + t('home.subjects.note') + '</p>' +
      '</div>' +
      '<div class="subjects">' + rows + '</div>' +
    '</section>';
}

/* ------------------------------------------------------------------- path */

function renderPath(subjectId, mode) {
  const s = SUBJECT_INDEX[subjectId] || SUBJECTS[0];
  const route = (ROUTES[s.id] && ROUTES[s.id][mode]) || null;
  const modeData = MODES[mode] || MODES.mastery;

  const sw = ['mastery', 'applied', 'literacy'].map(function (m) {
    return '<button class="mode-btn ' + (m === mode ? 'on' : '') + '" data-mode="' + m + '" data-subject="' + s.id + '" type="button">' + modeLabel(m) + '</button>';
  }).join('');

  let body = '';
  if (!route) {
    body = '<div class="empty">' +
      '<h3>' + t('path.empty.title') + '</h3>' +
      '<p>' + t('path.empty.text') + '</p>' +
      '<a class="btn btn-ghost" href="#/path/dl/literacy">' + t('path.empty.btn') + ' →</a>' +
      '</div>';
  } else {
    body = route.map(function (stage) {
      const units = stage.units.map(function (u, ui) {
        const chips = (u.concepts || []).map(function (cid) {
          const c = CONCEPTS[cid];
          return c ? '<button class="u-mini" data-concept="' + cid + '" type="button">' + name(c) + '</button>' : '';
        }).join('');
        return '<div class="unit ' + (u.status === 'current' ? 'is-current' : '') + '" data-reveal style="--d:' + (ui * 55) + 'ms">' +
          '<span class="u-index">' + String(u.n).padStart(2, '0') + '</span>' +
          '<div class="u-body">' +
            '<h3 class="u-title">' + (u.status === 'current' ? '<a href="#/read/backprop">' + name(u) + '</a>' : name(u)) + '</h3>' +
            '<p class="u-sub">' + noteText(u.note) + '</p>' +
            (chips ? '<div class="u-chips">' + chips + '</div>' : '') +
          '</div>' +
          '<div class="u-side">' +
            '<span class="' + levelClass(u.level) + '">' + levelText(u.level) + '</span>' +
            '<span class="status status-' + u.status + '">' + statusText(u.status) + '</span>' +
          '</div>' +
        '</div>';
      }).join('');
      return '<div class="stage"><div class="stage-title">' + (state.lang === 'en' ? stage.stage.en : stage.stage.zh) + '</div>' + units + '</div>';
    }).join('');
  }

  const prereqNames = s.pre.map(function (id) {
    const c = CONCEPTS[id];
    return '<li><span class="u-mini" style="border:0;padding:0">' + name(c) + '</span><span>' + (state.lang === 'en' ? c.zh : c.en) + '</span></li>';
  }).join('');

  const totalUnits = route ? route.reduce(function (n, st) { return n + st.units.length; }, 0) : 0;
  const doneUnits = route ? route.reduce(function (n, st) {
    return n + st.units.filter(function (u) { return u.status === 'done'; }).length;
  }, 0) : 0;

  return '' +
    '<section class="page-head">' +
      '<div class="crumb">' + t('path.kick') + '<span>/</span>' + name(s) + '<span>/</span>' + modeLabel(mode) + '</div>' +
      '<h1 class="page-title">' + name(s) + '</h1>' +
      '<p class="page-sub">' + t('path.sub') + '</p>' +
      '<div class="path-bar">' +
        '<div class="mode-switch" role="group" aria-label="mode">' + sw + '</div>' +
        '<div class="chips">' +
          '<span class="chip">' + totalUnits + ' ' + t('path.summary') + '</span>' +
          '<span class="chip">' + s.concepts + ' ' + t('path.concepts') + '</span>' +
          '<span class="chip chip-accent">' + modeDesc(modeData) + '</span>' +
        '</div>' +
      '</div>' +
    '</section>' +
    '<div class="route">' +
      '<div>' + body + '</div>' +
      '<aside class="rail">' +
        '<div class="rail-card" data-reveal>' +
          '<div class="rail-kick">' + t('path.progress') + '</div>' +
          '<h3 class="rail-title">' + doneUnits + ' / ' + totalUnits + '</h3>' +
          '<p class="rail-text">' + t('path.progress.text') + '</p>' +
          '<div class="bar" style="margin-top:14px"><i style="width:' + (totalUnits ? Math.round(doneUnits / totalUnits * 100) : 0) + '%"></i></div>' +
        '</div>' +
        (prereqNames ? '<div class="rail-card" data-reveal style="--d:70ms">' +
          '<div class="rail-kick">' + t('reader.pre') + '</div>' +
          '<ul class="rail-list">' + prereqNames + '</ul>' +
        '</div>' : '') +
        '<div class="rail-card" data-reveal style="--d:140ms">' +
          '<div class="rail-kick">' + t('path.why') + '</div>' +
          '<p class="rail-text">' + t('path.why.text') + '</p>' +
        '</div>' +
        '<div class="rail-card" data-reveal style="--d:210ms">' +
          '<div class="rail-kick">' + t('path.free') + '</div>' +
          '<p class="rail-text">' + t('path.free.text') + '</p>' +
        '</div>' +
      '</aside>' +
    '</div>';
}

/* ----------------------------------------------------------------- reader */

function readerSection(s) {
  return '<section id="' + s.id + '" data-reveal>' +
    '<div class="sec-label">' + s.label + '</div>' +
    '<h2>' + s.title + '</h2>' +
    s.html +
    '</section>';
}

function renderReader() {
  const L = LECTURE[state.lang];
  const toc = L.sections.map(function (s) {
    return '<a href="#' + s.id + '" data-toc="' + s.id + '">' + s.title + '</a>';
  }).join('');

  const preItems = PREREQ.map(function (p) {
    const def = state.lang === 'en' ? p.defEn : p.def;
    return '<div class="prereq-item">' +
      '<b>' + (state.lang === 'en' ? p.en : p.zh) + '</b>' +
      '<span>' + def + '</span>' +
      '<button class="p-link" data-concept="' + p.id + '" type="button">' + (state.lang === 'en' ? 'Open concept' : '打开这个概念') + ' →</button>' +
      '</div>';
  }).join('');

  const conceptChips = ['backprop', 'chain', 'grad', 'matrix'].map(function (id) {
    return '<li><button class="u-mini" data-concept="' + id + '" type="button" style="border:0;padding:0;color:var(--ink-2)">' + name(CONCEPTS[id]) + '</button><span class="tag">' + (state.lang === 'en' ? CONCEPTS[id].zh : CONCEPTS[id].en) + '</span></li>';
  }).join('');

  const due = state.lang === 'en' ? 'Tomorrow' : '明天';

  return '' +
    '<div class="reader">' +
      '<nav class="toc" aria-label="toc">' +
        '<div class="toc-kick">' + t('reader.toc') + '</div>' +
        toc +
        '<div class="toc-foot">' + t('reader.size') +
          '<div class="prereq-tools"><button class="mini-btn" data-font="-1" type="button">A−</button>' +
          '<button class="mini-btn" data-font="1" type="button">A+</button></div>' +
        '</div>' +
      '</nav>' +

      '<article class="art">' +
        '<header class="art-head">' +
          '<div class="art-kicker">' + L.kicker + '</div>' +
          '<h1>' + L.title + '</h1>' +
          '<p class="art-sub">' + L.sub + '</p>' +
          '<div class="art-meta">' + L.meta.map(function (m) { return '<span>' + m + '</span>'; }).join('') + '</div>' +
          '<div class="prereq-tools" style="margin-top:16px">' +
            '<a class="chip chip-accent" href="#/path/dl/literacy">' + (state.lang === 'en' ? 'Switch to literacy route' : '切换到通识版路线') + '</a>' +
            '<button class="chip" data-mode-quick="applied" type="button">' + (state.lang === 'en' ? 'Applied version' : '应用版讲法') + '</button>' +
          '</div>' +
        '</header>' +

        '<div class="prereq" id="prereq">' +
          '<button class="prereq-head" data-prereq-toggle type="button" aria-expanded="true" aria-controls="prereqBody">' +
            '<span class="prereq-label">' + t('reader.prereq') + '</span>' +
            '<span class="prereq-count">2 ' + (state.lang === 'en' ? 'concepts' : '个概念') + '</span>' +
            '<span class="prereq-caret" id="prereqCaret">▾</span>' +
          '</button>' +
          '<div class="prereq-body" id="prereqBody">' +
            '<div class="prereq-inner">' + preItems +
              '<div class="prereq-tools">' +
                '<button class="mini-btn" data-gap="1" type="button">' + t('reader.gap') + '</button>' +
                '<button class="mini-btn" data-prereq-skip type="button">' + (state.lang === 'en' ? 'Skip' : '跳过') + '</button>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="art-body" id="artBody">' + L.sections.map(readerSection).join('') + '</div>' +

        '<nav class="artnav">' +
          '<a href="' + L.prev.href + '"><small>' + t('reader.pre') + '</small><b>← ' + L.prev.title + '</b></a>' +
          '<a class="rt" href="' + L.next.href + '"><small>' + t('reader.next') + '</small><b>' + L.next.title + ' →</b></a>' +
        '</nav>' +
      '</article>' +

      '<aside class="rrail">' +
        '<div class="mcard" data-reveal>' +
          '<div class="mcard-kick">' + t('reader.concepts') + '</div>' +
          '<ul class="mcard-list">' + conceptChips + '</ul>' +
        '</div>' +
        '<div class="mcard" data-reveal style="--d:70ms">' +
          '<div class="mcard-kick">' + t('reader.mastery') + '</div>' +
          '<div class="mastery-head"><b>12%</b><span>' + t('reader.nextdue') + ' · ' + due + '</span></div>' +
          '<div class="bar"><i style="width:12%"></i></div>' +
          '<p class="mnote">' + (state.lang === 'en'
            ? 'Mastery is a probability, not a checkbox. It decays and gets re-verified on schedule.'
            : '掌握度是一个概率，不是一个勾选框。它会衰减，并按计划被重新验证。') + '</p>' +
        '</div>' +
        '<div class="mcard" data-reveal style="--d:140ms">' +
          '<div class="mcard-kick">' + t('reader.pre') + ' / ' + t('reader.next') + '</div>' +
          '<ul class="mcard-list">' +
            '<li><span>' + name(CONCEPTS.chain) + '</span><span class="tag">' + levelText(3) + '</span></li>' +
            '<li><span>' + name(CONCEPTS.matrix) + '</span><span class="tag">' + levelText(3) + '</span></li>' +
            '<li><span>' + (state.lang === 'en' ? 'Optimizers' : '优化器') + '</span><span class="tag">' + levelText(2) + '</span></li>' +
          '</ul>' +
        '</div>' +
        '<div class="mcard" data-reveal style="--d:210ms"><div class="mcard-kick">i18n</div><p class="mnote" style="margin-top:0">' + t('reader.langnote') + '</p></div>' +
      '</aside>' +
    '</div>';
}

/* -------------------------------------------------------------------- map */

function renderMap() {
  const edges = [];
  Object.keys(CONCEPTS).forEach(function (id) {
    const c = CONCEPTS[id];
    (c.pre || []).forEach(function (p) { edges.push([p, id]); });
  });

  const lines = edges.map(function (pair, i) {
    const a = CONCEPTS[pair[0]];
    const b = CONCEPTS[pair[1]];
    if (!a || !b) return '';
    const ax = a.x + a.w / 2, ay = a.y + a.h / 2;
    const bx = b.x + b.w / 2, by = b.y + b.h / 2;
    const dx = bx - ax, dy = by - ay;
    const t1 = Math.min((a.w / 2) / (Math.abs(dx) || 1e-6), (a.h / 2) / (Math.abs(dy) || 1e-6));
    const t2 = Math.min((b.w / 2) / (Math.abs(dx) || 1e-6), (b.h / 2) / (Math.abs(dy) || 1e-6));
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const ux = dx / len, uy = dy / len;
    const x1 = ax + dx * t1, y1 = ay + dy * t1;
    const x2 = bx - dx * t2 - ux * 4, y2 = by - dy * t2 - uy * 4;
    const head = poly(x2, y2, ux, uy);
    return '<g class="edge" data-from="' + pair[0] + '" data-to="' + pair[1] + '" style="--d:' + (i * 55) + 'ms">' +
      '<line pathLength="1" x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) +
      '" stroke="var(--line-2)" stroke-width="1.1"/>' + head + '</g>';
  }).join('');

  const nodes = Object.keys(CONCEPTS).map(function (id, i) {
    const c = CONCEPTS[id];
    const fill = c.field === 'ai' ? 'var(--accent-wash)' : c.field === 'cs' ? 'var(--blue-wash)' : 'var(--paper-2)';
    const stroke = c.field === 'ai' ? 'var(--accent)' : c.field === 'cs' ? 'var(--blue)' : 'var(--line-2)';
    return '<g class="node" data-concept="' + id + '" role="button" tabindex="0" aria-label="' + name(c) + '" style="--d:' + (140 + i * 50) + 'ms">' +
      '<rect x="' + c.x + '" y="' + c.y + '" width="' + c.w + '" height="' + c.h + '" rx="4" fill="' + fill + '" stroke="' + stroke + '" stroke-width="1"/>' +
      '<text x="' + (c.x + c.w / 2) + '" y="' + (c.y + 19) + '" text-anchor="middle" font-family="var(--sans)" font-size="14" fill="var(--ink)">' + name(c) + '</text>' +
      '<text x="' + (c.x + c.w / 2) + '" y="' + (c.y + 34) + '" text-anchor="middle" font-family="var(--sans)" font-size="9.5" letter-spacing="0.06em" fill="var(--ink-3)">' + (state.lang === 'en' ? c.zh : c.en).toUpperCase() + '</text>' +
      '</g>';
  }).join('');

  const list = Object.keys(CONCEPTS).map(function (id) {
    const c = CONCEPTS[id];
    return '<li><button class="mini-btn" data-concept="' + id + '" type="button" style="text-align:left">' + name(c) + '</button><span>' + (c.pre.length ? c.pre.length + ' ' + (state.lang === 'en' ? 'pre' : '前置') : (state.lang === 'en' ? 'root' : '根节点')) + '</span></li>';
  }).join('');

  return '' +
    '<section class="page-head">' +
      '<div class="crumb">' + t('map.kick') + '</div>' +
      '<h1 class="page-title">' + t('map.title') + '</h1>' +
      '<p class="page-sub">' + t('map.sub') + '</p>' +
    '</section>' +
    '<div class="map-grid">' +
      '<div>' +
        '<div class="map-panel">' +
          '<svg class="map-svg" viewBox="0 0 860 420" role="img" aria-label="concept dependency graph">' +
            lines + nodes +
          '</svg>' +
        '</div>' +
        '<div class="map-legend">' +
          '<span><i style="background:var(--paper-2)"></i>' + t('map.legend.math') + '</span>' +
          '<span><i style="background:var(--accent-wash);border-color:var(--accent)"></i>' + t('map.legend.ai') + '</span>' +
          '<span><i style="background:var(--blue-wash);border-color:var(--blue)"></i>' + t('map.legend.cs') + '</span>' +
        '</div>' +
      '</div>' +
      '<aside class="rail">' +
        '<div class="rail-card">' +
          '<div class="rail-kick">' + t('map.side.title') + '</div>' +
          '<p class="rail-text">' + t('map.side.text') + '</p>' +
        '</div>' +
        '<div class="rail-card">' +
          '<div class="rail-kick">' + (state.lang === 'en' ? 'All nodes' : '全部节点') + '</div>' +
          '<ul class="rail-list">' + list + '</ul>' +
        '</div>' +
      '</aside>' +
    '</div>';
}

/* ----------------------------------------------------------------- review */

function renderReview() {
  const rows = REVIEW.map(function (r, i) {
    const c = CONCEPTS[r.id];
    return '<tr data-reveal style="--d:' + (i * 60) + 'ms">' +
      '<td class="name"><button data-concept="' + r.id + '" type="button" style="text-align:left">' + name(c) + '</button></td>' +
      '<td><div class="bar"><i style="width:' + r.mastery + '%"></i></div><span style="font-size:11px;color:var(--ink-3)">' + r.mastery + '%</span></td>' +
      '<td class="due ' + (r.when === '到期' || r.whenEn === 'Due' ? 'now' : '') + '">' + (state.lang === 'en' ? r.dueEn : r.due) + '</td>' +
      '<td class="when">' + (state.lang === 'en' ? r.whenEn : r.when) + '</td>' +
      '</tr>';
  }).join('');

  return '' +
    '<section class="page-head">' +
      '<div class="crumb">' + t('review.kick') + '</div>' +
      '<h1 class="page-title">' + t('review.title') + '</h1>' +
      '<p class="page-sub">' + t('review.sub') + '</p>' +
    '</section>' +
    '<div class="review-grid">' +
      '<div>' +
        '<table class="rev-table"><thead><tr>' +
          '<th>' + t('review.th.concept') + '</th>' +
          '<th>' + t('review.th.mastery') + '</th>' +
          '<th>' + t('review.th.due') + '</th>' +
          '<th style="text-align:right">' + t('review.th.when') + '</th>' +
        '</tr></thead><tbody>' + rows + '</tbody></table>' +
      '</div>' +
      '<aside class="rail">' +
        '<div class="rev-card">' +
          '<h3>' + t('review.card.title') + '</h3>' +
          '<p>' + t('review.card.text') + '</p>' +
          '<button class="btn btn-primary" data-demo-action type="button">' + t('review.card.btn') + '</button>' +
        '</div>' +
        '<div class="rail-card">' +
          '<div class="rail-kick">FSRS</div>' +
          '<p class="rail-text">' + (state.lang === 'en'
            ? 'Intervals follow the FSRS model: 1, 3, 7, 16 days. Mastery decays between reviews.'
            : '间隔按 FSRS 模型排：1、3、7、16 天。两次复习之间，掌握度会衰减。') + '</p>' +
        '</div>' +
      '</aside>' +
    '</div>';
}

/* ------------------------------------------------------------------ drawer */

let drawerTimer = null;

function openConcept(id) {
  const c = CONCEPTS[id];
  if (!c) return;
  const pre = c.pre.map(function (p) {
    return '<button data-concept="' + p + '" type="button">' + name(CONCEPTS[p]) + '<span>' + (state.lang === 'en' ? 'prerequisite' : '前置') + '</span></button>';
  }).join('');
  const next = c.usedBy.map(function (n) {
    return '<button data-concept="' + n + '" type="button">' + name(CONCEPTS[n]) + '<span>' + (state.lang === 'en' ? 'dependent' : '被用于') + '</span></button>';
  }).join('');

  const drawer = q('#drawer');
  drawer.innerHTML = '' +
    '<button class="drawer-close" data-close type="button" aria-label="close">×</button>' +
    '<div class="drawer-kick">' + (c.field === 'ai' ? 'AI' : c.field === 'cs' ? (state.lang === 'en' ? 'Computer Science' : '计算机') : (state.lang === 'en' ? 'Mathematics' : '数学')) + '</div>' +
    '<h3 id="drawerTitle">' + name(c) + '</h3>' +
    '<div class="drawer-en">' + (state.lang === 'en' ? c.zh : c.en) + '</div>' +
    '<p class="drawer-def">' + c.def + '</p>' +
    (pre ? '<div class="drawer-block"><h4>' + (state.lang === 'en' ? 'Prerequisites' : '前置') + '</h4><div class="drawer-links">' + pre + '</div></div>' : '') +
    (next ? '<div class="drawer-block"><h4>' + (state.lang === 'en' ? 'Used by' : '被用于') + '</h4><div class="drawer-links">' + next + '</div></div>' : '') +
    '<div class="drawer-actions">' +
      (id === 'backprop' ? '<a class="btn btn-primary" href="#/read/backprop" data-close>' + (state.lang === 'en' ? 'Open this lecture' : '打开这一讲') + '</a>' : '') +
      '<a class="btn btn-ghost" href="#/path/dl/mastery" data-close>' + (state.lang === 'en' ? 'See the route' : '查看所属路线') + '</a>' +
    '</div>';

  const wrap = q('#drawerWrap');
  clearTimeout(drawerTimer);
  wrap.hidden = false;
  document.body.style.overflow = 'hidden';
  void wrap.offsetWidth;
  requestAnimationFrame(function () { wrap.classList.add('is-open'); });
  setTimeout(function () {
    const close = q('.drawer-close');
    if (close) close.focus();
  }, 40);
}

function closeDrawer() {
  const wrap = q('#drawerWrap');
  if (!wrap || wrap.hidden) return;
  wrap.classList.remove('is-open');
  document.body.style.overflow = '';
  clearTimeout(drawerTimer);
  drawerTimer = setTimeout(function () { wrap.hidden = true; }, 420);
}

/* ---------------------------------------------------------- motion layer */

const FINE = window.matchMedia
  ? window.matchMedia('(hover: hover) and (pointer: fine)').matches
  : false;

function instantScroll(y) {
  try { window.scrollTo({ top: y, left: 0, behavior: 'instant' }); }
  catch (e) { window.scrollTo(0, y); }
}

let revealObserver = null;

function watchReveal(root) {
  const targets = qa('[data-reveal]', root);
  if (!targets.length) return;
  if (REDUCE || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-in'); });
    return;
  }
  if (revealObserver) revealObserver.disconnect();
  revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add('is-in');
        revealObserver.unobserve(en.target);
      }
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
  targets.forEach(function (el) { revealObserver.observe(el); });
}

function countUp(el) {
  const to = Number(el.getAttribute('data-count')) || 0;
  if (REDUCE) { el.textContent = String(to); return; }
  const dur = 900;
  const t0 = performance.now();
  el.textContent = '0';
  (function step(now) {
    const p = Math.min(1, (now - t0) / dur);
    el.textContent = String(Math.round(to * (1 - Math.pow(1 - p, 3))));
    if (p < 1) requestAnimationFrame(step);
  })(t0);
}

function ringIn(el) {
  const to = Number(el.getAttribute('data-ring')) || 0;
  const label = q('span', el);
  if (REDUCE) {
    el.style.setProperty('--p', to);
    if (label) label.textContent = to + '%';
    return;
  }
  const dur = 1100;
  const t0 = performance.now();
  (function step(now) {
    const p = Math.min(1, (now - t0) / dur);
    const v = to * (1 - Math.pow(1 - p, 4));
    el.style.setProperty('--p', v.toFixed(2));
    if (label) label.textContent = Math.round(v) + '%';
    if (p < 1) requestAnimationFrame(step);
  })(t0);
}

function bindReader() {
  const bar = q('#readbar i');
  const secs = qa('.art-body section');
  const links = qa('[data-toc]');
  scrollHandler = function () {
    let current = secs[0] ? secs[0].id : '';
    secs.forEach(function (s) {
      if (s.getBoundingClientRect().top < 140) current = s.id;
    });
    links.forEach(function (a) {
      a.classList.toggle('on', a.getAttribute('data-toc') === current);
    });
    if (bar) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (max > 4 ? Math.min(1, window.scrollY / max) : 0) + ')';
    }
  };
  window.addEventListener('scroll', scrollHandler, { passive: true });
  scrollHandler();
}

function bindMap(svg) {
  const clear = function () {
    svg.classList.remove('is-focus');
    qa('.is-lit', svg).forEach(function (n) { n.classList.remove('is-lit'); });
  };
  const focusNode = function (node) {
    if (!node) { clear(); return; }
    const id = node.getAttribute('data-concept');
    const near = [id];
    qa('.edge', svg).forEach(function (edge) {
      const from = edge.getAttribute('data-from');
      const to = edge.getAttribute('data-to');
      const on = from === id || to === id;
      edge.classList.toggle('is-lit', on);
      if (on) near.push(from === id ? to : from);
    });
    qa('.node', svg).forEach(function (n) {
      n.classList.toggle('is-lit', near.indexOf(n.getAttribute('data-concept')) > -1);
    });
    svg.classList.add('is-focus');
  };

  svg.addEventListener('pointerover', function (e) {
    const node = e.target.closest ? e.target.closest('.node') : null;
    if (node) focusNode(node);
  });
  svg.addEventListener('pointerleave', clear);
  svg.addEventListener('focusin', function (e) {
    const node = e.target.closest ? e.target.closest('.node') : null;
    if (node) focusNode(node);
  });
  svg.addEventListener('focusout', clear);
}

/* ------------------------------------------------------------------ router */

function setNav(view) {
  if (view === 'read') view = 'path';
  qa('[data-nav]').forEach(function (a) {
    a.classList.toggle('active', a.getAttribute('data-nav') === view);
  });
}

let scrollHandler = null;
let lastView = null;

function afterRender(view, opts) {
  opts = opts || {};
  setNav(view);
  if (scrollHandler) { window.removeEventListener('scroll', scrollHandler); scrollHandler = null; }

  const bar = q('#readbar i');
  if (bar && view !== 'read') bar.style.transform = 'scaleX(0)';

  const main = q('#main');
  if (opts.instant) {
    qa('[data-reveal]', main).forEach(function (el) { el.classList.add('is-in'); });
  } else {
    watchReveal(main);
  }

  qa('[data-count]', main).forEach(countUp);
  const ring = q('[data-ring]', main);
  if (ring) ringIn(ring);

  if (view === 'read') bindReader();
  const svg = q('.map-svg', main);
  if (svg) bindMap(svg);
}

function route(opts) {
  opts = opts || {};
  const raw = location.hash.replace(/^#\/?/, '');
  const parts = raw.split('/').filter(Boolean);
  const app = q('#main');
  let view = 'home';

  if (parts[0] === 'path') {
    view = 'path';
    app.innerHTML = renderPath(parts[1] || 'dl', parts[2] || 'mastery');
  } else if (parts[0] === 'read') {
    view = 'read';
    app.innerHTML = renderReader();
  } else if (parts[0] === 'map') {
    view = 'map';
    app.innerHTML = renderMap();
  } else if (parts[0] === 'review') {
    view = 'review';
    app.innerHTML = renderReview();
  } else {
    app.innerHTML = renderHome();
  }

  const changed = view !== lastView;
  lastView = view;

  if (!opts.soft) {
    if (changed) instantScroll(0);
    app.classList.remove('page-in');
    void app.offsetWidth;
    app.classList.add('page-in');
  }

  afterRender(view, opts);
}

/* ------------------------------------------------------------------- events */

function syncChrome() {
  q('#langBtn').textContent = state.lang === 'zh' ? 'EN' : '中文';
  q('#themeBtn').textContent = state.theme === 'light' ? t('ui.dark') : t('ui.light');
  document.documentElement.setAttribute('data-theme', state.theme);
  document.documentElement.setAttribute('lang', state.lang === 'zh' ? 'zh-CN' : 'en');
  document.documentElement.style.setProperty('--read-size', state.size + 'px');
  qa('[data-nav]').forEach(function (a) {
    const k = a.getAttribute('data-nav');
    a.textContent = t('nav.' + (k === 'home' ? 'library' : k));
  });
}

document.addEventListener('click', function (e) {
  const el = e.target.closest('[data-concept]');
  if (el) { openConcept(el.getAttribute('data-concept')); return; }

  const modeBtn = e.target.closest('[data-mode]');
  if (modeBtn) {
    location.hash = '#/path/' + modeBtn.getAttribute('data-subject') + '/' + modeBtn.getAttribute('data-mode');
    return;
  }

  if (e.target.closest('[data-close]')) { closeDrawer(); return; }

  const preToggle = e.target.closest('[data-prereq-toggle]');
  if (preToggle) {
    const box = q('#prereq');
    if (!box) return;
    const collapsed = box.classList.toggle('is-collapsed');
    preToggle.setAttribute('aria-expanded', String(!collapsed));
    return;
  }

  if (e.target.closest('[data-prereq-skip]')) {
    const box = q('#prereq');
    if (!box) return;
    box.classList.add('is-collapsed');
    const head = q('[data-prereq-toggle]', box);
    if (head) head.setAttribute('aria-expanded', 'false');
    return;
  }

  if (e.target.closest('[data-gap]')) {
    const box = q('#prereq');
    if (box) {
      box.classList.remove('is-collapsed');
      const head = q('[data-prereq-toggle]', box);
      if (head) head.setAttribute('aria-expanded', 'true');
    }
    qa('.prereq-item').forEach(function (item, i) {
      item.classList.remove('is-flash');
      item.style.setProperty('--fd', (i * 90) + 'ms');
      void item.offsetWidth;
      item.classList.add('is-flash');
    });
    return;
  }

  const fontBtn = e.target.closest('[data-font]');
  if (fontBtn) {
    const delta = Number(fontBtn.getAttribute('data-font'));
    state.size = Math.max(14, Math.min(22, state.size + delta));
    lsSet('opus.size', String(state.size));
    document.documentElement.style.setProperty('--read-size', state.size + 'px');
    return;
  }

  const modeQuick = e.target.closest('[data-mode-quick]');
  if (modeQuick) {
    location.hash = '#/path/dl/' + modeQuick.getAttribute('data-mode-quick');
    return;
  }

  if (e.target.closest('[data-demo-action]')) {
    const btn = e.target.closest('[data-demo-action]');
    btn.textContent = state.lang === 'en' ? 'Demo only — no scheduler yet' : '原型演示：尚未接入排期';
    btn.disabled = true;
    qa('.rev-table tbody tr').forEach(function (tr, i) {
      tr.classList.remove('is-demo');
      tr.style.setProperty('--d', (i * 70) + 'ms');
      void tr.offsetWidth;
      tr.classList.add('is-demo');
    });
    return;
  }
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') { closeDrawer(); return; }
  if (e.key === 'Enter' || e.key === ' ') {
    const node = e.target.closest ? e.target.closest('.map-svg .node') : null;
    if (node) {
      e.preventDefault();
      openConcept(node.getAttribute('data-concept'));
    }
  }
});

q('#drawerBackdrop').addEventListener('click', closeDrawer);

/* ------------------------------------------------------------ pointer fx */

let pmRaf = 0;
let pmEvent = null;
let hotTrack = null;

function applyPointer() {
  pmRaf = 0;
  const e = pmEvent;
  if (!e) return;

  const hero = q('.hero');
  if (hero) {
    const r = hero.getBoundingClientRect();
    if (r.bottom > 0 && r.top < window.innerHeight) {
      hero.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 100).toFixed(1) + '%');
      hero.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 100).toFixed(1) + '%');
    }
  }

  const track = e.target.closest ? e.target.closest('[data-tilt]') : null;
  if (track !== hotTrack) {
    if (hotTrack) {
      hotTrack.style.setProperty('--rx', '0deg');
      hotTrack.style.setProperty('--ry', '0deg');
    }
    hotTrack = track;
  }
  if (track) {
    const r = track.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    track.style.setProperty('--rx', ((0.5 - py) * 3.2).toFixed(2) + 'deg');
    track.style.setProperty('--ry', ((px - 0.5) * 3.2).toFixed(2) + 'deg');
    track.style.setProperty('--px', (px * 100).toFixed(1) + '%');
    track.style.setProperty('--py', (py * 100).toFixed(1) + '%');
  }
}

if (FINE && !REDUCE) {
  document.addEventListener('pointermove', function (e) {
    pmEvent = e;
    if (!pmRaf) pmRaf = requestAnimationFrame(applyPointer);
  }, { passive: true });
  window.addEventListener('blur', function () {
    if (hotTrack) {
      hotTrack.style.setProperty('--rx', '0deg');
      hotTrack.style.setProperty('--ry', '0deg');
      hotTrack = null;
    }
  });
}

/* -------------------------------------------------------- theme + language */

function wipeTheme(next, originX, originY) {
  qa('.theme-wipe').forEach(function (w) { w.remove(); });
  const radius = Math.hypot(
    Math.max(originX, window.innerWidth - originX),
    Math.max(originY, window.innerHeight - originY)
  );
  const wipe = document.createElement('div');
  wipe.className = 'theme-wipe';
  wipe.style.background = next === 'dark' ? '#121210' : '#f5f3ed';
  wipe.style.setProperty('--x', originX + 'px');
  wipe.style.setProperty('--y', originY + 'px');
  wipe.style.setProperty('--r', radius + 'px');
  document.body.appendChild(wipe);
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { wipe.classList.add('is-on'); });
  });
  setTimeout(function () {
    state.theme = next;
    lsSet('opus.theme', next);
    syncChrome();
  }, 290);
  setTimeout(function () { wipe.classList.add('is-off'); }, 330);
  setTimeout(function () { wipe.remove(); }, 640);
}

q('#themeBtn').addEventListener('click', function (e) {
  const next = state.theme === 'light' ? 'dark' : 'light';
  if (REDUCE) {
    state.theme = next;
    lsSet('opus.theme', next);
    syncChrome();
    return;
  }
  const r = this.getBoundingClientRect();
  wipeTheme(next, r.left + r.width / 2, r.top + r.height / 2);
});

q('#langBtn').addEventListener('click', function () {
  const next = state.lang === 'zh' ? 'en' : 'zh';
  const commit = function () {
    const y = window.scrollY;
    state.lang = next;
    lsSet('opus.lang', next);
    syncChrome();
    route({ soft: true, instant: true });
    instantScroll(y);
    window.dispatchEvent(new Event('scroll'));
  };
  if (REDUCE || !document.startViewTransition) { commit(); return; }

  document.documentElement.classList.add('instant');
  const done = function () { document.documentElement.classList.remove('instant'); };
  const vt = document.startViewTransition(commit);
  if (vt && vt.finished) vt.finished.then(done, done);
  else setTimeout(done, 60);
});

window.addEventListener('hashchange', function () { route(); });

/* -------------------------------------------------------------------- init */

function bindChrome() {
  const top = q('.top');
  let ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      if (top) top.classList.toggle('is-scrolled', window.scrollY > 6);
      ticking = false;
    });
  }, { passive: true });
}

syncChrome();
bindChrome();
route();
